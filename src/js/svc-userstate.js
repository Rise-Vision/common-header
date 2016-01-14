(function (angular) {
  "use strict";

  var stripLeadingSlash = function (str) {
    if (str[0] === "/") {
      str = str.slice(1);
    }
    return str;
  };

  var parseParams = function (str) {
    var params = {};
    str.split("&").forEach(function (fragment) {
      var fragmentArray = fragment.split("=");
      params[fragmentArray[0]] = fragmentArray[1];
    });
    return params;
  };

  angular.module("risevision.common.userstate", [
    "risevision.common.companystate", "risevision.common.util",
    "risevision.common.gapi", "LocalStorageModule",
    "risevision.common.config", "risevision.core.cache",
    "risevision.core.oauth2",
    "risevision.core.util", "risevision.core.userprofile",
    "risevision.common.loading", "risevision.ui-flow",
    "risevision.common.rvtokenstore", "risevision.common.logging"
  ])

  // constants (you can override them in your app as needed)
  .value("DEFAULT_PROFILE_PICTURE",
    "http://api.randomuser.me/portraits/med/men/33.jpg")

  .value("OAUTH2_SCOPES",
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
  )

  .value("GOOGLE_OAUTH2_URL", "https://accounts.google.com/o/oauth2/auth")

  .run(["$location", "$window", "userState", "$log",
    function ($location, $window, userState, $log) {
      var path = $location.path();
      var params = parseParams(stripLeadingSlash(path));
      $log.debug("URL params", params);
      userState._restoreState();
      if (params.access_token) {
        userState._setUserToken(params);
      }
      if (params.state) {
        var state = JSON.parse(decodeURIComponent(params.state));
        if (state.p || state.s) {
          userState._persistState();

          $window.location.replace(state.p +
            state.s +
            state.u
          );
        } else if ($location.$$html5) { // HTML5 mode, clear path
          $location.path("");
        } else { // non HTML5 mode, set hash
          $window.location.hash = state.u;
        }
      }

    }
  ])

  .factory("userState", [
    "$q", "$log", "$location", "CLIENT_ID",
    "gapiLoader", "OAUTH2_SCOPES", "userInfoCache",
    "getOAuthUserInfo", "getUserProfile", "companyState", "objectHelper",
    "$rootScope", "$interval", "$loading", "$window", "GOOGLE_OAUTH2_URL",
    "localStorageService", "$document", "uiFlowManager", "getBaseDomain",
    "rvTokenStore", "externalLogging",
    function ($q, $log, $location, CLIENT_ID,
      gapiLoader, OAUTH2_SCOPES, userInfoCache,
      getOAuthUserInfo, getUserProfile, companyState, objectHelper,
      $rootScope, $interval, $loading, $window, GOOGLE_OAUTH2_URL,
      localStorageService, $document, uiFlowManager, getBaseDomain,
      rvTokenStore, externalLogging) {
      //singleton factory that represents userState throughout application

      var _state = {
        profile: {}, //Rise vision profile
        user: {}, //Google user
        roleMap: {},
        userToken: rvTokenStore.read(),
        inRVAFrame: angular.isDefined($location.search().inRVA)
      };

      var _accessTokenRefreshHandler = null;

      var _authenticateDeferred;

      var _shouldLogPageLoad = true;

      var _logPageLoad = function (details) {
        if (_shouldLogPageLoad) {
          _shouldLogPageLoad = false;
          try {
            var duration = new Date().getTime() - $window.performance.timing
              .navigationStart;
            externalLogging.logEvent("page load time", details, duration);
          } catch (e) {
            $log.debug("Error logging load time");
          }
        }
      };

      var _detectUserOrAuthChange = function () {
        var token = rvTokenStore.read();
        if (token !== _state.userToken) {
          //token change indicates that user either signed in, or signed out, or changed account in other app
          $window.location.reload();
        } else if (_state.userToken) {
          //make sure user is not signed out of Google account outside of the CH enabled apps
          _authorize(true).finally(function () {
            if (!_state.userToken) {
              $log.debug("Authentication failed. Reloading...");
              $window.location.reload();
            }
          });
        }
      };

      var _addEventListenerVisibilityAPI = function () {
        var visibilityState, visibilityChange;
        var document = $document[0];
        if (typeof document.hidden !== "undefined") {
          visibilityChange = "visibilitychange";
          visibilityState = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
          visibilityChange = "mozvisibilitychange";
          visibilityState = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
          visibilityChange = "msvisibilitychange";
          visibilityState = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
          visibilityChange = "webkitvisibilitychange";
          visibilityState = "webkitVisibilityState";
        }

        document.addEventListener(visibilityChange, function () {
          $log.debug("visibility: " + document[visibilityState]);
          if ("visible" === document[visibilityState]) {
            _detectUserOrAuthChange();
          }
        });

      };

      _addEventListenerVisibilityAPI();

      var _setUserToken = function () {
        _state.userToken = userState.getUsername();
        rvTokenStore.write(_state.userToken);
      };

      var _clearUserToken = function () {
        $log.debug("Clearing user token...");
        _cancelAccessTokenAutoRefresh();
        _state.userToken = null;
        rvTokenStore.clear();
      };

      var _scheduleAccessTokenAutoRefresh = function () {
        //cancel any existing $interval(s)
        $interval.cancel(_accessTokenRefreshHandler);
        _accessTokenRefreshHandler = $interval(function () {
          //cancel current $interval. It will be re-sheduled if authentication succeeds
          $interval.cancel(_accessTokenRefreshHandler);
          //refresh Access Token
          _authorize(true);
        }, 55 * 60 * 1000); //refresh every 55 minutes
      };

      var _cancelAccessTokenAutoRefresh = function () {
        $interval.cancel(_accessTokenRefreshHandler);
        _accessTokenRefreshHandler = null;
      };

      var _resetUserState = function () {
        _authenticateDeferred = null;
        objectHelper.clearObj(_state.user);
        objectHelper.clearObj(_state.profile);
        _state.roleMap = {};

        companyState.resetCompanyState();
        $log.debug("User state has been reset.");
      };

      var refreshProfile = function () {
        var deferred = $q.defer();
        //populate profile if the current user is a rise vision user
        getUserProfile(_state.user.username, true).then(
          function (profile) {
            userState.updateUserProfile(profile);

            //populate company info
            return companyState.init();
          }).then(function () {
          deferred.resolve();
        }, deferred.reject);
        return deferred.promise;
      };

      var _gapiAuthorize = function (attemptImmediate) {
        var deferred = $q.defer();

        var opts = {
          client_id: CLIENT_ID,
          scope: OAUTH2_SCOPES,
          cookie_policy: $location.protocol() + "://" +
            getBaseDomain()
        };

        if (_state.userToken !== "dummy") {
          opts.authuser = _state.userToken;
        }

        if (attemptImmediate) {
          opts.immediate = true;
        } else {
          opts.prompt = "select_account";
        }

        gapiLoader()
          .then(function (gApi) {
            // Setting the gapi token with the chosen user token. This is a fix for the multiple account issue.
            gApi.auth.setToken(_state.params);

            gApi.auth.authorize(opts, function (authResult) {
              $log.debug("authResult", authResult);
              if (authResult && !authResult.error) {
                if (_state.params) {
                  // clear token so we don't deal with expiry
                  delete _state.params;
                }

                _scheduleAccessTokenAutoRefresh();

                deferred.resolve(authResult);
              } else {
                _clearUserToken();

                deferred.reject(authResult.error ||
                  "failed to authorize user");
              }
            });
          }).then(null, deferred.reject); //gapiLoader

        return deferred.promise;
      };

      /*
       * Responsible for triggering the Google OAuth process.
       *
       */
      var _authorize = function (attemptImmediate) {
        var authorizeDeferred = $q.defer();

        var authResult;

        _gapiAuthorize(attemptImmediate)
          .then(function (res) {
            authResult = res;

            return getOAuthUserInfo();
          })
          .then(function (oauthUserInfo) {
            if (!_state.user.username || !_state.profile.username ||
              _state.user.username !== oauthUserInfo.email) {

              //populate user
              objectHelper.clearAndCopy({
                userId: oauthUserInfo.id, //TODO: ideally we should not use real user ID or email, but use hash value instead
                username: oauthUserInfo.email,
                picture: oauthUserInfo.picture
              }, _state.user);

              _setUserToken();

              refreshProfile()
                .finally(function () {
                  authorizeDeferred.resolve(authResult);
                  $rootScope.$broadcast("risevision.user.authorized");
                  if (!attemptImmediate) {
                    $rootScope.$broadcast(
                      "risevision.user.userSignedIn");
                  }
                });
            } else {
              authorizeDeferred.resolve(authResult);
            }
          })
          .then(null, function (err) {
            objectHelper.clearObj(_state.user);
            authorizeDeferred.reject(err);
          });

        return authorizeDeferred.promise;
      };

      var authenticateRedirect = function (forceAuth) {

        if (!forceAuth) {
          return authenticate(forceAuth);
        } else {
          var loc, path, search, state;

          // Redirect to full URL path
          if ($rootScope.redirectToRoot === false) {
            loc = $window.location.href.substr(0, $window.location.href.indexOf(
              "#")) || $window.location.href;
          }
          // Redirect to the URL root and append pathname back to the URL
          // on Authentication success
          // This prevents Domain authentication errors for sub-folders
          // Warning: Root folder must have CH available for this to work,
          // otherwise no redirect is performed!
          else {
            var redirectTo = localStorageService.get(
              "risevision.common.redirectTo");
            if (redirectTo) {
              var parser = document.createElement("a");
              parser.href = redirectTo;

              loc = parser.protocol + "//" + parser.host + "/";
              path = parser.pathname ? parser.pathname.substring(1) : "";
              search = parser.search;
            } else {
              loc = $window.location.origin + "/";
              // Remove first character (/) from path since we're adding it to loc
              path = $window.location.pathname ? $window.location.pathname
                .substring(1) : "";
              search = $window.location.search;
            }
          }

          // double encode since response gets decoded once!
          state = encodeURIComponent(encodeURIComponent(JSON.stringify({
            p: path,
            u: $window.location.hash,
            s: search
          })));

          localStorageService.set("risevision.common.userState", _state);
          uiFlowManager.persist();

          $window.location.href = GOOGLE_OAUTH2_URL +
            "?response_type=token" +
            "&scope=" + encodeURIComponent(OAUTH2_SCOPES) +
            "&client_id=" + CLIENT_ID +
            "&redirect_uri=" + encodeURIComponent(loc) +
          //http://stackoverflow.com/a/14393492
          "&prompt=select_account" +
            "&state=" + state;

          var deferred = $q.defer();
          // returns a promise that never get fulfilled since we are redirecting
          // to that google oauth2 page
          return deferred.promise;
        }
      };

      var authenticate = function (forceAuth) {
        var authenticateDeferred;

        // Clear User state
        if (forceAuth) {
          _resetUserState();
          userInfoCache.removeAll();
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
            _authorize(!forceAuth)
              .then(function (authResult) {
                if (authResult && !authResult.error) {
                  authenticateDeferred.resolve();
                } else {
                  _clearUserToken();
                  $log.debug("Authentication Error: " +
                    authResult.error);
                  authenticateDeferred.reject(
                    "Authentication Error: " + authResult.error);
                }
              })
              .then(null, function (err) {
                _clearUserToken();
                authenticateDeferred.reject(err);
              })
              .finally(function () {
                $loading.stopGlobal(
                  "risevision.user.authenticate");
                _logPageLoad("authenticated user");
              });
          } else {
            var msg = "user is not authenticated";
            $log.debug(msg);
            //  _clearUserToken();
            authenticateDeferred.reject(msg);
            objectHelper.clearObj(_state.user);
            $loading.stopGlobal("risevision.user.authenticate");
            _logPageLoad("unauthenticated user");
          }
        };
        _proceed();

        if (forceAuth) {
          $loading.startGlobal("risevision.user.authenticate");
        }

        return authenticateDeferred.promise;
      };

      var signOut = function (signOutGoogle) {
        var deferred = $q.defer();
        userInfoCache.removeAll();
        gapiLoader().then(function (gApi) {
          if (signOutGoogle) {
            $window.logoutFrame.location =
              "https://accounts.google.com/Logout";
          }
          gApi.auth.signOut();
          // The flag the indicates a user is potentially
          // authenticated already, must be destroyed.
          _clearUserToken();
          //clear auth token
          // The majority of state is in here
          _resetUserState();
          objectHelper.clearObj(_state.user);
          //call google api to sign out
          $rootScope.$broadcast("risevision.user.signedOut");
          $log.debug("User is signed out.");
          deferred.resolve();
        }, function () {
          deferred.reject();
        });
        return deferred.promise;
      };

      var isLoggedIn = function () {
        if (!_state.user.username) {
          return false;
        } else {
          return true;
        }
      };

      var isRiseVisionUser = function () {
        return _state.profile.username !== null &&
          _state.profile.username !== undefined;
      };

      var hasRole = function (role) {
        return angular.isDefined(_state.roleMap[role]);
      };

      var getAccessToken = function () {
        return $window.gapi ? $window.gapi.auth.getToken() : null;
      };

      var _restoreState = function () {
        var sFromStorage = localStorageService.get(
          "risevision.common.userState");
        if (sFromStorage) {
          angular.extend(_state, sFromStorage);
          localStorageService.remove("risevision.common.userState"); //clear
          $log.debug("userState restored with", sFromStorage);
        }
      };

      var userState = {
        // user getters
        getUsername: function () {
          return (_state.user && _state.user.username) || null;
        },
        getUserEmail: function () {
          return _state.profile.email;
        },
        getCopyOfProfile: function (noFollow) {
          if (noFollow) {
            return angular.extend({}, _state.profile);
          } else {
            return objectHelper.follow(_state.profile);
          }
        },
        getUserPicture: function () {
          return _state.user.picture;
        },
        hasRole: hasRole,
        inRVAFrame: function () {
          return _state.inRVAFrame;
        },
        isRiseAdmin: function () {
          return hasRole("sa");
        },
        isRiseStoreAdmin: function () {
          return hasRole("ba");
        },
        isUserAdmin: function () {
          return hasRole("ua");
        },
        isPurchaser: function () {
          return hasRole("pu");
        },
        isSeller: companyState.isSeller,
        isRiseVisionUser: isRiseVisionUser,
        isLoggedIn: isLoggedIn,
        getAccessToken: getAccessToken,
        // user functions
        checkUsername: function (username) {
          return (username || false) && (userState.getUsername() || false) &&
            username.toUpperCase() === userState.getUsername().toUpperCase();
        },
        updateUserProfile: function (user) {
          if (userState.checkUsername(user.username)) {
            objectHelper.clearAndCopy(angular.extend({
              username: _state.user.username
            }, user), _state.profile);

            //set role map
            _state.roleMap = {};
            if (_state.profile.roles) {
              _state.profile.roles.forEach(function (val) {
                _state.roleMap[val] = true;
              });
            }

            $rootScope.$broadcast("risevision.user.updated");
          }
        },
        authenticate: _state.inRVAFrame ? authenticate : authenticateRedirect,
        signOut: signOut,
        refreshProfile: refreshProfile,
        // company getters
        getUserCompanyId: companyState.getUserCompanyId,
        getUserCompanyName: companyState.getUserCompanyName,
        getSelectedCompanyId: companyState.getSelectedCompanyId,
        getSelectedCompanyName: companyState.getSelectedCompanyName,
        getSelectedCompanyCountry: companyState.getSelectedCompanyCountry,
        getCopyOfUserCompany: companyState.getCopyOfUserCompany,
        getCopyOfSelectedCompany: companyState.getCopyOfSelectedCompany,
        isSubcompanySelected: companyState.isSubcompanySelected,
        isTestCompanySelected: companyState.isTestCompanySelected,
        // company functions
        updateCompanySettings: companyState.updateCompanySettings,
        updateUserCompanySettings: companyState.updateUserCompanySettings,
        resetCompany: companyState.resetCompany,
        switchCompany: companyState.switchCompany,
        // private
        _restoreState: _restoreState,
        _setUserToken: function (params) {
          // save params in state in case of redirect
          _state.params = params;

          // set fake user token to idicate user is logged in
          _state.userToken = "dummy";
        },
        _persistState: function () {
          // persist user state
          localStorageService.set("risevision.common.userState", _state);
        }
      };

      return userState;
    }
  ]);

})(angular);
