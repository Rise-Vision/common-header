/* jshint maxlen: false */

(function (angular) {
  "use strict";

  angular.module("risevision.common.support")

  .service("zendesk", ["$window",
    function ($window) {

      var $ = $window.$;


      _changeBorderStyle();

      function _changeBorderStyle() {
        $("iframe[class^=zEWidget]").contents().find(".Container")
          .css("border", "1px solid #4ab767");
      }


    }
  ]).run(["$rootScope", "zendesk",
    function ($rootScope, zendesk) {
      $rootScope.$on("$stateChangeSuccess", function () {
        zendesk.forceCloseAll();
      });
    }
  ]);
})(angular);
