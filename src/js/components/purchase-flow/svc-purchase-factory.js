(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .constant("RPP_ADDON_ID", "c4b368be86245bf9501baaa6e0b00df9719869fd")
    .factory("purchaseFactory", ["$q", "$modal", "$templateCache", "userState", "storeService",
      "stripeService", "RPP_ADDON_ID",
      function ($q, $modal, $templateCache, userState, storeService, stripeService,
        RPP_ADDON_ID) {
        var factory = {};

        // Stop spinner - workaround for spinner not rendering
        factory.loading = false;

        var _cleanContactObj = function (c) {
          return {
            username: c.username,
            firstName: c.firstName,
            lastName: c.lastName,
            email: c.email,
            telephone: c.telephone
          };
        };

        var _resetNewCreditCard = function () {
          factory.purchase.paymentMethods.newCreditCard = {
            address: {},
            useBillingAddress: true,
            billingAddress: factory.purchase.billingAddress
          };
        };

        var _init = function (plan, isMonthly) {
          factory.purchase = {};

          factory.purchase.plan = angular.copy(plan);
          factory.purchase.plan.additionalDisplayLicenses = 0;
          factory.purchase.plan.isMonthly = isMonthly;

          factory.purchase.billingAddress = userState.getCopyOfUserCompany();
          factory.purchase.shippingAddress = userState.getCopyOfSelectedCompany();
          factory.purchase.contact = _cleanContactObj(userState.getCopyOfProfile());
          factory.purchase.paymentMethods = {
            paymentMethod: "card",
            existingCreditCards: []
          };
          _resetNewCreditCard();
          // Alpha Release - Select New Card by default
          factory.purchase.paymentMethods.selectedCard = null;
          factory.purchase.estimate = {};

        };

        factory.showPurchaseModal = function (plan, isMonthly) {
          _init(plan, isMonthly);

          $modal.open({
            template: $templateCache.get("purchase-flow/purchase-modal.html"),
            controller: "PurchaseModalCtrl",
            size: "md"
          });
        };

        var _validateCard = function (card, isNew) {
          card.validationErrors = stripeService.validateCard(card, isNew);

          if (!card.validationErrors || card.validationErrors.length > 0) {
            return false;
          }

          return true;
        };

        factory.validatePaymentMethod = function () {
          var paymentMethods = factory.purchase.paymentMethods;
          var deferred = $q.defer();

          if (paymentMethods.paymentMethod === "invoice") {
            // TODO: Check Invoice credit (?)
            deferred.resolve();
          } else if (paymentMethods.paymentMethod === "card") {
            if (paymentMethods.selectedCard) {
              if (_validateCard(paymentMethods.selectedCard, false)) {
                // Existing Card selected
                deferred.resolve();
              } else {
                deferred.reject();
              }
            } else {
              if (_validateCard(paymentMethods.newCreditCard, true)) {
                var address = paymentMethods.newCreditCard.address;
                if (paymentMethods.newCreditCard.useBillingAddress) {
                  address = paymentMethods.newCreditCard.billingAddress;
                }

                factory.loading = true;

                return stripeService.createToken(paymentMethods.newCreditCard, address)
                  .then(function (response) {
                    var newCard = {
                      "id": response.id,
                      "last4": response.last4,
                      "expMonth": response.exp_month,
                      "expYear": response.exp_year,
                      "name": response.name,
                      "cardType": response.type
                    };

                    paymentMethods.existingCreditCards.push(newCard);
                    paymentMethods.selectedCard = newCard;

                    _resetNewCreditCard();
                  })
                  .finally(function () {
                    factory.loading = false;
                  });
              } else {
                deferred.reject();
              }
            }
          }
          return deferred.promise;
        };

        var _getBillingPeriod = function () {
          return factory.purchase.plan.isMonthly ? "01m" : "01y";
        };

        var _getCurrency = function () {
          return (factory.purchase.billingAddress.country === "CA") ? "cad" : "usd";
        };

        var _getChargebeePlanId = function () {
          return factory.purchase.plan.productCode + "-" + _getCurrency() + _getBillingPeriod();
        };

        var _getChargebeeAddonId = function () {
          return RPP_ADDON_ID + "-" + _getCurrency() + _getBillingPeriod();
        };

        factory.getEstimate = function () {
          factory.purchase.estimate = {
            currency: _getCurrency()
          };

          factory.loading = true;

          return storeService.calculateTaxes(factory.purchase.billingAddress.id, _getChargebeePlanId(),
              _getChargebeeAddonId(),
              factory.purchase.plan.additionalDisplayLicenses, factory.purchase.shippingAddress)
            .then(function (result) {
              if (!result.error && result.result === true) {
                var estimate = factory.purchase.estimate;

                estimate.taxesCalculated = true;
                estimate.taxes = result.taxes || [];
                estimate.total = result.total;
                estimate.totalTax = result.totalTax;
                estimate.shippingTotal = result.shippingTotal;
              }
            })
            .finally(function () {
              factory.loading = false;
            });
        };

        return factory;
      }
    ]);

})(angular);
