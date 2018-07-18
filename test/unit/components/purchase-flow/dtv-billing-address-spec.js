"use strict";

describe("controller: billing address", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
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
  });

});
