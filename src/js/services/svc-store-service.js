(function () {
  "use strict";

  angular.module("risevision.store.services")
    .service("storeService", ["$q", "$log", "storeAPILoader",
      function ($q, $log, storeAPILoader) {

        var _getResult = function (resp) {
          if (resp.result !== null && typeof resp.result === "object") {
            return resp.result;
          } else {
            return resp;
          }
        };

        var service = {
          validateAddress: function (addressObject) {
            var obj = {
              "street": addressObject.street,
              "unit": addressObject.unit,
              "city": addressObject.city,
              "country": addressObject.country,
              "postalCode": addressObject.postalCode,
              "province": addressObject.province,
            };

            return storeAPILoader()
              .then(function (storeApi) {
                return storeApi.company.validateAddress(obj);
              })
              .then(function (resp) {
                var result = _getResult(resp);
                $log.debug("validateAddress result: ", result);

                if (result.code !== -1) {
                  return $q.resolve(result);
                } else {
                  return $q.reject(result);
                }
              });
          },
          calculateTaxes: function (companyId, planId, addonId, addonQty,
            shippingAddress) {
            var deferred = $q.defer();
            var obj = {
              companyId: companyId,
              planId: planId,
              addonId: addonId,
              addonQty: addonQty,
              line1: shippingAddress.street,
              line2: shippingAddress.unit,
              city: shippingAddress.city,
              country: shippingAddress.country,
              state: shippingAddress.province,
              zip: shippingAddress.postalCode
            };

            storeAPILoader().then(function (storeApi) {
              return storeApi.tax.estimate(obj);
            })
              .then(function (resp) {
                if (resp.result && !resp.result.error && resp.result.result === true) {
                  $log.debug("tax estimate resp", resp);
                  deferred.resolve(resp.result);
                } else {
                  console.error("Failed to get tax estimate.", resp.result);

                  deferred.reject(resp.result);
                }
              })
              .then(null, function (e) {
                console.error("Failed to get tax estimate.", e);
                deferred.reject(e);
              });
            return deferred.promise;
          },
          purchase: function (jsonData) {
            var deferred = $q.defer();
            storeAPILoader().then(function (storeAPI) {
              var obj = {
                jsonData: jsonData
              };
              return storeAPI.purchase.put2(obj);
            })
              .then(function (resp) {
                if (resp && resp.result && !resp.result.error) {
                  $log.debug("purchase resp", resp);
                  deferred.resolve(resp.result);
                } else {
                  deferred.reject(resp && resp.result && resp.result.error);
                }
              })
              .then(null, function (resp) {
                console.error("Failed to get Purchase.", resp);

                deferred.reject(resp && resp.result && resp.result.error);
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
