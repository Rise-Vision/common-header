/*globals element, by */
(function(module) {
  'use strict';

  var helper = require("rv-common-e2e").helper;
  var CommonHeaderPage = require("rv-common-e2e").commonHeaderPage;
  var HomePage = require("./../pages/homepage.js");
  var UserSettingsModalPage = require("./../pages/userSettingsModalPage.js");

  var CompanyUsersModalPage = function () {
    var commonHeaderPage = new CommonHeaderPage();
    var homePage = new HomePage();
    var userSettingsModalPage = new UserSettingsModalPage();

    var companyUsersModal = element(by.css(".company-users-modal"));
    var loader = element(by.xpath('//div[@spinner-key="company-users-list"]'));

    var usersList = element.all(by.css(".company-users-list-item"));
    var users = element.all(by.css(".company-users-list-item .list-group-item-text"));
    
    var addUserButton = element(by.css("button.add-company-user-button"));
    var closeButton = element(by.css("button.close-company-users-button"));

    this.openCompanyUsersModal = function() {
      commonHeaderPage.getProfilePic().click();

      helper.wait(homepage.getCompanyUsersButton(), "Company Users Button");

      homepage.getCompanyUsersButton().click();

      helper.wait(getCompanyUsersModal(), "Company Users Modal");

      helper.waitDisappear(getLoader(), "Load Company Users");
    };

    this.closeCompanyUsersModal = function() {
      helper.wait(getCompanyUsersModal(), "Company Users Modal");

      helper.waitDisappear(companyUsersModalPage.getLoader(), "Load Company Users");

      companyUsersModalPage.getCloseButton().click();

      helper.waitDisappear(companyUsersModalPage.getCompanyUsersModal(), "Company Users Modal");
    };

    this.openAddUserDialog = function() {
      companyUsersModalPage.getAddUserButton().click();
      
      helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");
    };

    this.getCompanyUsersModal = function() {
      return companyUsersModal;
    };
    
    this.getLoader = function() {
      return loader;
    };
    
    this.getUsersList = function() {
      return usersList;
    };
    
    this.getUsers = function() {
      return users;
    };
    
    this.getAddUserButton = function() {
      return addUserButton;
    };
    
    this.getCloseButton = function() {
      return closeButton;
    };
    
  };

  module.exports = CompanyUsersModalPage;
})(module);
