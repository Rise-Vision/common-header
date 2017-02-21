"use strict";

/*jshint -W030 */
/*global sinon*/

describe("controller: help priority support modal ", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide, $translateProvider) {

    $provide.factory("supportFactory", function ($q) {
      return {
        initiateTrial : function(){
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        }
      };
    });

    $provide.service("$modalInstance",function(){
      return {
        dismiss : function(){
          return;
        }
      };
    });

    $provide.factory("subscriptionStatus", function () {
      return {
      };
    });

    $provide.value("SUPPORT_PRODUCT_URL", function (){
      return;
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
  var $scope, initiateTrialSpy, modalInstanceDismissSpy;

  beforeEach(function() {

    inject(function($injector,$rootScope, $controller, supportFactory, $modalInstance, subscriptionStatus, SUPPORT_PRODUCT_URL){
      $scope = $rootScope.$new();
      initiateTrialSpy = sinon.spy(supportFactory, "initiateTrial");
      modalInstanceDismissSpy = sinon.spy($modalInstance, "dismiss");

      $controller("HelpPrioritySupportModalCtrl", {
        $scope : $scope,
        $modalInstance: $modalInstance,
        subscriptionStatus: subscriptionStatus,
        supportFactory: supportFactory,
        SUPPORT_PRODUCT_URL: SUPPORT_PRODUCT_URL
      });
      $scope.$digest();
    });
  });

  it("should initialize",function(){
    expect($scope).to.be.truely;
    expect($scope.dismiss).to.exist;
  });

  describe("dismiss the modal: ", function() {

    it("should dismiss the modal",function(){
      $scope.dismiss();
      modalInstanceDismissSpy.should.have.been.called;
    });
  });
});
