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
    }
  ]);
