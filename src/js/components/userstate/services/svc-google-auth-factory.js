(function (angular) {
  "use strict";

  /*jshint camelcase: false */

  angular.module("risevision.common.components.userstate")
  // constants (you can override them in your app as needed)
  .factory("googleAuthFactory", ["$rootScope", "$q", "$log", "$location",
    "$window", "$stateParams", "auth2APILoader",
    "getOAuthUserInfo", "uiFlowManager", "getBaseDomain", "userState",
    "urlStateService",
    function ($rootScope, $q, $log, $location, $window, $stateParams,
      auth2APILoader, getOAuthUserInfo, uiFlowManager, getBaseDomain,
      userState, urlStateService) {

      var _gapiAuthorize = function () {
        var deferred = $q.defer();

        auth2APILoader()
          .then(function (auth2) {
            var authResult = auth2.getAuthInstance() &&
              auth2.getAuthInstance().isSignedIn.get();

            $log.debug("authResult", authResult);
            if (authResult) {
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
      var authenticate = function () {
        var deferred = $q.defer();

        var authResult;

        _gapiAuthorize()
          .then(function (res) {
            authResult = res;

            return getOAuthUserInfo();
          })
          .then(function (oauthUserInfo) {
            if (userState._state.state) {
              urlStateService.redirectToState(userState._state.state);

              delete userState._state.state;
            }

            deferred.resolve(oauthUserInfo);
          })
          .then(null, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };

      var _isPopupAuth = function () {
        return (userState._state.inRVAFrame || ($window.self !== $window.top));
      };

      var forceAuthenticate = function () {
        var loc;
        var state = $stateParams.state;

        // Redirect to full URL path
        if ($rootScope.redirectToRoot === false) {
          loc = $window.location.href.substr(0, $window.location.href
            .indexOf("#")) || $window.location.href;

          state = urlStateService.clearStatePath(state);
        } else {
          loc = $window.location.origin + "/";
        }

        userState._state.state = state;
        userState._persistState();
        uiFlowManager.persist();

        var opts = {
          response_type: "token",
          prompt: "select_account",
          cookie_policy: $location.protocol() + "://" +
            getBaseDomain(),
          ux_mode: _isPopupAuth() ? "popup" : "redirect",
          redirect_uri: loc
        };

        var deferred = $q.defer();

        auth2APILoader()
          .then(function (auth2) {
            return auth2.getAuthInstance().signIn(opts);
          })
          .then(function () {
            if (_isPopupAuth()) {
              deferred.resolve(authenticate());
            } else {
              deferred.resolve();
            }
          })
          .then(null, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };

      var googleAuthFactory = {
        authenticate: function (forceAuth) {
          if (!forceAuth) {
            return authenticate();
          } else {
            return forceAuthenticate();
          }
        }
      };

      return googleAuthFactory;
    }
  ]);

})(angular);
