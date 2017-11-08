(function (angular) {
  "use strict";

  angular.module("risevision.core.systemmessages", ["risevision.common.gapi"])

  .factory("getCoreSystemMessages", ["gapiLoader", "$q", "$log",
    function (gapiLoader, $q, $log) {
      return function (companyId) {
        var deferred = $q.defer();
        gapiLoader().then(function (gApi) {
          var request = gApi.client.core.systemmessage.list({
            "companyId": companyId
          });
          request.execute(function (resp) {
            var items = resp;
            if (!(items instanceof Array) && items.items) {
              items = items.items;
            }
            $log.debug("getCoreSystemMessage resp", items);
            deferred.resolve(items);
          });
        });
        return deferred.promise;
      };
    }
  ]);

})(angular);
