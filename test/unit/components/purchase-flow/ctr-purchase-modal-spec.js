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
    expect($scope.setNextStep).to.be.a("function");
    expect($scope.setPreviousStep).to.be.a("function");

    expect($scope.dismiss).to.be.a("function");
  });

  describe("setCurrentStep: ", function() {
    it("should set step", function() {
      $scope.setCurrentStep({
        index: 2
      });

      expect($scope.currentStep).to.equal(2);
    });

    it("should not set step if form is invalid", function() {
      $scope.form.form1 = {
        $invalid: true
      };

      $scope.setCurrentStep({
        index: 2
      });

      expect($scope.currentStep).to.equal(0);
    });
  });

  describe("setNextStep: ", function() {
    it("should increment step", function() {
      $scope.setNextStep();

      expect($scope.currentStep).to.equal(1);
    });

    it("should not increment step if form is invalid", function() {
      $scope.form.form1 = {
        $invalid: true
      };

      $scope.setNextStep();

      expect($scope.currentStep).to.equal(0);
    });

  });

  describe("setPreviousStep: ", function() {
    it("should decrement step", function() {
      $scope.currentStep = 2;
      $scope.setPreviousStep();

      expect($scope.currentStep).to.equal(1);
    });

    it("should stop at 0", function() {
      $scope.currentStep = 1;
      $scope.setPreviousStep();
      $scope.setPreviousStep();

      expect($scope.currentStep).to.equal(0);
    });

    it("should not increment step if form is invalid", function() {
      $scope.currentStep = 2;
      $scope.form.form1 = {
        $invalid: true
      };

      $scope.setPreviousStep();

      expect($scope.currentStep).to.equal(2);
    });

  });

  it("dismiss: ", function() {
    $scope.dismiss();

    $modalInstance.dismiss.should.have.been.called;
  });

});
