angular.module("risevision.common.header")

.controller("SystemMessagesButtonCtrl", [
  "$scope", "userState", "$log", "$sce", "getCoreSystemMessages", "systemMessages",
  function($scope, userState, $log, $sce, getCoreSystemMessages,
    systemMessages) {

    $scope.$watch(function () {return userState.isRiseVisionUser();},
      function (isRvUser) { $scope.isRiseVisionUser = isRvUser; });

    $scope.$watch(function () {return systemMessages;},
      function (sm) { 
        $scope.messages = sm.length ? sm.slice(0) : [];
    });

    $scope.renderHtml = function(html_code)
    { return $sce.trustAsHtml(html_code); };

    $scope.$watch(
      function () { return userState.getSelectedCompanyId(); },
      function (newCompanyId) {
        if(newCompanyId !== null) {
          systemMessages.clear();
          getCoreSystemMessages(newCompanyId).then(systemMessages.addMessages);
        }
        else {
          systemMessages.clear();
        }
    });

  }
]);
