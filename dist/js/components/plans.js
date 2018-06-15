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
    .factory("planFactory", ["$q", "$log", "$rootScope", "$modal", "$templateCache",
      "userState", "storeAPILoader", "currencyService", "subscriptionStatusService", "storeAuthorization",
      "PLANS_LIST",
      function ($q, $log, $rootScope, $modal, $templateCache, userState, storeAPILoader,
        currencyService, subscriptionStatusService, storeAuthorization, PLANS_LIST) {
        var _factory = {};
        var _plansCodesList = _.map(PLANS_LIST, "productCode");
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "productCode");
        var _plansList = [
          _plansByType.free, _plansByType.starter, _plansByType.basic, _plansByType.advanced, _plansByType.enterprise
        ];

        _factory.getPlansDetails = function () {
          return $q.resolve(_.cloneDeep(_plansList));
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

        function _loadCurrentPlan() {
          var company = userState.getCopyOfSelectedCompany();
          var plan = null;

          if (company.id && company.planProductCode) {
            plan = _.cloneDeep(_plansByCode[company.planProductCode]);
            plan.status = company.planSubscriptionStatus;
            plan.trialPeriod = company.planTrialPeriod;
            plan.proStatus = company.playerProSubscriptionStatus;
            plan.planPlayerProLicenseCount = company.planPlayerProLicenseCount;
            plan.playerProLicenseCount = company.playerProLicenseCount;
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

        _factory.getProLicenseCount = function () {
          var planActive = _factory.isSubscribed() || _factory.isOnTrial();
          var planProLicenses = (planActive && _factory.currentPlan.planPlayerProLicenseCount) || 0;
          var extraProLicenses = (_factory.isProSubscribed() && _factory.currentPlan.playerProLicenseCount) || 0;

          return planProLicenses + extraProLicenses;
        };

        _factory.areAllProLicensesUsed = function () {
          var company = userState.getCopyOfSelectedCompany();
          var maxProDisplays = _factory.getProLicenseCount();
          var assignedDisplays = company.playerProAssignedDisplays || [];

          return assignedDisplays.length >= maxProDisplays;
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

angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading", "$timeout", "$q",
  "planFactory", "currentPlan", "showRPPLink", "userState",
  function ($scope, $rootScope, $modalInstance, $log, $modal, $templateCache, $loading, $timeout, $q,
    planFactory, currentPlan, showRPPLink, userState) {

    $scope.currentPlan = currentPlan;
    $scope.startTrialError = null;
    $scope.showRPPLink = showRPPLink;
    $scope.monthlyPrices = true;

    function _getPlansDetails() {
      $loading.start("plans-modal");

      return $q.all([planFactory.getCompanyPlanStatus(), planFactory.getPlansDetails()])
        .then(function (resp) {
          var plansStatusMap = resp[0];

          $scope.plans = resp[1];
          $scope.plans.forEach(function (p) {
            var plan = plansStatusMap[p.productCode] || p;
            p.status = plan.status;
            p.statusCode = plan.statusCode;
          });
        })
        .catch(function (err) {
          $log.debug("Failed to load plans", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    }

    $scope.isCurrentPlan = function (plan) {
      return currentPlan.type === plan.type;
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
      return !$scope.isFree(plan) && (!$scope.isStarter(plan) || !$scope.monthlyPrices);
    };

    $scope.currentPlanLabelVisible = function (plan) {
      // Has a Plan?
      if (planFactory.isPlanActive()) {
        // Is it the Current Plan?
        return $scope.isCurrentPlan(plan);
      } else { // Were on Free Plan
        // Is it the Free Plan?
        return $scope.isFree(plan);
      }
    };

    $scope.getVisibleAction = function (plan) {
      // Has a Plan?
      if (planFactory.isPlanActive()) {
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
          if (currentPlan.order > plan.order) {
            return "downgrade";
          } else { // Higher Plan
            return "subscribe";
          }
        }
      } else { // Were on Free Plan
        // Is there a Trial?
        if ($scope.isFree(plan)) {
          return "";
        } else if ($scope.isTrialAvailable(plan)) {
          return "start-trial";
        } else { // Subscribe
          return "subscribe";
        }
      }
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      planFactory.startTrial(plan)
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
  $templateCache.put('plans/plans-modal.html',
    '<div rv-spinner="" rv-spinner-key="plans-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">common-header.plans.choose-plan</h3></div><div id="plans-modal" class="modal-body u_padding-lg" stop-event="touchend"><div class="text-center"><div class="btn-group" role="group" aria-label="..."><button ng-click="monthlyPrices = true" type="button" class="btn btn-default" ng-class="{ active: monthlyPrices }">Monthly</button> <button ng-click="monthlyPrices = false" type="button" class="btn btn-default" ng-class="{ active: !monthlyPrices }">Yearly</button></div><p class="u_padding-sm-vertical">Pay yearly, get one month free!</p></div><div class="pricing-table"><div id="planHeader" class="monthly"><div class="planColumn" ng-class="{ currentPlan: currentPlanLabelVisible(plan) }" ng-repeat="plan in plans"><div id="current-plan" class="currentPlanLabel" ng-show="currentPlanLabelVisible(plan)" translate="">common-header.plans.current</div><h2>{{plan.name}}</h2><h3 class="planColumnPrice" ng-show="!isFree(plan) && !isStarter(plan)"><span>$10</span>${{ monthlyPrices ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><h3 class="planColumnPrice" ng-show="isStarter(plan)">${{ monthlyPrices ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><p ng-show="!isFree(plan) && monthlyPrices" class="text-muted" translate="" translate-values="{ price: plan.monthly.billAmount }">common-header.plans.perDisplayBilledMonthly</p><p ng-show="!isFree(plan) && !monthlyPrices" class="text-muted" translate="" translate-values="{ price: plan.yearly.billAmount }">common-header.plans.perDisplayBilledYearly</p><div ng-show="!isFree(plan)"><h3>{{plan.proLicenseCount}}</h3><span ng-show="plan.proLicenseCount === 1" translate="">common-header.plans.displayIncluded</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.plans.displaysIncluded</span></div><p ng-show="showSavings(plan)" class="planSavings" translate="" translate-values="{ save: (monthlyPrices ? plan.monthly.save : plan.yearly.save) }">common-header.plans.saveEachYear</p><p ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" translate="">common-header.plans.needMoreDisplays</p><a ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" href="https://www.risevision.com/purchaseadditionaldisplaylicenses" target="_blank" translate="">common-header.plans.individual-licenses</a><p id="trial-days-remaining" class="small u_margin-sm-bottom" ng-show="isCurrentPlan(plan) && isOnTrial(plan)" translate="" translate-values="{ count: currentPlan.trialPeriod }">common-header.plans.days-left-trial</p><p class="small u_margin-sm-bottom text-danger" ng-show="isCurrentPlan(plan) && isTrialExpired(plan)" translate="">common-header.plans.trial-expired</p><a id="subscribe-plan" ng-show="getVisibleAction(plan) === \'subscribe\'" target="_blank" href="https://store.risevision.com/product/{{plan.productId}}" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="downgrade-plan" ng-show="getVisibleAction(plan) === \'downgrade\'" target="_blank" href="https://www.risevision.com/downgradeplan" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="start-trial-plan" ng-show="getVisibleAction(plan) === \'start-trial\'" target="_blank" ng-click="startTrial(plan)" class="btn btn-primary btn-block" translate="">common-header.plans.start-trial</a></div></div><div id="planFeatures"><div class="planFeatureColumn" id="planFreeFeatures"><h4 id="planFeatures" class="planFeatureColumnTitle" style="column-span: all;">You can use the following features for free on any of your displays!</h4><div class="planFeature"><p class="featureTitle">Text</p></div><div class="planFeature"><p class="featureTitle">Image by URL</p></div><div class="planFeature"><p class="featureTitle">Video by URL</p></div><div class="planFeature"><p class="featureTitle">RSS</p></div><div class="planFeature"><p class="featureTitle">Time & Date</p></div><div class="planFeature"><p class="featureTitle">HTML</p></div></div><div class="planFeatureColumn" id="planPaidFeatures"><h4 class="planFeatureColumnTitle" style="column-span: all;">Key Features Included With All Paid Plans <span class="u_padding-sm-vertical">Everything in \'Free\' +</span></h4><div class="planFeature"><p class="featureTitle">Image Slideshows</p></div><div class="planFeature"><p class="featureTitle">Video Playlists</p></div><div class="planFeature"><p class="featureTitle">Unlimited Image & Video File Storage</p></div><div class="planFeature"><p class="featureTitle">Pre-made Templates</p></div><div class="planFeature"><p class="featureTitle">Centralized Content Control</p></div><div class="planFeature"><p class="featureTitle">Scheduling</p></div><div class="planFeature"><p class="featureTitle">Google Calendar</p></div><div class="planFeature"><p class="featureTitle">Google Spreadsheet</p></div><div class="planFeature"><p class="featureTitle">Twitter</p></div><div class="planFeature"><p class="featureTitle">Web Pages</p></div><div class="planFeature"><p class="featureTitle">Google Reliability & Security</p></div><div class="planFeature"><p class="featureTitle">Account / Sub-Account Hierarchy</p></div><div class="planFeature"><p class="featureTitle">User Role Permissioning</p></div><div class="planFeature"><p class="featureTitle">Display Monitoring Notifications</p></div><div class="planFeature"><p class="featureTitle">Content Shows Offline</p></div><div class="planFeature"><p class="featureTitle">Alert Integration</p></div><div class="planFeature"><p class="featureTitle">Display On/Off Control</p></div><h4 class="text-center" style="column-span: all;"><a href="https://www.risevision.com/pricing" target="_blank">Learn More About Key Features</a></h4></div></div><div id="planFooter"></div></div><div class="text-center u_padding-sm-vertical"><h3><a href="https://www.risevision.com/contact-us" target="_blank">Questions? We can help!</a></h3><h3><a href="https://www.risevision.com/licensesubcompany" target="_blank">Need to license your Sub-Company?</a></h3></div></div><div class="modal-footer"></div></div>');
}]);
})();
