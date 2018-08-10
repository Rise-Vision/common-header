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
    $provide.service("addressFactory", function() {
      return {
        validateAddress: function(addressObject) {
          if (!validate) {
            addressObject.validationError = true;
          }

          return Q.resolve();
        }
      };
    });
    $provide.service("purchaseFactory", function() {
      return purchaseFactory = {
        validatePaymentMethod: sinon.spy(function() {
          if (validate) {
            return Q.resolve();
          } else {
            return Q.reject();
          }
        }),
        getEstimate: sinon.spy(function() {
          return Q.resolve();
        })
      };
    });
  }));

  var sandbox, $scope, $modalInstance, $loading, validate, purchaseFactory;

  beforeEach(function() {
    validate = true;
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
    expect($scope.form).to.be.an("object");
    expect($scope.factory).to.equal(purchaseFactory);

    expect($scope.PURCHASE_STEPS).to.be.ok;
    expect($scope.currentStep).to.equal(0);

    expect($scope.validateAddress).to.be.a("function");
    expect($scope.validatePaymentMethod).to.be.a("function");
    expect($scope.setNextStep).to.be.a("function");
    expect($scope.setPreviousStep).to.be.a("function");
    expect($scope.setCurrentStep).to.be.a("function");

    expect($scope.dismiss).to.be.a("function");  
  });

  describe("$loading spinner: ", function() {
    it("should start and stop spinner", function() {
      purchaseFactory.loading = true;
      $scope.$digest();

      $loading.start.should.have.been.calledWith("purchase-modal");

      purchaseFactory.loading = false;
      $scope.$digest();

      $loading.stop.should.have.been.calledTwice;
    });
  });

  describe("validateAddress: ", function() {
    beforeEach(function() {
      sinon.spy($scope, "setNextStep");
    });

    it("should not validate if the corresponding form is invalid", function(done) {
      $scope.form.reviewSubscriptionForm = {
        $invalid: true
      };

      $scope.validateAddress({});

      setTimeout(function() {
        $scope.setNextStep.should.not.have.been.called;

        done();
      }, 10);
    });

    it("should validate and proceed to next step", function(done) {
      $scope.validateAddress({});

      setTimeout(function() {
        $scope.setNextStep.should.have.been.called;

        done();
      }, 10);
    });

    it("should validate and not proceed if there are errors", function(done) {
      validate = false;
      $scope.validateAddress({});

      setTimeout(function() {
        $scope.setNextStep.should.not.have.been.called;

        done();
      }, 10);
    });

  });

  describe("validatePaymentMethod: ", function() {
    beforeEach(function() {
      sinon.spy($scope, "setNextStep");
    });

    it("should not validate if the corresponding form is invalid", function(done) {
      $scope.form.reviewSubscriptionForm = {
        $invalid: true
      };

      $scope.validatePaymentMethod({});

      setTimeout(function() {
        $scope.setNextStep.should.not.have.been.called;

        done();
      }, 10);
    });

    it("should validate and proceed to next step", function(done) {
      $scope.validatePaymentMethod({});

      setTimeout(function() {
        $scope.setNextStep.should.have.been.called;

        done();
      }, 10);
    });

    it("should validate and not proceed if there are errors", function(done) {
      validate = false;
      $scope.validatePaymentMethod({});

      setTimeout(function() {
        $scope.setNextStep.should.not.have.been.called;

        done();
      }, 10);
    });

  });

  describe("setNextStep: ", function() {
    it("should increment step", function() {
      $scope.setNextStep();

      expect($scope.currentStep).to.equal(1);
    });

    it("should not increment step if the corresponding form is invalid", function() {
      $scope.form.reviewSubscriptionForm = {
        $invalid: true
      };

      $scope.setNextStep();

      expect($scope.currentStep).to.equal(0);
    });

    it("should increment step if other forms are invalid", function() {
      $scope.form.billingAddressForm = {
        $invalid: true
      };

      $scope.setNextStep();

      expect($scope.currentStep).to.equal(1);
    });

    it("should proceed to the last step and get estimate", function() {
      $scope.setCurrentStep(3);

      $scope.setNextStep();

      expect($scope.currentStep).to.equal(4);

      purchaseFactory.getEstimate.should.have.been.called;
    });

    it("should always set last step and get estimate if form was completed once", function(done) {
      $scope.setCurrentStep(3);

      $scope.setNextStep();

      expect($scope.currentStep).to.equal(4);

      purchaseFactory.getEstimate.should.have.been.called;

      setTimeout(function() {
        $scope.setCurrentStep(0);

        $scope.setNextStep();

        purchaseFactory.getEstimate.should.have.been.calledTwice;

        expect($scope.currentStep).to.equal(4);

        done();
      }, 10);
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

  });

  it("setCurrentStep: ", function() {
    $scope.setCurrentStep(2);

    expect($scope.currentStep).to.equal(2);
  });

  it("dismiss: ", function() {
    $scope.dismiss();

    $modalInstance.dismiss.should.have.been.called;
  });

});
