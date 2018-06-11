"use strict";

describe("controller: plans modal", function() {
  beforeEach(module("risevision.common.components.plans"));
  beforeEach(module(function ($provide) {
    $provide.service("$modalInstance", function() {
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
    $provide.service("$loading", function() {
      return {
        start: sinon.stub(),
        stop: sinon.stub()
      };
    });
    $provide.factory("planFactory", function() {
      return {
        getPlansDetails: function() {
          return null;
        },
        getCompanyPlanStatus: function() {
          return null;
        },
        startTrial: function() {
          return Q.resolve([]);
        },
        isTrialExpired: function() {
          return false;
        },
        isProSubscribed: function() {
          return false;
        },
        isProSuspended: function() {
          return false;
        }
      };
    });
    $provide.factory("userState", function() {
      return {
        getCopyOfSelectedCompany: function() {
          return {
            playerProSubscriptionId: "playerProSubscriptionId",
            id: "companyId"
          };
        }
      };
    });
    $provide.service("$modal", function() {
      return {
        open: sinon.stub()
      };
    });
    $provide.service("$q", function() {
      return Q;
    });
  }));

  var sandbox, $scope, $modalInstance, $modal, $loading, $log, planFactory, currentPlan, $q;
  var userState;
  var BASIC_PLAN_CODE, ADVANCED_PLAN_CODE;

  beforeEach(function(done) {
    sandbox = sinon.sandbox.create();

    inject(function($injector, $rootScope, $controller) {
      $scope = $rootScope.$new();
      $modalInstance = $injector.get("$modalInstance");
      $modal = $injector.get("$modal");
      $loading = $injector.get("$loading");
      $log = $injector.get("$log");
      planFactory = $injector.get("planFactory");
      $q = $injector.get("$q");
      userState = $injector.get("userState");
      currentPlan = {};

      var plansByType = _.keyBy($injector.get("PLANS_LIST"), "type");

      BASIC_PLAN_CODE = plansByType.basic.productCode;
      ADVANCED_PLAN_CODE = plansByType.advanced.productCode;

      var plansList = [{
        productCode: BASIC_PLAN_CODE,
        status: "Trial Available",
        statusCode: "trial-available"
      }, {
        productCode: ADVANCED_PLAN_CODE,
        status: "Subscribed",
        statusCode: "subscribed"
      }];

      sandbox.stub(planFactory, "getCompanyPlanStatus", function() {
        return $q.when(_.keyBy(plansList, "productCode"));
      });

      sandbox.stub(planFactory, "getPlansDetails", function(){
        return $q.when(plansList);
      });

      $controller("PlansModalCtrl", {
        $scope: $scope,
        $modalInstance: $modalInstance,
        $modal: $modal,
        $loading: $loading,
        planFactory: planFactory,
        currentPlan: currentPlan,
        showRPPLink: false,
        userState: userState
      });

      $scope.$digest();

      setTimeout(function () {
        $scope.$digest();
        done();
      });
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should initialize",function() {
    expect($scope.currentPlan).to.be.ok;
    expect($scope.canUpgrade).to.be.a.function;
    expect($scope.canDowngrade).to.be.a.function;
    expect($scope.dismiss).to.be.a.function;

    expect($scope.playerProSubscriptionId).to.be.equal("playerProSubscriptionId");
    expect($scope.companyId).to.be.equal("companyId");

    expect(planFactory.getCompanyPlanStatus).to.have.been.called;
    expect(planFactory.getPlansDetails).to.have.been.called;
  });

  it("should load plans details", function() {
    expect($scope.plans).to.be.not.null;
    expect($loading.start).to.have.been.called;
    expect($loading.stop).to.have.been.called;
  });

  describe("canUpgrade", function() {
    it("should be able to upgrade from Free Plan to any other plan", function() {
      currentPlan.type = "free";
      currentPlan.order = 0;

      expect($scope.canUpgrade({ type: "free", order: 0 })).to.be.false;
      expect($scope.canUpgrade({ type: "starter", order: 1 })).to.be.true;
      expect($scope.canUpgrade({ type: "basic", order: 2 })).to.be.true;
      expect($scope.canUpgrade({ type: "advanced", order: 3 })).to.be.true;
      expect($scope.canUpgrade({ type: "enterprise", order: 4 })).to.be.true;
    });

    it("should be able to upgrade from Starter Plan to Basic, Advanced or Enterprise", function() {
      currentPlan.type = "starter";
      currentPlan.order = 1;

      expect($scope.canUpgrade({ type: "free", order: 0 })).to.be.false;
      expect($scope.canUpgrade({ type: "starter", order: 1 })).to.be.false;
      expect($scope.canUpgrade({ type: "basic", order: 2 })).to.be.true;
      expect($scope.canUpgrade({ type: "advanced", order: 3 })).to.be.true;
      expect($scope.canUpgrade({ type: "enterprise", order: 4 })).to.be.true;
    });

    it("should be able to upgrade from Basic Plan to Advanced or Enterprise", function() {
      currentPlan.type = "basic";
      currentPlan.order = 2;

      expect($scope.canUpgrade({ type: "free", order: 0 })).to.be.false;
      expect($scope.canUpgrade({ type: "starter", order: 1 })).to.be.false;
      expect($scope.canUpgrade({ type: "basic", order: 2 })).to.be.false;
      expect($scope.canUpgrade({ type: "advanced", order: 3 })).to.be.true;
      expect($scope.canUpgrade({ type: "enterprise", order: 4 })).to.be.true;
    });

    it("should be able to upgrade from Advanced Plan to Enterprise", function() {
      currentPlan.type = "advanced";
      currentPlan.order = 3;

      expect($scope.canUpgrade({ type: "free", order: 0 })).to.be.false;
      expect($scope.canUpgrade({ type: "starter", order: 1 })).to.be.false;
      expect($scope.canUpgrade({ type: "basic", order: 2 })).to.be.false;
      expect($scope.canUpgrade({ type: "advanced", order: 3 })).to.be.false;
      expect($scope.canUpgrade({ type: "enterprise", order: 4 })).to.be.true;
    });

    it("should not be able to upgrade from Enterprise Plan to any other plan", function() {
      currentPlan.type = "enterprise";
      currentPlan.order = 4;

      expect($scope.canUpgrade({ type: "free", order: 0 })).to.be.false;
      expect($scope.canUpgrade({ type: "starter", order: 1 })).to.be.false;
      expect($scope.canUpgrade({ type: "basic", order: 2 })).to.be.false;
      expect($scope.canUpgrade({ type: "advanced", order: 3 })).to.be.false;
      expect($scope.canUpgrade({ type: "enterprise", order: 4 })).to.be.false;
    });
  });

  describe("canDowngrade", function() {
    it("should not be able to downgrade from Free Plan to any other plan", function() {
      currentPlan.type = "free";
      currentPlan.order = 0;

      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.false;
      expect($scope.canDowngrade({ type: "starter", order: 1 })).to.be.false;
      expect($scope.canDowngrade({ type: "basic", order: 2 })).to.be.false;
      expect($scope.canDowngrade({ type: "advanced", order: 3 })).to.be.false;
      expect($scope.canDowngrade({ type: "enterprise", order: 4 })).to.be.false;
    });

    it("should be able to downgrade from Starter Plan to Free, unless status is Trial Expired", function() {
      currentPlan.type = "basic";
      currentPlan.order = 2;

      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.true;
      expect($scope.canDowngrade({ type: "starter", order: 1 })).to.be.true;
      expect($scope.canDowngrade({ type: "basic", order: 2 })).to.be.false;
      expect($scope.canDowngrade({ type: "advanced", order: 3 })).to.be.false;
      expect($scope.canDowngrade({ type: "enterprise", order: 4 })).to.be.false;

      sandbox.stub(planFactory, "isTrialExpired").returns(true);
      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.false;
    });

    it("should be able to downgrade from Basic Plan to Free or Starter, unless status is Trial Expired", function() {
      currentPlan.type = "basic";
      currentPlan.order = 2;

      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.true;
      expect($scope.canDowngrade({ type: "starter", order: 1 })).to.be.true;
      expect($scope.canDowngrade({ type: "basic", order: 2 })).to.be.false;
      expect($scope.canDowngrade({ type: "advanced", order: 3 })).to.be.false;
      expect($scope.canDowngrade({ type: "enterprise", order: 4 })).to.be.false;

      sandbox.stub(planFactory, "isTrialExpired").returns(true);
      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.false;
    });

    it("should be able to downgrade from Advanced Plan to Free or Basic, except to Free when status is Trial Expired", function() {
      currentPlan.type = "advanced";
      currentPlan.order = 3;

      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.true;
      expect($scope.canDowngrade({ type: "starter", order: 1 })).to.be.true;
      expect($scope.canDowngrade({ type: "basic", order: 2 })).to.be.true;
      expect($scope.canDowngrade({ type: "advanced", order: 3 })).to.be.false;
      expect($scope.canDowngrade({ type: "enterprise", order: 4 })).to.be.false;

      sandbox.stub(planFactory, "isTrialExpired").returns(true);
      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.false;
    });

    it("should be able to downgrade from Enterprise Plan to any other plan, except to Free when status is Trial Expired", function() {
      currentPlan.type = "enterprise";
      currentPlan.order = 4;

      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.true;
      expect($scope.canDowngrade({ type: "starter", order: 1 })).to.be.true;
      expect($scope.canDowngrade({ type: "basic", order: 2 })).to.be.true;
      expect($scope.canDowngrade({ type: "advanced", order: 3 })).to.be.true;
      expect($scope.canDowngrade({ type: "enterprise", order: 4 })).to.be.false;

      sandbox.stub(planFactory, "isTrialExpired").returns(true);
      expect($scope.canDowngrade({ type: "free", order: 0 })).to.be.false;
    });
  });

  describe("canStartTrial", function() {
    it("should not be able to start trial on the current plan", function() {
      currentPlan.type = "basic";

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE })).to.be.false;
    });

    it("should be able to start trial on trial-available status", function() {
      currentPlan.type = "free";

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE, statusCode: "trial-available" })).to.be.true;
    });

    it("should not be able to start trial on status that is different from trial-available", function() {
      currentPlan.type = "free";
      
      expect($scope.canStartTrial({ type: "advanced", productCode: ADVANCED_PLAN_CODE })).to.be.false;
    });

    it("should not be able to start trial if current plan is Subscribed", function() {
      currentPlan.type = "enterprise";
      currentPlan.planSubscriptionStatus = "Active";

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE })).to.be.false;
      expect($scope.canStartTrial({ type: "advanced", productCode: ADVANCED_PLAN_CODE })).to.be.false;
    });

    it("should be able to start trial if current plan is Subscribed but status is on trial", function() {
      currentPlan.type = "free";
      currentPlan.planSubscriptionStatus = "Trial";

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE, statusCode: "trial-available" })).to.be.true;
    });

    it("should be able to start trial if current plan is Subscribed but status is on trial expired", function() {
      currentPlan.type = "free";
      currentPlan.planSubscriptionStatus = "Trial Expired";

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE, statusCode: "trial-available" })).to.be.true;
    });
  });

  describe("currentPlanLabelVisible", function() {
    it("should show the current plan label if plan is free and current plan has expired", function() {
      sandbox.stub(planFactory, "isTrialExpired").returns(true);
      expect($scope.currentPlanLabelVisible({ type: "free" })).to.be.true;
    });

    it("should show the current plan label if plan is same as current and status is Subscribed/Active", function() {
      currentPlan.type = "advanced";
      expect($scope.currentPlanLabelVisible({ type: "advanced", status: "Active" })).to.be.true;
    });

    it("should show the current plan label if plan is same as current and status is On Trial", function() {
      currentPlan.type = "advanced";
      expect($scope.currentPlanLabelVisible({ type: "advanced", statusCode: "on-trial" })).to.be.true;
    });

    it("should not show the current plan label if plan is free and current plan has not expired", function() {
      sandbox.stub(planFactory, "isTrialExpired").returns(false);
      expect($scope.currentPlanLabelVisible({ type: "free" })).to.be.false;
    });
  });

  describe("subscribeButtonVisible", function() {
    it("should not show the Subscribed button unless it's a trial, it has expired or it's a higher plan", function() {
      expect($scope.subscribeButtonVisible({ statusCode: "subscribed" })).to.be.falsey;
    });

    it("should show the Subscribed button if it is a trial", function() {
      expect($scope.subscribeButtonVisible({ statusCode: "on-trial" })).to.be.true;
    });

    it("should show the Subscribed button if it has expired", function() {
      expect($scope.subscribeButtonVisible({ statusCode: "trial-expired" })).to.be.true;
    });

    it("should show the Subscribed button if it is a higher plan", function() {
      currentPlan.type = "basic";
      currentPlan.order = 2;
      expect($scope.subscribeButtonVisible({ type: "advanced", order: 3 })).to.be.true;
    });
  });

  describe("proSubscriptionLinkVisible", function() {
    it("should not show the Pro Subscription Link if playerProSubscriptionId is null", function() {
      $scope.playerProSubscriptionId = null;
      expect($scope.proSubscriptionLinkVisible()).to.be.falsey;
    });

    it("should not show the Pro Subscription Link if Pro is not Subscribed or Suspended", function() {
      $scope.playerProSubscriptionId = "test";
      sandbox.stub(planFactory, "isProSubscribed").returns(false);
      sandbox.stub(planFactory, "isProSuspended").returns(false);

      expect($scope.proSubscriptionLinkVisible()).to.be.false;
    });

    it("should show the Pro Subscription Link if Pro is Subscribed", function() {
      $scope.playerProSubscriptionId = "test";
      sandbox.stub(planFactory, "isProSubscribed").returns(true);

      expect($scope.proSubscriptionLinkVisible()).to.be.true;
    });

    it("should show the Pro Subscription Link if Pro is Suspended", function() {
      $scope.playerProSubscriptionId = "test";
      sandbox.stub(planFactory, "isProSuspended").returns(true);

      expect($scope.proSubscriptionLinkVisible()).to.be.true;
    });
  });
});
