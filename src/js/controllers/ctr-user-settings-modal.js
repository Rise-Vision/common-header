angular.module("risevision.common.header")

.controller("UserSettingsModalCtrl", [
  "$scope", "$filter", "$modalInstance", "updateUser", "getUserProfile",
  "deleteUser", "username", "userRoleMap", "$log", "$loading", "userState",
  "uiFlowManager", "humanReadableError", "messageBox", "$rootScope",
  "segmentAnalytics",
  function ($scope, $filter, $modalInstance, updateUser, getUserProfile,
    deleteUser, username, userRoleMap, $log, $loading, userState,
    uiFlowManager, humanReadableError, messageBox, $rootScope,
    segmentAnalytics) {
    $scope.user = {};
    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("user-settings-modal");
      } else {
        $loading.stop("user-settings-modal");
      }
    });

    //push roles into array
    $scope.availableRoles = [];
    angular.forEach(userRoleMap, function (v, k) {
      $scope.availableRoles.push({
        key: k,
        name: v
      });
    });

    // convert string to numbers
    $scope.$watch("user.status", function (status) {
      if (typeof $scope.user.status === "string") {
        $scope.user.status = parseInt(status);
      }
    });

    $scope.isUserAdmin = userState.isUserAdmin();
    $scope.username = username;

    $scope.loading = true;
    getUserProfile(username).then(function (user) {
      $scope.user = user;
      $scope.editingYourself = userState.checkUsername(user.username);

    }).finally(function () {
      $scope.loading = false;
    });

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.deleteUser = function () {
      if (confirm("Are you sure you want to delete this user?")) {
        deleteUser($scope.username)
          .then(function () {
            segmentAnalytics.track("User Deleted", {
              userId: $scope.username,
              companyId: userState.getSelectedCompanyId(),
              isSelf: userState.checkUsername(username)
            });

            if (userState.checkUsername(username)) {
              userState.signOut().then().finally(function () {
                uiFlowManager.invalidateStatus("registrationComplete");
              });
            }
          })
          .finally(function () {
            $modalInstance.dismiss("deleted");
          });
      }
    };

    $scope.save = function () {
      $scope.forms.userSettingsForm.email.$pristine = false;
      $scope.forms.userSettingsForm.firstName.$pristine = false;
      $scope.forms.userSettingsForm.lastName.$pristine = false;

      if (!$scope.forms.userSettingsForm.$invalid) {
        $scope.loading = true;
        updateUser(username, $scope.user).then(
          function (resp) {
            if (userState.checkUsername(username)) {
              userState.updateUserProfile(resp.item);
            }

            segmentAnalytics.track("User Updated", {
              userId: $scope.username,
              companyId: userState.getSelectedCompanyId(),
              isSelf: userState.checkUsername(username)
            });

            $modalInstance.close("success");
          },
          function (error) {
            $log.debug(error);
            var errorMessage = "Error: " + humanReadableError(error);
            if (error.code === 409) {
              errorMessage = $filter("translate")(
                "common-header.user.error.duplicate-user", {
                  "username": $scope.user.username
                });
            }

            messageBox("common-header.user.error.update-user", errorMessage);
          }
        ).finally(function () {
          $scope.loading = false;
        });
      }
    };

    $scope.editRoleAllowed = function (role) {
      if (userState.isRiseAdmin()) {
        return true;
      } else if (userState.isUserAdmin()) {
        if (role.key === "sa" || role.key === "ba") {
          return false;
        } else if (role.key === "ua" &&
          userState.checkUsername($scope.user.username)) {
          //cannot unassign oneself from ua
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
