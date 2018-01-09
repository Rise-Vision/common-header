angular.module("risevision.common.header")

.controller("PlansDowngradeModalCtrl", [
  "$scope", "$modalInstance",
  function ($scope, $modalInstance) {

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };
  }
]);
