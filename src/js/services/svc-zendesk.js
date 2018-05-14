/* jshint maxlen: false */

(function (angular) {
  "use strict";

  angular.module("risevision.common.support", ["risevision.common.components.subscription-status"])
  /* jshint quotmark: single */
  .value('ZENDESK_WEB_WIDGET_SCRIPT',
    'window.zE||(function(e,t,s){var n=window.zE=window.zEmbed=function(){n._.push(arguments)},a=n.s=e.createElement(t),r=e.getElementsByTagName(t)[0];n.set=function(e){n.set._.push(e)},n._=[],n.set._=[],a.async=true,a.setAttribute("charset","utf-8"),a.src="https://static.zdassets.com/ekr/asset_composer.js?key="+s,n.t=+new Date,a.type="text/javascript",r.parentNode.insertBefore(a,r)})(document,"script","b8d6bdba-10ea-4b88-b96c-9d3905b85d8f");'
  )
  /* jshint quotmark: double */
  .factory("zendesk", ["getSupportSubscriptionStatus", "segmentAnalytics",
    "userState", "$window", "$q", "$location", "$log", "ZENDESK_WEB_WIDGET_SCRIPT",
    function (getSupportSubscriptionStatus, segmentAnalytics, userState,
      $window, $q, $location, $log, ZENDESK_WEB_WIDGET_SCRIPT) {

      var loaded = false;
      var previousUsername = "";
      var $ = $window.$;

      var cancelDomMonitor;

      function ensureScript() {
        if (!loaded) {
          $window.zESettings = {
            webWidget: {

              helpCenter: {
                title: {
                  "*": "Help"
                },
                searchPlaceholder: {
                  "*": "How can we help?"
                },
                messageButton: {
                  "*": "Open a Support Ticket"
                }
              },

              chat: {
                suppress: true
              },

              contactForm: {
                title: {
                  "*": "Open a Support Ticket"
                },
                messageButton: {
                  "*": "Open a Support Ticket"
                }
              }
            }
          };

          var scriptElem = $window.document.createElement("script");
          scriptElem.innerText = ZENDESK_WEB_WIDGET_SCRIPT;

          $window.document.body.appendChild(scriptElem);
          loaded = true;
        }
        return $q.when();
      }

      function _identify() {
        var deferred = $q.defer();

        $window.zE(function () {

          var username = userState.getUsername();
          var properties = {
            email: userState.getUserEmail(),
            "rise_vision_company_id": userState.getUserCompanyId(),
          };

          getSupportSubscriptionStatus()
            .then(function (subscriptionStatus) {
              if (subscriptionStatus && subscriptionStatus.statusCode === "subscribed") {
                // append priority support flag
                $location.search("cHJpb3JpdHktc3VwcG9ydA", 1);
              } else {
                // clear priority support flag
                $location.search("cHJpb3JpdHktc3VwcG9ydA", null);
              }
              segmentAnalytics.identify(username, properties);
              deferred.resolve();
            })
            .catch(function (err) {
              console.log("Error getting subscription status", err);
              deferred.reject();
            });

        });
        return deferred.promise;
      }

      function showWidget() {
        return ensureScript()
          .then(_identify)
          .then(function () {
            // clear send-a-note flag
            $location.search("c2VuZC11cy1hLW5vdGU", null);
          })
          .then(_activate);
      }

      function _activate() {
        var username = userState.getUsername();

        if (previousUsername !== username) {
          var identity = {
            email: username,
          };

          $window.zE.identify(identity);
          previousUsername = username;
        }

        _startDomMonitor();

        $window.zE.show();
        _changeBorderStyle();
      }

      function _changeBorderStyle() {
        $("iframe[class^=zEWidget]").contents().find(".Container")
          .css("border", "1px solid #4ab767");
      }

      function _startDomMonitor() {
        // continuous monitor DOM and alter ZD widget form
        // when it's present on the web page
        if (!cancelDomMonitor) {
          var username = userState.getUsername();
          var companyId = userState.getSelectedCompanyId();

          cancelDomMonitor = setInterval(function () {
            var iframe = $("iframe.zEWidget-webWidget--active");
            if (iframe && iframe.contents) {
              // automatically fill in rise vision username
              var rvUsernameInput = iframe.contents().find("input[name=email]");
              if (rvUsernameInput && rvUsernameInput.length > 0) {
                rvUsernameInput.val(username);
                rvUsernameInput.prop("disabled", true);
                rvUsernameInput.parents("label").parent().hide();
              }

              var rvCompanyInput = iframe.contents().find(
                "input[name=24893323]");
              if (rvCompanyInput && rvCompanyInput.length > 0) {
                getSupportSubscriptionStatus().then(function (subscriptionStatus) {
                  var prioritySupport = false;
                  $log.info("Subscription status is", subscriptionStatus);
                  if (subscriptionStatus && subscriptionStatus.statusCode === "subscribed") {
                    // append priority support flag
                    prioritySupport = 1;
                  }

                  rvCompanyInput.val(JSON.stringify({
                    riseVisionCompanyId: companyId,
                    riseVisionUsername: username,
                    prioritySupport: prioritySupport
                  }));
                }).catch(function (err) {
                  $log.error("error: ", err);
                });

                rvCompanyInput.prop("disabled", true);
                rvCompanyInput.parents("label").parent().hide();

                $log.debug("ZD form found!");
                clearInterval(cancelDomMonitor);
                cancelDomMonitor = null;
              }
            }
          }, 1000);
        }
      }

      function forceCloseAll() {
        if ($window.zE && $window.zE.hide) {
          $window.zE.hide();
          if (cancelDomMonitor) {
            clearInterval(cancelDomMonitor);
            cancelDomMonitor = null;
          }
        }
      }

      function enableSuggestions() {
        if ($window.zE && $window.zE.setHelpCenterSuggestions) {
          $window.zE.setHelpCenterSuggestions({
            url: true
          });
        }
      }

      function logout() {
        previousUsername = "";
      }

      return {
        ensureScript: ensureScript,
        showWidget: showWidget,
        forceCloseAll: forceCloseAll,
        enableSuggestions: enableSuggestions,
        logout: logout
      };

    }
  ])
    .factory("getSupportSubscriptionStatus", ["SUPPORT_PRODUCT_CODE", "userState", "$q",
      "subscriptionStatusService", "$log",
      function (SUPPORT_PRODUCT_CODE, userState, $q, subscriptionStatusService,
        $log) {
        return function getSupportSubscriptionStatus() {
          var deferred = $q.defer();

          if (SUPPORT_PRODUCT_CODE && userState.getSelectedCompanyId()) {
            subscriptionStatusService.get(SUPPORT_PRODUCT_CODE, userState.getSelectedCompanyId())
              .then(function (subscriptionStatus) {
                  $log.debug("subscriptionStatus", subscriptionStatus);
                  deferred.resolve(subscriptionStatus);
                },
                function (err) {
                  $log.debug("Could not retrieve a subscription status", err);
                  deferred.reject(err);
                });
          } else {
            deferred.reject();
          }
          return deferred.promise;
        };
      }
    ])
    .run(["$rootScope", "$window", "zendesk",
      function ($rootScope, $window, zendesk) {
        $rootScope.$on("risevision.user.authorized", function () {
          zendesk.showWidget();
        });

        $rootScope.$on("risevision.user.signedOut", function () {
          zendesk.logout();
        });

        $rootScope.$on("$stateChangeStart", function () {
          zendesk.ensureScript();
          zendesk.enableSuggestions();
        });

        $rootScope.$on("$stateChangeSuccess", function (event, toState) {
          var $element = $(".zEWidget-launcher");

          if (toState && toState.name.indexOf("apps.editor.workspace") >= 0) {
            $element.css("bottom", "40px");
          } else {
            $element.css("bottom", "0px");
          }
        });
      }
    ]);
})(angular);
