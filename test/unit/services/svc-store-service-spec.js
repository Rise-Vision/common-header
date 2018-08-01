"use strict";

describe("Services: storeService", function() {
  var storeService;
  var storeApiFailure;

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
});
