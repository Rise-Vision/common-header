angular.module("risevision.common.header")

.controller("HelpSendUsANoteModalCtrl", [
  "$scope", "$modalInstance", "subscriptionStatus", "supportFactory",
  "zendesk",
  "SUPPORT_PRODUCT_URL",
  function ($scope, $modalInstance, subscriptionStatus, supportFactory,
    zendesk,
    SUPPORT_PRODUCT_URL) {

    $scope.subscriptionStatus = subscriptionStatus;
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
