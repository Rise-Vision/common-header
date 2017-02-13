"use strict";

angular.module("risevision.common.support", [
  "risevision.widget.common.subscription-status"
])
  .factory("supportFactory", ["$q", "subscriptionStatusService",
    "SUPPORT_PRODUCT_CODE", "STORE_SERVER_URL", "userState",
    "$modal", "$templateCache", "$http", "$window", "segmentAnalytics",
    function ($q, subscriptionStatusService, SUPPORT_PRODUCT_CODE,
      STORE_SERVER_URL, userState,
      $modal, $templateCache, $http, $window, segmentAnalytics) {
      var factory = {};
      var PREMIUM_PLAN = "Premium";
      var TRIAL_PLAN = "Trial";
      var BASIC_PLAN = "Free";

      factory.handlePrioritySupportAction = function () {
        _isSubscribed().then(function (subscriptionStatus) {
          if (subscriptionStatus.statusCode ===
            "on-trial") {
            _openSupportTrial(subscriptionStatus);
          }
          factory.openIntercomChat();
        }, function (subscriptionStatus) {
          _openSupportTrial(subscriptionStatus);
        });
      };

      var _isSubscribed = function () {
        var deferred = $q.defer();
        _getSubscriptionStatus().then(function (subscriptionStatus) {
          if (subscriptionStatus && (subscriptionStatus.statusCode ===
            "not-subscribed" || subscriptionStatus.statusCode ===
            "cancelled" || subscriptionStatus.statusCode ===
            "suspended" || subscriptionStatus.statusCode ===
            "trial-expired" || subscriptionStatus.statusCode ===
            "trial-available")) {
            _sendUserPlanUpdateToIntercom(BASIC_PLAN);
            deferred.reject(subscriptionStatus);
          }

          if (subscriptionStatus.statusCode ===
            "on-trial") {
            _sendUserPlanUpdateToIntercom(TRIAL_PLAN);
            deferred.resolve(subscriptionStatus);
          }

          if (subscriptionStatus.statusCode ===
            "subscribed") {
            _sendUserPlanUpdateToIntercom(PREMIUM_PLAN);
            deferred.resolve(subscriptionStatus);

          }
        }, function (err) {
          console.debug("Could not retrieve a subscription status", err);
          deferred.reject();
        });

        return deferred.promise;
      };

      var _sendUserPlanUpdateToIntercom = function (plan) {
        segmentAnalytics.identify(userState.getUsername(), {
          "plan": plan
        });
      };

      var _getSubscriptionStatus = function () {
        var deferred = $q.defer();
        if (SUPPORT_PRODUCT_CODE && userState.getSelectedCompanyId()) {
          subscriptionStatusService.get(SUPPORT_PRODUCT_CODE, userState.getSelectedCompanyId())
            .then(function (subscriptionStatus) {
                console.debug("subscriptionStatus", subscriptionStatus);
                deferred.resolve(subscriptionStatus);
              },
              function (err) {
                console.debug("Could not retrieve a subscription status",
                  err);
                deferred.reject(err);
              });
        } else {
          deferred.reject();
        }
        return deferred.promise;
      };

      factory.getSubscriptionStatus = _getSubscriptionStatus;

      var _openSupportTrial = function (subscriptionStatus) {
        console.debug("opening support trial popup");
        $modal.open({
          template: $templateCache.get("help-priority-support-modal.html"),
          controller: "HelpPrioritySupportModalCtrl",
          resolve: {
            subscriptionStatus: function () {
              return subscriptionStatus;
            }
          }
        });
      };

      factory.openIntercomChat = function () {
        console.debug("opening intercom chat");
        $window.Intercom("showNewMessage");
      };

      factory.initiateTrial = function () {
        var SUBSCRIPTION_AUTH_URL = STORE_SERVER_URL +
          "/v1/widget/auth?pc=" +
          SUPPORT_PRODUCT_CODE + "&cid=" + userState.getSelectedCompanyId();
        var deferred = $q.defer();

        $http.get(SUBSCRIPTION_AUTH_URL).then(function () {
          console.debug("Subscription trial star2ted");
          factory.handlePrioritySupportAction();
          deferred.resolve();
        }, function (err) {
          console.debug("Could not call the subscription start trial", err);
          deferred.reject();
        });

        return deferred.promise;
      };

      factory.handleSendUsANote = function () {
        _isSubscribed().then(function (subscriptionStatus) {
          _openSendUsANote(subscriptionStatus);
        }, function (subscriptionStatus) {
          _openSendUsANote(subscriptionStatus);
        });
      };

      var _openSendUsANote = function (subscriptionStatus) {
        console.debug("opening send us a note popup");
        $modal.open({
          template: $templateCache.get("help-send-us-a-note-modal.html"),
          controller: "HelpSendUsANoteModalCtrl",
          resolve: {
            subscriptionStatus: function () {
              return subscriptionStatus;
            }
          }
        });
      };


      return factory;
    }
  ]);
