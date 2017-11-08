(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline")
    .directive("weekDropdown",
      function () {
        return {
          restrict: "E",
          scope: {
            week: "="
          },
          templateUrl: "timeline/week-dropdown.html"
        };
      }
  );
})(angular);
