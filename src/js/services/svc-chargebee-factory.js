"use strict";

angular.module("risevision.store.services")
  .factory("getChargebeeInstance", ["$q", "$window", "storeService", "userState",
    "CHARGEBEE_TEST_SITE", "CHARGEBEE_PROD_SITE",
    function ($q, $window, storeService, userState, CHARGEBEE_TEST_SITE, CHARGEBEE_PROD_SITE) {
      var currentCompanyId = null;
      var currentInstance = null;
      var currentSessionExpiration = 0;

      function _isSessionExpired() {
        // Leaves a 1 minute buffer to avoid expiration on call
        return currentSessionExpiration - Date.now() < 60000;
      }

      function _createChargebeeInstance(session) {
        var cbInstance = {};

        cbInstance.instance = $window.Chargebee.init({
          site: userState.isTestCompanySelected() ? CHARGEBEE_TEST_SITE : CHARGEBEE_PROD_SITE
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
              // Chargebee expiration fields are expressed in seconds, while Date.now() is in milliseconds
              var sessionDuration = (Number(session.expires_at) - Number(session.created_at)) * 1000;
              currentSessionExpiration = Date.now() + sessionDuration;

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
  .factory("chargebeeFactory", ["$window", "$log", "getChargebeeInstance", "plansFactory",
    function ($window, $log, getChargebeeInstance, plansFactory) {
      var factory = {};

      function _getChargebeePortal(companyId) {
        return getChargebeeInstance(companyId)
          .then(function (instance) {
            return instance.portal;
          });
      }

      function _handleChargebeeAccountNotFound(err, companyId) {
        if (err.status === 404) {
          plansFactory.showPlansModal();
        } else {
          // What should we do when an unexpected error happens?
          console.log("Failed to retrieve session for companyId", companyId, err);
        }
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
        })
          .catch(function (err) {
            _handleChargebeeAccountNotFound(err, companyId);
          });
      };

      factory.openAccountDetails = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().ACCOUNT_DETAILS
          });
        })
          .catch(function (err) {
            _handleChargebeeAccountNotFound(err, companyId);
          });
      };

      factory.openAddress = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().ADDRESS
          });
        })
          .catch(function (err) {
            _handleChargebeeAccountNotFound(err, companyId);
          });
      };

      factory.openBillingHistory = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().BILLING_HISTORY
          });
        })
          .catch(function (err) {
            _handleChargebeeAccountNotFound(err, companyId);
          });
      };

      factory.openPaymentSources = function (companyId) {
        _getChargebeePortal(companyId).then(function (portal) {
          portal.openSection({
            sectionType: $window.Chargebee.getPortalSections().PAYMENT_SOURCES
          });
        })
          .catch(function (err) {
            _handleChargebeeAccountNotFound(err, companyId);
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
        })
          .catch(function (err) {
            _handleChargebeeAccountNotFound(err, companyId);
          });
      };

      return factory;
    }
  ]);
