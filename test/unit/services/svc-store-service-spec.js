"use strict";

describe("Services: storeService", function() {
  var storeService;
  var storeApiFailure;
  var addressObject, response;

  beforeEach(module("risevision.store.services"));

  beforeEach(module(function ($provide) {
    storeApiFailure = false;
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.service("storeAPILoader", function () {
      return function() {
        var deferred = Q.defer();

        var storeApiResponse = function() {
          if (storeApiFailure) {
            return Q.reject({
              error: "some error"
            });
          }
          else {
            return Q.resolve({
              result: {
                result: "{}"
              },
              item: {}
            });
          }
        };

        deferred.resolve({
          customer_portal: {
            getUrl: storeApiResponse,
            createSession: storeApiResponse
          },
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

  beforeEach(function() {
    inject(function($injector){
      storeService = $injector.get("storeService");
    });
  });

  describe("createSession: ", function() {
    it("should exist", function() {
      expect(storeService.createSession).to.be.ok;
      expect(storeService.createSession).to.be.a("function");
    });

    it("should succeed", function(done) {
      storeService.createSession().then(function() {
        done();
      })
      .then(null, done);
    });

    it("should fail", function(done) {
      storeApiFailure = true;
      storeService.createSession().then(function() {
        done("success");
      }, function() {
        done();
      });
    });
  });
  
  describe("validateAddress: ", function() {
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
    });

    it("should exist", function() {
      expect(storeService.validateAddress).to.be.ok;
      expect(storeService.validateAddress).to.be.a("function");
    });
    
    it("should return a promise", function() {
      expect(storeService.validateAddress(addressObject).then).to.be.a("function");
    });

    it("should resolve if code is not -1", function(done) {
      storeService.validateAddress(addressObject)
      .then(function(result) {
        expect(result).to.be.ok;
        
        done();
      })
      .then(null,done);
    });
    
    it("should reject if code is -1", function(done) {
      response.result.code = -1;

      storeService.validateAddress(addressObject)
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

      storeService.validateAddress(addressObject)
      .then(function(result) {
        expect(result).to.be.ok;
        
        done();
      })
      .then(null,done);
    });

  });
});
