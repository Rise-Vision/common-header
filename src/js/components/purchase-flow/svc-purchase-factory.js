(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .factory("purchaseFactory", ["$modal", "$templateCache",
      function ($modal, $templateCache) {
        var _factory = {};

        _factory.showPurchaseModal = function (plan) {
          $modal.open({
            template: $templateCache.get("purchase-flow/purchase-modal.html"),
            controller: "PurchaseModalCtrl",
            size: "md",
            resolve: {
              plan: function () {
                return plan;
              }
            }
          });
        };

        return _factory;
      }
    ]);

})(angular);
