/*jshint camelcase: false */

"use strict";

/* jshint ignore:start */
var gapiLoadingStatus = null;
var handleClientJSLoad = function () {
  gapiLoadingStatus = "loaded";
  console.debug("ClientJS is loaded.");
  //Ready: create a generic event
  var evt = document.createEvent("Events");
  //Aim: initialize it to be the event we want
  evt.initEvent("gapi.loaded", true, true);
  //FIRE!
  window.dispatchEvent(evt);
};
/* jshint ignore:end */

angular.module("risevision.common.gapi", [])
  .value("CLIENT_ID", "614513768474.apps.googleusercontent.com")
  .value("OAUTH2_SCOPES", "profile")

.factory("gapiLoader", ["$q", "$window",
  function ($q, $window) {
    var deferred = $q.defer();

    return function () {
      var gapiLoaded;

      if ($window.gapiLoadingStatus === "loaded") {
        deferred.resolve($window.gapi);
      } else if (!$window.gapiLoadingStatus) {
        $window.gapiLoadingStatus = "loading";

        var src = $window.gapiSrc ||
          "//apis.google.com/js/api.js?onload=handleClientJSLoad";
        var fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", src);
        if (typeof fileref !== "undefined") {
          document.getElementsByTagName("body")[0].appendChild(fileref);
        }

        gapiLoaded = function () {
          deferred.resolve($window.gapi);
          $window.removeEventListener("gapi.loaded", gapiLoaded, false);
        };
        $window.addEventListener("gapi.loaded", gapiLoaded, false);
      }
      return deferred.promise;
    };
  }
])

.factory("auth2APILoader", ["$q", "gapiLoader", "$log", "CLIENT_ID", "OAUTH2_SCOPES",
  function ($q, gapiLoader, $log, CLIENT_ID, OAUTH2_SCOPES) {
    return function () {
      var deferred = $q.defer();
      gapiLoader().then(function (gApi) {
        if (gApi.auth2 && gApi.auth2.getAuthInstance()) {
          //already loaded. return right away
          deferred.resolve(gApi.auth2);
        } else {
          gApi.load("auth2", function () {
            if (gApi.auth2) {
              gApi.auth2.init({
                client_id: CLIENT_ID,
                scope: OAUTH2_SCOPES
              }).then(function () {
                $log.debug("auth2 API Loaded");

                deferred.resolve(gApi.auth2);
              }, function () {
                var errMsg = "auth2 GoogleAuth Init Failed";
                $log.error(errMsg);
                deferred.reject(errMsg);
              });
            } else {
              var errMsg = "auth2 API Load Failed";
              $log.error(errMsg);
              deferred.reject(errMsg);
            }
          });
        }
      });
      return deferred.promise;
    };
  }
])

.factory("clientAPILoader", ["$q", "gapiLoader", "$log",
  function ($q, gapiLoader, $log) {
    return function () {
      var deferred = $q.defer();
      gapiLoader().then(function (gApi) {
        if (gApi.client) {
          //already loaded. return right away
          deferred.resolve(gApi);
        } else {
          gApi.load("client", function () {
            if (gApi.client) {
              $log.debug("client API Loaded");

              deferred.resolve(gApi);
            } else {
              var errMsg = "client API Load Failed";
              $log.error(errMsg);
              deferred.reject(errMsg);
            }
          });
        }
      });
      return deferred.promise;
    };
  }
])

//abstract method for creading a loader factory service that loads any
//custom Google Client API library

.factory("gapiClientLoaderGenerator", ["$q", "clientAPILoader", "$log",
  function ($q, clientAPILoader, $log) {
    return function (libName, libVer, baseUrl) {
      return function () {
        var deferred = $q.defer();
        clientAPILoader().then(function (gApi) {
          if (gApi.client[libName]) {
            //already loaded. return right away
            deferred.resolve(gApi.client[libName]);
          } else {
            gApi.client.load.apply(this, [libName, libVer].concat([

              function () {
                if (gApi.client[libName]) {
                  $log.debug(libName + "." + libVer + " Loaded");
                  deferred.resolve(gApi.client[libName]);
                } else {
                  var errMsg = libName + "." + libVer + " Load Failed";
                  $log.error(errMsg);
                  deferred.reject(errMsg);
                }
              },
              baseUrl
            ]));
          }
        });
        return deferred.promise;
      };
    };
  }
])

.factory("oauth2APILoader", ["gapiClientLoaderGenerator",
  function (gapiClientLoaderGenerator) {
    return gapiClientLoaderGenerator("oauth2", "v2");
  }
])

.factory("coreAPILoader", ["CORE_URL", "gapiClientLoaderGenerator",
  "$location",
  function (CORE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : CORE_URL;
    return gapiClientLoaderGenerator("core", "v1", baseUrl);
  }
])

.factory("riseAPILoader", ["CORE_URL", "gapiClientLoaderGenerator",
  "$location",
  function (CORE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : CORE_URL;
    return gapiClientLoaderGenerator("rise", "v0", baseUrl);
  }
])

.factory("storeAPILoader", ["STORE_ENDPOINT_URL", "gapiClientLoaderGenerator",
  "$location",
  function (STORE_ENDPOINT_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().store_api_base_url ?
      $location.search().store_api_base_url + "/_ah/api" : STORE_ENDPOINT_URL;
    return gapiClientLoaderGenerator("store", "v0.01", baseUrl);
  }
])

.factory("storageAPILoader", ["STORAGE_ENDPOINT_URL",
  "gapiClientLoaderGenerator", "$location",
  function (STORAGE_ENDPOINT_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().storage_api_base_url ?
      $location.search().storage_api_base_url + "/_ah/api" : STORAGE_ENDPOINT_URL;
    return gapiClientLoaderGenerator("storage", "v0.01", baseUrl);
  }
])

.factory("discoveryAPILoader", ["CORE_URL", "gapiClientLoaderGenerator",
  "$location",
  function (CORE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : CORE_URL;
    return gapiClientLoaderGenerator("discovery", "v1", baseUrl);
  }
])

.factory("monitoringAPILoader", ["MONITORING_SERVICE_URL",
  "gapiClientLoaderGenerator", "$location",
  function (MONITORING_SERVICE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : MONITORING_SERVICE_URL;
    return gapiClientLoaderGenerator("monitoring", "v0", baseUrl);
  }
]);
