(function() {

  "use strict";
  
  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HomePage = require('./../pages/homepage.js');
  var UserSettingsModalPage = require('./../pages/userSettingsModalPage.js');
  var helper = require('rv-common-e2e').helper;

  var UserSettingsScenarios = function() {

    describe("User Settings", function() {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, 
        homepage, 
        userSettingsModalPage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();
        userSettingsModalPage = new UserSettingsModalPage();

        homepage.get();

        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
      });

      it("should show user settings modal", function() {
        homepage.getProfilePic().click();
        
        assert.eventually.isTrue(homepage.getUserSettingsButton().isDisplayed(), "User settings menu item should show");

        //click on user settings button
        homepage.getUserSettingsButton().click();
        
        helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");

        assert.eventually.isTrue(userSettingsModalPage.getUserSettingsModal()
          .isDisplayed(), "User settings modal should show after clicking on menu item");
      });
      
      it("should update settings", function() {
        userSettingsModalPage.getFirstNameField().clear();
        userSettingsModalPage.getFirstNameField().sendKeys("John");

        userSettingsModalPage.getLastNameField().clear();
        userSettingsModalPage.getLastNameField().sendKeys("Doe");

        userSettingsModalPage.getPhoneField().clear();
        userSettingsModalPage.getPhoneField().sendKeys("000-000-0000");

        userSettingsModalPage.getEmailField().clear();
        userSettingsModalPage.getEmailField().sendKeys("testmail@testmail.com");

        if ( !userSettingsModalPage.getCeCheckbox().isSelected() )
        {
           userSettingsModalPage.getCeCheckbox().click();
        }

        if ( userSettingsModalPage.getPuCheckbox().isSelected() )
        {
           userSettingsModalPage.getPuCheckbox().click();
        }

        if ( !userSettingsModalPage.getDaCheckbox().isSelected() )
        {
           userSettingsModalPage.getDaCheckbox().click();
        }

        //click save button
        userSettingsModalPage.getSaveButton().click();
        
        helper.waitRemoved(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");
        
      });
      
      it("should show updated information", function() {
        homepage.getProfilePic().click();
        homepage.getUserSettingsButton().click();
        
        helper.wait(userSettingsModalPage.getUserSettingsModal(), "User Settings Modal");

        expect(userSettingsModalPage.getFirstNameField().getAttribute('value')).to.eventually.equal("John");
        expect(userSettingsModalPage.getLastNameField().getAttribute('value')).to.eventually.equal("Doe");
        expect(userSettingsModalPage.getEmailField().getAttribute('value')).to.eventually.equal("testmail@testmail.com");
        expect(userSettingsModalPage.getPhoneField().getAttribute('value')).to.eventually.equal("000-000-0000");

        expect(userSettingsModalPage.getCeCheckbox().isSelected()).to.eventually.equal.true;
        expect(userSettingsModalPage.getPuCheckbox().isSelected()).to.eventually.equal.false;
        expect(userSettingsModalPage.getDaCheckbox().isSelected()).to.eventually.equal.true;
      });

      // username should be shown here instead of email
      // however that's not an editable field
      xit("should immediately update fixes", function () {
        assert.eventually.equal(element(
          by.css("span.username")).getText(), "testmail@testmail.com",
            "Username should update");
      });
    });
  };
  
  module.exports = UserSettingsScenarios;
  
})();
