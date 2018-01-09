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

      var plansByType = _.keyBy($injector.get("PLANS_LIST"), "type");

      FREE_PLAN_CODE = plansByType.free.pc;
      FREE_PLAN_ID = plansByType.free.productId;
      BASIC_PLAN_CODE = plansByType.basic.pc;
      BASIC_PLAN_ID = plansByType.basic.productId;
      ADVANCED_PLAN_CODE = plansByType.advanced.pc;
      ADVANCED_PLAN_ID = plansByType.advanced.productId;
      ENTERPRISE_PLAN_CODE = plansByType.enterprise.pc;
      ENTERPRISE_PLAN_ID = plansByType.enterprise.productId;
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

  describe("getPlansDetails: ", function() {
    it("should exist", function() {
      expect(planFactory.getPlansDetails).to.be.ok;
      expect(planFactory.getPlansDetails).to.be.a("function");
    });

    it("should return existing plans", function(done) {
      sandbox.stub(planFactory, "getPlans").returns(Q.resolve({
        items: [{
          name: "Basic Plan",
          productId: BASIC_PLAN_ID,
          descriptionShort: "Basic Plan Description",
          pricing: [{
            "unit": "per Company per Month",
            "priceUSD": 20.0,
            "priceCAD": 25.0,
          }]
        }]
      }));

      planFactory.getPlansDetails()
      .then(function(resp) {
        console.log("RESP", resp);
        expect(planFactory.getPlans).to.have.been.called;
        expect(resp.length).to.equal(4);
        expect(resp[0].productId).to.equal("000");
        expect(resp[0].descriptionShort).to.be.ok;
        expect(resp[0].priceMonth).to.equal(0);
        expect(resp[1].productId).to.equal("289");
        expect(resp[1].descriptionShort).to.be.ok;
        expect(resp[1].priceMonth).to.equal(20);
        done();
      });
    });

    it("should fail to return existing plans", function(done) {
      sandbox.stub(planFactory, "getPlans").returns(Q.reject({
        error: "Error"
      }));

      planFactory.getPlansDetails()
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
        { pc: BASIC_PLAN_CODE, status: "Not Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Not Subscribed" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Not Subscribed" }
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
        { pc: BASIC_PLAN_CODE, status: "Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Not Subscribed" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Not Subscribed" }
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
        { pc: BASIC_PLAN_CODE, status: "Not Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Subscribed" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Not Subscribed" }
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
        { pc: BASIC_PLAN_CODE, status: "Not Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Not Subscribed" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Subscribed" }
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
        { pc: BASIC_PLAN_CODE, status: "Not Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Cancelled" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Not Subscribed" }
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
        { pc: BASIC_PLAN_CODE, status: "Not Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Suspended" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Not Subscribed" }
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
        { pc: BASIC_PLAN_CODE, status: "Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Not Subscribed" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Suspended" }
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
