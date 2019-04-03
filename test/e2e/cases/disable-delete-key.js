(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var helper = require('rv-common-e2e').helper;
  var CommonHeaderPage = require('./../pages/commonHeaderPage.js');
  var HomePage = require('./../pages/homepage.js');
  var CompanySettingsModalPage = require('./../pages/companySettingsModalPage.js');

  var DisableDeleteKeyScenarios = function() {

    describe("Disable Delete Key Navigation:", function() {
      var commonHeaderPage, 
        homepage, 
        companySettingsModalPage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        companySettingsModalPage = new CompanySettingsModalPage();

        homepage.getFakePage();
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });

        homepage.getNavMenuOptions().get(0).click();
      });

      describe("Delete Key/Backspace should not go back in navigation history", function () {
        it("should open a modal (Company Settings)", function() {
          commonHeaderPage.getProfilePic().click();

          expect(homepage.getCompanySettingsButton().isDisplayed()).to.eventually.be.true;
          homepage.getCompanySettingsButton().click();
          
          helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Company Settings Modal");
          helper.waitDisappear(companySettingsModalPage.getLoader(), "Company Settings Modal");

          expect(companySettingsModalPage.getCompanySettingsModal().isDisplayed()).to.eventually.be.true;
        });

        it("should not navigate back with Backspace/Delete key", function(done) {
          browser.getCurrentUrl().then(function(initialUrl) {
            browser.actions().sendKeys(protractor.Key.BACK_SPACE).perform();
            expect(browser.getCurrentUrl()).to.eventually.equal(initialUrl);
            expect(companySettingsModalPage.getCompanySettingsModal().isDisplayed()).to.eventually.be.true;            
            done();
          });
        });
        
        it("should delete text from input", function() {
          companySettingsModalPage.getNameField().clear();
          companySettingsModalPage.getNameField().sendKeys('New Name').sendKeys(protractor.Key.BACK_SPACE);
          expect(companySettingsModalPage.getNameField().getAttribute('value')).to.eventually.equal('New Nam');
        });
        
      });

    });
  };
  
  module.exports = DisableDeleteKeyScenarios;
  
})();
