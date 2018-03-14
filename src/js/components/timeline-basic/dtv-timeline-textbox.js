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
            startTime: "=",
            endTime: "=",
            recurrenceDaysOfWeek: "=",
            ngDisabled: "="
          },
          templateUrl: "timeline-basic/timeline-textbox.html",
          link: function ($scope) {
            // Watch one of the scope variables to see when
            // new data is coming in
            $scope.$watch("startTime", function () {
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

                $scope.startTime = timeline.startTime;
                $scope.endTime = timeline.endTime;
                $scope.recurrenceDaysOfWeek = timeline.recurrenceDaysOfWeek;

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
