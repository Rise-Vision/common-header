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

"use strict";

angular.module("risevision.common.components.scrolling-list")
  .service("processErrorCode", ["$filter",
    function ($filter) {
      var actionsMap = {
        get: "loaded",
        load: "loaded",
        add: "added",
        update: "updated",
        delete: "deleted",
        publish: "published",
        restore: "restored",
        move: "moved",
        rename: "renamed",
        upload: "uploaded",
        restart: "restarted",
        reboot: "rebooted"
      };

      return function (itemName, action, e) {
        var tryAgainMessage = $filter("translate")("apps-common.errors.tryAgain");
        var actionName = actionsMap[action];
        var error = (e && e.result && e.result.error) || {};
        var errorString = error.message ? error.message : "An Error has Occurred";
        var messagePrefix = $filter("translate")("apps-common.errors.actionFailed", {
          itemName: itemName,
          actionName: actionName
        });

        // Attempt to internationalize Storage error
        var key = "storage-client.error." + (action ? action + "." : "") + error.message;
        var msg = $filter("translate")(key);
        if (msg !== key) {
          errorString = msg;
        }

        if (!e) {
          return errorString;
        } else if (e.status === 400) {
          if (errorString.indexOf("is not editable") >= 0) {
            return messagePrefix + " " + errorString;
          } else if (errorString.indexOf("is required") >= 0) {
            return messagePrefix + " " + errorString;
          } else {
            return messagePrefix + " " + errorString;
          }
        } else if (e.status === 401) {
          return $filter("translate")("apps-common.errors.notAuthenticated", {
            itemName: itemName,
            actionName: action
          });
        } else if (e.status === 403) {
          if (errorString.indexOf("User is not allowed access") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.parentCompanyAction");
          } else if (errorString.indexOf("User does not have the necessary rights") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.permissionRequired");
          } else if (errorString.indexOf("Premium Template requires Purchase") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.premiumTemplate");
          } else if (errorString.indexOf("Storage requires active subscription") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.storageSubscription");
          } else {
            return messagePrefix + " " + errorString;
          }
        } else if (e.status === 404) {
          return $filter("translate")("apps-common.errors.notFound", {
            itemName: itemName
          });
        } else if (e.status === 409) {
          return messagePrefix + " " + errorString;
        } else if (e.status === 500 || e.status === 503) {
          return $filter("translate")("apps-common.errors.serverError", {
            itemName: itemName,
            actionName: action
          }) + " " + tryAgainMessage;
        } else if (e.status === -1 || error.code === -1 || error.code === 0) {
          return $filter("translate")("apps-common.errors.checkConnection");
        } else {
          return errorString;
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.scrolling-list")
  .service("ScrollingListService", ["$log", "BaseList", "processErrorCode",
    function ($log, BaseList, processErrorCode) {
      return function (listService, search) {
        var DB_MAX_COUNT = 40; //number of records to load at a time
        var factory = {};

        factory.items = new BaseList(DB_MAX_COUNT);

        factory.search = search ? search : {};
        _.defaults(factory.search, {
          sortBy: "name",
          count: DB_MAX_COUNT,
          reverse: false,
          name: "Items"
        });

        var _clearMessages = function () {
          factory.loadingItems = false;

          factory.errorMessage = "";
          factory.apiError = "";
        };

        factory.load = function () {
          _clearMessages();

          if (!factory.items.list.length || !factory.items.endOfList &&
            factory.items.cursor) {
            factory.loadingItems = true;

            listService(factory.search, factory.items.cursor)
              .then(function (result) {
                factory.items.add(result.items ? result.items : [],
                  result.cursor);
              })
              .then(null, function (e) {
                factory.errorMessage = "Failed to load " + factory.search.name + ".";
                factory.apiError = processErrorCode(factory.search.name, "load", e);

                $log.error(factory.errorMessage, e);
              })
              .finally(function () {
                factory.loadingItems = false;
              });
          }
        };

        factory.load();

        factory.sortBy = function (cat) {
          factory.items.clear();

          if (cat !== factory.search.sortBy) {
            factory.search.sortBy = cat;
            factory.search.reverse = false;
          } else {
            factory.search.reverse = !factory.search.reverse;
          }

          factory.load();
        };

        factory.doSearch = function () {
          factory.items.clear();

          factory.load();
        };

        return factory;
      };
    }
  ]);

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
