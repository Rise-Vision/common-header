angular.module("risevision.common.components.plans")

.controller("PlansDowngradeModalCtrl", [
  "$scope", "$modalInstance",
  function ($scope, $modalInstance) {

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };
  }
]);
