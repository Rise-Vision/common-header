"use strict";

angular.module("risevision.common.components.plans.services", [
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
      status: "Subscribed",
      priceMonth: 0,
      descriptionShort: "Design, distribute and manage your digital signage for free. Unlimited Displays, Companies and Users."
    }, {
      type: "basic",
      productId: "289",
      pc: "40c092161f547f8f72c9f173cd8eebcb9ca5dd25"
    }, {
      type: "advanced",
      productId: "290",
      pc: "93b5595f0d7e4c04a3baba1102ffaecb17607bf4"
    }, {
      type: "enterprise",
      productId: "301",
      pc: "b1844725d63fde197f5125b58b6cba6260ee7a57"
    }, {
      type: "enterprisesub",
      productId: "303",
      pc: "d521f5bfbc1eef109481eebb79831e11c7804ad8"
    }])
    .factory("planFactory", ["$q", "$log", "$rootScope", "$modal", "$templateCache", "userState", "storeAPILoader",
      "subscriptionStatusService", "currencyService", "PLANS_LIST",
      function ($q, $log, $rootScope, $modal, $templateCache, userState, storeAPILoader, subscriptionStatusService,
        currencyService, PLANS_LIST) {
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

                  plan.type = plan.name.toLowerCase().replace(" plan", "");
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

        _factory.getCompanyPlan = function (companyId) {
          $log.debug("getCompanyPlan called.");
          var deferred = $q.defer();

          subscriptionStatusService.list(_plansCodesList.slice(1), companyId)
            .then(function (resp) {
              $log.debug("getCompanyPlan response.", resp);

              // Use Free as default
              var subscribedPlan = _.cloneDeep(_plansByType.free);
              var plansMap = _.keyBy(resp, "pc");

              _plansCodesList.forEach(function (planCode) {
                var plan = plansMap[planCode];

                if (plan && ["Subscribed", "Suspended", "On Trial"].indexOf(plan.status) >= 0) {
                  subscribedPlan = plan;
                }
              });

              subscribedPlan.type = _plansByCode[subscribedPlan.pc].type;

              deferred.resolve(subscribedPlan);
            })
            .catch(function (err) {
              deferred.reject(err);
            });

          return deferred.promise;
        };

        _factory.showPlansModal = function () {
          $modal.open({
            template: $templateCache.get("plans/plans-modal.html"),
            controller: "PlansModalCtrl",
            size: "lg",
            resolve: {
              currentPlan: function () {
                return _factory.currentPlan;
              }
            }
          });
        };

        function _getSelectedCurrency() {
          return currencyService()
            .then(function (currency) {
              var company = userState.getCopyOfUserCompany();
              var country = (company && company.country) ? company.country : "";
              return currency.getByCountry(country);
            });
        }

        function _loadCurrentPlan() {
          if (userState.getSelectedCompanyId()) {
            _factory.getCompanyPlan(userState.getSelectedCompanyId())
              .then(function (plan) {
                _factory.currentPlan = plan;
                $log.debug("Current plan", plan);
                $rootScope.$emit("risevision.plan.loaded", plan);
              })
              .catch(function (err) {
                $log.debug("Failed to load company's plan", err);
              });
          }
        }

        _loadCurrentPlan();

        $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
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
  "$scope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading", "planFactory", "currentPlan",
  function ($scope, $modalInstance, $log, $modal, $templateCache, $loading, planFactory, currentPlan) {
    $scope.currentPlan = currentPlan;

    $scope.getPlansDetails = function () {
      $loading.start("plans-modal");

      return planFactory.getPlansDetails()
        .then(function (plans) {
          $scope.plans = plans;
        })
        .catch(function (err) {
          $log.debug("Failed to load details", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    };

    $scope.showDowngradeModal = function () {
      $modal.open({
        template: $templateCache.get("plans/plans-downgrade-modal.html"),
        controller: "PlansDowngradeModalCtrl",
        size: "md"
      });
    };

    $scope.canUpgrade = function (plan) {
      if (currentPlan.type === plan.type) {
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
      if (currentPlan.type === plan.type) {
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

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.getPlansDetails();
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
    '<div rv-spinner="" rv-spinner-key="plans-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title">Choose Your Plan</h3></div><div id="plans-modal" class="modal-body u_padding-lg" stop-event="touchend"><div class="grid-list row"><div class="col-xs-12 col-sm-6 col-md-3" ng-repeat="plan in plans"><div class="u_cursor_disabled panel panel-default"><div itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><div class="grid-list-text text-center"><h4 id="productName">{{plan.name}}</h4><p class="product-description">{{plan.descriptionShort}}</p><div><h1>${{plan.priceMonth}}</h1>&nbsp;per Company per Month</div><a id="current-plan" ng-show="currentPlan.type === plan.type" target="_blank" class="cta_button btn btn-white u_margin-lg">Current Plan</a> <a id="subscribe-plan" ng-show="canUpgrade(plan)" target="_blank" href="https://store.risevision.com/product/{{plan.productId}}" class="cta_button btn btn-primary u_margin-lg">Subscribe</a> <a id="downgrade-plan" ng-show="canDowngrade(plan)" ng-click="showDowngradeModal()" class="cta_button btn btn-default u_margin-lg">Downgrade</a></div></div></div></div></div><div class="text-center u_margin-md-top"><a class="btn btn-link btn-lg get-started-guide" target="_blank" href="https://www.risevision.com/pricing?utm_campaign=apps">Learn More About Our Plan Pricing</a> <span class="bold">OR</span> <a class="btn btn-link btn-lg get-started-guide" target="_blank" href="https://www.risevision.com/contact-us">Contact Sales If You Need Help</a></div></div><div class="modal-footer"></div></div>');
}]);
})();
