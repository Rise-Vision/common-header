(function (angular) {

  "use strict";
  angular.module("risevision.common.plan", [
    "risevision.common.gapi",
    "risevision.common.currency"
  ])
    .value("PLANS_LIST", [{
      name: "Free",
      type: "free",
      productId: "000",
      pc: "000",
      status: "Subscribed",
      priceMonth: 0,
      descriptionShort: "Get Rise Storage, Embedded Presentations, and Template Library for one great price."
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
    }])
    .factory("planFactory", ["$q", "$log", "userState", "storeAPILoader", "subscriptionStatusService",
      "currencyService", "PLANS_LIST",
      function ($q, $log, userState, storeAPILoader, subscriptionStatusService, currencyService, PLANS_LIST) {
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
                console.log("CURRENCY", currency);
                resp.items.forEach(function (plan) {
                  var monthKey = "per Company per Month";
                  var priceMap = _.keyBy(plan.pricing, "unit");
                  var price = priceMap[monthKey] || {};

                  plan.type = plan.name.toLowerCase().replace(" plan", "");
                  plan.priceMonth = currency.pickPrice(price.priceUSD, price.priceCAD);
                });

                var planMap = _.keyBy(resp.items, "type");

                // Add free plan, since it's not returned by the service
                deferred.resolve([_plansByType.free, planMap.basic, planMap.advanced, planMap.enterprise]);
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
              var subscribedPlan = _plansByType.free;
              var plansMap = _.keyBy(resp, "pc");

              _plansCodesList.forEach(function (planCode) {
                if (plansMap[planCode] && ["Subscribed", "Suspended", "On Trial"].indexOf(plansMap[planCode].status) >=
                  0) {
                  subscribedPlan = plansMap[planCode];
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

        function _getSelectedCurrency() {
          return currencyService()
            .then(function (currency) {
              var company = userState.getCopyOfUserCompany();
              var country = (company && company.country) ? company.country : "";
              return currency.getByCountry(country);
            });
        }

        return _factory;
      }
    ]);

})(angular);
