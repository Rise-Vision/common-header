angular.module("risevision.common.header")

.filter("roleLabel", ["userRoleMap",
  function (userRoleMap) {
    return function (key) {
      return userRoleMap[key];
    };
  }
])

.controller("CompanyUsersModalCtrl", ["$scope", "$modalInstance", "$modal",
  "$templateCache", "company", "getUsers", "$loading",
  function ($scope, $modalInstance, $modal, $templateCache, company, getUsers,
    $loading) {

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("company-users-list");
      } else {
        $loading.stop("company-users-list");
      }
    });

    $scope.sort = {
      field: "username",
      descending: false
    };

    $scope.search = {
      query: ""
    };
    $scope.filterConfig = {
      placeholder: "Search Users"
    };

    $scope.changeSorting = function (field) {
      var sort = $scope.sort;

      if (sort.field === field) {
        sort.descending = !sort.descending;
      } else {
        sort.field = field;
        sort.descending = false;
      }
    };

    var loadUsers = function () {
      $scope.loading = true;
      getUsers({
        companyId: company.id,
        search: $scope.search.query
      }).then(function (users) {
        $scope.users = users;
      }).finally(function () {
        $scope.loading = false;
      });
    };

    loadUsers();

    $scope.addUser = function (size) {
      var instance = $modal.open({
        template: $templateCache.get("user-settings-modal.html"),
        controller: "AddUserModalCtrl",
        size: size,
        resolve: {
          companyId: function () {
            return company.id;
          }
        }
      });
      instance.result.finally(loadUsers);
    };

    $scope.editUser = function (username, size) {
      var instance = $modal.open({
        template: $templateCache.get("user-settings-modal.html"),
        controller: "UserSettingsModalCtrl",
        size: size,
        resolve: {
          username: function () {
            return username;
          },
          add: function () {
            return false;
          }
        }
      });
      instance.result.finally(loadUsers);
    };

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.doSearch = function () {
      $scope.users = [];
      loadUsers();
    };
  }
]);
