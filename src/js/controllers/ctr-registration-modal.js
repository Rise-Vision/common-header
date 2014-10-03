angular.module("risevision.common.header")
.controller("RegistrationModalCtrl", [
  "$scope", "$modalInstance",
  "$loading", "registerAccount", "$log", "cookieStore",
  "userState", "pick", "uiStatusManager",
  function($scope, $modalInstance, $loading,
    registerAccount, $log, cookieStore, userState, pick, uiStatusManager) {

      var copyOfProfile = userState.getCopyOfProfile() || {};

      $scope.profile = pick(copyOfProfile, "email", "mailSyncEnabled");
      $scope.registering = false;

      $scope.profile.accepted =
        angular.isDefined(copyOfProfile.termsAcceptanceDate) &&
          copyOfProfile.termsAcceptanceDate !== null;

      if(!angular.isDefined($scope.profile.mailSyncEnabled)) {
        //"no sign up" by default
        $scope.profile.mailSyncEnabled = false;
      }

      $scope.closeModal = function() {
        cookieStore.put("surpressRegistration", true);
        $modalInstance.dismiss("cancel");
      };

      // check status, load spinner, or close dialog if registration is complete
      var watch = $scope.$watch(
        function () { return uiStatusManager.isStatusUndetermined(); },
        function (undetermined) {
          if(undetermined === true) {
              //start the spinner
              $loading.start("registration-modal");
          }
          else if (undetermined === false) {
          $loading.stop("registration-modal");
            if(uiStatusManager.getStatus() === "registrationComplete") {
              $modalInstance.close("success");
              //stop the watch
              watch();
            }
          }
      });

      $scope.save = function () {
        $scope.registrationForm.accepted.$pristine = false;
        $scope.registrationForm.email.$pristine = false;

        if(!$scope.registrationForm.$invalid) {
           //update terms and conditions date
           $scope.registering = true;
           $loading.start("registration-modal");
           registerAccount(userState.getUsername(), $scope.profile).then(
             function () {
               $modalInstance.close("success");
               uiStatusManager.invalidateStatus("registrationComplete");
             },
             function (err) {alert("Error: " + JSON.stringify(err));
             $log.error(err);}).finally(function () {
               $scope.registering = false;
               $loading.stop("registration-modal");
               userState.authenticate(false);
             });
        }

      };
    }
]);
