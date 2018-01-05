/*jshint expr:true */
"use strict";

describe("Services: plan", function() {
  var riseApiFailure;

  beforeEach(module("risevision.common.plan"));
  beforeEach(module(function ($provide) {
    riseApiFailure = false;

    $provide.service("$q", function() {return Q;});
    $provide.service("riseAPILoader", function () {
      return function() {
        var deferred = Q.defer();
        var riseApiResponse = function() {
          return {
            execute: function(callback) {
              if (riseApiFailure) {
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

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector){
      planFactory = $injector.get("planFactory");
      subscriptionStatusService = $injector.get("subscriptionStatusService");
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
      riseApiFailure = true;
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
          productId: "298",
          descriptionShort: "Basic Plan"
        }]
      }));

      planFactory.getPlansDescriptions()
      .then(function(resp) {
        expect(planFactory.getPlans).to.have.been.called;
        expect(resp["000"]).to.be.ok;
        expect(resp["000"].descriptionShort).to.be.ok;
        expect(resp["298"]).to.be.ok;
        expect(resp["298"].descriptionShort).to.be.ok;
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
        { pc: "289", subscribed: false },
        { pc: "290", subscribed: false },
        { pc: "301", subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal("000");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Basic Plan for a subscribed company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: "289", subscribed: true, status: "Subscribed" },
        { pc: "290", subscribed: false },
        { pc: "301", subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal("289");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Advanced Plan for a subscribed company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: "289", subscribed: false },
        { pc: "290", subscribed: true, status: "Subscribed" },
        { pc: "301", subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal("290");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Enterprise Plan for a subscribed company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: "289", subscribed: false },
        { pc: "290", subscribed: false },
        { pc: "301", subscribed: true, status: "Subscribed" }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal("301");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Free Plan for a cancelled company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: "289", subscribed: false },
        { pc: "290", subscribed: false, status: "Cancelled" },
        { pc: "301", subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal("000");
        expect(plan.status).to.equal("Subscribed");
        done();
      });
    });

    it("should return Advanced Plan for a suspended company", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: "289", subscribed: false },
        { pc: "290", subscribed: false, status: "Suspended" },
        { pc: "301", subscribed: false }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal("290");
        expect(plan.status).to.equal("Suspended");
        done();
      });
    });

    it("should stay in Suspended plan even if they are Subscribed to a lower plan", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: "289", subscribed: true, status: "Subscribed" },
        { pc: "290", subscribed: false },
        { pc: "301", subscribed: false, status: "Suspended" }
      ]));

      planFactory.getCompanyPlan(companyId)
      .then(function(plan) {
        expect(subscriptionStatusService.list).to.have.been.called;
        expect(plan.pc).to.equal("301");
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
