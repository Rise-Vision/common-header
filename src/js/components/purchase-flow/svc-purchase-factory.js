(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .factory("purchaseFactory", ["$q", "$log", "$modal", "$templateCache", "userState", "storeService",
      "stripeService", "RPP_ADDON_ID",
      function ($q, $log, $modal, $templateCache, userState, storeService, stripeService,
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
            existingCreditCards: [],
            newCreditCard: {
              address: {},
              useBillingAddress: true,
              billingAddress: factory.purchase.billingAddress
            }
          };
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

        factory.validatePaymentMethod = function (paymentMethods) {
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
                  })
                  .finally(function () {
                    factory.loading = false;
                  });
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

        factory.calculateTaxes = function () {
          factory.purchase.estimate = {
            currency: _getCurrency()
          };

          factory.loading = true;

          storeService.calculateTaxes(factory.purchase.billingAddress.id, _getChargebeePlanId(),
            _getChargebeeAddonId(),
            factory.purchase.plan.additionalDisplayLicenses, factory.purchase.shippingAddress)
            .then(function (result) {
              $log.info(result);
              if (!result.error && result.result === true) {
                factory.purchase.estimate = {
                  taxesCalculated: true,
                  taxes: result.taxes || [],
                  total: result.total,
                  totalTax: result.totalTax,
                  shippingTotal: result.shippingTotal
                };
              } else {
                $log.error(result);
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
