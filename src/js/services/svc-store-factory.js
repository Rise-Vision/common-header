"use strict";

angular.module("risevision.store.services")
  .factory("storeFactory", ["$log", "$window", "storeService",
    function ($log, $window, storeService) {
      var factory = {};

      var _clearMessages = function () {
        factory.errorMessage = "";
        factory.apiError = "";
      };

      var _init = function () {
        _clearMessages();
      };

      _init();

      factory.openPortal = function (companyId) {
        _init();

        storeService.openPortal(companyId, $window.location.href)
          .then(function (result) {
            $log.info(result);

            if (result.result && result.result.length > 0) {
              $window.open(result.result, "_blank");
            }
          });
      };

      return factory;
    }
  ]);
