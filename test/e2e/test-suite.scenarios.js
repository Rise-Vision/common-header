(function() {

  "use strict";

  var AuthenticationScenarios = require('./cases/authentication.js');
  var RegistrationScenarios = require('./cases/registration.js');
  var ShoppingCartScenarios = require('./cases/shopping-cart.js');
  var SupermanScenarios = require('./cases/superman.js');
  var SystemMessagesScenarios = require('./cases/system-messages.js');
  
  var CompanySettingsScenarios = require('./cases/company-settings.js');
  var CompanySubcompaniesScenarios = require('./cases/company-subcompanies.js');
  var CompanyUsersScenarios = require('./cases/company-users.js');
  var UserSettingsScenarios = require('./cases/user-settings.js');

  browser.driver.manage().window().setSize(1280, 768);

  describe("Common Header ", function() {
    var authenticationScenarios = new AuthenticationScenarios();
    var registrationScenarios = new RegistrationScenarios();
    var shoppingCartScenarios = new ShoppingCartScenarios();
    var supermanScenarios = new SupermanScenarios();
    var systemMessagesScenarios = new SystemMessagesScenarios();
    
    var companySettingsScenarios = new CompanySettingsScenarios();
    var companySubcompaniesScenarios = new CompanySubcompaniesScenarios();
    var companyUsersSenarios = new CompanyUsersScenarios();
    var userSettingsScenarios = new UserSettingsScenarios();
  });
  
})();
