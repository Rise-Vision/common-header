(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .factory("playerLicenseFactory", ["userState", "currentPlanFactory",
      function (userState, currentPlanFactory) {
        var _factory = {};

        _factory.hasProfessionalLicenses = function () {
          return currentPlanFactory.isPlanActive() || currentPlanFactory.isProSubscribed();
        };

        _factory.getProLicenseCount = function () {
          var planProLicenses = (currentPlanFactory.isPlanActive() && currentPlanFactory.currentPlan.planPlayerProLicenseCount) ||
            0;
          var extraProLicenses = (currentPlanFactory.isProSubscribed() && currentPlanFactory.currentPlan.playerProLicenseCount) ||
            0;

          return planProLicenses + extraProLicenses;
        };

        _factory.areAllProLicensesUsed = function () {
          var company = userState.getCopyOfSelectedCompany();
          var maxProDisplays = _factory.getProLicenseCount();
          var assignedDisplays = company.playerProAssignedDisplays || [];

          return assignedDisplays.length >= maxProDisplays;
        };

        _factory.toggleDisplayLicenseLocal = function (displayId, playerProAuthorized) {
          var company = userState.getCopyOfSelectedCompany(true);
          var assignedDisplays = company.playerProAssignedDisplays || [];

          if (playerProAuthorized && assignedDisplays.indexOf(displayId) === -1) {
            assignedDisplays.push(displayId);
          } else if (!playerProAuthorized && assignedDisplays.indexOf(displayId) >= 0) {
            assignedDisplays.splice(assignedDisplays.indexOf(displayId), 1);
          }

          company.playerProAssignedDisplays = assignedDisplays;
          userState.updateCompanySettings(company);
        };

        return _factory;
      }
    ]);

})(angular);
