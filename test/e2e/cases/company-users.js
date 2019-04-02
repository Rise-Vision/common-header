(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var CompanyUsersModalPage = require('./../pages/companyUsersModalPage.js');
  var UserSettingsModalPage = require('./../pages/userSettingsModalPage.js');
  var helper = require('rv-common-e2e').helper;

  var CompanyUsersScenarios = function() {

    describe("Companies", function() {
      var commonHeaderPage, 
        homepage, 
        companyUsersModalPage,
        userSettingsModalPage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        companyUsersModalPage = new CompanyUsersModalPage();
        userSettingsModalPage = new UserSettingsModalPage();

        homepage.get();

        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
      });

      describe("Company Users", function () {
        it("Opens Company Users Dialog and load company users", function() {
          commonHeaderPage.getProfilePic().click();

          expect(homepage.getCompanyUsersButton().isDisplayed()).to.eventually.be.true;
          homepage.getCompanyUsersButton().click();

          helper.wait(companyUsersModalPage.getCompanyUsersModal(), "Comapny Users Modal");

          expect(companyUsersModalPage.getCompanyUsersModal().isDisplayed()).to.eventually.be.true;
        });

        it("loads up a list of users for the company", function () {
          helper.waitDisappear(companyUsersModalPage.getLoader(), "Load Company Users");
          
          expect(companyUsersModalPage.getUsersList().count()).to.eventually.be.above(0);
        });

        it("opens up Add User dialog", function () {
          companyUsersModalPage.getAddUserButton().click();
          
          helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");

          expect(userSettingsModalPage.getUserSettingsModal().isPresent()).to.eventually.be.true;
        });

        it("adds a user", function () {
          var modal = userSettingsModalPage.getUserSettingsModal();
          
          userSettingsModalPage.getUsernameField().sendKeys("aaa.user@somecompany.com");
          userSettingsModalPage.getFirstNameField().sendKeys("John");
          userSettingsModalPage.getLastNameField().sendKeys("test");
          userSettingsModalPage.getPhoneField().sendKeys("000-000-0000");
          userSettingsModalPage.getEmailField().sendKeys("aaa.user@somecompany.com");
          userSettingsModalPage.getSaveButton().click();
          
          helper.waitRemoved(modal, "User Settings Modal");        
        });
        
        it("selects a user", function() {

          helper.waitDisappear(companyUsersModalPage.getLoader(), "Load Company Users");

          // assume first user
          companyUsersModalPage.getUsers().get(0).click();
          
          helper.wait(userSettingsModalPage.getLoader(), "User Settings Modal");

          expect(userSettingsModalPage.getFirstNameField().getAttribute('value')).to.eventually.equal("John");
          expect(userSettingsModalPage.getLastNameField().getAttribute('value')).to.eventually.equal("test");
          expect(userSettingsModalPage.getEmailField().getAttribute('value')).to.eventually.equal("aaa.user@somecompany.com");
        });

        it("deletes a user", function() {
          var modal = userSettingsModalPage.getUserSettingsModal();
          userSettingsModalPage.getDeleteButton().click();
          
          browser.switchTo().alert().accept();  // Use to accept (simulate clicking ok)
          
          helper.waitRemoved(modal, "User Settings Modal");
        });
        
        it("Company Users Dialog Should Close", function () {
          helper.waitDisappear(companyUsersModalPage.getLoader(), "Load Company Users");

          companyUsersModalPage.getCloseButton().click();

          helper.waitDisappear(companyUsersModalPage.getCompanyUsersModal(), "Company Users Modal");
          
          expect(companyUsersModalPage.getCompanyUsersModal().isPresent()).to.eventually.be.false;
        });
        
      });
    });
  };
  
  module.exports = CompanyUsersScenarios;

})();
