(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var RegistrationModalPage = require('./../pages/registrationModalPage.js');
  var helper = require('rv-common-e2e').helper;

  var RegistrationScenarios = function() {

    describe("Registration", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, 
        homepage, 
        registrationModalPage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        registrationModalPage = new RegistrationModalPage();

        homepage.get();
      });

      it("should show T&C Dialog on new Google Account", function() {
        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
        
        helper.wait(registrationModalPage.getRegistrationModal(), "Registration Modal");
        
        //dialog shows
        expect(registrationModalPage.getRegistrationModal().isPresent()).to.eventually.be.true;

        //fill in email address
      });

      it("should not bug me again when I click 'cancel', even after a refresh (limbo state)", function() {
        registrationModalPage.getCancelButton().click();
        browser.refresh();
        
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
        
        expect(commonHeaderPage.getSignInButton().isDisplayed()).to.eventually.be.false;
        expect(registrationModalPage.getRegistrationModal().isPresent()).to.eventually.be.false;
      });

      it("allow me to register when I've changed my mind", function() {
        expect(homepage.getRegisterUserButton().isDisplayed(), "Create Account button should show").to.eventually.be.true;
        homepage.getRegisterUserButton().click();
        
        helper.wait(registrationModalPage.getRegistrationModal(), "Registration Modal");
        
        //dialog shows
        expect(registrationModalPage.getRegistrationModal().isPresent()).to.eventually.be.true;
      });

      it("should show validation errors if i have not agreed to terms and entered a first and last name", function () {
        registrationModalPage.getSaveButton().click();
        
        expect(registrationModalPage.getValidationTermsAccepted().isPresent()).to.eventually.be.true;
        expect(registrationModalPage.getValidationFirstName().isPresent()).to.eventually.be.true;
        expect(registrationModalPage.getValidationLastName().isPresent()).to.eventually.be.true;
      });

      it("should complete the registration process", function () {
        registrationModalPage.getFirstNameField().sendKeys("John");
        registrationModalPage.getLastNameField().sendKeys("Doe");
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
  };

  module.exports = RegistrationScenarios;

})();
