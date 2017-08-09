(function (angular) {
  "use strict";

  angular.module("risevision.common.registration", [
    "risevision.common.components.userstate", "risevision.ui-flow",
    "risevision.core.userprofile", "risevision.common.gapi"
  ])

  .config(["uiStatusDependencies",
    function (uiStatusDependencies) {
      uiStatusDependencies.addDependencies({
        "registerdAsRiseVisionUser": "signedInWithGoogle",
        "registeredAsRiseVisionUser": "signedInWithGoogle",
        "registrationComplete": ["notLoggedIn",
          "registeredAsRiseVisionUser"
        ]
      });

      uiStatusDependencies.setMaximumRetryCount("signedInWithGoogle", 1);
    }
  ])

  .factory("signedInWithGoogle", ["$q", "getOAuthUserInfo", "userState",
    function ($q, getOAuthUserInfo, userState) {
      return function () {
        var deferred = $q.defer();
        // userState.authenticate(false).then().finally(function () {
        if (userState.isLoggedIn()) {
          deferred.resolve();
        } else {
          deferred.reject("signedInWithGoogle");
        }
        // });
        return deferred.promise;
      };
    }
  ])

  .factory("notLoggedIn", ["$q", "$log", "signedInWithGoogle",
    function ($q, $log, signedInWithGoogle) {
      return function () {
        var deferred = $q.defer();
        signedInWithGoogle().then(function () {
          deferred.reject("notLoggedIn");
        }, deferred.resolve);
        return deferred.promise;
      };
    }
  ])

  .factory("registeredAsRiseVisionUser", ["$q", "getUserProfile",
    "cookieStore", "$log", "userState",
    function ($q, getUserProfile, cookieStore, $log, userState) {
      return function () {
        var deferred = $q.defer();

        getUserProfile(userState.getUsername()).then(function (profile) {
          if (angular.isDefined(profile.email) &&
            angular.isDefined(profile.mailSyncEnabled)) {
            deferred.resolve(profile);
          } else if (cookieStore.get("surpressRegistration")) {
            deferred.resolve({});
          } else {
            deferred.reject("registeredAsRiseVisionUser");
          }
        }, function (err) {
          if (cookieStore.get("surpressRegistration")) {
            deferred.resolve({});
          } else {
            $log.debug("registeredAsRiseVisionUser rejected", err);
            deferred.reject("registeredAsRiseVisionUser");
          }
        });

        return deferred.promise;
      };
    }
  ]);

})(angular);
