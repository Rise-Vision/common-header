angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$loading", "$timeout",
  "plansFactory", "currentPlanFactory", "chargebeeFactory", "userState",
  function ($scope, $rootScope, $modalInstance, $log, $loading, $timeout,
    plansFactory, currentPlanFactory, chargebeeFactory, userState) {

    $scope.currentPlan = currentPlanFactory.currentPlan;
    $scope.startTrialError = null;
    $scope.monthlyPrices = true;

    function _getPlansDetails() {
      $loading.start("plans-modal");

      return plansFactory.getPlansDetails()
        .then(function (resp) {
          $scope.plans = resp;
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    }

    $scope.isCurrentPlan = function (plan) {
      return $scope.currentPlan.type === plan.type;
    };

    $scope.isCurrentPlanSubscribed = function (plan) {
      return $scope.isCurrentPlan(plan) && $scope.isSubscribed(plan);
    };

    $scope.isOnTrial = function (plan) {
      return plan.statusCode === "on-trial";
    };

    $scope.isTrialAvailable = function (plan) {
      return plan.statusCode === "trial-available";
    };

    $scope.isTrialExpired = function (plan) {
      return plan.statusCode === "trial-expired";
    };

    $scope.isSubscribed = function (plan) {
      return plan.status === "Subscribed" || plan.status === "Active";
    };

    $scope.isFree = function (plan) {
      return plan.type === "free";
    };

    $scope.isStarter = function (plan) {
      return plan.type === "starter";
    };

    $scope.showSavings = function (plan) {
      return !$scope.isFree(plan) && (!$scope.isStarter(plan) || !$scope.monthlyPrices);
    };

    $scope.currentPlanLabelVisible = function (plan) {
      // Has a Plan?
      if (currentPlanFactory.isPlanActive()) {
        // Is it the Current Plan?
        return $scope.isCurrentPlan(plan);
      } else { // Were on Free Plan
        // Is it the Free Plan?
        return $scope.isFree(plan);
      }
    };

    $scope.getVisibleAction = function (plan) {
      // Has a Plan?
      if (currentPlanFactory.isPlanActive()) {
        // Is this that Plan?
        if ($scope.isCurrentPlan(plan)) {
          // Can buy Subscription?
          if ($scope.isOnTrial(plan)) {
            return "subscribe";
          } else {
            return "";
          }
        } else { // This is a different Plan
          // Is lower Plan?
          if ($scope.currentPlan.order > plan.order) {
            return "downgrade";
          } else { // Higher Plan
            return "subscribe";
          }
        }
      } else { // Were on Free Plan
        // Is there a Trial?
        if ($scope.isFree(plan)) {
          return "";
        } else if ($scope.isTrialAvailable(plan)) {
          return "start-trial";
        } else { // Subscribe
          return "subscribe";
        }
      }
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      plansFactory.startTrial(plan)
        .then(function () {
          return $timeout(5000)
            .then(function () {
              return userState.reloadSelectedCompany();
            })
            .then(function () {
              $rootScope.$emit("risevision.company.trial.started");
            })
            .catch(function (err) {
              $log.debug("Failed to reload company", err);
            })
            .finally(function () {
              $modalInstance.close(plan);
            });
        })
        .catch(function (err) {
          $scope.startTrialError = err;
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    };

    $scope.downgradePlan = function () {
      chargebeeFactory.openPortal(userState.getSelectedCompanyId());
    };

    $scope.purchaseAdditionalLicenses = function () {
      chargebeeFactory.openPortal(userState.getSelectedCompanyId());
    };

    $scope.isChargebee = function () {
      return userState.isSelectedCompanyChargebee();
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
