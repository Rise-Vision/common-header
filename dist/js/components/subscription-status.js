(function () {
  "use strict";

  try {
    angular.module("risevision.common.config");
  } catch (err) {
    angular.module("risevision.common.config", []);
  }

  angular.module("risevision.common.config")
    .value("STORE_URL", "https://store.risevision.com/")
    .value("STORE_SERVER_URL", "https://store-dot-rvaserver2.appspot.com/");

  angular.module("risevision.common.components.subscription-status.config", [])
    .value("IN_RVA_PATH", "product/productId/?cid=companyId")
    .value("ACCOUNT_PATH", "account?cid=companyId")
    .value("PATH_URL", "v1/company/companyId/product/status?pc=")
    .value("AUTH_PATH_URL", "v1/widget/auth?cid=companyId&pc=")
    .value("PATH_URL_BY_DISPLAY_ID",
      "v1/product/productCode/status?displayIds=");

  angular.module("risevision.common.components.subscription-status.filters", [
    "risevision.common.i18n"
  ]);

  angular.module(
    "risevision.common.components.subscription-status.directives", [
      "risevision.common.components.subscription-status.service"
    ]);

  angular.module("risevision.common.components.subscription-status", [
    "ngSanitize",
    "ui.bootstrap",
    "risevision.common.config",
    "risevision.common.components.subscription-status.config",
    "risevision.common.components.subscription-status.directives",
    "risevision.common.components.subscription-status.filters",
    "risevision.common.components.subscription-status.service"
  ]);
}());

(function () {
  "use strict";

  angular.module("risevision.common.components.subscription-status.service", [
    "risevision.common.config",
    "risevision.common.components.subscription-status.config"
  ])
    .service("subscriptionStatusService", ["$http", "$q", "STORE_SERVER_URL",
      "PATH_URL", "AUTH_PATH_URL", "PATH_URL_BY_DISPLAY_ID",
      function ($http, $q, STORE_SERVER_URL, PATH_URL, AUTH_PATH_URL,
        PATH_URL_BY_DISPLAY_ID) {
        var responseType = ["On Trial", "Trial Expired", "Subscribed",
          "Suspended", "Cancelled", "Free", "Not Subscribed",
          "Product Not Found", "Company Not Found", "Error"
        ];
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {
          return Math.floor((b.getTime() - a.getTime()) / _MS_PER_DAY);
        }

        var checkAuthorizedStatus = function (productCode, companyId) {
          var deferred = $q.defer();

          var url = STORE_SERVER_URL +
            AUTH_PATH_URL.replace("companyId", companyId) +
            productCode;

          $http.get(url).then(function (response) {
            if (response && response.data) {
              deferred.resolve(response.data.authorized);
            } else {
              deferred.resolve(false);
            }
          });

          return deferred.promise;
        };

        var checkSubscriptionStatus = function (productCodes, companyId,
          displayId) {
          var deferred = $q.defer();

          productCodes = Array.isArray(productCodes) ? productCodes : [
            productCodes
          ];

          var url = STORE_SERVER_URL +
            PATH_URL.replace("companyId", companyId) +
            productCodes.join(",");

          if (displayId) {
            url = STORE_SERVER_URL +
              PATH_URL_BY_DISPLAY_ID.replace("productCode", productCodes.join(
                ",")) +
              displayId;
          }

          $http.get(url).then(function (response) {
            if (response && response.data && response.data.length) {
              var statusList = [];

              for (var i = 0; i < response.data.length; i++) {
                var subscriptionStatus = response.data[i];

                statusList.push(subscriptionStatus);
                subscriptionStatus.plural = "";
                subscriptionStatus.statusCode = subscriptionStatus.status
                  .toLowerCase().replace(" ", "-");

                if (subscriptionStatus.status === "") {
                  subscriptionStatus.status = "N/A";
                  subscriptionStatus.statusCode = "na";
                  subscriptionStatus.subscribed = false;
                } else if (subscriptionStatus.status === responseType[0] ||
                  subscriptionStatus.status === responseType[2] ||
                  subscriptionStatus.status === responseType[5]) {
                  subscriptionStatus.subscribed = true;
                } else {
                  subscriptionStatus.subscribed = false;
                }

                if (subscriptionStatus.statusCode === "not-subscribed" &&
                  subscriptionStatus.trialPeriod && subscriptionStatus.trialPeriod >
                  0) {
                  subscriptionStatus.statusCode = "trial-available";
                  subscriptionStatus.subscribed = true;
                }

                if (subscriptionStatus.expiry && subscriptionStatus.statusCode ===
                  "on-trial") {
                  subscriptionStatus.expiry = new Date(
                    subscriptionStatus
                    .expiry);

                  if (subscriptionStatus.expiry instanceof Date && !
                    isNaN(
                      subscriptionStatus.expiry.valueOf())) {
                    subscriptionStatus.expiry = dateDiffInDays(new Date(),
                      subscriptionStatus.expiry);
                  }

                  if (subscriptionStatus.expiry === 0) {
                    subscriptionStatus.plural = "-zero";
                  } else if (subscriptionStatus.expiry > 1) {
                    subscriptionStatus.plural = "-many";
                  }
                }
              }

              deferred.resolve(statusList);
            } else {
              deferred.reject("No response");
            }
          });

          return deferred.promise;
        };

        this.get = function (productCode, companyId, displayId) {
          return checkSubscriptionStatus(productCode, companyId, displayId)
            .then(function (statusList) {
              var subscriptionStatus = statusList[0];

              if (subscriptionStatus.subscribed === false) {
                // double check store authorization in case they're authorized
                return checkAuthorizedStatus(productCode, companyId)
                  .then(function (authorized) {
                    subscriptionStatus.subscribed = authorized;

                    return subscriptionStatus;
                  });
              } else {
                return subscriptionStatus;
              }
            });
        };

        this.list = function (productCodes, companyId, displayId) {
          return checkSubscriptionStatus(productCodes, companyId, displayId);
        };

      }
    ]);
}());

