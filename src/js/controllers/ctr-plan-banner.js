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

      $scope.isFree = function () {
        return $scope.plan.type === "Free";
      };

      $scope.isEnterpriseSubCompany = function () {
        return $scope.plan.type === "enterprisesub";
      };

      $scope.isSubscribed = function () {
        return !$scope.isFree() && $scope.plan.status === "Subscribed";
      };

      $scope.isOnTrial = function () {
        return !$scope.isFree() && $scope.plan.status === "On Trial";
      };

      $scope.isTrialExpired = function () {
        return !$scope.isFree() && $scope.plan.status === "Trial Expired";
      };

      $scope.isSuspended = function () {
        return !$scope.isFree() && $scope.plan.status === "Suspended";
      };
    }
  ]);
