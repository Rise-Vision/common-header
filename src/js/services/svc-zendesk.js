/* jshint maxlen: false */

(function (angular) {
  "use strict";

  angular.module("risevision.common.support")

  .factory("zendesk", ["getSubscriptionStatus", "segmentAnalytics",
    "userState",
    "$window", "$q", "$location", "$log",
    function (getSubscriptionStatus, segmentAnalytics, userState,
      $window,
      $q,
      $location, $log) {

      var loaded = false;
      var $ = $window.$;

      var cancelDomMonitor;

      function ensureScript() {
        if (!loaded) {
          $window.zESettings = {
            webWidget: {

              helpCenter: {
                title: {
                  "*": "Let's Find You an Answer"
                },
                searchPlaceholder: {
                  "*": "Let's find you an answer"
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

          var deferred = $q.defer();
          var script =
            /* jshint quotmark: single */
            'window.zE||(function(e,t,s){var n=window.zE=window.zEmbed=function(){n._.push(arguments)},a=n.s=e.createElement(t),r=e.getElementsByTagName(t)[0];n.set=function(e){n.set._.push(e)},n._=[],n.set._=[],a.async=true,a.setAttribute("charset","utf-8"),a.src="https://static.zdassets.com/ekr/asset_composer.js?key="+s,n.t=+new Date,a.type="text/javascript",r.parentNode.insertBefore(a,r)})(document,"script","b8d6bdba-10ea-4b88-b96c-9d3905b85d8f");';
          /* jshint quotmark: double */

          var scriptElem = $window.document.createElement("script");
          scriptElem.innerText = script;

          $window.document.body.appendChild(scriptElem);
          loaded = true;
          $window.zE(function () {
            $window.zE.hide();
            deferred.resolve();
          });

          return deferred.promise;
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

          getSubscriptionStatus().then(function (
            subscriptionStatus) {

            if (subscriptionStatus && subscriptionStatus.statusCode ===
              "subscribed") {
              // append priority support flag
              $location.search("cHJpb3JpdHktc3VwcG9ydA", 1);
            } else {
              // clear priority support flag
              $location.search("cHJpb3JpdHktc3VwcG9ydA", null);
            }
            segmentAnalytics.identify(username, properties);
            deferred.resolve();
          }).catch(deferred.reject);

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

      function showSendNote() {
        return ensureScript()
          .then(_identify)
          .then(function () {
            // append send-a-note flag
            $location.search("c2VuZC11cy1hLW5vdGU", 1);
            // clear priority support flag
            $location.search("cHJpb3JpdHktc3VwcG9ydA", null);
          })
          .then(_activate);
      }

      function _activate() {
        var username = userState.getUsername();
        var identity = {
          email: username,
        };

        $window.zE.identify(identity);

        _startDomMonitor();

        $window.zE.activate();
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
            var iframe = $(
              "iframe.zEWidget-webWidget--active");
            if (iframe && iframe.contents) {
              // automatically fill in rise vision username
              var rvUsernameInput = iframe.contents().find(
                "input[name=email]");
              if (rvUsernameInput && rvUsernameInput.length > 0) {
                rvUsernameInput.val(username);
                rvUsernameInput.prop("disabled", true);
                rvUsernameInput.parents("label").parent().hide();
              }

              var rvCompanyInput = iframe.contents().find(
                "input[name=24893323]");
              if (rvCompanyInput && rvCompanyInput.length > 0) {
                getSubscriptionStatus().then(function (
                  subscriptionStatus) {
                  var prioritySupport = false;
                  $log.info("Subscription status is",
                    subscriptionStatus);
                  if (subscriptionStatus && subscriptionStatus.statusCode ===
                    "subscribed") {
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
                rvCompanyInput.parents(
                  "label").parent().hide();

                $log.debug("ZD form found!");
                clearInterval(
                  cancelDomMonitor);
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

      return {
        ensureScript: ensureScript,
        showWidget: showWidget,
        showSendNote: showSendNote,
        forceCloseAll: forceCloseAll,
      };

    }
  ]).run(["$rootScope", "zendesk",
    function ($rootScope, zendesk) {
      $rootScope.$on("$stateChangeSuccess", function () {
        zendesk.forceCloseAll();
      });
    }
  ]);
})(angular);
