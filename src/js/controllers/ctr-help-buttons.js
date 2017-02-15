angular.module("risevision.common.header")

.controller("HelpDropdownButtonCtrl", ["zendesk", "$scope", "supportFactory",
  "userState",
  function (zendesk, $scope, supportFactory, userState) {

    $scope.$watch(function () {
        return userState.isLoggedIn();
      },
      function (loggedIn) {
        $scope.isLoggedIn = loggedIn;

        supportFactory.getSubscriptionStatus().then(function (
          subscriptionStatus) {
          if (subscriptionStatus && subscriptionStatus.statusCode ===
            "subscribed") {
            $scope.prioritySupport = true;
          } else {
            $scope.prioritySupport = false;
          }
        });

        if (loggedIn) {
          zendesk.ensureScript();
        }
      });

    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (riseVisionUser) {
        $scope.isRiseVisionUser = riseVisionUser;

      });

    $scope.openSendUsANote = function () {
      supportFactory.handleSendUsANote();
    };

    $scope.openZendeskForm = function () {
      zendesk.showWidget();
    };
  }
]);
