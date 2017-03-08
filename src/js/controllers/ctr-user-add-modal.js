angular.module("risevision.common.header")

.controller("AddUserModalCtrl", ["$scope", "addUser", "$modalInstance",
  "companyId", "userState", "userRoleMap", "humanReadableError", "messageBox",
  "$loading", "segmentAnalytics",
  function ($scope, addUser, $modalInstance, companyId, userState,
    userRoleMap, humanReadableError, messageBox, $loading,
    segmentAnalytics) {
    $scope.isAdd = true;

    //push roles into array
    $scope.availableRoles = [];
    angular.forEach(userRoleMap, function (v, k) {
      $scope.availableRoles.push({
        key: k,
        name: v
      });
    });

    //convert string to numbers
    $scope.$watch("user.status", function (status) {
      if ($scope.user && typeof $scope.user.status === "string") {
        $scope.user.status = parseInt(status);
      }
    });

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("user-settings-modal");
      } else {
        $loading.stop("user-settings-modal");
      }
    });

    $scope.save = function () {

      $scope.forms.userSettingsForm.email.$pristine = false;
      $scope.forms.userSettingsForm.username.$pristine = false;
      $scope.forms.userSettingsForm.firstName.$pristine = false;
      $scope.forms.userSettingsForm.lastName.$pristine = false;

      if (!$scope.forms.userSettingsForm.$invalid) {
        $scope.loading = true;
        addUser(companyId, $scope.user.username, $scope.user).then(
          function () {
            segmentAnalytics.track("User Created", {
              userId: $scope.user.username,
              companyId: companyId
            });

            $modalInstance.close("success");
          },
          function (error) {
            var errorMessage = "Error: " + humanReadableError(error);
            if (error.code === 409) {
              errorMessage = "A User with the Username '" +
                $scope.user.username +
                "' already belongs to another Company. " +
                "To add them to this Company, they must sign in and delete themselves from their current Company by opening their User Settings and clicking on Delete button.";
            }

            messageBox("User could not be added",
              errorMessage);
          }
        ).finally(function () {
          $scope.loading = false;
        });
      }
    };

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.editRoleAllowed = function (role) {
      if (userState.isRiseAdmin()) {
        return true;
      } else if (userState.isUserAdmin()) {
        if (role.key === "sa" || role.key === "ba") {
          return false;
        } else {
          return true;
        }
      } else {
        //do not allow user to check/uncheck role by default
        return false;
      }
    };

    $scope.editRoleVisible = function (role) {
      if (userState.isRiseAdmin()) {
        if (userState.isSubcompanySelected() && (role.key === "sa" || role.key ===
          "ba")) {
          return false;
        } else {
          return true;
        }
      } else if (userState.isUserAdmin() || userState.isRiseVisionUser()) {
        if (role.key === "sa" || role.key === "ba") {
          return false;
        } else {
          return true;
        }
      } else {
        // in practice should never reach here
        return false;
      }
    };

    $scope.forms = {};

  }
]);
