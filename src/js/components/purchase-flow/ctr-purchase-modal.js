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

.constant("RPP_ADDON_ID", "c4b368be86245bf9501baaa6e0b00df9719869fd")

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$log", "$loading", "storeService", "addressFactory", "stripeService",
  "plan", "PURCHASE_STEPS", "RPP_ADDON_ID",
  function ($scope, $modalInstance, $log, $loading, storeService, addressFactory, stripeService,
    plan, PURCHASE_STEPS, RPP_ADDON_ID) {

    $scope.form = {};
    $scope.plan = plan;
    $scope.plan.additionalDisplayLicenses = 0;

    $scope.PURCHASE_STEPS = PURCHASE_STEPS;
    $scope.currentStep = 3;
    var finalStep = false;

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
              .then(function (resp) {
                if (resp && resp.card) {
                  var newCard = {
                    "id": resp.card.id,
                    "last4": resp.card.last4,
                    "expMonth": resp.card.exp_month,
                    "expYear": resp.card.exp_year,
                    "name": resp.card.name,
                    "cardType": resp.card.type
                  };

                  paymentMethods.existingCreditCards.push(newCard);
                  paymentMethods.selectedCard = newCard;
                }
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

    $scope.setCurrentStep = function (index) {
      $scope.currentStep = index;
    };

    var _getBillingPeriod = function () {
      return plan.isMonthly ? "01m" : "01y";
    };

    var _getCurrency = function () {
      return (plan.billingAddress.country === "CA") ? "cad" : "usd";
    };

    var _getChargebeePlanId = function () {
      return plan.productCode + "-" + _getCurrency() + _getBillingPeriod();
    };

    var _getChargebeeAddonId = function () {
      return RPP_ADDON_ID + "-" + _getCurrency() + _getBillingPeriod();
    };

    $scope.calculateTaxes = function () {
      storeService.calculateTaxes(plan.billingAddress.id, _getChargebeePlanId(), _getChargebeeAddonId(),
        plan.additionalDisplayLicenses, plan.shippingAddress)
        .then(function (result) {
          $log.info(result);
          if (!result.error && result.result === true) {
            $scope.taxesCalculated = true;
            $scope.taxes = result.taxes || [];
            $scope.total = result.total;
            $scope.totalTax = result.totalTax;
            $scope.shippingTotal = result.shippingTotal;
          } else {
            $log.error(result);
          }
        });
    };

    $scope.setNextStep = function () {
      if (!_isFormValid()) {
        return;
      }

      if (finalStep) {
        $scope.currentStep = 4;
      } else {
        $scope.currentStep++;
      }

      if ($scope.currentStep === 4) {
        $scope.calculateTaxes();

        finalStep = true;
      }

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
