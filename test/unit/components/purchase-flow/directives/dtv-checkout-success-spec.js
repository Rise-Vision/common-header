"use strict";

describe("directive: checkout success", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));

  var $scope, element;

  beforeEach(inject(function($compile, $rootScope, $templateCache){
    $templateCache.put("purchase-flow/checkout-success.html", "<p>mock</p>");
    $scope = $rootScope.$new();

    element = $compile("<checkout-success></checkout-success>")($scope);
  }));

  it("should replace the element with the appropriate content", function() {
    expect(element.html()).to.equal("<p>mock</p>");
  });

});
