(function (angular) {

  "use strict";
  angular.module("risevision.common.plan", [
    "risevision.common.gapi"
  ])
    .value("FREE_PLAN_ID", "000")
    .value("FREE_PLAN_CODE", "000")
    .value("FREE_PLAN_DESCRIPTION",
      "Get Rise Storage, Embedded Presentations, and Template Library for one great price.")
    .value("BASIC_PLAN_ID", "289")
    .value("BASIC_PLAN_CODE", "40c092161f547f8f72c9f173cd8eebcb9ca5dd25")
    .value("ADVANCED_PLAN_ID", "290")
    .value("ADVANCED_PLAN_CODE", "93b5595f0d7e4c04a3baba1102ffaecb17607bf4")
    .value("ENTERPRISE_PLAN_ID", "301")
    .value("ENTERPRISE_PLAN_CODE", "b1844725d63fde197f5125b58b6cba6260ee7a57")
    .factory("planFactory", ["$q", "$log", "storeAPILoader", "subscriptionStatusService", "FREE_PLAN_ID",
      "FREE_PLAN_CODE", "FREE_PLAN_DESCRIPTION", "BASIC_PLAN_CODE", "ADVANCED_PLAN_CODE", "ENTERPRISE_PLAN_CODE",
      function ($q, $log, storeAPILoader, subscriptionStatusService, FREE_PLAN_ID, FREE_PLAN_CODE,
        FREE_PLAN_DESCRIPTION, BASIC_PLAN_CODE, ADVANCED_PLAN_CODE, ENTERPRISE_PLAN_CODE) {
        var _factory = {};
        var _plansCodesList = [BASIC_PLAN_CODE, ADVANCED_PLAN_CODE, ENTERPRISE_PLAN_CODE];
        var _planTypeMap = {};

        _planTypeMap[FREE_PLAN_CODE] = "free";
        _planTypeMap[BASIC_PLAN_CODE] = "basic";
        _planTypeMap[ADVANCED_PLAN_CODE] = "advanced";
        _planTypeMap[ENTERPRISE_PLAN_CODE] = "enterprise";

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

        _factory.getPlansDescriptions = function () {
          $log.debug("getPlansDescriptions called.");
          var deferred = $q.defer();
          var search = "(productTag=Plans)";

          _factory.getPlans({
            search: search
          })
            .then(function (resp) {
              $log.debug("getPlansDescriptions response.", resp);
              var itemMap = resp.items.reduce(function (accum, item) {
                accum[item.productId] = item;
                return accum;
              }, {});

              itemMap[FREE_PLAN_ID] = {
                productId: FREE_PLAN_ID,
                descriptionShort: FREE_PLAN_DESCRIPTION
              };

              deferred.resolve(itemMap);
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

              var itemMap = resp.reduce(function (accum, item) {
                accum[item.pc] = item;
                return accum;
              }, {});
              var subscribedPlan = {
                pc: FREE_PLAN_CODE,
                subscribed: true,
                status: "Subscribed"
              };

              _plansCodesList.forEach(function (planCode) {
                if (itemMap[planCode] && (itemMap[planCode].subscribed || itemMap[planCode].status ===
                  "Suspended")) {
                  subscribedPlan = itemMap[planCode];
                }
              });

              subscribedPlan.type = _planTypeMap[subscribedPlan.pc];

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
