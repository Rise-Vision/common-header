angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading", "planFactory", "currentPlan",
  "storeAuthorization",
  function ($scope, $modalInstance, $log, $modal, $templateCache, $loading, planFactory, currentPlan,
    storeAuthorization) {

    $scope.currentPlan = currentPlan;
    $scope.startTrialError = null;

    $scope.getPlansDetails = function () {
      $loading.start("plans-modal");

      return planFactory.getCompanyPlanStatus()
        .then(function (allPlansMap) {
          $scope.allPlansMap = allPlansMap;
          return planFactory.getPlansDetails();
        })
        .then(function (plans) {
          $scope.plans = plans;
        })
        .catch(function (err) {
          $log.debug("Failed to load plans", err);
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

    $scope.canStartTrial = function (plan) {

      console.log(plan);
      console.log($scope.allPlansMap);

      if (currentPlan.subscribed && currentPlan.statusCode !== "on-trial" &&
        currentPlan.statusCode !== "trial-expired") {

        return false;

      } else if (currentPlan.type === plan.type) {

        return false;

      } else if ($scope.allPlansMap[plan.productCode] &&
        $scope.allPlansMap[plan.productCode].statusCode === "trial-available") {

        return true;
      }

      return false;
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      storeAuthorization.startTrial(plan.productCode)
        .then(function () {
          $modalInstance.close();
        })
        .catch(function (err) {
          $log.debug("Failed to start trial", err);
          $scope.startTrialError = err;
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
