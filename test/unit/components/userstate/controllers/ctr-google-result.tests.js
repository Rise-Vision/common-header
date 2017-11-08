"use strict";
describe("controller: Google Result", function() {
  beforeEach(module("risevision.common.components.userstate"));
  beforeEach(module(function ($provide) {
    $provide.service("urlStateService", function() {
      return urlStateService = {
        redirectToState: sinon.spy()
      };
    });
    $provide.value("$stateParams", $stateParams = {
      state: "currentState",
      access_token: "token"
    });
    $provide.service("userState", function() {
      return userState = {
        _restoreState: function() {},
        _setUserToken: sinon.spy()
      };
    });

  }));
  var userState, urlStateService, $stateParams;

  describe("existing state: ", function() {
    beforeEach(function () {
      inject(function($injector, $rootScope, $controller){
        $controller("GoogleResultCtrl");
        
        $rootScope.$digest();
      });
    });

    it("should restore state and redirect", function() {
      userState._setUserToken.should.have.been.calledWith({
        state: "currentState",
        access_token: "token"
      });

      urlStateService.redirectToState.should.have.been.calledWith("currentState");
    });
    
  });

  describe("blank state: ", function() {
    beforeEach(function () {
      inject(function($injector, $rootScope, $controller){
        delete $stateParams.state;

        $controller("GoogleResultCtrl");
        
        $rootScope.$digest();
      });
    });

    it("should redirect", function() {
      userState._setUserToken.should.have.been.calledWith({
        access_token: "token"
      });

      urlStateService.redirectToState.should.have.been.called;
    });
    
  });

  describe("no access_token: ", function() {
    beforeEach(function () {
      inject(function($injector, $rootScope, $controller){
        delete $stateParams.access_token;

        $controller("GoogleResultCtrl");
        
        $rootScope.$digest();
      });
    });

    it("should not redirect", function() {
      userState._setUserToken.should.not.have.been.called;

      urlStateService.redirectToState.should.not.have.been.called;
    });
    
  });

});
