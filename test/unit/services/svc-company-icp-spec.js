/*jshint expr:true */
"use strict";

describe("service: companyIcpFactory:", function() {
  beforeEach(module("risevision.common.header"));

  beforeEach(module(function ($provide) {
    $provide.service("$q", function() {return Q;});

    $provide.service("$templateCache",function(){
      return {
        get: function(url){
          expect(url).to.be.ok;

          return "template";
        },
        put: function() {}
      };
    });
    $provide.service("$log", function() {
      return {
        debug: sinon.spy()
      };
    });
    $provide.service("userState", function() {
      return {
        getCopyOfProfile: function() {
          return userProfile;
        },
        getCopyOfUserCompany: function() {
          return companyProfile;
        },
        getSelectedCompanyId: function() {
          return "companyId";
        },
        isSubcompanySelected: function() {
          return isSubcompanySelected;
        },
        isUserAdmin: function() {
          return isUserAdmin;
        },
        _restoreState: function() {},
        isSelectedCompanyChargebee: function () {
          return true;
        }
      };
    });
    $provide.service("updateCompany", function() {
      updateCompanySpy = sinon.spy(function() {
        return Q.resolve();
      });

      return updateCompanySpy;
    });
    $provide.service("updateUser", function() {
      updateUserSpy = sinon.spy(function() {
        return Q.resolve();
      });

      return updateUserSpy;
    });
    $provide.service("$modal",function(){
      $modal = {
        open : sinon.spy(function() {
          return {
            result: $modalDeferred.promise
          };
        })
      };

      return $modal;
    });
  }));
  
  var companyIcpFactory, $rootScope, $modal, $modalDeferred, $log, userProfile, companyProfile,
    updateUserSpy, updateCompanySpy, isSubcompanySelected, isUserAdmin;
  
  beforeEach(function(){
    $modalDeferred = Q.defer();
    userProfile = {};
    companyProfile = {};
    isSubcompanySelected = false;
    isUserAdmin = true;

    inject(function($injector){
      $rootScope = $injector.get("$rootScope");
      $log = $injector.get("$log");
      companyIcpFactory = $injector.get("companyIcpFactory");
    });
  });

  it("should exist",function() {
    expect(companyIcpFactory).to.be.ok;
    expect(companyIcpFactory.init).to.be.a("function");
  });

  describe("init", function() {
    it("should attach $on event handler", function() {
      var $onSpy = sinon.spy($rootScope, "$on");
      
      companyIcpFactory.init();
      
      $onSpy.should.have.been.calledWith("risevision.company.selectedCompanyChanged", sinon.match.func);
    });
    
    it("should open modal once user has logged in", function(done) {
      var oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      userProfile = {
        creationDate: oneMonthAgo
      };
      companyIcpFactory.init();
      $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

      setTimeout(function() {
        $modal.open.should.have.been.calledWith({
          templateUrl: "company-icp-modal.html",
          controller: "CompanyIcpModalCtrl",
          size: "lg",
          backdrop: true,
          resolve: sinon.match.object
        });

        var resolve = $modal.open.getCall(0).args[0].resolve;
        
        expect(resolve.user).to.be.a("function");
        expect(resolve.company).to.be.a("function");

        expect(resolve.user()).to.equal(userProfile);
        expect(resolve.company()).to.equal(companyProfile);

        done();
      }, 10);
    });
    
    it("should only open modal once and remove handler", function(done) {
      var listenerCount = $rootScope.$$listeners["risevision.company.selectedCompanyChanged"].length;
      var oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      userProfile = {
        creationDate: oneMonthAgo
      };
      companyIcpFactory.init();

      expect($rootScope.$$listeners["risevision.company.selectedCompanyChanged"].length).to.equal(listenerCount + 1);      
      
      $rootScope.$broadcast("risevision.company.selectedCompanyChanged");
      $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

      setTimeout(function() {
        $modal.open.should.have.been.calledOnce;

        expect($rootScope.$$listeners["risevision.company.selectedCompanyChanged"].length).to.equal(listenerCount);

        done();
      }, 10);
    });
    
    it("should not show for sub-companies", function(done) {
      var testDate = new Date();
      testDate.setMonth(testDate.getMonth() - 1);
      isSubcompanySelected = true;

      userProfile = {
        dataCollectionDate: testDate
      };
      companyIcpFactory.init();
      $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

      setTimeout(function() {
        $modal.open.should.have.not.been.called;

        done();
      }, 10);
    });

    it("should not show if missing User Admin role", function(done) {
      var testDate = new Date();
      testDate.setMonth(testDate.getMonth() - 1);
      isUserAdmin = false;

      userProfile = {
        dataCollectionDate: testDate
      };
      companyIcpFactory.init();
      $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

      setTimeout(function() {
        $modal.open.should.have.not.been.called;

        done();
      }, 10);
    });

    describe("less than 2 weeks ago", function() {
      var testDate;
      beforeEach(function() {
        testDate = new Date();
        testDate.setDate(testDate.getDate() - 10);
      });
      
      it("should test dataCollectionDate", function(done) {
        userProfile = {
          dataCollectionDate: testDate
        };
        companyIcpFactory.init();
        $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

        setTimeout(function() {
          $modal.open.should.have.not.been.called;

          done();
        }, 10);
      });

      it("should test creationDate", function(done) {
        userProfile = {
          creationDate: testDate
        };
        companyIcpFactory.init();
        $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

        setTimeout(function() {
          $modal.open.should.have.not.been.called;

          done();
        }, 10);
      });
    });

    it("should not open modal if data is filled in", function(done) {
      var oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      userProfile = {
        creationDate: oneMonthAgo,
        companyRole: "Test Role",
        email: "testEmail"
      };
      companyProfile = {
        name: "Test Company",
        companySize: "20",
        companyIndustry: "Other"
      };
      companyIcpFactory.init();
      $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

      setTimeout(function() {
        $modal.open.should.have.not.been.called;

        done();
      }, 10);
    });

  });

  describe("$modal result", function() {
    beforeEach(function(done) {
      var oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      userProfile = {
        username: "username",
        creationDate: oneMonthAgo,
        randomField: "123"
      };
      companyProfile = {
        id: "cid",
        name: "Test Company",
        randomField: "123"
      };
      companyIcpFactory.init();
      $rootScope.$broadcast("risevision.company.selectedCompanyChanged");

      setTimeout(function() {
        $log.debug.reset();
        $modal.open.should.have.been.called;

        done();
      }, 10);
    });

    it("should save dataCollectionDate on dismiss", function(done) {
      $modalDeferred.reject(userProfile);
      
      setTimeout(function() {
        updateUserSpy.should.have.been.calledWith("username", { dataCollectionDate: sinon.match.date });
        updateCompanySpy.should.not.have.been.called;
        $log.debug.should.have.been.calledOnce;
        
        done();
      }, 10);
    });
    
    it("should save user and company fields on close", function(done) {
      userProfile.companyRole = "Role";
      userProfile.email = "testEmail";
      userProfile.randomField = "random";
      companyProfile.companySize = "10";
      companyProfile.randomField = "random";
      $modalDeferred.resolve({user: userProfile, company: companyProfile});
      
      setTimeout(function() {
        updateUserSpy.should.have.been.calledWith("username", { dataCollectionDate: sinon.match.date, companyRole: "Role", email: "testEmail" });
        updateCompanySpy.should.have.been.calledWith("cid", { name: "Test Company", companySize: "10" });
        $log.debug.should.have.been.calledOnce;
        
        done();
      }, 10);
    });
  });
});
