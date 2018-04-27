angular.module("risevision.common.header")

.controller("HelpDropdownButtonCtrl", ["zendesk", "$scope", "supportFactory",
  "userState",
  function (zendesk, $scope, supportFactory, userState) {

    $scope.$watch(function () {
        return userState.isLoggedIn();
      },
      function (loggedIn) {
        $scope.isLoggedIn = loggedIn;


      });

    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (riseVisionUser) {
        $scope.isRiseVisionUser = riseVisionUser;

      });

    // TODO: Deprecate: button currently links to Support Form URL
    $scope.getSupport = function () {
      supportFactory.handleGetSupportAction();
    };
  }
]);
