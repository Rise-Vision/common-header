(function() {

  "use strict";

  var RegistrationScenarios = require("./cases/registration.js");

  var AuthenticationScenarios = require("./cases/authentication.js");
  var NavMenuScenarios = require("./cases/nav-menu.js");
  var SupermanScenarios = require("./cases/superman.js");
  var DisableDeleteKeyScenarios = require("./cases/disable-delete-key.js");
  
  var CompanySettingsScenarios = require("./cases/company-settings.js");
  var CompanySubcompaniesScenarios = require("./cases/company-subcompanies.js");
  var CompanyUsersScenarios = require("./cases/company-users.js");
  var UserSettingsScenarios = require("./cases/user-settings.js");

  var PlansScenarios = require("./cases/plans.js");  
  var AccountRemovalScenarios = require("./cases/account-removal.js");

  var RegistrationExistingCompanyScenarios = require("./cases/registration-existing-company.js");


  browser.driver.manage().window().setSize(1280, 768);

  describe("Common Header ", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page

    beforeEach("should use correct Core URL", function() {
      var expect = require("rv-common-e2e").expect;

      expect(element(by.id("coreApiUrl")).getText()).to.eventually.contain("rvacore-test.appspot.com");
    });
    
    var registrationScenarios = new RegistrationScenarios();

    var authenticationScenarios = new AuthenticationScenarios();
    var navMenuScenarios = new NavMenuScenarios();
    var supermanScenarios = new SupermanScenarios();
    var disableDeleteKeyScenarios = new DisableDeleteKeyScenarios();

    var companySettingsScenarios = new CompanySettingsScenarios();
    var companySubcompaniesScenarios = new CompanySubcompaniesScenarios();
    var companyUsersSenarios = new CompanyUsersScenarios();
    var userSettingsScenarios = new UserSettingsScenarios();

    var plansScenarios = new PlansScenarios();
    var accountRemovalScenarios = new AccountRemovalScenarios();

    var registrationExistingCompany = new RegistrationExistingCompanyScenarios();

  });
  
})();
