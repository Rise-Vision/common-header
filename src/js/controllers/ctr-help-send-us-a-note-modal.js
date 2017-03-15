angular.module("risevision.common.header")

.controller("HelpSendUsANoteModalCtrl", [
  "$scope", "$modalInstance", "supportFactory",
  "zendesk", "userState",
  "SUPPORT_PRODUCT_URL",
  function ($scope, $modalInstance, supportFactory,
    zendesk, userState, SUPPORT_PRODUCT_URL) {

    $scope.loggedIn = userState.isLoggedIn();
    $scope.supportProductUrl = SUPPORT_PRODUCT_URL;

    $scope.sendUsANote = function () {
      zendesk.showSendNote();
      $scope.dismiss();
    };

    $scope.prioritySupport = function () {
      zendesk.showWidget();
      $scope.dismiss();
    };

    $scope.startTrial = function () {
      supportFactory.initiateTrial().then(function () {
        $scope.dismiss();
      });
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };

  }
]);
