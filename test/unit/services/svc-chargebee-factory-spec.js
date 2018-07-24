"use strict";

describe("Services: chargebeeFactory", function() {
  var sandbox = sinon.sandbox.create();
  var $window, storeService, chargebeePortal;

  beforeEach(module("risevision.store.services"));

  beforeEach(module(function ($provide) {
    $provide.service("$q", function() {return Q;});
    $provide.service("storeService", function() {
      return {
        createSession: function() {}
      };
    });
  }));

  beforeEach(function() {
    inject(function($injector) {
      $window = $injector.get("$window");
      storeService = $injector.get("storeService");

      chargebeePortal = {
        open: sandbox.stub(),
        openSection: sandbox.stub()
      };
      $window.Chargebee = {
        init: function () {
          return {
            createChargebeePortal: function () {
              return chargebeePortal;
            },
            logout: sandbox.stub(),
            setPortalSession: sandbox.stub()
          };
        },
        getPortalSections: function () {
          return {
            ACCOUNT_DETAILS: "ACCOUNT_DETAILS",
            ADDRESS: "ADDRESS",
            BILLING_HISTORY: "BILLING_HISTORY",
            PAYMENT_SOURCES: "PAYMENT_SOURCES",
            SUBSCRIPTION_DETAILS: "SUBSCRIPTION_DETAILS"
          };
        }
      };
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe("getChargebeeInstance: ", function() {
    var getChargebeeInstance;

    beforeEach(function() {
      inject(function($injector) {
        getChargebeeInstance = $injector.get("getChargebeeInstance");
      });
    });

    it("should exist", function() {
      expect(getChargebeeInstance).to.be.ok;
      expect(getChargebeeInstance).to.be.a("function");
    });

    it("should return a new session", function(done) {
      sandbox.stub(storeService, "createSession").returns(Q.resolve({
        id: "sessionId1"
      }));

      getChargebeeInstance("companyId1").then(function() {
        expect(storeService.createSession).to.have.been.calledOnce;
        done();
      });
    });

    it("should use the same session when requesting the same companyId", function(done) {
      sandbox.stub(storeService, "createSession").returns(Q.resolve({
        id: "sessionId1"
      }));

      getChargebeeInstance("companyId1").then(function() {
        getChargebeeInstance("companyId1").then(function() {
          expect(storeService.createSession).to.have.been.calledOnce;
          done();
        });
      });
    });

    it("should return a new session when requesting a different companyId", function(done) {
      sandbox.stub(storeService, "createSession").returns(Q.resolve({
        id: "sessionId1"
      }));

      getChargebeeInstance("companyId1").then(function() {
        getChargebeeInstance("companyId2").then(function() {
          expect(storeService.createSession).to.have.been.calledTwice;
          done();
        });
      });
    });

    it("should handle failure", function(done) {
      sandbox.stub(storeService, "createSession").returns(Q.reject("error"));

      getChargebeeInstance("companyId1").catch(function(err) {
        expect(err).to.equal("error");
        done();
      });
    });
  });

  describe("chargebeeFactory: ", function() {
    var chargebeeFactory;
    var chargebeeSections;

    beforeEach(function() {
      inject(function($injector) {
        chargebeeFactory = $injector.get("chargebeeFactory");
        chargebeeSections = $window.Chargebee.getPortalSections();

        sandbox.stub(storeService, "createSession").returns(Q.resolve({
          id: "sessionId1"
        }));
      });
    });

    it("should exist", function() {
      expect(chargebeeFactory).to.be.ok;
      expect(chargebeeFactory.openPortal).to.be.a("function");
    });

    it("should open Customer Portal", function(done) {
      chargebeeFactory.openPortal("companyId1");

      setTimeout(function () {
        expect(chargebeePortal.open).to.have.been.calledOnce;
        done();
      });
    });

    it("should open Account Details section", function(done) {
      chargebeeFactory.openAccountDetails("companyId1");

      setTimeout(function () {
        expect(chargebeePortal.openSection).to.have.been.calledOnce;
        expect(chargebeePortal.openSection.getCall(0).args[0].sectionType).to.equal(chargebeeSections.ACCOUNT_DETAILS);
        done();
      });
    });

    it("should open Address section", function(done) {
      chargebeeFactory.openAddress("companyId1");

      setTimeout(function () {
        expect(chargebeePortal.openSection).to.have.been.calledOnce;
        expect(chargebeePortal.openSection.getCall(0).args[0].sectionType).to.equal(chargebeeSections.ADDRESS);
        done();
      });
    });

    it("should open Address section", function(done) {
      chargebeeFactory.openBillingHistory("companyId1");

      setTimeout(function () {
        expect(chargebeePortal.openSection).to.have.been.calledOnce;
        expect(chargebeePortal.openSection.getCall(0).args[0].sectionType).to.equal(chargebeeSections.BILLING_HISTORY);
        done();
      });
    });

    it("should open Payment Sources section", function(done) {
      chargebeeFactory.openPaymentSources("companyId1");

      setTimeout(function () {
        expect(chargebeePortal.openSection).to.have.been.calledOnce;
        expect(chargebeePortal.openSection.getCall(0).args[0].sectionType).to.equal(chargebeeSections.PAYMENT_SOURCES);
        done();
      });
    });

    it("should open Subscription Details section", function(done) {
      chargebeeFactory.openSubscriptionDetails("companyId1", "subs1");

      setTimeout(function () {
        expect(chargebeePortal.openSection).to.have.been.calledOnce;
        expect(chargebeePortal.openSection.getCall(0).args[0].sectionType).to.equal(chargebeeSections.SUBSCRIPTION_DETAILS);
        expect(chargebeePortal.openSection.getCall(0).args[0].params.subscriptionId).to.equal("subs1");
        done();
      });
    });
  });
});
