angular.module("risevision.common.header")
  .controller("PlanBannerCtrl", ["$scope", "$rootScope", "$log", "$modal", "$templateCache", "userState", "planFactory",
    "STORE_URL", "ACCOUNT_PATH",
    function ($scope, $rootScope, $log, $modal, $templateCache, userState, planFactory, STORE_URL, ACCOUNT_PATH) {
      $scope.plan = {};

      $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
        $scope.companyId = userState.getSelectedCompanyId();
        $scope.storeAccountUrl = STORE_URL + ACCOUNT_PATH.replace("companyId", $scope.companyId);
        $scope.loadCompanyPlan();
      });

      $scope.loadCompanyPlan = function () {
        if (userState.getSelectedCompanyId()) {
          planFactory.getCompanyPlan($scope.companyId)
            .then(function (plan) {
              $log.debug("Current plan", plan);
              $scope.plan = plan;
            })
            .catch(function (err) {
              $log.debug("Failed to load company's plan", err);
            });
        }
      };

      $scope.showPlans = function () {
        $modal.open({
          template: $templateCache.get("plans-modal.html"),
          controller: "PlansModalCtrl",
          size: "lg"
        });
      };
    }
  ]);
