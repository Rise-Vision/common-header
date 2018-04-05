angular.module("risevision.common.header")
  .controller("RegistrationModalCtrl", [
    "$q", "$scope", "$rootScope", "$modalInstance",
    "$loading", "registerAccount", "$log", "cookieStore",
    "userState", "pick", "uiFlowManager", "humanReadableError",
    "agreeToTermsAndUpdateUser", "account", "segmentAnalytics",
    "bigQueryLogging", "analyticsEvents", "updateCompany", "planFactory",
    function ($q, $scope, $rootScope, $modalInstance, $loading, registerAccount,
      $log,
      cookieStore, userState, pick, uiFlowManager, humanReadableError,
      agreeToTermsAndUpdateUser, account, segmentAnalytics, bigQueryLogging,
      analyticsEvents, updateCompany, planFactory) {

      $scope.newUser = !account;

      var copyOfProfile = account ? account : userState.getCopyOfProfile() || {};

      $scope.company = {};

      //remove cookie so that it will show next time user refreshes page
      cookieStore.remove("surpressRegistration");


      $scope.profile = pick(copyOfProfile, "email", "mailSyncEnabled",
        "firstName", "lastName");
      $scope.profile.email = $scope.profile.email || userState.getUsername();
      $scope.registering = false;

      $scope.profile.accepted =
        angular.isDefined(copyOfProfile.termsAcceptanceDate) &&
        copyOfProfile.termsAcceptanceDate !== null;

      if (!angular.isDefined($scope.profile.mailSyncEnabled)) {
        //"no sign up" by default
        $scope.profile.mailSyncEnabled = false;
      }

      $scope.closeModal = function () {
        cookieStore.put("surpressRegistration", true);
        $modalInstance.dismiss("cancel");
      };

      // check status, load spinner, or close dialog if registration is complete
      var watch = $scope.$watch(
        function () {
          return uiFlowManager.isStatusUndetermined();
        },
        function (undetermined) {
          if (undetermined === true) {
            //start the spinner
            $loading.start("registration-modal");
          } else if (undetermined === false) {
            if (uiFlowManager.getStatus() === "registrationComplete") {
              $modalInstance.close("success");
              //stop the watch
              watch();
            }
            $loading.stop("registration-modal");
          }
        });

      var updateCompanyWebsite = function () {
        if ($scope.newUser && $scope.company.website) {
          return updateCompany(userState.getUserCompanyId(), $scope.company);
        } else {
          return $q.defer().resolve();
        }
      };

      $scope.save = function () {
        $scope.forms.registrationForm.accepted.$pristine = false;
        $scope.forms.registrationForm.firstName.$pristine = false;
        $scope.forms.registrationForm.lastName.$pristine = false;

        if (!$scope.forms.registrationForm.$invalid) {
          //update terms and conditions date
          $scope.registering = true;
          $loading.start("registration-modal");


          var action;
          if ($scope.newUser) {
            action = registerAccount(userState.getUsername(), $scope.profile);
          } else {
            action = agreeToTermsAndUpdateUser(userState.getUsername(),
              $scope.profile);
          }

          action.then(
            function () {
              userState.refreshProfile()
                .then()
                .finally(function () {
                  if ($scope.newUser) {
                    planFactory.startBasicPlanTrial();
                  }

                  updateCompanyWebsite();
                  analyticsEvents.identify();
                  segmentAnalytics.track("User Registered", {
                    "companyId": userState.getUserCompanyId(),
                    "companyName": userState.getUserCompanyName(),
                    "isNewCompany": $scope.newUser
                  });
                  bigQueryLogging.logEvent("User Registered");
                  $rootScope.$broadcast(
                    "risevision.user.authorized");

                  $modalInstance.close("success");
                  $loading.stop("registration-modal");
                });
            },
            function (err) {
              alert("Error: " + humanReadableError(err));
              console.error(err);
            })
            .finally(function () {
              $scope.registering = false;
              userState.refreshProfile();
            });
        }

      };
      $scope.forms = {};
    }
  ]);
