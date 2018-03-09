"use strict";

angular.module("risevision.common.components.timeline-basic.services", []);

angular.module("risevision.common.components.timeline-basic", [
  "risevision.common.components.timeline-basic.services",
  "ui.bootstrap"
]);

"use strict";

angular.module("risevision.common.components.timeline-basic.services")
  .factory("timelineBasicDescription", ["$filter",
    function ($filter) {
      var service = {};

      var OPTIONS_DAY_OF_THE_WEEK = ["Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
      ];

      var _filterDateFormat = function (date, useLocaldate, format) {
        var formattedDate = "";
        var dateObject = new Date(date);
        if (useLocaldate) {
          dateObject.setMinutes(dateObject.getMinutes() + dateObject.getTimezoneOffset());
          formattedDate = $filter("date")(dateObject, format);
        } else {
          formattedDate = $filter("date")(dateObject, format);
        }

        return formattedDate;
      };

      service.updateLabel = function (tl) {
        var label = "";
        var weekDays = [];

        if (tl.allDay) {
          label = "All day";
        } else {
          if (tl.startTime) {
            var shortTimeformat = "hh:mm a";
            label = label + _filterDateFormat(tl.startTime, tl.useLocaldate, shortTimeformat) + " ";

            if (tl.endTime) {
              label = label + " to " + _filterDateFormat(tl.endTime, tl.useLocaldate, shortTimeformat) + " ";
            }
          }
        }

        for (var i = 0; i < tl.recurrenceDaysOfWeek.length; i++) {
          if (tl.recurrenceDaysOfWeek[i] === "Mon") {
            weekDays.push(OPTIONS_DAY_OF_THE_WEEK[1]);
          } else if (tl.recurrenceDaysOfWeek[i] === "Tue") {
            weekDays.push(OPTIONS_DAY_OF_THE_WEEK[2]);
          } else if (tl.recurrenceDaysOfWeek[i] === "Wed") {
            weekDays.push(OPTIONS_DAY_OF_THE_WEEK[3]);
          } else if (tl.recurrenceDaysOfWeek[i] === "Thu") {
            weekDays.push(OPTIONS_DAY_OF_THE_WEEK[4]);
          } else if (tl.recurrenceDaysOfWeek[i] === "Fri") {
            weekDays.push(OPTIONS_DAY_OF_THE_WEEK[5]);
          } else if (tl.recurrenceDaysOfWeek[i] === "Sat") {
            weekDays.push(OPTIONS_DAY_OF_THE_WEEK[6]);
          } else if (tl.recurrenceDaysOfWeek[i] === "Sun") {
            weekDays.push(OPTIONS_DAY_OF_THE_WEEK[0]);
          }
        }

        if (tl.everyDay || weekDays.length === 0 || weekDays.length === 7) {
          label = label + " every day";
        } else if (weekDays.length > 0) {
          label = label + " every " + weekDays.join(" ");
        }

        return label;
      };

      return service;
    }
  ]);

"use strict";

