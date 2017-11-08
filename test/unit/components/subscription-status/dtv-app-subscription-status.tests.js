/*jshint expr:true */

"use strict";
describe("directive: app subscription status", function() {
  var $compile, $rootScope, element, modalSuccess, modalResult, subscriptionSuccess;

  beforeEach(module("risevision.common.components.subscription-status.directives"));
  beforeEach(module(function ($provide) {
    $provide.service("$modal", function() {
      return {
        open: function() {
          var deferred = Q.defer();
          
          if (modalSuccess) {
            modalResult = true;
            deferred.resolve();
          }
          else {
            modalResult = false;
            deferred.reject();
          }

          return {
            result: deferred.promise
          };
        }
      };
    });
    $provide.service("subscriptionStatusService", function() {
      return {
        get: function() {
          var deferred = Q.defer();
          if(subscriptionSuccess){
            deferred.resolve({status: "subscribed"});
          }else{
            deferred.resolve({status: "trial"});
          }
          return deferred.promise;
        }
      };
    });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
    modalSuccess = true;
    modalResult = "";
    subscriptionSuccess = false;

    $templateCache.put("subscription-status/app-subscription-status-template.html", "<p>mock</p>");
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    element = $compile("<div id='subscription-status' app-subscription-status " +
    "product-id='productId' product-code='productCode' product-price='234' company-id='companyId' ng-model='subscribed'></div>")($rootScope);
  }));
  
  beforeEach(function(done) {
    $rootScope.$digest();

    setTimeout(function() {
      done();
    }, 10);
  });

  it("should replace the element with the appropriate content", function() {
    expect(element.html()).to.equal("<p>mock</p>");
  });
  
  it("should add watchers", function() {
    expect(element.isolateScope().$$watchers[0].exp).to.equal("showStoreModal");
    expect(element.isolateScope().$$watchers[1].exp).to.equal("subscriptionStatus");
    expect(element.isolateScope().$$watchers[2].exp).to.equal("companyId");
  });
  
  it("watch companyId and update checkSubscriptionStatus", function() {
    expect(element.isolateScope().subscriptionStatus).to.deep.equal({"status": "trial"});
  });

  describe("showStoreModal:", function() {
    it("should close modal", function(done) {
      element.isolateScope().showStoreModal = true;
      $rootScope.$digest();

      setTimeout(function() {
        expect(modalResult).to.be.true;
        
        expect(element.isolateScope().showStoreModal).to.be.false;

        done();
      }, 10);
    });

    it("should dismiss modal", function(done) {
      modalSuccess = false;

      element.isolateScope().showStoreModal = true;
      $rootScope.$digest();

      setTimeout(function() {
        expect(modalResult).to.be.false;

        expect(element.isolateScope().showStoreModal).to.be.false;

        done();
      }, 10);
    });

    it("should emit event when subscription status changes", function(done) {
      subscriptionSuccess = true;
      element.isolateScope().showStoreModal = true;
      $rootScope.$digest();

      setTimeout(function() {
        expect(element.isolateScope().subscriptionStatus).to.deep.equal({"status": "subscribed"});

        expect(element.isolateScope().showStoreModal).to.be.false;

        done();
      }, 10);
    });

  });
  
});
