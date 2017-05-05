"use strict";

/*jshint -W030 */
/*global sinon*/

describe("controller: registration modal", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide, $translateProvider) {
    $provide.service("$modalInstance",function(){
      return {
        _dismissed : false,
        _closed: false,
        dismiss : function(reason){
          expect(reason).to.equal("cancel");
          this._dismissed = true;
        },
        close: function(reason) {
          expect(reason).to.equal("success");          
          this._closed = true;
        }
      };
    });
  
    $provide.service("userState", function(){
      return {
        getCopyOfProfile : function(){
          return userProfile;
        },
        getUsername: function() {
          return "e@mail.com";
        },
        _restoreState : function(){
          
        },
        getUserCompanyId : function(){
          return "some_company_id";
        },
        getUserCompanyName: function() {
          return "company_name";
        },
        refreshProfile: function() {
          var deferred = Q.defer();
          
          deferred.resolve({});
          
          return deferred.promise;
        }
      };
    });

    $provide.service("updateCompany",function(){
      return function(companyId, company){
        updateCompanyCalled = company.website;

        var deferred = Q.defer();
        deferred.resolve(company);
        return deferred.promise;
      };
    });
    
    var registrationService = function(calledFrom){
      return function() {
        newUser = calledFrom === "registerAccount";
        var deferred = Q.defer();
        
        if(registerUser){
          deferred.resolve("registered");
        }else{
          deferred.reject("ERROR");
        }
        return deferred.promise;
      };
    };
    
    $provide.service("registerAccount", function(){
      return registrationService("registerAccount");
    });
    $provide.service("agreeToTermsAndUpdateUser", function() {
      return registrationService("agreeToTerms");
    });
    
    $provide.factory("cookieStore", function() {
      return {
        put: function() {
          cookieStored = true;
        },
        remove: function() {
          cookieStored = false;
        }
      };
    });
    $provide.service("segmentAnalytics", function() { 
      return {
        track: function(name) {
          trackerCalled = name;
        },
        load: function() {}
      };
    });

    $provide.service("bigQueryLogging", function() { 
      return {
        logEvent: function(name) {
          bqCalled = name;
        }
      };
    });

    $provide.service("analyticsEvents", function() { 
      return {
        initialize: function() {},
        identify: function() {}
      };
    });

    $provide.factory("customLoader", function ($q) {
      return function () {
        var deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      };
    });

    $translateProvider.useLoader("customLoader");
        
  }));
  var $scope, userProfile, userState, $modalInstance, cookieStored, newUser;
  var registerUser, account, trackerCalled, bqCalled, identifySpy,
    updateCompanyCalled;
  
  beforeEach(function() {
    registerUser = true;
    trackerCalled = undefined;
    bqCalled = undefined;
    userProfile = {
      id : "RV_user_id",
      firstName : "first",
      lastName : "last",
      telephone : "telephone",
      email : "e@mail.com"
    };
    
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get("$modalInstance");
      var analyticsEvents = $injector.get("analyticsEvents");
      identifySpy = sinon.spy(analyticsEvents,"identify");
      userState = $injector.get("userState");
      $controller("RegistrationModalCtrl", {
        $scope : $scope,
        $modalInstance: $modalInstance,
        cookieStore: $injector.get("cookieStore"),
        userState : userState,
        updateCompany: $injector.get("updateCompany"),
        agreeToTermsAndUpdateUser:$injector.get("agreeToTermsAndUpdateUser"),
        registerAccount:$injector.get("registerAccount"),
        account: account
      });
      $scope.$digest();
      $scope.forms = {
        registrationForm: {
          accepted: {},
          firstName: {},
          lastName: {},
          email: {}
        }
      };
    });
  });
  
  it("should initialize",function(){
    expect($scope).to.be.truely;
    expect($scope.profile).to.be.truely;
    
    expect($scope.profile).to.deep.equal({
      email: "e@mail.com",
      firstName: "first",
      lastName: "last",
      mailSyncEnabled: false,
      accepted: false
    });
    
    expect(cookieStored).to.be.false;

    expect($scope.registering).to.be.false;

    expect($scope.closeModal).to.exist;
    expect($scope.save).to.exist;
  });
  
  describe("save new user: ", function() {      
    it("should not save if form is invalid", function() {
      $scope.forms.registrationForm.$invalid = true;
      $scope.save();
      expect($scope.registering).to.be.false;        
    });
    
    it("should register user and close the modal",function(done){
      $scope.forms.registrationForm.$invalid = false;
      $scope.save();
      expect($scope.registering).to.be.true;
      
      var profileSpy = sinon.spy(userState, "refreshProfile");
      setTimeout(function() {
        expect(newUser).to.be.true;
        identifySpy.should.have.been.called;
        expect(trackerCalled).to.equal("User Registered");
        expect(bqCalled).to.equal("User Registered");
        expect(updateCompanyCalled).to.be.undefined;
        expect($scope.registering).to.be.false;
        expect($modalInstance._closed).to.be.true;

        expect(profileSpy.called).to.be.true;

        done();
      },10);
    });

    it("should register user, update company website, and close the modal",function(done){
      $scope.forms.registrationForm.$invalid = false;
      $scope.company.website = "test-website";

      $scope.save();
      expect($scope.registering).to.be.true;
      
      var profileSpy = sinon.spy(userState, "refreshProfile");
      setTimeout(function() {
        expect(newUser).to.be.true;
        identifySpy.should.have.been.called;
        expect(trackerCalled).to.equal("User Registered");
        expect(bqCalled).to.equal("User Registered");
        expect(updateCompanyCalled).to.equal("test-website");
        expect($scope.registering).to.be.false;
        expect($modalInstance._closed).to.be.true;

        expect(profileSpy.called).to.be.true;

        done();
      },10);
    });
    
    it("should handle failure to create user",function(done){
      registerUser = false;
      $scope.forms.registrationForm.$invalid = false;
      $scope.save();
      
      var profileSpy = sinon.spy(userState, "refreshProfile");
      setTimeout(function(){
        expect(newUser).to.be.true;
        identifySpy.should.not.have.been.called;
        expect(trackerCalled).to.not.be.ok;
        expect(bqCalled).to.not.be.ok;
        expect($scope.registering).to.be.false;
        expect($modalInstance._closed).to.be.false;

        expect(profileSpy.called).to.be.true;

        done();
      },10);
    });
  
  });
    
  describe("save existing user: ", function() {
    beforeEach(function() {
      account = userProfile;
    });
    
    it("should not save if form is invalid", function() {
      $scope.forms.registrationForm.$invalid = true;
      $scope.save();
      expect($scope.registering).to.be.false;        
    });
    
    it("should register user and close the modal",function(done){
      $scope.forms.registrationForm.$invalid = false;
      $scope.save();
      expect($scope.registering).to.be.true;
      
      var profileSpy = sinon.spy(userState, "refreshProfile");
      setTimeout(function() {
        expect(newUser).to.be.false;
        identifySpy.should.have.been.called;
        expect(trackerCalled).to.equal("User Registered");
        expect(bqCalled).to.equal("User Registered");
        expect($scope.registering).to.be.false;
        expect($modalInstance._closed).to.be.true;

        expect(profileSpy.called).to.be.true;

        done();
      },10);
    });
    
    it("should handle failure to create user",function(done){
      registerUser = false;
      $scope.forms.registrationForm.$invalid = false;
      $scope.save();
      
      var profileSpy = sinon.spy(userState, "refreshProfile");
      setTimeout(function(){
        expect(newUser).to.be.false;
        expect(trackerCalled).to.not.be.ok;
        expect(bqCalled).to.not.be.ok;
        expect($scope.registering).to.be.false;
        expect($modalInstance._closed).to.be.false;

        expect(profileSpy.called).to.be.true;

        done();
      },10);
    });
      
  });
  
  it("should close modal on cancel",function(){
    $scope.closeModal();
    expect(cookieStored).to.be.true;
    expect($modalInstance._dismissed).to.be.true;
  });

});
  
