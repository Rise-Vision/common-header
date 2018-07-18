angular.module("risevision.common.components.purchase-flow")

.value("PURCHASE_STEPS", [{
  name: "Subscription Details",
  index: 0
}, {
  name: "Billing Address",
  index: 1
}, {
  name: "Shipping Address",
  index: 2
}, {
  name: "Payment Method",
  index: 3
}, {
  name: "Purchase Review",
  index: 4
}])

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$log", "$loading", "plan",
  "PURCHASE_STEPS",
  function ($scope, $modalInstance, $log, $loading, plan,
    PURCHASE_STEPS) {

    $scope.form = {};
    $scope.plan = plan;
    $scope.plan.additionalDisplayLicenses = 0;

    $scope.PURCHASE_STEPS = PURCHASE_STEPS;
    $scope.currentStep = 0;

    var _isFormValid = function () {
      var formValid = true;

      _.forIn($scope.form, function (form) {
        if (form.$invalid) {
          formValid = false;
        }
      });

      return formValid;
    };

    $scope.setCurrentStep = function (step) {
      if (!_isFormValid()) {
        return;
      }

      $scope.currentStep = step.index;
    };

    $scope.setNextStep = function () {
      if (!_isFormValid()) {
        return;
      }

      $scope.currentStep++;
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.init = function () {

    };

    $scope.init();
  }

]);
