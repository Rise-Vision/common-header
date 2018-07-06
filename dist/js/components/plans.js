"use strict";

angular.module("risevision.common.components.plans.services", [
  "risevision.store.authorization",
  "risevision.common.gapi",
  "risevision.common.currency"
]);

angular.module("risevision.common.components.plans", [
  "risevision.common.components.plans.services",
  "risevision.common.components.scrolling-list",
  "risevision.common.components.loading",
  "ui.bootstrap"
]);

(function (angular) {
  "use strict";


  angular.module("risevision.common.currency", [
    "risevision.common.gapi"
  ])

  .factory("currencyService", ["$q", "storeAPILoader", "$log",
    function ($q, storeAPILoader, $log) {

      var deferred = null;
      var currency = {
        defaultItem: null
      };

      var CurrencyItem = function (obj) {
        this.country = obj.country;
        this.currencyCode = obj.currencyCode;
        this.description = obj.description;
        this.bankAccountCode = obj.bankAccountCode;
        this.bankAccountDescription = obj.bankAccountDescription;

        this.getName = function () {
          return this.currencyCode.toUpperCase();
        };

        this.pickPrice = function (priceUSD, priceCAD) {
          switch (this.currencyCode.toUpperCase()) {
          case "CAD":
            return priceCAD;
          default:
            return priceUSD;
          }
        };
      };

      currency.getByCountry = function (country) {
        if (country) {
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].country && this.items[i].country.toUpperCase() ===
              country.toUpperCase()) {
              return this.items[i];
            }
          }
        }
        return this.defaultItem;
      };

      currency.setItems = function (newItems) {
        this.items = [];
        //set default currency
        for (var i = 0; i < newItems.length; i++) {
          var ci = new CurrencyItem(newItems[i]);
          this.items.push(ci);
          if (!ci.country) {
            this.defaultItem = ci;
          }
        }
      };

      return function () {

        if (deferred !== null) {
          return deferred.promise;
        }

        deferred = $q.defer();

        $log.debug("currencyService called");
        storeAPILoader().then(function (storeAPI) {
          var request = storeAPI.currency.list();
          request.execute(function (resp) {
            $log.debug("currencyService resp", resp);
            if (!resp.error) {
              currency.setItems(resp.items);
              deferred.resolve(currency);
            } else {
              console.error("currencyService error: ", resp.error);
              deferred.reject(resp.error);
            }
          });
        });

        return deferred.promise;
      };

    }
  ]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .factory("currentPlanFactory", ["$log", "$rootScope", "userState", "PLANS_LIST",
      function ($log, $rootScope, userState, PLANS_LIST) {
        var _factory = {};
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "productCode");

        var _loadCurrentPlan = function () {
          var company = userState.getCopyOfSelectedCompany();
          var plan = null;

          if (company.id && company.planProductCode) {
            plan = _.cloneDeep(_plansByCode[company.planProductCode]);
            plan.status = company.planSubscriptionStatus;
            plan.trialPeriod = company.planTrialPeriod;
            plan.proStatus = company.playerProSubscriptionStatus;
            plan.planPlayerProLicenseCount = company.planPlayerProLicenseCount;
            plan.playerProLicenseCount = company.playerProLicenseCount;
          } else {
            plan = _.cloneDeep(_plansByType.free);
          }

          _factory.currentPlan = plan;
          $log.debug("Current plan", plan);
          $rootScope.$emit("risevision.plan.loaded", plan);
        };

        _factory.isPlanActive = function () {
          return _factory.isSubscribed() || _factory.isOnTrial();
        };

        _factory.isFree = function () {
          return _factory.currentPlan.type === "free";
        };

        _factory.isEnterpriseSubCompany = function () {
          return _factory.currentPlan.type === "enterprisesub";
        };

        _factory.isSubscribed = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Active";
        };

        _factory.isOnTrial = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Trial";
        };

        _factory.isTrialExpired = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Trial Expired";
        };

        _factory.isSuspended = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Suspended";
        };

        _factory.isCancelled = function () {
          return !_factory.isFree() && _factory.currentPlan.status === "Cancelled";
        };

        _factory.isProSubscribed = function () {
          return _factory.currentPlan.proStatus === "Active";
        };

        _factory.isProSuspended = function () {
          return _factory.currentPlan.proStatus === "Suspended";
        };

        _loadCurrentPlan();

        $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
          _loadCurrentPlan();
        });

        $rootScope.$on("risevision.company.updated", function () {
          _loadCurrentPlan();
        });

        return _factory;
      }
    ]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .value("PLANS_LIST", [{
      name: "Free",
      type: "free",
      order: 0,
      productId: "000",
      productCode: "000",
      status: "Active",
      proLicenseCount: 0,
      monthly: {
        priceDisplayMonth: 0,
        billAmount: 0,
        save: 0
      },
      yearly: {
        priceDisplayMonth: 0,
        billAmount: 0,
        save: 0
      }
    }, {
      name: "Starter",
      type: "starter",
      order: 1,
      productId: "335",
      productCode: "019137f7bb35f5f90085a033c013672471faadae",
      proLicenseCount: 1,
      monthly: {
        priceDisplayMonth: 10,
        billAmount: 10,
        save: 0
      },
      yearly: {
        priceDisplayMonth: 10,
        billAmount: 110,
        save: 10
      },
      trialPeriod: 14
    }, {
      name: "Basic",
      type: "basic",
      order: 2,
      productId: "289",
      productCode: "40c092161f547f8f72c9f173cd8eebcb9ca5dd25",
      proLicenseCount: 3,
      monthly: {
        priceDisplayMonth: 9,
        billAmount: 27,
        save: 36
      },
      yearly: {
        priceDisplayMonth: 9,
        billAmount: 297,
        save: 63
      },
      trialPeriod: 14
    }, {
      name: "Advanced",
      type: "advanced",
      order: 3,
      productId: "290",
      productCode: "93b5595f0d7e4c04a3baba1102ffaecb17607bf4",
      proLicenseCount: 11,
      monthly: {
        priceDisplayMonth: 8,
        billAmount: 88,
        save: 264
      },
      yearly: {
        priceDisplayMonth: 8,
        billAmount: 968,
        save: 352
      },
      trialPeriod: 14
    }, {
      name: "Enterprise",
      type: "enterprise",
      order: 4,
      productId: "301",
      productCode: "b1844725d63fde197f5125b58b6cba6260ee7a57",
      proLicenseCount: 70,
      monthly: {
        priceDisplayMonth: 7,
        billAmount: 490,
        save: 2520
      },
      yearly: {
        priceDisplayMonth: 7,
        billAmount: 5390,
        save: 3010
      }
    }, {
      name: "Enterprise",
      type: "enterprisesub",
      order: 5,
      productId: "303",
      productCode: "d521f5bfbc1eef109481eebb79831e11c7804ad8",
      proLicenseCount: 0
    }])
    .factory("plansFactory", ["$q", "$log", "$modal", "$templateCache",
      "userState", "subscriptionStatusService", "storeAuthorization", "PLANS_LIST",
      function ($q, $log, $modal, $templateCache, userState,
        subscriptionStatusService, storeAuthorization, PLANS_LIST) {
        var _factory = {};
        var _plansCodesList = _.map(PLANS_LIST, "productCode");
        var _plansByType = _.keyBy(PLANS_LIST, "type");
        var _plansByCode = _.keyBy(PLANS_LIST, "productCode");
        var _plansList = [
          _plansByType.free, _plansByType.starter, _plansByType.basic, _plansByType.advanced, _plansByType.enterprise
        ];

        _factory.showPlansModal = function () {
          $modal.open({
            template: $templateCache.get("plans/plans-modal.html"),
            controller: "PlansModalCtrl",
            size: "lg"
          });
        };

        var _getCompanyPlanStatus = function () {
          $log.debug("getCompanyPlanStatus called.");

          return subscriptionStatusService.list(_plansCodesList.slice(1), userState.getSelectedCompanyId())
            .then(function (resp) {
              $log.debug("getCompanyPlanStatus response.", resp);

              var plansMap = _.keyBy(resp, "pc");

              return plansMap;
            });
        };

        _factory.getPlansDetails = function () {
          var plans = _.cloneDeep(_plansList);

          return _getCompanyPlanStatus()
            .then(function (plansStatusMap) {
              plans.forEach(function (p) {
                var plan = plansStatusMap[p.productCode] || p;
                p.status = plan.status;
                p.statusCode = plan.statusCode;
              });

              return plans;
            })
            .catch(function (err) {
              $log.debug("Failed to load plans", err);
            });
        };

        _factory.startTrial = function (plan) {
          return storeAuthorization.startTrial(plan.productCode)
            .then(function () {
              var selectedCompany = userState.getCopyOfSelectedCompany(true);

              selectedCompany.planProductCode = plan.productCode;
              selectedCompany.planTrialPeriod = plan.trialPeriod;
              selectedCompany.planSubscriptionStatus = "Trial";
              selectedCompany.planPlayerProLicenseCount = _plansByCode[plan.productCode].proLicenseCount;

              userState.updateCompanySettings(selectedCompany);
            })
            .catch(function (err) {
              $log.debug("Failed to start trial", err);

              throw err;
            });
        };

        _factory.startBasicPlanTrial = function () {
          return _factory.startTrial(_plansByType.basic);
        };

        return _factory;
      }
    ]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.plans")
    .factory("playerLicenseFactory", ["userState", "currentPlanFactory",
      function (userState, currentPlanFactory) {
        var _factory = {};

        _factory.hasProfessionalLicenses = function () {
          return currentPlanFactory.isPlanActive() || currentPlanFactory.isProSubscribed();
        };

        _factory.getProLicenseCount = function () {
          var planProLicenses = (currentPlanFactory.isPlanActive() && currentPlanFactory.currentPlan.planPlayerProLicenseCount) ||
            0;
          var extraProLicenses = (currentPlanFactory.isProSubscribed() && currentPlanFactory.currentPlan.playerProLicenseCount) ||
            0;

          return planProLicenses + extraProLicenses;
        };

        _factory.areAllProLicensesUsed = function () {
          var company = userState.getCopyOfSelectedCompany();
          var maxProDisplays = _factory.getProLicenseCount();
          var assignedDisplays = company.playerProAssignedDisplays || [];

          return assignedDisplays.length >= maxProDisplays;
        };

        _factory.toggleDisplayLicenseLocal = function (displayId, playerProAuthorized) {
          var company = userState.getCopyOfSelectedCompany(true);
          var assignedDisplays = company.playerProAssignedDisplays || [];

          if (playerProAuthorized && assignedDisplays.indexOf(displayId) === -1) {
            assignedDisplays.push(displayId);
          } else if (!playerProAuthorized && assignedDisplays.indexOf(displayId) >= 0) {
            assignedDisplays.splice(assignedDisplays.indexOf(displayId), 1);
          }

          company.playerProAssignedDisplays = assignedDisplays;
          userState.updateCompanySettings(company);
        };

        return _factory;
      }
    ]);

})(angular);

angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$loading", "$timeout",
  "plansFactory", "currentPlanFactory", "userState",
  function ($scope, $rootScope, $modalInstance, $log, $loading, $timeout,
    plansFactory, currentPlanFactory, userState) {

    $scope.currentPlan = currentPlanFactory.currentPlan;
    $scope.startTrialError = null;
    $scope.monthlyPrices = true;

    function _getPlansDetails() {
      $loading.start("plans-modal");

      return plansFactory.getPlansDetails()
        .then(function (resp) {
          $scope.plans = resp;
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    }

    $scope.isCurrentPlan = function (plan) {
      return $scope.currentPlan.type === plan.type;
    };

    $scope.isCurrentPlanSubscribed = function (plan) {
      return $scope.isCurrentPlan(plan) && $scope.isSubscribed(plan);
    };

    $scope.isOnTrial = function (plan) {
      return plan.statusCode === "on-trial";
    };

    $scope.isTrialAvailable = function (plan) {
      return plan.statusCode === "trial-available";
    };

    $scope.isTrialExpired = function (plan) {
      return plan.statusCode === "trial-expired";
    };

    $scope.isSubscribed = function (plan) {
      return plan.status === "Subscribed" || plan.status === "Active";
    };

    $scope.isFree = function (plan) {
      return plan.type === "free";
    };

    $scope.isStarter = function (plan) {
      return plan.type === "starter";
    };

    $scope.showSavings = function (plan) {
      return !$scope.isFree(plan) && (!$scope.isStarter(plan) || !$scope.monthlyPrices);
    };

    $scope.currentPlanLabelVisible = function (plan) {
      // Has a Plan?
      if (currentPlanFactory.isPlanActive()) {
        // Is it the Current Plan?
        return $scope.isCurrentPlan(plan);
      } else { // Were on Free Plan
        // Is it the Free Plan?
        return $scope.isFree(plan);
      }
    };

    $scope.getVisibleAction = function (plan) {
      // Has a Plan?
      if (currentPlanFactory.isPlanActive()) {
        // Is this that Plan?
        if ($scope.isCurrentPlan(plan)) {
          // Can buy Subscription?
          if ($scope.isOnTrial(plan)) {
            return "subscribe";
          } else {
            return "";
          }
        } else { // This is a different Plan
          // Is lower Plan?
          if ($scope.currentPlan.order > plan.order) {
            return "downgrade";
          } else { // Higher Plan
            return "subscribe";
          }
        }
      } else { // Were on Free Plan
        // Is there a Trial?
        if ($scope.isFree(plan)) {
          return "";
        } else if ($scope.isTrialAvailable(plan)) {
          return "start-trial";
        } else { // Subscribe
          return "subscribe";
        }
      }
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      plansFactory.startTrial(plan)
        .then(function () {
          return $timeout(5000)
            .then(function () {
              return userState.reloadSelectedCompany();
            })
            .then(function () {
              $rootScope.$emit("risevision.company.trial.started");
            })
            .catch(function (err) {
              $log.debug("Failed to reload company", err);
            })
            .finally(function () {
              $modalInstance.close(plan);
            });
        })
        .catch(function (err) {
          $scope.startTrialError = err;
        })
        .finally(function () {
          $loading.stop("plans-modal");
        });
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.init = function () {
      _getPlansDetails();
    };

    $scope.init();
  }

]);

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-billing-address-error.html',
    '<div id="content-two-error" class="prototype-show" style="display: none;"><form id="billingAddressForm" role="form" name="forms.billingAddressForm" novalidate=""><div class="alert alert-danger">Please complete all required fields below.</div><div class="row"><div class="col-md-6"><div class="form-group has-error has-error"><label class="control-label">First Name</label> <input type="text" class="form-control"></div></div><div class="col-md-6"><div class="form-group has-error has-error"><label class="control-label">Last Name</label> <input type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group has-error"><label class="control-label">Email</label> <input type="email" class="form-control"></div></div><div class="col-md-6"><div class="form-group has-error"><label class="control-label">Phone</label> <input type="tel" id="phone" name="phone" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="form-control"></div></div></div><div class="form-group has-error"><label class="control-label" for="company-settings-name">Company Name</label> <input id="company-settings-name" type="text" class="form-control" name="company-name"></div><div class="row"><div class="col-md-12"><div class="form-group has-error"><label for="company-settings-street" class="control-label">Address Line 1</label> <input type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-12"><div class="form-group has-error"><label for="company-settings-street" class="control-label">Address Line 2</label> <input type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group has-error"><label for="company-settings-city" class="control-label">City</label> <input id="company-settings-city" type="text" class="form-control" ng-model="company.city"></div></div><div class="col-md-6"><div class="form-group has-error"><label for="company-settings-country" class="control-label">Country</label><select id="company-settings-country" class="form-control selectpicker" empty-select-parser=""><option ng-show="false" value="">&lt; Select Country &gt;</option><option label="Afghanistan" value="string:AF">Afghanistan</option><option label="Albania" value="string:AL">Albania</option><option label="Algeria" value="string:DZ">Algeria</option><option label="American Samoa" value="string:AS">American Samoa</option><option label="Andorra" value="string:AD">Andorra</option><option label="Angola" value="string:AO">Angola</option><option label="Anguilla" value="string:AI">Anguilla</option><option label="Antarctica" value="string:AQ">Antarctica</option><option label="Antigua and Barbuda" value="string:AG">Antigua and Barbuda</option><option label="Argentina" value="string:AR">Argentina</option><option label="Armenia" value="string:AM">Armenia</option><option label="Aruba" value="string:AW">Aruba</option><option label="Australia" value="string:AU">Australia</option><option label="Austria" value="string:AT">Austria</option><option label="Azerbaijan" value="string:AZ">Azerbaijan</option><option label="Bahamas" value="string:BS">Bahamas</option><option label="Bahrain" value="string:BH">Bahrain</option><option label="Bangladesh" value="string:BD">Bangladesh</option><option label="Barbados" value="string:BB">Barbados</option><option label="Belarus" value="string:BY">Belarus</option><option label="Belgium" value="string:BE">Belgium</option><option label="Belize" value="string:BZ">Belize</option><option label="Benin" value="string:BJ">Benin</option><option label="Bermuda" value="string:BM">Bermuda</option><option label="Bhutan" value="string:BT">Bhutan</option><option label="Bolivia" value="string:BO">Bolivia</option><option label="Bonaire, Sint Eustatius and Saba" value="string:BQ">Bonaire, Sint Eustatius and Saba</option><option label="Bosnia and Herzegovina" value="string:BA">Bosnia and Herzegovina</option><option label="Botswana" value="string:BW">Botswana</option><option label="Bouvet Island" value="string:BV">Bouvet Island</option><option label="Brazil" value="string:BR">Brazil</option><option label="British Indian Ocean Territory" value="string:IO">British Indian Ocean Territory</option><option label="British Virgin Islands" value="string:VG">British Virgin Islands</option><option label="Brunei Darussalam" value="string:BN">Brunei Darussalam</option><option label="Bulgaria" value="string:BG">Bulgaria</option><option label="Burkina Faso" value="string:BF">Burkina Faso</option><option label="Burundi" value="string:BI">Burundi</option><option label="Cabo Verde" value="string:CV">Cabo Verde</option><option label="Cambodia" value="string:KH">Cambodia</option><option label="Cameroon" value="string:CM">Cameroon</option><option label="Canada" value="string:CA">Canada</option><option label="Cayman Islands" value="string:KY">Cayman Islands</option><option label="Central African Republic" value="string:CF">Central African Republic</option><option label="Chad" value="string:TD">Chad</option><option label="Chile" value="string:CL">Chile</option><option label="China" value="string:CN">China</option><option label="Christmas Island" value="string:CX">Christmas Island</option><option label="Cocos (Keeling) Islands" value="string:CC">Cocos (Keeling) Islands</option><option label="Colombia" value="string:CO">Colombia</option><option label="Comoros" value="string:KM">Comoros</option><option label="Congo" value="string:CG">Congo</option><option label="Congo, the Democratic Republic of the" value="string:CD">Congo, the Democratic Republic of the</option><option label="Cook Islands" value="string:CK">Cook Islands</option><option label="Costa Rica" value="string:CR">Costa Rica</option><option label="Croatia" value="string:HR">Croatia</option><option label="Cuba" value="string:CU">Cuba</option><option label="Curaçao" value="string:CW">Curaçao</option><option label="Cyprus" value="string:CY">Cyprus</option><option label="Czech Republic" value="string:CZ">Czech Republic</option><option label="Côte d\'Ivoire" value="string:CI">Côte d\'Ivoire</option><option label="Denmark" value="string:DK">Denmark</option><option label="Djibouti" value="string:DJ">Djibouti</option><option label="Dominica" value="string:DM">Dominica</option><option label="Dominican Republic" value="string:DO">Dominican Republic</option><option label="Ecuador" value="string:EC">Ecuador</option><option label="Egypt" value="string:EG">Egypt</option><option label="El Salvador" value="string:SV">El Salvador</option><option label="Equatorial Guinea" value="string:GQ">Equatorial Guinea</option><option label="Eritrea" value="string:ER">Eritrea</option><option label="Estonia" value="string:EE">Estonia</option><option label="Ethiopia" value="string:ET">Ethiopia</option><option label="Falkland Islands (Malvinas)" value="string:FK">Falkland Islands (Malvinas)</option><option label="Faroe Islands" value="string:FO">Faroe Islands</option><option label="Fiji" value="string:FJ">Fiji</option><option label="Finland" value="string:FI">Finland</option><option label="France" value="string:FR">France</option><option label="French Guiana" value="string:GF">French Guiana</option><option label="French Polynesia" value="string:PF">French Polynesia</option><option label="French Southern Territories" value="string:TF">French Southern Territories</option><option label="Gabon" value="string:GA">Gabon</option><option label="Gambia" value="string:GM">Gambia</option><option label="Georgia" value="string:GE">Georgia</option><option label="Germany" value="string:DE">Germany</option><option label="Ghana" value="string:GH">Ghana</option><option label="Gibraltar" value="string:GI">Gibraltar</option><option label="Greece" value="string:GR">Greece</option><option label="Greenland" value="string:GL">Greenland</option><option label="Grenada" value="string:GD">Grenada</option><option label="Guadeloupe" value="string:GP">Guadeloupe</option><option label="Guam" value="string:GU">Guam</option><option label="Guatemala" value="string:GT">Guatemala</option><option label="Guernsey" value="string:GG">Guernsey</option><option label="Guinea" value="string:GN">Guinea</option><option label="Guinea-Bissau" value="string:GW">Guinea-Bissau</option><option label="Guyana" value="string:GY">Guyana</option><option label="Haiti" value="string:HT">Haiti</option><option label="Heard Island and McDonald Islands" value="string:HM">Heard Island and McDonald Islands</option><option label="Holy See (Vatican City State)" value="string:VA">Holy See (Vatican City State)</option><option label="Honduras" value="string:HN">Honduras</option><option label="Hong Kong" value="string:HK">Hong Kong</option><option label="Hungary" value="string:HU">Hungary</option><option label="Iceland" value="string:IS">Iceland</option><option label="India" value="string:IN">India</option><option label="Indonesia" value="string:ID">Indonesia</option><option label="Iran" value="string:IR">Iran</option><option label="Iraq" value="string:IQ">Iraq</option><option label="Ireland" value="string:IE">Ireland</option><option label="Isle of Man" value="string:IM">Isle of Man</option><option label="Israel" value="string:IL">Israel</option><option label="Italy" value="string:IT">Italy</option><option label="Jamaica" value="string:JM">Jamaica</option><option label="Japan" value="string:JP">Japan</option><option label="Jersey" value="string:JE">Jersey</option><option label="Jordan" value="string:JO">Jordan</option><option label="Kazakhstan" value="string:KZ">Kazakhstan</option><option label="Kenya" value="string:KE">Kenya</option><option label="Kiribati" value="string:KI">Kiribati</option><option label="Korea, Democratic People\'s Republic of" value="string:KP">Korea, Democratic People\'s Republic of</option><option label="Korea, Republic of" value="string:KR">Korea, Republic of</option><option label="Kuwait" value="string:KW">Kuwait</option><option label="Kyrgyzstan" value="string:KG">Kyrgyzstan</option><option label="Lao People\'s Democratic Republic" value="string:LA">Lao People\'s Democratic Republic</option><option label="Latvia" value="string:LV">Latvia</option><option label="Lebanon" value="string:LB">Lebanon</option><option label="Lesotho" value="string:LS">Lesotho</option><option label="Liberia" value="string:LR">Liberia</option><option label="Libya" value="string:LY">Libya</option><option label="Liechtenstein" value="string:LI">Liechtenstein</option><option label="Lithuania" value="string:LT">Lithuania</option><option label="Luxembourg" value="string:LU">Luxembourg</option><option label="Macau" value="string:MO">Macau</option><option label="Macedonia, the former Yugoslav Republic of" value="string:MK">Macedonia, the former Yugoslav Republic of</option><option label="Madagascar" value="string:MG">Madagascar</option><option label="Malawi" value="string:MW">Malawi</option><option label="Malaysia" value="string:MY">Malaysia</option><option label="Maldives" value="string:MV">Maldives</option><option label="Mali" value="string:ML">Mali</option><option label="Malta" value="string:MT">Malta</option><option label="Marshall Islands" value="string:MH">Marshall Islands</option><option label="Martinique" value="string:MQ">Martinique</option><option label="Mauritania" value="string:MR">Mauritania</option><option label="Mauritius" value="string:MU">Mauritius</option><option label="Mayotte" value="string:YT">Mayotte</option><option label="Mexico" value="string:MX">Mexico</option><option label="Micronesia" value="string:FM">Micronesia</option><option label="Moldova" value="string:MD">Moldova</option><option label="Monaco" value="string:MC">Monaco</option><option label="Mongolia" value="string:MN">Mongolia</option><option label="Montenegro" value="string:ME">Montenegro</option><option label="Montserrat" value="string:MS">Montserrat</option><option label="Morocco" value="string:MA">Morocco</option><option label="Mozambique" value="string:MZ">Mozambique</option><option label="Myanmar" value="string:MM">Myanmar</option><option label="Namibia" value="string:NA">Namibia</option><option label="Nauru" value="string:NR">Nauru</option><option label="Nepal" value="string:NP">Nepal</option><option label="Netherlands" value="string:NL">Netherlands</option><option label="New Caledonia" value="string:NC">New Caledonia</option><option label="New Zealand" value="string:NZ">New Zealand</option><option label="Nicaragua" value="string:NI">Nicaragua</option><option label="Niger" value="string:NE">Niger</option><option label="Nigeria" value="string:NG">Nigeria</option><option label="Niue" value="string:NU">Niue</option><option label="Norfolk Island" value="string:NF">Norfolk Island</option><option label="Northern Mariana Islands" value="string:MP">Northern Mariana Islands</option><option label="Norway" value="string:NO">Norway</option><option label="Oman" value="string:OM">Oman</option><option label="Pakistan" value="string:PK">Pakistan</option><option label="Palau" value="string:PW">Palau</option><option label="Palestine, State of" value="string:PS">Palestine, State of</option><option label="Panama" value="string:PA">Panama</option><option label="Papua New Guinea" value="string:PG">Papua New Guinea</option><option label="Paraguay" value="string:PY">Paraguay</option><option label="Peru" value="string:PE">Peru</option><option label="Philippines" value="string:PH">Philippines</option><option label="Pitcairn" value="string:PN">Pitcairn</option><option label="Poland" value="string:PL">Poland</option><option label="Portugal" value="string:PT">Portugal</option><option label="Puerto Rico" value="string:PR">Puerto Rico</option><option label="Qatar" value="string:QA">Qatar</option><option label="Reunion" value="string:RE">Reunion</option><option label="Romania" value="string:RO">Romania</option><option label="Russian Federation" value="string:RU">Russian Federation</option><option label="Rwanda" value="string:RW">Rwanda</option><option label="Saint Barthélemy" value="string:BL">Saint Barthélemy</option><option label="Saint Helena, Ascension and Tristan da Cunha" value="string:SH">Saint Helena, Ascension and Tristan da Cunha</option><option label="Saint Kitts and Nevis" value="string:KN">Saint Kitts and Nevis</option><option label="Saint Lucia" value="string:LC">Saint Lucia</option><option label="Saint Martin (French part)" value="string:MF">Saint Martin (French part)</option><option label="Saint Vincent and The Grenadines" value="string:VC">Saint Vincent and The Grenadines</option><option label="Samoa" value="string:WS">Samoa</option><option label="San Marino" value="string:SM">San Marino</option><option label="Sao Tome and Principe" value="string:ST">Sao Tome and Principe</option><option label="Saudi Arabia" value="string:SA">Saudi Arabia</option><option label="Senegal" value="string:SN">Senegal</option><option label="Serbia" value="string:RS">Serbia</option><option label="Seychelles" value="string:SC">Seychelles</option><option label="Sierra Leone" value="string:SL">Sierra Leone</option><option label="Singapore" value="string:SG">Singapore</option><option label="Sint Maarten (Dutch part)" value="string:SX">Sint Maarten (Dutch part)</option><option label="Slovakia" value="string:SK">Slovakia</option><option label="Slovenia" value="string:SI">Slovenia</option><option label="Solomon Islands" value="string:SB">Solomon Islands</option><option label="Somalia" value="string:SO">Somalia</option><option label="South Africa" value="string:ZA">South Africa</option><option label="South Georgia and the South Sandwich Islands" value="string:GS">South Georgia and the South Sandwich Islands</option><option label="South Sudan" value="string:SS">South Sudan</option><option label="Spain" value="string:ES">Spain</option><option label="Sri Lanka" value="string:LK">Sri Lanka</option><option label="St. Pierre and Miquelon" value="string:PM">St. Pierre and Miquelon</option><option label="Sudan" value="string:SD">Sudan</option><option label="Suriname" value="string:SR">Suriname</option><option label="Svalbard and Jan Mayen" value="string:SJ">Svalbard and Jan Mayen</option><option label="Swaziland" value="string:SZ">Swaziland</option><option label="Sweden" value="string:SE">Sweden</option><option label="Switzerland" value="string:CH">Switzerland</option><option label="Syrian Arab Republic" value="string:SY">Syrian Arab Republic</option><option label="Taiwan" value="string:TW">Taiwan</option><option label="Tajikistan" value="string:TJ">Tajikistan</option><option label="Tanzania, United Republic of" value="string:TZ">Tanzania, United Republic of</option><option label="Thailand" value="string:TH">Thailand</option><option label="Timor-Leste" value="string:TL">Timor-Leste</option><option label="Togo" value="string:TG">Togo</option><option label="Tokelau" value="string:TK">Tokelau</option><option label="Tonga" value="string:TO">Tonga</option><option label="Trinidad and Tobago" value="string:TT">Trinidad and Tobago</option><option label="Tunisia" value="string:TN">Tunisia</option><option label="Turkey" value="string:TR">Turkey</option><option label="Turkmenistan" value="string:TM">Turkmenistan</option><option label="Turks and Caicos Islands" value="string:TC">Turks and Caicos Islands</option><option label="Tuvalu" value="string:TV">Tuvalu</option><option label="Uganda" value="string:UG">Uganda</option><option label="Ukraine" value="string:UA">Ukraine</option><option label="United Arab Emirates" value="string:AE">United Arab Emirates</option><option label="United Kingdom" value="string:GB">United Kingdom</option><option label="United States" value="string:US" selected="selected">United States</option><option label="Uruguay" value="string:UY">Uruguay</option><option label="US Minor Outlying Islands" value="string:UM">US Minor Outlying Islands</option><option label="US Virgin Islands" value="string:VI">US Virgin Islands</option><option label="Uzbekistan" value="string:UZ">Uzbekistan</option><option label="Vanuatu" value="string:VU">Vanuatu</option><option label="Venezuela, Bolivarian Republic of" value="string:VE">Venezuela, Bolivarian Republic of</option><option label="Viet Nam" value="string:VN">Viet Nam</option><option label="Wallis and Futuna Islands" value="string:WF">Wallis and Futuna Islands</option><option label="Western Sahara" value="string:EH">Western Sahara</option><option label="Yemen" value="string:YE">Yemen</option><option label="Zambia" value="string:ZM">Zambia</option><option label="Zimbabwe" value="string:ZW">Zimbabwe</option><option label="Åland Islands" value="string:AX">Åland Islands</option></select></div></div><div class="col-md-6"><div class="form-group has-error"><label for="company-settings-state" class="control-label">State/Province/Region</label> <input id="company-settings-state" type="text" class="form-control ng-hide" ng-model="company.province" ng-hide="company.country == \'US\' || company.country == \'CA\'"><select class="form-control selectpicker ng-pristine ng-untouched ng-valid ng-hide ng-not-empty" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsCA" ng-show="company.country == \'CA\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide" selected="selected">&lt; Select Province &gt;</option><option label="Alberta" value="string:AB">Alberta</option><option label="British Columbia" value="string:BC">British Columbia</option><option label="Manitoba" value="string:MB">Manitoba</option><option label="New Brunswick" value="string:NB">New Brunswick</option><option label="Newfoundland and Labrador" value="string:NL">Newfoundland and Labrador</option><option label="Northwest Territories" value="string:NT">Northwest Territories</option><option label="Nova Scotia" value="string:NS">Nova Scotia</option><option label="Nunavut" value="string:NU">Nunavut</option><option label="Ontario" value="string:ON">Ontario</option><option label="Prince Edward Island" value="string:PE">Prince Edward Island</option><option label="Quebec" value="string:QC">Quebec</option><option label="Saskatchewan" value="string:SK">Saskatchewan</option><option label="Yukon Territory" value="string:YT">Yukon Territory</option></select><select class="form-control selectpicker" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsUS" ng-show="company.country == \'US\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide">&lt; Select State &gt;</option><option label="Alabama" value="string:AL">Alabama</option><option label="Alaska" value="string:AK">Alaska</option><option label="Arizona" value="string:AZ">Arizona</option><option label="Arkansas" value="string:AR">Arkansas</option><option label="California" value="string:CA">California</option><option label="Colorado" value="string:CO">Colorado</option><option label="Connecticut" value="string:CT">Connecticut</option><option label="Delaware" value="string:DE">Delaware</option><option label="District of Columbia" value="string:DC">District of Columbia</option><option label="Florida" value="string:FL">Florida</option><option label="Georgia" value="string:GA">Georgia</option><option label="Hawaii" value="string:HI">Hawaii</option><option label="Idaho" value="string:ID">Idaho</option><option label="Illinois" value="string:IL">Illinois</option><option label="Indiana" value="string:IN">Indiana</option><option label="Iowa" value="string:IA">Iowa</option><option label="Kansas" value="string:KS" selected="selected">Kansas</option><option label="Kentucky" value="string:KY">Kentucky</option><option label="Louisiana" value="string:LA">Louisiana</option><option label="Maine" value="string:ME">Maine</option><option label="Maryland" value="string:MD">Maryland</option><option label="Massachusetts" value="string:MA">Massachusetts</option><option label="Michigan" value="string:MI">Michigan</option><option label="Minnesota" value="string:MN">Minnesota</option><option label="Mississippi" value="string:MS">Mississippi</option><option label="Missouri" value="string:MO">Missouri</option><option label="Montana" value="string:MT">Montana</option><option label="Nebraska" value="string:NE">Nebraska</option><option label="Nevada" value="string:NV">Nevada</option><option label="New Hampshire" value="string:NH">New Hampshire</option><option label="New Jersey" value="string:NJ">New Jersey</option><option label="New Mexico" value="string:NM">New Mexico</option><option label="New York" value="string:NY">New York</option><option label="North Carolina" value="string:NC">North Carolina</option><option label="North Dakota" value="string:ND">North Dakota</option><option label="Ohio" value="string:OH">Ohio</option><option label="Oklahoma" value="string:OK">Oklahoma</option><option label="Oregon" value="string:OR">Oregon</option><option label="Pennsylvania" value="string:PA">Pennsylvania</option><option label="Rhode Island" value="string:RI">Rhode Island</option><option label="South Carolina" value="string:SC">South Carolina</option><option label="South Dakota" value="string:SD">South Dakota</option><option label="Tennessee" value="string:TN">Tennessee</option><option label="Texas" value="string:TX">Texas</option><option label="Utah" value="string:UT">Utah</option><option label="Vermont" value="string:VT">Vermont</option><option label="Virginia" value="string:VA">Virginia</option><option label="Washington" value="string:WA">Washington</option><option label="West Virginia" value="string:WV">West Virginia</option><option label="Wisconsin" value="string:WI">Wisconsin</option><option label="Wyoming" value="string:WY">Wyoming</option></select></div></div><div class="col-md-6"><div class="form-group has-error"><label for="company-settings-zip" class="control-label">ZIP/Postal Code</label> <input id="company-settings-zip" type="text" class="form-control" ng-model="company.postalCode"></div></div></div></form><hr><div class="row"><div class="col-xs-12"><button id="" class="btn btn-default btn-lg pull-left">Back</button> <button id="hide-billing-error" class="btn btn-primary btn-lg pull-right">Continue</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-billing-address.html',
    '<div id="content-two" class="prototype-show" style="display: none;"><form id="billingAddressForm" role="form" class="u_margin-md-top" name="forms.billingAddressForm" novalidate=""><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label">First Name</label> <input type="text" class="form-control"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label">Last Name</label> <input type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label class="control-label">Email</label> <input type="email" class="form-control"></div></div><div class="col-md-6"><div class="form-group"><label class="control-label">Phone</label> <input type="tel" id="phone" name="phone" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="form-control"></div></div></div><div class="form-group"><label for="company-settings-name">Company Name</label> <input id="company-settings-name" type="text" class="form-control" name="company-name"></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="company-settings-street" class="control-label">Address Line 1</label> <input type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="company-settings-street" class="control-label">Address Line 2</label> <input type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label for="company-settings-city" class="control-label">City</label> <input id="company-settings-city" type="text" class="form-control" ng-model="company.city"></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-country" class="control-label">Country</label><select id="company-settings-country" class="form-control selectpicker" empty-select-parser=""><option ng-show="false" value="">&lt; Select Country &gt;</option><option label="Afghanistan" value="string:AF">Afghanistan</option><option label="Albania" value="string:AL">Albania</option><option label="Algeria" value="string:DZ">Algeria</option><option label="American Samoa" value="string:AS">American Samoa</option><option label="Andorra" value="string:AD">Andorra</option><option label="Angola" value="string:AO">Angola</option><option label="Anguilla" value="string:AI">Anguilla</option><option label="Antarctica" value="string:AQ">Antarctica</option><option label="Antigua and Barbuda" value="string:AG">Antigua and Barbuda</option><option label="Argentina" value="string:AR">Argentina</option><option label="Armenia" value="string:AM">Armenia</option><option label="Aruba" value="string:AW">Aruba</option><option label="Australia" value="string:AU">Australia</option><option label="Austria" value="string:AT">Austria</option><option label="Azerbaijan" value="string:AZ">Azerbaijan</option><option label="Bahamas" value="string:BS">Bahamas</option><option label="Bahrain" value="string:BH">Bahrain</option><option label="Bangladesh" value="string:BD">Bangladesh</option><option label="Barbados" value="string:BB">Barbados</option><option label="Belarus" value="string:BY">Belarus</option><option label="Belgium" value="string:BE">Belgium</option><option label="Belize" value="string:BZ">Belize</option><option label="Benin" value="string:BJ">Benin</option><option label="Bermuda" value="string:BM">Bermuda</option><option label="Bhutan" value="string:BT">Bhutan</option><option label="Bolivia" value="string:BO">Bolivia</option><option label="Bonaire, Sint Eustatius and Saba" value="string:BQ">Bonaire, Sint Eustatius and Saba</option><option label="Bosnia and Herzegovina" value="string:BA">Bosnia and Herzegovina</option><option label="Botswana" value="string:BW">Botswana</option><option label="Bouvet Island" value="string:BV">Bouvet Island</option><option label="Brazil" value="string:BR">Brazil</option><option label="British Indian Ocean Territory" value="string:IO">British Indian Ocean Territory</option><option label="British Virgin Islands" value="string:VG">British Virgin Islands</option><option label="Brunei Darussalam" value="string:BN">Brunei Darussalam</option><option label="Bulgaria" value="string:BG">Bulgaria</option><option label="Burkina Faso" value="string:BF">Burkina Faso</option><option label="Burundi" value="string:BI">Burundi</option><option label="Cabo Verde" value="string:CV">Cabo Verde</option><option label="Cambodia" value="string:KH">Cambodia</option><option label="Cameroon" value="string:CM">Cameroon</option><option label="Canada" value="string:CA">Canada</option><option label="Cayman Islands" value="string:KY">Cayman Islands</option><option label="Central African Republic" value="string:CF">Central African Republic</option><option label="Chad" value="string:TD">Chad</option><option label="Chile" value="string:CL">Chile</option><option label="China" value="string:CN">China</option><option label="Christmas Island" value="string:CX">Christmas Island</option><option label="Cocos (Keeling) Islands" value="string:CC">Cocos (Keeling) Islands</option><option label="Colombia" value="string:CO">Colombia</option><option label="Comoros" value="string:KM">Comoros</option><option label="Congo" value="string:CG">Congo</option><option label="Congo, the Democratic Republic of the" value="string:CD">Congo, the Democratic Republic of the</option><option label="Cook Islands" value="string:CK">Cook Islands</option><option label="Costa Rica" value="string:CR">Costa Rica</option><option label="Croatia" value="string:HR">Croatia</option><option label="Cuba" value="string:CU">Cuba</option><option label="Curaçao" value="string:CW">Curaçao</option><option label="Cyprus" value="string:CY">Cyprus</option><option label="Czech Republic" value="string:CZ">Czech Republic</option><option label="Côte d\'Ivoire" value="string:CI">Côte d\'Ivoire</option><option label="Denmark" value="string:DK">Denmark</option><option label="Djibouti" value="string:DJ">Djibouti</option><option label="Dominica" value="string:DM">Dominica</option><option label="Dominican Republic" value="string:DO">Dominican Republic</option><option label="Ecuador" value="string:EC">Ecuador</option><option label="Egypt" value="string:EG">Egypt</option><option label="El Salvador" value="string:SV">El Salvador</option><option label="Equatorial Guinea" value="string:GQ">Equatorial Guinea</option><option label="Eritrea" value="string:ER">Eritrea</option><option label="Estonia" value="string:EE">Estonia</option><option label="Ethiopia" value="string:ET">Ethiopia</option><option label="Falkland Islands (Malvinas)" value="string:FK">Falkland Islands (Malvinas)</option><option label="Faroe Islands" value="string:FO">Faroe Islands</option><option label="Fiji" value="string:FJ">Fiji</option><option label="Finland" value="string:FI">Finland</option><option label="France" value="string:FR">France</option><option label="French Guiana" value="string:GF">French Guiana</option><option label="French Polynesia" value="string:PF">French Polynesia</option><option label="French Southern Territories" value="string:TF">French Southern Territories</option><option label="Gabon" value="string:GA">Gabon</option><option label="Gambia" value="string:GM">Gambia</option><option label="Georgia" value="string:GE">Georgia</option><option label="Germany" value="string:DE">Germany</option><option label="Ghana" value="string:GH">Ghana</option><option label="Gibraltar" value="string:GI">Gibraltar</option><option label="Greece" value="string:GR">Greece</option><option label="Greenland" value="string:GL">Greenland</option><option label="Grenada" value="string:GD">Grenada</option><option label="Guadeloupe" value="string:GP">Guadeloupe</option><option label="Guam" value="string:GU">Guam</option><option label="Guatemala" value="string:GT">Guatemala</option><option label="Guernsey" value="string:GG">Guernsey</option><option label="Guinea" value="string:GN">Guinea</option><option label="Guinea-Bissau" value="string:GW">Guinea-Bissau</option><option label="Guyana" value="string:GY">Guyana</option><option label="Haiti" value="string:HT">Haiti</option><option label="Heard Island and McDonald Islands" value="string:HM">Heard Island and McDonald Islands</option><option label="Holy See (Vatican City State)" value="string:VA">Holy See (Vatican City State)</option><option label="Honduras" value="string:HN">Honduras</option><option label="Hong Kong" value="string:HK">Hong Kong</option><option label="Hungary" value="string:HU">Hungary</option><option label="Iceland" value="string:IS">Iceland</option><option label="India" value="string:IN">India</option><option label="Indonesia" value="string:ID">Indonesia</option><option label="Iran" value="string:IR">Iran</option><option label="Iraq" value="string:IQ">Iraq</option><option label="Ireland" value="string:IE">Ireland</option><option label="Isle of Man" value="string:IM">Isle of Man</option><option label="Israel" value="string:IL">Israel</option><option label="Italy" value="string:IT">Italy</option><option label="Jamaica" value="string:JM">Jamaica</option><option label="Japan" value="string:JP">Japan</option><option label="Jersey" value="string:JE">Jersey</option><option label="Jordan" value="string:JO">Jordan</option><option label="Kazakhstan" value="string:KZ">Kazakhstan</option><option label="Kenya" value="string:KE">Kenya</option><option label="Kiribati" value="string:KI">Kiribati</option><option label="Korea, Democratic People\'s Republic of" value="string:KP">Korea, Democratic People\'s Republic of</option><option label="Korea, Republic of" value="string:KR">Korea, Republic of</option><option label="Kuwait" value="string:KW">Kuwait</option><option label="Kyrgyzstan" value="string:KG">Kyrgyzstan</option><option label="Lao People\'s Democratic Republic" value="string:LA">Lao People\'s Democratic Republic</option><option label="Latvia" value="string:LV">Latvia</option><option label="Lebanon" value="string:LB">Lebanon</option><option label="Lesotho" value="string:LS">Lesotho</option><option label="Liberia" value="string:LR">Liberia</option><option label="Libya" value="string:LY">Libya</option><option label="Liechtenstein" value="string:LI">Liechtenstein</option><option label="Lithuania" value="string:LT">Lithuania</option><option label="Luxembourg" value="string:LU">Luxembourg</option><option label="Macau" value="string:MO">Macau</option><option label="Macedonia, the former Yugoslav Republic of" value="string:MK">Macedonia, the former Yugoslav Republic of</option><option label="Madagascar" value="string:MG">Madagascar</option><option label="Malawi" value="string:MW">Malawi</option><option label="Malaysia" value="string:MY">Malaysia</option><option label="Maldives" value="string:MV">Maldives</option><option label="Mali" value="string:ML">Mali</option><option label="Malta" value="string:MT">Malta</option><option label="Marshall Islands" value="string:MH">Marshall Islands</option><option label="Martinique" value="string:MQ">Martinique</option><option label="Mauritania" value="string:MR">Mauritania</option><option label="Mauritius" value="string:MU">Mauritius</option><option label="Mayotte" value="string:YT">Mayotte</option><option label="Mexico" value="string:MX">Mexico</option><option label="Micronesia" value="string:FM">Micronesia</option><option label="Moldova" value="string:MD">Moldova</option><option label="Monaco" value="string:MC">Monaco</option><option label="Mongolia" value="string:MN">Mongolia</option><option label="Montenegro" value="string:ME">Montenegro</option><option label="Montserrat" value="string:MS">Montserrat</option><option label="Morocco" value="string:MA">Morocco</option><option label="Mozambique" value="string:MZ">Mozambique</option><option label="Myanmar" value="string:MM">Myanmar</option><option label="Namibia" value="string:NA">Namibia</option><option label="Nauru" value="string:NR">Nauru</option><option label="Nepal" value="string:NP">Nepal</option><option label="Netherlands" value="string:NL">Netherlands</option><option label="New Caledonia" value="string:NC">New Caledonia</option><option label="New Zealand" value="string:NZ">New Zealand</option><option label="Nicaragua" value="string:NI">Nicaragua</option><option label="Niger" value="string:NE">Niger</option><option label="Nigeria" value="string:NG">Nigeria</option><option label="Niue" value="string:NU">Niue</option><option label="Norfolk Island" value="string:NF">Norfolk Island</option><option label="Northern Mariana Islands" value="string:MP">Northern Mariana Islands</option><option label="Norway" value="string:NO">Norway</option><option label="Oman" value="string:OM">Oman</option><option label="Pakistan" value="string:PK">Pakistan</option><option label="Palau" value="string:PW">Palau</option><option label="Palestine, State of" value="string:PS">Palestine, State of</option><option label="Panama" value="string:PA">Panama</option><option label="Papua New Guinea" value="string:PG">Papua New Guinea</option><option label="Paraguay" value="string:PY">Paraguay</option><option label="Peru" value="string:PE">Peru</option><option label="Philippines" value="string:PH">Philippines</option><option label="Pitcairn" value="string:PN">Pitcairn</option><option label="Poland" value="string:PL">Poland</option><option label="Portugal" value="string:PT">Portugal</option><option label="Puerto Rico" value="string:PR">Puerto Rico</option><option label="Qatar" value="string:QA">Qatar</option><option label="Reunion" value="string:RE">Reunion</option><option label="Romania" value="string:RO">Romania</option><option label="Russian Federation" value="string:RU">Russian Federation</option><option label="Rwanda" value="string:RW">Rwanda</option><option label="Saint Barthélemy" value="string:BL">Saint Barthélemy</option><option label="Saint Helena, Ascension and Tristan da Cunha" value="string:SH">Saint Helena, Ascension and Tristan da Cunha</option><option label="Saint Kitts and Nevis" value="string:KN">Saint Kitts and Nevis</option><option label="Saint Lucia" value="string:LC">Saint Lucia</option><option label="Saint Martin (French part)" value="string:MF">Saint Martin (French part)</option><option label="Saint Vincent and The Grenadines" value="string:VC">Saint Vincent and The Grenadines</option><option label="Samoa" value="string:WS">Samoa</option><option label="San Marino" value="string:SM">San Marino</option><option label="Sao Tome and Principe" value="string:ST">Sao Tome and Principe</option><option label="Saudi Arabia" value="string:SA">Saudi Arabia</option><option label="Senegal" value="string:SN">Senegal</option><option label="Serbia" value="string:RS">Serbia</option><option label="Seychelles" value="string:SC">Seychelles</option><option label="Sierra Leone" value="string:SL">Sierra Leone</option><option label="Singapore" value="string:SG">Singapore</option><option label="Sint Maarten (Dutch part)" value="string:SX">Sint Maarten (Dutch part)</option><option label="Slovakia" value="string:SK">Slovakia</option><option label="Slovenia" value="string:SI">Slovenia</option><option label="Solomon Islands" value="string:SB">Solomon Islands</option><option label="Somalia" value="string:SO">Somalia</option><option label="South Africa" value="string:ZA">South Africa</option><option label="South Georgia and the South Sandwich Islands" value="string:GS">South Georgia and the South Sandwich Islands</option><option label="South Sudan" value="string:SS">South Sudan</option><option label="Spain" value="string:ES">Spain</option><option label="Sri Lanka" value="string:LK">Sri Lanka</option><option label="St. Pierre and Miquelon" value="string:PM">St. Pierre and Miquelon</option><option label="Sudan" value="string:SD">Sudan</option><option label="Suriname" value="string:SR">Suriname</option><option label="Svalbard and Jan Mayen" value="string:SJ">Svalbard and Jan Mayen</option><option label="Swaziland" value="string:SZ">Swaziland</option><option label="Sweden" value="string:SE">Sweden</option><option label="Switzerland" value="string:CH">Switzerland</option><option label="Syrian Arab Republic" value="string:SY">Syrian Arab Republic</option><option label="Taiwan" value="string:TW">Taiwan</option><option label="Tajikistan" value="string:TJ">Tajikistan</option><option label="Tanzania, United Republic of" value="string:TZ">Tanzania, United Republic of</option><option label="Thailand" value="string:TH">Thailand</option><option label="Timor-Leste" value="string:TL">Timor-Leste</option><option label="Togo" value="string:TG">Togo</option><option label="Tokelau" value="string:TK">Tokelau</option><option label="Tonga" value="string:TO">Tonga</option><option label="Trinidad and Tobago" value="string:TT">Trinidad and Tobago</option><option label="Tunisia" value="string:TN">Tunisia</option><option label="Turkey" value="string:TR">Turkey</option><option label="Turkmenistan" value="string:TM">Turkmenistan</option><option label="Turks and Caicos Islands" value="string:TC">Turks and Caicos Islands</option><option label="Tuvalu" value="string:TV">Tuvalu</option><option label="Uganda" value="string:UG">Uganda</option><option label="Ukraine" value="string:UA">Ukraine</option><option label="United Arab Emirates" value="string:AE">United Arab Emirates</option><option label="United Kingdom" value="string:GB">United Kingdom</option><option label="United States" value="string:US" selected="selected">United States</option><option label="Uruguay" value="string:UY">Uruguay</option><option label="US Minor Outlying Islands" value="string:UM">US Minor Outlying Islands</option><option label="US Virgin Islands" value="string:VI">US Virgin Islands</option><option label="Uzbekistan" value="string:UZ">Uzbekistan</option><option label="Vanuatu" value="string:VU">Vanuatu</option><option label="Venezuela, Bolivarian Republic of" value="string:VE">Venezuela, Bolivarian Republic of</option><option label="Viet Nam" value="string:VN">Viet Nam</option><option label="Wallis and Futuna Islands" value="string:WF">Wallis and Futuna Islands</option><option label="Western Sahara" value="string:EH">Western Sahara</option><option label="Yemen" value="string:YE">Yemen</option><option label="Zambia" value="string:ZM">Zambia</option><option label="Zimbabwe" value="string:ZW">Zimbabwe</option><option label="Åland Islands" value="string:AX">Åland Islands</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-state" class="control-label">State/Province/Region</label> <input id="company-settings-state" type="text" class="form-control ng-hide" ng-model="company.province" ng-hide="company.country == \'US\' || company.country == \'CA\'"><select class="form-control selectpicker ng-pristine ng-untouched ng-valid ng-hide ng-not-empty" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsCA" ng-show="company.country == \'CA\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide" selected="selected">&lt; Select Province &gt;</option><option label="Alberta" value="string:AB">Alberta</option><option label="British Columbia" value="string:BC">British Columbia</option><option label="Manitoba" value="string:MB">Manitoba</option><option label="New Brunswick" value="string:NB">New Brunswick</option><option label="Newfoundland and Labrador" value="string:NL">Newfoundland and Labrador</option><option label="Northwest Territories" value="string:NT">Northwest Territories</option><option label="Nova Scotia" value="string:NS">Nova Scotia</option><option label="Nunavut" value="string:NU">Nunavut</option><option label="Ontario" value="string:ON">Ontario</option><option label="Prince Edward Island" value="string:PE">Prince Edward Island</option><option label="Quebec" value="string:QC">Quebec</option><option label="Saskatchewan" value="string:SK">Saskatchewan</option><option label="Yukon Territory" value="string:YT">Yukon Territory</option></select><select class="form-control selectpicker" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsUS" ng-show="company.country == \'US\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide">&lt; Select State &gt;</option><option label="Alabama" value="string:AL">Alabama</option><option label="Alaska" value="string:AK">Alaska</option><option label="Arizona" value="string:AZ">Arizona</option><option label="Arkansas" value="string:AR">Arkansas</option><option label="California" value="string:CA">California</option><option label="Colorado" value="string:CO">Colorado</option><option label="Connecticut" value="string:CT">Connecticut</option><option label="Delaware" value="string:DE">Delaware</option><option label="District of Columbia" value="string:DC">District of Columbia</option><option label="Florida" value="string:FL">Florida</option><option label="Georgia" value="string:GA">Georgia</option><option label="Hawaii" value="string:HI">Hawaii</option><option label="Idaho" value="string:ID">Idaho</option><option label="Illinois" value="string:IL">Illinois</option><option label="Indiana" value="string:IN">Indiana</option><option label="Iowa" value="string:IA">Iowa</option><option label="Kansas" value="string:KS" selected="selected">Kansas</option><option label="Kentucky" value="string:KY">Kentucky</option><option label="Louisiana" value="string:LA">Louisiana</option><option label="Maine" value="string:ME">Maine</option><option label="Maryland" value="string:MD">Maryland</option><option label="Massachusetts" value="string:MA">Massachusetts</option><option label="Michigan" value="string:MI">Michigan</option><option label="Minnesota" value="string:MN">Minnesota</option><option label="Mississippi" value="string:MS">Mississippi</option><option label="Missouri" value="string:MO">Missouri</option><option label="Montana" value="string:MT">Montana</option><option label="Nebraska" value="string:NE">Nebraska</option><option label="Nevada" value="string:NV">Nevada</option><option label="New Hampshire" value="string:NH">New Hampshire</option><option label="New Jersey" value="string:NJ">New Jersey</option><option label="New Mexico" value="string:NM">New Mexico</option><option label="New York" value="string:NY">New York</option><option label="North Carolina" value="string:NC">North Carolina</option><option label="North Dakota" value="string:ND">North Dakota</option><option label="Ohio" value="string:OH">Ohio</option><option label="Oklahoma" value="string:OK">Oklahoma</option><option label="Oregon" value="string:OR">Oregon</option><option label="Pennsylvania" value="string:PA">Pennsylvania</option><option label="Rhode Island" value="string:RI">Rhode Island</option><option label="South Carolina" value="string:SC">South Carolina</option><option label="South Dakota" value="string:SD">South Dakota</option><option label="Tennessee" value="string:TN">Tennessee</option><option label="Texas" value="string:TX">Texas</option><option label="Utah" value="string:UT">Utah</option><option label="Vermont" value="string:VT">Vermont</option><option label="Virginia" value="string:VA">Virginia</option><option label="Washington" value="string:WA">Washington</option><option label="West Virginia" value="string:WV">West Virginia</option><option label="Wisconsin" value="string:WI">Wisconsin</option><option label="Wyoming" value="string:WY">Wyoming</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-zip" class="control-label">ZIP/Postal Code</label> <input id="company-settings-zip" type="text" class="form-control" ng-model="company.postalCode"></div></div></div></form><hr><div class="row"><div class="col-xs-12"><button id="" class="btn btn-default btn-lg pull-left">Back</button> <button id="reveal-billing-error" class="btn btn-primary btn-lg pull-right">Continue</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-payment-methods.html',
    '<div id="content-four" class="prototype-show" style="display: none;"><form id="companyForm" role="form" class="u_margin-md-top" name="forms.companyForm" novalidate=""><div class="row ng-scope"><div class="col-xs-12"><div class="form-group"><select class="form-control selectpicker"><option value="Credit Card">Credit Card</option><option value="Invoice Me">Generate Invoice</option></select></div></div></div><br><div class="row ng-scope"><div class="col-md-12"><div class="form-group"><select id="paymentMethodSelector" class="form-control selectpicker"><option value="">Mastercard ****-4242</option><option value="">Visa ****-9292</option><option value="">Add New Credit Card</option></select></div></div></div><div id="firstTimeCC" style="display:none"><div class="row ng-scope"><div class="col-md-12"><div class="form-group"><label class="control-label">Cardholder Name</label> <input type="text" class="form-control"></div></div></div><div class="row ng-scope"><div class="col-xs-12 col-sm-6"><div class="form-group"><label class="control-label">Card Number</label> <input id="cc" type="text" class="form-control" placeholder="0000 0000 0000 0000"></div></div><div class="col-xs-6 col-sm-3"><div class="form-group"><label class="control-label">Expiry Date</label><input id="ccexp" type="text" placeholder="MM/YY" class="form-control masked" pattern="(1[0-2]|0[1-9])\\/(1[5-9]|2\\d)" data-valid-example="05/18"></div></div><div class="col-xs-6 col-sm-3"><div class="form-group"><label for="company-settings-unit" class="control-label">CVV</label> <input id="company-settings-unit" type="text" class="form-control ng-pristine ng-untouched ng-valid ng-empty" ng-model="company.unit"></div></div></div><div class="checkbox"><label><input type="checkbox" id="toggleMatchBillingAddress" checked=""> Same As Billing Address</label></div><div id="targetCCAddress" style="display: none"><div class="row ng-scope"><div class="col-md-12"><div class="form-group"><label class="control-label">Address Line 1</label> <input id="company-settings-street" type="text" class="form-control" ng-model="company.street"></div></div></div><div class="row ng-scope"><div class="col-md-12"><div class="form-group"><label class="control-label">Address Line 2</label> <input id="company-settings-street" type="text" class="form-control" ng-model="company.street"></div></div></div><div class="row ng-scope"><div class="col-md-6"><div class="form-group"><label for="company-settings-city" class="control-label">City</label> <input id="company-settings-city" type="text" class="form-control" ng-model="company.city"></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-country" class="control-label">Country</label><select id="company-settings-country" class="form-control selectpicker" ng-model="company.country" ng-options="c.code as c.name for c in countries" empty-select-parser=""><option ng-show="false" value="" class="ng-hide">&lt; Select Country &gt;</option><option label="Afghanistan" value="string:AF">Afghanistan</option><option label="Albania" value="string:AL">Albania</option><option label="Algeria" value="string:DZ">Algeria</option><option label="American Samoa" value="string:AS">American Samoa</option><option label="Andorra" value="string:AD">Andorra</option><option label="Angola" value="string:AO">Angola</option><option label="Anguilla" value="string:AI">Anguilla</option><option label="Antarctica" value="string:AQ">Antarctica</option><option label="Antigua and Barbuda" value="string:AG">Antigua and Barbuda</option><option label="Argentina" value="string:AR">Argentina</option><option label="Armenia" value="string:AM">Armenia</option><option label="Aruba" value="string:AW">Aruba</option><option label="Australia" value="string:AU">Australia</option><option label="Austria" value="string:AT">Austria</option><option label="Azerbaijan" value="string:AZ">Azerbaijan</option><option label="Bahamas" value="string:BS">Bahamas</option><option label="Bahrain" value="string:BH">Bahrain</option><option label="Bangladesh" value="string:BD">Bangladesh</option><option label="Barbados" value="string:BB">Barbados</option><option label="Belarus" value="string:BY">Belarus</option><option label="Belgium" value="string:BE">Belgium</option><option label="Belize" value="string:BZ">Belize</option><option label="Benin" value="string:BJ">Benin</option><option label="Bermuda" value="string:BM">Bermuda</option><option label="Bhutan" value="string:BT">Bhutan</option><option label="Bolivia" value="string:BO">Bolivia</option><option label="Bonaire, Sint Eustatius and Saba" value="string:BQ">Bonaire, Sint Eustatius and Saba</option><option label="Bosnia and Herzegovina" value="string:BA">Bosnia and Herzegovina</option><option label="Botswana" value="string:BW">Botswana</option><option label="Bouvet Island" value="string:BV">Bouvet Island</option><option label="Brazil" value="string:BR">Brazil</option><option label="British Indian Ocean Territory" value="string:IO">British Indian Ocean Territory</option><option label="British Virgin Islands" value="string:VG">British Virgin Islands</option><option label="Brunei Darussalam" value="string:BN">Brunei Darussalam</option><option label="Bulgaria" value="string:BG">Bulgaria</option><option label="Burkina Faso" value="string:BF">Burkina Faso</option><option label="Burundi" value="string:BI">Burundi</option><option label="Cabo Verde" value="string:CV">Cabo Verde</option><option label="Cambodia" value="string:KH">Cambodia</option><option label="Cameroon" value="string:CM">Cameroon</option><option label="Canada" value="string:CA">Canada</option><option label="Cayman Islands" value="string:KY">Cayman Islands</option><option label="Central African Republic" value="string:CF">Central African Republic</option><option label="Chad" value="string:TD">Chad</option><option label="Chile" value="string:CL">Chile</option><option label="China" value="string:CN">China</option><option label="Christmas Island" value="string:CX">Christmas Island</option><option label="Cocos (Keeling) Islands" value="string:CC">Cocos (Keeling) Islands</option><option label="Colombia" value="string:CO">Colombia</option><option label="Comoros" value="string:KM">Comoros</option><option label="Congo" value="string:CG">Congo</option><option label="Congo, the Democratic Republic of the" value="string:CD">Congo, the Democratic Republic of the</option><option label="Cook Islands" value="string:CK">Cook Islands</option><option label="Costa Rica" value="string:CR">Costa Rica</option><option label="Croatia" value="string:HR">Croatia</option><option label="Cuba" value="string:CU">Cuba</option><option label="Curaçao" value="string:CW">Curaçao</option><option label="Cyprus" value="string:CY">Cyprus</option><option label="Czech Republic" value="string:CZ">Czech Republic</option><option label="Côte d\'Ivoire" value="string:CI">Côte d\'Ivoire</option><option label="Denmark" value="string:DK">Denmark</option><option label="Djibouti" value="string:DJ">Djibouti</option><option label="Dominica" value="string:DM">Dominica</option><option label="Dominican Republic" value="string:DO">Dominican Republic</option><option label="Ecuador" value="string:EC">Ecuador</option><option label="Egypt" value="string:EG">Egypt</option><option label="El Salvador" value="string:SV">El Salvador</option><option label="Equatorial Guinea" value="string:GQ">Equatorial Guinea</option><option label="Eritrea" value="string:ER">Eritrea</option><option label="Estonia" value="string:EE">Estonia</option><option label="Ethiopia" value="string:ET">Ethiopia</option><option label="Falkland Islands (Malvinas)" value="string:FK">Falkland Islands (Malvinas)</option><option label="Faroe Islands" value="string:FO">Faroe Islands</option><option label="Fiji" value="string:FJ">Fiji</option><option label="Finland" value="string:FI">Finland</option><option label="France" value="string:FR">France</option><option label="French Guiana" value="string:GF">French Guiana</option><option label="French Polynesia" value="string:PF">French Polynesia</option><option label="French Southern Territories" value="string:TF">French Southern Territories</option><option label="Gabon" value="string:GA">Gabon</option><option label="Gambia" value="string:GM">Gambia</option><option label="Georgia" value="string:GE">Georgia</option><option label="Germany" value="string:DE">Germany</option><option label="Ghana" value="string:GH">Ghana</option><option label="Gibraltar" value="string:GI">Gibraltar</option><option label="Greece" value="string:GR">Greece</option><option label="Greenland" value="string:GL">Greenland</option><option label="Grenada" value="string:GD">Grenada</option><option label="Guadeloupe" value="string:GP">Guadeloupe</option><option label="Guam" value="string:GU">Guam</option><option label="Guatemala" value="string:GT">Guatemala</option><option label="Guernsey" value="string:GG">Guernsey</option><option label="Guinea" value="string:GN">Guinea</option><option label="Guinea-Bissau" value="string:GW">Guinea-Bissau</option><option label="Guyana" value="string:GY">Guyana</option><option label="Haiti" value="string:HT">Haiti</option><option label="Heard Island and McDonald Islands" value="string:HM">Heard Island and McDonald Islands</option><option label="Holy See (Vatican City State)" value="string:VA">Holy See (Vatican City State)</option><option label="Honduras" value="string:HN">Honduras</option><option label="Hong Kong" value="string:HK">Hong Kong</option><option label="Hungary" value="string:HU">Hungary</option><option label="Iceland" value="string:IS">Iceland</option><option label="India" value="string:IN">India</option><option label="Indonesia" value="string:ID">Indonesia</option><option label="Iran" value="string:IR">Iran</option><option label="Iraq" value="string:IQ">Iraq</option><option label="Ireland" value="string:IE">Ireland</option><option label="Isle of Man" value="string:IM">Isle of Man</option><option label="Israel" value="string:IL">Israel</option><option label="Italy" value="string:IT">Italy</option><option label="Jamaica" value="string:JM">Jamaica</option><option label="Japan" value="string:JP">Japan</option><option label="Jersey" value="string:JE">Jersey</option><option label="Jordan" value="string:JO">Jordan</option><option label="Kazakhstan" value="string:KZ">Kazakhstan</option><option label="Kenya" value="string:KE">Kenya</option><option label="Kiribati" value="string:KI">Kiribati</option><option label="Korea, Democratic People\'s Republic of" value="string:KP">Korea, Democratic People\'s Republic of</option><option label="Korea, Republic of" value="string:KR">Korea, Republic of</option><option label="Kuwait" value="string:KW">Kuwait</option><option label="Kyrgyzstan" value="string:KG">Kyrgyzstan</option><option label="Lao People\'s Democratic Republic" value="string:LA">Lao People\'s Democratic Republic</option><option label="Latvia" value="string:LV">Latvia</option><option label="Lebanon" value="string:LB">Lebanon</option><option label="Lesotho" value="string:LS">Lesotho</option><option label="Liberia" value="string:LR">Liberia</option><option label="Libya" value="string:LY">Libya</option><option label="Liechtenstein" value="string:LI">Liechtenstein</option><option label="Lithuania" value="string:LT">Lithuania</option><option label="Luxembourg" value="string:LU">Luxembourg</option><option label="Macau" value="string:MO">Macau</option><option label="Macedonia, the former Yugoslav Republic of" value="string:MK">Macedonia, the former Yugoslav Republic of</option><option label="Madagascar" value="string:MG">Madagascar</option><option label="Malawi" value="string:MW">Malawi</option><option label="Malaysia" value="string:MY">Malaysia</option><option label="Maldives" value="string:MV">Maldives</option><option label="Mali" value="string:ML">Mali</option><option label="Malta" value="string:MT">Malta</option><option label="Marshall Islands" value="string:MH">Marshall Islands</option><option label="Martinique" value="string:MQ">Martinique</option><option label="Mauritania" value="string:MR">Mauritania</option><option label="Mauritius" value="string:MU">Mauritius</option><option label="Mayotte" value="string:YT">Mayotte</option><option label="Mexico" value="string:MX">Mexico</option><option label="Micronesia" value="string:FM">Micronesia</option><option label="Moldova" value="string:MD">Moldova</option><option label="Monaco" value="string:MC">Monaco</option><option label="Mongolia" value="string:MN">Mongolia</option><option label="Montenegro" value="string:ME">Montenegro</option><option label="Montserrat" value="string:MS">Montserrat</option><option label="Morocco" value="string:MA">Morocco</option><option label="Mozambique" value="string:MZ">Mozambique</option><option label="Myanmar" value="string:MM">Myanmar</option><option label="Namibia" value="string:NA">Namibia</option><option label="Nauru" value="string:NR">Nauru</option><option label="Nepal" value="string:NP">Nepal</option><option label="Netherlands" value="string:NL">Netherlands</option><option label="New Caledonia" value="string:NC">New Caledonia</option><option label="New Zealand" value="string:NZ">New Zealand</option><option label="Nicaragua" value="string:NI">Nicaragua</option><option label="Niger" value="string:NE">Niger</option><option label="Nigeria" value="string:NG">Nigeria</option><option label="Niue" value="string:NU">Niue</option><option label="Norfolk Island" value="string:NF">Norfolk Island</option><option label="Northern Mariana Islands" value="string:MP">Northern Mariana Islands</option><option label="Norway" value="string:NO">Norway</option><option label="Oman" value="string:OM">Oman</option><option label="Pakistan" value="string:PK">Pakistan</option><option label="Palau" value="string:PW">Palau</option><option label="Palestine, State of" value="string:PS">Palestine, State of</option><option label="Panama" value="string:PA">Panama</option><option label="Papua New Guinea" value="string:PG">Papua New Guinea</option><option label="Paraguay" value="string:PY">Paraguay</option><option label="Peru" value="string:PE">Peru</option><option label="Philippines" value="string:PH">Philippines</option><option label="Pitcairn" value="string:PN">Pitcairn</option><option label="Poland" value="string:PL">Poland</option><option label="Portugal" value="string:PT">Portugal</option><option label="Puerto Rico" value="string:PR">Puerto Rico</option><option label="Qatar" value="string:QA">Qatar</option><option label="Reunion" value="string:RE">Reunion</option><option label="Romania" value="string:RO">Romania</option><option label="Russian Federation" value="string:RU">Russian Federation</option><option label="Rwanda" value="string:RW">Rwanda</option><option label="Saint Barthélemy" value="string:BL">Saint Barthélemy</option><option label="Saint Helena, Ascension and Tristan da Cunha" value="string:SH">Saint Helena, Ascension and Tristan da Cunha</option><option label="Saint Kitts and Nevis" value="string:KN">Saint Kitts and Nevis</option><option label="Saint Lucia" value="string:LC">Saint Lucia</option><option label="Saint Martin (French part)" value="string:MF">Saint Martin (French part)</option><option label="Saint Vincent and The Grenadines" value="string:VC">Saint Vincent and The Grenadines</option><option label="Samoa" value="string:WS">Samoa</option><option label="San Marino" value="string:SM">San Marino</option><option label="Sao Tome and Principe" value="string:ST">Sao Tome and Principe</option><option label="Saudi Arabia" value="string:SA">Saudi Arabia</option><option label="Senegal" value="string:SN">Senegal</option><option label="Serbia" value="string:RS">Serbia</option><option label="Seychelles" value="string:SC">Seychelles</option><option label="Sierra Leone" value="string:SL">Sierra Leone</option><option label="Singapore" value="string:SG">Singapore</option><option label="Sint Maarten (Dutch part)" value="string:SX">Sint Maarten (Dutch part)</option><option label="Slovakia" value="string:SK">Slovakia</option><option label="Slovenia" value="string:SI">Slovenia</option><option label="Solomon Islands" value="string:SB">Solomon Islands</option><option label="Somalia" value="string:SO">Somalia</option><option label="South Africa" value="string:ZA">South Africa</option><option label="South Georgia and the South Sandwich Islands" value="string:GS">South Georgia and the South Sandwich Islands</option><option label="South Sudan" value="string:SS">South Sudan</option><option label="Spain" value="string:ES">Spain</option><option label="Sri Lanka" value="string:LK">Sri Lanka</option><option label="St. Pierre and Miquelon" value="string:PM">St. Pierre and Miquelon</option><option label="Sudan" value="string:SD">Sudan</option><option label="Suriname" value="string:SR">Suriname</option><option label="Svalbard and Jan Mayen" value="string:SJ">Svalbard and Jan Mayen</option><option label="Swaziland" value="string:SZ">Swaziland</option><option label="Sweden" value="string:SE">Sweden</option><option label="Switzerland" value="string:CH">Switzerland</option><option label="Syrian Arab Republic" value="string:SY">Syrian Arab Republic</option><option label="Taiwan" value="string:TW">Taiwan</option><option label="Tajikistan" value="string:TJ">Tajikistan</option><option label="Tanzania, United Republic of" value="string:TZ">Tanzania, United Republic of</option><option label="Thailand" value="string:TH">Thailand</option><option label="Timor-Leste" value="string:TL">Timor-Leste</option><option label="Togo" value="string:TG">Togo</option><option label="Tokelau" value="string:TK">Tokelau</option><option label="Tonga" value="string:TO">Tonga</option><option label="Trinidad and Tobago" value="string:TT">Trinidad and Tobago</option><option label="Tunisia" value="string:TN">Tunisia</option><option label="Turkey" value="string:TR">Turkey</option><option label="Turkmenistan" value="string:TM">Turkmenistan</option><option label="Turks and Caicos Islands" value="string:TC">Turks and Caicos Islands</option><option label="Tuvalu" value="string:TV">Tuvalu</option><option label="Uganda" value="string:UG">Uganda</option><option label="Ukraine" value="string:UA">Ukraine</option><option label="United Arab Emirates" value="string:AE">United Arab Emirates</option><option label="United Kingdom" value="string:GB">United Kingdom</option><option label="United States" value="string:US" selected="selected">United States</option><option label="Uruguay" value="string:UY">Uruguay</option><option label="US Minor Outlying Islands" value="string:UM">US Minor Outlying Islands</option><option label="US Virgin Islands" value="string:VI">US Virgin Islands</option><option label="Uzbekistan" value="string:UZ">Uzbekistan</option><option label="Vanuatu" value="string:VU">Vanuatu</option><option label="Venezuela, Bolivarian Republic of" value="string:VE">Venezuela, Bolivarian Republic of</option><option label="Viet Nam" value="string:VN">Viet Nam</option><option label="Wallis and Futuna Islands" value="string:WF">Wallis and Futuna Islands</option><option label="Western Sahara" value="string:EH">Western Sahara</option><option label="Yemen" value="string:YE">Yemen</option><option label="Zambia" value="string:ZM">Zambia</option><option label="Zimbabwe" value="string:ZW">Zimbabwe</option><option label="Åland Islands" value="string:AX">Åland Islands</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-state" class="control-label">State/Province/Region</label> <input id="company-settings-state" type="text" class="form-control ng-hide" ng-model="company.province" ng-hide="company.country == \'US\' || company.country == \'CA\'"><select class="form-control selectpicker ng-pristine ng-untouched ng-valid ng-hide ng-not-empty" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsCA" ng-show="company.country == \'CA\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide" selected="selected">&lt; Select Province &gt;</option><option label="Alberta" value="string:AB">Alberta</option><option label="British Columbia" value="string:BC">British Columbia</option><option label="Manitoba" value="string:MB">Manitoba</option><option label="New Brunswick" value="string:NB">New Brunswick</option><option label="Newfoundland and Labrador" value="string:NL">Newfoundland and Labrador</option><option label="Northwest Territories" value="string:NT">Northwest Territories</option><option label="Nova Scotia" value="string:NS">Nova Scotia</option><option label="Nunavut" value="string:NU">Nunavut</option><option label="Ontario" value="string:ON">Ontario</option><option label="Prince Edward Island" value="string:PE">Prince Edward Island</option><option label="Quebec" value="string:QC">Quebec</option><option label="Saskatchewan" value="string:SK">Saskatchewan</option><option label="Yukon Territory" value="string:YT">Yukon Territory</option></select><select class="form-control selectpicker" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsUS" ng-show="company.country == \'US\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide">&lt; Select State &gt;</option><option label="Alabama" value="string:AL">Alabama</option><option label="Alaska" value="string:AK">Alaska</option><option label="Arizona" value="string:AZ">Arizona</option><option label="Arkansas" value="string:AR">Arkansas</option><option label="California" value="string:CA">California</option><option label="Colorado" value="string:CO">Colorado</option><option label="Connecticut" value="string:CT">Connecticut</option><option label="Delaware" value="string:DE">Delaware</option><option label="District of Columbia" value="string:DC">District of Columbia</option><option label="Florida" value="string:FL">Florida</option><option label="Georgia" value="string:GA">Georgia</option><option label="Hawaii" value="string:HI">Hawaii</option><option label="Idaho" value="string:ID">Idaho</option><option label="Illinois" value="string:IL">Illinois</option><option label="Indiana" value="string:IN">Indiana</option><option label="Iowa" value="string:IA">Iowa</option><option label="Kansas" value="string:KS" selected="selected">Kansas</option><option label="Kentucky" value="string:KY">Kentucky</option><option label="Louisiana" value="string:LA">Louisiana</option><option label="Maine" value="string:ME">Maine</option><option label="Maryland" value="string:MD">Maryland</option><option label="Massachusetts" value="string:MA">Massachusetts</option><option label="Michigan" value="string:MI">Michigan</option><option label="Minnesota" value="string:MN">Minnesota</option><option label="Mississippi" value="string:MS">Mississippi</option><option label="Missouri" value="string:MO">Missouri</option><option label="Montana" value="string:MT">Montana</option><option label="Nebraska" value="string:NE">Nebraska</option><option label="Nevada" value="string:NV">Nevada</option><option label="New Hampshire" value="string:NH">New Hampshire</option><option label="New Jersey" value="string:NJ">New Jersey</option><option label="New Mexico" value="string:NM">New Mexico</option><option label="New York" value="string:NY">New York</option><option label="North Carolina" value="string:NC">North Carolina</option><option label="North Dakota" value="string:ND">North Dakota</option><option label="Ohio" value="string:OH">Ohio</option><option label="Oklahoma" value="string:OK">Oklahoma</option><option label="Oregon" value="string:OR">Oregon</option><option label="Pennsylvania" value="string:PA">Pennsylvania</option><option label="Rhode Island" value="string:RI">Rhode Island</option><option label="South Carolina" value="string:SC">South Carolina</option><option label="South Dakota" value="string:SD">South Dakota</option><option label="Tennessee" value="string:TN">Tennessee</option><option label="Texas" value="string:TX">Texas</option><option label="Utah" value="string:UT">Utah</option><option label="Vermont" value="string:VT">Vermont</option><option label="Virginia" value="string:VA">Virginia</option><option label="Washington" value="string:WA">Washington</option><option label="West Virginia" value="string:WV">West Virginia</option><option label="Wisconsin" value="string:WI">Wisconsin</option><option label="Wyoming" value="string:WY">Wyoming</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-zip" class="control-label">ZIP/Postal Code</label> <input id="company-settings-zip" type="text" class="form-control" ng-model="company.postalCode"></div></div></div></div></div><div id="existingCardCC"><div class="row"><div class="col-md-12"><div class="form-group"><label class="control-label">Cardholder Name</label> <input type="text" class="form-control" placeholder="Joan Abbott" disabled="disabled"></div></div></div><div class="row ng-scope"><div class="col-xs-12 col-sm-6"><div class="form-group"><label class="control-label">Card Number</label> <input id="cc" type="text" class="form-control" placeholder="****-4242" disabled="disabled"></div></div><div class="col-xs-6 col-sm-3"><div class="form-group"><label class="control-label">Expiry Date</label> <input id="ccexp" type="text" placeholder="07/18" class="form-control masked" pattern="(1[0-2]|0[1-9])\\/(1[5-9]|2\\d)" data-valid-example="05/18" disabled="disabled"></div></div><div class="col-xs-6 col-sm-3"><div class="form-group"><label for="company-settings-unit" class="control-label">CVV</label> <input id="company-settings-unit" type="text" class="form-control" placeholder="***" disabled="disabled"></div></div></div><div class="checkbox"><label><input type="checkbox" checked="true"> Set as default Payment Method for all recurring charges</label></div></div></form><hr><div class="row"><div class="col-xs-12"><button id="" class="btn btn-default btn-lg pull-left">Back</button> <button id="addThisCard" class="btn btn-primary btn-lg pull-right">Continue</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-review-purchase.html',
    '<div id="content-five" class="prototype-show" style="display: none;"><div class="row"><div class="col-md-6 u_padding-md-vertical"><p class="lead">Company Account</p><div class="text-block"><b>Acme Co Inc.</b><br>Email: user@domain.com<br>Company ID: ce4684a1-e8b3-4e02-9798-c4517b43cf7a</div></div><div class="col-md-6 u_padding-md-vertical"><p class="lead">Payment Method <button class="btn btn-link btn-xs">Edit</button></p><div class="text-block"><b>VISA</b><br>4242-0000-4242-0000<br>Exp: 07/18</div></div></div><div class="row"><div class="col-md-6 u_padding-md-vertical"><p class="lead">Billing Address <button class="btn btn-link btn-xs">Edit</button></p><div class="text-block">Gob Bluth<br>user@risevision.com<br>Rise Vision Inc.<br>545 King Street West<br>Toronto, ON, M5V 1M1<br>Canada</div></div><div class="col-md-6 u_padding-md-vertical"><p class="lead">Shipping Address <button class="btn btn-link btn-xs">Edit</button></p><div class="text-block">Rise Vision Inc.<br>545 King Street West<br>Toronto, ON, M5V 1M1<br>Canada</div></div></div><hr style="margin-top: 5px; margin-bottom: 5px;"><div class="row"><div class="col-xs-12"><p class="lead">Subscription Details <button class="btn btn-link btn-xs">Edit</button></p></div></div><div class="row"><div class="col-sm-4 col-xs-6 text-right text-block"><p>Basic Plan (Yearly)<br>2 Additional Displays<br>GST<br>PST<br>Total Tax:</p><span class="order-total">Order Total:</span></div><div class="col-sm-4 col-xs-6 text-right text-block"><p>$85<br>$19<br>$1.70<br>$2.20<br>$4.70</p><span class="order-total">$122.34 <small class="u_margin-left">CAD</small></span></div><div class="col-sm-4 col-xs-12 text-right text-block"><button id="showTaxExempt" class="btn btn-link btn-xs">Submit Tax Exemption</button></div></div><div class="row"><hr></div><div class="row"><div class="col-xs-12 text-center"><button id="payButton" class="btn btn-primary btn-hg btn-block"><span id="payLabel">Pay $122.34 Now</span> <i id="loadSpinner" class="fa fa-spinner fa-spin fa-fw fa-inverse u_padding-lg-horizontal" style="display:none"></i></button><br></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-shipping-address.html',
    '<div id="content-three" class="prototype-show" style="display: none;"><form id="companyForm" role="form" class="u_margin-md-top" name="forms.companyForm" novalidate=""><div class="checkbox"><label><input type="checkbox" checked="false"> Same as Billing Address</label></div><div class="row"><div class="col-md-6"><div class="form-group"><label for="company-settings-street" class="control-label">Email</label> <input id="company-settings-street" type="text" class="form-control"></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-unit" class="control-label">Phone</label> <input id="company-settings-unit" type="text" class="form-control" ng-model="company.unit"></div></div></div><div class="form-group"><label for="company-settings-name">Company Name</label> <input id="company-settings-name" type="text" class="form-control" name="name"></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="company-settings-street" class="control-label">Address Line 1</label> <input id="company-settings-street" type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="company-settings-street" class="control-label">Address Line 2</label> <input id="company-settings-street" type="text" class="form-control"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label for="company-settings-city" class="control-label">City</label> <input id="company-settings-city" type="text" class="form-control" ng-model="company.city"></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-country" class="control-label">Country</label><select id="company-settings-country" class="form-control selectpicker" ng-model="company.country" ng-options="c.code as c.name for c in countries" empty-select-parser=""><option ng-show="false" value="" class="ng-hide">&lt; Select Country &gt;</option><option label="Afghanistan" value="string:AF">Afghanistan</option><option label="Albania" value="string:AL">Albania</option><option label="Algeria" value="string:DZ">Algeria</option><option label="American Samoa" value="string:AS">American Samoa</option><option label="Andorra" value="string:AD">Andorra</option><option label="Angola" value="string:AO">Angola</option><option label="Anguilla" value="string:AI">Anguilla</option><option label="Antarctica" value="string:AQ">Antarctica</option><option label="Antigua and Barbuda" value="string:AG">Antigua and Barbuda</option><option label="Argentina" value="string:AR">Argentina</option><option label="Armenia" value="string:AM">Armenia</option><option label="Aruba" value="string:AW">Aruba</option><option label="Australia" value="string:AU">Australia</option><option label="Austria" value="string:AT">Austria</option><option label="Azerbaijan" value="string:AZ">Azerbaijan</option><option label="Bahamas" value="string:BS">Bahamas</option><option label="Bahrain" value="string:BH">Bahrain</option><option label="Bangladesh" value="string:BD">Bangladesh</option><option label="Barbados" value="string:BB">Barbados</option><option label="Belarus" value="string:BY">Belarus</option><option label="Belgium" value="string:BE">Belgium</option><option label="Belize" value="string:BZ">Belize</option><option label="Benin" value="string:BJ">Benin</option><option label="Bermuda" value="string:BM">Bermuda</option><option label="Bhutan" value="string:BT">Bhutan</option><option label="Bolivia" value="string:BO">Bolivia</option><option label="Bonaire, Sint Eustatius and Saba" value="string:BQ">Bonaire, Sint Eustatius and Saba</option><option label="Bosnia and Herzegovina" value="string:BA">Bosnia and Herzegovina</option><option label="Botswana" value="string:BW">Botswana</option><option label="Bouvet Island" value="string:BV">Bouvet Island</option><option label="Brazil" value="string:BR">Brazil</option><option label="British Indian Ocean Territory" value="string:IO">British Indian Ocean Territory</option><option label="British Virgin Islands" value="string:VG">British Virgin Islands</option><option label="Brunei Darussalam" value="string:BN">Brunei Darussalam</option><option label="Bulgaria" value="string:BG">Bulgaria</option><option label="Burkina Faso" value="string:BF">Burkina Faso</option><option label="Burundi" value="string:BI">Burundi</option><option label="Cabo Verde" value="string:CV">Cabo Verde</option><option label="Cambodia" value="string:KH">Cambodia</option><option label="Cameroon" value="string:CM">Cameroon</option><option label="Canada" value="string:CA">Canada</option><option label="Cayman Islands" value="string:KY">Cayman Islands</option><option label="Central African Republic" value="string:CF">Central African Republic</option><option label="Chad" value="string:TD">Chad</option><option label="Chile" value="string:CL">Chile</option><option label="China" value="string:CN">China</option><option label="Christmas Island" value="string:CX">Christmas Island</option><option label="Cocos (Keeling) Islands" value="string:CC">Cocos (Keeling) Islands</option><option label="Colombia" value="string:CO">Colombia</option><option label="Comoros" value="string:KM">Comoros</option><option label="Congo" value="string:CG">Congo</option><option label="Congo, the Democratic Republic of the" value="string:CD">Congo, the Democratic Republic of the</option><option label="Cook Islands" value="string:CK">Cook Islands</option><option label="Costa Rica" value="string:CR">Costa Rica</option><option label="Croatia" value="string:HR">Croatia</option><option label="Cuba" value="string:CU">Cuba</option><option label="Curaçao" value="string:CW">Curaçao</option><option label="Cyprus" value="string:CY">Cyprus</option><option label="Czech Republic" value="string:CZ">Czech Republic</option><option label="Côte d\'Ivoire" value="string:CI">Côte d\'Ivoire</option><option label="Denmark" value="string:DK">Denmark</option><option label="Djibouti" value="string:DJ">Djibouti</option><option label="Dominica" value="string:DM">Dominica</option><option label="Dominican Republic" value="string:DO">Dominican Republic</option><option label="Ecuador" value="string:EC">Ecuador</option><option label="Egypt" value="string:EG">Egypt</option><option label="El Salvador" value="string:SV">El Salvador</option><option label="Equatorial Guinea" value="string:GQ">Equatorial Guinea</option><option label="Eritrea" value="string:ER">Eritrea</option><option label="Estonia" value="string:EE">Estonia</option><option label="Ethiopia" value="string:ET">Ethiopia</option><option label="Falkland Islands (Malvinas)" value="string:FK">Falkland Islands (Malvinas)</option><option label="Faroe Islands" value="string:FO">Faroe Islands</option><option label="Fiji" value="string:FJ">Fiji</option><option label="Finland" value="string:FI">Finland</option><option label="France" value="string:FR">France</option><option label="French Guiana" value="string:GF">French Guiana</option><option label="French Polynesia" value="string:PF">French Polynesia</option><option label="French Southern Territories" value="string:TF">French Southern Territories</option><option label="Gabon" value="string:GA">Gabon</option><option label="Gambia" value="string:GM">Gambia</option><option label="Georgia" value="string:GE">Georgia</option><option label="Germany" value="string:DE">Germany</option><option label="Ghana" value="string:GH">Ghana</option><option label="Gibraltar" value="string:GI">Gibraltar</option><option label="Greece" value="string:GR">Greece</option><option label="Greenland" value="string:GL">Greenland</option><option label="Grenada" value="string:GD">Grenada</option><option label="Guadeloupe" value="string:GP">Guadeloupe</option><option label="Guam" value="string:GU">Guam</option><option label="Guatemala" value="string:GT">Guatemala</option><option label="Guernsey" value="string:GG">Guernsey</option><option label="Guinea" value="string:GN">Guinea</option><option label="Guinea-Bissau" value="string:GW">Guinea-Bissau</option><option label="Guyana" value="string:GY">Guyana</option><option label="Haiti" value="string:HT">Haiti</option><option label="Heard Island and McDonald Islands" value="string:HM">Heard Island and McDonald Islands</option><option label="Holy See (Vatican City State)" value="string:VA">Holy See (Vatican City State)</option><option label="Honduras" value="string:HN">Honduras</option><option label="Hong Kong" value="string:HK">Hong Kong</option><option label="Hungary" value="string:HU">Hungary</option><option label="Iceland" value="string:IS">Iceland</option><option label="India" value="string:IN">India</option><option label="Indonesia" value="string:ID">Indonesia</option><option label="Iran" value="string:IR">Iran</option><option label="Iraq" value="string:IQ">Iraq</option><option label="Ireland" value="string:IE">Ireland</option><option label="Isle of Man" value="string:IM">Isle of Man</option><option label="Israel" value="string:IL">Israel</option><option label="Italy" value="string:IT">Italy</option><option label="Jamaica" value="string:JM">Jamaica</option><option label="Japan" value="string:JP">Japan</option><option label="Jersey" value="string:JE">Jersey</option><option label="Jordan" value="string:JO">Jordan</option><option label="Kazakhstan" value="string:KZ">Kazakhstan</option><option label="Kenya" value="string:KE">Kenya</option><option label="Kiribati" value="string:KI">Kiribati</option><option label="Korea, Democratic People\'s Republic of" value="string:KP">Korea, Democratic People\'s Republic of</option><option label="Korea, Republic of" value="string:KR">Korea, Republic of</option><option label="Kuwait" value="string:KW">Kuwait</option><option label="Kyrgyzstan" value="string:KG">Kyrgyzstan</option><option label="Lao People\'s Democratic Republic" value="string:LA">Lao People\'s Democratic Republic</option><option label="Latvia" value="string:LV">Latvia</option><option label="Lebanon" value="string:LB">Lebanon</option><option label="Lesotho" value="string:LS">Lesotho</option><option label="Liberia" value="string:LR">Liberia</option><option label="Libya" value="string:LY">Libya</option><option label="Liechtenstein" value="string:LI">Liechtenstein</option><option label="Lithuania" value="string:LT">Lithuania</option><option label="Luxembourg" value="string:LU">Luxembourg</option><option label="Macau" value="string:MO">Macau</option><option label="Macedonia, the former Yugoslav Republic of" value="string:MK">Macedonia, the former Yugoslav Republic of</option><option label="Madagascar" value="string:MG">Madagascar</option><option label="Malawi" value="string:MW">Malawi</option><option label="Malaysia" value="string:MY">Malaysia</option><option label="Maldives" value="string:MV">Maldives</option><option label="Mali" value="string:ML">Mali</option><option label="Malta" value="string:MT">Malta</option><option label="Marshall Islands" value="string:MH">Marshall Islands</option><option label="Martinique" value="string:MQ">Martinique</option><option label="Mauritania" value="string:MR">Mauritania</option><option label="Mauritius" value="string:MU">Mauritius</option><option label="Mayotte" value="string:YT">Mayotte</option><option label="Mexico" value="string:MX">Mexico</option><option label="Micronesia" value="string:FM">Micronesia</option><option label="Moldova" value="string:MD">Moldova</option><option label="Monaco" value="string:MC">Monaco</option><option label="Mongolia" value="string:MN">Mongolia</option><option label="Montenegro" value="string:ME">Montenegro</option><option label="Montserrat" value="string:MS">Montserrat</option><option label="Morocco" value="string:MA">Morocco</option><option label="Mozambique" value="string:MZ">Mozambique</option><option label="Myanmar" value="string:MM">Myanmar</option><option label="Namibia" value="string:NA">Namibia</option><option label="Nauru" value="string:NR">Nauru</option><option label="Nepal" value="string:NP">Nepal</option><option label="Netherlands" value="string:NL">Netherlands</option><option label="New Caledonia" value="string:NC">New Caledonia</option><option label="New Zealand" value="string:NZ">New Zealand</option><option label="Nicaragua" value="string:NI">Nicaragua</option><option label="Niger" value="string:NE">Niger</option><option label="Nigeria" value="string:NG">Nigeria</option><option label="Niue" value="string:NU">Niue</option><option label="Norfolk Island" value="string:NF">Norfolk Island</option><option label="Northern Mariana Islands" value="string:MP">Northern Mariana Islands</option><option label="Norway" value="string:NO">Norway</option><option label="Oman" value="string:OM">Oman</option><option label="Pakistan" value="string:PK">Pakistan</option><option label="Palau" value="string:PW">Palau</option><option label="Palestine, State of" value="string:PS">Palestine, State of</option><option label="Panama" value="string:PA">Panama</option><option label="Papua New Guinea" value="string:PG">Papua New Guinea</option><option label="Paraguay" value="string:PY">Paraguay</option><option label="Peru" value="string:PE">Peru</option><option label="Philippines" value="string:PH">Philippines</option><option label="Pitcairn" value="string:PN">Pitcairn</option><option label="Poland" value="string:PL">Poland</option><option label="Portugal" value="string:PT">Portugal</option><option label="Puerto Rico" value="string:PR">Puerto Rico</option><option label="Qatar" value="string:QA">Qatar</option><option label="Reunion" value="string:RE">Reunion</option><option label="Romania" value="string:RO">Romania</option><option label="Russian Federation" value="string:RU">Russian Federation</option><option label="Rwanda" value="string:RW">Rwanda</option><option label="Saint Barthélemy" value="string:BL">Saint Barthélemy</option><option label="Saint Helena, Ascension and Tristan da Cunha" value="string:SH">Saint Helena, Ascension and Tristan da Cunha</option><option label="Saint Kitts and Nevis" value="string:KN">Saint Kitts and Nevis</option><option label="Saint Lucia" value="string:LC">Saint Lucia</option><option label="Saint Martin (French part)" value="string:MF">Saint Martin (French part)</option><option label="Saint Vincent and The Grenadines" value="string:VC">Saint Vincent and The Grenadines</option><option label="Samoa" value="string:WS">Samoa</option><option label="San Marino" value="string:SM">San Marino</option><option label="Sao Tome and Principe" value="string:ST">Sao Tome and Principe</option><option label="Saudi Arabia" value="string:SA">Saudi Arabia</option><option label="Senegal" value="string:SN">Senegal</option><option label="Serbia" value="string:RS">Serbia</option><option label="Seychelles" value="string:SC">Seychelles</option><option label="Sierra Leone" value="string:SL">Sierra Leone</option><option label="Singapore" value="string:SG">Singapore</option><option label="Sint Maarten (Dutch part)" value="string:SX">Sint Maarten (Dutch part)</option><option label="Slovakia" value="string:SK">Slovakia</option><option label="Slovenia" value="string:SI">Slovenia</option><option label="Solomon Islands" value="string:SB">Solomon Islands</option><option label="Somalia" value="string:SO">Somalia</option><option label="South Africa" value="string:ZA">South Africa</option><option label="South Georgia and the South Sandwich Islands" value="string:GS">South Georgia and the South Sandwich Islands</option><option label="South Sudan" value="string:SS">South Sudan</option><option label="Spain" value="string:ES">Spain</option><option label="Sri Lanka" value="string:LK">Sri Lanka</option><option label="St. Pierre and Miquelon" value="string:PM">St. Pierre and Miquelon</option><option label="Sudan" value="string:SD">Sudan</option><option label="Suriname" value="string:SR">Suriname</option><option label="Svalbard and Jan Mayen" value="string:SJ">Svalbard and Jan Mayen</option><option label="Swaziland" value="string:SZ">Swaziland</option><option label="Sweden" value="string:SE">Sweden</option><option label="Switzerland" value="string:CH">Switzerland</option><option label="Syrian Arab Republic" value="string:SY">Syrian Arab Republic</option><option label="Taiwan" value="string:TW">Taiwan</option><option label="Tajikistan" value="string:TJ">Tajikistan</option><option label="Tanzania, United Republic of" value="string:TZ">Tanzania, United Republic of</option><option label="Thailand" value="string:TH">Thailand</option><option label="Timor-Leste" value="string:TL">Timor-Leste</option><option label="Togo" value="string:TG">Togo</option><option label="Tokelau" value="string:TK">Tokelau</option><option label="Tonga" value="string:TO">Tonga</option><option label="Trinidad and Tobago" value="string:TT">Trinidad and Tobago</option><option label="Tunisia" value="string:TN">Tunisia</option><option label="Turkey" value="string:TR">Turkey</option><option label="Turkmenistan" value="string:TM">Turkmenistan</option><option label="Turks and Caicos Islands" value="string:TC">Turks and Caicos Islands</option><option label="Tuvalu" value="string:TV">Tuvalu</option><option label="Uganda" value="string:UG">Uganda</option><option label="Ukraine" value="string:UA">Ukraine</option><option label="United Arab Emirates" value="string:AE">United Arab Emirates</option><option label="United Kingdom" value="string:GB">United Kingdom</option><option label="United States" value="string:US" selected="selected">United States</option><option label="Uruguay" value="string:UY">Uruguay</option><option label="US Minor Outlying Islands" value="string:UM">US Minor Outlying Islands</option><option label="US Virgin Islands" value="string:VI">US Virgin Islands</option><option label="Uzbekistan" value="string:UZ">Uzbekistan</option><option label="Vanuatu" value="string:VU">Vanuatu</option><option label="Venezuela, Bolivarian Republic of" value="string:VE">Venezuela, Bolivarian Republic of</option><option label="Viet Nam" value="string:VN">Viet Nam</option><option label="Wallis and Futuna Islands" value="string:WF">Wallis and Futuna Islands</option><option label="Western Sahara" value="string:EH">Western Sahara</option><option label="Yemen" value="string:YE">Yemen</option><option label="Zambia" value="string:ZM">Zambia</option><option label="Zimbabwe" value="string:ZW">Zimbabwe</option><option label="Åland Islands" value="string:AX">Åland Islands</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-state" class="control-label">State/Province/Region</label> <input id="company-settings-state" type="text" class="form-control ng-hide" ng-model="company.province" ng-hide="company.country == \'US\' || company.country == \'CA\'"><select class="form-control selectpicker ng-pristine ng-untouched ng-valid ng-hide ng-not-empty" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsCA" ng-show="company.country == \'CA\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide" selected="selected">&lt; Select Province &gt;</option><option label="Alberta" value="string:AB">Alberta</option><option label="British Columbia" value="string:BC">British Columbia</option><option label="Manitoba" value="string:MB">Manitoba</option><option label="New Brunswick" value="string:NB">New Brunswick</option><option label="Newfoundland and Labrador" value="string:NL">Newfoundland and Labrador</option><option label="Northwest Territories" value="string:NT">Northwest Territories</option><option label="Nova Scotia" value="string:NS">Nova Scotia</option><option label="Nunavut" value="string:NU">Nunavut</option><option label="Ontario" value="string:ON">Ontario</option><option label="Prince Edward Island" value="string:PE">Prince Edward Island</option><option label="Quebec" value="string:QC">Quebec</option><option label="Saskatchewan" value="string:SK">Saskatchewan</option><option label="Yukon Territory" value="string:YT">Yukon Territory</option></select><select class="form-control selectpicker" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsUS" ng-show="company.country == \'US\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide">&lt; Select State &gt;</option><option label="Alabama" value="string:AL">Alabama</option><option label="Alaska" value="string:AK">Alaska</option><option label="Arizona" value="string:AZ">Arizona</option><option label="Arkansas" value="string:AR">Arkansas</option><option label="California" value="string:CA">California</option><option label="Colorado" value="string:CO">Colorado</option><option label="Connecticut" value="string:CT">Connecticut</option><option label="Delaware" value="string:DE">Delaware</option><option label="District of Columbia" value="string:DC">District of Columbia</option><option label="Florida" value="string:FL">Florida</option><option label="Georgia" value="string:GA">Georgia</option><option label="Hawaii" value="string:HI">Hawaii</option><option label="Idaho" value="string:ID">Idaho</option><option label="Illinois" value="string:IL">Illinois</option><option label="Indiana" value="string:IN">Indiana</option><option label="Iowa" value="string:IA">Iowa</option><option label="Kansas" value="string:KS" selected="selected">Kansas</option><option label="Kentucky" value="string:KY">Kentucky</option><option label="Louisiana" value="string:LA">Louisiana</option><option label="Maine" value="string:ME">Maine</option><option label="Maryland" value="string:MD">Maryland</option><option label="Massachusetts" value="string:MA">Massachusetts</option><option label="Michigan" value="string:MI">Michigan</option><option label="Minnesota" value="string:MN">Minnesota</option><option label="Mississippi" value="string:MS">Mississippi</option><option label="Missouri" value="string:MO">Missouri</option><option label="Montana" value="string:MT">Montana</option><option label="Nebraska" value="string:NE">Nebraska</option><option label="Nevada" value="string:NV">Nevada</option><option label="New Hampshire" value="string:NH">New Hampshire</option><option label="New Jersey" value="string:NJ">New Jersey</option><option label="New Mexico" value="string:NM">New Mexico</option><option label="New York" value="string:NY">New York</option><option label="North Carolina" value="string:NC">North Carolina</option><option label="North Dakota" value="string:ND">North Dakota</option><option label="Ohio" value="string:OH">Ohio</option><option label="Oklahoma" value="string:OK">Oklahoma</option><option label="Oregon" value="string:OR">Oregon</option><option label="Pennsylvania" value="string:PA">Pennsylvania</option><option label="Rhode Island" value="string:RI">Rhode Island</option><option label="South Carolina" value="string:SC">South Carolina</option><option label="South Dakota" value="string:SD">South Dakota</option><option label="Tennessee" value="string:TN">Tennessee</option><option label="Texas" value="string:TX">Texas</option><option label="Utah" value="string:UT">Utah</option><option label="Vermont" value="string:VT">Vermont</option><option label="Virginia" value="string:VA">Virginia</option><option label="Washington" value="string:WA">Washington</option><option label="West Virginia" value="string:WV">West Virginia</option><option label="Wisconsin" value="string:WI">Wisconsin</option><option label="Wyoming" value="string:WY">Wyoming</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-zip" class="control-label">ZIP/Postal Code</label> <input id="company-settings-zip" type="text" class="form-control" ng-model="company.postalCode"></div></div></div></form><hr><div class="row"><div class="col-xs-12"><button id="" class="btn btn-default btn-lg pull-left">Back</button> <button id="" class="btn btn-primary btn-lg pull-right">Continue</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-subscriptions.html',
    '<div id="content-one" class="prototype-show prototype-show-ready"><h3>Enterprise Plan</h3><div class="flex-horizontal"><div><div class="text-center u_padding-md"><p style="font-size: 62px;line-height: 1;">$7</p><span>per Display<br>per Month</span></div></div><div style="display: flex; height: 110px; justify-content: center;"><b style="font-size: 33px; align-self: center;">x</b></div><div><div class="text-center u_padding-md"><p style="font-size: 62px;line-height: 1;">70</p><span>Displays Included</span></div></div></div><hr style="margin-bottom: 0"><style>\n' +
    '    .spinner {\n' +
    '      /* width: 100px; */\n' +
    '    }\n' +
    '\n' +
    '    .spinner input {\n' +
    '      text-align: right;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical {\n' +
    '      position: relative;\n' +
    '      white-space: nowrap;\n' +
    '      width: 1%;\n' +
    '      vertical-align: middle;\n' +
    '      display: table-cell;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical>.btn {\n' +
    '      display: block;\n' +
    '      float: none;\n' +
    '      width: 100%;\n' +
    '      max-width: 100%;\n' +
    '      padding: 8px;\n' +
    '      margin-left: -1px;\n' +
    '      position: relative;\n' +
    '      border-radius: 0;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical>.btn:first-child {\n' +
    '      border-top-left-radius: 4px;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical>.btn:last-child {\n' +
    '      margin-top: -2px;\n' +
    '      border-bottom-left-radius: 4px;\n' +
    '    }\n' +
    '\n' +
    '    .input-group-btn-vertical i {\n' +
    '      position: absolute;\n' +
    '      top: 0;\n' +
    '      left: 4px;\n' +
    '    }\n' +
    '\n' +
    '    .radio label {\n' +
    '      padding: 5px 0 5px 30px;\n' +
    '    }\n' +
    '\n' +
    '    .form-group {\n' +
    '      margin-bottom: 8px;\n' +
    '    }\n' +
    '  </style><div class="text-center" style="height: 32px;"><b style="font-size: 33px;position: relative;top: -28px;background: #fcfcfc;border: 10px solid #fcfcfc;">+</b></div><div class="row"><div class="col-xs-12">Need more Displays than Enterprise Plan offers?<label class="label" style="color: #020622;">($7 per Display)</label><br><br></div><div class="col-xs-12"><div class="input-group spinner" style="border-radius: 4px !important;"><div class="input-group-btn-vertical"><button class="btn btn-white" type="button"><i class="fa fa-caret-up"></i></button> <button class="btn btn-white" type="button"><i class="fa fa-caret-down"></i></button></div><input type="text" class="form-control" value="2" style="width: 50px; font-size: 18px; border-radius: 4px; text-align: center;"> <span class="icon-right u_margin-md-top" style="vertical-align: -webkit-baseline-middle;">additional Display licenses added to your purchase.</span></div></div><div class="col-xs-12"><hr></div><div class="col-xs-12"><div class="text-right"><div class="label" style="color: #020622;"><b class="pull-left">TOTAL</b> <b class="pull-right">Pay yearly, get one month free!</b></div></div><div class="panel payment-recurrence-selector" style="padding: 0;"><div class="radio" style="background: aliceblue"><label><input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked=""> $27 billed monthly</label></div><div class="radio"><label><input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"> $267 billed yearly</label> <label style="border: 1px solid #1fbc52; padding: 0px 12px; float: right; color: #1fbc52; cursor: default; top: 4px; position: relative; right: 5px;">Save $54!</label></div></div></div></div><hr><div class="row"><div class="col-xs-12"><button id="" class="btn btn-primary btn-lg pull-right">Continue</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/checkout-success.html',
    '<div id="content-success" class="prototype-show" style="display: none"><h3 class="text-center u_margin-md-top">Payment Successful!</h3><div class="flex-horizontal"><div><div class="text-center u_padding-md"><img src="https://s3.amazonaws.com/Rise-Images/Icons/online.svg" style="width:72px" alt="Payment Successful"><p>Your payment to Rise Vision was successful. You can view details of this payment <a href="#">here</a>.</p><br></div></div></div><hr><div class="row text-center"><div class="col-xs-12"><button id="" class="btn btn-primary btn-lg pull-right">Done</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/plans-modal.html',
    '<div rv-spinner="" rv-spinner-key="plans-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 id="modalTitle" class="modal-title" translate="">common-header.plans.choose-plan</h3></div><div id="plans-modal" class="modal-body u_padding-lg" stop-event="touchend"><div class="text-center"><div class="btn-group" role="group" aria-label="..."><button ng-click="monthlyPrices = true" type="button" class="btn btn-default" ng-class="{ active: monthlyPrices }">Monthly</button> <button ng-click="monthlyPrices = false" type="button" class="btn btn-default" ng-class="{ active: !monthlyPrices }">Yearly</button></div><p class="u_padding-sm-vertical">Pay yearly, get one month free!</p></div><div class="pricing-table"><div id="planHeader" class="monthly"><div class="planColumn" ng-class="{ currentPlan: currentPlanLabelVisible(plan) }" ng-repeat="plan in plans"><div id="current-plan" class="currentPlanLabel" ng-show="currentPlanLabelVisible(plan)" translate="">common-header.plans.current</div><h2>{{plan.name}}</h2><h3 class="planColumnPrice" ng-show="!isFree(plan) && !isStarter(plan)"><span>$10</span>${{ monthlyPrices ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><h3 class="planColumnPrice" ng-show="isStarter(plan)">${{ monthlyPrices ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><p ng-show="!isFree(plan) && monthlyPrices" class="text-muted" translate="" translate-values="{ price: plan.monthly.billAmount }">common-header.plans.perDisplayBilledMonthly</p><p ng-show="!isFree(plan) && !monthlyPrices" class="text-muted" translate="" translate-values="{ price: plan.yearly.billAmount }">common-header.plans.perDisplayBilledYearly</p><div ng-show="!isFree(plan)"><h3>{{plan.proLicenseCount}}</h3><span ng-show="plan.proLicenseCount === 1" translate="">common-header.plans.displayIncluded</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.plans.displaysIncluded</span></div><p ng-show="showSavings(plan)" class="planSavings" translate="" translate-values="{ save: (monthlyPrices ? plan.monthly.save : plan.yearly.save) }">common-header.plans.saveEachYear</p><p ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" translate="">common-header.plans.needMoreDisplays</p><a ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" href="https://www.risevision.com/purchaseadditionaldisplaylicenses" target="_blank" translate="">common-header.plans.individual-licenses</a><p id="trial-days-remaining" class="small u_margin-sm-bottom" ng-show="isCurrentPlan(plan) && isOnTrial(plan)" translate="" translate-values="{ count: currentPlan.trialPeriod }">common-header.plans.days-left-trial</p><p class="small u_margin-sm-bottom text-danger" ng-show="isCurrentPlan(plan) && isTrialExpired(plan)" translate="">common-header.plans.trial-expired</p><a id="subscribe-plan" ng-show="getVisibleAction(plan) === \'subscribe\'" x="" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="downgrade-plan" ng-show="getVisibleAction(plan) === \'downgrade\'" target="_blank" href="https://www.risevision.com/downgradeplan" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="start-trial-plan" ng-show="getVisibleAction(plan) === \'start-trial\'" target="_blank" ng-click="startTrial(plan)" class="btn btn-primary btn-block" translate="">common-header.plans.start-trial</a></div></div><div id="planFeatures"><div class="planFeatureColumn" id="planFreeFeatures"><h4 id="planFeatures" class="planFeatureColumnTitle" style="column-span: all;">You can use the following features for free on any of your displays!</h4><div class="planFeature"><p class="featureTitle">Text</p></div><div class="planFeature"><p class="featureTitle">Image by URL</p></div><div class="planFeature"><p class="featureTitle">Video by URL</p></div><div class="planFeature"><p class="featureTitle">RSS</p></div><div class="planFeature"><p class="featureTitle">Time & Date</p></div><div class="planFeature"><p class="featureTitle">HTML</p></div></div><div class="planFeatureColumn" id="planPaidFeatures"><h4 class="planFeatureColumnTitle" style="column-span: all;">Key Features Included With All Paid Plans <span class="u_padding-sm-vertical">Everything in \'Free\' +</span></h4><div class="planFeature"><p class="featureTitle">Image Slideshows</p></div><div class="planFeature"><p class="featureTitle">Video Playlists</p></div><div class="planFeature"><p class="featureTitle">Unlimited Image & Video File Storage</p></div><div class="planFeature"><p class="featureTitle">Pre-made Templates</p></div><div class="planFeature"><p class="featureTitle">Centralized Content Control</p></div><div class="planFeature"><p class="featureTitle">Scheduling</p></div><div class="planFeature"><p class="featureTitle">Google Calendar</p></div><div class="planFeature"><p class="featureTitle">Google Spreadsheet</p></div><div class="planFeature"><p class="featureTitle">Twitter</p></div><div class="planFeature"><p class="featureTitle">Web Pages</p></div><div class="planFeature"><p class="featureTitle">Google Reliability & Security</p></div><div class="planFeature"><p class="featureTitle">Account / Sub-Account Hierarchy</p></div><div class="planFeature"><p class="featureTitle">User Role Permissioning</p></div><div class="planFeature"><p class="featureTitle">Display Monitoring Notifications</p></div><div class="planFeature"><p class="featureTitle">Content Shows Offline</p></div><div class="planFeature"><p class="featureTitle">Alert Integration</p></div><div class="planFeature"><p class="featureTitle">Display On/Off Control</p></div><h4 class="text-center" style="column-span: all;"><a href="https://www.risevision.com/pricing" target="_blank">Learn More About Key Features</a></h4></div></div><div id="planFooter"></div></div><div class="text-center u_padding-sm-vertical"><h3><a href="https://www.risevision.com/contact-us" target="_blank">Questions? We can help!</a></h3><h3><a href="https://www.risevision.com/licensesubcompany" target="_blank">Need to license your Sub-Company?</a></h3></div></div><style>\n' +
    '    .bordered-right {\n' +
    '      border-right: 1px solid #DDD;\n' +
    '    }\n' +
    '\n' +
    '    @media (max-width: 768px) {\n' +
    '      .bordered-right {\n' +
    '        border-right: 0;\n' +
    '      }\n' +
    '    }\n' +
    '\n' +
    '    .lead {\n' +
    '      margin-bottom: 10px;\n' +
    '    }\n' +
    '\n' +
    '    .text-block {\n' +
    '      font-size: 12px;\n' +
    '    }\n' +
    '\n' +
    '    small {\n' +
    '      color: #5b5b5b;\n' +
    '    }\n' +
    '\n' +
    '    #security-branding {\n' +
    '      margin-bottom: 0;\n' +
    '      background: #f2f2f2;\n' +
    '      overflow: hidden;\n' +
    '      border-radius: 0 0 4px 4px;\n' +
    '      border-top: 1px solid #e5e5e5;\n' +
    '      min-height: 16.43px;\n' +
    '      width: 100%;\n' +
    '    }\n' +
    '\n' +
    '    #security-branding img {\n' +
    '      width: auto;\n' +
    '      height: 16px;\n' +
    '      position: relative;\n' +
    '      top: -2px;\n' +
    '      margin-right: 5px;\n' +
    '    }\n' +
    '\n' +
    '    .flex-horizontal {\n' +
    '      display: flex;\n' +
    '      flex-direction: row;\n' +
    '      justify-content: center;\n' +
    '      height: 100%;\n' +
    '    }\n' +
    '\n' +
    '    .flex-horizontal>div:nth-of-type(even) {\n' +
    '      flex: 1;\n' +
    '    }\n' +
    '\n' +
    '    .flex-horizontal>div:nth-of-type(odd) {\n' +
    '      flex: 5;\n' +
    '    }\n' +
    '\n' +
    '    .pagination-container {\n' +
    '      margin-top: 120px;\n' +
    '    }\n' +
    '\n' +
    '    /* RENAME THIS */\n' +
    '\n' +
    '    .pagination {\n' +
    '      width: 100%;\n' +
    '      text-align: center;\n' +
    '      padding: 0;\n' +
    '      display: inline-block;\n' +
    '      margin: 30px 0 0 8px;\n' +
    '    }\n' +
    '\n' +
    '    .indicator {\n' +
    '      width: 15px;\n' +
    '      height: 15px;\n' +
    '      border: 4px solid #dddddd;\n' +
    '      border-radius: 50%;\n' +
    '      display: inline-block;\n' +
    '      position: relative;\n' +
    '    }\n' +
    '\n' +
    '    .indicator .tag {\n' +
    '      position: absolute;\n' +
    '      top: -40px;\n' +
    '      left: 50%;\n' +
    '      transform: translateX(-50%);\n' +
    '      color: #dddddd;\n' +
    '      font-size: 12px;\n' +
    '      cursor: default;\n' +
    '    }\n' +
    '\n' +
    '    .indicator.active,\n' +
    '    .indicator.complete {\n' +
    '      border-color: #4ab767;\n' +
    '    }\n' +
    '\n' +
    '    .indicator.active .tag,\n' +
    '    .indicator.complete .tag {\n' +
    '      color: #4ab767;\n' +
    '    }\n' +
    '\n' +
    '    .indicator.complete .tag:before {\n' +
    '      content: "\\f00c";\n' +
    '      margin-right: 4px;\n' +
    '      font-family: FontAwesome;\n' +
    '      font-style: normal;\n' +
    '      font-weight: normal;\n' +
    '      text-decoration: inherit;\n' +
    '      color: #4ab767;\n' +
    '      font-size: 14px;\n' +
    '    }\n' +
    '\n' +
    '    .progress-bar-container {\n' +
    '      width: 17%;\n' +
    '      height: 2px;\n' +
    '      display: inline-block;\n' +
    '      background-color: #dddddd;\n' +
    '      position: relative;\n' +
    '      top: -6px;\n' +
    '    }\n' +
    '\n' +
    '    .progress-bar-container:last-of-type {\n' +
    '      display: none;\n' +
    '    }\n' +
    '\n' +
    '    .progress-bar-container .progress-bar {\n' +
    '      width: 0;\n' +
    '      height: 100%;\n' +
    '      background-color: #4ab767;\n' +
    '    }\n' +
    '\n' +
    '    .indicator.complete+.progress-bar-container.complete {\n' +
    '      background-color: #4ab767;\n' +
    '    }\n' +
    '\n' +
    '    .payment-recurrence-selector .radio {\n' +
    '      position: relative;\n' +
    '      display: block;\n' +
    '      min-height: 20px;\n' +
    '      padding: 9px;\n' +
    '      margin: 0;\n' +
    '    }\n' +
    '\n' +
    '  </style><div id="checkout-modal" class="modal-body" style="padding: 16px 32px" stop-event="touchend"><div class="sized-container"><div class="pagination"><div class="indicator active" id="step-one"><div class="tag">Subscription Details</div></div><div class="progress-bar-container"><div class="progress-bar"></div></div><div class="indicator" id="step-two"><div class="tag">Billing Address</div></div><div class="progress-bar-container"><div class="progress-bar"></div></div><div class="indicator" id="step-three"><div class="tag">Shipping Address</div></div><div class="progress-bar-container"><div class="progress-bar"></div></div><div class="indicator" id="step-four"><div class="tag">Payment Method</div></div><div class="progress-bar-container"><div class="progress-bar"></div></div><div class="indicator" id="step-five"><div class="tag">Purchase Review</div></div><div class="progress-bar-container"><div class="progress-bar"></div></div></div></div><div ng-include="\'plans/checkout-subscriptions.html\'"></div><div ng-include="\'plans/checkout-billing-address.html\'"></div><div ng-include="\'plans/checkout-billing-address-error.html\'"></div><div ng-include="\'plans/checkout-shipping-address.html\'"></div><div ng-include="\'plans/checkout-payment-methods.html\'"></div><div ng-include="\'plans/checkout-review-purchase.html\'"></div><div ng-include="\'plans/checkout-success.html\'"></div><div ng-include="\'plans/tax-exemption.html\'"></div></div><script>\n' +
    '    //SETUP\n' +
    '    $(document).ready(function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $(".prototype-show-ready").show();\n' +
    '    });\n' +
    '\n' +
    '    //INCREMENT SPINNER\n' +
    '    $(document).on("click", ".spinner .btn:first-of-type", function () {\n' +
    '      $(\'.spinner input\').val(parseInt($(\'.spinner input\').val(), 10) + 1);\n' +
    '    });\n' +
    '    $(document).on("click", ".spinner .btn:last-of-type", function () {\n' +
    '      $(\'.spinner input\').val(parseInt($(\'.spinner input\').val(), 10) - 1);\n' +
    '    });\n' +
    '\n' +
    '\n' +
    '    //CYCLE STEPS\n' +
    '    $(document).on("click", "#step-one", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#content-one").show();\n' +
    '    });\n' +
    '    $(document).on("click", "#step-two", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#content-two").show();\n' +
    '    });\n' +
    '    $(document).on("click", "#step-three", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#content-three").show();\n' +
    '    });\n' +
    '    $(document).on("click", "#step-four", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#content-four").show();\n' +
    '      $("#security-branding").show();\n' +
    '    });\n' +
    '    $(document).on("click", "#step-five", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#content-five").show();\n' +
    '      $("#security-branding").show();\n' +
    '    });\n' +
    '\n' +
    '    // STEP THROUGH CHECKOUT NAV \n' +
    '    $(document).on("click", ".indicator", function () {\n' +
    '      var target = $(this);\n' +
    '      $(".indicator").removeClass("active");\n' +
    '      $(this).removeClass("complete");\n' +
    '      $(this).addClass("active");\n' +
    '      $(this).prevAll().addClass("complete");\n' +
    '    });\n' +
    '\n' +
    '    // HIGHLIGHT PAYMENT CYCLE\n' +
    '    $(document).on(\'change\', \'input[type=radio][name=optionsRadios]\', function () {\n' +
    '      if (this.value == \'option1\') {\n' +
    '        $(".radio").css("background", "white");\n' +
    '        $("#optionsRadios1").closest(".radio").css("background", "aliceblue");\n' +
    '      } else if (this.value == \'option2\') {\n' +
    '        $(".radio").css("background", "white");\n' +
    '        $("#optionsRadios2").closest(".radio").css("background", "aliceblue");\n' +
    '      }\n' +
    '    });\n' +
    '\n' +
    '    //PAYMENT METHOD DROPDOWN\n' +
    '    $(document).on(\'change\', \'#paymentMethodSelector\', function () {\n' +
    '      $("#existingCardCC").hide();\n' +
    '      $("#firstTimeCC").show();\n' +
    '    });\n' +
    '\n' +
    '    //CONTROL MODAL\n' +
    '    $(document).on("click", "#subscribe-plan", function () {\n' +
    '      $("#plans-modal").hide();\n' +
    '      $("#checkout-modal").show();\n' +
    '\n' +
    '      $("h3#modalTitle").text("Checkout");\n' +
    '\n' +
    '      $(".modal-dialog").removeClass("modal-lg");\n' +
    '      $(".modal-dialog").addClass("modal-md");\n' +
    '    });\n' +
    '\n' +
    '    //HIDE CC ADDRESS\n' +
    '    $(document).on("click", "#toggleMatchBillingAddress", function () {\n' +
    '      this.checked ? $(\'#targetCCAddress\').hide(400) : $(\'#targetCCAddress\').show(400);\n' +
    '    });\n' +
    '\n' +
    '    //SHOW ERROR STATE \n' +
    '    $(document).on("click", "#reveal-billing-error", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $(".sized-container").hide();\n' +
    '      $("#content-two-error").show();\n' +
    '    });\n' +
    '\n' +
    '    //CLEAR ERROR STATE \n' +
    '    $(document).on("click", "#hide-billing-error", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#content-two").show();\n' +
    '      $(".sized-container").show();\n' +
    '    });\n' +
    '\n' +
    '    //SHOW TAX EXEMPTION\n' +
    '    $(document).on("click", "#showTaxExempt", function () {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#tax-exemption-form").show();\n' +
    '    });\n' +
    '\n' +
    '    // LOAD SUCCESS SCREEN\n' +
    '    function showSuccess() {\n' +
    '      $(".prototype-show").hide();\n' +
    '      $("#content-success").show();\n' +
    '      $("#security-branding").hide();\n' +
    '    }\n' +
    '\n' +
    '    //TIMER LOADING BUTTON\n' +
    '    $(document).on("click", "#payButton", function () {\n' +
    '      $("#payLabel").hide();\n' +
    '      $("#loadSpinner").show();\n' +
    '      setTimeout(function () {\n' +
    '        showSuccess();\n' +
    '      }, 5000);\n' +
    '    });\n' +
    '  </script><div id="security-branding" class="text-center u_padding-xs prototype-show"><small><i class="fa fa-lock icon-left"></i> Secure Checkout from <img src="https://s3.amazonaws.com/Rise-Images/UI/chargebee-icon.svg"> Chargebee and <img alt="powered by Stripe" src="https://s3.amazonaws.com/Rise-Images/UI/powered_by_stripe.svg"></small></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.plans');
} catch (e) {
  module = angular.module('risevision.common.components.plans', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plans/tax-exemption.html',
    '<div id="tax-exemption-form" class="prototype-show" style="display: none;"><form id="" role="form" class="u_margin-md-top" novalidate=""><div class="row"><div class="col-xs-12"><div class="form-group"><label class="control-label">Tax Exemption Number</label> <input type="text" class="form-control"></div></div></div><label class="control-label">Tax Exemption Document (Image or PDF only)</label><div class="row"><div class="col-xs-9"><div class="form-group"><div class="input-group"><input class="form-control" readonly="readonly" type="text" name="" value="exempt001.jpg"> <a href="#" class="btn btn-default input-group-addon"><i class="fa fa-times"></i></a></div></div></div><div class="col-xs-3"><button class="btn btn-default">Attach File</button></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label for="company-settings-state" class="control-label">Exemption State/Province</label><select class="form-control selectpicker"><option value="" selected="selected">&lt; Select Province &gt;</option><option label="Alberta" value="string:AB">Alberta</option><option label="British Columbia" value="string:BC">British Columbia</option><option label="Manitoba" value="string:MB">Manitoba</option><option label="New Brunswick" value="string:NB">New Brunswick</option><option label="Newfoundland and Labrador" value="string:NL">Newfoundland and Labrador</option><option label="Northwest Territories" value="string:NT">Northwest Territories</option><option label="Nova Scotia" value="string:NS">Nova Scotia</option><option label="Nunavut" value="string:NU">Nunavut</option><option label="Ontario" value="string:ON">Ontario</option><option label="Prince Edward Island" value="string:PE">Prince Edward Island</option><option label="Quebec" value="string:QC">Quebec</option><option label="Saskatchewan" value="string:SK">Saskatchewan</option><option label="Yukon Territory" value="string:YT">Yukon Territory</option></select><select class="form-control selectpicker" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsUS" ng-show="company.country == \'US\'" empty-select-parser=""><option ng-show="false" value="" class="ng-hide">&lt; Select State &gt;</option><option label="Alabama" value="string:AL">Alabama</option><option label="Alaska" value="string:AK">Alaska</option><option label="Arizona" value="string:AZ">Arizona</option><option label="Arkansas" value="string:AR">Arkansas</option><option label="California" value="string:CA">California</option><option label="Colorado" value="string:CO">Colorado</option><option label="Connecticut" value="string:CT">Connecticut</option><option label="Delaware" value="string:DE">Delaware</option><option label="District of Columbia" value="string:DC">District of Columbia</option><option label="Florida" value="string:FL">Florida</option><option label="Georgia" value="string:GA">Georgia</option><option label="Hawaii" value="string:HI">Hawaii</option><option label="Idaho" value="string:ID">Idaho</option><option label="Illinois" value="string:IL">Illinois</option><option label="Indiana" value="string:IN">Indiana</option><option label="Iowa" value="string:IA">Iowa</option><option label="Kansas" value="string:KS" selected="selected">Kansas</option><option label="Kentucky" value="string:KY">Kentucky</option><option label="Louisiana" value="string:LA">Louisiana</option><option label="Maine" value="string:ME">Maine</option><option label="Maryland" value="string:MD">Maryland</option><option label="Massachusetts" value="string:MA">Massachusetts</option><option label="Michigan" value="string:MI">Michigan</option><option label="Minnesota" value="string:MN">Minnesota</option><option label="Mississippi" value="string:MS">Mississippi</option><option label="Missouri" value="string:MO">Missouri</option><option label="Montana" value="string:MT">Montana</option><option label="Nebraska" value="string:NE">Nebraska</option><option label="Nevada" value="string:NV">Nevada</option><option label="New Hampshire" value="string:NH">New Hampshire</option><option label="New Jersey" value="string:NJ">New Jersey</option><option label="New Mexico" value="string:NM">New Mexico</option><option label="New York" value="string:NY">New York</option><option label="North Carolina" value="string:NC">North Carolina</option><option label="North Dakota" value="string:ND">North Dakota</option><option label="Ohio" value="string:OH">Ohio</option><option label="Oklahoma" value="string:OK">Oklahoma</option><option label="Oregon" value="string:OR">Oregon</option><option label="Pennsylvania" value="string:PA">Pennsylvania</option><option label="Rhode Island" value="string:RI">Rhode Island</option><option label="South Carolina" value="string:SC">South Carolina</option><option label="South Dakota" value="string:SD">South Dakota</option><option label="Tennessee" value="string:TN">Tennessee</option><option label="Texas" value="string:TX">Texas</option><option label="Utah" value="string:UT">Utah</option><option label="Vermont" value="string:VT">Vermont</option><option label="Virginia" value="string:VA">Virginia</option><option label="Washington" value="string:WA">Washington</option><option label="West Virginia" value="string:WV">West Virginia</option><option label="Wisconsin" value="string:WI">Wisconsin</option><option label="Wyoming" value="string:WY">Wyoming</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-country" class="control-label">Exemption Country</label><select id="company-settings-country" class="form-control selectpicker" empty-select-parser=""><option ng-show="false" value="">&lt; Select Country &gt;</option><option label="Afghanistan" value="string:AF">Afghanistan</option><option label="Albania" value="string:AL">Albania</option><option label="Algeria" value="string:DZ">Algeria</option><option label="American Samoa" value="string:AS">American Samoa</option><option label="Andorra" value="string:AD">Andorra</option><option label="Angola" value="string:AO">Angola</option><option label="Anguilla" value="string:AI">Anguilla</option><option label="Antarctica" value="string:AQ">Antarctica</option><option label="Antigua and Barbuda" value="string:AG">Antigua and Barbuda</option><option label="Argentina" value="string:AR">Argentina</option><option label="Armenia" value="string:AM">Armenia</option><option label="Aruba" value="string:AW">Aruba</option><option label="Australia" value="string:AU">Australia</option><option label="Austria" value="string:AT">Austria</option><option label="Azerbaijan" value="string:AZ">Azerbaijan</option><option label="Bahamas" value="string:BS">Bahamas</option><option label="Bahrain" value="string:BH">Bahrain</option><option label="Bangladesh" value="string:BD">Bangladesh</option><option label="Barbados" value="string:BB">Barbados</option><option label="Belarus" value="string:BY">Belarus</option><option label="Belgium" value="string:BE">Belgium</option><option label="Belize" value="string:BZ">Belize</option><option label="Benin" value="string:BJ">Benin</option><option label="Bermuda" value="string:BM">Bermuda</option><option label="Bhutan" value="string:BT">Bhutan</option><option label="Bolivia" value="string:BO">Bolivia</option><option label="Bonaire, Sint Eustatius and Saba" value="string:BQ">Bonaire, Sint Eustatius and Saba</option><option label="Bosnia and Herzegovina" value="string:BA">Bosnia and Herzegovina</option><option label="Botswana" value="string:BW">Botswana</option><option label="Bouvet Island" value="string:BV">Bouvet Island</option><option label="Brazil" value="string:BR">Brazil</option><option label="British Indian Ocean Territory" value="string:IO">British Indian Ocean Territory</option><option label="British Virgin Islands" value="string:VG">British Virgin Islands</option><option label="Brunei Darussalam" value="string:BN">Brunei Darussalam</option><option label="Bulgaria" value="string:BG">Bulgaria</option><option label="Burkina Faso" value="string:BF">Burkina Faso</option><option label="Burundi" value="string:BI">Burundi</option><option label="Cabo Verde" value="string:CV">Cabo Verde</option><option label="Cambodia" value="string:KH">Cambodia</option><option label="Cameroon" value="string:CM">Cameroon</option><option label="Canada" value="string:CA">Canada</option><option label="Cayman Islands" value="string:KY">Cayman Islands</option><option label="Central African Republic" value="string:CF">Central African Republic</option><option label="Chad" value="string:TD">Chad</option><option label="Chile" value="string:CL">Chile</option><option label="China" value="string:CN">China</option><option label="Christmas Island" value="string:CX">Christmas Island</option><option label="Cocos (Keeling) Islands" value="string:CC">Cocos (Keeling) Islands</option><option label="Colombia" value="string:CO">Colombia</option><option label="Comoros" value="string:KM">Comoros</option><option label="Congo" value="string:CG">Congo</option><option label="Congo, the Democratic Republic of the" value="string:CD">Congo, the Democratic Republic of the</option><option label="Cook Islands" value="string:CK">Cook Islands</option><option label="Costa Rica" value="string:CR">Costa Rica</option><option label="Croatia" value="string:HR">Croatia</option><option label="Cuba" value="string:CU">Cuba</option><option label="Curaçao" value="string:CW">Curaçao</option><option label="Cyprus" value="string:CY">Cyprus</option><option label="Czech Republic" value="string:CZ">Czech Republic</option><option label="Côte d\'Ivoire" value="string:CI">Côte d\'Ivoire</option><option label="Denmark" value="string:DK">Denmark</option><option label="Djibouti" value="string:DJ">Djibouti</option><option label="Dominica" value="string:DM">Dominica</option><option label="Dominican Republic" value="string:DO">Dominican Republic</option><option label="Ecuador" value="string:EC">Ecuador</option><option label="Egypt" value="string:EG">Egypt</option><option label="El Salvador" value="string:SV">El Salvador</option><option label="Equatorial Guinea" value="string:GQ">Equatorial Guinea</option><option label="Eritrea" value="string:ER">Eritrea</option><option label="Estonia" value="string:EE">Estonia</option><option label="Ethiopia" value="string:ET">Ethiopia</option><option label="Falkland Islands (Malvinas)" value="string:FK">Falkland Islands (Malvinas)</option><option label="Faroe Islands" value="string:FO">Faroe Islands</option><option label="Fiji" value="string:FJ">Fiji</option><option label="Finland" value="string:FI">Finland</option><option label="France" value="string:FR">France</option><option label="French Guiana" value="string:GF">French Guiana</option><option label="French Polynesia" value="string:PF">French Polynesia</option><option label="French Southern Territories" value="string:TF">French Southern Territories</option><option label="Gabon" value="string:GA">Gabon</option><option label="Gambia" value="string:GM">Gambia</option><option label="Georgia" value="string:GE">Georgia</option><option label="Germany" value="string:DE">Germany</option><option label="Ghana" value="string:GH">Ghana</option><option label="Gibraltar" value="string:GI">Gibraltar</option><option label="Greece" value="string:GR">Greece</option><option label="Greenland" value="string:GL">Greenland</option><option label="Grenada" value="string:GD">Grenada</option><option label="Guadeloupe" value="string:GP">Guadeloupe</option><option label="Guam" value="string:GU">Guam</option><option label="Guatemala" value="string:GT">Guatemala</option><option label="Guernsey" value="string:GG">Guernsey</option><option label="Guinea" value="string:GN">Guinea</option><option label="Guinea-Bissau" value="string:GW">Guinea-Bissau</option><option label="Guyana" value="string:GY">Guyana</option><option label="Haiti" value="string:HT">Haiti</option><option label="Heard Island and McDonald Islands" value="string:HM">Heard Island and McDonald Islands</option><option label="Holy See (Vatican City State)" value="string:VA">Holy See (Vatican City State)</option><option label="Honduras" value="string:HN">Honduras</option><option label="Hong Kong" value="string:HK">Hong Kong</option><option label="Hungary" value="string:HU">Hungary</option><option label="Iceland" value="string:IS">Iceland</option><option label="India" value="string:IN">India</option><option label="Indonesia" value="string:ID">Indonesia</option><option label="Iran" value="string:IR">Iran</option><option label="Iraq" value="string:IQ">Iraq</option><option label="Ireland" value="string:IE">Ireland</option><option label="Isle of Man" value="string:IM">Isle of Man</option><option label="Israel" value="string:IL">Israel</option><option label="Italy" value="string:IT">Italy</option><option label="Jamaica" value="string:JM">Jamaica</option><option label="Japan" value="string:JP">Japan</option><option label="Jersey" value="string:JE">Jersey</option><option label="Jordan" value="string:JO">Jordan</option><option label="Kazakhstan" value="string:KZ">Kazakhstan</option><option label="Kenya" value="string:KE">Kenya</option><option label="Kiribati" value="string:KI">Kiribati</option><option label="Korea, Democratic People\'s Republic of" value="string:KP">Korea, Democratic People\'s Republic of</option><option label="Korea, Republic of" value="string:KR">Korea, Republic of</option><option label="Kuwait" value="string:KW">Kuwait</option><option label="Kyrgyzstan" value="string:KG">Kyrgyzstan</option><option label="Lao People\'s Democratic Republic" value="string:LA">Lao People\'s Democratic Republic</option><option label="Latvia" value="string:LV">Latvia</option><option label="Lebanon" value="string:LB">Lebanon</option><option label="Lesotho" value="string:LS">Lesotho</option><option label="Liberia" value="string:LR">Liberia</option><option label="Libya" value="string:LY">Libya</option><option label="Liechtenstein" value="string:LI">Liechtenstein</option><option label="Lithuania" value="string:LT">Lithuania</option><option label="Luxembourg" value="string:LU">Luxembourg</option><option label="Macau" value="string:MO">Macau</option><option label="Macedonia, the former Yugoslav Republic of" value="string:MK">Macedonia, the former Yugoslav Republic of</option><option label="Madagascar" value="string:MG">Madagascar</option><option label="Malawi" value="string:MW">Malawi</option><option label="Malaysia" value="string:MY">Malaysia</option><option label="Maldives" value="string:MV">Maldives</option><option label="Mali" value="string:ML">Mali</option><option label="Malta" value="string:MT">Malta</option><option label="Marshall Islands" value="string:MH">Marshall Islands</option><option label="Martinique" value="string:MQ">Martinique</option><option label="Mauritania" value="string:MR">Mauritania</option><option label="Mauritius" value="string:MU">Mauritius</option><option label="Mayotte" value="string:YT">Mayotte</option><option label="Mexico" value="string:MX">Mexico</option><option label="Micronesia" value="string:FM">Micronesia</option><option label="Moldova" value="string:MD">Moldova</option><option label="Monaco" value="string:MC">Monaco</option><option label="Mongolia" value="string:MN">Mongolia</option><option label="Montenegro" value="string:ME">Montenegro</option><option label="Montserrat" value="string:MS">Montserrat</option><option label="Morocco" value="string:MA">Morocco</option><option label="Mozambique" value="string:MZ">Mozambique</option><option label="Myanmar" value="string:MM">Myanmar</option><option label="Namibia" value="string:NA">Namibia</option><option label="Nauru" value="string:NR">Nauru</option><option label="Nepal" value="string:NP">Nepal</option><option label="Netherlands" value="string:NL">Netherlands</option><option label="New Caledonia" value="string:NC">New Caledonia</option><option label="New Zealand" value="string:NZ">New Zealand</option><option label="Nicaragua" value="string:NI">Nicaragua</option><option label="Niger" value="string:NE">Niger</option><option label="Nigeria" value="string:NG">Nigeria</option><option label="Niue" value="string:NU">Niue</option><option label="Norfolk Island" value="string:NF">Norfolk Island</option><option label="Northern Mariana Islands" value="string:MP">Northern Mariana Islands</option><option label="Norway" value="string:NO">Norway</option><option label="Oman" value="string:OM">Oman</option><option label="Pakistan" value="string:PK">Pakistan</option><option label="Palau" value="string:PW">Palau</option><option label="Palestine, State of" value="string:PS">Palestine, State of</option><option label="Panama" value="string:PA">Panama</option><option label="Papua New Guinea" value="string:PG">Papua New Guinea</option><option label="Paraguay" value="string:PY">Paraguay</option><option label="Peru" value="string:PE">Peru</option><option label="Philippines" value="string:PH">Philippines</option><option label="Pitcairn" value="string:PN">Pitcairn</option><option label="Poland" value="string:PL">Poland</option><option label="Portugal" value="string:PT">Portugal</option><option label="Puerto Rico" value="string:PR">Puerto Rico</option><option label="Qatar" value="string:QA">Qatar</option><option label="Reunion" value="string:RE">Reunion</option><option label="Romania" value="string:RO">Romania</option><option label="Russian Federation" value="string:RU">Russian Federation</option><option label="Rwanda" value="string:RW">Rwanda</option><option label="Saint Barthélemy" value="string:BL">Saint Barthélemy</option><option label="Saint Helena, Ascension and Tristan da Cunha" value="string:SH">Saint Helena, Ascension and Tristan da Cunha</option><option label="Saint Kitts and Nevis" value="string:KN">Saint Kitts and Nevis</option><option label="Saint Lucia" value="string:LC">Saint Lucia</option><option label="Saint Martin (French part)" value="string:MF">Saint Martin (French part)</option><option label="Saint Vincent and The Grenadines" value="string:VC">Saint Vincent and The Grenadines</option><option label="Samoa" value="string:WS">Samoa</option><option label="San Marino" value="string:SM">San Marino</option><option label="Sao Tome and Principe" value="string:ST">Sao Tome and Principe</option><option label="Saudi Arabia" value="string:SA">Saudi Arabia</option><option label="Senegal" value="string:SN">Senegal</option><option label="Serbia" value="string:RS">Serbia</option><option label="Seychelles" value="string:SC">Seychelles</option><option label="Sierra Leone" value="string:SL">Sierra Leone</option><option label="Singapore" value="string:SG">Singapore</option><option label="Sint Maarten (Dutch part)" value="string:SX">Sint Maarten (Dutch part)</option><option label="Slovakia" value="string:SK">Slovakia</option><option label="Slovenia" value="string:SI">Slovenia</option><option label="Solomon Islands" value="string:SB">Solomon Islands</option><option label="Somalia" value="string:SO">Somalia</option><option label="South Africa" value="string:ZA">South Africa</option><option label="South Georgia and the South Sandwich Islands" value="string:GS">South Georgia and the South Sandwich Islands</option><option label="South Sudan" value="string:SS">South Sudan</option><option label="Spain" value="string:ES">Spain</option><option label="Sri Lanka" value="string:LK">Sri Lanka</option><option label="St. Pierre and Miquelon" value="string:PM">St. Pierre and Miquelon</option><option label="Sudan" value="string:SD">Sudan</option><option label="Suriname" value="string:SR">Suriname</option><option label="Svalbard and Jan Mayen" value="string:SJ">Svalbard and Jan Mayen</option><option label="Swaziland" value="string:SZ">Swaziland</option><option label="Sweden" value="string:SE">Sweden</option><option label="Switzerland" value="string:CH">Switzerland</option><option label="Syrian Arab Republic" value="string:SY">Syrian Arab Republic</option><option label="Taiwan" value="string:TW">Taiwan</option><option label="Tajikistan" value="string:TJ">Tajikistan</option><option label="Tanzania, United Republic of" value="string:TZ">Tanzania, United Republic of</option><option label="Thailand" value="string:TH">Thailand</option><option label="Timor-Leste" value="string:TL">Timor-Leste</option><option label="Togo" value="string:TG">Togo</option><option label="Tokelau" value="string:TK">Tokelau</option><option label="Tonga" value="string:TO">Tonga</option><option label="Trinidad and Tobago" value="string:TT">Trinidad and Tobago</option><option label="Tunisia" value="string:TN">Tunisia</option><option label="Turkey" value="string:TR">Turkey</option><option label="Turkmenistan" value="string:TM">Turkmenistan</option><option label="Turks and Caicos Islands" value="string:TC">Turks and Caicos Islands</option><option label="Tuvalu" value="string:TV">Tuvalu</option><option label="Uganda" value="string:UG">Uganda</option><option label="Ukraine" value="string:UA">Ukraine</option><option label="United Arab Emirates" value="string:AE">United Arab Emirates</option><option label="United Kingdom" value="string:GB">United Kingdom</option><option label="United States" value="string:US" selected="selected">United States</option><option label="Uruguay" value="string:UY">Uruguay</option><option label="US Minor Outlying Islands" value="string:UM">US Minor Outlying Islands</option><option label="US Virgin Islands" value="string:VI">US Virgin Islands</option><option label="Uzbekistan" value="string:UZ">Uzbekistan</option><option label="Vanuatu" value="string:VU">Vanuatu</option><option label="Venezuela, Bolivarian Republic of" value="string:VE">Venezuela, Bolivarian Republic of</option><option label="Viet Nam" value="string:VN">Viet Nam</option><option label="Wallis and Futuna Islands" value="string:WF">Wallis and Futuna Islands</option><option label="Western Sahara" value="string:EH">Western Sahara</option><option label="Yemen" value="string:YE">Yemen</option><option label="Zambia" value="string:ZM">Zambia</option><option label="Zimbabwe" value="string:ZW">Zimbabwe</option><option label="Åland Islands" value="string:AX">Åland Islands</option></select></div></div><div class="col-md-6"><div class="form-group"><label class="control-label">Exemption Expiry Date</label> <input id="ccexp" type="text" placeholder="07/18" class="form-control masked" pattern="(1[0-2]|0[1-9])\\/(1[5-9]|2\\d)" data-valid-example="05/18" disabled="disabled"></div></div></div></form><hr><div class="row"><div class="col-xs-12"><button id="" class="btn btn-default btn-lg pull-left">Cancel</button> <button id="reveal-billing-error" class="btn btn-primary btn-lg pull-right">Submit Tax Exemption</button></div></div></div>');
}]);
})();
