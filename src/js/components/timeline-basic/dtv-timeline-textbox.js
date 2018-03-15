(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline-basic")
    .directive("timelineBasicTextbox", ["$modal", "TimelineBasicFactory",
      "timelineBasicDescription",
      function ($modal, TimelineBasicFactory, timelineBasicDescription) {
        return {
          restrict: "E",
          scope: {
            useLocaldate: "=",
            timeDefined: "=",
            startTime: "=",
            endTime: "=",
            recurrenceDaysOfWeek: "=",
            latestUpdate: "=",
            ngDisabled: "="
          },
          templateUrl: "timeline-basic/timeline-textbox.html",
          link: function ($scope) {
            // Watch a scope variable that's updated whenever data changes
            $scope.$watch("latestUpdate", function () {
              $scope.timeline = TimelineBasicFactory.getTimeline(
                $scope.useLocaldate,
                $scope.startTime,
                $scope.endTime,
                $scope.recurrenceDaysOfWeek);

              $scope.timeline.label = timelineBasicDescription.updateLabel($scope.timeline);
            });

            $scope.$watch("timeline.always", function (newValue) {
              $scope.timeDefined = !newValue;
            });

            $scope.openModal = function () {
              if ($scope.ngDisabled) {
                return;
              }

              var modalInstance = $modal.open({
                templateUrl: "timeline-basic/timeline-modal.html",
                controller: "timelineBasicModal",
                resolve: {
                  timeline: function () {
                    return angular.copy($scope.timeline);
                  }
                },
                size: "md"
              });

              modalInstance.result.then(function (timeline) {
                //do what you need if user presses ok
                $scope.timeline = timeline;

                $scope.timeDefined = !(timeline.allDay && timeline.everyDay);
                $scope.startTime = timeline.startTime;
                $scope.endTime = timeline.endTime;
                $scope.recurrenceDaysOfWeek = timeline.recurrenceDaysOfWeek;
                $scope.latestUpdate = Date.now();

                $scope.timeline.label = timelineBasicDescription.updateLabel($scope.timeline);
              }, function () {
                // do what you need to do if user cancels
              });
            };
          }
        };
      }
    ]);
})(angular);
