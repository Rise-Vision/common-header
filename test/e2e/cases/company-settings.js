(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var CompanySettingsModalPage = require('./../pages/companySettingsModalPage.js');
  var helper = require('rv-common-e2e').helper;

  var CompanySettingsScenarios = function() {

    describe("Companies Settings", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, 
        homepage, 
        companySettingsModalPage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        companySettingsModalPage = new CompanySettingsModalPage();

        homepage.get();

        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
      });

      describe("Company Settings", function () {
        it("Opens Company Settings Dialog", function() {
          homepage.getProfilePic().click();

          assert.eventually.isTrue(homepage.getCompanySettingsButton().isDisplayed(),
            "Company settings menu item should present");
          homepage.getCompanySettingsButton().click();
          
          helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Comapny Settings Modal");
          
          assert.eventually.isTrue(companySettingsModalPage.getCompanySettingsModal().isDisplayed(),
            "Company settings dialog should show");
        });
        
        it("Loads company settings", function() {
          helper.waitDisappear(companySettingsModalPage.getLoader(), "Load Company Settings");
          
          expect(companySettingsModalPage.getNameField().getAttribute('value')).to.eventually.be.ok;
        });

        it("Resets auth key", function() {
          var authKey = companySettingsModalPage.getAuthKeyField().getText();
          
          companySettingsModalPage.getResetAuthKeyButton().click();
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //confirm reset
          
          helper.waitForAlert("Auth Key reset");
          
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //acknowledge reset message
          
          expect(companySettingsModalPage.getAuthKeyField().getText()).to.eventually.be.ok;
          expect(companySettingsModalPage.getAuthKeyField().getText()).to.eventually.not.equal(authKey);
        });

        it("Resets claim id", function() {
          var claimId = companySettingsModalPage.getClaimIdField().getText();
          
          companySettingsModalPage.getResetClaimIdButton().click();
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //confirm reset
          
          helper.waitForAlert("Claim Id reset");
          
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //acknowledge reset message
          
          expect(companySettingsModalPage.getClaimIdField().getText()).to.eventually.be.ok;
          expect(companySettingsModalPage.getClaimIdField().getText()).to.eventually.not.equal(claimId);
        });

        it("Company Settings Dialog Should Close", function () {
          companySettingsModalPage.getCloseButton().click();
          
          assert.eventually.isFalse(companySettingsModalPage.getCompanySettingsModal().isPresent(),
            "Company Settings dialog should hide");
        });
      });

    });
  };
  
  module.exports = CompanySettingsScenarios;
  
})();
