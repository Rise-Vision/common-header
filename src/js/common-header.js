angular.module("risevision.common.header", [
  "risevision.common.config",
  "risevision.common.auth",
  "risevision.common.gapi",
  "risevision.common.cache",
  "risevision.common.company",
  "risevision.common.localstorage",
  'ui.bootstrap'
])
.directive('commonHeader', ['$modal', '$rootScope', '$q', 'apiAuth', '$loading',
  'shoppingCartService', '$interval', 'oauthAPILoader', 'storeAPILoader',
  '$log',
  function($modal, $rootScope, $q, apiAuth, $loading, shoppingCart, $interval,
    oauthAPILoader, storeAPILoader, $log) {
    return {
      restrict: 'E',
      templateUrl: 'view/common-header.html',
      scope: false,
      link: function(scope, iElement, iAttrs) {
        scope.navCollapsed = true;

        $rootScope.$on("rvAuth.$authenticate", function(data) {
          scope.userState = apiAuth.getUserState();
        });

        $rootScope.$on("rvAuth.$signOut", function () {
          scope.userState = apiAuth.getUserState();
        });

        // Login Modal
        scope.loginModal = function(size) {
          var modalInstance = $modal.open({
            templateUrl: 'authorization-modal.html',
            controller: 'AuthModalCtrl',
            size: size
          });
        };

        scope.logout = function () {
          apiAuth.$signOut();
        };

        // Show Add Sub-Company Modal
        scope.addSubCompany = function(size) {
          var modalInstance = $modal.open({
            templateUrl: 'sub-company-modal.html',
            controller: 'SubCompanyModalCtrl',
            size: size
          });
        };
        // Show Company Settings Modal
        scope.companySettings = function(size) {
          var modalInstance = $modal.open({
            templateUrl: 'company-settings-modal.html',
            controller: 'CompanySettingsModalCtrl',
            size: size
          });
        };
        // Show User Settings Modal
        scope.userSettings = function(size) {
          var modalInstance = $modal.open({
            templateUrl: 'user-settings-modal.html',
            controller: 'UserSettingsModalCtrl',
            size: size
          });
        };
        // Show Payment Methods Modal
        scope.paymentMethods = function(size) {
          var modalInstance = $modal.open({
            templateUrl: 'payment-methods-modal.html',
            controller: 'PaymentMethodsModalCtrl',
            size: size
          });
        };

        // If nav options not provided use defaults
        if (!scope.navOptions)
          scope.navOptions = [{
            title: 'Home',
            link: '#/'
          }, {
            title: 'Store',
            link: ''
          }, {
            title: 'Account',
            link: ''
          }, {
            title: 'Sellers',
            link: ''
          }, {
            title: 'Platform',
            link: 'http://rva.risevision.com/',
            target: '_blank'
          }];
      }
    };
  }
])
.controller('AuthModalCtrl', ['$scope', '$modalInstance', '$window',
  'apiAuth',
  function($scope, $modalInstance, $window, apiAuth) {

    $scope.authenticate = function() {
      apiAuth.$authenticate(true);
      $modalInstance.dismiss();
    };

  }
])
.controller('SubCompanyModalCtrl', ['$scope', '$modalInstance', '$modal',
  function($scope, $modalInstance, $modal) {
    $scope.closeModal = function() {
      $modalInstance.dismiss('cancel');
    };
    // Show Move Company Modal
    $scope.moveCompany = function(size) {
      var modalInstance = $modal.open({
        templateUrl: 'move-company-modal.html',
        controller: 'MoveCompanyModalCtrl',
        size: size
      });
    };
  }
])
.controller('MoveCompanyModalCtrl', ['$scope', '$modalInstance',
  function($scope, $modalInstance) {
    $scope.closeModal = function() {
      $modalInstance.dismiss('cancel');
    };
  }
])
.controller('CompanySettingsModalCtrl', ['$scope', '$modalInstance',
  function($scope, $modalInstance) {
    $scope.closeModal = function() {
      $modalInstance.dismiss('cancel');
    };
  }
])
.controller('UserSettingsModalCtrl', ['$scope', '$modalInstance',
  function($scope, $modalInstance) {
    $scope.closeModal = function() {
      $modalInstance.dismiss('cancel');
    };
  }
])
.controller('PaymentMethodsModalCtrl', ['$scope', '$modalInstance', '$modal',
  function($scope, $modalInstance, $modal) {
    $scope.closeModal = function() {
      $modalInstance.dismiss('cancel');
    };
    // Show Payment Methods Modal
    $scope.creditCards = function(size) {
      var modalInstance = $modal.open({
        templateUrl: 'credit-cards-modal.html',
        controller: 'CreditCardsModalCtrl',
        size: size
      });
    };
  }
])
.controller('CreditCardsModalCtrl', ['$scope', '$modalInstance',
  function($scope, $modalInstance) {
    $scope.closeModal = function() {
      $modalInstance.dismiss('cancel');
    };
  }
]);
