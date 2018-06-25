angular.module("risevision.common.header")
  .controller("PlanBannerCtrl", ["$scope", "$rootScope", "$log", "userState", "planFactory", "STORE_URL",
    "ACCOUNT_PATH",
    function ($scope, $rootScope, $log, userState, planFactory, STORE_URL, ACCOUNT_PATH) {
      $scope.plan = {};
      $scope.showPlans = planFactory.showPlansModal;

      $rootScope.$on("risevision.plan.loaded", function () {
        $scope.plan = planFactory.currentPlan;
        $scope.companyId = userState.getSelectedCompanyId();
        $scope.storeAccountUrl = STORE_URL + ACCOUNT_PATH.replace("companyId", $scope.companyId);
      });

      $scope.isFree = planFactory.isFree;
      $scope.isEnterpriseSubCompany = planFactory.isEnterpriseSubCompany;
      $scope.isSubscribed = planFactory.isSubscribed;
      $scope.isOnTrial = planFactory.isOnTrial;
      $scope.isTrialExpired = planFactory.isTrialExpired;
      $scope.isSuspended = planFactory.isSuspended;
      $scope.isCancelled = planFactory.isCancelled;
      $scope.isProSubscribed = planFactory.isProSubscribed;
    }
  ]);
