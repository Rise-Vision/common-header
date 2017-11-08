/* jshint unused: false */
(function (angular) {

  "use strict";

  angular.module("risevision.common.components.scrolling-list", [
    "rvScrollEvent"
  ])
    .value("BaseList", function (maxCount) {
      this.list = [];
      this.maxCount = maxCount ? maxCount : 40;
      this.cursor = null;
      this.endOfList = false;

      //unused
      this.searchString = "";
      this.clear = function () {
        this.list = [];
        this.cursor = null;
        this.endOfList = false;
      };
      this.concat = function (items) {
        this.list = this.list.concat(items);
      };
      this.add = function (items, cursor) {
        this.cursor = cursor;
        this.endOfList = items.length < this.maxCount;
        this.concat(items);
      };

      //unused
      var append = function (items) {
        for (var i = 0; i < items.length; i++) {
          this.list.push(items[i]);
        }
      };
      //unused
      var remove = function (index) {
        this.list.splice(index, 1);
      };
    });

})(angular);

(function (angular) {

  "use strict";

  var INTERVAL_DELAY = 150;

  angular.module("rvScrollEvent", [])
    .directive("rvScrollEvent", ["$parse", "$window",
      function ($parse, $window) {
        return {
          scope: false,
          link: function (scope, element, attr) {
            var fn = $parse(attr.rvScrollEvent);
            var interval,
              handler,
              el = element[0],
              scrollEvent = "scroll",
              scrollPosition = {
                x: 0,
                y: 0
              };

            var bindScroll = function () {
              handler = function (event) {

                scrollPosition.x = el.scrollLeft;
                scrollPosition.y = el.scrollTop;

                startInterval(event);
                unbindScroll();
                scrollTrigger(event, false);
              };


              element.bind(scrollEvent, handler);
            };

            var startInterval = function (event) {
              interval = $window.setInterval(function () {
                if (scrollPosition.x === el.scrollLeft &&
                  scrollPosition.y === el.scrollTop) {
                  $window.clearInterval(interval);
                  bindScroll();
                  scrollTrigger(event, true);
                } else {
                  scrollPosition.x = el.scrollLeft;
                  scrollPosition.y = el.scrollTop;
                }
              }, INTERVAL_DELAY);
            };

            var unbindScroll = function () {
              // be nice to others, don"t unbind their scroll handlers
              element.unbind(scrollEvent, handler);
            };

            var scrollTrigger = function (event, isEndEvent) {
              scope.$apply(function () {
                fn(scope, {
                  $event: event,
                  isEndEvent: isEndEvent
                });
              });
            };

            bindScroll();
          }
        };
      }
    ]);
})(angular);

(function (angular) {

  "use strict";

  angular.module("risevision.common.components.scrolling-list")
    .directive("scrollingList", ["$parse", "$compile",
      function ($parse, $compile) {
        return {
          restrict: "A",
          replace: false,
          terminal: true,
          priority: 1000,
          link: function link(scope, element, attr) {
            var fn = $parse(attr.scrollingList);

            scope.handleScroll = function (event, isEndEvent) {
              // $log.debug(event.target.scrollTop + " / " + event.target.scrollHeight + " / " + isEndEvent);
              if (isEndEvent) {
                if (event.target.scrollTop &&
                  (event.target.scrollHeight - event.target.clientHeight -
                    event.target.scrollTop) < 20) {
                  //load more rows if less than 20px left to the bottom

                  fn(scope);
                }
              }
            };

            // Override this directive with rvScrollEvent
            // http://stackoverflow.com/questions/19224028/add-directives-from-directive-in-angularjs
            element.attr("rv-scroll-event",
              "handleScroll($event, isEndEvent)");
            element.removeAttr("scrolling-list"); //remove the attribute to avoid indefinite loop

            $compile(element)(scope);
          }
        };
      }
    ]);

})(angular);
