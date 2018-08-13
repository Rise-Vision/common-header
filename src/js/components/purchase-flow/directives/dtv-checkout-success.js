angular.module("risevision.common.components.purchase-flow")
  .directive("checkoutSuccess", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-success.html"),
        link: function () {}
      };
    }
  ]);
