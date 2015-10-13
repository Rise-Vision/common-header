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
      this.timeout(2000);// to allow for protactor to load the seperate page
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
          homepage.getProfilePic().click();

          assert.eventually.isTrue(homepage.getCompanyUsersButton().isDisplayed(),
            "Company users menu item should present");
          homepage.getCompanyUsersButton().click();

          helper.wait(companyUsersModalPage.getCompanyUsersModal(), "Comapny Users Modal");

          assert.eventually.isTrue(companyUsersModalPage.getCompanyUsersModal().isDisplayed(),
            "Company users dialog should show");
        });

        it("loads up a list of users for the company", function () {
          helper.waitDisappear(companyUsersModalPage.getLoader(), "Load Company Users");
          
          expect(companyUsersModalPage.getUsersList().count()).to.eventually.be.above(0);
        });

        it("opens up Add User dialog", function () {
          companyUsersModalPage.getAddUserButton().click();
          
          helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");

          assert.eventually.isTrue(userSettingsModalPage.getUserSettingsModal().isPresent(), "Add user dialog should show");
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
          
          helper.waitDisappear(userSettingsModalPage.getLoader(), "User Settings Modal");

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
          
          assert.eventually.isFalse(companyUsersModalPage.getCompanyUsersModal().isPresent(),
            "Company Users dialog should hide");
        });
        
      });
    });
  };
  
  module.exports = CompanyUsersScenarios;

})();
