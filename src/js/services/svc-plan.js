(function (angular) {

  "use strict";
  angular.module("risevision.common.plan", [
    "risevision.common.gapi"
  ])
    .value("FREE_PLAN_ID", "000")
    .value("FREE_PLAN_DESCRIPTION", "Free Plan")
    .value("BASIC_PLAN_ID", "289")
    .value("ADVANCED_PLAN_ID", "290")
    .value("ENTERPRISE_PLAN_ID", "301")
    .factory("planFactory", ["$q", "$log", "riseAPILoader", "subscriptionStatusService", "FREE_PLAN_ID",
      "BASIC_PLAN_ID", "ADVANCED_PLAN_ID", "ENTERPRISE_PLAN_ID", "FREE_PLAN_DESCRIPTION",
      function ($q, $log, riseAPILoader, subscriptionStatusService, FREE_PLAN_ID, BASIC_PLAN_ID, ADVANCED_PLAN_ID,
        ENTERPRISE_PLAN_ID, FREE_PLAN_DESCRIPTION) {
        var _factory = {};
        var _plansList = [BASIC_PLAN_ID, ADVANCED_PLAN_ID, ENTERPRISE_PLAN_ID];

        _factory.getPlans = function (params) { // companyId, search
          $log.debug("getPlans called.");
          var deferred = $q.defer();
          riseAPILoader().then(function (riseApi) {
            var request = riseApi.product.list(params);
            request.execute(function (resp) {
              $log.debug("getPlans response", resp);
              if (!resp.error) {
                deferred.resolve();
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
          var search = "(productTag%3APlans)";

          _factory.getPlans({
            search: search
          })
            .then(function (resp) {
              $log.debug("getPlansDescriptions response.");
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

          subscriptionStatusService.list(_plansList, companyId)
            .then(function (resp) {
              $log.debug("getCompanyPlan response.");

              var itemMap = resp.reduce(function (accum, item) {
                accum[item.pc] = item;
                return accum;
              }, {});
              var subscribedPlan = {
                pc: "000",
                subscribed: true,
                status: "Subscribed"
              };

              _plansList.forEach(function (planId) {
                if (itemMap[planId] && (itemMap[planId].subscribed || itemMap[planId].status === "Suspended")) {
                  subscribedPlan = itemMap[planId];
                }
              });

              console.log(subscribedPlan);
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
