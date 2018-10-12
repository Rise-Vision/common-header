angular.module("risevision.common.header")


.controller("CompanySettingsModalCtrl", ["$scope", "$modalInstance",
  "updateCompany", "companyId", "countries", "REGIONS_CA", "REGIONS_US",
  "TIMEZONES", "getCompany", "regenerateCompanyField", "$window", "$loading",
  "humanReadableError", "userState", "userAuthFactory", "deleteCompany",
  "segmentAnalytics", "$modal", "$templateCache",
  "COMPANY_INDUSTRY_FIELDS", "COMPANY_SIZE_FIELDS",
  function ($scope, $modalInstance, updateCompany, companyId,
    countries, REGIONS_CA, REGIONS_US, TIMEZONES, getCompany,
    regenerateCompanyField, $window, $loading, humanReadableError,
    userState, userAuthFactory, deleteCompany, segmentAnalytics,
    $modal, $templateCache, COMPANY_INDUSTRY_FIELDS, COMPANY_SIZE_FIELDS) {

    $scope.company = {
      id: companyId
    };
    $scope.countries = countries;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;
    $scope.timezones = TIMEZONES;
    $scope.COMPANY_INDUSTRY_FIELDS = COMPANY_INDUSTRY_FIELDS;
    $scope.COMPANY_SIZE_FIELDS = COMPANY_SIZE_FIELDS;
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
          $scope.company.isSeller = company && company.sellerId ? true : false;
          $scope.company.isChargebee = company && company.origin === "Chargebee";
        },
        function (resp) {
          $window.alert("An error has occurred. " + humanReadableError(resp));
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
            segmentAnalytics.track("Company Updated", {
              companyId: userState.getSelectedCompanyId(),
              companyName: userState.getSelectedCompanyName(),
              isUserCompany: !userState.isSubcompanySelected()
            });

            userState.updateCompanySettings($scope.company);
            $modalInstance.close("success");
          })
        .catch(
          function (error) {
            $window.alert("Error(s): " + humanReadableError(error));
          })
        .finally(function () {
          $scope.loading = false;
        });
    };
    $scope.deleteCompany = function () {
      var instance = $modal.open({
        template: $templateCache.get("safe-delete-modal.html"),
        controller: "SafeDeleteModalCtrl"
      });
      instance.result.then(function () {
        $scope.loading = true;
        deleteCompany($scope.company.id)
          .then(
            function () {
              segmentAnalytics.track("Company Deleted", {
                companyId: userState.getSelectedCompanyId(),
                companyName: userState.getSelectedCompanyName(),
                isUserCompany: !userState.isSubcompanySelected()
              });

              if (userState.getUserCompanyId() === $scope.company.id) {
                userAuthFactory.signOut();
              } else if (userState.getSelectedCompanyId() === $scope.company
                .id) {
                userState.resetCompany();
              }
              $modalInstance.close("success");
            })
          .catch(
            function (error) {
              $window.alert("Error(s): " + humanReadableError(error));
            })
          .finally(function () {
            $scope.loading = false;
          });
      });
    };
    $scope.resetAuthKey = function () {
      if ($window.confirm(
        "Resetting the Company Authentication Key will cause existing Data Gadgets to no longer report data until they are updated with the new Key."
      )) {
        $loading.start("company-settings-modal");
        regenerateCompanyField($scope.company.id, "authKey").then(
          function (resp) {
            $scope.company.authKey = resp.item;
            $window.alert("Successfully changed Authentication Key.");
          },
          function (error) {
            $window.alert("Error: " + humanReadableError(error));
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
            $window.alert("Successfully changed Claim ID.");
          },
          function (error) {
            $window.alert("Error: " + humanReadableError(error));
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
        delete company.sellerId;
        delete company.isTest;
        delete company.shareCompanyPlan;
      }
    }

  }
]);
