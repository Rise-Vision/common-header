"use strict";

angular.module("risevision.common.header.directives")
  .directive("emailsField", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        scope: {
          emails: "="
        },
        template: $templateCache.get("emails-field.html"),
        link: function ($scope) {
          var EMAIL_REGEX =
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          var updatingEmails = false;

          $scope.$watch("emails", function () {
            if (!updatingEmails) {
              $scope.emailsList = ($scope.emails || []).map(function (e) {
                return {
                  text: e
                };
              });
            }

            updatingEmails = false;
          });

          $scope.updateModel = function () {
            updatingEmails = true;
            $scope.emails = $scope.emailsList.map(function (t) {
              return t.text;
            });
          };

          $scope.isValidEmail = function (email) {
            return !!(email && email.text && EMAIL_REGEX.test(email.text));
          };
        }
      };
    }
  ]);
