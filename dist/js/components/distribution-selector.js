"use strict";

angular.module("risevision.common.components.distribution-selector.services", [
  "risevision.common.gapi"
]);

angular.module("risevision.common.components.distribution-selector", [
  "risevision.common.components.distribution-selector.services",
  "risevision.common.components.scrolling-list",
  "risevision.common.components.loading",
  "ui.bootstrap"
]);

"use strict";

/*jshint camelcase: false */

angular.module("risevision.common.components.distribution-selector.services")
  .constant("DISPLAY_SEARCH_FIELDS", [
    "name", "id"
  ])
  .service("displayService", ["$q", "$log", "coreAPILoader", "userState",
    "DISPLAY_SEARCH_FIELDS",
    function ($q, $log, coreAPILoader, userState, DISPLAY_SEARCH_FIELDS) {

      var createSearchQuery = function (fields, search) {
        var query = "";

        for (var i in fields) {
          query += "OR " + fields[i] + ":~\"" + search + "\" ";
        }

        query = query.substring(3);

        //restrict the search result to contain only displays from the selected company
        query = query + " AND companyId=" + userState.getSelectedCompanyId();

        return query.trim();
      };

      var service = {
        list: function (search, cursor) {
          var deferred = $q.defer();

          var query = search.query ?
            createSearchQuery(DISPLAY_SEARCH_FIELDS, search.query) : "";

          var obj = {
            "companyId": userState.getSelectedCompanyId(),
            "search": query,
            "cursor": cursor,
            "count": search.count,
            "sort": search.sortBy + (search.reverse ? " desc" : " asc")
          };
          $log.debug("list displays called with", obj);

          coreAPILoader().then(function (coreApi) {
            return coreApi.display.list(obj);
          })
            .then(function (resp) {
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              console.error("Failed to get list of displays.", e);
              deferred.reject(e);
            });

          return deferred.promise;
        }
      };

      return service;
    }
  ]);

"use strict";

angular.module("risevision.common.components.distribution-selector")
  .directive("distributionSelector", ["$modal",
    function ($modal) {
      return {
        restrict: "E",
        scope: {
          distribution: "=",
          distributeToAll: "=",
          hideCta: "="
        },
        templateUrl: "distribution-selector/distribution-selector.html",
        link: function ($scope) {
          var _getDistributionSelectionMessage = function () {
            var message = "No Displays Selected";

            if ($scope.distribution && $scope.distribution.length > 0) {
              if ($scope.distribution.length === 1) {
                message = "1 Display Selected";
              } else {
                message = $scope.distribution.length + " Displays Selected";
              }
            }
            return message;
          };

          var _refreshDistributionSelectionMessage = function () {
            $scope.distributionSelectionMessage =
              _getDistributionSelectionMessage();
          };

          $scope.$watchGroup(["distribution", "distributeToAll"], function () {
            if (typeof $scope.distributeToAll === "undefined") {
              $scope.distributeToAll = true;
            }

            if (!$scope.distributeToAll) {
              _refreshDistributionSelectionMessage();
            }
          });

          $scope.manage = function () {

            var modalInstance = $modal.open({
              templateUrl: "distribution-selector/distribution-modal.html",
              controller: "selectDistributionModal",
              size: "lg",
              resolve: {
                distribution: function () {
                  return $scope.distribution;
                }
              }
            });

            modalInstance.result.then(function (distribution) {
              $scope.distribution = distribution;
            });
          };
        } //link()
      };
    }
  ]);

"use strict";
angular.module("risevision.common.components.distribution-selector")
  .controller("distributionListController", ["$scope", "$rootScope",
    "displayService", "$loading", "BaseList",
    function ($scope, $rootScope, displayService, $loading, BaseList) {
      var DB_MAX_COUNT = 40; //number of records to load at a time

      $scope.displays = new BaseList(DB_MAX_COUNT);
      $scope.search = {
        sortBy: "name",
        count: DB_MAX_COUNT,
        reverse: false
      };

      $scope.filterConfig = {
        placeholder: "Search Displays",
        id: "displaySearchInput"
      };

      $scope.$on("displayCreated", function () {
        $scope.displays.clear();

        $scope.load();
      });

      $scope.$watch("loadingDisplays", function (loading) {
        if (loading) {
          $loading.start("display-list-loader");
        } else {
          $loading.stop("display-list-loader");
        }
      });

      $scope.load = function () {
        if (!$scope.displays.list.length || !$scope.displays.endOfList &&
          $scope.displays.cursor) {
          $scope.loadingDisplays = true;

          displayService.list($scope.search, $scope.displays.cursor)
            .then(function (result) {
              $scope.displays.add(result.items ? result.items : [],
                result.cursor);
            })
            .then(null, function () {
              $scope.error =
                "Failed to load displays. Please try again later.";
            })
            .finally(function () {
              $scope.loadingDisplays = false;
            });
        }
      };

      $scope.load();

      $scope.sortBy = function (cat) {
        $scope.displays.clear();

        if (cat !== $scope.search.sortBy) {
          $scope.search.sortBy = cat;
        } else {
          $scope.search.reverse = !$scope.search.reverse;
        }

        $scope.load();
      };

      $scope.doSearch = function () {
        $scope.displays.clear();

        $scope.load();
      };

      $scope.toggleDisplay = function (displayId) {
        var index = $scope.parameters.distribution.indexOf(displayId);
        if (index > -1) {
          $scope.parameters.distribution.splice(index, 1);
        } else {
          $scope.parameters.distribution.push(displayId);
        }
      };

      $scope.addDisplay = function () {
        $rootScope.$broadcast("distributionSelector.addDisplay");
      };

      $scope.isSelected = function (displayId) {
        var index = $scope.parameters.distribution.indexOf(displayId);
        if (index > -1) {
          return true;
        }

        return false;
      };

    }
  ]);

