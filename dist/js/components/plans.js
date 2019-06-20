(function (angular) {
  "use strict";

  try {
    angular.module("risevision.common.config");
  } catch (err) {
    angular.module("risevision.common.config", []);
  }

  angular.module("risevision.common.components.plans.services", [
    "risevision.store.authorization",
    "risevision.common.gapi",
    "risevision.common.currency"
  ]);

  angular.module("risevision.common.components.plans", [
    "risevision.common.config",
    "risevision.common.components.plans.services",
    "risevision.common.components.purchase-flow",
    "risevision.common.components.scrolling-list",
    "risevision.common.components.loading",
    "ui.bootstrap"
  ]);

})(angular);

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
    .factory("currentPlanFactory", ["$log", "$rootScope", "$timeout", "userState", "PLANS_LIST",
      function ($log, $rootScope, $timeout, userState, PLANS_LIST) {
        var _factory = {};
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "productCode");

        var _loadCurrentPlan = function () {
          var company = userState.getCopyOfSelectedCompany();
          var plan = null;

          if (company.id && company.planProductCode) {
            plan = _.cloneDeep(_plansByCode[company.planProductCode]);

            plan.status = company.planSubscriptionStatus;
            plan.trialPeriod = company.planTrialPeriod;
            plan.currentPeriodEndDate = new Date(company.planCurrentPeriodEndDate);

          } else {
            plan = _.cloneDeep(_plansByType.free);
          }

          _factory.currentPlan = plan;

          plan.playerProTotalLicenseCount = company.playerProTotalLicenseCount;
          plan.playerProAvailableLicenseCount = company.playerProAvailableLicenseCount;

          plan.shareCompanyPlan = company.shareCompanyPlan;

          if (company.parentPlanProductCode) {
            plan.parentPlan = _.cloneDeep(_plansByCode[company.parentPlanProductCode]);
          }

          plan.isPurchasedByParent = !!company.planBillToId && !!company.planShipToId && (company.planBillToId !==
            company.planShipToId) && (_factory.isSubscribed() || _factory.isCancelledActive());
          plan.parentPlanCompanyName = company.parentPlanCompanyName;
          plan.parentPlanContactEmail = company.parentPlanContactEmail;

          $log.debug("Current plan", plan);
          $rootScope.$emit("risevision.plan.loaded", plan);
        };

        var _reloadCurrentPlan = function () {
          $log.debug("Reloading current plan");

          $timeout(function () {
            userState.reloadSelectedCompany()
              .then(_loadCurrentPlan)
              .catch(function (err) {
                $log.error("Error reloading plan information", err);
              })
              .finally(function () {
                $log.debug("Finished reloading current plan");
              });
          }, 10000);
        };

        _factory.isPlanActive = function () {
          return _factory.isSubscribed() || _factory.isOnTrial();
        };

        _factory.isFree = function () {
          return _factory.currentPlan.type === "free";
        };

        _factory.isParentPlan = function () {
          return !!_factory.currentPlan.parentPlan;
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

        _factory.isCancelled = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Cancelled";
        };

        _factory.isCancelledActive = function () {
          var now = new Date();

          return _factory.isCancelled() && (_factory.currentPlan.currentPeriodEndDate > now);
        };

        _loadCurrentPlan();

        $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
          _loadCurrentPlan();
        });

        $rootScope.$on("risevision.company.updated", function () {
          _loadCurrentPlan();
        });

        $rootScope.$on("chargebee.subscriptionChanged", function () {
          _reloadCurrentPlan();
        });

        $rootScope.$on("chargebee.subscriptionCancelled", function () {
          _reloadCurrentPlan();
        });

        return _factory;
      }
    ]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .value("PLANS_LIST", [{
      name: "Free",
      type: "free",
      order: 0,
      productId: "000",
      productCode: "000",
      status: "Active",
      proLicenseCount: 0,
      monthly: {
        priceDisplayMonth: 0,
        billAmount: 0,
        save: 0
      },
      yearly: {
        priceDisplayMonth: 0,
        priceDisplayYear: 0,
        billAmount: 0,
        save: 0
      }
    }, {
      name: "Volume",
      type: "volume",
      order: 1,
      productId: "2317",
      productCode: "34e8b511c4cc4c2affa68205cd1faaab427657dc",
      proLicenseCount: 3,
      monthly: {
        priceDisplayMonth: 10,
        billAmount: 10,
        save: 0
      },
      yearly: {
        priceDisplayMonth: 10,
        priceDisplayYear: 110,
        billAmount: 110,
        save: 10
      },
      trialPeriod: 14,
      discountIndustries: [
        "PRIMARY_SECONDARY_EDUCATION",
        "HIGHER_EDUCATION",
        "LIBRARIES",
        "PHILANTHROPY",
        "NON_PROFIT_ORGANIZATION_MANAGEMENT",
        "RELIGIOUS_INSTITUTIONS"
      ]
    }, {
      name: "Starter",
      type: "starter",
      order: 1,
      productId: "335",
      productCode: "019137f7bb35f5f90085a033c013672471faadae",
      proLicenseCount: 1,
      monthly: {
        priceDisplayMonth: 10,
        billAmount: 10,
        save: 0
      },
      yearly: {
        priceDisplayMonth: 10,
        priceDisplayYear: 110,
        billAmount: 110,
        save: 10
      },
      trialPeriod: 14
    }, {
      name: "Basic",
      type: "basic",
      order: 2,
      productId: "289",
      productCode: "40c092161f547f8f72c9f173cd8eebcb9ca5dd25",
      proLicenseCount: 3,
      monthly: {
        priceDisplayMonth: 9,
        billAmount: 27,
        save: 36
      },
      yearly: {
        priceDisplayMonth: 9,
        priceDisplayYear: 99,
        billAmount: 297,
        save: 63
      },
      trialPeriod: 14
    }, {
      name: "Advanced",
      type: "advanced",
      order: 3,
      productId: "290",
      productCode: "93b5595f0d7e4c04a3baba1102ffaecb17607bf4",
      proLicenseCount: 11,
      monthly: {
        priceDisplayMonth: 8,
        billAmount: 88,
        save: 264
      },
      yearly: {
        priceDisplayMonth: 8,
        priceDisplayYear: 88,
        billAmount: 968,
        save: 352
      },
      trialPeriod: 14
    }, {
      name: "Enterprise",
      type: "enterprise",
      order: 4,
      productId: "301",
      productCode: "b1844725d63fde197f5125b58b6cba6260ee7a57",
      proLicenseCount: 70,
      monthly: {
        priceDisplayMonth: 7,
        billAmount: 490,
        save: 2520
      },
      yearly: {
        priceDisplayMonth: 7,
        priceDisplayYear: 77,
        billAmount: 5390,
        save: 3010
      }
    }, {
      name: "Enterprise",
      type: "enterprisesub",
      order: 5,
      productId: "303",
      productCode: "d521f5bfbc1eef109481eebb79831e11c7804ad8",
      proLicenseCount: 0
    }])
    .factory("plansFactory", ["$q", "$log", "$modal", "$templateCache",
      "userState", "subscriptionStatusService", "storeAuthorization", "PLANS_LIST",
      function ($q, $log, $modal, $templateCache, userState,
        subscriptionStatusService, storeAuthorization, PLANS_LIST) {
        var _factory = {};
        var _plansCodesList = _.map(PLANS_LIST, "productCode");
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "productCode");
        var _plansList = [
          _plansByType.free, _plansByType.starter, _plansByType.basic, _plansByType.advanced, _plansByType.enterprise
        ];

        _factory.showPlansModal = function () {
          if (!_factory.isPlansModalOpen) {
            _factory.isPlansModalOpen = true;

            var $modalInstance = $modal.open({
              template: $templateCache.get("plans/plans-modal.html"),
              controller: "PlansModalCtrl",
              windowClass: "pricing-component-modal",
            });

            $modalInstance.result.finally(function () {
              _factory.isPlansModalOpen = false;
            });
          }
        };

        var _getCompanyPlanStatus = function () {
          $log.debug("getCompanyPlanStatus called.");

          return subscriptionStatusService.list(_plansCodesList.slice(1), userState.getSelectedCompanyId())
            .then(function (resp) {
              $log.debug("getCompanyPlanStatus response.", resp);

              var plansMap = _.keyBy(resp, "pc");

              return plansMap;
            });
        };

        _factory.getPlansDetails = function () {
          var plans = _.cloneDeep(_plansList);

          return _getCompanyPlanStatus()
            .then(function (plansStatusMap) {
              plans.forEach(function (p) {
                var plan = plansStatusMap[p.productCode] || p;
                p.status = plan.status;
                p.statusCode = plan.statusCode;
              });

              return plans;
            })
            .catch(function (err) {
              $log.debug("Failed to load plans", err);
            });
        };

        _factory.startTrial = function (plan) {
          return storeAuthorization.startTrial(plan.productCode)
            .then(function () {
              var selectedCompany = userState.getCopyOfSelectedCompany(true);
              var licenses = _plansByCode[plan.productCode].proLicenseCount;

              selectedCompany.planProductCode = plan.productCode;
              selectedCompany.planTrialPeriod = plan.trialPeriod;
              selectedCompany.planSubscriptionStatus = "Trial";
              selectedCompany.playerProTotalLicenseCount = licenses;
              selectedCompany.playerProAvailableLicenseCount = licenses;

              userState.updateCompanySettings(selectedCompany);
            })
            .catch(function (err) {
              $log.debug("Failed to start trial", err);

              throw err;
            });
        };

        _factory.startVolumePlanTrial = function () {
          return _factory.startTrial(_plansByType.volume);
        };

        return _factory;
      }
    ]);

})(angular);

