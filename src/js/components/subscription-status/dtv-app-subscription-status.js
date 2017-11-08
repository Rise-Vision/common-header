(function () {
  "use strict";

  angular.module(
    "risevision.common.components.subscription-status.directives")
    .directive("appSubscriptionStatus", ["$templateCache", "$modal",
      "subscriptionStatusService",
      function ($templateCache, $modal, subscriptionStatusService) {
        return {
          restrict: "AE",
          require: "?ngModel",
          scope: {
            productId: "@",
            productCode: "@",
            companyId: "@",
            productPrice: "@"
          },
          template: $templateCache.get(
            "subscription-status/app-subscription-status-template.html"),
          link: function ($scope, elm, attrs, ctrl) {
            $scope.subscriptionStatus = {
              "status": "N/A",
              "statusCode": "na",
              "subscribed": false,
              "expiry": null
            };

            function checkSubscriptionStatus() {
              if ($scope.productCode && $scope.productId && $scope.companyId) {
                subscriptionStatusService.get($scope.productCode, $scope.companyId)
                  .then(function (subscriptionStatus) {
                      if (subscriptionStatus) {
                        $scope.subscriptionStatus = subscriptionStatus;
                      }
                    },
                    function () {
                      // TODO: catch error here
                    });
              }
            }

            $scope.$watch("companyId", function () {
              checkSubscriptionStatus();
            });

            if (ctrl) {
              $scope.$watch("subscriptionStatus", function (
                subscriptionStatus) {
                ctrl.$setViewValue(subscriptionStatus);
              });
            }

            $scope.$watch("showStoreModal", function (show) {
              if (show) {
                var modalInstance = $modal.open({
                  templateUrl: "store-iframe-template.html",
                  controller: "StoreModalController",
                  size: "lg",
                  resolve: {
                    productId: function () {
                      return $scope.productId;
                    },
                    companyId: function () {
                      return $scope.companyId;
                    }
                  }
                });

                modalInstance.result.then(function () {
                  checkSubscriptionStatus();

                }, function () {
                  checkSubscriptionStatus();

                })
                  .finally(function () {
                    $scope.showStoreModal = false;
                  });
              }
            });
          }
        };
      }
    ])
    .directive("ngDisableRightClick", function () {
      return function (scope, element) {
        element.bind("contextmenu", function (event) {
          scope.$apply(function () {
            event.preventDefault();
          });
        });
      };
    });
}());
