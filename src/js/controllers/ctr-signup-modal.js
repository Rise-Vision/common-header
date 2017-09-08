angular.module("risevision.common.header")
  .controller("SignUpModalCtrl", ["$scope", "userAuthFactory", "uiFlowManager",
    "$loading",
    function ($scope, userAuthFactory, uiFlowManager, $loading) {

      // Login Modal
      $scope.login = function (endStatus) {
        $loading.startGlobal("auth-buttons-login");
        userAuthFactory.authenticate(true).then().finally(function () {
          $loading.stopGlobal("auth-buttons-login");
          uiFlowManager.invalidateStatus(endStatus);
        });
      };
    }
  ]);
