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
          return Q.resolve([]);
        }
      };
    });
    $provide.service("$modal", function() {
      return {
        open: sinon.stub()
      };
    });
  }));

  var sandbox, $scope, $modalInstance, $modal, $loading, $log, planFactory, currentPlan, allPlansMap;
  var BASIC_PLAN_CODE, ADVANCED_PLAN_CODE, ENTERPRISE_PLAN_CODE;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector, $rootScope, $controller) {
      $scope = $rootScope.$new();
      $modalInstance = $injector.get("$modalInstance");
      $modal = $injector.get("$modal");
      $loading = $injector.get("$loading");
      $log = $injector.get("$log");
      planFactory = $injector.get("planFactory");
      currentPlan = {};
      allPlansMap = {};

      sandbox.spy(planFactory, "getPlansDetails");

      var plansByType = _.keyBy($injector.get("PLANS_LIST"), "type");

      BASIC_PLAN_CODE = plansByType.basic.pc;
      ADVANCED_PLAN_CODE = plansByType.advanced.pc;
      ENTERPRISE_PLAN_CODE = plansByType.enterprise.pc;

      $controller("PlansModalCtrl", {
        $scope: $scope,
        $modalInstance: $modalInstance,
        $modal: $modal,
        $loading: $loading,
        planFactory: planFactory,
        currentPlan: currentPlan,
        allPlansMap: allPlansMap
      });

      $scope.$digest();
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should initialize",function() {
    expect($scope.currentPlan).to.be.ok;
    expect($scope.getPlansDetails).to.be.a.function;
    expect($scope.showDowngradeModal).to.be.a.function;
    expect($scope.canUpgrade).to.be.a.function;
    expect($scope.canDowngrade).to.be.a.function;
    expect($scope.dismiss).to.be.a.function;

    expect(planFactory.getPlansDetails).to.have.been.called;
  });

  it("should load plans details", function() {
    $scope.plans = null;

    return $scope.getPlansDetails()
    .then(function() {
      expect($scope.plans).to.be.not.null;
      expect($loading.start).to.have.been.called;
      expect($loading.stop).to.have.been.called;
    });
  });

  it("should show downgrade modal", function() {
    $scope.showDowngradeModal();

    expect($modal.open).to.have.been.called;
  });

  describe("canUpgrade", function() {
    it("should be able to upgrade from Free Plan to any other plan", function() {
      currentPlan.type = "free";

      expect($scope.canUpgrade({ type: "free" })).to.be.false;
      expect($scope.canUpgrade({ type: "basic" })).to.be.true;
      expect($scope.canUpgrade({ type: "advanced" })).to.be.true;
      expect($scope.canUpgrade({ type: "enterprise" })).to.be.true;
    });

    it("should be able to upgrade from Basic Plan to Advanced or Enterprise", function() {
      currentPlan.type = "basic";

      expect($scope.canUpgrade({ type: "free" })).to.be.false;
      expect($scope.canUpgrade({ type: "basic" })).to.be.false;
      expect($scope.canUpgrade({ type: "advanced" })).to.be.true;
      expect($scope.canUpgrade({ type: "enterprise" })).to.be.true;
    });

    it("should be able to upgrade from Advanced Plan to Enterprise", function() {
      currentPlan.type = "advanced";

      expect($scope.canUpgrade({ type: "free" })).to.be.false;
      expect($scope.canUpgrade({ type: "basic" })).to.be.false;
      expect($scope.canUpgrade({ type: "advanced" })).to.be.false;
      expect($scope.canUpgrade({ type: "enterprise" })).to.be.true;
    });

    it("should not be able to upgrade from Enterprise Plan to any other plan", function() {
      currentPlan.type = "enterprise";

      expect($scope.canUpgrade({ type: "free" })).to.be.false;
      expect($scope.canUpgrade({ type: "basic" })).to.be.false;
      expect($scope.canUpgrade({ type: "advanced" })).to.be.false;
      expect($scope.canUpgrade({ type: "enterprise" })).to.be.false;
    });
  });

  describe("canDowngrade", function() {
    it("should not be able to downgrade from Free Plan to any other plan", function() {
      currentPlan.type = "free";

      expect($scope.canDowngrade({ type: "free" })).to.be.false;
      expect($scope.canDowngrade({ type: "basic" })).to.be.false;
      expect($scope.canDowngrade({ type: "advanced" })).to.be.false;
      expect($scope.canDowngrade({ type: "enterprise" })).to.be.false;
    });

    it("should be able to downgrade from Basic Plan to Free", function() {
      currentPlan.type = "basic";

      expect($scope.canDowngrade({ type: "free" })).to.be.true;
      expect($scope.canDowngrade({ type: "basic" })).to.be.false;
      expect($scope.canDowngrade({ type: "advanced" })).to.be.false;
      expect($scope.canDowngrade({ type: "enterprise" })).to.be.false;
    });

    it("should be able to downgrade from Advanced Plan to Free or Basic", function() {
      currentPlan.type = "advanced";

      expect($scope.canDowngrade({ type: "free" })).to.be.true;
      expect($scope.canDowngrade({ type: "basic" })).to.be.true;
      expect($scope.canDowngrade({ type: "advanced" })).to.be.false;
      expect($scope.canDowngrade({ type: "enterprise" })).to.be.false;
    });

    it("should be able to downgrade from Enterprise Plan to any other plan", function() {
      currentPlan.type = "enterprise";

      expect($scope.canDowngrade({ type: "free" })).to.be.true;
      expect($scope.canDowngrade({ type: "basic" })).to.be.true;
      expect($scope.canDowngrade({ type: "advanced" })).to.be.true;
      expect($scope.canDowngrade({ type: "enterprise" })).to.be.false;
    });
  });

  describe("canStartTrial", function() {
    it("should not be able to start trial on the current plan", function() {
      currentPlan.type = "basic";

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE })).to.be.false;
    });

    it("should be able to start trial on trial-available status", function() {
      currentPlan.type = "free";
      allPlansMap[BASIC_PLAN_CODE] = { statusCode: "trial-available", trialPeriod: 10 };
      allPlansMap[ADVANCED_PLAN_CODE] = { statusCode: "trial-available", trialPeriod: 10 };

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE })).to.be.true;
      expect($scope.canStartTrial({ type: "advanced", productCode: ADVANCED_PLAN_CODE })).to.be.true;
    });

    it("should not be able to start trial on status that is different from trial-available", function() {
      currentPlan.type = "free";
      allPlansMap[BASIC_PLAN_CODE] = { statusCode: "subscribed", trialPeriod: 10 };
      allPlansMap[ADVANCED_PLAN_CODE] = { statusCode: "cancelled", trialPeriod: 10 };

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE })).to.be.false;
      expect($scope.canStartTrial({ type: "advanced", productCode: ADVANCED_PLAN_CODE })).to.be.false;
    });

    it("should take into consideration trial period", function() {
      currentPlan.type = "free";
      allPlansMap[BASIC_PLAN_CODE] = { statusCode: "trial-available", trialPeriod: 10 };
      allPlansMap[ADVANCED_PLAN_CODE] = { statusCode: "trial-available", trialPeriod: 0 };

      expect($scope.canStartTrial({ type: "basic", productCode: BASIC_PLAN_CODE })).to.be.true;
      expect($scope.canStartTrial({ type: "advanced", productCode: ADVANCED_PLAN_CODE })).to.be.false;
    });
  });
});
