// ------------------------------------
// Off-Canvas Navigation
// ------------------------------------
angular.module("risevision.common.header")
  .service("offCanvas", ["$window",
    function ($window) {

      var service = {
        visible: false,
        enabled: false
      };

      service.enabled = angular.element($window).width() <= 1200 ? true :
        false;

      service.toggle = function (event) {

        if (event) {
          event.stopPropagation();
        }

        if (!service.enabled && !service.visible) {
          return;
        }

        service.visible = !service.visible;
        if (service.visible) {
          service.nav.addClass("is-off-canvas-opened");
        } else {
          service.nav.removeClass("is-off-canvas-opened");
        }
      };

      service.registerNav = function (nav) {
        service.nav = nav;
        service.nav.addClass("off-canvas--container");
      };

      window.onresize = function () {
        service.enabled = angular.element($window).width() <= 1200 ? true :
          false;
      };

      return service;
    }
  ])
  .directive("offCanvasNav", ["offCanvas",
    function (offCanvas) {
      return {
        restrict: "A",
        link: function (scope, iElement) {
          iElement.addClass("off-canvas--nav");
          offCanvas.registerNav(iElement);
          // Handle Click
          iElement.bind("tap", offCanvas.toggle);
          iElement.bind("click", offCanvas.toggle);

          scope.$on('$stateChangeStart', function (event, toState, toParams) {
            console.log("$stateChangeStart - off canvas", toState, toParams);

          });
        }
      };
    }
  ])
  .directive("offCanvasToggle", ["offCanvas",
    function (offCanvas) {
      return {
        restrict: "A",
        link: function (scope, iElement) {
          iElement.bind("tap", offCanvas.toggle);
          iElement.bind("click", offCanvas.toggle);
        }
      };
    }
  ]);