angular.module("risevision.common.components.timeline-basic.services")
  .factory("TimelineBasicFactory", [

    function () {
      var _getDateTime = function (hour, minute, useLocaldate) {
        var d = new Date();

        if (useLocaldate) {
          d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute, 0));
        } else {
          d.setHours(hour);
          d.setMinutes(minute);
          d.setSeconds(0);

          d = d.toLocaleDateString("en-US") + " " + d.toLocaleTimeString("en-US");
        }

        return d;
      };

      var _service = function (timeline) {
        var _timeline = timeline;
        var _recurrence = {
          weekly: {},
        };

        var _initRecurrence = function () {
          for (var i = 0; i < _timeline.recurrenceDaysOfWeek.length; i++) {
            if (_timeline.recurrenceDaysOfWeek[i] === "Mon") {
              _recurrence.weekly.monday = true;
            } else if (_timeline.recurrenceDaysOfWeek[i] === "Tue") {
              _recurrence.weekly.tuesday = true;
            } else if (_timeline.recurrenceDaysOfWeek[i] === "Wed") {
              _recurrence.weekly.wednesday = true;
            } else if (_timeline.recurrenceDaysOfWeek[i] === "Thu") {
              _recurrence.weekly.thursday = true;
            } else if (_timeline.recurrenceDaysOfWeek[i] === "Fri") {
              _recurrence.weekly.friday = true;
            } else if (_timeline.recurrenceDaysOfWeek[i] === "Sat") {
              _recurrence.weekly.saturday = true;
            } else if (_timeline.recurrenceDaysOfWeek[i] === "Sun") {
              _recurrence.weekly.sunday = true;
            }
          }
        };

        var _init = function () {
          if (_timeline.allDay) {
            _timeline.startTime = _getDateTime(8, 0, _timeline.useLocaldate);
            _timeline.endTime = _getDateTime(17, 30, _timeline.useLocaldate);
          }

          _initRecurrence();
        };

        _init();

        var _saveRecurrence = function () {
          _timeline.recurrenceDaysOfWeek = [];

          if (_recurrence.weekly.monday) {
            _timeline.recurrenceDaysOfWeek.push("Mon");
          }
          if (_recurrence.weekly.tuesday) {
            _timeline.recurrenceDaysOfWeek.push("Tue");
          }
          if (_recurrence.weekly.wednesday) {
            _timeline.recurrenceDaysOfWeek.push("Wed");
          }
          if (_recurrence.weekly.thursday) {
            _timeline.recurrenceDaysOfWeek.push("Thu");
          }
          if (_recurrence.weekly.friday) {
            _timeline.recurrenceDaysOfWeek.push("Fri");
          }
          if (_recurrence.weekly.saturday) {
            _timeline.recurrenceDaysOfWeek.push("Sat");
          }
          if (_recurrence.weekly.sunday) {
            _timeline.recurrenceDaysOfWeek.push("Sun");
          }
        };

        this.save = function () {
          _timeline.startTime = _timeline.allDay ? null : _timeline.startTime;
          _timeline.endTime = _timeline.allDay ? null : _timeline.endTime;

          _saveRecurrence();
        };

        this.timeline = _timeline;
        this.recurrence = _recurrence;
      };

      _service.getTimeline = function (useLocaldate, timeDefined, startTime, endTime, recurrenceDaysOfWeek) {
        var selectedDays = (recurrenceDaysOfWeek || []).length;
        var allDay = !startTime && !endTime;
        var everyDay = selectedDays === 0 || selectedDays === 7;
        var timeline = {
          useLocaldate: useLocaldate,
          always: allDay && everyDay,
          allDay: allDay,
          everyDay: everyDay,
          startTime: startTime || null,
          endTime: endTime || null,
          recurrenceDaysOfWeek: recurrenceDaysOfWeek || []
        };

        return timeline;
      };

      return _service;
    }
  ]);

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
            ngDisabled: "="
          },
          templateUrl: "timeline-basic/timeline-textbox.html",
          link: function ($scope) {
            // Watch one of the scope variables to see when
            // new data is coming in
            $scope.$watch("startTime", function () {
              $scope.timeline = TimelineBasicFactory.getTimeline(
                $scope.useLocaldate,
                $scope.timeDefined,
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

(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline-basic")
    .controller("timelineBasicModal", ["$scope", "$modalInstance", "timeline",
      "TimelineBasicFactory",
      function ($scope, $modalInstance, timeline, TimelineBasicFactory) {
        var factory = new TimelineBasicFactory(timeline);
        $scope.recurrence = factory.recurrence;
        $scope.timeline = factory.timeline;

        $scope.today = new Date();

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

(function(module) {
try {
  module = angular.module('risevision.common.components.timeline-basic');
} catch (e) {
  module = angular.module('risevision.common.components.timeline-basic', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('timeline-basic/timeline-modal.html',
    '<div id="timelineModal"><div class="modal-header"><button type="button" class="close" ng-click="close()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title">Edit Timeline</h3></div><div class="modal-body" stop-event="touchend"><form role="form" name="timelineDetails" novalidate=""><div class="timeline"><section><label class="control-label u_margin-sm-bottom"><input type="checkbox" ng-model="timeline.allDay"> <strong>All Day</strong></label><div class="row form-group" ng-hide="timeline.allDay"><div class="col-sm-4"><label class="control-label">Start Time</label><div class="time-picker"><timepicker id="startTime" ng-model="timeline.startTime" ng-change="changed()" hour-step="1" minute-step="15" show-meridian="true" datepicker-localdate="{{timeline.useLocaldate}}"></timepicker></div></div><div class="col-sm-4"><label class="control-label">End Time</label><div class="time-picker"><timepicker id="endTime" ng-model="timeline.endTime" ng-change="changed()" hour-step="1" minute-step="15" show-meridian="true" datepicker-localdate="{{timeline.useLocaldate}}"></timepicker></div></div></div></section><section><label class="control-label u_margin-sm-bottom"><input type="checkbox" ng-model="timeline.everyDay"> <strong>Every Day</strong></label><div class="recurrence-option" ng-hide="timeline.everyDay"><div class="form-group timelineWeekdays"><label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.monday"> Monday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.tuesday"> Tuesday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.wednesday"> Wednesday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.thursday"> Thursday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.friday"> Friday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.saturday"> Saturday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.sunday"> Sunday</label></div></div></section></div></form></div><div class="modal-footer"><button type="button" class="btn btn-primary btn-fixed-width" ng-click="save()" ng-disabled="timelineDetails.$invalid">Apply <i class="fa fa-white fa-check icon-right"></i></button> <button type="button" class="btn btn-default btn-fixed-width" ng-click="close()">Cancel <i class="fa fa-times icon-right"></i></button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.timeline-basic');
} catch (e) {
  module = angular.module('risevision.common.components.timeline-basic', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('timeline-basic/timeline-textbox.html',
    '<label class="control-label control-label-secondary u_margin-left"><input ng-model="timeline.always" type="checkbox" ng-disabled="ngDisabled"> Always</label><div id="timelineTextbox" class="panel-editable u_remove-bottom u_clickable" ng-class="{ \'panel-disabled\': ngDisabled }" ng-click="openModal()" ng-show="!timeline.always"><div class="label label-tag"><span id="timelineLabel" timeline="timeline">{{timeline.label}}</span></div></div>');
}]);
})();
