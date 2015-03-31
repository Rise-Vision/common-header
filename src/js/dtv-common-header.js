angular.module("risevision.common.header", [
  "risevision.common.userstate",
  "risevision.common.account",
  "risevision.common.gapi",
  "risevision.core.cache",
  "risevision.core.company",
  "risevision.common.company",
  "risevision.common.localstorage",
  "risevision.common.header.templates",
  "risevision.common.loading",
  "risevision.ui-flow",
  "risevision.common.systemmessages", "risevision.core.systemmessages",
  "risevision.core.countries",
  "risevision.core.oauth2",
  "risevision.common.geodata",
  "risevision.store.data-gadgets",
  "risevision.common.util",
  "risevision.core.userprofile",
  "risevision.common.registration",
  "risevision.common.shoppingcart",
  "checklist-model",
  "ui.bootstrap", "ngSanitize", "rvScrollEvent", "ngCsv", "ngTouch",
  "risevision.common.components.last-modified",
  "risevision.common.components.countries",
  "risevision.common.svg"
])

.factory("bindToScopeWithWatch", [function () {
  return function (fnToWatch, scopeVar, scope) {
    scope.$watch(function () { return fnToWatch.call(); },
    function (val) { scope[scopeVar] = val; });
  };
}])

.directive("commonHeader",
  ["$modal", "$rootScope", "$q", "$loading",
   "$interval", "oauth2APILoader", "$log",
    "$templateCache", "userState", "$location", "bindToScopeWithWatch",
    "$document",
  function($modal, $rootScope, $q, $loading, $interval,
    oauth2APILoader, $log, $templateCache, userState, $location,
    bindToScopeWithWatch, $document) {
    return {
      restrict: "E",
      template: $templateCache.get("common-header.html"),
      scope: false,
      link: function($scope, element, attr) {
        $scope.navCollapsed = true;
        $scope.inRVAFrame = userState.inRVAFrame();

        // If nav options not provided use defaults
        if (!$scope[attr.navOptions]) {
          $scope.navOptions = [{
            title: "Home",
            link: "#/"
          }, {
            title: "Store",
            link: ""
          }, {
            title: "Account",
            link: ""
          }, {
            title: "Sellers",
            link: ""
          }, {
            title: "Platform",
            link: "http://rva.risevision.com/",
            target: "_blank"
          }];
        }

        //default to true
        $scope.hideShoppingCart = attr.hideShoppingCart !== "0" && 
          attr.hideShoppingCart !== "false";
        $scope.hideHelpMenu = attr.hideHelpMenu !== "0" && 
          attr.hideHelpMenu !== "false";
          
        // used by userState; determines if the URL root is used for
        // Authentication redirect
        $rootScope.redirectToRoot = attr.redirectToRoot !== "0" && 
          attr.redirectToRoot !== "false";
        
        // disable opening home page in new tab (default true)
        $rootScope.newTabHome = attr.newTabHome !== "0" && 
          attr.newTabHome !== "false";

        bindToScopeWithWatch(userState.isRiseVisionUser, "isRiseVisionUser", $scope);

        $rootScope.$on("$stateChangeSuccess", function() {
          if ($scope.inRVAFrame) {
            $location.search("inRVA", $scope.inRVAFrame);
          }
        });

        //insert meta tag to page to prevent zooming in in mobile mode
        var viewPortTag = $document[0].createElement("meta");
        viewPortTag.id="viewport";
        viewPortTag.name = "viewport";
        viewPortTag.content = "width=device-width, initial-scale=1, user-scalable=no";
        $document[0].getElementsByTagName("head")[0].appendChild(viewPortTag);
      }
    };
  }
])
.run(["$rootScope", "userState", "selectedCompanyUrlHandler",
  function ($rootScope, userState, selectedCompanyUrlHandler) {
    $rootScope.$watch(function () {return userState.getSelectedCompanyId(); },
    function (newCompanyId) {
      if(newCompanyId) {
        selectedCompanyUrlHandler.updateUrl();
      }
    });

    //detect selectCompany changes on route UI
    $rootScope.$on("$stateChangeSuccess", selectedCompanyUrlHandler.updateSelectedCompanyFromUrl);
    $rootScope.$on("$routeChangeSuccess", selectedCompanyUrlHandler.updateSelectedCompanyFromUrl);
  }
])

.directive("ngEnter", function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});
