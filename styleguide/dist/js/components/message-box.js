"use strict";

angular.module("risevision.common.components.message-box.services", [])
  .factory("messageBox", ["$q", "$log", "$modal", "$templateCache",
    function ($q, $log, $modal, $templateCache) {
      return function (title, message, close) {
        return $modal.open({
          template: $templateCache.get("message-box/message-box.html"),
          controller: "messageBoxInstance",
          size: "md",
          resolve: {
            title: function () {
              return title;
            },
            message: function () {
              return message;
            },
            button: function () {
              return close || "common.ok";
            }
          }
        });
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.message-box", [
  "risevision.common.components.message-box.services"
])
  .controller("messageBoxInstance", ["$scope", "$modalInstance",
    "title", "message", "button",
    function ($scope, $modalInstance, title, message, button) {
      $scope.title = title;
      $scope.message = message;
      $scope.button = button ? button : "common.close";

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.message-box');
} catch (e) {
  module = angular.module('risevision.common.components.message-box', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('message-box/message-box.html',
    '<form id="messageForm"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">{{title}}</h3></div><div class="modal-body" stop-event="touchend"><p translate="">{{message}}</p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="dismiss()"><span translate="{{button}}"></span> <i class="fa fa-white fa-check icon-right"></i></button></div></form>');
}]);
})();
