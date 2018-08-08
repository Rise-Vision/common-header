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
    $provide.service("stripeService", function() {
      return stripeService = {
        validateCard: sinon.stub().returns(true),
        createToken: sinon.spy(function() {
          if (validate) {
            return Q.resolve();
          } else {
            return Q.reject();
          }
        })
      };
    });
    $provide.value("plan", {
      name: "PlanA"
    });
  }));

  var sandbox, $scope, $modalInstance, $loading, validate, stripeService;

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
    expect($scope.plan).to.be.ok;
    expect($scope.plan).to.deep.equal({
      name: "PlanA",
      additionalDisplayLicenses: 0
    });

    expect($scope.PURCHASE_STEPS).to.be.ok;
    expect($scope.currentStep).to.equal(0);

    expect($scope.init).to.be.a("function");
    expect($scope.validateAddress).to.be.a("function");
    expect($scope.validatePaymentMethod).to.be.a("function");
    expect($scope.setNextStep).to.be.a("function");
    expect($scope.setPreviousStep).to.be.a("function");

    expect($scope.dismiss).to.be.a("function");  
  });

  describe("$loading spinner: ", function() {
    it("should stop spinner on load", function() {
      expect($scope.loading).to.be.false;

      $loading.stop.should.have.been.calledWith("purchase-modal");
    });

    it("should start and stop spinner", function() {
      $scope.loading = true;
      $scope.$digest();

      $loading.start.should.have.been.calledWith("purchase-modal");

      $scope.loading = false;
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

      expect($scope.loading).to.be.false;

      setTimeout(function() {
        expect($scope.loading).to.be.false;

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

    it("should start and stop spinner", function(done) {
      $scope.validateAddress({});

      expect($scope.loading).to.be.true;

      setTimeout(function() {
        expect($scope.loading).to.be.false;

        done();
      }, 10);
    });
  });

  describe("validatePaymentMethod: ", function() {
    beforeEach(function() {
      sinon.spy($scope, "setNextStep");
    });

    it("should not validate if the corresponding form is invalid", function() {
      $scope.form.reviewSubscriptionForm = {
        $invalid: true
      };

      $scope.validatePaymentMethod({});

      $scope.setNextStep.should.not.have.been.called;
    });

    it("should validate and proceed to next step for invoice", function() {
      $scope.validatePaymentMethod({
        paymentMethod: "invoice"
      });

      $scope.setNextStep.should.have.been.called;
    });

    describe("existing card: ", function() {
      var card = {
        number: "123"
      };

      it("should validate card and proceed to next step", function() {
        $scope.validatePaymentMethod({
          paymentMethod: "card",
          selectedCard: card
        });

        stripeService.validateCard.should.have.been.calledWith(card, false);
        $scope.setNextStep.should.have.been.called;
      });

      it("should validate and not proceed if there are errors", function() {
        stripeService.validateCard.returns(false);

        $scope.validatePaymentMethod({
          paymentMethod: "card",
          selectedCard: card
        });

        stripeService.validateCard.should.have.been.calledWith(card, false);
        $scope.setNextStep.should.not.have.been.called;
      });
      
    });

    describe("new card: ", function() {
      var card;

      beforeEach(function() {
        card = {
          number: "123",
          address: {},
          billingAddress: {}
        };
      });

      it("should validate card", function() {
        $scope.validatePaymentMethod({
          paymentMethod: "card",
          newCreditCard: card
        });

        stripeService.validateCard.should.have.been.calledWith(card, true);
      });

      it("should validate and not proceed if there are errors", function() {
        stripeService.validateCard.returns(false);

        $scope.validatePaymentMethod({
          paymentMethod: "card",
          newCreditCard: card
        });

        stripeService.validateCard.should.have.been.calledWith(card, true);
        $scope.setNextStep.should.not.have.been.called;
      });

      it("should create card token and proceed to next step", function(done) {
        $scope.validatePaymentMethod({
          paymentMethod: "card",
          newCreditCard: card
        });

        setTimeout(function() {
          stripeService.createToken.should.have.been.called;
          $scope.setNextStep.should.have.been.called;

          done();
        }, 10);
      });

      it("should use card address", function(done) {
        $scope.validatePaymentMethod({
          paymentMethod: "card",
          newCreditCard: card
        });

        setTimeout(function() {
          stripeService.createToken.should.have.been.calledWith(card, card.address);

          done();
        }, 10);
      });

      it("should use billing address if selected", function(done) {
        card.useBillingAddress = true;

        $scope.validatePaymentMethod({
          paymentMethod: "card",
          newCreditCard: card
        });

        setTimeout(function() {
          stripeService.createToken.should.have.been.calledWith(card, card.billingAddress);

          done();
        }, 10);
      });

      it("should start and stop spinner", function(done) {
        $scope.validatePaymentMethod({
          paymentMethod: "card",
          newCreditCard: card
        });

        expect($scope.loading).to.be.true;

        setTimeout(function() {
          expect($scope.loading).to.be.false;

          done();
        }, 10);
      });

    });

  });

  it("setCurrentStep: ", function() {
    $scope.setCurrentStep(2);

    expect($scope.currentStep).to.equal(2);
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

  it("dismiss: ", function() {
    $scope.dismiss();

    $modalInstance.dismiss.should.have.been.called;
  });

});
