/*jshint expr:true */

describe("Services: Support Factory", function() {
  beforeEach(module("risevision.widget.common.subscription-status"));
  beforeEach(module("risevision.common.support"));
  var supportFactory, startTrialCallWentOkay, subscriptionStatusGetCallWentOkay,
    subscriptionStatus, modalObject, intercomSpy, userId, identifyObject,
    showZendeskFormSpy;

  beforeEach(module(function ($provide, $translateProvider) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.factory("userState", [function () {
      return {
        getUsername: function () {return "John"; },
        getSelectedCompanyId : function () {return "companyId";}
      };
    }]);

    $provide.service("subscriptionStatusService", function () {
      return {
        get : function(){
          var deferred = Q.defer();
          if(subscriptionStatusGetCallWentOkay){
            deferred.resolve(subscriptionStatus);
          } else{
            deferred.reject({});
          }
          return deferred.promise;
        }
      };
    });

    $provide.service("segmentAnalytics", function () {
      return {
        identify : function(id, obj){
          userId = id;
          identifyObject = obj;
        }
      };
    });

    $provide.service("$modal",function(){
      return {
        open : function(obj){

          var deferred = Q.defer();

          modalObject = obj;

          deferred.resolve({});

          return {
            result: deferred.promise
          };
        }
      };
    });

    $provide.service("$window",function(){
      return {
        Intercom : function(){
        }
      };
    });

    showZendeskFormSpy = sinon.stub();

    $provide.factory("zendesk", function() {
      return {
        showWidget: showZendeskFormSpy,
      };
    });

    $provide.service("$http",function(){
      return {
        get : function(){
            var deferred = Q.defer();
            if(startTrialCallWentOkay){
              deferred.resolve({});
            } else{
              deferred.reject({});
            }
            return deferred.promise;
        }
      };
    });

    $provide.factory("customLoader", function () {
      return function () {
        var deferred = Q.defer();
        deferred.resolve({});
        return deferred.promise;
      };
    });

    $translateProvider.useLoader("customLoader");

    $provide.value("SUPPORT_PRODUCT_CODE", "product_code");
    $provide.value("STORE_SERVER_URL", "store_server_url");


  }));

  beforeEach(function() {
    subscriptionStatus = {};
    modalObject = {};
    inject(function($injector, $window){
      intercomSpy = sinon.spy($window, "Intercom");
      supportFactory = $injector.get("supportFactory");

    });
  });

  it("should exist", function() {
    expect(supportFactory).to.be.truely;

    expect(supportFactory.handlePrioritySupportAction).to.be.a("function");
    expect(supportFactory.initiateTrial).to.be.a("function");
    expect(supportFactory.handleSendUsANote).to.be.a("function");
  });

  describe("Priority Support:", function() {

    it("should open trial support modal but not the zendesk form when subscription was cancelled", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "cancelled";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        showZendeskFormSpy.should.not.have.been.called;
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when not subscribed", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "not-subscribed";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        showZendeskFormSpy.should.not.have.been.calledWith("showNewMessage");
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when subscription was suspended", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "suspended";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        showZendeskFormSpy.should.not.have.been.called;
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when trial is expired", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "trial-expired";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        showZendeskFormSpy.should.not.have.been.calledWith("showNewMessage");
        done();
      }, 10);
    });

    it("should open trial support modal but not the intercom chat when trial is available", function (done) {
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "trial-available";
      supportFactory.handlePrioritySupportAction();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpPrioritySupportModalCtrl");
        showZendeskFormSpy.should.not.have.been.calledWith("showNewMessage");
        done();
      }, 10);
    });
  });

  describe("Zendesk form:", function() {

    it("should open the intercom chat", function (done) {
      supportFactory.openZendeskForm();

      setTimeout(function () {
        showZendeskFormSpy.should.have.been.called;
        done();
      }, 10);
    });
  });


  describe("Send us a note:", function() {
    it("should open send us a note modal when subscribed", function (done){
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "subscribed";
      supportFactory.handleSendUsANote();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpSendUsANoteModalCtrl");

        done();
      }, 10);
    });

    it("should open send us a note modal when not subscribed", function (done){
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "not-subscribed";
      supportFactory.handleSendUsANote();

      setTimeout(function () {
        expect(modalObject.controller).to.be.equal("HelpSendUsANoteModalCtrl");

        done();
      }, 10);
    });
  });

});
