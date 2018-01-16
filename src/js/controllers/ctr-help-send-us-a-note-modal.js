angular.module("risevision.common.header")

.controller("HelpSendUsANoteModalCtrl", [
  "$scope", "$modalInstance", "supportFactory", "zendesk", "userState", "planFactory",
  function ($scope, $modalInstance, supportFactory, zendesk, userState, planFactory) {

    $scope.showPlansModal = planFactory.showPlansModal;
    $scope.loggedIn = userState.isLoggedIn();

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
