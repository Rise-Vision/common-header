/*jshint expr:true */
"use strict";

describe("Services: plan", function() {
  var storeApiFailure;

  beforeEach(module("risevision.common.plan"));
  beforeEach(module(function ($provide) {
    storeApiFailure = false;

    $provide.service("$q", function() {return Q;});
    $provide.service("storeAPILoader", function () {
      return function() {
        var deferred = Q.defer();
        var riseApiResponse = function() {
          return {
            execute: function(callback) {
              if (storeApiFailure) {
                callback({
                  error: "some error"
                });
              }
              else {
                callback({
                  result: {},
                  item: {}
                });
              }
            }
          };
        };

        deferred.resolve({
          product: {
            list: riseApiResponse
          }
        });

        return deferred.promise;
      };
    });
    $provide.service("subscriptionStatusService", function () {
      return {
        get: function() {},
        list: function() {}
      };
    });
  }));

  var sandbox, planFactory, subscriptionStatusService;
  var FREE_PLAN_ID, FREE_PLAN_CODE, BASIC_PLAN_CODE, BASIC_PLAN_ID;
  var ADVANCED_PLAN_CODE, ADVANCED_PLAN_ID, ENTERPRISE_PLAN_CODE, ENTERPRISE_PLAN_ID;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector){
      planFactory = $injector.get("planFactory");
      subscriptionStatusService = $injector.get("subscriptionStatusService");
      FREE_PLAN_ID = $injector.get("FREE_PLAN_ID");
      FREE_PLAN_CODE = $injector.get("FREE_PLAN_CODE");
      BASIC_PLAN_CODE = $injector.get("BASIC_PLAN_CODE");
      BASIC_PLAN_ID = $injector.get("BASIC_PLAN_ID");
      ADVANCED_PLAN_CODE = $injector.get("ADVANCED_PLAN_CODE");
      ADVANCED_PLAN_ID = $injector.get("ADVANCED_PLAN_ID");
      ENTERPRISE_PLAN_CODE = $injector.get("ENTERPRISE_PLAN_CODE");
      ENTERPRISE_PLAN_ID = $injector.get("ENTERPRISE_PLAN_ID");
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe("getPlans: ", function() {
    it("should exist", function() {
      expect(planFactory.getPlans).to.be.ok;
      expect(planFactory.getPlans).to.be.a("function");
    });

    it("should succeed", function(done) {
      planFactory.getPlans()
      .then(function() {
        done();
      });
    });

    it("should fail", function(done) {
      storeApiFailure = true;
      planFactory.getPlans()
      .catch(function() {
        done();
      });
    });
  });

  describe("getPlansDescriptions: ", function() {
    it("should exist", function() {
      expect(planFactory.getPlansDescriptions).to.be.ok;
      expect(planFactory.getPlansDescriptions).to.be.a("function");
    });

    it("should return existing plans", function(done) {
      sandbox.stub(planFactory, "getPlans").returns(Q.resolve({
        items: [{
          productId: BASIC_PLAN_CODE,
          descriptionShort: "Basic Plan"
        }]
      }));

      planFactory.getPlansDescriptions()
      .then(function(resp) {
        expect(planFactory.getPlans).to.have.been.called;
        expect(resp[FREE_PLAN_ID]).to.be.ok;
        expect(resp[FREE_PLAN_ID].descriptionShort).to.be.ok;
        expect(resp[BASIC_PLAN_CODE]).to.be.ok;
        expect(resp[BASIC_PLAN_CODE].descriptionShort).to.be.ok;
        done();
      });
    });

    it("should fail to return existing plans", function(done) {
      sandbox.stub(planFactory, "getPlans").returns(Q.reject({
        error: "Error"
      }));

      planFactory.getPlansDescriptions()
      .catch(function(err) {
        expect(planFactory.getPlans).to.have.been.called;
        expect(err.error).to.be.ok;
        done();
      });
    });
  });

  describe("getCompanyPlan: ", function() {
    var companyId = "testCompanyId";

    it("should exist", function() {
      expect(planFactory.getCompanyPlan).to.be.ok;
      expect(planFactory.getCompanyPlan).to.be.a("function");
    });

    it("should return Free Plan for a non subscribed company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, subscribed: false },
        { pc: ADVANCED_PLAN_CODE, subscribed: false },
        { pc: ENTERPRISE_PLAN_CODE, subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal(FREE_PLAN_CODE);
        expect(plan.type).to.equal("free");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Basic Plan for a subscribed company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, subscribed: true, status: "Subscribed" },
        { pc: ADVANCED_PLAN_CODE, subscribed: false },
        { pc: ENTERPRISE_PLAN_CODE, subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal(BASIC_PLAN_CODE);
        expect(plan.type).to.equal("basic");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Advanced Plan for a subscribed company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, subscribed: false },
        { pc: ADVANCED_PLAN_CODE, subscribed: true, status: "Subscribed" },
        { pc: ENTERPRISE_PLAN_CODE, subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal(ADVANCED_PLAN_CODE);
        expect(plan.type).to.equal("advanced");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Enterprise Plan for a subscribed company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, subscribed: false },
        { pc: ADVANCED_PLAN_CODE, subscribed: false },
        { pc: ENTERPRISE_PLAN_CODE, subscribed: true, status: "Subscribed" }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal(ENTERPRISE_PLAN_CODE);
        expect(plan.type).to.equal("enterprise");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Free Plan for a cancelled company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, subscribed: false },
        { pc: ADVANCED_PLAN_CODE, subscribed: false, status: "Cancelled" },
        { pc: ENTERPRISE_PLAN_CODE, subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal(FREE_PLAN_CODE);
        expect(plan.type).to.equal("free");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Advanced Plan for a suspended company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, subscribed: false },
        { pc: ADVANCED_PLAN_CODE, subscribed: false, status: "Suspended" },
        { pc: ENTERPRISE_PLAN_CODE, subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal(ADVANCED_PLAN_CODE);
        expect(plan.type).to.equal("advanced");
        expect(plan.status).to.equal("Suspended");
        done();
      });
    });

    it("should stay in Suspended plan even if they are Subscribed to a lower plan", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, subscribed: true, status: "Subscribed" },
        { pc: ADVANCED_PLAN_CODE, subscribed: false },
        { pc: ENTERPRISE_PLAN_CODE, subscribed: false, status: "Suspended" }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal(ENTERPRISE_PLAN_CODE);
        expect(plan.type).to.equal("enterprise");
        expect(plan.status).to.equal("Suspended");
        done();
      });
    });

    it("should fail to return existing plans", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.reject({
        error: "Error"
      }));

      planFactory.getCompanyPlan(companyId)
      .catch(function(err) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(err.error).to.be.ok;
        done();
      });
    });
  });
});