"use strict";

angular.module("risevision.common.components.distribution-selector")
  .controller("selectDistributionModal", ["$scope", "$modalInstance",
    "distribution",
    function ($scope, $modalInstance, distribution) {
      $scope.parameters = {};

      $scope.parameters.distribution = (distribution) ? angular.copy(
        distribution) : [];

      $scope.apply = function () {
        console.debug("Selected Distribution: ", $scope.parameters.distribution);
        $modalInstance.close($scope.parameters.distribution);
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.distribution-selector');
} catch (e) {
  module = angular.module('risevision.common.components.distribution-selector', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('distribution-selector/distribution-list.html',
    '<div ng-controller="distributionListController"><search-filter filter-config="filterConfig" search="search" do-search="doSearch"></search-filter><div class="panel u_margin-sm-top"><div class="scrollable-list" scrolling-list="load()" rv-spinner="" rv-spinner-key="display-list-loader" rv-spinner-start-active="1"><div class="text-center u_margin-lg-top" ng-if="!loadingDisplays && displays.list.length === 0"><h4 class="text-muted u_margin-md-bottom u_margin-md-top">No Displays Available</h4><button ng-click="addDisplay()" class="btn btn-primary btn-lg">Add Display <i class="fa fa-plus icon-right"></i></button></div><table id="displayListTable" class="table table--hover table--selector table--multiple-selector animated fadeIn" ng-if="displays.list.length > 0"><thead class="table-header"><tr class="table-header__row"><th id="tableHeaderName" ng-click="sortBy(\'name\')" class="table-header__cell u_clickable">Name<i ng-if="search.sortBy == \'name\'" class="fa" ng-class="{false: \'fa-long-arrow-up\', true: \'fa-long-arrow-down\'}[search.reverse]"></i></th><th id="tableHeaderDisplayId" class="table-header__cell hidden-xs">Display ID</th><th id="tableHeaderAddress" class="table-header__cell hidden-xs">Address</th></tr></thead><tbody class="table-body"><tr class="table-body__row u_clickable display" ng-click="toggleDisplay(display.id);" ng-class="{\'active\' : isSelected(display.id) }" ng-repeat="display in displays.list"><td id="displayName-{{display.id}}" class="table-body__cell display-name"><span>{{display.name}}</span></td><td id="displayId-{{display.id}}" class="table-body__cell hidden-xs"><span>{{display.id}}</span></td><td id="displayAddress-{{display.id}}" class="table-body__cell display-address hidden-xs"><span class="text-muted u_ellipsis-md">{{display.address}}</span></td></tr></tbody></table></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.distribution-selector');
} catch (e) {
  module = angular.module('risevision.common.components.distribution-selector', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('distribution-selector/distribution-modal.html',
    '<div id="distributionModal"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title">Edit Distribution</h3></div><div class="modal-body" stop-event="touchend" ng-include="" src="\'distribution-selector/distribution-list.html\'"></div><div class="modal-footer"><button id="applyButton" class="btn-primary btn" ng-click="apply()">Apply <i class="fa fa-check icon-right"></i></button> <button id="distributionModalCancelButton" class="btn btn-default" ng-click="dismiss()">Cancel <i class="fa fa-times icon-right"></i></button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.distribution-selector');
} catch (e) {
  module = angular.module('risevision.common.components.distribution-selector', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('distribution-selector/distribution-selector.html',
    '<div class="form-group"><label class="control-label u_margin-right">Distribution</label> <label class="control-label control-label-secondary"><input type="checkbox" ng-model="distributeToAll" ng-checked="distributeToAll" class="ng-valid ng-dirty" checked="checked"> <span id="distributeToAllText">Select All Displays</span></label><div id="distributionField" ng-class="{\'input-group\': !hideCta}" class="panel-editable u_clickable" ng-click="manage()" ng-if="!distributeToAll"><div class="label label-tag"><span id="distributionFieldText" ng-bind="distributionSelectionMessage"></span></div><span ng-hide="hideCta" class="input-group-addon btn btn-primary">Select Display(s)</span></div></div>');
}]);
})();
