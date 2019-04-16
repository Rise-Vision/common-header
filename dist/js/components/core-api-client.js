/**
 * Created by rodrigopavezi on 10/16/14.
 */
"use strict";

angular.module("risevision.common.apis", [
  "risevision.common.gapi"
])
  .factory("listApis", ["$q", "discoveryAPILoader", "$log",
    function ($q, discoveryAPILoader, $log) {
      return function (name, preferred) {
        $log.debug("listApis called", name, preferred);

        var deferred = $q.defer();

        discoveryAPILoader().then(function (discoveryAPI) {
          var criteria = {};
          if (name) {
            criteria.name = name;
          }
          if (preferred) {
            criteria.preferred = preferred;
          }

          var request = discoveryAPI.apis.list(criteria);
          request.execute(function (resp) {
            $log.debug("listApis resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });

        });
        return deferred.promise;
      };
    }
  ])
  .factory("getRest", ["$q", "discoveryAPILoader", "$log",
    function ($q, discoveryAPILoader, $log) {
      return function (api, version) {
        $log.debug("getRest called", api, version);

        var deferred = $q.defer();
        discoveryAPILoader().then(function (discoveryAPI) {
          var criteria = {};
          if (api) {
            criteria.api = api;
          }
          if (version) {
            criteria.version = version;
          }
          var request = discoveryAPI.apis.getRest(criteria);
          request.execute(function (resp) {
            $log.debug("getRest resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);

/**
 * Created by rodrigopavezi on 10/16/14.
 */
"use strict";

angular.module("risevision.common.app", [
  "risevision.common.gapi",
  "risevision.core.util"

])
  .constant("APP_WRITABLE_FIELDS", [
    "name", "description", "clientId", "url"
  ])
  .factory("listApps", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function (companyId) {
        $log.debug("listApps called", companyId);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var criteria = {};
          if (companyId) {
            criteria.companyId = companyId;
          }

          var request = riseApi.app.list(criteria);
          request.execute(function (resp) {
            $log.debug("listApps resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });

        });
        return deferred.promise;
      };
    }
  ])
  .factory("getApp", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function (id) {
        $log.debug("getApp called", id);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }

          var request = riseApi.app.get(criteria);
          request.execute(function (resp) {
            $log.debug("getApp resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])
  .factory("createApp", ["$q", "riseAPILoader", "$log", "pick",
    "APP_WRITABLE_FIELDS",
    function ($q, riseAPILoader, $log, pick, APP_WRITABLE_FIELDS) {
      return function (companyId, userId, app) {
        $log.debug("createApp called", companyId, userId, app);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var fields = pick.apply(this, [app].concat(APP_WRITABLE_FIELDS));
          var request = riseApi.app.add({
            companyId: companyId,
            userId: userId,
            data: JSON.stringify(fields)
          });

          request.execute(function (resp) {
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          }, deferred.reject);
        });
        return deferred.promise;
      };
    }
  ])
  .factory("updateApp", ["$q", "riseAPILoader", "$log", "pick",
    "APP_WRITABLE_FIELDS",
    function ($q, riseAPILoader, $log, pick, APP_WRITABLE_FIELDS) {
      return function (id, app) {
        $log.debug("updateApp called", id, app);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var fields = pick.apply(this, [app].concat(APP_WRITABLE_FIELDS));
          var request = riseApi.app.update({
            id: id,
            data: JSON.stringify(fields)
          });

          request.execute(function (resp) {
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          }, deferred.reject);
        });
        return deferred.promise;
      };
    }
  ])
  .factory("deleteApp", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function (id) {
        $log.debug("deleteApp called", id);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }
          var request = riseApi.app.delete(criteria);
          request.execute(function (resp) {
            $log.debug("deleteApp resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);

(function (angular) {
  "use strict";

  angular.module("risevision.core.cache", [])

  .factory("userInfoCache", ["$cacheFactory",
    function ($cacheFactory) {
      return $cacheFactory("user-info-cache");
    }
  ]);

})(angular);

/* jshint evil:true */
/* jshint unused:false */

/**
 * Created by rodrigopavezi on 10/16/14.
 */
"use strict";
angular.module("risevision.common.core.endpoint", [
  "risevision.common.gapi"
])
  .factory("callEndpoint", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (method, criteria) {
        $log.debug("Endpoint called", method, criteria);

        var deferred = $q.defer();
        coreAPILoader().then(function (core) {
          // Note: This assumes method contains 'core.'
          var request = eval(method)(criteria);
          request.execute(function (resp) {
            $log.debug("Endpoint resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);

(function (angular) {
  "use strict";

  angular.module("risevision.core.company", [
    "risevision.common.gapi",
    "risevision.core.cache",
    "risevision.core.util"
  ])

  .constant("COMPANY_WRITABLE_FIELDS", [
    "name", "street", "unit", "city", "province", "country",
    "postalCode", "timeZoneOffset", "telephone", "fax", "companyStatus",
    "mailSyncEnabled", "sellerId", "isTest", "shipToUseCompanyAddress",
    "shipToName", "shipToStreet", "shipToUnit", "shipToCity",
    "shipToProvince", "shipToPostalCode", "shipToCountry", "website",
    "companySize", "companyIndustry", "billingContactEmails", "shareCompanyPlan"
  ])

  .constant("ALERTS_WRITABLE_FIELDS", [
    "alertSettings"
  ])

  .constant("COMPANY_SEARCH_FIELDS", [
    "name", "id", "street", "unit", "city", "province", "country",
    "postalCode", "telephone", "fax",
    "shipToName", "shipToStreet", "shipToCity", "shipToPostalCode"
  ])

  // New service format:
  .factory("company", ["$q", "$log", "coreAPILoader", "pick",
    "ALERTS_WRITABLE_FIELDS",
    function ($q, $log, coreAPILoader, pick, ALERTS_WRITABLE_FIELDS) {
      var service = {
        updateAlerts: function (companyId, company) {
          var deferred = $q.defer();
          var fields = pick.apply(this, [company].concat(
            ALERTS_WRITABLE_FIELDS));
          var obj = {
            "id": companyId,
            "data": fields
          };
          $log.debug("updateAlerts called", companyId, fields);

          coreAPILoader().then(function (coreApi) {
            return coreApi.company.patch(obj);
          })
            .then(function (resp) {
              $log.debug("update Alerts resp", resp);
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              $log.error("Failed to update Alerts.", e);
              deferred.reject(e);
            });

          return deferred.promise;
        }
      };

      return service;
    }
  ])

  // Old services:
  .factory("createCompany", ["$q", "coreAPILoader", "COMPANY_WRITABLE_FIELDS",
    "pick",
    function ($q, coreAPILoader, COMPANY_WRITABLE_FIELDS, pick) {
      return function (parentCompanyId, company) {
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var fields = pick.apply(this, [company].concat(
            COMPANY_WRITABLE_FIELDS));
          var request = coreApi.company.add({
            parentId: parentCompanyId,
            data: fields
          });
          request.execute(function (resp) {
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          }, deferred.reject);
        });
        return deferred.promise;
      };
    }
  ])

  .factory("getCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (id) { //get a company either by id or authKey
        $log.debug("getCompany called", id);

        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }
          var request = coreApi.company.get(criteria);
          request.execute(function (resp) {
            $log.debug("getCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("lookupCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (authKey) { //get a company either by id or authKey
        $log.debug("lookupCompany called", authKey);

        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.lookup({
            authKey: authKey
          });
          request.execute(function (resp) {
            $log.debug("lookupCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("moveCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (authKey, newParentId) { //get a company either by id or authKey
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.move({
            authKey: authKey,
            newParentId: newParentId
          });
          request.execute(function (resp) {
            $log.debug("moveCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("updateCompany", ["$q", "$log", "coreAPILoader", "pick",
    "COMPANY_WRITABLE_FIELDS",
    function ($q, $log, coreAPILoader, pick, COMPANY_WRITABLE_FIELDS) {
      return function (companyId, fields) {
        var deferred = $q.defer();
        fields = pick.apply(this, [fields].concat(COMPANY_WRITABLE_FIELDS));
        $log.debug("updateCompany called", companyId, fields);
        // fields.validate = validationRequired || false;
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.patch({
            id: companyId,
            data: fields
          });
          request.execute(function (resp) {
            $log.debug("updateCompany resp", resp);
            if (resp.result && resp.result.item) {
              deferred.resolve(resp.result.item);
            } else {
              deferred.reject(resp);
            }
          });
        });

        return deferred.promise;
      };
    }
  ])

  .factory("regenerateCompanyField", ["$q", "$log", "coreAPILoader",
    function ($q, $log, coreAPILoader) {
      return function (companyId, fieldName) {
        var deferred = $q.defer();
        $log.debug("regenerateField called", companyId, fieldName);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.regenerateField({
            "id": companyId,
            "fieldName": fieldName
          });
          request.execute(
            function (resp) {
              $log.debug("regenerateField resp", resp);
              if (!resp.error) {
                deferred.resolve(resp);
              } else {
                deferred.reject(resp.message);
              }
            },
            function (resp) {
              deferred.reject("call failed " + resp);
            }
          );
        });

        return deferred.promise;
      };
    }
  ])

  .factory("deleteCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (id) { //get a company either by id or authKey
        $log.debug("deleteCompany called", id);

        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }
          var request = coreApi.company.delete(criteria);
          request.execute(function (resp) {
            $log.debug("deleteCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .service("companyService", ["coreAPILoader", "$q", "$log", "getCompany",
    "COMPANY_SEARCH_FIELDS",
    function (coreAPILoader, $q, $log, getCompany, COMPANY_SEARCH_FIELDS) {

      var createSearchQuery = function (fields, search) {
        var query = "";

        for (var i = 0; i < fields.length; i++) {
          query += "OR " + fields[i] + ":~\'" + search + "\' ";
        }

        query = query ? query.substring(3) : "";

        return query.trim();
      };

      this.getCompanies = function (search, cursor) {
        var deferred = $q.defer();

        var query = search.query ? createSearchQuery(COMPANY_SEARCH_FIELDS,
          search.query) : "";

        var obj = {
          "companyId": search.companyId,
          "search": query,
          "cursor": cursor,
          "count": search.count,
          "sort": search.sortBy + (search.reverse ? " desc" : " asc")
        };

        $log.debug("getCompanies called with", obj);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.list(obj);
          request.execute(function (resp) {
            $log.debug("getCompanies resp", resp);
            deferred.resolve(resp);
          });
        });
        return deferred.promise;
      };

      this.loadSelectedCompany = function (selectedCompanyId, userCompany) {
        //this funtion assumes user and user.company are loaded
        var deferred = $q.defer();
        if (selectedCompanyId && selectedCompanyId !== userCompany.id) {
          getCompany(selectedCompanyId).then(function (res) {
            if (res.code === 0 && res.item) {
              deferred.resolve(res.item);
            } else {
              deferred.resolve(userCompany);
            }
          });
        } else {
          deferred.resolve(userCompany);
        }
        return deferred.promise;
      };

    }
  ])

  .factory("enableCompanyProduct", ["$q", "$log", "coreAPILoader",
    function ($q, $log, coreAPILoader) {
      return function (companyId, productCode, displayStatusMap) {
        var deferred = $q.defer();

        $log.debug("enableCompanyProduct called", companyId, productCode, displayStatusMap);

        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.enableProduct({
            id: companyId,
            productCode: productCode,
            data: displayStatusMap
          });
          request.execute(function (resp) {
            $log.debug("enableCompanyProduct resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject(resp);
            }
          });
        });

        return deferred.promise;
      };
    }
  ])

  .filter("fullAddress", function () {
    return function (company) {
      var res = (company.street ? company.street + ", " : "") +
        (company.city ? company.city + ", " : "") +
        (company.province ? company.province + ", " : "") +
        (company.country ? company.country + ", " : "") +
        (company.postalCode ? company.postalCode + ", " : "");
      if (res) {
        res = res.substr(0, res.length - 2);
      }
      return res;
    };
  });

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.util", [])

  .factory("pick", function () {
    var ArrayProto = Array.prototype;
    var
      slice = ArrayProto.slice,
      concat = ArrayProto.concat;
    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    var createCallback = function (func, context, argCount) {
      if (context === void 0) {
        return func;
      }
      switch (argCount === null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      case 2:
        return function (value, other) {
          return func.call(context, value, other);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index,
            collection);
        };
      }
      return function () {
        return func.apply(context, arguments);
      };
    };

    return function (obj, iteratee, context) {
      var result = {},
        key;
      if (obj === null) {
        return result;
      }
      if (angular.isFunction(iteratee)) {
        iteratee = createCallback(iteratee, context);
        for (key in obj) {
          var value = obj[key];
          if (iteratee(value, key, obj)) {
            result[key] = value;
          }
        }
      } else {
        var keys = concat.apply([], slice.call(arguments, 1));
        obj = new Object(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
          key = keys[i];
          if (key in obj) {
            result[key] = obj[key];
          }
        }
      }
      return result;
    };
  });

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.countries", ["risevision.common.gapi"])

  .factory("getCoreCountries", ["coreAPILoader", "$q", "$log", "$filter",
    function (coreAPILoader, $q, $log, $filter) {
      var deferred;
      return function () {
        if (deferred) {
          return deferred.promise;
        } else {
          deferred = $q.defer();
        }

        coreAPILoader().then(function (coreApi) {
          return coreApi.country.list();
        })
          .then(function (resp) {
            var items = resp.result ? resp.result.items : [];
            if (items instanceof Array) {
              items = $filter("orderBy")(items, "name");
            }

            deferred.resolve(items);
          })
          .then(null, function (e) {
            $log.debug("getCoreCountries failed", e);
            deferred.reject(e);

            deferred = null;
          });
        return deferred.promise;
      };
    }
  ])
    .factory("COUNTRIES", ["getCoreCountries",
      function (getCoreCountries) {
        var countries = [];

        getCoreCountries().then(function (result) {
          Array.prototype.push.apply(countries, result);
        });

        return countries;
      }
    ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.display", [
    "risevision.common.gapi",
    "risevision.core.cache",
    "risevision.core.util"
  ])

  .service("displayService", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      this.list = function (companyId, search, cursor, count, sort) {
        var deferred = $q.defer();
        var obj = {
          "companyId": companyId,
          "search": search,
          "cursor": cursor,
          "count": count,
          "sort": sort
        };
        $log.debug("list displays called with", obj);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.display.list(obj);
          request.execute(function (resp) {
            $log.debug("list displays resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);
})(angular);

"use strict";

angular.module("risevision.common.fastpass", [])
  .factory("loadFastpass", ["$q", "$http", "$document", "$timeout", "GSFP_URL",
    "$log",
    function ($q, $http, $document, $timeout, GSFP_URL, $log) {

      var loadScript = function (src) {
        var deferred = $q.defer();
        var script = $document[0].createElement("script");
        script.onload = script.onreadystatechange = function (e) {
          deferred.resolve(e);
        };
        script.onerror = function (e) {
          deferred.reject(e);
        };
        script.src = src;
        if ($document && $document[0]) {
          $document[0].body.appendChild(script);
        }
        return deferred.promise;
      };

      return function (username, email) {
        var deferred = $q.defer();
        $log.debug("loadFastpass called", username, email);
        var rejected = function (rej) {
          $log.error("loadFastpass rejected", rej);
          deferred.reject("loadFastpass rejected " + rej);
        };

        $http.get(GSFP_URL +
          "/geturl?userEmail=" + email +
          "&userName=" + username).then(function (res) {
          loadScript(res.data).then(function (result) {
            $log.debug("loadFastpass result", result);
            deferred.resolve(true);
          }, rejected).catch(rejected);
        }, deferred.reject);

        return deferred.promise;
      };

    }
  ]);

/**
 * Created by rodrigopavezi on 30/01/15.
 */
"use strict";

angular.module("risevision.common.monitoring.activity", [
  "risevision.common.gapi"
])
  .factory("getActivity", ["$q", "monitoringAPILoader", "$log",
    function ($q, monitoringAPILoader, $log) {
      return function (clientId, api) {
        $log.debug("getActivity called", clientId, api);

        var deferred = $q.defer();
        monitoringAPILoader().then(function (monitoringApi) {
          var criteria = {};
          if (clientId) {
            criteria.clientId = clientId;
          }
          if (api) {
            criteria.api = api;
          }

          var request = monitoringApi.activity.get(criteria);
          request.execute(function (resp) {
            $log.debug("getActivity resp", resp);
            if (resp.result) {
              deferred.resolve(resp.result);
            } else {
              deferred.reject(resp);
            }
          });
        }, function (errorResult) {
          $log.debug("Error: " + errorResult);
          deferred.reject(errorResult);
        });
        return deferred.promise;
      };
    }
  ]);

(function (angular) {
  "use strict";

  angular.module("risevision.core.oauth2", ["risevision.common.gapi",
    "risevision.core.cache"
  ]).
  factory("getOAuthUserInfo", ["oauth2APILoader", "$q", "userInfoCache",
    "$log",
    function (oauth2APILoader, $q, userInfoCache, $log) {
      return function () {

        var deferred = $q.defer();
        var resp;
        if ((resp = userInfoCache.get("oauth2UserInfo"))) {
          if (resp.error) {
            deferred.reject(resp.error);
          } else {
            deferred.resolve(resp);
          }
        } else {
          oauth2APILoader().then(function (oauth2) {
            oauth2.userinfo.get().execute(function (resp) {
              $log.debug(
                "getOAuthUserInfo oauth2.userinfo.get() resp", resp);
              if (!resp) {
                userInfoCache.remove("oauth2UserInfo");
                deferred.reject();
              } else if (resp.hasOwnProperty("error")) {
                userInfoCache.remove("oauth2UserInfo");
                deferred.reject(resp.error);
              } else {
                userInfoCache.put("oauth2UserInfo", resp);
                deferred.resolve(resp);
              }
            });
          }, deferred.reject);
        }

        return deferred.promise;
      };
    }
  ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.schedule", [
    "risevision.common.gapi",
    "risevision.core.cache",
    "risevision.core.util"
  ])

  .service("scheduleService", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      //query a given's companys list of display schedules
      this.list = function (companyId, search, cursor, count, sort) {
        var deferred = $q.defer();
        var obj = {
          "companyId": companyId,
          "search": search,
          "cursor": cursor,
          "count": count,
          "sort": sort
        };
        $log.debug("getSchedules called with", obj);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.schedule.list(obj);
          request.execute(function (resp) {
            $log.debug("getSchedules resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);
})(angular);

"use strict";

angular.module("risevision.store.authorization", [
  "risevision.common.gapi"
])
  .factory("storeAuthorization", ["$q", "$log", "$http",
    "STORE_SERVER_URL", "userState",
    function ($q, $log, $http, STORE_SERVER_URL, userState) {
      var factory = {};

      factory.check = function (productCode) {
        var deferred = $q.defer();

        $http({
          url: STORE_SERVER_URL + "/v1/widget/auth",
          method: "GET",
          params: {
            cid: userState.getSelectedCompanyId(),
            pc: productCode,
            startTrial: false
          }
        }).then(function (response) {
          if (response.data.authorized) {
            deferred.resolve(true);
          } else {
            deferred.reject(false);
          }
        }, function (e) {
          $log.error("Failed to check store authorization.", e);
          deferred.reject(e);
        });

        return deferred.promise;
      };

      factory.startTrial = function (productCode) {
        var deferred = $q.defer();
        var companyId = userState.getSelectedCompanyId();
        var startTrialUrl = "/v1/product/" + productCode + "/company/" + companyId + "/trial/start";

        $http.get(STORE_SERVER_URL + startTrialUrl)
          .then(function (response) {
            if (!response.error) {
              deferred.resolve(true);
            } else {
              deferred.reject(response);
            }
          }, function (e) {
            $log.error("Failed to start trial.", e);
            deferred.reject(e);
          });

        return deferred.promise;
      };

      return factory;
    }
  ]);

(function () {
  "use strict";

  angular.module("risevision.common.subscription-status", [
    "risevision.common.gapi"
  ])
    .service("subscriptionStatusService", ["$http", "$q", "storeAPILoader",
      "$log",
      function ($http, $q, storeAPILoader, $log) {
        var responseType = ["On Trial", "Trial Expired", "Subscribed",
          "Suspended", "Cancelled", "Free", "Not Subscribed",
          "Product Not Found", "Company Not Found", "Error"
        ];
        var responseCode = ["on-trial", "trial-expired", "subscribed",
          "suspended", "cancelled", "free", "not-subscribed",
          "product-not-found", "company-not-found", "error"
        ];
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {
          return Math.floor((b.getTime() - a.getTime()) / _MS_PER_DAY);
        }

        this.get = function (productCode, companyId) {
          var deferred = $q.defer();

          var obj = {
            "companyId": companyId,
            "productCodes": productCode
          };

          storeAPILoader().then(function (storeApi) {
            var request = storeApi.product.status(obj);
            request.execute(function (resp) {
              $log.debug("getProductStatus resp", resp);
              if (resp.result) {
                var subscriptionStatus = resp.items[0];

                subscriptionStatus.plural = "";

                var statusIndex = responseType.indexOf(
                  subscriptionStatus.status);

                if (statusIndex >= 0) {
                  subscriptionStatus.statusCode = responseCode[
                    statusIndex];
                }

                if (subscriptionStatus.status === "") {
                  subscriptionStatus.status = "N/A";
                  subscriptionStatus.statusCode = "na";
                  subscriptionStatus.subscribed = false;
                } else if (subscriptionStatus.status === responseType[0] ||
                  subscriptionStatus.status === responseType[2] ||
                  subscriptionStatus.status === responseType[5]) {
                  subscriptionStatus.subscribed = true;
                } else {
                  subscriptionStatus.subscribed = false;
                }

                if (subscriptionStatus.statusCode === "not-subscribed" &&
                  subscriptionStatus.trialPeriod && subscriptionStatus.trialPeriod >
                  0) {
                  subscriptionStatus.statusCode = "trial-available";
                  subscriptionStatus.subscribed = true;
                }

                if (subscriptionStatus.expiry && subscriptionStatus.statusCode ===
                  "on-trial") {
                  subscriptionStatus.expiry = new Date(
                    subscriptionStatus.expiry);

                  if (subscriptionStatus.expiry instanceof Date && !
                    isNaN(subscriptionStatus.expiry.valueOf())) {
                    subscriptionStatus.expiry = dateDiffInDays(new Date(),
                      subscriptionStatus.expiry);
                  }

                  if (subscriptionStatus.expiry === 0) {
                    subscriptionStatus.plural = "-zero";
                  } else if (subscriptionStatus.expiry > 1) {
                    subscriptionStatus.plural = "-many";
                  }
                }

                deferred.resolve(subscriptionStatus);
              } else {
                deferred.reject(resp);
              }
            });
          });

          return deferred.promise;
        };

      }
    ]);
}());

(function (angular) {
  "use strict";

  angular.module("risevision.core.userprofile", [
    "risevision.common.gapi", "risevision.core.oauth2"
  ])

  .value("userRoleMap", {
    "ce": "Content Editor",
    "cp": "Content Publisher",
    "da": "Display Administrator",
    "ua": "System Administrator",
    "pu": "Store Purchaser",
    "sa": "Rise System Administrator",
    "ba": "Rise Store Administrator"
  })

  .constant("USER_WRITABLE_FIELDS", [
    "mailSyncEnabled", "email", "firstName", "lastName", "telephone",
    "roles",
    "status", "companyRole", "dataCollectionDate"
  ])

  .factory("getUserProfile", ["oauth2APILoader", "coreAPILoader", "$q",
    "$log",
    function (oauth2APILoader, coreAPILoader, $q, $log) {
      var _username;
      var _cachedPromises = {};

      return function (username, clearCache) {

        var deferred;

        if (username === _username && !clearCache &&
          _cachedPromises[username] !== null) {
          //avoid calling API if username didn't change
          return _cachedPromises[username].promise;
        } else {
          _username = username;
          _cachedPromises[username] = deferred = $q.defer();
        }

        if (!username) {
          deferred.reject(
            "getUserProfile failed: username param is required.");
          $log.debug("getUserProfile failed: username param is required.");
        } else {

          var criteria = {};
          if (username) {
            criteria.username = username;
          }
          $log.debug("getUserProfile called", criteria);

          $q.all([oauth2APILoader(), coreAPILoader()]).then(function (
            results) {
            var coreApi = results[1];
            // var oauthUserInfo = results[2];
            coreApi.user.get(criteria).execute(function (resp) {
              if (resp.error || !resp.result) {
                deferred.reject(resp);
              } else {
                $log.debug("getUser resp", resp);
                //get user profile
                deferred.resolve(resp.item);
              }
            });
          }, deferred.reject);
        }
        return deferred.promise;
      };
    }
  ])

  .factory("updateUser", ["$q", "coreAPILoader", "$log",
    "getUserProfile", "pick", "USER_WRITABLE_FIELDS",
    function ($q, coreAPILoader, $log, getUserProfile, pick,
      USER_WRITABLE_FIELDS) {
      return function (username, profile) {
        var deferred = $q.defer();
        profile = pick(profile, USER_WRITABLE_FIELDS);
        $log.debug("updateUser called", username, profile);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.user.patch({
            username: username,
            data: profile
          });
          request.execute(function (resp) {
            $log.debug("updateUser resp", resp);
            if (resp.error) {
              deferred.reject(resp);
            } else if (resp.result) {
              getUserProfile(username, true).then(function () {
                deferred.resolve(resp);
              });
            } else {
              deferred.reject("updateUser");
            }
          });
        }, deferred.reject);
        return deferred.promise;
      };
    }
  ])

  .factory("addUser", ["$q", "coreAPILoader", "$log", "pick",
    "getUserProfile",
    function ($q, coreAPILoader, $log, pick, getUserProfile) {
      return function (companyId, username, profile) {
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          profile = pick(profile, "mailSyncEnabled",
            "email", "firstName", "lastName", "telephone", "roles",
            "status");
          var request = coreApi.user.add({
            username: username,
            companyId: companyId,
            data: profile
          });
          request.execute(function (resp) {
            $log.debug("addUser resp", resp);
            if (resp.result) {
              getUserProfile(username, true).then(function () {
                deferred.resolve(resp);
              });
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("deleteUser", ["$q", "coreAPILoader", "$log",
    function ($q, coreAPILoader, $log) {
      return function (username) {
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.user.delete({
            username: username
          });
          request.execute(function (resp) {
            $log.debug("deleteUser resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject("deleteUser");
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("getUsers", ["$q", "coreAPILoader", "$log",
    function ($q, coreAPILoader, $log) {
      return function (search, cursor) {
        var obj = {
          "companyId": search.companyId,
          "search": search.query,
          "cursor": cursor,
          "count": search.count,
          "sort": search.sortBy + (search.reverse ? " desc" : " asc")
        };

        $log.debug("getUsers", obj);
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.user.list(obj);
          request.execute(function (resp) {
            $log.debug("getUsers resp", resp);
            if (resp.result) {
              deferred.resolve(resp.result);
            } else {
              deferred.reject("getUsers");
            }
          });
        }, deferred.reject);
        return deferred.promise;
      };
    }
  ]);

})(angular);
