/*globals element, by */
(function(module) {
  'use strict';

  var RegistrationModalPage = function () {
    var registrationModal = element(by.css(".registration-modal"));
    var loader = element(by.xpath('//div[@spinner-key="company-settings-modal"]'));
    
    var firstNameField = element(by.css(".registration-modal .firstName"));
    var lastNameField = element(by.css(".registration-modal .lastName"));
    var termsCheckbox = element(by.css(".accept-terms-checkbox"));
    var newsletterCheckbox = element(by.css(".sign-up-newsletter-checkbox"));
    
    var validationTermsAccepted = element(by.css(".validation-error-message-accepted"));
    var validationFirstName = element(by.css(".validation-error-message-first-name"));
    var validationLastName = element(by.css(".validation-error-message-last-name"));
    
    var saveButton = element(by.css(".registration-save-button"));
    var cancelButton = element(by.css(".registration-cancel-button"));
    
    this.getRegistrationModal = function() {
      return registrationModal;
    };
    
    this.getLoader = function() {
      return loader;
    };
    
    this.getFirstNameField = function() {
      return firstNameField;
    };

    this.getLastNameField = function() {
      return lastNameField;
    };
    
    this.getTermsCheckbox = function() {
      return termsCheckbox;
    };
    
    this.getNewsletterCheckbox = function() {
      return newsletterCheckbox;
    };
    
    this.getValidationTermsAccepted = function() {
      return validationTermsAccepted;
    };
    
    this.getValidationFirstName = function() {
      return validationFirstName;
    };
    
    this.getValidationLastName = function() {
      return validationLastName;
    };

    this.getSaveButton = function() {
      return saveButton;
    };
    
    this.getCancelButton = function() {
      return cancelButton;
    };
        
  };

  module.exports = RegistrationModalPage;
})(module);
