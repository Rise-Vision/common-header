"use strict";

describe("controller: billing address", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
    $provide.service("validateAddress", function() {
      return function() {
        
      };
    });
    $provide.value("COUNTRIES", []);
    $provide.value("REGIONS_CA", []);
    $provide.value("REGIONS_US", []);
  }));

  var $scope, element;

  beforeEach(inject(function($compile, $rootScope, $templateCache){
    $templateCache.put("purchase-flow/checkout-billing-address.html", "<p>mock</p>");
    $scope = $rootScope.$new();
    $scope.plan = {};

    element = $compile("<billing-address></billing-address>")($scope);
  }));

  it("should replace the element with the appropriate content", function() {
    expect(element.html()).to.equal("<p>mock</p>");
  });

  it("should exist", function() {
    expect($scope.countries).to.be.ok;
    expect($scope.regionsCA).to.be.ok;
    expect($scope.regionsUS).to.be.ok;

    expect($scope.isFieldInvalid).to.be.a("function");
  });

  describe("isFieldInvalid: ", function() {
    beforeEach(function() {
      $scope.form = {
        billingAddressForm: {
          field1: {
            $dirty: true,
            $invalid: true
          },
          $submitted: true
        }
      };
      
    });
    it("should return true if invalid, submitted and dirty", function() {
      expect($scope.isFieldInvalid("field1")).to.equal.false;
    });

    it("should return true if not submitted or drity", function() {
      $scope.form.billingAddressForm.$submitted = false;
      $scope.form.billingAddressForm.field1.$dirty = false;

      expect($scope.isFieldInvalid("field1")).to.equal.true;
    });

    it("should return false if submitted but not dirty", function() {
      $scope.form.billingAddressForm.$submitted = true;
      $scope.form.billingAddressForm.field1.$dirty = false;

      expect($scope.isFieldInvalid("field1")).to.equal.false;
    });

    it("should return false if not submitted but dirty", function() {
      $scope.form.billingAddressForm.$submitted = false;
      $scope.form.billingAddressForm.field1.$dirty = true;

      expect($scope.isFieldInvalid("field1")).to.equal.false;
    });

    it("should return false if valid", function() {
      $scope.form.billingAddressForm.field1.$invalid = false;

      expect($scope.isFieldInvalid("field1")).to.equal.false;
    });

  });
});
