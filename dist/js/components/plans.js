"use strict";

angular.module("risevision.common.components.plans.services", [
  "risevision.store.authorization",
  "risevision.common.gapi",
  "risevision.common.currency"
]);

angular.module("risevision.common.components.plans", [
  "risevision.common.components.plans.services",
  "risevision.common.components.scrolling-list",
  "risevision.common.components.loading",
  "ui.bootstrap"
]);

(function (angular) {
  "use strict";


  angular.module("risevision.common.currency", [
    "risevision.common.gapi"
  ])

  .factory("currencyService", ["$q", "storeAPILoader", "$log",
    function ($q, storeAPILoader, $log) {

      var deferred = null;
      var currency = {
        defaultItem: null
      };

      var CurrencyItem = function (obj) {
        this.country = obj.country;
        this.currencyCode = obj.currencyCode;
        this.description = obj.description;
        this.bankAccountCode = obj.bankAccountCode;
        this.bankAccountDescription = obj.bankAccountDescription;

        this.getName = function () {
          return this.currencyCode.toUpperCase();
        };

        this.pickPrice = function (priceUSD, priceCAD) {
          switch (this.currencyCode.toUpperCase()) {
          case "CAD":
            return priceCAD;
          default:
            return priceUSD;
          }
        };
      };

      currency.getByCountry = function (country) {
        if (country) {
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].country && this.items[i].country.toUpperCase() ===
              country.toUpperCase()) {
              return this.items[i];
            }
          }
        }
        return this.defaultItem;
      };

      currency.setItems = function (newItems) {
        this.items = [];
        //set default currency
        for (var i = 0; i < newItems.length; i++) {
          var ci = new CurrencyItem(newItems[i]);
          this.items.push(ci);
          if (!ci.country) {
            this.defaultItem = ci;
          }
        }
      };

      return function () {

        if (deferred !== null) {
          return deferred.promise;
        }

        deferred = $q.defer();

        $log.debug("currencyService called");
        storeAPILoader().then(function (storeAPI) {
          var request = storeAPI.currency.list();
          request.execute(function (resp) {
            $log.debug("currencyService resp", resp);
            if (!resp.error) {
              currency.setItems(resp.items);
              deferred.resolve(currency);
            } else {
              console.error("currencyService error: ", resp.error);
              deferred.reject(resp.error);
            }
          });
        });

        return deferred.promise;
      };

    }
  ]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .value("PLANS_LIST", [{
      name: "Free",
      type: "free",
      productId: "000",
      pc: "000",
      status: "Active",
      priceMonth: 0,
      descriptionShort: "Design, distribute and manage your digital signage for free. Unlimited Displays, Companies and Users.",
      proLicenseCount: 0
    }, {
      name: "Basic",
      type: "basic",
      productId: "289",
      pc: "40c092161f547f8f72c9f173cd8eebcb9ca5dd25",
      proLicenseCount: 2
    }, {
      name: "Advanced",
      type: "advanced",
      productId: "290",
      pc: "93b5595f0d7e4c04a3baba1102ffaecb17607bf4",
      proLicenseCount: 9
    }, {
      name: "Enterprise",
      type: "enterprise",
      productId: "301",
      pc: "b1844725d63fde197f5125b58b6cba6260ee7a57",
      proLicenseCount: 50
    }, {
      name: "Enterprise",
      type: "enterprisesub",
      productId: "303",
      pc: "d521f5bfbc1eef109481eebb79831e11c7804ad8",
      proLicenseCount: 0
    }])
    .factory("planFactory", ["$q", "$log", "$rootScope", "$modal", "$templateCache", "userState", "storeAPILoader",
      "currencyService", "PLANS_LIST", "subscriptionStatusService",
      function ($q, $log, $rootScope, $modal, $templateCache, userState, storeAPILoader,
        currencyService, PLANS_LIST, subscriptionStatusService) {
        var _factory = {};
        var _plansCodesList = _.map(PLANS_LIST, "pc");
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "pc");

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
          var modalInstance = $modal.open({
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
          modalInstance.result.then(function (plan) {
            var selectedCompany = userState.getCopyOfSelectedCompany(true);
            selectedCompany.planProductCode = plan.productCode;
            selectedCompany.planTrialPeriod = plan.trialPeriod;
            selectedCompany.planSubscriptionStatus = "Trial";
            selectedCompany.planPlayerProLicenseCount = _plansByCode[plan.productCode].proLicenseCount;

            userState.updateCompanySettings(selectedCompany);
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

angular.module("risevision.common.components.plans")

.controller("PlansDowngradeModalCtrl", [
  "$scope", "$modalInstance",
  function ($scope, $modalInstance) {

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };
  }
]);

angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading", "$timeout",
  "planFactory", "currentPlan", "storeAuthorization", "showRPPLink", "userState",
  function ($scope, $rootScope, $modalInstance, $log, $modal, $templateCache, $loading, $timeout,
    planFactory, currentPlan, storeAuthorization, showRPPLink, userState) {

    $scope.currentPlan = currentPlan;
    $scope.startTrialError = null;
    $scope.showRPPLink = showRPPLink;
    var company = userState.getCopyOfSelectedCompany();
    $scope.playerProSubscriptionId = company.playerProSubscriptionId;
    $scope.companyId = company.id;
    var _allPlansMap = {};

    function _getPlansDetails() {
      $loading.start("plans-modal");

      return planFactory.getCompanyPlanStatus()
        .then(function (allPlansMap) {
          _allPlansMap = allPlansMap;
          return planFactory.getPlansDetails();
        })
        .then(function (plans) {
          $scope.plans = plans;
        })
        .catch(function (err) {
          $log.debug("Failed to load plans", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    }

    $scope.showDowngradeModal = function () {
      $modal.open({
        template: $templateCache.get("plans/plans-downgrade-modal.html"),
        controller: "PlansDowngradeModalCtrl",
        size: "md"
      });
    };

    $scope.isCurrentPlan = function (plan) {
      return currentPlan.type === plan.type;
    };

    $scope.isOnTrial = function (plan) {
      return _allPlansMap[plan.productCode] && _allPlansMap[plan.productCode].statusCode === "on-trial";
    };

    $scope.canUpgrade = function (plan) {
      if ($scope.canStartTrial(plan)) {
        return false;
      } else if (currentPlan.type === plan.type) {
        return false;
      } else if (currentPlan.type === "enterprise") {
        return false;
      } else if (currentPlan.type === "advanced" && plan.type === "enterprise") {
        return true;
      } else if (currentPlan.type === "basic" && (plan.type === "advanced" || plan.type === "enterprise")) {
        return true;
      } else if (currentPlan.type === "free") {
        return true;
      }

      return false;
    };

    $scope.canDowngrade = function (plan) {
      if ($scope.canStartTrial(plan) || $scope.isOnTrial(plan)) {
        return false;
      } else if (currentPlan.type === plan.type) {
        return false;
      } else if (currentPlan.type === "enterprise") {
        return true;
      } else if (currentPlan.type === "advanced" && (plan.type === "free" || plan.type === "basic")) {
        return true;
      } else if (currentPlan.type === "basic" && plan.type === "free") {
        return true;
      }

      return false;
    };

    $scope.canStartTrial = function (plan) {
      if (currentPlan.planSubscriptionStatus === "Active") {
        return false;
      } else if (currentPlan.type === plan.type) {
        return false;
      } else if (_allPlansMap[plan.productCode] &&
        _allPlansMap[plan.productCode].statusCode === "trial-available") {
        return true;
      }

      return false;
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      storeAuthorization.startTrial(plan.productCode)
        .then(function () {
          return $timeout(5000)
            .then(function () {
              return userState.reloadSelectedCompany();
            })
            .then(function () {
              $rootScope.$emit("risevision.company.trial.started");
            })
            .catch(function (err) {
              $log.debug("Failed to reload company", err);
            })
            .finally(function () {
              $modalInstance.close(plan);
            });
        })
        .catch(function (err) {
          $log.debug("Failed to start trial", err);
          $scope.startTrialError = err;
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });

    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.init = function () {
      _getPlansDetails();
    };

    $scope.init();
  }

]);

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/plans-downgrade-modal.html',
    '<div><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 id="icpModalTitle" class="modal-title">Downgrade</h3></div><div class="modal-body u_padding-lg" stop-event="touchend"><div class="container-fluid text-center u_padding-lg">Downgrading an account needs to be processed through our Support team. Please reach out and we\'ll help!<br><a class="btn btn-primary btn-lg u_margin-lg-top" href="https://www.risevision.com/contact-us" target="_blank">Contact Us</a></div></div><div class="modal-footer"></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/plans-modal.html',
    '<div rv-spinner="" rv-spinner-key="plans-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title">Choose Your Plan</h3></div><div id="plans-modal" class="modal-body u_padding-lg" stop-event="touchend"><div ng-show="startTrialError" class="alert alert-danger u_margin-xs-bottom">There was an error starting your Plan Trial. Please try again!</div><div class="grid-list row"><div class="col-xs-12 col-sm-6 col-md-3" ng-repeat="plan in plans"><div class="u_cursor_disabled panel panel-default"><div itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><div class="grid-list-text text-center"><h4 id="productName">{{plan.name}}</h4><p class="product-description">{{plan.descriptionShort}}</p><div><h1>${{plan.priceMonth}}</h1>&nbsp;per Company per Month</div><div class="u_margin-lg"><p class="small u_margin-sm-bottom" ng-show="!isCurrentPlan(plan) || !isOnTrial(plan)">&nbsp;</p><p class="small u_margin-sm-bottom" ng-show="isCurrentPlan(plan) && isOnTrial(plan)">{{currentPlan.trialPeriod}} days left on your trial.</p><a id="current-plan" ng-show="isCurrentPlan(plan) && !isOnTrial(plan)" target="_blank" class="cta_button btn btn-white">Current Plan</a> <a id="subscribe-plan" ng-show="isOnTrial(plan) || canUpgrade(plan)" target="_blank" href="https://store.risevision.com/product/{{plan.productId}}" class="cta_button btn btn-primary">Subscribe</a> <a id="start-trial-plan" ng-show="canStartTrial(plan)" target="_blank" ng-click="startTrial(plan)" class="cta_button btn btn-primary">Start Trial</a> <a id="downgrade-plan" ng-show="canDowngrade(plan)" ng-click="showDowngradeModal()" class="cta_button btn btn-default">Downgrade</a></div></div></div></div></div></div><div ng-show="!showRPPLink" class="text-center u_margin-md-top"><a class="btn btn-link btn-lg get-started-guide" target="_blank" href="https://www.risevision.com/pricing?utm_campaign=apps">Learn More About Our Plan Pricing</a> <span class="bold">OR</span> <a class="btn btn-link btn-lg get-started-guide" target="_blank" href="https://www.risevision.com/contact-us">Contact Sales If You Need Help</a></div><div ng-show="showRPPLink && !playerProSubscriptionId" class="text-center u_margin-md-top"><a class="btn btn-link btn-lg" target="_blank" href="https://store.risevision.com/product/2048">No need for a Plan upgrade right now? You can get individual Professional Display licenses</a> <a class="cta_button btn btn-primary u_margin-lg" target="_blank" href="https://store.risevision.com/product/2048">Go To Store</a></div><div ng-show="showRPPLink && playerProSubscriptionId" class="text-center u_margin-md-top"><a class="btn btn-link btn-lg" target="_blank" href="https://store.risevision.com/account/subscription/{{playerProSubscriptionId}}?cid={{companyId}}">No need for a Plan upgrade right now? You can get individual Professional Display licenses</a> <a class="cta_button btn btn-primary u_margin-lg" target="_blank" href="https://store.risevision.com/account/subscription/{{playerProSubscriptionId}}?cid={{companyId}}">Go To Store</a></div></div><div class="modal-footer"></div></div>');
}]);
})();
