angular.module("risevision.common.components.purchase-flow")
  .directive("confirmAddress", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-confirm-address.html"),
        link: function () {

        }
      };
    }
  ]);
