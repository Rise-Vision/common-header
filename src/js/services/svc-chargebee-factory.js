"use strict";

angular.module("risevision.store.services")
  .factory("getChargebeeInstance", ["$q", "storeService",
    function ($q, storeService) {
      var sessions = {}; // Sessions keyed by companyId
      var currentCompanyId = null;
      var currentInstance = null;

      function _createChargebeeInstance(companyId) {
        if (currentCompanyId !== companyId) {
          var cbInstance = {};

          cbInstance.instance = Chargebee.init({
            site: "risevision-test"
          });
          cbInstance.instance.logout();
          cbInstance.instance.setPortalSession(function () {
            return $q.resolve(sessions[companyId]);
          });
          cbInstance.portal = cbInstance.instance.createChargebeePortal();

          currentCompanyId = companyId;
          currentInstance = cbInstance;
        }

        return currentInstance;
      }

      return function (companyId) {
        if (sessions[companyId]) {
          return $q.resolve(_createChargebeeInstance(companyId));
        } else {
          var deferred = $q.defer();

          storeService.createSession(companyId)
            .then(function (session) {
              console.log("Chargebee session for companyId", companyId, "is", session);

              sessions[companyId] = session;
              deferred.resolve(_createChargebeeInstance(companyId));
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
  .factory("getChargebeePortal", ["userState", "getChargebeeInstance",
    function (userState, getChargebeeInstance) {
      return function (companyId) {
        return getChargebeeInstance(companyId || userState.getSelectedCompanyId())
          .then(function (instance) {
            return instance.portal;
          });
      };
    }
  ])
  .factory("chargebeeFactory", ["$log", "getChargebeePortal",
    function ($log, getChargebeePortal) {
      var factory = {};

      factory.openPortal = function (companyId) {
        getChargebeePortal(companyId).then(function (portal) {
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
        getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: Chargebee.getPortalSections().ACCOUNT_DETAILS
          });
        });
      };

      factory.openAddress = function (companyId) {
        getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: Chargebee.getPortalSections().ADDRESS
          });
        });
      };

      factory.openBillingHistory = function (companyId) {
        getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: Chargebee.getPortalSections().BILLING_HISTORY
          });
        });
      };

      factory.openPaymentSources = function (companyId) {
        getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: Chargebee.getPortalSections().PAYMENT_SOURCES
          });
        });
      };

      factory.openSubscriptionDetails = function (companyId, subscriptionId) {
        getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: Chargebee.getPortalSections().SUBSCRIPTION_DETAILS,
            params: {
              subscriptionId: subscriptionId
            }
          });
        });
      };

      return factory;
    }
  ]);
