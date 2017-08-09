/*jshint expr:true */
/*global _ */

describe("Services: Core System Messages", function() {

  beforeEach(module("risevision.common.systemmessages"));

  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});
    $provide.value("userState", {
      isRiseVisionUser: function () {return true; },
      _restoreState: function () {}
    });
  }));

  it("should exist", function() {
    inject(function(systemMessages) {
      expect(systemMessages).to.be.ok;
    });
  });

  it("should register system message retriever", function (done) {
    inject(function(systemMessages, $q) {
      systemMessages.registerRetriever(function () {
        var deferred = $q.defer();
        deferred.resolve([{text: "This is a timeless message"}]);
        return deferred.promise;
      });
      systemMessages.resetAndGetMessages().then(function () {
        expect(systemMessages.length).to.equal(1);
        done();
      });
    });
  });


  it("should sort system messages in reversed chronological order", function (done) {
    inject(function(systemMessages, $q) {
      systemMessages.registerRetriever(function () {
        var deferred = $q.defer();
        deferred.resolve([
          {text: "Nunc lobortis iaculis ipsum ac porttitor. ", startDate: "2002-01-02"},
          {text: "Nulla dictum congue arcu eget tincidunt. ", startDate: "2003-01-02"},
          {text: "Vivamus vitae fringilla quam. ", startDate: "2005-12-23"},
          {text: "Vivamus finibus maximus vestibulum. ", startDate: "2010-07-11"},
          {text: "Nam turpis ex, tincidunt ac imperdiet ut, tempor in velit. ", startDate: "2014-04-18"},
          {text: "Curabitur sagittis elit ac tortor egestas aliquam. ", startDate: "2014-02-01"},
          {text: "Aliquam ante urna, imperdiet vel imperdiet ut, commodo eget arcu. ", startDate: "2014-04-18"},
          {text: "Phasellus ultricies ac nisi nec rutrum. ", startDate: "1998-03-02"}
        ]);
        return deferred.promise;
      });
      systemMessages.resetAndGetMessages().then(function () {
        var startDates = _.pluck(systemMessages, "startDate");
        expect(startDates).to.deep.equal([
          "2014-04-18", "2014-04-18", "2014-02-01",
          "2010-07-11", "2005-12-23", "2003-01-02",
          "2002-01-02", "1998-03-02"]);
        done();
      });
    });
  });
});
