/*jshint expr:true */
"use strict";

describe("Services: address factory", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
    $provide.service("$q", function() {return Q;});
    $provide.service("$log", function() {
      return {
        error: sinon.stub(),
        debug: sinon.stub()
      };
    });
    $provide.service("storeService", function() {
      return storeService = {
        validateAddress: sinon.spy(function(obj) {
          if (obj.resolve) {
            return Q.resolve(obj.resolve);
          } else {
            return Q.reject(obj.reject);
          }
        })
      };
    });
  }));

  var $log, addressObject, addressFactory, storeService;

  beforeEach(function() {
    addressObject = {
      street: "street",
      unit: "unit",
      city: "city",
      province: "province",
      country: "CA",
      postalCode: "postalCode"
    };

    inject(function($injector) {
      $log = $injector.get("$log");
      addressFactory = $injector.get("addressFactory");
    });
  });

  it("should exist", function() {
    expect(addressFactory).to.be.ok;
    expect(addressFactory.validateAddress).to.be.a("function");
  });

  it("should reset validationError to false", function() {
    addressFactory.validateAddress(addressObject);

    expect(addressObject.validationError).to.be.false;
  });

  it("should resolve and skip validation if Country is not US/CA", function(done) {
    addressObject.resolve = false;
    addressObject.country = "BR";
    
    addressFactory.validateAddress(addressObject)
      .then(function() {
        expect(addressObject.validationError).to.be.false;
        storeService.validateAddress.should.not.have.been.called;
        $log.debug.should.have.been.called;

        done();
      })
      .then(null, done);
  });

  it("should resolve if validation passes for CA", function(done) {
    addressObject.resolve = true;

    addressFactory.validateAddress(addressObject)
      .then(function() {
        expect(addressObject.validationError).to.be.false;
        storeService.validateAddress.should.have.been.called;

        done();
      })
      .then(null, done);
  });

  it("should resolve if validation passes for US", function(done) {
    addressObject.resolve = true;
    addressObject.country = "US";

    addressFactory.validateAddress(addressObject)
      .then(function() {
        expect(addressObject.validationError).to.be.false;
        storeService.validateAddress.should.have.been.called;

        done();
      })
      .then(null, done);
  });

  it("should not log error if addresses match", function(done) {
    addressObject.resolve = {
      line1: "street",
      line2: "unit",
      city: "city",
      region: "province",
      country: "CA",
      postalCode: "postalCode"
    };

    addressFactory.validateAddress(addressObject)
      .then(function() {
        $log.error.should.not.have.been.called;
        expect(addressObject.validationError).to.be.false;

        done();
      })
      .then(null, done);
  });

  it("should log error if addresses do not match", function(done) {
    addressObject.resolve = {
      line1: "street1",
      line2: "unit1",
      city: "city1",
      region: "province1",
      country: "US",
      postalCode: "postalCode1"
    };

    addressFactory.validateAddress(addressObject)
      .then(function() {
        $log.error.should.have.been.called;
        expect(addressObject.validationError).to.be.false;

        done();
      })
      .then(null, done);
  });

  it("should reject with a message", function(done) {
    addressObject.reject = {
      message: "Validation Message"
    };

    addressFactory.validateAddress(addressObject)
      .then(function() {
        expect(addressObject.validationError).to.equal("Validation Message");

        done();
      })
      .then(null, done);
  });

  it("should reject with a generic message if none provided", function(done) {
    addressObject.reject = {};

    addressFactory.validateAddress(addressObject)
      .then(function() {
        expect(addressObject.validationError).to.equal("Unknown Error");

        done();
      })
      .then(null, done);
  });


});
