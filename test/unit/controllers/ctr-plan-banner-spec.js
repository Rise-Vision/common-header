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
});
