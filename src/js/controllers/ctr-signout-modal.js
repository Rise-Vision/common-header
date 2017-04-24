angular.module("risevision.common.header")
  .controller("SignOutModalCtrl", ["$scope", "$modalInstance", "$log",
    "userState",
    function ($scope, $modalInstance, $log, userState) {

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };
      $scope.signOut = function (signOutGoogle) {
        userState.signOut(signOutGoogle).then(function () {
          $log.debug("user signed out");
        }, function (err) {
          console.error("sign out failed", err);
        }).finally(function () {
          $modalInstance.dismiss("success");
        });
      };
    }
  ]);
