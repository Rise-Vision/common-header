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

    var _setStep = function (index) {
      if (!_isFormValid()) {
        return;
      }

      $scope.currentStep = index;
    };

    $scope.setNextStep = function () {
      _setStep($scope.currentStep + 1);
    };

    $scope.setPreviousStep = function () {
      if ($scope.currentStep > 0) {
        _setStep($scope.currentStep - 1);
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
