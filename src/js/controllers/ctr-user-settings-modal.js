angular.module("risevision.common.header")
  .filter("humanReadableDateTime", [function () {
    return function (d) {
      if(d) {
        d = new Date(d);
        return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() +
        " at " + d.toLocaleTimeString() + " EST"; //always assume EST
      }
      else {
        return "";
      }
    };

  }])

  .controller("AddUserModalCtrl",
  ["$scope", "addUser", "$modalInstance", "companyId", "userState",
  "userRoleMap", "humanReadableError", "$loading", "$timeout",
  function ($scope, addUser, $modalInstance, companyId, userState,
  userRoleMap, humanReadableError, $loading) {
    $scope.user = {};
    $scope.isAdd = true;

    //push roles into array
    $scope.availableRoles = [];
    angular.forEach(userRoleMap, function (v, k) {
      $scope.availableRoles.push({key: k, name: v});
    });

    //convert string to numbers
    $scope.$watch("user.status", function (status) {
       if(typeof $scope.user.status === "string") {
          $scope.user.status = parseInt(status);
       }
    });

    $scope.$watch("loading", function (loading) {
      if(loading) { $loading.start("user-settings-modal"); }
      else { $loading.stop("user-settings-modal"); }
    });

    $scope.save = function () {

      $scope.forms.userSettingsForm.email.$pristine = false;
      $scope.forms.userSettingsForm.username.$pristine = false;
      $scope.forms.userSettingsForm.firstName.$pristine = false;
      $scope.forms.userSettingsForm.lastName.$pristine = false;

      if(!$scope.forms.userSettingsForm.$invalid) {
        $scope.loading = true;
        addUser(companyId, $scope.user.username, $scope.user).then(
          function () {
            $modalInstance.close("success");
          },
          function (error) {
            alert("Error" + humanReadableError(error));
          }
        ).finally(function () {
          $scope.loading = false;
        });
      }
    };

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };

    $scope.editRoleAllowed = function (role) {
      if(userState.isRiseAdmin()) {
        return true;
      }
      else if (userState.isUserAdmin()) {
        if(role.key === "sa" || role.key === "ba") {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        //do not allow user to check/uncheck role by default
        return false;
      }
    };

    $scope.editRoleVisible = function (role) {
      if(userState.isRiseAdmin()) {
        return true;
      }
      else if (userState.isUserAdmin() || userState.isRiseVisionUser()) {
        if(role.key === "sa" || role.key === "ba") {
          return false;
        }
        else {
          return true;
        }
      }
      else {
        // in practice should never reach here
        return false;
      }
    };

    $scope.forms = {};

  }])

  .controller("UserSettingsModalCtrl", [
    "$scope", "$modalInstance", "updateUser", "getUserProfile", "deleteUser",
    "addUser", "username", "userRoleMap", "$log", "$loading", "userState",
    "uiFlowManager", "humanReadableError",
    function($scope, $modalInstance, updateUser, getUserProfile, deleteUser,
      addUser, username, userRoleMap, $log, $loading, userState,
      uiFlowManager, humanReadableError) {
      $scope.user = {};
      $scope.$watch("loading", function (loading) {
        if(loading) { $loading.start("user-settings-modal"); }
        else { $loading.stop("user-settings-modal"); }
      });

      //push roles into array
      $scope.availableRoles = [];
      angular.forEach(userRoleMap, function (v, k) {
        $scope.availableRoles.push({key: k, name: v});
      });

      // convert string to numbers
      $scope.$watch("user.status", function (status) {
         if(typeof $scope.user.status === "string") {
            $scope.user.status = parseInt(status);
         }
      });

      $scope.isUserAdmin = userState.isUserAdmin();
      $scope.username = username;

      $scope.loading = true;
      getUserProfile(username).then(function (user) {
        $scope.user = user;
        $scope.editingYourself = userState.getUsername() === user.username;

      }).finally(function () {$scope.loading = false; });

      $scope.closeModal = function() {
        $modalInstance.dismiss("cancel");
      };

      $scope.deleteUser = function () {
        if (confirm("Are you sure you want to delete this user?")) {
          deleteUser($scope.username)
            .then(function () {
              if($scope.username === userState.getUsername()) {
                userState.signOut().then().finally(function() {
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

        if(!$scope.forms.userSettingsForm.$invalid) {
          $scope.loading = true;
          updateUser(username, $scope.user).then(
            function () {
              $modalInstance.close("success");
            },
            function (error) {
              $log.debug(error);
              alert("Error: " + humanReadableError(error));
            }
          ).finally(function (){
            if(username === userState.getUsername()) {
              userState.refreshProfile();
            }
            $scope.loading = false;
          });
        }
      };

      $scope.editRoleAllowed = function (role) {
        if(userState.isRiseAdmin()) {
          return true;
        }
        else if (userState.isUserAdmin()) {
          if(role.key === "sa" || role.key === "ba") {
            return false;
          }
          else if (role.key ==="ua" &&
            userState.getUsername() === $scope.user.username) {
            //cannot unassign oneself from ua
            return false;
          }
          else {
            return true;
          }
        }
        else {
          //do not allow user to check/uncheck role by default
          return false;
        }
      };

      $scope.editRoleVisible = function (role) {
        if(userState.isRiseAdmin()) {
          return true;
        }
        else if (userState.isUserAdmin() || userState.isRiseVisionUser()) {
          if(role.key === "sa" || role.key === "ba") {
            return false;
          }
          else {
            return true;
          }
        }
        else {
          // in practice should never reach here
          return false;
        }
      };

      $scope.forms = {};

    }
  ]);
