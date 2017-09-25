angular.module("risevision.common.header")

.controller("CompanyIcpModalCtrl", ["$scope", "$modalInstance",
  "company", "user", "COMPANY_INDUSTRY_FIELDS", "COMPANY_SIZE_FIELDS",
  "COMPANY_ROLE_FIELDS",
  function ($scope, $modalInstance, company, user,
    COMPANY_INDUSTRY_FIELDS, COMPANY_SIZE_FIELDS, COMPANY_ROLE_FIELDS) {

    $scope.company = company;
    $scope.user = user;
    $scope.COMPANY_SIZE_FIELDS = COMPANY_SIZE_FIELDS;
    $scope.COMPANY_ROLE_FIELDS = COMPANY_ROLE_FIELDS;
    $scope.ICON_INDUSTRY_FIELDS = [];
    $scope.DROPDOWN_INDUSTRY_FIELDS = [];
    $scope.otherSelected = false;

    COMPANY_INDUSTRY_FIELDS.forEach(function (industry) {
      if (company.companyIndustry === industry[1] && !industry[2]) {
        $scope.otherSelected = true;
      }

      if (industry[2]) {
        $scope.ICON_INDUSTRY_FIELDS.push(industry);
      } else {
        $scope.DROPDOWN_INDUSTRY_FIELDS.push(industry);
      }
    });

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
      $scope.otherSelected = false;

      if (company.companyIndustry !== industryValue) {
        company.companyIndustry = industryValue;
      } else {
        company.companyIndustry = "";
      }
    };

    $scope.selectOther = function () {
      $scope.otherSelected = !$scope.otherSelected;

      company.companyIndustry = "";
    };
  }
]);
