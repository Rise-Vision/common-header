angular.module("risevision.common.header")
.controller("AuthButtonsCtr", ["$scope", "$modal", "$templateCache",
  "userState", "$loading", "cookieStore",
  "$log", "uiFlowManager", "oauth2APILoader", "bindToScopeWithWatch",
  function($scope, $modal, $templateCache, userState,
  $loading, cookieStore, $log, uiFlowManager, oauth2APILoader,
  bindToScopeWithWatch) {

    window.$loading = $loading; //DEBUG

    $scope.spinnerOptions = {color: "#999", hwaccel: true, radius: 10};

    $scope.register = function () {
      cookieStore.remove("surpressRegistration");
      uiFlowManager.invalidateStatus("registrationComplete");
    };

    //clear state where user registration is surpressed
    $scope.$on("risevision.user.signedOut", function () {
      cookieStore.remove("surpressRegistration");
    });

    $scope.$on("risevision.uiStatus.validationCancelled", function () {
      cookieStore.remove("surpressRegistration");
    });

    //spinner
    $scope.$watch(function () {return uiFlowManager.isStatusUndetermined(); },
    function (undetermined){
      $scope.undetermined = undetermined;
      $scope.loading = undetermined;
    });


    //render dialogs based on status the UI is stuck on
    $scope.$watch(function () { return uiFlowManager.getStatus(); },
    function (newStatus, oldStatus){
      if(newStatus) {
        $log.debug("status changed from", oldStatus, "to", newStatus);

        //render a dialog based on the status current UI is in
        if(newStatus === "registeredAsRiseVisionUser") {
          if(!userState.registrationModalInstance && userState.isLoggedIn()) { // avoid duplicate registration modals
            userState.registrationModalInstance = $modal.open({
              template: $templateCache.get("registration-modal.html"),
              controller: "RegistrationModalCtrl",
              backdrop: "static"
            });
          }

          userState.registrationModalInstance.result.finally(function (){
            //TODO: put it somewhere else
            userState.registrationModalInstance = null;
            uiFlowManager.invalidateStatus();
          });
        }
        else if(newStatus === "signedInWithGoogle") {
          $scope.login();
        }
      }
    });

    //watch on username change and populate onto scope variables requried
    // for rendering UI

    $scope.$watch(function () {return userState.isLoggedIn();},
      function (loggedIn) { $scope.isLoggedIn = loggedIn;
        if(loggedIn === true) { $scope.userPicture = userState.getUserPicture();}
      });
    bindToScopeWithWatch(userState.isRiseVisionUser, "isRiseVisionUser", $scope);

    //repopulate profile upon change of current user
    $scope.$watch(function () {return userState.getUsername();},
      function (username) {
        if(username) {
          $scope.profile = userState.getCopyOfProfile();
        }});

    // Login Modal
    $scope.login = function (endStatus) {
      $loading.startGlobal("auth-buttons-login");
      userState.authenticate(true).then().finally(function(){
        $loading.stopGlobal("auth-buttons-login");
        uiFlowManager.invalidateStatus(endStatus);
      });
    };

    $scope.logout = function () {
      $scope.confirmSignOut();
    };

    $scope.confirmSignOut = function(size) {
      var modalInstance =$modal.open({
        template: $templateCache.get("signout-modal.html"),
        controller: "SignOutModalCtrl",
        size: size
      });
      modalInstance.result.finally(function () {
        uiFlowManager.invalidateStatus("registrationComplete");
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

    $loading.startGlobal("auth-buttons-silent");
    oauth2APILoader() //force loading oauth api on startup
                      //to avoid popup blocker
    .then().finally(function () {
      userState.authenticate(false).then().finally(function () {
        $loading.stopGlobal("auth-buttons-silent");
        if(!uiFlowManager.isStatusUndetermined()) {
          //attempt to reach a stable registration state only
          //when there is currently no validating checking
          uiFlowManager.invalidateStatus("registrationComplete");
        }
      });
    });


  }
]);
