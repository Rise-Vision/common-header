/*globals element, by */
(function(module) {
  'use strict';

  var PlansModalPage = function () {
    var plansList = ["free", "basic", "advanced", "enterprise"];
    var plansModal = element(by.css("#plans-modal"));

    this.getPlansModal = function() {
      return plansModal;
    };

    function getButtonByPlan(selector, plan) {
      var idx = plansList.indexOf(plan) + 1;

      return element(by.css("div.grid-list.row > div:nth-child(" + idx + ") > div #" + selector));
    }

    this.getCurrentPlanButton = function(plan) {
      return getButtonByPlan("current-plan", plan);
    };

    this.getSubscribePlanButton = function(plan) {
      return getButtonByPlan("subscribe-plan", plan);
    };

    this.getDowngradePlanButton = function(plan) {
      return getButtonByPlan("downgrade-plan", plan);
    };
  };

  module.exports = PlansModalPage;
})(module);
