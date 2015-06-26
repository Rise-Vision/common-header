(function (angular) {

  "use strict";

  angular.module("risevision.common.analytics", [])

  .value("SEGMENT_API_KEY", "AFtY3tN10BQj6RbnfpDDp9Hx8N1modKN")

  .factory("segmentAnalytics", ["$rootScope", "$window", "$log", "$location",
    function ($rootScope, $window, $log, $location) {
      var service = {};
      var loaded;

      $window.analytics = $window.analytics || [];
      var analytics = $window.analytics;

      analytics.factory = function (t) {
        function addUrl(methodName, args) {
          if ("track" === t && args && args.length > 1 && args[1] &&
            typeof args[1] === "object") {
            args[1].url = $location.host();
          }
        }
        return function () {
          var e = Array.prototype.slice.call(arguments);
          addUrl(t, e);
          e.unshift(t);
          $window.analytics.push(e);

          $log.debug("Segment Tracker", e);

          return $window.analytics;
        };
      };
      analytics.methods = ["trackSubmit", "trackClick", "trackLink",
        "trackForm",
        "pageview", "identify", "group", "track", "ready", "alias",
        "page",
        "once", "off", "on"
      ];
      for (var i = 0; i < analytics.methods.length; i++) {
        var method = analytics.methods[i];
        service[method] = analytics.factory(method);
      }

      /**
       * @description
       * Load Segment.io analytics script
       * @param apiKey The key API to use
       */
      service.load = function (apiKey) {
        if (apiKey && !loaded) {
          var e = document.createElement("script");
          e.type = "text/javascript";
          e.async = !0;
          e.src = ("https:" === document.location.protocol ? "https://" :
            "http://") + "cdn.segment.com/analytics.js/v1/" + apiKey +
            "/analytics.min.js";
          var n = document.getElementsByTagName("script")[0];
          n.parentNode.insertBefore(e, n);

          loaded = true;
        }
      };

      return service;
    }
  ])

  .factory("analyticsEvents", ["$rootScope", "segmentAnalytics",
    "userState", "$location",
    function ($rootScope, segmentAnalytics, userState, $location) {
      var service = {};

      var _identify = function () {
        var profile = userState.getCopyOfProfile();
        segmentAnalytics.identify(userState.getUsername(), {
          email: profile.email,
          firstName: profile.firstName ? profile.firstName : "",
          lastName: profile.lastName ? profile.lastName : "",
          companyId: userState.getUserCompanyId(),
          companyName: userState.getUserCompanyName(),
          company: {
            id: userState.getUserCompanyId(),
            name: userState.getUserCompanyName()
          }
        });
      };

      $rootScope.$on("risevision.user.authorized", function () {
        if (userState.getUsername()) {
          _identify();
        }
      });

      // Listening to $viewContentLoaded event to track pageview
      $rootScope.$on("$viewContentLoaded", function () {
        if (segmentAnalytics.location !== $location.path()) {
          segmentAnalytics.location = $location.path();
          segmentAnalytics.pageview(segmentAnalytics.location);
        }
      });

      return service;
    }
  ]);

})(angular);
