(function() {

  "use strict";

  var expect = require('rv-common-e2e').expect;

  var SubscriptionStatusScenarios = function() {

    describe("Subscription Status Component", function() {
      beforeEach(function (){
        browser.get("/test/e2e/components/subscription-status/subscription-status.html");
      });

      it("Should show the default subscription status", function () {
        expect(element(by.css("#subscription-status h3 span")).isPresent()).
          to.equal.true;

        expect(element(by.css("#subscription-status h3 span")).getText()).
          to.eventually.equal("subscription-status.na");
      });

      it("Should show a valid subscription status", function () {
        element(by.id("setValid")).click();

        expect(element(by.css("#subscription-status h3 span")).getText()).
          to.eventually.equal("subscription-status.free");
      });

      it("Should show an invalid subscription status", function () {
        element(by.id("setInvalid")).click();

        expect(element(by.css("#subscription-status h3 span")).getText()).
          to.eventually.equal("subscription-status.na");
      });

      it("Should show an expired subscription status", function () {
        element(by.id("setExpired")).click();

        expect(element(by.css("#subscription-status h3 span")).getText()).
          to.eventually.equal("subscription-status.trial-expired");
      });

    });

  };
  module.exports = SubscriptionStatusScenarios;

})();
