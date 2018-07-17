"use strict";

describe("controller: review subscription", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));

  var $scope, element;

  beforeEach(inject(function($compile, $rootScope, $templateCache){
    $templateCache.put("purchase-flow/checkout-review-subscription.html", "<p>mock</p>");
    $scope = $rootScope.$new();

    element = $compile("<review-subscription></review-subscription>")($scope);
  }));

  it("should replace the element with the appropriate content", function() {
    expect(element.html()).to.equal("<p>mock</p>");
  });

  it("should exist", function() {
    expect($scope.incrementLicenses).to.be.a("function");
    expect($scope.decrementLicenses).to.be.a("function");
    expect($scope.getMonthlyPrice).to.be.a("function");
    expect($scope.getYearlyPrice).to.be.a("function");
  });

  it("incrementLicenses: ", function() {
    $scope.plan = {
      additionalDisplayLicenses: 0
    };

    $scope.incrementLicenses();

    expect($scope.plan.additionalDisplayLicenses).to.equal(1);
  });

  it("decrementLicenses: ", function() {
    $scope.plan = {
      additionalDisplayLicenses: 2
    };

    $scope.decrementLicenses();

    expect($scope.plan.additionalDisplayLicenses).to.equal(1);
  });

  it("getMonthlyPrice: ", function() {
    $scope.plan = {
      monthly: {
        billAmount: 10,
        priceDisplayMonth: 3
      },
      additionalDisplayLicenses: 2
    };

    expect($scope.getMonthlyPrice()).to.equal(16);
  });

  it("getYearlyPrice: ", function() {
    $scope.plan = {
      yearly: {
        billAmount: 100,
        priceDisplayMonth: 3
      },
      additionalDisplayLicenses: 2
    };

    expect($scope.getYearlyPrice()).to.equal(172);
  });

});
