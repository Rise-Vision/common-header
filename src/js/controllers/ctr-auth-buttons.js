angular.module("risevision.common.header")
.controller("AuthButtonsCtr", ["$scope", "$modal", "$templateCache",
  "userState", "$loading", "cookieStore",
  "$log", "uiStatusManager",
  function($scope, $modal, $templateCache, userState,
  $loading, cookieStore, $log, uiStatusManager) {

    $scope.spinnerOptions = {color: "#999", hwaccel: true, radius: 10};


    $scope.register = function (size) {
      cookieStore.remove("surpressRegistration");
      var modalInstance = $modal.open({
        template: $templateCache.get("registration-modal.html"),
        controller: "RegistrationModalCtrl",
        size: size,
        backdrop: "static"
      });
      modalInstance.result.finally(function (){
        uiStatusManager.invalidateStatus();
      });
    };

    //clear state where user registration is surpressed
    $scope.$on("risevision.user.signedOut", function () {
      cookieStore.remove("surpressRegistration");
    });

    //spinner
    $scope.$watch(function () {return uiStatusManager.isStatusUndetermined(); },
    function (undetermined){
      $scope.undetermined = undetermined;
      if (undetermined === true) { $loading.start("auth-buttons"); }
      else { $loading.stop("auth-buttons"); }
    });

    //render dialogs based on status the UI is stuck on
    $scope.$watch(function () { return uiStatusManager.getStatus(); },
    function (newStatus, oldStatus){
      if(newStatus) {
        $log.debug("status changed from", oldStatus, "to", newStatus);

        //render a dialog based on the status current UI is in
        if(newStatus === "registerdAsRiseVisionUser") {
          $scope.register();
        }
      }
    });

    //watch on username change and populate onto scope variables requried
    // for rendering UI

    $scope.$watch(function () {return userState.isLoggedIn();},
      function (loggedIn) { $scope.isLoggedIn = loggedIn;
        if(loggedIn === true) { $scope.userPicture = userState.getUserPicture();}
      });
    $scope.$watch(function () {return userState.isRiseVisionUser();},
      function (isRvUser) { $scope.isRiseVisionUser = isRvUser; });

    //repopulate profile upon change of current user
    $scope.$watch(function () {return userState.isRiseVisionUser();},
      function (isRvUser) {
        if(isRvUser === true) {
          $scope.profile = userState.getCopyOfProfile();
        }});

    // Login Modal
    $scope.login = function() {
      userState.authenticate(true).then().finally(function(){
        uiStatusManager.invalidateStatus("registrationComplete");
      });
    };

    $scope.logout = function () {
      userState.signOut().then(function (){
        alert("If you are using a public computer, please do not forget to log out of Google Account, or close your browser window if you are using Incognito mode. ");
      }, function (err) {
        $log.error("sign out failed", err);
      });
    };

    // Show User Settings Modal
    $scope.userSettings = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("user-settings-modal.html"),
        controller: "UserSettingsModalCtrl",
        size: size,
        resolve: {username: function () {return userState.getUsername();},
        add: function () {return false; }}
      });
    };
    // Show Payment Methods Modal
    $scope.paymentMethods = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("payment-methods-modal.html"),
        controller: "PaymentMethodsModalCtrl",
        size: size
      });
    };

    userState.authenticate(false);
  }
]);
