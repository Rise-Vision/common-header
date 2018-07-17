angular.module("risevision.common.components.purchase-flow")
  .directive("reviewSubscription", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get(
          "purchase-flow/checkout-review-subscription.html"),
        link: function ($scope) {
          $scope.incrementLicenses = function () {
            $scope.plan.additionalDisplayLicenses++;
          };

          $scope.decrementLicenses = function () {
            $scope.plan.additionalDisplayLicenses--;
          };

          $scope.getMonthlyPrice = function () {
            return $scope.plan.monthly.billAmount +
              ($scope.plan.additionalDisplayLicenses * $scope.plan.monthly.priceDisplayMonth);
          };

          $scope.getYearlyPrice = function () {
            return $scope.plan.yearly.billAmount +
              ($scope.plan.additionalDisplayLicenses * $scope.plan.yearly.priceDisplayMonth * 12);
          };

        }
      };
    }
  ]);
