"use strict";

describe("directive: payment methods", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));

  var $scope, element;

  beforeEach(inject(function($compile, $rootScope, $templateCache){
    $templateCache.put("purchase-flow/checkout-payment-methods.html", "<p>mock</p>");
    $scope = $rootScope.$new();

    element = $compile("<payment-methods></payment-methods>")($scope);
  }));

  it("should replace the element with the appropriate content", function() {
    expect(element.html()).to.equal("<p>mock</p>");
  });

  it("should initialize scope", function() {
    expect($scope).to.be.an("object");
    expect($scope.getCardDescription).to.be.a("function");
    expect($scope.getPaddedMonth).to.be.a("function");
  });

  it("getCardDescription: ", function() {
    var card = {
      last4: "2345",
      cardType: "Visa",
      isDefault: false
    };

    expect($scope.getCardDescription(card)).to.equal("***-2345, Visa");

    card.isDefault = true;

    expect($scope.getCardDescription(card)).to.equal("***-2345, Visa (default)");
  });

  it("getPaddedMonth: ", function() {
    expect($scope.getPaddedMonth(1)).to.equal("01");
    expect($scope.getPaddedMonth(12)).to.equal(12);
  });
});
