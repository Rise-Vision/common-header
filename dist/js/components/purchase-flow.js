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
  .service("addressFactory", ["$q", "$log", "validateAddress",
    function ($q, $log, validateAddress) {
      var factory = {};

      var _addressesAreIdentical = function (src, result) {
        var dest = {
          street: result.line1,
          unit: result.line2 && result.line2.length ? result.line2 : "",
          city: result.city,
          postalCode: result.postalCode,
          province: result.region,
          country: result.country
        };

        if (dest.street === src.street &&
          dest.unit === src.unit &&
          dest.city === src.city &&
          dest.country === src.country &&
          dest.postalCode === src.postalCode &&
          dest.province === src.province) {
          return true;
        }
        return false;
      };

      factory.validateAddress = function (addressObject) {
        addressObject.validationError = false;

        if (addressObject.country !== "CA" && addressObject.country !== "US") {
          $log.debug("Address Validation skipped for country: ", addressObject.country);

          return $q.resolve();
        } else {
          return validateAddress(addressObject)
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

      return factory;
    }
  ]);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .factory("purchaseFactory", ["$modal", "$templateCache", "userState",
      function ($modal, $templateCache, userState) {
        var _factory = {};

        var _cleanContactObj = function (c) {
          return {
            username: c.username,
            firstName: c.firstName,
            lastName: c.lastName,
            email: c.email,
            telephone: c.telephone
          };
        };

        _factory.showPurchaseModal = function (plan, isMonthly) {
          $modal.open({
            template: $templateCache.get("purchase-flow/purchase-modal.html"),
            controller: "PurchaseModalCtrl",
            size: "md",
            resolve: {
              plan: function () {
                var selectedPlan = angular.copy(plan);

                selectedPlan.isMonthly = isMonthly;

                selectedPlan.billingAddress = userState.getCopyOfUserCompany();
                selectedPlan.shippingAddress = userState.getCopyOfSelectedCompany();
                selectedPlan.contact = _cleanContactObj(userState.getCopyOfProfile());
                selectedPlan.paymentMethods = {
                  paymentMethod: "card",
                  existingCreditCards: [
                    // {
                    //   "id": "card_asdfwrdsfs",
                    //   "last4": "4242",
                    //   "expMonth": 1,
                    //   "expYear": 2019,
                    //   "name": "Alex",
                    //   "cardType": "Visa",
                    //   "isDefault": true
                    // }, {
                    //   "id": "card_asdfw4ewrds",
                    //   "last4": "9292",
                    //   "expMonth": 1,
                    //   "expYear": 2019,
                    //   "name": "Alex",
                    //   "cardType": "Mastercard",
                    //   "isDefault": false
                    // }
                  ],
                  newCreditCard: {
                    address: {},
                    useBillingAddress: true,
                    billingAddress: selectedPlan.billingAddress
                  }
                };
                // Alpha Release - Select New Card by default
                selectedPlan.paymentMethods.selectedCard = null;

                return selectedPlan;
              }
            }
          });
        };

        return _factory;
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
          var isTest = userState.isTestCompanySelected();

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
  .service("stripeService", ["$q", "$window", "stripeLoader", "STRIPE_ERRORS",
    function ($q, $window, stripeLoader, STRIPE_ERRORS) {

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
            if (response.error) {
              card.tokenError = _processStripeError(response.error.code);

              deferred.reject();
            } else {
              deferred.resolve(response);
            }
          });
        });

        return deferred.promise;
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .service("validateAddress", ["$q", "$log", "storeAPILoader",
    function ($q, $log, storeAPILoader) {
      return function (addressObject) {
        $log.debug("validateAddress called", addressObject);

        var obj = {
          "street": addressObject.street,
          "unit": addressObject.unit,
          "city": addressObject.city,
          "country": addressObject.country,
          "postalCode": addressObject.postalCode,
          "province": addressObject.province,
        };

        var _getResult = function (resp) {
          if (resp.result !== null && typeof resp.result === "object") {
            return resp.result;
          } else {
            return resp;
          }
        };

        return storeAPILoader()
          .then(function (storeApi) {
            return storeApi.company.validateAddress(obj);
          })
          .then(function (resp) {
            var result = _getResult(resp);
            $log.debug("validateAddress result: ", result);

            if (result.code !== -1) {
              return $q.resolve(result);
            } else {
              return $q.reject(result);
            }
          });
      };
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
  .directive("billingAddress", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-billing-address.html"),
        link: function () {}
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("paymentMethods", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-payment-methods.html"),
        link: function ($scope) {
          $scope.getCardDescription = function (card) {
            return "***-" + card.last4 + ", " + card.cardType + (card.isDefault ? " (default)" : "");
          };

          $scope.getPaddedMonth = function (month) {
            if (month < 10) {
              month = "0" + month;
            }

            return month;
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
  .directive("reviewSubscription", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get(
          "purchase-flow/checkout-review-subscription.html"),
        link: function ($scope) {
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
  .directive("shippingAddress", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-shipping-address.html"),
        link: function () {}
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
                $scope.years.push($scope.ngModel);
              }

              for (var i = 0; i < MAX_COUNT; i++) {
                $scope.years.push(baseYear + i);
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

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/address-form.html',
    '<div class="form-group" ng-if="hideCompanyName !== true" ng-class="{ \'has-error\': isFieldInvalid(\'companyName\') }"><label for="address-form-companyName" class="control-label">Company Name*</label> <input id="address-form-companyName" name="companyName" type="text" class="form-control" ng-model="addressObject.name" autocomplete="organization" required=""></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'street\') }"><label for="address-form-streetAddress" class="control-label">Street Address*</label> <input id="address-form-streetAddress" name="street" type="text" class="form-control" ng-model="addressObject.street" autocomplete="address-line1" pattern=".{0,50}" required=""></div></div><div class="col-md-6"><div class="form-group"><label for="address-form-unit" class="control-label">Unit*</label> <input id="address-form-unit" type="text" name="unit" class="form-control" ng-model="addressObject.unit" autocomplete="address-line2" pattern=".{0,100}"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'city\') }"><label for="address-form-city" class="control-label">City*</label> <input id="address-form-city" name="city" type="text" class="form-control" ng-model="addressObject.city" autocomplete="address-level2" required=""></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'country\') }"><label for="address-form-country" class="control-label">Country*</label><select id="address-form-country" name="country" autocomplete="country" class="form-control" ng-model="addressObject.country" ng-options="c.code as c.name for c in countries" empty-select-parser="" required=""><option ng-show="false" value="">&lt; Select Country &gt;</option></select></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'province\') }"><label for="address-form-region" class="control-label">State/Province/Region*</label> <input name="province" type="text" class="form-control" ng-model="addressObject.province" autocomplete="address-level1" ng-show="addressObject.country !== \'US\' && addressObject.country !== \'CA\'" province-validator="addressObject.country"><select class="form-control selectpicker" ng-model="addressObject.province" ng-options="c[1] as c[0] for c in regionsCA" autocomplete="address-level1" ng-show="addressObject.country === \'CA\'" empty-select-parser=""><option ng-show="false" value="">&lt; Select Province &gt;</option></select><select class="form-control selectpicker" ng-model="addressObject.province" ng-options="c[1] as c[0] for c in regionsUS" autocomplete="address-level1" ng-show="addressObject.country === \'US\'" empty-select-parser=""><option ng-show="false" value="">&lt; Select State &gt;</option></select></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'postalCode\') }"><label for="address-form-postalCode" class="control-label">ZIP/Postal Code*</label> <input id="address-form-postalCode" name="postalCode" type="text" class="form-control" ng-model="addressObject.postalCode" autocomplete="postal-code" pattern=".{0,11}" required=""></div></div></div>');
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
    '<div id="checkout-billing-address" class="address-editor"><form id="form.billingAddressForm" role="form" class="u_margin-md-top" name="form.billingAddressForm" autocomplete="on" novalidate=""><div class="alert alert-danger" ng-show="form.billingAddressForm.$submitted && form.billingAddressForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="plan.billingAddress.validationError"><strong>Address Validation Error</strong> {{plan.billingAddress.validationError}}</div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.firstName.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.firstName.$invalid }"><label for="contact-firstName" class="control-label">First Name*</label> <input id="contact-firstName" type="text" class="form-control" name="firstName" ng-model="plan.contact.firstName" autocomplete="given-name" required=""></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.lastName.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.lastName.$invalid }"><label for="contact-lastName" class="control-label">Last Name*</label> <input id="contact-lastName" type="text" class="form-control" name="lastName" ng-model="plan.contact.lastName" autocomplete="family-name" required=""></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.email.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.email.$invalid }"><label for="contact-email" class="control-label">Email*</label> <input id="contact-email" type="email" class="form-control" name="email" ng-model="plan.contact.email" autocomplete="email" required=""></div></div><div class="col-md-6"><div class="form-group"><label for="contact-phone" class="control-label">Telephone*</label> <input id="contact-phone" name="tel" type="tel" class="form-control" ng-model="plan.contact.telephone" autocomplete="tel"></div></div></div><address-form form-object="form.billingAddressForm" address-object="plan.billingAddress"></address-form><hr><div class="row"><div class="col-xs-12"><button id="backButton" type="button" class="btn btn-default pull-left" ng-click="setPreviousStep()" translate="">common.back</button> <button id="continueButton" type="submit" form="form.billingAddressForm" class="btn btn-primary pull-right" ng-click="validateAddress(plan.billingAddress)" translate="">common.continue</button></div></div></form></div>');
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
    '<div id="checkout-payment-methods"><form id="form.paymentMethodsForm" role="form" class="u_margin-md-top" name="form.paymentMethodsForm" novalidate=""><div class="row u_margin-md-top" ng-if="false"><div class="col-md-8 col-xs-12 form-inline"><div class="form-group"><label for="payment-method-select" class="u_margin-right">Payment Method</label><select id="payment-method-select" class="form-control selectpicker" ng-model="plan.paymentMethods.paymentMethod"><option value="card">Credit Card</option><option value="invoice">Invoice Me</option></select></div></div></div><hr ng-if="false"><div id="credit-card-form" ng-if="plan.paymentMethods.paymentMethod === \'card\'"><div class="row" ng-if="false"><div class="col-md-12"><div class="form-group"><select id="credit-card-select" class="form-control selectpicker" ng-model="plan.paymentMethods.selectedCard" ng-options="c as getCardDescription(c) for c in plan.paymentMethods.existingCreditCards track by c.id"><option value="">Add New Credit Card</option></select></div></div></div><div id="new-credit-card-form" ng-if="!plan.paymentMethods.selectedCard"><div class="alert alert-danger" ng-show="form.paymentMethodsForm.$submitted && form.paymentMethodsForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="plan.paymentMethods.newCreditCard.validationErrors.length"><strong>Card Validation Error(s)</strong><ul><li ng-repeat="error in plan.paymentMethods.newCreditCard.validationErrors">{{error}}</li></ul></div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="plan.paymentMethods.newCreditCard.tokenError"><strong>Card Processing Error</strong> {{plan.paymentMethods.newCreditCard.tokenError}}</div><div class="row"><div class="col-md-12"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardholderName.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardholderName.$invalid }"><label for="new-card-name" lass="control-label">Cardholder Name</label> <input id="new-card-name" type="text" class="form-control" name="cardholderName" data-stripe="name" ng-model="plan.paymentMethods.newCreditCard.name" autocomplete="cc-name" required=""></div></div></div><div class="row"><div class="col-md-12"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardNumber.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardNumber.$invalid }"><label for="new-card-number" class="control-label">Card Number</label> <input id="new-card-number" type="text" class="form-control" placeholder="0000 0000 0000 0000" name="cardNumber" data-stripe="number" ng-model="plan.paymentMethods.newCreditCard.number" autocomplete="cc-number" required=""></div></div></div><div class="row"><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardExpiryMonth.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardExpiryMonth.$invalid }"><label for="new-card-expiry-month" class="control-label">Expiry Month</label><select id="new-card-expiry-month" class="form-control" name="cardExpiryMonth" data-stripe="exp-month" ng-model="plan.paymentMethods.newCreditCard.expMonth" autocomplete="cc-exp-month" integer-parser="" required=""><option ng-show="false" value="">&lt; Select Month &gt;</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div></div><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardExpiryYear.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardExpiryYear.$invalid }"><label for="expiry-year" class="control-label">Expiry Year</label><year-selector id="new-card-expiry-year" class="form-control" name="cardExpiryYear" data-stripe="exp-year" ng-model="plan.paymentMethods.newCreditCard.expYear" autocomplete="cc-exp-month" integer-parser="" required=""></year-selector></div></div><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardCvc.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardCvc.$invalid }"><label for="new-card-cvc" class="control-label">Security Code</label> <input id="new-card-cvc" type="number" class="form-control" name="cardCvc" data-stripe="cvc" ng-model="plan.paymentMethods.newCreditCard.cvc" autocomplete="cc-csc" maxlength="4" required=""></div></div></div><div class="checkbox"><label><input type="checkbox" id="toggleMatchBillingAddress" ng-model="plan.paymentMethods.newCreditCard.useBillingAddress"> Same As Billing Address</label></div><div id="new-card-address"><address-form form-object="form.paymentMethodsForm" address-object="plan.paymentMethods.newCreditCard.address" hide-company-name="true" ng-if="!plan.paymentMethods.newCreditCard.useBillingAddress"></address-form></div></div><div id="existing-credit-card-form" ng-if="plan.paymentMethods.selectedCard"><div id="errorBox" class="alert alert-danger" role="alert" ng-show="plan.paymentMethods.selectedCard.validationErrors.length"><strong>Card Validation Error</strong> {{plan.paymentMethods.selectedCard.validationErrors[0]}}</div><div class="row"><div class="col-md-12"><div class="form-group"><label for="existing-card-name" class="control-label">Cardholder Name</label> <input id="existing-card-name" type="text" class="form-control" placeholder="{{plan.paymentMethods.selectedCard.name}}" disabled="disabled"></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="existing-card-number" class="control-label">Card Number</label> <input id="existing-card-number" type="text" class="form-control" placeholder="{{\'***-\' + plan.paymentMethods.selectedCard.last4}}" disabled="disabled"></div></div></div><div class="row form-group"><div class="col-md-4"><div class="form-group"><label for="existing-card-expiry-month" class="control-label">Expiry Month</label> <input id="existing-card-expiry-month" type="text" class="form-control masked" placeholder="{{getPaddedMonth(plan.paymentMethods.selectedCard.expMonth)}}" disabled="disabled"></div></div><div class="col-md-4"><div class="form-group"><label for="existing-card-expiry-year" class="control-label">Expiry Year</label> <input id="existing-card-expiry-year" type="text" class="form-control masked" placeholder="{{plan.paymentMethods.selectedCard.expYear}}" disabled="disabled"></div></div></div></div></div><div id="generateInvoice" ng-if="plan.paymentMethods.paymentMethod === \'invoice\'"><p>If you\'d like to be invoiced for your purchase (rather than paying now by credit card), please enter a <b>Purchase Order</b> number and continue with checkout.</p><p>You will receive an invoice for this purchase total at <b>user@domain.com</b>. Invoices are due within 30 days of creation, payable by check, wire transfer, or credit card.</p><p>Please note your invoice is generated only once this checkout is completed.</p><div class="row"><div class="col-xs-12 col-sm-6"><div class="form-group"><label class="control-label" id="triggerOverdue">Purchase Order Number</label> <input type="text" class="form-control" placeholder=""></div></div></div><div id="generateInvoiceOverdue" style="display:none"><p class="text-danger">You have overdue invoice payments on your account.</p><p>In order to complete this purchase by invoice, please pay your outstanding invoices <a href="#">here</a>.</p></div></div><hr><div class="row"><div class="col-xs-12"><button id="backButton" type="button" class="btn btn-default pull-left" ng-click="setPreviousStep()" translate="">common.back</button> <button id="continueButton" type="submit" form="form.paymentMethodsForm" class="btn btn-primary pull-right" ng-click="validatePaymentMethod(plan.paymentMethods)" translate="">common.continue</button></div></div></form></div>');
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
    '<div id="checkout-review-purchase"><div class="row"><div class="col-md-6 u_margin-sm-top"><p class="lead u_margin-sm-bottom">Company Account</p><small><b>Acme Co Inc.</b><br>Email: user@domain.com<br>Company ID: ce4684a1-e8b3-4e02-9798-c4517b43cf7a</small></div><div class="col-md-6 u_margin-sm-top"><p class="lead u_margin-sm-bottom">Payment Method <button class="btn btn-link btn-xs">Edit</button></p><small><b>VISA</b><br>4242-0000-4242-0000<br>Exp: 07/18</small></div></div><div class="row"><div class="col-md-6 u_margin-sm-top"><p class="lead u_margin-sm-bottom">Billing Address <button class="btn btn-link btn-xs">Edit</button></p><small>Gob Bluth<br>user@risevision.com<br>Rise Vision Inc.<br>545 King Street West<br>Toronto, ON, M5V 1M1<br>Canada</small></div><div class="col-md-6 u_margin-sm-top"><p class="lead u_margin-sm-bottom">Shipping Address <button class="btn btn-link btn-xs">Edit</button></p><small>Rise Vision Inc.<br>545 King Street West<br>Toronto, ON, M5V 1M1<br>Canada</small></div></div><br><hr class="u_margin-xs-top u_margin-xs-bottom"><div class="row"><div class="col-xs-12"><p class="lead u_margin-sm-bottom">Subscription Details <button class="btn btn-link btn-xs">Edit</button></p></div></div><div class="row"><div class="col-sm-4 col-xs-6 text-right"><p><small>Basic Plan (Yearly)<br>2 Additional Displays<br>GST<br>PST<br>Total Tax:</small></p><span class="order-total">Order Total:</span></div><div class="col-sm-4 col-xs-6 text-right"><p><small>$85<br>$19<br>$1.70<br>$2.20<br>$4.70</small></p><span class="order-total">$122.34 <small class="u_margin-left text-subtle">CAD</small></span></div><div class="col-sm-4 col-xs-12 text-right"><button id="showTaxExempt" class="btn btn-link btn-xs">Submit Tax Exemption</button></div></div><div class="row"><hr class="u_margin-sm-top"></div><div class="row"><div class="col-xs-8 col-xs-offset-2"><button id="payButton" class="btn btn-primary btn-hg btn-block"><span id="payLabel">Pay $122.34 Now</span></button><br></div></div></div>');
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
    '<div id="checkout-review-subscription"><form id="reviewSubscriptionForm" role="form" name="form.reviewSubscriptionForm" autocomplete="on" novalidate=""><h3 class="text-center" translate="" translate-values="{ planName: plan.name }">common-header.purchase.review-subscription.plan-name</h3><div class="subscription-summary text-center"><div class="subscription-summary-item"><div class="stat"><div class="stat-value">${{plan.monthly.priceDisplayMonth}}</div><div class="stat-legend">{{ \'common-header.purchase.review-subscription.per-display\' | translate}} {{ \'common-header.purchase.review-subscription.per-month\' | translate}}</div></div></div><div class="subscription-summary-divider">x</div><div class="subscription-summary-item"><div class="stat"><div class="stat-value">{{plan.proLicenseCount}}</div><div class="stat-legend"><span ng-show="plan.proLicenseCount === 1" translate="">common-header.purchase.review-subscription.display-included</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.purchase.review-subscription.displays-included</span></div></div></div></div><hr class="u_remove-margin"><div class="text-center flex-additive-rule"><b>+</b></div><div class="row"><div class="col-xs-12 u_margin-md-bottom" translate="" translate-values="{ planName: plan.name, priceDisplayMonth: plan.monthly.priceDisplayMonth }">common-header.purchase.review-subscription.need-more-displays</div><div class="col-xs-12"><div class="input-group spinner" ng-class="{ \'has-error\': form.reviewSubscriptionForm.additionalLicenses.$invalid }"><div class="input-group-btn-vertical"><button class="btn btn-white" type="button" ng-click="incrementLicenses()"><i class="fa fa-caret-up"></i></button> <button class="btn btn-white" type="button" ng-click="decrementLicenses()"><i class="fa fa-caret-down"></i></button></div><input id="additionalLicenses" name="additionalLicenses" type="number" class="form-control" ng-model="plan.additionalDisplayLicenses" min="0" max="999" pattern="[0-9]{1,3}" required=""> <span class="icon-right u_margin-md-top u_align-middle" translate="">common-header.purchase.review-subscription.additional-licenses</span></div></div><div class="col-xs-12"><hr></div><div class="col-xs-12 u_margin-sm-bottom"><b class="pull-left" translate="">common-header.purchase.review-subscription.total</b> <b class="pull-right" translate="">common-header.purchase.review-subscription.pay-yearly</b></div><div class="col-xs-12"><div class="panel payment-recurrence-selector" ng-class="{ \'has-error\': form.reviewSubscriptionForm.billingPeriod.$invalid }"><div class="radio" ng-class="{ active: plan.isMonthly }"><label><input type="radio" name="billingPeriod" id="monthlyBilling" ng-value="true" ng-model="plan.isMonthly" required=""> <span translate="" translate-values="{ monthlyPrice: getMonthlyPrice() }">common-header.purchase.review-subscription.billed-monthly</span></label></div><div class="radio" ng-class="{ active: !plan.isMonthly }"><label><input type="radio" name="billingPeriod" id="yearlyBilling" ng-value="false" ng-model="plan.isMonthly" required=""> <span translate="" translate-values="{ yearlyPrice: getYearlyPrice() }">common-header.purchase.review-subscription.billed-yearly</span></label><div class="label label-success" translate="" translate-values="{ saveYearly: plan.yearly.save }">common-header.purchase.review-subscription.save-yearly</div></div></div></div></div><hr><div class="row"><div class="col-xs-12"><button id="continueButton" type="submit" form="form.reviewSubscriptionForm" class="btn btn-primary pull-right" ng-click="setNextStep()" translate="">common.continue</button></div></div></form></div>');
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
    '<div id="checkout-shipping-address" class="address-editor"><form id="form.shippingAddressForm" role="form" class="u_margin-md-top" name="form.shippingAddressForm" autocomplete="on" novalidate=""><div class="alert alert-danger" ng-show="form.shippingAddressForm.$submitted && form.shippingAddressForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="plan.shippingAddress.validationError"><strong>Address Validation Error</strong> {{plan.shippingAddress.validationError}}</div><address-form form-object="form.shippingAddressForm" address-object="plan.shippingAddress"></address-form><hr><div class="row"><div class="col-xs-12"><button id="backButton" type="button" class="btn btn-default pull-left" ng-click="setPreviousStep()" translate="">common.back</button> <button id="continueButton" type="submit" form="form.shippingAddressForm" class="btn btn-primary pull-right" ng-click="validateAddress(plan.shippingAddress)" translate="">common.continue</button></div></div></form></div>');
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
    '<div id="content-success" class="prototype-show" style="display: none"><br><br><h3 class="text-center u_margin-md-top">Payment Successful!</h3><div class="text-center u_padding-md"><img src="https://s3.amazonaws.com/Rise-Images/Icons/online.svg" width="72px" alt="Payment Successful"><br><br><p>Your payment to Rise Vision was successful. You can view details of this payment <a href="#">here</a>.</p><br></div><hr><div class="row"><div class="col-xs-12 text-center"><button id="" class="btn btn-primary">Go To Dashboard</button></div></div></div>');
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
    '<div rv-spinner="" rv-spinner-key="purchase-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">Checkout</h3></div><div class="steps"><div ng-repeat="step in PURCHASE_STEPS" class="step-item" ng-class="{ active: currentStep === step.index, complete: currentStep > step.index }"><span>{{step.name}}</span></div></div><div id="purchase-modal" class="modal-body checkout-modal" stop-event="touchend"><review-subscription ng-if="currentStep === 0"></review-subscription><billing-address ng-if="currentStep === 1"></billing-address><shipping-address ng-if="currentStep === 2"></shipping-address><payment-methods ng-if="currentStep === 3"></payment-methods><div ng-include="\'purchase-flow/checkout-review-purchase.html\'" ng-if="currentStep === 4"></div><div ng-include="\'purchase-flow/checkout-success.html\'"></div><div ng-include="\'purchase-flow/tax-exemption.html\'"></div></div><div id="security-branding" class="modal-footer text-center" ng-show="currentStep > 2"><span class="text-muted"><i class="fa fa-lock icon-left"></i> Secure Checkout from ChargeBee and <img alt="powered by Stripe" height="16" src="https://s3.amazonaws.com/Rise-Images/UI/powered_by_stripe.svg"></span></div></div>');
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
    '<div id="tax-exemption-form" class="prototype-show" style="display: none;"><form id="" role="form" class="u_margin-md-top" novalidate=""><div class="row"><div class="col-xs-12"><div class="form-group"><label class="control-label">Tax Exemption Number</label> <input type="text" class="form-control"></div></div></div><label class="control-label">Tax Exemption Document (Image or PDF only)</label><div class="row"><div class="col-xs-9"><div class="form-group"><div class="input-group"><input class="form-control" readonly="readonly" type="text" name="" value="exempt001.jpg"> <a href="#" class="btn btn-default input-group-addon"><i class="fa fa-times"></i></a></div></div></div><div class="col-xs-3"><button class="btn btn-default">Attach File</button></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label for="company-settings-state" class="control-label">Exemption State/Province</label><select class="form-control selectpicker"><option value="" selected="selected">&lt; Select Province &gt;</option><option label="Alberta" value="string:AB">Alberta</option><option label="British Columbia" value="string:BC">British Columbia</option><option label="Manitoba" value="string:MB">Manitoba</option><option label="New Brunswick" value="string:NB">New Brunswick</option><option label="Newfoundland and Labrador" value="string:NL">Newfoundland and Labrador</option><option label="Northwest Territories" value="string:NT">Northwest Territories</option><option label="Nova Scotia" value="string:NS">Nova Scotia</option><option label="Nunavut" value="string:NU">Nunavut</option><option label="Ontario" value="string:ON">Ontario</option><option label="Prince Edward Island" value="string:PE">Prince Edward Island</option><option label="Quebec" value="string:QC">Quebec</option><option label="Saskatchewan" value="string:SK">Saskatchewan</option><option label="Yukon Territory" value="string:YT">Yukon Territory</option></select><select class="form-control selectpicker" style="display: none"><option ng-show="false" value="" class="ng-hide">&lt; Select State &gt;</option><option label="Alabama" value="string:AL">Alabama</option><option label="Alaska" value="string:AK">Alaska</option><option label="Arizona" value="string:AZ">Arizona</option><option label="Arkansas" value="string:AR">Arkansas</option><option label="California" value="string:CA">California</option><option label="Colorado" value="string:CO">Colorado</option><option label="Connecticut" value="string:CT">Connecticut</option><option label="Delaware" value="string:DE">Delaware</option><option label="District of Columbia" value="string:DC">District of Columbia</option><option label="Florida" value="string:FL">Florida</option><option label="Georgia" value="string:GA">Georgia</option><option label="Hawaii" value="string:HI">Hawaii</option><option label="Idaho" value="string:ID">Idaho</option><option label="Illinois" value="string:IL">Illinois</option><option label="Indiana" value="string:IN">Indiana</option><option label="Iowa" value="string:IA">Iowa</option><option label="Kansas" value="string:KS" selected="selected">Kansas</option><option label="Kentucky" value="string:KY">Kentucky</option><option label="Louisiana" value="string:LA">Louisiana</option><option label="Maine" value="string:ME">Maine</option><option label="Maryland" value="string:MD">Maryland</option><option label="Massachusetts" value="string:MA">Massachusetts</option><option label="Michigan" value="string:MI">Michigan</option><option label="Minnesota" value="string:MN">Minnesota</option><option label="Mississippi" value="string:MS">Mississippi</option><option label="Missouri" value="string:MO">Missouri</option><option label="Montana" value="string:MT">Montana</option><option label="Nebraska" value="string:NE">Nebraska</option><option label="Nevada" value="string:NV">Nevada</option><option label="New Hampshire" value="string:NH">New Hampshire</option><option label="New Jersey" value="string:NJ">New Jersey</option><option label="New Mexico" value="string:NM">New Mexico</option><option label="New York" value="string:NY">New York</option><option label="North Carolina" value="string:NC">North Carolina</option><option label="North Dakota" value="string:ND">North Dakota</option><option label="Ohio" value="string:OH">Ohio</option><option label="Oklahoma" value="string:OK">Oklahoma</option><option label="Oregon" value="string:OR">Oregon</option><option label="Pennsylvania" value="string:PA">Pennsylvania</option><option label="Rhode Island" value="string:RI">Rhode Island</option><option label="South Carolina" value="string:SC">South Carolina</option><option label="South Dakota" value="string:SD">South Dakota</option><option label="Tennessee" value="string:TN">Tennessee</option><option label="Texas" value="string:TX">Texas</option><option label="Utah" value="string:UT">Utah</option><option label="Vermont" value="string:VT">Vermont</option><option label="Virginia" value="string:VA">Virginia</option><option label="Washington" value="string:WA">Washington</option><option label="West Virginia" value="string:WV">West Virginia</option><option label="Wisconsin" value="string:WI">Wisconsin</option><option label="Wyoming" value="string:WY">Wyoming</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-country" class="control-label">Exemption Country</label><select id="company-settings-country" class="form-control selectpicker"><option ng-show="false" value="">&lt; Select Country &gt;</option><option label="Afghanistan" value="string:AF">Afghanistan</option><option label="Albania" value="string:AL">Albania</option><option label="Algeria" value="string:DZ">Algeria</option><option label="American Samoa" value="string:AS">American Samoa</option><option label="Andorra" value="string:AD">Andorra</option><option label="Angola" value="string:AO">Angola</option><option label="Anguilla" value="string:AI">Anguilla</option><option label="Antarctica" value="string:AQ">Antarctica</option><option label="Antigua and Barbuda" value="string:AG">Antigua and Barbuda</option><option label="Argentina" value="string:AR">Argentina</option><option label="Armenia" value="string:AM">Armenia</option><option label="Aruba" value="string:AW">Aruba</option><option label="Australia" value="string:AU">Australia</option><option label="Austria" value="string:AT">Austria</option><option label="Azerbaijan" value="string:AZ">Azerbaijan</option><option label="Bahamas" value="string:BS">Bahamas</option><option label="Bahrain" value="string:BH">Bahrain</option><option label="Bangladesh" value="string:BD">Bangladesh</option><option label="Barbados" value="string:BB">Barbados</option><option label="Belarus" value="string:BY">Belarus</option><option label="Belgium" value="string:BE">Belgium</option><option label="Belize" value="string:BZ">Belize</option><option label="Benin" value="string:BJ">Benin</option><option label="Bermuda" value="string:BM">Bermuda</option><option label="Bhutan" value="string:BT">Bhutan</option><option label="Bolivia" value="string:BO">Bolivia</option><option label="Bonaire, Sint Eustatius and Saba" value="string:BQ">Bonaire, Sint Eustatius and Saba</option><option label="Bosnia and Herzegovina" value="string:BA">Bosnia and Herzegovina</option><option label="Botswana" value="string:BW">Botswana</option><option label="Bouvet Island" value="string:BV">Bouvet Island</option><option label="Brazil" value="string:BR">Brazil</option><option label="British Indian Ocean Territory" value="string:IO">British Indian Ocean Territory</option><option label="British Virgin Islands" value="string:VG">British Virgin Islands</option><option label="Brunei Darussalam" value="string:BN">Brunei Darussalam</option><option label="Bulgaria" value="string:BG">Bulgaria</option><option label="Burkina Faso" value="string:BF">Burkina Faso</option><option label="Burundi" value="string:BI">Burundi</option><option label="Cabo Verde" value="string:CV">Cabo Verde</option><option label="Cambodia" value="string:KH">Cambodia</option><option label="Cameroon" value="string:CM">Cameroon</option><option label="Canada" value="string:CA">Canada</option><option label="Cayman Islands" value="string:KY">Cayman Islands</option><option label="Central African Republic" value="string:CF">Central African Republic</option><option label="Chad" value="string:TD">Chad</option><option label="Chile" value="string:CL">Chile</option><option label="China" value="string:CN">China</option><option label="Christmas Island" value="string:CX">Christmas Island</option><option label="Cocos (Keeling) Islands" value="string:CC">Cocos (Keeling) Islands</option><option label="Colombia" value="string:CO">Colombia</option><option label="Comoros" value="string:KM">Comoros</option><option label="Congo" value="string:CG">Congo</option><option label="Congo, the Democratic Republic of the" value="string:CD">Congo, the Democratic Republic of the</option><option label="Cook Islands" value="string:CK">Cook Islands</option><option label="Costa Rica" value="string:CR">Costa Rica</option><option label="Croatia" value="string:HR">Croatia</option><option label="Cuba" value="string:CU">Cuba</option><option label="Curaçao" value="string:CW">Curaçao</option><option label="Cyprus" value="string:CY">Cyprus</option><option label="Czech Republic" value="string:CZ">Czech Republic</option><option label="Côte d\'Ivoire" value="string:CI">Côte d\'Ivoire</option><option label="Denmark" value="string:DK">Denmark</option><option label="Djibouti" value="string:DJ">Djibouti</option><option label="Dominica" value="string:DM">Dominica</option><option label="Dominican Republic" value="string:DO">Dominican Republic</option><option label="Ecuador" value="string:EC">Ecuador</option><option label="Egypt" value="string:EG">Egypt</option><option label="El Salvador" value="string:SV">El Salvador</option><option label="Equatorial Guinea" value="string:GQ">Equatorial Guinea</option><option label="Eritrea" value="string:ER">Eritrea</option><option label="Estonia" value="string:EE">Estonia</option><option label="Ethiopia" value="string:ET">Ethiopia</option><option label="Falkland Islands (Malvinas)" value="string:FK">Falkland Islands (Malvinas)</option><option label="Faroe Islands" value="string:FO">Faroe Islands</option><option label="Fiji" value="string:FJ">Fiji</option><option label="Finland" value="string:FI">Finland</option><option label="France" value="string:FR">France</option><option label="French Guiana" value="string:GF">French Guiana</option><option label="French Polynesia" value="string:PF">French Polynesia</option><option label="French Southern Territories" value="string:TF">French Southern Territories</option><option label="Gabon" value="string:GA">Gabon</option><option label="Gambia" value="string:GM">Gambia</option><option label="Georgia" value="string:GE">Georgia</option><option label="Germany" value="string:DE">Germany</option><option label="Ghana" value="string:GH">Ghana</option><option label="Gibraltar" value="string:GI">Gibraltar</option><option label="Greece" value="string:GR">Greece</option><option label="Greenland" value="string:GL">Greenland</option><option label="Grenada" value="string:GD">Grenada</option><option label="Guadeloupe" value="string:GP">Guadeloupe</option><option label="Guam" value="string:GU">Guam</option><option label="Guatemala" value="string:GT">Guatemala</option><option label="Guernsey" value="string:GG">Guernsey</option><option label="Guinea" value="string:GN">Guinea</option><option label="Guinea-Bissau" value="string:GW">Guinea-Bissau</option><option label="Guyana" value="string:GY">Guyana</option><option label="Haiti" value="string:HT">Haiti</option><option label="Heard Island and McDonald Islands" value="string:HM">Heard Island and McDonald Islands</option><option label="Holy See (Vatican City State)" value="string:VA">Holy See (Vatican City State)</option><option label="Honduras" value="string:HN">Honduras</option><option label="Hong Kong" value="string:HK">Hong Kong</option><option label="Hungary" value="string:HU">Hungary</option><option label="Iceland" value="string:IS">Iceland</option><option label="India" value="string:IN">India</option><option label="Indonesia" value="string:ID">Indonesia</option><option label="Iran" value="string:IR">Iran</option><option label="Iraq" value="string:IQ">Iraq</option><option label="Ireland" value="string:IE">Ireland</option><option label="Isle of Man" value="string:IM">Isle of Man</option><option label="Israel" value="string:IL">Israel</option><option label="Italy" value="string:IT">Italy</option><option label="Jamaica" value="string:JM">Jamaica</option><option label="Japan" value="string:JP">Japan</option><option label="Jersey" value="string:JE">Jersey</option><option label="Jordan" value="string:JO">Jordan</option><option label="Kazakhstan" value="string:KZ">Kazakhstan</option><option label="Kenya" value="string:KE">Kenya</option><option label="Kiribati" value="string:KI">Kiribati</option><option label="Korea, Democratic People\'s Republic of" value="string:KP">Korea, Democratic People\'s Republic of</option><option label="Korea, Republic of" value="string:KR">Korea, Republic of</option><option label="Kuwait" value="string:KW">Kuwait</option><option label="Kyrgyzstan" value="string:KG">Kyrgyzstan</option><option label="Lao People\'s Democratic Republic" value="string:LA">Lao People\'s Democratic Republic</option><option label="Latvia" value="string:LV">Latvia</option><option label="Lebanon" value="string:LB">Lebanon</option><option label="Lesotho" value="string:LS">Lesotho</option><option label="Liberia" value="string:LR">Liberia</option><option label="Libya" value="string:LY">Libya</option><option label="Liechtenstein" value="string:LI">Liechtenstein</option><option label="Lithuania" value="string:LT">Lithuania</option><option label="Luxembourg" value="string:LU">Luxembourg</option><option label="Macau" value="string:MO">Macau</option><option label="Macedonia, the former Yugoslav Republic of" value="string:MK">Macedonia, the former Yugoslav Republic of</option><option label="Madagascar" value="string:MG">Madagascar</option><option label="Malawi" value="string:MW">Malawi</option><option label="Malaysia" value="string:MY">Malaysia</option><option label="Maldives" value="string:MV">Maldives</option><option label="Mali" value="string:ML">Mali</option><option label="Malta" value="string:MT">Malta</option><option label="Marshall Islands" value="string:MH">Marshall Islands</option><option label="Martinique" value="string:MQ">Martinique</option><option label="Mauritania" value="string:MR">Mauritania</option><option label="Mauritius" value="string:MU">Mauritius</option><option label="Mayotte" value="string:YT">Mayotte</option><option label="Mexico" value="string:MX">Mexico</option><option label="Micronesia" value="string:FM">Micronesia</option><option label="Moldova" value="string:MD">Moldova</option><option label="Monaco" value="string:MC">Monaco</option><option label="Mongolia" value="string:MN">Mongolia</option><option label="Montenegro" value="string:ME">Montenegro</option><option label="Montserrat" value="string:MS">Montserrat</option><option label="Morocco" value="string:MA">Morocco</option><option label="Mozambique" value="string:MZ">Mozambique</option><option label="Myanmar" value="string:MM">Myanmar</option><option label="Namibia" value="string:NA">Namibia</option><option label="Nauru" value="string:NR">Nauru</option><option label="Nepal" value="string:NP">Nepal</option><option label="Netherlands" value="string:NL">Netherlands</option><option label="New Caledonia" value="string:NC">New Caledonia</option><option label="New Zealand" value="string:NZ">New Zealand</option><option label="Nicaragua" value="string:NI">Nicaragua</option><option label="Niger" value="string:NE">Niger</option><option label="Nigeria" value="string:NG">Nigeria</option><option label="Niue" value="string:NU">Niue</option><option label="Norfolk Island" value="string:NF">Norfolk Island</option><option label="Northern Mariana Islands" value="string:MP">Northern Mariana Islands</option><option label="Norway" value="string:NO">Norway</option><option label="Oman" value="string:OM">Oman</option><option label="Pakistan" value="string:PK">Pakistan</option><option label="Palau" value="string:PW">Palau</option><option label="Palestine, State of" value="string:PS">Palestine, State of</option><option label="Panama" value="string:PA">Panama</option><option label="Papua New Guinea" value="string:PG">Papua New Guinea</option><option label="Paraguay" value="string:PY">Paraguay</option><option label="Peru" value="string:PE">Peru</option><option label="Philippines" value="string:PH">Philippines</option><option label="Pitcairn" value="string:PN">Pitcairn</option><option label="Poland" value="string:PL">Poland</option><option label="Portugal" value="string:PT">Portugal</option><option label="Puerto Rico" value="string:PR">Puerto Rico</option><option label="Qatar" value="string:QA">Qatar</option><option label="Reunion" value="string:RE">Reunion</option><option label="Romania" value="string:RO">Romania</option><option label="Russian Federation" value="string:RU">Russian Federation</option><option label="Rwanda" value="string:RW">Rwanda</option><option label="Saint Barthélemy" value="string:BL">Saint Barthélemy</option><option label="Saint Helena, Ascension and Tristan da Cunha" value="string:SH">Saint Helena, Ascension and Tristan da Cunha</option><option label="Saint Kitts and Nevis" value="string:KN">Saint Kitts and Nevis</option><option label="Saint Lucia" value="string:LC">Saint Lucia</option><option label="Saint Martin (French part)" value="string:MF">Saint Martin (French part)</option><option label="Saint Vincent and The Grenadines" value="string:VC">Saint Vincent and The Grenadines</option><option label="Samoa" value="string:WS">Samoa</option><option label="San Marino" value="string:SM">San Marino</option><option label="Sao Tome and Principe" value="string:ST">Sao Tome and Principe</option><option label="Saudi Arabia" value="string:SA">Saudi Arabia</option><option label="Senegal" value="string:SN">Senegal</option><option label="Serbia" value="string:RS">Serbia</option><option label="Seychelles" value="string:SC">Seychelles</option><option label="Sierra Leone" value="string:SL">Sierra Leone</option><option label="Singapore" value="string:SG">Singapore</option><option label="Sint Maarten (Dutch part)" value="string:SX">Sint Maarten (Dutch part)</option><option label="Slovakia" value="string:SK">Slovakia</option><option label="Slovenia" value="string:SI">Slovenia</option><option label="Solomon Islands" value="string:SB">Solomon Islands</option><option label="Somalia" value="string:SO">Somalia</option><option label="South Africa" value="string:ZA">South Africa</option><option label="South Georgia and the South Sandwich Islands" value="string:GS">South Georgia and the South Sandwich Islands</option><option label="South Sudan" value="string:SS">South Sudan</option><option label="Spain" value="string:ES">Spain</option><option label="Sri Lanka" value="string:LK">Sri Lanka</option><option label="St. Pierre and Miquelon" value="string:PM">St. Pierre and Miquelon</option><option label="Sudan" value="string:SD">Sudan</option><option label="Suriname" value="string:SR">Suriname</option><option label="Svalbard and Jan Mayen" value="string:SJ">Svalbard and Jan Mayen</option><option label="Swaziland" value="string:SZ">Swaziland</option><option label="Sweden" value="string:SE">Sweden</option><option label="Switzerland" value="string:CH">Switzerland</option><option label="Syrian Arab Republic" value="string:SY">Syrian Arab Republic</option><option label="Taiwan" value="string:TW">Taiwan</option><option label="Tajikistan" value="string:TJ">Tajikistan</option><option label="Tanzania, United Republic of" value="string:TZ">Tanzania, United Republic of</option><option label="Thailand" value="string:TH">Thailand</option><option label="Timor-Leste" value="string:TL">Timor-Leste</option><option label="Togo" value="string:TG">Togo</option><option label="Tokelau" value="string:TK">Tokelau</option><option label="Tonga" value="string:TO">Tonga</option><option label="Trinidad and Tobago" value="string:TT">Trinidad and Tobago</option><option label="Tunisia" value="string:TN">Tunisia</option><option label="Turkey" value="string:TR">Turkey</option><option label="Turkmenistan" value="string:TM">Turkmenistan</option><option label="Turks and Caicos Islands" value="string:TC">Turks and Caicos Islands</option><option label="Tuvalu" value="string:TV">Tuvalu</option><option label="Uganda" value="string:UG">Uganda</option><option label="Ukraine" value="string:UA">Ukraine</option><option label="United Arab Emirates" value="string:AE">United Arab Emirates</option><option label="United Kingdom" value="string:GB">United Kingdom</option><option label="United States" value="string:US" selected="selected">United States</option><option label="Uruguay" value="string:UY">Uruguay</option><option label="US Minor Outlying Islands" value="string:UM">US Minor Outlying Islands</option><option label="US Virgin Islands" value="string:VI">US Virgin Islands</option><option label="Uzbekistan" value="string:UZ">Uzbekistan</option><option label="Vanuatu" value="string:VU">Vanuatu</option><option label="Venezuela, Bolivarian Republic of" value="string:VE">Venezuela, Bolivarian Republic of</option><option label="Viet Nam" value="string:VN">Viet Nam</option><option label="Wallis and Futuna Islands" value="string:WF">Wallis and Futuna Islands</option><option label="Western Sahara" value="string:EH">Western Sahara</option><option label="Yemen" value="string:YE">Yemen</option><option label="Zambia" value="string:ZM">Zambia</option><option label="Zimbabwe" value="string:ZW">Zimbabwe</option><option label="Åland Islands" value="string:AX">Åland Islands</option></select></div></div><div class="col-md-6"><div class="form-group"><label class="control-label">Exemption Expiry Date</label> <input id="ccexp" type="text" placeholder="07/18" class="form-control masked" pattern="(1[0-2]|0[1-9])\\/(1[5-9]|2\\d)" data-valid-example="05/18" disabled="disabled"></div></div></div></form><hr><div class="row"><div class="col-xs-12"><button id="" class="btn btn-default pull-left">Cancel</button> <button id="submit-tax-exemption" class="btn btn-primary pull-right">Submit Tax Exemption</button></div></div></div>');
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
