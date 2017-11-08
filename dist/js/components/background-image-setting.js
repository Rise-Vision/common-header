(function () {
  "use strict";

  angular.module(
    "risevision.common.components.background-image-setting", [
      "risevision.common.i18n",
      "colorpicker.module",
      "risevision.widget.common.url-field",
      "risevision.widget.common.position-setting",
      "risevision.common.components.background-image",
      "risevision.common.components.repeat-setting"
    ])
    .directive("backgroundImageSetting", ["$templateCache",
      function ($templateCache) {
        return {
          restrict: "E",
          scope: {
            background: "=",
            companyId: "@",
            colorParentContainerClass: "=",
            colorContainerClass: "=",
            positionParentContainerClass: "=",
            positionContainerClass: "=",
            repeatParentContainerClass: "=",
            repeatContainerClass: "="
          },
          template: $templateCache.get(
            "background-image-setting/background-image-setting.html"
          ),
          link: function (scope) {

            scope.defaultSetting = {
              useImage: false,
              image: {
                url: "",
                position: "top-left",
                scale: true,
                repeat: "no-repeat"
              }
            };

            scope.defaults = function (obj) {
              if (obj) {
                for (var i = 1, length = arguments.length; i < length; i++) {
                  var source = arguments[i];

                  for (var prop in source) {
                    if (obj[prop] === void 0) {
                      obj[prop] = source[prop];
                    }
                  }
                }
              }
              return obj;
            };

            scope.imageLoaded = false;
            scope.imageUrl = "";

            scope.$watch("background", function (background) {
              scope.defaults(background, scope.defaultSetting);
            });

            scope.$watch("background.image.url", function (newUrl) {
              if (scope.imageUrl !== newUrl) {
                scope.imageUrl = newUrl;
              }
            });

            scope.$on("backgroundImageLoad", function (event, loaded) {
              scope.$apply(function () {
                scope.imageLoaded = loaded;
              });

            });

            scope.$on("urlFieldBlur", function () {
              scope.imageUrl = scope.background.image.url;
            });

          }
        };
      }
    ]);
}());

(function () {
  "use strict";

  angular.module("risevision.common.components.background-image", [])
    .directive("backgroundImage", ["$log",
      function ( /*$log*/ ) {
        return {
          restrict: "A",
          link: function (scope, element) {
            element.bind("load", function () {
              scope.$emit("backgroundImageLoad", true);
            });

            element.bind("error", function () {
              scope.$emit("backgroundImageLoad", false);
            });
          }
        };
      }
    ]);
}());

(function () {
  "use strict";

  angular.module("risevision.common.components.repeat-setting", [
    "risevision.common.i18n"
  ])
    .directive("repeatSetting", ["$templateCache",
      function ($templateCache) {
        return {
          restrict: "E",
          scope: {
            repeat: "=",
            hideLabel: "@",
            parentContainerClass: "=",
            containerClass: "=",
            "disabled": "="
          },
          template: $templateCache.get(
            "background-image-setting/repeat-setting.html")
        };
      }
    ]);
}());

(function(module) {
try {
  module = angular.module('risevision.common.components.background-image-setting');
} catch (e) {
  module = angular.module('risevision.common.components.background-image-setting', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('background-image-setting/background-image-setting.html',
    '<div class="{{colorParentContainerClass || \'row\'}}"><div class="{{colorContainerClass || \'col-md-3\'}}" style="position:relative;"><div class="input-group" colorpicker="rgba" colorpicker-parent="true" ng-model="background.color"><input class="form-control" type="text" ng-model="background.color"> <span class="input-group-addon color-wheel"></span></div></div></div><div class="checkbox"><label><input name="choice" type="checkbox" ng-model="background.useImage"> {{"background.choice" | translate}}</label></div><div id="backgroundImageControls" ng-if="background.useImage"><div class="form-group"><div ng-if="!imageLoaded" class="image-placeholder"><i class="fa fa-image"></i></div><div ng-show="imageLoaded" class="row"><div class="col-xs-4"><img ng-src="{{imageUrl}}" background-image="" class="img-rounded img-responsive"></div></div></div><url-field id="backgroundImageUrl" url="background.image.url" file-type="image" hide-label="true" company-id="{{companyId}}" ng-model="urlentry" valid=""></url-field><div class="row"><div class="col-sm-6"><label translate="">background.image.position.label</label><position-setting parent-container-class="positionParentContainerClass" container-class="positionContainerClass" position="background.image.position" hide-label="true"></position-setting></div><div class="col-sm-6"><label translate="">background.image.repeat.label</label><repeat-setting parent-container-class="repeatParentContainerClass" container-class="repeatContainerClass" repeat="background.image.repeat" hide-label="true" disabled="background.image.scale"></repeat-setting></div></div><div class="checkbox"><label><input name="scale" type="checkbox" ng-model="background.image.scale"> {{"background.image.scale" | translate}}</label></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.background-image-setting');
} catch (e) {
  module = angular.module('risevision.common.components.background-image-setting', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('background-image-setting/repeat-setting.html',
    '<div class="{{parentContainerClass || \'row\'}}"><div class="{{containerClass || \'col-md-3\'}}"><label ng-if="!hideLabel" translate="">background.image.repeat.label</label><select name="repeat" ng-model="repeat" class="form-control" ng-disabled="disabled"><option value="no-repeat" translate="">background.image.repeat.noRepeat</option><option value="repeat-y" translate="">background.image.repeat.vertical</option><option value="repeat-x" translate="">background.image.repeat.horizontal</option><option value="repeat" translate="">background.image.repeat.both</option></select></div></div>');
}]);
})();
