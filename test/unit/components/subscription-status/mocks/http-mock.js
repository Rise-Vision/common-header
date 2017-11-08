(function () {
  "use strict";

  angular.module("risevision.common.components.subscription-status.service")
    // $http service mock responds to subscription-status service requests
    .service("$http", ["$q", function ($q) {
      this.get = function(url) {
        var deferred = $q.defer();

        var response = {
          "data": [{
            "pc":"1",
            "status":"",
            "expiry":null
          }]
        };

        console.log(url);

        if (url && url.indexOf("/product/status?") !== -1) {
          if (url.indexOf("/company/invalid/") !== -1) {
            response.data[0].status = "";
          }
          else if (url.indexOf("pc=2") !== -1) {
            response.data[0].status = "Trial Expired";
          }
          else if (url.indexOf("pc=3") !== -1) {
            response.data[0].status = "Cancelled";
          }    
          else {
            response.data[0].status = "Free";
          }      
        }
        else if (url && url.indexOf("widget/auth?") !== -1) {
          response = {
            data: {
              authorized: false
            }
          };
          if (url.indexOf("pc=3") !== -1) {
            response.data.authorized = true;
          }
        }

        deferred.resolve(response);

        return deferred.promise;
      };
    }]);

  try {
    angular.module("pascalprecht.translate");
  }
  catch(err) {
    angular.module("pascalprecht.translate", []);
  }

  angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader", [
    "$q",
    function ($q) {
      return function() {
        var deferred = $q.defer();

        deferred.resolve("{}");

        return deferred.promise;
      };
    }
  ]);

}());
