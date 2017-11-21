"use strict";

angular.module("risevision.common.email")
  .service("userEmail", ["$templateCache", "userState", "email", "$q",
    function ($templateCache, userState, email, $q) {
      var factory = {};

      factory.sendingEmail = false;

      factory.send = function (username, emailAddress) {
        if (!username || !emailAddress) {
          return $q.reject("Missing required parameters");
        }

        var template = $templateCache.get("add-user-email.html");

        template = template.replace("{{user.username}}", username);

        template = template.replace("{{user.companyName}}",
          userState.getSelectedCompanyName());

        template = template.replace("{{user.firstName}}",
          userState.getCopyOfProfile().firstName);

        template = template.replace("{{user.lastName}}",
          userState.getCopyOfProfile().lastName);

        factory.sendingEmail = true;

        return email.send(emailAddress,
            "You've been added to a Rise Vision account!", template)
          .finally(function () {
            factory.sendingEmail = false;
          });
      };

      return factory;

    }
  ]);
