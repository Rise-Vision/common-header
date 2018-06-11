angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading", "$timeout", "$q",
  "planFactory", "currentPlan", "showRPPLink", "userState",
  function ($scope, $rootScope, $modalInstance, $log, $modal, $templateCache, $loading, $timeout, $q,
    planFactory, currentPlan, showRPPLink, userState) {

    var company = userState.getCopyOfSelectedCompany();
    $scope.currentPlan = currentPlan;
    $scope.startTrialError = null;
    $scope.showRPPLink = showRPPLink;
    $scope.playerProSubscriptionId = company.playerProSubscriptionId;
    $scope.companyId = company.id;
    $scope.monthlyPrices = true;

    function _getPlansDetails() {
      $loading.start("plans-modal");

      return $q.all([planFactory.getCompanyPlanStatus(), planFactory.getPlansDetails()])
        .then(function (resp) {
          var plansStatusMap = resp[0];

          $scope.plans = resp[1];
          $scope.plans.forEach(function (p) {
            var plan = plansStatusMap[p.productCode] || p;
            p.status = plan.status;
            p.statusCode = plan.statusCode;
          });
        })
        .catch(function (err) {
          $log.debug("Failed to load plans", err);
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    }

    $scope.isCurrentPlan = function (plan) {
      return currentPlan.type === plan.type;
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
      var freeOnCurrentExpired = $scope.isFree(plan) && planFactory.isTrialExpired();
      var currentActive = $scope.isCurrentPlan(plan) && ($scope.isSubscribed(plan) || $scope.isOnTrial(plan));

      return freeOnCurrentExpired || currentActive;
    };

    $scope.subscribeButtonVisible = function (plan) {
      return $scope.isOnTrial(plan) || $scope.isTrialExpired(plan) || $scope.canUpgrade(plan);
    };

    $scope.proSubscriptionLinkVisible = function () {
      return $scope.playerProSubscriptionId && (planFactory.isProSubscribed() || planFactory.isProSuspended());
    };

    $scope.canUpgrade = function (plan) {
      if ($scope.canStartTrial(plan)) {
        return false;
      } else {
        return currentPlan.order < plan.order;
      }
    };

    $scope.canDowngrade = function (plan) {
      if ($scope.canStartTrial(plan) || $scope.isOnTrial(plan) || planFactory.isTrialExpired()) {
        return false;
      } else {
        return currentPlan.order > plan.order;
      }
    };

    $scope.canStartTrial = function (plan) {
      if (currentPlan.planSubscriptionStatus === "Active") {
        return false;
      } else if (currentPlan.type === plan.type) {
        return false;
      } else {
        return $scope.isTrialAvailable(plan);
      }
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      planFactory.startTrial(plan)
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

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.init = function () {
      _getPlansDetails();
    };

    $scope.init();
  }

]);
