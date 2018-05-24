"use strict";

angular.module("risevision.common.components.loading", ["angularSpinner"])
  .value("_rvGlobalSpinnerRegistry", []);

"use strict";

angular.module("risevision.common.components.loading")
  .service("$loading", ["$q", "$rootScope", "$document",
    "_rvGlobalSpinnerRegistry",
    function ($q, $rootScope, $document, _rvGlobalSpinnerRegistry) {
      var self = this;

      this.start = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        for (var i = 0; i < spinnerKeys.length; i++) {
          $rootScope.$broadcast("rv-spinner:start", spinnerKeys[i]);
        }
      };

      this.stop = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        for (var i = 0; i < spinnerKeys.length; i++) {
          $rootScope.$broadcast("rv-spinner:stop", spinnerKeys[i]);
        }
      };

      /* Global Spinner */
      //append global spinner
      if ($document && $document[0]) {
        angular.element($document[0].body).append(
          "<div rv-global-spinner class=\"ng-hide\" style=\"position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: 1040; \"></div>"
        );
      }

      function _addKeyToRegistry(key) {
        if (_rvGlobalSpinnerRegistry.indexOf(key) < 0) {
          _rvGlobalSpinnerRegistry.push(key);
        }
      }

      function _removeKeyFromRegistry(key) {
        var index;
        if ((index = _rvGlobalSpinnerRegistry.indexOf(key)) >= 0) {
          _rvGlobalSpinnerRegistry.splice(index, 1);
        }
      }

      this.startGlobal = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        angular.forEach(spinnerKeys, function (key) {
          _addKeyToRegistry(key);
        });
      };

      this.stopGlobal = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        angular.forEach(spinnerKeys, function (key) {
          _removeKeyFromRegistry(key);
        });
      };

      this.stopSpinnerAfterPromise = function (spinnerKeys, promises) {

        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];

        var stop = function () {
          for (var i = 0; i < spinnerKeys.length; i++) {
            $rootScope.$broadcast("rv-spinner:stop", spinnerKeys[i]);
          }
        };

        var promise = angular.isArray(promises) ? $q.all(promises) : promises;
        promise.then(function () {
          stop();
        }, function () {
          stop();
        });
      };

      this.getDefaultSpinnerOptions = function () {
        return self.defaultSpinnerOptions;
      };

      this.defaultSpinnerOptions = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: "#555", // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: "spinner", // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: "50%", // Top position relative to parent in px
        left: "50%" // Left position relative to parent in px
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.loading")
  .directive("rvGlobalSpinner", ["usSpinnerService", "$compile",
    "_rvGlobalSpinnerRegistry",
    "$timeout", "$rootScope",
    function (usSpinnerService, $compile, _rvGlobalSpinnerRegistry, $timeout,
      $rootScope) {
      return {
        scope: true,
        link: function (scope, $element) {

          var tpl = "<div ng-show=\"active\" class=\"spinner-backdrop fade\"" +
            " ng-class=\"{in: active}\" us-spinner=\"rvSpinnerOptions\"" +
            " spinner-key=\"_rv-global-spinner\" ng-focus=\"spinnerFocused()\"></div>";
          $element.prepend($compile(tpl)(scope));

          scope.rvSpinnerOptions = {
            lines: 13, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: "#555", // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: "spinner", // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: "50%", // Top position relative to parent in px
            left: "50%" // Left position relative to parent in px
          };

          scope.registry = _rvGlobalSpinnerRegistry;

          scope.$watchCollection("registry", function () {
            if (scope.registry.length > 0) {
              scope.active = true;
            } else {
              scope.active = false;
            }
          });

          scope.$watch("active", function (active) {
            if (active) {
              $element.removeClass("ng-hide");
            } else {
              $element.addClass("ng-hide");
            }
          });

          //to be used if user has closed Google authentication popup dialog
          //without completing the registration process

          scope.spinnerFocused = function () {
            $rootScope.$broadcast("rv-spinner:global:focused");
          };

          $timeout(function () {
            usSpinnerService.spin("_rv-global-spinner");
          });
          scope.active = true;

        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.loading")
  .directive("rvSpinner", ["usSpinnerService", "$compile",
    function (usSpinnerService, $compile) {
      return {
        scope: {
          backdropClass: "@rvSpinnerBackdropClass",
          rvSpinnerKey: "@rvSpinnerKey",
          rvSpinnerStartActive: "=?rvSpinnerStartActive",
          rvSpinnerOptions: "=rvSpinner"
        },
        link: function postLink(scope, $element, iAttrs) {
          scope.active = angular.isDefined(iAttrs.rvSpinnerStartActive) &&
            iAttrs.rvSpinnerStartActive === "1";
          var tpl =
            "<div ng-show=\"active\" class=\"spinner-backdrop fade {{backdropClass}}\"" +
            " ng-class=\"{in: active}\" us-spinner=\"rvSpinnerOptions\"" +
            " spinner-key=\"{{rvSpinnerKey}}\"";

          if (iAttrs.rvSpinnerStartActive && iAttrs.rvSpinnerStartActive ===
            "1") {
            tpl += " spinner-start-active=\"1\"></div>";
          } else {
            tpl += "></div>";
          }

          $element.prepend($compile(tpl)(scope));

          scope.$on("rv-spinner:start", function (event, key) {
            if (key === scope.rvSpinnerKey) {
              usSpinnerService.spin(key);
              scope.active = true;
            }
          });

          scope.$on("rv-spinner:stop", function (event, key) {
            if (key === scope.rvSpinnerKey) {
              usSpinnerService.stop(key);
              scope.active = false;
            }
          });
        }
      };
    }
  ]);
