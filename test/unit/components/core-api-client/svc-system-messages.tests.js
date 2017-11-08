describe("Services: Core System Messages", function() {

  beforeEach(module("risevision.core.systemmessages"));

  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("userState", {
      isRiseVisionUser: function () {return true; }
    });
  }));

  it("should exist", function() {
    inject(function(getCoreSystemMessages) {
      expect(getCoreSystemMessages).be.defined;
    });
  });

});
