/*jshint expr:true */
"use strict";

describe("Services: validate address", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
    $provide.service("$q", function() {return Q;});
    $provide.service("storeAPILoader",function () {
      return function(){
        var deferred = Q.defer();
                
        deferred.resolve({
          company: {
            validateAddress: function(obj){
              expect(obj).to.not.have.property("junkProperty");

              return Q.resolve(response);
            }
          }
        });
        return deferred.promise;
      };
    });

  }));
  var validateAddress, addressObject, response;
  beforeEach(function() {
    response = {
      result: {
        code: 1
      }
    };
    addressObject = {
      street: "street",
      unit: "unit",
      city: "city",
      province: "province",
      country: "country",
      postalCode: "postalCode",
      junkProperty: "junkValue"
    };
    
    inject(function($injector){
      validateAddress = $injector.get("validateAddress");
    });
  });

  it("should exist", function() {
    expect(validateAddress).to.be.truely;
    expect(validateAddress).to.be.a("function");
  });
  
  it("should return a promise", function() {
    expect(validateAddress(addressObject).then).to.be.a("function");
  });

  it("should resolve if code is not -1", function(done) {
    validateAddress(addressObject)
    .then(function(result) {
      expect(result).to.be.ok;
      
      done();
    })
    .then(null,done);
  });
  
  it("should reject if code is -1", function(done) {
    response.result.code = -1;

    validateAddress(addressObject)
    .then(function(result) {
      done(result);
    })
    .then(null, function(error) {
      expect(error).to.be.ok;

      done();
    })
    .then(null,done);
  });

  it("should return response if response.result doesn't exist", function(done) {
    response = response.result;

    validateAddress(addressObject)
    .then(function(result) {
      expect(result).to.be.ok;
      
      done();
    })
    .then(null,done);
  });

});
