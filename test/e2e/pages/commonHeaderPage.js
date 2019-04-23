/*globals element, by */

(function(module) {
  'use strict';

  var LoginPage = require('./loginPage.js');
  var helper = require('rv-common-e2e').helper;

  var CommonHeaderPage = function () {
    var selfCommonHeaderPage = this;

    var loginPage = new LoginPage();
    var commonHeader = element(by.tagName('common-header'));
    var commonHeaderMenuItems = element.all(by.repeater('opt in navOptions'));
    var signInButton = element(by.buttonText('Sign In'));
    var modalDialog = element(by.css('.modal-dialog'));
    var loader = element(by.xpath('//div[@spinner-key="_rv-global-spinner"]'));

    var profilePic = element(by.css(".user-profile-dropdown img.profile-pic"));
    var addSubcompanyButton = element(by.css(".dropdown-menu .add-subcompany-menu-button"));
    var selectSubcompanyButton = element(by.id("select-subcompany-button"));
    var companySettingsButton = element(by.css(".dropdown-menu .company-settings-menu-button"));

    var addSubcompanyModal = element(by.css(".add-subcompany-modal"));
    var addSubcompanyModalNameField = element(by.id("company-settings-name"));
    var addSubcompanyModalIndustryField = element(by.id('company-industry'));
    var addSubcompanyModalSaveButton = element(by.css(".add-subcompany-save-button"));

    var selectSubcompanyModal = element(by.css(".select-subcompany-modal"));
    var selectSubcompanyModalLoader = element(by.xpath('//div[@spinner-key="company-selector-modal-list"]'));
    var selectSubcompanyModalFilter = element(by.css('.select-subcompany-modal input[ng-model="search.query"]'));
    var selectSubcompanyModalCompanies = element.all(by.repeater('company in companies.items.list'));
    var selectSubcompanyModalCloseButton = element(by.css(".modal-header .close"));

    var companySettingsModal = element(by.css(".company-settings-modal"));
    var companySettingsModalLoader = element(by.xpath('//div[@spinner-key="company-settings-modal"]'));
    var companySettingsModalDeleteButton = element(by.id("delete-button"));
    var safeDeleteModal = element(by.id("safeDeleteForm"));
    var safeDeleteModalInput = element(by.id("safeDeleteInput"));
    var safeDeleteModalDeleteForeverButton = element(by.id("deleteForeverButton"));

    var subcompanyAlert = element(by.css(".common-header-alert.sub-company-alert"));

    var signOutButton = element(by.css(".dropdown-menu .sign-out-button"));
    var signOutModal = element(by.css(".sign-out-modal"));
    var signOutRvOnlyButton = element(by.css(".sign-out-modal .sign-out-rv-only-button"));
    var signOutGoogleButton = element(by.css(".sign-out-modal .sign-out-google-account"));

    var alertSettingsButton = element(by.css(".alert-settings-button"));
    var turnOnAlertsButton = element(by.id("alertsToggleButton"));

    this.signin = function (username, password) {
      //wait for spinner to go away.
      helper.waitDisappear(loader, 'CH spinner loader');

      signInButton.isDisplayed().then(function (state) {
        if (state) {

          signInButton.click().then(function () {
            loginPage.signIn(username, password);

            helper.waitDisappear(loader, 'CH spinner loader');
          });
        }
      });
    };

    this.signOut = function() {
      helper.waitDisappear(loader, 'CH spinner loader');

      profilePic.isDisplayed().then(function(value) {
        if (value) {
          profilePic.click();
          signOutButton.click();
          helper.wait(signOutModal, 'Sign Out Modal');
          signOutRvOnlyButton.click();
          helper.waitDisappear(signOutModal, 'Sign Out Modal');
        }
      });
    };

    this.createSubCompany = function(name, industryValue) {    
      profilePic.click();
      addSubcompanyButton.click();
      helper.wait(addSubcompanyModal, "Add Subcompany Modal");

      addSubcompanyModalNameField.sendKeys(name);
      if (industryValue) {
        addSubcompanyModalIndustryField.$('[value="'+industryValue+'"]').click(); 
      }
      addSubcompanyModalSaveButton.click();
      helper.waitRemoved(addSubcompanyModal, "Add Subcompany Modal");
    };

    this.selectSubCompany = function(subCompanyName) {
      helper.clickWhenClickable(profilePic, 'Profile Picture');
      helper.clickWhenClickable(selectSubcompanyButton, 'Select Sub Company Button');
      helper.wait(selectSubcompanyModal, "Select Subcompany Modal");
      helper.waitDisappear(selectSubcompanyModalLoader, "Load Companies");

      if (subCompanyName) {
        selectSubcompanyModalFilter.sendKeys(subCompanyName.replace('-', ''));
        helper.wait(selectSubcompanyModalLoader, "Load Companies");
        helper.waitDisappear(selectSubcompanyModalLoader, "Load Companies");
      }

      selectSubcompanyModalCompanies.get(0).click();
      helper.wait(subcompanyAlert, "Subcompany Alert");
    };

    this.deleteCurrentCompany = function() {
      helper.wait(profilePic, 'Profile Picture');
      helper.clickWhenClickable(profilePic, 'Profile Picture');

      helper.wait(companySettingsButton, 'Company Settings Button');
      helper.clickWhenClickable(companySettingsButton, 'Company Settings Button');

      helper.wait(companySettingsModal, "Company Settings Modal");
      helper.waitDisappear(companySettingsModalLoader, "Load Company Settings");

      helper.wait(companySettingsModalDeleteButton, "Delete Button");
      helper.clickWhenClickable(companySettingsModalDeleteButton, "Delete Button");

      helper.wait(safeDeleteModal, "Safe Delete Modal");
      safeDeleteModalInput.sendKeys('DELETE');
      safeDeleteModalDeleteForeverButton.click();
      
      helper.waitRemoved(companySettingsModal, "Company Settings Modal");
      helper.waitDisappear(loader, 'CH spinner loader');
      helper.waitDisappear(subcompanyAlert, "Subcompany Alert");
      helper.waitDisappear(loader, 'CH spinner loader');
    };

    this.deleteAllSubCompanies = function() {
      helper.waitDisappear(loader, 'CH spinner loader');
      helper.clickWhenClickable(profilePic, 'Profile Picture');
      helper.clickWhenClickable(selectSubcompanyButton, 'Select Sub Company Button');
      helper.wait(selectSubcompanyModal, "Select Subcompany Modal");
      helper.waitDisappear(selectSubcompanyModalLoader, "Load Companies");
      selectSubcompanyModalCompanies.count().then(function(count) {
        console.log("count: "+count);
        if (count > 0) {
          selectSubcompanyModalCompanies.get(0).click();
          helper.wait(subcompanyAlert, "Subcompany Alert");
          helper.waitDisappear(loader, 'CH spinner loader');
          selfCommonHeaderPage.deleteCurrentCompany();
          selfCommonHeaderPage.deleteAllSubCompanies();    
        } else {
          selectSubcompanyModalCloseButton.click();
        }
      });
    };

    this.selectAlerts = function() {
      profilePic.click();
      helper.wait(alertSettingsButton, "Alert settings button");
      alertSettingsButton.click();
      helper.wait(turnOnAlertsButton, "Turn on alerts button");
    };

    this.getCommonHeader = function () {
      return commonHeader;
    };

    this.getCommonHeaderMenuItems = function () {
      return commonHeaderMenuItems;
    };

    this.getSignInButton = function () {
      return signInButton;
    };

    this.getModalDialog = function () {
      return modalDialog;
    };

    this.getLoader = function () {
      return loader;
    };

    this.getProfilePic = function () {
      return profilePic;
    };

    this.getSignOutButton = function() {
      return signOutButton;
    };

    this.getSignOutModal = function() {
      return signOutModal;
    };

    this.getSignOutRvOnlyButton = function() {
      return signOutRvOnlyButton;
    };

    this.getSignOutGoogleButton = function() {
      return signOutGoogleButton;
    };
  };

  module.exports = CommonHeaderPage;
})(module);
