"use strict";

angular.module("risevision.common.components.purchase-flow")
  .directive("yearSelector", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/year-selector.html"),
        replace: "true",
        scope: {
          ngModel: "="
        },
        controller: ["$scope",
          function ($scope) {
            var baseYear = new Date().getFullYear();
            var MAX_COUNT = 20;
            $scope.years = [];

            $scope.init = function () {

              if ($scope.ngModel < baseYear) {
                $scope.years.push($scope.ngModel);
              }

              for (var i = 0; i < MAX_COUNT; i++) {
                $scope.years.push(baseYear + i);
              }
            };

            $scope.init();
          }
        ]

      };
    }
  ]);
