angular.module("risevision.common.header")
.controller("RegistrationModalCtrl", [
  "$scope", "$modalInstance",
  "$loading", "registerAccount", "$log", "cookieStore",
  "userState", "pick", "uiFlowManager", "humanReadableError",
  function($scope, $modalInstance, $loading, registerAccount, $log,
    cookieStore, userState, pick, uiFlowManager, humanReadableError) {

      var copyOfProfile = userState.getCopyOfProfile() || {};

      //remove cookie so that it will show next time user refreshes page
      cookieStore.remove("surpressRegistration");


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
        function () { return uiFlowManager.isStatusUndetermined(); },
        function (undetermined) {
          if(undetermined === true) {
              //start the spinner
              $loading.start("registration-modal");
          }
          else if (undetermined === false) {
            if(uiFlowManager.getStatus() === "registrationComplete") {
              $modalInstance.close("success");
              //stop the watch
              watch();
            }
            $loading.stop("registration-modal");
          }
      });

      $scope.save = function () {
        $scope.forms.registrationForm.accepted.$pristine = false;
        $scope.forms.registrationForm.firstName.$pristine = false;
        $scope.forms.registrationForm.lastName.$pristine = false;
        $scope.forms.registrationForm.email.$pristine = false;

        if(!$scope.forms.registrationForm.$invalid) {
           //update terms and conditions date
           $scope.registering = true;
           $loading.start("registration-modal");
           registerAccount(userState.getUsername(), $scope.profile).then(
             function () {
               userState.authenticate(false).then().finally(function () {
                 $modalInstance.close("success");
               });
             },
             function (err) {alert("Error: " + humanReadableError(err));
             $log.error(err);}).finally(function () {
               $scope.registering = false;
               $loading.stop("registration-modal");
               userState.authenticate(false);
             });
        }

      };
      $scope.forms = {};
    }
]);
