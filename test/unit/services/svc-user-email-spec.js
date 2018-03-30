/*jshint expr:true */
"use strict";

describe("service: userEmail:", function() {
  beforeEach(module("risevision.common.email"));

  beforeEach(module(function ($provide) {
    $provide.service("email", function() {
      return {
        send: function() {
          return Q.resolve();
        }
      };
    });
    $provide.service("$templateCache",function(){
      return {
        get: function(url){
          expect(url).to.be.ok;

          return "email template w/ {{newUser.username}} & {{newUser.companyName}} & {{newUser.encodedCompanyName}} & {{user.name}}";
        },
        put: function() {}
      };
    });
    $provide.service("userState", function() {
      return {
        getSelectedCompanyName: function() {
          return "Company Name%";
        },
        getCopyOfProfile: function() {
          return profile;
        },
        _restoreState: function() {}
      };
    });

  }));
  
  var userEmail, sendSpy, profile;
  beforeEach(function(){
    profile = {
      firstName: "Test",
      lastName: "User",
      email: "test.user@gmail.com"
    };
    inject(function($injector){
      userEmail = $injector.get("userEmail");
      var emailService = $injector.get("email");
      sendSpy = sinon.spy(emailService, "send");
    });
  });

  it("should exist",function(){
    expect(userEmail).to.be.truely;
    expect(userEmail.sendingEmail).to.be.false;
    expect(userEmail.send).to.be.a("function");
  });
  
  it("should send email",function(done){
    userEmail.send("username", "user@gmail.com");
    expect(userEmail.sendingEmail).to.be.true;
    sendSpy.should.have.been.calledWith("user@gmail.com",
      "You've been added to a Rise Vision account!",
      "email template w/ username & Company Name% & Company%20Name%25 & Test User");

    setTimeout(function() {
      expect(userEmail.sendingEmail).to.be.false;
      done();
    }, 10);
  });
  
  it("should use current user email if name is blank",function(){
    delete profile.firstName;
    delete profile.lastName;

    userEmail.send("username", "user@gmail.com");
    sendSpy.should.have.been.calledWith("user@gmail.com",
      "You've been added to a Rise Vision account!",
      "email template w/ username & Company Name% & Company%20Name%25 & test.user@gmail.com");
  });

  it("should not call w/ missing parameters",function(){
    userEmail.send();
    expect(userEmail.sendingEmail).to.be.false;
    sendSpy.should.not.have.been.called;
  });


});
