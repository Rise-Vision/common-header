angular.module("risevision.common.header")

.controller("HelpDropdownButtonCtrl", ["zendesk", "$scope", "supportFactory",
  "userState",
  function (zendesk, $scope, supportFactory, userState) {

    $scope.$watch(function () {
        return userState.isLoggedIn();
      },
      function (loggedIn) {
        $scope.isLoggedIn = loggedIn;

        if (loggedIn) {
          zendesk.ensureScript();
        }
      });

    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (riseVisionUser) {
        $scope.isRiseVisionUser = riseVisionUser;

      });

    $scope.getSupport = function () {
      supportFactory.handleGetSupportAction();
    };
  }
]);
