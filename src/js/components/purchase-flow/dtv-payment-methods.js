angular.module("risevision.common.components.purchase-flow")
  .directive("paymentMethods", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-payment-methods.html"),
        link: function ($scope) {
          $scope.paymentMethods = purchaseFactory.purchase.paymentMethods;

          $scope.getCardDescription = function (card) {
            return "***-" + card.last4 + ", " + card.cardType + (card.isDefault ? " (default)" : "");
          };

        }
      };
    }
  ]);
