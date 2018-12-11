"use strict";

angular.module("risevision.common.components.plans.services", [
  "risevision.store.authorization",
  "risevision.common.gapi",
  "risevision.common.currency"
]);

angular.module("risevision.common.components.plans", [
  "risevision.common.components.plans.services",
  "risevision.common.components.purchase-flow",
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

          plan.playerProTotalLicenseCount = company.playerProTotalLicenseCount;
          plan.playerProAvailableLicenseCount = company.playerProAvailableLicenseCount;

          plan.shareCompanyPlan = company.shareCompanyPlan;

          if (company.parentPlanProductCode) {
            plan.parentPlan = _.cloneDeep(_plansByCode[company.parentPlanProductCode]);
            plan.parentPlan.companyName = company.parentPlanCompanyName;
            plan.parentPlan.contactEmail = company.parentPlanContactEmail;
          }

          _factory.currentPlan = plan;
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

        _factory.showPlansModal = function (warningText) {
          $modal.open({
            template: $templateCache.get("plans/plans-modal.html"),
            controller: "PlansModalCtrl",
            size: "lg",
            resolve: {
              warningText: function () {
                return warningText;
              }
            }
          });
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

              selectedCompany.planProductCode = plan.productCode;
              selectedCompany.planTrialPeriod = plan.trialPeriod;
              selectedCompany.planSubscriptionStatus = "Trial";
              selectedCompany.playerProTotalLicenseCount = _plansByCode[plan.productCode].proLicenseCount;
              selectedCompany.playerProAvailableLicenseCount = _plansByCode[plan.productCode].proLicenseCount;

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

        return _factory;
      }
    ]);

})(angular);

angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$loading", "$timeout",
  "plansFactory", "currentPlanFactory", "chargebeeFactory", "userState", "purchaseFactory",
  "warningText",
  function ($scope, $rootScope, $modalInstance, $log, $loading, $timeout,
    plansFactory, currentPlanFactory, chargebeeFactory, userState, purchaseFactory,
    warningText) {

    $scope.currentPlan = currentPlanFactory.currentPlan;
    $scope.purchaseFactory = purchaseFactory;
    $scope.startTrialError = null;
    $scope.isMonthly = true;
    $scope.warningText = warningText;

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

      chargebeeFactory.openSubscriptionDetails(company.id, company.planSubscriptionId);
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
  $templateCache.put('plans/plans-modal.html',
    '<div rv-spinner="" rv-spinner-key="plans-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title p-3 ml-2" translate="">common-header.plans.choose-plan</h3></div><div id="plans-modal" class="modal-body u_padding-lg" stop-event="touchend"><div class="alert bg-warning p-4 text-center my-2" ng-show="warningText" translate="">{{warningText}}</div><div class="text-center"><div class="btn-group" role="group" aria-label="..."><button ng-click="isMonthly = true" type="button" class="btn btn-default" ng-class="{ active: isMonthly }">Monthly</button> <button ng-click="isMonthly = false" type="button" class="btn btn-default" ng-class="{ active: !isMonthly }">Yearly</button></div><p class="u_padding-sm-vertical">Pay yearly, get one month free!</p></div><div class="pricing-table"><div id="planHeader" class="monthly"><div class="planColumn" ng-class="{ currentPlan: currentPlanLabelVisible(plan) }" ng-repeat="plan in plans"><div id="current-plan" class="currentPlanLabel" ng-show="currentPlanLabelVisible(plan)" translate="">common-header.plans.current</div><h2>{{plan.name}}</h2><h3 class="planColumnPrice" ng-show="!isFree(plan) && !isStarter(plan)"><span>$10</span>${{ isMonthly ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><h3 class="planColumnPrice" ng-show="isStarter(plan)">${{ isMonthly ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><p ng-show="!isFree(plan) && isMonthly" class="text-muted" translate="" translate-values="{ price: plan.monthly.billAmount }">common-header.plans.perDisplayBilledMonthly</p><p ng-show="!isFree(plan) && !isMonthly" class="text-muted" translate="" translate-values="{ price: plan.yearly.billAmount }">common-header.plans.perDisplayBilledYearly</p><div ng-show="!isFree(plan)"><h3>{{plan.proLicenseCount}}</h3><span ng-show="plan.proLicenseCount === 1" translate="">common-header.plans.displayIncluded</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.plans.displaysIncluded</span></div><p ng-show="showSavings(plan)" class="planSavings" translate="" translate-values="{ save: (isMonthly ? plan.monthly.save : plan.yearly.save) }">common-header.plans.saveEachYear</p><p ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" translate="">common-header.plans.needMoreDisplays</p><a ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan) && !isChargebee()" href="https://www.risevision.com/purchaseadditionaldisplaylicenses" target="_blank" translate="">common-header.plans.individual-licenses</a> <a ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan) && isChargebee()" href="#" ng-click="purchaseAdditionalLicenses(plan)" translate="">common-header.plans.individual-licenses</a><p id="trial-days-remaining" class="small u_margin-sm-bottom text-subtle" ng-show="isCurrentPlan(plan) && isOnTrial(plan)" translate="" translate-values="{ count: currentPlan.trialPeriod }">common-header.plans.days-left-trial</p><p class="small u_margin-sm-bottom text-danger" ng-show="isCurrentPlan(plan) && isTrialExpired(plan)" translate="">common-header.plans.trial-expired</p><a id="subscribe-plan" ng-if="!isChargebee()" ng-show="getVisibleAction(plan).indexOf(\'subscribe\') === 0" target="_blank" href="https://store.risevision.com/product/{{plan.productId}}" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="subscribe-plan-cb" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'subscribe\'" ng-click="showPurchaseModal(plan, isMonthly)" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="subscribe-plan-cbp" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'subscribe-portal\'" ng-click="subscribePortal(plan)" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="downgrade-plan" ng-if="!isChargebee()" ng-show="getVisibleAction(plan).indexOf(\'downgrade\') === 0" target="_blank" href="https://www.risevision.com/downgradeplan" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="downgrade-plan-cb" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'downgrade\'" ng-click="showPurchaseModal(plan, isMonthly)" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="downgrade-plan-cbp" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'downgrade-portal\'" ng-click="downgradePortal(plan)" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="start-trial-plan" ng-show="getVisibleAction(plan) === \'start-trial\'" target="_blank" ng-click="startTrial(plan)" class="btn btn-primary btn-block" translate="">common-header.plans.start-trial</a></div></div><div id="planFeatures"><div class="planFeatureColumn" id="planFreeFeatures"><h4 id="planFeatures" class="planFeatureColumnTitle" style="column-span: all;">You can use the following features for free on any of your displays!</h4><div class="planFeature"><p class="featureTitle">Text</p></div><div class="planFeature"><p class="featureTitle">Image by URL</p></div><div class="planFeature"><p class="featureTitle">Video by URL</p></div><div class="planFeature"><p class="featureTitle">RSS</p></div><div class="planFeature"><p class="featureTitle">Time & Date</p></div><div class="planFeature"><p class="featureTitle">HTML</p></div></div><div class="planFeatureColumn" id="planPaidFeatures"><h4 class="planFeatureColumnTitle" style="column-span: all;">Key Features Included With All Paid Plans <span class="u_padding-sm-vertical">Everything in \'Free\' +</span></h4><div class="planFeature"><p class="featureTitle">Image Slideshows</p></div><div class="planFeature"><p class="featureTitle">Video Playlists</p></div><div class="planFeature"><p class="featureTitle">Unlimited Image & Video File Storage</p></div><div class="planFeature"><p class="featureTitle">Pre-made Templates</p></div><div class="planFeature"><p class="featureTitle">Centralized Content Control</p></div><div class="planFeature"><p class="featureTitle">Scheduling</p></div><div class="planFeature"><p class="featureTitle">Google Calendar</p></div><div class="planFeature"><p class="featureTitle">Google Spreadsheet</p></div><div class="planFeature"><p class="featureTitle">Twitter</p></div><div class="planFeature"><p class="featureTitle">Web Pages</p></div><div class="planFeature"><p class="featureTitle">Google Reliability & Security</p></div><div class="planFeature"><p class="featureTitle">Account / Sub-Account Hierarchy</p></div><div class="planFeature"><p class="featureTitle">User Role Permissioning</p></div><div class="planFeature"><p class="featureTitle">Display Monitoring Notifications</p></div><div class="planFeature"><p class="featureTitle">Content Shows Offline</p></div><div class="planFeature"><p class="featureTitle">Alert Integration</p></div><div class="planFeature"><p class="featureTitle">Display On/Off Control</p></div><h4 class="text-center" style="column-span: all;"><a href="https://www.risevision.com/pricing" target="_blank">Learn More About Key Features</a></h4></div></div><div id="planFooter"></div></div><div class="alert bg-info p-4 text-center my-2" ng-show="currentPlan.parentPlan">By subscribing to a Plan on this Sub-Company, you will no longer share Display Licenses with your Parent Company. Your Licensed Displays will use the licenses included with the new Plan.</div><div class="alert bg-info p-4 text-center my-2" ng-show="currentPlan.shareCompanyPlan && !currentPlan.parentPlan">Your Plan and Displays Licenses can be used on any of your Displays and any Display across all your Sub-Companies.</div><div class="text-center p-4"><a class="font-weight-bold" href="https://www.risevision.com/contact-us" target="_blank">Questions? We can help!</a></div></div></div>');
}]);
})();
