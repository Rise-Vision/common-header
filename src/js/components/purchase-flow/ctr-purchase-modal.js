angular.module("risevision.common.components.purchase-flow")

.value("PURCHASE_STEPS", [{
  name: "Subscription Details",
  index: 0,
  count: "one"
}, {
  name: "Billing Address",
  index: 1,
  count: "two"
}, {
  name: "Shipping Address",
  index: 2,
  count: "three"
}, {
  name: "Payment Method",
  index: 3,
  count: "four"
}, {
  name: "Purchase Review",
  index: 4,
  count: "five"
}])

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$log", "$loading", "currentPlanFactory", "plan",
  "PURCHASE_STEPS",
  function ($scope, $modalInstance, $log, $loading, currentPlanFactory, plan,
    PURCHASE_STEPS) {

    $scope.plan = plan;
    $scope.PURCHASE_STEPS = PURCHASE_STEPS;

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
