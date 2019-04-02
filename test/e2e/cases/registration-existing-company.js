"use strict";
var expect = require("rv-common-e2e").expect;
var helper = require("rv-common-e2e").helper;
var CommonHeaderPage = require("rv-common-e2e").commonHeaderPage;
var HomePage = require("./../pages/homepage.js");
var RegistrationModalPage = require("./../pages/registrationModalPage.js");
var CompanyUsersModalPage = require("./../pages/companyUsersModalPage.js");
var UserSettingsModalPage = require("./../pages/userSettingsModalPage.js");
var helper = require("rv-common-e2e").helper;

var FirstSigninScenarios = function() {

  browser.driver.manage().window().setSize(1400, 900);
  describe("Registration Existing Company", function () {
    var homepage;
    var commonHeaderPage;
    var registrationModalPage;
    var companyUsersModalPage;
    var userSettingsModalPage;

    before(function (){
      commonHeaderPage = new CommonHeaderPage();
      homepage = new HomePage();
      registrationModalPage = new RegistrationModalPage();
      companyUsersModalPage = new CompanyUsersModalPage();
      userSettingsModalPage = new UserSettingsModalPage();

      homepage.get();
      
      //sign in, wait for spinner to go away
      helper.waitDisappear(commonHeaderPage.getLoader(), "CH spinner loader").then(function () {
        commonHeaderPage.signin(browser.params.login.user2, browser.params.login.pass2);
      });
    });

    describe("Add a new User", function() {
      xit("Opens Company Users Dialog and load company users", function() {
        commonHeaderPage.getProfilePic().click();

        expect(homepage.getCompanyUsersButton().isDisplayed()).to.eventually.be.true;
        homepage.getCompanyUsersButton().click();

        helper.wait(companyUsersModalPage.getCompanyUsersModal(), "Company Users Modal");

        expect(companyUsersModalPage.getCompanyUsersModal().isDisplayed()).to.eventually.be.true;
      });

      xit("loads up a list of users for the company", function () {
        helper.waitDisappear(companyUsersModalPage.getLoader(), "Load Company Users");
        
        expect(companyUsersModalPage.getUsersList().count()).to.eventually.be.above(0);
      });

      xit("opens up Add User dialog", function () {
        companyUsersModalPage.getAddUserButton().click();
        
        helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");

        expect(userSettingsModalPage.getUserSettingsModal().isPresent()).to.eventually.be.true;
      });

      xit("adds a user", function () {
        userSettingsModalPage.getUsernameField().sendKeys("jenkins1@risevision.com");
        userSettingsModalPage.getFirstNameField().sendKeys("Jenkins");
        userSettingsModalPage.getLastNameField().sendKeys("1");
        userSettingsModalPage.getEmailField().sendKeys("jenkins1@risevision.com");
        userSettingsModalPage.getSaveButton().click();
        
        helper.waitDisappear(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");        

        expect(userSettingsModalPage.getUserSettingsModal().isPresent()).to.eventually.be.false;
      });
      
      xit("Company Users Dialog Should Close", function () {
        helper.waitDisappear(companyUsersModalPage.getLoader(), "Load Company Users");

        companyUsersModalPage.getCloseButton().click();

        helper.waitDisappear(companyUsersModalPage.getCompanyUsersModal(), "Company Users Modal");
        
        expect(companyUsersModalPage.getCompanyUsersModal().isPresent()).to.eventually.be.false;
      });

      it("should log out", function() {
        commonHeaderPage.getProfilePic().click();

        //shows sign-out menu item
        expect(commonHeaderPage.getSignOutButton().isDisplayed()).to.eventually.be.true;

        //click sign out
        commonHeaderPage.getSignOutButton().click();
        
        helper.wait(commonHeaderPage.getSignOutModal(), "Sign Out Modal");
        
        expect(commonHeaderPage.getSignOutModal().isDisplayed()).to.eventually.be.true;
        commonHeaderPage.getSignOutRvOnlyButton().click();

        //signed out; sign-in button shows
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.equal(true);

      });

    });

    describe("New User Logs in and Registers", function() {
      it("should show T&C Dialog on new Google Account", function() {
        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), "CH spinner loader").then(function () {
          commonHeaderPage.signin();
        });
        
        helper.wait(registrationModalPage.getRegistrationModal(), "Registration Modal");
        
        //dialog shows
        expect(registrationModalPage.getRegistrationModal().isPresent()).to.eventually.be.true;

        //fill in email address
      });

      it("should show only relevant Registration fields", function() {
        expect(registrationModalPage.getFirstNameField().isPresent()).to.eventually.be.true;
        expect(registrationModalPage.getLastNameField().isPresent()).to.eventually.be.true;
        expect(registrationModalPage.getCompanyNameField().isPresent()).to.eventually.be.false;
        expect(registrationModalPage.getCompanyIndustryOptions().isPresent()).to.eventually.be.false;
        expect(registrationModalPage.getTermsCheckbox().isPresent()).to.eventually.be.true;
      });

      it("should complete the registration process", function () {
        registrationModalPage.getFirstNameField().sendKeys("Jenkins1");
        registrationModalPage.getLastNameField().sendKeys("ForDeletion");
        //click authorize
        registrationModalPage.getTermsCheckbox().click();
        
        // No need to sign up for newsletter
        // registrationModalPage.getNewsletterCheckbox().click();
        registrationModalPage.getSaveButton().click();
        
        helper.waitRemoved(registrationModalPage.getRegistrationModal(), "Registration Modal");

        expect(registrationModalPage.getRegistrationModal().isPresent()).to.eventually.be.false;
      });

      it("should update auth button", function () {
        expect(commonHeaderPage.getProfilePic().isDisplayed()).to.eventually.be.true;
      });

    });

    xdescribe("New User Deletes Themselves", function() {
      it("Opens User Settings Dialog", function() {
        commonHeaderPage.getProfilePic().click();

        expect(homepage.getUserSettingsButton().isDisplayed()).to.eventually.be.true;
        homepage.getUserSettingsButton().click();

        helper.wait(userSettingsModalPage.getLoader(), "User Settings Modal");
      });

      it("deletes a user", function() {
        // Ensure the right User is being deleted
        expect(userSettingsModalPage.getEmailField().getAttribute("value")).to.eventually.equal("jenkins1@risevision.com");

        userSettingsModalPage.getDeleteButton().click();
        
        // browser.switchTo().alert().accept();  // Use to accept (simulate clicking ok)
        
        helper.waitDisappear(userSettingsModalPage.getLoader(), "User Settings Modal");
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
module.exports = FirstSigninScenarios;
