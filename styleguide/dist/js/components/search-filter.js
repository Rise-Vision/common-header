"use strict";

angular.module("risevision.common.components.search-filter", [])
  .directive("searchFilter", ["$timeout",
    function ($timeout) {

      return {
        restrict: "E",
        scope: {
          filterConfig: "=",
          search: "=",
          doSearch: "="
        },
        templateUrl: "search-filter/search-filter.html",
        link: function ($scope) {
          $scope.delay = (function () {
            var promise = null;
            return function (callback, ms) {
              $timeout.cancel(promise); //clearTimeout(timer);
              promise = $timeout(callback, ms); //timer = setTimeout(callback, ms);
            };
          })();

          $scope.reset = function () {
            if ($scope.search.query) {
              $scope.search.query = "";
              $scope.doSearch();
            }
          };

        } //link()
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.search-filter');
} catch (e) {
  module = angular.module('risevision.common.components.search-filter', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('search-filter/search-filter.html',
    '<div class="input-group"><span class="input-group-addon" ng-click="doSearch()"><i class="fa fa-search"></i></span> <input id="{{ filterConfig.id }}" type="text" class="form-control" placeholder="{{ filterConfig.placeholder }}" ng-model="search.query" ng-enter="delay(doSearch, 0)" ng-change="delay(doSearch, 1000)"> <span class="input-group-addon" ng-click="reset()"><i class="fa fa-times"></i></span></div>');
}]);
})();
