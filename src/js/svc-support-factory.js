"use strict";

angular.module("risevision.common.support", [
  "risevision.widget.common.subscription-status"
])
  .factory("supportFactory", ["getSubscriptionStatus", "$q",
    "subscriptionStatusService",
    "SUPPORT_PRODUCT_CODE", "STORE_SERVER_URL", "userState",
    "$modal", "$templateCache", "$window", "segmentAnalytics",
    "zendesk", "$log",
    function (getSubscriptionStatus, $q, subscriptionStatusService,
      SUPPORT_PRODUCT_CODE,
      STORE_SERVER_URL, userState,
      $modal, $templateCache, $window, segmentAnalytics,
      zendesk, $log) {
      var factory = {};
      var PREMIUM_PLAN = "Premium";
      var BASIC_PLAN = "Free";
      factory.handlePrioritySupportAction = function () {
        _isSubscribed().then(function () {
          factory.openZendeskForm();
        }, function (subscriptionStatus) {
          _openSupportModal(subscriptionStatus);
        });
      };

      var _isSubscribed = function () {
        var deferred = $q.defer();
        getSubscriptionStatus().then(function (subscriptionStatus) {
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
            "subscribed") {
            _sendUserPlanUpdateToIntercom(PREMIUM_PLAN);
            deferred.resolve(subscriptionStatus);

          }
        }, function (err) {
          $log.debug("Could not retrieve a subscription status", err);
          deferred.reject();
        });

        return deferred.promise;
      };

      var _sendUserPlanUpdateToIntercom = function (plan) {
        segmentAnalytics.identify(userState.getUsername(), {
          "plan": plan
        });
      };

      var _openSupportModal = function (subscriptionStatus) {
        $log.debug("opening support trial popup");
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

      factory.openZendeskForm = function () {
        zendesk.showWidget();
      };

      factory.handleSendUsANote = function () {
        _isSubscribed().then(function (subscriptionStatus) {
          _openSendUsANote(subscriptionStatus);
        }, function (subscriptionStatus) {
          _openSendUsANote(subscriptionStatus);
        });
      };

      var _openSendUsANote = function (subscriptionStatus) {
        $log.debug("opening send us a note popup");
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
  ])
  .factory("getSubscriptionStatus", ["SUPPORT_PRODUCT_CODE", "userState", "$q",
    "subscriptionStatusService", "$log",
    function (SUPPORT_PRODUCT_CODE, userState, $q, subscriptionStatusService,
      $log) {
      return function getSubscriptionStatus() {
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
  ]);
