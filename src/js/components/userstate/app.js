(function (angular) {
  "use strict";

  try {
    angular.module("risevision.common.config");
  } catch (err) {
    angular.module("risevision.common.config", []);
  }

  angular.module("risevision.common.config")
    .value("ENABLE_EXTERNAL_LOGGING", true)
    .value("CORE_URL", "https://rvaserver2.appspot.com/_ah/api");

  angular.module("risevision.common.components.util", []);
  angular.module("risevision.common.components.logging", []);

  angular.module("risevision.common.components.rvtokenstore", [
    "risevision.common.components.util", "LocalStorageModule",
    "ngBiscuit"
  ]);

  angular.module("risevision.common.components.userstate", [
    "ui.router",
    "angular-md5",
    "risevision.common.components.ui-flow",
    "risevision.common.components.util",
    "risevision.common.components.rvtokenstore",
    "risevision.common.components.logging",
    "risevision.common.components.loading",
    "risevision.common.config",
    "risevision.common.gapi", "LocalStorageModule",
    "risevision.core.cache",
    "risevision.core.oauth2", "risevision.core.company",
    "risevision.core.util", "risevision.core.userprofile"
  ])

  // Set up our mappings between URLs, templates, and controllers
  .config(["$urlRouterProvider", "$stateProvider", "$locationProvider",
    function storeRouteConfig($urlRouterProvider, $stateProvider,
      $locationProvider) {

      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix("/");

      $urlRouterProvider.otherwise("/");

      // Use $stateProvider to configure states.
      $stateProvider.state("common", {
        template: "<div class=\"app-launcher\" ui-view></div>"
      })

      .state("common.googleresult", {
        url: "/:id_token&:client_id"
      })

      .state("common.auth", {
        abstract: true,
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/auth-common.html");
          }
        ]
      })

      .state("common.auth.unauthorized", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/login.html");
          }
        ],
        url: "/unauthorized/:state",
        controller: "LoginCtrl",
        params: {
          passwordReset: null,
          accountConfirmed: null
        },
        resolve: {
          isSignUp: function () {
            return false;
          }
        }
      })

      .state("common.auth.createaccount", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/create-account.html");
          }
        ],
        url: "/createaccount/:state",
        controller: "LoginCtrl",
        resolve: {
          isSignUp: function () {
            return true;
          }
        }
      })

      .state("common.auth.confirmaccount", {
        controller: "ConfirmAccountCtrl",
        template: "<div ui-view></div>",
        url: "/confirmaccount/:user/:token"
      })

      .state("common.auth.requestconfirmationemail", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get(
              "userstate/request-confirmation-email.html");
          }
        ],
        url: "/requestconfirmationemail",
        controller: "RequestConfirmationEmailCtrl"
      })

      .state("common.auth.requestpasswordreset", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get(
              "userstate/request-password-reset.html");
          }
        ],
        url: "/requestpasswordreset",
        controller: "RequestPasswordResetCtrl"
      })

      .state("common.auth.resetpassword", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get(
              "userstate/reset-password-confirm.html");
          }
        ],
        url: "/resetpassword/:user/:token",
        controller: "ResetPasswordConfirmCtrl"
      });
    }
  ])

  .run(["$rootScope", "$state", "$stateParams", "urlStateService",
    "userState",
    function ($rootScope, $state, $stateParams, urlStateService, userState) {
      userState._restoreState();

      $rootScope.$on("$stateChangeStart", function (event, toState,
        toParams, fromState, fromParams) {
        if (toState && (toState.name === "common.auth.unauthorized" ||
          toState.name === "common.auth.unregistered" ||
          toState.name === "common.auth.createaccount") && !toParams.state) {

          if (fromParams.state) {
            toParams.state = fromParams.state;

            event.preventDefault();

            $state.go(toState.name, toParams);
          }
        }
      });

      $rootScope.$on("risevision.user.authorized", function () {
        if ($state.current.name.indexOf("common.auth") !== -1) {
          urlStateService.redirectToState($stateParams.state);
        }
      });
    }
  ]);

})(angular);
