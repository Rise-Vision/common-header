"use strict";

describe("controller: plan banner", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide) {
    $provide.factory("planFactory", function() {
      return {
        currentPlan: { type: "basic" },
        getCompanyPlan: function() {
          return Q.resolve([]);
        },
        showPlansModal: sinon.stub()
      };
    });
    $provide.factory("userState", function() {
      return {
        _restoreState: function () {},
        getSelectedCompanyId: sinon.stub().returns("companyId")
      };
    });
  }));

  var sandbox, $scope, $rootScope, planFactory, userState;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector, _$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      planFactory = $injector.get("planFactory");
      userState = $injector.get("userState");

      sandbox.spy(planFactory, "getCompanyPlan");

      $controller("PlanBannerCtrl", {
        $scope: $scope,
        planFactory: planFactory,
        userState: userState
      });

      $scope.$digest();
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should initialize",function() {
    expect($scope.showPlans).to.be.ok;
  });

  it("should load the current plan when selected company changes", function(done) {
    $rootScope.$emit("risevision.plan.loaded");
    $rootScope.$digest();

    setTimeout(function () {
      expect(userState.getSelectedCompanyId).to.have.been.called;
      expect($scope.plan).to.be.not.null;
      expect($scope.plan.type).to.equal("basic");

      done();
    }, 0);
  });

  describe("Free plan: ", function() {
    it("should return the plan is Free", function() {
      $scope.plan = { type: "free" };
      expect($scope.isFree()).to.be.true;
    });

    it("should return the plan is not Free", function() {
      $scope.plan = { type: "advanced" };
      expect($scope.isFree()).to.be.false;
    });
  });

  describe("Enterprise Sub Company plan: ", function() {
    it("should return the plan is Enterprise Sub Company", function() {
      $scope.plan = { type: "enterprisesub" };
      expect($scope.isEnterpriseSubCompany()).to.be.true;
    });

    it("should return the plan is not Enterprise Sub Company", function() {
      $scope.plan = { type: "advanced" };
      expect($scope.isEnterpriseSubCompany()).to.be.false;
    });
  });

  describe("Subscribed status: ", function() {
    it("should return the subscription status is Subscribed", function() {
      $scope.plan = { status: "Active" };
      expect($scope.isSubscribed()).to.be.true;
    });

    it("should return the subscription status is not Subscribed", function() {
      $scope.plan = { status: "Cancelled" };
      expect($scope.isSubscribed()).to.be.false;
    });
  });

  describe("On Trial status: ", function() {
    it("should return the subscription status is On Trial", function() {
      $scope.plan = { status: "Trial" };
      expect($scope.isOnTrial()).to.be.true;
    });

    it("should return the subscription status is not On Trial", function() {
      $scope.plan = { status: "Cancelled" };
      expect($scope.isOnTrial()).to.be.false;
    });
  });

  describe("Trial Expired status: ", function() {
    it("should return the subscription status is Trial Expired", function() {
      $scope.plan = { status: "Trial Expired" };
      expect($scope.isTrialExpired()).to.be.true;
    });

    it("should return the subscription status is not Trial Expired", function() {
      $scope.plan = { status: "Cancelled" };
      expect($scope.isTrialExpired()).to.be.false;
    });
  });

  describe("Suspended status: ", function() {
    it("should return the subscription status is Suspended", function() {
      $scope.plan = { status: "Suspended" };
      expect($scope.isSuspended()).to.be.true;
    });

    it("should return the subscription status is not Suspended", function() {
      $scope.plan = { status: "Cancelled" };
      expect($scope.isSuspended()).to.be.false;
    });
  });

  describe("Pro Subscribed status: ", function() {
    it("should return the Pro subscription status is Subscribed", function() {
      $scope.plan = { proStatus: "Active" };
      expect($scope.isProSubscribed()).to.be.true;
    });

    it("should return the Pro subscription status is not Subscribed", function() {
      $scope.plan = { proStatus: "Cancelled" };
      expect($scope.isProSubscribed()).to.be.false;
    });
  });
});
