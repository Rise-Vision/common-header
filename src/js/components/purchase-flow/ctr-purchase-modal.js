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
  "$scope", "$modalInstance", "$log", "$loading", "addressFactory", "stripeService",
  "plan", "PURCHASE_STEPS",
  function ($scope, $modalInstance, $log, $loading, addressFactory, stripeService,
    plan, PURCHASE_STEPS) {

    $scope.form = {};
    $scope.plan = plan;
    $scope.plan.additionalDisplayLicenses = 0;

    $scope.PURCHASE_STEPS = PURCHASE_STEPS;
    $scope.currentStep = 0;

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("purchase-modal");
      } else {
        $loading.stop("purchase-modal");
      }
    });

    // Stop spinner - workaround for spinner not rendering
    $scope.loading = false;

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

      $scope.loading = true;

      addressFactory.validateAddress(addressObject)
        .then(function () {
          if (!addressObject.validationError) {
            $scope.setNextStep();
          }
        })
        .finally(function () {
          $scope.loading = false;
        });
    };

    var _validateCard = function (card, isNew) {
      card.validationErrors = stripeService.validateCard(card, isNew);

      if (!card.validationErrors || card.validationErrors.length > 0) {
        return false;
      }

      return true;
    };

    $scope.validatePaymentMethod = function (paymentMethods) {
      if (!_isFormValid()) {
        return;
      }

      if (paymentMethods.paymentMethod === "invoice") {
        // TODO: Check Invoice credit (?)
        $scope.setNextStep();
      } else if (paymentMethods.paymentMethod === "card") {
        if (paymentMethods.selectedCard) {
          if (_validateCard(paymentMethods.selectedCard, false)) {
            // Existing Card selected
            $scope.setNextStep();
          }
        } else {
          if (_validateCard(paymentMethods.newCreditCard, true)) {
            var address = paymentMethods.newCreditCard.address;
            if (paymentMethods.newCreditCard.useBillingAddress) {
              address = paymentMethods.newCreditCard.billingAddress;
            }

            $scope.loading = true;

            stripeService.createToken(paymentMethods.newCreditCard, address)
              .then(function () {
                // New Card selected
                $scope.setNextStep();
              })
              .finally(function () {
                $scope.loading = false;
              });
          }
        }
      }
    };

    $scope.setNextStep = function () {
      if (!_isFormValid()) {
        return;
      }

      $scope.currentStep++;
    };

    $scope.setPreviousStep = function () {
      if ($scope.currentStep > 0) {
        $scope.currentStep--;
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
