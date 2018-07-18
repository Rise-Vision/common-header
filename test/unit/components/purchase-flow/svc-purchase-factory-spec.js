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

  it("should resolve selected plan", function(done) {
    var plan = { name: "PlanA"};
    purchaseFactory.showPurchaseModal(plan, true);
    
    setTimeout(function() {
      expect(resolveObj).to.be.ok;
      expect(resolveObj).to.deep.equal({
        name: "PlanA",
        isMonthly: true
      });
      expect(resolveObj).to.not.equal(plan);
      
      done();
    }, 10);
  });

});
