angular.module("risevision.common.components.purchase-flow")
  .directive("billingAddress", ["$templateCache", "COUNTRIES", "REGIONS_CA", "REGIONS_US",
    function ($templateCache, COUNTRIES, REGIONS_CA, REGIONS_US) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-billing-address.html"),
        link: function ($scope) {
          $scope.countries = COUNTRIES;
          $scope.regionsCA = REGIONS_CA;
          $scope.regionsUS = REGIONS_US;

        }
      };
    }
  ]);
