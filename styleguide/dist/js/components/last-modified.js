(function () {
  "use strict";

  angular.module("risevision.common.components.last-modified", [])
    .directive("lastModified", ["$templateCache",
      function ($templateCache) {
        return {
          restrict: "E",
          scope: {
            changeDate: "=",
            changedBy: "="
          },
          template: $templateCache.get("last-modified/last-modified.html"),
          link: function ($scope) {
            $scope.$watch("changedBy", function (newVal) {
              $scope.changedBy = newVal ? newVal : "N/A";
            });
          } //link()
        };
      }
    ]);
}());

(function () {
  "use strict";

  // Simple filter that removes the domain from an email
  // for example, bld@riseholdings.com would return bld
  angular.module("risevision.common.components.last-modified")
    .filter("username", function () {
      return function (email) {
        var username = email;
        if (email && email.indexOf("@") !== -1) {
          username = email.substring(0, email.indexOf("@"));
        }
        return username;
      };
    });
}());

(function(module) {
try {
  module = angular.module('risevision.common.components.last-modified');
} catch (e) {
  module = angular.module('risevision.common.components.last-modified', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('last-modified/last-modified.html',
    '<span class="text-muted"><small>Saved {{changeDate | date:\'d-MMM-yyyy h:mm a\'}} by {{changedBy | username}}</small></span>');
}]);
})();
