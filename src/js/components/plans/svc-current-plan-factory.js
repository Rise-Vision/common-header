(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .factory("currentPlanFactory", ["$log", "$rootScope", "userState", "PLANS_LIST",
      function ($log, $rootScope, userState, PLANS_LIST) {
        var _factory = {};
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "productCode");

        var _loadCurrentPlan = function () {
          var company = userState.getCopyOfSelectedCompany();
          var plan = null;

          if (company.id && company.planProductCode) {
            plan = _.cloneDeep(_plansByCode[company.planProductCode]);
            plan.status = company.planSubscriptionStatus;
            plan.trialPeriod = company.planTrialPeriod;
            plan.proStatus = company.playerProSubscriptionStatus;
            plan.planPlayerProLicenseCount = company.planPlayerProLicenseCount;
            plan.playerProLicenseCount = company.playerProLicenseCount;
          } else {
            plan = _.cloneDeep(_plansByType.free);
          }

          _factory.currentPlan = plan;
          $log.debug("Current plan", plan);
          $rootScope.$emit("risevision.plan.loaded", plan);
        };

        _factory.isPlanActive = function () {
          return _factory.isSubscribed() || _factory.isOnTrial();
        };

        _factory.isFree = function () {
          return _factory.currentPlan.type === "free";
        };

        _factory.isEnterpriseSubCompany = function () {
          return _factory.currentPlan.type === "enterprisesub";
        };

        _factory.isSubscribed = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Active";
        };

        _factory.isOnTrial = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Trial";
        };

        _factory.isTrialExpired = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Trial Expired";
        };

        _factory.isSuspended = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Suspended";
        };

        _factory.isCancelled = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Cancelled";
        };

        _factory.isProSubscribed = function () {
          return _factory.currentPlan.proStatus === "Active";
        };

        _factory.isProSuspended = function () {
          return _factory.currentPlan.proStatus === "Suspended";
        };

        _loadCurrentPlan();

        $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
          _loadCurrentPlan();
        });

        $rootScope.$on("risevision.company.updated", function () {
          _loadCurrentPlan();
        });

        return _factory;
      }
    ]);

})(angular);
