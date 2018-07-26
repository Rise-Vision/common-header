angular.module("risevision.common.components.purchase-flow")
  .directive("billingAddress", ["$log", "$templateCache", "$loading", "validateAddress",
    "COUNTRIES", "REGIONS_CA", "REGIONS_US",
    function ($log, $templateCache, $loading, validateAddress, COUNTRIES, REGIONS_CA, REGIONS_US) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-billing-address.html"),
        link: function ($scope) {
          $scope.countries = COUNTRIES;
          $scope.regionsCA = REGIONS_CA;
          $scope.regionsUS = REGIONS_US;

          $scope.isFieldInvalid = function (fieldName) {
            var form = $scope.form.billingAddressForm;
            var field = $scope.form.billingAddressForm[fieldName];

            return (field.$dirty || form.$submitted) && field.$invalid;
          };

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

          $scope.validateAddress = function () {
            $scope.validationError = false;
            $loading.start("purchase-modal");

            validateAddress($scope.plan.billingAddress)
              .then(function (result) {
                if (!_addressesAreIdentical($scope.plan.billingAddress, result)) {
                  $log.error("Unexpected Address Difference received: ", result);
                }

                $scope.setNextStep();
              })
              .catch(function (result) {
                $scope.validationError = result.message ? result.message : "Unknown Error";
              })
              .finally(function () {
                $loading.stop("purchase-modal");
              });
          };

        }
      };
    }
  ]);
