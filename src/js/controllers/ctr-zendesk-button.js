angular.module("risevision.common.header")

.controller("ZendeskButtonCtrl", ["$scope", "userState", "zendesk",
  function ($scope, userState, zendesk) {
    $scope.isRiseVisionUser = function () {
      return userState.isRiseVisionUser();
    };

    $scope.isLoggedIn = function () {
      return userState.isLoggedIn();
    };

    $scope.showZendeskWidget = function () {
      zendesk.activateWidget();
    };
  }
]);
