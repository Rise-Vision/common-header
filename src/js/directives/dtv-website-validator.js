"use strict";

angular.module("risevision.common.header.directives")
  .directive("websiteValidator", [

    function () {
      return {
        require: "ngModel",
        restrict: "A",
        link: function (scope, elem, attr, ngModel) {
          var WEBSITE_REGEXP =
            /^(http[s]?:\/\/){0,1}([^\s/?\.#:"]+\.)+([^\s/?\.#:"-]{2,5})([\/?#][^\s"]*)?$/;
          // /^(http[s]?:\/\/){0,1}([^\s/?\.#:"]+\.?)+(\/[^\s]*)?$/;
          // /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

          var validator = function (value) {
            if (!value || WEBSITE_REGEXP.test(value)) {
              ngModel.$setValidity("website", true);
            } else {
              ngModel.$setValidity("website", false);
            }

            return value;
          };

          ngModel.$parsers.unshift(validator);
          ngModel.$formatters.unshift(validator);
        }
      };
    }
  ]);
