"use strict";

describe("filter: cardLastFour", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  var cardLastFour;
  beforeEach(function(){
    inject(function($filter){
      cardLastFour = $filter("cardLastFour");
    });
  });

  it("should exist",function(){
    expect(cardLastFour).to.be.ok;
  });

  it("should format last 4 digits", function() {
    expect(cardLastFour(4242)).to.equal("***-4242");
  });

});
