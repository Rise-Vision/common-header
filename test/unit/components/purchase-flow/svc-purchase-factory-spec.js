/*jshint expr:true */
"use strict";

describe("Services: purchase factory", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
    $provide.service("$q", function() {return Q;});
    $provide.service("$modal", function() {
      return {
        open: sinon.spy(function(modalObject) {
          resolveObj = modalObject.resolve.plan();

          return Q.resolve();
        })
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
  }));

  var $modal, resolveObj, purchaseFactory;

  beforeEach(function() {
    inject(function($injector) {
      $modal = $injector.get("$modal");
      purchaseFactory = $injector.get("purchaseFactory");
    });
  });

  it("should exist", function() {
    expect(purchaseFactory).to.be.ok;
    expect(purchaseFactory.showPurchaseModal).to.be.a("function");
  });

  it("should show plans modal", function() {
    purchaseFactory.showPurchaseModal({});

    expect($modal.open).to.have.been.called;
  });

  it("should resolve selected plan, attach addresses and clean contact info", function(done) {
    var plan = { name: "PlanA"};
    purchaseFactory.showPurchaseModal(plan, true);
    
    setTimeout(function() {
      expect(resolveObj).to.be.ok;

      expect(resolveObj.name).to.equal("PlanA");
      expect(resolveObj.isMonthly).to.be.true;
      expect(resolveObj.billingAddress).to.equal("userCompany");
      expect(resolveObj.shippingAddress).to.equal("selectedCompany");
      expect(resolveObj.contact).to.be.an("object");
      expect(resolveObj.contact).to.have.property("username");
      expect(resolveObj.contact).to.not.have.property("uselessProperty");

      expect(resolveObj).to.not.equal(plan);
      
      done();
    }, 10);
  });

});
