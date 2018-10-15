angular.module("risevision.common.header")
  .controller("PlanBannerCtrl", ["$scope", "$rootScope", "userState", "plansFactory",
    "currentPlanFactory", "STORE_URL", "ACCOUNT_PATH",
    function ($scope, $rootScope, userState, plansFactory, currentPlanFactory,
      STORE_URL, ACCOUNT_PATH) {
      $scope.plan = {};
      $scope.showPlans = plansFactory.showPlansModal;

      $rootScope.$on("risevision.plan.loaded", function () {
        $scope.plan = currentPlanFactory.currentPlan;
        $scope.companyId = userState.getSelectedCompanyId();
        $scope.storeAccountUrl = STORE_URL + ACCOUNT_PATH.replace("companyId", $scope.companyId);
      });

      $scope.isEnterpriseSubCompany = currentPlanFactory.isEnterpriseSubCompany;

      $scope.getVisibleBanner = function () {
        var banner = "free";

        if (currentPlanFactory.isParentPlan()) {
          banner = "parent";
        } else if (currentPlanFactory.isFree() || currentPlanFactory.isCancelled()) {
          banner = "free";
        } else if (currentPlanFactory.isSubscribed()) {
          banner = "subscribed";
        } else if (currentPlanFactory.isOnTrial()) {
          banner = "trial";
        } else if (currentPlanFactory.isTrialExpired()) {
          banner = "expired";
        } else if (currentPlanFactory.isSuspended()) {
          banner = "suspended";
        }

        return banner;
      };

    }
  ]);
