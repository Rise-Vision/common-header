angular.module("risevision.common.components.purchase-flow")
  .directive("shippingAddress", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-shipping-address.html"),
        link: function ($scope) {
          $scope.shippingAddress = purchaseFactory.purchase.shippingAddress;
        }
      };
    }
  ]);
