(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;
  var assert = chai.assert;

  var fs = require("fs");

  browser.driver.manage().window().setSize(1280, 768);

  describe("Companies", function() {
  var ptor;

      before(function() {
        ptor = protractor.getInstance();
        ptor.manage().deleteAllCookies();
        browser.get("/test/e2e/index.html#/shopping-cart");

        //clear local storage
        browser.executeScript("localStorage.clear();");

        ptor.driver.navigate().refresh();
        element(by.id("reset-db")).click();
      });

      describe("Select Subcompany", function () {
        xit("Opens select subcompany dialog", function () {
          element(by.css("button.sign-in")).click();
          assert.eventually.isFalse(element(by.css("button.sign-in")).isDisplayed(), "sign in button should not show");
          element(by.css(".company-buttons-icon")).click();
          assert.eventually.isTrue(element(by.css(".select-subcompany-menu-button")).isDisplayed(),
            "Select subcompany menu item should present");
          element(by.css(".move-company-menu-button")).click();

          assert.eventually.isTrue(element(by.css(".select-subcompany-modal")).isDisplayed(),
            "Move company dialog should show");
        });

        xit("Switches to subcompany", function () {
          //TODO
        });

        xit("Switches back to parent company", function () {
          //TODO
        });

        it("can specify subcompany via URL parameter", function () {

          browser.executeScript("gapi.setPendingSignInUser('michael.sanchez@awesome.io')");
          element(by.css("button.sign-in")).click();
          assert.eventually.isFalse(element(by.css("button.sign-in")).isDisplayed(), "sign in button should not show");

          browser.get("/test/e2e/index.html#/shopping-cart?cid=" +
            "bfaf9b18-fd5b-475b-afe1-a511cd73662f");
          assert.eventually.isTrue(element(by.css(".sub-company-alert")).isDisplayed(),
            "subcompany alert should show");
          browser.get("/test/e2e/index.html#/shopping-cart");
          protractor.getInstance().driver.navigate().refresh();
          assert.eventually.isFalse(element(by.css(".sub-company-alert")).isPresent() &&
            element(by.css(".sub-company-alert")).isDisplayed(),
            "subcompany alert should hide");
        });
      });

      describe("Add subcompany & move company", function () {
        it("Opens Add Subcompany dialog", function () {
          element(by.css(".company-buttons-icon")).click();
          assert.eventually.isTrue(element(by.css(".add-subcompany-menu-button")).isDisplayed(),
            "Add subcompany menu item should show");
          element(by.css(".add-subcompany-menu-button")).click();
          assert.eventually.isTrue(element(by.css(".pt-add-subcompany-modal")).isDisplayed(),
            "Add subcompany dialog should show");
            ptor.sleep(500);
        });

        it("Opens Move Company Dialog", function() {
          element(by.css(".move-subcompany-button")).click();

          assert.eventually.isTrue(element(by.css(".move-company-modal")).isDisplayed(),
            "Move company dialog should show");
        });

        it("Shows error on invalid auth key", function () {
          element(by.id("auth-key")).clear();
          element(by.id("auth-key")).sendKeys("invalid-auth-key");
          element(by.css(".retrieve-company-details-button")).click();
          assert.eventually.isTrue(element(by.css(".alert.alert-danger")).isDisplayed(),
            "Error message should show");
        });

        it("Retrieves Company Info", function () {
          element(by.id("auth-key")).clear();
          element(by.id("auth-key")).sendKeys("3509cd9b-e9ba-47d2-84bb-f954db4641b1");
          element(by.css(".retrieve-company-details-button")).click();

          assert.eventually.isTrue(element(by.css(".company-details-info")).isDisplayed(),
            "Company details info should show");
        });

        it("Should Move Company", function () {
          element(by.css(".move-company-button")).click();
          assert.eventually.isTrue(element(by.css(".alert.alert-success")).isDisplayed(),
            "Success message should show");
          assert.eventually.isFalse(element(by.css(".move-company-button")).isDisplayed(),
            "Move company button should hide");

        });

        it("Move Company Dialog Should Close", function () {
          element(by.css("button.close-move-company-button")).click();
          assert.eventually.isFalse(element(by.css(".move-company-modal")).isPresent(),
            "Move company dialog should hide");
        });

        it("Closes Add subcompany Dialog", function () {
          element(by.css(".cancel-add-subcompany-button")).click();
          assert.eventually.isFalse(element(by.css(".add-subcompany-modal")).isPresent(),
            "Add subcompany dialog should hide");
        });
      });

  });
})();
