"use strict";

angular.module("risevision.store.services")
  .factory("chargebeeInstance", ["$rootScope", "$q", "storeService", "userState",
    function ($rootScope, $q, storeService, userState) {
      var factory = {
        instance: null,
        portal: null
      };

      Chargebee.init({
        site: "risevision-test"
      });

      factory.instance = Chargebee.getInstance();

      $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
        console.log("Loading Chargebee Portal session");

        storeService.createSession(userState.getSelectedCompanyId())
          .then(function (session) {
            console.log("Chargebee session is", session);

            return factory.instance.setPortalSession(function () {
              return $q.resolve(session);
            });
          })
          .then(function () {
            factory.portal = factory.instance.createChargebeePortal();
          })
          .catch(function (err) {
            console.log("Error creating Customer Portal session", err);
          });
      });

      return factory;
    }
  ])
  .factory("chargebeeFactory", ["$log", "chargebeeInstance",
    function ($log, chargebeeInstance) {
      var factory = {};

      factory.openPortal = function () {
        chargebeeInstance.portal.open({
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
      };

      factory.openAccountDetails = function () {
        chargebeeInstance.portal.openSection({
          sectionType: Chargebee.getPortalSections().ACCOUNT_DETAILS
        });
      };

      factory.openAddress = function () {
        chargebeeInstance.portal.openSection({
          sectionType: Chargebee.getPortalSections().ADDRESS
        });
      };

      factory.openBillingHistory = function () {
        chargebeeInstance.portal.openSection({
          sectionType: Chargebee.getPortalSections().BILLING_HISTORY
        });
      };

      factory.openPaymentSources = function () {
        chargebeeInstance.portal.openSection({
          sectionType: Chargebee.getPortalSections().PAYMENT_SOURCES
        });
      };

      factory.openSubscriptionDetails = function (subscriptionId) {
        chargebeeInstance.portal.openSection({
          sectionType: Chargebee.getPortalSections().SUBSCRIPTION_DETAILS,
          params: {
            subscriptionId: subscriptionId
          }
        });
      };

      return factory;
    }
  ]);
