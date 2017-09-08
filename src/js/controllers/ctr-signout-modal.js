angular.module("risevision.common.header")
  .controller("SignOutModalCtrl", ["$scope", "$modalInstance", "$log",
    "userAuthFactory",
    function ($scope, $modalInstance, $log, userAuthFactory) {

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };
      $scope.signOut = function (signOutGoogle) {
        userAuthFactory.signOut(signOutGoogle).then(function () {
          $log.debug("user signed out");
        }, function (err) {
          console.error("sign out failed", err);
        }).finally(function () {
          $modalInstance.dismiss("success");
        });
      };
    }
  ]);
