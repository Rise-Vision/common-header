(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var helper = require('rv-common-e2e').helper;

  var SystemMessagesScenarios = function() {

    describe("Authentication", function() {
      var commonHeaderPage, homepage;
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();
        commonHeaderPage.signOut();
      });

      it("should not show system message icon when not logged in", function() {
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.be.true;

        expect(homepage.getSystemMessagesButton().isDisplayed()).to.eventually.be.false;
        expect(homepage.getSystemMessagesBadge().getText()).to.eventually.equal("");
      });

      // No system messages - should mock API response
      xit("should show system messages when logged in", function() {
        //log in
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });

        expect(homepage.getSystemMessagesButton().isDisplayed()).to.eventually.be.true;
        expect(homepage.getSystemMessagesBadge().getText()).to.eventually.equal("14");
      });

      xit("should hide system messages icon when there are no messages", function() {
        element(by.id("clear-system-messages-button")).click();
        browser.refresh();
        
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

        expect(homepage.getSystemMessagesButton().isDisplayed()).to.eventually.be.false;
      });
    });
  };

  module.exports = SystemMessagesScenarios;

})();
