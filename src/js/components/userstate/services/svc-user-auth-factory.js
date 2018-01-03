(function (angular) {
  "use strict";

  angular.module("risevision.common.components.userstate")
    .value("FORCE_GOOGLE_AUTH", false)
    .factory("userAuthFactory", ["$q", "$log", "$location",
      "$rootScope", "$loading", "$window", "$document",
      "gapiLoader", "objectHelper", "rvTokenStore", "externalLogging",
      "userState", "googleAuthFactory", "customAuthFactory",
      "FORCE_GOOGLE_AUTH",
      function ($q, $log, $location, $rootScope, $loading, $window,
        $document, gapiLoader, objectHelper,
        rvTokenStore, externalLogging, userState, googleAuthFactory,
        customAuthFactory, FORCE_GOOGLE_AUTH) {

        var _state = userState._state;

        var _authorizeDeferred, _authenticateDeferred;

        var _shouldLogPageLoad = true;

        var _logPageLoad = function (details) {
          if (_shouldLogPageLoad) {
            _shouldLogPageLoad = false;
            try {
              var duration = new Date().getTime() - $window.performance
                .timing.navigationStart;
              externalLogging.logEvent("page load time", details,
                duration,
                userState.getUsername(), userState.getSelectedCompanyId()
              );
            } catch (e) {
              $log.debug("Error logging load time");
            }
          }
        };

        var _setUserToken = function (userToken) {
          _state.userToken = userToken;
          rvTokenStore.write(_state.userToken);
        };

        var _cancelAccessTokenAutoRefresh = function () {};

        var _resetUserState = function () {
          $log.debug("Clearing user token...");
          _cancelAccessTokenAutoRefresh();
          objectHelper.clearObj(_state.userToken);
          rvTokenStore.clear();

          userState._resetState();
        };

        var _detectUserOrAuthChange = function () {
          var token = rvTokenStore.read();
          if (!angular.equals(token, _state.userToken)) {
            //token change indicates that user either signed in, or signed out, or changed account in other app
            $window.location.reload();
          } else if (_state.userToken) {
            _authenticateDeferred = null;

            //make sure user is not signed out of Google account outside of the CH enabled apps
            authenticate(false).finally(function () {
              if (!_state.userToken) {
                $log.debug("Authentication failed. Reloading...");
                $window.location.reload();
              }
            });
          }
        };

        var _visibilityListener = function () {
          var visibilityState;
          var document = $document[0];
          if (typeof document.hidden !== "undefined") {
            visibilityState = "visibilityState";
          } else if (typeof document.mozHidden !== "undefined") {
            visibilityState = "mozVisibilityState";
          } else if (typeof document.msHidden !== "undefined") {
            visibilityState = "msVisibilityState";
          } else if (typeof document.webkitHidden !== "undefined") {
            visibilityState = "webkitVisibilityState";
          }
          $log.debug("visibility: " + document[visibilityState]);
          if ("visible" === document[visibilityState]) {
            _detectUserOrAuthChange();
          }
        };

        var _getVisibilityChangeName = function () {
          var visibilityChange;
          var document = $document[0];
          if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
          } else if (typeof document.mozHidden !== "undefined") {
            visibilityChange = "mozvisibilitychange";
          } else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
          } else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
          }
          return visibilityChange;
        };

        var _addEventListenerVisibilityAPI = function () {
          document.addEventListener(_getVisibilityChangeName(),
            _visibilityListener);
        };

        var _removeEventListenerVisibilityAPI = function () {
          document.removeEventListener(_getVisibilityChangeName(),
            _visibilityListener);
        };

        _addEventListenerVisibilityAPI();

        /*
         * Responsible for triggering the Google OAuth process.
         *
         */
        var _authorize = function (authenticatedUser) {
          var attemptImmediate = false;

          if (_authorizeDeferred) {
            return _authorizeDeferred.promise;
          }

          if (authenticatedUser) {
            if (!_state.user.username || !_state.profile.username ||
              _state.user.username !== authenticatedUser.email) {
              _authorizeDeferred = $q.defer();

              //populate user
              objectHelper.clearAndCopy({
                userId: authenticatedUser.id, //TODO: ideally we should not use real user ID or email, but use hash value instead
                username: authenticatedUser.email,
                picture: authenticatedUser.picture
              }, _state.user);

              _setUserToken(authenticatedUser);

              userState.refreshProfile()
                .then(null, function (err) {
                  if (err && err.code !== 403) {
                    _authorizeDeferred.reject("Refresh Profile Error");

                    _authorizeDeferred = undefined;

                    return $q.reject();
                  }
                })
                .then(function () {
                  _authorizeDeferred.resolve();

                  $rootScope.$broadcast("risevision.user.authorized");

                  if (!attemptImmediate) {
                    $rootScope.$broadcast(
                      "risevision.user.userSignedIn");
                  }

                  _authorizeDeferred = undefined;
                });

              return _authorizeDeferred.promise;
            } else {
              return $q.resolve();
            }
          } else {
            return $q.reject("No user");
          }
        };

        var authenticate = function (forceAuth, credentials) {
          var authenticateDeferred;
          var isRiseAuthUser = false;

          // Clear User state
          if (forceAuth) {
            _authenticateDeferred = null;

            _resetUserState();
          }

          // Return cached promise
          if (_authenticateDeferred) {
            return _authenticateDeferred.promise;
          } else {
            _authenticateDeferred = $q.defer();
          }

          // Always resolve local copy of promise
          // in case cached version is cleared
          authenticateDeferred = _authenticateDeferred;
          $log.debug("authentication called");

          var _proceed = function () {
            // This flag indicates a potentially authenticated user.
            var userAuthed = (angular.isDefined(_state.userToken) &&
              _state.userToken !== null);
            $log.debug("userAuthed", userAuthed);

            if (forceAuth || userAuthed === true) {
              var authenticationPromise;

              // Credentials or Token provided; assume authenticated
              if (credentials || _state.userToken && _state.userToken.token &&
                !FORCE_GOOGLE_AUTH) {
                isRiseAuthUser = true;
                authenticationPromise = customAuthFactory.authenticate(
                  credentials);
              } else {
                authenticationPromise = googleAuthFactory.authenticate(
                  forceAuth);
              }

              authenticationPromise
                .then(_authorize)
                .then(function () {
                  userState._setIsRiseAuthUser(isRiseAuthUser);
                  authenticateDeferred.resolve();
                })
                .then(null, function (err) {
                  _resetUserState();

                  $log.debug("Authentication Error: " + err);

                  authenticateDeferred.reject(err);
                })
                .finally(function () {
                  $loading.stopGlobal("risevision.user.authenticate");

                  _logPageLoad("authenticated user");
                });
            } else {
              var msg = "user is not authenticated";
              $log.debug(msg);

              _resetUserState();

              authenticateDeferred.reject(msg);

              $loading.stopGlobal("risevision.user.authenticate");

              _logPageLoad("unauthenticated user");
            }
          };
          // pre-load gapi to prevent popup blocker issues
          gapiLoader().finally(_proceed);

          if (forceAuth) {
            $loading.startGlobal("risevision.user.authenticate");
          }

          return authenticateDeferred.promise;
        };

        var signOut = function (signOutGoogle) {
          return gapiLoader().then(function (gApi) {
            if (!userState.isRiseAuthUser()) {
              if (signOutGoogle) {
                $window.logoutFrame.location =
                  "https://accounts.google.com/Logout";
              }
              gApi.auth.signOut();
            }

            _authenticateDeferred = null;

            // The flag the indicates a user is potentially
            // authenticated already, must be destroyed.
            _resetUserState();

            //call google api to sign out
            $rootScope.$broadcast("risevision.user.signedOut");
            $log.debug("User is signed out.");
          });
        };

        var isPasswordValid = function (password) {
          return (typeof password === "string") && password.trim().length >=
            4;
        };

        var userAuthFactory = {
          authenticate: authenticate,
          authenticatePopup: function () {
            return authenticate(true);
          },
          signOut: signOut,
          isPasswordValid: isPasswordValid,
          addEventListenerVisibilityAPI: _addEventListenerVisibilityAPI,
          removeEventListenerVisibilityAPI: _removeEventListenerVisibilityAPI,
        };

        return userAuthFactory;
      }
    ]);

})(angular);
