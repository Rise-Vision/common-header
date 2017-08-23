"use strict";

angular.module("risevision.common.header")
  .value("COMPANY_ROLE_FIELDS", [
    ["it_network_administrator", "IT/Network Administrator"],
    ["facilities", "Facilities"],
    ["professor_instructor_teacher", "Professor/Instructor/Teacher"],
    ["marketing", "Marketing"],
    ["designer", "Designer"],
    ["executive_business_owner", "Executive/Business Owner"],
    ["reseller_integrator", "Reseller/Integrator"],
    ["architect_consultant", "Architect/Consultant"],
    ["administrator_volunteer_intern", "Administrator/Volunteer/Intern"],
    ["developer", "Developer"],
    ["other", "Other"]
  ])
  .value("COMPANY_INDUSTRY_FIELDS", [
    ["LIBRARIES", "Arts / Libraries",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/teamwork.svg"
    ],
    ["AUTOMOTIVE", "Automotive",
      "https://cdn2.hubspot.net/hubfs/2700250/automobile-1.svg"
    ],
    ["PHILANTHROPY", "Charity",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/donation-1.svg"
    ],
    ["RELIGIOUS_INSTITUTIONS", "Faith-based",
      "https://www.risevision.com/hubfs/Assets%20May%5B17%5D/religious.svg?t=1502211789708"
    ],
    ["FINANCIAL_SERVICES", "Financial Services",
      "https://www.risevision.com/hubfs/Assets%20May%5B17%5D/finance.svg?t=1502211789708"
    ],
    ["HIGHER_EDUCATION", "Higher Education",
      "https://www.risevision.com/hubfs/mortarboard-2.svg?t=1502211789708"
    ],
    ["LEGAL_SERVICES", "Legal",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/video-call.svg"
    ],
    ["MARKETING_AND_ADVERTISING", "Marketing Agency",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/telemarketer.svg"
    ],
    ["HOSPITAL_HEALTH_CARE", "Medical",
      "https://www.risevision.com/hubfs/hospitality-2.svg?t=1502211789708"
    ],
    ["PRIMARY_SECONDARY_EDUCATION", "Primary/Secondary Education",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/university.svg"
    ],
    ["RESTAURANTS", "Restaurant",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/restaurants.svg"
    ],
    ["RETAIL", "Retail", "https://www.risevision.com/hubfs/business-1.svg"],
    ["HEALTH_WELLNESS_AND_FITNESS", "Wellness / Fitness",
      "https://www.risevision.com/hubfs/health-2.svg?t=1502211789708"
    ],
    ["OTHER", "Other",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/tick.svg"
    ]
  ])
  .value("COMPANY_SIZE_FIELDS", [
    ["1", "Solo"],
    ["2", "Fewer than 20 employees"],
    ["21", "21-50 employees"],
    ["51", "51-250 employees"],
    ["250", "More than 250 employees"]
  ])
  .constant("USER_ICP_WRITABLE_FIELDS", [
    "companyRole", "dataCollectionDate"
  ])
  .constant("COMPANY_ICP_WRITABLE_FIELDS", [
    "name", "companySize", "companyIndustry"
  ])
  .factory("companyIcpFactory", ["$rootScope", "$q", "$log", "userState",
    "updateCompany", "updateUser", "$modal", "pick",
    "USER_ICP_WRITABLE_FIELDS", "COMPANY_ICP_WRITABLE_FIELDS",
    function ($rootScope, $q, $log, userState, updateCompany, updateUser,
      $modal, pick, USER_ICP_WRITABLE_FIELDS, COMPANY_ICP_WRITABLE_FIELDS) {
      var factory = {};

      factory.init = function () {
        var handler = $rootScope.$on(
          "risevision.company.selectedCompanyChanged", function () {
            handler();

            _checkIcpCollection();
          });
      };

      var _saveIcpData = function (result) {
        var company = result.company;
        var user = result.user;
        var companyId = company.id;
        var username = user.username;
        user.dataCollectionDate = new Date();

        company = pick(company, COMPANY_ICP_WRITABLE_FIELDS);
        user = pick(user, USER_ICP_WRITABLE_FIELDS);

        var companyPromise = updateCompany(companyId, company);
        var userPromise = updateUser(username, user);

        $q.all([companyPromise, userPromise]).then(function () {
          $log.debug("User & Company Profiles updated");
        });
      };

      var _saveDataCollectionDate = function (user) {
        updateUser(user.username, {
          dataCollectionDate: new Date()
        }).then(function () {
          $log.debug("User Data Collection Date updated");
        });
      };

      var _checkIcpCollection = function () {
        var user = userState.getCopyOfProfile(true);
        var company = userState.getCopyOfUserCompany(true);
        var lastContact = new Date(user.dataCollectionDate ||
          user.creationDate);
        var twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        if (userState.isSubcompanySelected()) {
          return;
        }

        // Last data collection was less than 2 weeks ago?
        if (lastContact.getTime() >= twoWeeksAgo.getTime()) {
          return;
        }

        // Has all data been collected?
        if (user.companyRole && company.name && company.companySize &&
          company.companyIndustry) {
          return;
        }

        var modalInstance = $modal.open({
          templateUrl: "company-icp-modal.html",
          controller: "CompanyIcpModalCtrl",
          size: "lg",
          backdrop: true,
          resolve: {
            user: function () {
              return user;
            },
            company: function () {
              return company;
            }
          }
        });

        modalInstance.result.then(function (user, company) {
          _saveIcpData(user, company);
        }, function (user) {
          _saveDataCollectionDate(user);
        });

      };

      return factory;
    }
  ]);
