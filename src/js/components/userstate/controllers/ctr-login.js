"use strict";

angular.module("risevision.common.components.userstate")
  .controller("LoginCtrl", ["$scope", "$loading", "$stateParams",
    "$state", "userAuthFactory", "customAuthFactory", "uiFlowManager",
    "urlStateService", "userState", "isSignUp", "FORCE_GOOGLE_AUTH",
    function ($scope, $loading, $stateParams, $state, userAuthFactory,
      customAuthFactory, uiFlowManager, urlStateService, userState,
      isSignUp, FORCE_GOOGLE_AUTH) {
      $scope.forms = {};
      $scope.credentials = {};
      $scope.messages = {};
      $scope.errors = {};
      $scope.isSignUp = isSignUp;
      $scope.FORCE_GOOGLE_AUTH = FORCE_GOOGLE_AUTH;

      $scope.messages.passwordReset = $stateParams.passwordReset;
      $scope.messages.accountConfirmed = $stateParams.accountConfirmed;

      $scope.googleLogin = function (endStatus) {
        $loading.startGlobal("auth-buttons-login");
        userAuthFactory.authenticate(true)
          .finally(function () {
            $loading.stopGlobal("auth-buttons-login");
            uiFlowManager.invalidateStatus(endStatus);
          });
      };

      $scope.customLogin = function (endStatus) {
        $scope.errors = {};

        if ($scope.forms.loginForm.$valid) {
          $loading.startGlobal("auth-buttons-login");

          userAuthFactory.authenticate(true, $scope.credentials)
            .then(function () {
              urlStateService.redirectToState($stateParams.state);
            })
            .then(null, function () {
              $scope.errors.loginError = true;
            })
            .finally(function () {
              $loading.stopGlobal("auth-buttons-login");
              uiFlowManager.invalidateStatus(endStatus);
            });
        }
      };

      $scope.isPasswordValid = function () {
        return userAuthFactory.isPasswordValid($scope.credentials.password);
      };

      $scope.createAccount = function (endStatus) {
        $scope.errors = {};

        if ($scope.forms.loginForm.$valid && $scope.isPasswordValid()) {
          $loading.startGlobal("auth-buttons-login");

          customAuthFactory.addUser($scope.credentials)
            .then(function () {
              $scope.errors.confirmationRequired = true;
            })
            .then(null, function () {
              $scope.errors.duplicateError = true;
            })
            .finally(function () {
              $loading.stopGlobal("auth-buttons-login");
              uiFlowManager.invalidateStatus(endStatus);
            });
        }
      };
    }
  ]);
