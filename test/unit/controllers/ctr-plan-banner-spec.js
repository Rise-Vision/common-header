"use strict";

describe("controller: plan banner", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide) {
    $provide.factory("currentPlanFactory", function() {
      return {
        currentPlan: { type: "basic" }
      };
    });
    $provide.factory("userState", function() {
      return {
        _restoreState: function () {},
        getSelectedCompanyId: sinon.stub().returns("companyId")
      };
    });
  }));

  var sandbox, $scope, $rootScope, currentPlanFactory, userState;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector, _$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      currentPlanFactory = $injector.get("currentPlanFactory");
      userState = $injector.get("userState");

      $controller("PlanBannerCtrl", {
        $scope: $scope,
        currentPlanFactory: currentPlanFactory,
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
});
