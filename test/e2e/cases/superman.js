(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var helper = require('rv-common-e2e').helper;
  var CommonHeaderPage = require('./../pages/commonHeaderPage.js');
  var HomePage = require('./../pages/homepage.js');

  var SupermanScenarios = function() {

    describe("Superman (uiFlowManager tester)", function() {
      var commonHeaderPage, 
        homepage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();
        commonHeaderPage.signOut();
      });

      it("should show become superman button when not logged in", function() {
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.be.true;
        expect(element(by.id("ps-become-superman")).isDisplayed()).to.eventually.be.true;
        expect(element(by.id("ps-superman-badge")).isDisplayed()).to.eventually.be.false;
      });

      it("should become superman when signed in as a rise vision user", function() {
        //log in
        commonHeaderPage.signin();
        
        element(by.id("ps-become-superman")).click();

        expect(element(by.id("ps-become-superman")).isDisplayed()).to.eventually.be.false;
        //superman!
        expect(element(by.id("ps-superman-badge")).isDisplayed()).to.eventually.be.true;
      });

      it("should hide superman identity when user is logged out", function() {
        commonHeaderPage.signOut();
        
        //signed out; sign-in button shows
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.equal(true);

        expect(element(by.id("ps-become-superman")).isDisplayed()).to.eventually.be.true;
        expect(element(by.id("ps-superman-badge")).isDisplayed()).to.eventually.be.false;

      });      
    });
  };

  module.exports = SupermanScenarios;

})();
