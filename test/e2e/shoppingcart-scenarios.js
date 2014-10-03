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

  describe("Shopping Cart", function() {
  var ptor;

      before(function() {
        ptor = protractor.getInstance();
        ptor.manage().deleteAllCookies();
        browser.get("/test/e2e/index.html#/shopping-cart");
        //clear local storage
        browser.executeScript("localStorage.clear();");
        ptor.driver.navigate().refresh();
      });

      it("should not function when user is not signed in", function() {
        assert.eventually.isTrue(element(by.css("button.sign-in")).isDisplayed(), "Sign in button should show");

        assert.eventually.isTrue(element(by.id("buy-product-1")).isDisplayed(), "Product 1 button should show");
        assert.eventually.isTrue(element(by.id("buy-product-2")).isDisplayed(), "Product 2 button should show");
        assert.eventually.isTrue(element(by.id("buy-product-3")).isDisplayed(), "Product 3 button should show");

        assert.eventually.isFalse(element(by.css(".shopping-cart-button")).isDisplayed(), "Cart button should not show");
        element(by.id("buy-product-2")).click();
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "", "Should not add to cart");

      });

      it("should add stuff to cart when logged in", function() {
        //log in
        browser.executeScript("gapi.setPendingSignInUser('michael.sanchez@awesome.io')");
        element(by.css("button.sign-in")).click();

        assert.eventually.isTrue(element(by.id("buy-product-1")).isDisplayed(), "Product 1 button should show");
        assert.eventually.isTrue(element(by.id("buy-product-2")).isDisplayed(), "Product 2 button should show");
        assert.eventually.isTrue(element(by.id("buy-product-3")).isDisplayed(), "Product 3 button should show");

        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "", "Cart badge should display nothing");

        // ptor.driver.navigate().refresh();

        browser.takeScreenshot().then(function(png) {
        var stream = fs.createWriteStream("/tmp/screenshot.png");
          stream.write(new Buffer(png, "base64"));
          stream.end();
        });

        //add to cart
        element(by.id("buy-product-2")).click();
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "1", "Cart badge should display 1");
        element(by.id("buy-product-3")).click();
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "2", "Cart badge should display 2");
        element(by.id("buy-product-1")).click();
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "3", "Cart badge should display 3");
        element(by.id("buy-product-3")).click();
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "3", "Cart badge should display 3");

      });

      it("should persist cart on refresh", function() {
        ptor.driver.navigate().refresh();
        assert.eventually.isTrue(element(by.css(".shopping-cart-button")).isDisplayed(), "Cart button should show");
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "3", "Cart badge should display 3");
      });

      it("should clear cart", function() {
        element(by.id("clear-cart")).click();
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "", "Cart should be cleared out");
      });

      it("should clear cart when logging out", function() {
        element(by.id("buy-product-2")).click();
        element(by.id("buy-product-3")).click();
        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "2", "Cart badge should display 2");

        element(by.css("img.profile-pic")).click();
        //shows sign-out menu item
        expect(element(by.css(".sign-out-button")).isDisplayed()).to.eventually.equal(true);
        //click sign out
        element(by.css(".sign-out-button")).click();
        browser.switchTo().alert().then(function (alert){alert.accept();});

        assert.eventually.isTrue(element(by.css("button.sign-in")).isDisplayed(), "Sign in button should show");

        //log in
        browser.executeScript("gapi.setPendingSignInUser('michael.sanchez@awesome.io')");
        element(by.css("button.sign-in")).click();

        assert.eventually.strictEqual(element(by.id("cartBadge")).getText(), "", "Cart badge should display nothing");
      });

  });
})();
