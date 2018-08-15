/*jshint expr:true */
"use strict";

describe("Services: purchase factory", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
    $provide.service("$q", function() {return Q;});
    $provide.service("$modal", function() {
      return {
        open: sinon.spy()
      };
    });
    $provide.service("userState", function() {
      return {
        getCopyOfUserCompany: sinon.stub().returns("userCompany"),
        getCopyOfSelectedCompany: sinon.stub().returns("selectedCompany"),
        getCopyOfProfile: sinon.stub().returns({
          username: "username",
          uselessProperty: "value"
        })
      };
    });
    $provide.service("storeService", function() {
      return storeService = {
        calculateTaxes: sinon.spy(function() {
          if (validate) {
            return Q.resolve({
              result: true,
              taxes: [],
              total: "total",
              totalTax: "totalTax",
              shippingTotal: "shippingTotal"
            });
          } else {
            return Q.reject();
          }
        }),
        purchase: sinon.spy(function() {
          if (validate) {
            return Q.resolve("success");
          } else {
            return Q.reject();
          }
        })

      };
    });

    $provide.service("stripeService", function() {
      return stripeService = {
        validateCard: sinon.stub().returns(true),
        createToken: sinon.spy(function() {
          if (validate) {
            return Q.resolve({
              id: "id",
              card: {
                id: "wrongId",
                last4: "last4",
                type: "cardType"
              }
            });
          } else {
            return Q.reject();
          }
        })
      };
    });

  }));

  var $modal, purchaseFactory, stripeService, storeService, validate, RPP_ADDON_ID;

  beforeEach(function() {
    inject(function($injector) {
      RPP_ADDON_ID = $injector.get("RPP_ADDON_ID");
      $modal = $injector.get("$modal");
      purchaseFactory = $injector.get("purchaseFactory");
    });
  });

  it("should exist", function() {
    expect(purchaseFactory).to.be.ok;
    expect(purchaseFactory.showPurchaseModal).to.be.a("function");
    expect(purchaseFactory.validatePaymentMethod).to.be.a("function");
    expect(purchaseFactory.getEstimate).to.be.a("function");
    expect(purchaseFactory.completePayment).to.be.a("function");
  });

  it("should stop spinner on load", function() {
    expect(purchaseFactory.loading).to.be.false;
  });

  describe("showPurchaseModal: ", function() {
    it("should show purchase modal", function() {
      purchaseFactory.showPurchaseModal({});

      expect($modal.open).to.have.been.called;
      expect($modal.open).to.have.been.calledWith({
        template: sinon.match.any,
        controller: "PurchaseModalCtrl",
        size: "md",
        backdrop: "static"
      });
    });

    it("should initialize selected plan, attach addresses and clean contact info", function() {
      var plan = { name: "PlanA"};
      purchaseFactory.showPurchaseModal(plan, true);
      
      expect(purchaseFactory.purchase).to.be.ok;

      expect(purchaseFactory.purchase.plan).to.be.ok;
      expect(purchaseFactory.purchase.plan.name).to.equal("PlanA");
      expect(purchaseFactory.purchase.plan.isMonthly).to.be.true;
      expect(purchaseFactory.purchase.plan).to.not.equal(plan);        

      expect(purchaseFactory.purchase.billingAddress).to.equal("userCompany");
      expect(purchaseFactory.purchase.shippingAddress).to.equal("selectedCompany");
      expect(purchaseFactory.purchase.contact).to.be.an("object");
      expect(purchaseFactory.purchase.contact).to.have.property("username");
      expect(purchaseFactory.purchase.contact).to.not.have.property("uselessProperty");
    });

    it("should initialize payment methods", function() {
      var plan = { name: "PlanA"};
      purchaseFactory.showPurchaseModal(plan, true);
      
      expect(purchaseFactory.purchase).to.be.ok;
      expect(purchaseFactory.purchase.paymentMethods).to.be.ok;
      expect(purchaseFactory.purchase.paymentMethods.paymentMethod).to.equal("card");
      expect(purchaseFactory.purchase.paymentMethods.existingCreditCards).to.deep.equal([]);

      expect(purchaseFactory.purchase.paymentMethods.newCreditCard).to.deep.equal({
        isNew: true,
        address: {},
        useBillingAddress: true,
        billingAddress: purchaseFactory.purchase.billingAddress
      });

      expect(purchaseFactory.purchase.paymentMethods.selectedCard).to.equal(purchaseFactory.purchase.paymentMethods.newCreditCard);

      expect(purchaseFactory.purchase.estimate).to.deep.equal({});
    });
  });

  describe("validatePaymentMethod: ", function() {
    it("should validate and resolve", function(done) {
      purchaseFactory.purchase = {
        paymentMethods: {
          paymentMethod: "invoice"
        }
      };

      purchaseFactory.validatePaymentMethod()
      .then(function() {
        done();
      })
      .then(null, function() {
        done("error");
      });

    });

    describe("existing card: ", function() {
      var card;
      beforeEach(function() {
        purchaseFactory.purchase = {
          paymentMethods: {
            paymentMethod: "card",
            selectedCard: card = {
              number: "123"
            }
          }
        };
      });

      it("should validate card and proceed to next step", function(done) {
        purchaseFactory.validatePaymentMethod()
        .then(function() {
          stripeService.validateCard.should.have.been.calledWith(card, false);

          done();
        })
        .then(null,function() {
          done("error");
        });
      });

      it("should validate and not proceed if there are errors", function(done) {
        stripeService.validateCard.returns(false);

        purchaseFactory.validatePaymentMethod()
        .then(null, function() {
          stripeService.validateCard.should.have.been.calledWith(card, false);

          done();
        })
        .then(null, function() {
          done("error");
        });
      });
      
    });

    describe("new card: ", function() {
      var card;

      beforeEach(function() {
        validate = true;

        purchaseFactory.purchase = {
          paymentMethods: {
            paymentMethod: "card",
            existingCreditCards: [],
            newCreditCard: card = {
              isNew: true,
              number: "123",
              address: {},
              billingAddress: {}
            }
          }
        };
        purchaseFactory.purchase.paymentMethods.selectedCard = purchaseFactory.purchase.paymentMethods.newCreditCard;
      });

      it("should validate card", function() {
        purchaseFactory.validatePaymentMethod();

        stripeService.validateCard.should.have.been.calledWith(card, true);
      });

      it("should validate and not proceed if there are errors", function(done) {
        stripeService.validateCard.returns(false);

        purchaseFactory.validatePaymentMethod()
        .then(null, function() {
          stripeService.validateCard.should.have.been.calledWith(card, true);

          done();
        })
        .then(null,function() {
          done("error");
        });
      });

      it("should create card token and proceed to next step", function() {
        purchaseFactory.validatePaymentMethod();

        stripeService.createToken.should.have.been.called;
      });

      it("should use card address", function() {
        purchaseFactory.validatePaymentMethod();

        stripeService.createToken.should.have.been.calledWith(card, card.address);
      });

      it("should use billing address if selected", function() {
        card.useBillingAddress = true;

        purchaseFactory.validatePaymentMethod();

        stripeService.createToken.should.have.been.calledWith(card, card.billingAddress);
      });

      it("should resolve if token is received", function(done) {
        purchaseFactory.validatePaymentMethod()
        .then(function() {
          done();
        })
        .then(null,function() {
          done("error");
        });
      });

      it("should update Card fields with API results", function(done) {
        purchaseFactory.validatePaymentMethod()
        .then(function() {
          expect(card.id).to.equal("id");
          expect(card.last4).to.equal("last4");
          expect(card.cardType).to.equal("cardType");

          expect(purchaseFactory.purchase.paymentMethods.selectedCard).to.equal(card);
          expect(purchaseFactory.purchase.paymentMethods.newCreditCard).to.equal(card);

          done();
        })
        .then(null,function() {
          done("error");
        });
      });

      it("should reject if token creation fails", function(done) {
        validate = false;

        purchaseFactory.validatePaymentMethod()
        .then(function() {
          done("error");
        })
        .then(null,function() {
          done();
        });
      });

      it("should start and stop spinner", function(done) {
        purchaseFactory.validatePaymentMethod();

        expect(purchaseFactory.loading).to.be.true;

        setTimeout(function() {
          expect(purchaseFactory.loading).to.be.false;

          done();
        }, 10);
      });

    });

  });
  
  describe("getEstimate: ", function() {
    beforeEach(function() {
      validate = true;

      purchaseFactory.purchase = {
        billingAddress: {
          id: "id"
        },
        shippingAddress: "shippingAddress",
        plan: {
          isMonthly: true,
          productCode: "productCode",
          monthly: {
            billAmount: 27
          },
          yearly: {
            priceDisplayYear: 99
          },
          additionalDisplayLicenses: 3
        }
      };
    });

    it("should initialize estimate object based on currency", function() {
      purchaseFactory.getEstimate();

      expect(purchaseFactory.purchase.estimate).to.be.ok;
      expect(purchaseFactory.purchase.estimate).to.be.an("object");
      expect(purchaseFactory.purchase.estimate.currency).to.equal("usd");

      purchaseFactory.purchase.billingAddress.country = "CA";

      purchaseFactory.getEstimate();

      expect(purchaseFactory.purchase.estimate.currency).to.equal("cad");
    });

    it("should call calculateTaxes api and return a promise", function() {
      expect(purchaseFactory.getEstimate().then).to.be.a("function");

      storeService.calculateTaxes.should.have.been.called;
      storeService.calculateTaxes.should.have.been.calledWith("id", sinon.match.string, sinon.match.string, 3, "shippingAddress");
    });

    it("should call set correct currency & billing period values", function() {
      purchaseFactory.getEstimate();

      storeService.calculateTaxes.should.have.been.calledWith("id", "productCode-" + "usd" + "01m", RPP_ADDON_ID + "-" + "usd" + "01m", 3, "shippingAddress");

      purchaseFactory.purchase.billingAddress.country = "CA";
      purchaseFactory.purchase.plan.isMonthly = false;

      purchaseFactory.getEstimate();

      storeService.calculateTaxes.should.have.been.calledWith("id", "productCode-" + "cad" + "01y", RPP_ADDON_ID + "-" + "cad" + "01y", 3, "shippingAddress");
    });

    it("should populate estimate object if call succeeds", function(done) {
      purchaseFactory.getEstimate()
      .then(function() {
        expect(purchaseFactory.purchase.estimate).to.deep.equal({
          currency: "usd",
          taxesCalculated: true,
          taxes: [],
          total: "total",
          totalTax: "totalTax",
          shippingTotal: "shippingTotal"
        });

        done();
      })
      .then(null,function() {
        done("error");
      });
    });

    it("should show estimate error if call fails", function(done) {
      validate = false;

      purchaseFactory.getEstimate()
      .then(function() {
        expect(purchaseFactory.purchase.estimate.estimateError).to.equal("An unexpected error has occurred. Please try again.");
      
        done();
      })
      .then(null,function() {
        done("error");
      });
    });

    it("should start and stop spinner", function(done) {
      purchaseFactory.getEstimate();

      expect(purchaseFactory.loading).to.be.true;

      setTimeout(function() {
        expect(purchaseFactory.loading).to.be.false;

        done();
      }, 10);
    });

  });

  describe("completePayment: ", function() {
    beforeEach(function() {
      validate = true;

      purchaseFactory.purchase = {
        billingAddress: {
          id: "id",
          street: "billingStreet",
          country: "CA"
        },
        shippingAddress: {
          id: "id",
          street: "shippingStreet",
          junkProperty: "junkValue"
        },
        plan: {
          isMonthly: true,
          productCode: "productCode",
          monthly: {
            billAmount: 27
          },
          yearly: {
            priceDisplayYear: 99
          },
          additionalDisplayLicenses: 3
        },
        paymentMethods: {
          selectedCard: {
            id: "cardId",
            isDefault: true,
            junkProperty: "junkValue"
          },
          purchaseOrderNumber: "purchaseOrderNumber"
        }
      };
    });

    it("should clear checkout errors", function() {
      purchaseFactory.purchase.checkoutError = "error";
      purchaseFactory.completePayment();

      expect(purchaseFactory.purchase.checkoutError).to.not.be.ok;
    });

    it("should call purchase api and return a promise", function() {
      expect(purchaseFactory.completePayment().then).to.be.a("function");

      storeService.purchase.should.have.been.called;
      storeService.purchase.should.have.been.calledWith(sinon.match.string);
    });

    it("should call purchase with a JSON string", function() {
      purchaseFactory.completePayment();

      storeService.purchase.should.have.been.called;
      storeService.purchase.should.have.been.calledWith(JSON.stringify({
        billTo: {
          street: "billingStreet",
          country: "CA",
          id: "id"
        },
        shipTo: {
          street: "shippingStreet",
          id: "id"
        },
        items: [{
          id: "productCode-cad01m"
        } , {
          id: "c4b368be86245bf9501baaa6e0b00df9719869fd-cad01m",
          qty: 3
        }],
        purchaseOrderNumber: "purchaseOrderNumber",
        card: {
          cardId: "cardId",
          isDefault: true
        }
      }));

    });

    it("should populate card isDefault value if missing", function() {
      delete purchaseFactory.purchase.paymentMethods.selectedCard.isDefault;
      purchaseFactory.completePayment();

      expect(storeService.purchase.getCall(0).args[0]).to.contain("\"isDefault\":false");
    });

    it("should not add card for onAccount", function() {
      purchaseFactory.purchase.paymentMethods.isOnAccount = true;
      purchaseFactory.completePayment();

      expect(storeService.purchase.getCall(0).args[0]).to.contain("\"card\":null");
    });

    it("should populate checkout success object if call succeeds", function(done) {
      purchaseFactory.completePayment()
      .then(function() {
        expect(purchaseFactory.purchase.checkoutError).to.not.be.ok;

        done();
      })
      .then(null,function() {
        done("error");
      });
    });

    it("should show payment error if call fails", function(done) {
      validate = false;

      purchaseFactory.completePayment()
      .then(function() {
        expect(purchaseFactory.purchase.checkoutError).to.equal("There was an unknown error with the payment.");

        done();
      })
      .then(null,function() {
        done("error");
      });
    });

    it("should start and stop spinner", function(done) {
      purchaseFactory.completePayment();

      expect(purchaseFactory.loading).to.be.true;

      setTimeout(function() {
        expect(purchaseFactory.loading).to.be.false;

        done();
      }, 10);
    });

  });

});
