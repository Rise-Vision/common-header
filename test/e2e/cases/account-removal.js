(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var CompanySettingsModalPage = require('./../pages/companySettingsModalPage.js');
  var SafeDeleteModalPage = require('./../pages/safeDeleteModalPage.js');
  var helper = require('rv-common-e2e').helper;

  var AccountRemoval = function() {

    describe("Account Removal", function() {
      var commonHeaderPage, 
        homepage, 
        companySettingsModalPage,
        safeDeleteModalPage;
        
      var username = browser.params.login.user2;
      var password = browser.params.login.pass2;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        companySettingsModalPage = new CompanySettingsModalPage();
        safeDeleteModalPage = new SafeDeleteModalPage();


        homepage.get();
        
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
      });

      it("Deletes company", function() {
        commonHeaderPage.getProfilePic().click();
        homepage.getCompanySettingsButton().click();        
        
        helper.wait(companySettingsModalPage.getCompanySettingsModal(), "Comapny Settings Modal");
        helper.waitDisappear(companySettingsModalPage.getLoader(), "Load Company Settings");
        
        companySettingsModalPage.getDeleteButton().click();
    
        // confirm delete
        helper.wait(safeDeleteModalPage.getSafeDeleteModal(), "Safe Delete Modal");
        safeDeleteModalPage.getSafeDeleteInput().sendKeys('DELETE');
        safeDeleteModalPage.getDeleteForeverButton().click();
        
        helper.waitRemoved(companySettingsModalPage.getCompanySettingsModal(), "Company Settings Modal");
      });
      
      it("Signs user out when deleting company", function() {
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
        
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.be.true;
      });
    });
  };

  module.exports = AccountRemoval;

})();
