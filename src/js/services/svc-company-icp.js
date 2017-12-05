"use strict";

angular.module("risevision.common.header")
  .value("COMPANY_ROLE_FIELDS", [
    ["IT/Network Administrator", "it_network_administrator"],
    ["Facilities", "facilities"],
    ["Professor/Instructor/Teacher", "professor_instructor_teacher"],
    ["Marketing", "marketing"],
    ["Designer", "designer"],
    ["Executive/Business Owner", "executive_business_owner"],
    ["Reseller/Integrator", "reseller_integrator"],
    ["Architect/Consultant", "architect_consultant"],
    ["Administrator/Volunteer/Intern", "administrator_volunteer_intern"],
    ["Developer", "developer"],
    ["Other", "other"]
  ])
  .value("COMPANY_INDUSTRY_FIELDS", [
    ["Accounting", "ACCOUNTING"],
    ["Airlines/Aviation", "AIRLINES_AVIATION"],
    ["Alternative Dispute Resolution", "ALTERNATIVE_DISPUTE_RESOLUTION"], // new category
    ["Alternative Medicine", "ALTERNATIVE_MEDICINE"],
    ["Animation", "ANIMATION"],
    ["Apparel & Fashion", "APPAREL_FASHION"],
    ["Architecture & Planning", "ARCHITECTURE_PLANNING"],
    ["Arts and Crafts", "ARTS_AND_CRAFTS"], // new category
    ["Automotive", "AUTOMOTIVE",
      "https://cdn2.hubspot.net/hubfs/2700250/automobile-1.svg"
    ],
    ["Aviation & Aerospace", "AVIATION_AEROSPACE"],
    ["Banking", "BANKING"],
    ["Biotechnology", "BIOTECHNOLOGY"],
    ["Broadcast Media", "BROADCAST_MEDIA"],
    ["Building Materials", "BUILDING_MATERIALS"],
    ["Business Supplies and Equipment", "BUSINESS_SUPPLIES_AND_EQUIPMENT"],
    ["Capital Markets", "CAPITAL_MARKETS"],
    ["Chemicals", "CHEMICALS"],
    ["Civic & Social Organization", "CIVIC_SOCIAL_ORGANIZATION"],
    ["Civil Engineering", "CIVIL_ENGINEERING"],
    ["Commercial Real Estate", "COMMERCIAL_REAL_ESTATE"],
    ["Computer & Network Security", "COMPUTER_NETWORK_SECURITY"],
    ["Computer Games", "COMPUTER_GAMES"],
    ["Computer Hardware", "COMPUTER_HARDWARE"],
    ["Computer Networking", "COMPUTER_NETWORKING"],
    ["Computer Software", "COMPUTER_SOFTWARE"],
    ["Internet", "INTERNET"], // new category
    ["Construction", "CONSTRUCTION"],
    ["Consumer Electronics", "CONSUMER_ELECTRONICS"],
    ["Consumer Goods", "CONSUMER_GOODS"],
    ["Consumer Services", "CONSUMER_SERVICES"],
    ["Cosmetics", "COSMETICS"],
    ["Dairy", "DAIRY"],
    ["Defense & Space", "DEFENSE_SPACE"],
    ["Design", "DESIGN"],
    ["Education Management", "EDUCATION_MANAGEMENT"],
    ["E-Learning", "E_LEARNING"],
    ["Electrical/Electronic Manufacturing",
      "ELECTRICAL_ELECTRONIC_MANUFACTURING"
    ],
    ["Entertainment", "ENTERTAINMENT"],
    ["Environmental Services", "ENVIRONMENTAL_SERVICES"],
    ["Events Services", "EVENTS_SERVICES"],
    ["Executive Office", "EXECUTIVE_OFFICE"],
    ["Facilities Services", "FACILITIES_SERVICES"],
    ["Farming", "FARMING"],
    ["Financial Services", "FINANCIAL_SERVICES",
      "https://www.risevision.com/hubfs/Assets%20May%5B17%5D/finance.svg?t=1502211789708"
    ],
    ["Fine Art", "FINE_ART"], // new category
    ["Fishery", "FISHERY"], // new category
    ["Food & Beverages", "FOOD_BEVERAGES"],
    ["Food Production", "FOOD_PRODUCTION"],
    ["Fund-Raising", "FUND_RAISING"],
    ["Furniture", "FURNITURE"],
    ["Gambling & Casinos", "GAMBLING_CASINOS"],
    ["Glass, Ceramics & Concrete", "GLASS_CERAMICS_CONCRETE"],
    ["Government Administration", "GOVERNMENT_ADMINISTRATION"],
    ["Government Relations", "GOVERNMENT_RELATIONS"],
    ["Graphic Design", "GRAPHIC_DESIGN"],
    ["Wellness / Fitness", "HEALTH_WELLNESS_AND_FITNESS",
      "https://www.risevision.com/hubfs/health-2.svg?t=1502211789708"
    ],
    ["Higher Education", "HIGHER_EDUCATION",
      "https://www.risevision.com/hubfs/mortarboard-2.svg?t=1502211789708"
    ],
    ["Medical", "HOSPITAL_HEALTH_CARE",
      "https://www.risevision.com/hubfs/hospitality-2.svg?t=1502211789708"
    ],
    ["Hospitality", "HOSPITALITY"],
    ["Human Resources", "HUMAN_RESOURCES"],
    ["Import and Export", "IMPORT_AND_EXPORT"], // new category
    ["Individual & Family Services", "INDIVIDUAL_FAMILY_SERVICES"],
    ["Industrial Automation", "INDUSTRIAL_AUTOMATION"],
    ["Information Services", "INFORMATION_SERVICES"],
    ["Information Technology and Services",
      "INFORMATION_TECHNOLOGY_AND_SERVICES"
    ],
    ["Insurance", "INSURANCE"],
    ["International Affairs", "INTERNATIONAL_AFFAIRS"],
    ["International Trade and Development",
      "INTERNATIONAL_TRADE_AND_DEVELOPMENT"
    ],
    ["Investment Banking", "INVESTMENT_BANKING"],
    ["Investment Management", "INVESTMENT_MANAGEMENT"],
    ["Judiciary", "JUDICIARY"], // new category
    ["Law Enforcement", "LAW_ENFORCEMENT"],
    ["Law Practice", "LAW_PRACTICE"],
    ["Legal Services", "LEGAL_SERVICES"], // new category
    ["Legislative Office", "LEGISLATIVE_OFFICE"],
    ["Leisure, Travel & Tourism", "LEISURE_TRAVEL_TOURISM"],
    ["Arts / Libraries", "LIBRARIES",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/teamwork.svg"
    ],
    ["Logistics and Supply Chain", "LOGISTICS_AND_SUPPLY_CHAIN"],
    ["Luxury Goods & Jewelry", "LUXURY_GOODS_JEWELRY"],
    ["Machinery", "MACHINERY"],
    ["Management Consulting", "MANAGEMENT_CONSULTING"],
    ["Maritime", "MARITIME"],
    ["Market Research", "MARKET_RESEARCH"],
    ["Marketing Agency", "MARKETING_AND_ADVERTISING",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/telemarketer.svg"
    ],
    ["Mechanical or Industrial Engineering",
      "MECHANICAL_OR_INDUSTRIAL_ENGINEERING"
    ],
    ["Media Production", "MEDIA_PRODUCTION"],
    ["Medical Devices", "MEDICAL_DEVICES"],
    ["Medical Practice", "MEDICAL_PRACTICE"],
    ["Mental Health Care", "MENTAL_HEALTH_CARE"],
    ["Military", "MILITARY"],
    ["Mining & Metals", "MINING_METALS"],
    ["Motion Pictures and Film", "MOTION_PICTURES_AND_FILM"],
    ["Museums and Institutions", "MUSEUMS_AND_INSTITUTIONS"],
    ["Music", "MUSIC"],
    ["Nanotechnology", "NANOTECHNOLOGY"], // new category
    ["Newspapers", "NEWSPAPERS"],
    ["Non-Profit Organization Management",
      "NON_PROFIT_ORGANIZATION_MANAGEMENT"
    ],
    ["Oil & Energy", "OIL_ENERGY"],
    ["Online Media", "ONLINE_MEDIA"],
    ["Outsourcing/Offshoring", "OUTSOURCING_OFFSHORING"],
    ["Package/Freight Delivery", "PACKAGE_FREIGHT_DELIVERY"],
    ["Packaging and Containers", "PACKAGING_AND_CONTAINERS"],
    ["Paper & Forest Products", "PAPER_FOREST_PRODUCTS"],
    ["Performing Arts", "PERFORMING_ARTS"],
    ["Pharmaceuticals", "PHARMACEUTICALS"],
    ["Non-Profit", "PHILANTHROPY",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/donation-1.svg"
    ],
    ["Photography", "PHOTOGRAPHY"],
    ["Plastics", "PLASTICS"],
    ["Political Organization", "POLITICAL_ORGANIZATION"],
    ["Primary/Secondary Education", "PRIMARY_SECONDARY_EDUCATION",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/university.svg"
    ],
    ["Printing", "PRINTING"],
    ["Professional Training & Coaching", "PROFESSIONAL_TRAINING_COACHING"],
    ["Program Development", "PROGRAM_DEVELOPMENT"],
    ["Public Policy", "PUBLIC_POLICY"],
    ["Public Relations and Communications",
      "PUBLIC_RELATIONS_AND_COMMUNICATIONS"
    ],
    ["Public Safety", "PUBLIC_SAFETY"],
    ["Publishing", "PUBLISHING"],
    ["Railroad Manufacture", "RAILROAD_MANUFACTURE"], // new category
    ["Ranching", "RANCHING"], // new category
    ["Real Estate", "REAL_ESTATE"],
    ["Recreational Facilities and Services",
      "RECREATIONAL_FACILITIES_AND_SERVICES"
    ],
    ["Faith-based", "RELIGIOUS_INSTITUTIONS",
      "https://www.risevision.com/hubfs/Assets%20May%5B17%5D/religious.svg?t=1502211789708"
    ],
    ["Renewables & Environment", "RENEWABLES_ENVIRONMENT"],
    ["Research", "RESEARCH"],
    ["Restaurant", "RESTAURANTS",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/restaurants.svg"
    ],
    ["Retail", "RETAIL",
      "https://www.risevision.com/hubfs/business-1.svg"
    ],
    ["Security and Investigations", "SECURITY_AND_INVESTIGATIONS"],
    ["Semiconductors", "SEMICONDUCTORS"],
    ["Shipbuilding", "SHIPBUILDING"],
    ["Sporting Goods", "SPORTING_GOODS"],
    ["Sports", "SPORTS"],
    ["Staffing and Recruiting", "STAFFING_AND_RECRUITING"],
    ["Supermarkets", "SUPERMARKETS"],
    ["Telecommunications", "TELECOMMUNICATIONS"],
    ["Textiles", "TEXTILES"],
    ["Think Tanks", "THINK_TANKS"],
    ["Tobacco", "TOBACCO"], // new category
    ["Translation and Localization", "TRANSLATION_AND_LOCALIZATION"],
    ["Transportation/Trucking/Railroad", "TRANSPORTATION_TRUCKING_RAILROAD"],
    ["Utilities", "UTILITIES"],
    ["Venture Capital & Private Equity", "VENTURE_CAPITAL_PRIVATE_EQUITY"],
    ["Veterinary", "VETERINARY"],
    ["Warehousing", "WAREHOUSING"],
    ["Wholesale", "WHOLESALE"],
    ["Wine and Spirits", "WINE_AND_SPIRITS"],
    ["Wireless", "WIRELESS"],
    ["Writing and Editing", "WRITING_AND_EDITING"], // new category
    ["Reseller / Integrator", "reseller_integrator",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/video-call.svg"
    ]
  ])
  .value("COMPANY_SIZE_FIELDS", [
    ["Solo", "1"],
    ["Fewer than 20 employees", "2"],
    ["21-50 employees", "21"],
    ["51-250 employees", "51"],
    ["More than 250 employees", "250"]
  ])
  .constant("USER_ICP_WRITABLE_FIELDS", [
    "companyRole", "email", "dataCollectionDate"
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

        if (!userState.isUserAdmin()) {
          return;
        }

        if (userState.isSubcompanySelected()) {
          return;
        }

        // Last data collection was less than 2 weeks ago?
        if (lastContact.getTime() >= twoWeeksAgo.getTime()) {
          return;
        }

        // Has all data been collected?
        if (user.companyRole && user.email && company.name && company.companySize &&
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
