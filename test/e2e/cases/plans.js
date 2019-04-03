(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var helper = require('rv-common-e2e').helper;
  var CommonHeaderPage = require('./../pages/commonHeaderPage.js');
  var HomePage = require('./../pages/homepage.js');
  var PlansModalPage = require('./../pages/plansModalPage.js');

  var PlansScenarios = function() {
    describe("Plans", function() {
      var commonHeaderPage, homepage, plansModalPage;

      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        plansModalPage = new PlansModalPage();

        homepage.get();

        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
      });

      describe("Plan banner", function () {
        it("should show Basic Plan Trial", function () {
          expect(homepage.getFreePlanBanner().isDisplayed()).to.eventually.be.false;
          expect(homepage.getTrialPlanBanner().isDisplayed()).to.eventually.be.true;
        });

        it("should show 'Subscribe Now' link", function () {
          expect(homepage.getTrialPlansModalLink().isDisplayed()).to.eventually.be.true;
        });
      });

      describe("Plans modal (Basic Plan Trial)", function () {
        it("show open the Plans Modal", function () {
          expect(homepage.getTrialPlansModalLink().isDisplayed()).to.eventually.be.true;
          homepage.getTrialPlansModalLink().click();

          helper.wait(plansModalPage.getPlansModal(), "Plans Modal");

          expect(plansModalPage.getPlansModal().isDisplayed()).to.eventually.be.true;

          helper.wait(plansModalPage.getTrialDaysRemaining("basic"), "Basic Plan Trial");
        });

        it("should show Free plan (Downgrade)", function () {
          expect(plansModalPage.getCurrentPlanButton("free").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getSubscribePlanButton("free").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getDowngradePlanButton("free").isDisplayed()).to.eventually.be.true;
        });

        it("should show Starter plan (Downgrade)", function () {
          expect(plansModalPage.getCurrentPlanButton("starter").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getSubscribePlanButton("starter").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getStartTrialPlanButton("starter").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getDowngradePlanButton("starter").isDisplayed()).to.eventually.be.true;
        });

        it("should show Basic plan (Subscribe)", function () {
          expect(plansModalPage.getCurrentPlanButton("basic").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getSubscribePlanButton("basic").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getStartTrialPlanButton("basic").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getDowngradePlanButton("basic").isDisplayed()).to.eventually.be.false;
        });

        it("should show Advanced plan (Subscribe)", function () {
          expect(plansModalPage.getCurrentPlanButton("advanced").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getSubscribePlanButton("advanced").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getStartTrialPlanButton("advanced").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getDowngradePlanButton("advanced").isDisplayed()).to.eventually.be.false;
        });

        it("should show Enterprise plan (Subscribe)", function () {
          expect(plansModalPage.getCurrentPlanButton("enterprise").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getSubscribePlanButton("enterprise").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getStartTrialPlanButton("enterprise").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getDowngradePlanButton("enterprise").isDisplayed()).to.eventually.be.false;
        });

      });
    });
  };

  module.exports = PlansScenarios;

})();