angular.module("risevision.common.components.plans")
  .directive("rvOn", function () {
    return {
      restrict: "A",
      link: function (scope, element, attrs) {
        var attrVal = attrs.rvOn;
        var eventName = attrVal.split(":")[0];
        var ctrlFn = attrVal.split(":")[1];

        element.on(eventName, function (event) {
          scope.$apply(scope[ctrlFn].bind(null, scope, {
            $event: event
          }));
        });
      }
    };
  });

angular.module("risevision.common.components.plans")
  .controller("PlansModalCtrl", [
    "$scope", "$rootScope", "$modalInstance", "$log", "$loading", "$timeout", "getCompany",
    "plansFactory", "currentPlanFactory", "ChargebeeFactory", "userState", "purchaseFactory",
    "PLANS_LIST", "CHARGEBEE_PLANS_USE_PROD",
    function ($scope, $rootScope, $modalInstance, $log, $loading, $timeout, getCompany,
      plansFactory, currentPlanFactory, ChargebeeFactory, userState, purchaseFactory,
      PLANS_LIST, CHARGEBEE_PLANS_USE_PROD) {

      var volumePlan = PLANS_LIST.filter(function (plan) {
        return plan.name === "Volume";
      })[0];

      $scope.pricingAtLeastOneDisplay = true;
      $scope.currentPlan = currentPlanFactory.currentPlan;
      $scope.purchaseFactory = purchaseFactory;
      $scope.chargebeeFactory = new ChargebeeFactory();
      $scope.startTrialError = null;
      $scope.isMonthly = true;
      $scope.pricingComponentDiscount = false;
      $scope.useProductionChargebeeData = CHARGEBEE_PLANS_USE_PROD === "true";

      function _setPricingComponentDiscount() {
        var companyIndustry = userState.getCopyOfSelectedCompany().companyIndustry;

        $scope.pricingComponentDiscount = volumePlan
          .discountIndustries.indexOf(companyIndustry) >= 0;
      }

      function _getPlansDetails() {
        $loading.start("plans-modal");

        return plansFactory.getPlansDetails()
          .then(function (resp) {
            $scope.plans = resp;
          })
          .finally(function () {
            $loading.stop("plans-modal");
          });
      }

      function _showSubscriptionDetails() {
        var company = userState.getCopyOfSelectedCompany();

        $scope.chargebeeFactory.openSubscriptionDetails(company.id, company.planSubscriptionId);
      }

      $scope.isCurrentPlan = function (plan) {
        return $scope.currentPlan.type === plan.type;
      };

      $scope.isCurrentPlanSubscribed = function (plan) {
        return $scope.isCurrentPlan(plan) && $scope.isSubscribed(plan);
      };

      $scope.isOnTrial = function (plan) {
        return plan.statusCode === "on-trial";
      };

      $scope.isTrialAvailable = function (plan) {
        return plan.statusCode === "trial-available";
      };

      $scope.isTrialExpired = function (plan) {
        return plan.statusCode === "trial-expired";
      };

      $scope.isSubscribed = function (plan) {
        return plan.status === "Subscribed" || plan.status === "Active";
      };

      $scope.isFree = function (plan) {
        return plan.type === "free";
      };

      $scope.isStarter = function (plan) {
        return plan.type === "starter";
      };

      $scope.showSavings = function (plan) {
        return !$scope.isFree(plan) && (!$scope.isStarter(plan) || !$scope.isMonthly);
      };

      $scope.currentPlanLabelVisible = function (plan) {
        // Has a Plan?
        if (currentPlanFactory.isPlanActive()) {
          // Is it the Current Plan?
          return $scope.isCurrentPlan(plan);
        } else { // Were on Free Plan
          // Is it the Free Plan?
          return $scope.isFree(plan);
        }
      };

      $scope.getVisibleAction = function (plan) {
        // Has a Plan?
        if (currentPlanFactory.isPlanActive()) {
          // Is this that Plan?
          if ($scope.isCurrentPlan(plan)) {
            // Can buy Subscription?
            if ($scope.isOnTrial(plan)) {
              return "subscribe";
            } else {
              return "";
            }
          } else { // This is a different Plan
            // Is lower Plan?
            if ($scope.currentPlan.order > plan.order) {
              if (currentPlanFactory.isOnTrial() && !$scope.isFree(plan)) { // Does not have Chargebee account, use Purchase Flow
                return "downgrade";
              } else { // Already has Chargebee account, use Customer Portal
                return "downgrade-portal";
              }
            } else if (currentPlanFactory.isOnTrial()) { // Does not have Chargebee account, use Purchase Flow
              return "subscribe";
            } else { // Already has Chargebee account, use Customer Portal
              return "subscribe-portal";
            }
          }
        } else { // Were on Free Plan
          // Is there a Trial?
          if ($scope.isFree(plan)) {
            return "";
          } else if ($scope.isTrialAvailable(plan)) {
            return "start-trial";
          } else { // Subscribe using Purchase Flow
            return "subscribe";
          }
        }
      };

      $scope.startTrial = function (plan) {
        $loading.start("plans-modal");
        $scope.startTrialError = null;

        plansFactory.startTrial(plan)
          .then(function () {
            return $timeout(10000)
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
            $scope.startTrialError = err;
          })
          .finally(function () {
            $loading.stop("plans-modal");
          });
      };

      $scope.showPurchaseModal = function (plan, isMonthly) {
        purchaseFactory.showPurchaseModal(plan, isMonthly)
          .then($scope.dismiss);
      };

      $scope.downgradePortal = _showSubscriptionDetails;

      $scope.subscribePortal = _showSubscriptionDetails;

      $scope.purchaseAdditionalLicenses = _showSubscriptionDetails;

      $scope.isChargebee = function () {
        return userState.isSelectedCompanyChargebee();
      };

      $scope.refreshButton = function () {
        var component = document.querySelector("pricing-component");

        $scope.pricingAtLeastOneDisplay = component &&
          component.displayCount &&
          component.displayCount > 0;
      };

      $scope.dismissAndShowPurchaseModal = function () {
        var component = document.querySelector("pricing-component");

        var displays = component.displayCount;
        var period = component.period === "yearly" ? "Yearly" : "Monthly";
        var tierName = component.tierName;
        var s = displays > 1 ? "s" : "";
        var plan = "" + displays + " Display" + s + " (" + tierName + " Plan, " + period + ")";

        if (displays === 0 || displays === "0") {
          return;
        }

        $modalInstance.dismiss("cancel");
        $scope.showPurchaseModal({
          name: plan,
          productId: volumePlan.productId,
          productCode: volumePlan.productCode,
          displays: displays,
          yearly: {
            billAmount: component.priceTotal
          },
          monthly: {
            billAmount: component.priceTotal
          }
        }, component.period === "monthly");
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss("cancel");
      };

      $scope.init = function () {
        _getPlansDetails();
        _setPricingComponentDiscount();
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
  $templateCache.put('plans/plans-modal.html',
    '<div><button type="button" class="dismiss" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-lg fa-times"></i></button><h3 id="pricingComponentTitle" translate="">common-header.plans.pricing-component-title</h3><div id="pricingComponentContainer"><pricing-component ng-attr-apply-discount="{{pricingComponentDiscount ? \'\' : undefined}}" ng-attr-prod-env="{{useProductionChargebeeData ? \'\' : undefined}}" rv-on="display-count-changed:refreshButton"></pricing-component><button type="button" ng-disabled="!pricingAtLeastOneDisplay" ng-click="dismissAndShowPurchaseModal()" id="subscribeButton">I Want To Subscribe</button></div></div>');
}]);
})();
