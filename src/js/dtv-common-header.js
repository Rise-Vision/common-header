angular.module("risevision.common.header", [
  "ui.router",
  "risevision.common.account",
  "risevision.common.gapi",
  "risevision.common.config",
  "risevision.core.cache",
  "risevision.core.company",
  "risevision.common.cookie",
  "risevision.common.header.templates",
  "risevision.common.header.directives",
  "risevision.common.header.filters",
  "risevision.common.i18n",
  "risevision.common.systemmessages", "risevision.core.systemmessages",
  "risevision.core.countries",
  "risevision.core.oauth2",
  "risevision.store.authorization",
  "risevision.store.services",
  "risevision.common.geodata",
  "risevision.store.data-gadgets",
  "risevision.core.userprofile",
  "risevision.common.registration",
  "risevision.common.shoppingcart",
  "checklist-model",
  "ui.bootstrap", "ngSanitize", "ngCsv", "ngTouch", "ngTagsInput",
  "risevision.common.components.userstate",
  "risevision.common.components.last-modified",
  "risevision.common.components.loading",
  "risevision.common.components.search-filter",
  "risevision.common.components.scrolling-list",
  "risevision.common.components.stop-event",
  "risevision.common.components.analytics",
  "risevision.common.components.message-box",
  "risevision.common.components.svg",
  "risevision.common.components.plans",
  "risevision.common.components.purchase-flow",
  "risevision.common.support"
])

.factory("bindToScopeWithWatch", [

  function () {
    return function (fnToWatch, scopeVar, scope) {
      scope.$watch(function () {
          return fnToWatch.call();
        },
        function (val) {
          scope[scopeVar] = val;
        });
    };
  }
])

.value("ENV_NAME", "")

.directive("commonHeader", ["$modal", "$rootScope", "$q", "$loading",
  "$interval", "oauth2APILoader", "$log",
  "$templateCache", "userState", "$location", "bindToScopeWithWatch",
  "$document", "cookieTester", "companyIcpFactory", "ENV_NAME",
  function ($modal, $rootScope, $q, $loading, $interval,
    oauth2APILoader, $log, $templateCache, userState, $location,
    bindToScopeWithWatch, $document, cookieTester, companyIcpFactory,
    ENV_NAME) {
    return {
      restrict: "E",
      template: $templateCache.get("common-header.html"),
      scope: false,
      link: function ($scope, element, attr) {
        companyIcpFactory.init();
        cookieTester.checkCookies().then(function () {
          $scope.cookieEnabled = true;
        }, function () {
          $scope.cookieEnabled = false;
        });
        $scope.navCollapsed = true;
        $scope.inRVAFrame = userState.inRVAFrame();
        $scope.isSubcompanySelected = userState.isSubcompanySelected;
        $scope.isTestCompanySelected = userState.isTestCompanySelected;
        $scope.ENV_NAME = ENV_NAME;

        // If nav options not provided use defaults
        if (!$scope[attr.navOptions]) {
          $scope.navOptions = [{
            title: "Home",
            link: "#/"
          }, {
            title: "Account",
            link: ""
          }, {
            title: "Sellers",
            link: ""
          }, {
            title: "Platform",
            link: "http://rva.risevision.com/",
            target: "_blank"
          }];
        }

        //default to true
        $scope.hideShoppingCart = attr.hideShoppingCart !== "0" &&
          attr.hideShoppingCart !== "false";
        $scope.hideHelpMenu = attr.hideHelpMenu !== "0" &&
          attr.hideHelpMenu !== "false";

        // used by userState; determines if the URL root is used for
        // Authentication redirect
        $rootScope.redirectToRoot = attr.redirectToRoot !== "0" &&
          attr.redirectToRoot !== "false";

        // disable opening home page in new tab (default true)
        $rootScope.newTabHome = attr.newTabHome !== "0" &&
          attr.newTabHome !== "false";

        bindToScopeWithWatch(userState.isRiseVisionUser, "isRiseVisionUser",
          $scope);

        $rootScope.$on("$stateChangeSuccess", function () {
          if ($scope.inRVAFrame) {
            $location.search("inRVA", $scope.inRVAFrame);
          }
        });

        //insert meta tag to page to prevent zooming in in mobile mode
        var viewPortTag = $document[0].createElement("meta");
        viewPortTag.id = "viewport";
        viewPortTag.name = "viewport";
        viewPortTag.content =
          "width=device-width, initial-scale=1, user-scalable=no";
        $document[0].getElementsByTagName("head")[0].appendChild(viewPortTag);
      }
    };
  }
])

.run(["segmentAnalytics", "SEGMENT_API_KEY", "ENABLE_INTERCOM_MESSAGING",
  "analyticsEvents", "$document",
  function (segmentAnalytics, SEGMENT_API_KEY, ENABLE_INTERCOM_MESSAGING,
    analyticsEvents, $document) {
    analyticsEvents.initialize();
    segmentAnalytics.load(SEGMENT_API_KEY, ENABLE_INTERCOM_MESSAGING);

    $document.on("keydown", function (event) {
      var doPrevent = false;
      if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === "INPUT" &&
            (
              d.type.toUpperCase() === "TEXT" ||
              d.type.toUpperCase() === "PASSWORD" ||
              d.type.toUpperCase() === "FILE" ||
              d.type.toUpperCase() === "SEARCH" ||
              d.type.toUpperCase() === "EMAIL" ||
              d.type.toUpperCase() === "NUMBER" ||
              d.type.toUpperCase() === "DATE" ||
              d.type.toUpperCase() === "TEL" ||
              d.type.toUpperCase() === "URL")
          ) ||
          d.tagName.toUpperCase() === "TEXTAREA") {
          doPrevent = d.readOnly || d.disabled;
        } else {
          doPrevent = true;
        }
      }
      if (doPrevent) {
        event.preventDefault();
      }
    });
  }
])

.directive("ngEnter", function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
})
  .directive("ngDisableRightClick", function () {
    return function (scope, element) {
      element.bind("contextmenu", function (event) {
        scope.$apply(function () {
          event.preventDefault();
        });
      });
    };
  });

angular.module("risevision.common.header.directives", []);
angular.module("risevision.common.header.filters", []);
angular.module("risevision.store.services", []);
