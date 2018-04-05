(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .value("PLANS_LIST", [{
      name: "Free",
      type: "free",
      productId: "000",
      productCode: "000",
      status: "Active",
      priceMonth: 0,
      descriptionShort: "Design, distribute and manage your digital signage for free. Unlimited Displays, Companies and Users.",
      proLicenseCount: 0
    }, {
      name: "Basic",
      type: "basic",
      productId: "289",
      productCode: "40c092161f547f8f72c9f173cd8eebcb9ca5dd25",
      proLicenseCount: 2,
      trialPeriod: 14
    }, {
      name: "Advanced",
      type: "advanced",
      productId: "290",
      productCode: "93b5595f0d7e4c04a3baba1102ffaecb17607bf4",
      proLicenseCount: 9,
      trialPeriod: 14
    }, {
      name: "Enterprise",
      type: "enterprise",
      productId: "301",
      productCode: "b1844725d63fde197f5125b58b6cba6260ee7a57",
      proLicenseCount: 50
    }, {
      name: "Enterprise",
      type: "enterprisesub",
      productId: "303",
      productCode: "d521f5bfbc1eef109481eebb79831e11c7804ad8",
      proLicenseCount: 0
    }])
    .factory("planFactory", ["$q", "$log", "$rootScope", "$modal", "$templateCache",
      "userState", "storeAPILoader", "currencyService", "subscriptionStatusService", "storeAuthorization",
      "PLANS_LIST",
      function ($q, $log, $rootScope, $modal, $templateCache, userState, storeAPILoader,
        currencyService, subscriptionStatusService, storeAuthorization, PLANS_LIST) {
        var _factory = {};
        var _plansCodesList = _.map(PLANS_LIST, "productCode");
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "productCode");

        _factory.getPlans = function (params) { // companyId, search
          $log.debug("getPlans called.");
          var deferred = $q.defer();
          storeAPILoader().then(function (riseApi) {
            riseApi.product.list(params).execute(function (resp) {
              $log.debug("getPlans response", resp);
              if (!resp.error) {
                deferred.resolve(resp);
              } else {
                deferred.reject(resp.error);
              }
            });
          });
          return deferred.promise;
        };

        _factory.getPlansDetails = function () {
          $log.debug("getPlansDetails called.");
          var deferred = $q.defer();
          var search = "(productTag=Plans)";

          _factory.getPlans({
            search: search
          })
            .then(function (resp) {
              $log.debug("getPlansDetails response.", resp);

              return _getSelectedCurrency().then(function (currency) {
                resp.items.forEach(function (plan) {
                  var monthKey = "per Company per Month";
                  var priceMap = _.keyBy(plan.pricing, "unit");
                  var price = priceMap[monthKey] || {};

                  plan.name = plan.name.replace(" Plan", "");
                  plan.type = plan.name.toLowerCase();
                  plan.priceMonth = currency.pickPrice(price.priceUSD, price.priceCAD);
                });

                var planMap = _.keyBy(resp.items, "type");

                // Add free plan, since it's not returned by the service
                deferred.resolve([_.cloneDeep(_plansByType.free), planMap.basic, planMap.advanced, planMap.enterprise]);
              });
            })
            .catch(function (err) {
              deferred.reject(err);
            });

          return deferred.promise;
        };

        _factory.showPlansModal = function (showRPPLink) {
          $modal.open({
            template: $templateCache.get("plans/plans-modal.html"),
            controller: "PlansModalCtrl",
            size: "lg",
            resolve: {
              currentPlan: function () {
                return _factory.currentPlan;
              },
              showRPPLink: function () {
                return showRPPLink;
              }
            }
          });
        };

        function _getSelectedCurrency() {
          return currencyService()
            .then(function (currency) {
              var company = userState.getCopyOfSelectedCompany();
              var country = (company && company.country) ? company.country : "";
              return currency.getByCountry(country);
            });
        }

        function _loadCurrentPlan() {
          var company = userState.getCopyOfSelectedCompany();
          var plan = null;

          if (company.id && company.planProductCode) {
            plan = _.cloneDeep(_plansByCode[company.planProductCode]);
            plan.status = company.planSubscriptionStatus;
            plan.trialPeriod = company.planTrialPeriod;
            plan.proStatus = company.playerProSubscriptionStatus;
          } else {
            plan = _.cloneDeep(_plansByType.free);
          }

          _factory.currentPlan = plan;
          $log.debug("Current plan", plan);
          $rootScope.$emit("risevision.plan.loaded", plan);
        }

        _factory.getCompanyPlanStatus = function () {
          $log.debug("getCompanyPlanStatus called.");
          var deferred = $q.defer();

          subscriptionStatusService.list(_plansCodesList.slice(1), userState.getSelectedCompanyId())
            .then(function (resp) {
              $log.debug("getCompanyPlanStatus response.", resp);

              var plansMap = _.keyBy(resp, "pc");

              deferred.resolve(plansMap);
            })
            .catch(function (err) {
              deferred.reject(err);
            });

          return deferred.promise;
        };

        _factory.getProLicenseCount = function (_company) {
          var company = _company || userState.getCopyOfSelectedCompany();
          return (company.planPlayerProLicenseCount || 0) + (company.playerProLicenseCount || 0);
        };

        _factory.areAllProLicensesUsed = function (_company) {
          var company = _company || userState.getCopyOfSelectedCompany();
          var maxProDisplays = _factory.getProLicenseCount();
          var assignedDisplays = company.playerProAssignedDisplays || [];

          return assignedDisplays.length === maxProDisplays;
        };

        _factory.toggleDisplayLicenseLocal = function (displayId, playerProAuthorized) {
          var company = userState.getCopyOfSelectedCompany(true);
          var assignedDisplays = company.playerProAssignedDisplays || [];

          if (playerProAuthorized && assignedDisplays.indexOf(displayId) === -1) {
            assignedDisplays.push(displayId);
          } else if (!playerProAuthorized && assignedDisplays.indexOf(displayId) >= 0) {
            assignedDisplays.splice(assignedDisplays.indexOf(displayId), 1);
          }

          company.playerProAssignedDisplays = assignedDisplays;
          userState.updateCompanySettings(company);
        };

        _factory.startTrial = function (plan) {
          return storeAuthorization.startTrial(plan.productCode)
            .then(function () {
              var selectedCompany = userState.getCopyOfSelectedCompany(true);

              selectedCompany.planProductCode = plan.productCode;
              selectedCompany.planTrialPeriod = plan.trialPeriod;
              selectedCompany.planSubscriptionStatus = "Trial";
              selectedCompany.planPlayerProLicenseCount = _plansByCode[plan.productCode].proLicenseCount;

              userState.updateCompanySettings(selectedCompany);
            })
            .catch(function (err) {
              $log.debug("Failed to start trial", err);

              throw err;
            });
        };

        _factory.startBasicPlanTrial = function () {
          return _factory.startTrial(_plansByType.basic);
        };

        _factory.isPlanActive = function () {
          return _factory.isSubscribed() || _factory.isOnTrial();
        };

        _factory.isFree = function () {
          return _factory.currentPlan.type === "free";
        };

        _factory.isEnterpriseSubCompany = function () {
          return _factory.currentPlan.type === "enterprisesub";
        };

        _factory.isSubscribed = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Active";
        };

        _factory.isOnTrial = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Trial";
        };

        _factory.isTrialExpired = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Trial Expired";
        };

        _factory.isSuspended = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Suspended";
        };

        _factory.isProSubscribed = function () {
          return _factory.currentPlan.proStatus === "Active";
        };

        _factory.isProSuspended = function () {
          return _factory.currentPlan.proStatus === "Suspended";
        };

        _factory.hasProfessionalLicenses = function () {
          return _factory.isSubscribed() || _factory.isOnTrial() || _factory.isProSubscribed();
        };

        _loadCurrentPlan();

        $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
          _loadCurrentPlan();
        });

        $rootScope.$on("risevision.company.updated", function () {
          _loadCurrentPlan();
        });

        return _factory;
      }
    ]);

})(angular);
