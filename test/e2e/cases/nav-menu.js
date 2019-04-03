(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;
  var assert = require('rv-common-e2e').assert;
  var helper = require('rv-common-e2e').helper;
  var CommonHeaderPage = require('./../pages/commonHeaderPage.js');
  var HomePage = require('./../pages/homepage.js');

  var RegistrationScenarios = function() {

    describe("Nav Menu", function() {
      var commonHeaderPage, 
        homepage, 
        registrationModalPage;
        
      before(function (){
        commonHeaderPage = new CommonHeaderPage();
        homepage = new HomePage();

        homepage.get();
        
        //sign in, wait for spinner to go away
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
          commonHeaderPage.signin();
        });
      });

      it("should load menu items", function() {
        // expect 4 menu items (2 for the off-canvas menu)
        expect(homepage.getNavMenuOptions().count()).to.eventually.equal(4);
        
        expect(homepage.getNavMenuOptions().get(0).getText()).to.eventually.equal('Fake Store');
        expect(homepage.getNavMenuOptions().get(1).getText()).to.eventually.equal('Apps');
      });

      it("off canvas menu should not show", function() {
        expect(homepage.getNavMenuOptions().get(0).isDisplayed()).to.eventually.be.true;
        expect(homepage.getNavMenuOptions().get(2).isDisplayed()).to.eventually.be.false;
      });

      it("links target & href should be configured", function(done) {
        homepage.getNavMenuOptions().then(function(elements) {
          expect(elements[0].element(by.tagName('a')).getAttribute('target')).to.eventually.not.be.ok;
          expect(elements[0].element(by.tagName('a')).getAttribute('href')).to.eventually.not.contain('?cid=');

          expect(elements[1].element(by.tagName('a')).getAttribute('target')).to.eventually.equal('_blank');
          expect(elements[1].element(by.tagName('a')).getAttribute('href')).to.eventually.contain('?cid=');
          
          done();
        });
      });        
    });
  };

  module.exports = RegistrationScenarios;

})();
