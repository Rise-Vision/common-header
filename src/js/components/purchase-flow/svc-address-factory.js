angular.module("risevision.common.components.purchase-flow")
  .service("addressFactory", ["$q", "$log", "storeService",
    function ($q, $log, storeService) {
      var factory = {};

      var _addressesAreIdentical = function (src, result) {
        var dest = {
          street: result.line1,
          unit: result.line2 && result.line2.length ? result.line2 : "",
          city: result.city,
          postalCode: result.postalCode,
          province: result.region,
          country: result.country
        };

        if (dest.street === src.street &&
          dest.unit === src.unit &&
          dest.city === src.city &&
          dest.country === src.country &&
          dest.postalCode === src.postalCode &&
          dest.province === src.province) {
          return true;
        }
        return false;
      };

      factory.validateAddress = function (addressObject) {
        addressObject.validationError = false;

        if (addressObject.country !== "CA" && addressObject.country !== "US") {
          $log.debug("Address Validation skipped for country: ", addressObject.country);

          return $q.resolve();
        } else {
          return storeService.validateAddress(addressObject)
            .then(function (result) {
              if (!_addressesAreIdentical(addressObject, result)) {
                $log.error("Validated address differs from entered address: ", addressObject, result);
              }
            })
            .catch(function (result) {
              addressObject.validationError = result.message ? result.message : "Unknown Error";
            });
        }
      };

      return factory;
    }
  ]);
