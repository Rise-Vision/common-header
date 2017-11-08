/*jshint expr:true */
"use strict";

describe("Services: subscriptionStatusService", function() {

  beforeEach(module("risevision.common.components.subscription-status.service"));

  beforeEach(module(function ($provide) {
    $provide.service("$q", function() {return Q;});
  }));

  it("should exist", function(done) {
    inject(function(subscriptionStatusService) {
      expect(subscriptionStatusService).be.defined;

      done();
    });
  });

  it("should call product status api", function(done) {
    inject(function(subscriptionStatusService) {
      subscriptionStatusService.get("1", "12345").then(function(data){
        expect(data).be.defined;
        expect(data.status).be.equal("Free");
        expect(data.subscribed).be.equal(true);

        done();
      });
    });
  });

  it("should fail if company is invalid", function(done) {
    inject(function(subscriptionStatusService) {
      subscriptionStatusService.get("1", "invalid").then(function(){
        done();
      },
      function(error) {
        expect(error).be.equal("No response");
        done();
      });
    });
  });

  it("should return expired product", function(done) {
    inject(function(subscriptionStatusService) {
      subscriptionStatusService.get("2", "12345").then(function(data){
        expect(data).be.defined;
        expect(data.status).be.equal("Trial Expired");
        expect(data.subscribed).be.equal(false);

        done();
      });
    });
  });

  it("should return active subscription for cancelled product", function(done) {
    inject(function(subscriptionStatusService) {
      subscriptionStatusService.get("3", "12345").then(function(data){
        expect(data).be.defined;
        expect(data.status).be.equal("Cancelled");
        expect(data.subscribed).be.equal(true);

        done();
      });
    });
  });

});
