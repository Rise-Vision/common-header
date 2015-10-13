(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var helper = require('rv-common-e2e').helper;

  var AuthenticationScenarios = function() {

    describe("Authentication", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, homepage;
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();
      });

      it("should show sign in button", function() {
        assert.eventually.isTrue(commonHeaderPage.getSignInButton().isDisplayed(), "Sign in button should show");
      });
      
      it("should sign in user", function() {
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
      });

      it("should retain auth status upon refresh", function () {
        browser.refresh();
        
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

        assert.eventually.isFalse(commonHeaderPage.getSignInButton().isDisplayed(), "sign in button should not show");
        assert.eventually.isTrue(homepage.getProfilePic().isDisplayed(), "profile pic should show");
        assert.eventually.isFalse(homepage.getSignOutButton().isDisplayed(), "sign out button should not show");
      });

      it("should log out", function() {
        homepage.getProfilePic().click();

        //shows sign-out menu item
        expect(homepage.getSignOutButton().isDisplayed()).to.eventually.be.true;

        //click sign out
        homepage.getSignOutButton().click();
        
        helper.wait(homepage.getSignOutModal(), 'Sign Out Modal');
        
        assert.eventually.isTrue(homepage.getSignOutModal().isDisplayed(), "sign-out dialog should show");
        homepage.getSignOutRvOnlyButton().click();

        //signed out; sign-in button shows
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.equal(true);

      });

    });
  };

  module.exports = AuthenticationScenarios;

})();
