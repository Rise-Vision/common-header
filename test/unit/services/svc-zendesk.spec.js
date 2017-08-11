/*jshint expr:true */

describe("Services: Zendesk", function() {
  beforeEach(module("risevision.common.support"));

  var windowObj, zeSpy, locationSearchSpy, zeActivateSpy, widgetShown,
    hideRvUsernameFieldSpy, hideRvCompanySpy, setUsernameValueSpy,
    setCompanyInputStub;

  beforeEach(function() {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(function() {
    this.clock.restore();
  });

  beforeEach(function() {
    widgetShown = false;
  });

  beforeEach(module(function($provide) {
    $provide.service("$q", function() {return Q;});
    $provide.value("userState", {
      isRiseVisionUser: function () {return true; },
      _restoreState: function () {},
      getUsername: function() { return "hello"; },
      getUserEmail: function() { return "someone@hello.com"; },
      getUserCompanyId: function() { return "abcdefg"; },
      getUserCompanyName: function() { return "Rich Inc."; },
      getSelectedCompanyId: function() { return "abcdefg"; },
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
    hideRvUsernameFieldSpy = sinon.stub();
    setUsernameValueSpy = sinon.stub();
    var fakeRvUsernameInput = {
      val: setUsernameValueSpy,
      prop: function() {},
      parents: function() {
        return { parent: function() {
          return { hide: hideRvUsernameFieldSpy } } } },
      length: 1
    };

    hideRvCompanySpy = sinon.stub();
    setCompanyInputStub = sinon.stub();
    var fakeRvCompanyInput = {
      val: setCompanyInputStub,
      prop: function() {},
      parents: function() {
        return { parent: function() {
          return { hide: hideRvCompanySpy } } } },
      length: 1
    };

    var fakeBorderContainer = {
      css: function() {
      }
    };

    windowObj = {
      document: {
        body: { appendChild: function () {
          zeSpy = sinon.spy(function(cb) {
            cb();
          });
          zeSpy.hide = function() {};
          zeSpy.activate = zeActivateSpy;
          windowObj.zE = zeSpy;
          windowObj.zE.identify = function() {};
        } },
        createElement: function() {
          return {
          };
        },
      },
      $: function() {
        return {
          contents: function() {
            return {
              find: function (query) {
                if(query === ".Container") {
                  return fakeBorderContainer;
                } else if (widgetShown && query === "input[name=24893323]") {
                  // only returns when the contact form widget is shown.
                  // reasons for it not to show: Zendesk widget fails to open;
                  // user still in knowledge base search UI
                  return fakeRvCompanyInput;
                } else if (widgetShown && query === "input[name=email]") {
                  return fakeRvUsernameInput;
                } else {
                  return null;
                }
              }
            };
          }
        };
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

  it("hides inputs that auto-collect their values", function(done) {
    var _this = this;
    inject(function(zendesk) {
      zendesk.showWidget().then(function() {
        expect(hideRvUsernameFieldSpy).not.to.have.been.called;
        expect(hideRvCompanySpy).not.to.have.been.called;
        expect(setUsernameValueSpy).not.to.have.been.called;

        widgetShown = true;
        _this.clock.tick(2000);
        expect(hideRvUsernameFieldSpy).to.have.been.called;
        expect(hideRvCompanySpy).to.have.been.called;

        // should set username in the field
        expect(setUsernameValueSpy).to.have.been.calledWith("hello");

        done();
      });
    });
  });
});
