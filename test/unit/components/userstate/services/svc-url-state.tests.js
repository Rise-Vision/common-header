/*jshint expr:true */

"use strict";

describe("Services: urlStateService", function() {
  beforeEach(module("risevision.common.components.userstate"));

  beforeEach(module(function ($provide) {
    //stub services
    $provide.value("$window", $window = {
      location: {
        pathname: "/path",
        search: "?search",
        hash: "#hash",
        replace: sinon.spy()
      }
    });
    $provide.value("$location", $location = {
      replace: sinon.spy(),
      url: sinon.spy(),
      $$html5: true
    });
    $provide.service("userState", function() {
      return userState = {
        _persistState: sinon.spy(),
        _restoreState: function() {}
      };
    });
  }));
  
  var urlStateService, userState, $window, $location;
  
  beforeEach(function() {
    inject(function($injector){
      urlStateService = $injector.get("urlStateService");
    });
  });

  it("should exist", function() {
    expect(urlStateService).to.be.ok;
    expect(urlStateService.get).to.be.a("function");
    expect(urlStateService.redirectToState).to.be.a("function");
    expect(urlStateService.clearStatePath).to.be.a("function");
  });

  it("get: ", function() {
    expect(urlStateService.get()).to.equal(encodeURIComponent("{\"p\":\"path\",\"u\":\"#hash\",\"s\":\"?search\"}"));
  });

  describe("redirectToState: ", function() {
    describe("html5 mode: ", function() {
      it("should set the URL", function() {
        urlStateService.redirectToState(encodeURIComponent("{\"p\":\"path\",\"u\":\"\",\"s\":\"?search\"}"));
        
        $location.url.should.have.been.calledWith("path?search");
        $location.replace.should.have.been.called;
      });

      it("should use root if path is missing", function() {
        urlStateService.redirectToState(encodeURIComponent("{\"p\":\"\",\"u\":\"\",\"s\":\"?search\"}"));
        
        $location.url.should.have.been.calledWith("/?search");
        $location.replace.should.have.been.called;
      });
    });
    
    describe("non html5 mode: ", function() {
      it("should persist state and redirect if path is given", function() {
        urlStateService.redirectToState(encodeURIComponent("{\"p\":\"path\",\"u\":\"#hash\",\"s\":\"?search\"}"));
        
        userState._persistState.should.have.been.called;
        $window.location.replace.should.have.been.calledWith("path?search#hash");
      });

      it("should just set hash", function() {
        urlStateService.redirectToState(encodeURIComponent("{\"p\":\"\",\"u\":\"#newHash\",\"s\":\"\"}"));
        
        expect($window.location.hash).to.equal("#newHash");
      });

      it("should check for html5 mode", function() {
        $location.$$html5 = false;

        urlStateService.redirectToState(encodeURIComponent("{\"p\":\"\",\"u\":\"\",\"s\":\"\"}"));

        expect($window.location.hash).to.equal("");
      });  
    });
  });

  it("clearStatePath: ", function() {
    expect(urlStateService.clearStatePath(encodeURIComponent("{\"p\":\"path\",\"u\":\"hash\",\"s\":\"?search\"}"))).to.equal(encodeURIComponent("{\"u\":\"hash\"}"));
  });
});
