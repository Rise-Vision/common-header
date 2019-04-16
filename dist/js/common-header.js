(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app-nav-buttons-menu.html',
    '<ul><li class="new-app"><a href="https://apps.risevision.com/editor" target="_blank" link-cid=""><div class="image"><img src="https://s3.amazonaws.com/Rise-Images/landing-page/editor-image.png"></div><span>Presentations</span></a></li><li class="new-app"><a href="https://apps.risevision.com/schedules" target="_blank" link-cid=""><div class="image"><img src="https://s3.amazonaws.com/Rise-Images/landing-page/schedule-image.png"></div><span>Schedules</span></a></li><li class="new-app"><a href="https://apps.risevision.com/displays" target="_blank" link-cid=""><div class="image"><img src="https://s3.amazonaws.com/Rise-Images/landing-page/displays-image.png"></div><span>Displays</span></a></li><li><a href="https://apps.risevision.com/storage" target="_blank" link-cid=""><div class="image"><img src="https://s3.amazonaws.com/Rise-Images/landing-page/storage-image.png"></div><span>Storage</span></a></li><li><a href="https://rva.risevision.com/#PRESENTATIONS" target="_blank" class="old-app" link-cid=""><div class="image"><img src="https://s3.amazonaws.com/Rise-Images/landing-page/editor-image-gray.png"></div><span>Classic Editor</span></a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('app-nav-buttons.html',
    '<li dropdown="" class="dropdown hidden-xs"><button dropdown-toggle="" class="dropdown-toggle btn btn-link"><i class="fa fa-lg fa-th"></i></button><div class="dropdown-menu app-navigation" role="menu"><ng-include replace-include="" src="\'app-nav-buttons-menu.html\'"></ng-include></div></li><li class="visible-xs-inline-block"><a href="" class="company-buttons-icon-mobile" action-sheet="\'app-nav-buttons-menu.html\'" action-sheet-class="app-navigation"><i class="fa fa-th"></i></a></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth-buttons-menu.html',
    '<company-buttons ng-show="isRiseVisionUser" ng-controller="CompanyButtonsCtrl"></company-buttons><ul><li ng-show="isRiseVisionUser"><a href="" ng-click="alertSettings()" class="alert-settings-button action"><i class="fa fa-bullhorn"></i> <span class="item-name">Alert Settings</span></a></li><li ng-show="isRiseVisionUser"><a href="" ng-click="userSettings()" class="user-settings-button action"><i class="fa fa-user"></i> <span class="item-name">User Settings</span></a></li><li ng-show="isRiseVisionUser"><a href="https://store.risevision.com/account" target="_blank" class="store-account-button action" link-cid="" ng-show="!isChargebee()"><i class="fa fa-shopping-cart"></i> <span class="item-name">Account & Billing</span></a> <a ui-sref="apps.billing.home" class="store-account-button action" ng-show="isChargebee() && isApps()"><i class="fa fa-shopping-cart"></i> <span class="item-name">Account & Billing</span></a> <a href="https://apps.risevision.com/billing" target="_blank" class="store-account-button action" link-cid="" ng-show="isChargebee() && !isApps()"><i class="fa fa-shopping-cart"></i> <span class="item-name">Account & Billing</span></a></li><span ng-if="isLoggedIn && !isRiseVisionUser" class="google-account">{{username}}</span><li class="dropdown-footer text-right" ng-show="isLoggedIn"><button class="sign-out-button btn btn-sm btn-default u_margin-sm-bottom" ng-controller="SignOutButtonCtrl" ng-click="logout()">Sign Out<i class="fa fa-sign-out icon-right"></i></button></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth-buttons.html',
    '<li ng-show="isLoggedIn && !isRiseVisionUser && !loading"><button type="button" ng-controller="RegisterButtonCtrl" ng-click="register()" class="btn btn-danger register-user-menu-button">Complete Registration</button></li><li dropdown="" class="dropdown user-profile-dropdown desktop-menu-item" ng-class="{\'hidden-xs\': isLoggedIn}" ng-show="isLoggedIn"><a href="" dropdown-toggle="" class="dropdown-toggle"><div class="user-id pull-left"><span ng-class="{\'pending-registration\' : isLoggedIn && !isRiseVisionUser && !loading}" class="username">{{username}}</span> <span><strong>{{companyName}}</strong></span></div><img ng-src="{{userPicture}}" class="profile-pic" width="30" height="30" alt="User"></a><div class="dropdown-menu" role="menu"><ng-include src="\'auth-buttons-menu.html\'" replace-include=""></ng-include></div></li><li dropdown="" class="dropdown user-profile-dropdown mobile-menu-item" ng-class="{\'visible-xs-inline-block\': isLoggedIn}" ng-show="isLoggedIn"><a href="" dropdown-toggle="" class="visible-xs dropdown-toggle" action-sheet="\'auth-buttons-menu.html\'" action-sheet-class="user-profile-dropdown"><div class="user-id"><span>{{username}}</span> <span><strong>{{companyName}}</strong></span></div></a></li><li ng-show="!undetermined && isLoggedIn === false"><button type="button" class="btn-primary btn u_margin-right" ng-click="login(\'registrationComplete\', true)">Sign Up Free</button></li><li ng-show="!undetermined && isLoggedIn === false"><button type="button" class="sign-in top-auth-button" ng-click="login(\'registrationComplete\')">Sign In</button></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('close-frame-button.html',
    '<li class="close-frame"><a href="" class="close-frame-button" ng-click="closeIFrame()"><i class="fa fa-times"></i></a></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('common-header.html',
    '<div id="commonHeaderDiv" ng-hide="hideCommonHeader"><ng-include replace-include="" ng-controller="PlanBannerCtrl" src="\'plan-banner.html\'"></ng-include><nav class="navbar navbar-default hidden-print" ng-class="{\'active-banner\': isSubcompanySelected() || isTestCompanySelected()}" role="navigation"><div class="navbar-header"><a class="navbar-brand visible-md visible-lg" href="http://www.risevision.com/" target="{{newTabHome ? \'_blank\' : \'_self\'}}" ng-if="!inRVAFrame"><img src="//s3.amazonaws.com/Rise-Images/UI/logo.svg" class="img-responsive logo-small" width="113" height="42" alt="Rise Vision"></a> <a class="navbar-brand hidden-md hidden-lg text-center" href="" off-canvas-toggle=""><i class="fa fa-bars"></i></a><div class="navbar-left visible-xs visible-sm" ng-if="ENV_NAME"><ul class="nav navbar-nav"><li class="env-name-nav-item"><span class="env-name-label">{{ENV_NAME}}</span></li></ul></div><div class="navbar-collapse navbar-left hidden-xs hidden-sm"><ul class="nav navbar-nav"><li class="env-name-nav-item visible-md visible-lg" ng-if="ENV_NAME"><span class="env-name-label">{{ENV_NAME}}</span></li><li ng-repeat="opt in navOptions"><a ng-if="opt.cid" ng-href="{{opt.link}}" link-cid="" target="{{opt.target}}" ng-class="{\'selected\': opt.states && opt.states.indexOf(navSelected) > -1}">{{opt.title}}</a> <a ng-if="!opt.cid" ng-href="{{opt.link}}" target="{{opt.target}}" ng-class="{\'selected\': opt.states && opt.states.indexOf(navSelected) > -1}">{{opt.title}}</a></li><li ng-if="!inRVAFrame && !hideHelpMenu"><a href="http://www.risevision.com/help/" target="_blank">Help</a></li></ul></div><ul class="nav navbar-nav navbar-right actions-nav pull-right"><ng-include replace-include="" ng-controller="ZendeskButtonCtrl" src="\'zendesk-button.html\'"></ng-include><ng-include replace-include="" ng-if="!inRVAFrame" ng-controller="SystemMessagesButtonCtrl" src="\'system-messages-button.html\'"></ng-include><ng-include replace-include="" ng-controller="ShoppingCartButtonCtrl" src="\'shoppingcart-button.html\'"></ng-include><ng-include replace-include="" ng-if="inRVAFrame" ng-controller="CloseFrameButtonCtrl" src="\'close-frame-button.html\'"></ng-include><ng-include ng-if="!inRVAFrame" replace-include="" src="\'app-nav-buttons.html\'"></ng-include><ng-include replace-include="" ng-if="!inRVAFrame" ng-controller="AuthButtonsCtr" src="\'auth-buttons.html\'"></ng-include><li ng-if="inRVAFrame" ng-controller="AuthButtonsCtr"></li></ul></div><ng-include replace-include="" ng-controller="TestCompanyBannerCtrl" src="\'test-company-banner.html\'"></ng-include><ng-include replace-include="" ng-controller="SubcompanyBannerCtrl" src="\'subcompany-banner.html\'"></ng-include></nav><ng-include replace-include="" ng-controller="GlobalAlertsCtrl" src="\'global-alerts.html\'"></ng-include><nav class="off-canvas-nav" off-canvas-nav=""><ul class="nav nav-pills nav-stacked"><li off-canvas-toggle=""><i class="fa fa-times fa-2x pull-right"></i> <img src="//s3.amazonaws.com/rise-common/images/logo-small.png" class="img-responsive logo-small" width="113" height="42" alt="Rise Vision"></li><li ng-repeat="opt in navOptions"><a ng-if="opt.cid" ng-href="{{opt.link}}" link-cid="" target="{{opt.target}}">{{opt.title}}</a> <a ng-if="!opt.cid" ng-href="{{opt.link}}" target="{{opt.target}}">{{opt.title}}</a></li><li ng-if="!hideHelpMenu"><a target="_blank" href="http://www.risevision.com/help">Help</a></li></ul></nav></div><div ng-show="cookieEnabled === false" class="bg-warning text-center u_padding-sm"><small><strong>Cookies Are Disabled.</strong> Rise Vision needs to use cookies to properly function. Please enable Cookies and Third-Party Cookies on your web browser and refresh this page.</small></div><iframe name="logoutFrame" id="logoutFrame" style="display:none"></iframe>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('company-buttons-menu.html',
    '<ul><li class="dropdown-header" ng-show="!isSubcompanySelected"><p>{{username}}</p><p><strong>{{selectedCompanyName}}</strong> <span class="text-muted" ng-show="isRiseVisionUser && !isSubcompanySelected">|</span> <a id="select-subcompany-button" href="" ng-click="switchCompany()" ng-show="isRiseVisionUser && !isSubcompanySelected">Select Sub-Company</a></p></li><li class="dropdown-header sub-company-header" ng-show="isSubcompanySelected"><p>You are in Sub-Company <strong>{{selectedCompanyName}}</strong> <span class="text-muted">|</span> <a id="change-subcompany-button" href="" ng-click="switchCompany()" ng-show="isRiseVisionUser">Change</a></p><p><a id="reset-subcompany-button" href="" ng-click="resetCompany()">Switch to My Company</a></p></li><hr><li ng-show="isUserAdmin || isRiseAdmin"><a href="" ng-click="addSubCompany()" class="action add-subcompany-menu-button"><i class="fa fa-plus"></i> <span class="item-name">Add Sub-Company</span></a></li><li ng-show="isUserAdmin || isRiseAdmin"><a href="" ng-click="companySettings()" class="action company-settings-menu-button"><i class="fa fa-building"></i> <span class="item-name">Company Settings</span></a></li><li ng-show="isUserAdmin || isRiseAdmin"><a href="" data-toggle="modal" ng-click="companyUsers()" class="action company-users-menu-button"><i class="fa fa-users"></i> <span class="item-name">Company Users</span></a></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('company-fields.html',
    '<div class="form-group" ng-class="{\'has-error\': forms.companyForm.name.$invalid && !forms.companyForm.name.$pristine}"><label for="company-settings-name">Company Name *</label> <input required="" id="company-settings-name" type="text" class="form-control" ng-model="company.name" name="name"><p ng-show="forms.companyForm.name.$invalid && !forms.companyForm.name.$pristine" class="help-block validation-error-message-name">Company Name is required.</p></div><div class="row"><div class="col-md-6"><div class="form-group"><label for="company-size" class="control-label">Company Size</label><select id="company-size" class="form-control" ng-model="company.companySize"><option value="" ng-show="false">&lt; Select Size &gt;</option><option ng-repeat="size in COMPANY_SIZE_FIELDS" value="{{size[1]}}">{{size[0]}}</option></select></div></div><div class="col-md-6"><div class="form-group"><label for="company-industry" class="control-label">Industry</label><select id="company-industry" class="form-control selectpicker" ng-model="company.companyIndustry"><option value="" ng-show="false">&lt; Select Industry &gt;</option><option ng-repeat="industry in COMPANY_INDUSTRY_FIELDS | orderBy:industry[0]" value="{{industry[1]}}">{{industry[0]}}</option></select></div></div></div><div class="row"><div class="col-md-6"><div class="form-group"><label for="company-settings-street" class="control-label">Street</label> <input id="company-settings-street" type="text" class="form-control" ng-model="company.street"></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-unit" class="control-label">Unit</label> <input id="company-settings-unit" type="text" class="form-control" ng-model="company.unit"></div></div></div><div class="row"><div class="col-md-3"><div class="form-group"><label for="company-settings-city" class="control-label">City</label> <input id="company-settings-city" type="text" class="form-control" ng-model="company.city"></div></div><div class="col-md-3"><div class="form-group"><label for="company-settings-country" class="control-label">Country</label><select id="company-settings-country" class="form-control selectpicker" ng-model="company.country" ng-options="c.code as c.name for c in countries" empty-select-parser=""><option ng-show="false" value="">&lt; Select Country &gt;</option></select></div></div><div class="col-md-3"><div class="form-group"><label for="company-settings-state" class="control-label">State/Province/Region</label> <input id="company-settings-state" type="text" class="form-control" ng-model="company.province" ng-hide="company.country == \'US\' || company.country == \'CA\'"><select class="form-control selectpicker" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsCA" ng-show="company.country == \'CA\'" empty-select-parser=""><option ng-show="false" value="">&lt; Select Province &gt;</option></select><select class="form-control selectpicker" ng-model="company.province" ng-options="c[1] as c[0] for c in regionsUS" ng-show="company.country == \'US\'" empty-select-parser=""><option ng-show="false" value="">&lt; Select State &gt;</option></select></div></div><div class="col-md-3"><div class="form-group"><label for="company-settings-zip" class="control-label">ZIP/Postal Code</label> <input id="company-settings-zip" type="text" class="form-control" ng-model="company.postalCode"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': forms.companyForm.website.$error.website}"><label for="company-settings-website" class="control-label">Website</label> <input id="company-settings-website" name="website" type="text" placeholder="http://" class="form-control" ng-model="company.website" website-validator=""><p ng-show="forms.companyForm.website.$error.website" class="help-block validation-error-message-website">Please provide a valid URL.</p></div></div><div class="col-md-6"><div class="form-group"><label for="company-settings-phone" class="control-label">Phone</label> <input id="company-settings-phone" type="tel" class="form-control" ng-model="company.telephone"></div></div></div><div class="form-group"><label for="company-settings-timezone" class="control-label">Time Zone</label><select class="form-control" ng-model="company.timeZoneOffset" integer-parser=""><option ng-show="false" value="">&lt; Select Time Zone &gt;</option><option value="{{c[1]}}" ng-repeat="c in timezones">{{c[0]}}</option></select></div><div class="form-group" ng-show="company.isChargebee"><label class="form-control-label">Billing Notifications Email</label><emails-field ng-model="company.billingContactEmails"></emails-field></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('company-icp-modal.html',
    '<div id="companyIcpModal"><div class="modal-header"><h2 id="icpModalTitle" class="modal-title">Help us personalize your experience</h2></div><div class="modal-body" stop-event="touchend"><form id="forms.companyIcpForm" role="form" name="forms.companyIcpForm"><div class="form-group"><label for="company-industry" class="control-label">Tell us your Industry to help us make your Display look great *</label><select id="company-industry" name="companyIndustry" class="form-control selectpicker" ng-model="company.companyIndustry" aria-required="true" tabindex="1" autofocus="" required=""><option value="" ng-show="false">&lt; Select Industry &gt;</option><option ng-repeat="industry in DROPDOWN_INDUSTRY_FIELDS | orderBy:industry[0]" value="{{industry[1]}}">{{industry[0]}}</option></select></div><newsletter-signup ng-model="user.mailSyncEnabled" company-industry="company.companyIndustry"></newsletter-signup></form></div><div class="modal-footer"><button id="saveButton" type="submit" class="btn btn-primary btn-lg btn-block ng-binding" aria-label="Apply" tabindex="1" form="forms.companyIcpForm" ng-click="save()" ng-disabled="forms.companyIcpForm.$invalid">Apply <i class="fa fa-check icon-right"></i></button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('company-selector-modal.html',
    '<form role="form"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closeModal()"><i class="fa fa-times"></i></button><h2 id="switch-company" class="modal-title">Select Sub-Company</h2></div><div class="modal-body select-subcompany-modal" stop-event="touchend"><div id="errorBox" ng-show="companies.apiError" class="alert alert-danger" role="alert"><strong>{{companies.errorMessage}}</strong> {{companies.apiError}}</div><search-filter filter-config="filterConfig" search="search" do-search="companies.doSearch"></search-filter><div class="panel panel-default scrollable-list u_margin-sm-top" scrolling-list="companies.load()" rv-spinner="" rv-spinner-key="company-selector-modal-list" rv-spinner-start-active="1"><div class="list-group-item" ng-repeat="company in companies.items.list" ng-click="setCompany(company)"><p class="list-group-item-text"><strong>{{company.name}}</strong><br><small class="text-muted">{{company | fullAddress}}</small></p></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default btn-fixed-width" data-dismiss="modal" aria-hidden="true" ng-click="closeModal()">Cancel <i class="fa fa-white fa-times icon-right"></i></button></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('company-settings-modal.html',
    '<div rv-spinner="" rv-spinner-key="company-settings-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closeModal()"><i class="fa fa-times"></i></button><h2 id="company-settings-label" class="modal-title">Company Settings</h2></div><div class="modal-body company-settings-modal" stop-event="touchend"><form id="companyForm" role="form" name="forms.companyForm" novalidate=""><div ng-include="\'company-fields.html\'"></div><div class="form-group"><label>Authentication Key</label> <a class="action-link ps-reset-auth-key" href="" ng-click="resetAuthKey()">Reset</a><div class="ps-auth-key">{{company.authKey}}</div></div><div class="form-group"><label>Claim ID</label> <a class="action-link ps-reset-claim-id" href="" ng-click="resetClaimId()">Reset</a><div class="ps-claim-id">{{company.claimId}}</div></div><div class="form-group" ng-hide="true"><label>Sub-Company Home Page Presentation</label> <a class="action-link" href="" ng-click="showSelector()">Select</a> <a class="action-link" href="">Default</a><div id="presentation-name">Rise Vision Default (ID=a6789044-ae4a-48c7-b6fd-b5d4ffea2f24)</div><div class="presentation-selector" ng-show="isSelectorVisible"><div class="panel panel-default"><ul class="list-unstyled selector-header"><li ng-class="{active : selected == \'list\'}"><a href="" ng-click="showPresentationView($event, \'list\')">Search Presentations</a></li><li ng-class="{active : selected == \'search\'}"><a href="" ng-click="showPresentationView($event, \'search\')">Enter Presentation ID</a></li><li class="close-button"><button type="button" class="close" aria-hidden="true" ng-click="closeSelector()"><i class="fa fa-times"></i></button></li></ul><div class="panel-body"><div class="presentation-list" ng-show="selected == \'list\'"><div class="input-group search"><input type="text" class="form-control" placeholder="Search Presentations"> <span class="input-group-btn"><button class="btn btn-primary" type="submit"><i class="fa fa-search fa-white"></i></button></span></div><div class="list-group scrollable-list"><a href="" class="list-group-item" ng-click="setPresentation($event, \'Demo Presentation\')">Demo Presentation</a> <a href="" class="list-group-item" ng-click="setPresentation($event, \'My First Presentation\')">My First Presentation</a></div></div><div class="presentation-search" ng-show="selected == \'search\'"><form role="form"><div class="form-group"><input id="presentation-id" type="text" class="form-control" placeholder="Enter Presentation ID"></div><div class="form-group"><a href="" ng-click="setPresentation($event)">Retrieve Presentation</a></div></form></div></div></div></div></div><div class="form-group" ng-hide="true"><label for="company-settings-community-url">Sub-Company Community URL</label> <a class="action-link" href="">Default</a> <input id="company-settings-community-url" type="url" class="form-control"></div><div class="form-group" ng-hide="true"><label for="company-settings-support-url">Sub-Company Support URL</label> <a class="action-link" href="">Default</a> <input id="company-settings-support-url" type="url" class="form-control"></div><div class="checkbox" ng-if="isRiseStoreAdmin"><label><input type="checkbox" ng-model="company.isSeller"> Registered Seller</label></div><div class="checkbox" ng-if="isRiseStoreAdmin"><label><input type="checkbox" ng-model="company.isTest"> Test Company</label></div><div class="checkbox" ng-if="isRiseStoreAdmin"><label class="form-control-label"><input type="checkbox" ng-model="company.shareCompanyPlan"> Share Company Plan</label></div><div class="form-group" ng-hide="true"><label for="company-settings-status">Status</label><select id="company-settings-status" class="form-control selectpicker"><option value="active">Active</option><option value="inactive">Inactive</option></select></div></form></div><div class="modal-footer"><p class="visible-xs text-right"><last-modified change-date="company.changeDate" changed-by="company.changedBy"></last-modified></p><button type="button" id="delete-button" class="btn btn-danger btn-fixed-width pull-left" ng-show="!isDeletingCompany" ng-click="deleteCompany()">Delete <i class="fa fa-white fa-trash-o icon-right"></i></button> <button type="button" class="btn btn-danger btn-confirm-delete" data-dismiss="modal" ng-show="isDeletingCompany" ng-click="closeModal()">Confirm Deletion <i class="fa fa-white fa-warning icon-right"></i></button><div class="pull-right"><span class="hidden-xs"><last-modified change-date="company.changeDate" changed-by="company.changedBy"></last-modified></span> <button type="button" id="save-button" class="btn btn-primary btn-fixed-width" ng-click="save()" ng-disabled="forms.companyForm.$invalid">Save <i class="fa fa-white fa-check icon-right"></i></button> <button type="button" id="close-button" class="btn btn-default btn-fixed-width" data-dismiss="modal" ng-click="closeModal()">Cancel <i class="fa fa-white fa-times icon-right"></i></button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('company-users-modal.html',
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closeModal()"><i class="fa fa-times"></i></button><h2 id="company-users-label" class="modal-title">Company Users</h2></div><div class="modal-body company-users-modal" stop-event="touchend"><div id="errorBox" ng-show="users.apiError" class="alert alert-danger" role="alert"><strong>{{users.errorMessage}}</strong> {{users.apiError}}</div><search-filter filter-config="filterConfig" search="search" do-search="users.doSearch"></search-filter><div class="panel panel-default scrollable-list company-users-list u_margin-sm-top" scrolling-list="users.load()" rv-spinner="" rv-spinner-key="company-users-list" rv-spinner-start-active="1"><div class="list-group-item company-users-list-item" ng-repeat="user in users.items.list | orderBy:sort.field:sort.descending | filter:userSearchString" ng-click="editUser(user.username)"><p class="list-group-item-text"><strong>{{user.firstName}} {{user.lastName}}</strong> <small class="text-muted">{{user.email}}</small></p></div></div></div><div class="modal-footer"><button type="button" class="btn btn-success add-company-user-button" ng-click="addUser()">Add User <i class="fa fa-white fa-plus icon-right"></i></button> <button type="button" class="btn btn-default close-company-users-button" data-dismiss="modal" ng-click="closeModal()">Cancel <i class="fa fa-white fa-times icon-right"></i></button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('emails-field.html',
    '<tags-input type="email" placeholder="Add an email" class="email-tags" ng-model="emailsList" add-on-enter="true" add-on-space="true" add-on-comma="true" add-on-blur="true" add-on-paste="true" on-tag-adding="isValidEmail($tag)" on-tag-removing="canRemove()" on-tag-added="updateModel()" on-tag-removed="updateModel()" on-invalid-tag="invalidateModel()"></tags-input>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('global-alerts.html',
    '<div class="container"><div class="row"><div class="col-md-12"><div class="alert alert-danger" role="alert" ng-repeat="msg in errors"><span ng-bind-html="msg"></span> <button type="button" class="close pull-right" ng-click="dismiss(\'errors\', $index);"><i class="fa fa-times"></i></button></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('move-company-modal.html',
    '<div rv-spinner="" rv-spinner-key="move-company-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closeModal()"><i class="fa fa-times"></i></button><h2 id="move-company-label" class="modal-title">Move Company</h2></div><div class="modal-body move-company-modal" stop-event="touchend"><form role="form"><div class="form-group"><label for="auth-key">Enter the Authentication Key of the Company that you want to move.</label><div class="row"><div class="col-sm-6"><input id="auth-key" type="text" class="form-control" ng-model="company.authKey"></div><div class="col-sm-6"><a href="" class="btn btn-secondary retrieve-company-details-button" ng-disabled="!company.authKey" ng-click="getCompany()">Retrieve Company Details</a></div></div></div></form><div ng-show="company.name" class="company-details-info"><h3>Details of the Company You Want to Move</h3><div>{{company.name}}<br>{{company.address}} {{company.city}}, {{company.province}}, {{company.country}} {{company.postalCode}}</div><h3>Details of the Company You Are Moving the Above Company Under</h3><div class="to-company">{{selectedCompany.name}}<br>{{selectedCompany.address}}<br>{{selectedCompany.city}}, {{selectedCompany.province}}, {{selectedCompany.country}} {{selectedCompany.postalCode}}</div></div><div ng-show="errors.length > 0"><div class="alert alert-danger" ng-repeat="error in errors">{{error}}</div></div><div ng-show="messages.length > 0"><div class="alert alert-success" ng-repeat="message in messages">{{message}}</div></div></div><div class="modal-footer"><button type="button" class="btn btn-success move-company-button" ng-show="company.name && !moveSuccess" ng-click="moveCompany()">Move Company <i class="fa fa-white fa-check icon-right"></i></button> <button type="button" class="btn btn-default btn-fixed-width close-move-company-button" data-dismiss="modal" ng-click="closeModal()">{{dismissButtonText}} <i class="fa fa-white fa-times icon-right"></i></button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('newsletter-signup.html',
    '<div class="form-group" ng-show="showNewsletterSignup()"><div class="checkbox"><label for="receive-newsletter"><input id="receive-newsletter" name="receive-newsletter" type="checkbox" class="sign-up-newsletter-checkbox" tabindex="1" ng-model="mailSyncEnabled"> Send me an email with great Template ideas for my school each week</label></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('plan-banner.html',
    '<div class="hidden-xs"><div id="parent-plan-banner" class="alert p-2 mb-0 bg-success text-right" ng-show="getVisibleBanner() === \'parent\'"><div class="u_margin-right"><span class="font-weight-bold">{{plan.parentPlan.name}} Plan</span> <span class="ml-2">Managed by {{plan.parentPlanCompanyName || "the Parent Company"}}</span> <a href="#" ng-click="showPlans()" class="ml-3 btn btn-xs btn-primary">Change Plan</a></div></div><div id="parent-purchased-plan-banner" class="alert p-2 mb-0 bg-success text-right" ng-show="getVisibleBanner() === \'parentPurchased\'"><div class="u_margin-right"><span class="font-weight-bold">{{plan.name}} Plan</span> <span class="ml-2">Managed by {{plan.parentPlanCompanyName || "the Parent Company"}}</span></div></div><div id="free-plan-banner" class="alert alert-plan plan-active text-right" ng-show="getVisibleBanner() === \'free\'"><div class="u_margin-right"><span class="font-weight-bold">Get more out of Rise Vision!</span> <a href="#" ng-click="showPlans()" class="u_margin-left">See Our Plans</a></div></div><div id="cancelled-plan-banner" class="alert alert-plan plan-active text-right" ng-show="getVisibleBanner() === \'cancelled\'"><div class="u_margin-right"><span class="font-weight-bold">Your {{plan.name}} Plan subscription expires on {{ plan.currentPeriodEndDate | date : \'d-MMM-yyyy\'}}</span> <a href="{{storeAccountUrl}}" target="_blank" link-cid="" class="ml-3 btn btn-xs btn-primary" ng-hide="isChargebee">Account Settings</a> <a ui-sref="apps.billing.home" class="ml-3 btn btn-xs btn-primary" ng-show="isChargebee">Account Settings</a></div></div><div class="alert alert-plan plan-active text-right" ng-show="getVisibleBanner() === \'subscribed\'"><div class="u_margin-right"><span class="font-weight-bold">{{plan.name}} Plan</span> <a href="#" ng-show="!isEnterpriseSubCompany()" ng-click="showPlans()" class="ml-3 btn btn-xs btn-primary">Change Plan</a></div></div><div id="trial-plan-banner" class="alert alert-plan plan-active text-right" ng-show="getVisibleBanner() === \'trial\'"><div class="u_margin-right"><span class="font-weight-bold">You have {{plan.trialPeriod}} days left on your Rise Vision {{plan.name}} Plan trial!</span> <a href="#" ng-show="!isEnterpriseSubCompany()" ng-click="showPlans()" class="ml-3 btn btn-xs btn-primary">Subscribe Now</a></div></div><div class="alert alert-plan plan-suspended text-center" ng-show="getVisibleBanner() === \'expired\'"><div class="u_margin-right"><span class="font-weight-bold" ng-show="!plan.playerProTotalLicenseCount">Your Rise Vision {{plan.name}} Plan trial has expired! You are now on the Free Plan. Your Displays are no longer Licensed.</span> <span class="font-weight-bold" ng-show="plan.playerProTotalLicenseCount">Your Rise Vision {{plan.name}} Plan trial has expired! You are now on the Free Plan. Some of your Displays are no longer Licensed.</span> <a href="#" ng-show="!isEnterpriseSubCompany()" ng-click="showPlans()" class="ml-3 btn btn-xs btn-primary">Subscribe Now</a></div></div><div class="alert alert-plan plan-suspended text-center" ng-show="getVisibleBanner() === \'suspended\'"><div class="u_margin-right"><span class="font-weight-bold">There was an issue processing your payment. Please update your billing information. Your Displays may be affected.</span> <a href="{{storeAccountUrl}}" target="_blank" link-cid="" class="ml-3 btn btn-xs btn-primary" ng-hide="isChargebee">Update Billing</a> <a ui-sref="apps.billing.home" class="ml-3 btn btn-xs btn-primary" ng-show="isChargebee">Update Billing</a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('registration-modal.html',
    '<div rv-spinner="" rv-spinner-key="registration-modal" rv-spinner-start-active="1"><div class="modal-header"><h2 class="modal-title">One last step!</h2></div><div id="registration-modal" class="modal-body" stop-event="touchend"><form id="forms.registrationForm" novalidate="" role="form" name="forms.registrationForm" autocomplete="on"><div class="row"><div class="col-xs-12">Help us personalize your experience.</div></div><div class="row"><div class="col-xs-12 u_margin-md-top"><div class="form-group" ng-class="{ \'has-error\' : forms.registrationForm.firstName.$invalid && !forms.registrationForm.firstName.$pristine }"><label for="firstName">First name *</label> <input type="text" class="form-control firstName" name="firstName" id="firstName" autocomplete="fname" aria-required="true" tabindex="1" ng-model="profile.firstName" autofocus="" required=""><p ng-show="forms.registrationForm.firstName.$invalid && !forms.registrationForm.firstName.$pristine" class="help-block validation-error-message-first-name">Enter first name.</p></div><div class="form-group" ng-class="{ \'has-error\' : forms.registrationForm.lastName.$invalid && !forms.registrationForm.lastName.$pristine }"><label for="lastName">Last name *</label> <input type="text" class="form-control lastName" name="lastName" id="lastName" autocomplete="lname" aria-required="true" tabindex="1" ng-model="profile.lastName" required=""><p ng-show="forms.registrationForm.lastName.$invalid && !forms.registrationForm.lastName.$pristine" class="help-block validation-error-message-last-name">Enter last name.</p></div><div class="form-group" ng-class="{\'has-error\': forms.registrationForm.companyName.$invalid && !forms.registrationForm.companyName.$pristine}" ng-show="newUser"><label for="companyName">Organization *</label> <input type="text" class="form-control companyName" name="companyName" id="companyName" tabindex="1" aria-required="true" ng-model="company.name" ng-required="newUser"><p ng-show="forms.registrationForm.companyName.$invalid && !forms.registrationForm.companyName.$pristine" class="help-block validation-error-message-company-name">Enter organization.</p></div><div class="form-group" ng-class="{\'has-error\': forms.registrationForm.companyIndustry.$invalid && !forms.registrationForm.companyIndustry.$pristine}" ng-show="newUser"><label for="companyIndustry">Tell us your Industry to help us make your Display look great *</label><select class="form-control selectpicker companyIndustry" name="companyIndustry" id="companyIndustry" tabindex="1" aria-required="true" ng-model="company.companyIndustry" ng-required="newUser"><option value="" ng-show="false">&lt; Select Industry &gt;</option><option class="companyIndustryOption" ng-repeat="industry in DROPDOWN_INDUSTRY_FIELDS | orderBy:industry[0]" value="{{industry[1]}}">{{industry[0]}}</option></select><p ng-show="forms.registrationForm.companyIndustry.$invalid && !forms.registrationForm.companyIndustry.$pristine" class="help-block validation-error-message-company-industry">Select an Industry.</p></div><newsletter-signup ng-model="profile.mailSyncEnabled" company-industry="company.companyIndustry"></newsletter-signup><div class="form-group"><div class="checkbox" ng-class="{ \'has-error\' : forms.registrationForm.accepted.$invalid && !userForm.accepted.$pristine }"><label for="accepted"><input type="checkbox" id="accepted" name="accepted" class="accept-terms-checkbox" ng-model="profile.accepted" tabindex="1" required=""> <span>I accept the <a href="https://help.risevision.com/hc/en-us/articles/360000924446-Terms-of-Service" target="_blank" tabindex="1">Terms of Service</a> and <a href="https://help.risevision.com/hc/en-us/articles/360000915023-Privacy-Policy" target="_blank" tabindex="1">Privacy Policy</a> *</span><p class="help-block validation-error-message-accepted" ng-show="forms.registrationForm.accepted.$invalid && !forms.registrationForm.accepted.$pristine">You must accept the terms and conditions.</p></label></div></div></div></div></form></div><div class="modal-footer"><div class="row"><div class="col-xs-12 u_margin-sm-top"><button id="createAccount" type="submit" aria-label="Create Account" tabindex="1" form="forms.registrationForm" class="btn btn-lg btn-success btn-block registration-save-button" ng-click="save()" ng-disabled="registering">Create Account <i class="fa fa-white fa-check icon-right"></i></button></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('safe-delete-modal.html',
    '<form id="safeDeleteForm"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">common.safeDelete.title</h3></div><div class="modal-body" stop-event="touchend"><p translate="">common.safeDelete.message</p><input id="safeDeleteInput" type="text" ng-model="inputText" class="form-control"></div><div class="modal-footer"><button id="deleteForeverButton" class="btn btn-primary" ng-click="confirm()" ng-disabled="!canConfirm"><span translate="">common.delete-forever</span> <i class="fa fa-white fa-check icon-right"></i></button> <button class="btn btn-default btn-fixed-width" ng-click="cancel()"><span translate="">common.cancel</span> <i class="fa fa-white fa-times icon-right"></i></button></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('shoppingcart-button.html',
    '<li class="shopping-cart" ng-show="!hideShoppingCart && isRiseVisionUser"><a href="{{shoppingCartUrl}}" class="shopping-cart-button"><i class="fa fa-shopping-cart"></i> <span id="cartBadge" class="label label-primary" ng-show="cart.items.length">{{cart.items.length | surpressZero}}</span></a></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signout-modal.html',
    '<div class="modal-header"><button type="button" class="close" ng-click="closeModal()" aria-hidden="true"><i class="fa fa-times"></i></button><h2 id="sign-out-label" class="modal-title">Sign Out</h2></div><div class="modal-body sign-out-modal" stop-event="touchend"><form role="form"><p>Signing out does not sign you out of your Google Account.</p><p>If you are on a shared computer you should sign out of your Google Account.</p><p><button type="button" class="btn btn-default sign-out-rv-only-button" ng-click="signOut(false)">Sign Out <i class="fa fa-sign-out fa-lg icon-right"></i></button></p><button type="button" class="btn btn-default sign-out-google-account" ng-click="signOut(true)">Sign Out of your Google Account <i class="fa fa-google-plus-square fa-lg icon-right"></i></button><p></p></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subcompany-banner.html',
    '<div ng-show="isSubcompanySelected && !inRVAFrame" class="common-header-alert sub-company-alert hidden-xs">You\'re in Sub-Company {{selectedCompanyName}}&nbsp; <a href="" ng-click="switchToMyCompany()" class="link-button">Switch to My Company</a></div><div ng-show="isSubcompanySelected && !inRVAFrame" class="common-header-alert sub-company-alert visible-xs"><a href="" ng-click="switchToMyCompany()" class="link-button">My Company</a> <span class="sub-company-name">Sub-Company {{selectedCompanyName}}</span> <span>&nbsp;</span></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subcompany-modal.html',
    '<div rv-spinner="" rv-spinner-key="add-subcompany-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="closeModal()" aria-hidden="true"><i class="fa fa-times"></i></button><h2 id="sub-company-label" class="modal-title">Add Sub-Company</h2></div><div class="modal-body add-subcompany-modal" stop-event="touchend"><form role="form" name="forms.companyForm" novalidate=""><div ng-include="\'company-fields.html\'"></div><div class="form-group"><a href="" data-dismiss="modal" data-toggle="modal" class="move-subcompany-button" ng-click="moveCompany()">Move a Company Under Your Company</a></div></form></div><div class="modal-footer"><button type="button" class="btn btn-success btn-fixed-width add-subcompany-save-button" ng-click="save()" ng-disabled="forms.companyForm.$invalid">Save <i class="fa fa-white fa-check icon-right"></i></button> <button type="button" class="btn btn-default btn-fixed-width cancel-add-subcompany-button" ng-click="closeModal()">Cancel <i class="fa fa-white fa-times icon-right"></i></button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('system-messages-button-menu.html',
    '<ul><li class="dropdown-header dropdown-title system-message">Notifications</li><li class="divider"></li><li class="system-message" ng-repeat="message in messages" ng-bind-html="renderHtml(message.text)"></li></ul>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('system-messages-button.html',
    '<li dropdown="" class="dropdown system-messages hidden-xs" ng-show="isRiseVisionUser && messages.length > 0"><a href="" dropdown-toggle="" class="dropdown-toggle system-messages-button"><i class="fa fa-bell"></i> <span class="label label-danger system-messages-badge">{{messages.length | surpressZero}}</span></a><div class="dropdown-menu system-messages system-message-list" role="menu"><ng-include src="\'system-messages-button-menu.html\'"></ng-include></div></li><li class="system-messages" ng-show="isRiseVisionUser && messages.length > 0" ng-class="{\'visible-xs-inline-block\': isRiseVisionUser && messages.length > 0}"><a href="" class="system-messages-button" action-sheet="\'system-messages-button-menu.html\'" action-sheet-class="system-message-list"><i class="fa fa-bell"></i> <span class="label label-danger system-messages-badge">{{messages.length}}</span></a></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('test-company-banner.html',
    '<div ng-show="isTestCompanySelected" class="sub-company-alert test-company-alert">This is a Test Company</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('user-settings-modal.html',
    '<div rv-spinner="spinnerOptions" rv-spinner-key="user-settings-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="closeModal()"><i class="fa fa-times"></i></button><h2 id="user-settings-label" class="modal-title"><span ng-if="!isAdd">User Settings</span> <span ng-if="isAdd">Add User</span></h2></div><div class="modal-body user-settings-modal" stop-event="touchend"><div ng-if="isAdd" class="alert alert-info">A Google account is no longer required by users being added to your Company. Any email address can be used!</div><form id="forms.userSettingsForm" role="form" novalidate="" name="forms.userSettingsForm"><div id="passwordAlert" class="animated" ng-if="editingYourself && !isAdd" ng-show="!isRiseAuthUser && showChangePassword" ng-class="{ \'fadeIn\': showChangePassword }"><div class="panel-body bg-info u_margin-sm-bottom"><p class="u_remove-bottom"><span>This account is authenticated by Google.<br><a href="https://myaccount.google.com/security#signin" target="_blank">Change your password on your Google account.</a></span></p></div></div><div class="form-group" ng-class="{ \'has-error\' : forms.userSettingsForm.username.$invalid && !forms.userSettingsForm.username.$pristine }" ng-if="isAdd"><label>Username *</label> <input id="user-settings-username" type="email" required="" name="username" class="form-control" ng-model="user.username"><p ng-show="forms.userSettingsForm.username.$invalid && !forms.userSettingsForm.username.$pristine" class="help-block validation-error-message-email">User name must be a valid email address.</p></div><div class="row" ng-if="!isAdd"><div class="col-xs-6"><div class="form-group"><label>Username *</label><div><span id="user-settings-username-label">{{user.username}}</span></div></div></div><div class="col-xs-6 text-right"><span ng-if="editingYourself && isUserAdmin"><a href="" class="btn btn-default btn-sm change-password" ng-click="toggleChangePassword()">Change password</a></span></div></div><div id="passwordForm" class="animated" ng-if="editingYourself && !isAdd && isRiseAuthUser && showChangePassword" ng-class="{ \'fadeIn\': showChangePassword }"><div class="form-group" ng-class="{ \'has-error\' : (forms.resetPasswordForm.$submitted && forms.resetPasswordForm.newPassword.$invalid) || currentPasswordNotValid }"><label for="user-settings-current-password">Current Password *</label> <input id="user-settings-current-password" type="password" name="currentPassword" class="form-control" ng-model="userPassword.currentPassword" required=""><p class="text-danger" ng-show="forms.userSettingsForm.$submitted && forms.userSettingsForm.currentPassword.$error.required">Current Password is required.</p><p ng-show="currentPasswordNotValid" class="help-block validation-error-message-mail">Current Password is not valid.</p></div><div class="form-group" ng-class="{ \'has-error\' : (forms.resetPasswordForm.$submitted && forms.resetPasswordForm.newPassword.$invalid) }"><label for="user-settings-new-password">New Password *</label> <input id="user-settings-new-password" type="password" name="newPassword" class="form-control" ng-model="userPassword.newPassword" required="" minlength="4"><p class="text-danger" ng-show="forms.userSettingsForm.$submitted && forms.userSettingsForm.newPassword.$error.required">New Password is required.</p><p class="text-danger" ng-show="forms.userSettingsForm.$submitted && forms.userSettingsForm.newPassword.$error.minlength">New Password must be at least 4 characters long.</p><p class="text-warning" ng-show="forms.userSettingsForm.newPassword.$valid">A strong password is at least 8 characters, includes uppercase/lowercase letters, and one or more numbers.</p></div><div class="form-group" ng-class="{ \'has-error\' : (forms.resetPasswordForm.$submitted && forms.resetPasswordForm.confirmPassword.$invalid) }"><label for="user-settings-confirm-password">Confirm Password *</label> <input id="user-settings-confirm-password" type="password" name="confirmPassword" class="form-control" ng-model="userPassword.confirmPassword" required="" confirm-password-validator="userPassword.newPassword"><p ng-show="forms.userSettingsForm.$submitted && forms.userSettingsForm.confirmPassword.$error.required" class="text-danger">Confirm Password is required.</p><p ng-show="forms.userSettingsForm.$submitted && forms.userSettingsForm.confirmPassword.$error.passwordMatch" class="text-danger">New Password and Confirm Password must match.</p><hr></div></div><div class="form-group" ng-class="{ \'has-error\' : forms.userSettingsForm.firstName.$invalid && !forms.userSettingsForm.firstName.$pristine }"><label for="user-settings-first-name">First Name *</label> <input id="user-settings-first-name" type="text" required="" name="firstName" class="form-control" ng-model="user.firstName"><p ng-show="forms.userSettingsForm.firstName.$invalid && !forms.userSettingsForm.firstName.$pristine" class="help-block validation-error-message-firstName">First Name is required.</p></div><div class="form-group" ng-class="{ \'has-error\' : forms.userSettingsForm.lastName.$invalid && !forms.userSettingsForm.lastName.$pristine }"><label for="user-settings-last-name">Last Name *</label> <input id="user-settings-last-name" type="text" required="" name="lastName" class="form-control" ng-model="user.lastName"><p ng-show="forms.userSettingsForm.lastName.$invalid && !forms.userSettingsForm.lastName.$pristine" class="help-block validation-error-message-lastName">Last Name is required.</p></div><div class="form-group"><label for="company-role">Company Role</label><select id="company-role" class="form-control selectpicker" ng-model="user.companyRole"><option value="" ng-show="false">&lt; Select Role &gt;</option><option ng-repeat="role in COMPANY_ROLE_FIELDS" value="{{role[1]}}">{{role[0]}}</option></select></div><div class="form-group"><label for="user-settings-phone">Phone</label> <input id="user-settings-phone" type="tel" name="phone" class="form-control" ng-model="user.telephone"></div><div class="form-group" ng-class="{ \'has-error\' : forms.userSettingsForm.email.$invalid && !forms.userSettingsForm.email.$pristine }"><label for="user-settings-email">Email *</label> <input id="user-settings-email" type="email" required="" name="email" class="form-control" ng-model="user.email"><p ng-show="forms.userSettingsForm.email.$invalid && !forms.userSettingsForm.email.$pristine" class="help-block validation-error-message-email">A valid email address is required.</p></div><div class="form-group"><label>Roles</label><div class="checkbox" ng-repeat="role in availableRoles" ng-show="editRoleVisible(role)"><label><input type="checkbox" id="user-settings-{{role.key}}" checklist-model="user.roles" ng-disabled="!editRoleAllowed(role)" checklist-value="role.key"> {{role.name}}</label></div></div><div class="form-group" ng-if="user.lastLogin"><label>Last Login</label><div>{{user.lastLogin | date:\'d-MMM-yyyy h:mm a\'}}</div></div><div class="form-group" ng-if="!editingYourself && !isAdd"><label for="user-settings-status">Status</label><select id="user-settings-status" class="form-control selectpicker" ng-model="user.status" integer-parser=""><option value="1">Active</option><option value="0">Inactive</option></select></div></form></div><div class="modal-footer"><p class="text-right"><last-modified change-date="user.changeDate" changed-by="user.changedBy"></last-modified></p><button type="button" id="delete-button" class="btn btn-danger btn-fixed-width pull-left" ng-if="!isAdd && isUserAdmin" ng-click="deleteUser()">Delete <i class="fa fa-white fa-trash-o icon-right"></i></button><div class="pull-right"><button type="submit" form="forms.userSettingsForm" class="btn btn-primary btn-fixed-width" data-dismiss="modal" ng-click="save()" id="save-button" ng-if="isUserAdmin">Save <i class="fa fa-white fa-check icon-right"></i></button> <button type="button" class="btn btn-default btn-fixed-width" ng-click="closeModal()">Cancel <i class="fa fa-white fa-times icon-right"></i></button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.header.templates');
} catch (e) {
  module = angular.module('risevision.common.header.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('zendesk-button.html',
    '<li dropdown="" class="dropdown hidden-xs"><button id="zendeskHelpButton" class="btn btn-primary" ng-click="showZendeskWidget()"><i><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewbox="0 0 22 22"><path d="M11,12.3V13c0,0-1.8,0-2,0v-0.6c0-0.6,0.1-1.4,0.8-2.1c0.7-0.7,1.6-1.2,1.6-2.1c0-0.9-0.7-1.4-1.4-1.4 c-1.3,0-1.4,1.4-1.5,1.7H6.6C6.6,7.1,7.2,5,10,5c2.4,0,3.4,1.6,3.4,3C13.4,10.4,11,10.8,11,12.3z" fill="white"></path><circle cx="10" cy="15" r="1" fill="white"></circle><path d="M10,2c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S5.6,2,10,2 M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0 L10,0z" fill="white"></path></svg></i> <span class="hidden-sm hidden-xs hidden-md">Help</span></button></li><li class="visible-xs-inline-block"><button class="btn btn-primary" ng-click="showZendeskWidget()"><i><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewbox="0 0 22 22"><path d="M11,12.3V13c0,0-1.8,0-2,0v-0.6c0-0.6,0.1-1.4,0.8-2.1c0.7-0.7,1.6-1.2,1.6-2.1c0-0.9-0.7-1.4-1.4-1.4 c-1.3,0-1.4,1.4-1.5,1.7H6.6C6.6,7.1,7.2,5,10,5c2.4,0,3.4,1.6,3.4,3C13.4,10.4,11,10.8,11,12.3z" fill="white"></path><circle cx="10" cy="15" r="1" fill="white"></circle><path d="M10,2c4.4,0,8,3.6,8,8s-3.6,8-8,8s-8-3.6-8-8S5.6,2,10,2 M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0 L10,0z" fill="white"></path></svg></i></button></li>');
}]);
})();

angular.module("risevision.common.header", [
  "ui.router",
  "risevision.common.account",
  "risevision.common.gapi",
  "risevision.common.config",
  "risevision.core.cache",
  "risevision.core.company",
  "risevision.common.cookie",
  "risevision.common.header.templates",
  "risevision.common.header.directives",
  "risevision.common.header.filters",
  "risevision.common.i18n",
  "risevision.common.systemmessages", "risevision.core.systemmessages",
  "risevision.core.countries",
  "risevision.core.oauth2",
  "risevision.store.authorization",
  "risevision.store.services",
  "risevision.common.geodata",
  "risevision.store.data-gadgets",
  "risevision.core.userprofile",
  "risevision.common.registration",
  "risevision.common.shoppingcart",
  "checklist-model",
  "ui.bootstrap", "ngSanitize", "ngCsv", "ngTouch", "ngTagsInput",
  "risevision.common.components.userstate",
  "risevision.common.components.last-modified",
  "risevision.common.components.loading",
  "risevision.common.components.search-filter",
  "risevision.common.components.scrolling-list",
  "risevision.common.components.stop-event",
  "risevision.common.components.analytics",
  "risevision.common.components.message-box",
  "risevision.common.components.svg",
  "risevision.common.components.plans",
  "risevision.common.components.purchase-flow",
  "risevision.common.support"
])

.factory("bindToScopeWithWatch", [

  function () {
    return function (fnToWatch, scopeVar, scope) {
      scope.$watch(function () {
          return fnToWatch.call();
        },
        function (val) {
          scope[scopeVar] = val;
        });
    };
  }
])

.value("ENV_NAME", "")

.directive("commonHeader", ["$modal", "$rootScope", "$q", "$loading",
  "$interval", "oauth2APILoader", "$log",
  "$templateCache", "userState", "$location", "bindToScopeWithWatch",
  "$document", "cookieTester", "companyIcpFactory", "ENV_NAME",
  function ($modal, $rootScope, $q, $loading, $interval,
    oauth2APILoader, $log, $templateCache, userState, $location,
    bindToScopeWithWatch, $document, cookieTester, companyIcpFactory,
    ENV_NAME) {
    return {
      restrict: "E",
      template: $templateCache.get("common-header.html"),
      scope: false,
      link: function ($scope, element, attr) {
        companyIcpFactory.init();
        cookieTester.checkCookies().then(function () {
          $scope.cookieEnabled = true;
        }, function () {
          $scope.cookieEnabled = false;
        });
        $scope.navCollapsed = true;
        $scope.inRVAFrame = userState.inRVAFrame();
        $scope.isSubcompanySelected = userState.isSubcompanySelected;
        $scope.isTestCompanySelected = userState.isTestCompanySelected;
        $scope.ENV_NAME = ENV_NAME;

        // If nav options not provided use defaults
        if (!$scope[attr.navOptions]) {
          $scope.navOptions = [{
            title: "Home",
            link: "#/"
          }, {
            title: "Account",
            link: ""
          }, {
            title: "Sellers",
            link: ""
          }, {
            title: "Platform",
            link: "http://rva.risevision.com/",
            target: "_blank"
          }];
        }

        //default to true
        $scope.hideShoppingCart = attr.hideShoppingCart !== "0" &&
          attr.hideShoppingCart !== "false";
        $scope.hideHelpMenu = attr.hideHelpMenu !== "0" &&
          attr.hideHelpMenu !== "false";

        // used by userState; determines if the URL root is used for
        // Authentication redirect
        $rootScope.redirectToRoot = attr.redirectToRoot !== "0" &&
          attr.redirectToRoot !== "false";

        // disable opening home page in new tab (default true)
        $rootScope.newTabHome = attr.newTabHome !== "0" &&
          attr.newTabHome !== "false";

        bindToScopeWithWatch(userState.isRiseVisionUser, "isRiseVisionUser",
          $scope);

        $rootScope.$on("$stateChangeSuccess", function () {
          if ($scope.inRVAFrame) {
            $location.search("inRVA", $scope.inRVAFrame);
          }
        });

        //insert meta tag to page to prevent zooming in in mobile mode
        var viewPortTag = $document[0].createElement("meta");
        viewPortTag.id = "viewport";
        viewPortTag.name = "viewport";
        viewPortTag.content =
          "width=device-width, initial-scale=1, user-scalable=no";
        $document[0].getElementsByTagName("head")[0].appendChild(viewPortTag);
      }
    };
  }
])

.run(["segmentAnalytics", "SEGMENT_API_KEY", "ENABLE_INTERCOM_MESSAGING",
  "analyticsEvents", "$document",
  function (segmentAnalytics, SEGMENT_API_KEY, ENABLE_INTERCOM_MESSAGING,
    analyticsEvents, $document) {
    analyticsEvents.initialize();
    segmentAnalytics.load(SEGMENT_API_KEY, ENABLE_INTERCOM_MESSAGING);

    $document.on("keydown", function (event) {
      var doPrevent = false;
      if (event.keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === "INPUT" &&
            (
              d.type.toUpperCase() === "TEXT" ||
              d.type.toUpperCase() === "PASSWORD" ||
              d.type.toUpperCase() === "FILE" ||
              d.type.toUpperCase() === "SEARCH" ||
              d.type.toUpperCase() === "EMAIL" ||
              d.type.toUpperCase() === "NUMBER" ||
              d.type.toUpperCase() === "DATE" ||
              d.type.toUpperCase() === "TEL" ||
              d.type.toUpperCase() === "URL")
          ) ||
          d.tagName.toUpperCase() === "TEXTAREA") {
          doPrevent = d.readOnly || d.disabled;
        } else {
          doPrevent = true;
        }
      }
      if (doPrevent) {
        event.preventDefault();
      }
    });
  }
])

.directive("ngEnter", function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
})
  .directive("ngDisableRightClick", function () {
    return function (scope, element) {
      element.bind("contextmenu", function (event) {
        scope.$apply(function () {
          event.preventDefault();
        });
      });
    };
  });

angular.module("risevision.common.header.directives", []);
angular.module("risevision.common.header.filters", []);
angular.module("risevision.store.services", []);

"use strict";

angular.module("risevision.common.header.directives")
  .directive("companyButtons", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        scope: false,
        replace: true,
        template: $templateCache.get("company-buttons-menu.html"),
        link: function () {} //link()
      };
    }
  ]);

"use strict";

angular.module("risevision.common.header.directives")
  .value("EMAIL_REGEX",
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
)
  .directive("emailsField", ["$templateCache", "$timeout", "EMAIL_REGEX",
    function ($templateCache, $timeout, EMAIL_REGEX) {
      return {
        restrict: "E",
        require: "ngModel",
        scope: {
          emails: "=ngModel"
        },
        template: $templateCache.get("emails-field.html"),
        link: function ($scope, elem, attr, ngModel) {
          var updatingEmails = false;
          var validationError = false;

          function _findBySelector(selector) {
            var queryResult = elem[0].querySelector(selector);
            return angular.element(queryResult);
          }

          /* Handles the case when invalid email is entered, a bad input is reported but the user then removes the text.
            Since the tag was never created, a new event is not generated by tags-input and this directive would remain $invalid if not handled */
          $timeout(function () {
            // jQuery lite only allows searching by simple tag name, and a more complex selector is needed here
            var inputField = _findBySelector("tags-input > div > div > input");
            var spanField = _findBySelector("tags-input > div > div > span");

            inputField.keyup(function () {
              // Needed to wait an extra cycle
              $timeout(function () {
                if (spanField.text() === "Add an email") {
                  _setValid(true);
                  $scope.$digest();
                }
              });
            });
          });

          $scope.$watch("emails", function () {
            if (!updatingEmails) {
              $scope.emailsList = _.uniq($scope.emails).map(function (e) {
                return {
                  text: e
                };
              });
            }

            updatingEmails = false;
          });

          $scope.updateModel = function () {
            _setValid(true);
            updatingEmails = true;
            $scope.emails = _emailsModelToStrings();
          };

          $scope.invalidateModel = function () {
            _setValid(false);
          };

          $scope.canRemove = function () {
            return !validationError;
          };

          $scope.isValidEmail = function (email) {
            return !!(email && email.text && EMAIL_REGEX.test(email.text) && _emailsModelToStrings().indexOf(email.text) ===
              -1);
          };

          function _emailsModelToStrings() {
            return $scope.emailsList.map(function (t) {
              return t.text;
            });
          }

          function _setValid(isValid) {
            validationError = !isValid;
            ngModel.$setValidity("emails", isValid);
          }
        }
      };
    }
  ]);

angular.module("risevision.common.header.directives")
  .directive("emptySelectParser", [

    function () {
      return {
        require: "ngModel",
        link: function (scope, ele, attr, ctrl) {
          ctrl.$parsers.unshift(function (value) {
            return value === null ? "" : value;
          });
        }
      };
    }
  ]);

angular.module("risevision.common.header.directives")
  .directive("fastpass", ["loadFastpass", "userState",
    function (loadFastpass, userState) {
      return {
        restrict: "AE",
        scope: {},
        link: function ($scope) {
          $scope.$watch(function () {
            return userState.getUserEmail();
          }, function (email) {
            if (email) {
              loadFastpass(userState.getUsername(), userState.getUserEmail());
            }
          });
        }
      };
    }
  ]);

angular.module("risevision.common.header.directives")
  .directive("integerParser", [

    function () {
      return {
        require: "ngModel",
        link: function (scope, ele, attr, ctrl) {
          ctrl.$parsers.push(function (viewValue) {
            return parseInt(viewValue, 10) || 0;
          });
          ctrl.$formatters.push(function (viewValue) {
            return typeof viewValue === "undefined" ? "" : "" + viewValue;
          });
        }
      };
    }
  ]);

angular.module("risevision.common.header.directives")
  .directive("linkCid", ["userState",
    function (userState) {
      return {
        link: function ($scope, ele, attr) {

          var linkCompanyId = "";

          var updateLinkCompanyId = function (companyId) {
            var index = attr.href.indexOf("cid=");
            var value;
            if (index > -1) {
              value = attr.href.substring(0, index + 4) + companyId;
            } else {
              value = attr.href +
                (attr.href.indexOf("?") === -1 ? "?" : "&") +
                "cid=" + companyId;
            }
            linkCompanyId = companyId;
            attr.$set("href", value);
          };

          $scope.$watch(function () {
            return userState.getSelectedCompanyId();
          }, function (newValue) {
            if (newValue && newValue !== linkCompanyId) {
              updateLinkCompanyId(newValue);
            }
          });
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.header.directives")
  .directive("newsletterSignup", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        require: "ngModel",
        scope: {
          mailSyncEnabled: "=ngModel",
          companyIndustry: "="
        },
        template: $templateCache.get("newsletter-signup.html"),
        link: function ($scope) {
          $scope.showNewsletterSignup = function () {
            return ($scope.companyIndustry === "PRIMARY_SECONDARY_EDUCATION" ||
              $scope.companyIndustry === "HIGHER_EDUCATION");
          };

        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.header.directives")
  .directive("requireRole", ["userState",
    function (userState) {
      return {
        restrict: "A",
        priority: 100000,
        scope: false,

        compile: function (element, attr) {
          var accessDenied = true;
          var requiredRoles = attr.requireRole.split(" ");
          for (var i in requiredRoles) {
            if (userState.hasRole(requiredRoles[i])) {
              accessDenied = false;
            }
          }
          if (accessDenied) {
            angular.forEach(element.children(), function (elm) {
              try {
                elm.remove();
              } catch (ignore) {}
            });
            element.remove();
          }
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.header.directives")
  .directive("websiteValidator", [

    function () {
      return {
        require: "ngModel",
        restrict: "A",
        link: function (scope, elem, attr, ngModel) {
          var WEBSITE_REGEXP =
            /^(http[s]?:\/\/){0,1}([^\s/?\.#:@"]+\.)+([^\s/?\.#:"@-]{2,61})([\/?#][^\s"]*)?$/;

          var validator = function (value) {
            if (!value || WEBSITE_REGEXP.test(value)) {
              ngModel.$setValidity("website", true);
            } else {
              ngModel.$setValidity("website", false);
            }

            return value;
          };

          ngModel.$parsers.unshift(validator);
          ngModel.$formatters.unshift(validator);
        }
      };
    }
  ]);

angular.module("risevision.common.header")
  .controller("AuthButtonsCtr", ["$scope", "$modal", "$templateCache",
    "userState", "userAuthFactory", "canAccessApps",
    "$loading", "cookieStore",
    "$log", "uiFlowManager", "oauth2APILoader", "bindToScopeWithWatch",
    "$window", "APPS_URL",
    function ($scope, $modal, $templateCache, userState, userAuthFactory,
      canAccessApps,
      $loading, cookieStore, $log, uiFlowManager, oauth2APILoader,
      bindToScopeWithWatch, $window, APPS_URL) {

      window.$loading = $loading; //DEBUG

      $scope.inRVAFrame = userState.inRVAFrame();

      $scope.spinnerOptions = {
        color: "#999",
        hwaccel: true,
        radius: 10
      };

      //clear state where user registration is surpressed
      $scope.$on("risevision.user.signedOut", function () {
        cookieStore.remove("surpressRegistration");
      });

      $scope.$on("risevision.uiStatus.validationCancelled", function () {
        cookieStore.remove("surpressRegistration");
      });

      //spinner
      $scope.$watch(function () {
          return uiFlowManager.isStatusUndetermined();
        },
        function (undetermined) {
          $scope.undetermined = undetermined;
          $scope.loading = undetermined;
        });


      //render dialogs based on status the UI is stuck on
      $scope.$watch(function () {
          return uiFlowManager.getStatus();
        },
        function (newStatus, oldStatus) {
          if (newStatus) {
            $log.debug("status changed from", oldStatus, "to", newStatus);

            //render a dialog based on the status current UI is in
            if (newStatus === "registeredAsRiseVisionUser") {
              if (!userState.registrationModalInstance && userState.isLoggedIn()) { // avoid duplicate registration modals
                userState.registrationModalInstance = $modal.open({
                  template: $templateCache.get("registration-modal.html"),
                  controller: "RegistrationModalCtrl",
                  backdrop: "static", //prevent from closing modal by clicking outside
                  keyboard: false, //prevent from closing modal by pressing escape
                  resolve: {
                    account: ["getUserProfile", "getAccount",
                      function (getUserProfile, getAccount) {
                        return getUserProfile(userState.getUsername())
                          .then(null, function (resp) {
                            if (resp && resp.message ===
                              "User has not yet accepted the Terms of Service"
                            ) {
                              return getAccount();
                            } else {
                              return null;
                            }
                          })
                          .catch(function () {
                            return null;
                          });
                      }
                    ]
                  }
                });
              }

              userState.registrationModalInstance.result.finally(function () {
                //TODO: put it somewhere else
                userState.registrationModalInstance = null;
                uiFlowManager.invalidateStatus();
              });
            } else if (newStatus === "signedInWithGoogle") {
              $scope.login();
            }
          }
        });

      //watch on username change and populate onto scope variables requried
      // for rendering UI

      $scope.$watch(function () {
          return userState.isLoggedIn();
        },
        function (loggedIn) {
          $scope.isLoggedIn = loggedIn;
          if (loggedIn === true) {
            $scope.userPicture = userState.getUserPicture();
          }
        });
      $scope.$watch(function () {
          return userState.getUserCompanyName();
        },
        function () {
          $scope.companyName = userState.getUserCompanyName();
        });

      $scope.$watch(function () {
          return userState.getUsername();
        },
        function () {
          $scope.username = userState.getUsername();
        });
      bindToScopeWithWatch(userState.isRiseVisionUser, "isRiseVisionUser",
        $scope);

      // Login Modal
      $scope.login = function (endStatus, signup) {
        $loading.startGlobal("auth-buttons-login");
        canAccessApps(signup, true).finally(function () {
          $loading.stopGlobal("auth-buttons-login");
          uiFlowManager.invalidateStatus(endStatus);
        });
      };

      // Show Alert Settings page
      $scope.alertSettings = function () {
        var alertsUrl = APPS_URL + "/alerts?cid=" + userState.getSelectedCompanyId();

        $window.location.href = alertsUrl;
      };

      // Show User Settings Modal
      $scope.userSettings = function (size) {
        // var modalInstance =
        $modal.open({
          template: $templateCache.get("user-settings-modal.html"),
          controller: "UserSettingsModalCtrl",
          size: size,
          resolve: {
            username: function () {
              return userState.getUsername();
            },
            add: function () {
              return false;
            }
          }
        });
      };

      $scope.isChargebee = function () {
        return userState.isSelectedCompanyChargebee();
      };

      $scope.isApps = function () {
        return APPS_URL === "" || $window.location.href.startsWith(APPS_URL);
      };

      $loading.startGlobal("auth-buttons-silent");
      oauth2APILoader() //force loading oauth api on startup
      //to avoid popup blocker
      .then().finally(function () {
        userAuthFactory.authenticate(false).then().finally(function () {
          $loading.stopGlobal("auth-buttons-silent");
          if (!uiFlowManager.isStatusUndetermined()) {
            //attempt to reach a stable registration state only
            //when there is currently no validating checking
            uiFlowManager.invalidateStatus("registrationComplete");
          }
        });
      });


    }
  ]);

angular.module("risevision.common.header")

.controller("CloseFrameButtonCtrl", [
  "$scope", "$log", "gadgetsService",
  function ($scope, $log, gadgetsService) {
    $scope.closeIFrame = function () {
      $log.debug("gadgetsService.closeIFrame");
      gadgetsService.closeIFrame();
    };

  }
]);

angular.module("risevision.common.header")
  .controller("CompanyButtonsCtrl", ["$scope", "$modal", "$templateCache",
    "userState", "getCoreCountries",
    function ($scope, $modal, $templateCache, userState, getCoreCountries) {
      $scope.inRVAFrame = userState.inRVAFrame();

      $scope.$watch(function () {
          return userState.isSubcompanySelected();
        },
        function () {
          $scope.isSubcompanySelected = userState.isSubcompanySelected();
        });

      $scope.$watch(function () {
          return userState.getSelectedCompanyName();
        },
        function (selectedCompanyName) {
          if (selectedCompanyName) {
            $scope.selectedCompanyName = userState.getSelectedCompanyName();
          }
        });

      $scope.$watch(function () {
          return userState.isRiseVisionUser();
        },
        function (isRvUser) {
          $scope.isRiseVisionUser = isRvUser;
          if (isRvUser === true) {
            $scope.isUserAdmin = userState.isUserAdmin();
            $scope.isPurchaser = userState.isPurchaser();
          }
        });

      $scope.$watch(function () {
          return userState.isRiseAdmin();
        },
        function (isRvAdmin) {
          $scope.isRiseVisionAdmin = isRvAdmin;
        });

      $scope.addSubCompany = function () {
        $modal.open({
          template: $templateCache.get("subcompany-modal.html"),
          controller: "SubCompanyModalCtrl",
          size: "lg",
          resolve: {
            countries: function () {
              return getCoreCountries();
            }
          }
        });
      };

      // Show Company Settings Modal
      $scope.companySettings = function () {
        $modal.open({
          template: $templateCache.get("company-settings-modal.html"),
          controller: "CompanySettingsModalCtrl",
          size: "lg",
          resolve: {
            companyId: function () {
              return userState.getSelectedCompanyId();
            },
            countries: function () {
              return getCoreCountries();
            }
          }
        });
      };

      // Show Company Users Modal
      $scope.companyUsers = function (size) {
        $modal.open({
          template: $templateCache.get("company-users-modal.html"),
          controller: "CompanyUsersModalCtrl",
          size: size,
          backdrop: true,
          resolve: {
            company: function () {
              return userState.getCopyOfSelectedCompany();
            }
          }
        });
      };

      $scope.switchCompany = function () {
        var modalInstance = $modal.open({
          template: $templateCache.get("company-selector-modal.html"),
          controller: "companySelectorCtr",
          backdrop: true,
          resolve: {
            companyId: function () {
              return userState.getSelectedCompanyId();
            }
          }
        });
        modalInstance.result.then(userState.switchCompany);
      };

      // Show Move Company Modal
      $scope.moveCompany = function (size) {
        // var modalInstance =
        $modal.open({
          template: $templateCache.get("move-company-modal.html"),
          controller: "MoveCompanyModalCtrl",
          size: size
        });
      };

      $scope.resetCompany = function () {
        userState.resetCompany();
      };

    }
  ]);

angular.module("risevision.common.header")

.controller("CompanyIcpModalCtrl", ["$scope", "$modalInstance",
  "company", "user", "COMPANY_INDUSTRY_FIELDS",
  function ($scope, $modalInstance, company, user,
    COMPANY_INDUSTRY_FIELDS) {

    $scope.company = company;
    $scope.user = user;
    $scope.DROPDOWN_INDUSTRY_FIELDS = COMPANY_INDUSTRY_FIELDS;

    $scope.save = function () {
      $modalInstance.close({
        user: user,
        company: company
      });
    };

    $scope.selectIndustry = function (industryValue) {
      if (company.companyIndustry !== industryValue) {
        company.companyIndustry = industryValue;
      } else {
        company.companyIndustry = "";
      }
    };

  }
]);

angular.module("risevision.common.header")


.controller("CompanySettingsModalCtrl", ["$scope", "$modalInstance",
  "updateCompany", "companyId", "countries", "REGIONS_CA", "REGIONS_US",
  "TIMEZONES", "getCompany", "regenerateCompanyField", "$window", "$loading",
  "humanReadableError", "userState", "userAuthFactory", "deleteCompany",
  "segmentAnalytics", "$modal", "$templateCache",
  "COMPANY_INDUSTRY_FIELDS", "COMPANY_SIZE_FIELDS",
  function ($scope, $modalInstance, updateCompany, companyId,
    countries, REGIONS_CA, REGIONS_US, TIMEZONES, getCompany,
    regenerateCompanyField, $window, $loading, humanReadableError,
    userState, userAuthFactory, deleteCompany, segmentAnalytics,
    $modal, $templateCache, COMPANY_INDUSTRY_FIELDS, COMPANY_SIZE_FIELDS) {

    $scope.company = {
      id: companyId
    };
    $scope.countries = countries;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;
    $scope.timezones = TIMEZONES;
    $scope.COMPANY_INDUSTRY_FIELDS = COMPANY_INDUSTRY_FIELDS;
    $scope.COMPANY_SIZE_FIELDS = COMPANY_SIZE_FIELDS;
    $scope.isRiseStoreAdmin = userState.isRiseStoreAdmin();

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("company-settings-modal");
      } else {
        $loading.stop("company-settings-modal");
      }
    });

    $scope.loading = false;

    $scope.forms = {};

    if (companyId) {
      $scope.loading = true;
      getCompany(companyId).then(
        function (company) {
          $scope.company = company;
          $scope.company.isSeller = company && company.sellerId ? true : false;
          $scope.company.isChargebee = company && company.origin === "Chargebee";
        },
        function (resp) {
          $window.alert("An error has occurred. " + humanReadableError(resp));
        }).finally(function () {
        $scope.loading = false;
      });
    }
    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };
    $scope.save = function () {
      $scope.loading = true;

      var company = angular.copy($scope.company);

      verifyAdmin(company);
      updateCompany($scope.company.id, company)
        .then(
          function () {
            segmentAnalytics.track("Company Updated", {
              companyId: userState.getSelectedCompanyId(),
              companyName: userState.getSelectedCompanyName(),
              isUserCompany: !userState.isSubcompanySelected()
            });

            userState.updateCompanySettings($scope.company);
            $modalInstance.close("success");
          })
        .catch(
          function (error) {
            $window.alert("Error(s): " + humanReadableError(error));
          })
        .finally(function () {
          $scope.loading = false;
        });
    };
    $scope.deleteCompany = function () {
      var instance = $modal.open({
        template: $templateCache.get("safe-delete-modal.html"),
        controller: "SafeDeleteModalCtrl"
      });
      instance.result.then(function () {
        $scope.loading = true;
        deleteCompany($scope.company.id)
          .then(
            function () {
              segmentAnalytics.track("Company Deleted", {
                companyId: userState.getSelectedCompanyId(),
                companyName: userState.getSelectedCompanyName(),
                isUserCompany: !userState.isSubcompanySelected()
              });

              if (userState.getUserCompanyId() === $scope.company.id) {
                userAuthFactory.signOut();
              } else if (userState.getSelectedCompanyId() === $scope.company
                .id) {
                userState.resetCompany();
              }
              $modalInstance.close("success");
            })
          .catch(
            function (error) {
              $window.alert("Error(s): " + humanReadableError(error));
            })
          .finally(function () {
            $scope.loading = false;
          });
      });
    };
    $scope.resetAuthKey = function () {
      if ($window.confirm(
        "Resetting the Company Authentication Key will cause existing Data Gadgets to no longer report data until they are updated with the new Key."
      )) {
        $loading.start("company-settings-modal");
        regenerateCompanyField($scope.company.id, "authKey").then(
          function (resp) {
            $scope.company.authKey = resp.item;
            $window.alert("Successfully changed Authentication Key.");
          },
          function (error) {
            $window.alert("Error: " + humanReadableError(error));
          })
          .finally(function () {
            $loading.stop("company-settings-modal");
          });
      }
    };
    $scope.resetClaimId = function () {
      if ($window.confirm(
        "Resetting the Company Claim Id will cause existing installations to no longer be associated with your Company."
      )) {
        $loading.start("company-settings-modal");
        regenerateCompanyField($scope.company.id, "claimId").then(
          function (resp) {
            $scope.company.claimId = resp.item;
            $window.alert("Successfully changed Claim ID.");
          },
          function (error) {
            $window.alert("Error: " + humanReadableError(error));
          })
          .finally(function () {
            $loading.stop("company-settings-modal");
          });
      }
    };

    function verifyAdmin(company) {
      if ($scope.isRiseStoreAdmin) {
        company.sellerId = company.isSeller ? "yes" : null;
      } else {
        //exclude fields from API call
        delete company.sellerId;
        delete company.isTest;
        delete company.shareCompanyPlan;
      }
    }

  }
]);

angular.module("risevision.common.header")

.filter("roleLabel", ["userRoleMap",
  function (userRoleMap) {
    return function (key) {
      return userRoleMap[key];
    };
  }
])

.controller("CompanyUsersModalCtrl", ["$scope", "$loading", "$modalInstance", "$modal",
  "$templateCache", "ScrollingListService", "company", "getUsers",
  function ($scope, $loading, $modalInstance, $modal, $templateCache,
    ScrollingListService, company, getUsers) {

    $scope.search = {
      companyId: company.id,
      sortBy: "username",
      reverse: false,
      name: "Users"
    };

    $scope.users = new ScrollingListService(getUsers, $scope.search);

    $scope.filterConfig = {
      placeholder: "Search Users"
    };

    $scope.$watch("users.loadingItems", function (loading) {
      if (loading) {
        $loading.start("company-users-list");
      } else {
        $loading.stop("company-users-list");
      }
    });

    $scope.addUser = function (size) {
      var instance = $modal.open({
        template: $templateCache.get("user-settings-modal.html"),
        controller: "AddUserModalCtrl",
        size: size,
        resolve: {
          companyId: function () {
            return company.id;
          }
        }
      });
      instance.result.finally($scope.users.doSearch);
    };

    $scope.editUser = function (username, size) {
      var instance = $modal.open({
        template: $templateCache.get("user-settings-modal.html"),
        controller: "UserSettingsModalCtrl",
        size: size,
        resolve: {
          username: function () {
            return username;
          },
          add: function () {
            return false;
          }
        }
      });
      instance.result.finally($scope.users.doSearch);
    };

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

  }
]);

angular.module("risevision.common.header")

.controller("GlobalAlertsCtrl", ["$scope", "$rootScope",
  function ($scope, $rootScope) {

    $scope.errors = [];

    $scope.$on("risevision.user.authorized", function () {
      $scope.errors.length = 0;
    });

    $rootScope.$on("risevision.common.globalError", function (event, message) {
      $scope.errors.push(message);
    });

    $scope.dismiss = function (messageType, index) {
      $scope[messageType].splice(index, 1);
    };
  }
]);

angular.module("risevision.common.header")

.controller("MoveCompanyModalCtrl", ["$scope", "$modalInstance",
  "moveCompany", "lookupCompany", "userState", "$loading",
  function ($scope, $modalInstance, moveCompany, lookupCompany, userState,
    $loading) {

    $scope.company = {};
    $scope.errors = [];
    $scope.messages = [];

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("move-company-modal");
      } else {
        $loading.stop("move-company-modal");
      }
    });

    $scope.selectedCompany = userState.getCopyOfSelectedCompany();

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.moveCompany = function () {
      $scope.messages = [];
      $scope.loading = true;
      moveCompany($scope.company.authKey, userState.getSelectedCompanyId()).then(
        function () {
          $scope.messages.push(
            "Success. The company has been moved under your company.");
          $scope.moveSuccess = true;
        }, function (err) {
          $scope.errors.push("Error: " + JSON.stringify(err));
        })
        .finally(function () {
          $scope.loading = false;
        });
    };

    $scope.getCompany = function () {
      $scope.errors = [];
      $scope.messages = [];
      $scope.loading = true;
      lookupCompany($scope.company.authKey).then(function (resp) {
        angular.extend($scope.company, resp);
      }, function (resp) {
        $scope.errors.push("Failed to retrieve company. " + resp.message);
      }).finally(function () {
        $scope.loading = false;
      });
    };

    $scope.$watch("moveSuccess", function (moveSuccess) {
      if (moveSuccess) {
        $scope.dismissButtonText = "Close";
      } else {
        $scope.dismissButtonText = "Cancel";
      }
    });
  }
]);

angular.module("risevision.common.header")
  .controller("PlanBannerCtrl", ["$scope", "$rootScope", "userState", "plansFactory",
    "currentPlanFactory", "STORE_URL", "ACCOUNT_PATH",
    function ($scope, $rootScope, userState, plansFactory, currentPlanFactory,
      STORE_URL, ACCOUNT_PATH) {
      $scope.plan = {};
      $scope.showPlans = plansFactory.showPlansModal;
      $scope.storeAccountUrl = STORE_URL + ACCOUNT_PATH;

      $rootScope.$on("risevision.plan.loaded", function () {
        $scope.plan = currentPlanFactory.currentPlan;

        $scope.isChargebee = userState.isSelectedCompanyChargebee();
      });

      $scope.isEnterpriseSubCompany = currentPlanFactory.isEnterpriseSubCompany;

      $scope.getVisibleBanner = function () {
        var banner = "free";

        if (currentPlanFactory.isParentPlan()) {
          banner = "parent";
        } else if (currentPlanFactory.currentPlan.isPurchasedByParent) {
          banner = "parentPurchased";
        } else if (currentPlanFactory.isCancelledActive()) {
          banner = "cancelled";
        } else if (currentPlanFactory.isFree() && currentPlanFactory.isCancelled()) {
          banner = "free";
        } else if (currentPlanFactory.isSubscribed()) {
          banner = "subscribed";
        } else if (currentPlanFactory.isOnTrial()) {
          banner = "trial";
        } else if (currentPlanFactory.isTrialExpired()) {
          banner = "expired";
        } else if (currentPlanFactory.isSuspended()) {
          banner = "suspended";
        }

        return banner;
      };

    }
  ]);

angular.module("risevision.common.header")
  .controller("RegisterButtonCtrl", ["$scope", "cookieStore", "uiFlowManager",
    function ($scope, cookieStore, uiFlowManager) {

      $scope.register = function () {
        cookieStore.remove("surpressRegistration");
        uiFlowManager.invalidateStatus("registrationComplete");
      };
    }
  ]);

angular.module("risevision.common.header")
  .controller("RegistrationModalCtrl", [
    "$q", "$scope", "$rootScope", "$modalInstance",
    "$loading", "registerAccount", "$log", "cookieStore",
    "userState", "pick", "uiFlowManager", "humanReadableError",
    "agreeToTermsAndUpdateUser", "account", "segmentAnalytics",
    "bigQueryLogging", "analyticsEvents", "updateCompany", "plansFactory",
    "COMPANY_INDUSTRY_FIELDS", "urlStateService",
    function ($q, $scope, $rootScope, $modalInstance, $loading, registerAccount,
      $log, cookieStore, userState, pick, uiFlowManager, humanReadableError,
      agreeToTermsAndUpdateUser, account, segmentAnalytics, bigQueryLogging,
      analyticsEvents, updateCompany, plansFactory, COMPANY_INDUSTRY_FIELDS,
      urlStateService) {

      $scope.newUser = !account;
      $scope.DROPDOWN_INDUSTRY_FIELDS = COMPANY_INDUSTRY_FIELDS;

      var copyOfProfile = account ? account : userState.getCopyOfProfile() || {};

      $scope.company = {};

      //remove cookie so that it will show next time user refreshes page
      cookieStore.remove("surpressRegistration");

      $scope.profile = pick(copyOfProfile, "email", "mailSyncEnabled",
        "firstName", "lastName");
      $scope.profile.email = $scope.profile.email || userState.getUsername();
      $scope.registering = false;

      $scope.profile.accepted =
        angular.isDefined(copyOfProfile.termsAcceptanceDate) &&
        copyOfProfile.termsAcceptanceDate !== null;

      if (!angular.isDefined($scope.profile.mailSyncEnabled)) {
        //"no sign up" by default
        $scope.profile.mailSyncEnabled = false;
      }

      // check status, load spinner, or close dialog if registration is complete
      var watch = $scope.$watch(
        function () {
          return uiFlowManager.isStatusUndetermined();
        },
        function (undetermined) {
          if (undetermined === true) {
            //start the spinner
            $loading.start("registration-modal");
          } else if (undetermined === false) {
            if (uiFlowManager.getStatus() === "registrationComplete") {
              $modalInstance.close("success");
              //stop the watch
              watch();
            }
            $loading.stop("registration-modal");
          }
        });

      var updateCompanyData = function () {
        if ($scope.newUser) {
          return updateCompany(userState.getUserCompanyId(), $scope.company)
            .then(function (company) {
              userState.updateCompanySettings(company);
            });
        } else {
          return $q.defer().resolve();
        }
      };

      $scope.save = function () {
        $scope.forms.registrationForm.accepted.$pristine = false;
        $scope.forms.registrationForm.firstName.$pristine = false;
        $scope.forms.registrationForm.lastName.$pristine = false;
        $scope.forms.registrationForm.companyName.$pristine = false;
        $scope.forms.registrationForm.companyIndustry.$pristine = false;

        if (!$scope.forms.registrationForm.$invalid) {
          //update terms and conditions date
          $scope.registering = true;
          $loading.start("registration-modal");

          var action;
          if ($scope.newUser) {
            action = registerAccount(userState.getUsername(), $scope.profile);
          } else {
            action = agreeToTermsAndUpdateUser(userState.getUsername(),
              $scope.profile);
          }

          action
            .then(function () {
                userState.refreshProfile()
                  .finally(function () {
                    if ($scope.newUser) {
                      plansFactory.startBasicPlanTrial();
                    }

                    updateCompanyData();
                    analyticsEvents.identify();
                    segmentAnalytics.track("User Registered", {
                      "companyId": userState.getUserCompanyId(),
                      "companyName": userState.getUserCompanyName(),
                      "isNewCompany": $scope.newUser
                    });
                    bigQueryLogging.logEvent("User Registered");
                    $rootScope.$broadcast(
                      "risevision.user.authorized");

                    $modalInstance.close("success");
                    $loading.stop("registration-modal");
                  });
              },
              function (err) {
                alert("Error: " + humanReadableError(err));
                console.error(err);
              })
            .finally(function () {
              $scope.registering = false;
              userState.refreshProfile();
            });
        }

      };

      var populateIndustryFromUrl = function () {

        var industryName = urlStateService.getUrlParam("industry");

        if ($scope.newUser && industryName) {

          COMPANY_INDUSTRY_FIELDS.forEach(function (industry) {
            if (industryName === industry[0]) {
              $scope.company.companyIndustry = industry[1];
            }
          });
        }
      };

      populateIndustryFromUrl();

      $scope.forms = {};
    }
  ]);

"use strict";

angular.module("risevision.common.header")
  .controller("SafeDeleteModalCtrl", ["$scope", "$modalInstance",
    function ($scope, $modalInstance) {
      $scope.inputText = null;
      $scope.canConfirm = false;

      $scope.$watch("inputText", function () {
        $scope.canConfirm = $scope.inputText === "DELETE";
      });

      $scope.confirm = function () {
        if ($scope.canConfirm) {
          $modalInstance.close();
        }
      };

      $scope.cancel = function () {
        $modalInstance.dismiss("cancel");
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);

angular.module("risevision.common.header")

.filter("surpressZero", function () {
  return function (num) {
    if (num) {
      return num;
    } else {
      return "";
    }
  };
})

.controller("ShoppingCartButtonCtrl", [
  "$scope", "shoppingCart", "userState", "$log", "STORE_URL",
  function ($scope, shoppingCart, userState, $log, STORE_URL) {

    $scope.shoppingCartUrl = STORE_URL + "shopping-cart";
    $scope.cart = {};
    $scope.cart.items = shoppingCart.getItems();
    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (isRvUser) {
        $scope.isRiseVisionUser = isRvUser;
        shoppingCart.get();
      });

  }
]);

angular.module("risevision.common.header")
  .controller("SignOutButtonCtrl", ["$scope", "$modal", "$templateCache",
    "$log", "uiFlowManager", "userAuthFactory", "userState",
    function ($scope, $modal, $templateCache, $log, uiFlowManager,
      userAuthFactory, userState) {
      $scope.logout = function () {
        if (userState.isRiseAuthUser()) {
          userAuthFactory.signOut()
            .then(function () {
              $log.debug("Custom Auth user signed out");
            })
            .catch(function (err) {
              $log.error("Custom Auth sign out failed", err);
            });
        } else {
          var modalInstance = $modal.open({
            template: $templateCache.get("signout-modal.html"),
            controller: "SignOutModalCtrl"
          });
          modalInstance.result.finally(function () {
            uiFlowManager.invalidateStatus("registrationComplete");
          });
        }

      };
    }
  ]);

angular.module("risevision.common.header")
  .controller("SignOutModalCtrl", ["$scope", "$modalInstance", "$log",
    "userAuthFactory", "userState",
    function ($scope, $modalInstance, $log, userAuthFactory, userState) {
      $scope.isRiseAuthUser = userState.isRiseAuthUser();

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };
      $scope.signOut = function (signOutGoogle) {
        userAuthFactory.signOut(signOutGoogle).then(function () {
          $log.debug("user signed out");
        }, function (err) {
          console.error("sign out failed", err);
        }).finally(function () {
          $modalInstance.dismiss("success");
        });
      };
    }
  ]);

angular.module("risevision.common.header")

.controller("SubcompanyBannerCtrl", ["$scope", "$modal",
  "$loading", "userState",
  function ($scope, $modal, $loading, userState) {
    $scope.inRVAFrame = userState.inRVAFrame();

    $scope.$watch(function () {
        return userState.getSelectedCompanyId();
      },
      function () {
        $scope.isSubcompanySelected = userState.isSubcompanySelected();
        $scope.selectedCompanyName = userState.getSelectedCompanyName();
      });

    $scope.switchToMyCompany = function () {
      userState.resetCompany();
    };
  }
]);

angular.module("risevision.common.header")
  .controller("SubCompanyModalCtrl", ["$scope", "$modalInstance", "$modal",
    "$templateCache", "createCompany", "countries", "REGIONS_CA",
    "REGIONS_US", "TIMEZONES", "userState", "$loading", "humanReadableError",
    "segmentAnalytics", "bigQueryLogging", "COMPANY_INDUSTRY_FIELDS",
    "COMPANY_SIZE_FIELDS",
    function ($scope, $modalInstance, $modal, $templateCache,
      createCompany, countries, REGIONS_CA, REGIONS_US, TIMEZONES, userState,
      $loading, humanReadableError, segmentAnalytics, bigQueryLogging,
      COMPANY_INDUSTRY_FIELDS, COMPANY_SIZE_FIELDS) {

      $scope.company = {};
      $scope.countries = countries;
      $scope.regionsCA = REGIONS_CA;
      $scope.regionsUS = REGIONS_US;
      $scope.timezones = TIMEZONES;
      $scope.COMPANY_INDUSTRY_FIELDS = COMPANY_INDUSTRY_FIELDS;
      $scope.COMPANY_SIZE_FIELDS = COMPANY_SIZE_FIELDS;

      $scope.forms = {};

      $scope.$watch("loading", function (loading) {
        if (loading) {
          $loading.start("add-subcompany-modal");
        } else {
          $loading.stop("add-subcompany-modal");
        }
      });

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };
      $scope.save = function () {
        $scope.loading = true;
        createCompany(userState.getSelectedCompanyId(),
          $scope.company).then(function (company) {
          segmentAnalytics.track("Company Created", {
            companyId: company.id,
            companyName: company.name
          });
          bigQueryLogging.logEvent("Company Created", company.name, null,
            userState.getUsername(), company.id);

          $modalInstance.close("success");
        }, function (err) {
          alert("Error: " + humanReadableError(err));
        })
          .finally(function () {
            $scope.loading = false;
          });
      };
      // Show Move Company Modal
      $scope.moveCompany = function (size) {
        // var modalInstance =
        $modal.open({
          template: $templateCache.get("move-company-modal.html"),
          controller: "MoveCompanyModalCtrl",
          size: size
        });
      };
    }
  ]);

angular.module("risevision.common.header")
  .controller("companySelectorCtr", ["$scope", "$loading", "$modalInstance",
    "companyService", "companyId", "ScrollingListService",
    function ($scope, $loading, $modalInstance, companyService,
      companyId, ScrollingListService) {

      $scope.search = {
        query: ""
      };

      $scope.search = {
        companyId: companyId,
        sortBy: "name",
        reverse: false,
        name: "Companies"
      };

      $scope.companies = new ScrollingListService(companyService.getCompanies, $scope.search);

      $scope.filterConfig = {
        placeholder: "Search Companies"
      };

      $scope.$watch("companies.loadingItems", function (loading) {
        if (loading) {
          $loading.start("company-selector-modal-list");
        } else {
          $loading.stop("company-selector-modal-list");
        }
      });

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };

      $scope.setCompany = function (company) {
        $modalInstance.close(company.id);
      };

    }
  ]);

angular.module("risevision.common.header")

.controller("SystemMessagesButtonCtrl", [
  "$scope", "userState", "$log", "$sce", "getCoreSystemMessages",
  "systemMessages",
  function ($scope, userState, $log, $sce, getCoreSystemMessages,
    systemMessages) {

    $scope.messages = systemMessages;
    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (isRvUser) {
        $scope.isRiseVisionUser = isRvUser;
      });

    $scope.renderHtml = function (html_code) {
      return $sce.trustAsHtml(html_code);
    };

    //register core message retriever
    systemMessages.registerRetriever(function () {
      return getCoreSystemMessages(userState.getSelectedCompanyId());
    });

    $scope.$watch(
      function () {
        return userState.getSelectedCompanyId();
      },
      function (newCompanyId) {
        if (newCompanyId !== null) {
          systemMessages.resetAndGetMessages().then($scope.apply);
        } else {
          systemMessages.clear();
        }
      });

  }
]);

angular.module("risevision.common.header")

.controller("TestCompanyBannerCtrl", ["$scope", "userState",
  function ($scope, userState) {
    $scope.$watch(function () {
        return userState.isTestCompanySelected();
      },
      function (isTest) {
        $scope.isTestCompanySelected = isTest;
      });
  }
]);

angular.module("risevision.common.header")

.controller("AddUserModalCtrl", ["$scope", "$filter", "addUser",
  "$modalInstance", "companyId", "userState", "userRoleMap",
  "humanReadableError", "messageBox", "$loading", "segmentAnalytics",
  "COMPANY_ROLE_FIELDS",
  function ($scope, $filter, addUser, $modalInstance, companyId,
    userState, userRoleMap, humanReadableError, messageBox, $loading,
    segmentAnalytics, COMPANY_ROLE_FIELDS) {
    $scope.isAdd = true;
    $scope.COMPANY_ROLE_FIELDS = COMPANY_ROLE_FIELDS;
    $scope.isUserAdmin = userState.isUserAdmin();

    //push roles into array
    $scope.availableRoles = [];
    angular.forEach(userRoleMap, function (v, k) {
      $scope.availableRoles.push({
        key: k,
        name: v
      });
    });

    //convert string to numbers
    $scope.$watch("user.status", function (status) {
      if ($scope.user && typeof $scope.user.status === "string") {
        $scope.user.status = parseInt(status);
      }
    });

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("user-settings-modal");
      } else {
        $loading.stop("user-settings-modal");
      }
    });

    $scope.save = function () {

      $scope.forms.userSettingsForm.email.$pristine = false;
      $scope.forms.userSettingsForm.username.$pristine = false;
      $scope.forms.userSettingsForm.firstName.$pristine = false;
      $scope.forms.userSettingsForm.lastName.$pristine = false;

      if (!$scope.forms.userSettingsForm.$invalid) {
        $scope.loading = true;
        addUser(companyId, $scope.user.username, $scope.user)
          .then(function () {
              segmentAnalytics.track("User Created", {
                userId: $scope.user.username,
                companyId: companyId
              });

              $modalInstance.close("success");
            },
            function (error) {

              var errorMessage = "Error: " + humanReadableError(error);
              if (error.code === 409) {
                errorMessage = $filter("translate")(
                  "common-header.user.error.duplicate-user", {
                    "username": $scope.user.username
                  });
              }

              messageBox("common-header.user.error.add-user", errorMessage);
            })
          .finally(function () {
            $scope.loading = false;
          });
      }
    };

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.editRoleAllowed = function (role) {
      if (userState.isRiseAdmin()) {
        return true;
      } else if (userState.isUserAdmin()) {
        if (role.key === "sa" || role.key === "ba") {
          return false;
        } else {
          return true;
        }
      } else {
        //do not allow user to check/uncheck role by default
        return false;
      }
    };

    $scope.editRoleVisible = function (role) {
      if (userState.isSelectedCompanyChargebee() && role.key === "pu") {
        return false;
      } else if (userState.isRiseAdmin()) {
        if (userState.isSubcompanySelected() && (role.key === "sa" || role.key ===
          "ba")) {
          return false;
        } else {
          return true;
        }
      } else if (userState.isUserAdmin() || userState.isRiseVisionUser()) {
        if (role.key === "sa" || role.key === "ba") {
          return false;
        } else {
          return true;
        }
      } else {
        // in practice should never reach here
        return false;
      }
    };

    $scope.forms = {};

  }
]);

angular.module("risevision.common.header")

.controller("UserSettingsModalCtrl", [
  "$scope", "$filter", "$modalInstance", "updateUser", "getUserProfile",
  "deleteUser", "username", "userRoleMap", "$log", "$loading", "userState",
  "userAuthFactory", "uiFlowManager", "humanReadableError", "messageBox",
  "$rootScope", "segmentAnalytics", "userauth", "$q", "COMPANY_ROLE_FIELDS",
  function ($scope, $filter, $modalInstance, updateUser, getUserProfile,
    deleteUser, username, userRoleMap, $log, $loading, userState,
    userAuthFactory, uiFlowManager, humanReadableError, messageBox,
    $rootScope, segmentAnalytics, userauth, $q, COMPANY_ROLE_FIELDS) {
    $scope.user = {};
    $scope.userPassword = {};
    $scope.showChangePassword = false;
    $scope.isRiseAuthUser = userState.isRiseAuthUser();
    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("user-settings-modal");
      } else {
        $loading.stop("user-settings-modal");
      }
    });

    //push roles into array
    $scope.availableRoles = [];
    angular.forEach(userRoleMap, function (v, k) {
      $scope.availableRoles.push({
        key: k,
        name: v
      });
    });
    $scope.COMPANY_ROLE_FIELDS = COMPANY_ROLE_FIELDS;

    // convert string to numbers
    $scope.$watch("user.status", function (status) {
      if (typeof $scope.user.status === "string") {
        $scope.user.status = parseInt(status);
      }
    });

    $scope.isUserAdmin = userState.isUserAdmin();
    $scope.username = username;

    $scope.loading = true;
    getUserProfile(username).then(function (user) {
      $scope.user = user;
      $scope.editingYourself = userState.checkUsername(user.username);

    }).finally(function () {
      $scope.loading = false;
    });

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.deleteUser = function () {
      if (confirm("Are you sure you want to delete this user?")) {
        deleteUser($scope.username)
          .then(function () {
            segmentAnalytics.track("User Deleted", {
              userId: $scope.username,
              companyId: userState.getSelectedCompanyId(),
              isSelf: userState.checkUsername(username)
            });

            if (userState.checkUsername(username)) {
              userAuthFactory.signOut().then().finally(function () {
                uiFlowManager.invalidateStatus("registrationComplete");
              });
            }
          })
          .finally(function () {
            $modalInstance.dismiss("deleted");
          });
      }
    };

    $scope.save = function () {
      if ($scope.showChangePassword) {
        $scope.currentPasswordNotValid = false;
      }

      if ($scope.forms.userSettingsForm.$valid) {
        var changePasswordPromise = $q.resolve();

        $scope.loading = true;

        if ($scope.showChangePassword) {
          changePasswordPromise = userauth.updatePassword(
            username,
            $scope.userPassword.currentPassword,
            $scope.userPassword.newPassword);
          changePasswordPromise
            .then(function () {
              $scope.userPassword = {};
              $scope.showChangePassword = false;
            })
            .catch(function (err) {
              var newError = err.result.error;

              if (newError.code === 409) {
                $scope.currentPasswordNotValid = true;
                newError.changePassword = true;
              }
              return $q.reject(newError);
            });
        }

        changePasswordPromise
          .then(function () {
            return updateUser(username, $scope.user);
          })
          .then(function (resp) {
            if (userState.checkUsername(username)) {
              userState.updateUserProfile(resp.item);
            }

            segmentAnalytics.track("User Updated", {
              userId: $scope.username,
              companyId: userState.getSelectedCompanyId(),
              isSelf: userState.checkUsername(username)
            });

            $modalInstance.close("success");
          })
          .catch(function (error) {
            error = (error.result && error.result.error) || error;
            $log.debug(error);
            var errorMessage = "Error: " + humanReadableError(error);
            if (error.code === 409 && !error.changePassword) {
              errorMessage = $filter("translate")(
                "common-header.user.error.duplicate-user", {
                  "username": $scope.user.username
                });
            } else if (error.changePassword) {
              errorMessage = error.message;
            }

            messageBox("common-header.user.error.update-user",
              errorMessage);
          })
          .finally(function () {
            $scope.loading = false;
          });
      }
    };

    $scope.editRoleAllowed = function (role) {
      if (userState.isRiseAdmin()) {
        return true;
      } else if (userState.isUserAdmin()) {
        if (role.key === "sa" || role.key === "ba") {
          return false;
        } else if (role.key === "ua" &&
          userState.checkUsername($scope.user.username)) {
          //cannot unassign oneself from ua
          return false;
        } else {
          return true;
        }
      } else {
        //do not allow user to check/uncheck role by default
        return false;
      }
    };

    $scope.editRoleVisible = function (role) {
      if (userState.isSelectedCompanyChargebee() && role.key === "pu") {
        return false;
      } else if (userState.isRiseAdmin()) {
        if (userState.isSubcompanySelected() && (role.key === "sa" || role.key ===
          "ba")) {
          return false;
        } else {
          return true;
        }
      } else if (userState.isUserAdmin() || userState.isRiseVisionUser()) {
        if (role.key === "sa" || role.key === "ba") {
          return false;
        } else {
          return true;
        }
      } else {
        // in practice should never reach here
        return false;
      }
    };

    $scope.forms = {};

    $scope.toggleChangePassword = function () {
      $scope.showChangePassword = !$scope.showChangePassword;
    };
  }
]);

angular.module("risevision.common.header")

.controller("ZendeskButtonCtrl", ["$scope", "zendesk",
  function ($scope, zendesk) {
    $scope.showZendeskWidget = function () {
      zendesk.activateWidget();
    };
  }
]);

// ------------------------------------
// Action Sheet
// ------------------------------------
angular.module("risevision.common.header")
  .directive("actionSheet", ["$document", "$compile", "$timeout",
    function ($document, $compile, $timeout) {
      return {
        restrict: "A",
        link: function (scope, iElement, iAttrs) {

          var body = $document.find("body").eq(0);
          var isVisible = false;
          var backdropDomEl = document.getElementById("action-sheet-backdrop");

          if (!angular.isObject(backdropDomEl)) {
            backdropDomEl = angular.element(
              "<div id=\"action-sheet-backdrop\" class=\"modal-backdrop\"></div>"
            );
            body.append(backdropDomEl);
          } else {
            backdropDomEl = angular.element(backdropDomEl);
          }

          scope.templateUrl = scope.$eval(iAttrs.actionSheet);
          scope.title = scope.$eval(iAttrs.title);

          var angularDomEl = angular.element(
            "<div class=\"action-sheet is-action-sheet-closed\"><ng-include src=\"templateUrl\"></ng-include></div>"
          );

          var actionSheetDomEl = $compile(angularDomEl)(scope);
          body.append(actionSheetDomEl);

          var toggle = function () {
            isVisible = !isVisible;
            //fix for #298 - BEGIN
            //need to completly hide element
            if (isVisible) {
              //make element visible first, then apply transformation
              actionSheetDomEl.toggleClass("is-action-sheet-closed");
              $timeout(function () {
                actionSheetDomEl.toggleClass("is-action-sheet-opened");
                backdropDomEl.toggleClass("is-action-sheet-opened");
              });
            } else {
              //apply transformation first, then hide element
              actionSheetDomEl.toggleClass("is-action-sheet-opened");
              backdropDomEl.toggleClass("is-action-sheet-opened");
              $timeout(function () {
                actionSheetDomEl.toggleClass("is-action-sheet-closed");
              }, 500);
            }
            //fix for #298 - END

            if (isVisible) {
              backdropDomEl.bind("tap", toggle);
              backdropDomEl.bind("click", toggle);
            } else {
              backdropDomEl.unbind("tap");
              backdropDomEl.unbind("click");
            }
          };

          //add classes

          if (iAttrs.actionSheetClass) {
            iAttrs.actionSheetClass.split(" ").forEach(function (cls) {
              actionSheetDomEl.addClass(cls);
            });
          }

          iElement.bind("tap", toggle);
          iElement.bind("click", toggle);
          angularDomEl.bind("tap", toggle);
          angularDomEl.bind("click", toggle);
        }
      };
    }
  ])
  .directive("replaceInclude", function () {
    return {
      require: "ngInclude",
      restrict: "A",
      link: function (scope, el) {
        el.replaceWith(el.children());
      }
    };
  });

// ------------------------------------
// Off-Canvas Navigation
// ------------------------------------
angular.module("risevision.common.header")
  .service("offCanvas", ["$window",
    function ($window) {

      var service = {
        visible: false,
        enabled: false
      };

      service.enabled = angular.element($window).width() <= 1200 ? true :
        false;

      service.toggle = function (event) {

        if (event) {
          event.stopPropagation();
        }

        if (!service.enabled && !service.visible) {
          return;
        }

        service.visible = !service.visible;
        if (service.visible) {
          service.nav.addClass("is-off-canvas-opened");
        } else {
          service.nav.removeClass("is-off-canvas-opened");
        }
      };

      service.registerNav = function (nav) {
        service.nav = nav;
        service.nav.addClass("off-canvas--container");
      };

      window.onresize = function () {
        service.enabled = angular.element($window).width() <= 1200 ? true :
          false;
      };

      return service;
    }
  ])
  .directive("offCanvasNav", ["offCanvas",
    function (offCanvas) {
      return {
        restrict: "A",
        link: function (scope, iElement) {
          iElement.addClass("off-canvas--nav");
          offCanvas.registerNav(iElement);
          // Handle Click
          iElement.bind("tap", offCanvas.toggle);
          iElement.bind("click", offCanvas.toggle);
        }
      };
    }
  ])
  .directive("offCanvasToggle", ["offCanvas",
    function (offCanvas) {
      return {
        restrict: "A",
        link: function (scope, iElement) {
          iElement.bind("tap", offCanvas.toggle);
          iElement.bind("click", offCanvas.toggle);
        }
      };
    }
  ]);

(function (angular) {

  "use strict";
  angular.module("risevision.common.account", [
    "risevision.common.gapi",
    "risevision.core.userprofile",
    "risevision.core.cache"
  ])

  .factory("agreeToTerms", ["$q", "riseAPILoader", "$log", "userInfoCache",
    function ($q, riseAPILoader, $log, userInfoCache) {
      return function () {
        $log.debug("agreeToTerms called.");
        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var request = riseApi.account.agreeToTerms();
          request.execute(function (resp) {
            $log.debug("agreeToTerms resp", resp);
            userInfoCache.removeAll();
            if (!resp.error) {
              deferred.resolve();
            } else {
              deferred.reject(resp.error);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("agreeToTermsAndUpdateUser", ["$q", "$log",
    "agreeToTerms", "updateUser",
    function ($q, $log, agreeToTerms, updateUser) {
      return function (username, basicProfile) {
        $log.debug("registerAccount called.", username, basicProfile);
        var deferred = $q.defer();
        agreeToTerms().then().finally(function () {
          updateUser(username, basicProfile).then(function (resp) {
            if (resp.result) {
              deferred.resolve();
            } else {
              deferred.reject();
            }
          }, deferred.reject).finally("registerAccount ended");
        });
        return deferred.promise;
      };
    }
  ])

  .factory("registerAccount", ["$q", "$log",
    "addAccount", "updateUser",
    function ($q, $log, addAccount, updateUser) {
      return function (username, basicProfile) {
        $log.debug("registerAccount called.", username, basicProfile);
        var deferred = $q.defer();
        addAccount().then().finally(function () {
          updateUser(username, basicProfile).then(function (resp) {
            if (resp.result) {
              deferred.resolve();
            } else {
              deferred.reject();
            }
          }, deferred.reject).finally("registerAccount ended");
        });
        return deferred.promise;
      };
    }
  ])

  .factory("addAccount", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function () {
        $log.debug("addAccount called.");
        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var request = riseApi.account.add();
          request.execute(function (resp) {
            $log.debug("addAccount resp", resp);
            if (resp.result) {
              deferred.resolve();
            } else {
              deferred.reject("addAccount");
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("getAccount", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function () {
        $log.debug("getAccount called.");
        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var request = riseApi.account.get();
          request.execute(function (resp) {
            $log.debug("getAccount resp", resp);
            if (resp.item) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject("getAccount");
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);

})(angular);

"use strict";

angular.module("risevision.store.services")
  .factory("getChargebeeInstance", ["$q", "$window", "$loading", "storeService", "userState",
    "CHARGEBEE_TEST_SITE", "CHARGEBEE_PROD_SITE",
    function ($q, $window, $loading, storeService, userState, CHARGEBEE_TEST_SITE, CHARGEBEE_PROD_SITE) {
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

          $loading.startGlobal("chargebee-session");

          storeService.createSession(companyId)
            .then(function (session) {
              console.log("Chargebee session for companyId", companyId, "is", session);

              currentInstance = _createChargebeeInstance(session);
              currentCompanyId = companyId;
              // Chargebee expiration fields are expressed in seconds, while Date.now() is in milliseconds
              var sessionDuration = (Number(session.expires_at) - Number(session.created_at)) * 1000;
              currentSessionExpiration = Date.now() + sessionDuration;

              $loading.stopGlobal("chargebee-session");
              deferred.resolve(currentInstance);
            })
            .catch(function (err) {
              console.log("Error creating Customer Portal session for company id", companyId, err);
              $loading.stopGlobal("chargebee-session");
              deferred.reject(err);
            });

          return deferred.promise;
        }
      };
    }
  ])
  .factory("ChargebeeFactory", ["$rootScope", "$window", "$log", "getChargebeeInstance", "plansFactory",
    "currentPlanFactory",
    function ($rootScope, $window, $log, getChargebeeInstance, plansFactory, currentPlanFactory) {
      return function () {
        var factory = {
          apiError: null
        };

        var _getChargebeePortal = function (companyId) {
          factory.apiError = null;

          return getChargebeeInstance(companyId)
            .then(function (instance) {
              return instance.portal;
            });
        };

        var _handleChargebeePortalError = function (err, companyId) {
          if (err.status === 404 && !currentPlanFactory.currentPlan.isPurchasedByParent && !plansFactory.isPlansModalOpen) {
            plansFactory.showPlansModal();
          } else if (err.status === 404 && currentPlanFactory.currentPlan.isPurchasedByParent) {
            // Throw no access error
            factory.apiError = 403;
            console.log("Company does not exist in Chargebee, companyId", companyId, err);
          } else {
            factory.apiError = err;
            console.log("Failed to retrieve session for companyId", companyId, err);
          }
        };

        var _chargebeeCallbacks = {
          loaded: function () {
            $log.debug("Chargebee loaded event");
            $rootScope.$emit("chargebee.loaded");
          },
          close: function () {
            $log.debug("Chargebee close event");
            $rootScope.$emit("chargebee.close");
          },
          visit: function (sectionName) {
            $log.debug("Chargebee visit event", sectionName);
            $rootScope.$emit("chargebee.visit", sectionName);
          },
          paymentSourceAdd: function () {
            $log.debug("Chargebee paymentSourceAdd event");
            $rootScope.$emit("chargebee.paymentSourceAdd");
          },
          paymentSourceUpdate: function () {
            $log.debug("Chargebee paymentSourceUpdate event");
            $rootScope.$emit("chargebee.paymentSourceUpdate");
          },
          paymentSourceRemove: function () {
            $log.debug("Chargebee paymentSourceRemove event");
            $rootScope.$emit("chargebee.paymentSourceRemove");
          },
          subscriptionChanged: function (data) {
            $log.debug("Chargebee subscriptionChanged event", data);
            $rootScope.$emit("chargebee.subscriptionChanged", data);
          },
          subscriptionCancelled: function (data) {
            $log.debug("Chargebee subscriptionCancelled event", data);
            $rootScope.$emit("chargebee.subscriptionCancelled", data);
          }
        };

        factory.openPortal = function (companyId) {
          _getChargebeePortal(companyId)
            .then(function (portal) {
              portal.open(_chargebeeCallbacks);
            })
            .catch(function (err) {
              _handleChargebeePortalError(err, companyId);
            });
        };

        factory.openAccountDetails = function (companyId) {
          _getChargebeePortal(companyId)
            .then(function (portal) {
              portal.open(_chargebeeCallbacks, {
                sectionType: $window.Chargebee.getPortalSections().ACCOUNT_DETAILS
              });
            })
            .catch(function (err) {
              _handleChargebeePortalError(err, companyId);
            });
        };

        factory.openAddress = function (companyId) {
          _getChargebeePortal(companyId)
            .then(function (portal) {
              portal.open(_chargebeeCallbacks, {
                sectionType: $window.Chargebee.getPortalSections().ADDRESS
              });
            })
            .catch(function (err) {
              _handleChargebeePortalError(err, companyId);
            });
        };

        factory.openBillingHistory = function (companyId) {
          _getChargebeePortal(companyId)
            .then(function (portal) {
              portal.open(_chargebeeCallbacks, {
                sectionType: $window.Chargebee.getPortalSections().BILLING_HISTORY
              });
            })
            .catch(function (err) {
              _handleChargebeePortalError(err, companyId);
            });
        };

        factory.openPaymentSources = function (companyId) {
          _getChargebeePortal(companyId)
            .then(function (portal) {
              portal.open(_chargebeeCallbacks, {
                sectionType: $window.Chargebee.getPortalSections().PAYMENT_SOURCES
              });
            })
            .catch(function (err) {
              _handleChargebeePortalError(err, companyId);
            });
        };

        factory.openSubscriptionDetails = function (companyId, subscriptionId) {
          _getChargebeePortal(companyId)
            .then(function (portal) {
              portal.open(_chargebeeCallbacks, {
                sectionType: $window.Chargebee.getPortalSections().SUBSCRIPTION_DETAILS,
                params: {
                  subscriptionId: subscriptionId
                }
              });
            })
            .catch(function (err) {
              _handleChargebeePortalError(err, companyId);
            });
        };

        return factory;

      };
    }
  ]);

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
    ["K-12 Education", "PRIMARY_SECONDARY_EDUCATION",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/university.svg"
    ],
    ["Higher Education", "HIGHER_EDUCATION",
      "https://www.risevision.com/hubfs/mortarboard-2.svg?t=1502211789708"
    ],
    ["Religious", "RELIGIOUS_INSTITUTIONS",
      "https://www.risevision.com/hubfs/Assets%20May%5B17%5D/religious.svg?t=1502211789708"
    ],
    ["Nonprofit", "PHILANTHROPY",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/donation-1.svg"
    ],
    ["Retail", "RETAIL",
      "https://www.risevision.com/hubfs/business-1.svg"
    ],
    ["Restaurants and Bars", "RESTAURANTS",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/restaurants.svg"
    ],
    ["Hospital and Healthcare", "HOSPITAL_HEALTH_CARE",
      "https://www.risevision.com/hubfs/hospitality-2.svg?t=1502211789708"
    ],
    ["Libraries", "LIBRARIES",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/teamwork.svg"
    ],
    ["Financial Services", "FINANCIAL_SERVICES",
      "https://www.risevision.com/hubfs/Assets%20May%5B17%5D/finance.svg?t=1502211789708"
    ],
    ["Gyms and Fitness", "HEALTH_WELLNESS_AND_FITNESS",
      "https://www.risevision.com/hubfs/health-2.svg?t=1502211789708"
    ],
    ["Hotels and Hospitality", "HOSPITALITY"],
    ["Corporate Offices", "EXECUTIVE_OFFICE"],
    ["Manufacturing", "INDUSTRIAL_AUTOMATION"],
    ["Government", "GOVERNMENT_ADMINISTRATION"],
    ["Auto Dealerships", "AUTOMOTIVE",
      "https://cdn2.hubspot.net/hubfs/2700250/automobile-1.svg"
    ],
    ["Marketing and Advertising", "MARKETING_AND_ADVERTISING",
      "https://cdn2.hubspot.net/hubfs/2700250/Assets%20May%5B17%5D/telemarketer.svg"
    ],
    ["Technology and Integrator", "INFORMATION_TECHNOLOGY_AND_SERVICES"],
    ["Other", "OTHER"]
  ])
  .value("COMPANY_SIZE_FIELDS", [
    ["Solo", "1"],
    ["Fewer than 20 employees", "2"],
    ["21-50 employees", "21"],
    ["51-250 employees", "51"],
    ["More than 250 employees", "250"]
  ])
  .constant("USER_ICP_WRITABLE_FIELDS", [
    "mailSyncEnabled"
  ])
  .constant("COMPANY_ICP_WRITABLE_FIELDS", [
    "companyIndustry"
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

        company = pick(company, COMPANY_ICP_WRITABLE_FIELDS);
        user = pick(user, USER_ICP_WRITABLE_FIELDS);

        var companyPromise = updateCompany(companyId, company);
        var userPromise = updateUser(username, user);

        $q.all([companyPromise, userPromise]).then(function () {
          $log.debug("User & Company Profiles updated");
        });
      };

      var _checkIcpCollection = function () {
        var user = userState.getCopyOfProfile(true);
        var company = userState.getCopyOfUserCompany(true);

        if (!userState.isUserAdmin()) {
          return;
        }

        if (userState.isSubcompanySelected()) {
          return;
        }

        // Has industry been collected?
        if (company.companyIndustry) {
          return;
        }

        var modalInstance = $modal.open({
          templateUrl: "company-icp-modal.html",
          controller: "CompanyIcpModalCtrl",
          size: "md",
          backdrop: "static", //prevent from closing modal by clicking outside
          keyboard: false, //prevent from closing modal by pressing escape
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
        });

      };

      return factory;
    }
  ]);

"use strict";
angular.module("risevision.common.cookie", ["risevision.common.config"])
  .service("cookieTester", ["$q", "$document", "$http", "COOKIE_CHECK_URL",
    function ($q, $document, $http, COOKIE_CHECK_URL) {
      var svc = {};

      svc.checkCookies = function () {
        var deferred = $q.defer();
        $q.all([svc.checkLocalCookiePermission(), svc.checkThirdPartyCookiePermission()])
          .then(function () {
            deferred.resolve();
          }, function () {
            deferred.reject();
          });
        return deferred.promise;
      };

      svc.checkLocalCookiePermission = function () {
        $document[0].cookie = "rv-test-local-cookie=yes";
        if ($document[0].cookie.indexOf("rv-test-local-cookie") > -1) {
          return $q.when(true);
        }

        return $q.reject(false);
      };

      svc.checkThirdPartyCookiePermission = function () {
        var deferred = $q.defer();

        $http.get(COOKIE_CHECK_URL + "/createThirdPartyCookie", {
          withCredentials: true
        })
          .then(function () {
            return $http.get(COOKIE_CHECK_URL + "/checkThirdPartyCookie", {
              withCredentials: true
            });
          })
          .then(function (resp) {
            if (resp.data.check === "true") {
              deferred.resolve(true);
            } else {
              deferred.reject(false);
            }
          })
          .then(null, function () {
            // Resolve on API failures
            deferred.resolve(false);
          });

        return deferred.promise;
      };

      return svc;
    }
  ]);

"use strict";
/*global gadgets: false */

angular.module("risevision.store.data-gadgets", [])
  .service("gadgetsService", ["$q",
    function ($q) {

      this.closeIFrame = function () {
        var deferred = $q.defer();
        gadgets.rpc.call("", "rscmd_closeSettings", function () {
          deferred.resolve(true);
        });
        return deferred.promise;
      };

      this.sendProductCode = function (productCode) {
        var deferred = $q.defer();
        var data = {
          params: productCode
        };
        gadgets.rpc.call("", "rscmd_saveSettings", function () {
          deferred.resolve(true);
        }, data);
        return deferred.promise;
      };

    }
  ]);

angular.module("risevision.common.geodata", [])
  .value("REGIONS_CA", [
    ["Alberta", "AB"],
    ["British Columbia", "BC"],
    ["Manitoba", "MB"],
    ["New Brunswick", "NB"],
    ["Newfoundland and Labrador", "NL"],
    ["Northwest Territories", "NT"],
    ["Nova Scotia", "NS"],
    ["Nunavut", "NU"],
    ["Ontario", "ON"],
    ["Prince Edward Island", "PE"],
    ["Quebec", "QC"],
    ["Saskatchewan", "SK"],
    ["Yukon Territory", "YT"]
  ])

.value("REGIONS_US", [
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["District of Columbia", "DC"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"]
])

.value("TIMEZONES", [
  ["(GMT -12:00) International Dateline West", "-720"],
  ["(GMT -11:00) Midway Island, Samoa", "-660"],
  ["(GMT -10:00) Hawaii", "-600"],
  ["(GMT -09:00) Alaska", "-540"],
  ["(GMT -08:00) Pacific Time (US & Canada], Tijuana", "-480"],
  ["(GMT -07:00) Mountain Time (US & Canada)", "-420"],
  ["(GMT -06:00) Central Time (US & Canada)", "-360"],
  ["(GMT -05:00) Eastern Time (US & Canada)", "-300"],
  ["(GMT -04:00) Atlantic Time (Canada)", "-240"],
  ["(GMT -03:30) NewfoundLand Time (Canada)", "-210"],
  ["(GMT -03:00) Buenos Aires, Georgetown", "-180"],
  ["(GMT -02:00) Mid-Atlantic", "-120"],
  ["(GMT -01:00) Cape Verde Is.", "-60"],
  ["(GMT  00:00) Dublin, Edinburgh, Lisbon, London", "0"],
  ["(GMT +01:00) Amsterdam, Berlin, Bern, Rome, Paris, Stockholm, Vienna",
    "60"
  ],
  ["(GMT +02:00) Athens, Bucharest, Istanbul, Minsk", "120"],
  ["(GMT +03:00) Moscow, St. Petersburg, Volgograd", "180"],
  ["(GMT +03:30) Tehran", "210"],
  ["(GMT +04:00) Abu Dhabi, Muscat", "240"],
  ["(GMT +04:30) Kabul", "270"],
  ["(GMT +05:00) Islamabad, Karachi, Tashkent", "300"],
  ["(GMT +05:30) Calcutta, Chennai, Mumbai,New Delhi", "330"],
  ["(GMT +05:45) Kathmandu", "345"],
  ["(GMT +06:00) Astana,Almaty, Dhaka, Novosibirsk", "360"],
  ["(GMT +06:30) Rangoon (Yangon, Burma)", "390"],
  ["(GMT +07:00) Bangkok, Hanoi, Jakarta", "420"],
  ["(GMT +08:00) Beijing, Chongqing, Hong Kong, Urumqi", "480"],
  ["(GMT +09:00) Osaka, Sapporo, Tokyo", "540"],
  ["(GMT +09:30) Adelaide, Darwin", "570"],
  ["(GMT +10:00) Canberra, Melbourne, Sydney, Vladvostok", "600"],
  ["(GMT +11:00) Magadan, Solomon Is., New Caledonia", "660"],
  ["(GMT +12:00) Auckland, Fiji, Kamchatka, Marshall Is.", "720"],
  ["(GMT +13:00) Nuku'alofa", "780"],
]);

(function (angular) {
  "use strict";

  angular.module("risevision.common.registration", [
    "risevision.common.components.userstate",
    "risevision.core.userprofile", "risevision.common.gapi"
  ])

  .config(["uiStatusDependencies",
    function (uiStatusDependencies) {
      uiStatusDependencies.addDependencies({
        "registeredAsRiseVisionUser": "signedInWithGoogle",
        "registrationComplete": ["notLoggedIn",
          "registeredAsRiseVisionUser"
        ]
      });

      uiStatusDependencies.setMaximumRetryCount("signedInWithGoogle", 1);
    }
  ])

  .factory("signedInWithGoogle", ["$q", "userState",
    function ($q, userState) {
      return function () {
        var deferred = $q.defer();
        // userAuthFactory.authenticate(false).then().finally(function () {
        if (userState.isLoggedIn()) {
          deferred.resolve();
        } else {
          deferred.reject("signedInWithGoogle");
        }
        // });
        return deferred.promise;
      };
    }
  ])

  .factory("notLoggedIn", ["$q", "$log", "signedInWithGoogle",
    function ($q, $log, signedInWithGoogle) {
      return function () {
        var deferred = $q.defer();
        signedInWithGoogle().then(function () {
          deferred.reject("notLoggedIn");
        }, deferred.resolve);
        return deferred.promise;
      };
    }
  ])

  .factory("registeredAsRiseVisionUser", ["$q", "getUserProfile",
    "cookieStore", "$log", "userState",
    function ($q, getUserProfile, cookieStore, $log, userState) {
      return function () {
        var deferred = $q.defer();

        getUserProfile(userState.getUsername()).then(function (profile) {
          if (angular.isDefined(profile.email) &&
            angular.isDefined(profile.mailSyncEnabled)) {
            deferred.resolve(profile);
          } else if (cookieStore.get("surpressRegistration")) {
            deferred.resolve({});
          } else {
            deferred.reject("registeredAsRiseVisionUser");
          }
        }, function (err) {
          if (err && err.code === 403) {
            if (cookieStore.get("surpressRegistration")) {
              deferred.resolve({});
            } else {
              $log.debug("registeredAsRiseVisionUser rejected", err);
              deferred.reject("registeredAsRiseVisionUser");
            }
          } else {
            deferred.reject();
          }
        });

        return deferred.promise;
      };
    }
  ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.common.shoppingcart", ["risevision.common.gapi",
    "risevision.common.components.userstate"
  ])

  .factory("shoppingCart", ["storeAPILoader", "$log", "$q",
    "userState",
    function (storeAPILoader, $log, $q, userState) {
      var _items = [];
      var _cart = {
        "items": _items,
        "useBillToAddress": false,
        "shipToAttention": "",
        "couponCode": ""
      };

      var readFromStorage = function () {
        var deferred = $q.defer();
        if (userState.isLoggedIn()) {

          storeAPILoader().then(function (storeApi) {
            var obj = {
              "id": userState.getUsername()
            };
            var request = storeApi.cart.get(obj);
            request.execute(function (resp) {
              if (!resp.error) {
                clearItems();
                addItems(resp.items);
                _cart.useBillToAddress = resp.useBillToAddress;
                _cart.shipToAttention = resp.shipToAttention ? resp.shipToAttention :
                  "";
                _cart.couponCode = resp.couponCode;
                deferred.resolve();
              } else {
                $log.warn("Error loading cart items. Error: " + resp.error);
                deferred.resolve();
              }
            });
          });

        } else {
          clearItems();
          deferred.resolve();
        }
        return deferred.promise;
      };

      var persistToStorage = function () {
        var deferred = $q.defer();
        if (userState.isLoggedIn()) {
          storeAPILoader().then(function (storeApi) {
            //remove try/catch after API is implemented
            try {
              var obj = {
                "data": {
                  //"id": userState.getUsername(),
                  "jsonItems": getJsonItems(_items),
                  "shipToAttention": _cart.shipToAttention,
                  "useBillToAddress": _cart.useBillToAddress,
                  "couponCode": _cart.couponCode
                }
              };
              var request = storeApi.cart.put(obj);
              request.execute(function (resp) {
                if (!resp.error) {
                  deferred.resolve();
                } else {
                  $log.warn("Error persisting cart items. Error: " +
                    resp.error);
                  deferred.resolve();
                }
              });
            } catch (e) {
              deferred.resolve();
              console.error(
                "[persistToStorage] - Unimplemented API method " + e.message
              );
            }
          });
        }
        return deferred.promise;

      };

      var clearCart = function () {
        _cart.useBillToAddress = false;
        _cart.shipToAttention = "";
        _cart.couponCode = "";
        clearItems();
      };

      var clearItems = function () {
        while (_items.length > 0) {
          _items.pop();
        }
      };

      var addItems = function (items) {
        if (items) {
          for (var i = 0; i < items.length; i++) {
            _items.push(items[i]);
          }
        }
      };

      var cleanProducts = function (items) {
        var item;
        var res = [];
        for (var i = 0; i < items.length; i++) {
          item = {
            "productId": items[i].productId,
            "qty": items[i].qty,
            "accountingId": items[i].selected.accountingId,
            "licensedDisplays": items[i].licensedDisplays
          };
          res.push(item);
        }
        return res;
      };

      var getJsonItems = function (items) {
        var cleanedItems = cleanProducts(items);
        return JSON.stringify(cleanedItems);
      };

      var loadReady = null;
      var username = null;

      var cartManager = {
        get: function () {

          if (loadReady !== null && userState.checkUsername(username)) {
            return loadReady;
          }

          username = userState.getUsername();
          clearCart();

          loadReady = $q.defer();
          var deferred = loadReady;

          readFromStorage().then(function () {
            deferred.resolve(_cart);
          });

          return deferred;
        },
        clear: function () {
          clearItems();
          persistToStorage();
          $log.debug("Shopping cart cleared.");
        },
        getItems: function () {
          return _items;
        },
        setItems: function (items) {
          $log.debug("Setting cart items", items);
          //check if they are pointing to the same object
          if (items !== _items) {
            clearItems();
            addItems(items);
          }
          return persistToStorage();
        },
        getShipToAttention: function () {
          return _cart.shipToAttention;
        },
        getUseBillToAddress: function () {
          return _cart.useBillToAddress;
        },
        setAddressFields: function (shipToAttention, useBillToAddress) {
          _cart.shipToAttention = shipToAttention;
          _cart.useBillToAddress = useBillToAddress;
          return persistToStorage();
        },
        getCouponCode: function () {
          return _cart.couponCode;
        },
        setCouponCode: function (couponCode) {
          $log.debug("Setting coupon code", couponCode);
          //check if they are pointing to the same object
          _cart.couponCode = couponCode;
          return persistToStorage();
        },
        getItemCount: function () {
          if (_items !== null) {
            return _items.length;
          } else {
            return 0;
          }
        },
        removeItem: function (itemToRemove) {
          if (itemToRemove) {
            for (var i = 0; i < _items.length; i++) {
              if (_items[i].productId === itemToRemove.productId) {
                _items.splice(i, 1);
                break;
              }
            }
            persistToStorage();
          }
        },
        adjustItemQuantity: function (itemToAdjust, qty) {
          if (itemToAdjust && $.isNumeric(qty) && qty > 0) {
            persistToStorage();
          }
        },
        addItem: function (itemToAdd, qty, pricingIndex) {

          if (!userState.isRiseVisionUser()) {
            return;
          }
          var item = this.findItem(itemToAdd);

          if (item && (itemToAdd.paymentTerms === "Subscription" ||
            itemToAdd.paymentTerms === "Metered")) {
            return;
          }

          if (itemToAdd && $.isNumeric(qty) && itemToAdd.orderedPricing.length >
            pricingIndex) {
            if (item) {
              // qty for existing item is increased
              item.qty = parseInt(item.qty) + parseInt(qty);
            } else {
              // item is not already in the cart
              item = angular.copy(itemToAdd);
              item.qty = qty;
              _items.push(item);
            }
            item.selected = itemToAdd.orderedPricing[pricingIndex];
            persistToStorage();
          }
        },
        findItem: function (item) {
          //returns instance of the object from _items array

          if (item) {
            for (var i = 0; i < _items.length; i++) {
              if (item.productId === _items[i].productId) {
                return _items[i];
              }
            }
          }

          return null;
        },
        itemExists: function (item) {
          if (userState.isRiseVisionUser() && item && this.findItem(item) !==
            null) {
            return true;
          }
          return false;
        }
      };
      //cartManager.initialize();

      return cartManager;

    }
  ]);
})(angular);

(function () {
  "use strict";

  angular.module("risevision.store.services")
    .service("storeService", ["$q", "$log", "$http", "storeAPILoader",
      function ($q, $log, $http, storeAPILoader) {

        var _getResult = function (resp) {
          if (resp.result !== null && typeof resp.result === "object") {
            return resp.result;
          } else {
            return resp;
          }
        };

        var service = {
          validateAddress: function (addressObject) {
            var obj = {
              "street": addressObject.street,
              "unit": addressObject.unit,
              "city": addressObject.city,
              "country": addressObject.country,
              "postalCode": addressObject.postalCode,
              "province": addressObject.province,
            };

            return storeAPILoader()
              .then(function (storeApi) {
                return storeApi.company.validateAddress(obj);
              })
              .then(function (resp) {
                var result = _getResult(resp);
                $log.debug("validateAddress result: ", result);

                if (result.code !== -1) {
                  return $q.resolve(result);
                } else {
                  return $q.reject(result);
                }
              });
          },
          calculateTaxes: function (companyId, planId, addonId, addonQty,
            shippingAddress) {
            var deferred = $q.defer();
            var obj = {
              companyId: companyId,
              planId: planId,
              addonId: addonId,
              addonQty: addonQty,
              line1: shippingAddress.street,
              line2: shippingAddress.unit,
              city: shippingAddress.city,
              country: shippingAddress.country,
              state: shippingAddress.province,
              zip: shippingAddress.postalCode
            };

            storeAPILoader().then(function (storeApi) {
              return storeApi.tax.estimate(obj);
            })
              .then(function (resp) {
                if (resp.result && !resp.result.error && resp.result.result === true) {
                  $log.debug("tax estimate resp", resp);
                  deferred.resolve(resp.result);
                } else {
                  console.error("Failed to get tax estimate.", resp.result);

                  deferred.reject(resp.result);
                }
              })
              .then(null, function (resp) {
                console.error("Failed to get tax estimate.", resp);

                deferred.reject(resp && resp.result && resp.result.error);
              });
            return deferred.promise;
          },
          purchase: function (jsonData) {
            var deferred = $q.defer();
            storeAPILoader().then(function (storeAPI) {
              var obj = {
                jsonData: jsonData
              };
              return storeAPI.purchase.put2(obj);
            })
              .then(function (resp) {
                if (resp && resp.result && !resp.result.error) {
                  $log.debug("purchase resp", resp);
                  deferred.resolve(resp.result);
                } else {
                  deferred.reject(resp && resp.result && resp.result.error);
                }
              })
              .then(null, function (resp) {
                console.error("Failed to get Purchase.", resp);

                deferred.reject(resp && resp.result && resp.result.error);
              });
            return deferred.promise;
          },
          createSession: function (companyId) {
            var deferred = $q.defer();

            var obj = {
              "companyId": companyId
            };

            storeAPILoader().then(function (storeApi) {
              return storeApi.customer_portal.createSession(obj);
            })
              .then(function (resp) {
                $log.debug("customer_portal.createSession resp", resp);
                deferred.resolve(JSON.parse(resp.result.result));
              })
              .then(null, function (e) {
                console.error("Failed to create Customer Portal Session.", e);
                deferred.reject(e);
              });
            return deferred.promise;
          },
          addTaxExemption: function (taxExemption, blobKey) {
            var deferred = $q.defer();
            // var expiryDateString = $filter("date")(taxExemption.expiryDate, "yyyy-MM-dd");

            storeAPILoader().then(function (storeAPI) {
              var obj = {
                // "country": taxExemption.country,
                // "state": taxExemption.province,
                "blobKey": blobKey,
                "number": taxExemption.number,
                // "expiryDate": expiryDateString
              };
              var request = storeAPI.taxExemption.add(obj);
              request.execute(function (resp) {
                if (resp.error) {
                  $log.error("Error adding tax exemption: ", resp.message);
                  deferred.reject(resp.error);
                } else {
                  deferred.resolve(resp);
                }
              });
            });
            return deferred.promise;
          },
          uploadTaxExemptionCertificate: function (file) {
            var deferred = $q.defer();

            var formData = new FormData();

            formData.append("file", file);

            storeAPILoader().then(function (storeAPI) {
              var request = storeAPI.taxExemption.getUploadUrl();
              request.execute(function (resp) {
                if (resp.error) {
                  $log.error("Error getting upload url: ", resp.message);
                  deferred.reject(resp.error);
                } else {
                  $http.post(resp.result.result, formData, {
                    withCredentials: true,
                    headers: {
                      "Content-Type": undefined
                    },
                    transformRequest: angular.identity
                  })
                    .then(function (response) {
                        deferred.resolve(response.data);
                      },
                      function (error) {
                        $log.error("Error uploading file: ", error);
                        deferred.reject(error);
                      });
                }
              });
            });
            return deferred.promise;
          }
        };

        return service;
      }
    ]);
})();

(function (angular) {

  "use strict";

  angular.module("risevision.common.systemmessages", [])

  .factory("systemMessages", ["$log", "$q",
    function ($log, $q) {

      var messages = [];
      var _retrievers = [];

      function pushMessage(m, list) {
        //TODO add more sophisticated, sorting-based logic here
        $log.debug("pushing message", m);
        list.push(m);
      }

      messages.addMessages = function (newMessages) {
        if (newMessages && newMessages instanceof Array) {
          newMessages = (function filterNewMessages(items) {
            var _newItems = [];

            var currentTime = new Date();

            angular.forEach(items, function (msg) {
              var endTime = new Date(msg.endDate || "2199-12-31");
              var startTime = new Date(msg.startDate || 0);
              endTime.setDate(endTime.getDate() + 1);
              if (currentTime > startTime && currentTime < endTime) {
                _newItems.push(msg);
              }
            });
            return _newItems;
          })(newMessages);
          newMessages.forEach(function (m) {
            //temporary logic to avoid duplicate messages
            var duplicate = false;
            messages.forEach(function (um) {
              if (um.text === m.text) {
                duplicate = true;
              }
            });
            if (!duplicate) {
              pushMessage(m, messages);
            }
          });

          messages.sort(function (a, b) {
            if (!a.startDate || a.startDate > b.startDate) {
              return 1;
            } else if (a.startDate && a.startDate === b.startDate) {
              return 0;
            } else {
              return -1;
            }
          }).reverse();
        }
      };

      messages.clear = function () {
        messages.length = 0;
        $log.debug("System message cleared.");
      };

      messages.registerRetriever = function (func) {
        //the retriever must return a promise that resolves to an array
        // of messages
        _retrievers.push(func);
      };

      messages.resetAndGetMessages = function () {
        messages.clear();
        var promises = _retrievers.map(function (func) {
          return func.call();
        });
        return $q.all(promises).then(function (messageArrays) {
          messageArrays.forEach(messages.addMessages);
        });
      };

      return messages;

    }
  ]);

})(angular);

/* jshint maxlen: false */

(function (angular) {
  "use strict";

  angular.module("risevision.common.support", ["risevision.common.components.subscription-status"])
  /* jshint quotmark: single */
  .value('ZENDESK_WEB_WIDGET_SCRIPT',
    'window.zE||(function(e,t,s){var n=window.zE=window.zEmbed=function(){n._.push(arguments)},a=n.s=e.createElement(t),r=e.getElementsByTagName(t)[0];n.set=function(e){n.set._.push(e)},n._=[],n.set._=[],a.async=true,a.setAttribute("charset","utf-8"),a.src="https://static.zdassets.com/ekr/asset_composer.js?key="+s,n.t=+new Date,a.type="text/javascript",r.parentNode.insertBefore(a,r)})(document,"script","b8d6bdba-10ea-4b88-b96c-9d3905b85d8f");'
  )
  /* jshint quotmark: double */
  .factory("zendesk", ["getSupportSubscriptionStatus", "segmentAnalytics",
    "userState", "$window", "$q", "$location", "ZENDESK_WEB_WIDGET_SCRIPT",
    function (getSupportSubscriptionStatus, segmentAnalytics, userState,
      $window, $q, $location, ZENDESK_WEB_WIDGET_SCRIPT) {

      var loaded = false;
      var previousUsername = "";
      var $ = $window.$;

      function ensureScript() {
        if (!loaded) {
          $window.zESettings = {
            webWidget: {
              helpCenter: {
                title: {
                  "*": "Help"
                },
                searchPlaceholder: {
                  "*": "How can we help?"
                },
                messageButton: {
                  "*": "Open a Support Ticket"
                }
              },

              chat: {
                suppress: true
              },

              contactForm: {
                title: {
                  "*": "Open a Support Ticket"
                }
              }
            }
          };

          var scriptElem = $window.document.createElement("script");
          scriptElem.innerText = ZENDESK_WEB_WIDGET_SCRIPT;

          $window.document.body.appendChild(scriptElem);
          loaded = true;

          hideWidget();
        }
        return $q.when();
      }

      function _identify() {
        var deferred = $q.defer();

        $window.zE(function () {

          var username = userState.getUsername();
          var properties = {
            email: userState.getUserEmail(),
            "rise_vision_company_id": userState.getUserCompanyId(),
          };

          getSupportSubscriptionStatus()
            .then(function (subscriptionStatus) {
              if (subscriptionStatus && subscriptionStatus.statusCode === "subscribed") {
                // append priority support flag
                $location.search("cHJpb3JpdHktc3VwcG9ydA", 1);
              } else {
                // clear priority support flag
                $location.search("cHJpb3JpdHktc3VwcG9ydA", null);
              }
              segmentAnalytics.identify(username, properties);
              deferred.resolve();
            })
            .catch(function (err) {
              console.log("Error getting subscription status", err);
              deferred.reject();
            });

        });
        return deferred.promise;
      }

      function initializeWidget() {
        return ensureScript()
          .then(_identify)
          .then(_completeInitialization);
      }

      function _completeInitialization() {
        var username = userState.getUsername();

        if (previousUsername !== username) {
          var identity = {
            email: username,
            name: userState.getUserFullName()
          };

          if (username) {
            $window.zE(function () {
              $window.zE.identify(identity);
            });
          }

          previousUsername = username;
        }

        _changeBorderStyle();
      }

      function _changeBorderStyle() {
        $("iframe[class^=zEWidget]").contents().find(".Container")
          .css("border", "1px solid #4ab767");
      }

      function logout() {
        previousUsername = "";
      }

      function enableSuggestions() {
        if ($window.zE) {
          $window.zE(function () {
            $window.zE.setHelpCenterSuggestions({
              url: true
            });
          });
        }
      }

      function displayButton() {
        if ($window.zE) {
          $window.zE(function () {
            $window.zE.show();
          });
        }
      }

      function hideWidget() {
        if ($window.zE) {
          $window.zE(function () {
            $window.zE.hide();
          });
        }
      }

      function activateWidget() {
        if ($window.zE) {
          $window.zE(function () {
            $window.zE.activate();
          });
        }
      }

      return {
        initializeWidget: initializeWidget,
        displayButton: displayButton,
        hideWidget: hideWidget,
        activateWidget: activateWidget,
        enableSuggestions: enableSuggestions,
        logout: logout
      };

    }
  ])
    .factory("getSupportSubscriptionStatus", ["SUPPORT_PRODUCT_CODE", "userState", "$q",
      "subscriptionStatusService", "$log",
      function (SUPPORT_PRODUCT_CODE, userState, $q, subscriptionStatusService,
        $log) {
        return function getSupportSubscriptionStatus() {
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
    ])
    .run(["$rootScope", "$window", "userState", "userAuthFactory", "zendesk", "ZENDESK_WEB_WIDGET_SCRIPT",
      function ($rootScope, $window, userState, userAuthFactory, zendesk, ZENDESK_WEB_WIDGET_SCRIPT) {
        var widgetVisible = false;

        if (ZENDESK_WEB_WIDGET_SCRIPT) {
          zendesk.initializeWidget();

          userAuthFactory.authenticate()
            .then(function () {
              if (!userState.isLoggedIn()) {
                _showWebWidget();
              }
            })
            .catch(function () {
              _showWebWidget();
            });

          $rootScope.$on("risevision.user.authorized", function () {
            zendesk.initializeWidget(); // Needed to authenticate the user
            _hideWebWidget();
          });

          $rootScope.$on("risevision.user.signedOut", function () {
            _showWebWidget();
          });

          $rootScope.$on("$stateChangeStart", function () {
            zendesk.enableSuggestions();
          });
        }

        function _hideWebWidget() {
          if (widgetVisible) {
            zendesk.hideWidget();
            widgetVisible = false;
          }
        }

        function _showWebWidget() {
          setTimeout(function () {
            zendesk.logout();
            zendesk.displayButton();
            widgetVisible = true;
          }, 2000);
        }
      }
    ]);
})(angular);

"use strict";
/* global angular */

try {
  angular.module("risevision.common.i18n.config");
} catch (err) {
  angular.module("risevision.common.i18n.config", []);
}

/**
 * Reimplementation of $translateStaticFilesLoader to handle missing files and locale hierarchy (en/en_US)
 */
angular.module("pascalprecht.translate")
  .factory("$translateStaticFilesLoader", ["$q", "$http",
    function ($q, $http) {
      function loadTranslationFile(options, deferred) {
        $http(angular.extend({
          url: [
            options.prefix,
            options.key.toLowerCase(),
            options.suffix
          ].join(""),
          method: "GET",
          params: ""
        }, options.$http)).then(function (response) {
          deferred.resolve(response.data);
        }, function () {
          if (options.key.indexOf("_") >= 0) {
            var key = options.key.substr(0, options.key.lastIndexOf("_"));
            var opts = angular.extend({}, options, {
              key: key
            });

            loadTranslationFile(opts, deferred);
          } else {
            deferred.resolve("{}");
          }

        });
      }

      return function (options) {
        if (!options || (!angular.isString(options.prefix) ||
          !angular.isString(options.suffix))) {
          throw new Error(
            "Couldn\"t load static files, no prefix or suffix specified!");
        }

        var deferred = $q.defer();

        loadTranslationFile(options, deferred);

        return deferred.promise;
      };
    }
  ]);

angular.module("risevision.common.i18n", [
  "pascalprecht.translate",
  "risevision.common.i18n.config"
])
  .config(["$translateProvider", "LOCALES_PREFIX", "LOCALES_SUFIX",
    function ($translateProvider, LOCALES_PREFIX, LOCALES_SUFIX) {
      // Tries to determine the browsers locale
      $translateProvider.useStaticFilesLoader({
        prefix: LOCALES_PREFIX,
        suffix: LOCALES_SUFIX
      });

      $translateProvider
        .determinePreferredLanguage()
        .fallbackLanguage("en")
        .useSanitizeValueStrategy(null);
    }
  ]);

/*jshint camelcase: false */

"use strict";

/* jshint ignore:start */
var gapiLoadingStatus = null;
var handleClientJSLoad = function () {
  gapiLoadingStatus = "loaded";
  console.debug("ClientJS is loaded.");
  //Ready: create a generic event
  var evt = document.createEvent("Events");
  //Aim: initialize it to be the event we want
  evt.initEvent("gapi.loaded", true, true);
  //FIRE!
  window.dispatchEvent(evt);
};
/* jshint ignore:end */

angular.module("risevision.common.gapi", [
  "risevision.common.components.util"
])
  .value("CLIENT_ID", "614513768474.apps.googleusercontent.com")
  .value("OAUTH2_SCOPES", "profile")

.factory("gapiLoader", ["$q", "$window",
  function ($q, $window) {
    var deferred = $q.defer();

    return function () {
      var gapiLoaded;

      if ($window.gapiLoadingStatus === "loaded") {
        deferred.resolve($window.gapi);
      } else if (!$window.gapiLoadingStatus) {
        $window.gapiLoadingStatus = "loading";

        var src = $window.gapiSrc ||
          "//apis.google.com/js/client.js?onload=handleClientJSLoad";
        var fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", src);
        if (typeof fileref !== "undefined") {
          document.getElementsByTagName("body")[0].appendChild(fileref);
        }

        gapiLoaded = function () {
          deferred.resolve($window.gapi);
          $window.removeEventListener("gapi.loaded", gapiLoaded, false);
        };
        $window.addEventListener("gapi.loaded", gapiLoaded, false);
      }
      return deferred.promise;
    };
  }
])

.factory("auth2APILoader", ["$q", "$log", "$location", "$window", "gapiLoader",
  "getBaseDomain", "CLIENT_ID", "OAUTH2_SCOPES",
  function ($q, $log, $location, $window, gapiLoader, getBaseDomain,
    CLIENT_ID, OAUTH2_SCOPES) {
    return function () {
      var deferred = $q.defer();
      gapiLoader().then(function (gApi) {
        if (gApi.auth2 && gApi.auth2.getAuthInstance()) {
          //already loaded. return right away
          deferred.resolve(gApi.auth2);
        } else {
          gApi.load("auth2", function () {
            if (gApi.auth2) {
              gApi.auth2.init({
                client_id: CLIENT_ID,
                scope: OAUTH2_SCOPES,
                cookie_policy: $location.protocol() + "://" + getBaseDomain() +
                  ($window.location.port ? ":" + $window.location.port : "")
              }).then(function () {
                $log.debug("auth2 API Loaded");

                deferred.resolve(gApi.auth2);
              }, function () {
                var errMsg = "auth2 GoogleAuth Init Failed";
                $log.error(errMsg);
                deferred.reject(errMsg);
              });
            } else {
              var errMsg = "auth2 API Load Failed";
              $log.error(errMsg);
              deferred.reject(errMsg);
            }
          });
        }
      });
      return deferred.promise;
    };
  }
])

.factory("clientAPILoader", ["$q", "$log", "gapiLoader",
  function ($q, $log, gapiLoader) {
    return function () {
      var deferred = $q.defer();
      gapiLoader().then(function (gApi) {
        if (gApi.client) {
          //already loaded. return right away
          deferred.resolve(gApi);
        } else {
          gApi.load("client", function () {
            if (gApi.client) {
              $log.debug("client API Loaded");

              deferred.resolve(gApi);
            } else {
              var errMsg = "client API Load Failed";
              $log.error(errMsg);
              deferred.reject(errMsg);
            }
          });
        }
      });
      return deferred.promise;
    };
  }
])

//abstract method for creading a loader factory service that loads any
//custom Google Client API library

.factory("gapiClientLoaderGenerator", ["$q", "$log", "$timeout", "$http", "clientAPILoader",
  function ($q, $log, $timeout, $http, clientAPILoader) {
    return function (libName, libVer, baseUrl) {
      var gapiAccessValidated = false;

      return function () {
        var deferred = $q.defer();
        clientAPILoader().then(function (gApi) {
          var apiValidationTimer;

          if (gApi.client[libName]) {
            // already loaded. return right away
            gapiAccessValidated = true;
            deferred.resolve(gApi.client[libName]);
          } else {
            gApi.client.load(libName, libVer,
              function () {
                gapiAccessValidated = true;

                if (apiValidationTimer) {
                  $timeout.cancel(apiValidationTimer);
                }

                if (gApi.client[libName]) {
                  $log.debug(libName + "." + libVer + " Loaded");
                  deferred.resolve(gApi.client[libName]);
                } else {
                  var errMsg = libName + "." + libVer + " Load Failed";
                  $log.error(errMsg);
                  deferred.reject(errMsg);
                }
              },
              baseUrl);

            if (!gapiAccessValidated) {
              apiValidationTimer = $timeout(function () {
                gapiAccessValidated = true;

                if (baseUrl && !gApi.client[libName]) {
                  $http({
                    url: baseUrl,
                    method: "GET",
                  }).catch(function (e) {
                    // Expect 404 for success (allow for other valid HTTP responses)
                    if (e && e.status !== 404 && (e.status < 200 || e.status >= 400)) {
                      var errorString = libName + " (" + baseUrl + ") failed to respond";
                      $log.error(errorString, e);

                      // Throw consistent error object
                      deferred.reject({
                        status: -1,
                        result: {
                          error: {
                            code: -1,
                            message: errorString,
                            error: e
                          }
                        }
                      });
                    }
                  });
                }
              }, 10 * 1000);
            }
          }
        });
        return deferred.promise;
      };
    };
  }
])

.factory("oauth2APILoader", ["gapiClientLoaderGenerator",
  function (gapiClientLoaderGenerator) {
    return gapiClientLoaderGenerator("oauth2", "v2");
  }
])

.factory("coreAPILoader", ["CORE_URL", "gapiClientLoaderGenerator",
  "$location",
  function (CORE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : CORE_URL;
    return gapiClientLoaderGenerator("core", "v1", baseUrl);
  }
])

.factory("riseAPILoader", ["CORE_URL", "gapiClientLoaderGenerator",
  "$location",
  function (CORE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : CORE_URL;
    return gapiClientLoaderGenerator("rise", "v0", baseUrl);
  }
])

.factory("storeAPILoader", ["STORE_ENDPOINT_URL", "gapiClientLoaderGenerator",
  "$location",
  function (STORE_ENDPOINT_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().store_api_base_url ?
      $location.search().store_api_base_url + "/_ah/api" : STORE_ENDPOINT_URL;
    return gapiClientLoaderGenerator("store", "v0.01", baseUrl);
  }
])

.factory("storageAPILoader", ["STORAGE_ENDPOINT_URL",
  "gapiClientLoaderGenerator", "$location",
  function (STORAGE_ENDPOINT_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().storage_api_base_url ?
      $location.search().storage_api_base_url + "/_ah/api" : STORAGE_ENDPOINT_URL;
    return gapiClientLoaderGenerator("storage", "v0.02", baseUrl);
  }
])

.factory("discoveryAPILoader", ["CORE_URL", "gapiClientLoaderGenerator",
  "$location",
  function (CORE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : CORE_URL;
    return gapiClientLoaderGenerator("discovery", "v1", baseUrl);
  }
])

.factory("monitoringAPILoader", ["MONITORING_SERVICE_URL",
  "gapiClientLoaderGenerator", "$location",
  function (MONITORING_SERVICE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ?
      $location.search().core_api_base_url + "/_ah/api" : MONITORING_SERVICE_URL;
    return gapiClientLoaderGenerator("monitoring", "v0", baseUrl);
  }
]);

(function (angular) {
  "use strict";
  angular.module("risevision.common.components.util", [])

  .value("humanReadableError", function (resp) {
    var message;
    if (resp.message) {
      message = resp.message;
    } else if (resp.error) {
      if (resp.error.message) {
        message = resp.error.message;
      } else {
        message = resp.error;
      }
    } else {
      message = resp;
    }
    return JSON.stringify(message);
  })

  .factory("dateIsInRange", [

    function () {
      /**
       * check if date is in range
       * @param {Date} date
       * @param {String} strStartDate
       * @param {String} strEndDate
       */
      return function (date, strStartDate, strEndDate) {
        // strStartDate, strEndDate can either be empty string or date in ISO 8601 format "2014-05-14T00:00:00.000Z"
        // empty means no there is no specific start or/and end date is set

        // When parsing time, we don't want to convert Universal time to the current TimeZone
        // example new Date(Date.parse("2014-05-14T00:00:00.000")); returns "Tue May 13 2014 20:00:00 GMT-0400 (EDT)"
        // what we want is to pretend that date already comes adjusted to the current TimeZone
        // example "2014-05-14T00:00:00.000" show be converted to "Tue May 14 2014 00:00:00 GMT-0400 (EDT)"

        var res = true;
        var re, dt;

        try {
          if (strStartDate) {
            re = strStartDate.match(/(\d{4})\-(\d{2})\-(\d{2})/);
            dt = new Date(re[1], parseInt(re[2]) - 1, re[3], 0, 0, 0, 0);
            res = (date >= dt);
          }

          if (res && strEndDate) {
            re = strEndDate.match(/(\d{4})\-(\d{2})\-(\d{2})/);
            dt = new Date(re[1], parseInt(re[2]) - 1, re[3], 0, 0, 0, 0);
            res = (date <= dt);
          }

        } catch (e) {
          res = false;
        }

        return res;

      };

    }
  ])

  .factory("objectHelper", [

    function () {
      var factory = {};

      factory.follow = function (source) {
        var Follower = function () {};
        Follower.prototype = source;
        return new Follower();
      };

      factory.clearObj = function (obj) {
        for (var member in obj) {
          delete obj[member];
        }
      };

      factory.clearAndCopy = function (src, dest) {
        factory.clearObj(dest);
        angular.extend(dest, src);
      };

      return factory;
    }
  ])

  .factory("getBaseDomain", ["$log", "$location",
    function ($log, $location) {
      var _looksLikeIp = function (addr) {
        if (/^([0-9])+\.([0-9])+\.([0-9])+\.([0-9])+$/.test(addr)) {
          return (true);
        }
        return (false);
      };

      return function () {
        var result;
        if (!result) {
          var hostname = $location.host();

          if (_looksLikeIp(hostname)) {
            result = hostname;
          } else {
            var parts = hostname.split(".");
            if (parts.length > 1) {
              // Somehow, cookies don't persist if we set the domain to appspot.com. 
              // It requires a sub-domain to be set, ie. rva-test.appspot.com.
              if (parts[parts.length - 2] === "appspot") {
                result = parts.slice(parts.length - 3).join(".");
              } else {
                result = parts.slice(parts.length - 2).join(".");
              }
            } else {
              //localhost
              result = hostname;
            }
          }

          $log.debug("baseDomain", result);
        }
        return result;
      };

    }
  ]);

})(angular);

/**
 * Created by rodrigopavezi on 10/16/14.
 */
"use strict";

angular.module("risevision.common.apis", [
  "risevision.common.gapi"
])
  .factory("listApis", ["$q", "discoveryAPILoader", "$log",
    function ($q, discoveryAPILoader, $log) {
      return function (name, preferred) {
        $log.debug("listApis called", name, preferred);

        var deferred = $q.defer();

        discoveryAPILoader().then(function (discoveryAPI) {
          var criteria = {};
          if (name) {
            criteria.name = name;
          }
          if (preferred) {
            criteria.preferred = preferred;
          }

          var request = discoveryAPI.apis.list(criteria);
          request.execute(function (resp) {
            $log.debug("listApis resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });

        });
        return deferred.promise;
      };
    }
  ])
  .factory("getRest", ["$q", "discoveryAPILoader", "$log",
    function ($q, discoveryAPILoader, $log) {
      return function (api, version) {
        $log.debug("getRest called", api, version);

        var deferred = $q.defer();
        discoveryAPILoader().then(function (discoveryAPI) {
          var criteria = {};
          if (api) {
            criteria.api = api;
          }
          if (version) {
            criteria.version = version;
          }
          var request = discoveryAPI.apis.getRest(criteria);
          request.execute(function (resp) {
            $log.debug("getRest resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);

/**
 * Created by rodrigopavezi on 10/16/14.
 */
"use strict";

angular.module("risevision.common.app", [
  "risevision.common.gapi",
  "risevision.core.util"

])
  .constant("APP_WRITABLE_FIELDS", [
    "name", "description", "clientId", "url"
  ])
  .factory("listApps", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function (companyId) {
        $log.debug("listApps called", companyId);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var criteria = {};
          if (companyId) {
            criteria.companyId = companyId;
          }

          var request = riseApi.app.list(criteria);
          request.execute(function (resp) {
            $log.debug("listApps resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });

        });
        return deferred.promise;
      };
    }
  ])
  .factory("getApp", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function (id) {
        $log.debug("getApp called", id);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }

          var request = riseApi.app.get(criteria);
          request.execute(function (resp) {
            $log.debug("getApp resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])
  .factory("createApp", ["$q", "riseAPILoader", "$log", "pick",
    "APP_WRITABLE_FIELDS",
    function ($q, riseAPILoader, $log, pick, APP_WRITABLE_FIELDS) {
      return function (companyId, userId, app) {
        $log.debug("createApp called", companyId, userId, app);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var fields = pick.apply(this, [app].concat(APP_WRITABLE_FIELDS));
          var request = riseApi.app.add({
            companyId: companyId,
            userId: userId,
            data: JSON.stringify(fields)
          });

          request.execute(function (resp) {
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          }, deferred.reject);
        });
        return deferred.promise;
      };
    }
  ])
  .factory("updateApp", ["$q", "riseAPILoader", "$log", "pick",
    "APP_WRITABLE_FIELDS",
    function ($q, riseAPILoader, $log, pick, APP_WRITABLE_FIELDS) {
      return function (id, app) {
        $log.debug("updateApp called", id, app);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var fields = pick.apply(this, [app].concat(APP_WRITABLE_FIELDS));
          var request = riseApi.app.update({
            id: id,
            data: JSON.stringify(fields)
          });

          request.execute(function (resp) {
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          }, deferred.reject);
        });
        return deferred.promise;
      };
    }
  ])
  .factory("deleteApp", ["$q", "riseAPILoader", "$log",
    function ($q, riseAPILoader, $log) {
      return function (id) {
        $log.debug("deleteApp called", id);

        var deferred = $q.defer();
        riseAPILoader().then(function (riseApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }
          var request = riseApi.app.delete(criteria);
          request.execute(function (resp) {
            $log.debug("deleteApp resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);

(function (angular) {
  "use strict";

  angular.module("risevision.core.cache", [])

  .factory("userInfoCache", ["$cacheFactory",
    function ($cacheFactory) {
      return $cacheFactory("user-info-cache");
    }
  ]);

})(angular);

/* jshint evil:true */
/* jshint unused:false */

/**
 * Created by rodrigopavezi on 10/16/14.
 */
"use strict";
angular.module("risevision.common.core.endpoint", [
  "risevision.common.gapi"
])
  .factory("callEndpoint", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (method, criteria) {
        $log.debug("Endpoint called", method, criteria);

        var deferred = $q.defer();
        coreAPILoader().then(function (core) {
          // Note: This assumes method contains 'core.'
          var request = eval(method)(criteria);
          request.execute(function (resp) {
            $log.debug("Endpoint resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);

(function (angular) {
  "use strict";

  angular.module("risevision.core.company", [
    "risevision.common.gapi",
    "risevision.core.cache",
    "risevision.core.util"
  ])

  .constant("COMPANY_WRITABLE_FIELDS", [
    "name", "street", "unit", "city", "province", "country",
    "postalCode", "timeZoneOffset", "telephone", "fax", "companyStatus",
    "mailSyncEnabled", "sellerId", "isTest", "shipToUseCompanyAddress",
    "shipToName", "shipToStreet", "shipToUnit", "shipToCity",
    "shipToProvince", "shipToPostalCode", "shipToCountry", "website",
    "companySize", "companyIndustry", "billingContactEmails", "shareCompanyPlan"
  ])

  .constant("ALERTS_WRITABLE_FIELDS", [
    "alertSettings"
  ])

  .constant("COMPANY_SEARCH_FIELDS", [
    "name", "id", "street", "unit", "city", "province", "country",
    "postalCode", "telephone", "fax",
    "shipToName", "shipToStreet", "shipToCity", "shipToPostalCode"
  ])

  // New service format:
  .factory("company", ["$q", "$log", "coreAPILoader", "pick",
    "ALERTS_WRITABLE_FIELDS",
    function ($q, $log, coreAPILoader, pick, ALERTS_WRITABLE_FIELDS) {
      var service = {
        updateAlerts: function (companyId, company) {
          var deferred = $q.defer();
          var fields = pick.apply(this, [company].concat(
            ALERTS_WRITABLE_FIELDS));
          var obj = {
            "id": companyId,
            "data": fields
          };
          $log.debug("updateAlerts called", companyId, fields);

          coreAPILoader().then(function (coreApi) {
            return coreApi.company.patch(obj);
          })
            .then(function (resp) {
              $log.debug("update Alerts resp", resp);
              deferred.resolve(resp.result);
            })
            .then(null, function (e) {
              $log.error("Failed to update Alerts.", e);
              deferred.reject(e);
            });

          return deferred.promise;
        }
      };

      return service;
    }
  ])

  // Old services:
  .factory("createCompany", ["$q", "coreAPILoader", "COMPANY_WRITABLE_FIELDS",
    "pick",
    function ($q, coreAPILoader, COMPANY_WRITABLE_FIELDS, pick) {
      return function (parentCompanyId, company) {
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var fields = pick.apply(this, [company].concat(
            COMPANY_WRITABLE_FIELDS));
          var request = coreApi.company.add({
            parentId: parentCompanyId,
            data: fields
          });
          request.execute(function (resp) {
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          }, deferred.reject);
        });
        return deferred.promise;
      };
    }
  ])

  .factory("getCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (id) { //get a company either by id or authKey
        $log.debug("getCompany called", id);

        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }
          var request = coreApi.company.get(criteria);
          request.execute(function (resp) {
            $log.debug("getCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("lookupCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (authKey) { //get a company either by id or authKey
        $log.debug("lookupCompany called", authKey);

        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.lookup({
            authKey: authKey
          });
          request.execute(function (resp) {
            $log.debug("lookupCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("moveCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (authKey, newParentId) { //get a company either by id or authKey
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.move({
            authKey: authKey,
            newParentId: newParentId
          });
          request.execute(function (resp) {
            $log.debug("moveCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("updateCompany", ["$q", "$log", "coreAPILoader", "pick",
    "COMPANY_WRITABLE_FIELDS",
    function ($q, $log, coreAPILoader, pick, COMPANY_WRITABLE_FIELDS) {
      return function (companyId, fields) {
        var deferred = $q.defer();
        fields = pick.apply(this, [fields].concat(COMPANY_WRITABLE_FIELDS));
        $log.debug("updateCompany called", companyId, fields);
        // fields.validate = validationRequired || false;
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.patch({
            id: companyId,
            data: fields
          });
          request.execute(function (resp) {
            $log.debug("updateCompany resp", resp);
            if (resp.result && resp.result.item) {
              deferred.resolve(resp.result.item);
            } else {
              deferred.reject(resp);
            }
          });
        });

        return deferred.promise;
      };
    }
  ])

  .factory("regenerateCompanyField", ["$q", "$log", "coreAPILoader",
    function ($q, $log, coreAPILoader) {
      return function (companyId, fieldName) {
        var deferred = $q.defer();
        $log.debug("regenerateField called", companyId, fieldName);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.regenerateField({
            "id": companyId,
            "fieldName": fieldName
          });
          request.execute(
            function (resp) {
              $log.debug("regenerateField resp", resp);
              if (!resp.error) {
                deferred.resolve(resp);
              } else {
                deferred.reject(resp.message);
              }
            },
            function (resp) {
              deferred.reject("call failed " + resp);
            }
          );
        });

        return deferred.promise;
      };
    }
  ])

  .factory("deleteCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (id) { //get a company either by id or authKey
        $log.debug("deleteCompany called", id);

        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var criteria = {};
          if (id) {
            criteria.id = id;
          }
          var request = coreApi.company.delete(criteria);
          request.execute(function (resp) {
            $log.debug("deleteCompany resp", resp);
            if (resp.result) {
              deferred.resolve(resp.item);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .service("companyService", ["coreAPILoader", "$q", "$log", "getCompany",
    "COMPANY_SEARCH_FIELDS",
    function (coreAPILoader, $q, $log, getCompany, COMPANY_SEARCH_FIELDS) {

      var createSearchQuery = function (fields, search) {
        var query = "";

        for (var i = 0; i < fields.length; i++) {
          query += "OR " + fields[i] + ":~\'" + search + "\' ";
        }

        query = query ? query.substring(3) : "";

        return query.trim();
      };

      this.getCompanies = function (search, cursor) {
        var deferred = $q.defer();

        var query = search.query ? createSearchQuery(COMPANY_SEARCH_FIELDS,
          search.query) : "";

        var obj = {
          "companyId": search.companyId,
          "search": query,
          "cursor": cursor,
          "count": search.count,
          "sort": search.sortBy + (search.reverse ? " desc" : " asc")
        };

        $log.debug("getCompanies called with", obj);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.list(obj);
          request.execute(function (resp) {
            $log.debug("getCompanies resp", resp);
            deferred.resolve(resp);
          });
        });
        return deferred.promise;
      };

      this.loadSelectedCompany = function (selectedCompanyId, userCompany) {
        //this funtion assumes user and user.company are loaded
        var deferred = $q.defer();
        if (selectedCompanyId && selectedCompanyId !== userCompany.id) {
          getCompany(selectedCompanyId).then(function (res) {
            if (res.code === 0 && res.item) {
              deferred.resolve(res.item);
            } else {
              deferred.resolve(userCompany);
            }
          });
        } else {
          deferred.resolve(userCompany);
        }
        return deferred.promise;
      };

    }
  ])

  .factory("enableCompanyProduct", ["$q", "$log", "coreAPILoader",
    function ($q, $log, coreAPILoader) {
      return function (companyId, productCode, displayStatusMap) {
        var deferred = $q.defer();

        $log.debug("enableCompanyProduct called", companyId, productCode, displayStatusMap);

        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.enableProduct({
            id: companyId,
            productCode: productCode,
            data: displayStatusMap
          });
          request.execute(function (resp) {
            $log.debug("enableCompanyProduct resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject(resp);
            }
          });
        });

        return deferred.promise;
      };
    }
  ])

  .filter("fullAddress", function () {
    return function (company) {
      var res = (company.street ? company.street + ", " : "") +
        (company.city ? company.city + ", " : "") +
        (company.province ? company.province + ", " : "") +
        (company.country ? company.country + ", " : "") +
        (company.postalCode ? company.postalCode + ", " : "");
      if (res) {
        res = res.substr(0, res.length - 2);
      }
      return res;
    };
  });

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.util", [])

  .factory("pick", function () {
    var ArrayProto = Array.prototype;
    var
      slice = ArrayProto.slice,
      concat = ArrayProto.concat;
    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    var createCallback = function (func, context, argCount) {
      if (context === void 0) {
        return func;
      }
      switch (argCount === null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      case 2:
        return function (value, other) {
          return func.call(context, value, other);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index,
            collection);
        };
      }
      return function () {
        return func.apply(context, arguments);
      };
    };

    return function (obj, iteratee, context) {
      var result = {},
        key;
      if (obj === null) {
        return result;
      }
      if (angular.isFunction(iteratee)) {
        iteratee = createCallback(iteratee, context);
        for (key in obj) {
          var value = obj[key];
          if (iteratee(value, key, obj)) {
            result[key] = value;
          }
        }
      } else {
        var keys = concat.apply([], slice.call(arguments, 1));
        obj = new Object(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
          key = keys[i];
          if (key in obj) {
            result[key] = obj[key];
          }
        }
      }
      return result;
    };
  });

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.countries", ["risevision.common.gapi"])

  .factory("getCoreCountries", ["coreAPILoader", "$q", "$log", "$filter",
    function (coreAPILoader, $q, $log, $filter) {
      var deferred;
      return function () {
        if (deferred) {
          return deferred.promise;
        } else {
          deferred = $q.defer();
        }

        coreAPILoader().then(function (coreApi) {
          return coreApi.country.list();
        })
          .then(function (resp) {
            var items = resp.result ? resp.result.items : [];
            if (items instanceof Array) {
              items = $filter("orderBy")(items, "name");
            }

            deferred.resolve(items);
          })
          .then(null, function (e) {
            $log.debug("getCoreCountries failed", e);
            deferred.reject(e);

            deferred = null;
          });
        return deferred.promise;
      };
    }
  ])
    .factory("COUNTRIES", ["getCoreCountries",
      function (getCoreCountries) {
        var countries = [];

        getCoreCountries().then(function (result) {
          Array.prototype.push.apply(countries, result);
        });

        return countries;
      }
    ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.display", [
    "risevision.common.gapi",
    "risevision.core.cache",
    "risevision.core.util"
  ])

  .service("displayService", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      this.list = function (companyId, search, cursor, count, sort) {
        var deferred = $q.defer();
        var obj = {
          "companyId": companyId,
          "search": search,
          "cursor": cursor,
          "count": count,
          "sort": sort
        };
        $log.debug("list displays called with", obj);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.display.list(obj);
          request.execute(function (resp) {
            $log.debug("list displays resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);
})(angular);

"use strict";

angular.module("risevision.common.fastpass", [])
  .factory("loadFastpass", ["$q", "$http", "$document", "$timeout", "GSFP_URL",
    "$log",
    function ($q, $http, $document, $timeout, GSFP_URL, $log) {

      var loadScript = function (src) {
        var deferred = $q.defer();
        var script = $document[0].createElement("script");
        script.onload = script.onreadystatechange = function (e) {
          deferred.resolve(e);
        };
        script.onerror = function (e) {
          deferred.reject(e);
        };
        script.src = src;
        if ($document && $document[0]) {
          $document[0].body.appendChild(script);
        }
        return deferred.promise;
      };

      return function (username, email) {
        var deferred = $q.defer();
        $log.debug("loadFastpass called", username, email);
        var rejected = function (rej) {
          $log.error("loadFastpass rejected", rej);
          deferred.reject("loadFastpass rejected " + rej);
        };

        $http.get(GSFP_URL +
          "/geturl?userEmail=" + email +
          "&userName=" + username).then(function (res) {
          loadScript(res.data).then(function (result) {
            $log.debug("loadFastpass result", result);
            deferred.resolve(true);
          }, rejected).catch(rejected);
        }, deferred.reject);

        return deferred.promise;
      };

    }
  ]);

/**
 * Created by rodrigopavezi on 30/01/15.
 */
"use strict";

angular.module("risevision.common.monitoring.activity", [
  "risevision.common.gapi"
])
  .factory("getActivity", ["$q", "monitoringAPILoader", "$log",
    function ($q, monitoringAPILoader, $log) {
      return function (clientId, api) {
        $log.debug("getActivity called", clientId, api);

        var deferred = $q.defer();
        monitoringAPILoader().then(function (monitoringApi) {
          var criteria = {};
          if (clientId) {
            criteria.clientId = clientId;
          }
          if (api) {
            criteria.api = api;
          }

          var request = monitoringApi.activity.get(criteria);
          request.execute(function (resp) {
            $log.debug("getActivity resp", resp);
            if (resp.result) {
              deferred.resolve(resp.result);
            } else {
              deferred.reject(resp);
            }
          });
        }, function (errorResult) {
          $log.debug("Error: " + errorResult);
          deferred.reject(errorResult);
        });
        return deferred.promise;
      };
    }
  ]);

(function (angular) {
  "use strict";

  angular.module("risevision.core.oauth2", ["risevision.common.gapi",
    "risevision.core.cache"
  ]).
  factory("getOAuthUserInfo", ["oauth2APILoader", "$q", "userInfoCache",
    "$log",
    function (oauth2APILoader, $q, userInfoCache, $log) {
      return function () {

        var deferred = $q.defer();
        var resp;
        if ((resp = userInfoCache.get("oauth2UserInfo"))) {
          if (resp.error) {
            deferred.reject(resp.error);
          } else {
            deferred.resolve(resp);
          }
        } else {
          oauth2APILoader().then(function (oauth2) {
            oauth2.userinfo.get().execute(function (resp) {
              $log.debug(
                "getOAuthUserInfo oauth2.userinfo.get() resp", resp);
              if (!resp) {
                userInfoCache.remove("oauth2UserInfo");
                deferred.reject();
              } else if (resp.hasOwnProperty("error")) {
                userInfoCache.remove("oauth2UserInfo");
                deferred.reject(resp.error);
              } else {
                userInfoCache.put("oauth2UserInfo", resp);
                deferred.resolve(resp);
              }
            });
          }, deferred.reject);
        }

        return deferred.promise;
      };
    }
  ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.schedule", [
    "risevision.common.gapi",
    "risevision.core.cache",
    "risevision.core.util"
  ])

  .service("scheduleService", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      //query a given's companys list of display schedules
      this.list = function (companyId, search, cursor, count, sort) {
        var deferred = $q.defer();
        var obj = {
          "companyId": companyId,
          "search": search,
          "cursor": cursor,
          "count": count,
          "sort": sort
        };
        $log.debug("getSchedules called with", obj);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.schedule.list(obj);
          request.execute(function (resp) {
            $log.debug("getSchedules resp", resp);
            if (resp.result) {
              deferred.resolve(resp.items);
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ]);
})(angular);

"use strict";

angular.module("risevision.store.authorization", [
  "risevision.common.gapi"
])
  .factory("storeAuthorization", ["$q", "$log", "$http",
    "STORE_SERVER_URL", "userState",
    function ($q, $log, $http, STORE_SERVER_URL, userState) {
      var factory = {};

      factory.check = function (productCode) {
        var deferred = $q.defer();

        $http({
          url: STORE_SERVER_URL + "/v1/widget/auth",
          method: "GET",
          params: {
            cid: userState.getSelectedCompanyId(),
            pc: productCode,
            startTrial: false
          }
        }).then(function (response) {
          if (response.data.authorized) {
            deferred.resolve(true);
          } else {
            deferred.reject(false);
          }
        }, function (e) {
          $log.error("Failed to check store authorization.", e);
          deferred.reject(e);
        });

        return deferred.promise;
      };

      factory.startTrial = function (productCode) {
        var deferred = $q.defer();
        var companyId = userState.getSelectedCompanyId();
        var startTrialUrl = "/v1/product/" + productCode + "/company/" + companyId + "/trial/start";

        $http.get(STORE_SERVER_URL + startTrialUrl)
          .then(function (response) {
            if (!response.error) {
              deferred.resolve(true);
            } else {
              deferred.reject(response);
            }
          }, function (e) {
            $log.error("Failed to start trial.", e);
            deferred.reject(e);
          });

        return deferred.promise;
      };

      return factory;
    }
  ]);

(function () {
  "use strict";

  angular.module("risevision.common.subscription-status", [
    "risevision.common.gapi"
  ])
    .service("subscriptionStatusService", ["$http", "$q", "storeAPILoader",
      "$log",
      function ($http, $q, storeAPILoader, $log) {
        var responseType = ["On Trial", "Trial Expired", "Subscribed",
          "Suspended", "Cancelled", "Free", "Not Subscribed",
          "Product Not Found", "Company Not Found", "Error"
        ];
        var responseCode = ["on-trial", "trial-expired", "subscribed",
          "suspended", "cancelled", "free", "not-subscribed",
          "product-not-found", "company-not-found", "error"
        ];
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {
          return Math.floor((b.getTime() - a.getTime()) / _MS_PER_DAY);
        }

        this.get = function (productCode, companyId) {
          var deferred = $q.defer();

          var obj = {
            "companyId": companyId,
            "productCodes": productCode
          };

          storeAPILoader().then(function (storeApi) {
            var request = storeApi.product.status(obj);
            request.execute(function (resp) {
              $log.debug("getProductStatus resp", resp);
              if (resp.result) {
                var subscriptionStatus = resp.items[0];

                subscriptionStatus.plural = "";

                var statusIndex = responseType.indexOf(
                  subscriptionStatus.status);

                if (statusIndex >= 0) {
                  subscriptionStatus.statusCode = responseCode[
                    statusIndex];
                }

                if (subscriptionStatus.status === "") {
                  subscriptionStatus.status = "N/A";
                  subscriptionStatus.statusCode = "na";
                  subscriptionStatus.subscribed = false;
                } else if (subscriptionStatus.status === responseType[0] ||
                  subscriptionStatus.status === responseType[2] ||
                  subscriptionStatus.status === responseType[5]) {
                  subscriptionStatus.subscribed = true;
                } else {
                  subscriptionStatus.subscribed = false;
                }

                if (subscriptionStatus.statusCode === "not-subscribed" &&
                  subscriptionStatus.trialPeriod && subscriptionStatus.trialPeriod >
                  0) {
                  subscriptionStatus.statusCode = "trial-available";
                  subscriptionStatus.subscribed = true;
                }

                if (subscriptionStatus.expiry && subscriptionStatus.statusCode ===
                  "on-trial") {
                  subscriptionStatus.expiry = new Date(
                    subscriptionStatus.expiry);

                  if (subscriptionStatus.expiry instanceof Date && !
                    isNaN(subscriptionStatus.expiry.valueOf())) {
                    subscriptionStatus.expiry = dateDiffInDays(new Date(),
                      subscriptionStatus.expiry);
                  }

                  if (subscriptionStatus.expiry === 0) {
                    subscriptionStatus.plural = "-zero";
                  } else if (subscriptionStatus.expiry > 1) {
                    subscriptionStatus.plural = "-many";
                  }
                }

                deferred.resolve(subscriptionStatus);
              } else {
                deferred.reject(resp);
              }
            });
          });

          return deferred.promise;
        };

      }
    ]);
}());

(function (angular) {
  "use strict";

  angular.module("risevision.core.systemmessages", ["risevision.common.gapi"])

  .factory("getCoreSystemMessages", ["gapiLoader", "$q", "$log",
    function (gapiLoader, $q, $log) {
      return function (companyId) {
        var deferred = $q.defer();
        gapiLoader().then(function (gApi) {
          var request = gApi.client.core.systemmessage.list({
            "companyId": companyId
          });
          request.execute(function (resp) {
            var items = resp;
            if (!(items instanceof Array) && items.items) {
              items = items.items;
            }
            $log.debug("getCoreSystemMessage resp", items);
            deferred.resolve(items);
          });
        });
        return deferred.promise;
      };
    }
  ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.core.userprofile", [
    "risevision.common.gapi", "risevision.core.oauth2"
  ])

  .value("userRoleMap", {
    "ce": "Content Editor",
    "cp": "Content Publisher",
    "da": "Display Administrator",
    "ua": "System Administrator",
    "pu": "Store Purchaser",
    "sa": "Rise System Administrator",
    "ba": "Rise Store Administrator"
  })

  .constant("USER_WRITABLE_FIELDS", [
    "mailSyncEnabled", "email", "firstName", "lastName", "telephone",
    "roles",
    "status", "companyRole", "dataCollectionDate"
  ])

  .factory("getUserProfile", ["oauth2APILoader", "coreAPILoader", "$q",
    "$log",
    function (oauth2APILoader, coreAPILoader, $q, $log) {
      var _username;
      var _cachedPromises = {};

      return function (username, clearCache) {

        var deferred;

        if (username === _username && !clearCache &&
          _cachedPromises[username] !== null) {
          //avoid calling API if username didn't change
          return _cachedPromises[username].promise;
        } else {
          _username = username;
          _cachedPromises[username] = deferred = $q.defer();
        }

        if (!username) {
          deferred.reject(
            "getUserProfile failed: username param is required.");
          $log.debug("getUserProfile failed: username param is required.");
        } else {

          var criteria = {};
          if (username) {
            criteria.username = username;
          }
          $log.debug("getUserProfile called", criteria);

          $q.all([oauth2APILoader(), coreAPILoader()]).then(function (
            results) {
            var coreApi = results[1];
            // var oauthUserInfo = results[2];
            coreApi.user.get(criteria).execute(function (resp) {
              if (resp.error || !resp.result) {
                deferred.reject(resp);
              } else {
                $log.debug("getUser resp", resp);
                //get user profile
                deferred.resolve(resp.item);
              }
            });
          }, deferred.reject);
        }
        return deferred.promise;
      };
    }
  ])

  .factory("updateUser", ["$q", "coreAPILoader", "$log",
    "getUserProfile", "pick", "USER_WRITABLE_FIELDS",
    function ($q, coreAPILoader, $log, getUserProfile, pick,
      USER_WRITABLE_FIELDS) {
      return function (username, profile) {
        var deferred = $q.defer();
        profile = pick(profile, USER_WRITABLE_FIELDS);
        $log.debug("updateUser called", username, profile);
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.user.patch({
            username: username,
            data: profile
          });
          request.execute(function (resp) {
            $log.debug("updateUser resp", resp);
            if (resp.error) {
              deferred.reject(resp);
            } else if (resp.result) {
              getUserProfile(username, true).then(function () {
                deferred.resolve(resp);
              });
            } else {
              deferred.reject("updateUser");
            }
          });
        }, deferred.reject);
        return deferred.promise;
      };
    }
  ])

  .factory("addUser", ["$q", "coreAPILoader", "$log", "pick",
    "getUserProfile",
    function ($q, coreAPILoader, $log, pick, getUserProfile) {
      return function (companyId, username, profile) {
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          profile = pick(profile, "mailSyncEnabled",
            "email", "firstName", "lastName", "telephone", "roles",
            "status");
          var request = coreApi.user.add({
            username: username,
            companyId: companyId,
            data: profile
          });
          request.execute(function (resp) {
            $log.debug("addUser resp", resp);
            if (resp.result) {
              getUserProfile(username, true).then(function () {
                deferred.resolve(resp);
              });
            } else {
              deferred.reject(resp);
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("deleteUser", ["$q", "coreAPILoader", "$log",
    function ($q, coreAPILoader, $log) {
      return function (username) {
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.user.delete({
            username: username
          });
          request.execute(function (resp) {
            $log.debug("deleteUser resp", resp);
            if (resp.result) {
              deferred.resolve(resp);
            } else {
              deferred.reject("deleteUser");
            }
          });
        });
        return deferred.promise;
      };
    }
  ])

  .factory("getUsers", ["$q", "coreAPILoader", "$log",
    function ($q, coreAPILoader, $log) {
      return function (search, cursor) {
        var obj = {
          "companyId": search.companyId,
          "search": search.query,
          "cursor": cursor,
          "count": search.count,
          "sort": search.sortBy + (search.reverse ? " desc" : " asc")
        };

        $log.debug("getUsers", obj);
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.user.list(obj);
          request.execute(function (resp) {
            $log.debug("getUsers resp", resp);
            if (resp.result) {
              deferred.resolve(resp.result);
            } else {
              deferred.reject("getUsers");
            }
          });
        }, deferred.reject);
        return deferred.promise;
      };
    }
  ]);

})(angular);

"use strict";

angular.module("risevision.common.components.ui-flow", [
  "LocalStorageModule"
])

.constant("uiStatusDependencies", {
  _dependencies: {},
  _retries: {},
  addDependencies: function (deps) {
    angular.extend(this._dependencies, deps);
  },
  setMaximumRetryCount: function (status, num) {
    if (num < 1) {
      throw "Retry count for " + status +
        " must be equal to or greater than 1.";
    }
    if (this._retries[status] === undefined) {
      this._retries[status] = num;
    }
  }
});

"use strict";

angular.module("risevision.common.components.ui-flow")
  .factory("uiFlowManager", ["$log", "$q", "$injector",
    "uiStatusDependencies", "$rootScope", "localStorageService",
    function ($log, $q, $injector, uiStatusDependencies, $rootScope,
      localStorageService) {

      var _status, _goalStatus, _retriesLeft = null;
      var _dependencyMap = uiStatusDependencies._dependencies;

      //generate a status that always resolves to true
      var genedateDummyStatus = function () {
        return function () {
          var deferred = $q.defer();
          deferred.resolve(true);
          return deferred.promise;
        };
      };

      var _getOrCreateDummyFactory = function (status) {
        var factory;
        try {
          factory = $injector.get(status);
        } catch (e) {
          $log.debug("Generating dummy status", status);
          factory = genedateDummyStatus();
        }
        return factory;
      };

      //internal method that attempt to reach a particular status
      var _attemptStatus = function (status) {
        var lastD;

        $log.debug("Attempting to reach status", status, "...");
        var dependencies = _dependencyMap[status];
        if (dependencies) {
          if (!(dependencies instanceof Array)) {
            dependencies = [dependencies];
          }

          var prevD = $q.defer(),
            firstD = prevD; //chain sibling dependency together

          angular.forEach(dependencies, function (dep) {
            //iterate through dependencies
            var currentD = $q.defer();
            prevD.promise.then(currentD.resolve, function () {
              _attemptStatus(dep).then(function () {
                //should come here if any of the dependencies is satisfied
                if (_dependencyMap[dep]) {
                  $log.debug("Deps for status", dep, "satisfied.");
                }
                //find factory function and check for satisfaction

                _getOrCreateDummyFactory(status)().then(
                  function () {
                    $log.debug("Status", status, "satisfied.");
                    currentD.resolve(true);
                  },
                  function () {
                    $log.debug("Status", status, "not satisfied.");
                    currentD.reject(status);
                  }
                );
              }, function (lastRej) {
                if (_dependencyMap[dep]) {
                  $log.debug("Failed to reach status", dep,
                    " because its dependencies are not satisfied. Last rejected dep: ",
                    lastRej);
                  currentD.reject(lastRej);
                } else {
                  currentD.reject(dep);
                }

              });
            });
            lastD = prevD = currentD;
          });

          //commence the avalance
          firstD.reject();
        } else {
          //at deep level of termination status
          lastD = $q.defer();
          _getOrCreateDummyFactory(status)().then(
            function () {
              $log.debug("Termination status", status, "satisfied.");
              lastD.resolve(true);
            },
            function () {
              $log.debug("Termination status", status, "not satisfied.");
              lastD.reject(status);
            }
          );
        }

        return lastD.promise;
      };

      var deferred, final = true;
      var _recheckStatus = function (desiredStatus) {
        if (!desiredStatus && !_goalStatus) {
          //no goal, no desired status. resolve to true immediately
          var d = $q.defer();
          d.resolve();
          return d.promise;
        }
        if (!_goalStatus && final) {
          _goalStatus = desiredStatus;
          //start afresh
          _retriesLeft = angular.copy(uiStatusDependencies._retries);
          deferred = $q.defer();
          final = false;
        }
        if (_goalStatus) {
          deferred = $q.defer();
          _attemptStatus(_goalStatus).then(
            function (s) {
              if (_goalStatus) {
                _status = _goalStatus;
              }
              deferred.resolve(s);
              _goalStatus = null;
              final = true;
            },
            function (status) {
              // if rejected at any given step,
              // show the dialog of that relevant step
              _status = status;
              if (_retriesLeft[status] !== undefined) {
                if (_retriesLeft[status] === 0) {
                  $log.debug("Maximum allowed retries for status", status,
                    "reached. Validation will cancel.");
                  cancelValidation();
                } else {
                  _retriesLeft[status]--;
                }
              }
              final = true;
              deferred.reject(status);
            });
        }
        return deferred && deferred.promise;
      };


      var invalidateStatus = function (desiredStatus) {
        _status = "pendingCheck";
        return _recheckStatus(desiredStatus);
      };

      var persist = function () {
        localStorageService.set("risevision.ui-flow.state", {
          goalStatus: _goalStatus,
          retriesLeft: _retriesLeft
        });
      };

      var cancelValidation = function () {
        _status = "";
        _goalStatus = "";
        _retriesLeft = null;
        final = true;
        $rootScope.$broadcast("risevision.uiStatus.validationCancelled");
        $log.debug("UI status validation cancelled.");
      };

      //restore
      if (localStorageService.get("risevision.ui-flow.state")) {
        var state = localStorageService.get("risevision.ui-flow.state");
        if (state && state.goalStatus) {
          _goalStatus = state.goalStatus;
          $log.debug("uiFlowManager.goalStatus restored to", state.goalStatus,
            state.retriesLeft);
          _retriesLeft = state.retriesLeft;
          deferred = $q.defer();
          final = false;
        }
        localStorageService.remove("risevision.ui-flow.state");
      }

      var manager = {
        invalidateStatus: invalidateStatus,
        cancelValidation: cancelValidation,
        getStatus: function () {
          return _status;
        },
        isStatusUndetermined: function () {
          return _status === "pendingCheck";
        },
        persist: persist
      };

      //DEBUG
      // window.uiFlowManager = manager;

      return manager;
    }
  ]);

(function (angular) {
  "use strict";

  try {
    angular.module("risevision.common.config");
  } catch (err) {
    angular.module("risevision.common.config", []);
  }

  angular.module("risevision.common.config")
    .value("ENABLE_EXTERNAL_LOGGING", true)
    .value("CORE_URL", "https://rvaserver2.appspot.com/_ah/api");

  angular.module("risevision.common.components.logging", []);

  angular.module("risevision.common.components.rvtokenstore", [
    "risevision.common.components.util", "LocalStorageModule",
    "ngBiscuit"
  ]);

  angular.module("risevision.common.components.userstate", [
    "ui.router",
    "angular-md5",
    "risevision.common.components.ui-flow",
    "risevision.common.components.util",
    "risevision.common.components.rvtokenstore",
    "risevision.common.components.logging",
    "risevision.common.components.loading",
    "risevision.common.config",
    "risevision.common.gapi", "LocalStorageModule",
    "risevision.core.cache",
    "risevision.core.oauth2", "risevision.core.company",
    "risevision.core.util", "risevision.core.userprofile"
  ])

  // Set up our mappings between URLs, templates, and controllers
  .config(["$urlRouterProvider", "$stateProvider", "$locationProvider",
    function storeRouteConfig($urlRouterProvider, $stateProvider,
      $locationProvider) {

      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix("/");

      $urlRouterProvider.otherwise("/");

      $urlRouterProvider.when(/\/.*&id_token=.*&client_id=.*/, function () {
        console.log("Google Auth result received");
      });

      // Use $stateProvider to configure states.
      $stateProvider.state("common", {
        template: "<div class=\"app-launcher\" ui-view></div>"
      })

      .state("common.auth", {
        abstract: true,
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/auth-common.html");
          }
        ]
      })

      .state("common.auth.unauthorized", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/login.html");
          }
        ],
        url: "/unauthorized/:state",
        controller: "LoginCtrl",
        params: {
          isSignUp: false,
          passwordReset: null,
          accountConfirmed: null
        }
      })

      .state("common.auth.createaccount", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/create-account.html");
          }
        ],
        url: "/createaccount/:state",
        controller: "LoginCtrl",
        params: {
          isSignUp: true,
          joinAccount: false
        }
      })

      .state("common.auth.joinaccount", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/create-account.html");
          }
        ],
        url: "/joinaccount/:companyName",
        controller: "LoginCtrl",
        params: {
          isSignUp: true,
          joinAccount: true
        }
      })

      .state("common.auth.confirmaccount", {
        controller: "ConfirmAccountCtrl",
        template: "<div ui-view></div>",
        url: "/confirmaccount/:user/:token"
      })

      .state("common.auth.requestconfirmationemail", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get(
              "userstate/request-confirmation-email.html");
          }
        ],
        url: "/requestconfirmationemail",
        controller: "RequestConfirmationEmailCtrl"
      })

      .state("common.auth.requestpasswordreset", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get(
              "userstate/request-password-reset.html");
          }
        ],
        url: "/requestpasswordreset",
        controller: "RequestPasswordResetCtrl"
      })

      .state("common.auth.resetpassword", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get(
              "userstate/reset-password-confirm.html");
          }
        ],
        url: "/resetpassword/:user/:token",
        controller: "ResetPasswordConfirmCtrl"
      })

      .state("common.auth.unsubscribe", {
        templateProvider: ["$templateCache",
          function ($templateCache) {
            return $templateCache.get("userstate/unsubscribe.html");
          }
        ],
        url: "/unsubscribe",
        controller: ["$scope", "$location",
          function ($scope, $location) {
            var params = $location.path("/unsubscribe").search();
            $scope.email = params.email;
            $scope.id = params.id;
            $scope.name = params.name;
          }
        ]
      });
    }
  ])

  .run(["$rootScope", "$state", "$stateParams", "urlStateService",
    "userState",
    function ($rootScope, $state, $stateParams, urlStateService, userState) {
      userState._restoreState();

      $rootScope.$on("$stateChangeStart", function (event, toState,
        toParams, fromState, fromParams) {
        if (toState && (
          toState.name === "common.auth.unauthorized" ||
          toState.name === "common.auth.unregistered" ||
          toState.name === "common.auth.createaccount") && !toParams.state) {

          if (fromParams.state) {
            toParams.state = fromParams.state;

            event.preventDefault();

            $state.go(toState.name, toParams);
          }
        }
      });

      $rootScope.$on("risevision.user.authorized", function () {
        var currentState = $state.current.name;

        if (currentState.indexOf("common.auth") !== -1 && currentState !== "common.auth.unsubscribe") {
          urlStateService.redirectToState($stateParams.state);
        }
      });
    }
  ]);

})(angular);

"use strict";

angular.module("risevision.common.components.userstate")
  .factory("canAccessApps", ["$q", "$state", "$location",
    "userState", "userAuthFactory", "urlStateService",
    function ($q, $state, $location, userState, userAuthFactory,
      urlStateService) {
      return function (signup, allowReturn) {
        var deferred = $q.defer();
        userAuthFactory.authenticate(false)
          .then(function () {
            if (userState.isRiseVisionUser()) {
              deferred.resolve();
            } else {
              return $q.reject();
            }
          })
          .then(null, function () {
            var newState;

            if (!userState.isLoggedIn()) {
              if (signup) {
                newState = "common.auth.createaccount";
              } else {
                newState = "common.auth.unauthorized";
              }
            } else if ($state.get("common.auth.unregistered")) {
              newState = "common.auth.unregistered";
            }

            if (newState) {
              $state.go(newState, {
                state: urlStateService.get()
              }, {
                reload: true
              });

              if (!allowReturn) {
                $location.replace();
              }

              deferred.reject();
            } else {
              deferred.resolve();
            }
          });
        return deferred.promise;
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.logging")
  .factory("bigQueryLogging", ["externalLogging", "userState",
    function (externalLogging, userState) {
      var factory = {};

      factory.logEvent = function (eventName, eventDetails, eventValue,
        username, companyId) {
        return externalLogging.logEvent(eventName, eventDetails, eventValue,
          username || userState.getUsername(), companyId || userState.getSelectedCompanyId()
        );
      };

      return factory;
    }
  ]);

(function (angular) {

  "use strict";

  angular.module("risevision.common.components.userstate")
    .factory("companyState", ["$location", "getCompany", "objectHelper",
      "$rootScope", "$log", "$q",
      function ($location, getCompany, objectHelper, $rootScope, $log, $q) {
        var pendingSelectedCompany;

        var _state = {
          userCompany: {},
          selectedCompany: {}
        };

        var _resetCompanyState = function () {
          objectHelper.clearObj(_state.selectedCompany);
          objectHelper.clearObj(_state.userCompany);
          $log.debug("Company state has been reset.");
        };

        if ($location.search().cid) {
          $log.debug("cid", $location.search().cid,
            "saved for later processing.");
          pendingSelectedCompany = $location.search().cid;
        }

        var _init = function () {
          var deferred = $q.defer();

          //populate userCompany
          getCompany().then(function (company) {
            var selectedCompanyId = _companyState.getSelectedCompanyId() ?
              _companyState.getSelectedCompanyId() :
              pendingSelectedCompany;

            objectHelper.clearAndCopy(company, _state.userCompany);

            return _switchCompany(selectedCompanyId);
          })
            .then(null, function () {
              _companyState.resetCompany();
            })
            .finally(function () {
              pendingSelectedCompany = null;

              deferred.resolve(null);
            });

          return deferred.promise;
        };

        var _switchCompany = function (companyId) {
          var deferred = $q.defer();

          if (companyId && companyId !== _state.userCompany.id) {
            getCompany(companyId)
              .then(function (company) {
                objectHelper.clearAndCopy(company, _state.selectedCompany);

                deferred.resolve();
                $rootScope.$broadcast(
                  "risevision.company.selectedCompanyChanged");
              })
              .then(null, function (resp) {
                console.error("Failed to load selected company.", resp);

                deferred.reject(resp);
              });
          } else {
            _companyState.resetCompany();

            deferred.resolve();
          }

          return deferred.promise;
        };

        var _reloadSelectedCompany = function () {
          var deferred = $q.defer();

          getCompany(_state.selectedCompany.id)
            .then(function (company) {
              objectHelper.clearAndCopy(company, _state.selectedCompany);

              deferred.resolve();
              $rootScope.$broadcast("risevision.company.updated", {
                "companyId": company.id
              });
            })
            .then(null, function (resp) {
              console.error("Failed to reload selected company.", resp);

              deferred.reject(resp);
            });

          return deferred.promise;
        };

        var _companyState = {
          init: _init,
          switchCompany: _switchCompany,
          reloadSelectedCompany: _reloadSelectedCompany,
          updateCompanySettings: function (company) {
            if (company && company.id === _companyState.getSelectedCompanyId()) {
              objectHelper.clearAndCopy(company, _state.selectedCompany);
            }
            if (company && company.id === _companyState.getUserCompanyId()) {
              objectHelper.clearAndCopy(company, _state.userCompany);
            }

            $rootScope.$broadcast("risevision.company.updated", {
              "companyId": company.id
            });
          },
          resetCompany: function () {
            objectHelper.clearAndCopy(_state.userCompany, _state.selectedCompany);

            $rootScope.$broadcast(
              "risevision.company.selectedCompanyChanged");
          },
          resetCompanyState: _resetCompanyState,
          getUserCompanyId: function () {
            return (_state.userCompany && _state.userCompany.id) || null;
          },
          getUserCompanyName: function () {
            return (_state.userCompany && _state.userCompany.name) ||
              null;
          },
          getSelectedCompanyId: function () {
            return (_state.selectedCompany && _state.selectedCompany.id) ||
              null;
          },
          getSelectedCompanyName: function () {
            return (_state.selectedCompany && _state.selectedCompany.name) ||
              null;
          },
          getSelectedCompanyCountry: function () {
            return (_state.selectedCompany && _state.selectedCompany.country) ||
              null;
          },
          getCopyOfUserCompany: function (noFollow) {
            if (noFollow) {
              return angular.extend({}, _state.userCompany);
            } else {
              return objectHelper.follow(_state.userCompany);
            }
          },
          getCopyOfSelectedCompany: function (noFollow) {
            if (noFollow) {
              return angular.extend({}, _state.selectedCompany);
            } else {
              return objectHelper.follow(_state.selectedCompany);
            }
          },
          isSubcompanySelected: function () {
            return _state.selectedCompany && _state.selectedCompany.id !==
              (_state.userCompany && _state.userCompany.id);
          },
          isTestCompanySelected: function () {
            return _state.selectedCompany && _state.selectedCompany.isTest ===
              true;
          },
          isSeller: function () {
            return (_state.selectedCompany && _state.selectedCompany.sellerId) ?
              true : false;
          },
          isRootCompany: function () {
            return _state.userCompany && !_state.userCompany.parentId;
          },
          isSelectedCompanyChargebee: function () {
            return _state.selectedCompany && _state.selectedCompany.origin === "Chargebee";
          }
        };

        return _companyState;
      }
    ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.common.components.userstate")
    .factory("customAuthFactory", ["$q", "$log", "gapiLoader",
      "userauth", "userState",
      function ($q, $log, gapiLoader, userauth, userState) {
        var factory = {};

        factory.authenticate = function (credentials) {
          var deferred = $q.defer();
          var _state = userState._state;

          if (credentials && credentials.username && credentials.password) {
            $q.all([gapiLoader(), userauth.login(credentials.username,
              credentials.password)])
              .then(function (result) {
                var gApi = result[0];
                var loginInfo = result[1] && result[1].result;

                $log.debug("JWT login result:", loginInfo);
                if (loginInfo && loginInfo.item) {
                  var token = {
                    access_token: loginInfo.item,
                    expires_in: "3600",
                    token_type: "Bearer"
                  };
                  gApi.auth.setToken(token);

                  deferred.resolve({
                    email: credentials.username,
                    token: token
                  });
                } else {
                  deferred.reject("Invalid Auth Token (JWT)");
                }
              })
              .then(null, function (err) {
                deferred.reject(err);
              });
          } else if (_state.userToken && _state.userToken.token) {
            gapiLoader().then(function (gApi) {
              gApi.auth.setToken(_state.userToken.token);

              // TODO: Validate token?

              deferred.resolve(_state.userToken);
            });
          } else {
            deferred.reject();
          }

          return deferred.promise;
        };

        factory.addUser = function (credentials) {
          var deferred = $q.defer();

          if (credentials && credentials.username && credentials.password) {
            userauth.add(credentials.username, credentials.password)
              .then(function (result) {
                deferred.resolve(result);
              })
              .then(null, function () {
                deferred.reject();
              });
          } else {
            deferred.reject();
          }

          return deferred.promise;
        };

        return factory;
      }
    ]);

})(angular);

"use strict";

/*jshint camelcase: false */

angular.module("risevision.common.components.logging")
  .constant("EXTERNAL_LOGGER_SERVICE_URL",
    "https://www.googleapis.com/bigquery/v2/projects/client-side-events/datasets/Apps_Events/tables/TABLE_ID/insertAll"
)
  .constant("EXTERNAL_LOGGER_REFRESH_URL",
    "https://www.googleapis.com/oauth2/v3/token?" +
    "client_id=1088527147109-6q1o2vtihn34292pjt4ckhmhck0rk0o7.apps.googleusercontent.com&" +
    "client_secret=nlZyrcPLg6oEwO9f9Wfn29Wh&refresh_token=1/xzt4kwzE1H7W9VnKB8cAaCx6zb4Es4nKEoqaYHdTD15IgOrJDtdun6zK6XiATCKT&" +
    "grant_type=refresh_token"
)
  .factory("externalLogging", ["$http", "$window", "$q", "$log",
    "EXTERNAL_LOGGER_REFRESH_URL", "EXTERNAL_LOGGER_SERVICE_URL",
    "ENABLE_EXTERNAL_LOGGING",
    function ($http, $window, $q, $log, EXTERNAL_LOGGER_REFRESH_URL,
      EXTERNAL_LOGGER_SERVICE_URL, ENABLE_EXTERNAL_LOGGING) {
      var factory = {};

      var _getSuffix = function () {
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return year.toString() + month.toString() + day.toString();
      };

      var EXTERNAL_LOGGER_INSERT_SCHEMA = {
        "kind": "bigquery#tableDataInsertAllRequest",
        "skipInvalidRows": false,
        "ignoreUnknownValues": false,
        "templateSuffix": _getSuffix(),
        "rows": [{
          "insertId": "",
          "json": {
            "event": "",
            "event_details": "",
            "event_value": 0,
            "host": "",
            "ts": 0,
            "user_id": "",
            "company_id": ""
          }
        }]
      };

      var _token, _tokenRefreshedAt;

      factory.logEvent = function (eventName, eventDetails, eventValue,
        userId, companyId) {
        $log.debug("BQ log", eventName, eventDetails, eventValue, userId,
          companyId);

        if (ENABLE_EXTERNAL_LOGGING === false) {
          $log.debug("External Logging DISABLED");
          return;
        }

        var deferred = $q.defer();

        factory.getToken().then(function (token) {
          var insertData = JSON.parse(JSON.stringify(
            EXTERNAL_LOGGER_INSERT_SCHEMA));
          var serviceUrl = EXTERNAL_LOGGER_SERVICE_URL.replace("TABLE_ID",
            "apps_events");

          insertData.rows[0].insertId = Math.random().toString(36).substr(2)
            .toUpperCase();
          insertData.rows[0].json.event = eventName;
          if (eventDetails) {
            insertData.rows[0].json.event_details = eventDetails;
          }
          if (eventValue) {
            insertData.rows[0].json.event_value = eventValue;
          }
          insertData.rows[0].json.user_id = userId || "";
          insertData.rows[0].json.company_id = companyId || "";
          insertData.rows[0].json.host = $window.location.hostname;
          insertData.rows[0].json.ts = new Date().toISOString();

          $http.post(serviceUrl, insertData, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            }
          }).then(function (result) {
            deferred.resolve(result);
          }, function (error) {
            $log.debug("error posting to BQ", error);
            deferred.reject(error);
          });
        }, function (error) {
          $log.debug("BQ token ERROR", error);
          deferred.reject(error);
        });

        return deferred.promise;
      };

      factory.getToken = function () {
        var deferred = $q.defer();
        if (_token && new Date().getTime() - _tokenRefreshedAt < 3580000) {
          deferred.resolve(_token);
        } else {
          $http.post(EXTERNAL_LOGGER_REFRESH_URL).then(function (resp) {
            _token = resp.data.access_token;
            _tokenRefreshedAt = new Date().getTime();
            deferred.resolve(resp.data.access_token);
          }, function () {
            deferred.reject();
          });
        }
        return deferred.promise;
      };

      return factory;
    }
  ]);

(function (angular) {
  "use strict";

  /*jshint camelcase: false */

  angular.module("risevision.common.components.userstate")
  // constants (you can override them in your app as needed)
  .factory("googleAuthFactory", ["$rootScope", "$q", "$log", "$window",
    "$stateParams", "auth2APILoader", "getOAuthUserInfo", "uiFlowManager",
    "userState", "urlStateService",
    function ($rootScope, $q, $log, $window, $stateParams, auth2APILoader,
      getOAuthUserInfo, uiFlowManager, userState, urlStateService) {

      var _gapiAuthorize = function () {
        var deferred = $q.defer();

        auth2APILoader()
          .then(function (auth2) {
            var authResult = auth2.getAuthInstance() &&
              auth2.getAuthInstance().isSignedIn.get();

            $log.debug("auth2.isSignedIn result:", authResult);
            if (authResult) {
              deferred.resolve(authResult);
            } else {
              deferred.reject("Failed to authorize user (auth2)");
            }
          })
          .then(null, deferred.reject); //auth2APILoader

        return deferred.promise;
      };

      /*
       * Responsible for triggering the Google OAuth process.
       *
       */
      var authenticate = function () {
        var deferred = $q.defer();

        _gapiAuthorize()
          .then(getOAuthUserInfo)
          .then(function (oauthUserInfo) {
            if (userState._state.redirectState) {
              urlStateService.redirectToState(userState._state.redirectState);

              delete userState._state.redirectState;
            }

            deferred.resolve(oauthUserInfo);
          })
          .then(null, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };

      var _isPopupAuth = function () {
        return (userState._state.inRVAFrame || ($window.self !== $window.top));
      };

      var forceAuthenticate = function () {
        var deferred = $q.defer();
        var loc;
        var redirectState = $stateParams.state;

        // Redirect to full URL path
        if ($rootScope.redirectToRoot === false) {
          loc = $window.location.href.substr(0, $window.location.href
            .indexOf("#")) || $window.location.href;

          redirectState = urlStateService.clearStatePath(redirectState);
        } else {
          loc = $window.location.origin + "/";
        }

        userState._state.redirectState = redirectState;
        userState._persistState();
        uiFlowManager.persist();

        var opts = {
          response_type: "token",
          prompt: "select_account",
          ux_mode: _isPopupAuth() ? "popup" : "redirect",
          redirect_uri: loc
        };

        auth2APILoader()
          .then(function (auth2) {
            return auth2.getAuthInstance().signIn(opts);
          })
          .then(function () {
            if (_isPopupAuth()) {
              deferred.resolve(authenticate());
            } else {
              deferred.resolve();
            }
          })
          .then(null, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };

      var googleAuthFactory = {
        authenticate: function (forceAuth) {
          if (!forceAuth) {
            return authenticate();
          } else {
            return forceAuthenticate();
          }
        }
      };

      return googleAuthFactory;
    }
  ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.common.components.rvtokenstore")
    .value("TOKEN_STORE_KEY", "rv-auth-object")
    .service("rvTokenStore", ["$log", "$location", "cookieStore",
      "getBaseDomain", "TOKEN_STORE_KEY",
      function ($log, $location, cookieStore, getBaseDomain,
        TOKEN_STORE_KEY) {
        var _readRvToken = function () {
          var token = cookieStore.get(TOKEN_STORE_KEY);

          try {
            return JSON.parse(token);
          } catch (e) {
            return token;
          }
        };

        var _writeRvToken = function (value) {
          var baseDomain = getBaseDomain();
          if (baseDomain === "localhost") {
            cookieStore.put(TOKEN_STORE_KEY, JSON.stringify(value), {
              path: "/"
            });
          } else {
            cookieStore.put(TOKEN_STORE_KEY, JSON.stringify(value), {
              domain: baseDomain,
              path: "/"
            });
          }
        };

        var _clearRvToken = function () {
          var baseDomain = getBaseDomain();
          if (baseDomain === "localhost") {
            cookieStore.remove(TOKEN_STORE_KEY, {
              path: "/"
            });
          } else {
            cookieStore.remove(TOKEN_STORE_KEY, {
              domain: baseDomain,
              path: "/"
            });
          }
        };

        var rvToken = {
          read: _readRvToken,
          write: _writeRvToken,
          clear: _clearRvToken
        };

        return rvToken;
      }
    ]);

})(angular);

(function (angular) {

  "use strict";

  angular.module("risevision.common.components.userstate")

  .run(["$rootScope", "userState", "selectedCompanyUrlHandler",
    function ($rootScope, userState, selectedCompanyUrlHandler) {
      $rootScope.$on("risevision.company.selectedCompanyChanged",
        function (newCompanyId) {
          if (newCompanyId) {
            selectedCompanyUrlHandler.updateUrl();
          }
        });

      //detect selectCompany changes on route UI
      $rootScope.$on("$stateChangeSuccess", selectedCompanyUrlHandler.updateSelectedCompanyFromUrl);
      $rootScope.$on("$routeChangeSuccess", selectedCompanyUrlHandler.updateSelectedCompanyFromUrl);
      $rootScope.$on("$locationChangeSuccess", selectedCompanyUrlHandler.locationChangeSuccess);
    }
  ])

  .service("selectedCompanyUrlHandler", ["$state", "$stateParams",
    "$location", "userState",
    function ($state, $stateParams, $location, userState) {
      // Called when the selectedCompanyId is changed
      this.updateUrl = function () {
        var selectedCompanyId = userState.getSelectedCompanyId();
        // This parameter is only appended to the url if the user is logged in
        // Do not apply during $state.trasition (handler will)
        if (selectedCompanyId && $location.search().cid !==
          selectedCompanyId && !$state.transition) {
          $stateParams.cid = selectedCompanyId;
          $state.params.cid = selectedCompanyId;

          $location.search("cid", selectedCompanyId);
        }
      };

      this.updateSelectedCompanyFromUrl = function () {
        var newCompanyId = $location.search().cid;

        if (newCompanyId && userState.getUserCompanyId() &&
          newCompanyId !== userState.getSelectedCompanyId()) {
          // The CID is changed in the URL; switch company
          userState.switchCompany(newCompanyId);
        } else if (!newCompanyId && userState.getSelectedCompanyId()) {
          // The CID is missing in the URL; add it
          var currentURL = $location.absUrl();

          $stateParams.cid = userState.getSelectedCompanyId();
          $state.params.cid = userState.getSelectedCompanyId();

          $location.search("cid", userState.getSelectedCompanyId());
          if (currentURL === $location.destUrl) {
            // see explanation below
            $location.replace();
          }
        }
      };

      this.locationChangeSuccess = function (event, newUrl) {
        $location.destUrl = newUrl;
      };

      /*

      Explanation for the usage of the $location.replace() above
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      Scenario 1: When application is using "ng-href" directive, then application goes through the following cycle

        $locationChangeSuccess -> $stateChangeSuccess -> $locationChangeSuccess

      Scenario 2: When application is using "ui-sref" directive or "$state.go" funtion, then application goes through the following cycle

        $stateChangeSuccess -> $locationChangeSuccess

      Here is the dilemma:
      - without $location.replace(), scenarion #2 works as expected creating single entries in the browser navigation history, 
      however scenario #1 creates duplicate entries - one URL without "cid" parameter and with "cid".
      - with $location.replace(), scenarion #2 does not add any entries to the browser navigation history, 
      however scenario #1 works as expected.
      
      The solution is to monitor $locationChangeSuccess events and record "newUrl" parameter, then use it in $stateChangeSuccess event
      in order to detect if pattern falls under scenario 1 or 2 then call $location.replace() based on that condition.

      */

    }
  ]);
})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.common.components.userstate")
    .factory("urlStateService", ["$window", "$location", "userState",
      function ($window, $location, userState) {

        var urlStateService = {};

        urlStateService.get = function () {
          var state = "";
          var stateObject = {
            p: null,
            u: null,
            s: null
          };

          // Redirect to the URL root and append pathname back to the URL
          // on Authentication success
          // This prevents Domain authentication errors for sub-folders
          // Warning: Root folder must have CH available for this to work,
          // otherwise no redirect is performed!
          // loc = $window.location.origin + "/";
          // Remove first character (/) from path since we're adding it to loc
          stateObject.p = $window.location.pathname ? $window.location
            .pathname
            .substring(1) : "";
          stateObject.s = $window.location.search;
          stateObject.u = $window.location.hash;

          if (stateObject.p || stateObject.s || stateObject.u) {
            state = encodeURIComponent(JSON.stringify(stateObject));
          }

          return state;
        };

        var _parseState = function (stateString) {
          var state = {};

          try {
            state = JSON.parse(decodeURIComponent(stateString));
          } catch (err) {
            // Parse failed
          }

          return state;
        };

        urlStateService.redirectToState = function (stateString) {
          var state = _parseState(stateString);

          if (state.u || !$location.$$html5) { // hash found, assume non HTML5 mode
            if (state.p || state.s) { // requires redirect
              userState._persistState();

              $window.location.replace(state.p +
                state.s +
                state.u
              );
            } else {
              $window.location.hash = state.u;
            }
          } else { // HTML5 mode
            state.p = state.p || "/";
            state.s = state.s || "";
            $location.url(state.p + state.s);
            $location.replace();
          }
        };

        urlStateService.clearStatePath = function (stateString) {
          var state = _parseState(stateString);

          state.p = undefined;
          state.s = undefined;

          return encodeURIComponent(JSON.stringify(state));
        };

        urlStateService.getUrlParam = function (paramName) {
          // if page is reloaded, then you can get param from $location.search()
          // otherwise you need to parse $location.path()

          if ($location.search()[paramName]) {
            return $location.search()[paramName];
          } else {
            var decodedPath = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent($location
              .path()))));
            var match = new RegExp("[\?&]" + paramName + "=([^&#\"]*)").exec(decodedPath);
            return match && match[1];
          }
        };

        return urlStateService;
      }
    ]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.common.components.userstate")
    .value("FORCE_GOOGLE_AUTH", false)
    .factory("userAuthFactory", ["$q", "$log", "$location",
      "$rootScope", "$loading", "$window", "$document",
      "auth2APILoader", "objectHelper", "rvTokenStore", "externalLogging",
      "userState", "googleAuthFactory", "customAuthFactory",
      "FORCE_GOOGLE_AUTH",
      function ($q, $log, $location, $rootScope, $loading, $window,
        $document, auth2APILoader, objectHelper,
        rvTokenStore, externalLogging, userState, googleAuthFactory,
        customAuthFactory, FORCE_GOOGLE_AUTH) {

        var _state = userState._state;

        var _authorizeDeferred, _authenticateDeferred;

        var _shouldLogPageLoad = true;

        var _logPageLoad = function (details) {
          if (_shouldLogPageLoad) {
            _shouldLogPageLoad = false;
            try {
              var duration = new Date().getTime() - $window.performance
                .timing.navigationStart;
              externalLogging.logEvent("page load time", details,
                duration,
                userState.getUsername(), userState.getSelectedCompanyId()
              );
            } catch (e) {
              $log.debug("Error logging load time");
            }
          }
        };

        var _setUserToken = function (userToken) {
          _state.userToken = userToken;
          rvTokenStore.write(_state.userToken);
        };

        var _cancelAccessTokenAutoRefresh = function () {};

        var _resetUserState = function () {
          $log.debug("Clearing user token...");
          _cancelAccessTokenAutoRefresh();
          _state.userToken = null;
          rvTokenStore.clear();

          userState._resetState();
        };

        var _detectUserOrAuthChange = function () {
          var token = rvTokenStore.read();
          if (!angular.equals(token, _state.userToken)) {
            $log.error("Authentication Failed. User token no longer matches stored token.");

            //token change indicates that user either signed in, or signed out, or changed account in other app
            $window.location.reload();
          } else if (_state.userToken) {
            _authenticateDeferred = null;

            //make sure user is not signed out of Google account outside of the CH enabled apps
            authenticate(false).finally(function () {
              if (!_state.userToken) {
                $log.error("Authentication Failed. User no longer signed in.");

                $window.location.reload();
              }
            });
          }
        };

        var _visibilityListener = function () {
          var visibilityState;
          var document = $document[0];
          if (typeof document.hidden !== "undefined") {
            visibilityState = "visibilityState";
          } else if (typeof document.mozHidden !== "undefined") {
            visibilityState = "mozVisibilityState";
          } else if (typeof document.msHidden !== "undefined") {
            visibilityState = "msVisibilityState";
          } else if (typeof document.webkitHidden !== "undefined") {
            visibilityState = "webkitVisibilityState";
          }
          $log.debug("visibility: " + document[visibilityState]);
          if ("visible" === document[visibilityState]) {
            _detectUserOrAuthChange();
          }
        };

        var _getVisibilityChangeName = function () {
          var visibilityChange;
          var document = $document[0];
          if (typeof document.hidden !== "undefined") {
            visibilityChange = "visibilitychange";
          } else if (typeof document.mozHidden !== "undefined") {
            visibilityChange = "mozvisibilitychange";
          } else if (typeof document.msHidden !== "undefined") {
            visibilityChange = "msvisibilitychange";
          } else if (typeof document.webkitHidden !== "undefined") {
            visibilityChange = "webkitvisibilitychange";
          }
          return visibilityChange;
        };

        var _addEventListenerVisibilityAPI = function () {
          document.addEventListener(_getVisibilityChangeName(),
            _visibilityListener);
        };

        var _removeEventListenerVisibilityAPI = function () {
          document.removeEventListener(_getVisibilityChangeName(),
            _visibilityListener);
        };

        /*
         * Responsible for triggering the Google OAuth process.
         *
         */
        var _authorize = function (authenticatedUser) {
          var attemptImmediate = false;

          if (_authorizeDeferred) {
            return _authorizeDeferred.promise;
          }

          if (authenticatedUser) {
            if (!_state.user.username || !_state.profile.username ||
              _state.user.username !== authenticatedUser.email) {
              _authorizeDeferred = $q.defer();

              //populate user
              objectHelper.clearAndCopy({
                userId: authenticatedUser.id, //TODO: ideally we should not use real user ID or email, but use hash value instead
                username: authenticatedUser.email,
                picture: authenticatedUser.picture
              }, _state.user);

              _setUserToken(authenticatedUser);

              userState.refreshProfile()
                .then(null, function (err) {
                  if (err && err.code !== 403) {
                    _authorizeDeferred.reject("Refresh Profile Error");

                    _authorizeDeferred = undefined;

                    return $q.reject();
                  }
                })
                .then(function () {
                  _authorizeDeferred.resolve();

                  $rootScope.$broadcast("risevision.user.authorized");

                  if (!attemptImmediate) {
                    $rootScope.$broadcast(
                      "risevision.user.userSignedIn");
                  }

                  _authorizeDeferred = undefined;
                });

              return _authorizeDeferred.promise;
            } else {
              return $q.resolve();
            }
          } else {
            return $q.reject("No user");
          }
        };

        var authenticate = function (forceAuth, credentials) {
          var authenticateDeferred;
          var isRiseAuthUser = false;

          // Clear User state
          if (forceAuth) {
            _authenticateDeferred = null;

            _resetUserState();
          }

          // Return cached promise
          if (_authenticateDeferred) {
            return _authenticateDeferred.promise;
          } else {
            _authenticateDeferred = $q.defer();
          }

          // Always resolve local copy of promise
          // in case cached version is cleared
          authenticateDeferred = _authenticateDeferred;
          $log.debug("authentication called");

          var _proceed = function () {
            var authenticationPromise;

            // Credentials or Token provided; assume authenticated
            if (credentials || _state.userToken && _state.userToken.token &&
              !FORCE_GOOGLE_AUTH) {
              isRiseAuthUser = true;
              authenticationPromise = customAuthFactory.authenticate(
                credentials);
            } else {
              authenticationPromise = googleAuthFactory.authenticate(
                forceAuth);
            }

            authenticationPromise
              .then(_authorize)
              .then(function () {
                userState._setIsRiseAuthUser(isRiseAuthUser);
                authenticateDeferred.resolve();
              })
              .then(null, function (err) {
                if (_state.redirectDetected) {
                  $log.error("Authentication Error from Redirect: ", err);

                  delete _state.redirectDetected;
                } else {
                  $log.debug("Authentication Error: ", err);
                }
                _resetUserState();

                authenticateDeferred.reject(err);
              })
              .finally(function () {
                _addEventListenerVisibilityAPI();

                $loading.stopGlobal("risevision.user.authenticate");

                _logPageLoad("authenticated user");
              });
          };
          // pre-load gapi to prevent popup blocker issues
          auth2APILoader().finally(_proceed);

          if (forceAuth) {
            $loading.startGlobal("risevision.user.authenticate");
          }

          return authenticateDeferred.promise;
        };

        var signOut = function (signOutGoogle) {
          return auth2APILoader().then(function (auth2) {
            if (!userState.isRiseAuthUser()) {
              if (signOutGoogle) {
                $window.logoutFrame.location =
                  "https://accounts.google.com/Logout";
              }

              auth2.getAuthInstance().signOut();
            }

            _authenticateDeferred = null;

            // The flag the indicates a user is potentially
            // authenticated already, must be destroyed.
            _resetUserState();

            //call google api to sign out
            $rootScope.$broadcast("risevision.user.signedOut");
            $log.debug("User is signed out.");
          });
        };

        var userAuthFactory = {
          authenticate: authenticate,
          authenticatePopup: function () {
            return authenticate(true);
          },
          signOut: signOut,
          addEventListenerVisibilityAPI: _addEventListenerVisibilityAPI,
          removeEventListenerVisibilityAPI: _removeEventListenerVisibilityAPI,
        };

        return userAuthFactory;
      }
    ]);

})(angular);

(function () {
  "use strict";

  angular.module("risevision.common.components.userstate")
    .service("userauth", ["$q", "$log", "riseAPILoader",
      function ($q, $log, riseAPILoader) {

        var service = {
          add: function (username, password) {
            var deferred = $q.defer();

            var obj = {
              "username": username,
              "password": password
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.add(obj);
            })
              .then(function (resp) {
                $log.debug("added user credentials", resp);
                deferred.resolve(resp.result);
              })
              .then(null, function (e) {
                console.error("Failed to add credentials.", e);
                deferred.reject(e);
              });
            return deferred.promise;
          },
          updatePassword: function (username, oldPassword, newPassword) {
            var deferred = $q.defer();

            var obj = {
              "username": username,
              "oldPassword": oldPassword,
              "newPassword": newPassword
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.updatePassword(obj);
            })
              .then(function (resp) {
                $log.debug("update user credentials resp", resp);
                deferred.resolve(resp.result);
              })
              .then(null, function (e) {
                console.error("Failed to update credentials.", e);
                deferred.reject(e);
              });

            return deferred.promise;
          },
          login: function (username, password) {
            var deferred = $q.defer();

            var obj = {
              "username": username,
              "password": password
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.login(obj);
            })
              .then(function (resp) {
                $log.debug("login successful", resp);
                deferred.resolve(resp);
              })
              .then(null, function (e) {
                console.error("Failed to login user.", e);
                deferred.reject(e);
              });

            return deferred.promise;
          },
          refreshToken: function (username, token) {
            var deferred = $q.defer();

            var obj = {
              "username": username,
              "token": token
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.refreshToken(obj);
            })
              .then(function (resp) {
                $log.debug("token refresh successful", resp);
                deferred.resolve(resp);
              })
              .then(null, function (e) {
                console.error("Failed to refresh token.", e);
                deferred.reject(e);
              });

            return deferred.promise;
          },
          confirmUserCreation: function (username, userConfirmedToken) {
            var deferred = $q.defer();

            var obj = {
              "username": username,
              "userConfirmedToken": userConfirmedToken
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.confirmUserCreation(obj);
            })
              .then(function (resp) {
                $log.debug("Confirm user creation successful", resp);
                deferred.resolve(resp);
              })
              .then(null, function (e) {
                console.error("Failed to confirm user creation.", e);
                deferred.reject(e);
              });

            return deferred.promise;
          },
          requestConfirmationEmail: function (username) {
            var deferred = $q.defer();

            var obj = {
              "username": username
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.requestConfirmationEmail(obj);
            })
              .then(function (resp) {
                $log.debug("Request confirmation email successful",
                  resp);
                deferred.resolve(resp);
              })
              .then(null, function (e) {
                console.error("Failed to request confirmation email.",
                  e);
                deferred.reject(e);
              });

            return deferred.promise;
          },
          requestPasswordReset: function (username) {
            var deferred = $q.defer();

            var obj = {
              "username": username
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.requestPasswordReset(obj);
            })
              .then(function (resp) {
                $log.debug("Request password reset successful", resp);
                deferred.resolve(resp);
              })
              .then(null, function (e) {
                console.error("Failed to request password reset.", e);
                deferred.reject(e);
              });

            return deferred.promise;
          },
          resetPassword: function (username, passwordResetToken,
            newPassword) {
            var deferred = $q.defer();

            var obj = {
              "username": username,
              "passwordResetToken": passwordResetToken,
              "newPassword": newPassword
            };
            riseAPILoader().then(function (coreApi) {
              return coreApi.userauth.resetPassword(obj);
            })
              .then(function (resp) {
                $log.debug("Reset password successful", resp);
                deferred.resolve(resp);
              })
              .then(null, function (e) {
                console.error("Failed to reset password.", e);
                deferred.reject(e);
              });

            return deferred.promise;
          }
        };

        return service;
      }
    ]);
})();

(function (angular) {
  "use strict";

  angular.module("risevision.common.components.userstate")
  // constants (you can override them in your app as needed)
  .value("PROFILE_PICTURE_URL",
    "https://www.gravatar.com/avatar/{emailMD5}?d=mm")
    .factory("userState", [
      "$q", "$rootScope", "$window", "$log", "$location", "userInfoCache",
      "getUserProfile", "companyState", "objectHelper",
      "localStorageService", "rvTokenStore", "md5", "PROFILE_PICTURE_URL",
      function ($q, $rootScope, $window, $log, $location, userInfoCache,
        getUserProfile, companyState, objectHelper,
        localStorageService, rvTokenStore, md5, PROFILE_PICTURE_URL) {
        //singleton factory that represents userState throughout application

        var _state = {
          profile: {}, //Rise vision profile
          user: {}, //Google user
          roleMap: {},
          userToken: rvTokenStore.read(),
          inRVAFrame: angular.isDefined($location.search().inRVA),
          isRiseAuthUser: false
        };

        var refreshProfile = function () {
          var deferred = $q.defer();

          //populate profile if the current user is a rise vision user
          getUserProfile(_state.user.username, true)
            .then(function (profile) {
              userState.updateUserProfile(profile);

              //populate company info
              return companyState.init();
            })
            .then(function () {
              deferred.resolve();
            }, deferred.reject);

          return deferred.promise;
        };

        var isLoggedIn = function () {
          if (!_state.user.username) {
            return false;
          } else {
            return true;
          }
        };

        var isRiseVisionUser = function () {
          return _state.profile.username !== null &&
            _state.profile.username !== undefined;
        };

        var hasRole = function (role) {
          return angular.isDefined(_state.roleMap[role]);
        };

        var getAccessToken = function () {
          return $window.gapi && $window.gapi.auth ?
            $window.gapi.auth.getToken() : null;
        };

        var _restoreState = function () {
          var sFromStorage = localStorageService.get(
            "risevision.common.userState");
          if (sFromStorage) {
            angular.extend(_state, sFromStorage);
            localStorageService.remove("risevision.common.userState"); //clear
            $log.debug("userState restored with", sFromStorage);

            _state.redirectDetected = true;
          }
        };

        var _resetState = function () {
          userInfoCache.removeAll();

          objectHelper.clearObj(_state.user);
          objectHelper.clearObj(_state.profile);
          _state.roleMap = {};

          companyState.resetCompanyState();
          $log.debug("User state has been reset.");
        };

        var _getEmailMD5 = function () {
          var emailHash = userState.getUsername() && md5.createHash(
            userState.getUsername());
          var gravatarId = emailHash || "0";
          return PROFILE_PICTURE_URL.replace("{emailMD5}", gravatarId);
        };

        var userState = {
          // user getters
          getUsername: function () {
            return (_state.user && _state.user.username) || null;
          },
          getUserFullName: function () {
            var firstName = (_state.profile && _state.profile.firstName) || "";
            var lastName = (_state.profile && _state.profile.lastName) || "";

            return (firstName + " " + lastName).trim();
          },
          getUserEmail: function () {
            return _state.profile.email;
          },
          getCopyOfProfile: function (noFollow) {
            if (noFollow) {
              return angular.extend({}, _state.profile);
            } else {
              return objectHelper.follow(_state.profile);
            }
          },
          getUserPicture: function () {
            return _state.user.picture || _getEmailMD5();
          },
          hasRole: hasRole,
          inRVAFrame: function () {
            return _state.inRVAFrame;
          },
          isRiseAdmin: function () {
            return hasRole("sa") && companyState.isRootCompany();
          },
          isRiseStoreAdmin: function () {
            return hasRole("ba") && companyState.isRootCompany();
          },
          isUserAdmin: function () {
            return hasRole("ua");
          },
          isPurchaser: function () {
            return hasRole("pu");
          },
          isRiseAuthUser: function () {
            return _state.isRiseAuthUser;
          },
          isSeller: companyState.isSeller,
          isRiseVisionUser: isRiseVisionUser,
          isLoggedIn: isLoggedIn,
          getAccessToken: getAccessToken,
          // user functions
          checkUsername: function (username) {
            return (username || false) &&
              (userState.getUsername() || false) &&
              username.toUpperCase() === userState.getUsername().toUpperCase();
          },
          updateUserProfile: function (user) {
            if (userState.checkUsername(user.username)) {
              objectHelper.clearAndCopy(angular.extend({
                username: _state.user.username
              }, user), _state.profile);

              //set role map
              _state.roleMap = {};
              if (_state.profile.roles) {
                _state.profile.roles.forEach(function (val) {
                  _state.roleMap[val] = true;
                });
              }

              $rootScope.$broadcast("risevision.user.updated");
            }
          },
          refreshProfile: refreshProfile,
          // company getters
          getUserCompanyId: companyState.getUserCompanyId,
          getUserCompanyName: companyState.getUserCompanyName,
          getSelectedCompanyId: companyState.getSelectedCompanyId,
          getSelectedCompanyName: companyState.getSelectedCompanyName,
          getSelectedCompanyCountry: companyState.getSelectedCompanyCountry,
          getCopyOfUserCompany: companyState.getCopyOfUserCompany,
          getCopyOfSelectedCompany: companyState.getCopyOfSelectedCompany,
          isSubcompanySelected: companyState.isSubcompanySelected,
          isTestCompanySelected: companyState.isTestCompanySelected,
          isRootCompany: companyState.isRootCompany,
          isSelectedCompanyChargebee: companyState.isSelectedCompanyChargebee,
          // company functions
          updateCompanySettings: companyState.updateCompanySettings,
          updateUserCompanySettings: companyState.updateUserCompanySettings,
          resetCompany: companyState.resetCompany,
          switchCompany: companyState.switchCompany,
          reloadSelectedCompany: companyState.reloadSelectedCompany,
          // private
          _restoreState: _restoreState,
          _resetState: _resetState,
          _setUserToken: function (params) {
            // save params in state in case of redirect
            _state.params = params;

            // set fake user token to idicate user is logged in
            _state.userToken = "dummy";
          },
          _persistState: function () {
            // persist user state
            localStorageService.set("risevision.common.userState",
              _state);
          },
          _state: _state,
          _setIsRiseAuthUser: function (isRiseAuthUser) {
            _state.isRiseAuthUser = isRiseAuthUser;
          }
        };

        return userState;
      }
    ]);

})(angular);

"use strict";

angular.module("risevision.common.components.userstate")
  .directive("confirmPasswordValidator", [

    function () {
      return {
        require: "ngModel",
        restrict: "A",
        scope: {
          confirmPasswordValidator: "="
        },
        link: function (scope, elem, attr, ngModel) {
          var validator = function (value) {
            if (!value || !scope.confirmPasswordValidator ||
              value === scope.confirmPasswordValidator) {
              ngModel.$setValidity("passwordMatch", true);
            } else {
              ngModel.$setValidity("passwordMatch", false);
            }

            return value;
          };

          ngModel.$parsers.unshift(validator);
          ngModel.$formatters.unshift(validator);
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.userstate")
  .controller("ConfirmAccountCtrl", ["$scope", "$loading", "$log", "$state",
    "$stateParams", "userauth",
    function ($scope, $loading, $log, $state, $stateParams, userauth) {
      $loading.startGlobal("auth-confirm-account");

      userauth.confirmUserCreation($stateParams.user, $stateParams.token)
        .then(function () {
          $log.log("User confirmed");
        })
        .catch(function (err) {
          console.error(err);
        })
        .finally(function () {
          $loading.stopGlobal("auth-confirm-account");
          $state.go("common.auth.unauthorized", {
            accountConfirmed: true
          });
        });
    }
  ]);

"use strict";

angular.module("risevision.common.components.userstate")
  .controller("LoginCtrl", ["$scope", "$loading", "$stateParams",
    "$state", "userAuthFactory", "customAuthFactory", "uiFlowManager",
    "urlStateService", "userState", "FORCE_GOOGLE_AUTH",
    function ($scope, $loading, $stateParams, $state, userAuthFactory,
      customAuthFactory, uiFlowManager, urlStateService, userState,
      FORCE_GOOGLE_AUTH) {
      $scope.forms = {};
      $scope.credentials = {};
      $scope.messages = {};
      $scope.errors = {};
      $scope.FORCE_GOOGLE_AUTH = FORCE_GOOGLE_AUTH;

      $scope.isSignUp = $stateParams.isSignUp;
      $scope.joinAccount = $stateParams.joinAccount;
      $scope.companyName = $stateParams.companyName;
      $scope.messages.passwordReset = $stateParams.passwordReset;
      $scope.messages.accountConfirmed = $stateParams.accountConfirmed;

      $scope.googleLogin = function (endStatus) {
        $loading.startGlobal("auth-buttons-login");
        userAuthFactory.authenticate(true)
          .finally(function () {
            $loading.stopGlobal("auth-buttons-login");
            uiFlowManager.invalidateStatus(endStatus);
          });
      };

      $scope.customLogin = function (endStatus) {
        $scope.errors = {};
        $scope.messages = {};

        if ($scope.forms.loginForm.$valid) {
          $loading.startGlobal("auth-buttons-login");
          userAuthFactory.authenticate(true, $scope.credentials)
            .then(function () {
              urlStateService.redirectToState($stateParams.state);
            })
            .catch(function (err) {
              if (err.status === 400) {
                $scope.messages.isGoogleAccount = true;
              } else if (err.status === 409) {
                $scope.errors.unconfirmedError = true;
              } else { // No special case for 404, for security reasons
                console.error(err);
                $scope.errors.loginError = true;
              }
            })
            .finally(function () {
              $loading.stopGlobal("auth-buttons-login");
              uiFlowManager.invalidateStatus(endStatus);
            });
        }
      };

      $scope.createAccount = function (endStatus) {
        $scope.errors = {};
        $scope.messages = {};

        if ($scope.forms.loginForm.$valid) {
          $loading.startGlobal("auth-buttons-login");

          customAuthFactory.addUser($scope.credentials)
            .then(function () {
              $scope.errors.confirmationRequired = true;
            })
            .then(null, function () {
              $scope.errors.duplicateError = true;
            })
            .finally(function () {
              $loading.stopGlobal("auth-buttons-login");
              uiFlowManager.invalidateStatus(endStatus);
            });
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.userstate")
  .controller("RequestConfirmationEmailCtrl", ["$scope", "$loading", "$log",
    "userauth",
    function ($scope, $loading, $log, userauth) {
      $scope.forms = {};
      $scope.credentials = {};
      $scope.emailSent = false;
      $scope.isGoogleAccount = false;
      $scope.emailAlreadyConfirmed = false;

      $scope.requestConfirmationEmail = function () {
        $scope.emailSent = false;
        $scope.isGoogleAccount = false;
        $scope.emailAlreadyConfirmed = false;
        $loading.startGlobal("auth-request-confirmation-email");

        userauth.requestConfirmationEmail($scope.credentials.username)
          .then(function () {
            $log.log("Confirmation email request sent");
            $scope.emailSent = true;
          })
          .catch(function (err) {
            if (err.status === 400) {
              $log.log("Requested confirmation email for Google account");
              $scope.isGoogleAccount = true;
            } else if (err.status === 409) {
              $log.log(
                "Requested confirmation email for already confirmed account"
              );
              $scope.emailAlreadyConfirmed = true;
            } else { // No special case for 404, for security reasons
              console.error(err);
              $scope.emailSent = true;
            }
          })
          .finally(function () {
            $loading.stopGlobal("auth-request-confirmation-email");
          });
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.userstate")
  .controller("RequestPasswordResetCtrl", ["$scope", "$loading", "$log",
    "userauth",
    function ($scope, $loading, $log, userauth) {
      $scope.forms = {};
      $scope.credentials = {};
      $scope.errors = {};
      $scope.emailSent = false;
      $scope.isGoogleAccount = false;

      $scope.requestPasswordReset = function () {
        $scope.emailSent = false;
        $scope.isGoogleAccount = false;
        $loading.startGlobal("auth-request-password-reset");

        userauth.requestPasswordReset($scope.credentials.username)
          .then(function () {
            $log.log("Reset password request sent");
            $scope.emailSent = true;
          })
          .catch(function (err) {
            if (err.status === 400) {
              $log.log("Requested password reset for Google account");
              $scope.isGoogleAccount = true;
            } else { // No special case for 404, for security reasons
              console.error(err);
              $scope.emailSent = true;
            }
          })
          .finally(function () {
            $loading.stopGlobal("auth-request-password-reset");
          });
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.userstate")
  .controller("ResetPasswordConfirmCtrl", ["$scope", "$loading", "$log",
    "$state", "$stateParams", "userauth",
    function ($scope, $loading, $log, $state, $stateParams, userauth) {
      $scope.forms = {};
      $scope.credentials = {};
      $scope.errors = {};

      function _resetErrorStates() {
        $scope.emailResetSent = false;
        $scope.invalidToken = false;
      }

      $scope.resetPassword = function () {
        _resetErrorStates();

        if ($scope.forms.resetPasswordForm.$valid) {
          $loading.startGlobal("auth-reset-password");
          userauth.resetPassword($stateParams.user, $stateParams.token, $scope.credentials
            .newPassword)
            .then(function () {
              $log.log("Password updated");
              $state.go("common.auth.unauthorized", {
                passwordReset: true
              });
            })
            .catch(function (err) {
              var error = err.result && err.result.error && err.result.error.message;

              if (error === "Password reset token does not match") {
                $scope.invalidToken = true;
              } else {
                console.error(err);
              }
            })
            .finally(function () {
              $loading.stopGlobal("auth-reset-password");
            });
        }
      };

      $scope.requestPasswordReset = function () {
        _resetErrorStates();

        $loading.startGlobal("auth-request-password-reset");
        userauth.requestPasswordReset($stateParams.user)
          .then(function () {
            $log.log("Email sent");
            $scope.emailResetSent = true;
          })
          .catch(function (err) {
            console.error(err);
          })
          .finally(function () {
            $loading.stopGlobal("auth-request-password-reset");
          });
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/auth-common.html',
    '<div class="app-launcher-login"><div class="container"><div class="panel"><div class="row"><div class="col-sm-6 col-xs-12"><div class="rise-logo"><img src="https://s3.amazonaws.com/Rise-Images/Website/rise-logo.svg"></div></div><div class="col-sm-6 col-xs-12"><div ui-view=""></div></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/auth-form.html',
    '<form id="forms.loginForm" name="forms.loginForm" role="form" novalidate=""><div><div class="panel-body bg-danger u_margin-sm-top" ng-show="errors.duplicateError"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span id="already-registered-warning">This email address is already registered. You can <a ui-sref="common.auth.unauthorized">sign in</a> with this address.</span></p></div><div class="panel-body bg-danger u_margin-sm-top" ng-show="errors.loginError"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span id="incorrect-credentials-error">Your email address/password combination is incorrect.<br>If you are having problems signing in, please check this <a href="https://help.risevision.com/hc/en-us/articles/115001402743-I-am-having-trouble-logging-in-what-can-I-do-" target="_blank">Help Center article</a>.</span></p></div><div class="panel-body bg-info u_margin-sm-top" ng-show="errors.unconfirmedError"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>Your email address has not been confirmed.<br><a ui-sref="common.auth.requestconfirmationemail">Resend Email Confirmation</a></span></p></div><div class="panel-body bg-info u_margin-sm-top" ng-show="errors.confirmationRequired"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>We\'ve sent a confirmation email to {{credentials.username}}.<br>Please check your inbox to complete your account registration.</span></p></div><div class="panel-body bg-info u_margin-sm-top" ng-show="messages.passwordReset"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>Password successfully updated.<br>Please sign in to proceed.</span></p></div><div class="panel-body bg-info u_margin-sm-top" ng-show="messages.accountConfirmed"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>Account successfully confirmed.<br>Please sign in to proceed.</span></p></div><div class="panel-body bg-danger u_margin-sm-top" ng-show="messages.isGoogleAccount"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>This account is authenticated by Google.<br>Please, use the \'Sign in with Google\' button.</span></p></div></div><div class="u_margin-sm-top" ng-show="!errors.confirmationRequired"><div class="form-group" ng-class="{\'has-error\': (forms.loginForm.$submitted && forms.loginForm.username.$invalid)}" show-errors=""><label class="control-label">Email</label> <input type="email" class="form-control" placeholder="Enter Your Email Address" id="username" name="username" ng-model="credentials.username" required="" focus-me="true" autocomplete="email"><p class="text-danger" ng-show="forms.loginForm.$submitted && forms.loginForm.username.$invalid">Please enter an Email</p></div><div class="form-group" ng-class="{\'has-error\': (forms.loginForm.$submitted && forms.loginForm.password.$invalid && isSignUp), \'has-message\': forms.loginForm.password.$valid && isSignUp}" show-errors=""><label class="control-label">{{ isSignUp ? \'Create \' : \'\'}}Password</label> <input type="password" class="form-control" placeholder="Enter Password" id="password" name="password" ng-model="credentials.password" required="" minlength="4"><p class="text-danger" ng-show="forms.loginForm.$submitted && forms.loginForm.password.$error.minlength && isSignUp">New Password must be at least 4 characters long.</p><p class="text-warning" ng-show="forms.loginForm.password.$valid && isSignUp">A strong password is at least 8 characters, includes uppercase/lowercase letters, and one or more numbers.</p></div><div class="form-group" ng-class="{ \'has-error\' : (forms.loginForm.$submitted && forms.loginForm.confirmPassword.$invalid) }" ng-if="isSignUp"><label class="control-label" for="confirm-password">Confirm Password</label> <input id="confirmPassword" type="password" name="confirmPassword" class="form-control" placeholder="Re-type Password" ng-model="credentials.confirmPassword" required="" confirm-password-validator="credentials.password"><p ng-show="forms.loginForm.$submitted && forms.loginForm.confirmPassword.$error.required" class="text-danger">Confirm Password is required.</p><p ng-show="forms.loginForm.$submitted && forms.loginForm.confirmPassword.$error.passwordMatch" class="text-danger">New Password and Confirm Password must match.</p></div></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/create-account.html',
    '<div ng-if="!joinAccount"><h1 class="u_remove-top">Get Started For Free</h1><p class="lead text-muted">No credit card or commitment required.</p></div><div ng-if="joinAccount"><h1 class="u_remove-top">Join Your Company</h1><p class="lead text-muted">Complete your account <span ng-if="!companyName">registration</span><span ng-if="companyName">with {{companyName}}</span>.</p></div><div class="col-xs-12 col-md-8" ng-show="!errors.confirmationRequired"><button class="btn btn-google-auth btn-hg" id="sign-up-google-link" ng-click="googleLogin(\'registrationComplete\')"><span><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"> Sign up with Google</span></button></div><div class="section-divider col-xs-12 col-md-8 u_margin-md-top" ng-show="!errors.confirmationRequired" ng-if="!FORCE_GOOGLE_AUTH"><div></div><span>OR</span><div></div></div><div class="col-md-8 col-xs-12" ng-if="!FORCE_GOOGLE_AUTH"><div ng-include="\'userstate/auth-form.html\'"></div><div class="form-group" ng-show="!errors.confirmationRequired"><button id="sign-up-button" class="btn btn-primary btn-hg" type="submit" form="forms.loginForm" ng-click="createAccount(\'registrationComplete\')"><span translate="Sign Up"></span></button></div></div><br><div class="col-xs-12 u_margin-lg-top"><p class="text-muted">Already have an account? <a id="sign-in-link" ui-sref="common.auth.unauthorized">Sign in</a></p></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/login.html',
    '<h1 class="u_remove-top">Sign In</h1><p class="lead text-muted">to your Rise Vision account</p><div class="col-xs-12 col-md-8"><button class="btn btn-google-auth btn-hg" id="sign-in-google-link" ng-click="googleLogin(\'registrationComplete\')"><span><img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"> Sign in with Google</span></button></div><div class="section-divider col-xs-12 col-md-8 u_margin-md-top" ng-if="!FORCE_GOOGLE_AUTH"><div></div><span>OR</span><div></div></div><div class="col-md-8 col-xs-12" ng-if="!FORCE_GOOGLE_AUTH"><div ng-include="\'userstate/auth-form.html\'"></div><div class="form-group"><button id="sign-in-button" class="btn btn-primary btn-hg" type="submit" form="forms.loginForm" ng-click="customLogin(\'registrationComplete\')"><span translate="Sign In"></span></button></div></div><br><div class="col-xs-12 u_margin-lg-top"><p class="text-muted" ng-if="!FORCE_GOOGLE_AUTH"><a id="reset-password-link" ui-sref="common.auth.requestpasswordreset">Forgot your password?</a></p><p class="text-muted">Don\'t have an account? <a id="sign-up-link" ui-sref="common.auth.createaccount">Sign up</a></p></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/request-confirmation-email.html',
    '<h1 class="u_remove-top">Send Confirmation Email</h1><div class="col-xs-12 col-md-8"><div class="panel-body bg-info u_margin-lg-top" ng-show="emailSent"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>We\'ve sent a confirmation email to {{credentials.username}}.<br>Please check your inbox to complete your account registration.<br></span></p></div><div class="panel-body bg-info u_margin-lg-top" ng-show="emailAlreadyConfirmed"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>The {{credentials.username}} account is already confirmed.</span></p></div><div class="panel-body bg-danger u_margin-lg-top" ng-show="isGoogleAccount"><p class="u_remove-bottom"><span><i class="fa fa-warning icon-left"></i> This account is authenticated by Google.<br><p class="text-muted">You can <a id="sign-in-link" ui-sref="common.auth.unauthorized">Sign in with Google</a> in our login page.</p></span></p></div></div><form id="confirmationEmailForm" role="form" name="forms.confirmationEmailForm" novalidate="" ng-show="!emailSent"><div class="col-md-8 col-xs-12 u_margin-md-top"><div class="form-group" ng-class="{\'has-error\': (forms.confirmationEmailForm.$submitted && forms.confirmationEmailForm.username.$invalid)}" show-errors=""><label class="control-label">Email</label> <input type="text" class="form-control" name="username" ng-model="credentials.username" required="" focus-me="true"><p class="text-danger" ng-show="forms.confirmationEmailForm.$submitted && forms.confirmationEmailForm.username.$invalid">Please enter an Email</p></div><button class="btn btn-primary btn-hg" ng-disabled="forms.confirmationEmailForm.$invalid" ng-click="requestConfirmationEmail()">Send Confirmation Email</button></div></form><br><div class="col-xs-12 u_margin-lg-top"><p class="text-muted"><a id="sign-in-link" ui-sref="common.auth.unauthorized">Sign in</a> to your account instead.</p></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/request-password-reset.html',
    '<h1 class="u_remove-top">Password Reset</h1><div class="col-xs-12 col-md-8"><div class="panel-body bg-info u_margin-lg-top" ng-show="emailSent"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>An email with password reset instructions has been sent to your email inbox (if it exists in our system).</span></p></div><div class="panel-body bg-danger u_margin-lg-top" ng-show="isGoogleAccount"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>This account is authenticated by Google.<br><a href="https://myaccount.google.com/security#signin" target="_blank">Change your password on your Google account.</a></span></p></div></div><form id="requestResetForm" role="form" name="forms.requestResetForm" novalidate="" ng-show="!emailSent"><div class="col-md-8 col-xs-12 u_margin-md-top"><div class="form-group" ng-class="{\'has-error\': (forms.requestResetForm.$submitted && forms.requestResetForm.username.$invalid)}" show-errors=""><label class="control-label">Email</label> <input type="text" class="form-control" name="username" ng-model="credentials.username" required="" focus-me="true"><p class="text-danger" ng-show="forms.requestResetForm.$submitted && forms.requestResetForm.username.$invalid">Please enter an Email</p></div><button class="btn btn-primary btn-hg" ng-disabled="forms.requestResetForm.$invalid" ng-click="requestPasswordReset()">Reset Password</button></div></form><br><div class="col-xs-12 u_margin-lg-top"><p class="text-muted"><a id="sign-in-link" ui-sref="common.auth.unauthorized">Sign in</a> to your account instead.</p></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/reset-password-confirm.html',
    '<h1 class="u_remove-top">Password Confirmation</h1><div><div class="panel-body bg-info u_margin-lg-top" ng-show="emailResetSent"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>An email with password reset instructions has been sent to your email inbox.</span></p></div><div class="panel-body bg-danger u_margin-lg-top" ng-show="invalidToken"><p class="u_remove-bottom"><i class="fa fa-warning icon-left"></i> <span>The password reset token is not valid. <a href="#" ng-click="requestPasswordReset()">Request Password Reset</a></span></p></div></div><form id="forms.resetPasswordForm" role="form" name="forms.resetPasswordForm" novalidate="" ng-show="!emailResetSent"><div class="col-md-8 col-xs-12 u_margin-md-top"><div class="form-group" ng-class="{\'has-error\': (forms.resetPasswordForm.$submitted && forms.resetPasswordForm.newPassword.$invalid)}" show-errors=""><label class="control-label">New Password</label> <input type="password" class="form-control" name="newPassword" id="newPassword" ng-model="credentials.newPassword" required="" minlength="4" focus-me="true"><p class="text-danger" ng-show="forms.resetPasswordForm.$submitted && forms.resetPasswordForm.newPassword.$error.minlength">New Password must be at least 4 characters long.</p><p class="text-warning" ng-show="forms.resetPasswordForm.newPassword.$valid">A strong password is at least 8 characters, includes uppercase/lowercase letters, and one or more numbers.</p></div><div class="form-group" ng-class="{\'has-error\': (forms.resetPasswordForm.$submitted && forms.resetPasswordForm.confirmPassword.$invalid)}" show-errors=""><label class="control-label">Confirm Password</label> <input type="password" class="form-control" name="confirmPassword" id="confirmPassword" ng-model="credentials.confirmPassword" required="" confirm-password-validator="credentials.newPassword"><p ng-show="forms.resetPasswordForm.$submitted && forms.resetPasswordForm.confirmPassword.$error.required" class="text-danger">Confirm Password is required.</p><p ng-show="forms.resetPasswordForm.$submitted && forms.resetPasswordForm.confirmPassword.$error.passwordMatch" class="text-danger">New Password and Confirm Password must match.</p></div><button id="resetPasswordButton" type="submit" form="forms.resetPasswordForm" class="btn btn-primary btn-hg" ng-click="resetPassword()">Update Password</button></div></form>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.userstate');
} catch (e) {
  module = angular.module('risevision.common.components.userstate', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userstate/unsubscribe.html',
    '<div class="alert alert-warning col-xs-12 u_margin-md-top"><strong>{{email}}</strong> has been unsubscribed from monitoring the Display <strong>\'{{name}}\'</strong>. (Display ID: {{id}})</div><a id="reset-password-link" href="/">Sign in to your Rise Vision account</a><p></p>');
}]);
})();

(function () {
  "use strict";

  angular.module("risevision.common.components.last-modified", [])
    .directive("lastModified", ["$templateCache",
      function ($templateCache) {
        return {
          restrict: "E",
          scope: {
            changeDate: "=",
            changedBy: "="
          },
          template: $templateCache.get("last-modified/last-modified.html"),
          link: function ($scope) {
            $scope.$watch("changedBy", function (newVal) {
              $scope.changedBy = newVal ? newVal : "N/A";
            });
          } //link()
        };
      }
    ]);
}());

(function () {
  "use strict";

  // Simple filter that removes the domain from an email
  // for example, bld@riseholdings.com would return bld
  angular.module("risevision.common.components.last-modified")
    .filter("username", function () {
      return function (email) {
        var username = email;
        if (email && email.indexOf("@") !== -1) {
          username = email.substring(0, email.indexOf("@"));
        }
        return username;
      };
    });
}());

(function(module) {
try {
  module = angular.module('risevision.common.components.last-modified');
} catch (e) {
  module = angular.module('risevision.common.components.last-modified', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('last-modified/last-modified.html',
    '<span class="text-muted"><small>Saved {{changeDate | date:\'d-MMM-yyyy h:mm a\'}} by {{changedBy | username}}</small></span>');
}]);
})();

"use strict";

angular.module("risevision.common.components.loading", ["angularSpinner"])
  .value("_rvGlobalSpinnerRegistry", []);

"use strict";

angular.module("risevision.common.components.loading")
  .service("$loading", ["$q", "$rootScope", "$document",
    "_rvGlobalSpinnerRegistry",
    function ($q, $rootScope, $document, _rvGlobalSpinnerRegistry) {
      var self = this;

      this.start = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        for (var i = 0; i < spinnerKeys.length; i++) {
          $rootScope.$broadcast("rv-spinner:start", spinnerKeys[i]);
        }
      };

      this.stop = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        for (var i = 0; i < spinnerKeys.length; i++) {
          $rootScope.$broadcast("rv-spinner:stop", spinnerKeys[i]);
        }
      };

      /* Global Spinner */
      //append global spinner
      if ($document && $document[0]) {
        angular.element($document[0].body).append(
          "<div rv-global-spinner class=\"ng-hide\" style=\"position: fixed; width: 100%; height: 100%; top: 0; left: 0; z-index: 1040; \"></div>"
        );
      }

      function _addKeyToRegistry(key) {
        if (_rvGlobalSpinnerRegistry.indexOf(key) < 0) {
          _rvGlobalSpinnerRegistry.push(key);
        }
      }

      function _removeKeyFromRegistry(key) {
        var index;
        if ((index = _rvGlobalSpinnerRegistry.indexOf(key)) >= 0) {
          _rvGlobalSpinnerRegistry.splice(index, 1);
        }
      }

      this.startGlobal = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        angular.forEach(spinnerKeys, function (key) {
          _addKeyToRegistry(key);
        });
      };

      this.stopGlobal = function (spinnerKeys) {
        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];
        angular.forEach(spinnerKeys, function (key) {
          _removeKeyFromRegistry(key);
        });
      };

      this.stopSpinnerAfterPromise = function (spinnerKeys, promises) {

        spinnerKeys = angular.isArray(spinnerKeys) ? spinnerKeys : [
          spinnerKeys
        ];

        var stop = function () {
          for (var i = 0; i < spinnerKeys.length; i++) {
            $rootScope.$broadcast("rv-spinner:stop", spinnerKeys[i]);
          }
        };

        var promise = angular.isArray(promises) ? $q.all(promises) : promises;
        promise.then(function () {
          stop();
        }, function () {
          stop();
        });
      };

      this.getDefaultSpinnerOptions = function () {
        return self.defaultSpinnerOptions;
      };

      this.defaultSpinnerOptions = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: "#555", // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: "spinner", // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: "50%", // Top position relative to parent in px
        left: "50%" // Left position relative to parent in px
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.loading")
  .directive("rvGlobalSpinner", ["usSpinnerService", "$compile",
    "_rvGlobalSpinnerRegistry",
    "$timeout", "$rootScope",
    function (usSpinnerService, $compile, _rvGlobalSpinnerRegistry, $timeout,
      $rootScope) {
      return {
        scope: true,
        link: function (scope, $element) {

          var tpl = "<div ng-show=\"active\" class=\"spinner-backdrop fade\"" +
            " ng-class=\"{in: active}\" us-spinner=\"rvSpinnerOptions\"" +
            " spinner-key=\"_rv-global-spinner\" ng-focus=\"spinnerFocused()\"></div>";
          $element.prepend($compile(tpl)(scope));

          scope.rvSpinnerOptions = {
            lines: 13, // The number of lines to draw
            length: 20, // The length of each line
            width: 10, // The line thickness
            radius: 30, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            color: "#555", // #rgb or #rrggbb or array of colors
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: "spinner", // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: "50%", // Top position relative to parent in px
            left: "50%" // Left position relative to parent in px
          };

          scope.registry = _rvGlobalSpinnerRegistry;

          scope.$watchCollection("registry", function () {
            if (scope.registry.length > 0) {
              scope.active = true;
            } else {
              scope.active = false;
            }
          });

          scope.$watch("active", function (active) {
            if (active) {
              $element.removeClass("ng-hide");
            } else {
              $element.addClass("ng-hide");
            }
          });

          //to be used if user has closed Google authentication popup dialog
          //without completing the registration process

          scope.spinnerFocused = function () {
            $rootScope.$broadcast("rv-spinner:global:focused");
          };

          $timeout(function () {
            usSpinnerService.spin("_rv-global-spinner");
          });
          scope.active = true;

        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.loading")
  .directive("rvSpinner", ["usSpinnerService", "$compile",
    function (usSpinnerService, $compile) {
      return {
        scope: {
          backdropClass: "@rvSpinnerBackdropClass",
          rvSpinnerKey: "@rvSpinnerKey",
          rvSpinnerStartActive: "=?rvSpinnerStartActive",
          rvSpinnerOptions: "=rvSpinner"
        },
        link: function postLink(scope, $element, iAttrs) {
          scope.active = angular.isDefined(iAttrs.rvSpinnerStartActive) &&
            iAttrs.rvSpinnerStartActive === "1";
          var tpl =
            "<div ng-show=\"active\" class=\"spinner-backdrop fade {{backdropClass}}\"" +
            " ng-class=\"{in: active}\" us-spinner=\"rvSpinnerOptions\"" +
            " spinner-key=\"{{rvSpinnerKey}}\"";

          if (iAttrs.rvSpinnerStartActive && iAttrs.rvSpinnerStartActive ===
            "1") {
            tpl += " spinner-start-active=\"1\"></div>";
          } else {
            tpl += "></div>";
          }

          $element.prepend($compile(tpl)(scope));

          scope.$on("rv-spinner:start", function (event, key) {
            if (key === scope.rvSpinnerKey) {
              usSpinnerService.spin(key);
              scope.active = true;
            }
          });

          scope.$on("rv-spinner:stop", function (event, key) {
            if (key === scope.rvSpinnerKey) {
              usSpinnerService.stop(key);
              scope.active = false;
            }
          });
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.search-filter", [])
  .directive("searchFilter", ["$timeout",
    function ($timeout) {

      return {
        restrict: "E",
        scope: {
          filterConfig: "=",
          search: "=",
          doSearch: "="
        },
        templateUrl: "search-filter/search-filter.html",
        link: function ($scope) {
          $scope.delay = (function () {
            var promise = null;
            return function (callback, ms) {
              $timeout.cancel(promise); //clearTimeout(timer);
              promise = $timeout(callback, ms); //timer = setTimeout(callback, ms);
            };
          })();

          $scope.reset = function () {
            if ($scope.search.query) {
              $scope.search.query = "";
              $scope.doSearch();
            }
          };

        } //link()
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.search-filter');
} catch (e) {
  module = angular.module('risevision.common.components.search-filter', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('search-filter/search-filter.html',
    '<div class="input-group"><span class="input-group-addon" ng-click="doSearch()"><i class="fa fa-search"></i></span> <input id="{{ filterConfig.id }}" type="text" class="form-control" placeholder="{{ filterConfig.placeholder }}" ng-model="search.query" ng-enter="delay(doSearch, 0)" ng-change="delay(doSearch, 1000)"> <span class="input-group-addon" ng-click="reset()"><i class="fa fa-times"></i></span></div>');
}]);
})();

/* jshint unused: false */
(function (angular) {

  "use strict";

  angular.module("risevision.common.components.scrolling-list", [
    "rvScrollEvent"
  ])
    .value("BaseList", function (maxCount) {
      this.list = [];
      this.maxCount = maxCount ? maxCount : 40;
      this.cursor = null;
      this.endOfList = false;

      //unused
      this.searchString = "";
      this.clear = function () {
        this.list = [];
        this.cursor = null;
        this.endOfList = false;
      };
      this.concat = function (items) {
        this.list = this.list.concat(items);
      };
      this.add = function (items, cursor) {
        this.cursor = cursor;
        this.endOfList = items.length < this.maxCount;
        this.concat(items);
      };

      //unused
      var append = function (items) {
        for (var i = 0; i < items.length; i++) {
          this.list.push(items[i]);
        }
      };
      //unused
      var remove = function (index) {
        this.list.splice(index, 1);
      };
    });

})(angular);

"use strict";

angular.module("risevision.common.components.scrolling-list")
  .service("processErrorCode", ["$filter",
    function ($filter) {
      var actionsMap = {
        get: "loaded",
        load: "loaded",
        add: "added",
        update: "updated",
        delete: "deleted",
        publish: "published",
        restore: "restored",
        move: "moved",
        rename: "renamed",
        upload: "uploaded",
        restart: "restarted",
        reboot: "rebooted"
      };

      return function (itemName, action, e) {
        var tryAgainMessage = $filter("translate")("apps-common.errors.tryAgain");
        var actionName = actionsMap[action];
        var error = (e && e.result && e.result.error) || {};
        var errorString = error.message ? error.message : "An Error has Occurred";
        var messagePrefix = $filter("translate")("apps-common.errors.actionFailed", {
          itemName: itemName,
          actionName: actionName
        });

        // Attempt to internationalize Storage error
        var key = "storage-client.error." + (action ? action + "." : "") + error.message;
        var msg = $filter("translate")(key);
        if (msg !== key) {
          errorString = msg;
        }

        if (!e) {
          return errorString;
        } else if (e.status === 400) {
          if (errorString.indexOf("is not editable") >= 0) {
            return messagePrefix + " " + errorString;
          } else if (errorString.indexOf("is required") >= 0) {
            return messagePrefix + " " + errorString;
          } else {
            return messagePrefix + " " + errorString;
          }
        } else if (e.status === 401) {
          return $filter("translate")("apps-common.errors.notAuthenticated", {
            itemName: itemName,
            actionName: action
          });
        } else if (e.status === 403) {
          if (errorString.indexOf("User is not allowed access") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.parentCompanyAction");
          } else if (errorString.indexOf("User does not have the necessary rights") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.permissionRequired");
          } else if (errorString.indexOf("Premium Template requires Purchase") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.premiumTemplate");
          } else if (errorString.indexOf("Storage requires active subscription") >= 0) {
            return messagePrefix + " " + $filter("translate")("apps-common.errors.storageSubscription");
          } else {
            return messagePrefix + " " + errorString;
          }
        } else if (e.status === 404) {
          return $filter("translate")("apps-common.errors.notFound", {
            itemName: itemName
          });
        } else if (e.status === 409) {
          return messagePrefix + " " + errorString;
        } else if (e.status === 500 || e.status === 503) {
          return $filter("translate")("apps-common.errors.serverError", {
            itemName: itemName,
            actionName: action
          }) + " " + tryAgainMessage;
        } else if (e.status === -1 || error.code === -1 || error.code === 0) {
          return $filter("translate")("apps-common.errors.checkConnection");
        } else {
          return errorString;
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.scrolling-list")
  .service("ScrollingListService", ["$log", "BaseList", "processErrorCode",
    function ($log, BaseList, processErrorCode) {
      return function (listService, search) {
        var DB_MAX_COUNT = 40; //number of records to load at a time
        var factory = {};

        factory.items = new BaseList(DB_MAX_COUNT);

        factory.search = search ? search : {};
        _.defaults(factory.search, {
          sortBy: "name",
          count: DB_MAX_COUNT,
          reverse: false,
          name: "Items"
        });

        var _clearMessages = function () {
          factory.loadingItems = false;

          factory.errorMessage = "";
          factory.apiError = "";
        };

        factory.load = function () {
          _clearMessages();

          if (!factory.items.list.length || !factory.items.endOfList &&
            factory.items.cursor) {
            factory.loadingItems = true;

            listService(factory.search, factory.items.cursor)
              .then(function (result) {
                factory.items.add(result.items ? result.items : [],
                  result.cursor);
              })
              .then(null, function (e) {
                factory.errorMessage = "Failed to load " + factory.search.name + ".";
                factory.apiError = processErrorCode(factory.search.name, "load", e);

                $log.error(factory.errorMessage, e);
              })
              .finally(function () {
                factory.loadingItems = false;
              });
          }
        };

        factory.load();

        factory.sortBy = function (cat) {
          factory.items.clear();

          if (cat !== factory.search.sortBy) {
            factory.search.sortBy = cat;
            factory.search.reverse = false;
          } else {
            factory.search.reverse = !factory.search.reverse;
          }

          factory.load();
        };

        factory.doSearch = function () {
          factory.items.clear();

          factory.load();
        };

        return factory;
      };
    }
  ]);

(function (angular) {

  "use strict";

  var INTERVAL_DELAY = 150;

  angular.module("rvScrollEvent", [])
    .directive("rvScrollEvent", ["$parse", "$window",
      function ($parse, $window) {
        return {
          scope: false,
          link: function (scope, element, attr) {
            var fn = $parse(attr.rvScrollEvent);
            var interval,
              handler,
              el = element[0],
              scrollEvent = "scroll",
              scrollPosition = {
                x: 0,
                y: 0
              };

            var bindScroll = function () {
              handler = function (event) {

                scrollPosition.x = el.scrollLeft;
                scrollPosition.y = el.scrollTop;

                startInterval(event);
                unbindScroll();
                scrollTrigger(event, false);
              };


              element.bind(scrollEvent, handler);
            };

            var startInterval = function (event) {
              interval = $window.setInterval(function () {
                if (scrollPosition.x === el.scrollLeft &&
                  scrollPosition.y === el.scrollTop) {
                  $window.clearInterval(interval);
                  bindScroll();
                  scrollTrigger(event, true);
                } else {
                  scrollPosition.x = el.scrollLeft;
                  scrollPosition.y = el.scrollTop;
                }
              }, INTERVAL_DELAY);
            };

            var unbindScroll = function () {
              // be nice to others, don"t unbind their scroll handlers
              element.unbind(scrollEvent, handler);
            };

            var scrollTrigger = function (event, isEndEvent) {
              scope.$apply(function () {
                fn(scope, {
                  $event: event,
                  isEndEvent: isEndEvent
                });
              });
            };

            bindScroll();
          }
        };
      }
    ]);
})(angular);

(function (angular) {

  "use strict";

  angular.module("risevision.common.components.scrolling-list")
    .directive("scrollingList", ["$parse", "$compile",
      function ($parse, $compile) {
        return {
          restrict: "A",
          replace: false,
          terminal: true,
          priority: 1000,
          link: function link(scope, element, attr) {
            var fn = $parse(attr.scrollingList);

            scope.handleScroll = function (event, isEndEvent) {
              // $log.debug(event.target.scrollTop + " / " + event.target.scrollHeight + " / " + isEndEvent);
              if (isEndEvent) {
                if (event.target.scrollTop &&
                  (event.target.scrollHeight - event.target.clientHeight -
                    event.target.scrollTop) < 20) {
                  //load more rows if less than 20px left to the bottom

                  fn(scope);
                }
              }
            };

            // Override this directive with rvScrollEvent
            // http://stackoverflow.com/questions/19224028/add-directives-from-directive-in-angularjs
            element.attr("rv-scroll-event",
              "handleScroll($event, isEndEvent)");
            element.removeAttr("scrolling-list"); //remove the attribute to avoid indefinite loop

            $compile(element)(scope);
          }
        };
      }
    ]);

})(angular);

"use strict";

angular.module("risevision.common.components.stop-event", [])
  .directive("stopEvent", function () {
    return {
      restrict: "A",
      link: function (scope, element, attr) {
        element.on(attr.stopEvent, function (e) {
          e.stopPropagation();
        });
      }
    };
  });

(function (angular) {

  "use strict";

  angular.module("risevision.common.components.analytics", [])

  .value("SEGMENT_API_KEY", "AFtY3tN10BQj6RbnfpDDp9Hx8N1modKN")
    .value("GA_LINKER_USE_ANCHOR", true)

  .factory("segmentAnalytics", ["$rootScope", "$window", "$log", "$location",
    "GA_LINKER_USE_ANCHOR",
    function ($rootScope, $window, $log, $location, GA_LINKER_USE_ANCHOR) {
      var service = {};
      var loaded;

      $window.analytics = $window.analytics || [];
      var analytics = $window.analytics;
      analytics.SNIPPET_VERSION = "4.0.0";

      analytics.factory = function (t) {
        function addUrl(methodName, args) {
          if ("track" === t && args && args.length > 1 && args[1] &&
            typeof args[1] === "object") {
            args[1].url = $location.host();
          }
        }
        return function () {
          var e = Array.prototype.slice.call(arguments);
          addUrl(t, e);
          e.unshift(t);
          $window.analytics.push(e);

          $log.debug("Segment Tracker", e);

          return $window.analytics;
        };
      };
      analytics.methods = ["trackSubmit", "trackClick", "trackLink",
        "trackForm",
        "pageview", "identify", "group", "track", "ready", "alias",
        "page",
        "once", "off", "on"
      ];
      for (var i = 0; i < analytics.methods.length; i++) {
        var method = analytics.methods[i];
        service[method] = analytics.factory(method);
      }

      service.ready(function () {
        var ga = $window.ga;
        ga("require", "linker");
        ga("linker:autoLink", ["community.risevision.com",
          "store.risevision.com", "help.risevision.com",
          "apps.risevision.com", "risevision.com",
          "preview.risevision.com", "rva.risevision.com"
        ], GA_LINKER_USE_ANCHOR);
      });

      /**
       * @description
       * Load Segment.io analytics script
       * @param apiKey The key API to use
       */
      service.load = function (apiKey, enableIntercomMessading) {
        if (apiKey && !loaded) {

          configureIntercomMessading(enableIntercomMessading);
          trackPageviews();

          var e = document.createElement("script");
          e.type = "text/javascript";
          e.async = !0;
          e.src = ("https:" === document.location.protocol ? "https://" :
            "http://") + "cdn.segment.com/analytics.js/v1/" + apiKey +
            "/analytics.min.js";
          var n = document.getElementsByTagName("script")[0];
          n.parentNode.insertBefore(e, n);

          loaded = true;
        }
      };

      function configureIntercomMessading(enableIntercomMessading) {
        if (enableIntercomMessading) {
          $window.intercomSettings = $window.intercomSettings || {};
          $window.intercomSettings.widget = {
            activator: "#IntercomDefaultWidget"
          };
        }
      }

      function trackPageviews() {
        // Listening to $viewContentLoaded event to track pageview
        $rootScope.$on("$viewContentLoaded", function () {
          if (service.location !== $location.path()) {
            service.location = $location.path();
            var properties = {};
            properties.url = $location.path();
            properties.path = $location.path();
            if ($location.search().nooverride) {
              properties.referrer = "";
            }
            service.page(properties);
          }
        });
      }

      return service;
    }
  ])

  .factory("analyticsEvents", ["$rootScope", "segmentAnalytics",
    "userState",
    function ($rootScope, segmentAnalytics, userState) {
      var service = {};

      service.identify = function () {
        if (userState.getUsername()) {
          var profile = userState.getCopyOfProfile();

          var properties = {
            email: profile.email,
            firstName: profile.firstName ? profile.firstName : "",
            lastName: profile.lastName ? profile.lastName : "",
          };
          if (userState.getUserCompanyId()) {
            properties.companyId = userState.getUserCompanyId();
            properties.companyName = userState.getUserCompanyName();
            properties.company = {
              id: userState.getUserCompanyId(),
              name: userState.getUserCompanyName()
            };
          }

          segmentAnalytics.identify(userState.getUsername(), properties);
        }
      };

      service.initialize = function () {
        $rootScope.$on("risevision.user.authorized", function () {
          service.identify();
        });
      };

      return service;
    }
  ]);

})(angular);

"use strict";

angular.module("risevision.common.components.message-box.services", [])
  .factory("messageBox", ["$q", "$log", "$modal", "$templateCache",
    function ($q, $log, $modal, $templateCache) {
      return function (title, message, close) {
        return $modal.open({
          template: $templateCache.get("message-box/message-box.html"),
          controller: "messageBoxInstance",
          size: "md",
          resolve: {
            title: function () {
              return title;
            },
            message: function () {
              return message;
            },
            button: function () {
              return close || "common.ok";
            }
          }
        });
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.message-box", [
  "risevision.common.components.message-box.services"
])
  .controller("messageBoxInstance", ["$scope", "$modalInstance",
    "title", "message", "button",
    function ($scope, $modalInstance, title, message, button) {
      $scope.title = title;
      $scope.message = message;
      $scope.button = button ? button : "common.close";

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.message-box');
} catch (e) {
  module = angular.module('risevision.common.components.message-box', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('message-box/message-box.html',
    '<form id="messageForm"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" data-dismiss="modal" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">{{title}}</h3></div><div class="modal-body" stop-event="touchend"><p translate="">{{message}}</p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="dismiss()"><span translate="{{button}}"></span> <i class="fa fa-white fa-check icon-right"></i></button></div></form>');
}]);
})();

/*jshint maxlen: false */

"use strict";

angular.module("risevision.common.components.svg", [])
  .constant("iconsList", {
    icons1: {
      riseLogo: "M0 32h32V0L0 32z M15 31v-7h6L15 31z M23 32v-9h9L23 32z M24 21v-6h7L24 21z",
      riseStore: "M13.1 24h13.5 0.1c1 0 1.7-0.8 1.9-1.8l2.6-13.5C31.3 8.4 31 8 30.6 8h-21L13.1 24z",
      riseStorage: "M8 32h20.2c2.1 0 3.8-1.7 3.8-3.8V9L8 32zM19 29v-4h4.3L19 29zM25 23v-4h4.3L25 23zM24 31v-7h7.3L24 31z",
      riseDisplays: "M8 26h20.2c2.1 0 3.8-1.7 3.8-3.8V3L8 26zM19 23v-4h4.3L19 23zM25 17v-4h4.3L25 17zM24 25v-7h7.3L24 25z",
      riseSchedules: "M8 32h20.2c2.1 0 3.8-1.7 3.8-3.8V9L8 32zM19 29v-4h4.3L19 29zM25 23v-4h4.3L25 23zM24 31v-7h7.3L24 31z",
      riseEditor: "M30.7 1.8C29.1 0.3 26.5 0.5 25 2l-1.1 1.1c-0.1 0.1-0.1 0.3 0 0.4l5.3 5.3c0.1 0.1 0.3 0.1 0.4 0l1.2-1.2C32.4 6 32.4 3.4 30.7 1.8zM9.6 17.5l-1.4 7.1 7.1-1.5 12.5-12.5c0.1-0.1 0.1-0.3 0-0.4L22.5 5c-0.1-0.1-0.3-0.1-0.4 0L9.6 17.5z",
      riseSupport: "M23.5 0.8c-4.7 0-8.5 3.8-8.5 8.5 0 4.7 3.8 8.5 8.5 8.5S32 14 32 9.3C32 4.6 28.2 0.8 23.5 0.8zM27.7 8.1c-0.1 0.3-0.2 0.5-0.3 0.7 -0.1 0.2-0.3 0.4-0.5 0.6 -0.2 0.2-0.4 0.3-0.6 0.4 -0.1 0.1-0.3 0.2-0.6 0.3 -0.3 0.2-0.5 0.3-0.7 0.6 -0.2 0.2-0.2 0.8-0.6 0.8h-2.3c-0.1 0-0.4 0-0.4-0.2v-0.4c0-0.5 0.2-1 0.7-1.5 0.4-0.5 0.9-0.8 1.4-1 0.4-0.2 0.7-0.4 0.8-0.5 0.2-0.2 0.2-0.4 0.2-0.7 0-0.3-0.1-0.5-0.4-0.7 -0.3-0.2-0.6-0.3-1-0.3 -0.4 0-0.8 0.1-1 0.3 -0.3 0.2-0.6 0.6-1 1.1 -0.1 0.1-0.2 0.1-0.3 0.1 -0.1 0-0.2 0-0.2-0.1l-1.6-1.2C19 6.2 19 6 19.1 5.8c1-1.7 2.5-2.6 4.5-2.6 0.7 0 1.4 0.2 2 0.5 0.7 0.3 1.2 0.8 1.7 1.4 0.4 0.6 0.7 1.3 0.7 2C27.9 7.4 27.8 7.8 27.7 8.1zM24.2 15.5h-2.1c-0.3 0-0.5-0.2-0.5-0.5v-2.1c0-0.3 0.2-0.5 0.5-0.5h2.1c0.3 0 0.5 0.2 0.5 0.5V15C24.7 15.3 24.5 15.5 24.2 15.5z",
      riseAlerts: "M31.5 12.3C31 11.8 30 11.6 30 11.6V4.8c0-0.6-0.4-1.2-0.8-1.6 -0.5-0.5-1.1-0.7-1.7-0.7C23.3 6 19.1 8.1 15 8.9v9.9c4 0.8 8.2 3 12.4 6.5 0.6 0 1.3-0.2 1.8-0.7 0.5-0.5 0.8-1 0.8-1.6v-6.9c0 0 1-0.2 1.5-0.7 0.4-0.4 0.7-1 0.7-1.6S31.9 12.7 31.5 12.3z",
      riseDevelopers: "M8 32h20.2c2.1 0 3.8-1.7 3.8-3.8V9L8 32zM19 29v-4h4.3L19 29zM25 23v-4h4.3L25 23zM24 31v-7h7.3L24 31z",
      riseDocumentation: "M8 32h20.2c2.1 0 3.8-1.7 3.8-3.8V9L8 32zM19 29v-4h4.3L19 29zM25 23v-4h4.3L25 23zM24 31v-7h7.3L24 31z",
      riseCommunity: "M24 12.6v4.7c0 1.4 0.4 2.3 1.3 2.6v5.4h5.3v-5.4c0.9-0.3 1.3-1.1 1.3-2.6v-4.7H24zM28 11.3c1.5 0 2.7-1.2 2.7-2.7 0-1.5-1.2-2.7-2.7-2.7s-2.7 1.2-2.7 2.7C25.3 10.1 26.3 11.3 28 11.3zM0 17.3c0 1.4 0.4 2.3 1.3 2.6v5.4h5.3v-5.4c1-0.3 1.4-1.2 1.4-2.6v-4.7H0V17.3zM4 11.3c1.7 0 2.7-1.2 2.7-2.7 0-1.5-1.2-2.7-2.7-2.7S1.3 7.1 1.3 8.6C1.3 10.1 2.5 11.3 4 11.3z",
      riseStorageGraphic: "M29.4 5.9V4c0-0.1-0.1-0.2-0.2-0.2h-10L0.6 22.1 7.7 25l2.9 7 18.9-18.6V7.2h1.3v7.9L16.8 28.8l0.9 0.9L32 15.6V5.9H29.4z",
      iconNewFolder: "M30.7 8c-0.8-0.8-1.9-1-3.1-1H15V5.9c0-1.2-0.5-2-1.4-2.8C12.8 2.2 11.7 2 10.5 2H4.3C3.1 2 2.1 2.2 1.3 3.1 0.4 3.9 0 4.7 0 5.9v18.5c0 1.2 0.4 2.3 1.3 3.2C2.1 28.5 3.1 29 4.3 29h23.3c1.2 0 2.2-0.5 3.1-1.4 0.9-0.9 1.3-2 1.3-3.2V10.8C32 9.6 31.6 8.9 30.7 8zM23 20h-5v5h-4v-5H9v-4h5v-5h4v5h5V20",
      iconPresentation: "M28.5,3.1H3.3c-1.6,0-2.8,1.3-2.8,2.8v20.5c0,1.6,1.3,2.8,2.8,2.8h25.1c1.6,0,2.8-1.3,2.8-2.8V5.9 C31.3,4.4,30,3.1,28.5,3.1z M5.4,21l5.1-10.2L15.6,21H5.4z M26.1,20.9h-7.4c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h7.4 c0.4,0,0.7,0.3,0.7,0.7C26.8,20.6,26.5,20.9,26.1,20.9z M26.1,16.8h-7.4c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7h7.4 c0.4,0,0.7,0.3,0.7,0.7C26.8,16.5,26.5,16.8,26.1,16.8z M26.1,12.7h-7.4c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7h7.4 c0.4,0,0.7,0.3,0.7,0.7S26.5,12.7,26.1,12.7z",
      iconWebsite: "M0 8v16c0 0.6 0.4 1 1 1h31V7H1C0.4 7 0 7.4 0 8zM29 11h2v10h-2V11zM26.3 17c0.4 0 0.8 0.4 0.8 0.8 0 0.4-0.4 0.8-0.8 0.8 -0.4 0-0.8-0.4-0.8-0.8C25.5 17.4 25.9 17 26.3 17zM3.9 13l0.8 3.7L5.7 13h1.1l0.9 3.7L8.5 13h1.5 0.1 1.5l0.8 3.7 0.9-3.7h1.1l0.9 3.7 0.8-3.7h1.5 0.1 1.5l0.8 3.7 0.9-3.7h1.1l0.9 3.7 0.8-3.7h1.6l-1.6 5h-1.5l-0.8-3.5L20.9 18h-1.5l-1.5-5.4L16.4 18h-1.5L14 14.5 13.2 18h-1.5l-1.5-5.4L8.6 18H7l-0.8-3.5L5.4 18H3.9l-1.6-5H3.9z",
      riseWidgetImage: "M21,13.8l-6.1,7l-4.3-4.4l-0.1-0.2l-7,8.2H28L21,13.8z M7.2,9c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2S5,12.4,5,11.2S6,9,7.2,9z M0,3.8v24.3h32V3.8H0z M29.8,26.4H2.3V5.7h27.6L29.8,26.4L29.8,26.4z",
      riseWidgetVideo: "M31,7l-7.37,4.26V9.55a3.25,3.25,0,0,0-3.24-3.24H4.24A3.25,3.25,0,0,0,1,9.55V22.45a3.25,3.25,0,0,0,3.24,3.24H20.38a3.25,3.25,0,0,0,3.24-3.24V20.76L31,25V7h0Z",
      riseWidgetText: "M10.47,10.47h4.15V21.53H10.47V24.3H21.53V21.53H17.38V10.47h4.15v2.77H24.3V7.7H7.7v5.53h2.77V10.47Zm-8.3-8.3V29.83H29.83V2.17H2.17Zm24.9,24.9H4.93V4.93H27.07V27.07Z",
      riseWidgetMore: "M26.62,9.55H25.48v3.87a0.65,0.65,0,0,1-.63.63H17.52a0.65,0.65,0,0,1-.63-0.63V7.15a0.65,0.65,0,0,1,.63-0.63h5.26V4.66H16.43A1.42,1.42,0,0,0,15,6.09v8.29a1.42,1.42,0,0,0,1.43,1.43H26a1.42,1.42,0,0,0,1.43-1.43V9.55h-0.8ZM28.89,1V3.61H31.5V5.76H28.89V8.37H26.74V5.76H24.17V3.61h2.57V1h2.15m-27,9.81L3,10.89l0-4a0.65,0.65,0,0,1,.63-0.63H11a0.65,0.65,0,0,1,.63.63v6.27a0.77,0.77,0,0,1-.67.72H5.64l0.09,0.76v1h6.36a1.42,1.42,0,0,0,1.43-1.43V6a1.42,1.42,0,0,0-1.43-1.43H2.53A1.42,1.42,0,0,0,1.1,6v4.84H1.9ZM12.72,9.42l-1.09-.09,0,4a0.65,0.65,0,0,1-.63.63H3.63A0.65,0.65,0,0,1,3,13.3V7a0.73,0.73,0,0,1,.65-0.69L9,6.31l-0.1-.76v-1H2.53A1.42,1.42,0,0,0,1.1,6v8.29A1.42,1.42,0,0,0,2.53,15.7h9.56a1.42,1.42,0,0,0,1.43-1.43V9.42h-0.8ZM1.9,23.39L3,23.47l0-4a0.65,0.65,0,0,1,.63-0.63H11a0.65,0.65,0,0,1,.63.63v6.27a0.77,0.77,0,0,1-.67.72H5.64l0.09,0.76v1h6.36a1.42,1.42,0,0,0,1.43-1.43V18.55a1.42,1.42,0,0,0-1.43-1.43H2.53A1.42,1.42,0,0,0,1.1,18.55v4.84H1.9ZM12.72,22l-1.09-.09,0,4a0.65,0.65,0,0,1-.63.63H3.63A0.65,0.65,0,0,1,3,25.88V19.6a0.73,0.73,0,0,1,.65-0.69l5.34,0-0.1-.76v-1H2.53A1.42,1.42,0,0,0,1.1,18.55v8.29a1.42,1.42,0,0,0,1.43,1.43h9.56a1.42,1.42,0,0,0,1.43-1.43V22h-0.8Zm3.07,1.39,1.09,0.08,0-4a0.65,0.65,0,0,1,.63-0.63h7.33a0.65,0.65,0,0,1,.63.63v6.27a0.77,0.77,0,0,1-.67.72H19.53l0.09,0.76v1H26a1.42,1.42,0,0,0,1.43-1.43V18.55A1.42,1.42,0,0,0,26,17.12H16.43A1.42,1.42,0,0,0,15,18.55v4.84h0.8ZM26.62,22l-1.09-.09,0,4a0.65,0.65,0,0,1-.63.63H17.52a0.65,0.65,0,0,1-.63-0.63V19.6a0.73,0.73,0,0,1,.65-0.69l5.34,0-0.1-.76v-1H16.43A1.42,1.42,0,0,0,15,18.55v8.29a1.42,1.42,0,0,0,1.43,1.43H26a1.42,1.42,0,0,0,1.43-1.43V22h-0.8Z",
      riseWidgetImageMulti: "M16.41,16.77l-4.89,5.6L8.13,18.86l0-.17-5.6,6.52H22ZM5.45,13a1.71,1.71,0,1,1-1.71,1.71A1.71,1.71,0,0,1,5.45,13ZM12.6,28.39H26.1L26.15,8.49H12.56v2H24.14l0,15.89H12.56ZM3.51,5.6V7.82h1.8V7.11H27.22V23.5H26.42V25H29V5.6H3.51Zm3-2.72V5.1H8.29V4.39H30.24V20.78H29.45v1.51H32V2.89H6.54Zm7,23.5H2L2,10.49H13.58v-2H0L0.05,28.39h13.5Z",
      riseWidgetFolder: "M28.61,8.77H13.92L11,6.16a0.85,0.85,0,0,0-.57-0.22H3.67a0.88,0.88,0,0,0-1,.71V24.22a1.11,1.11,0,0,0,1,1H28.61a0.88,0.88,0,0,0,.71-1V9.48A0.63,0.63,0,0,0,28.61,8.77Z"
    },
    icons2: {
      riseLogo: "",
      riseStore: "M26.6 26H11.5L6.7 4H1.6c-0.6 0-1 0.4-1 1s0.4 1 1 1h3.5l4.4 20.3c-0.9 0.4-1.6 1.4-1.6 2.5 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7c0-0.2 0-0.5-0.1-0.7H24c-0.1 0.2-0.1 0.5-0.1 0.7 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7S28.1 26 26.6 26z",
      riseStorage: "M1.8 9.1c1.2 0.7 2.9 1.3 5 1.7 2.1 0.4 4.4 0.6 6.9 0.6 2.5 0 4.8-0.2 6.9-0.6 2.1-0.4 3.5-1 4.8-1.7C26.6 8.4 27 7.7 27 6.9V4.6c0-0.8-0.4-1.6-1.6-2.3 -1.2-0.7-2.8-1.3-4.9-1.7C18.4 0.2 16.1 0 13.7 0c-2.5 0-4.7 0.2-6.8 0.6C4.7 1 3 1.6 1.8 2.3 0.6 3 0 3.7 0 4.6v2.3C0 7.7 0.6 8.4 1.8 9.1zM1.8 16c1.2 0.7 2.9 1.3 5 1.7 2.1 0.4 4.4 0.6 6.9 0.6 2 0 3.9-0.1 5.7-0.4l6.6-6.4c-1.2 0.6-2.7 1.1-4.5 1.5 -2.5 0.5-5.1 0.8-7.9 0.8 -2.8 0-5.5-0.3-7.9-0.8C3.3 12.4 1 11.7 0 10.7v3C0 14.5 0.6 15.3 1.8 16zM1.8 22.9c1.2 0.7 2.9 1.3 5 1.7 1.6 0.3 3.3 0.5 5.1 0.6l4.8-4.6c-1 0.1-2 0.1-3 0.1 -2.8 0-5.5-0.3-7.9-0.8C3.3 19.3 1 18.5 0 17.5v3C0 21.4 0.6 22.2 1.8 22.9zM5.8 26.7C3.3 26.1 1 25.4 0 24.4v3c0 0.8 0.6 1.6 1.9 2.3 1 0.6 2.3 1 3.8 1.4l4-3.9C8.3 27.1 7 26.9 5.8 26.7z",
      riseDisplays: "M9 22H4V4h24v0l3.5-3.3C31.1 0.3 30.6 0 30 0H2C0.9 0 0 0.9 0 2v22c0 1.1 0.9 2 2 2h2.8L9 22zM23.5 30.7l-4.5-2V28h-6v0.7l-4.5 2c-0.4 0-0.6 0.3-0.6 0.7 0 0.4 0.4 0.7 0.8 0.7h14.7c0.4 0 0.7-0.3 0.7-0.7C24 31 23.9 30.7 23.5 30.7z",
      riseSchedules: "M14 23.3V20h3.4l2.6-2.4V14h3.8l2.1-2H6v14h5.1L14 23.3zM14 14h4v4h-4V14zM8 14h4v4H8V14zM8 20h4v4H8V20zM31.5 6.7C31.1 6.3 30.6 6 30 6h-2V4c0-0.5-0.5-1-1-1h-6c-0.5 0-1 0.5-1 1v2h-8V4c0-0.5-0.5-1-1-1H5C4.5 3 4 3.5 4 4v2H2C0.9 6 0 6.9 0 8v22c0 1.1 0.9 2 2 2h2.8L9 28H4V10h24v0L31.5 6.7zM10 8H6V5h4V8zM26 8h-4V5h4V8z",
      riseEditor: "M22 28H4V17h3.3l2.2-2.2 1.8-1.8H2c-1.1 0-2 0.7-2 1.8v15C0 30.9 0.9 32 2 32h11.3 5.3H24c1.1 0 2-1.1 2-2.2V15.3l-4 4V28z",
      riseSupport: "M25 26.2c0 0-0.2-0.1-0.4-0.2l-5.1-3.1c-0.2-0.2-0.3-0.1-0.5-0.1s-0.5 0.2-0.9 0.5c-0.4 0.3-0.7 0.7-1 1.1 -0.3 0.4-0.6 0.8-0.9 1.1S15.6 26 15.4 26c-0.1 0-2.5-0.9-5.7-3.8 -2.9-2.6-3.8-5.6-3.8-5.7 0-0.2 0.2-0.5 0.5-0.8 0.3-0.3 0.7-0.6 1.1-0.9s0.8-0.6 1.1-1c0.3-0.4 0.5-0.7 0.5-0.9 0-0.2 0-0.3-0.1-0.5L5.8 7.1C5.8 7 5.7 6.9 5.7 6.9 5.6 6.8 5.5 6.8 5.3 6.8 5 6.8 4.5 6.8 4 6.9c0 0-4.2 1.5-4 5.9 0 0.3 0 0.7 0.1 1 0 0.3 1.1 6.1 6.5 11.5 5.1 5.1 11.2 6.5 11.5 6.5 0.3 0.1 0.6 0.1 0.9 0.1 0 0 4 0.2 5.7-3.6 0.1-0.2 0.2-0.3 0.2-0.4 0.1-0.6 0.2-1 0.2-1.3C25.1 26.5 25.1 26.3 25 26.2z",
      riseAlerts: "M11.8 26.4c-0.3-0.4-0.5-0.7-0.6-1s-0.1-0.6-0.1-1 0.2-0.8 0.4-1.2c-0.5-0.5-0.7-1-0.7-1.7 0-0.6 0.2-1.2 0.6-1.8s0.9-1 1.6-1.2c0 0 0 0 0.1 0V9.2c-0.5 0-1.1-0.2-1.6-0.2H2.9c-0.8 0-1.5 0.4-2 1C0.3 10.6 0 11.4 0 12.2v3.4c0 0.8 0.3 1.2 0.8 1.8C1.4 18 2.1 18 2.9 18H5c-0.2 1-0.3 1.5-0.4 2.2 -0.1 0.7-0.1 1.4-0.1 1.9s0.1 1.2 0.3 1.9c0.2 0.7 0.3 1.3 0.4 1.6 0.1 0.4 0.3 0.9 0.6 1.7 0.3 0.8 0.4 1.3 0.5 1.6 0.5 0.5 1.3 0.8 2.4 1 1 0.2 2 0.1 3-0.2s1.6-0.8 2-1.5c-0.5-0.4-0.8-0.7-1.1-0.9S12.1 26.7 11.8 26.4z",
      riseDevelopers: "M5.2 27.6l2.3-1.4c0.6 0.5 1.4 0.9 2.1 1.2l6.7-6.3c-0.1 0-0.2 0-0.3 0 -2.9 0-5.3-2.4-5.3-5.3 0-2.9 2.4-5.3 5.3-5.3s5.3 2.4 5.3 5.3c0 0.2 0 0.4-0.1 0.6L30.1 8l-2-3.5c-0.1-0.2-0.3-0.4-0.6-0.4 -0.2-0.1-0.5 0-0.7 0.1l-2.3 1.4C23.4 4.7 21 4 21 3.5V0.7C21 0.2 20.5 0 19.9 0h-7.6C11.8 0 11 0.2 11 0.7v2.8c0 0.5-2.3 1.1-3.5 2.1L5.2 4.2c-0.5-0.3-1-0.1-1.2 0.3l-3.8 6.6C0 11.3 0 11.6 0 11.8c0.1 0.2 0.2 0.5 0.4 0.6l2.4 1.4c-0.1 0.7-0.2 1.4-0.2 2.1 0 0.7 0.1 1.4 0.2 2.1l-2.4 1.4c-0.5 0.3-0.6 0.8-0.3 1.3l3.8 6.6C4.2 27.7 4.8 27.8 5.2 27.6",
      riseDocumentation: "M6 4C5.4 4 5 4.4 5 5s0.4 1 1 1h17c0.6 0 1-0.4 1-1s-0.4-1-1-1H6zM26 11.9V8.8C26 8.2 25.6 8 25 8H6C4.3 8 3 6.7 3 5c0-1.7 1.3-3 3-3h19c0.6 0 1-0.4 1-1 0-0.6-0.4-1-1-1H6C3.2 0 0 2 0 4.8v21c0 2.4 2.5 5.4 4.9 6.1L26 11.9z",
      riseCommunity: "M9.4 18.9c0 2.4 0.7 3.8 2.2 4.3v9h8.8v-9c1.5-0.4 2.2-1.9 2.2-4.3v-7.7H9.4V18.9zM16 8.9c2.4 0 4.4-2 4.4-4.4s-2-4.4-4.4-4.4 -4.4 2-4.4 4.4S13.6 8.9 16 8.9z",
      riseStorageGraphic: "M19.8 5.1L2.9 21.7 8.6 24l2.4 5.8 17.1-16.9V5.1H19.8zM22.9 11.7c-1.1 0-1.9-0.9-1.9-1.9 0-1.1 0.9-1.9 1.9-1.9 1.1 0 1.9 0.9 1.9 1.9C24.8 10.9 23.9 11.7 22.9 11.7z",
      iconNewFolder: "",
      iconPresentation: "",
      iconWebsite: "",
      riseWidgetImage: "",
      riseWidgetVideo: "",
      riseWidgetText: "",
      riseWidgetMore: "",
      riseWidgetImageMulti: "",
      riseWidgetFolder: ""
    }
  })
  .directive("svgIcon", ["iconsList",
    function (iconsList) {
      return {
        restrict: "E",
        scope: {
          p: "@",
        },
        link: function ($scope, element) {
          var _path = function (icon) {
            return (
              "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\">" +
              "<path d=\"" + iconsList.icons1[icon] + "\"/>" +
              "<path d=\"" + iconsList.icons2[icon] + "\"/>" +
              "</svg>");
          };

          $scope.$watch("p", function (p) {
            if (p) {
              element.html(_path(p));
            }
          });
        }
      };
    }
  ]);

(function () {
  "use strict";

  try {
    angular.module("risevision.common.config");
  } catch (err) {
    angular.module("risevision.common.config", []);
  }

  angular.module("risevision.common.config")
    .value("STORE_URL", "https://store.risevision.com/")
    .value("STORE_SERVER_URL", "https://store-dot-rvaserver2.appspot.com/");

  angular.module("risevision.common.components.subscription-status.config", [])
    .value("IN_RVA_PATH", "product/productId/?cid=companyId")
    .value("ACCOUNT_PATH", "account?cid=companyId")
    .value("PATH_URL", "v1/company/companyId/product/status?pc=")
    .value("AUTH_PATH_URL", "v1/widget/auth?cid=companyId&pc=")
    .value("PATH_URL_BY_DISPLAY_ID",
      "v1/product/productCode/status?displayIds=");

  angular.module("risevision.common.components.subscription-status.filters", [
    "risevision.common.i18n"
  ]);

  angular.module(
    "risevision.common.components.subscription-status.directives", [
      "risevision.common.components.subscription-status.service"
    ]);

  angular.module("risevision.common.components.subscription-status", [
    "ngSanitize",
    "ui.bootstrap",
    "risevision.common.config",
    "risevision.common.components.subscription-status.config",
    "risevision.common.components.subscription-status.directives",
    "risevision.common.components.subscription-status.filters",
    "risevision.common.components.subscription-status.service"
  ]);
}());

(function () {
  "use strict";

  angular.module("risevision.common.components.subscription-status.service", [
    "risevision.common.config",
    "risevision.common.components.subscription-status.config"
  ])
    .service("subscriptionStatusService", ["$http", "$q", "STORE_SERVER_URL",
      "PATH_URL", "AUTH_PATH_URL", "PATH_URL_BY_DISPLAY_ID",
      function ($http, $q, STORE_SERVER_URL, PATH_URL, AUTH_PATH_URL,
        PATH_URL_BY_DISPLAY_ID) {
        var responseType = ["On Trial", "Trial Expired", "Subscribed",
          "Suspended", "Cancelled", "Free", "Not Subscribed",
          "Product Not Found", "Company Not Found", "Error"
        ];
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // a and b are javascript Date objects
        function dateDiffInDays(a, b) {
          return Math.floor((b.getTime() - a.getTime()) / _MS_PER_DAY);
        }

        var checkAuthorizedStatus = function (productCode, companyId) {
          var deferred = $q.defer();

          var url = STORE_SERVER_URL +
            AUTH_PATH_URL.replace("companyId", companyId) +
            productCode;

          $http.get(url).then(function (response) {
            if (response && response.data) {
              deferred.resolve(response.data.authorized);
            } else {
              deferred.resolve(false);
            }
          });

          return deferred.promise;
        };

        var checkSubscriptionStatus = function (productCodes, companyId,
          displayId) {
          var deferred = $q.defer();

          productCodes = Array.isArray(productCodes) ? productCodes : [
            productCodes
          ];

          var url = STORE_SERVER_URL +
            PATH_URL.replace("companyId", companyId) +
            productCodes.join(",");

          if (displayId) {
            url = STORE_SERVER_URL +
              PATH_URL_BY_DISPLAY_ID.replace("productCode", productCodes.join(
                ",")) +
              displayId;
          }

          $http.get(url).then(function (response) {
            if (response && response.data && response.data.length) {
              var statusList = [];

              for (var i = 0; i < response.data.length; i++) {
                var subscriptionStatus = response.data[i];

                statusList.push(subscriptionStatus);
                subscriptionStatus.plural = "";
                subscriptionStatus.statusCode = subscriptionStatus.status
                  .toLowerCase().replace(" ", "-");

                if (subscriptionStatus.status === "") {
                  subscriptionStatus.status = "N/A";
                  subscriptionStatus.statusCode = "na";
                  subscriptionStatus.subscribed = false;
                } else if (subscriptionStatus.status === responseType[0] ||
                  subscriptionStatus.status === responseType[2] ||
                  subscriptionStatus.status === responseType[5]) {
                  subscriptionStatus.subscribed = true;
                } else {
                  subscriptionStatus.subscribed = false;
                }

                if (subscriptionStatus.statusCode === "not-subscribed" &&
                  subscriptionStatus.trialPeriod && subscriptionStatus.trialPeriod >
                  0) {
                  subscriptionStatus.statusCode = "trial-available";
                  subscriptionStatus.subscribed = true;
                }

                if (subscriptionStatus.expiry && subscriptionStatus.statusCode ===
                  "on-trial") {
                  subscriptionStatus.expiry = new Date(
                    subscriptionStatus
                    .expiry);

                  if (subscriptionStatus.expiry instanceof Date && !
                    isNaN(
                      subscriptionStatus.expiry.valueOf())) {
                    subscriptionStatus.expiry = dateDiffInDays(new Date(),
                      subscriptionStatus.expiry);
                  }

                  if (subscriptionStatus.expiry === 0) {
                    subscriptionStatus.plural = "-zero";
                  } else if (subscriptionStatus.expiry > 1) {
                    subscriptionStatus.plural = "-many";
                  }
                }
              }

              deferred.resolve(statusList);
            } else {
              deferred.reject("No response");
            }
          });

          return deferred.promise;
        };

        this.get = function (productCode, companyId, displayId) {
          return checkSubscriptionStatus(productCode, companyId, displayId)
            .then(function (statusList) {
              var subscriptionStatus = statusList[0];

              if (subscriptionStatus.subscribed === false) {
                // double check store authorization in case they're authorized
                return checkAuthorizedStatus(productCode, companyId)
                  .then(function (authorized) {
                    subscriptionStatus.subscribed = authorized;

                    return subscriptionStatus;
                  });
              } else {
                return subscriptionStatus;
              }
            });
        };

        this.list = function (productCodes, companyId, displayId) {
          return checkSubscriptionStatus(productCodes, companyId, displayId);
        };

      }
    ]);
}());

(function () {
  "use strict";

  angular.module(
    "risevision.common.components.subscription-status.directives")
    .directive("subscriptionStatus", ["$rootScope", "$templateCache", "subscriptionStatusService",
      "STORE_URL", "ACCOUNT_PATH", "IN_RVA_PATH",
      function ($rootScope, $templateCache, subscriptionStatusService, STORE_URL, ACCOUNT_PATH,
        IN_RVA_PATH) {
        return {
          restrict: "AE",
          require: "?ngModel",
          scope: {
            productId: "@",
            productCode: "@",
            companyId: "@",
            displayId: "@",
            expandedFormat: "@",
            showStoreModal: "=?",
            customProductLink: "@",
            customOnClick: "&"
          },
          template: $templateCache.get("subscription-status/subscription-status-template.html"),
          link: function ($scope, elm, attrs, ctrl) {
            $scope.subscriptionStatus = {
              "status": "N/A",
              "statusCode": "na",
              "subscribed": false,
              "expiry": null
            };

            var updateUrls = function () {
              $scope.storeAccountUrl = STORE_URL + ACCOUNT_PATH.replace("companyId", $scope.companyId);

              if ($scope.customProductLink) {
                $scope.storeUrl = $scope.customProductLink;
              } else {
                $scope.storeUrl = STORE_URL + IN_RVA_PATH
                  .replace("productId", $scope.productId)
                  .replace("companyId", $scope.companyId);
              }
            };

            function checkSubscriptionStatus() {
              if ($scope.productCode && $scope.productId && ($scope.companyId || $scope.displayId)) {
                subscriptionStatusService.get($scope.productCode, $scope.companyId, $scope.displayId)
                  .then(function (subscriptionStatus) {
                      if (subscriptionStatus) {
                        if (!$scope.subscriptionStatus || $scope.subscriptionStatus.status !== subscriptionStatus.status) {
                          $rootScope.$emit("subscription-status:changed", subscriptionStatus);
                        }

                        $scope.subscriptionStatus = subscriptionStatus;
                      }
                    },
                    function (err) {
                      console.log("Error checking subscription status", err);
                    });
              }
            }

            $scope.$watch("companyId", function () {
              checkSubscriptionStatus();

              updateUrls();
            });

            var subscriptionStatusListener = $rootScope.$on(
              "refreshSubscriptionStatus", function (event, data) {
                // Only refresh if currentStatus code matches the provided value, or value is null
                if (data === null || $scope.subscriptionStatus.statusCode === data) {
                  checkSubscriptionStatus();
                }
              });

            $scope.$on("$destroy", function () {
              subscriptionStatusListener();
            });

            if (ctrl) {
              $scope.$watch("subscriptionStatus", function (subscriptionStatus) {
                ctrl.$setViewValue(subscriptionStatus);
              });
            }
          }
        };
      }
    ])
    .filter("to_trusted", ["$sce",
      function ($sce) {
        return function (text) {
          return $sce.trustAsHtml(text);
        };
      }
    ]);
}());

"use strict";

angular.module("risevision.common.components.subscription-status.filters")
  .filter("productTrialDaysToExpiry", ["$interpolate", "$translate",
    function ($interpolate, $translate) {
      var expiresToday = null;
      var expiresIn = null;

      $translate(["subscription-status.expires-today",
        "subscription-status.expires-in"
      ], {
        days: "{{days}}"
      }).then(function (values) {
        expiresToday = $interpolate(values[
          "subscription-status.expires-today"]);
        expiresIn = $interpolate(values["subscription-status.expires-in"]);
      });

      return function (subscriptionExpiry) {
        var msg = "";
        try {
          var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
          var timeInMs = new Date(subscriptionExpiry).getTime() - new Date()
            .getTime();
          var days = Math.floor(timeInMs / oneDay);
          var params = {
            days: days
          };

          if (days === 0) {
            msg = expiresToday !== null ? expiresToday(params) : "";
          } else if (days > 0) {
            msg = expiresIn !== null ? expiresIn(params) : "";
          } else {
            msg = expiresToday !== null ? expiresToday(params) : "";
          }
        } catch (e) {
          // Nothing to do
        }

        return msg;
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.subscription-status');
} catch (e) {
  module = angular.module('risevision.common.components.subscription-status', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('subscription-status/subscription-status-template.html',
    '<div ng-show="!expandedFormat"><h3 ng-disable-right-click=""><span ng-show="subscriptionStatus.statusCode !== \'not-subscribed\'" ng-bind-html="\'subscription-status.\' + subscriptionStatus.statusCode + subscriptionStatus.plural | translate:subscriptionStatus | to_trusted"></span></h3><span ng-show="subscriptionStatus.statusCode === \'trial-available\'"><button class="btn btn-primary btn-xs" ng-click="showStoreModal = true;"><span translate="subscription-status.start-trial"></span></button></span> <span ng-show="[\'on-trial\', \'trial-expired\', \'cancelled\', \'not-subscribed\'].indexOf(subscriptionStatus.statusCode) >= 0"><a class="btn btn-primary btn-xs" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="subscription-status.subscribe"></span></a> <a class="btn btn-primary btn-xs" ng-click="customOnClick()" ng-show="customOnClick"><span translate="subscription-status.subscribe"></span></a></span> <span ng-show="[\'suspended\'].indexOf(subscriptionStatus.statusCode) >= 0"><a type="button" class="btn btn-primary btn-xs" ng-href="{{storeAccountUrl}}" target="_blank"><span translate="subscription-status.view-account"></span></a></span></div><div ng-show="expandedFormat"><div class="subscription-status trial" ng-show="subscriptionStatus.statusCode === \'on-trial\'"><span ng-bind-html="\'subscription-status.expanded-\' + subscriptionStatus.statusCode + subscriptionStatus.plural | translate:subscriptionStatus | to_trusted"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="subscription-status.subscribe-now"></span></a> <a type="button" class="btn btn-primary u_margin-left" ng-click="customOnClick()" ng-show="customOnClick"><span translate="subscription-status.subscribe-now"></span></a></div><div class="subscription-status expired" ng-show="subscriptionStatus.statusCode === \'trial-expired\'"><span translate="subscription-status.expanded-expired"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="subscription-status.subscribe-now"></span></a> <a type="button" class="btn btn-primary u_margin-left" ng-click="customOnClick()" ng-show="customOnClick"><span translate="subscription-status.subscribe-now"></span></a></div><div class="subscription-status cancelled" ng-show="subscriptionStatus.statusCode === \'cancelled\' && !subscriptionStatus.subscribed"><span translate="subscription-status.expanded-cancelled"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeUrl}}" target="_blank" ng-show="!customOnClick"><span translate="subscription-status.subscribe-now"></span></a> <a type="button" class="btn btn-primary u_margin-left" ng-click="customOnClick()" ng-show="customOnClick"><span translate="subscription-status.subscribe-now"></span></a></div><div class="subscription-status suspended" ng-show="subscriptionStatus.statusCode === \'suspended\'"><span translate="subscription-status.expanded-suspended"></span> <a type="button" class="btn btn-primary u_margin-left" ng-href="{{storeAccountUrl}}" target="_blank"><span translate="subscription-status.view-invoices"></span></a></div></div>');
}]);
})();

"use strict";

angular.module("risevision.common.components.plans.services", [
  "risevision.store.authorization",
  "risevision.common.gapi",
  "risevision.common.currency"
]);

angular.module("risevision.common.components.plans", [
  "risevision.common.components.plans.services",
  "risevision.common.components.purchase-flow",
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
    .factory("currentPlanFactory", ["$log", "$rootScope", "$timeout", "userState", "PLANS_LIST",
      function ($log, $rootScope, $timeout, userState, PLANS_LIST) {
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
            plan.currentPeriodEndDate = new Date(company.planCurrentPeriodEndDate);

          } else {
            plan = _.cloneDeep(_plansByType.free);
          }

          plan.playerProTotalLicenseCount = company.playerProTotalLicenseCount;
          plan.playerProAvailableLicenseCount = company.playerProAvailableLicenseCount;

          plan.shareCompanyPlan = company.shareCompanyPlan;

          if (company.parentPlanProductCode) {
            plan.parentPlan = _.cloneDeep(_plansByCode[company.parentPlanProductCode]);
          }

          plan.isPurchasedByParent = !!company.planBillToId && !!company.planShipToId && (company.planBillToId !==
            company.planShipToId);
          plan.parentPlanCompanyName = company.parentPlanCompanyName;
          plan.parentPlanContactEmail = company.parentPlanContactEmail;

          _factory.currentPlan = plan;
          $log.debug("Current plan", plan);
          $rootScope.$emit("risevision.plan.loaded", plan);
        };

        var _reloadCurrentPlan = function () {
          $log.debug("Reloading current plan");

          $timeout(function () {
            userState.reloadSelectedCompany()
              .then(_loadCurrentPlan)
              .catch(function (err) {
                $log.error("Error reloading plan information", err);
              })
              .finally(function () {
                $log.debug("Finished reloading current plan");
              });
          }, 10000);
        };

        _factory.isPlanActive = function () {
          return _factory.isSubscribed() || _factory.isOnTrial();
        };

        _factory.isFree = function () {
          return _factory.currentPlan.type === "free";
        };

        _factory.isParentPlan = function () {
          return !!_factory.currentPlan.parentPlan;
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

        _factory.isCancelledActive = function () {
          var now = new Date();

          return _factory.isCancelled() && (_factory.currentPlan.currentPeriodEndDate > now);
        };

        _loadCurrentPlan();

        $rootScope.$on("risevision.company.selectedCompanyChanged", function () {
          _loadCurrentPlan();
        });

        $rootScope.$on("risevision.company.updated", function () {
          _loadCurrentPlan();
        });

        $rootScope.$on("chargebee.subscriptionChanged", function () {
          _reloadCurrentPlan();
        });

        $rootScope.$on("chargebee.subscriptionCancelled", function () {
          _reloadCurrentPlan();
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
        priceDisplayYear: 0,
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
        priceDisplayYear: 110,
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
        priceDisplayYear: 99,
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
        priceDisplayYear: 88,
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
        priceDisplayYear: 77,
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

        _factory.showPlansModal = function (warningText) {
          if (!_factory.isPlansModalOpen) {
            _factory.isPlansModalOpen = true;

            var $modalInstance = $modal.open({
              template: $templateCache.get("plans/plans-modal.html"),
              controller: "PlansModalCtrl",
              size: "lg",
              resolve: {
                warningText: function () {
                  return warningText;
                }
              }
            });

            $modalInstance.result.finally(function () {
              _factory.isPlansModalOpen = false;
            });
          }
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
              selectedCompany.playerProTotalLicenseCount = _plansByCode[plan.productCode].proLicenseCount;
              selectedCompany.playerProAvailableLicenseCount = _plansByCode[plan.productCode].proLicenseCount;

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

angular.module("risevision.common.components.plans")

.controller("PlansModalCtrl", [
  "$scope", "$rootScope", "$modalInstance", "$log", "$loading", "$timeout",
  "plansFactory", "currentPlanFactory", "ChargebeeFactory", "userState", "purchaseFactory",
  "warningText",
  function ($scope, $rootScope, $modalInstance, $log, $loading, $timeout,
    plansFactory, currentPlanFactory, ChargebeeFactory, userState, purchaseFactory,
    warningText) {

    $scope.currentPlan = currentPlanFactory.currentPlan;
    $scope.purchaseFactory = purchaseFactory;
    $scope.chargebeeFactory = new ChargebeeFactory();
    $scope.startTrialError = null;
    $scope.isMonthly = true;
    $scope.warningText = warningText;

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

    function _showSubscriptionDetails() {
      var company = userState.getCopyOfSelectedCompany();

      $scope.chargebeeFactory.openSubscriptionDetails(company.id, company.planSubscriptionId);
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
      return !$scope.isFree(plan) && (!$scope.isStarter(plan) || !$scope.isMonthly);
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
            if (currentPlanFactory.isOnTrial() && !$scope.isFree(plan)) { // Does not have Chargebee account, use Purchase Flow
              return "downgrade";
            } else { // Already has Chargebee account, use Customer Portal
              return "downgrade-portal";
            }
          } else if (currentPlanFactory.isOnTrial()) { // Does not have Chargebee account, use Purchase Flow
            return "subscribe";
          } else { // Already has Chargebee account, use Customer Portal
            return "subscribe-portal";
          }
        }
      } else { // Were on Free Plan
        // Is there a Trial?
        if ($scope.isFree(plan)) {
          return "";
        } else if ($scope.isTrialAvailable(plan)) {
          return "start-trial";
        } else { // Subscribe using Purchase Flow
          return "subscribe";
        }
      }
    };

    $scope.startTrial = function (plan) {
      $loading.start("plans-modal");
      $scope.startTrialError = null;

      plansFactory.startTrial(plan)
        .then(function () {
          return $timeout(10000)
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

    $scope.showPurchaseModal = function (plan, isMonthly) {
      purchaseFactory.showPurchaseModal(plan, isMonthly)
        .then($scope.dismiss);
    };

    $scope.downgradePortal = _showSubscriptionDetails;

    $scope.subscribePortal = _showSubscriptionDetails;

    $scope.purchaseAdditionalLicenses = _showSubscriptionDetails;

    $scope.isChargebee = function () {
      return userState.isSelectedCompanyChargebee();
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
  $templateCache.put('plans/plans-modal.html',
    '<div rv-spinner="" rv-spinner-key="plans-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title p-3 ml-2" translate="">common-header.plans.choose-plan</h3></div><div id="plans-modal" class="modal-body u_padding-lg" stop-event="touchend"><div class="alert alert-warning p-4 text-center my-2" ng-show="warningText && !chargebeeFactory.apiError" translate="">{{warningText}}</div><div class="alert alert-danger p-4 text-center my-2" role="alert" ng-show="chargebeeFactory.apiError"><span ng-show="chargebeeFactory.apiError === 403"><span ng-show="currentPlan.parentPlanContactEmail" translate="" translate-values="{ parentPlanContactEmail: currentPlan.parentPlanContactEmail }">account-and-billing.errors.403-contact-email</span> <span ng-hide="currentPlan.parentPlanContactEmail" translate="">account-and-billing.errors.403-no-contact-email</span></span> <span ng-hide="chargebeeFactory.apiError === 403">{{chargebeeFactory.apiError}}</span></div><div class="text-center"><div class="btn-group" role="group" aria-label="..."><button ng-click="isMonthly = true" type="button" class="btn btn-default" ng-class="{ active: isMonthly }">Monthly</button> <button ng-click="isMonthly = false" type="button" class="btn btn-default" ng-class="{ active: !isMonthly }">Yearly</button></div><p class="u_padding-sm-vertical">Pay yearly, get one month free!</p></div><div class="pricing-table"><div id="planHeader" class="monthly"><div class="planColumn" ng-class="{ currentPlan: currentPlanLabelVisible(plan) }" ng-repeat="plan in plans"><div id="current-plan" class="currentPlanLabel" ng-show="currentPlanLabelVisible(plan)" translate="">common-header.plans.current</div><h2>{{plan.name}}</h2><h3 class="planColumnPrice" ng-show="!isFree(plan) && !isStarter(plan)"><span>$10</span>${{ isMonthly ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><h3 class="planColumnPrice" ng-show="isStarter(plan)">${{ isMonthly ? plan.monthly.priceDisplayMonth : plan.yearly.priceDisplayMonth }}</h3><p ng-show="!isFree(plan) && isMonthly" class="text-muted" translate="" translate-values="{ price: plan.monthly.billAmount }">common-header.plans.perDisplayBilledMonthly</p><p ng-show="!isFree(plan) && !isMonthly" class="text-muted" translate="" translate-values="{ price: plan.yearly.billAmount }">common-header.plans.perDisplayBilledYearly</p><div ng-show="!isFree(plan)"><h3>{{plan.proLicenseCount}}</h3><span ng-show="plan.proLicenseCount === 1" translate="">common-header.plans.displayIncluded</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.plans.displaysIncluded</span></div><p ng-show="showSavings(plan)" class="planSavings" translate="" translate-values="{ save: (isMonthly ? plan.monthly.save : plan.yearly.save) }">common-header.plans.saveEachYear</p><p ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan)" translate="">common-header.plans.needMoreDisplays</p><a ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan) && !isChargebee()" href="https://www.risevision.com/purchaseadditionaldisplaylicenses" target="_blank" translate="">common-header.plans.individual-licenses</a> <a ng-show="!isFree(plan) && isCurrentPlanSubscribed(plan) && isChargebee()" href="#" ng-click="purchaseAdditionalLicenses(plan)" translate="">common-header.plans.individual-licenses</a><p id="trial-days-remaining" class="small u_margin-sm-bottom text-subtle" ng-show="isCurrentPlan(plan) && isOnTrial(plan)" translate="" translate-values="{ count: currentPlan.trialPeriod }">common-header.plans.days-left-trial</p><p class="small u_margin-sm-bottom text-danger" ng-show="isCurrentPlan(plan) && isTrialExpired(plan)" translate="">common-header.plans.trial-expired</p><div class="mt-auto"><a id="subscribe-plan" ng-if="!isChargebee()" ng-show="getVisibleAction(plan).indexOf(\'subscribe\') === 0" target="_blank" href="https://store.risevision.com/product/{{plan.productId}}" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="subscribe-plan-cb" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'subscribe\'" ng-click="showPurchaseModal(plan, isMonthly)" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="subscribe-plan-cbp" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'subscribe-portal\'" ng-click="subscribePortal(plan)" class="btn btn-primary btn-block" translate="">common-header.plans.subscribe</a> <a id="downgrade-plan" ng-if="!isChargebee()" ng-show="getVisibleAction(plan).indexOf(\'downgrade\') === 0" target="_blank" href="https://www.risevision.com/downgradeplan" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="downgrade-plan-cb" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'downgrade\'" ng-click="showPurchaseModal(plan, isMonthly)" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="downgrade-plan-cbp" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'downgrade-portal\'" ng-click="downgradePortal(plan)" class="btn btn-default btn-block" translate="">common-header.plans.downgrade</a> <a id="subscribe-trial-plan" ng-if="isChargebee()" ng-show="getVisibleAction(plan) === \'start-trial\'" href="#" class="planSubscribe" ng-click="showPurchaseModal(plan, isMonthly)" translate="">common-header.plans.subscribe</a> <a id="start-trial-plan" ng-show="getVisibleAction(plan) === \'start-trial\'" target="_blank" ng-click="startTrial(plan)" class="btn btn-primary btn-block" translate="">common-header.plans.start-trial</a></div></div></div><div id="planFeatures"><div class="planFeatureColumn" id="planFreeFeatures"><h4 id="planFeatures" class="planFeatureColumnTitle" style="column-span: all;">You can use the following features for free on any of your displays!</h4><div class="planFeature"><p class="featureTitle">Text</p></div><div class="planFeature"><p class="featureTitle">Image by URL</p></div><div class="planFeature"><p class="featureTitle">Video by URL</p></div><div class="planFeature"><p class="featureTitle">RSS</p></div><div class="planFeature"><p class="featureTitle">Time & Date</p></div><div class="planFeature"><p class="featureTitle">HTML</p></div></div><div class="planFeatureColumn" id="planPaidFeatures"><h4 class="planFeatureColumnTitle" style="column-span: all;">Key Features Included With All Paid Plans <span class="u_padding-sm-vertical">Everything in \'Free\' +</span></h4><div class="planFeature"><p class="featureTitle">Image Slideshows</p></div><div class="planFeature"><p class="featureTitle">Video Playlists</p></div><div class="planFeature"><p class="featureTitle">Unlimited Image & Video File Storage</p></div><div class="planFeature"><p class="featureTitle">Pre-made Templates</p></div><div class="planFeature"><p class="featureTitle">Centralized Content Control</p></div><div class="planFeature"><p class="featureTitle">Scheduling</p></div><div class="planFeature"><p class="featureTitle">Google Calendar</p></div><div class="planFeature"><p class="featureTitle">Google Spreadsheet</p></div><div class="planFeature"><p class="featureTitle">Twitter</p></div><div class="planFeature"><p class="featureTitle">Web Pages</p></div><div class="planFeature"><p class="featureTitle">Google Reliability & Security</p></div><div class="planFeature"><p class="featureTitle">Account / Sub-Account Hierarchy</p></div><div class="planFeature"><p class="featureTitle">User Role Permissioning</p></div><div class="planFeature"><p class="featureTitle">Display Monitoring Notifications</p></div><div class="planFeature"><p class="featureTitle">Content Shows Offline</p></div><div class="planFeature"><p class="featureTitle">Alert Integration</p></div><div class="planFeature"><p class="featureTitle">Display On/Off Control</p></div><h4 class="text-center" style="column-span: all;"><a href="https://www.risevision.com/pricing" target="_blank">Learn More About Key Features</a></h4></div></div><div id="planFooter"></div></div><div class="alert bg-info p-4 text-center my-2" ng-show="currentPlan.parentPlan">By subscribing to a Plan on this Sub-Company, you will no longer share Display Licenses with your Parent Company. Your Licensed Displays will use the licenses included with the new Plan.</div><div class="alert bg-info p-4 text-center my-2" ng-show="currentPlan.shareCompanyPlan && !currentPlan.parentPlan">Your Plan and Displays Licenses can be used on any of your Displays and any Display across all your Sub-Companies.</div><div class="text-center p-4"><a class="font-weight-bold" href="https://www.risevision.com/contact-us" target="_blank">Questions? We can help!</a></div></div></div>');
}]);
})();

"use strict";

angular.module("risevision.common.components.purchase-flow", [
  "risevision.store.authorization",
  "risevision.common.config",
  "risevision.common.gapi",
  "risevision.common.geodata",
  "risevision.common.currency",
  "risevision.common.components.loading",
  "risevision.core.countries",
  "ui.bootstrap"
]);

angular.module("risevision.common.components.purchase-flow")
  .service("addressFactory", ["$q", "$log", "userState", "storeService", "updateCompany", "updateUser",
    "addressService", "contactService",
    function ($q, $log, userState, storeService, updateCompany, updateUser, addressService, contactService) {
      var factory = {};

      var _addressesAreIdentical = function (src, result) {
        var dest = {
          // Use Current Name for Comparison
          name: src.name,
          street: result.line1,
          unit: result.line2 && result.line2.length ? result.line2 : "",
          city: result.city,
          postalCode: result.postalCode,
          province: result.region,
          country: result.country
        };

        return addressService.addressesAreIdentical(src, dest);
      };

      factory.validateAddress = function (addressObject) {
        addressObject.validationError = false;

        if (addressObject.country !== "CA" && addressObject.country !== "US") {
          $log.debug("Address Validation skipped for country: ", addressObject.country);

          return $q.resolve();
        } else {
          return storeService.validateAddress(addressObject)
            .then(function (result) {
              if (!_addressesAreIdentical(addressObject, result)) {
                $log.error("Validated address differs from entered address: ", addressObject, result);
              }
            })
            .catch(function (result) {
              addressObject.validationError = result.message ? result.message : "Unknown Error";
            });
        }
      };

      var _updateCompanySettings = function (company, isShipping) {
        if (isShipping) {
          // update Selected company saved in userState
          var shipToCopyNoFollow = userState.getCopyOfSelectedCompany(true);
          angular.extend(shipToCopyNoFollow, company);

          // this will fire "risevision.company.updated" event
          userState.updateCompanySettings(shipToCopyNoFollow);
        }
        // only proceed if currently selected BillTo company is the User company
        else if (company.id === userState.getUserCompanyId()) {
          // update User company saved in userState
          var billToCopyNoFollow = userState.getCopyOfUserCompany(true);
          angular.extend(billToCopyNoFollow, company);

          // this will fire "risevision.company.updated" event
          userState.updateCompanySettings(billToCopyNoFollow);
        }
      };

      factory.updateAddress = function (addressObject, contact, isShipping) {
        var deferred = $q.defer();
        var currentAddress = isShipping ? addressService.copyAddressFromShipTo(userState.getCopyOfSelectedCompany()) :
          userState.getCopyOfUserCompany();

        var addressFields = {};
        var requiresUpdate = false;

        if (!isShipping) {
          var billingContactEmails = currentAddress.billingContactEmails || [];
          var email = contact && contact.email;

          if (email && billingContactEmails.indexOf(email) === -1) {
            billingContactEmails.unshift(email);

            addressFields.billingContactEmails = billingContactEmails;

            requiresUpdate = true;
          }
        }

        if (addressObject && !addressService.addressesAreIdentical(addressObject, currentAddress) || requiresUpdate) {
          if (isShipping) {
            addressService.copyAddressToShipTo(addressObject, addressFields);
          } else {
            addressService.copyAddress(addressObject, addressFields);
          }

          $log.info("Company Fields changed. Saving...");

          updateCompany(addressFields.id, addressFields)
            .then(function () {
              _updateCompanySettings(addressFields, isShipping);

              $log.info("Company Fields saved.");

              deferred.resolve();
            })
            .catch(function () {
              $log.info("Error saving Company Fields.");
              deferred.reject("Error saving Company Fields.");
            });
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      };

      factory.updateContact = function (contact) {
        var deferred = $q.defer();
        var currentContact = userState.getCopyOfProfile();

        if (contact && !contactService.contactsAreIdentical(contact, currentContact)) {
          $log.info("Contact information changed. Saving...");

          updateUser(userState.getUsername(), contact)
            .then(function () {
              var profileCopyNoFollow = userState.getCopyOfProfile(true);
              contactService.copyContactObj(contact, profileCopyNoFollow);

              // this fires "risevision.company.updated" event
              userState.updateUserProfile(profileCopyNoFollow);

              $log.info("Contact information saved.");
              deferred.resolve();
            })
            .catch(function () {
              $log.info("Error saving Contact information.");
              deferred.reject("Error saving Contact information.");
            });
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      };

      return factory;
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .service("addressService", [

    function () {
      this.copyAddress = function (src, dest) {
        if (!dest) {
          dest = {};
        }

        dest.id = src.id;
        dest.name = src.name;

        dest.street = src.street;
        dest.unit = src.unit;
        dest.city = src.city;
        dest.country = src.country;
        dest.postalCode = src.postalCode;
        dest.province = src.province;

        return dest;
      };

      this.copyAddressFromShipTo = function (src, dest) {
        // Do not copy shipToUseCompanyAddress.
        // It should not be updated from the Cart.

        if (!dest) {
          dest = {};
        }

        dest.id = src.id;
        dest.name = src.shipToName;

        dest.street = src.shipToStreet;
        dest.unit = src.shipToUnit;
        dest.city = src.shipToCity;
        dest.country = src.shipToCountry;
        dest.postalCode = src.shipToPostalCode;
        dest.province = src.shipToProvince;

        return dest;
      };

      this.copyAddressToShipTo = function (src, dest) {
        // Do not copy shipToUseCompanyAddress.
        // It should not be updated from the Cart.

        if (!dest) {
          dest = {};
        }

        dest.id = src.id;
        dest.shipToName = src.name;

        dest.shipToStreet = src.street;
        dest.shipToUnit = src.unit;
        dest.shipToCity = src.city;
        dest.shipToCountry = src.country;
        dest.shipToPostalCode = src.postalCode;
        dest.shipToProvince = src.province;

        return dest;
      };

      this.addressesAreIdentical = function (src, dest) {
        if (dest.name === src.name &&
          dest.street === src.street &&
          dest.unit === src.unit &&
          dest.city === src.city &&
          dest.country === src.country &&
          dest.postalCode === src.postalCode &&
          dest.province === src.province) {
          return true;
        }
        return false;
      };

    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .service("contactService", [

    function () {

      this.contactsAreIdentical = function (c1, c2) {
        return (
          c1.firstName === c2.firstName &&
          c1.lastName === c2.lastName &&
          c1.email === c2.email &&
          c1.telephone === c2.telephone);
      };

      this.copyContactObj = function (src, dest) {
        if (!dest) {
          dest = {};
        }

        dest.username = src.username;
        dest.firstName = src.firstName;
        dest.lastName = src.lastName;
        dest.email = src.email;
        dest.telephone = src.telephone;

        return dest;
      };

    }
  ]);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .constant("RPP_ADDON_ID", "c4b368be86245bf9501baaa6e0b00df9719869fd")
    .factory("purchaseFactory", ["$rootScope", "$q", "$log", "$modal", "$templateCache", "$timeout",
      "userState", "storeService", "stripeService", "addressService", "contactService", "purchaseFlowTracker",
      "RPP_ADDON_ID",
      function ($rootScope, $q, $log, $modal, $templateCache, $timeout, userState,
        storeService, stripeService, addressService, contactService, purchaseFlowTracker, RPP_ADDON_ID) {
        var factory = {};

        // Stop spinner - workaround for spinner not rendering
        factory.loading = false;

        var _init = function (plan, isMonthly) {
          factory.purchase = {};

          factory.purchase.plan = angular.copy(plan);
          factory.purchase.plan.additionalDisplayLicenses = 0;
          factory.purchase.plan.isMonthly = isMonthly;

          factory.purchase.billingAddress = addressService.copyAddress(userState.getCopyOfUserCompany());
          factory.purchase.shippingAddress = addressService.copyAddressFromShipTo(userState.getCopyOfSelectedCompany());

          factory.purchase.contact = contactService.copyContactObj(userState.getCopyOfProfile());
          factory.purchase.paymentMethods = {
            paymentMethod: "card",
            existingCreditCards: [],
            newCreditCard: {
              isNew: true,
              address: {},
              useBillingAddress: true,
              billingAddress: factory.purchase.billingAddress
            }
          };

          var invoiceDate = new Date();
          invoiceDate.setDate(invoiceDate.getDate() + 30);
          factory.purchase.paymentMethods.invoiceDate = invoiceDate;

          // Alpha Release - Select New Card by default
          factory.purchase.paymentMethods.selectedCard = factory.purchase.paymentMethods.newCreditCard;
          factory.purchase.estimate = {};

          purchaseFlowTracker.trackProductAdded(factory.purchase.plan);
        };

        factory.showPurchaseModal = function (plan, isMonthly) {
          _init(plan, isMonthly);

          var modalInstance = $modal.open({
            template: $templateCache.get("purchase-flow/purchase-modal.html"),
            controller: "PurchaseModalCtrl",
            size: "md",
            backdrop: "static"
          });

          return modalInstance.result;
        };

        factory.showTaxExemptionModal = function () {
          var modalInstance = $modal.open({
            template: $templateCache.get("purchase-flow/tax-exemption.html"),
            controller: "TaxExemptionModalCtrl",
            size: "md",
            backdrop: "static"
          });

          return modalInstance.result.then(function (result) {
            factory.purchase.taxExemptionSent = result;
          });
        };

        var _validateCard = function (card, isNew) {
          card.validationErrors = stripeService.validateCard(card, isNew);

          if (!card.validationErrors || card.validationErrors.length > 0) {
            return false;
          }

          return true;
        };

        factory.validatePaymentMethod = function () {
          var paymentMethods = factory.purchase.paymentMethods;
          var deferred = $q.defer();

          if (paymentMethods.paymentMethod === "invoice") {
            // TODO: Check Invoice credit (?)
            deferred.resolve();
          } else if (paymentMethods.paymentMethod === "card") {
            if (!paymentMethods.selectedCard.isNew) {
              if (_validateCard(paymentMethods.selectedCard, false)) {
                // Existing Card selected
                deferred.resolve();
              } else {
                deferred.reject();
              }
            } else {
              if (_validateCard(paymentMethods.newCreditCard, true)) {
                var address = paymentMethods.newCreditCard.address;
                if (paymentMethods.newCreditCard.useBillingAddress) {
                  address = paymentMethods.newCreditCard.billingAddress;
                }

                factory.loading = true;

                return stripeService.createToken(paymentMethods.newCreditCard, address)
                  .then(function (response) {
                    paymentMethods.newCreditCard.id = response.id;
                    paymentMethods.newCreditCard.last4 = response.card.last4;
                    paymentMethods.newCreditCard.cardType = response.card.type;
                  })
                  .finally(function () {
                    factory.loading = false;
                  });
              } else {
                deferred.reject();
              }
            }
          }
          return deferred.promise;
        };

        var _getBillingPeriod = function () {
          return factory.purchase.plan.isMonthly ? "01m" : "01y";
        };

        var _getCurrency = function () {
          return (factory.purchase.billingAddress.country === "CA") ? "cad" : "usd";
        };

        var _getChargebeePlanId = function () {
          return factory.purchase.plan.productCode + "-" + _getCurrency() + _getBillingPeriod();
        };

        var _getChargebeeAddonId = function () {
          return RPP_ADDON_ID + "-" + _getCurrency() + _getBillingPeriod() +
            factory.purchase.plan.productCode.substring(0, 3);
        };

        factory.getEstimate = function () {
          factory.purchase.estimate = {
            currency: _getCurrency()
          };

          factory.loading = true;

          return storeService.calculateTaxes(factory.purchase.billingAddress.id, _getChargebeePlanId(),
              _getChargebeeAddonId(),
              factory.purchase.plan.additionalDisplayLicenses, factory.purchase.shippingAddress)
            .then(function (result) {
              var estimate = factory.purchase.estimate;

              estimate.taxesCalculated = true;
              estimate.taxes = result.taxes || [];
              estimate.total = result.total;
              estimate.totalTax = result.totalTax;
              estimate.shippingTotal = result.shippingTotal;

              purchaseFlowTracker.trackPlaceOrderClicked(estimate);
            })
            .catch(function (result) {
              factory.purchase.estimate.estimateError = result && result.message ? result.message :
                "An unexpected error has occurred. Please try again.";
            })
            .finally(function () {
              factory.loading = false;
            });
        };

        var _getOrderAsJson = function () {
          //clean up items
          var newItems = [{
            id: _getChargebeePlanId()
          }, {
            id: _getChargebeeAddonId(),
            qty: factory.purchase.plan.additionalDisplayLicenses
          }];

          var card = factory.purchase.paymentMethods.selectedCard;
          var cardData = factory.purchase.paymentMethods.paymentMethod === "invoice" ? null : {
            cardId: card.id,
            isDefault: card.isDefault ? true : false
          };

          var obj = {
            billTo: addressService.copyAddress(factory.purchase.billingAddress),
            shipTo: addressService.copyAddress(factory.purchase.shippingAddress),
            items: newItems,
            purchaseOrderNumber: factory.purchase.paymentMethods.purchaseOrderNumber,
            card: cardData
          };

          return JSON.stringify(obj);
        };

        factory.completePayment = function () {
          var jsonData = _getOrderAsJson();

          factory.purchase.checkoutError = null;
          factory.loading = true;

          return storeService.purchase(jsonData)
            .then(function () {
              factory.purchase.reloadingCompany = true;

              purchaseFlowTracker.trackOrderPayNowClicked(factory.purchase.estimate);

              $timeout(10000)
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
                  factory.purchase.reloadingCompany = false;
                });
            })
            .catch(function (result) {
              factory.purchase.checkoutError = result && result.message ? result.message :
                "There was an unknown error with the payment.";
            })
            .finally(function () {
              factory.loading = false;
            });
        };

        return factory;
      }
    ]);

})(angular);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .factory("stripeLoader", ["$q", "$interval", "$window", "userState",
    "STRIPE_PROD_KEY", "STRIPE_TEST_KEY",
    function ($q, $interval, $window, userState, STRIPE_PROD_KEY, STRIPE_TEST_KEY) {
      var deferred = $q.defer();

      var checkInterval = setInterval(function () {
        if ($window.Stripe) {
          $interval.cancel(checkInterval);

          deferred.resolve($window.Stripe);
        }
      }, 50);

      return function () {
        return deferred.promise.then(function (stripeClient) {
          var isTest = userState.getCopyOfUserCompany().isTest;

          stripeClient.setPublishableKey(isTest ? STRIPE_TEST_KEY : STRIPE_PROD_KEY);

          return stripeClient;
        });
      };
    }
  ]);

"use strict";

/*jshint camelcase: false */

angular.module("risevision.common.components.purchase-flow")
  .constant("STRIPE_ERRORS", {
    invalid_number: "Invalid Card Number.",
    incorrect_number: "Invalid Card Number.",
    invalid_cvc: "Invalid Security Code.",
    incorrect_cvc: "Invalid Security Code.",
    invalid_expiry_month: "Invalid Exp. Month.",
    invalid_expiry_year: "Invalid Exp. Year.",
    incorrect_zip: "Invalid ZIP / Postal Code. The ZIP / Postal Code provided is not associated with the billing address of this card.",
    expired_card: "The card provided has expired.",
    card_declined: "The card was declined. Please confirm all information is correct. If the problem continues try a different card.",
    missing: "No card associated with the account.",
    processing_error: "An unexpected error has occurred. Please try again."
  })
  .service("stripeService", ["$q", "$log", "$window", "stripeLoader", "STRIPE_ERRORS",
    function ($q, $log, $window, stripeLoader, STRIPE_ERRORS) {

      this.validateCard = function (card, isNew) {
        var errors = [];

        if (!$window.Stripe) {
          errors.push(STRIPE_ERRORS.processing_error);

          return errors;
        }

        if (isNew) {
          card.number = card.number ? card.number.trim() : "";

          if (!$window.Stripe.card.validateCardNumber(card.number)) {
            errors.push(STRIPE_ERRORS.invalid_number);
          }
          if (!$window.Stripe.card.validateCVC(card.cvc)) {
            errors.push(STRIPE_ERRORS.invalid_cvc);
          }
        }

        if (!$window.Stripe.card.validateExpiry(card.expMonth, card.expYear)) {
          errors.push("Invalid Expiry Date.");
        }

        return errors;
      };

      var _processStripeError = function (errorCode) {
        var message = STRIPE_ERRORS[errorCode];

        if (!message) {
          message = STRIPE_ERRORS.processing_error;
        }

        return message;
      };

      this.createToken = function (card, address) {
        var deferred = $q.defer();

        card.tokenError = null;
        var cardObject = {
          number: card.number,
          cvc: card.cvc,
          exp_month: card.expMonth,
          exp_year: card.expYear,
          name: card.name,
          //address fields
          address_line1: address.street,
          address_line2: address.unit,
          address_city: address.city,
          address_state: address.province,
          address_zip: address.postalCode,
          address_country: address.country
        };

        stripeLoader().then(function (stripeClient) {
          stripeClient.card.createToken(cardObject, function (status, response) {
            if (response && response.card && !response.error) {
              $log.debug("Create Token response: ", response);

              deferred.resolve(response);
            } else {
              console.error("Failed to get Card Token: ", response);

              card.tokenError = _processStripeError(response && response.error && response.error.code);

              deferred.reject();
            }
          });
        });

        return deferred.promise;
      };
    }
  ]);

(function (angular) {

  "use strict";
  angular.module("risevision.common.components.purchase-flow")
    .factory("taxExemptionFactory", ["storeService",
      function (storeService) {
        var factory = {
          taxExemption: {}
        };

        // Stop spinner - workaround for spinner not rendering
        factory.loading = false;

        factory.submitCertificate = function () {
          factory.taxExemptionError = null;
          factory.loading = true;

          return storeService.uploadTaxExemptionCertificate(factory.taxExemption.file)
            .then(function (blobKey) {
              return storeService.addTaxExemption(factory.taxExemption, blobKey);
            }).catch(function (error) {
              factory.taxExemptionError = error.message ||
                "An error ocurred while submitting your tax exemption. Please try again.";
            }).finally(function () {
              factory.loading = false;
            });

        };

        return factory;
      }
    ]);

})(angular);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .factory("purchaseFlowTracker", ["segmentAnalytics",
    function (segmentAnalytics) {
      var factory = {};

      factory.trackProductAdded = function (plan) {
        segmentAnalytics.track("Product Added", {
          id: plan.productCode,
          name: plan.name,
          price: plan.isMonthly ? plan.monthly.billAmount : plan.yearly.billAmount,
          quantity: 1,
          category: "Plans",
          inApp: false
        });
      };

      factory.trackPlaceOrderClicked = function (estimate) {
        segmentAnalytics.track("Place Order Clicked", {
          amount: estimate.total,
          currency: estimate.currency,
          inApp: false
        });
      };

      factory.trackOrderPayNowClicked = function (estimate) {
        segmentAnalytics.track("Order Pay Now Clicked", {
          amount: estimate.total,
          currency: estimate.currency,
          inApp: false
        });
      };

      return factory;
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("addressForm", ["$templateCache", "COUNTRIES", "REGIONS_CA", "REGIONS_US",
    function ($templateCache, COUNTRIES, REGIONS_CA, REGIONS_US) {
      return {
        restrict: "E",
        scope: {
          formObject: "=",
          addressObject: "=",
          hideCompanyName: "="
        },
        template: $templateCache.get("purchase-flow/address-form.html"),
        link: function ($scope) {
          $scope.countries = COUNTRIES;
          $scope.regionsCA = REGIONS_CA;
          $scope.regionsUS = REGIONS_US;

          $scope.isFieldInvalid = function (fieldName) {
            var form = $scope.formObject;
            var field = form[fieldName];

            return (field.$dirty || form.$submitted) && field.$invalid;
          };
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("billingAddress", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-billing-address.html"),
        link: function ($scope) {
          $scope.billingAddress = purchaseFactory.purchase.billingAddress;
          $scope.contact = purchaseFactory.purchase.contact;
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("checkoutSuccess", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-success.html"),
        link: function ($scope) {
          $scope.purchase = purchaseFactory.purchase;
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("paymentMethods", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-payment-methods.html"),
        link: function ($scope) {
          $scope.paymentMethods = purchaseFactory.purchase.paymentMethods;
          $scope.contactEmail = purchaseFactory.purchase.contact.email;

          $scope.purchase = purchaseFactory.purchase;
          $scope.showTaxExemptionModal = purchaseFactory.showTaxExemptionModal;

          $scope.getCardDescription = function (card) {
            return "***-" + card.last4 + ", " + card.cardType + (card.isDefault ? " (default)" : "");
          };

        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("provinceValidator", ["REGIONS_CA", "REGIONS_US",

    function (REGIONS_CA, REGIONS_US) {
      return {
        require: "ngModel",
        restrict: "A",
        scope: {
          provinceValidator: "="
        },
        link: function ($scope, elem, attr, ngModel) {
          var validator = function (value) {
            // Selected Country passed via the directive
            var country = $scope.provinceValidator;
            var valid = true;

            if (country) {
              if (country === "CA") {
                valid = value && _.find(REGIONS_CA, function (region) {
                  return region[1] === value;
                });
              } else if (country === "US") {
                valid = value && _.find(REGIONS_US, function (region) {
                  return region[1] === value;
                });
              }
            }

            ngModel.$setValidity("validProvince", !!valid);

            return value;
          };

          $scope.$watch("provinceValidator", function () {
            validator(ngModel.$modelValue);
          });

          ngModel.$parsers.unshift(validator);
          ngModel.$formatters.unshift(validator);
        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("reviewPurchase", ["$templateCache", "userState", "purchaseFactory",
    function ($templateCache, userState, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-review-purchase.html"),
        link: function ($scope) {
          $scope.purchase = purchaseFactory.purchase;
          $scope.selectedCompany = userState.getCopyOfSelectedCompany();

          $scope.getPlanPrice = function () {
            var plan = $scope.purchase.plan;
            if (plan.isMonthly) {
              return plan.monthly.billAmount;
            } else {
              return plan.yearly.billAmount;
            }
          };

          $scope.getAdditionalDisplaysPrice = function () {
            var plan = $scope.purchase.plan;
            if (plan.isMonthly) {
              return (plan.additionalDisplayLicenses * plan.monthly.priceDisplayMonth);
            } else {
              return (plan.additionalDisplayLicenses * plan.yearly.priceDisplayYear);
            }
          };

          $scope.showTaxExemptionModal = function () {
            purchaseFactory.showTaxExemptionModal()
              .then(function () {
                if (purchaseFactory.purchase.taxExemptionSent) {
                  purchaseFactory.getEstimate();
                }

              });
          };

        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("reviewSubscription", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get(
          "purchase-flow/checkout-review-subscription.html"),
        link: function ($scope) {
          $scope.plan = purchaseFactory.purchase.plan;

          var _getAdditionalDisplayLicenses = function () {
            var licenses = $scope.plan.additionalDisplayLicenses;

            // Workaround for checking Integer value
            // Using Number.isInteger(licenses) causes unit tests to fail
            // if (Number.isInteger(licenses) && licenses >= 0) {
            // if (_.isInteger(licenses) && licenses >= 0) {
            if (!isNaN(licenses) && (licenses % 1 === 0) && licenses >= 0) {
              return licenses;
            }

            return 0;
          };

          $scope.incrementLicenses = function () {
            $scope.plan.additionalDisplayLicenses = _getAdditionalDisplayLicenses() + 1;
          };

          $scope.decrementLicenses = function () {
            if (_getAdditionalDisplayLicenses() === 0) {
              $scope.plan.additionalDisplayLicenses = 0;
            }
            if ($scope.plan.additionalDisplayLicenses > 0) {
              $scope.plan.additionalDisplayLicenses--;
            }
          };

          $scope.getMonthlyPrice = function () {
            return $scope.plan.monthly.billAmount +
              (_getAdditionalDisplayLicenses() * $scope.plan.monthly.priceDisplayMonth);
          };

          $scope.getYearlyPrice = function () {
            return $scope.plan.yearly.billAmount +
              (_getAdditionalDisplayLicenses() * $scope.plan.yearly.priceDisplayYear);
          };

        }
      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")
  .directive("shippingAddress", ["$templateCache", "purchaseFactory",
    function ($templateCache, purchaseFactory) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/checkout-shipping-address.html"),
        link: function ($scope) {
          $scope.shippingAddress = purchaseFactory.purchase.shippingAddress;
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .directive("yearSelector", ["$templateCache",
    function ($templateCache) {
      return {
        restrict: "E",
        template: $templateCache.get("purchase-flow/year-selector.html"),
        replace: "true",
        scope: {
          ngModel: "=?"
        },
        controller: ["$scope",
          function ($scope) {
            var baseYear = new Date().getFullYear();
            var MAX_COUNT = 20;

            $scope.init = function () {
              $scope.years = [];

              if ($scope.ngModel && $scope.ngModel < baseYear) {
                $scope.years.push(($scope.ngModel).toString());
              }

              for (var i = 0; i < MAX_COUNT; i++) {
                $scope.years.push((baseYear + i).toString());
              }
            };

            $scope.init();
          }
        ]

      };
    }
  ]);

angular.module("risevision.common.components.purchase-flow")

.value("PURCHASE_STEPS", [{
  name: "Subscription Details",
  index: 0,
  formName: "reviewSubscriptionForm"
}, {
  name: "Billing Address",
  index: 1,
  formName: "billingAddressForm"
}, {
  name: "Shipping Address",
  index: 2,
  formName: "shippingAddressForm"
}, {
  name: "Payment Method",
  index: 3,
  formName: "paymentMethodsForm"
}, {
  name: "Purchase Review",
  index: 4
}])

.controller("PurchaseModalCtrl", [
  "$scope", "$modalInstance", "$loading", "purchaseFactory", "addressFactory", "PURCHASE_STEPS",
  function ($scope, $modalInstance, $loading, purchaseFactory, addressFactory, PURCHASE_STEPS) {

    $scope.form = {};
    $scope.factory = purchaseFactory;

    $scope.PURCHASE_STEPS = PURCHASE_STEPS;
    $scope.currentStep = 0;
    $scope.finalStep = false;

    $scope.$watch("factory.loading", function (loading) {
      if (loading) {
        $loading.start("purchase-modal");
      } else {
        $loading.stop("purchase-modal");
      }
    });

    var _isFormValid = function () {
      var step = PURCHASE_STEPS[$scope.currentStep];
      var formName = step.formName;
      var form = $scope.form[formName];

      return !form || form.$valid;
    };

    $scope.validateAddress = function (addressObject, contactObject, isShipping) {
      if (!_isFormValid()) {
        return;
      }

      purchaseFactory.loading = true;

      addressFactory.validateAddress(addressObject)
        .finally(function () {
          purchaseFactory.loading = false;

          if (!addressObject.validationError) {
            addressFactory.updateContact(contactObject);
            addressFactory.updateAddress(addressObject, contactObject, isShipping);

            $scope.setNextStep();
          }
        });
    };

    $scope.validatePaymentMethod = function () {
      if (!_isFormValid()) {
        return;
      }

      purchaseFactory.validatePaymentMethod()
        .then($scope.setNextStep);
    };

    $scope.completePayment = function () {
      purchaseFactory.completePayment()
        .then(function () {
          if (!purchaseFactory.purchase.checkoutError) {
            $scope.setNextStep();
          }
        });
    };

    $scope.setNextStep = function () {
      if (!_isFormValid()) {
        return;
      }

      if (($scope.finalStep && $scope.currentStep < 3) || $scope.currentStep === 3) {
        $scope.currentStep = 4;

        $scope.finalStep = true;

        purchaseFactory.getEstimate();
      } else {
        $scope.currentStep++;
      }

    };

    $scope.setPreviousStep = function () {
      if ($scope.currentStep > 0) {
        $scope.currentStep--;
      }
    };

    $scope.setCurrentStep = function (index) {
      purchaseFactory.purchase.checkoutError = null;

      $scope.currentStep = index;
    };

    $scope.close = function () {
      if (!purchaseFactory.purchase.reloadingCompany) {
        $modalInstance.close("success");
      } else {
        purchaseFactory.loading = true;

        $scope.$watch("factory.purchase.reloadingCompany", function (loading) {
          if (!loading) {
            purchaseFactory.loading = false;

            $modalInstance.close("success");
          }
        });
      }
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss("cancel");
    };

  }

]);

angular.module("risevision.common.components.purchase-flow")
  .controller("TaxExemptionModalCtrl", ["$scope", "$modalInstance", "$loading", "taxExemptionFactory",
    function ($scope, $modalInstance, $loading, taxExemptionFactory) {

      $scope.form = {};
      $scope.factory = taxExemptionFactory;

      // $scope.countries = COUNTRIES;
      // $scope.regionsCA = REGIONS_CA;
      // $scope.regionsUS = REGIONS_US;

      $scope.$watch("factory.loading", function (loading) {
        if (loading) {
          $loading.start("tax-exemption-modal");
        } else {
          $loading.stop("tax-exemption-modal");
        }
      });

      $scope.submit = function () {
        if ($scope.form.taxExemptionForm && $scope.form.taxExemptionForm.$invalid) {
          return;
        }

        return taxExemptionFactory.submitCertificate()
          .then(function () {
            if (!taxExemptionFactory.taxExemptionError) {
              $modalInstance.close(true);
            }
          });
      };

      $scope.close = function () {
        $modalInstance.dismiss();
      };

      $scope.selectFile = function () {
        setTimeout(function () {
          document.querySelector("#inputExemption").click();
        }, 0);
      };

      $scope.setFile = function (element) {
        $scope.$apply(function () {
          taxExemptionFactory.taxExemption.file = element.files[0];
        });
      };

      $scope.clearFile = function () {
        taxExemptionFactory.taxExemption.file = null;
        document.querySelector("#inputExemption").value = "";
      };

      // $scope.openDatepicker = function ($event) {
      //   $event.preventDefault();
      //   $event.stopPropagation();
      // 
      //   $scope.datepicker = true;
      // };

      // $scope.countryFilter = function (country) {
      //   return country.code === "CA" || country.code === "US";
      // };

      $scope.isFieldInvalid = function (fieldName) {
        var form = $scope.form.taxExemptionForm;
        var field = form[fieldName];

        return (field.$dirty || form.$submitted) && field.$invalid;
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .filter("cardLastFour", [

    function () {
      return function (last4) {
        last4 = last4 ? last4 : "****";
        last4 = last4.length < 4 ? ("****".substr(last4.length) + last4) : last4;
        last4 = last4.length > 4 ? last4.substr(last4.length - 4) : last4;

        return "***-" + last4;
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .filter("countryName", ["COUNTRIES",
    function (COUNTRIES) {
      return function (countryCode) {
        var name = countryCode;
        for (var i = 0; i < COUNTRIES.length; i++) {
          if (COUNTRIES[i].code === countryCode) {
            name = COUNTRIES[i].name;

            break;
          }
        }
        return name;
      };
    }
  ]);

"use strict";

angular.module("risevision.common.components.purchase-flow")
  .filter("paddedMonth", [

    function () {
      return function (month) {
        if (month < 10) {
          month = "0" + month;
        }

        return month;
      };
    }
  ]);

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/address-form.html',
    '<div class="form-group" ng-if="hideCompanyName !== true" ng-class="{ \'has-error\': isFieldInvalid(\'companyName\') }"><label for="address-form-companyName" class="control-label">Company Name *</label> <input id="address-form-companyName" name="companyName" type="text" class="form-control" ng-model="addressObject.name" autocomplete="organization" aria-required="true" tabindex="1" required=""></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'street\') }"><label for="address-form-streetAddress" class="control-label">Street Address *</label> <input id="address-form-streetAddress" name="street" type="text" class="form-control" ng-model="addressObject.street" autocomplete="address-line1" pattern=".{0,50}" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group"><label for="address-form-unit" class="control-label">Unit</label> <input id="address-form-unit" type="text" name="unit" class="form-control" ng-model="addressObject.unit" autocomplete="address-line2" aria-required="true" tabindex="1" pattern=".{0,100}"></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'city\') }"><label for="address-form-city" class="control-label">City *</label> <input id="address-form-city" name="city" type="text" class="form-control" ng-model="addressObject.city" autocomplete="address-level2" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'country\') }"><label for="address-form-country" class="control-label">Country *</label><select id="address-form-country" name="country" autocomplete="country" class="form-control" ng-model="addressObject.country" ng-options="c.code as c.name for c in countries" empty-select-parser="" aria-required="true" tabindex="1" required=""><option ng-show="false" value="">&lt; Select Country &gt;</option></select></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'province\') }"><label class="control-label">State/Province/Region <span ng-hide="addressObject.country !== \'US\' && addressObject.country !== \'CA\'">*</span></label> <label for="province" class="hidden">Enter Province or Region</label> <input name="province" type="text" class="form-control" ng-model="addressObject.province" autocomplete="address-level1" ng-show="addressObject.country !== \'US\' && addressObject.country !== \'CA\'" province-validator="addressObject.country" tabindex="1"> <label for="province-selector" class="hidden">Select Province (Canada)</label><select name="province-selector" class="form-control selectpicker" ng-model="addressObject.province" ng-options="c[1] as c[0] for c in regionsCA" autocomplete="address-level1" ng-show="addressObject.country === \'CA\'" empty-select-parser="" tabindex="1"><option ng-show="false" value="">&lt; Select Province &gt;</option></select><label for="state-selector" class="hidden">Select State (United States)</label><select name="state-selector" class="form-control selectpicker" ng-model="addressObject.province" ng-options="c[1] as c[0] for c in regionsUS" autocomplete="address-level1" ng-show="addressObject.country === \'US\'" empty-select-parser="" tabindex="1"><option ng-show="false" value="">&lt; Select State &gt;</option></select></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'postalCode\') }"><label for="address-form-postalCode" class="control-label">ZIP/Postal Code *</label> <input id="address-form-postalCode" name="postalCode" type="text" class="form-control" ng-model="addressObject.postalCode" autocomplete="postal-code" pattern=".{0,11}" aria-required="true" tabindex="1" required=""></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-billing-address.html',
    '<div id="checkout-billing-address" class="address-editor"><form id="form.billingAddressForm" role="form" class="u_margin-md-top" name="form.billingAddressForm" autocomplete="on" novalidate=""><div class="alert alert-danger" ng-show="form.billingAddressForm.$submitted && form.billingAddressForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="billingAddress.validationError"><strong>Address Validation Error</strong> {{billingAddress.validationError}}</div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.firstName.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.firstName.$invalid }"><label for="contact-firstName" class="control-label">First Name *</label> <input id="contact-firstName" type="text" class="form-control" name="firstName" ng-model="contact.firstName" autocomplete="given-name" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.lastName.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.lastName.$invalid }"><label for="contact-lastName" class="control-label">Last Name *</label> <input id="contact-lastName" type="text" class="form-control" name="lastName" ng-model="contact.lastName" autocomplete="family-name" aria-required="true" tabindex="1" required=""></div></div></div><div class="row"><div class="col-md-6"><div class="form-group" ng-class="{ \'has-error\': (form.billingAddressForm.email.$dirty || form.billingAddressForm.$submitted) && form.billingAddressForm.email.$invalid }"><label for="contact-email" class="control-label">Email *</label> <input id="contact-email" type="email" class="form-control" name="email" ng-model="contact.email" autocomplete="email" aria-required="true" tabindex="1" required=""></div></div><div class="col-md-6"><div class="form-group"><label for="contact-phone" class="control-label">Telephone</label> <input id="contact-phone" name="tel" type="tel" class="form-control" ng-model="contact.telephone" autocomplete="tel" tabindex="1"></div></div></div><address-form form-object="form.billingAddressForm" address-object="billingAddress"></address-form><hr><div class="row"><div class="col-xs-12"><button id="backButton" type="button" class="btn btn-default pull-left" ng-click="setPreviousStep()" ng-hide="finalStep" aria-label="Go back to Subscription Details" translate="" tabindex="2">common.back</button> <button id="continueButton" aria-label="Continue to Shipping Address" type="submit" form="form.billingAddressForm" class="btn btn-primary pull-right" ng-click="validateAddress(billingAddress, contact, false)" translate="" tabindex="1">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-payment-methods.html',
    '<div id="checkout-payment-methods"><form id="form.paymentMethodsForm" role="form" class="u_margin-md-top" name="form.paymentMethodsForm" novalidate=""><div class="row u_margin-md-top"><div class="col-md-8 col-xs-12 form-inline"><div class="form-group"><label for="payment-method-select" class="u_margin-right">Payment Method</label><select id="payment-method-select" class="form-control selectpicker" ng-model="paymentMethods.paymentMethod" tabindex="1"><option value="card">Credit Card</option><option value="invoice">Invoice Me</option></select></div></div></div><hr><div id="credit-card-form" ng-if="paymentMethods.paymentMethod === \'card\'"><div class="row" ng-if="false"><div class="col-md-12"><div class="form-group"><label for="credit-card-select" class="hidden">Add New Credit Card</label><select id="credit-card-select" class="form-control selectpicker" ng-model="paymentMethods.selectedCard" ng-options="c as getCardDescription(c) for c in paymentMethods.existingCreditCards track by c.id"><option value="">Add New Credit Card</option></select></div></div></div><div id="new-credit-card-form" ng-if="paymentMethods.selectedCard.isNew"><div class="alert alert-danger" ng-show="form.paymentMethodsForm.$submitted && form.paymentMethodsForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="paymentMethods.newCreditCard.validationErrors.length"><strong>Card Validation Error<span ng-show="paymentMethods.newCreditCard.validationErrors.length > 1">s</span></strong><ul><li ng-repeat="error in paymentMethods.newCreditCard.validationErrors">{{error}}</li></ul></div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="paymentMethods.newCreditCard.tokenError"><strong>Card Processing Error</strong> {{paymentMethods.newCreditCard.tokenError}}</div><div class="row"><div class="col-md-12"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardholderName.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardholderName.$invalid }"><label for="new-card-name" lass="control-label">Cardholder Name *</label> <input id="new-card-name" aria-required="true" tabindex="1" type="text" class="form-control" name="cardholderName" data-stripe="name" ng-model="paymentMethods.newCreditCard.name" autocomplete="cc-name" required=""></div></div></div><div class="row"><div class="col-md-12"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardNumber.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardNumber.$invalid }"><label for="new-card-number" class="control-label">Card Number *</label> <input id="new-card-number" type="text" aria-required="true" tabindex="1" class="form-control" placeholder="0000 0000 0000 0000" name="cardNumber" data-stripe="number" ng-model="paymentMethods.newCreditCard.number" autocomplete="cc-number" required=""></div></div></div><div class="row"><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardExpiryMonth.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardExpiryMonth.$invalid }"><label for="new-card-expiry-month" class="control-label">Expiry Month *</label><select id="new-card-expiry-month" aria-required="true" tabindex="1" class="form-control" name="cardExpiryMonth" data-stripe="exp-month" ng-model="paymentMethods.newCreditCard.expMonth" autocomplete="cc-exp-month" integer-parser="" required=""><option ng-show="false" value="">&lt; Select Month &gt;</option><option value="1">01</option><option value="2">02</option><option value="3">03</option><option value="4">04</option><option value="5">05</option><option value="6">06</option><option value="7">07</option><option value="8">08</option><option value="9">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div></div><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardExpiryYear.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardExpiryYear.$invalid }"><label for="expiry-year" class="control-label">Expiry Year *</label><year-selector id="new-card-expiry-year" class="form-control" name="cardExpiryYear" data-stripe="exp-year" ng-model="paymentMethods.newCreditCard.expYear" tabindex="1" autocomplete="cc-exp-year" integer-parser="" required=""></year-selector></div></div><div class="col-md-4"><div class="form-group" ng-class="{ \'has-error\': (form.paymentMethodsForm.cardCvc.$dirty || form.paymentMethodsForm.$submitted) && form.paymentMethodsForm.cardCvc.$invalid }"><label for="new-card-cvc" class="control-label">Security Code *</label> <input id="new-card-cvc" aria-required="true" tabindex="1" type="text" pattern="[0-9]*" class="form-control" name="cardCvc" data-stripe="cvc" ng-model="paymentMethods.newCreditCard.cvc" autocomplete="cc-csc" maxlength="4" required=""></div></div></div><div class="checkbox"><label for="toggleMatchBillingAddress" aria-label="Match Billing Address"><input type="checkbox" id="toggleMatchBillingAddress" ng-model="paymentMethods.newCreditCard.useBillingAddress" tabindex="1"> Same As Billing Address</label></div><div id="new-card-address"><address-form form-object="form.paymentMethodsForm" address-object="paymentMethods.newCreditCard.address" hide-company-name="true" ng-if="!paymentMethods.newCreditCard.useBillingAddress"></address-form></div></div><div id="existing-credit-card-form" ng-if="!paymentMethods.selectedCard.isNew"><div id="errorBox" class="alert alert-danger" role="alert" ng-show="paymentMethods.selectedCard.validationErrors.length"><strong>Card Validation Error</strong> {{paymentMethods.selectedCard.validationErrors[0]}}</div><div class="row"><div class="col-md-12"><div class="form-group"><label for="existing-card-name" class="control-label">Cardholder Name</label> <input id="existing-card-name" type="text" class="form-control" placeholder="{{paymentMethods.selectedCard.name}}" tabindex="1" disabled="disabled"></div></div></div><div class="row"><div class="col-md-12"><div class="form-group"><label for="existing-card-number" class="control-label">Card Number</label> <input id="existing-card-number" type="text" class="form-control" placeholder="{{paymentMethods.selectedCard.last4 | cardLastFour}}" tabindex="1" disabled="disabled"></div></div></div><div class="row form-group"><div class="col-md-4"><div class="form-group"><label for="existing-card-expiry-month" class="control-label">Expiry Month</label> <input id="existing-card-expiry-month" type="text" class="form-control masked" placeholder="{{paymentMethods.selectedCard.expMonth | paddedMonth}}" disabled="disabled" tabindex="1"></div></div><div class="col-md-4"><div class="form-group"><label for="existing-card-expiry-year" class="control-label">Expiry Year</label> <input id="existing-card-expiry-year" type="text" class="form-control masked" placeholder="{{paymentMethods.selectedCard.expYear}}" tabindex="1" disabled="disabled"></div></div></div></div></div><div id="generateInvoice" ng-if="paymentMethods.paymentMethod === \'invoice\'"><p>If you\'d like to be invoiced for your purchase (rather than paying now by credit card), please enter a <b>Purchase Order</b> number and continue with checkout.</p><p>You will receive an invoice for this purchase total at <span class="font-weight-bold">{{contactEmail}}</span>. Invoices are due within 30 days of creation, payable by check, wire transfer, or credit card.</p><p>Please note your invoice is generated only once this checkout is completed.</p><div class="row"><div class="col-xs-12 col-sm-6"><div class="form-group"><label for="invoice-po-number" class="control-label">Purchase Order Number</label> <input id="invoice-po-number" type="text" class="form-control" name="purchaseOrder" ng-model="paymentMethods.purchaseOrderNumber" tabindex="1"></div></div></div><div id="generateInvoiceOverdue" class="hidden"><p class="text-danger">You have overdue invoice payments on your account.</p><p>In order to complete this purchase by invoice, please pay your outstanding invoices <a href="#">here</a>.</p></div></div><hr><div class="row"><div class="col-xs-12 text-center u_margin-sm-bottom"><a id="showTaxExemption" href="#" aria-label="Are you Tax Exempt?" ng-click="showTaxExemptionModal()" ng-show="!purchase.taxExemptionSent" tabindex="3" translate="">Are you Tax Exempt?</a><h5 ng-show="purchase.taxExemptionSent">Tax Exemption Submitted</h5></div></div><div class="row"><div class="col-xs-12"><button id="backButton" type="button" aria-label="Go back to Shipping Address" class="btn btn-default pull-left" ng-click="setPreviousStep()" ng-hide="finalStep" tabindex="2" translate="">common.back</button> <button id="continueButton" type="submit" aria-label="Continue to Purchase Review" form="form.paymentMethodsForm" class="btn btn-primary pull-right" ng-click="validatePaymentMethod()" tabindex="1" translate="">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-review-purchase.html',
    '<div id="checkout-review-purchase"><div id="errorBox" class="alert alert-danger" role="alert" ng-show="purchase.estimate.estimateError"><div class="row"><div class="col-xs-9"><p><strong>Tax Estimate Error</strong> {{purchase.estimate.estimateError}}</p></div><div class="col-xs-3"><a class="btn btn-default btn-block" href="#" ng-click="factory.getEstimate()">Retry</a></div></div></div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="purchase.checkoutError"><strong>Payment Error</strong> {{purchase.checkoutError}}</div><div class="row"><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Purchasing For</h4><span class="font-weight-bold">{{selectedCompany.name}}</span><br>Company ID: {{selectedCompany.id}}</div><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Payment Method <button aria-label="Edit Payment Method" class="btn btn-default btn-xs" ng-click="setCurrentStep(3)" tabindex="1">Edit</button></h4><div ng-show="purchase.paymentMethods.paymentMethod === \'card\'"><span class="font-weight-bold">{{purchase.paymentMethods.selectedCard.cardType}}</span><br>{{purchase.paymentMethods.selectedCard.last4 | cardLastFour}}<br>Exp: {{purchase.paymentMethods.selectedCard.expMonth | paddedMonth}}/{{purchase.paymentMethods.selectedCard.expYear}}</div><div ng-show="purchase.paymentMethods.paymentMethod === \'invoice\'"><span class="font-weight-bold">Paying by Invoice</span><br>Due Date: {{purchase.paymentMethods.invoiceDate | date: \'d-MMM-yyyy\'}} <span ng-if="purchase.paymentMethods.purchaseOrderNumber"><br>Purchase Order Number: {{purchase.paymentMethods.purchaseOrderNumber}}</span></div></div></div><div class="row"><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Billing Address <button aria-label="Edit Billing Address" class="btn btn-default btn-xs" ng-click="setCurrentStep(1)" tabindex="1">Edit</button></h4>{{purchase.contact.firstName}} {{purchase.contact.lastName}}<br>{{purchase.contact.email}}<br>{{purchase.billingAddress.name}}<br>{{purchase.billingAddress.street}}<br><span ng-show="purchase.billingAddress.unit">{{purchase.billingAddress.unit}}<br></span> {{purchase.billingAddress.city}}, <span ng-show="purchase.billingAddress.province">{{purchase.billingAddress.province}},</span> {{purchase.billingAddress.postalCode}}<br>{{purchase.billingAddress.country | countryName}}</div><div class="col-md-6 u_margin-sm-top"><h4 class="u_margin-sm-bottom">Shipping Address <button aria-label="Edit Shipping Address" class="btn btn-default btn-xs" ng-click="setCurrentStep(2)" tabindex="1">Edit</button></h4>{{purchase.shippingAddress.name}}<br>{{purchase.shippingAddress.street}}<br><span ng-show="purchase.shippingAddress.unit">{{purchase.shippingAddress.unit}}<br></span> {{purchase.shippingAddress.city}}, <span ng-show="purchase.shippingAddress.province">{{purchase.shippingAddress.province}},</span> {{purchase.shippingAddress.postalCode}}<br>{{purchase.shippingAddress.country | countryName}}</div></div><br><hr class="u_margin-xs-top u_margin-xs-bottom"><div class="row"><div class="col-xs-8"><h4 class="u_margin-sm-bottom">Subscription Details <button aria-label="Edit Subscription Details" class="btn btn-default btn-xs" ng-click="setCurrentStep(0)" tabindex="1">Edit</button></h4></div></div><div class="row"><div class="col-sm-4 col-xs-6 text-right"><p>{{purchase.plan.name}} ({{ purchase.plan.isMonthly ? \'Monthly\' : \'Yearly\' }})<br><span ng-show="purchase.plan.additionalDisplayLicenses">{{purchase.plan.additionalDisplayLicenses}} Additional Display<span ng-show="purchase.plan.additionalDisplayLicenses > 1">s</span><br></span> <span ng-repeat="tax in purchase.estimate.taxes">{{tax.taxName}}<br></span> Total Tax:</p><span class="order-total">Order Total:</span></div><div class="col-sm-4 col-xs-6 text-right"><p>${{getPlanPrice()}}<br><span ng-show="purchase.plan.additionalDisplayLicenses">${{getAdditionalDisplaysPrice()}}<br></span> <span ng-repeat="tax in purchase.estimate.taxes">${{tax.taxAmount | number:2}}<br></span> ${{purchase.estimate.totalTax | number:2}}</p><span class="order-total">${{purchase.estimate.total | number:2}} <span class="u_margin-left text-subtle">{{purchase.estimate.currency | uppercase}}</span></span></div></div><div class="row"><hr class="u_margin-sm-top"></div><div class="row"><div class="col-xs-12 text-center u_margin-sm-bottom"><a id="showTaxExemption" href="#" aria-label="Are you Tax Exempt?" ng-click="showTaxExemptionModal()" ng-show="purchase.estimate.totalTax > 0 && !purchase.taxExemptionSent" tabindex="3" translate="">Are you Tax Exempt?</a><h5 ng-show="purchase.taxExemptionSent">Tax Exemption Submitted</h5></div></div><div class="row"><div class="col-xs-8 col-xs-offset-2 u_margin-md-bottom"><button id="payButton" class="btn btn-primary btn-hg btn-block" ng-click="completePayment()" tabindex="1" aria-label="Complete Payment"><span id="payLabel" ng-if="purchase.paymentMethods.paymentMethod === \'card\'">Pay ${{purchase.estimate.total | number:2}} Now</span> <span id="invoiceLabel" ng-if="purchase.paymentMethods.paymentMethod === \'invoice\'">Invoice Me ${{purchase.estimate.total | number:2}} Now</span></button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-review-subscription.html',
    '<div id="checkout-review-subscription"><form id="reviewSubscriptionForm" role="form" name="form.reviewSubscriptionForm" autocomplete="on" novalidate=""><h3 class="text-center" translate="" translate-values="{ planName: plan.name }">common-header.purchase.review-subscription.plan-name</h3><div class="subscription-summary text-center"><div class="subscription-summary-item"><div class="stat"><div class="stat-value">${{plan.monthly.priceDisplayMonth}}</div><div class="stat-legend">{{ \'common-header.purchase.review-subscription.per-display\' | translate}} {{ \'common-header.purchase.review-subscription.per-month\' | translate}}</div></div></div><div class="subscription-summary-divider">x</div><div class="subscription-summary-item"><div class="stat"><div class="stat-value">{{plan.proLicenseCount}}</div><div class="stat-legend"><span ng-show="plan.proLicenseCount === 1" translate="">common-header.purchase.review-subscription.display-included</span> <span ng-show="plan.proLicenseCount > 1" translate="">common-header.purchase.review-subscription.displays-included</span></div></div></div></div><hr class="u_remove-margin"><div class="text-center flex-additive-rule"><b>+</b></div><div class="row"><div class="col-xs-12 u_margin-md-bottom" translate="" translate-values="{ planName: plan.name, priceDisplayMonth: plan.monthly.priceDisplayMonth }">common-header.purchase.review-subscription.need-more-displays</div><div class="col-xs-12"><div class="input-group spinner" ng-class="{ \'has-error\': form.reviewSubscriptionForm.additionalLicenses.$invalid }"><div class="input-group-btn-vertical"><button class="btn btn-white" type="button" ng-click="incrementLicenses()"><i class="fa fa-caret-up"></i></button> <button class="btn btn-white" type="button" ng-click="decrementLicenses()"><i class="fa fa-caret-down"></i></button></div><label for="additionalLicenses"><input id="additionalLicenses" name="additionalLicenses" type="number" class="form-control" ng-model="plan.additionalDisplayLicenses" min="0" max="999" pattern="[0-9]{1,3}" tabindex="1" aria-required="true" required=""> <span class="icon-right u_align-middle" translate="">common-header.purchase.review-subscription.additional-licenses</span></label></div></div><div class="col-xs-12"><hr></div><div class="col-xs-12 u_margin-sm-bottom"><b class="pull-left" translate="">common-header.purchase.review-subscription.total</b> <b class="pull-right" translate="">common-header.purchase.review-subscription.pay-yearly</b></div><div class="col-xs-12"><div class="panel payment-recurrence-selector" ng-class="{ \'has-error\': form.reviewSubscriptionForm.billingPeriod.$invalid }"><div class="radio" ng-class="{ active: plan.isMonthly }"><label for="monthlyBilling"><input type="radio" name="billingPeriod" id="monthlyBilling" ng-value="true" ng-model="plan.isMonthly" aria-required="true" tabindex="1" required=""> <span translate="" translate-values="{ monthlyPrice: getMonthlyPrice() }">common-header.purchase.review-subscription.billed-monthly</span></label></div><div class="radio" ng-class="{ active: !plan.isMonthly }"><label for="yearlyBilling"><input type="radio" name="billingPeriod" id="yearlyBilling" ng-value="false" ng-model="plan.isMonthly" aria-required="true" tabindex="1" required=""> <span translate="" translate-values="{ yearlyPrice: getYearlyPrice() }">common-header.purchase.review-subscription.billed-yearly</span></label><div class="label label-success" translate="" translate-values="{ saveYearly: plan.yearly.save }">common-header.purchase.review-subscription.save-yearly</div></div></div></div></div><hr><div class="row"><div class="col-xs-12"><button id="continueButton" type="submit" aria-label="Continue to Billing Address" tabindex="1" form="form.reviewSubscriptionForm" class="btn btn-primary pull-right" ng-click="setNextStep()" translate="">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-shipping-address.html',
    '<div id="checkout-shipping-address" class="address-editor"><form id="form.shippingAddressForm" role="form" class="u_margin-md-top" name="form.shippingAddressForm" autocomplete="on" novalidate=""><div class="alert alert-danger" ng-show="form.shippingAddressForm.$submitted && form.shippingAddressForm.$invalid">Please complete the missing information below.</div><div id="errorBox" class="alert alert-danger" role="alert" ng-show="shippingAddress.validationError"><strong>Address Validation Error</strong> {{shippingAddress.validationError}}</div><address-form form-object="form.shippingAddressForm" address-object="shippingAddress"></address-form><hr><div class="row"><div class="col-xs-12"><button id="backButton" aria-label="Go back to Billing Address" type="button" class="btn btn-default pull-left" ng-click="setPreviousStep()" ng-hide="finalStep" tabindex="2" translate="">common.back</button> <button id="continueButton" type="submit" form="form.shippingAddressForm" class="btn btn-primary pull-right" aria-label="Continue to Payment Method" ng-click="validateAddress(shippingAddress, null, true)" tabindex="1" translate="">common.continue</button></div></div></form></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/checkout-success.html',
    '<div id="checkout-success"><h3 class="text-center u_margin-md-top" ng-if="purchase.paymentMethods.paymentMethod === \'card\'">Payment Successful</h3><h3 class="text-center u_margin-md-top" ng-if="purchase.paymentMethods.paymentMethod === \'invoice\'">Invoice Generated</h3><div class="text-center u_padding-md"><img src="https://s3.amazonaws.com/Rise-Images/Icons/online.svg" width="72px" alt="Payment Successful"><br><br><p ng-if="purchase.paymentMethods.paymentMethod === \'card\'">Your payment to Rise Vision was successful. You can keep track of your billing information in the <a ui-sref="apps.billing.home">Billing</a> section of your account.</p><p ng-if="purchase.paymentMethods.paymentMethod === \'invoice\'">An invoice for payment has been sent to <span class="font-weight-bold">{{purchase.contact.email}}</span>. Payment is due by {{purchase.paymentMethods.invoiceDate | date: \'d-MMM-yyyy\'}}. <span class="hidden">You can view this invoice <a href="#">here</a>.</span></p><br></div><hr><div class="row"><div class="col-xs-12 text-center"><button id="doneButton" class="btn btn-default" ng-click="close()" aria-label="Done" tabindex="1">Done</button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/purchase-modal.html',
    '<div rv-spinner="" rv-spinner-key="purchase-modal" rv-spinner-start-active="1"><div class="modal-header"><button type="button" class="close" ng-click="dismiss()" aria-label="close" tabindex="2" ng-hide="currentStep === 5"><i class="fa fa-times"></i></button><h3 class="modal-title" translate="">Checkout</h3></div><div class="steps"><div ng-repeat="step in PURCHASE_STEPS" class="step-item" ng-class="{ active: currentStep === step.index, complete: currentStep > step.index }"><span>{{step.name}}</span></div></div><div id="purchase-modal" class="modal-body checkout-modal" stop-event="touchend"><review-subscription ng-if="currentStep === 0"></review-subscription><billing-address ng-if="currentStep === 1"></billing-address><shipping-address ng-if="currentStep === 2"></shipping-address><payment-methods ng-if="currentStep === 3"></payment-methods><review-purchase ng-if="currentStep === 4"></review-purchase><checkout-success ng-if="currentStep === 5"></checkout-success></div><div id="security-branding" class="modal-footer text-center" ng-show="currentStep > 2 && currentStep < 5"><span class="text-muted"><i class="fa fa-lock icon-left"></i> Secure Checkout from ChargeBee and <img alt="powered by Stripe" height="16" src="https://s3.amazonaws.com/Rise-Images/UI/powered_by_stripe.svg"></span></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/tax-exemption.html',
    '<div rv-spinner="" rv-spinner-key="tax-exemption-modal" rv-spinner-start-active="1"><div class="modal-header"><button ng-click="close()" type="button" class="close" aria-hidden="true"><i class="fa fa-times"></i></button><h3 class="modal-title">Add Tax Exemption</h3></div><div class="modal-body"><form id="form.taxExemptionForm" role="form" name="form.taxExemptionForm" class="u_margin-md-top" novalidate=""><div class="alert alert-danger" ng-show="form.taxExemptionForm.$submitted && form.taxExemptionForm.$invalid">Please complete the missing information below.</div><div class="alert alert-danger" ng-show="factory.taxExemptionError">{{factory.taxExemptionError}}</div><div class="row"><div class="col-xs-12"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'number\') }"><label for="number" class="control-label">Tax Exemption Number *</label> <input name="number" id="number" type="text" class="form-control" ng-model="factory.taxExemption.number" tabindex="1" maxlength="25" required=""></div></div></div><div class="row"><div class="col-md-9"><div class="form-group" ng-class="{ \'has-error\': isFieldInvalid(\'fileName\') }"><label for="fileName" class="control-label">Tax Exemption Document (Image or PDF only) *</label> <input id="inputExemption" type="file" accept="application/pdf,image/*" onchange="angular.element(this).scope().setFile(this)" style="display:none"><div class="input-group"><input name="fileName" id="fileName" class="form-control" type="text" readonly="readonly" ng-model="factory.taxExemption.file.name" required=""> <span class="input-group-btn"><a href="#" ng-click="clearFile()" tabindex="1" class="btn btn-default"><i class="fa fa-times"></i></a></span></div></div></div><div class="col-md-3"><div class="form-group"><label for="selectFile" class="control-label col-md-6 hidden-xs">&nbsp;</label> <button name="selectFile" id="selectFile" type="button" ng-click="selectFile()" tabindex="1" class="btn btn-default col-md-9">Attach File</button></div></div></div><hr><div class="row"><div class="col-xs-12"><button type="button" ng-click="close()" aria-label="Cancel Tax Exemption" tabindex="2" class="btn btn-default pull-left" translate="">common.cancel</button> <button id="submitButton" type="submit" form="form.taxExemptionForm" ng-click="submit()" aria-label="Submit Tax Exemption" tabindex="1" class="btn btn-primary pull-right">Submit Tax Exemption</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('risevision.common.components.purchase-flow');
} catch (e) {
  module = angular.module('risevision.common.components.purchase-flow', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('purchase-flow/year-selector.html',
    '<select ng-options="n as n for n in years"><option ng-show="false" value="">&lt; Select Year &gt;</option></select>');
}]);
})();

/*
 * App Configuration File
 * Put environment-specific global variables in this file.
 *
 * In general, if you put an variable here, you will want to
 * make sure to put an equivalent variable in all three places:
 * dev.js, stage.js & prod.js
 *
 */
(function (angular) {
  "use strict";

  try {
    angular.module("risevision.common.config");
  } catch (err) {
    angular.module("risevision.common.config", []);
  }

  angular.module("risevision.common.i18n.config", [])
    .constant("LOCALES_PREFIX", "locales/translation_")
    .constant("LOCALES_SUFIX", ".json");

  angular.module("risevision.common.config")
    .value("ENABLE_INTERCOM_MESSAGING", false)
    .value("ENABLE_EXTERNAL_LOGGING", true)
    .value("CORE_URL", "https://rvaserver2.appspot.com/_ah/api")
    .value("COOKIE_CHECK_URL", "//storage-dot-rvaserver2.appspot.com")
    .value("STORE_URL", "https://store.risevision.com/")
    .value("STORE_SERVER_URL",
      "https://store-dot-rvaserver2.appspot.com/")
    .value("STORE_ENDPOINT_URL",
      "https://store-dot-rvaserver2.appspot.com/_ah/api")
    .value("STORAGE_ENDPOINT_URL",
      "https://storage-dot-rvaserver2.appspot.com/_ah/api")
    .value("GSFP_URL", "https://gsfp-dot-rvaserver2.appspot.com/fp")
    .value("SUPPORT_PRODUCT_CODE", "4c8c2f1a481d0ad84c6b16a9c6e90e2fc2252944")
    .value("SUPPORT_PRODUCT_ID", "14")
    .value("SUPPORT_PRODUCT_URL",
      "https://store.risevision.com/products/?cat=compareSupport")
    .value("APPS_URL", "https://apps.risevision.com")
    .value("CHARGEBEE_TEST_SITE", "risevision-test")
    .value("CHARGEBEE_PROD_SITE", "risevision")
    .value("STRIPE_PROD_KEY", "pk_live_31dWkTWQU125m2RcWpK4HQBR")
    .value("STRIPE_TEST_KEY", "pk_test_GrMIAHSoqhaik4tcHepsxjOR");
})(angular);
