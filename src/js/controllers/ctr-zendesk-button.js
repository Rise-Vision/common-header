angular.module("risevision.common.header")

.controller("ZendeskButtonCtrl", ["$scope", "userState", "zendesk",
  function ($scope, userState, zendesk) {
    $scope.showZendeskWidget = function () {
      zendesk.activateWidget();
    };
  }
]);
