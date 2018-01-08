angular.module("risevision.common.header")

.controller("PlansModalCtrl", [
  "$scope", "$modalInstance", "$log", "planFactory", "$loading",
  function ($scope, $modalInstance, $log, planFactory, $loading) {
    $scope.descriptions = {};

    $scope.getPlansDetails = function () {
      $loading.start("plans-modal");

      planFactory.getPlansDetails()
        .then(function (plans) {
          $scope.plans = plans;
        })
        .catch(function (err) {
          $log.debug("Failed to load detauls", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.getPlansDetails();
  }
]);
