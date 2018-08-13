"use strict";

describe("directive: review purchase", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));

  beforeEach(module(function ($provide) {
    $provide.value("purchaseFactory", {
      purchase: {
        plan: {}
      }
    });
    $provide.value("userState", {
      getCopyOfSelectedCompany: function() {
        return "selectedCompany";
      }
    });
  }));

  var $scope, element;

  beforeEach(inject(function($compile, $rootScope, $templateCache){
    $templateCache.put("purchase-flow/checkout-review-purchase.html", "<p>mock</p>");
    $scope = $rootScope.$new();

    element = $compile("<review-purchase></review-purchase>")($scope);
  }));

  it("should replace the element with the appropriate content", function() {
    expect(element.html()).to.equal("<p>mock</p>");
  });

  it("should exist", function() {
    expect($scope.purchase).to.be.an("object");
    expect($scope.selectedCompany).to.equal("selectedCompany");

    expect($scope.getPlanPrice).to.be.a("function");
    expect($scope.getAdditionalDisplaysPrice).to.be.a("function");
  });

  describe("getPlanPrice: ", function() {
    it("should return monthly price", function() {
      $scope.purchase.plan = {
        isMonthly: true,
        monthly: {
          billAmount: 10,
        },
        yearly: {
          billAmount: 100
        }
      };

      expect($scope.getPlanPrice()).to.equal(10);
    });

    it("should return yearly price", function() {
      $scope.purchase.plan = {
        isMonthly: false,
        monthly: {
          billAmount: 10,
        },
        yearly: {
          billAmount: 100
        }
      };

      expect($scope.getPlanPrice()).to.equal(100);
    });

  });

  describe("getAdditionalDisplaysPrice: ", function() {
    it("should return monthly price based on license number", function() {
      $scope.purchase.plan = {
        isMonthly: true,
        monthly: {
          priceDisplayMonth: 30
        },
        additionalDisplayLicenses: 2
      };

      expect($scope.getAdditionalDisplaysPrice()).to.equal(60);
    });

    it("should return yearly price based on license number", function() {
      $scope.purchase.plan = {
        isMonthly: false,
        yearly: {
          priceDisplayYear: 100
        },
        additionalDisplayLicenses: 2
      };

      expect($scope.getAdditionalDisplaysPrice()).to.equal(200);
    });
  });

});