(function () {
  "use strict";

  angular.module(
    "risevision.common.components.subscription-status.directives")
    .directive("appSubscriptionStatus", ["$templateCache", "$modal",
      "subscriptionStatusService",
      function ($templateCache, $modal, subscriptionStatusService) {
        return {
          restrict: "AE",
          require: "?ngModel",
          scope: {
            productId: "@",
            productCode: "@",
            companyId: "@",
            productPrice: "@"
          },
          template: $templateCache.get(
            "subscription-status/app-subscription-status-template.html"),
          link: function ($scope, elm, attrs, ctrl) {
            $scope.subscriptionStatus = {
              "status": "N/A",
              "statusCode": "na",
              "subscribed": false,
              "expiry": null
            };

            function checkSubscriptionStatus() {
              if ($scope.productCode && $scope.productId && $scope.companyId) {
                subscriptionStatusService.get($scope.productCode, $scope.companyId)
                  .then(function (subscriptionStatus) {
                      if (subscriptionStatus) {
                        $scope.subscriptionStatus = subscriptionStatus;
                      }
                    },
                    function () {
                      // TODO: catch error here
                    });
              }
            }

            $scope.$watch("companyId", function () {
              checkSubscriptionStatus();
            });

            if (ctrl) {
              $scope.$watch("subscriptionStatus", function (
                subscriptionStatus) {
                ctrl.$setViewValue(subscriptionStatus);
              });
            }

            $scope.$watch("showStoreModal", function (show) {
              if (show) {
                var modalInstance = $modal.open({
                  templateUrl: "store-iframe-template.html",
                  controller: "StoreModalController",
                  size: "lg",
                  resolve: {
                    productId: function () {
                      return $scope.productId;
                    },
                    companyId: function () {
                      return $scope.companyId;
                    }
                  }
                });

                modalInstance.result.then(function () {
                  checkSubscriptionStatus();

                }, function () {
                  checkSubscriptionStatus();

                })
                  .finally(function () {
                    $scope.showStoreModal = false;
                  });
              }
            });
          }
        };
      }
    ])
    .directive("ngDisableRightClick", function () {
      return function (scope, element) {
        element.bind("contextmenu", function (event) {
          scope.$apply(function () {
            event.preventDefault();
          });
        });
      };
    });
}());

