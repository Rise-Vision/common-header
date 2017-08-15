angular.module("risevision.common.header")

.controller("CompanyIcpModalCtrl", ["$scope", "$modalInstance",
  "company", "user", "COMPANY_INDUSTRY_FIELDS", "COMPANY_SIZE_FIELDS",
  "COMPANY_ROLE_FIELDS",
  function ($scope, $modalInstance, company, user,
    COMPANY_INDUSTRY_FIELDS, COMPANY_SIZE_FIELDS, COMPANY_ROLE_FIELDS) {

    $scope.company = company;
    $scope.user = user;
    $scope.COMPANY_INDUSTRY_FIELDS = COMPANY_INDUSTRY_FIELDS;
    $scope.COMPANY_SIZE_FIELDS = COMPANY_SIZE_FIELDS;
    $scope.COMPANY_ROLE_FIELDS = COMPANY_ROLE_FIELDS;

    $scope.dismiss = function () {
      $modalInstance.dismiss(user);
    };

    $scope.save = function () {
      $modalInstance.close({
        user: user,
        company: company
      });
    };

    $scope.selectIndustry = function (industryValue) {
      if (company.companyIndustry !== industryValue) {
        company.companyIndustry = industryValue;
      } else {
        company.companyIndustry = "";
      }
    };
  }
]);
