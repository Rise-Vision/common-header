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

  describe("Authentication", function() {
  var ptor;

    before(function() {
      ptor = protractor.getInstance();
      ptor.manage().deleteAllCookies();
      browser.get("/test/e2e/index.html");

      //clear local storage
      browser.executeScript("localStorage.clear();");

      ptor.driver.navigate().refresh();
      element(by.id("server-delay")).clear();
      element(by.id("server-delay")).sendKeys("0");
      element(by.id("reset-db")).click();
    });

    it("should authorize", function() {
      assert.eventually.isTrue(element(by.css("a.sign-in")).isDisplayed(), "Sign in button should show");
      //dialog does not show
      assert.eventually.isFalse(element(by.css(".authorization-modal")).isPresent(), "Auth modal should not show in the beginning");
      //click on sign in button
      browser.executeScript("gapi.setPendingSignInUser('michael.sanchez@awesome.io')");
      element(by.css("a.sign-in")).click();
      //dialog shows
      assert.eventually.isTrue(element(by.css(".authorization-modal")).isDisplayed(), "Auth modal should show after clicking on sign in");
      assert.eventually.isTrue(element(by.css(".authorize-button")).isDisplayed(), "Auth button should exist in auth modal");
      //click authorize
      element(by.css(".authorize-button")).click();
      //auth dialog should disappear
      assert.eventually.isFalse(element(by.css(".authorization-modal")).isPresent(), "Auth modal should close");
    });

    it("should retain auth status upon refresh", function () {
      ptor.driver.navigate().refresh();
      assert.eventually.isFalse(element(by.css("a.sign-in")).isDisplayed(), "sign in button should not show");
      assert.eventually.isTrue(element(by.css("img.profile-pic")).isDisplayed(), "profile pic should show");
      assert.eventually.isFalse((element(by.css(".sign-out-button")).isDisplayed()), "sign out button should not show");
    });

    it("should log out", function() {

      // browser.takeScreenshot().then(function(png) {
      // var stream = fs.createWriteStream("/tmp/screenshot.png");
      //   stream.write(new Buffer(png, "base64"));
      //   stream.end();
      // });
      //
      //click on profile pic
      element(by.css("img.profile-pic")).click();


      //shows sign-out menu item
      expect(element(by.css(".sign-out-button")).isDisplayed()).to.eventually.equal(true);

      //click sign out
      element(by.css(".sign-out-button")).click();
      browser.switchTo().alert().then(function (alert){alert.accept();});
      //signed out; sign-in button shows
      expect(element(by.css("a.sign-in")).isDisplayed()).to.eventually.equal(true);

    });

  });
})();
