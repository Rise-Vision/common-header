angular.module("risevision.common.components.purchase-flow")

.value("PURCHASE_STEPS", [{
  name: "Subscription Details",
  index: 0,
  formName: "reviewSubscriptionForm"
}, {
  name: "Billing Address",
  index: 1,
  formName: "billingAddressForm"
}, {
  name: "Shipping Address",
  index: 2,
  formName: "shippingAddressForm"
}, {
  name: "Payment Method",
  index: 3,
  formName: "paymentMethodsForm"
}, {
  name: "Purchase Review",
  index: 4
}])

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$loading", "purchaseFactory", "addressFactory",
  "PURCHASE_STEPS",
  function ($scope, $modalInstance, $loading, purchaseFactory, addressFactory,
    PURCHASE_STEPS) {

    $scope.form = {};
    $scope.factory = purchaseFactory;

    $scope.PURCHASE_STEPS = PURCHASE_STEPS;
    $scope.currentStep = 0;
    var finalStep = false;

    $scope.$watch("factory.loading", function (loading) {
      if (loading) {
        $loading.start("purchase-modal");
      } else {
        $loading.stop("purchase-modal");
      }
    });

    var _isFormValid = function () {
      var step = PURCHASE_STEPS[$scope.currentStep];
      var formName = step.formName;
      var form = $scope.form[formName];

      return !form || form.$valid;
    };

    $scope.validateAddress = function (addressObject) {
      if (!_isFormValid()) {
        return;
      }

      $scope.factory.loading = true;

      addressFactory.validateAddress(addressObject)
        .then(function () {
          if (!addressObject.validationError) {
            $scope.setNextStep();
          }
        })
        .finally(function () {
          $scope.factory.loading = false;
        });
    };

    $scope.validatePaymentMethod = function (paymentMethods) {
      if (!_isFormValid()) {
        return;
      }

      purchaseFactory.validatePaymentMethod(paymentMethods)
        .then($scope.setNextStep);
    };

    $scope.setNextStep = function () {
      if (!_isFormValid()) {
        return;
      }

      if (finalStep || $scope.currentStep >= 3) {
        // TODO: Handle failure to get estimate
        purchaseFactory.getEstimate()
          .finally(function () {
            $scope.currentStep = 4;

            finalStep = true;
          });

      } else {
        $scope.currentStep++;
      }

    };

    $scope.setPreviousStep = function () {
      if ($scope.currentStep > 0) {
        $scope.currentStep--;
      }
    };

    $scope.setCurrentStep = function (index) {
      $scope.currentStep = index;
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

  }

]);
