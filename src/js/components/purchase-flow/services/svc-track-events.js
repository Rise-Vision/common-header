"use strict";

angular.module("risevision.common.components.purchase-flow")
  .factory("trackEvents", ["segmentAnalytics",
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
        if (!estimate.estimateError) {
          segmentAnalytics.track("Place Order Clicked", {
            amount: estimate.total,
            currency: estimate.currency,
            inApp: false
          });
        }
      };

      factory.trackOrderPayNowClicked = function (estimate) {
        if (!estimate.estimateError) {
          segmentAnalytics.track("Order Pay Now Clicked", {
            amount: estimate.total,
            currency: estimate.currency,
            inApp: false
          });
        }
      };

      return factory;
    }
  ]);
