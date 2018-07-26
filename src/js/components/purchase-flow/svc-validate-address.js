angular.module("risevision.common.components.purchase-flow")
  .service("validateAddress", ["$q", "storeAPILoader", "$log", "responseHelper",
    function ($q, storeAPILoader, $log, responseHelper) {
      return function (company) {
        $log.debug("validateAddress called", company);

        var obj = {
          "street": company.street,
          "unit": company.unit,
          "city": company.city,
          "country": company.country,
          "postalCode": company.postalCode,
          "province": company.province,
        };

        return storeAPILoader()
          .then(function (storeApi) {
            return storeApi.company.validateAddress(obj);
          })
          .then(function (resp) {
            resp = responseHelper.getResult(resp);
            $log.debug("validateAddress resp", resp);

            if (resp.code !== -1) {
              return $q.resolve(resp);
            } else {
              return $q.reject(resp);
            }
          });
      };
    }
  ]);
