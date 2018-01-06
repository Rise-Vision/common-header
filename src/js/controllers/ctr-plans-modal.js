angular.module("risevision.common.header")

.controller("PlansModalCtrl", [
  "$scope", "$modalInstance", "$log", "planFactory", "$loading", "userState",
  "FREE_PLAN_ID", "BASIC_PLAN_ID", "ADVANCED_PLAN_ID", "ENTERPRISE_PLAN_ID",
  function ($scope, $modalInstance, $log, planFactory, $loading, userState,
    FREE_PLAN_ID, BASIC_PLAN_ID, ADVANCED_PLAN_ID, ENTERPRISE_PLAN_ID) {
    $scope.descriptions = {};

    $scope.getPlansDescriptions = function () {
      $loading.start("plans-modal");

      planFactory.getPlansDescriptions()
        .then(function (plans) {
          $scope.descriptions.free = plans[FREE_PLAN_ID].descriptionShort;
          $scope.descriptions.basic = plans[BASIC_PLAN_ID].descriptionShort;
          $scope.descriptions.advanced = plans[ADVANCED_PLAN_ID].descriptionShort;
          $scope.descriptions.enterprise = plans[ENTERPRISE_PLAN_ID].descriptionShort;
        })
        .catch(function (err) {
          $log.debug("Failed to load descriptions", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.getPlansDescriptions();
  }
]);
