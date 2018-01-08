(function (angular) {

  "use strict";
  angular.module("risevision.common.plan", [
    "risevision.common.gapi"
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
    .factory("planFactory", ["$q", "$log", "storeAPILoader", "subscriptionStatusService", "PLANS_LIST",
      function ($q, $log, storeAPILoader, subscriptionStatusService, PLANS_LIST) {
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
              resp.items.forEach(function (plan) {
                var monthKey = "per Company per Month";
                var priceMap = _.keyBy(plan.pricing, "unit");

                plan.type = plan.name.toLowerCase().replace(" plan", "");
                plan.priceMonth = priceMap[monthKey] && priceMap[monthKey].priceUSD;
              });

              var planMap = _.keyBy(resp.items, "type");

              // Add free plan, since it's not returned by the service
              deferred.resolve([_plansByType.free, planMap.basic, planMap.advanced, planMap.enterprise]);
            })
            .catch(function (err) {
              deferred.reject(err);
            });

          return deferred.promise;
        };

        _factory.getCompanyPlan = function (companyId) {
          $log.debug("getCompanyPlan called.");
          var deferred = $q.defer();

          subscriptionStatusService.list(_plansCodesList, companyId)
            .then(function (resp) {
              $log.debug("getCompanyPlan response.", resp);

              // Use Free as default
              var subscribedPlan = _plansByType.free;
              var itemMap = _.keyBy(resp, "pc");

              _plansCodesList.forEach(function (planCode) {
                if (itemMap[planCode] &&
                  (itemMap[planCode].subscribed || itemMap[planCode].status === "Suspended")) {
                  subscribedPlan = itemMap[planCode];
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

        return _factory;
      }
    ]);

})(angular);
