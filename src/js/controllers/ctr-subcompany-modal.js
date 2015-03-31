angular.module("risevision.common.header")
.controller("SubCompanyModalCtrl", ["$scope", "$modalInstance", "$modal",
  "$templateCache", "createCompany", "REGIONS_CA", "REGIONS_US",
  "TIMEZONES", "userState", "$loading", "humanReadableError",
  function($scope, $modalInstance, $modal, $templateCache,
    createCompany, REGIONS_CA, REGIONS_US, TIMEZONES, userState, 
    $loading, humanReadableError) {

    $scope.company = {};
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;
    $scope.timezones = TIMEZONES;

    $scope.forms = {};

    $scope.$watch("loading", function (loading) {
      if(loading) { $loading.start("add-subcompany-modal"); }
      else { $loading.stop("add-subcompany-modal"); }
    });

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
    $scope.save = function () {
      $scope.loading = true;
      createCompany(userState.getSelectedCompanyId(),
        $scope.company).then(function () {
        $modalInstance.close("success");
      }, function (err) {alert("Error: " + humanReadableError(err)); })
      .finally(function () {$scope.loading = false; });
    };
    // Show Move Company Modal
    $scope.moveCompany = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("move-company-modal.html"),
        controller: "MoveCompanyModalCtrl",
        size: size
      });
    };
  }
]);
