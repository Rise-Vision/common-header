(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .factory("playerLicenseFactory", ["userState", "currentPlanFactory",
      function (userState, currentPlanFactory) {
        var _factory = {};

        _factory.hasProfessionalLicenses = function () {
          return currentPlanFactory.currentPlan.playerProTotalLicenseCount > 0;
        };

        _factory.getProLicenseCount = function () {
          return currentPlanFactory.currentPlan.playerProTotalLicenseCount || 0;
        };

        _factory.areAllProLicensesUsed = function () {
          return currentPlanFactory.currentPlan.playerProAvailableLicenseCount <= 0;
        };

        _factory.toggleDisplayLicenseLocal = function (playerProAuthorized) {
          var company = userState.getCopyOfSelectedCompany(true);
          var availableLicenseCount = company.playerProAvailableLicenseCount;

          if (playerProAuthorized) {
            availableLicenseCount--;
            availableLicenseCount = availableLicenseCount < 0 ? 0 : availableLicenseCount;
          } else {
            availableLicenseCount++;
          }

          company.playerProAvailableLicenseCount = availableLicenseCount;
          userState.updateCompanySettings(company);
        };

        return _factory;
      }
    ]);

})(angular);
