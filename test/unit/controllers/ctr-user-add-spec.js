"use strict";

/*jshint -W030 */
/*global sinon*/

describe("controller: user add", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide, $translateProvider) {
    $provide.service("userState",userState);
    $provide.value("companyId", "1234");
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
    $provide.service("addUser",function(){
      return function(companyId, username, newUser){
        var deferred = Q.defer();
        expect(username).to.equal("user@example.io");
        
        if(createUser){
          deferred.resolve(username);
        }else{
          deferred.reject("ERROR; could not create company");
        }
        return deferred.promise;
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

    $provide.factory("customLoader", function ($q) {
      return function () {
        var deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      };
    });
    
    $provide.factory("messageBox", function() {
      return messageBoxStub;
    })

    $translateProvider.useLoader("customLoader");

  }));
  var $scope, userState, $modalInstance, createUser,
  trackerCalled, messageBoxStub;
  var isRiseAdmin = true, isUserAdmin = true, isRiseVisionUser = true;
  beforeEach(function(){
    createUser = true;
    trackerCalled = undefined;
    userState = function(){
      return {
        _restoreState : function(){
          
        },
        isRiseAdmin: function() {
          return isRiseAdmin;
        },
        isUserAdmin: function() {
          return isUserAdmin;
        },
        isRiseVisionUser: function() {
          return isRiseVisionUser;
        }
      };
    };
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get("$modalInstance");
      userState = $injector.get("userState");
      
      messageBoxStub = sinon.stub();

      $controller("AddUserModalCtrl", {
        $scope : $scope,
        $modalInstance: $modalInstance,
        userState : userState,
        addUser:$injector.get("addUser"),
        segmentAnalytics:$injector.get("segmentAnalytics"),
        messageBox: $injector.get("messageBox")
      });
      $scope.$digest();
    });
  });
    
  it("should exist",function(){
    expect($scope).to.be.okay;
    expect($scope.user).to.be.okay;
    
    expect($scope).to.have.property("availableRoles");

    expect($scope.closeModal).to.exist;
    expect($scope.save).to.exist;
    expect($scope.editRoleAllowed).to.exist;
    expect($scope.editRoleVisible).to.exist;
  });
  
  describe("save: ",function(){
    var formInvalid;
    
    beforeEach(function(){      
      formInvalid = false;
      
      $scope.loading = false;
      $scope.user = {
        username: "user@example.io"
      };
      $scope.forms.userSettingsForm = {
        email: {},
        username: {},
        firstName: {},
        lastName: {},
        $invalid: false
      };
    });
    
    it("should not save if form is invalid", function() {
      $scope.forms.userSettingsForm.$invalid = true;
      $scope.save();
      expect($scope.loading).to.be.false;

      expect(trackerCalled).to.not.be.ok;
      expect($modalInstance._closed).to.be.false;
    });
    
    it("should save the user and close the modal",function(done){
      $scope.save();
      expect($scope.loading).to.be.true;
      setTimeout(function() {
        expect($scope.loading).to.be.false;

        expect(trackerCalled).to.equal("User Created");
        expect($modalInstance._closed).to.be.true;
        
        done();
      },10);
    });

    it("should handle failure to save user",function(done){
      createUser = false;
      
      $scope.save();
      setTimeout(function(){
        expect(messageBoxStub).to.have.been.called;
        
        expect($scope.loading).to.be.false;
        expect($modalInstance._closed).to.be.false;

        done();
      },10);
    });
  });
  
  it("should close modal on cancel",function(){
    $scope.closeModal();
    expect($modalInstance._dismissed).to.be.true;
  });
    
});
  
