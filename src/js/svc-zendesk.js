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
                  "*": "Find you an answer"
                },
                messageButton: {
                  "*": "Open Support Ticket"
                }
              },

              chat: {
                suppress: true
              },

              contactForm: {
                title: {
                  "*": "Concact Us"
                },
                messageButton: {
                  "*": "Open Support Ticket"
                }
              }
            }
          };

          var deferred = $q.defer();
          var script =
            /* jshint quotmark: single */
            'window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement(\"iframe\");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src=\"javascript:false\",r.title=\"\",r.role=\"presentation\",(r.frameElement||r).style.cssText=\"display: none\",d=document.getElementsByTagName(\"script\"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src=\'javascript:var d=document.open();d.domain=\"\'+n+\'\";void(0);\',o=s}o.open()._l=function(){var o=this.createElement(\"script\");n&&(this.domain=n),o.id=\"js-iframe-async\",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write(\'<body onload=\"document._l();\">\'),o.close()}(\"https://assets.zendesk.com/embeddable_framework/main.js\",\"risevision.zendesk.com\");';
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
                rvUsernameInput.parents("label").first().parent().hide();
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
                  "label").first().parent().hide();

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
