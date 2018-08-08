angular.module("risevision.common.components.purchase-flow")
  .directive("paymentMethods", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-payment-methods.html"),
        link: function ($scope) {
          $scope.getCardDescription = function (card) {
            return "***-" + card.last4 + ", " + card.cardType + (card.isDefault ? " (default)" : "");
          };

        }
      };
    }
  ]);
