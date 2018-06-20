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
    .factory("currentPlanFactory", ["$log", "$rootScope", "userState", "PLANS_LIST",
      function ($log, $rootScope, userState, PLANS_LIST) {
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
            plan.proStatus = company.playerProSubscriptionStatus;
            plan.planPlayerProLicenseCount = company.planPlayerProLicenseCount;
            plan.playerProLicenseCount = company.playerProLicenseCount;
          } else {
            plan = _.cloneDeep(_plansByType.free);
          }

          _factory.currentPlan = plan;
          $log.debug("Current plan", plan);
          $rootScope.$emit("risevision.plan.loaded", plan);
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

        _factory.isCancelled = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Cancelled";
        };

        _factory.isProSubscribed = function () {
          return _factory.currentPlan.proStatus === "Active";
        };

        _factory.isProSuspended = function () {
          return _factory.currentPlan.proStatus === "Suspended";
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
          $modal.open({
            template: $templateCache.get("plans/plans-modal.html"),
            controller: "PlansModalCtrl",
            size: "lg"
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

        return _factory;
      }
    ]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .factory("playerLicenseFactory", ["userState", "currentPlanFactory",
      function (userState, currentPlanFactory) {
        var _factory = {};

        _factory.hasProfessionalLicenses = function () {
          return currentPlanFactory.isPlanActive() || currentPlanFactory.isProSubscribed();
        };

        _factory.getProLicenseCount = function () {
          var planProLicenses = (currentPlanFactory.isPlanActive() && currentPlanFactory.currentPlan.planPlayerProLicenseCount) ||
            0;
          var extraProLicenses = (currentPlanFactory.isProSubscribed() && currentPlanFactory.currentPlan.playerProLicenseCount) ||
            0;

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

        return _factory;
      }
    ]);

})(angular);

angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$loading", "$timeout",
  "plansFactory", "currentPlanFactory", "userState",
  function ($scope, $rootScope, $modalInstance, $log, $loading, $timeout,
    plansFactory, currentPlanFactory, userState) {

    $scope.currentPlan = currentPlanFactory.currentPlan;
    $scope.startTrialError = null;
    $scope.monthlyPrices = true;

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
      return !$scope.isFree(plan) && (!$scope.isStarter(plan) || !$scope.monthlyPrices);
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

      plansFactory.startTrial(plan)
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
  $templateCache.put('plans/checkout-billing-address.html',
    '<div id="content-two" class="prototype-show" style="display: none; padding: 0 180px;"><h3>Content Two</h3></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-payment-methods.html',
    '<div id="content-four" class="prototype-show" style="display: none; padding: 0 180px;"><h3>Content Four</h3></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-review-purchase.html',
    '<div id="content-five" class="prototype-show" style="display: none; padding: 0 180px;"><h3>Content Five</h3></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-shipping-address.html',
    '<div id="content-three" class="prototype-show" style="display: none; padding: 0 180px;"><h3>Content Three</h3></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-subscriptions.html',
    '<div id="content-one" class="prototype-show prototype-show-ready"><h3>Basic Plan</h3><div class="row"><div class="col-sm-4 col-xs-12"><div class="panel text-center u_padding-md"><p style="font-size: 62px;line-height: 1;">$10</p><span>per Display<br>per Month</span></div></div><div class="col-sm-4 col-xs-12 bordered-right"><div class="text-center u_padding-md"><p style="font-size: 62px;line-height: 1;">1</p><span>Display Included</span></div></div><div class="col-sm-4 col-xs-12 text-center u_margin-md-top"><p>All Free & Paid<br>Features Included</p><a href="#">View Plan Details</a></div></div><hr><style>\n' +
    '    .spinner {\n' +
    '      /* width: 100px; */\n' +
    '    }\n' +
    '\n' +
    '    .spinner input {\n' +
    '      text-align: right;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical {\n' +
    '      position: relative;\n' +
    '      white-space: nowrap;\n' +
    '      width: 1%;\n' +
    '      vertical-align: middle;\n' +
    '      display: table-cell;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical>.btn {\n' +
    '      display: block;\n' +
    '      float: none;\n' +
    '      width: 100%;\n' +
    '      max-width: 100%;\n' +
    '      padding: 8px;\n' +
    '      margin-left: -1px;\n' +
    '      position: relative;\n' +
    '      border-radius: 0;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical>.btn:first-child {\n' +
    '      border-top-left-radius: 4px;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical>.btn:last-child {\n' +
    '      margin-top: -2px;\n' +
    '      border-bottom-left-radius: 4px;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical i {\n' +
    '      position: absolute;\n' +
    '      top: 0;\n' +
    '      left: 4px;\n' +
    '    }\n' +
    '    .radio label {\n' +
    '    padding: 5px 0 5px 30px;\n' +
    '    }\n' +
    '\n' +
    '  </style><div class="row"><div class="col-xs-12">Need more Displays than Basic Plan offers?<label class="label" style="color: #020622;">($9 per Display)</label><br><br></div><div class="col-xs-12"><div class="input-group spinner" style="border-radius: 4px !important;"><div class="input-group-btn-vertical"><button class="btn btn-white" type="button"><i class="fa fa-caret-up"></i></button> <button class="btn btn-white" type="button"><i class="fa fa-caret-down"></i></button></div><input type="text" class="form-control" value="2" style="width: 50px; font-size: 18px; border-radius: 4px; text-align: center;"> <span class="icon-right u_margin-md-top" style="vertical-align: -webkit-baseline-middle;">additional Display licenses added to your purchase.</span></div></div><div class="col-xs-12"><hr></div><div class="col-xs-12"><div class="text-right"><div class="label" style="color: #020622;">Pay yearly, get one month free!</div></div><div class="panel u_padding-md" style="padding: 0 26px;"><div class="radio" style="background: aliceblue"><label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked=""> $27 billed monthly</label></div><div class="radio"><label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"> $267 billed yearly</label> <label style="border: 1px solid #1fbc52; padding: 0px 12px; float: right; color: #1fbc52; cursor: default; top: 3px; position: relative;">Save $54!</label></div></div></div></div><div class="col-xs-12"><button id="" class="btn btn-primary btn-lg" style="float: right">Next</button></div></div>');
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
    '<div rv-spinner="" rv-spinner-key="plans-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 id="modalTitle" class="modal-title" translate="">common-header.plans.choose-plan</h3></div><div id="plans-modal" class="modal-body u_padding-lg" stop-event="touchend"><div class="text-center"><div class="btn-group" role="group" aria-label="..."><button ng-click="monthlyPrices = true" type="button" class="btn btn-default" ng-class="{ active: monthlyPrices }">Monthly</button> <button ng-click="monthlyPrices = false" type="button" class="btn btn-default" ng-class="{ active: !monthlyPrices }">Yearly</button></div><p class="u_padding-sm-vertical">Pay yearly, get one month free!</p></div><div class="pricing-table"><div id="planHeader" class="monthly"><div class="planColumn" ng-class="{ currentPlan: currentPlanLabelVisible(plan) }" ng-repeat="plan in plans"><div id="current-plan" class="currentPlanLabel" ng-show="currentPlanLabelVisible(plan)" translate="">common-header.plans.current</div><h2>{{plan.name}}</h2><h3 class="planColumnPrice" ng-show="!isFree(plan) && !isStarter(plan)"><span>$10</span>${{ monthlyPrices ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><h3 class="planColumnPrice" ng-show="isStarter(plan)">${{ monthlyPrices ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><p ng-show="!isFree(plan) && monthlyPrices" class="text-muted" translate="" translate-values="{ price: plan.monthly.billAmount }">common-header.plans.perDisplayBilledMonthly</p><p ng-show="!isFree(plan) && !monthlyPrices" class="text-muted" translate="" translate-values="{ price: plan.yearly.billAmount }">common-header.plans.perDisplayBilledYearly</p><div ng-show="!isFree(plan)"><h3>{{plan.proLicenseCount}}</h3><span ng-show="plan.proLicenseCount === 1" translate="">common-header.plans.displayIncluded</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.plans.displaysIncluded</span></div><p ng-show="showSavings(plan)" class="planSavings" translate="" translate-values="{ save: (monthlyPrices ? plan.monthly.save : plan.yearly.save) }">common-header.plans.saveEachYear</p><p ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" translate="">common-header.plans.needMoreDisplays</p><a ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" href="https://www.risevision.com/purchaseadditionaldisplaylicenses" target="_blank" translate="">common-header.plans.individual-licenses</a><p id="trial-days-remaining" class="small u_margin-sm-bottom" ng-show="isCurrentPlan(plan) && isOnTrial(plan)" translate="" translate-values="{ count: currentPlan.trialPeriod }">common-header.plans.days-left-trial</p><p class="small u_margin-sm-bottom text-danger" ng-show="isCurrentPlan(plan) && isTrialExpired(plan)" translate="">common-header.plans.trial-expired</p><a id="subscribe-plan" ng-show="getVisibleAction(plan) === \'subscribe\'" x="" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="downgrade-plan" ng-show="getVisibleAction(plan) === \'downgrade\'" target="_blank" href="https://www.risevision.com/downgradeplan" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="start-trial-plan" ng-show="getVisibleAction(plan) === \'start-trial\'" target="_blank" ng-click="startTrial(plan)" class="btn btn-primary btn-block" translate="">common-header.plans.start-trial</a></div></div><div id="planFeatures"><div class="planFeatureColumn" id="planFreeFeatures"><h4 id="planFeatures" class="planFeatureColumnTitle" style="column-span: all;">You can use the following features for free on any of your displays!</h4><div class="planFeature"><p class="featureTitle">Text</p></div><div class="planFeature"><p class="featureTitle">Image by URL</p></div><div class="planFeature"><p class="featureTitle">Video by URL</p></div><div class="planFeature"><p class="featureTitle">RSS</p></div><div class="planFeature"><p class="featureTitle">Time & Date</p></div><div class="planFeature"><p class="featureTitle">HTML</p></div></div><div class="planFeatureColumn" id="planPaidFeatures"><h4 class="planFeatureColumnTitle" style="column-span: all;">Key Features Included With All Paid Plans <span class="u_padding-sm-vertical">Everything in \'Free\' +</span></h4><div class="planFeature"><p class="featureTitle">Image Slideshows</p></div><div class="planFeature"><p class="featureTitle">Video Playlists</p></div><div class="planFeature"><p class="featureTitle">Unlimited Image & Video File Storage</p></div><div class="planFeature"><p class="featureTitle">Pre-made Templates</p></div><div class="planFeature"><p class="featureTitle">Centralized Content Control</p></div><div class="planFeature"><p class="featureTitle">Scheduling</p></div><div class="planFeature"><p class="featureTitle">Google Calendar</p></div><div class="planFeature"><p class="featureTitle">Google Spreadsheet</p></div><div class="planFeature"><p class="featureTitle">Twitter</p></div><div class="planFeature"><p class="featureTitle">Web Pages</p></div><div class="planFeature"><p class="featureTitle">Google Reliability & Security</p></div><div class="planFeature"><p class="featureTitle">Account / Sub-Account Hierarchy</p></div><div class="planFeature"><p class="featureTitle">User Role Permissioning</p></div><div class="planFeature"><p class="featureTitle">Display Monitoring Notifications</p></div><div class="planFeature"><p class="featureTitle">Content Shows Offline</p></div><div class="planFeature"><p class="featureTitle">Alert Integration</p></div><div class="planFeature"><p class="featureTitle">Display On/Off Control</p></div><h4 class="text-center" style="column-span: all;"><a href="https://www.risevision.com/pricing" target="_blank">Learn More About Key Features</a></h4></div></div><div id="planFooter"></div></div><div class="text-center u_padding-sm-vertical"><h3><a href="https://www.risevision.com/contact-us" target="_blank">Questions? We can help!</a></h3><h3><a href="https://www.risevision.com/licensesubcompany" target="_blank">Need to license your Sub-Company?</a></h3></div></div><style>\n' +
    '  .progress-bar-step {\n' +
    '    cursor: pointer;\n' +
    '  }\n' +
    '  \n' +
    '  .progress-bar-step p {\n' +
    '    text-align: center;\n' +
    '    position: relative;\n' +
    '    top: -39px;\n' +
    '    margin: 0;\n' +
    '    font-size: 13px;\n' +
    '    color: #a2a2a2;\n' +
    '  }\n' +
    '\n' +
    '  .progress-bar-step--active p {\n' +
    '    color: #4ab766;\n' +
    '  }\n' +
    '\n' +
    '  .progress-bar-step--complete {\n' +
    '    background-color: #a4dbff !important;\n' +
    '  }\n' +
    '\n' +
    '  .progress-bar-step--complete p {\n' +
    '    color: #a4dbff;\n' +
    '  }\n' +
    '\n' +
    '  .progress-bar-step--complete p::before {\n' +
    '    content: "\\f00c";\n' +
    '    margin-right: 4px;\n' +
    '    font-family: FontAwesome;\n' +
    '    font-style: normal;\n' +
    '    font-weight: normal;\n' +
    '    text-decoration: inherit;\n' +
    '  }\n' +
    '\n' +
    '  .bordered-right {\n' +
    '    border-right: 1px solid #DDD;\n' +
    '    \n' +
    '  }\n' +
    '  @media (max-width: 768px) {\n' +
    '    .bordered-right {\n' +
    '      border-right: 0;\n' +
    '    }\n' +
    '		}\n' +
    '</style><div id="checkout-modal" class="modal-body u_padding-lg" stop-event="touchend"><div class="app-launcher-wizard_progress-bar hidden-sm hidden-xs" style="padding-top: 32px;"><div id="step-one" class="progress-bar-step progress-bar-step--active"><p>Subscriptions</p></div><div id="step-two" class="progress-bar-step"><p>Billing Address</p></div><div id="step-three" class="progress-bar-step"><p>Shipping Address</p></div><div id="step-four" class="progress-bar-step"><p>Payment Methods</p></div><div id="step-five" class="progress-bar-step"><p>Purchase Review</p></div></div><div ng-include="\'plans/checkout-subscriptions.html\'"></div><div ng-include="\'plans/checkout-billing-address.html\'"></div><div ng-include="\'plans/checkout-shipping-address.html\'"></div><div ng-include="\'plans/checkout-payment-methods.html\'"></div><div ng-include="\'plans/checkout-review-purchase.html\'"></div></div><div class="modal-footer"></div><script>\n' +
    '  //SETUP\n' +
    '  $(document).ready(function () {\n' +
    '    $(".prototype-show").hide();\n' +
    '    $(".prototype-show-ready").show();\n' +
    '\n' +
    '    //SPINNER doesnt work\n' +
    '    (function ($) {\n' +
    '      $(\'.spinner .btn:first-of-type\').on(\'click\', function () {\n' +
    '        $(\'.spinner input\').val(parseInt($(\'.spinner input\').val(), 10) + 1);\n' +
    '      });\n' +
    '      $(\'.spinner .btn:last-of-type\').on(\'click\', function () {\n' +
    '        $(\'.spinner input\').val(parseInt($(\'.spinner input\').val(), 10) - 1);\n' +
    '      });\n' +
    '    })(jQuery);\n' +
    '  });\n' +
    '\n' +
    '  //CYCLE\n' +
    '  $(document).on("click", "#step-one", function () {\n' +
    '    $(".prototype-show").hide();\n' +
    '    $("#content-one").show();\n' +
    '  });\n' +
    '  $(document).on("click", "#step-two", function () {\n' +
    '    $(".prototype-show").hide();\n' +
    '    $("#content-two").show();\n' +
    '  });\n' +
    '  $(document).on("click", "#step-three", function () {\n' +
    '    $(".prototype-show").hide();\n' +
    '    $("#content-three").show();\n' +
    '  });\n' +
    '  $(document).on("click", "#step-four", function () {\n' +
    '    $(".prototype-show").hide();\n' +
    '    $("#content-four").show();\n' +
    '  });\n' +
    '  $(document).on("click", "#step-five", function () {\n' +
    '    $(".prototype-show").hide();\n' +
    '    $("#content-five").show();\n' +
    '  });\n' +
    '\n' +
    '  // STEP THROUGH CHECKOUT NAV \n' +
    '  $(document).on("click", ".progress-bar-step", function () {\n' +
    '    var target = $(this);\n' +
    '    $(".progress-bar-step").removeClass("progress-bar-step--active");\n' +
    '    $(this).removeClass("progress-bar-step--complete");\n' +
    '    $(this).addClass("progress-bar-step--active");\n' +
    '    $(this).prevAll().addClass("progress-bar-step--complete");\n' +
    '  });\n' +
    '\n' +
    '  $(\'input:radio[name="optionsRadios"]\').change(\n' +
    '    function(){\n' +
    '        if ($(this).is(\':checked\')) {\n' +
    '          $(this).parent(".radio").css( "background", "aliceblue" );\n' +
    '        }\n' +
    '        else {\n' +
    '          $(this).parent(".radio").css( "background", "white" );\n' +
    '        }\n' +
    '    });\n' +
    '\n' +
    '  //CONTROL MODAL\n' +
    '  $(document).on("click", "#subscribe-plan", function () {\n' +
    '    $("#plans-modal").hide();\n' +
    '    $("#checkout-modal").show();\n' +
    '\n' +
    '    $("h3#modalTitle").text("Checkout");\n' +
    '\n' +
    '    $(".modal-dialog").removeClass("modal-lg");\n' +
    '    $(".modal-dialog").addClass("modal-md");\n' +
    '  });\n' +
    '</script></div>');
}]);
})();
