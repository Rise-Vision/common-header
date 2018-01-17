(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var PlansModalPage = require('./../pages/plansModalPage.js');
  var helper = require('rv-common-e2e').helper;

  var PlansScenarios = function() {
    describe("Plans", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
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
        it("should show free plan banner", function () {
          expect(homepage.getFreePlanBanner().isDisplayed()).to.eventually.be.true;
        });

        it("should show 'See Our Plans' link", function () {
          expect(homepage.getFreePlansModalLink().isDisplayed()).to.eventually.be.true;
        });
      });

      describe("Plans modal (free plan)", function () {
        it("show open the Plans Modal", function () {
          expect(homepage.getFreePlansModalLink().isDisplayed()).to.eventually.be.true;
          homepage.getFreePlansModalLink().click();

          helper.wait(plansModalPage.getPlansModal(), "Plans Modal");

          expect(plansModalPage.getPlansModal().isDisplayed()).to.eventually.be.true;

          helper.wait(plansModalPage.getCurrentPlanButton("free"), "Current Plan Button");

          expect(plansModalPage.getCurrentPlanButton("free").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getSubscribePlanButton("free").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getDowngradePlanButton("free").isDisplayed()).to.eventually.be.false;

          expect(plansModalPage.getCurrentPlanButton("basic").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getSubscribePlanButton("basic").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getDowngradePlanButton("basic").isDisplayed()).to.eventually.be.false;

          expect(plansModalPage.getCurrentPlanButton("advanced").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getSubscribePlanButton("advanced").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getDowngradePlanButton("advanced").isDisplayed()).to.eventually.be.false;

          expect(plansModalPage.getCurrentPlanButton("enterprise").isDisplayed()).to.eventually.be.false;
          expect(plansModalPage.getSubscribePlanButton("enterprise").isDisplayed()).to.eventually.be.true;
          expect(plansModalPage.getDowngradePlanButton("enterprise").isDisplayed()).to.eventually.be.false;
        });
      });
    });
  };

  module.exports = PlansScenarios;

})();
