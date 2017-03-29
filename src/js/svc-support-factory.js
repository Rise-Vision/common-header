"use strict";

angular.module("risevision.common.support", [
  "risevision.widget.common.subscription-status"
])
  .factory("supportFactory", ["getSubscriptionStatus", "$q",
    "SUPPORT_PRODUCT_CODE", "STORE_SERVER_URL", "userState",
    "$modal", "$templateCache", "$window", "segmentAnalytics",
    "zendesk", "$log",
    function (getSubscriptionStatus, $q, SUPPORT_PRODUCT_CODE,
      STORE_SERVER_URL, userState, $modal, $templateCache,
      $window, segmentAnalytics, zendesk, $log) {
      var factory = {};
      var PREMIUM_PLAN = "Premium";
      var BASIC_PLAN = "Free";

      factory.handleGetSupportAction = function () {
        _isSubscribed().then(function subscribed () {
          factory.openZendeskForm();
        }, function notSubscribed () {
          _openSendUsANote();
        });
      };

      var _isSubscribed = function () {
        var deferred = $q.defer();
        getSubscriptionStatus().then(function (subscriptionStatus) {
          if (subscriptionStatus.statusCode ===
            "subscribed") {
            _sendUserPlanUpdateToIntercom(PREMIUM_PLAN);
            deferred.resolve(subscriptionStatus);
          } else {
            _sendUserPlanUpdateToIntercom(BASIC_PLAN);
            deferred.reject(subscriptionStatus);
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

      factory.openZendeskForm = function () {
        zendesk.showWidget();
      };

      var _openSendUsANote = function () {
        $log.debug("opening send us a note popup");
        $modal.open({
          template: $templateCache.get("help-send-us-a-note-modal.html"),
          controller: "HelpSendUsANoteModalCtrl",
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
