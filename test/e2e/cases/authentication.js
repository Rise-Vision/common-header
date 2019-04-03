(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var helper = require('rv-common-e2e').helper;
  var CommonHeaderPage = require('./../pages/commonHeaderPage.js');
  var HomePage = require('./../pages/homepage.js');

  var AuthenticationScenarios = function() {

    describe("Authentication", function() {
      var commonHeaderPage, homepage;
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();
        commonHeaderPage.signOut();
      });

      it("should show sign in button", function() {
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.be.true;
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

        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.be.false;
        expect(commonHeaderPage.getProfilePic().isDisplayed()).to.eventually.be.true;
        expect(commonHeaderPage.getSignOutButton().isDisplayed()).to.eventually.be.false;
      });

      it("should log out", function() {
        commonHeaderPage.getProfilePic().click();

        //shows sign-out menu item
        expect(commonHeaderPage.getSignOutButton().isDisplayed()).to.eventually.be.true;

        //click sign out
        commonHeaderPage.getSignOutButton().click();
        
        helper.wait(commonHeaderPage.getSignOutModal(), 'Sign Out Modal');
        
        expect(commonHeaderPage.getSignOutModal().isDisplayed()).to.eventually.be.true;
        commonHeaderPage.getSignOutRvOnlyButton().click();

        //signed out; sign-in button shows
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.equal(true);

      });

    });
  };

  module.exports = AuthenticationScenarios;

})();
