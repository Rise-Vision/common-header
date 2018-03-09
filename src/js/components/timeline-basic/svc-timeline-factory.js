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
