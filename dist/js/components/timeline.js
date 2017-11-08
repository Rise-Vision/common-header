"use strict";

angular.module("risevision.common.components.timeline.services", []);

angular.module("risevision.common.components.timeline", [
  "risevision.common.components.timeline.services",
  "ui.bootstrap"
]);

"use strict";

angular.module("risevision.common.components.timeline.services")
  .factory("timelineDescription", ["$filter",
    function ($filter) {
      var service = {};

      var RECURRENCE = {
        DAILY: "Daily",
        WEEKLY: "Weekly",
        MONTHLY: "Monthly",
        YEARLY: "Yearly"
      };

      var LABEL = {
        EVERY_DAY: "Every Day",
        ALL_DAY: "All Day",
        START: "Start",
        END: "End",
        TO: "to",
        DAY: "Day",
        OF: "Of",
        EVERY: "Every"
      };

      var OPTIONS_WEEK = ["First", "Second", "Third", "Fourth",
        "Last"
      ];

      var OPTIONS_DAY_OF_THE_WEEK = ["Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
      ];

      var OPTIONS_MONTH = ["January", "February", "March", "April", "May",
        "June",
        "July", "August", "September", "October", "November",
        "December"
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

      service.updateLabel = function (timeline) {
        var label = "";

        var shortFormat = "dd-MMM-yyyy";

        if (timeline.startDate) {
          label = label + _filterDateFormat(timeline.startDate,
            timeline.useLocaldate,
            shortFormat) + " ";
        }

        if (timeline.endDate) {
          label = label + LABEL.TO + " " + _filterDateFormat(
            timeline.endDate, timeline.useLocaldate,
            shortFormat) + " ";
        }

        if (timeline.startTime) {
          var shortTimeformat = "hh:mm a";
          label = label + _filterDateFormat(timeline.startTime,
            timeline.useLocaldate,
            shortTimeformat) +
            " ";

          if (timeline.endTime) {
            label = label + LABEL.TO + " " + _filterDateFormat(
              timeline
              .endTime, timeline.useLocaldate,
              shortTimeformat) + " ";
          }
        }
        if (timeline.recurrenceType) {
          var monthFrequency = 0;
          label = label + timeline.recurrenceType + " ";

          if (timeline.recurrenceType === RECURRENCE.MONTHLY) {
            if (timeline.recurrenceAbsolute) {
              label = label + LABEL.DAY + " " + timeline.recurrenceDayOfMonth +
                " " + LABEL.OF + " ";
              monthFrequency = timeline.recurrenceFrequency;
            } else {
              label = label + OPTIONS_WEEK[timeline.recurrenceWeekOfMonth] +
                " " + OPTIONS_DAY_OF_THE_WEEK[timeline.recurrenceDayOfWeek] +
                " " + LABEL.OF + " ";
              monthFrequency = timeline.recurrenceFrequency;
            }
          }


          label = label + LABEL.EVERY + " ";


          if (timeline.recurrenceType === RECURRENCE.YEARLY) {
            if (timeline.recurrenceAbsolute) {
              label = label + OPTIONS_MONTH[timeline.recurrenceMonthOfYear] +
                " " + timeline.recurrenceDayOfMonth +
                " ";
            } else {
              label = label + OPTIONS_WEEK[timeline.recurrenceWeekOfMonth] +
                " " + OPTIONS_DAY_OF_THE_WEEK[timeline.recurrenceDayOfWeek] +
                " " + LABEL.OF + " " + OPTIONS_MONTH[timeline.recurrenceMonthOfYear] +
                " ";
            }
          } else {

            label = label + timeline.recurrenceFrequency +
              " " +
              timeline.recurrenceType
              .substring(0, timeline.recurrenceType.length -
                2).replace(
                "i", "y") + "(s)" + " ";

          }

          if (timeline.recurrenceType === RECURRENCE.WEEKLY && timeline
            .recurrenceDaysOfWeek) {

            for (var i = 0; i < timeline.recurrenceDaysOfWeek.length; i++) {
              if (timeline.recurrenceDaysOfWeek[i] === "Mon") {
                label = label + OPTIONS_DAY_OF_THE_WEEK[1] + " ";
              } else if (timeline.recurrenceDaysOfWeek[i] === "Tue") {
                label = label + OPTIONS_DAY_OF_THE_WEEK[2] + " ";
              } else if (timeline.recurrenceDaysOfWeek[i] === "Wed") {
                label = label + OPTIONS_DAY_OF_THE_WEEK[3] + " ";
              } else if (timeline.recurrenceDaysOfWeek[i] === "Thu") {
                label = label + OPTIONS_DAY_OF_THE_WEEK[4] + " ";
              } else if (timeline.recurrenceDaysOfWeek[i] === "Fri") {
                label = label + OPTIONS_DAY_OF_THE_WEEK[5] + " ";
              } else if (timeline.recurrenceDaysOfWeek[i] === "Sat") {
                label = label + OPTIONS_DAY_OF_THE_WEEK[6] + " ";
              } else if (timeline.recurrenceDaysOfWeek[i] === "Sun") {
                label = label + OPTIONS_DAY_OF_THE_WEEK[0] + " ";
              }
            }
          }
        }
        return label;

      };

      return service;
    }
  ]);

"use strict";

angular.module("risevision.common.components.timeline.services")
  .factory("TimelineFactory", [

    function () {
      var RECURRENCE = {
        DAILY: "Daily",
        WEEKLY: "Weekly",
        MONTHLY: "Monthly",
        YEARLY: "Yearly"
      };

      var _getDateTime = function (hour, minute, useLocaldate) {
        var d = new Date();

        if (useLocaldate) {
          d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(),
            hour, minute, 0));
        } else {
          d.setHours(hour);
          d.setMinutes(minute);
          d.setSeconds(0);

          d = d.toLocaleDateString("en-US") + " " +
            d.toLocaleTimeString("en-US");
        }

        return d;
      };

      var _service = function (timeline) {
        var _timeline = timeline;
        var _recurrence = {
          daily: {
            recurrenceFrequency: 1
          },
          weekly: {
            recurrenceFrequency: 1
          },
          monthly: {
            recurrenceAbsolute: true,
            absolute: {
              recurrenceFrequency: 1,
              recurrenceDayOfMonth: 1
            },
            relative: {
              recurrenceFrequency: 1,
              recurrenceWeekOfMonth: 0,
              recurrenceDayOfWeek: 0
            }
          },
          yearly: {
            recurrenceAbsolute: true,
            absolute: {
              recurrenceMonthOfYear: 0,
              recurrenceDayOfMonth: 1
            },
            relative: {
              recurrenceDayOfWeek: 0,
              recurrenceWeekOfMonth: 0,
              recurrenceMonthOfYear: 0
            }
          },
        };

        var _initRecurrence = function () {
          if (_timeline.recurrenceType === RECURRENCE.DAILY) {
            _recurrence.daily.recurrenceFrequency = _timeline.recurrenceFrequency;
          } else if (_timeline.recurrenceType === RECURRENCE.WEEKLY) {
            _recurrence.weekly.recurrenceFrequency = _timeline.recurrenceFrequency;

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
          } else if (_timeline.recurrenceType === RECURRENCE.MONTHLY) {
            _recurrence.monthly.recurrenceAbsolute = _timeline.recurrenceAbsolute;
            if (_timeline.recurrenceAbsolute) {
              _recurrence.monthly.absolute.recurrenceFrequency =
                _timeline.recurrenceFrequency;
              _recurrence.monthly.absolute.recurrenceDayOfMonth =
                _timeline.recurrenceDayOfMonth;
            } else {
              _recurrence.monthly.relative.recurrenceFrequency =
                _timeline.recurrenceFrequency;
              _recurrence.monthly.relative.recurrenceWeekOfMonth =
                _timeline.recurrenceWeekOfMonth;
              _recurrence.monthly.relative.recurrenceDayOfWeek =
                _timeline.recurrenceDayOfWeek;
            }
          } else if (_timeline.recurrenceType === RECURRENCE.YEARLY) {
            _recurrence.yearly.recurrenceAbsolute = _timeline.recurrenceAbsolute;
            if (_timeline.recurrenceAbsolute) {
              _recurrence.yearly.absolute.recurrenceMonthOfYear =
                _timeline.recurrenceMonthOfYear;
              _recurrence.yearly.absolute.recurrenceDayOfMonth =
                _timeline.recurrenceDayOfMonth;
            } else {
              _recurrence.yearly.relative.recurrenceDayOfWeek =
                _timeline.recurrenceDayOfWeek;
              _recurrence.yearly.relative.recurrenceWeekOfMonth =
                _timeline.recurrenceWeekOfMonth;
              _recurrence.yearly.relative.recurrenceMonthOfYear =
                _timeline.recurrenceMonthOfYear;
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
          if (_timeline.recurrenceType === RECURRENCE.DAILY) {
            _timeline.recurrenceFrequency = _recurrence.daily.recurrenceFrequency;
          } else if (_timeline.recurrenceType === RECURRENCE.WEEKLY) {
            _timeline.recurrenceFrequency = _recurrence.weekly.recurrenceFrequency;

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

          } else if (_timeline.recurrenceType === RECURRENCE.MONTHLY) {
            _timeline.recurrenceAbsolute = _recurrence.monthly.recurrenceAbsolute;
            if (_timeline.recurrenceAbsolute) {
              _timeline.recurrenceFrequency =
                _recurrence.monthly.absolute.recurrenceFrequency;
              _timeline.recurrenceDayOfMonth =
                _recurrence.monthly.absolute.recurrenceDayOfMonth;
            } else {
              _timeline.recurrenceFrequency =
                _recurrence.monthly.relative.recurrenceFrequency;
              _timeline.recurrenceWeekOfMonth =
                _recurrence.monthly.relative.recurrenceWeekOfMonth;
              _timeline.recurrenceDayOfWeek =
                _recurrence.monthly.relative.recurrenceDayOfWeek;
            }
          } else if (_timeline.recurrenceType === RECURRENCE.YEARLY) {
            _timeline.recurrenceAbsolute = _recurrence.yearly.recurrenceAbsolute;
            if (_timeline.recurrenceAbsolute) {
              _timeline.recurrenceMonthOfYear =
                _recurrence.yearly.absolute.recurrenceMonthOfYear;
              _timeline.recurrenceDayOfMonth =
                _recurrence.yearly.absolute.recurrenceDayOfMonth;
            } else {
              _timeline.recurrenceDayOfWeek =
                _recurrence.yearly.relative.recurrenceDayOfWeek;
              _timeline.recurrenceWeekOfMonth =
                _recurrence.yearly.relative.recurrenceWeekOfMonth;
              _timeline.recurrenceMonthOfYear =
                _recurrence.yearly.relative.recurrenceMonthOfYear;
            }
          }
        };

        this.save = function () {
          _timeline.startTime = _timeline.allDay ? null : _timeline.startTime;
          _timeline.endTime = _timeline.allDay ? null : _timeline.endTime;

          _saveRecurrence();
        };

        this.recurrence = _recurrence;
        this.timeline = _timeline;
      };

      _service.getTimeline = function (useLocaldate,
        timeDefined,
        startDate,
        endDate,
        startTime,
        endTime,
        recurrenceType,
        recurrenceFrequency,
        recurrenceAbsolute,
        recurrenceDayOfWeek,
        recurrenceDayOfMonth,
        recurrenceWeekOfMonth,
        recurrenceMonthOfYear,
        recurrenceDaysOfWeek) {

        var timeline = {
          useLocaldate: useLocaldate,
          always: !timeDefined,
          startDate: startDate || _getDateTime(0, 0, useLocaldate),
          endDate: endDate || null,
          allDay: true && (!startTime && !endTime || false),
          startTime: startTime || null,
          endTime: endTime || null,
          recurrenceType: recurrenceType || RECURRENCE.DAILY,
          recurrenceFrequency: recurrenceFrequency || 1,
          recurrenceAbsolute: typeof recurrenceAbsolute !== "undefined" ?
            recurrenceAbsolute : true,
          recurrenceDayOfWeek: recurrenceDayOfWeek || 0,
          recurrenceDayOfMonth: recurrenceDayOfMonth || 1,
          recurrenceWeekOfMonth: recurrenceWeekOfMonth || 0,
          recurrenceMonthOfYear: recurrenceMonthOfYear || 0,
          recurrenceDaysOfWeek: recurrenceDaysOfWeek || []
        };

        return timeline;
      };

      return _service;
    }
  ]);

(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline")
    .directive("largerThanDate", [

      function () {
        return {
          require: "ngModel",
          link: function ($scope, $element, $attrs, ctrl) {
            $scope.$watchGroup(["timeline.startDate", "timeline.endDate"],
              function (newValues) {
                var startDate = newValues[0] && new Date(newValues[0]);
                var endDate = newValues[1] && new Date(newValues[1]);
                var validity = !(startDate && endDate && startDate >
                  endDate);

                ctrl.$setValidity("largerThanDate", validity);
              });
          }
        };
      }
    ]);
})(angular);

