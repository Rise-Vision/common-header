angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$modal", "$templateCache", "$loading", "$timeout", "$q",
  "planFactory", "currentPlan", "storeAuthorization", "showRPPLink", "userState",
  function ($scope, $rootScope, $modalInstance, $log, $modal, $templateCache, $loading, $timeout, $q,
    planFactory, currentPlan, storeAuthorization, showRPPLink, userState) {

    var company = userState.getCopyOfSelectedCompany();
    $scope.currentPlan = currentPlan;
    $scope.startTrialError = null;
    $scope.showRPPLink = showRPPLink;
    $scope.playerProSubscriptionId = company.playerProSubscriptionId;
    $scope.companyId = company.id;

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

    $scope.currentButtonVisible = function (plan) {
      var freeOnCurrentExpired = $scope.isFree(plan) && planFactory.isTrialExpired();
      var currentSubscribed = $scope.isCurrentPlan(plan) && $scope.isSubscribed(plan);

      return freeOnCurrentExpired || currentSubscribed;
    };

    $scope.subscribeButtonVisible = function (plan) {
      return $scope.isOnTrial(plan) || $scope.isTrialExpired(plan) || $scope.canUpgrade(plan);
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
      } else if ($scope.isFree(plan) && planFactory.isTrialExpired()) {
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
      } else {
        return $scope.isTrialAvailable(plan);
      }
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      storeAuthorization.startTrial(plan.productCode)
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
