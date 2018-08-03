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
                    useBillingAddress: false
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
