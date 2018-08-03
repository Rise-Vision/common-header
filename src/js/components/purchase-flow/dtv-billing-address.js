angular.module("risevision.common.components.purchase-flow")
  .directive("billingAddress", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-billing-address.html"),
        link: function () {}
      };
    }
  ]);
