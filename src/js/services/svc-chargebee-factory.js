"use strict";

angular.module("risevision.store.services")
  .factory("getChargebeeInstance", ["$q", "$window", "storeService",
    function ($q, $window, storeService) {
      var currentCompanyId = null;
      var currentInstance = null;
      var currentSessionExpiration = 0;

      function _isSessionExpired() {
        return currentSessionExpiration - Date.now() < 10000;
      }

      function _createChargebeeInstance(session) {
        var cbInstance = {};

        cbInstance.instance = $window.Chargebee.init({
          site: "risevision-test"
        });
        cbInstance.instance.logout();
        cbInstance.instance.setPortalSession(function () {
          return $q.resolve(session);
        });
        cbInstance.portal = cbInstance.instance.createChargebeePortal();

        return cbInstance;
      }

      return function (companyId) {
        if (currentCompanyId === companyId && !_isSessionExpired()) {
          return $q.resolve(currentInstance);
        } else {
          var deferred = $q.defer();

          storeService.createSession(companyId)
            .then(function (session) {
              console.log("Chargebee session for companyId", companyId, "is", session);

              currentInstance = _createChargebeeInstance(session);
              currentCompanyId = companyId;
              currentSessionExpiration = Number(session.expires_at);

              deferred.resolve(currentInstance);
            })
            .catch(function (err) {
              console.log("Error creating Customer Portal session for company id", companyId, err);
              deferred.reject(err);
            });

          return deferred.promise;
        }
      };
    }
  ])
  .factory("chargebeeFactory", ["$window", "$log", "getChargebeeInstance",
    function ($window, $log, getChargebeeInstance) {
      var factory = {};

      function _getChargebeePortal(companyId) {
        return getChargebeeInstance(companyId)
          .then(function (instance) {
            return instance.portal;
          });
      }

      factory.openPortal = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.open({
            loaded: function () {
              $log.debug("Chargebee loaded event");
            },
            close: function () {
              $log.debug("Chargebee close event");
            },
            visit: function (sectionName) {
              $log.debug("Chargebee visit event", sectionName);
            },
            paymentSourceAdd: function () {
              $log.debug("Chargebee paymentSourceAdd event");
            },
            paymentSourceUpdate: function () {
              $log.debug("Chargebee paymentSourceUpdate event");
            },
            paymentSourceRemove: function () {
              $log.debug("Chargebee paymentSourceRemove event");
            },
            subscriptionChanged: function (data) {
              $log.debug("Chargebee subscriptionChanged event", data);
            },
            subscriptionCancelled: function (data) {
              $log.debug("Chargebee subscrpitionCancelled event", data);
            }
          });
        });
      };

      factory.openAccountDetails = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().ACCOUNT_DETAILS
          });
        });
      };

      factory.openAddress = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().ADDRESS
          });
        });
      };

      factory.openBillingHistory = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().BILLING_HISTORY
          });
        });
      };

      factory.openPaymentSources = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().PAYMENT_SOURCES
          });
        });
      };

      factory.openSubscriptionDetails = function (companyId, subscriptionId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().SUBSCRIPTION_DETAILS,
            params: {
              subscriptionId: subscriptionId
            }
          });
        });
      };

      return factory;
    }
  ]);
