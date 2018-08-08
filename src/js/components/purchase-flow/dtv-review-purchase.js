angular.module("risevision.common.components.purchase-flow")
  .directive("reviewPurchase", ["$templateCache", "userState",
    function ($templateCache, userState) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-review-purchase.html"),
        link: function ($scope) {
          $scope.userEmail = userState.getUserEmail();
          $scope.selectedCompany = userState.getCopyOfSelectedCompany();

          $scope.getPlanPrice = function () {
            if ($scope.plan.isMonthly) {
              return $scope.plan.monthly.billAmount;
            } else {
              return $scope.plan.yearly.billAmount;
            }
          };

          $scope.getAdditionalDisplaysPrice = function () {
            if ($scope.plan.isMonthly) {
              return ($scope.plan.additionalDisplayLicenses * $scope.plan.monthly.priceDisplayMonth);
            } else {
              return ($scope.plan.additionalDisplayLicenses * $scope.plan.yearly.priceDisplayYear);
            }
          };

        }
      };
    }
  ]);
