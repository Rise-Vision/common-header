(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var helper = require('rv-common-e2e').helper;

  var ShoppingCartScenarios = function() {

    describe("Shopping Cart", function() {
      var commonHeaderPage,
        homepage;
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();
        commonHeaderPage.signOut();
      });

      it("should not function when user is not signed in", function() {
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.be.true;

        expect(element(by.id("buy-product-1")).isDisplayed()).to.eventually.be.true;
        expect(element(by.id("buy-product-2")).isDisplayed()).to.eventually.be.true;
        expect(element(by.id("buy-product-3")).isDisplayed()).to.eventually.be.true;

        expect(element(by.css(".shopping-cart-button")).isDisplayed()).to.eventually.be.false;
        element(by.id("buy-product-2")).click();
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("");

      });

      it("should add stuff to cart when logged in", function() {
        //log in
        commonHeaderPage.signin();
        
        expect(element(by.id("buy-product-1")).isDisplayed()).to.eventually.be.true;
        expect(element(by.id("buy-product-2")).isDisplayed()).to.eventually.be.true;
        expect(element(by.id("buy-product-3")).isDisplayed()).to.eventually.be.true;

        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("");

        //add to cart
        element(by.id("buy-product-2")).click();
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("1");
        element(by.id("buy-product-3")).click();
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("2");
        element(by.id("buy-product-1")).click();
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("3");
        element(by.id("buy-product-3")).click();
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("3");

      });

      // Core API persist is not working because of fake products
      // Should mock API response
      xit("should persist cart on refresh", function() {
        browser.refresh();
        
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
        
        expect(element(by.css(".shopping-cart-button")).isDisplayed()).to.eventually.be.true;
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("3");
      });

      it("should clear cart", function() {
        element(by.id("clear-cart")).click();
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("");
      });

      xit("should persist cart on log out and then log in", function() {
        element(by.id("buy-product-2")).click();
        element(by.id("buy-product-3")).click();
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("2");

        element(by.css(".desktop-menu-item img.profile-pic")).click();
        //shows sign-out menu item
        expect(element(by.css(".dropdown-menu .sign-out-button")).isDisplayed()).to.eventually.be.true;
        //click sign out
        element(by.css(".dropdown-menu .sign-out-button")).click();
        expect(element(by.css(".sign-out-modal")).isDisplayed()).to.eventually.be.true;
        element(by.css(".sign-out-modal .sign-out-rv-only-button")).click();

        expect(element(by.css("button.sign-in")).isDisplayed()).to.eventually.be.true;

        //log in
        browser.executeScript("gapi.setPendingSignInUser('michael.sanchez@awesome.io')");
        element(by.css("button.sign-in")).click();
        
        browser.sleep(500);
        
        expect(element(by.id("cartBadge")).getText()).to.eventually.equal("2");
      });
      
    });
  };

  module.exports = ShoppingCartScenarios;

})();
