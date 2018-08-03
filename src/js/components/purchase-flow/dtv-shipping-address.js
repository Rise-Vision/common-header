angular.module("risevision.common.components.purchase-flow")
  .directive("shippingAddress", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-shipping-address.html"),
        link: function () {}
      };
    }
  ]);
