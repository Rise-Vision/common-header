"use strict";

/*jshint -W030 */
/*global sinon*/

describe("controller: help buttons ", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide, $translateProvider) {

    $provide.service("userState", function(){
      return {
        isLoggedIn : function(){
          return isLoggedInValue;
        },
        isRiseVisionUser : function() {
          return isRiseVisionUser;
        },
        _restoreState: function () {

        }
      };
    });

    $provide.factory("supportFactory", function () {
      return {
        handleGetSupportAction : function(){
          return;
        },
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
  var $scope, isLoggedInValue, isRiseVisionUser, handleGetSupportSpy;

  beforeEach(function() {

    isLoggedInValue = false;
    isRiseVisionUser = false;
    inject(function($injector,$rootScope, $controller, userState, supportFactory){
      $scope = $rootScope.$new();
      handleGetSupportSpy = sinon.spy(supportFactory, "handleGetSupportAction");

      $controller("HelpDropdownButtonCtrl", {
        $scope : $scope,
        userState : userState,
        supportFactory: supportFactory
      });
      $scope.$digest();
    });
  });

  it("should initialize",function(){
    expect($scope).to.be.truely;
    expect($scope.isLoggedIn).to.exist;
    expect($scope.isRiseVisionUser).to.exist;
    expect($scope.getSupport).to.exist;
  });

  describe("logged in user: ", function() {

    it("should get that the user is logged in", function() {
      isLoggedInValue = true;
      $scope.$digest();
      expect( $scope.isLoggedIn).to.be.true;
    });

    it("should get that the user is risevision user", function() {
      isRiseVisionUser = true;
      $scope.$digest();
      expect( $scope.isRiseVisionUser).to.be.true;
    });
  });

  describe("handle button actions: ", function() {
    it("should call the handlePrioritySupportAction when running the open priority support", function() {
      $scope.getSupport();
      handleGetSupportSpy.should.have.been.called;
    });
  });
});
