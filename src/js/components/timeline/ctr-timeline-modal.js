(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline")
    .controller("timelineModal", ["$scope", "$modalInstance", "timeline",
      "TimelineFactory",
      function ($scope, $modalInstance, timeline, TimelineFactory) {
        var factory = new TimelineFactory(timeline);
        $scope.recurrence = factory.recurrence;
        $scope.timeline = factory.timeline;

        $scope.dateOptions = {
          formatYear: "yy",
          startingDay: 1,
          showWeeks: false,
          showButtonBar: false
        };

        $scope.today = new Date();
        $scope.datepickers = {};

        $scope.openDatepicker = function ($event, which) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.datepickers[which] = true;
        };

        $scope.save = function () {
          factory.save();
          $modalInstance.close($scope.timeline);
        };

        $scope.close = function () {
          $modalInstance.dismiss();
        };
      }
    ]);
})(angular);
