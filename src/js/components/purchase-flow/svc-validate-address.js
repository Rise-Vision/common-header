angular.module("risevision.common.components.purchase-flow")
  .service("validateAddress", ["$q", "$log", "storeAPILoader",
    function ($q, $log, storeAPILoader) {
      return function (addressObject) {
        $log.debug("validateAddress called", addressObject);

        var obj = {
          "street": addressObject.street,
          "unit": addressObject.unit,
          "city": addressObject.city,
          "country": addressObject.country,
          "postalCode": addressObject.postalCode,
          "province": addressObject.province,
        };

        var _getResult = function (resp) {
          if (resp.result !== null && typeof resp.result === "object") {
            return resp.result;
          } else {
            return resp;
          }
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
      };
    }
  ]);
