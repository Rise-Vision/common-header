/* jshint maxlen: false */

(function (angular) {
  "use strict";

  angular.module("risevision.common.components.zendesk", [
    "risevision.common.components.userstate",
    "risevision.common.components.analytics",
    "risevision.common.support",
  ])

  .factory("zendesk", ["supportFactory", "segmentAnalytics", "userState",
    "$window", "$q", "$location",
    function (supportFactory, segmentAnalytics, userState, $window, $q,
      $location) {

      var loaded = false;

      function ensureScript() {
        if (!loaded) {
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
          var profile = userState.getCopyOfProfile();
          var properties = {
            email: userState.getUserEmail(),
            firstName: profile.firstName,
            lastName: profile.lastName,
            isPrioritySupport: false,
          };

          var orgProperties = {
            name: userState.getUserCompanyName(),
            companyId: userState.getUserCompanyId(),
          };

          supportFactory.getSubscriptionStatus().then(function (
            subscriptionStatus) {
            segmentAnalytics.identify(username, properties);

            if (subscriptionStatus && subscriptionStatus.statusCode ===
              "subscribed") {
              orgProperties.prioritySupport = true;
            } else {
              orgProperties.prioritySupport = false;
            }

            segmentAnalytics.group(userState.getUserCompanyId(),
              orgProperties);

            deferred.resolve();
          });

        });
        return deferred.promise;
      }

      function showWidget() {
        return ensureScript()
          .then(_identify)
          .then(function () {
            $window.zE.activate();
          });
      }

      function showSendNote() {
        return ensureScript()
          .then(_identify)
          .then(function () {
            $location.search("zdJustANote", 1);
          })
          .then(function () {
            $window.zE.activate();
          });
      }

      return {
        ensureScript: ensureScript,
        showWidget: showWidget,
        showSendNote: showSendNote,
      };

    }
  ]);
})(angular);
