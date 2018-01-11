"use strict";

describe("controller: plan banner", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide) {
    $provide.service("$modal", function() {
      return {
        open: sinon.stub()
      };
    });
    $provide.factory("planFactory", function() {
      return {
        getCompanyPlan: function() {
          return Q.resolve([]);
        }
      };
    });
    $provide.factory("userState", function() {
      return {
        _restoreState: function () {},
        getSelectedCompanyId: sinon.stub().returns("companyId")
      };
    });
  }));

  var sandbox, $scope, $rootScope, $modal, planFactory, userState;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector, _$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $modal = $injector.get("$modal");
      planFactory = $injector.get("planFactory");
      userState = $injector.get("userState");

      sandbox.spy(planFactory, "getCompanyPlan");

      $controller("PlanBannerCtrl", {
        $scope: $scope,
        $modal: $modal,
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
    expect($scope.loadCompanyPlan).to.be.a.function;
    expect($scope.showPlans).to.be.a.function;
  });

  it("should load the current plan when selected company changes", function(done) {
    $rootScope.$emit("risevision.company.selectedCompanyChanged");
    $rootScope.$digest();

    setTimeout(function () {
      expect(userState.getSelectedCompanyId).to.have.been.called;
      expect(planFactory.getCompanyPlan).to.have.been.called;
      expect($scope.plan).to.be.not.null;

      done();
    }, 0);
  });

  it("should show plans modal", function() {
    $scope.showPlans();

    expect($modal.open).to.have.been.called;
  });
});