// https://gist.github.com/weberste/354a3f0a9ea58e0ea0de

(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline")
    .directive("datepickerLocaldate", [

      function () {
        return {
          restrict: "A",
          require: ["ngModel"],
          link: function ($scope, element, attr, ctrls) {
            var useLocaldate = $scope.$eval(attr.datepickerLocaldate);
            var ngModelController = ctrls[0];
            var formatDate = function (date) {
              return date.toLocaleDateString("en-US") + " " +
                date.toLocaleTimeString("en-US");
            };

            // called with a JavaScript Date object when picked from the datepicker
            ngModelController.$parsers.push(function (viewValue) {
              if (!viewValue) {
                return null;
              }

              if (useLocaldate) {
                // undo the timezone adjustment we did during the formatting
                viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
              } else {
                viewValue = formatDate(viewValue);
              }

              return viewValue;
            });

            // called with a string to format
            ngModelController.$formatters.push(function (modelValue) {
              if (!modelValue) {
                return undefined;
              }
              // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
              var dt = new Date(modelValue);

              if (useLocaldate) {
                // 'undo' the timezone offset again (so we end up on the original date again)
                dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
              }

              return dt;
            });
          }
        };
      }
    ]);
})(angular);

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

(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline")
    .directive("timelineTextbox", ["$modal", "TimelineFactory",
      "timelineDescription",
      function ($modal, TimelineFactory, timelineDescription) {
        return {
          restrict: "E",
          scope: {
            useLocaldate: "=",
            timeDefined: "=",
            startDate: "=",
            endDate: "=",
            startTime: "=",
            endTime: "=",
            recurrenceType: "=",
            recurrenceFrequency: "=",
            recurrenceAbsolute: "=",
            recurrenceDayOfWeek: "=",
            recurrenceDayOfMonth: "=",
            recurrenceWeekOfMonth: "=",
            recurrenceMonthOfYear: "=",
            recurrenceDaysOfWeek: "="
          },
          templateUrl: "timeline/timeline-textbox.html",
          link: function ($scope) {
            // Watch one of the scope variables to see when
            // new data is coming in
            $scope.$watch("startDate", function () {
              $scope.timeline = TimelineFactory.getTimeline(
                $scope.useLocaldate,
                $scope.timeDefined,
                $scope.startDate,
                $scope.endDate,
                $scope.startTime,
                $scope.endTime,
                $scope.recurrenceType,
                $scope.recurrenceFrequency,
                $scope.recurrenceAbsolute,
                $scope.recurrenceDayOfWeek,
                $scope.recurrenceDayOfMonth,
                $scope.recurrenceWeekOfMonth,
                $scope.recurrenceMonthOfYear,
                $scope.recurrenceDaysOfWeek);

              $scope.timeline.label = timelineDescription.updateLabel(
                $scope.timeline);
            });

            $scope.$watch("timeline.always", function (newValue) {
              $scope.timeDefined = !newValue;
            });

            $scope.openModal = function () {
              var modalInstance = $modal.open({
                templateUrl: "timeline/timeline-modal.html",
                controller: "timelineModal",
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

                $scope.startDate = timeline.startDate;
                $scope.endDate = timeline.endDate;
                $scope.startTime = timeline.startTime;
                $scope.endTime = timeline.endTime;
                $scope.recurrenceType = timeline.recurrenceType;
                $scope.recurrenceFrequency = timeline.recurrenceFrequency;
                $scope.recurrenceAbsolute = timeline.recurrenceAbsolute;
                $scope.recurrenceDayOfWeek = timeline.recurrenceDayOfWeek;
                $scope.recurrenceDayOfMonth = timeline.recurrenceDayOfMonth;
                $scope.recurrenceWeekOfMonth = timeline.recurrenceWeekOfMonth;
                $scope.recurrenceMonthOfYear = timeline.recurrenceMonthOfYear;
                $scope.recurrenceDaysOfWeek = timeline.recurrenceDaysOfWeek;

                $scope.timeline.label = timelineDescription.updateLabel(
                  $scope.timeline);

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

(function (angular) {
  "use strict";
  angular.module("risevision.common.components.timeline")
    .directive("weekdayDropdown",
      function () {
        return {
          restrict: "E",
          scope: {
            weekday: "="
          },
          templateUrl: "timeline/weekday-dropdown.html"
        };
      }
  );
})(angular);

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

(function(module) {
try {
  module = angular.module('risevision.common.components.timeline');
} catch (e) {
  module = angular.module('risevision.common.components.timeline', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('timeline/month-dropdown.html',
    '<select class="form-control" ng-model="month" integer-parser=""><option value="0">January</option><option value="1">February</option><option value="2">March</option><option value="3">April</option><option value="4">May</option><option value="5">June</option><option value="6">July</option><option value="7">August</option><option value="8">September</option><option value="9">October</option><option value="10">November</option><option value="11">December</option></select>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.timeline');
} catch (e) {
  module = angular.module('risevision.common.components.timeline', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('timeline/timeline-modal.html',
    '<div id="timelineModal"><div class="modal-header"><button type="button" class="close" ng-click="close()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title">Edit Timeline</h3></div><div class="modal-body" stop-event="touchend"><form role="form" name="timelineDetails" novalidate=""><div class="timeline"><section><div class="row"><div class="col-sm-4"><div class="form-group"><label class="control-label">Start Date</label><div class="input-group"><input type="text" id="startDate" name="startDate" class="form-control" datepicker-popup="dd-MMM-yyyy" ng-model="timeline.startDate" is-open="datepickers.startDate" min-date="today" datepicker-options="dateOptions" datepicker-localdate="{{timeline.useLocaldate}}" ng-required="!timeline.everyDay" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openDatepicker($event, \'startDate\')"><i class="fa fa-calendar"></i></button></span></div></div></div><div class="col-sm-4"><div class="form-group"><label class="control-label">End Date</label><div class="input-group"><input type="text" id="endDate" name="endDate" class="form-control" datepicker-popup="dd-MMM-yyyy" ng-model="timeline.endDate" is-open="datepickers.endDate" min-date="timeline.startDate" datepicker-options="dateOptions" datepicker-localdate="{{timeline.useLocaldate}}" larger-than-date="" close-text="Close"> <span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="openDatepicker($event, \'endDate\')"><i class="fa fa-calendar"></i></button></span></div></div></div></div><p class="text-danger" ng-show="timelineDetails.startDate.$invalid">Start Date is a required field</p><p class="text-danger" ng-show="timelineDetails.endDate.$invalid">End Date must occur after Start Date</p></section><section><label class="control-label u_margin-sm-bottom"><input type="checkbox" ng-model="timeline.allDay"> <strong>All Day</strong></label><div class="row form-group" ng-hide="timeline.allDay"><div class="col-sm-4"><label class="control-label">Start Time</label><div class="time-picker"><timepicker id="startTime" ng-model="timeline.startTime" ng-change="changed()" hour-step="1" minute-step="15" show-meridian="true" datepicker-localdate="{{timeline.useLocaldate}}"></timepicker></div></div><div class="col-sm-4"><label class="control-label">End Time</label><div class="time-picker"><timepicker id="endTime" ng-model="timeline.endTime" ng-change="changed()" hour-step="1" minute-step="15" show-meridian="true" datepicker-localdate="{{timeline.useLocaldate}}"></timepicker></div></div></div></section><section><label class="control-label u_margin-sm-bottom" for="recurrence"><strong>Recurrence</strong></label><div class="form-group"><label for="Daily" class="u_margin-right control-label"><input type="radio" ng-model="timeline.recurrenceType" value="Daily" id="Daily" name="recurrenceType"> Daily</label> <label for="Weekly" class="u_margin-right control-label"><input type="radio" ng-model="timeline.recurrenceType" value="Weekly" id="Weekly" name="recurrenceType"> Weekly</label> <label for="Monthly" class="u_margin-right control-label"><input type="radio" ng-model="timeline.recurrenceType" value="Monthly" id="Monthly" name="recurrenceType"> Monthly</label> <label for="Yearly" class="u_margin-right control-label"><input type="radio" ng-model="timeline.recurrenceType" value="Yearly" id="Yearly" name="recurrenceType"> Yearly</label></div><div class="recurrence-option"><div ng-if="timeline.recurrenceType === \'Daily\'"><div class="form-group"><label class="control-label">Every</label> <input type="number" class="form-control input-short" name="dailyRecurrenceFrequency" ng-model="recurrence.daily.recurrenceFrequency" min="1" max="999" ng-required="timeline.recurrenceType === \'Daily\'"> <label class="control-label">Day(s)</label><p class="text-danger" ng-show="timelineDetails.dailyRecurrenceFrequency.$invalid">Daily Recurrence Frequency must be a number between 1 and 999</p></div></div><div ng-if="timeline.recurrenceType === \'Weekly\'"><div class="form-group"><label class="control-label">Every</label> <input type="number" class="form-control input-short" name="weeklyRecurrenceFrequency" ng-model="recurrence.weekly.recurrenceFrequency" min="1" max="999" ng-required="timeline.recurrenceType === \'Weekly\'"> <label class="control-label">Week(s)</label><p class="text-danger" ng-show="timelineDetails.weeklyRecurrenceFrequency.$invalid">Weekly Recurrence Frequency must be a number between 1 and 999</p></div><div class="form-group timelineWeekdays"><label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.monday"> Monday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.tuesday"> Tuesday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.wednesday"> Wednesday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.thursday"> Thursday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.friday"> Friday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.saturday"> Saturday</label> <label class="control-label"><input type="checkbox" ng-model="recurrence.weekly.sunday"> Sunday</label></div></div><div ng-if="timeline.recurrenceType === \'Monthly\'"><div class="form-group"><label class="control-label"><input ng-model="recurrence.monthly.recurrenceAbsolute" ng-value="true" type="radio"> Day</label><fieldset ng-disabled="!recurrence.monthly.recurrenceAbsolute"><input type="number" class="form-control input-short" name="monthlyAbsoluteRecurrenceDayOfMonth" ng-model="recurrence.monthly.absolute.recurrenceDayOfMonth" min="1" max="31" ng-required="timeline.recurrenceType === \'Monthly\' && recurrence.monthly.recurrenceAbsolute"> <label class="control-label">of Every</label> <input type="number" class="form-control input-short" name="monthlyAbsoluteRecurrenceFrequency" ng-model="recurrence.monthly.absolute.recurrenceFrequency" min="1" max="999" ng-required="timeline.recurrenceType === \'Monthly\' && recurrence.monthly.recurrenceAbsolute"> <label class="control-label">Month(s)</label></fieldset><p class="text-danger" ng-show="timelineDetails.monthlyAbsoluteRecurrenceDayOfMonth.$invalid">Monthly Recurrence Day Of Month value must be between 1 and 31</p><p class="text-danger" ng-show="timelineDetails.monthlyAbsoluteRecurrenceFrequency.$invalid">Monthly Recurrence Frequency must be a number between 1 and 999</p></div><div class="form-group"><label class="control-label"><input ng-model="recurrence.monthly.recurrenceAbsolute" ng-value="false" type="radio"> The</label><fieldset ng-disabled="recurrence.monthly.recurrenceAbsolute"><week-dropdown week="recurrence.monthly.relative.recurrenceWeekOfMonth"></week-dropdown><weekday-dropdown weekday="recurrence.monthly.relative.recurrenceDayOfWeek"></weekday-dropdown><label class="control-label">of Every</label> <input type="number" class="form-control input-short" name="monthlyRelativeRecurrenceFrequency" ng-model="recurrence.monthly.relative.recurrenceFrequency" min="1" max="999" ng-required="timeline.recurrenceType === \'Monthly\' && !recurrence.monthly.recurrenceAbsolute" <label="">Month(s)</fieldset><p class="text-danger" ng-show="timelineDetails.monthlyRelativeRecurrenceFrequency.$invalid">Monthly Relative Recurrence Frequency must be a number between 1 and 999</p></div></div><div ng-if="timeline.recurrenceType === \'Yearly\'"><div class="form-group"><label class="control-label"><input type="radio" ng-model="recurrence.yearly.recurrenceAbsolute" ng-value="true"> Every</label><fieldset ng-disabled="!recurrence.yearly.recurrenceAbsolute"><month-dropdown month="recurrence.yearly.absolute.recurrenceMonthOfYear"></month-dropdown><input type="number" class="form-control input-short" name="yearlyAbsoluteRecurrenceDayOfMonth" ng-model="recurrence.yearly.absolute.recurrenceDayOfMonth" min="1" max="31" ng-required="timeline.recurrenceType === \'Yearly\' && recurrence.yearly.recurrenceAbsolute"></fieldset><p class="text-danger" ng-show="timelineDetails.yearlyAbsoluteRecurrenceDayOfMonth.$invalid">Yearly Recurrence Day Of Month value must be between 1 and 31</p></div><div class="form-group"><label class="control-label"><input type="radio" ng-model="recurrence.yearly.recurrenceAbsolute" ng-value="false"> The</label><fieldset ng-disabled="recurrence.yearly.recurrenceAbsolute"><week-dropdown week="recurrence.yearly.relative.recurrenceWeekOfMonth"></week-dropdown><weekday-dropdown weekday="recurrence.yearly.relative.recurrenceDayOfWeek"></weekday-dropdown><label class="control-label">of</label><month-dropdown month="recurrence.yearly.relative.recurrenceMonthOfYear"></month-dropdown></fieldset></div></div></div></section></div></form></div><div class="modal-footer"><button type="button" class="btn btn-primary btn-fixed-width" ng-click="save()" ng-disabled="timelineDetails.$invalid">Apply <i class="fa fa-white fa-check icon-right"></i></button> <button type="button" class="btn btn-default btn-fixed-width" ng-click="close()">Cancel <i class="fa fa-times icon-right"></i></button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.timeline');
} catch (e) {
  module = angular.module('risevision.common.components.timeline', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('timeline/timeline-textbox.html',
    '<label class="control-label control-label-secondary u_margin-left"><input ng-model="timeline.always" type="checkbox"> Always</label><div id="timelineTextbox" class="panel-editable u_remove-bottom u_clickable" ng-click="openModal()" ng-show="!timeline.always"><div class="label label-tag"><span id="timelineLabel" timeline="timeline">{{timeline.label}}</span></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.timeline');
} catch (e) {
  module = angular.module('risevision.common.components.timeline', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('timeline/week-dropdown.html',
    '<select class="form-control" ng-model="week" integer-parser=""><option value="0">First</option><option value="1">Second</option><option value="2">Third</option><option value="3">Fourth</option><option value="4">Last</option></select>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.timeline');
} catch (e) {
  module = angular.module('risevision.common.components.timeline', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('timeline/weekday-dropdown.html',
    '<select class="form-control" ng-model="weekday" integer-parser=""><option value="0">Sunday</option><option value="1">Monday</option><option value="2">Tuesday</option><option value="3">Wednesday</option><option value="4">Thursday</option><option value="5">Friday</option><option value="6">Saturday</option></select>');
}]);
})();
