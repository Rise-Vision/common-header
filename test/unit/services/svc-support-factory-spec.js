/*jshint expr:true */

describe("Services: Support Factory", function() {
  beforeEach(module("risevision.common.components.subscription-status"));
  beforeEach(module("risevision.common.components.plans"));
  beforeEach(module("risevision.common.support"));
  var supportFactory, subscriptionStatusGetCallWentOkay,
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

    expect(supportFactory.handleGetSupportAction).to.be.a("function");
  });

  describe("Priority Support:", function() {
    ["cancelled", "not-subscribed", "suspended"].forEach(function(statusCode) {
      it("should open send note modal but not the zendesk form when subscription is in status" + statusCode, function (done) {
        subscriptionStatusGetCallWentOkay = true;
        subscriptionStatus.statusCode = statusCode;
        subscriptionStatus.expiry = new Date("1980-01-01T12:12:12.027+0000"); // expired
        supportFactory.handleGetSupportAction();

        setTimeout(function () {
          expect(modalObject.controller).to.be.equal("HelpSendUsANoteModalCtrl");
          showZendeskFormSpy.should.not.have.been.called;
          done();
        }, 10);
      });
    });

    it("should open zd form modal when subscribed", function (done){
      subscriptionStatusGetCallWentOkay = true;
      subscriptionStatus.statusCode = "subscribed";
      supportFactory.handleGetSupportAction();

      setTimeout(function () {
        showZendeskFormSpy.should.have.been.called;
        done();
      }, 10);
    });
  });

  it("should still honor subscription if subscription is cancelled but not expired", function (done) {
    subscriptionStatusGetCallWentOkay = true;
    subscriptionStatus.statusCode = "cancelled";
    var expiryD = new Date();
    expiryD.setFullYear(expiryD.getFullYear() + 1);
    subscriptionStatus.expiry = expiryD.toISOString();
    supportFactory.handleGetSupportAction();

    setTimeout(function () {
      showZendeskFormSpy.should.have.been.called;
      done();
    }, 10);
  });
});
