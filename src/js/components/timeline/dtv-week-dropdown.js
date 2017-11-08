(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline")
    .directive("monthDropdown",
      function () {
        return {
          restrict: "E",
          scope: {
            month: "="
          },
          templateUrl: "timeline/month-dropdown.html"
        };
      }
  );
})(angular);
