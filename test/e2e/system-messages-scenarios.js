(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;
  var assert = chai.assert;

  var fs = require("fs");

  browser.driver.manage().window().setSize(1124, 850);

  describe("System Messages", function() {
  var ptor;

      before(function() {
        ptor = protractor.getInstance();
        ptor.manage().deleteAllCookies();
        browser.get("/test/e2e/index.html#/");
        //clear local storage
        browser.executeScript("localStorage.clear();");
        ptor.driver.navigate().refresh();
        element(by.id("reset-db")).click();
      });

      it("should not show system message icon when not logged in", function() {
        assert.eventually.isTrue(element(by.css("button.sign-in")).isDisplayed(), "Sign in button should show");
        assert.eventually.isFalse(element(by.css(".system-messages-button")).isDisplayed(), "Should not show system messages icon");
        assert.eventually.strictEqual(element(by.css(".system-messages-badge")).getText(), "", "Should not show system message badge");
      });

      it("should show system messages when logged in", function() {
        //log in
        browser.executeScript("gapi.setPendingSignInUser('michael.sanchez@awesome.io')");
        element(by.css("button.sign-in")).click();

        assert.eventually.isTrue(element(by.css(".system-messages-button")).isDisplayed(), "Should show system messages icon");
        assert.eventually.strictEqual(element(by.css(".system-messages-badge")).getText(), "2", "Badge should show correct number of system messages");
      });
  });
})();
