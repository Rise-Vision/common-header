angular.module("risevision.common.header")

.controller("CompanySettingsModalCtrl", [
  "$scope", "$rootScope", "$modalInstance",
  "updateCompany", "companyId", "countries",
  "REGIONS_CA", "REGIONS_US", "TIMEZONES",
  "getCompany", "regenerateCompanyField", "$window", "$loading",
  "humanReadableError", "userState", "deleteCompany",
  function ($scope, $rootScope, $modalInstance,
    updateCompany, companyId, countries,
    REGIONS_CA, REGIONS_US, TIMEZONES,
    getCompany, regenerateCompanyField, $window, $loading,
    humanReadableError, userState, deleteCompany) {

    $scope.company = {
      id: companyId
    };
    $scope.countries = countries;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;
    $scope.timezones = TIMEZONES;
    $scope.isRiseStoreAdmin = userState.isRiseStoreAdmin();

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("company-settings-modal");
      } else {
        $loading.stop("company-settings-modal");
      }
    });

    $scope.loading = false;

    $scope.forms = {};

    if (companyId) {
      $scope.loading = true;
      getCompany(companyId).then(
        function (company) {
          $scope.company = company;
          $scope.company.isSeller = company && company.sellerId ? true :
            false;
        },
        function (resp) {
          alert("An error has occurred. " + humanReadableError(resp));
        }).finally(function () {
        $scope.loading = false;
      });
    }
    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };
    $scope.save = function () {
      $scope.loading = true;

      var company = angular.copy($scope.company);

      verifyAdmin(company);
      updateCompany($scope.company.id, company)
        .then(
          function () {
            userState.updateCompanySettings($scope.company);
            $rootScope.$broadcast("companySettings.save", $scope.company);
            $modalInstance.close("success");
          })
        .catch(
          function (error) {
            alert("Error(s): " + humanReadableError(error));
          })
        .finally(function () {
          $scope.loading = false;
        });
    };
    $scope.deleteCompany = function () {
      if (confirm("Are you sure you want to delete this company?")) {
        $scope.loading = true;

        deleteCompany($scope.company.id)
          .then(
            function () {
              if (userState.getUserCompanyId() === $scope.company.id) {
                userState.signOut();
              } else if (userState.getSelectedCompanyId() === $scope.company.id) {
                userState.resetCompany();
              }
              $modalInstance.close("success");
            })
          .catch(
            function (error) {
              alert("Error(s): " + humanReadableError(error));
            })
          .finally(function () {
            $scope.loading = false;
          });
      }
    };
    $scope.resetAuthKey = function () {
      if ($window.confirm(
        "Resetting the Company Authentication Key will cause existing Data Gadgets to no longer report data until they are updated with the new Key."
      )) {
        $loading.start("company-settings-modal");
        regenerateCompanyField($scope.company.id, "authKey").then(
          function (resp) {
            $scope.company.authKey = resp.item;
            alert("Successfully changed Authentication Key.");
          },
          function (error) {
            alert("Error: " + humanReadableError(error));
          })
          .finally(function () {
            $loading.stop("company-settings-modal");
          });
      }
    };
    $scope.resetClaimId = function () {
      if ($window.confirm(
        "Resetting the Company Claim Id will cause existing installations to no longer be associated with your Company."
      )) {
        $loading.start("company-settings-modal");
        regenerateCompanyField($scope.company.id, "claimId").then(
          function (resp) {
            $scope.company.claimId = resp.item;
            alert("Successfully changed Claim ID.");
          },
          function (error) {
            alert("Error: " + humanReadableError(error));
          })
          .finally(function () {
            $loading.stop("company-settings-modal");
          });
      }
    };

    function verifyAdmin(company) {
      if ($scope.isRiseStoreAdmin) {
        company.sellerId = company.isSeller ? "yes" : null;
      } else {
        //exclude fields from API call
        company.sellerId = undefined;
        company.isTest = undefined;
      }
    }

  }
]);