(function () {
  "use strict";

  angular.module(
    "risevision.common.components.subscription-status.directives")
    .directive("subscriptionStatus", ["$rootScope", "$templateCache", "subscriptionStatusService",
      "STORE_URL", "ACCOUNT_PATH", "IN_RVA_PATH",
      function ($rootScope, $templateCache, subscriptionStatusService, STORE_URL, ACCOUNT_PATH,
        IN_RVA_PATH) {
        return {
          restrict: "AE",
          require: "?ngModel",
          scope: {
            productId: "@",
            productCode: "@",
            companyId: "@",
            displayId: "@",
            expandedFormat: "@",
            showStoreModal: "=?",
            customProductLink: "@",
            customMessages: "@",
            customOnClick: "&"
          },
          template: $templateCache.get("subscription-status/subscription-status-template.html"),
          link: function ($scope, elm, attrs, ctrl) {
            $scope.subscriptionStatus = {
              "status": "N/A",
              "statusCode": "na",
              "subscribed": false,
              "expiry": null
            };
            $scope.messagesPrefix = $scope.customMessages ? $scope.customMessages : "subscription-status";

            var updateUrls = function () {
              $scope.storeAccountUrl = STORE_URL + ACCOUNT_PATH.replace("companyId", $scope.companyId);

              if ($scope.customProductLink) {
                $scope.storeUrl = $scope.customProductLink;
              } else {
                $scope.storeUrl = STORE_URL + IN_RVA_PATH
                  .replace("productId", $scope.productId)
                  .replace("companyId", $scope.companyId);
              }
            };

            function checkSubscriptionStatus() {
              if ($scope.productCode && $scope.productId && ($scope.companyId || $scope.displayId)) {
                subscriptionStatusService.get($scope.productCode, $scope.companyId, $scope.displayId)
                  .then(function (subscriptionStatus) {
                      if (subscriptionStatus) {
                        if (!$scope.subscriptionStatus || $scope.subscriptionStatus.status !== subscriptionStatus.status) {
                          $rootScope.$emit("subscription-status:changed", subscriptionStatus);
                        }

                        $scope.subscriptionStatus = subscriptionStatus;
                      }
                    },
                    function (err) {
                      console.log("Error checking subscription status", err);
                    });
              }
            }

            $scope.$watch("companyId", function () {
              checkSubscriptionStatus();

              updateUrls();
            });

            var subscriptionStatusListener = $rootScope.$on(
              "refreshSubscriptionStatus", function (event, data) {
                // Only refresh if currentStatus code matches the provided value, or value is null
                if (data === null || $scope.subscriptionStatus.statusCode === data) {
                  checkSubscriptionStatus();
                }
              });

            $scope.$on("$destroy", function () {
              subscriptionStatusListener();
            });

            if (ctrl) {
              $scope.$watch("subscriptionStatus", function (subscriptionStatus) {
                ctrl.$setViewValue(subscriptionStatus);
              });
            }
          }
        };
      }
    ])
    .filter("to_trusted", ["$sce",
      function ($sce) {
        return function (text) {
          return $sce.trustAsHtml(text);
        };
      }
    ]);
}());

"use strict";

