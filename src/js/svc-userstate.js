(function (angular) {
  "use strict";


  // var pendingAccessToken, pendingState;

  var stripLeadingSlash = function (str) {
    if(str[0] === "/") { str = str.slice(1); }
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

  var _userStateReady;

  angular.module("risevision.common.userstate",
    ["risevision.common.companystate", "risevision.common.util",
    "risevision.common.gapi", "risevision.common.localstorage",
    "risevision.common.config", "risevision.core.cache",
    "risevision.core.oauth2", "ngBiscuit",
    "risevision.core.util", "risevision.core.userprofile",
    "risevision.common.loading", "LocalStorageModule", 
    "risevision.ui-flow"
  ])

  // constants (you can override them in your app as needed)
  .value("DEFAULT_PROFILE_PICTURE", "http://api.randomuser.me/portraits/med/men/33.jpg")
  .value("OAUTH2_SCOPES", "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile")
  .value("GOOGLE_OAUTH2_URL", "https://accounts.google.com/o/oauth2/auth")

  .factory("userStateReady", [function (){
     return _userStateReady.promise; }])

   .run(["$q", function ($q) {  _userStateReady = $q.defer(); }])

  .run(["$location", "$window", "userState", "$log", "gapiLoader",
      function ($location, $window, userState, $log, gapiLoader) {
      var path = $location.path();
      var params = parseParams(stripLeadingSlash(path));
      var resolveHandled = false;
      $log.debug("URL params", params);
      if(params.access_token) {
        resolveHandled = true;
        gapiLoader().then(function (gApi) {
          $log.debug("Setting token", params.access_token);
          gApi.auth.setToken( {access_token: params.access_token});
          userState._setUserToken(params.access_token);
          userState.authenticate().then().finally(_userStateReady.resolve);
        });
      }
      userState._restoreState();
      if (params.state) {
        var state = JSON.parse(params.state);
        if(state.u) {
          $location.path(state.u);
          if (state.p || state.s) {
            $window.location.pathname = state.p + (state.s ? "?" + state.s : "");
          }
        }
      }
      if (!resolveHandled) {
        _userStateReady.resolve();
      }

    }])

  .factory("userState", [
    "$q", "$log", "$location", "CLIENT_ID",
    "gapiLoader", "cookieStore", "OAUTH2_SCOPES", "userInfoCache",
    "getOAuthUserInfo", "getUserProfile", "companyState", "objectHelper",
    "$rootScope", "$interval", "$loading", "$window", "GOOGLE_OAUTH2_URL",
    "localStorageService", "$document", "uiFlowManager",
    function ($q, $log, $location, CLIENT_ID,
    gapiLoader, cookieStore, OAUTH2_SCOPES, userInfoCache,
    getOAuthUserInfo, getUserProfile, companyState, objectHelper,
    $rootScope, $interval, $loading, $window, GOOGLE_OAUTH2_URL,
    localStorageService, $document, uiFlowManager) {
    //singleton factory that represents userState throughout application

    var _readRvToken = function () {
      return cookieStore.get("rv-token");
    };

    var _state = {
      profile: {}, //Rise vision profile
      user: {}, //Google user
      roleMap: {},
      userToken: _readRvToken(),
      inRVAFrame: angular.isDefined($location.search().inRVA)
    };

    var _accessTokenRefreshHandler = null;

    var _detectUserOrAuthChange = function() {
      var tocken = _readRvToken();
      if (tocken !== _state.userToken) {
        //token change indicates that user either signed in, or signed out, or changed account in other app
        $window.location.reload();
      } else if (_state.userToken) {
        //make sure user is not signed out of Google account outside of the CH enabled apps
        
        // [AD] Do not show spinner for this
        // $loading.startGlobal("risevision.user.authenticate"); //spinner will be stop inside authenticate()
        authenticate(false).finally(function() {
          if (!_state.userToken) {
            $log.debug("Authentication failed. Reloading...");
            $window.location.reload();
          }
        });
      }
    };

    var _addEventListenerVisibilityAPI = function() {
      var visibilityState, visibilityChange;
      var document = $document[0];
      if (typeof document.hidden !== "undefined") {
        visibilityChange = "visibilitychange";
        visibilityState = "visibilityState";
      }
      else if (typeof document.mozHidden !== "undefined") {
        visibilityChange = "mozvisibilitychange";
        visibilityState = "mozVisibilityState";
      }
      else if (typeof document.msHidden !== "undefined") {
        visibilityChange = "msvisibilitychange";
        visibilityState = "msVisibilityState";
      }
      else if (typeof document.webkitHidden !== "undefined") {
        visibilityChange = "webkitvisibilitychange";
        visibilityState = "webkitVisibilityState";
      }

      document.addEventListener(visibilityChange, function() {
        $log.debug("visibility: " + document[visibilityState]);
        if ("visible" === document[visibilityState]) {
          _detectUserOrAuthChange();
        }
      });

    };

    _addEventListenerVisibilityAPI();

    var _getUserId = function () {
      return _state.user ? _state.user.userId : null;
    };

    var _setUserToken = function () {
      _state.userToken = _getUserId();
      _writeRvToken(_state.userToken);
    };

    var _clearUserToken = function () {
      $log.debug("Clearing user token...");
      _cancelAccessTokenAutoRefresh();
      _state.userToken = null;
      _clearRvToken();
      return gapiLoader().then(function (gApi) {
        gApi.auth.setToken();
      });
    };

    var _scheduleAccessTokenAutoRefresh = function () {
      //cancel any existing $interval(s)
      $interval.cancel(_accessTokenRefreshHandler);
      _accessTokenRefreshHandler = $interval(function(){
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

    var _looksLikeIp = function (addr)
    {
     if (/^([0-9])+\.([0-9])+\.([0-9])+\.([0-9])+$/.test(addr))
      {
        return (true);
      }
      return (false);
    };

    var _getBaseDomain = function () {
      var result;
      if(!result) {
        var hostname = $location.host();

        if(_looksLikeIp(hostname)) {
          result = hostname;
        }
        else {
          var parts = hostname.split(".");
          if(parts.length > 1) {
            result = parts.slice(parts.length -2).join(".");
          }
          else {
            //localhost
            result = hostname;
          }
        }

        $log.debug("baseDomain", result);
      }
      return result;
    };

    var _resetUserState = function () {
       objectHelper.clearObj(_state.user);
       objectHelper.clearObj(_state.profile);
       _state.roleMap = {};
       
       companyState.resetCompanyState();
       $log.debug("User state has been reset.");
     };

     var refreshProfile = function () {
       var deferred = $q.defer();
         getOAuthUserInfo().then(function (oauthUserInfo) {
         //populate profile if the current user is a rise vision user
         getUserProfile(_state.user.username, true).then(
           function (profile) {
             objectHelper.clearAndCopy(angular.extend({
               username: oauthUserInfo.email
             }, profile), _state.profile);

             //set role map
             _state.roleMap = {};
             if(_state.profile.roles) {
                _state.profile.roles.forEach(function (val){
                  _state.roleMap[val] = true;
                });
             }
             deferred.resolve();
           }, deferred.reject);
       }, deferred.reject);
       return deferred.promise;
     };

     /*
     * Responsible for triggering the Google OAuth process.
     *
     */
     var _authorize = function(attemptImmediate) {
       var authorizeDeferred = $q.defer();

       var opts = {
         client_id: CLIENT_ID,
         scope: OAUTH2_SCOPES,
         cookie_policy: $location.protocol() + "://" +
           _getBaseDomain()
       };

       if (attemptImmediate) {
         opts.immediate = true;
       }
       else {
         opts.prompt = "select_account";
       }
       gapiLoader().then(function (gApi) {
           gApi.auth.authorize(opts, function (authResult) {
             $log.debug("authResult", authResult);
             if (authResult && !authResult.error) {
               _scheduleAccessTokenAutoRefresh();
                 getOAuthUserInfo().then(function (oauthUserInfo) {
                   if(!_state.user.username || !_state.profile.username ||
                     _state.user.username !== oauthUserInfo.email) {

                     //populate user
                     objectHelper.clearAndCopy({
                       userId: oauthUserInfo.id, //TODO: ideally we should not use real user ID or email, but use hash value instead
                       username: oauthUserInfo.email,
                       picture: oauthUserInfo.picture
                     }, _state.user);

                     _setUserToken();
                     refreshProfile().then(function () {
                       //populate company info
                       return companyState.init();
                     })
                     .finally(function () {
                       authorizeDeferred.resolve(authResult);
                       $rootScope.$broadcast("risevision.user.authorized");
                       if(!attemptImmediate) {
                         $rootScope.$broadcast("risevision.user.userSignedIn");
                       }
                     });
                   }
                   else {authorizeDeferred.resolve(authResult); }
                 }, function(err){
                   objectHelper.clearObj(_state.user);
                 authorizeDeferred.reject(err); });
             }
             else {
               objectHelper.clearObj(_state.user);
               authorizeDeferred.reject("not authorized");
             }
           });
       }, authorizeDeferred.reject); //gapiLoader

       return authorizeDeferred.promise;
     };

     var authenticateRedirect = function(forceAuth) {

       if(!forceAuth) {
         return authenticate(forceAuth);
       }

       else {
        // _persist();

        var loc = $window.location.origin;
        var path = $window.location.pathname === "/" ? "" : $window.location.pathname;
        // Remove first character (?) from search since it causes a parsing error
        // when the object is returned
        var search = $window.location.search ? $window.location.search.substring(1) : "";

        localStorageService.set("risevision.common.userState", _state);
        uiFlowManager.persist();

        $window.location = GOOGLE_OAUTH2_URL +
          "?response_type=token" +
          "&scope=" + encodeURIComponent(OAUTH2_SCOPES) +
          "&client_id=" + CLIENT_ID +
          "&redirect_uri=" + encodeURIComponent(loc) +
          //http://stackoverflow.com/a/14393492
          "&prompt=select_account" +
          "&state=" + encodeURIComponent(JSON.stringify({p:path, u: $location.path(), s: search}));

        var deferred = $q.defer();
        // returns a promise that never get fulfilled since we are redirecting
        // to that google oauth2 page
        return deferred.promise;
       }
     };

     var authenticate = function(forceAuth) {
       var authenticateDeferred = $q.defer();
       $log.debug("authentication called");

       var _proceed = function () {
         if(forceAuth) {
           _resetUserState();
           userInfoCache.removeAll();
         }
         // This flag indicates a potentially authenticated user.
         gapiLoader().then(function () {
          var userAuthed = (angular.isDefined(_state.userToken) && _state.userToken !== null);
          //var userAuthed = gApi.auth.getToken() !== null;
          $log.debug("userAuthed", userAuthed);

          if (forceAuth || userAuthed === true) {
            _authorize(!forceAuth)
            .then(function(authResult) {
              if (authResult && ! authResult.error) {
                authenticateDeferred.resolve();
              }
              else {
                _clearUserToken();
                $log.debug("Authentication Error: " + authResult.error);
                authenticateDeferred.reject("Authentication Error: " + authResult.error);
              }
            }, function () {
              _clearUserToken();
              authenticateDeferred.reject();
            })
            .finally(function (){
              $loading.stopGlobal("risevision.user.authenticate");
            });
          }
          else {
            var msg = "user is not authenticated";
            $log.debug(msg);
           //  _clearUserToken();
            authenticateDeferred.reject(msg);
            objectHelper.clearObj(_state.user);
            $loading.stopGlobal("risevision.user.authenticate");
          }
         });
       };
       _proceed();

       if(forceAuth) {
         $loading.startGlobal("risevision.user.authenticate");
       }

       return authenticateDeferred.promise;
     };

     var signOut = function(signOutGoogle) {
       var deferred = $q.defer();
       userInfoCache.removeAll();
       gapiLoader().then(function (gApi) {
         if (signOutGoogle) {
           $window.logoutFrame.location = "https://accounts.google.com/Logout";
         }
         gApi.auth.signOut();
         // The flag the indicates a user is potentially
         // authenticated already, must be destroyed.
         _clearUserToken().then(function () {
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
       });
       return deferred.promise;
     };

    var isLoggedIn = function () {
      if(!_state.user.username) {return false; }
      else { return true; }
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

    var _writeRvToken = function (value) {
      var baseDomain = _getBaseDomain();
      if (baseDomain === "localhost") {
        cookieStore.put("rv-token", value);
      } else {
        cookieStore.put("rv-token", value, {domain: baseDomain, path: "/"});
      }
    };

    var _clearRvToken = function () {
      var baseDomain = _getBaseDomain();
      if (baseDomain === "localhost") {
        cookieStore.remove("rv-token");
      } else {
        cookieStore.remove("rv-token", {domain: baseDomain, path: "/"});
      }
    };

    var _restoreState = function () {
      var sFromStorage = localStorageService.get("risevision.common.userState");
      if(sFromStorage) {
        angular.extend(_state, sFromStorage);
        localStorageService.remove("risevision.common.userState"); //clear
        $log.debug("userState restored with", sFromStorage);
      }
    };

    var userState = {
      getUserCompanyId: companyState.getUserCompanyId,
      getSelectedCompanyId: companyState.getSelectedCompanyId,
      getSelectedCompanyName: companyState.getSelectedCompanyName,
      updateCompanySettings: companyState.updateCompanySettings,
      getSelectedCompanyCountry: companyState.getSelectedCompanyCountry,
      getUsername: function () {
        return (_state.user && _state.user.username) || null; },
      getUserEmail: function () { return _state.profile.email; },
      getCopyOfProfile: function () { return objectHelper.follow(_state.profile); },
      resetCompany: companyState.resetCompany,
      getCopyOfUserCompany: companyState.getCopyOfUserCompany,
      getCopyOfSelectedCompany: companyState.getCopyOfSelectedCompany,
      switchCompany: companyState.switchCompany,
      isSubcompanySelected: companyState.isSubcompanySelected,
      isTestCompanySelected: companyState.isTestCompanySelected,
      getUserPicture: function () { return _state.user.picture; },
      hasRole: hasRole,
      inRVAFrame: function () {return _state.inRVAFrame; },
      isRiseAdmin: function () {return hasRole("sa"); },
      isRiseStoreAdmin: function () {return hasRole("ba"); },
      isUserAdmin: function () {return hasRole("ua"); },
      isPurchaser: function () {return hasRole("pu"); },
      isSeller: companyState.isSeller,
      isRiseVisionUser: isRiseVisionUser,
      isLoggedIn: isLoggedIn,
      authenticate: _state.inRVAFrame ? authenticate : authenticateRedirect,
      signOut: signOut,
      refreshProfile: refreshProfile,
      getAccessToken: getAccessToken,
      _restoreState: _restoreState,
      _setUserToken: function (token) {
        _state.userToken = token; }
    };

    window.userState = userState;
    return userState;
  }]);

})(angular);
