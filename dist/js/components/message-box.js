"use strict";

angular.module("risevision.common.components.message-box.services", [])
  .factory("messageBox", ["$modal", "$templateCache",
    function ($modal, $templateCache) {
      return function (title, message, close, windowClass, templateUrl) {
        var options = {
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
        };

        if (windowClass) {
          options.windowClass = windowClass;
        }

        if (!templateUrl) {
          options.template = $templateCache.get("message-box/message-box.html");
        } else {
          options.templateUrl = templateUrl;
        }

        return $modal.open(options);
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
