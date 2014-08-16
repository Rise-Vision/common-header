(function(angular) {
  "use strict";

  angular.module("risevision.common.auth",
    ["risevision.common.gapi", "risevision.common.localstorage"])

    // Some constants
    .value("DEFAULT_PROFILE_PICTURE", "img/user-icon.png")
    .value("SCOPES", "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile")

    .factory("apiAuth", ["$interval", "$rootScope", "$q", "$http",
      "gapiLoader", "storeAPILoader", "oauthAPILoader", "CLIENT_ID",
      "SCOPES", "DEFAULT_PROFILE_PICTURE", "$log", "localStorageService", "$location",
      function($interval, $rootScope, $q, $http, gapiLoader, storeAPILoader,
        oauthAPILoader, CLIENT_ID, SCOPES, DEFAULT_PROFILE_PICTURE, $log,
        localStorageService, $location) {

        var that = this;
        var factory = {};
        var userState = {};

        var AUTH_STATUS_NOT_AUTHENTICATED = 0;
        var AUTH_STATUS_AUTHENTICATED = 1;

        this.resetUserState = function() {
          userState = {
            user: {
              profile: {
                  name: "",
                  email: "",
                  picture: DEFAULT_PROFILE_PICTURE
              },
              company: null
            },
            selectedCompanyId: null,
            selectedCompany: null,
            isRiseAdmin: false,
            isRiseUser: false,
            isAuthed: false,
            authStatus: AUTH_STATUS_NOT_AUTHENTICATED
          };
        };

        /**
        * The entry point for an app.
        * This may or may not result in a valid authentication.
        *
        * If forceAuth is true, then this is a login request.
        * If not, then it's the app init auth check which will
        * setup an already existinguser "session".
        */
        factory.$authenticate = function(forceAuth) {
          var authenticateDeferred = $q.defer();
          that.resetUserState();

          /**
          * This event is designed to be clearer about the auth flow.
          * It returns a promise that will resolve upon successful authentication,
          * or otherwise be 'reject'ed.
          *
          * This allows a UI to respond to the attempt (by locking the UI for example),
          * and also allow better handling of the failure case.
          *
          */
          $rootScope.$broadcast("rvAuth.$authenticate", {
            isImmediate: !forceAuth,
            promise: authenticateDeferred.promise,
            userState: userState
          });

          // This flag indicates a potentially authenticated user.
          var userAuthed = localStorageService.getItem("rvAuth.userAuthed");
          if (forceAuth || userAuthed === "true") {
            that.authorize(userAuthed === "true" && !forceAuth).then(function(authResult) {
              if (authResult && ! authResult.error) {
                var profilePromise = that.getProfile();
                var companiesPromise = that.getUserCompanies();

                // Block until profile and companies are loaded.
                $q.all([profilePromise, companiesPromise]).then(function(result) {
                  var profileResult = result[0];
                  var companiesResult = result[1];

                  if (companiesResult.items && companiesResult.items.length > 0) {
                    var c = companiesResult.items[0];
                    localStorageService.setItemImmediate("rvAuth.userAuthed", "true");

                    /**
                    * This is the only successful authentication case.
                    */
                    userState.authStatus = AUTH_STATUS_AUTHENTICATED;
                    userState.isAuthed = true;
                    userState.user.company = c;

                    //release 1 simpification - everyone is Purchaser ("pu" role)
                    userState.isRiseUser = true;
                    userState.isRiseAdmin = c.userRoles && c.userRoles.indexOf("ba") > -1;

                    userState.selectedCompany = c;
                    userState.selectedCompanyId = c.id;

                    userState.user.profile.name = profileResult.name;
                    userState.user.profile.email = profileResult.email;
                    userState.user.profile.picture = profileResult.picture;

                    authenticateDeferred.resolve();

                  }
                  else {
                    authenticateDeferred.reject("User has no companies!");
                  }
                }, function() {
                  authenticateDeferred.reject("Failure loading profile and/or companies.");
                });
              }
              else {
                authenticateDeferred.reject("Authentication Error: " + authResult.error);
              }
            });
          }
          else {
            var msg = "user is not authenticated";
            $log.info(msg);
            authenticateDeferred.reject(msg);
          }

          return authenticateDeferred.promise;
        };

        /*
        * Responsible for triggering the Google OAuth process.
        *
        */
        this.authorize = function(attemptImmediate) {
          var authorizeDeferred = $q.defer();

          var opts = {
            client_id: CLIENT_ID,
            scope: SCOPES,
            cookie_policy: $location.protocol() + "://" + $location.host() + ($location.port() ? ":" + $location.port() : "")
          };

          if (attemptImmediate) {
            opts.immediate = true;
          }
          else {
            opts.prompt = "select_account";
          }

          oauthAPILoader.get().then(function (gApi) {
            gApi.auth.authorize(opts, function (authResult) {
              if (authResult && !authResult.error) {
                authorizeDeferred.resolve(authResult);
              }
              else {
                authorizeDeferred.reject();
              }
            });
          });
          return authorizeDeferred.promise;
        };

        this.getUserCompanies = function () {
            var deferred = $q.defer();
            storeAPILoader.get().then(function (storeClient) {
              var request = storeClient.usercompanies.get({});
              request.execute(function (resp) {
                deferred.resolve(resp);
              });
            });
            return deferred.promise;
        };

        this.getProfile = function () {
          var deferred = $q.defer();
          oauthAPILoader.get().then(function (gApi) {
            var request = gApi.client.oauth2.userinfo.get({});
            request.execute(function (resp) {
              deferred.resolve(resp);
            });
          });
          return deferred.promise;
        };

        /**
        * A Convenience method for the app to
        * get the userState object.
        *
        */
        factory.getUserState = function() {
          return userState;
        };

        /**
        * This would be called from the common header (sign out button),
        * or elsewhere in the app (ad-hoc signout). It's responsible
        * for immediately flushing all state and broadcasting
        * an event that the header or app uses to update itself.
        */
        factory.$signOut = function() {

          // The flag the indicates a user is potentially
          // authenticated already, must be destroyed.
          localStorageService.removeItemImmediate("rvAuth.userAuthed");

          // The majority of state is in here
          that.resetUserState();

          $rootScope.$broadcast("rvAuth.$signOut");
        };

        that.resetUserState();
        return factory;

      }]);

})(angular);
