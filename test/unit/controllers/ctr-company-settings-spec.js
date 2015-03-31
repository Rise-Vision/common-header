"use strict";

/*jshint -W030 */

describe("controller: company settings", function() {
  beforeEach(module("risevision.common.header"));
  beforeEach(module(function ($provide) {
    $provide.service("userState",userState);
    $provide.service("$modalInstance",function(){
      return {
        _dismissed : false,
        _closed: false,
        dismiss : function(reason){
          expect(reason).to.equal("cancel");
          this._dismissed = true;
        },
        close: function(reason) {
          expect(reason).to.equal("success");          
          this._closed = true;
        }
      };
    });
    $provide.value("companyId", "RV_test_id");
    $provide.service("getCompany",function(){
      return function(companyId) {
        var deferred = Q.defer();
        expect(companyId).to.equal("RV_test_id");
        deferred.resolve(savedCompany);
        return deferred.promise;
      };
    });
    $provide.service("updateCompany",function(){
      return function(companyId, newCompany){
        var deferred = Q.defer();
        expect(companyId).to.equal("RV_test_id");
        
        savedCompany = newCompany;
        
        if(createCompany){
          deferred.resolve(companyId);
        }else{
          deferred.reject("ERROR; could not create company");
        }
        return deferred.promise;
      };
    });
    
  }));
  var $scope, userProfile, userCompany, savedCompany, company, userState, $modalInstance, createCompany;
  var isStoreAdmin = true;
  beforeEach(function(){
    createCompany = true;
    userProfile = {
      id : "RV_user_id",
      firstName : "first",
      lastName : "last",
      telephone : "telephone",
      email : "e@mail.com"
    };
    company = {
      "id": "RV_test_id",
      "parentId": "fb788f1f",
      "name": "Test Company",
      "creationDate": "2012-04-03T20:52:17.000Z",
      "city": "Toronto",
      "province": "ON",
      "country": "CA",
      "companyStatus": 1,
      "companyStatusChangeDate": "2011-06-30T20:08:57.000Z",
      "settings": {},
      "parentSettings": {},
      "mailSyncEnabled": false,
      "sellerId": "asdf1234",
      "isTest": true
    };
    savedCompany = company;
    userState = function(){
      return {
        getCopyOfProfile : function(){
          return userProfile;
        },
        getCopyOfUserCompany : function(){
          return userCompany;
        },
        getCopyOfSelectedCompany : function(){
          return userCompany;
        },
        getAccessToken : function(){
          return{access_token: "TEST_TOKEN"};
        },
        getSelectedCompanyId : function(){
          return "some_company_id";
        },
        _restoreState : function(){
          
        },
        updateCompanySettings: function(company){
          userCompany = angular.copy(company);
        },
        isSubcompanySelected : function(){
          return true;
        },
        isRiseStoreAdmin: function() {
          return isStoreAdmin;
        }
      };
    };
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get("$modalInstance");
      $controller("CompanySettingsModalCtrl", {
        $scope : $scope,
        $modalInstance: $modalInstance,
        companyId: $injector.get("companyId"),
        userState : $injector.get("userState"),
        companyDetails:$injector.get("getCompany"),
        updateCompany:$injector.get("updateCompany")
      });
      $scope.$digest();
    });
  });
    
  it("should exist",function(){
    expect($scope).to.be.truely;
    expect($scope.company).to.be.truely;
    
    expect($scope.company).to.have.property("id");

    expect($scope).to.have.property("regionsCA");
    expect($scope).to.have.property("regionsUS");
    expect($scope).to.have.property("isRiseStoreAdmin");
    expect($scope.loading).to.be.true;

    expect($scope.closeModal).to.exist;
    expect($scope.save).to.exist;
    expect($scope.deleteCompany).to.exist;
    expect($scope.resetAuthKey).to.exist;
    expect($scope.resetClaimId).to.exist;
  });

  it("should load current company",function(done){
    setTimeout(function(){
      expect($scope.loading).to.be.false;
      expect($scope.company).to.have.property("name");
      expect($scope.company).to.have.property("parentId");
      done();
    },10);
  });
  
  describe("submit: ",function(){
    beforeEach(function(done){
      $scope.isRiseStoreAdmin = true;
      
      setTimeout(function(){
        expect($scope.loading).to.be.false;
        done();
      },10);
    });
    
    it("should save the company and close the modal",function(done){
      $scope.save();
      expect($scope.loading).to.be.true;
      setTimeout(function() {
        expect($scope.loading).to.be.false;
        expect($modalInstance._closed).to.be.true;
        
        expect($scope.company).to.have.property("name");
        expect($scope.company).to.have.property("sellerId");
        expect($scope.company).to.have.property("isTest");

        done();
      },10);
    });
    
    it("should remove fields if user is not Store Admin",function(done){
      $scope.isRiseStoreAdmin = false;
      $scope.save();
      setTimeout(function() {
        expect(savedCompany).to.have.property("name");
        expect(savedCompany).to.not.have.property("sellerId");
        expect(savedCompany).to.not.have.property("isTest");
        
        done();
      },10);
    });
    
    it("should not remove fields from companyState if user is not Store Admin",function(done){
      $scope.isRiseStoreAdmin = false;
      $scope.save();
      setTimeout(function() {
        expect($scope.company).to.have.property("isTest");
        expect($scope.company).to.have.property("sellerId");
        expect($scope.company.isTest).to.be.true;
        
        done();
      },10);
    });
    
    it("should handle failure to create company correctly",function(done){
      createCompany = false;
      
      $scope.$digest();
      $scope.save();
      setTimeout(function(){
        expect($scope.loading).to.be.false;
        expect($modalInstance._closed).to.be.false;

        done();
      },10);
    });
  });
  
  it("should close modal on cancel",function(){
    $scope.closeModal();
    expect($modalInstance._dismissed).to.be.true;
  });
    
});
  
