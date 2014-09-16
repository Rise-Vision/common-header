(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;
  var assert = chai.assert;

  var fs = require("fs");

  browser.driver.manage().window().setSize(1024, 768);

  describe("User Settings", function() {
  var ptor;

      before(function() {
        ptor = protractor.getInstance();
        ptor.manage().deleteAllCookies();
        browser.get("/test/e2e/index.html#");

        //clear local storage
        element(by.id("reset-db")).click();
        ptor.driver.navigate().refresh();
      });

      it("should show user settings modal and update settings", function() {
        //log in
        element(by.css("a.sign-in")).click();
        element(by.css(".authorize-button")).click();
        var availableElement = by.css(".login-account-button[data-username='michael.sanchez@awesome.io']");
        browser.wait(function() {
          return ptor.isElementPresent(availableElement);
        }, 10000);
        element(by.css(".login-account-button[data-username='michael.sanchez@awesome.io']")).click();

        //reset db
        assert.eventually.isFalse(element(by.css("a.sign-in")).isDisplayed(), "sign in button should not show");

        element(by.css("img.profile-pic")).click();
        assert.eventually.isTrue(element(by.css(".user-settings-button")).isDisplayed(), "User settings menu item should show");

        //click on user settings button
        element(by.css(".user-settings-button")).click();

        assert.eventually.isTrue(element(by.css(".user-settings-modal"))
          .isDisplayed(), "User settings modal should show after clicking on sign in");


        element(by.id("user-settings-first-name")).clear();
        element(by.id("user-settings-first-name")).sendKeys("John");

        element(by.id("user-settings-last-name")).clear();
        element(by.id("user-settings-last-name")).sendKeys("Doe");

        element(by.id("user-settings-phone")).clear();
        element(by.id("user-settings-phone")).sendKeys("000-000-0000");

        element(by.id("user-settings-email")).clear();
        element(by.id("user-settings-email")).sendKeys("testmail@testmail.com");

        if ( !element(by.id("user-settings-newsletter")).isSelected() )
        {
           element(by.id("user-settings-newsletter")).click();
        }

        if ( !element(by.id("user-settings-ce")).isSelected() )
        {
           element(by.id("user-settings-ce")).click();
        }

        if ( element(by.id("user-settings-pu")).isSelected() )
        {
           element(by.id("user-settings-pu")).click();
        }

        if ( !element(by.id("user-settings-da")).isSelected() )
        {
           element(by.id("user-settings-da")).click();
        }

        if ( element(by.id("user-settings-sa")).isSelected() )
        {
           element(by.id("user-settings-sa")).click();
        }

        //click save button
        element(by.id("save-button")).click();
        assert.eventually.isFalse(element(by.css(".user-settings-modal"))
          .isPresent(), "User settings modal should hide after saving");

        var profilePromise = browser.executeScript(function () {
            return window.gapi._fakeDb.users[0];
          });
        expect(profilePromise).to.eventually.have.property("firstName", "John");
        expect(profilePromise).to.eventually.have.property("lastName", "Doe");
        expect(profilePromise).to.eventually.have.property("email", "testmail@testmail.com");
        expect(profilePromise).to.eventually.have.property("telephone", "000-000-0000");

        //TODO test roles
      });
  });
})();
