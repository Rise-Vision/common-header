(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var helper = require('rv-common-e2e').helper;

  var SystemMessagesScenarios = function() {

    describe("Authentication", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, homepage;
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();
      });

      it("should not show system message icon when not logged in", function() {
        assert.eventually.isTrue(commonHeaderPage.getSignInButton().isDisplayed(), "Sign in button should show");

        assert.eventually.isFalse(homepage.getSystemMessagesButton().isDisplayed(), "Should not show system messages icon");
        assert.eventually.strictEqual(homepage.getSystemMessagesBadge().getText(), "", "Should not show system message badge");
      });

      // No system messages - should mock API response
      xit("should show system messages when logged in", function() {
        //log in
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });

        assert.eventually.isTrue(homepage.getSystemMessagesButton().isDisplayed(), "Should show system messages icon");
        assert.eventually.strictEqual(homepage.getSystemMessagesBadge().getText(), "14", "Badge should show correct number of system messages");
      });

      xit("should hide system messages icon when there are no messages", function() {
        element(by.id("clear-system-messages-button")).click();
        browser.refresh();
        
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');

        assert.eventually.isFalse(homepage.getSystemMessagesButton().isDisplayed(), "Should hide system messages icon");
      });
    });
  };

  module.exports = SystemMessagesScenarios;

})();