angular.module("risevision.common.components.subscription-status.filters")
  .filter("productTrialDaysToExpiry", ["$interpolate", "$translate",
    function ($interpolate, $translate) {
      var expiresToday = null;
      var expiresIn = null;

      $translate(["subscription-status.expires-today",
        "subscription-status.expires-in"
      ], {
        days: "{{days}}"
      }).then(function (values) {
        expiresToday = $interpolate(values[
          "subscription-status.expires-today"]);
        expiresIn = $interpolate(values["subscription-status.expires-in"]);
      });

      return function (subscriptionExpiry) {
        var msg = "";
        try {
          var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          var timeInMs = new Date(subscriptionExpiry).getTime() - new Date()
            .getTime();
          var days = Math.floor(timeInMs / oneDay);
          var params = {
            days: days
          };

          if (days === 0) {
            msg = expiresToday !== null ? expiresToday(params) : "";
          } else if (days > 0) {
            msg = expiresIn !== null ? expiresIn(params) : "";
          } else {
            msg = expiresToday !== null ? expiresToday(params) : "";
          }
        } catch (e) {
          // Nothing to do
        }

        return msg;
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.subscription-status');
} catch (e) {
  module = angular.module('risevision.common.components.subscription-status', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscription-status/app-subscription-status-template.html',
    '<a id="app-subscription-status" href="" ng-click="showStoreModal = true" class="store-link"><div class="rate"><strong>${{productPrice}}</strong></div><div class="subscribe"><strong ng-if="!subscriptionStatus.subscribed"><span translate="subscription-status.get-subscription"></span></strong> <strong ng-if="subscriptionStatus.subscribed"><span translate="subscription-status.continue-to-app"></span></strong></div></a>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.subscription-status');
} catch (e) {
  module = angular.module('risevision.common.components.subscription-status', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscription-status/subscription-status-template.html',
    '<div ng-show="!expandedFormat"><h3 ng-disable-right-click=""><span ng-show="subscriptionStatus.statusCode !== \'not-subscribed\'" ng-bind-html="messagesPrefix + \'.\' + subscriptionStatus.statusCode + subscriptionStatus.plural | translate:subscriptionStatus | to_trusted"></span></h3><span ng-show="subscriptionStatus.statusCode === \'trial-available\'"><button class="btn btn-primary btn-xs" ng-click="showStoreModal = true;"><span translate="{{messagesPrefix}}.start-trial"></span></button></span> <span ng-show="[\'on-trial\', \'trial-expired\', \'cancelled\', \'not-subscribed\'].indexOf(subscriptionStatus.statusCode) >= 0"><a class="btn btn-primary btn-xs" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="{{messagesPrefix}}.subscribe"></span></a> <a class="btn btn-primary btn-xs" ng-click="customOnClick()" ng-show="customOnClick"><span translate="{{messagesPrefix}}.subscribe"></span></a></span> <span ng-show="[\'suspended\'].indexOf(subscriptionStatus.statusCode) >= 0"><a type="button" class="btn btn-primary btn-xs" ng-href="{{storeAccountUrl}}" target="_blank"><span translate="{{messagesPrefix}}.view-account"></span></a></span></div><div ng-show="expandedFormat"><div class="subscription-status trial" ng-show="subscriptionStatus.statusCode === \'on-trial\'"><span ng-bind-html="messagesPrefix + \'.expanded-\' + subscriptionStatus.statusCode + subscriptionStatus.plural | translate:subscriptionStatus | to_trusted"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="{{messagesPrefix}}.subscribe-now"></span></a> <a type="button" class="btn btn-primary u_margin-left" ng-click="customOnClick()" ng-show="customOnClick"><span translate="{{messagesPrefix}}.subscribe-now"></span></a></div><div class="subscription-status expired" ng-show="subscriptionStatus.statusCode === \'trial-expired\'"><span translate="{{messagesPrefix}}.expanded-expired"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="{{messagesPrefix}}.subscribe-now"></span></a> <a type="button" class="btn btn-primary u_margin-left" ng-click="customOnClick()" ng-show="customOnClick"><span translate="{{messagesPrefix}}.subscribe-now"></span></a></div><div class="subscription-status cancelled" ng-show="subscriptionStatus.statusCode === \'cancelled\'"><span translate="{{messagesPrefix}}.expanded-cancelled"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="{{messagesPrefix}}.subscribe-now"></span></a> <a type="button" class="btn btn-primary u_margin-left" ng-click="customOnClick()" ng-show="customOnClick"><span translate="{{messagesPrefix}}.subscribe-now"></span></a></div><div class="subscription-status suspended" ng-show="subscriptionStatus.statusCode === \'suspended\'"><span translate="{{messagesPrefix}}.expanded-suspended"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeAccountUrl}}" target="_blank"><span translate="{{messagesPrefix}}.view-invoices"></span></a></div></div>');
}]);
})();
