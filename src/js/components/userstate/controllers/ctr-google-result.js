"use strict";

/*jshint camelcase: false */

angular.module("risevision.common.components.userstate")
  .controller("GoogleResultCtrl", ["$log", "$stateParams", "userState",
    "urlStateService",
    function ($log, $stateParams, userState, urlStateService) {
      $log.debug("URL params", $stateParams);

      if ($stateParams.access_token) {
        userState._setUserToken($stateParams);

        urlStateService.redirectToState($stateParams.state);
      }
    }
  ]);
