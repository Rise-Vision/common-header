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

(function () {
  "use strict";

  angular.module("risevision.widget.common.url-field", [
    "risevision.common.i18n",
    "risevision.widget.common.storage-selector"
  ])
    .directive("urlField", ["$templateCache", "$log",
      function ($templateCache, $log) {
        return {
          restrict: "E",
          require: "?ngModel",
          scope: {
            url: "=",
            hideLabel: "@",
            hideStorage: "@",
            companyId: "@",
            fileType: "@",
            storageType: "@"
          },
          template: $templateCache.get(
            "background-image-setting/url-field.html"),
          link: function (scope, element, attrs, ctrl) {

            function hasValidExtension(url, fileType) {
              var testUrl = url.toLowerCase(),
                extensions;

              switch (fileType) {
              case "image":
                extensions = [".jpg", ".jpeg", ".png", ".bmp", ".svg",
                  ".gif"
                ];
                break;
              case "video":
                extensions = [".webm", ".mp4", ".ogv", ".ogg"];
                break;
              default:
                extensions = [];
              }

              for (var i = 0, len = extensions.length; i < len; i++) {
                if (testUrl.indexOf(extensions[i]) !== -1) {
                  return true;
                }
              }

              return false;
            }


            function testUrl(value) {
              var urlRegExp,
                isValid;

              /*
             Discussion
             http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links#21925491

             Using
             https://gist.github.com/dperini/729294
             Reasoning
             http://mathiasbynens.be/demo/url-regex */

              urlRegExp =
                /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i; // jshint ignore:line

              // Add http:// if no protocol parameter exists
              if (value.indexOf("://") === -1) {
                value = "http://" + value;
              }

              isValid = urlRegExp.test(value);

              if (isValid && typeof scope.fileType !== "undefined") {
                isValid = hasValidExtension(value, scope.fileType);
                if (!isValid) {
                  scope.invalidType = scope.fileType;
                }
              } else {
                scope.invalidType = "url";
              }

              return isValid;
            }

            // By default enforce validation
            scope.doValidation = true;
            // A flag to set if the user turned off validation
            scope.forcedValid = false;
            // Validation state
            scope.valid = true;

            scope.invalidType = "url";

            scope.allowInitEmpty = (typeof attrs.initEmpty !== "undefined");

            if (!scope.hideStorage) {
              scope.$on("picked", function (event, data) {
                scope.url = data[0];
              });
            }

            scope.blur = function () {
              scope.$emit("urlFieldBlur");
            };

            scope.$watch("url", function (url) {
              if (typeof url !== "undefined" && url !== null) {

                if (url !== "" && scope.allowInitEmpty) {
                  // ensure an empty "" value now gets validated
                  scope.allowInitEmpty = false;
                }

                if (scope.doValidation && !scope.allowInitEmpty) {
                  scope.valid = testUrl(scope.url);
                }
              }
            });

            scope.$watch("valid", function (valid) {
              if (ctrl) {
                $log.info("Calling $setValidity() on parent controller");
                ctrl.$setValidity("valid", valid);
              }
            });

            scope.$watch("doValidation", function (doValidation) {
              if (typeof scope.url !== "undefined") {
                if (doValidation) {
                  scope.forcedValid = false;

                  if (!scope.allowInitEmpty) {
                    scope.valid = testUrl(scope.url);
                  }
                } else {
                  scope.forcedValid = true;
                  scope.valid = true;
                }
              }
            });

          }
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

(function(module) {
try {
  module = angular.module('risevision.common.components.background-image-setting');
} catch (e) {
  module = angular.module('risevision.common.components.background-image-setting', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('background-image-setting/url-field.html',
    '<div class="form-group"><label ng-if="!hideLabel">{{ "url.label" | translate }}</label><div ng-class="{\'input-group\':!hideStorage}"><input name="url" type="text" ng-model="url" ng-blur="blur()" class="form-control" placeholder="http://"> <span class="input-url-addon" ng-if="!hideStorage"><storage-selector company-id="{{companyId}}" type="{{storageType}}"></storage-selector></span></div><p ng-if="!valid && invalidType === \'url\'" class="text-danger">{{ "url.errors.url" | translate }}</p><p ng-if="!valid && invalidType === \'image\'" class="text-danger">{{ "url.errors.image" | translate }}</p><p ng-if="!valid && invalidType === \'video\'" class="text-danger">{{ "url.errors.video" | translate }}</p><div class="checkbox" ng-show="forcedValid || !valid"><label><input name="validate-url" ng-click="doValidation = !doValidation" type="checkbox" value="validate-url"> {{"url.validate.label" | translate}}</label></div></div>');
}]);
})();
