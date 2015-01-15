angular.module("risevision.common.header")
.controller("companySelectorCtr", ["$scope", "$modalInstance",
    "companyService", "companyId", "BaseList", "$loading",
    function ($scope, $modalInstance, companyService,
      companyId, BaseList, $loading) {

    var DB_MAX_COUNT = 20; //number of records to load at a time

    $scope.companies = new BaseList(DB_MAX_COUNT);
    $scope.search = {
        searchString: ""
    };

    $scope.$watch("loading", function (loading) {
      if(loading) {
        $loading.start("company-selector-modal");
        $loading.start("company-selector-modal-list"); }
      else { $loading.stop("company-selector-modal");
      $loading.stop("company-selector-modal-list"); }
    });

    $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
    };

    function loadCompanies() {
      if (!$scope.companies.endOfList) {
        $scope.loading = true;
        companyService.getCompanies(
          companyId, $scope.search.searchString,
          $scope.companies.cursor, DB_MAX_COUNT, null).then(function (result) {
          if (result && result.items) {
            $scope.companies.add(result.items, result.cursor);
          }
        }).finally(function () {
          $scope.loading = false;
        });
      }
    }

    if ($scope.companies.list.length === 0) {
      loadCompanies();
    }

    $scope.doSearch = function () {
      $scope.companies.clear();
      loadCompanies();
    };

    $scope.setCompany = function (company) {
      $modalInstance.close(company.id);
    };

    $scope.handleScroll = function (event, isEndEvent) {
      // $log.debug(event.target.scrollTop + " / " + event.target.scrollHeight + " / " + isEndEvent);
      if (isEndEvent) {
        if ((event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop) < 20) {
          //load more rows if less than 20px left to the bottom
          loadCompanies();
        }
      }
    };

}
]);
