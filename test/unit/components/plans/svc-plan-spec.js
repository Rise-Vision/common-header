/*jshint expr:true */
"use strict";

describe("Services: plan", function() {
  var storeApiFailure;

  beforeEach(module("risevision.common.components.plans"));
  beforeEach(module(function ($provide) {
    storeApiFailure = false;

    $provide.service("$q", function() {return Q;});
    $provide.service("$modal", function() {
      return {
        open: sinon.stub().returns({result: Q.defer().promise })
      };
    });
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
    $provide.service("userState", function () {
      return {
        _restoreState: function () {},
        getSelectedCompanyId: function () {
          return null;
        },
        getCopyOfSelectedCompany: function() {
          return {};
        },
        updateCompanySettings: function () {
        }
      };
    });
    $provide.service("currencyService", function () {
      return function() {
        return Q.resolve({
          getByCountry: function() {
            return {
              pickPrice: function(val1) {
                return val1;
              }
            };
          }
        });
      };
    });
  }));

  var sandbox, $rootScope, $modal, userState, planFactory, subscriptionStatusService;
  var BASIC_PLAN_CODE, BASIC_PLAN_ID, ADVANCED_PLAN_CODE, ENTERPRISE_PLAN_CODE;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector, _$rootScope_) {
      $rootScope = _$rootScope_;
      $modal = $injector.get("$modal");
      userState =  $injector.get("userState");
      planFactory = $injector.get("planFactory");
      subscriptionStatusService = $injector.get("subscriptionStatusService");

      var plansByType = _.keyBy($injector.get("PLANS_LIST"), "type");

      BASIC_PLAN_CODE = plansByType.basic.pc;
      BASIC_PLAN_ID = plansByType.basic.productId;
      ADVANCED_PLAN_CODE = plansByType.advanced.pc;
      ENTERPRISE_PLAN_CODE = plansByType.enterprise.pc;
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe("initialization", function() {
    it("should load the current plan when selected company changes", function(done) {
      sandbox.spy($rootScope, "$emit");
      sandbox.stub(userState, "getSelectedCompanyId").returns("companyId");
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        id: "companyId",
        planProductCode: BASIC_PLAN_CODE,
        planSubscriptionStatus: "Subscribed",
        playerProSubscriptionStatus: "Not Subscribed"
      });

      $rootScope.$emit("risevision.company.selectedCompanyChanged");
      $rootScope.$digest();

      setTimeout(function () {
        expect($rootScope.$emit).to.have.been.called;
        expect(planFactory.currentPlan).to.be.not.null;
        expect(planFactory.currentPlan.type).to.equal("basic");
        expect(planFactory.currentPlan.status).to.equal("Subscribed");
        expect(planFactory.currentPlan.proStatus).to.equal("Not Subscribed");

        done();
      }, 0);
    });

    it("should correctly load the plan information when On Trial", function(done) {
      sandbox.spy($rootScope, "$emit");
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        id: "companyId",
        planProductCode: BASIC_PLAN_CODE,
        planSubscriptionStatus: "Trial",
        planTrialPeriod: 23,
        playerProSubscriptionStatus: "Subscribed"
      });

      $rootScope.$emit("risevision.company.selectedCompanyChanged");
      $rootScope.$digest();

      setTimeout(function () {
        expect($rootScope.$emit).to.have.been.called;
        expect(planFactory.currentPlan).to.be.not.null;
        expect(planFactory.currentPlan.type).to.equal("basic");
        expect(planFactory.currentPlan.status).to.equal("Trial");
        expect(planFactory.currentPlan.trialPeriod).to.equal(23);
        expect(planFactory.currentPlan.proStatus).to.equal("Subscribed");

        done();
      }, 0);
    });

    it("should default to Free Plan if productCode is not defined", function(done) {
      sandbox.spy($rootScope, "$emit");
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        id: "companyId"
      });

      $rootScope.$emit("risevision.company.selectedCompanyChanged");
      $rootScope.$digest();

      setTimeout(function () {
        expect($rootScope.$emit).to.have.been.called;
        expect(planFactory.currentPlan).to.be.not.null;
        expect(planFactory.currentPlan.type).to.equal("free");
        expect(planFactory.currentPlan.status).to.equal("Active");

        done();
      }, 0);
    });
  });

  describe("plans modal", function() {
    it("should show plans modal", function() {
      planFactory.showPlansModal();

      expect($modal.open).to.have.been.called;
    });
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
        expect(planFactory.getPlans).to.have.been.called;
        expect(resp.length).to.equal(4);
        expect(resp[0].productId).to.equal("000");
        expect(resp[0].name).to.equal("Free");
        expect(resp[0].descriptionShort).to.be.ok;
        expect(resp[0].priceMonth).to.equal(0);
        expect(resp[1].productId).to.equal("289");
        expect(resp[1].name).to.equal("Basic");
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

  describe("getCompanyPlanStatus: ", function() {
    var companyId = "testCompanyId";
    
    it("should return populated planMap", function(done) {
      sandbox.stub(subscriptionStatusService, "list").returns(Q.resolve([
        { pc: BASIC_PLAN_CODE, status: "Subscribed" },
        { pc: ADVANCED_PLAN_CODE, status: "Not Subscribed" },
        { pc: ENTERPRISE_PLAN_CODE, status: "Suspended" }
      ]));
      planFactory.getCompanyPlanStatus(companyId)
      .then(function(allPlansMap) {
        expect(allPlansMap[BASIC_PLAN_CODE].status).to.equal("Subscribed");
        expect(allPlansMap[ADVANCED_PLAN_CODE].status).to.equal("Not Subscribed");
        expect(allPlansMap[ENTERPRISE_PLAN_CODE].status).to.equal("Suspended");
        done();
      });
    });
  });

  describe("toggleDisplayLicenseLocal: ", function() {
    var displayId = "displayId";

    it("should add a display to the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({});
      sandbox.stub(userState, "updateCompanySettings");

      planFactory.toggleDisplayLicenseLocal(displayId, true);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: [displayId]
      });
    });

    it("should remove a display from the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });
      sandbox.stub(userState, "updateCompanySettings");

      planFactory.toggleDisplayLicenseLocal(displayId, false);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: ["1", "3"]
      });
    });

    it("should not add the same display twice to the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });
      sandbox.stub(userState, "updateCompanySettings");

      planFactory.toggleDisplayLicenseLocal(displayId, true);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });
    });

    it("should not fail if requested to remove a non existent display from the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: []
      });
      sandbox.stub(userState, "updateCompanySettings");

      planFactory.toggleDisplayLicenseLocal(displayId, false);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: []
      });
    });
  });

  describe("getProLicenseCount:", function() {
    it("should return zero licenses available", function () {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({});
      expect(planFactory.getProLicenseCount()).to.equal(0);
    });

    it("should return three licenses available", function () {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        planPlayerProLicenseCount: 2,
        playerProLicenseCount: 1
      });

      expect(planFactory.getProLicenseCount()).to.equal(3);
    });
  });

  describe("areAllProLicensesUsed:", function() {
    it("should return all licenses are used if display if assigned list equal license count", function () {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        planPlayerProLicenseCount: 2,
        playerProLicenseCount: 1,
        playerProAssignedDisplays: ["1", "2", "3"]
      });

      expect(planFactory.areAllProLicensesUsed()).to.be.true;
    });

    it("should return all licenses are used if display if assigned list is lower than license count", function () {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        planPlayerProLicenseCount: 2,
        playerProLicenseCount: 1,
        playerProAssignedDisplays: ["1", "2"]
      });

      expect(planFactory.areAllProLicensesUsed()).to.be.false;
    });
  });
});
