angular.module("risevision.common.components.purchase-flow")

.controller("ReviewSubcriptionCtrl", ["$scope",
  function ($scope) {
    $scope.init = function (plan) {
      $scope.plan = plan;
    };

    $scope.incrementLicenses = function () {
      $scope.plan.additionalDisplayLicenses++;
    };

    $scope.decrementLicenses = function () {
      $scope.plan.additionalDisplayLicenses--;
    };

    $scope.getMonthlyPrice = function () {
      return $scope.plan.monthly.billAmount +
        ($scope.plan.additionalDisplayLicenses * $scope.plan.monthly.priceDisplayMonth);
    };

    $scope.getYearlyPrice = function () {
      return $scope.plan.yearly.billAmount +
        ($scope.plan.additionalDisplayLicenses * $scope.plan.monthly.priceDisplayMonth * 12);
    };
  }

]);
