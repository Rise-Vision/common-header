angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading", "planFactory", "currentPlan",
  function ($scope, $modalInstance, $log, $modal, $templateCache, $loading, planFactory, currentPlan) {
    $scope.currentPlan = currentPlan;

    $scope.getPlansDetails = function () {
      $loading.start("plans-modal");

      return planFactory.getPlansDetails()
        .then(function (plans) {
          $scope.plans = plans;
        })
        .catch(function (err) {
          $log.debug("Failed to load details", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    };

    $scope.showDowngradeModal = function () {
      $modal.open({
        template: $templateCache.get("plans/plans-downgrade-modal.html"),
        controller: "PlansDowngradeModalCtrl",
        size: "md"
      });
    };

    $scope.canUpgrade = function (plan) {
      if (currentPlan.type === plan.type) {
        return false;
      } else if (currentPlan.type === "enterprise") {
        return false;
      } else if (currentPlan.type === "advanced" && plan.type === "enterprise") {
        return true;
      } else if (currentPlan.type === "basic" && (plan.type === "advanced" || plan.type === "enterprise")) {
        return true;
      } else if (currentPlan.type === "free") {
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
