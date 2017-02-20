"use strict";

/*jshint -W030 */
/*global sinon*/

describe("controller: help send us a note modal ", function() {
  beforeEach(module("risevision.common.header"));

  var zendeskShowWidgetSpy, zendeskSendNoteSpy;
  beforeEach(module(function ($provide, $translateProvider) {

    $provide.factory("supportFactory", function ($q) {
      return {
        initiateTrial : function() {
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        },
        openZendeskForm : function() {
          return;
        },
        getSubscriptionStatus: function() {
          return $q.when("subscribed");
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

    zendeskShowWidgetSpy = sinon.stub();
    zendeskSendNoteSpy = sinon.stub();
    $provide.factory("zendesk", function() {
      return {
        showWidget: zendeskShowWidgetSpy,
        showSendNote: zendeskSendNoteSpy,
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

      $controller("HelpSendUsANoteModalCtrl", {
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
    expect($scope.startTrial).to.exist;
    expect($scope.sendUsANote).to.exist;
    expect($scope.prioritySupport).to.exist;
    expect($scope.dismiss).to.exist;
  });

  describe("start trial: ", function() {
    it("should call initiateTrial and dismiss the modal",function(){
      $scope.startTrial();
      $scope.$digest();
      initiateTrialSpy.should.have.been.called;
      modalInstanceDismissSpy.should.have.been.called;
    });
  });

  describe("dismiss the modal: ", function() {

    it("should dismiss the modal",function(){
      $scope.dismiss();
      modalInstanceDismissSpy.should.have.been.called;
    });
  });

  describe("send us a note: ", function() {

    it("should open the zendesk form",function(){
      $scope.sendUsANote();
      zendeskSendNoteSpy.should.have.been.called;
      modalInstanceDismissSpy.should.have.been.called;
    });
  });

  describe("priority support: ", function() {

    it("should open the zendesk form",function(){
      $scope.prioritySupport();
      zendeskShowWidgetSpy.should.have.been.called;
      modalInstanceDismissSpy.should.have.been.called;
    });
  });
});
