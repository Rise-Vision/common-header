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
    $provide.service("storeAuthorization", function() {
      return storeAuthorization = {
        startTrial: sinon.spy(function() {
          return (startTrial ? Q.resolve() : Q.reject("error"));
        })
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
        updateCompanySettings: sinon.stub()
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
  var storeAuthorization, startTrial;
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

      BASIC_PLAN_CODE = plansByType.basic.productCode;
      BASIC_PLAN_ID = plansByType.basic.productId;
      ADVANCED_PLAN_CODE = plansByType.advanced.productCode;
      ENTERPRISE_PLAN_CODE = plansByType.enterprise.productCode;
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

      planFactory.toggleDisplayLicenseLocal(displayId, true);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: [displayId]
      });
    });

    it("should remove a display from the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });

      planFactory.toggleDisplayLicenseLocal(displayId, false);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: ["1", "3"]
      });
    });

    it("should not add the same display twice to the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });

      planFactory.toggleDisplayLicenseLocal(displayId, true);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });
    });

    it("should not fail if requested to remove a non existent display from the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: []
      });

      planFactory.toggleDisplayLicenseLocal(displayId, false);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: []
      });
    });
  });

  describe("startTrial: ", function() {
    var plan = {
      name: "Advanced",
      type: "advanced",
      productCode: "93b5595f0d7e4c04a3baba1102ffaecb17607bf4",
      proLicenseCount: 9,
      trialPeriod: 14
    };
    
    beforeEach(function() {
      startTrial = true;
    });

    it("should start the trial and update company settings", function(done) {
      planFactory.startTrial(plan)
        .then(function() {
          storeAuthorization.startTrial.should.have.been.calledWith(plan.productCode);

          userState.updateCompanySettings.should.have.been.calledWith({
            planProductCode: plan.productCode,
            planTrialPeriod: plan.trialPeriod,
            planSubscriptionStatus: "Trial",
            planPlayerProLicenseCount: plan.proLicenseCount
          });

          done();
        }, done);
    });

    it("should handle failure to start the trial", function(done) {
      startTrial = false;

      planFactory.startTrial(plan)
        .then(function() {
          done("fail");
        }, function(err) {
          expect(err).to.equal("error");

          storeAuthorization.startTrial.should.have.been.calledWith(plan.productCode);

          userState.updateCompanySettings.should.not.have.been.called;

          done();
        });
    });

    it("startBasicPlanTrial: ", function(done) {
      planFactory.startBasicPlanTrial()
        .then(function() {
          storeAuthorization.startTrial.should.have.been.calledWith(BASIC_PLAN_CODE);

          done();
        }, done);
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

  describe("Plan active: ", function() {
    it("should return the plan is active when Subscribed", function() {
      sandbox.stub(planFactory, "isSubscribed").returns(true);
      expect(planFactory.isPlanActive()).to.be.true;
    });

    it("should return the plan is active when On Trial", function() {
      sandbox.stub(planFactory, "isOnTrial").returns(true);
      expect(planFactory.isPlanActive()).to.be.true;
    });

    it("should return the plan is not active otherwise", function() {
      sandbox.stub(planFactory, "isTrialExpired").returns(true);
      expect(planFactory.isPlanActive()).to.be.false;
    });
  });

  describe("Free plan: ", function() {
    it("should return the plan is Free", function() {
      planFactory.currentPlan = { type: "free" };
      expect(planFactory.isFree()).to.be.true;
    });

    it("should return the plan is not Free", function() {
      planFactory.currentPlan = { type: "advanced" };
      expect(planFactory.isFree()).to.be.false;
    });
  });

  describe("Enterprise Sub Company plan: ", function() {
    it("should return the plan is Enterprise Sub Company", function() {
      planFactory.currentPlan = { type: "enterprisesub" };
      expect(planFactory.isEnterpriseSubCompany()).to.be.true;
    });

    it("should return the plan is not Enterprise Sub Company", function() {
      planFactory.currentPlan = { type: "advanced" };
      expect(planFactory.isEnterpriseSubCompany()).to.be.false;
    });
  });

  describe("Subscribed status: ", function() {
    it("should return the subscription status is Subscribed", function() {
      planFactory.currentPlan = { status: "Active" };
      expect(planFactory.isSubscribed()).to.be.true;
    });

    it("should return the subscription status is not Subscribed", function() {
      planFactory.currentPlan = { status: "Cancelled" };
      expect(planFactory.isSubscribed()).to.be.false;
    });
  });

  describe("On Trial status: ", function() {
    it("should return the subscription status is On Trial", function() {
      planFactory.currentPlan = { status: "Trial" };
      expect(planFactory.isOnTrial()).to.be.true;
    });

    it("should return the subscription status is not On Trial", function() {
      planFactory.currentPlan = { status: "Cancelled" };
      expect(planFactory.isOnTrial()).to.be.false;
    });
  });

  describe("Trial Expired status: ", function() {
    it("should return the subscription status is Trial Expired", function() {
      planFactory.currentPlan = { status: "Trial Expired" };
      expect(planFactory.isTrialExpired()).to.be.true;
    });

    it("should return the subscription status is not Trial Expired", function() {
      planFactory.currentPlan = { status: "Cancelled" };
      expect(planFactory.isTrialExpired()).to.be.false;
    });
  });

  describe("Suspended status: ", function() {
    it("should return the subscription status is Suspended", function() {
      planFactory.currentPlan = { status: "Suspended" };
      expect(planFactory.isSuspended()).to.be.true;
    });

    it("should return the subscription status is not Suspended", function() {
      planFactory.currentPlan = { status: "Cancelled" };
      expect(planFactory.isSuspended()).to.be.false;
    });
  });

  describe("Pro Subscribed status: ", function() {
    it("should return the Pro subscription status is Subscribed", function() {
      planFactory.currentPlan = { proStatus: "Active" };
      expect(planFactory.isProSubscribed()).to.be.true;
    });

    it("should return the Pro subscription status is not Subscribed", function() {
      planFactory.currentPlan = { proStatus: "Cancelled" };
      expect(planFactory.isProSubscribed()).to.be.false;
    });

    it("should return the Pro subscription status is Suspended", function() {
      planFactory.currentPlan = { proStatus: "Suspended" };
      expect(planFactory.isProSuspended()).to.be.true;
    });
  });

  describe("hasProfessionalLicenses: ", function() {
    it("should return true if Subscribed to a Plan", function() {
      planFactory.currentPlan = { status: "Active" };
      expect(planFactory.hasProfessionalLicenses()).to.be.true;
    });

    it("should return true if On Trial to a Plan", function() {
      planFactory.currentPlan = { status: "Trial" };
      expect(planFactory.hasProfessionalLicenses()).to.be.true;
    });

    it("should return true if Subscribed to Player Professional", function() {
      planFactory.currentPlan = { proStatus: "Active" };
      expect(planFactory.hasProfessionalLicenses()).to.be.true;
    });

    it("should return false if neither of those conditions is met", function() {
      planFactory.currentPlan = { 
        status: "Cancelled",
        proStatus: "Cancelled"
      };
      expect(planFactory.hasProfessionalLicenses()).to.be.false;
    });
  });
});
