angular.module("risevision.common.header")
  .controller("PlanBannerCtrl", ["$scope", "$rootScope", "$log", "$modal", "$templateCache", "userState", "planFactory",
    function ($scope, $rootScope, $log, $modal, $templateCache, userState, planFactory) {
      $scope.plan = {};

      $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
        $scope.loadCompanyPlan();
      });

      $scope.loadCompanyPlan = function () {
        planFactory.getCompanyPlan(userState.getSelectedCompanyId())
          .then(function (plan) {
            $log.debug("Current plan", plan);
            $scope.plan = plan;
          })
          .catch(function (err) {
            $log.debug("Failed to load company's plan", err);
          });
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
