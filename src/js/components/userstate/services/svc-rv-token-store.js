(function (angular) {
  "use strict";

  angular.module("risevision.common.components.rvtokenstore")
    .value("TOKEN_STORE_KEY", "rv-auth-object")
    .service("rvTokenStore", ["$log", "$location", "cookieStore",
      "getBaseDomain", "TOKEN_STORE_KEY",
      function ($log, $location, cookieStore, getBaseDomain,
        TOKEN_STORE_KEY) {
        var _readRvToken = function () {
          var token = cookieStore.get(TOKEN_STORE_KEY);

          try {
            return JSON.parse(token);
          } catch (e) {
            return token;
          }
        };

        var _writeRvToken = function (value) {
          var baseDomain = getBaseDomain();
          if (baseDomain === "localhost") {
            cookieStore.put(TOKEN_STORE_KEY, JSON.stringify(value), {
              path: "/"
            });
          } else {
            cookieStore.put(TOKEN_STORE_KEY, JSON.stringify(value), {
              domain: baseDomain,
              path: "/"
            });
          }
        };

        var _clearRvToken = function () {
          var baseDomain = getBaseDomain();
          if (baseDomain === "localhost") {
            cookieStore.remove(TOKEN_STORE_KEY, {
              path: "/"
            });
          } else {
            cookieStore.remove(TOKEN_STORE_KEY, {
              domain: baseDomain,
              path: "/"
            });
          }
        };

        var rvToken = {
          read: _readRvToken,
          write: _writeRvToken,
          clear: _clearRvToken
        };

        return rvToken;
      }
    ]);

})(angular);
