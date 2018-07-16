angular.module("risevision.common.components.purchase-flow")

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$log", "$loading", "currentPlanFactory", "plan",
  function ($scope, $modalInstance, $log, $loading, currentPlanFactory, plan) {

    $scope.plan = plan;

    $scope.getVisibleAction = function (plan) {
      // Has a Plan?
      if (currentPlanFactory.isPlanActive()) {
        // Is this that Plan?
        if ($scope.isCurrentPlan(plan)) {
          // Can buy Subscription?
          if ($scope.isOnTrial(plan)) {
            return "subscribe";
          } else {
            return "";
          }
        } else { // This is a different Plan
          // Is lower Plan?
          if ($scope.currentPlan.order > plan.order) {
            return "downgrade";
          } else { // Higher Plan
            return "subscribe";
          }
        }
      } else { // Were on Free Plan
        // Is there a Trial?
        if ($scope.isFree(plan)) {
          return "";
        } else if ($scope.isTrialAvailable(plan)) {
          return "start-trial";
        } else { // Subscribe
          return "subscribe";
        }
      }
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.init = function () {

    };

    $scope.init();
  }

]);
