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
          commonHeaderPage.getProfilePic().click();

          expect(homepage.getCompanySettingsButton().isDisplayed()).to.eventually.be.true;
          homepage.getCompanySettingsButton().click();
          
          helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Comapny Settings Modal");
          
          expect(companySettingsModalPage.getCompanySettingsModal().isDisplayed()).to.eventually.be.true;
        });
        
        it("Loads company settings", function() {
          helper.waitDisappear(companySettingsModalPage.getLoader(), "Load Company Settings");
          
          expect(companySettingsModalPage.getNameField().getAttribute('value')).to.eventually.be.ok;
        });

        it("Resets auth key", function() {
          var authKey = companySettingsModalPage.getAuthKeyField().getText();
          
          companySettingsModalPage.getResetAuthKeyButton().click();

          helper.waitForAlert("Confirm Auth Key reset");
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //confirm reset
          
          helper.waitForAlert("Auth Key reset");
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //acknowledge reset message
          
          expect(companySettingsModalPage.getAuthKeyField().getText()).to.eventually.be.ok;
          expect(companySettingsModalPage.getAuthKeyField().getText()).to.eventually.not.equal(authKey);
        });

        it("Resets claim id", function() {
          var claimId = companySettingsModalPage.getClaimIdField().getText();
          
          companySettingsModalPage.getResetClaimIdButton().click();

          helper.waitForAlert("Confirm Claim Id reset");
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //confirm reset
          
          helper.waitForAlert("Claim Id reset");
          browser.switchTo().alert().then(function (prompt){ prompt.accept(); }); //acknowledge reset message
          
          expect(companySettingsModalPage.getClaimIdField().getText()).to.eventually.be.ok;
          expect(companySettingsModalPage.getClaimIdField().getText()).to.eventually.not.equal(claimId);
        });

        it("Company Settings Dialog Should Close", function () {
          companySettingsModalPage.getCloseButton().click();
          
          expect(companySettingsModalPage.getCompanySettingsModal().isPresent()).to.eventually.be.false;
        });
      });

    });
  };
  
  module.exports = CompanySettingsScenarios;
  
})();
