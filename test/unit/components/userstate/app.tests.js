"use strict";

describe("app:", function() {
  beforeEach(function () {
    module("risevision.common.components.userstate");

    inject(function ($injector) {
      $state = $injector.get("$state");
      $rootScope = $injector.get("$rootScope");
      urlStateService = $injector.get("urlStateService");
      
      sinon.stub(urlStateService, "redirectToState");
    });
  });

  var $state, $rootScope, $templateCache, urlStateService;

  describe("states: ", function() {

    it("common.googleresult", function() {
      var state = $state.get("common.googleresult");
      expect(state).to.be.ok;
      expect(state.url).to.equal("/state=:state&access_token=:access_token&token_type=:token_type&expires_in=:expires_in");
      expect(state.controller).to.equal("GoogleResultCtrl");
    });
    
    it("common.googleresult2", function() {
      var state = $state.get("common.googleresult2");
      expect(state).to.be.ok;
      expect(state.url).to.equal("/access_token=:access_token&token_type=:token_type&expires_in=:expires_in");
      expect(state.controller).to.equal("GoogleResultCtrl");
    });
    
    it("common.auth.unauthorized", function() {
      var state = $state.get("common.auth.unauthorized");
      expect(state).to.be.ok;
      expect(state.url).to.equal("/unauthorized/:state");
      expect(state.controller).to.equal("LoginCtrl");
    });
    
    it("common.auth.createaccount", function() {
      var state = $state.get("common.auth.createaccount");
      expect(state).to.be.ok;
      expect(state.url).to.equal("/createaccount/:state");
      expect(state.controller).to.equal("LoginCtrl");
    });
  });

  describe("listeners: ", function() {
    it("should register", function() {
      expect($rootScope.$$listeners["risevision.user.authorized"]).to.be.ok;
      expect($rootScope.$$listeners["$stateChangeStart"]).to.be.ok;
    });

    describe("common.auth.unauthorized", function() {
      it("should restore previous state after authentication", function() {
        $state.go("common.auth.unauthorized", {
          state: "stateString"
        });
        
        $rootScope.$digest();
        
        expect($state.current.name).to.equal("common.auth.unauthorized");

        $rootScope.$broadcast("risevision.user.authorized");
        
        $rootScope.$digest();
        
        urlStateService.redirectToState.should.have.been.calledWith("stateString");
      });
      
      it("should go to blank state after authentication", function() {
        $state.go("common.auth.unauthorized", {});
        
        $rootScope.$digest();
        
        expect($state.current.name).to.equal("common.auth.unauthorized");

        $rootScope.$broadcast("risevision.user.authorized");
        
        $rootScope.$digest();
        
        urlStateService.redirectToState.should.have.been.called;
      });      
    });

    describe("$stateChangeStart", function() {
      beforeEach(function() {
        sinon.stub($state, "go");
      });

      it("should not redirect for null state", function() {
        $rootScope.$broadcast("$stateChangeStart", {});
        
        $rootScope.$digest();
        
        $state.go.should.not.have.been.called;
      });

      it("should not redirect for random state", function() {
        $rootScope.$broadcast("$stateChangeStart", {
          name: "common.auth.randomState"
        });
        
        $rootScope.$digest();
        
        $state.go.should.not.have.been.called;
      });

      it("should redirect and use existing state variable", function() {
        $rootScope.$broadcast("$stateChangeStart", {
          name: "common.auth.unauthorized"
        }, {}, null, {
          state: "existingState"
        });
        
        $rootScope.$digest();
        
        $state.go.should.have.been.calledWith("common.auth.unauthorized", {
          state: "existingState"
        });
      });
      
      it("should not redirect if state variable exists", function() {
        $rootScope.$broadcast("$stateChangeStart", {
          name: "common.auth.unauthorized"
        }, {
          state: "existingState"
        }, null, {});
        
        $rootScope.$digest();
        
        $state.go.should.not.have.been.called;
      });

      it("should not redirect if existing state isn't there", function() {
        $rootScope.$broadcast("$stateChangeStart", {
          name: "common.auth.unregistered"
        }, {}, null, {});

        $rootScope.$digest();
        
        $state.go.should.not.have.been.called;
      });      

      it("should redirect for unregistered state", function() {
        $rootScope.$broadcast("$stateChangeStart", {
          name: "common.auth.unregistered"
        }, {}, null, {
          state: "existingState"
        });
        
        $rootScope.$digest();
        
        $state.go.should.have.been.calledWith("common.auth.unregistered", {
          state: "existingState"
        });
      });

      it("should redirect for createaccount state", function() {
        $rootScope.$broadcast("$stateChangeStart", {
          name: "common.auth.createaccount"
        }, {}, null, {
          state: "existingState"
        });
        
        $rootScope.$digest();
        
        $state.go.should.have.been.calledWith("common.auth.createaccount", {
          state: "existingState"
        });
      });

    });
  });
    
  
});
