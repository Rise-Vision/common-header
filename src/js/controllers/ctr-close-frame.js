angular.module("risevision.common.header")

.controller("CloseFrameButtonCtrl", [
  "$scope", "$log", "gadgetsService", "$rootScope",
  function ($scope, $log, gadgetsService, $rootScope) {
    $scope.closeIFrame = function () {
      if (typeof $rootScope.closeIFrame === "function") {
        $rootScope.closeIFrame();
      } else {
        $log.debug("gadgetsService.closeIFrame");
        gadgetsService.closeIFrame();
      }
    };

  }
]);
