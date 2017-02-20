/*jshint expr:true */

describe("Services: Zendesk", function() {
  beforeEach(module("risevision.common.support"));

  var windowObj, zeSpy, locationSearchSpy, zeActivateSpy;

  beforeEach(module(function($provide) {
    $provide.service("$q", function() {return Q;});
    $provide.value("userState", {
      isRiseVisionUser: function () {return true; },
      _restoreState: function () {},
      getUsername: function() { return "hello"; },
      getUserEmail: function() { return "someone@hello.com"; },
      getUserCompanyId: function() { return "abcdefg"; },
      getUserCompanyName: function() { return "Rich Inc."; },
    });
    $provide.service("segmentAnalytics", function() {
      return {
        identify: function() {},
      };
    });
    locationSearchSpy = sinon.stub();
    $provide.service("$location", function() {
      return {
        search: locationSearchSpy,
      };
    });

    zeActivateSpy = sinon.stub();

    windowObj = {
      document: {
        body: { appendChild: function () {
          zeSpy = sinon.spy(function(cb) {
            cb();
          });
          zeSpy.hide = function() {};
          zeSpy.activate = zeActivateSpy;
          windowObj.zE = zeSpy;
        } },
        createElement: function() {
          return {};
        }
      }
    };

    $provide.service("$window", function() {
      return windowObj;
    });
    $provide.factory("getSubscriptionStatus", function() {
      return function() {
        return Q.when({
          statusCode: "subscribed"
        });
      };
    });
  }));

  it("should exists", function() {
    inject(function(zendesk) {
      expect(zendesk).to.be.ok;
    });
  });

  it("ensureScript", function(done) {
    inject(function(zendesk) {
      zendesk.ensureScript().then(function() {
        expect(zeSpy).to.have.been.called;
        done();
      }, done);
    });
  });

  it("showWidget", function(done) {
    inject(function(zendesk) {
      zendesk.showWidget().then(function(){
        expect(zeSpy).to.have.been.called;
        expect(locationSearchSpy).to.have.been.calledWith("cHJpb3JpdHktc3VwcG9ydA", 1);
        expect(zeActivateSpy).to.have.been.called;
        done();
      }, done);
    });
  });

  it("showSendNote", function(done) {
    inject(function(zendesk) {
      zendesk.showSendNote().then(function(){
        expect(zeSpy).to.have.been.called;
        expect(locationSearchSpy).to.have.been.calledWith("c2VuZC11cy1hLW5vdGU", 1);
        expect(zeActivateSpy).to.have.been.called;
        done();
      }, done);
    });
  });
});
