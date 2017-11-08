/* jshint expr:true */
"use strict";

describe("Services: gapi loader", function() {

  beforeEach(module("risevision.common.gapi"));
  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("CORE_URL", "");
    $provide.value("MONITORING_SERVICE_URL", "");
    $provide.value("STORAGE_ENDPOINT_URL", "");
    window.gapiSrc = "test/unit/gapi-loader/gapi-mock.js";
  }));
  
  beforeEach(function () {
    inject(function($injector) {
      var $window = $injector.get("$window");

      $window.gapi = $window.gapi || {};

      $window.gapi.client = {
        load: function(path, version, cb) {
          window.gapi.client[path] = {version: version};
          cb();
        }
      };
      
      $window.handleClientJSLoad();
    });
  });

  describe("gapiLoader", function () {
    it("should load gapi", function(done) {
      inject(function (gapiLoader) {
        expect(gapiLoader).be.defined;
        gapiLoader().then(function () {
          done();
        });
      });
    });
  });

  describe("gapiClientLoaderGenerator", function () {

    it("should load a gapi client lib", function (done) {
      inject(function (gapiClientLoaderGenerator, $window) {
        expect(gapiClientLoaderGenerator).be.defined;
        var loaderFn = gapiClientLoaderGenerator("custom", "v0");
        loaderFn().then(function () {
          expect($window.gapi).to.be.defined;
          expect($window.gapi.custom).to.be.defined;
          done();
        }, done);
      });
    });
  });

  describe("oauth2APILoader", function () {
    it("should load", function(done) {
      inject(function (oauth2APILoader, $window) {
        expect(oauth2APILoader).be.defined;
        oauth2APILoader().then(function () {
          expect($window.gapi.client.oauth2).to.be.defined;
          done();
        }, done);
      });
    });
  });

  describe("coreAPILoader", function () {
    it("should load", function(done) {
      inject(function (coreAPILoader, $window) {
        expect(coreAPILoader).be.defined;
        coreAPILoader().then(function () {
          expect($window.gapi.client.core).to.be.defined;
          done();
        }, done);
      });
    });
  });

  describe("riseAPILoader", function () {
    it("should load", function(done) {
      inject(function (riseAPILoader, $window) {
        expect(done).be.defined;
        riseAPILoader().then(function () {
          expect($window.gapi.client.rise).to.be.defined;
          done();
        }, done);
      });
    });
  });
  
  describe("storageAPILoader", function () {
    it("should load", function(done) {
      inject(function (storageAPILoader, $window) {
        expect(done).be.defined;
        storageAPILoader().then(function () {
          expect($window.gapi.client.storage).to.be.defined;
          done();
        }, done);
      });
    });
  });

  describe("discoveryAPILoader", function () {
    it("should load", function(done) {
        inject(function (discoveryAPILoader, $window) {
            expect(done).be.defined;
            discoveryAPILoader().then(function () {
                expect($window.gapi.client.discovery).to.be.defined;
                done();
            })
            .then(null,done);
        });
    });
  });

    describe("monitoringAPILoader", function () {
        it("should load", function(done) {
            inject(function (monitoringAPILoader, $window) {
                expect(done).be.defined;
                monitoringAPILoader().then(function () {
                    expect($window.gapi.client.monitoring).to.be.defined;
                    done();
                }, done);
            });
        });
    });

});
