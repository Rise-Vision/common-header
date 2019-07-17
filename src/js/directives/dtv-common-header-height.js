"use strict";

angular.module("risevision.common.header.directives")
  .directive("commonHeaderHeight", ["$rootScope", "$window", "$timeout",
    function ($rootScope, $window, $timeout) {
      return {
        restrict: "A",
        scope: false,
        compile: function (elem) {
          var _updateHeight = function () {
            // Wait for the digest cycle to finish updating the UI
            $timeout(function () {
              var commonHeaderDiv = $window.document.getElementById("commonHeaderDiv");
              var elemStyle = $window.getComputedStyle(commonHeaderDiv);
              var currentHeightPx = elemStyle.getPropertyValue("height");
              var currentHeight = parseInt(currentHeightPx);

              elem[0].style.setProperty("--common-header-height", currentHeight + "px");
            });
          };

          _updateHeight();

          $rootScope.$on("risevision.company.selectedCompanyChanged", _updateHeight);
          // Should take care of plan & company settings updates
          $rootScope.$on("risevision.company.updated", _updateHeight);
        } //link()
      };
    }
  ]);
