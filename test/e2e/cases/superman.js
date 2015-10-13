(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var helper = require('rv-common-e2e').helper;

  var SupermanScenarios = function() {

    describe("Superman (uiFlowManager tester)", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, 
        homepage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();

        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it("should show become superman button when not logged in", function() {
        assert.eventually.isTrue(commonHeaderPage.getSignInButton().isDisplayed(), "Sign in button should show");
        assert.eventually.isTrue(element(by.id("ps-become-superman")).isDisplayed(), "Should show Become Superman button");
        assert.eventually.isFalse(element(by.id("ps-superman-badge")).isDisplayed(), "Should not show Superman badge");
      });

      it("should become superman when signed in as a rise vision user", function() {
        //log in
        commonHeaderPage.signin();
        
        element(by.id("ps-become-superman")).click();

        assert.eventually.isFalse(element(by.id("ps-become-superman")).isDisplayed(), "Should show Become Superman button");
        //superman!
        assert.eventually.isTrue(element(by.id("ps-superman-badge")).isDisplayed(), "Should show Superman badge");
      });

      it("should hide superman identity when user is logged out", function() {
        homepage.signOut();
        
        //signed out; sign-in button shows
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.equal(true);

        assert.eventually.isTrue(element(by.id("ps-become-superman")).isDisplayed(), "Should show Become Superman button");
        assert.eventually.isFalse(element(by.id("ps-superman-badge")).isDisplayed(), "Should not show Superman badge");

      });      
    });
  };

  module.exports = SupermanScenarios;

})();
