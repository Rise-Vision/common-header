angular.module("risevision.common.header")

.controller("PlansModalCtrl", [
  "$scope", "$modalInstance", "$log", "planFactory", "$loading", "currentPlan",
  function ($scope, $modalInstance, $log, planFactory, $loading, currentPlan) {
    $scope.currentPlan = currentPlan;

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

    $scope.canUpgrade = function (plan) {
      if (currentPlan.type === plan.type) {
        return false;
      } else if (currentPlan.type === "enterprise") {
        return false;
      } else if (currentPlan.type === "basic" && plan.type === "advanced") {
        return true;
      } else if (currentPlan.type === "free" && (plan.type === "basic" || plan.type === "advanced")) {
        return true;
      }

      return false;
    };

    $scope.canDowngrade = function (plan) {
      if (currentPlan.type === plan.type) {
        return false;
      } else if (currentPlan.type === "enterprise") {
        return true;
      } else if (currentPlan.type === "advanced" && (plan.type === "free" || plan.type === "basic")) {
        return true;
      } else if (currentPlan.type === "basic" && plan.type === "free") {
        return true;
      }

      return false;
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.getPlansDetails();
  }


]);
