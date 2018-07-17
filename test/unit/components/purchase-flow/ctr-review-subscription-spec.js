"use strict";

describe("controller: review subscription", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));

  var $scope;

  beforeEach(function() {
    inject(function($injector, $rootScope, $controller) {
      $scope = $rootScope.$new();

      $controller("ReviewSubcriptionCtrl", {
        $scope: $scope,
      });

      $scope.$digest();
    });
  });

  it("should exist", function() {
    expect($scope.init).to.be.a("function");
    expect($scope.incrementLicenses).to.be.a("function");
    expect($scope.decrementLicenses).to.be.a("function");
    expect($scope.getMonthlyPrice).to.be.a("function");
    expect($scope.getYearlyPrice).to.be.a("function");
  });

  it("should initialize",function() {
    expect($scope.plan).to.not.be.ok;

    $scope.init({
      name: "PlanA",
      additionalDisplayLicenses: 0
    });

    expect($scope.plan).to.be.a("object");
  });

  it("incrementLicenses: ", function() {
    $scope.init({
      additionalDisplayLicenses: 0
    });

    $scope.incrementLicenses();

    expect($scope.plan.additionalDisplayLicenses).to.equal(1);
  });

  it("decrementLicenses: ", function() {
    $scope.init({
      additionalDisplayLicenses: 2
    });

    $scope.decrementLicenses();

    expect($scope.plan.additionalDisplayLicenses).to.equal(1);
  });

  it("getMonthlyPrice: ", function() {
    $scope.init({
      monthly: {
        billAmount: 10,
        priceDisplayMonth: 3
      },
      additionalDisplayLicenses: 2
    });

    expect($scope.getMonthlyPrice()).to.equal(16);
  });

  it("getYearlyPrice: ", function() {
    $scope.init({
      yearly: {
        billAmount: 100,
        priceDisplayMonth: 3
      },
      additionalDisplayLicenses: 2
    });

    expect($scope.getYearlyPrice()).to.equal(172);
  });

});
