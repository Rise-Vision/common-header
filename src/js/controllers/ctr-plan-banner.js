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

      $scope.isFree = currentPlanFactory.isFree;
      $scope.isEnterpriseSubCompany = currentPlanFactory.isEnterpriseSubCompany;
      $scope.isSubscribed = currentPlanFactory.isSubscribed;
      $scope.isOnTrial = currentPlanFactory.isOnTrial;
      $scope.isTrialExpired = currentPlanFactory.isTrialExpired;
      $scope.isSuspended = currentPlanFactory.isSuspended;
      $scope.isCancelled = currentPlanFactory.isCancelled;
    }
  ]);
