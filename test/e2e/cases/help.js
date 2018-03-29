(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
  var HelpDropdownPage = require('./../pages/helpDropdownPage.js');
  var helper = require('rv-common-e2e').helper;

  var HelpScenarios = function() {

    browser.driver.manage().window().setSize(1280, 768);

    describe("Help", function () {
      this.timeout(2000);// to allow for protactor to load the seperate page
      var commonHeaderPage, helpDropdownPage;
      before(function () {
        commonHeaderPage = new CommonHeaderPage();
        helpDropdownPage = new HelpDropdownPage();

        browser.get("http://localhost:8099/test/e2e");
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it("should show the help dropdown button", function () {
        expect(helpDropdownPage.getHelpDropdownButton().isDisplayed()).to.eventually.be.true;
      });

      describe("Given a user clicks on the help dropdown button", function () {

        before(function () {
          helpDropdownPage.getHelpDropdownButton().click();
        });

        it("should show the ask the community button", function () {
          expect(helpDropdownPage.getAskCommunityButton().isDisplayed()).to.eventually.be.true;
          expect(helpDropdownPage.getAskCommunityButton().getAttribute('href')).to.eventually.equal("https://help.risevision.com/hc/en-us/community/topics/");
          expect(helpDropdownPage.getAskCommunityButton().getAttribute('target')).to.eventually.equal("_blank");
        });

        it("should show the get support button", function () {
          expect(helpDropdownPage.getSupportButton().isDisplayed()).to.eventually.be.true;
          expect(helpDropdownPage.getSupportButton().getAttribute('ng-click')).to.eventually.equal("getSupport()");
        });

        it("should show the sign up for training button", function () {
          expect(helpDropdownPage.getGetStartedButton().isDisplayed()).to.eventually.be.true;
          expect(helpDropdownPage.getGetStartedButton().getAttribute('href')).to.eventually.equal("https://help.risevision.com/hc/en-us/articles/115002868706-Get-started-with-Rise-Vision");
          expect(helpDropdownPage.getGetStartedButton().getAttribute('target')).to.eventually.equal("_blank");
        });

        it("should show the documentation button", function () {
          expect(helpDropdownPage.getDocumentationButton().isDisplayed()).to.eventually.be.true;
          expect(helpDropdownPage.getDocumentationButton().getAttribute('href')).to.eventually.equal("https://help.risevision.com/hc/en-us/");
          expect(helpDropdownPage.getDocumentationButton().getAttribute('target')).to.eventually.equal("_blank");
        });

        xdescribe("Given a user clicks on the Ask The Community button", function () {
          var newWindowHandle, oldWindowHandle;
          before(function () {
            helpDropdownPage.getAskCommunityButton().click();
          });

          it("should open the Community homepage in a new tab", function (done) {
            browser.getAllWindowHandles().then(function (handles) {
              oldWindowHandle = handles[0];
              newWindowHandle = handles[1];
              browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.driver.getCurrentUrl()).to.eventually.equal("https://community.risevision.com");

                done();
              });
            });
          });

          after(function () {
            browser.driver.close();
            browser.switchTo().window(oldWindowHandle);
            helpDropdownPage.getHelpDropdownButton().click();
          });
        });

        xdescribe("Given a user clicks on the Get Started button", function () {
          var newWindowHandle, oldWindowHandle;
          before(function () {
            helpDropdownPage.getGetStartedButton().click();
          });

          it("should open the training product page on store in a new tab", function (done) {
            browser.getAllWindowHandles().then(function (handles) {
              oldWindowHandle = handles[0];
              newWindowHandle = handles[1];
              browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.driver.getCurrentUrl()).to.eventually.contain("https://help.risevision.com/hc/en-us/articles/115002868706-Get-started-with-Rise-Vision");

                done();
              });
            });
          });

          after(function () {
            browser.driver.close();
            browser.switchTo().window(oldWindowHandle);
            helpDropdownPage.getHelpDropdownButton().click();
          });
        });

        xdescribe("Given a user clicks on the Documentation button", function () {
          var newWindowHandle, oldWindowHandle;
          before(function () {
            helpDropdownPage.getDocumentationButton().click();
          });

          it("should open the user documentation on a new tab", function (done) {
            browser.getAllWindowHandles().then(function (handles) {
              oldWindowHandle = handles[0];
              newWindowHandle = handles[1];
              browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.driver.getCurrentUrl()).to.eventually.contain("https://help.risevision.com/hc/en-us/");

                done();
              });
            });
          });

          after(function () {
            browser.driver.close();
            browser.switchTo().window(oldWindowHandle);
            helpDropdownPage.getHelpDropdownButton().click();
          });
        });
      });

    });
  };
  module.exports = HelpScenarios;
})();
