/*jshint expr:true */

"use strict";

describe("Services: googleAuthFactory", function() {
  var path = "";

  beforeEach(module("risevision.common.components.userstate"));

  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("$location", {
      search: function () {
        return {};
      },
      path: sinon.spy(function () {
        return path;
      }),
      protocol: function () {
        return "protocol";
      },
      url: function() {
        return "";
      },
      $$html5: true
    });
    $provide.value("$stateParams", {
      state: "someState"
    });
    $provide.service("getBaseDomain", function() {
      return function() {
        return "domain";
      };
    });
    $provide.factory("$http", function () {
      return $http = {
        get: sinon.spy(function() {
          return Q.resolve({data:{email:"a@b.ca"}});
        })
      };
    });
    $provide.service("userState", function() {
      return userState = {
        _state: {
          inRVAFrame: inRVAFrame,
          userToken: {
            email: "username@test.com"
          },
          params: {
            access_token: "testToken"
          }
        },
        refreshProfile: sinon.spy(function() { return Q.resolve(); }),
        _setUserToken: sinon.spy(),
        _persistState: sinon.spy(),
        _restoreState: sinon.spy()
      };
    });
    $provide.service("gapiLoader", function () {
      return gapiLoader = sinon.spy(function() {
        return Q.resolve({
          auth: gapiAuth = {
            authorize: sinon.spy(function() {
              if (authorizeResponse) {
                return Q.resolve(authorizeResponse);
              } else {
                return Q.reject();
              }
            }),
            setToken: sinon.spy()
          }
        });
      });
    });
    $provide.service("getOAuthUserInfo", function() {
      return function() {
        var deferred = Q.defer();
        if (failOAuthUser) {
          deferred.reject("oauth failure");
        } else {
          deferred.resolve({
            email: "someuser@awesome.io"
          });
        }
        
        return deferred.promise;
      };
    });
    $provide.value("$rootScope", $rootScope = {
      redirectToRoot: true,
      $on: function() {},
      $broadcast: function() {}
    });
    $provide.service("urlStateService", function() {
      return {
        clearStatePath: function() {
          return "clearedPath";
        }
      };
    });
  }));
  
  var googleAuthFactory, userState, $http, $window, $rootScope, 
    inRVAFrame, authorizeResponse, gapiLoader, gapiAuth, failOAuthUser;
  
  describe("authenticate: ", function() {
    beforeEach(function() {
      authorizeResponse = true;
      failOAuthUser = false;
      inRVAFrame = true;

      inject(function($injector){
        $window = $injector.get("$window");
        googleAuthFactory = $injector.get("googleAuthFactory");
      });
    });

    it("should exist, return a promise", function() {
      expect(googleAuthFactory.authenticate).to.be.ok;
      expect(googleAuthFactory.authenticate).to.be.a("function");

      expect(googleAuthFactory.authenticate().then).to.be.a("function");
    });

    it("should load gapi and attempt to authorize user", function(done) {
      googleAuthFactory.authenticate();
      
      setTimeout(function() {
        gapiLoader.should.have.been.called;
        gapiAuth.authorize.should.have.been.called;

        done();
      }, 10);
    });
    
    it("should authorize with the default options", function(done) {
      googleAuthFactory.authenticate();
      
      setTimeout(function() {
        gapiAuth.authorize.should.have.been.calledWith({
          "client_id":"614513768474.apps.googleusercontent.com",
          "scope":"https://www.googleapis.com/auth/userinfo.email",
          "cookie_policy":"protocol://domain",
          "authuser":"username@test.com",
          "immediate":true
        });

        done();
      }, 10);
    });

    it("should authorize even if authUser is missing", function(done) {
      userState._state.userToken = undefined;
      googleAuthFactory.authenticate();
      
      setTimeout(function() {
        gapiAuth.authorize.should.have.been.calledWith({
          "client_id":"614513768474.apps.googleusercontent.com",
          "scope":"https://www.googleapis.com/auth/userinfo.email",
          "cookie_policy":"protocol://domain",
          "authuser": undefined,
          "immediate":true
        });

        done();
      }, 10);
    });

    it("should authorize with popup via select_account", function(done) {
      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        gapiAuth.authorize.should.have.been.calledWith({
          "client_id":"614513768474.apps.googleusercontent.com",
          "scope":"https://www.googleapis.com/auth/userinfo.email",
          "cookie_policy":"protocol://domain",
          "authuser":"username@test.com",
          "prompt":"select_account"
        });

        done();
      }, 10);
    });
    
    it("should authorize with popup via select_account if in iframe", function(done) {
      inRVAFrame = false;
      $window.self = 1;
      $window.top = 0;
      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        gapiAuth.authorize.should.have.been.calledWith({
          "client_id":"614513768474.apps.googleusercontent.com",
          "scope":"https://www.googleapis.com/auth/userinfo.email",
          "cookie_policy":"protocol://domain",
          "authuser":"username@test.com",
          "prompt":"select_account"
        });

        done();
      }, 10);
    });

    it("should load selected account via $http request", function(done) {
      userState._state.userToken = "dummy";
      googleAuthFactory.authenticate();
      
      setTimeout(function() {
        $http.get.should.have.been.calledWith("https://www.googleapis.com/oauth2/v1/userinfo?access_token=testToken");

        gapiAuth.authorize.should.have.been.calledWith({
          "client_id":"614513768474.apps.googleusercontent.com",
          "scope":"https://www.googleapis.com/auth/userinfo.email",
          "cookie_policy":"protocol://domain",
          "authuser":"a@b.ca",
          "immediate":true
        });

        done();
      }, 10);
    });

    it("should handle failure to retrieve oauthUserInfo", function(done) {
      failOAuthUser = true;

      googleAuthFactory.authenticate().then(function(resp) {
        done(resp);
      })
      .then(null, function(error) {
        expect(error).to.equal("oauth failure");
        done();
      })
      .then(null,done);
    });

    it("should retrieve oauthUserInfo correctly", function(done) {
      googleAuthFactory.authenticate().then(function(resp) {
        expect(resp).to.deep.equal({ email: "someuser@awesome.io" });

        done();
      })
      .then(null,done);
    });
  });
  
  describe("authenticateRedirect: ", function() {
    beforeEach(module(function ($provide) {
      $provide.value("$window", {
        location: {
          href: "http://localhost:8000/editor/list?cid=companyId#somehash",
          origin: "http://localhost:8000",
          pathname: "/editor/list",
          search: "?cid=companyId",
          hash: ""
        }
      });
    }));
    beforeEach(function() {
      inRVAFrame = false;

      inject(function($injector){
        $window = $injector.get("$window");
        googleAuthFactory = $injector.get("googleAuthFactory");
      });
    });

    it("should not redirect if forceAuth is false", function(done) {
      googleAuthFactory.authenticate().then(function(resp) {
        expect($window.location.href).to.equal("http://localhost:8000/editor/list?cid=companyId#somehash");
        expect(resp).to.deep.equal({ email: "someuser@awesome.io" });

        done();
      })
      .then(null,done);
    });

    it("should redirect to the google auth page", function(done) {
      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        expect($window.location.href).to.equal("https://accounts.google.com/o/oauth2/auth" +
          "?response_type=token" +
          "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email" +
          "&client_id=614513768474.apps.googleusercontent.com" +
          "&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F" + 
          "&prompt=select_account" +
          "&state=someState"
        );

        done();
      }, 10);
    });

    it("should redirect to a specific path and strip params", function(done) {
      $rootScope.redirectToRoot = false;

      googleAuthFactory.authenticate(true);
      
      setTimeout(function() {
        expect($window.location.href).to.equal("https://accounts.google.com/o/oauth2/auth" +
          "?response_type=token" +
          "&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email" +
          "&client_id=614513768474.apps.googleusercontent.com" +
          "&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Feditor%2Flist%3Fcid%3DcompanyId" + 
          "&prompt=select_account" +
          "&state=clearedPath"
        );

        done();
      }, 10);
    });

  });

});
