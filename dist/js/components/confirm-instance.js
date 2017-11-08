"use strict";

angular.module("risevision.common.components.confirm-instance", [])
  .controller("confirmInstance", ["$scope", "$modalInstance",
    "confirmationTitle", "confirmationMessage", "confirmationButton",
    "cancelButton",
    function ($scope, $modalInstance, confirmationTitle, confirmationMessage,
      confirmationButton, cancelButton) {
      $scope.confirmationTitle = confirmationTitle;
      $scope.confirmationMessage = confirmationMessage;
      $scope.confirmationButton = confirmationButton ? confirmationButton :
        "common.ok";
      $scope.cancelButton = cancelButton ? cancelButton : "common.cancel";

      $scope.ok = function () {
        $modalInstance.close();
      };
      $scope.cancel = function () {
        $modalInstance.dismiss("cancel");
      };
      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.confirm-instance');
} catch (e) {
  module = angular.module('risevision.common.components.confirm-instance', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('confirm-instance/confirm-modal.html',
    '<form id="confirmForm"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">{{confirmationTitle}}</h3></div><div class="modal-body" stop-event="touchend"><p translate="">{{confirmationMessage}}</p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()"><span translate="{{confirmationButton}}"></span> <i class="fa fa-white fa-check icon-right"></i></button> <button class="btn btn-default btn-fixed-width" ng-click="cancel()"><span translate="{{cancelButton}}"></span> <i class="fa fa-white fa-times icon-right"></i></button></div></form>');
}]);
})();
