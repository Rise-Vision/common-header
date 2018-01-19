(function (angular) {
  "use strict";

  /*jshint camelcase: false */
  /*jshint unused: false */

  angular.module("risevision.common.components.userstate")
  // constants (you can override them in your app as needed)
  .value("OAUTH2_SCOPES",
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
  )
    .value("GOOGLE_OAUTH2_URL", "https://accounts.google.com/o/oauth2/auth")
    .factory("googleAuthFactory", ["$rootScope", "$q", "$log", "$location",
      "$interval", "$window", "$http", "$stateParams", "auth2APILoader",
      "getOAuthUserInfo", "uiFlowManager", "getBaseDomain", "userState",
      "urlStateService", "CLIENT_ID", "OAUTH2_SCOPES", "GOOGLE_OAUTH2_URL",
      function ($rootScope, $q, $log, $location, $interval, $window, $http,
        $stateParams,
        auth2APILoader, getOAuthUserInfo, uiFlowManager, getBaseDomain,
        userState, urlStateService,
        CLIENT_ID, OAUTH2_SCOPES, GOOGLE_OAUTH2_URL) {

        var _accessTokenRefreshHandler = null;

        var _scheduleAccessTokenAutoRefresh = function () {
          //cancel any existing $interval(s)
          $interval.cancel(_accessTokenRefreshHandler);
          _accessTokenRefreshHandler = $interval(function () {
            //cancel current $interval. It will be re-sheduled if authentication succeeds
            $interval.cancel(_accessTokenRefreshHandler);
            //refresh Access Token
            authenticate();
          }, 55 * 60 * 1000); //refresh every 55 minutes
        };

        // TODO: Update
        var _cancelAccessTokenAutoRefresh = function () {
          $interval.cancel(_accessTokenRefreshHandler);
          _accessTokenRefreshHandler = null;
        };

        var _gapiAuthorize = function (attemptImmediate) {
          var deferred = $q.defer();

          var _state = userState._state;
          var opts = {
            client_id: CLIENT_ID,
            scope: OAUTH2_SCOPES,
            cookie_policy: $location.protocol() + "://" +
              getBaseDomain()
          };

          // if (_state.userToken === "dummy") {
          //   opts.authuser = $http.get(
          //     "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" +
          //     _state.params.access_token)
          //     .then(function (resp) {
          //       return resp.data.email;
          //     }, function (err) {
          //       $log.debug("Error retrieving userinfo", err);
          //       return opts.authuser;
          //     });
          // } else if (_state.userToken) {
          //   opts.authuser = _state.userToken.email;
          // }

          if (attemptImmediate) {
            opts.immediate = true;
          } else {
            opts.prompt = "select_account";
          }

          auth2APILoader()
            .then(function (auth2) {
              var authResult = auth2.getAuthInstance().isSignedIn.get();

              $log.debug("authResult", authResult);
              if (authResult) {
                if (_state.params) {
                  // clear token so we don't deal with expiry
                  delete _state.params;
                }

                _scheduleAccessTokenAutoRefresh();

                deferred.resolve(authResult);
              } else {
                deferred.reject("failed to authorize user");
              }
            })
            .then(null, deferred.reject); //auth2APILoader

          return deferred.promise;
        };

        /*
         * Responsible for triggering the Google OAuth process.
         *
         */
        var authenticate = function (forceAuth) {
          var deferred = $q.defer();

          var authResult;

          _gapiAuthorize(!forceAuth)
            .then(function (res) {
              authResult = res;

              return getOAuthUserInfo();
            })
            .then(function (oauthUserInfo) {
              deferred.resolve(oauthUserInfo);
            })
            .then(null, function (err) {
              deferred.reject(err);
            });

          return deferred.promise;
        };

        var authenticateRedirect = function (forceAuth) {

          if (!forceAuth) {
            return authenticate(forceAuth);
          } else {
            var loc;
            var state = $stateParams.state;
            var redirectUrl;

            // Redirect to full URL path
            if ($rootScope.redirectToRoot === false) {
              loc = $window.location.href.substr(0, $window.location.href
                .indexOf("#")) || $window.location.href;

              state = urlStateService.clearStatePath(state);
            } else {
              loc = $window.location.origin + "/";
            }

            userState._persistState();
            uiFlowManager.persist();

            // redirectUrl = GOOGLE_OAUTH2_URL +
            //   "?response_type=token" +
            //   "&scope=" + encodeURIComponent(OAUTH2_SCOPES) +
            //   "&client_id=" + CLIENT_ID +
            //   "&redirect_uri=" + encodeURIComponent(loc) +
            // //http://stackoverflow.com/a/14393492
            // "&prompt=select_account";

            if (state) {
              // double encode since response gets decoded once!
              state = encodeURIComponent(state);

              redirectUrl += "&state=" + state;
            }

            var opts = {
              // client_id: CLIENT_ID,
              // scope: OAUTH2_SCOPES,
              response_type: "token",
              prompt: "select_account",
              cookie_policy: $location.protocol() + "://" +
                getBaseDomain(),
              ux_mode: "redirect",
              redirect_uri: loc
            };

            var deferred = $q.defer();

            auth2APILoader()
              .then(function (auth2) {
                return auth2.getAuthInstance().signIn(opts);
              })
              .then(authenticate, function (err) {
                deferred.reject(err);
              });

            // returns a promise that never get fulfilled since we are redirecting
            // to that google oauth2 page
            return deferred.promise;
          }
        };

        var googleAuthFactory = {
          authenticate: userState._state.inRVAFrame ||
            ($window.self !== $window.top) ?
            authenticate : authenticateRedirect
        };

        return googleAuthFactory;
      }
    ]);

})(angular);
