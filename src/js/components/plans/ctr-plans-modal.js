angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading",
  "planFactory", "currentPlan", "storeAuthorization", "showRPPLink", "userState",
  function ($scope, $modalInstance, $log, $modal, $templateCache, $loading,
    planFactory, currentPlan, storeAuthorization, showRPPLink, userState) {

    $scope.currentPlan = currentPlan;
    $scope.startTrialError = null;
    $scope.showRPPLink = showRPPLink;
    var company = userState.getCopyOfSelectedCompany();
    $scope.playerProSubscriptionId = company.playerProSubscriptionId;
    $scope.companyId = company.id;
    var _allPlansMap = {};

    function _getPlansDetails() {
      $loading.start("plans-modal");

      return planFactory.getCompanyPlanStatus()
        .then(function (allPlansMap) {
          _allPlansMap = allPlansMap;
          return planFactory.getPlansDetails();
        })
        .then(function (plans) {
          $scope.plans = plans;
        })
        .catch(function (err) {
          $log.debug("Failed to load plans", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    }

    $scope.showDowngradeModal = function () {
      $modal.open({
        template: $templateCache.get("plans/plans-downgrade-modal.html"),
        controller: "PlansDowngradeModalCtrl",
        size: "md"
      });
    };

    $scope.isCurrentPlan = function (plan) {
      return currentPlan.type === plan.type;
    };

    $scope.isOnTrial = function (plan) {
      return _allPlansMap[plan.productCode] && _allPlansMap[plan.productCode].statusCode === "on-trial";
    };

    $scope.canUpgrade = function (plan) {
      if ($scope.canStartTrial(plan)) {
        return false;
      } else if (currentPlan.type === plan.type) {
        return false;
      } else if (currentPlan.type === "enterprise") {
        return false;
      } else if (currentPlan.type === "advanced" && plan.type === "enterprise") {
        return true;
      } else if (currentPlan.type === "basic" && (plan.type === "advanced" || plan.type === "enterprise")) {
        return true;
      } else if (currentPlan.type === "free") {
        return true;
      }

      return false;
    };

    $scope.canDowngrade = function (plan) {
      if ($scope.canStartTrial(plan) || $scope.isOnTrial(plan)) {
        return false;
      } else if (currentPlan.type === plan.type) {
        return false;
      } else if (currentPlan.type === "enterprise") {
        return true;
      } else if (currentPlan.type === "advanced" && (plan.type === "free" || plan.type === "basic")) {
        return true;
      } else if (currentPlan.type === "basic" && plan.type === "free") {
        return true;
      }

      return false;
    };

    $scope.canStartTrial = function (plan) {
      if (currentPlan.planSubscriptionStatus === "Active") {
        return false;
      } else if (currentPlan.type === plan.type) {
        return false;
      } else if (_allPlansMap[plan.productCode] &&
        _allPlansMap[plan.productCode].statusCode === "trial-available") {
        return true;
      }

      return false;
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      storeAuthorization.startTrial(plan.productCode)
        .then(function () {
          $modalInstance.close(plan);
        })
        .catch(function (err) {
          $log.debug("Failed to start trial", err);
          $scope.startTrialError = err;
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });

    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.init = function () {
      _getPlansDetails();
    };

    $scope.init();
  }

]);
