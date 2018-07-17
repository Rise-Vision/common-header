"use strict";

describe("controller: purchase modal", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
    $provide.service("$modalInstance", function() {
      return {
        dismiss : sinon.stub(),
        close: sinon.stub()
      };
    });
    $provide.service("$loading", function() {
      return {
        start: sinon.stub(),
        stop: sinon.stub()
      };
    });
    $provide.factory("plan", function() {
      return {
        name: "PlanA"
      };
    });
  }));

  var sandbox, $scope, $modalInstance, $loading;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector, $rootScope, $controller) {
      $scope = $rootScope.$new();
      $modalInstance = $injector.get("$modalInstance");
      $loading = $injector.get("$loading");

      $controller("PurchaseModalCtrl", {
        $scope: $scope,
        $modalInstance: $modalInstance,
        $loading: $loading,
      });

      $scope.$digest();
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should initialize",function() {
    expect($scope.plan).to.be.ok;
    expect($scope.plan).to.deep.equal({
      name: "PlanA",
      additionalDisplayLicenses: 0
    });

    expect($scope.PURCHASE_STEPS).to.be.ok;
    expect($scope.currentStep).to.equal(0);

    expect($scope.init).to.be.a("function");
    expect($scope.setCurrentStep).to.be.a("function");

    expect($scope.dismiss).to.be.a("function");
  });

  it("setCurrentStep: ", function() {
    $scope.setCurrentStep({
      index: 2
    });

    expect($scope.currentStep).to.equal(2);
  });

  it("setCurrentStep: ", function() {
    $scope.dismiss();

    $modalInstance.dismiss.should.have.been.called;
  });

});
