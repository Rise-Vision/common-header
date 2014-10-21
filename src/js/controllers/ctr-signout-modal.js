angular.module("risevision.common.header")
.controller("SignOutModalCtrl", ["$scope", "$modalInstance", "$log", "$window", "userState", 
  function($scope, $modalInstance, $log, $window, userState) {

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
    $scope.singOut = function () {
      userState.signOut().then(function (){
        $log.error("user signed out");
      }, function (err) {
        $log.error("sign out failed", err);
      });
      $modalInstance.dismiss("success");
    };
    $scope.singOutGoogleAccount = function () {
      $window.logoutFrame.location = "https://accounts.google.com/Logout";
      $scope.singOut();
    };
  }
]);
