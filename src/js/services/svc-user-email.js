"use strict";

angular.module("risevision.common.email")
  .service("userEmail", ["$templateCache", "userState", "email", "$q",
    function ($templateCache, userState, email, $q) {
      var factory = {};

      factory.sendingEmail = false;

      var _getCurrentUserName = function () {
        var profile = userState.getCopyOfProfile();
        var name;

        name = profile.firstName ? (profile.firstName + " ") : "";
        name += profile.lastName ? profile.lastName : "";
        name = name ? name : profile.email;

        return name.trim();
      };

      factory.send = function (username, emailAddress) {
        if (!username || !emailAddress) {
          return $q.reject("Missing required parameters");
        }

        var template = $templateCache.get("add-user-email.html");

        template = template.replace("{{newUser.username}}", username);
        template = template.replace("{{newUser.companyName}}",
          userState.getSelectedCompanyName());
        template = template.replace("{{newUser.encodedCompanyName}}",
          encodeURIComponent(userState.getSelectedCompanyName()));

        template = template.replace("{{user.name}}", _getCurrentUserName());

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
