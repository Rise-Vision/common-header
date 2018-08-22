"use strict";

angular.module("risevision.common.header.directives")
  .directive("emailsField", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        require: "ngModel",
        scope: {
          emails: "=ngModel"
        },
        template: $templateCache.get("emails-field.html"),
        link: function ($scope, elem, attr, ngModel) {
          var EMAIL_REGEX =
            /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          var updatingEmails = false;
          var validationError = false;

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
            validationError = false;
            ngModel.$setValidity("emails", true);
            $scope.emails = $scope.emailsList.map(function (t) {
              return t.text;
            });
          };

          $scope.invalidateModel = function () {
            validationError = true;
            ngModel.$setValidity("emails", false);
          };

          $scope.canRemove = function () {
            return !validationError;
          };

          $scope.isValidEmail = function (email) {
            return !!(email && email.text && EMAIL_REGEX.test(email.text));
          };
        }
      };
    }
  ]);
