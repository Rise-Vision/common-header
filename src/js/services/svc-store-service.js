(function () {
  "use strict";

  angular.module("risevision.store.services")
    .service("storeService", ["$q", "$log", "storeAPILoader",
      function ($q, $log, storeAPILoader) {
        var service = {
          openPortal: function (companyId, returnUrl) {
            var deferred = $q.defer();

            var obj = {
              "companyId": companyId,
              "returnUrl": returnUrl
            };

            storeAPILoader().then(function (storeApi) {
              return storeApi.customer_portal.getUrl(obj);
            })
              .then(function (resp) {
                $log.debug("customer_portal.getUrl resp", resp);
                deferred.resolve(resp.result);
              })
              .then(null, function (e) {
                console.error("Failed to get portal URL.", e);
                deferred.reject(e);
              });
            return deferred.promise;
          },
          createSession: function (companyId) {
            var deferred = $q.defer();

            var obj = {
              "companyId": companyId
            };

            storeAPILoader().then(function (storeApi) {
              return storeApi.customer_portal.createSession(obj);
            })
              .then(function (resp) {
                $log.debug("customer_portal.createSession resp", resp);
                deferred.resolve(JSON.parse(resp.result.result));
              })
              .then(null, function (e) {
                console.error("Failed to create Customer Portal Session.", e);
                deferred.reject(e);
              });
            return deferred.promise;
          }
        };

        return service;
      }
    ]);
})();
