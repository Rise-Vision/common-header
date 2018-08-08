"use strict";

angular.module("risevision.common.components.purchase-flow")
  .filter("cardLastFour", [

    function () {
      return function (last4) {
        return "***-" + last4;
      };
    }
  ]);
