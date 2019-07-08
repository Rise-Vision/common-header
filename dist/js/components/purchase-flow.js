"use strict";

angular.module("risevision.common.components.purchase-flow", [
  "risevision.store.authorization",
  "risevision.common.config",
  "risevision.common.gapi",
  "risevision.common.geodata",
  "risevision.common.currency",
  "risevision.common.components.loading",
  "risevision.core.countries",
  "ui.bootstrap"
]);

angular.module("risevision.common.components.purchase-flow")
  .service("addressFactory", ["$q", "$log", "userState", "storeService", "updateCompany", "updateUser",
    "addressService", "contactService",
    function ($q, $log, userState, storeService, updateCompany, updateUser, addressService, contactService) {
      var factory = {};

      var _addressesAreIdentical = function (src, result) {
        var dest = {
          // Use Current Name for Comparison
          name: src.name,
          street: result.line1,
          unit: result.line2 && result.line2.length ? result.line2 : "",
          city: result.city,
          postalCode: result.postalCode,
          province: result.region,
          country: result.country
        };

        return addressService.addressesAreIdentical(src, dest);
      };

      factory.validateAddress = function (addressObject) {
        addressObject.validationError = false;

        if (addressObject.country !== "CA" && addressObject.country !== "US") {
          $log.debug("Address Validation skipped for country: ", addressObject.country);

          return $q.resolve();
        } else {
          return storeService.validateAddress(addressObject)
            .then(function (result) {
              if (!_addressesAreIdentical(addressObject, result)) {
                $log.error("Validated address differs from entered address: ", addressObject, result);
              }
            })
            .catch(function (result) {
              addressObject.validationError = result.message ? result.message : "Unknown Error";
            });
        }
      };

      factory.isValidOrEmptyAddress = function (addressObject) {
        if (addressService.isEmptyAddress(addressObject)) {
          $log.debug("Address is empty, skipped validation");
          return $q.resolve();
        }
        if (addressObject.country !== "CA" && addressObject.country !== "US" && addressObject.country !== "") {
          $log.debug("Address Validation skipped for country: ", addressObject.country);
          return $q.resolve();
        }
        return storeService.validateAddress(addressObject);
      };

      var _updateCompanySettings = function (company, isShipping) {
        if (isShipping) {
          // update Selected company saved in userState
          var shipToCopyNoFollow = userState.getCopyOfSelectedCompany(true);
          angular.extend(shipToCopyNoFollow, company);

          // this will fire "risevision.company.updated" event
          userState.updateCompanySettings(shipToCopyNoFollow);
        }
        // only proceed if currently selected BillTo company is the User company
        else if (company.id === userState.getUserCompanyId()) {
          // update User company saved in userState
          var billToCopyNoFollow = userState.getCopyOfUserCompany(true);
          angular.extend(billToCopyNoFollow, company);

          // this will fire "risevision.company.updated" event
          userState.updateCompanySettings(billToCopyNoFollow);
        }
      };

      factory.updateAddress = function (addressObject, contact, isShipping) {
        var deferred = $q.defer();
        var currentAddress = isShipping ? addressService.copyAddressFromShipTo(userState.getCopyOfSelectedCompany()) :
          userState.getCopyOfUserCompany();

        var addressFields = {};
        var requiresUpdate = false;

        if (!isShipping) {
          var billingContactEmails = currentAddress.billingContactEmails || [];
          var email = contact && contact.email;

          if (email && billingContactEmails.indexOf(email) === -1) {
            billingContactEmails.unshift(email);

            addressFields.billingContactEmails = billingContactEmails;

            requiresUpdate = true;
          }
        }

        if (addressObject && !addressService.addressesAreIdentical(addressObject, currentAddress) || requiresUpdate) {
          if (isShipping) {
            addressService.copyAddressToShipTo(addressObject, addressFields);
          } else {
            addressService.copyAddress(addressObject, addressFields);
          }

          $log.info("Company Fields changed. Saving...");

          updateCompany(addressFields.id, addressFields)
            .then(function () {
              _updateCompanySettings(addressFields, isShipping);

              $log.info("Company Fields saved.");

              deferred.resolve();
            })
            .catch(function () {
              $log.info("Error saving Company Fields.");
              deferred.reject("Error saving Company Fields.");
            });
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      };

      factory.updateContact = function (contact) {
        var deferred = $q.defer();
        var currentContact = userState.getCopyOfProfile();

        if (contact && !contactService.contactsAreIdentical(contact, currentContact)) {
          $log.info("Contact information changed. Saving...");

          updateUser(userState.getUsername(), contact)
            .then(function () {
              var profileCopyNoFollow = userState.getCopyOfProfile(true);
              contactService.copyContactObj(contact, profileCopyNoFollow);

              // this fires "risevision.company.updated" event
              userState.updateUserProfile(profileCopyNoFollow);

              $log.info("Contact information saved.");
              deferred.resolve();
            })
            .catch(function () {
              $log.info("Error saving Contact information.");
              deferred.reject("Error saving Contact information.");
            });
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      };

      return factory;
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .service("addressService", [

    function () {
      this.copyAddress = function (src, dest) {
        if (!dest) {
          dest = {};
        }

        dest.id = src.id;
        dest.name = src.name;

        dest.street = src.street;
        dest.unit = src.unit;
        dest.city = src.city;
        dest.country = src.country;
        dest.postalCode = src.postalCode;
        dest.province = src.province;

        return dest;
      };

      this.copyAddressFromShipTo = function (src, dest) {
        // Do not copy shipToUseCompanyAddress.
        // It should not be updated from the Cart.

        if (!dest) {
          dest = {};
        }

        dest.id = src.id;
        dest.name = src.shipToName;

        dest.street = src.shipToStreet;
        dest.unit = src.shipToUnit;
        dest.city = src.shipToCity;
        dest.country = src.shipToCountry;
        dest.postalCode = src.shipToPostalCode;
        dest.province = src.shipToProvince;

        return dest;
      };

      this.copyAddressToShipTo = function (src, dest) {
        // Do not copy shipToUseCompanyAddress.
        // It should not be updated from the Cart.

        if (!dest) {
          dest = {};
        }

        dest.id = src.id;
        dest.shipToName = src.name;

        dest.shipToStreet = src.street;
        dest.shipToUnit = src.unit;
        dest.shipToCity = src.city;
        dest.shipToCountry = src.country;
        dest.shipToPostalCode = src.postalCode;
        dest.shipToProvince = src.province;

        return dest;
      };

      this.addressesAreIdentical = function (src, dest) {
        if (dest.name === src.name &&
          dest.street === src.street &&
          dest.unit === src.unit &&
          dest.city === src.city &&
          dest.country === src.country &&
          dest.postalCode === src.postalCode &&
          dest.province === src.province) {
          return true;
        }
        return false;
      };

      this.isEmptyAddress = function (addressObject) {
        if (!addressObject) {
          return true;
        }
        return !addressObject.street &&
          !addressObject.unit &&
          !addressObject.city &&
          !addressObject.country &&
          !addressObject.postalCode &&
          !addressObject.province;
      };

    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .service("contactService", [

    function () {

      this.contactsAreIdentical = function (c1, c2) {
        return (
          c1.firstName === c2.firstName &&
          c1.lastName === c2.lastName &&
          c1.email === c2.email &&
          c1.telephone === c2.telephone);
      };

      this.copyContactObj = function (src, dest) {
        if (!dest) {
          dest = {};
        }

        dest.username = src.username;
        dest.firstName = src.firstName;
        dest.lastName = src.lastName;
        dest.email = src.email;
        dest.telephone = src.telephone;

        return dest;
      };

    }
  ]);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .constant("RPP_ADDON_ID", "c4b368be86245bf9501baaa6e0b00df9719869fd")
    .factory("purchaseFactory", ["$rootScope", "$q", "$log", "$modal", "$templateCache", "$timeout",
      "userState", "storeService", "stripeService", "addressService", "contactService", "purchaseFlowTracker",
      "RPP_ADDON_ID",
      function ($rootScope, $q, $log, $modal, $templateCache, $timeout, userState,
        storeService, stripeService, addressService, contactService, purchaseFlowTracker, RPP_ADDON_ID) {
        var factory = {};

        // Stop spinner - workaround for spinner not rendering
        factory.loading = false;

        var _init = function (plan, isMonthly) {
          factory.purchase = {};

          factory.purchase.plan = angular.copy(plan);
          factory.purchase.plan.additionalDisplayLicenses = parseInt(plan.additionalDisplayLicenses) || 0;
          factory.purchase.plan.isMonthly = isMonthly;

          factory.purchase.billingAddress = addressService.copyAddress(userState.getCopyOfUserCompany());
          factory.purchase.shippingAddress = addressService.copyAddressFromShipTo(userState.getCopyOfSelectedCompany());

          factory.purchase.contact = contactService.copyContactObj(userState.getCopyOfProfile());
          factory.purchase.paymentMethods = {
            paymentMethod: "card",
            existingCreditCards: [],
            newCreditCard: {
              isNew: true,
              address: {},
              useBillingAddress: true,
              billingAddress: factory.purchase.billingAddress
            }
          };

          var invoiceDate = new Date();
          invoiceDate.setDate(invoiceDate.getDate() + 30);
          factory.purchase.paymentMethods.invoiceDate = invoiceDate;

          // Alpha Release - Select New Card by default
          factory.purchase.paymentMethods.selectedCard = factory.purchase.paymentMethods.newCreditCard;
          factory.purchase.estimate = {};

          purchaseFlowTracker.trackProductAdded(factory.purchase.plan);
        };

        factory.showPurchaseModal = function (plan, isMonthly) {
          _init(plan, isMonthly);

          var modalInstance = $modal.open({
            template: $templateCache.get("purchase-flow/purchase-modal.html"),
            controller: "PurchaseModalCtrl",
            size: "md",
            backdrop: "static"
          });

          return modalInstance.result;
        };

        factory.showTaxExemptionModal = function () {
          var modalInstance = $modal.open({
            template: $templateCache.get("purchase-flow/tax-exemption.html"),
            controller: "TaxExemptionModalCtrl",
            size: "md",
            backdrop: "static"
          });

          return modalInstance.result.then(function (result) {
            factory.purchase.taxExemptionSent = result;
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
            if (!paymentMethods.selectedCard.isNew) {
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
                    paymentMethods.newCreditCard.id = response.id;
                    paymentMethods.newCreditCard.last4 = response.card.last4;
                    paymentMethods.newCreditCard.cardType = response.card.type;
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
          return RPP_ADDON_ID + "-" + _getCurrency() + _getBillingPeriod() +
            factory.purchase.plan.productCode.substring(0, 3);
        };

        factory.getEstimate = function () {
          factory.purchase.estimate = {
            currency: _getCurrency()
          };

          factory.loading = true;

          return storeService.calculateTaxes(factory.purchase.billingAddress.id, _getChargebeePlanId(),
              factory.purchase.plan.displays,
              _getChargebeeAddonId(),
              factory.purchase.plan.additionalDisplayLicenses, factory.purchase.shippingAddress)
            .then(function (result) {
              var estimate = factory.purchase.estimate;

              estimate.taxesCalculated = true;
              estimate.taxes = result.taxes || [];
              estimate.total = result.total;
              estimate.subTotal = result.subTotal;
              estimate.couponAmount = result.couponAmount;
              estimate.totalTax = result.totalTax;
              estimate.shippingTotal = result.shippingTotal;

              purchaseFlowTracker.trackPlaceOrderClicked(estimate);
            })
            .catch(function (result) {
              factory.purchase.estimate.estimateError = result && result.message ? result.message :
                "An unexpected error has occurred. Please try again.";
            })
            .finally(function () {
              factory.loading = false;
            });
        };

        var _getOrderAsJson = function () {
          //clean up items
          var newItems = [{
            id: _getChargebeePlanId(),
            qty: factory.purchase.plan.displays
          }, {
            id: _getChargebeeAddonId(),
            qty: factory.purchase.plan.additionalDisplayLicenses
          }];

          var card = factory.purchase.paymentMethods.selectedCard;
          var cardData = factory.purchase.paymentMethods.paymentMethod === "invoice" ? null : {
            cardId: card.id,
            isDefault: card.isDefault ? true : false
          };

          var obj = {
            billTo: addressService.copyAddress(factory.purchase.billingAddress),
            shipTo: addressService.copyAddress(factory.purchase.shippingAddress),
            items: newItems,
            purchaseOrderNumber: factory.purchase.paymentMethods.purchaseOrderNumber,
            card: cardData
          };

          return JSON.stringify(obj);
        };

        factory.completePayment = function () {
          var jsonData = _getOrderAsJson();

          factory.purchase.checkoutError = null;
          factory.loading = true;

          return storeService.purchase(jsonData)
            .then(function () {
              factory.purchase.reloadingCompany = true;

              purchaseFlowTracker.trackOrderPayNowClicked(factory.purchase.estimate);

              $timeout(10000)
                .then(function () {
                  return userState.reloadSelectedCompany();
                })
                .then(function () {
                  $rootScope.$emit("risevision.company.trial.started");
                })
                .catch(function (err) {
                  $log.debug("Failed to reload company", err);
                })
                .finally(function () {
                  factory.purchase.reloadingCompany = false;
                });
            })
            .catch(function (result) {
              factory.purchase.checkoutError = result && result.message ? result.message :
                "There was an unknown error with the payment.";
            })
            .finally(function () {
              factory.loading = false;
            });
        };

        return factory;
      }
    ]);

})(angular);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .factory("stripeLoader", ["$q", "$interval", "$window", "userState",
    "STRIPE_PROD_KEY", "STRIPE_TEST_KEY",
    function ($q, $interval, $window, userState, STRIPE_PROD_KEY, STRIPE_TEST_KEY) {
      var deferred = $q.defer();

      var checkInterval = setInterval(function () {
        if ($window.Stripe) {
          $interval.cancel(checkInterval);

          deferred.resolve($window.Stripe);
        }
      }, 50);

      return function () {
        return deferred.promise.then(function (stripeClient) {
          var isTest = userState.getCopyOfUserCompany().isTest;

          stripeClient.setPublishableKey(isTest ? STRIPE_TEST_KEY : STRIPE_PROD_KEY);

          return stripeClient;
        });
      };
    }
  ]);

"use strict";

/*jshint camelcase: false */

angular.module("risevision.common.components.purchase-flow")
  .constant("STRIPE_ERRORS", {
    invalid_number: "Invalid Card Number.",
    incorrect_number: "Invalid Card Number.",
    invalid_cvc: "Invalid Security Code.",
    incorrect_cvc: "Invalid Security Code.",
    invalid_expiry_month: "Invalid Exp. Month.",
    invalid_expiry_year: "Invalid Exp. Year.",
    incorrect_zip: "Invalid ZIP / Postal Code. The ZIP / Postal Code provided is not associated with the billing address of this card.",
    expired_card: "The card provided has expired.",
    card_declined: "The card was declined. Please confirm all information is correct. If the problem continues try a different card.",
    missing: "No card associated with the account.",
    processing_error: "An unexpected error has occurred. Please try again."
  })
  .service("stripeService", ["$q", "$log", "$window", "stripeLoader", "STRIPE_ERRORS",
    function ($q, $log, $window, stripeLoader, STRIPE_ERRORS) {

      this.validateCard = function (card, isNew) {
        var errors = [];

        if (!$window.Stripe) {
          errors.push(STRIPE_ERRORS.processing_error);

          return errors;
        }

        if (isNew) {
          card.number = card.number ? card.number.trim() : "";

          if (!$window.Stripe.card.validateCardNumber(card.number)) {
            errors.push(STRIPE_ERRORS.invalid_number);
          }
          if (!$window.Stripe.card.validateCVC(card.cvc)) {
            errors.push(STRIPE_ERRORS.invalid_cvc);
          }
        }

        if (!$window.Stripe.card.validateExpiry(card.expMonth, card.expYear)) {
          errors.push("Invalid Expiry Date.");
        }

        return errors;
      };

      var _processStripeError = function (errorCode) {
        var message = STRIPE_ERRORS[errorCode];

        if (!message) {
          message = STRIPE_ERRORS.processing_error;
        }

        return message;
      };

      this.createToken = function (card, address) {
        var deferred = $q.defer();

        card.tokenError = null;
        var cardObject = {
          number: card.number,
          cvc: card.cvc,
          exp_month: card.expMonth,
          exp_year: card.expYear,
          name: card.name,
          //address fields
          address_line1: address.street,
          address_line2: address.unit,
          address_city: address.city,
          address_state: address.province,
          address_zip: address.postalCode,
          address_country: address.country
        };

        stripeLoader().then(function (stripeClient) {
          stripeClient.card.createToken(cardObject, function (status, response) {
            if (response && response.card && !response.error) {
              $log.debug("Create Token response: ", response);

              deferred.resolve(response);
            } else {
              console.error("Failed to get Card Token: ", response);

              card.tokenError = _processStripeError(response && response.error && response.error.code);

              deferred.reject();
            }
          });
        });

        return deferred.promise;
      };
    }
  ]);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .factory("taxExemptionFactory", ["storeService",
      function (storeService) {
        var factory = {
          taxExemption: {}
        };

        // Stop spinner - workaround for spinner not rendering
        factory.loading = false;

        factory.submitCertificate = function () {
          factory.taxExemptionError = null;
          factory.loading = true;

          return storeService.uploadTaxExemptionCertificate(factory.taxExemption.file)
            .then(function (blobKey) {
              return storeService.addTaxExemption(factory.taxExemption, blobKey);
            }).catch(function (error) {
              factory.taxExemptionError = error.message ||
                "An error ocurred while submitting your tax exemption. Please try again.";
            }).finally(function () {
              factory.loading = false;
            });

        };

        return factory;
      }
    ]);

})(angular);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .factory("purchaseFlowTracker", ["segmentAnalytics",
    function (segmentAnalytics) {
      var factory = {};

      factory.trackProductAdded = function (plan) {
        segmentAnalytics.track("Product Added", {
          id: plan.productCode,
          name: plan.name,
          price: plan.isMonthly ? plan.monthly.billAmount : plan.yearly.billAmount,
          quantity: 1,
          category: "Plans",
          inApp: false
        });
      };

      factory.trackPlaceOrderClicked = function (estimate) {
        segmentAnalytics.track("Place Order Clicked", {
          amount: estimate.total,
          currency: estimate.currency,
          inApp: false
        });
      };

      factory.trackOrderPayNowClicked = function (estimate) {
        segmentAnalytics.track("Order Pay Now Clicked", {
          amount: estimate.total,
          currency: estimate.currency,
          inApp: false
        });
      };

      return factory;
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("addressForm", ["$templateCache", "COUNTRIES", "REGIONS_CA", "REGIONS_US",
    function ($templateCache, COUNTRIES, REGIONS_CA, REGIONS_US) {
      return {
        restrict: "E",
        scope: {
          formObject: "=",
          addressObject: "=",
          hideCompanyName: "="
        },
        template: $templateCache.get("purchase-flow/address-form.html"),
        link: function ($scope) {
          $scope.countries = COUNTRIES;
          $scope.regionsCA = REGIONS_CA;
          $scope.regionsUS = REGIONS_US;

          $scope.isFieldInvalid = function (fieldName) {
            var form = $scope.formObject;
            var field = form[fieldName];

            return (field.$dirty || form.$submitted) && field.$invalid;
          };
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("billingAddress", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-billing-address.html"),
        link: function ($scope) {
          $scope.billingAddress = purchaseFactory.purchase.billingAddress;
          $scope.contact = purchaseFactory.purchase.contact;
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("checkoutSuccess", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-success.html"),
        link: function ($scope) {
          $scope.purchase = purchaseFactory.purchase;
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("paymentMethods", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-payment-methods.html"),
        link: function ($scope) {
          $scope.paymentMethods = purchaseFactory.purchase.paymentMethods;
          $scope.contactEmail = purchaseFactory.purchase.contact.email;

          $scope.purchase = purchaseFactory.purchase;
          $scope.showTaxExemptionModal = purchaseFactory.showTaxExemptionModal;

          $scope.getCardDescription = function (card) {
            return "***-" + card.last4 + ", " + card.cardType + (card.isDefault ? " (default)" : "");
          };

        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("provinceValidator", ["REGIONS_CA", "REGIONS_US",

    function (REGIONS_CA, REGIONS_US) {
      return {
        require: "ngModel",
        restrict: "A",
        scope: {
          provinceValidator: "="
        },
        link: function ($scope, elem, attr, ngModel) {
          var validator = function (value) {
            // Selected Country passed via the directive
            var country = $scope.provinceValidator;
            var valid = true;

            if (country) {
              if (country === "CA") {
                valid = value && _.find(REGIONS_CA, function (region) {
                  return region[1] === value;
                });
              } else if (country === "US") {
                valid = value && _.find(REGIONS_US, function (region) {
                  return region[1] === value;
                });
              }
            }

            ngModel.$setValidity("validProvince", !!valid);

            return value;
          };

          $scope.$watch("provinceValidator", function () {
            validator(ngModel.$modelValue);
          });

          ngModel.$parsers.unshift(validator);
          ngModel.$formatters.unshift(validator);
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("reviewPurchase", ["$templateCache", "userState", "purchaseFactory",
    function ($templateCache, userState, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-review-purchase.html"),
        link: function ($scope) {
          $scope.purchase = purchaseFactory.purchase;
          $scope.selectedCompany = userState.getCopyOfSelectedCompany();

          $scope.getAdditionalDisplaysPrice = function () {
            var plan = $scope.purchase.plan;
            if (plan.isMonthly) {
              return (plan.additionalDisplayLicenses * plan.monthly.priceDisplayMonth);
            } else {
              return (plan.additionalDisplayLicenses * plan.yearly.priceDisplayYear);
            }
          };

          $scope.showTaxExemptionModal = function () {
            purchaseFactory.showTaxExemptionModal()
              .then(function () {
                if (purchaseFactory.purchase.taxExemptionSent) {
                  purchaseFactory.getEstimate();
                }

              });
          };

        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("reviewSubscription", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get(
          "purchase-flow/checkout-review-subscription.html"),
        link: function ($scope) {
          $scope.plan = purchaseFactory.purchase.plan;

          var _getAdditionalDisplayLicenses = function () {
            var licenses = $scope.plan.additionalDisplayLicenses;

            // Workaround for checking Integer value
            // Using Number.isInteger(licenses) causes unit tests to fail
            // if (Number.isInteger(licenses) && licenses >= 0) {
            // if (_.isInteger(licenses) && licenses >= 0) {
            if (!isNaN(licenses) && (licenses % 1 === 0) && licenses >= 0) {
              return licenses;
            }

            return 0;
          };

          $scope.incrementLicenses = function () {
            $scope.plan.additionalDisplayLicenses = _getAdditionalDisplayLicenses() + 1;
          };

          $scope.decrementLicenses = function () {
            if (_getAdditionalDisplayLicenses() === 0) {
              $scope.plan.additionalDisplayLicenses = 0;
            }
            if ($scope.plan.additionalDisplayLicenses > 0) {
              $scope.plan.additionalDisplayLicenses--;
            }
          };

          $scope.getMonthlyPrice = function () {
            return $scope.plan.monthly.billAmount +
              (_getAdditionalDisplayLicenses() * $scope.plan.monthly.priceDisplayMonth);
          };

          $scope.getYearlyPrice = function () {
            return $scope.plan.yearly.billAmount +
              (_getAdditionalDisplayLicenses() * $scope.plan.yearly.priceDisplayYear);
          };

        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("shippingAddress", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-shipping-address.html"),
        link: function ($scope) {
          $scope.shippingAddress = purchaseFactory.purchase.shippingAddress;
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .directive("yearSelector", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/year-selector.html"),
        replace: "true",
        scope: {
          ngModel: "=?"
        },
        controller: ["$scope",
          function ($scope) {
            var baseYear = new Date().getFullYear();
            var MAX_COUNT = 20;

            $scope.init = function () {
              $scope.years = [];

              if ($scope.ngModel && $scope.ngModel < baseYear) {
                $scope.years.push(($scope.ngModel).toString());
              }

              for (var i = 0; i < MAX_COUNT; i++) {
                $scope.years.push((baseYear + i).toString());
              }
            };

            $scope.init();
          }
        ]

      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")

.value("PURCHASE_STEPS", [{
  name: "Billing Address",
  index: 0,
  formName: "billingAddressForm"
}, {
  name: "Shipping Address",
  index: 1,
  formName: "shippingAddressForm"
}, {
  name: "Payment Method",
  index: 2,
  formName: "paymentMethodsForm"
}, {
  name: "Purchase Review",
  index: 3
}])

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$loading", "purchaseFactory", "addressFactory", "plansFactory", "PURCHASE_STEPS",
  function ($scope, $modalInstance, $loading, purchaseFactory, addressFactory, plansFactory, PURCHASE_STEPS) {

    $scope.form = {};
    $scope.factory = purchaseFactory;

    $scope.PURCHASE_STEPS = PURCHASE_STEPS;
    $scope.currentStep = 0;
    $scope.finalStep = false;

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

    $scope.validateAddress = function (addressObject, contactObject, isShipping) {
      if (!_isFormValid()) {
        return;
      }

      purchaseFactory.loading = true;

      addressFactory.validateAddress(addressObject)
        .finally(function () {
          purchaseFactory.loading = false;

          if (!addressObject.validationError) {
            addressFactory.updateContact(contactObject);
            addressFactory.updateAddress(addressObject, contactObject, isShipping);

            $scope.setNextStep();
          }
        });
    };

    $scope.validatePaymentMethod = function () {
      if (!_isFormValid()) {
        return;
      }

      purchaseFactory.validatePaymentMethod()
        .then($scope.setNextStep);
    };

    $scope.completePayment = function () {
      purchaseFactory.completePayment()
        .then(function () {
          if (!purchaseFactory.purchase.checkoutError) {
            $scope.setNextStep();
          }
        });
    };

    $scope.setNextStep = function () {
      if (!_isFormValid()) {
        return;
      }

      if (($scope.finalStep && $scope.currentStep < 2) || $scope.currentStep === 2) {
        $scope.currentStep = 3;

        $scope.finalStep = true;

        purchaseFactory.getEstimate();
      } else {
        $scope.currentStep++;
      }

    };

    $scope.setPreviousStep = function () {
      if ($scope.currentStep > 0) {
        $scope.currentStep--;
      } else {
        $modalInstance.close();
        plansFactory.showPlansModal();
      }
    };

    $scope.setCurrentStep = function (index) {
      purchaseFactory.purchase.checkoutError = null;

      if (index === -1) {
        $modalInstance.close();
        plansFactory.showPlansModal();
      }

      $scope.currentStep = index;
    };

    $scope.close = function () {
      if (!purchaseFactory.purchase.reloadingCompany) {
        $modalInstance.close("success");
      } else {
        purchaseFactory.loading = true;

        $scope.$watch("factory.purchase.reloadingCompany", function (loading) {
          if (!loading) {
            purchaseFactory.loading = false;

            $modalInstance.close("success");
          }
        });
      }
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

  }

]);

angular.module("risevision.common.components.purchase-flow")
  .controller("TaxExemptionModalCtrl", ["$scope", "$modalInstance", "$loading", "taxExemptionFactory",
    function ($scope, $modalInstance, $loading, taxExemptionFactory) {

      $scope.form = {};
      $scope.factory = taxExemptionFactory;

      // $scope.countries = COUNTRIES;
      // $scope.regionsCA = REGIONS_CA;
      // $scope.regionsUS = REGIONS_US;

      $scope.$watch("factory.loading", function (loading) {
        if (loading) {
          $loading.start("tax-exemption-modal");
        } else {
          $loading.stop("tax-exemption-modal");
        }
      });

      $scope.submit = function () {
        if ($scope.form.taxExemptionForm && $scope.form.taxExemptionForm.$invalid) {
          return;
        }

        return taxExemptionFactory.submitCertificate()
          .then(function () {
            if (!taxExemptionFactory.taxExemptionError) {
              $modalInstance.close(true);
            }
          });
      };

      $scope.close = function () {
        $modalInstance.dismiss();
      };

      $scope.selectFile = function () {
        setTimeout(function () {
          document.querySelector("#inputExemption").click();
        }, 0);
      };

      $scope.setFile = function (element) {
        $scope.$apply(function () {
          taxExemptionFactory.taxExemption.file = element.files[0];
        });
      };

      $scope.clearFile = function () {
        taxExemptionFactory.taxExemption.file = null;
        document.querySelector("#inputExemption").value = "";
      };

      // $scope.openDatepicker = function ($event) {
      //   $event.preventDefault();
      //   $event.stopPropagation();
      // 
      //   $scope.datepicker = true;
      // };

      // $scope.countryFilter = function (country) {
      //   return country.code === "CA" || country.code === "US";
      // };

      $scope.isFieldInvalid = function (fieldName) {
        var form = $scope.form.taxExemptionForm;
        var field = form[fieldName];

        return (field.$dirty || form.$submitted) && field.$invalid;
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .filter("cardLastFour", [

    function () {
      return function (last4) {
        last4 = last4 ? last4 : "****";
        last4 = last4.length < 4 ? ("****".substr(last4.length) + last4) : last4;
        last4 = last4.length > 4 ? last4.substr(last4.length - 4) : last4;

        return "***-" + last4;
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .filter("countryName", ["COUNTRIES",
    function (COUNTRIES) {
      return function (countryCode) {
        var name = countryCode;
        for (var i = 0; i < COUNTRIES.length; i++) {
          if (COUNTRIES[i].code === countryCode) {
            name = COUNTRIES[i].name;

            break;
          }
        }
        return name;
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .filter("paddedMonth", [

    function () {
      return function (month) {
        if (month < 10) {
          month = "0" + month;
        }

        return month;
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/address-form.html',
    '<div class="form-group" ng-if="hideCompanyName !== true" ng-class="{ \'has-error\': isFieldInvalid(\'companyName\') }"><label for="address-form-companyName" class="control-label">Company Name *</label> <input id="address-form-companyName" name="companyName" type="text" class="form-control" ng-model="addressObject.name" autocomplete="organization" aria-required="true" tabindex="1" required=""></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'street\') }"><label for="address-form-streetAddress" class="control-label">Street Address *</label> <input id="address-form-streetAddress" name="street" type="text" class="form-control" ng-model="addressObject.street" autocomplete="address-line1" pattern=".{0,50}" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group"><label for="address-form-unit" class="control-label">Unit</label> <input id="address-form-unit" type="text" name="unit" class="form-control" ng-model="addressObject.unit" autocomplete="address-line2" aria-required="true" tabindex="1" pattern=".{0,100}"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'city\') }"><label for="address-form-city" class="control-label">City *</label> <input id="address-form-city" name="city" type="text" class="form-control" ng-model="addressObject.city" autocomplete="address-level2" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'country\') }"><label for="address-form-country" class="control-label">Country *</label><select id="address-form-country" name="country" autocomplete="country" class="form-control" ng-model="addressObject.country" ng-options="c.code as c.name for c in countries" empty-select-parser="" aria-required="true" tabindex="1" required=""><option ng-show="false" value="">&lt; Select Country &gt;</option></select></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'province\') }"><label class="control-label">State/Province/Region <span ng-hide="addressObject.country !== \'US\' && addressObject.country !== \'CA\'">*</span></label> <label for="province" class="hidden">Enter Province or Region</label> <input name="province" type="text" class="form-control" ng-model="addressObject.province" autocomplete="address-level1" ng-show="addressObject.country !== \'US\' && addressObject.country !== \'CA\'" province-validator="addressObject.country" tabindex="1"> <label for="province-selector" class="hidden">Select Province (Canada)</label><select name="province-selector" class="form-control selectpicker" ng-model="addressObject.province" ng-options="c[1] as c[0] for c in regionsCA" autocomplete="address-level1" ng-show="addressObject.country === \'CA\'" empty-select-parser="" tabindex="1"><option ng-show="false" value="">&lt; Select Province &gt;</option></select><label for="state-selector" class="hidden">Select State (United States)</label><select name="state-selector" class="form-control selectpicker" ng-model="addressObject.province" ng-options="c[1] as c[0] for c in regionsUS" autocomplete="address-level1" ng-show="addressObject.country === \'US\'" empty-select-parser="" tabindex="1"><option ng-show="false" value="">&lt; Select State &gt;</option></select></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'postalCode\') }"><label for="address-form-postalCode" class="control-label">ZIP/Postal Code *</label> <input id="address-form-postalCode" name="postalCode" type="text" class="form-control" ng-model="addressObject.postalCode" autocomplete="postal-code" pattern=".{0,11}" aria-required="true" tabindex="1" required=""></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-billing-address.html',
    '<div id="checkout-billing-address" class="address-editor"><form id="form.billingAddressForm" role="form" class="u_margin-md-top" name="form.billingAddressForm" autocomplete="on" novalidate=""><div class="alert alert-danger" ng-show="form.billingAddressForm.$submitted && form.billingAddressForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="billingAddress.validationError"><strong>Address Validation Error</strong> {{billingAddress.validationError}}</div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.firstName.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.firstName.$invalid }"><label for="contact-firstName" class="control-label">First Name *</label> <input id="contact-firstName" type="text" class="form-control" name="firstName" ng-model="contact.firstName" autocomplete="given-name" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.lastName.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.lastName.$invalid }"><label for="contact-lastName" class="control-label">Last Name *</label> <input id="contact-lastName" type="text" class="form-control" name="lastName" ng-model="contact.lastName" autocomplete="family-name" aria-required="true" tabindex="1" required=""></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.email.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.email.$invalid }"><label for="contact-email" class="control-label">Email *</label> <input id="contact-email" type="email" class="form-control" name="email" ng-model="contact.email" autocomplete="email" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group"><label for="contact-phone" class="control-label">Telephone</label> <input id="contact-phone" name="tel" type="tel" class="form-control" ng-model="contact.telephone" autocomplete="tel" tabindex="1"></div></div></div><address-form form-object="form.billingAddressForm" address-object="billingAddress"></address-form><hr><div class="row"><div class="col-xs-12"><button id="backButton" type="button" class="btn btn-default pull-left" ng-click="setPreviousStep()" ng-hide="finalStep" aria-label="Go back to Subscription Details" translate="" tabindex="2">common.back</button> <button id="continueButton" aria-label="Continue to Shipping Address" type="submit" form="form.billingAddressForm" class="btn btn-primary pull-right" ng-click="validateAddress(billingAddress, contact, false)" translate="" tabindex="1">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-payment-methods.html',
    '<div id="checkout-payment-methods"><form id="form.paymentMethodsForm" role="form" class="u_margin-md-top" name="form.paymentMethodsForm" novalidate=""><div class="row u_margin-md-top"><div class="col-md-8 col-xs-12 form-inline"><div class="form-group"><label for="payment-method-select" class="u_margin-right">Payment Method</label><select id="payment-method-select" class="form-control selectpicker" ng-model="paymentMethods.paymentMethod" tabindex="1"><option value="card">Credit Card</option><option value="invoice">Invoice Me</option></select></div></div></div><hr><div id="credit-card-form" ng-if="paymentMethods.paymentMethod === \'card\'"><div class="row" ng-if="false"><div class="col-md-12"><div class="form-group"><label for="credit-card-select" class="hidden">Add New Credit Card</label><select id="credit-card-select" class="form-control selectpicker" ng-model="paymentMethods.selectedCard" ng-options="c as getCardDescription(c) for c in paymentMethods.existingCreditCards track by c.id"><option value="">Add New Credit Card</option></select></div></div></div><div id="new-credit-card-form" ng-if="paymentMethods.selectedCard.isNew"><div class="alert alert-danger" ng-show="form.paymentMethodsForm.$submitted && form.paymentMethodsForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="paymentMethods.newCreditCard.validationErrors.length"><strong>Card Validation Error<span ng-show="paymentMethods.newCreditCard.validationErrors.length > 1">s</span></strong><ul><li ng-repeat="error in paymentMethods.newCreditCard.validationErrors">{{error}}</li></ul></div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="paymentMethods.newCreditCard.tokenError"><strong>Card Processing Error</strong> {{paymentMethods.newCreditCard.tokenError}}</div><div class="row"><div class="col-md-12"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardholderName.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardholderName.$invalid }"><label for="new-card-name" lass="control-label">Cardholder Name *</label> <input id="new-card-name" aria-required="true" tabindex="1" type="text" class="form-control" name="cardholderName" data-stripe="name" ng-model="paymentMethods.newCreditCard.name" autocomplete="cc-name" required=""></div></div></div><div class="row"><div class="col-md-12"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardNumber.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardNumber.$invalid }"><label for="new-card-number" class="control-label">Card Number *</label> <input id="new-card-number" type="text" aria-required="true" tabindex="1" class="form-control" placeholder="0000 0000 0000 0000" name="cardNumber" data-stripe="number" ng-model="paymentMethods.newCreditCard.number" autocomplete="cc-number" required=""></div></div></div><div class="row"><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardExpiryMonth.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardExpiryMonth.$invalid }"><label for="new-card-expiry-month" class="control-label">Expiry Month *</label><select id="new-card-expiry-month" aria-required="true" tabindex="1" class="form-control" name="cardExpiryMonth" data-stripe="exp-month" ng-model="paymentMethods.newCreditCard.expMonth" autocomplete="cc-exp-month" integer-parser="" required=""><option ng-show="false" value="">&lt; Select Month &gt;</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div></div><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardExpiryYear.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardExpiryYear.$invalid }"><label for="expiry-year" class="control-label">Expiry Year *</label><year-selector id="new-card-expiry-year" class="form-control" name="cardExpiryYear" data-stripe="exp-year" ng-model="paymentMethods.newCreditCard.expYear" tabindex="1" autocomplete="cc-exp-year" integer-parser="" required=""></year-selector></div></div><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardCvc.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardCvc.$invalid }"><label for="new-card-cvc" class="control-label">Security Code *</label> <input id="new-card-cvc" aria-required="true" tabindex="1" type="text" pattern="[0-9]*" class="form-control" name="cardCvc" data-stripe="cvc" ng-model="paymentMethods.newCreditCard.cvc" autocomplete="cc-csc" maxlength="4" required=""></div></div></div><div class="checkbox"><label for="toggleMatchBillingAddress" aria-label="Match Billing Address"><input type="checkbox" id="toggleMatchBillingAddress" ng-model="paymentMethods.newCreditCard.useBillingAddress" tabindex="1"> Same As Billing Address</label></div><div id="new-card-address"><address-form form-object="form.paymentMethodsForm" address-object="paymentMethods.newCreditCard.address" hide-company-name="true" ng-if="!paymentMethods.newCreditCard.useBillingAddress"></address-form></div></div><div id="existing-credit-card-form" ng-if="!paymentMethods.selectedCard.isNew"><div id="errorBox" class="alert alert-danger" role="alert" ng-show="paymentMethods.selectedCard.validationErrors.length"><strong>Card Validation Error</strong> {{paymentMethods.selectedCard.validationErrors[0]}}</div><div class="row"><div class="col-md-12"><div class="form-group"><label for="existing-card-name" class="control-label">Cardholder Name</label> <input id="existing-card-name" type="text" class="form-control" placeholder="{{paymentMethods.selectedCard.name}}" tabindex="1" disabled="disabled"></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="existing-card-number" class="control-label">Card Number</label> <input id="existing-card-number" type="text" class="form-control" placeholder="{{paymentMethods.selectedCard.last4 | cardLastFour}}" tabindex="1" disabled="disabled"></div></div></div><div class="row form-group"><div class="col-md-4"><div class="form-group"><label for="existing-card-expiry-month" class="control-label">Expiry Month</label> <input id="existing-card-expiry-month" type="text" class="form-control masked" placeholder="{{paymentMethods.selectedCard.expMonth | paddedMonth}}" disabled="disabled" tabindex="1"></div></div><div class="col-md-4"><div class="form-group"><label for="existing-card-expiry-year" class="control-label">Expiry Year</label> <input id="existing-card-expiry-year" type="text" class="form-control masked" placeholder="{{paymentMethods.selectedCard.expYear}}" tabindex="1" disabled="disabled"></div></div></div></div></div><div id="generateInvoice" ng-if="paymentMethods.paymentMethod === \'invoice\'"><p>If you\'d like to be invoiced for your purchase (rather than paying now by credit card), please enter a <b>Purchase Order</b> number and continue with checkout.</p><p>You will receive an invoice for this purchase total at <span class="font-weight-bold">{{contactEmail}}</span>. Invoices are due within 30 days of creation, payable by check, wire transfer, or credit card.</p><p>Please note your invoice is generated only once this checkout is completed.</p><div class="row"><div class="col-xs-12 col-sm-6"><div class="form-group"><label for="invoice-po-number" class="control-label">Purchase Order Number</label> <input id="invoice-po-number" type="text" class="form-control" name="purchaseOrder" ng-model="paymentMethods.purchaseOrderNumber" tabindex="1"></div></div></div><div id="generateInvoiceOverdue" class="hidden"><p class="text-danger">You have overdue invoice payments on your account.</p><p>In order to complete this purchase by invoice, please pay your outstanding invoices <a href="#">here</a>.</p></div></div><hr><div class="row"><div class="col-xs-12 text-center u_margin-sm-bottom"><a id="showTaxExemption" href="#" aria-label="Are you Tax Exempt?" ng-click="showTaxExemptionModal()" ng-show="!purchase.taxExemptionSent" tabindex="3" translate="">Are you Tax Exempt?</a><h5 ng-show="purchase.taxExemptionSent">Tax Exemption Submitted</h5></div></div><div class="row"><div class="col-xs-12"><button id="backButton" type="button" aria-label="Go back to Shipping Address" class="btn btn-default pull-left" ng-click="setPreviousStep()" ng-hide="finalStep" tabindex="2" translate="">common.back</button> <button id="continueButton" type="submit" aria-label="Continue to Purchase Review" form="form.paymentMethodsForm" class="btn btn-primary pull-right" ng-click="validatePaymentMethod()" tabindex="1" translate="">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-review-purchase.html',
    '<div id="checkout-review-purchase"><div id="errorBox" class="alert alert-danger" role="alert" ng-show="purchase.estimate.estimateError"><div class="row"><div class="col-xs-9"><p><strong>Tax Estimate Error</strong> {{purchase.estimate.estimateError}}</p></div><div class="col-xs-3"><a class="btn btn-default btn-block" href="#" ng-click="factory.getEstimate()">Retry</a></div></div></div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="purchase.checkoutError"><strong>Payment Error</strong> {{purchase.checkoutError}}</div><div class="row"><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Purchasing For</h4><span class="font-weight-bold">{{selectedCompany.name}}</span><br>Company ID: {{selectedCompany.id}}</div><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Payment Method <button aria-label="Edit Payment Method" class="btn btn-default btn-xs" ng-click="setCurrentStep(2)" tabindex="1">Edit</button></h4><div ng-show="purchase.paymentMethods.paymentMethod === \'card\'"><span class="font-weight-bold">{{purchase.paymentMethods.selectedCard.cardType}}</span><br>{{purchase.paymentMethods.selectedCard.last4 | cardLastFour}}<br>Exp: {{purchase.paymentMethods.selectedCard.expMonth | paddedMonth}}/{{purchase.paymentMethods.selectedCard.expYear}}</div><div ng-show="purchase.paymentMethods.paymentMethod === \'invoice\'"><span class="font-weight-bold">Paying by Invoice</span><br>Due Date: {{purchase.paymentMethods.invoiceDate | date: \'d-MMM-yyyy\'}} <span ng-if="purchase.paymentMethods.purchaseOrderNumber"><br>Purchase Order Number: {{purchase.paymentMethods.purchaseOrderNumber}}</span></div></div></div><div class="row"><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Billing Address <button aria-label="Edit Billing Address" class="btn btn-default btn-xs" ng-click="setCurrentStep(0)" tabindex="1">Edit</button></h4>{{purchase.contact.firstName}} {{purchase.contact.lastName}}<br>{{purchase.contact.email}}<br>{{purchase.billingAddress.name}}<br>{{purchase.billingAddress.street}}<br><span ng-show="purchase.billingAddress.unit">{{purchase.billingAddress.unit}}<br></span> {{purchase.billingAddress.city}}, <span ng-show="purchase.billingAddress.province">{{purchase.billingAddress.province}},</span> {{purchase.billingAddress.postalCode}}<br>{{purchase.billingAddress.country | countryName}}</div><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Shipping Address <button aria-label="Edit Shipping Address" class="btn btn-default btn-xs" ng-click="setCurrentStep(1)" tabindex="1">Edit</button></h4>{{purchase.shippingAddress.name}}<br>{{purchase.shippingAddress.street}}<br><span ng-show="purchase.shippingAddress.unit">{{purchase.shippingAddress.unit}}<br></span> {{purchase.shippingAddress.city}}, <span ng-show="purchase.shippingAddress.province">{{purchase.shippingAddress.province}},</span> {{purchase.shippingAddress.postalCode}}<br>{{purchase.shippingAddress.country | countryName}}</div></div><br><hr class="u_margin-xs-top u_margin-xs-bottom"><div class="row"><div class="col-xs-8"><h4 class="u_margin-sm-bottom">Subscription Details <button aria-label="Edit Subscription Details" class="btn btn-default btn-xs" ng-click="setCurrentStep(-1)" tabindex="1">Edit</button></h4></div></div><div class="row"><div class="col-sm-6 col-xs-6 text-right"><p>{{purchase.plan.name}}<br><span ng-show="purchase.estimate.couponAmount > 0">Education and Non-profit discount<br></span> <span ng-repeat="tax in purchase.estimate.taxes">{{tax.taxName}}<br></span> Total Tax:</p><span class="order-total">Order Total:</span></div><div class="col-sm-4 col-xs-6 text-right"><p>${{purchase.estimate.subTotal}}<br><span ng-show="purchase.estimate.couponAmount > 0">-${{purchase.estimate.couponAmount}}<br></span> <span ng-repeat="tax in purchase.estimate.taxes">${{tax.taxAmount | number:2}}<br></span> ${{purchase.estimate.totalTax | number:2}}</p><span class="order-total">${{purchase.estimate.total | number:2}} <span class="u_margin-left text-subtle">{{purchase.estimate.currency | uppercase}}</span></span></div></div><div class="row"><hr class="u_margin-sm-top"></div><div class="row"><div class="col-xs-12 text-center u_margin-sm-bottom"><a id="showTaxExemption" href="#" aria-label="Are you Tax Exempt?" ng-click="showTaxExemptionModal()" ng-show="purchase.estimate.totalTax > 0 && !purchase.taxExemptionSent" tabindex="3" translate="">Are you Tax Exempt?</a><h5 ng-show="purchase.taxExemptionSent">Tax Exemption Submitted</h5></div></div><div class="row"><div class="col-xs-8 col-xs-offset-2 u_margin-md-bottom"><button id="payButton" class="btn btn-primary btn-hg btn-block" ng-click="completePayment()" tabindex="1" aria-label="Complete Payment"><span id="payLabel" ng-if="purchase.paymentMethods.paymentMethod === \'card\'">Pay ${{purchase.estimate.total | number:2}} Now</span> <span id="invoiceLabel" ng-if="purchase.paymentMethods.paymentMethod === \'invoice\'">Invoice Me ${{purchase.estimate.total | number:2}} Now</span></button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-review-subscription.html',
    '<div id="checkout-review-subscription"><form id="reviewSubscriptionForm" role="form" name="form.reviewSubscriptionForm" autocomplete="on" novalidate=""><h3 class="text-center" translate="" translate-values="{ planName: plan.name }">common-header.purchase.review-subscription.plan-name</h3><div class="subscription-summary text-center"><div class="subscription-summary-item"><div class="stat"><div class="stat-value">${{plan.monthly.priceDisplayMonth}}</div><div class="stat-legend">{{ \'common-header.purchase.review-subscription.per-display\' | translate}} {{ \'common-header.purchase.review-subscription.per-month\' | translate}}</div></div></div><div class="subscription-summary-divider">x</div><div class="subscription-summary-item"><div class="stat"><div class="stat-value">{{plan.proLicenseCount}}</div><div class="stat-legend"><span ng-show="plan.proLicenseCount === 1" translate="">common-header.purchase.review-subscription.display-included</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.purchase.review-subscription.displays-included</span></div></div></div></div><hr class="u_remove-margin"><div class="text-center flex-additive-rule"><b>+</b></div><div class="row"><div class="col-xs-12 u_margin-md-bottom" translate="" translate-values="{ planName: plan.name, priceDisplayMonth: plan.monthly.priceDisplayMonth }">common-header.purchase.review-subscription.need-more-displays</div><div class="col-xs-12"><div class="input-group spinner" ng-class="{ \'has-error\': form.reviewSubscriptionForm.additionalLicenses.$invalid }"><div class="input-group-btn-vertical"><button class="btn btn-white" type="button" ng-click="incrementLicenses()"><i class="fa fa-caret-up"></i></button> <button class="btn btn-white" type="button" ng-click="decrementLicenses()"><i class="fa fa-caret-down"></i></button></div><label for="additionalLicenses"><input id="additionalLicenses" name="additionalLicenses" type="number" class="form-control" ng-model="plan.additionalDisplayLicenses" min="0" max="999" pattern="[0-9]{1,3}" tabindex="1" aria-required="true" required=""> <span class="icon-right u_align-middle" translate="">common-header.purchase.review-subscription.additional-licenses</span></label></div></div><div class="col-xs-12"><hr></div><div class="col-xs-12 u_margin-sm-bottom"><b class="pull-left" translate="">common-header.purchase.review-subscription.total</b> <b class="pull-right" translate="">common-header.purchase.review-subscription.pay-yearly</b></div><div class="col-xs-12"><div class="panel payment-recurrence-selector" ng-class="{ \'has-error\': form.reviewSubscriptionForm.billingPeriod.$invalid }"><div class="radio" ng-class="{ active: plan.isMonthly }"><label for="monthlyBilling"><input type="radio" name="billingPeriod" id="monthlyBilling" ng-value="true" ng-model="plan.isMonthly" aria-required="true" tabindex="1" required=""> <span translate="" translate-values="{ monthlyPrice: getMonthlyPrice() }">common-header.purchase.review-subscription.billed-monthly</span></label></div><div class="radio" ng-class="{ active: !plan.isMonthly }"><label for="yearlyBilling"><input type="radio" name="billingPeriod" id="yearlyBilling" ng-value="false" ng-model="plan.isMonthly" aria-required="true" tabindex="1" required=""> <span translate="" translate-values="{ yearlyPrice: getYearlyPrice() }">common-header.purchase.review-subscription.billed-yearly</span></label><div class="label label-success" translate="" translate-values="{ saveYearly: plan.yearly.save }">common-header.purchase.review-subscription.save-yearly</div></div></div></div></div><hr><div class="row"><div class="col-xs-12"><button id="continueButton" type="submit" aria-label="Continue to Billing Address" tabindex="1" form="form.reviewSubscriptionForm" class="btn btn-primary pull-right" ng-click="setNextStep()" translate="">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-shipping-address.html',
    '<div id="checkout-shipping-address" class="address-editor"><form id="form.shippingAddressForm" role="form" class="u_margin-md-top" name="form.shippingAddressForm" autocomplete="on" novalidate=""><div class="alert alert-danger" ng-show="form.shippingAddressForm.$submitted && form.shippingAddressForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="shippingAddress.validationError"><strong>Address Validation Error</strong> {{shippingAddress.validationError}}</div><address-form form-object="form.shippingAddressForm" address-object="shippingAddress"></address-form><hr><div class="row"><div class="col-xs-12"><button id="backButton" aria-label="Go back to Billing Address" type="button" class="btn btn-default pull-left" ng-click="setPreviousStep()" ng-hide="finalStep" tabindex="2" translate="">common.back</button> <button id="continueButton" type="submit" form="form.shippingAddressForm" class="btn btn-primary pull-right" aria-label="Continue to Payment Method" ng-click="validateAddress(shippingAddress, null, true)" tabindex="1" translate="">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-success.html',
    '<div id="checkout-success"><h3 class="text-center u_margin-md-top" ng-if="purchase.paymentMethods.paymentMethod === \'card\'">Payment Successful</h3><h3 class="text-center u_margin-md-top" ng-if="purchase.paymentMethods.paymentMethod === \'invoice\'">Invoice Generated</h3><div class="text-center u_padding-md"><img src="https://s3.amazonaws.com/Rise-Images/Icons/online.svg" width="72px" alt="Payment Successful"><br><br><p ng-if="purchase.paymentMethods.paymentMethod === \'card\'">Your payment to Rise Vision was successful. You can keep track of your billing information in the <a ui-sref="apps.billing.home">Billing</a> section of your account.</p><p ng-if="purchase.paymentMethods.paymentMethod === \'invoice\'">An invoice for payment has been sent to <span class="font-weight-bold">{{purchase.contact.email}}</span>. Payment is due by {{purchase.paymentMethods.invoiceDate | date: \'d-MMM-yyyy\'}}. <span class="hidden">You can view this invoice <a href="#">here</a>.</span></p><br></div><hr><div class="row"><div class="col-xs-12 text-center"><button id="doneButton" class="btn btn-default" ng-click="close()" aria-label="Done" tabindex="1">Done</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/purchase-modal.html',
    '<div rv-spinner="" rv-spinner-key="purchase-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-label="close" tabindex="2" ng-hide="currentStep === 5"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">Checkout</h3></div><div class="steps"><div ng-repeat="step in PURCHASE_STEPS" class="step-item" ng-class="{ active: currentStep === step.index, complete: currentStep > step.index }"><span>{{step.name}}</span></div></div><div id="purchase-modal" class="modal-body checkout-modal" stop-event="touchend"><billing-address ng-if="currentStep === 0"></billing-address><shipping-address ng-if="currentStep === 1"></shipping-address><payment-methods ng-if="currentStep === 2"></payment-methods><review-purchase ng-if="currentStep === 3"></review-purchase><checkout-success ng-if="currentStep === 4"></checkout-success></div><div id="security-branding" class="modal-footer text-center" ng-show="currentStep > 2 && currentStep < 5"><span class="text-muted"><i class="fa fa-lock icon-left"></i> Secure Checkout from ChargeBee and <img alt="powered by Stripe" height="16" src="https://s3.amazonaws.com/Rise-Images/UI/powered_by_stripe.svg"></span></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/tax-exemption.html',
    '<div rv-spinner="" rv-spinner-key="tax-exemption-modal" rv-spinner-start-active="1"><div class="modal-header"><button ng-click="close()" type="button" class="close" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title">Add Tax Exemption</h3></div><div class="modal-body"><form id="form.taxExemptionForm" role="form" name="form.taxExemptionForm" class="u_margin-md-top" novalidate=""><div class="alert alert-danger" ng-show="form.taxExemptionForm.$submitted && form.taxExemptionForm.$invalid">Please complete the missing information below.</div><div class="alert alert-danger" ng-show="factory.taxExemptionError">{{factory.taxExemptionError}}</div><div class="row"><div class="col-xs-12"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'number\') }"><label for="number" class="control-label">Tax Exemption Number *</label> <input name="number" id="number" type="text" class="form-control" ng-model="factory.taxExemption.number" tabindex="1" maxlength="25" required=""></div></div></div><div class="row"><div class="col-md-9"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'fileName\') }"><label for="fileName" class="control-label">Tax Exemption Document (Image or PDF only) *</label> <input id="inputExemption" type="file" accept="application/pdf,image/*" onchange="angular.element(this).scope().setFile(this)" style="display:none"><div class="input-group"><input name="fileName" id="fileName" class="form-control" type="text" readonly="readonly" ng-model="factory.taxExemption.file.name" required=""> <span class="input-group-btn"><a href="#" ng-click="clearFile()" tabindex="1" class="btn btn-default"><i class="fa fa-times"></i></a></span></div></div></div><div class="col-md-3"><div class="form-group"><label for="selectFile" class="control-label col-md-6 hidden-xs">&nbsp;</label> <button name="selectFile" id="selectFile" type="button" ng-click="selectFile()" tabindex="1" class="btn btn-default col-md-9">Attach File</button></div></div></div><hr><div class="row"><div class="col-xs-12"><button type="button" ng-click="close()" aria-label="Cancel Tax Exemption" tabindex="2" class="btn btn-default pull-left" translate="">common.cancel</button> <button id="submitButton" type="submit" form="form.taxExemptionForm" ng-click="submit()" aria-label="Submit Tax Exemption" tabindex="1" class="btn btn-primary pull-right">Submit Tax Exemption</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/year-selector.html',
    '<select ng-options="n as n for n in years"><option ng-show="false" value="">&lt; Select Year &gt;</option></select>');
}]);
})();
