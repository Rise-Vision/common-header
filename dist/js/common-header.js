(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app-nav-buttons-menu.html",
    "<ul>\n" +
    "  <li>\n" +
    "    <div class=\"menu-box pull-right\">\n" +
    "      <a href=\"https://store.risevision.com/\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseStore\"></svg-icon>\n" +
    "        <span>Store</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"menu-box pull-right\">\n" +
    "      <a href=\"http://rva.risevision.com/#PRESENTATIONS\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseEditor\"></svg-icon>\n" +
    "        <span>Editor</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    \n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <div class=\"menu-box pull-left\">\n" +
    "      <a href=\"http://storage.risevision.com/\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseStorage\"></svg-icon>\n" +
    "        <span>Storage</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"menu-box pull-left\">\n" +
    "      <a href=\"http://rva.risevision.com/#DISPLAYS\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseDisplays\"></svg-icon>\n" +
    "        <span>Displays</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    \n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <div class=\"menu-box pull-left\">\n" +
    "      <a href=\"http://rva.risevision.com/#SCHEDULES\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseSchedules\"></svg-icon>\n" +
    "        <span>Schedules</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"menu-box pull-right\">\n" +
    "      <a href=\"https://support.risevision.com/#/\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseSupport\"></svg-icon>\n" +
    "        <span>Support</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <div class=\"menu-box pull-left\">\n" +
    "      <a href=\"https://community.risevision.com/rise_vision_inc\" target=\"_blank\">\n" +
    "        <svg-icon p=\"riseCommunity\"></svg-icon>\n" +
    "        <span>Community</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"menu-box pull-right\">\n" +
    "      <a href=\"http://help.risevision.com/\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseDocumentation\"></svg-icon>\n" +
    "        <span>Documentation</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </li>\n" +
    "  <li>\n" +
    "    <div class=\"menu-box pull-left\">\n" +
    "      <a href=\"http://developer.risevision.com/\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseDevelopers\"></svg-icon>\n" +
    "        <span>Developer</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"menu-box pull-right\">\n" +
    "      <a href=\"http://www.risevision.com/about-us/#\" target=\"_blank\" link-cid>\n" +
    "        <svg-icon p=\"riseLogo\"></svg-icon>\n" +
    "        <span>About</span>\n" +
    "      </a>\n" +
    "    </div>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app-nav-buttons.html",
    "<li dropdown class=\"dropdown hidden-xs\">\n" +
    "  <a href=\"\" dropdown-toggle class=\"dropdown-toggle\"><i class=\"fa fa-th\"></i></a>\n" +
    "  <div class=\"dropdown-menu app-navigation\" role=\"menu\">\n" +
    "    <ng-include \n" +
    "      replace-include\n" +
    "      src=\"'app-nav-buttons-menu.html'\">\n" +
    "    </ng-include>\n" +
    "  </div>\n" +
    "</li>\n" +
    "\n" +
    "<!-- Mobile -->\n" +
    "<li class=\"visible-xs-inline-block\" >\n" +
    "  <a href=\"\" class=\"company-buttons-icon-mobile\"\n" +
    "  action-sheet=\"'app-nav-buttons-menu.html'\"\n" +
    "  action-sheet-class=\"app-navigation\">\n" +
    "    <i class=\"fa fa-th\"></i>\n" +
    "  </a>\n" +
    "</li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("auth-buttons-menu.html",
    "<company-buttons\n" +
    "  ng-show=\"isRiseVisionUser\"\n" +
    "  ng-controller=\"CompanyButtonsCtrl\"\n" +
    "></company-buttons>\n" +
    "\n" +
    "<ul>\n" +
    "  <li ng-show=\"isRiseVisionUser\">\n" +
    "    <a href=\"\" ng-click=\"userSettings()\" class=\"user-settings-button action\">\n" +
    "      <i class=\"fa fa-user\"></i>\n" +
    "      <span class=\"item-name\">User Settings</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <li class=\"dropdown-footer text-right\" ng-show=\"isLoggedIn\">\n" +
    "    <button class=\"sign-out-button btn btn-sm btn-default\" ng-click=\"logout()\">Sign Out <i class=\"fa fa-sign-out\"></i>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("auth-buttons.html",
    "<!-- Desktop and tablet -->\n" +
    "<li\n" +
    "  ng-show=\"isLoggedIn && !isRiseVisionUser && !undetermined && !loading\">\n" +
    "  <button type=\"button\" href=\"\" ng-click=\"register()\"\n" +
    "    class=\"register-user-menu-button action top-auth-button\">\n" +
    "    Create Account\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li\n" +
    "  dropdown\n" +
    "  class=\"dropdown user-profile-dropdown desktop-menu-item\"\n" +
    "  ng-class=\"{'hidden-xs': isLoggedIn}\"\n" +
    "  ng-show=\"isLoggedIn\"\n" +
    "  >\n" +
    "    <a href=\"\" dropdown-toggle class=\"dropdown-toggle\">\n" +
    "      <div class=\"user-id pull-left add-right\">\n" +
    "        <span class=\"username\">{{username}}</span>\n" +
    "        <span><strong>{{companyName}}</strong></span>\n" +
    "      </div>\n" +
    "      <img ng-src=\"{{userPicture}}\"\n" +
    "        class=\"profile-pic\" width=\"30\" height=\"30\" alt=\"User\" />\n" +
    "    </a>\n" +
    "    <div class=\"dropdown-menu\" role=\"menu\">\n" +
    "      <ng-include\n" +
    "        src=\"'auth-buttons-menu.html'\"\n" +
    "        replace-include\n" +
    "      ></ng-include>\n" +
    "    </div>\n" +
    "</li>\n" +
    "<!-- Mobile -->\n" +
    "<li\n" +
    "  dropdown\n" +
    "  class=\"dropdown user-profile-dropdown mobile-menu-item\"\n" +
    "  ng-class=\"{'visible-xs-inline-block': isLoggedIn}\"\n" +
    "  ng-show=\"isLoggedIn\"\n" +
    "  >\n" +
    "    <a href=\"\" dropdown-toggle class=\"visible-xs dropdown-toggle\" action-sheet=\"'auth-buttons-menu.html'\"\n" +
    "      action-sheet-class=\"user-profile-dropdown\">\n" +
    "      <div class=\"user-id\">\n" +
    "        <span style=\"max-width:90px\">{{username}}</span>\n" +
    "        <span style=\"max-width:90px\"><strong>{{companyName}}</strong></span>\n" +
    "      </div>\n" +
    "    </a>\n" +
    "</li>\n" +
    "<!-- If User NOT Authenticated -->\n" +
    "<li ng-show=\"!undetermined && isLoggedIn === false\" ng-controller=\"SignUpButtonCtrl\">\n" +
    "  <button type=\"button\" ng-click=\"openSignUpModal()\"\n" +
    "  class=\"btn-primary btn add-right\">\n" +
    "  <i class=\"fa fa-google\"></i> Sign Up Free</button>\n" +
    "</li>\n" +
    "<li ng-show=\"!undetermined && isLoggedIn === false\">\n" +
    "  <button type=\"button\" class=\"sign-in top-auth-button\" ng-click=\"login('registrationComplete')\">\n" +
    "    Sign In\n" +
    "  </button>\n" +
    "</li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("authorization-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\">\n" +
    "  		<i class=\"fa fa-times\"></i>\n" +
    "  	</button>\n" +
    "</div>\n" +
    "<div class=\"modal-body authorization-modal\"\n" +
    "  rv-spinner=\"spinnerOptions\"\n" +
    "  rv-spinner-key=\"authenticate-button\"\n" +
    "  rv-spinner-start-active=\"0\"\n" +
    ">\n" +
    "  <img src=\"//rise-vision.github.io/style-guide/img/avatar_2x.jpg\" class=\"profile-img\">\n" +
    "  <p>Please authorize your Google Account to register with Rise Vision.</p>\n" +
    "\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-fixed-width btn-block authorize-button\" ng-click=\"authenticate(true)\">\n" +
    "    Authorize <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("close-frame-button.html",
    "<li class=\"close-frame\">\n" +
    "  <a href=\"\" class=\"close-frame-button\" ng-click=\"closeIFrame()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </a>\n" +
    "</li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("common-header.html",
    "<!-- Common Header Navbar -->\n" +
    "<nav class=\"navbar navbar-default navbar-static-top\"\n" +
    "	ng-class=\"{'double-margin': isSubcompanySelected}\" role=\"navigation\">\n" +
    "	<div class=\"container\">\n" +
    "\n" +
    "		<div class=\"navbar-header\" style=\"width: 100%;\">\n" +
    "			<a class=\"navbar-brand visible-md visible-lg\"\n" +
    "			  href=\"http://www.risevision.com/\" target=\"{{newTabHome ? '_blank' : '_self'}}\" ng-if=\"!inRVAFrame\">\n" +
    "				<img src=\"//s3.amazonaws.com/rise-common/images/logo-small.png\" class=\"img-responsive logo-small\" width=\"113\" height=\"42\" alt=\"Rise Vision\">\n" +
    "			</a>\n" +
    "			<a class=\"navbar-brand hidden-md hidden-lg text-center\"\n" +
    "				href=\"\" off-canvas-toggle>\n" +
    "				<i class=\"fa fa-bars\"></i>\n" +
    "			</a>\n" +
    "			<!-- If User Authenticated -->\n" +
    "			<!-- Action Nav -->\n" +
    "			<ul class=\"nav navbar-nav navbar-right actions-nav pull-right\">\n" +
    "				<!-- Notifications -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "					ng-if=\"!inRVAFrame\"\n" +
    "				  ng-controller=\"SystemMessagesButtonCtrl\"\n" +
    "					src=\"'system-messages-button.html'\"\n" +
    "				></ng-include>\n" +
    "				<!-- Shopping Cart -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "					ng-controller=\"ShoppingCartButtonCtrl\"\n" +
    "					src=\"'shoppingcart-button.html'\"\n" +
    "				></ng-include>\n" +
    "				<!-- Shopping Cart -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "					ng-if=\"inRVAFrame\"\n" +
    "					ng-controller=\"CloseFrameButtonCtrl\"\n" +
    "					src=\"'close-frame-button.html'\"\n" +
    "				></ng-include>\n" +
    "				<!-- Current App -->\n" +
    "				<ng-include\n" +
    "					ng-if=\"!inRVAFrame\"\n" +
    "					replace-include\n" +
    "					src=\"'app-nav-buttons.html'\"\n" +
    "				></ng-include>\n" +
    "				<!-- END Current App -->\n" +
    "				<!-- Auth -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "					ng-if=\"!inRVAFrame\"\n" +
    "				  ng-controller=\"AuthButtonsCtr\"\n" +
    "					src=\"'auth-buttons.html'\"\n" +
    "				></ng-include>\n" +
    "				<li ng-if=\"inRVAFrame\"\n" +
    "				  ng-controller=\"AuthButtonsCtr\"></li>\n" +
    "			</ul>\n" +
    "			<!-- END Action Nav -->\n" +
    "\n" +
    "			<!-- Nav Links -->\n" +
    "			<div class=\"navbar-collapse navbar-left hidden-xs hidden-sm\">\n" +
    "				<ul class=\"nav navbar-nav\">\n" +
    "					<li ng-repeat=\"opt in navOptions\">\n" +
    "						<a ng-href=\"{{opt.link}}\" target=\"{{opt.target}}\" ng-class=\"{'selected': opt.states && opt.states.indexOf(navSelected) > -1}\">{{opt.title}}</a>\n" +
    "					</li>\n" +
    "					<li ng-if=\"!inRVAFrame && !hideHelpMenu\">\n" +
    "						<a href=\"http://www.risevision.com/help/\" target=\"_blank\">\n" +
    "							Help\n" +
    "						</a>\n" +
    "					</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "			<!-- END Nav Links -->\n" +
    "		</div>\n" +
    "\n" +
    "		<ng-include\n" +
    "		replace-include\n" +
    "		ng-controller=\"TestCompanyBannerCtrl\"\n" +
    "		src=\"'test-company-banner.html'\"></ng-include>\n" +
    "		\n" +
    "		<ng-include\n" +
    "		replace-include\n" +
    "		ng-controller=\"SubcompanyBannerCtrl\"\n" +
    "		src=\"'subcompany-banner.html'\"></ng-include>\n" +
    "	</div>\n" +
    "</nav>\n" +
    "\n" +
    "<ng-include\n" +
    "	replace-include\n" +
    "	ng-controller=\"GlobalAlertsCtrl\"\n" +
    "	src=\"'global-alerts.html'\"></ng-include>\n" +
    "\n" +
    "<!-- END Common Header Navbar -->\n" +
    "\n" +
    "<!-- Off Canvas Version of the Nav -->\n" +
    "<nav class=\"off-canvas-nav\" off-canvas-nav>\n" +
    "  <ul class=\"nav nav-pills nav-stacked\">\n" +
    "  	<li off-canvas-toggle>\n" +
    "  		<i class=\"fa fa-times fa-2x pull-right\"></i>\n" +
    "  		<img src=\"//s3.amazonaws.com/rise-common/images/logo-small.png\" class=\"img-responsive logo-small\" width=\"113\" height=\"42\" alt=\"Rise Vision\">\n" +
    "  	</li>\n" +
    "    <li ng-repeat=\"opt in navOptions\">\n" +
    "			<a ng-href=\"{{opt.link}}\" target=\"{{opt.target}}\">{{opt.title}}</a>\n" +
    "		</li>\n" +
    "		<li ng-if=\"!hideHelpMenu\">\n" +
    "			<a target=\"_blank\" href=\"http://www.risevision.com/help\">Help</a>\n" +
    "		</li>\n" +
    "  </ul>\n" +
    "</nav>\n" +
    "<iframe name=\"logoutFrame\" id=\"logoutFrame\" style='display:none'></iframe>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-buttons-menu.html",
    "<ul>\n" +
    "  <li class=\"dropdown-header\" ng-show=\"!isSubcompanySelected\">\n" +
    "    <p>{{username}}</p>\n" +
    "    <p><strong>{{selectedCompanyName}}</strong>\n" +
    "      <span class=\"text-muted\" ng-show=\"isRiseVisionUser && !isSubcompanySelected\">|</span>\n" +
    "      <a href=\"\" ng-click=\"switchCompany()\" ng-show=\"isRiseVisionUser && !isSubcompanySelected\">Select Sub-Company</a>\n" +
    "    </p>\n" +
    "  </li>\n" +
    "\n" +
    "  <li class=\"dropdown-header sub-company-header\" ng-show=\"isSubcompanySelected\">\n" +
    "    <p>You are in Sub-Company <strong>{{selectedCompanyName}}</strong>\n" +
    "    <span class=\"text-muted\">|</span>\n" +
    "     <a href=\"\" ng-click=\"switchCompany()\" ng-show=\"isRiseVisionUser\">Change</a></p>\n" +
    "    <p><a href=\"\" ng-click=\"resetCompany()\">Switch to My Company</a></p>\n" +
    "  </li>\n" +
    "\n" +
    "  <li ng-show=\"isUserAdmin || isRiseAdmin\">\n" +
    "    <a href=\"\" ng-click=\"addSubCompany()\" class=\"action add-subcompany-menu-button\">\n" +
    "      <i class=\"fa fa-plus\"></i>\n" +
    "      <span class=\"item-name\">Add Sub-Company</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li ng-show=\"isUserAdmin || isRiseAdmin\">\n" +
    "    <a href=\"\" ng-click=\"companySettings()\" class=\"action company-settings-menu-button\">\n" +
    "      <i class=\"fa fa-building\"></i>\n" +
    "      <span class=\"item-name\">Company Settings</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li ng-show=\"isUserAdmin || isRiseAdmin\">\n" +
    "    <a href=\"\" data-toggle=\"modal\" ng-click=\"companyUsers()\" class=\"action company-users-menu-button\">\n" +
    "      <i class=\"fa fa-users\"></i>\n" +
    "      <span class=\"item-name\">Company Users</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-fields.html",
    "<div class=\"form-group\" ng-class=\"{'has-error': forms.companyForm.name.$invalid && !forms.companyForm.name.$pristine}\">\n" +
    "  <label for=\"company-settings-name\">\n" +
    "    Name *\n" +
    "  </label>\n" +
    "  <input required id=\"company-settings-name\" type=\"text\" class=\"form-control\"\n" +
    "    ng-model=\"company.name\" name=\"name\" />\n" +
    "  <p ng-show=\"forms.companyForm.name.$invalid && !forms.companyForm.name.$pristine\"\n" +
    "    class=\"help-block validation-error-message-name\">Company name is required.</p>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-6\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-street\" class=\"control-label\">\n" +
    "        Street\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-street\" type=\"text\" class=\"form-control\" ng-model=\"company.street\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-6\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-unit\" class=\"control-label\">\n" +
    "        Unit\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-unit\" type=\"text\" class=\"form-control\" ng-model=\"company.unit\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-3\">      \n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-city\" class=\"control-label\">\n" +
    "        City\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-city\" type=\"text\" class=\"form-control\" ng-model=\"company.city\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-country\" class=\"control-label\">\n" +
    "        Country\n" +
    "      </label>\n" +
    "      <select id=\"company-settings-country\" class=\"form-control selectpicker\"\n" +
    "        ng-model=\"company.country\" ng-options=\"c.code as c.name for c in countries\">\n" +
    "        <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-state\" class=\"control-label\">\n" +
    "        State/Province/Region\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-state\" type=\"text\" class=\"form-control\" ng-model=\"company.province\" ng-hide=\"company.country == 'US' || company.country == 'CA'\" />\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"company.country == 'CA'\">\n" +
    "        <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"company.country == 'US'\">\n" +
    "        <option value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-zip\" class=\"control-label\">\n" +
    "        Zip/Postal Code\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-zip\" type=\"text\" class=\"form-control\" ng-model=\"company.postalCode\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-phone\" class=\"control-label\">\n" +
    "    Phone\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-phone\" type=\"tel\" class=\"form-control\" ng-model=\"company.telephone\"/>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-timezone\" class=\"control-label\">Time Zone</label>\n" +
    "  <select class=\"form-control\" ng-model=\"company.timeZoneOffset\" integer-parser>\n" +
    "    <option value=\"\">&lt; Select Time Zone &gt;</option>\n" +
    "    <option value=\"{{c[1]}}\" ng-repeat=\"c in timezones\">{{c[0]}}</option>\n" +
    "  </select>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-monitoring\">\n" +
    "    Send Monitoring Emails To\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-monitoring\"\n" +
    "    type=\"text\" class=\"form-control\" ng-list=\", \"\n" +
    "     ng-model=\"company.notificationEmails\" placeholder=\"e.g. john.doe@company.com, jane.doe@company.com\"/>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-selector-modal.html",
    "\n" +
    "<form role=\"form\">\n" +
    "	<div class=\"modal-header\">\n" +
    "		<button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n" +
    "		  aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "			<i class=\"fa fa-times\"></i>\n" +
    "		</button>\n" +
    "		<h2 id=\"switch-company\" class=\"modal-title\">\n" +
    "			Select Sub-Company\n" +
    "		</h2>\n" +
    "	</div>\n" +
    "	<div class=\"modal-body jfk-scrollbar\">\n" +
    "	  <!-- Search -->\n" +
    "		<div class=\"input-group company-search add-bottom\">\n" +
    "			<input id=\"csSearch\" type=\"text\" class=\"form-control\"\n" +
    "				placeholder=\"Search Companies\"\n" +
    "				ng-model=\"search.searchString\"\n" +
    "				ng-enter=\"doSearch()\">\n" +
    "		    <span class=\"input-group-addon primary-bg\" ng-click=\"doSearch()\">\n" +
    "		      <i class=\"fa fa-search\"></i>\n" +
    "		    </span>\n" +
    "		</div>\n" +
    "		<!-- List of Companies -->\n" +
    "		<div class=\"list-group scrollable-list\"\n" +
    "		  rv-scroll-event=\"handleScroll($event, isEndEvent)\"\n" +
    "		  rv-spinner rv-spinner-key=\"company-selector-modal-list\"\n" +
    "			rv-spinner-start-active=\"1\"\n" +
    "		>\n" +
    "			<div class=\"list-group-item\"  ng-repeat=\"company in companies.list\" ng-click=\"setCompany(company)\">\n" +
    "				<p class=\"list-group-item-text\"><strong>{{company.name}}</strong><br/><small class=\"text-muted\">{{company | fullAddress}}</small>\n" +
    "				</p>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"modal-footer\">\n" +
    "		<button type=\"button\" class=\"btn btn-default btn-fixed-width\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">Cancel\n" +
    "			<i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "		</button>\n" +
    "	</div>\n" +
    "</form>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-settings-modal.html",
    "<div rv-spinner\n" +
    "  rv-spinner-key=\"company-settings-modal\"\n" +
    "  rv-spinner-start-active=\"1\">\n" +
    "\n" +
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"company-settings-label\" class=\"modal-title\">Company Settings</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body company-settings-modal\">\n" +
    "  <form role=\"form\" name=\"forms.companyForm\">\n" +
    "    <div ng-include=\"'company-fields.html'\"></div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Authentication Key\n" +
    "      </label>\n" +
    "      <a class=\"action-link ps-reset-auth-key\" href=\"\" ng-click=\"resetAuthKey()\">Reset</a>\n" +
    "      <div clss=\"ps-auth-key\">\n" +
    "        {{company.authKey}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Claim ID\n" +
    "      </label>\n" +
    "      <a class=\"action-link ps-reset-claim-id\" href=\"\" ng-click=\"resetClaimId()\">Reset</a>\n" +
    "      <div class=\"ps-claim-id\">\n" +
    "        {{company.claimId}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-hide=\"true\">\n" +
    "      <label>\n" +
    "        Sub-Company Home Page Presentation\n" +
    "      </label>\n" +
    "      <a class=\"action-link\" href=\"\" ng-click=\"showSelector()\">Select</a>\n" +
    "      <a class=\"action-link\" href=\"\">Default</a>\n" +
    "      <div id=\"presentation-name\">Rise Vision Default (ID=a6789044-ae4a-48c7-b6fd-b5d4ffea2f24)</div>\n" +
    "      <div class=\"presentation-selector\" ng-show=\"isSelectorVisible\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <ul class=\"list-unstyled selector-header\">\n" +
    "            <li ng-class=\"{active : selected == 'list'}\">\n" +
    "              <a href=\"\" ng-click=\"showPresentationView($event, 'list')\">Search Presentations</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{active : selected == 'search'}\">\n" +
    "              <a href=\"\" ng-click=\"showPresentationView($event, 'search')\">Enter Presentation ID</a>\n" +
    "            </li>\n" +
    "            <li class=\"close-button\">\n" +
    "              <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"closeSelector()\">\n" +
    "                <i class=\"fa fa-times\"></i>\n" +
    "              </button>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"presentation-list\" ng-show=\"selected == 'list'\">\n" +
    "              <div class=\"input-group search\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Search Presentations\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                  <button class=\"btn btn-primary\" type=\"submit\">\n" +
    "                    <i class=\"fa fa-search fa-white\"></i>\n" +
    "                  </button>\n" +
    "                </span>\n" +
    "              </div>\n" +
    "              <div class=\"list-group scrollable-list\">\n" +
    "                <a href=\"\" class=\"list-group-item\" ng-click=\"setPresentation($event, 'Demo Presentation')\">\n" +
    "                  Demo Presentation\n" +
    "                </a>\n" +
    "                <a href=\"\" class=\"list-group-item\" ng-click=\"setPresentation($event, 'My First Presentation')\">\n" +
    "                  My First Presentation\n" +
    "                </a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"presentation-search\" ng-show=\"selected == 'search'\">\n" +
    "              <form role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                  <input id=\"presentation-id\" type=\"text\" class=\"form-control\" placeholder=\"Enter Presentation ID\" />\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                  <a href=\"\" ng-click=\"setPresentation($event)\">Retrieve Presentation</a>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\" ng-hide=\"true\">\n" +
    "        <label for=\"company-settings-community-url\">\n" +
    "          Sub-Company Community URL\n" +
    "        </label>\n" +
    "        <a class=\"action-link\" href=\"\">Default</a>\n" +
    "        <input id=\"company-settings-community-url\" type=\"url\" class=\"form-control\" />\n" +
    "      </div>\n" +
    "      <div class=\"form-group\" ng-hide=\"true\">\n" +
    "        <label for=\"company-settings-support-url\">\n" +
    "          Sub-Company Support URL\n" +
    "        </label>\n" +
    "        <a class=\"action-link\" href=\"\">Default</a>\n" +
    "        <input id=\"company-settings-support-url\" type=\"url\" class=\"form-control\" />\n" +
    "      </div>\n" +
    "      <div class=\"checkbox\" ng-if=\"isRiseStoreAdmin\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\" ng-model=\"company.isSeller\" />\n" +
    "          Registered Seller\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"checkbox\" ng-if=\"isRiseStoreAdmin\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\" ng-model=\"company.isTest\" />\n" +
    "          Test Company\n" +
    "        </label>\n" +
    "      </div>\n" +
    "      <div class=\"form-group\" ng-hide=\"true\">\n" +
    "        <label for=\"company-settings-status\">\n" +
    "          Status\n" +
    "        </label>\n" +
    "        <select id=\"company-settings-status\" class=\"form-control selectpicker\">\n" +
    "          <option value=\"active\">Active</option>\n" +
    "          <option value=\"inactive\">Inactive</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <p class=\"visible-xs text-right\"><last-modified change-date=\"company.changeDate\" changed-by=\"company.changedBy\"></last-modified></p>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-fixed-width pull-left delete-company-button\"\n" +
    "      ng-show=\"!isDeletingCompany\" ng-click=\"deleteCompany()\">\n" +
    "      Delete <i class=\"fa fa-white fa-trash-o icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-confirm-delete\" data-dismiss=\"modal\" ng-show=\"isDeletingCompany\" ng-click=\"closeModal()\">\n" +
    "      Confirm Deletion <i class=\"fa fa-white fa-warning icon-right\"></i>\n" +
    "    </button>\n" +
    "    <div class=\"pull-right\">\n" +
    "      <span class=\"hidden-xs\"><last-modified change-date=\"company.changeDate\" changed-by=\"company.changedBy\"></last-modified></span>\n" +
    "      <button type=\"button\"\n" +
    "        class=\"btn btn-primary btn-fixed-width\" ng-click=\"save()\"\n" +
    "        ng-disabled=\"forms.companyForm.$invalid\">Save\n" +
    "        <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\"\n" +
    "        class=\"btn btn-default btn-fixed-width close-company-settings-button\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Cancel\n" +
    "        <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div> <!--spinner -->\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("company-users-modal.html",
    "<div rv-spinner\n" +
    "  rv-spinner-key=\"company-users-modal\"\n" +
    "  rv-spinner-start-active=\"1\">\n" +
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n" +
    "    aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"company-users-label\" class=\"modal-title\">Company Users</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body company-users-modal\">\n" +
    "  <!-- CSV Button -->\n" +
    "  <div class=\"row action-bar add-bottom\" ng-if=\"false\">\n" +
    "    <button class=\"btn btn-secondary\" ng-csv=\"users\"\n" +
    "      filename=\"users.csv\">Download to CSV</button>\n" +
    "  </div>\n" +
    "  <!-- Search -->\n" +
    "  <div class=\"input-group company-search add-bottom\">\n" +
    "    <input id=\"csSearch\" type=\"text\" class=\"form-control\"\n" +
    "      placeholder=\"Search Users\"\n" +
    "      ng-model=\"search.searchString\"\n" +
    "      ng-enter=\"doSearch()\">\n" +
    "      <span class=\"input-group-addon primary-bg\" ng-click=\"doSearch()\">\n" +
    "        <i class=\"fa fa-search\"></i>\n" +
    "      </span>\n" +
    "  </div>\n" +
    "  <!-- List of Users -->\n" +
    "  <div class=\"list-group scrollable-list company-users-list\"\n" +
    "    rv-spinner\n" +
    "    rv-spinner-key=\"company-users-list\"\n" +
    "    rv-spinner-start-active=\"1\">\n" +
    "    <div class=\"list-group-item  company-users-list-item\"\n" +
    "      ng-repeat=\"user in users | orderBy:sort.field:sort.descending | filter:userSearchString\" ng-click=\"editUser(user.username)\">\n" +
    "      <p class=\"list-group-item-text\"><strong>{{user.firstName}} {{user.lastName}}</strong> <small class=\"text-muted\">{{user.email}}</small></p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-success add-company-user-button\"\n" +
    "    ng-click=\"addUser()\">Add User\n" +
    "    <i class=\"fa fa-white fa-plus icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-default close-company-users-button\"\n" +
    "    data-dismiss=\"modal\" ng-click=\"closeModal()\">\n" +
    "    Cancel <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "</div> <!-- spinner -->\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("global-alerts.html",
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <div class=\"alert alert-danger\" role=\"alert\" ng-repeat=\"msg in errors\">\n" +
    "        <span ng-bind-html=\"msg\"></span>\n" +
    "        <button type=\"button\" class=\"close pull-right\"\n" +
    "          ng-click=\"dismiss('errors', $index);\">\n" +
    "          <i class=\"fa fa-times\"></i>\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("move-company-modal.html",
    "<div rv-spinner\n" +
    "  rv-spinner-key=\"move-company-modal\"\n" +
    "  rv-spinner-start-active=\"1\">\n" +
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"move-company-label\" class=\"modal-title\">Move Company</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body move-company-modal\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"auth-key\">\n" +
    "        Enter the Authentication Key of the Company that you want to move.\n" +
    "      </label>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-6\">\n" +
    "          <input id=\"auth-key\" type=\"text\" class=\"form-control\"\n" +
    "          ng-model=\"company.authKey\" />\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-6\">\n" +
    "          <a href=\"\" class=\"btn btn-secondary retrieve-company-details-button\"\n" +
    "          ng-disabled=\"!company.authKey\"\n" +
    "          ng-click=\"getCompany()\">Retrieve Company Details</a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "  <div ng-show=\"company.name\" class=\"company-details-info\">\n" +
    "    <h3>Details of the Company You Want to Move</h3>\n" +
    "    <div>\n" +
    "      {{company.name}}<br>\n" +
    "      {{company.address}}\n" +
    "      {{company.city}}, {{company.province}}, {{company.country}} {{company.postalCode}}\n" +
    "    </div>\n" +
    "    <h3>Details of the Company You Are Moving the Above Company Under</h3>\n" +
    "    <div class=\"to-company\">\n" +
    "      {{selectedCompany.name}}<br>\n" +
    "      {{selectedCompany.address}}<br>\n" +
    "      {{selectedCompany.city}}, {{selectedCompany.province}},\n" +
    "      {{selectedCompany.country}} {{selectedCompany.postalCode}}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"errors.length > 0\">\n" +
    "    <div class=\"alert alert-danger\" ng-repeat=\"error in errors\">\n" +
    "      {{error}}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div ng-show=\"messages.length > 0\">\n" +
    "    <div class=\"alert alert-success\" ng-repeat=\"message in messages\">\n" +
    "      {{message}}\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\"\n" +
    "    class=\"btn btn-success move-company-button\"\n" +
    "    ng-show=\"company.name && !moveSuccess\" ng-click=\"moveCompany()\">Move Company\n" +
    "    <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-default btn-fixed-width close-move-company-button\" data-dismiss=\"modal\" ng-click=\"closeModal()\">\n" +
    "    {{dismissButtonText}} <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("registration-modal.html",
    "<div rv-spinner\n" +
    "rv-spinner-key=\"registration-modal\"\n" +
    "rv-spinner-start-active=\"1\">\n" +
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 class=\"modal-title\">Welcome To Rise Vision</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body registration-modal\">\n" +
    "  <p>We require an email address that we can reliably reach you at\n" +
    "  for system notices and other critical information. We promise,\n" +
    "   only system notices, we won't send you anything else unless you\n" +
    "  sign up for the newsletter below, and we won't share your email address\n" +
    "  with anyone else.</p>\n" +
    "\n" +
    "  <form novalidate role=\"form\" name=\"forms.registrationForm\">\n" +
    "    <!-- First Name -->\n" +
    "    <div class=\"form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.firstName.$invalid && !forms.registrationForm.firstName.$pristine }\">\n" +
    "      <label for=\"firstName\">First Name</label>\n" +
    "      <input type=\"text\" class=\"form-control firstName\"\n" +
    "      name=\"firstName\"\n" +
    "      id=\"firstName\" required\n" +
    "      ng-model=\"profile.firstName\">\n" +
    "      <p ng-show=\"forms.registrationForm.firstName.$invalid && !forms.registrationForm.firstName.$pristine\"\n" +
    "        class=\"help-block validation-error-message-first-name\">Enter First Name.</p>\n" +
    "    </div>\n" +
    "    <!-- Last Name -->\n" +
    "    <div class=\"form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.lastName.$invalid && !forms.registrationForm.lastName.$pristine }\">\n" +
    "      <label for=\"lastName\">Last Name</label>\n" +
    "      <input type=\"text\" class=\"form-control lastName\"\n" +
    "      name=\"lastName\"\n" +
    "      id=\"lastName\" required\n" +
    "      ng-model=\"profile.lastName\">\n" +
    "      <p ng-show=\"forms.registrationForm.lastName.$invalid && !forms.registrationForm.lastName.$pristine\"\n" +
    "        class=\"help-block validation-error-message-last-name\">Enter Last Name.</p>\n" +
    "    </div>\n" +
    "    <!-- Email -->\n" +
    "    <div class=\"form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.email.$invalid && !forms.registrationForm.email.$pristine }\">\n" +
    "      <label for=\"email\">Email</label>\n" +
    "      <input type=\"email\" class=\"form-control email\"\n" +
    "      name=\"email\"\n" +
    "      id=\"email\" required\n" +
    "      ng-model=\"profile.email\">\n" +
    "      <p ng-show=\"forms.registrationForm.email.$invalid && !forms.registrationForm.email.$pristine\"\n" +
    "        class=\"help-block validation-error-message-email\">Enter a valid email.</p>\n" +
    "    </div>\n" +
    "    <!-- Terms of Service and Privacy -->\n" +
    "    <div class=\"checkbox form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.accepted.$invalid && !userForm.accepted.$pristine }\">\n" +
    "      <label>\n" +
    "      <input type=\"checkbox\" name=\"accepted\"\n" +
    "        ng-model=\"profile.accepted\"\n" +
    "        class=\"accept-terms-checkbox\" required />\n" +
    "      I accept the terms of <a href=\"http://www.risevision.com/terms-service-privacy/\" target=\"_blank\">Service and Privacy</a>\n" +
    "      <p ng-show=\"forms.registrationForm.accepted.$invalid && !forms.registrationForm.accepted.$pristine\"\n" +
    "        class=\"help-block validation-error-message-accepted\">You must accept terms and condtions.</p>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <!-- Newsletter -->\n" +
    "    <div class=\"checkbox form-group\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\" class=\"sign-up-newsletter-checkbox\" ng-model=\"profile.mailSyncEnabled\"> Sign up for our newsletter\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <button ng-click=\"save()\"\n" +
    "        type=\"button\"\n" +
    "        class=\"btn btn-success btn-fixed-width registration-save-button\"\n" +
    "        ng-disabled=\"registering\">\n" +
    "        Save <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-default btn-fixed-width registration-cancel-button\"\n" +
    "      ng-disabled=\"registering\"\n" +
    "      ng-click=\"closeModal()\">\n" +
    "        Cancel <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("shoppingcart-button.html",
    "<li class=\"shopping-cart\" ng-show=\"!hideShoppingCart && isRiseVisionUser\">\n" +
    "<a href=\"{{shoppingCartUrl}}\" class=\"shopping-cart-button\">\n" +
    "  <i class=\"fa fa-shopping-cart\"></i>\n" +
    "  <span id=\"cartBadge\" class=\"label label-primary\" ng-show=\"cart.items.length\">\n" +
    "    {{cart.items.length | surpressZero}}</span>\n" +
    "</a>\n" +
    "</li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("signout-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\" aria-hidden=\"true\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"sign-out-label\" class=\"modal-title\">Sign Out</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body sign-out-modal\">\n" +
    "  <form role=\"form\">\n" +
    "    <p>\n" +
    "      Signing out does not sign you out of your Google Account.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      If you are on a shared computer you should sign out of your Google Account.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      <button type=\"button\" class=\"btn btn-default sign-out-rv-only-button\" ng-click=\"signOut(false)\">Sign Out\n" +
    "        <i class=\"fa fa-sign-out fa-lg icon-right\"></i>\n" +
    "      </button>\n" +
    "    </p>\n" +
    "      <button type=\"button\" class=\"btn btn-default sign-out-google-account\" ng-click=\"signOut(true)\">Sign Out of your Google Account\n" +
    "        <i class=\"fa fa-google-plus-square fa-lg icon-right\"></i>\n" +
    "      </button>\n" +
    "    <p>\n" +
    "    </p>\n" +
    "  </form>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("signup-modal.html",
    "<div class=\"modal-body text-center\" style=\"padding:15px 20px;\">\n" +
    "  <img src=\"//s3.amazonaws.com/rise-common/images/logo-small.png\" class=\"text-center\" width=\"113\" height=\"42\" alt=\"Rise Vision\">\n" +
    "  \n" +
    "  <h1>Enterprise Digital Signage Platform</h1>\n" +
    "  <p class=\"lead\">Use it for Free</p>\n" +
    "  \n" +
    "  <h4 class=\"add-bottom\"><a href=\"http://www.risevision.com\" target=\"_blank\">Learn More about Rise Vision</a></h4>\n" +
    "  \n" +
    "  <button class=\"btn-lg btn btn-primary\" ng-click=\"login('registrationComplete')\">\n" +
    "    <i class=\"fa fa-google fa-lg icon-left\"></i>\n" +
    "    Start with a Google Account\n" +
    "  </button>\n" +
    "  \n" +
    "  <p class=\"text-muted half-top\">Don&apos;t Have a Google Account? <a href=\"https://accounts.google.com/SignUp\" target=\"_blank\">Get One Here.</a></p>\n" +
    "  <p class=\"text-muted half-top\">Already a Rise Vision User? <a ng-click=\"login('registrationComplete'); $event.stopPropagation();\" ng-href=\"#\">Sign In</a></p>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("subcompany-banner.html",
    "<div ng-show=\"isSubcompanySelected && !inRVAFrame\"\n" +
    "  class=\"common-header-alert sub-company-alert\">\n" +
    "  You're in Sub-Company {{selectedCompanyName}}&nbsp;\n" +
    "  <a href=\"\" ng-click=\"switchToMyCompany()\" class=\"link-button\">Switch to My Company</a>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("subcompany-modal.html",
    "<div rv-spinner\n" +
    "  rv-spinner-key=\"add-subcompany-modal\"\n" +
    "  rv-spinner-start-active=\"1\">\n" +
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\" aria-hidden=\"true\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"sub-company-label\" class=\"modal-title\">Add Sub-Company</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body select-subcompany-modal pt-add-subcompany-modal\">\n" +
    "  <form role=\"form\" name=\"forms.companyForm\">\n" +
    "    <div ng-include=\"'company-fields.html'\"></div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <a href=\"\" data-dismiss=\"modal\" data-toggle=\"modal\" class=\"move-subcompany-button\"\n" +
    "        ng-click=\"moveCompany()\">Move a Company Under Your Company</a>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\"\n" +
    "    class=\"btn btn-success btn-fixed-width add-subcompany-save-button\"\n" +
    "    ng-click=\"save()\" ng-disabled=\"forms.companyForm.$invalid\">Save\n" +
    "    <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-default btn-fixed-width cancel-add-subcompany-button\" ng-click=\"closeModal()\">Cancel\n" +
    "    <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("system-messages-button-menu.html",
    "<ul>\n" +
    "  <li class=\"dropdown-header dropdown-title system-message\">\n" +
    "    Notifications\n" +
    "  </li>\n" +
    "  <li class=\"divider\"></li>\n" +
    "  <li class=\"system-message\"\n" +
    "    ng-repeat=\"message in messages\"\n" +
    "    ng-bind-html=\"renderHtml(message.text)\">\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("system-messages-button.html",
    "<!-- Desktop and tablet -->\n" +
    "<li dropdown class=\"dropdown system-messages hidden-xs\"\n" +
    "ng-show=\"isRiseVisionUser && messages.length > 0\">\n" +
    "  <a href=\"\" dropdown-toggle class=\"dropdown-toggle system-messages-button\">\n" +
    "    <i class=\"fa fa-bell\"></i>\n" +
    "    <span class=\"label label-danger system-messages-badge\">{{messages.length | surpressZero}}</span>\n" +
    "  </a>\n" +
    "  <div class=\"dropdown-menu system-messages system-message-list\" role=\"menu\">\n" +
    "    <ng-include\n" +
    "      src=\"'system-messages-button-menu.html'\"\n" +
    "    ></ng-include>\n" +
    "  </div>\n" +
    "</li>\n" +
    "\n" +
    "<!-- Mobile -->\n" +
    "<li\n" +
    "  class=\"system-messages\"\n" +
    "  ng-show=\"isRiseVisionUser  && messages.length > 0\"\n" +
    "  ng-class=\"{'visible-xs-inline-block': isRiseVisionUser && messages.length > 0}\">\n" +
    "    <a href=\"\"\n" +
    "      class=\"system-messages-button\"\n" +
    "      action-sheet=\"'system-messages-button-menu.html'\"\n" +
    "      action-sheet-class=\"system-message-list\">\n" +
    "        <i class=\"fa fa-bell\"></i>\n" +
    "        <span class=\"label label-danger system-messages-badge\">{{messages.length}}</span>\n" +
    "    </a>\n" +
    "</li>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("test-company-banner.html",
    "<div ng-show=\"isTestCompanySelected\"\n" +
    "  class=\"sub-company-alert test-company-alert\">\n" +
    "  This is a Test Company\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("user-settings-modal.html",
    "<div rv-spinner=\"spinnerOptions\"\n" +
    "rv-spinner-key=\"user-settings-modal\"\n" +
    "rv-spinner-start-active=\"1\">\n" +
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"user-settings-label\" class=\"modal-title\">\n" +
    "  <span ng-if=\"!isAdd\">User Settings</span>\n" +
    "  <span ng-if=\"isAdd\">Add User</span>\n" +
    "  </h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body user-settings-modal\">\n" +
    "  <form role=\"form\" novalidate name=\"forms.userSettingsForm\">\n" +
    "    <div class=\"form-group\"\n" +
    "      ng-class=\"{ 'has-error' : forms.userSettingsForm.username.$invalid && !forms.userSettingsForm.username.$pristine }\"\n" +
    "    >\n" +
    "      <label>\n" +
    "        Username *\n" +
    "      </label>\n" +
    "      <div ng-if=\"!isAdd\">{{user.username}}</div>\n" +
    "      <input id=\"user-settings-username\"\n" +
    "        type=\"email\" required name=\"username\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-if=\"isAdd\"\n" +
    "        ng-model=\"user.username\"\n" +
    "        />\n" +
    "        <p ng-show=\"forms.userSettingsForm.username.$invalid && !forms.userSettingsForm.username.$pristine\"\n" +
    "          class=\"help-block validation-error-message-email\">User name must be a valid email address.</p>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\"\n" +
    "      ng-class=\"{ 'has-error' : forms.userSettingsForm.firstName.$invalid && !forms.userSettingsForm.firstName.$pristine }\">\n" +
    "      <label for=\"user-settings-first-name\">\n" +
    "        First Name *\n" +
    "      </label>\n" +
    "      <input id=\"user-settings-first-name\"\n" +
    "        type=\"text\" required name=\"firstName\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"user.firstName\"\n" +
    "        />\n" +
    "        <p ng-show=\"forms.userSettingsForm.firstName.$invalid && !forms.userSettingsForm.firstName.$pristine\"\n" +
    "          class=\"help-block validation-error-message-firstName\">First Name is required.</p>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\"\n" +
    "      ng-class=\"{ 'has-error' : forms.userSettingsForm.lastName.$invalid && !forms.userSettingsForm.lastName.$pristine }\">\n" +
    "      <label for=\"user-settings-last-name\">\n" +
    "        Last Name *\n" +
    "      </label>\n" +
    "      <input id=\"user-settings-last-name\"\n" +
    "        type=\"text\" required name=\"lastName\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"user.lastName\"\n" +
    "        />\n" +
    "        <p ng-show=\"forms.userSettingsForm.lastName.$invalid && !forms.userSettingsForm.lastName.$pristine\"\n" +
    "          class=\"help-block validation-error-message-lastName\">Last Name is required.</p>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-phone\">\n" +
    "        Phone\n" +
    "      </label>\n" +
    "      <input\n" +
    "        id=\"user-settings-phone\"\n" +
    "        type=\"tel\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"user.telephone\"\n" +
    "         />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\"\n" +
    "      ng-class=\"{ 'has-error' : forms.userSettingsForm.email.$invalid && !forms.userSettingsForm.email.$pristine }\">\n" +
    "      <label for=\"user-settings-email\">\n" +
    "        Email *\n" +
    "      </label>\n" +
    "      <input\n" +
    "        id=\"user-settings-email\"\n" +
    "        type=\"email\" required name=\"email\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"user.email\"\n" +
    "        />\n" +
    "        <p ng-show=\"forms.userSettingsForm.email.$invalid && !forms.userSettingsForm.email.$pristine\"\n" +
    "          class=\"help-block validation-error-message-email\">A valid email address is required.</p>\n" +
    "    </div>\n" +
    "    <div class=\"checkbox\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\"\n" +
    "          id=\"user-settings-newsletter\"\n" +
    "          ng-model=\"user.mailSyncEnabled\">\n" +
    "          Subscribe To Email Updates\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Roles\n" +
    "      </label>\n" +
    "      <div class=\"checkbox\" ng-repeat=\"role in availableRoles\"\n" +
    "        ng-show=\"editRoleVisible(role)\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "            id=\"user-settings-{{role.key}}\"\n" +
    "            checklist-model=\"user.roles\"\n" +
    "            ng-disabled=\"!editRoleAllowed(role)\"\n" +
    "            checklist-value=\"role.key\"> {{role.name}}\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-if=\"user.lastLogin\">\n" +
    "      <label>\n" +
    "        Last Login\n" +
    "      </label>\n" +
    "      <div>{{user.lastLogin | humanReadableDateTime}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-if=\"!editingYourself && !isAdd\">\n" +
    "      <label for=\"user-settings-status\">\n" +
    "        Status\n" +
    "      </label>\n" +
    "      <select id=\"user-settings-status\"\n" +
    "        class=\"form-control selectpicker\" ng-model=\"user.status\">\n" +
    "        <option value=\"1\">Active</option>\n" +
    "        <option value=\"0\">Inactive</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <p class=\"text-right\"><last-modified change-date=\"user.changeDate\" changed-by=\"user.changedBy\"></last-modified></p>\n" +
    "  <button type=\"button\" class=\"btn btn-danger btn-fixed-width pull-left\"\n" +
    "    ng-if=\"!isAdd\" ng-click=\"deleteUser()\">\n" +
    "    Delete <i class=\"fa fa-white fa-trash-o icon-right\"></i>\n" +
    "  </button>\n" +
    "  <div class=\"pull-right\">\n" +
    "    <button type=\"button\"\n" +
    "      class=\"btn btn-primary btn-fixed-width\"\n" +
    "      data-dismiss=\"modal\"\n" +
    "      ng-click=\"save()\" id=\"save-button\">\n" +
    "      Save <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-default btn-fixed-width\" ng-click=\"closeModal()\">\n" +
    "      Cancel <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

angular.module("risevision.common.header", [
  "risevision.common.userstate",
  "risevision.common.account",
  "risevision.common.gapi",
  "risevision.core.cache",
  "risevision.core.company",
  "risevision.common.company",
  "risevision.common.localstorage",
  "risevision.common.header.templates",
  "risevision.common.loading",
  "risevision.ui-flow",
  "risevision.common.systemmessages", "risevision.core.systemmessages",
  "risevision.core.countries",
  "risevision.core.oauth2",
  "risevision.common.geodata",
  "risevision.store.data-gadgets",
  "risevision.common.util",
  "risevision.core.userprofile",
  "risevision.common.registration",
  "risevision.common.shoppingcart",
  "checklist-model",
  "ui.bootstrap", "ngSanitize", "rvScrollEvent", "ngCsv", "ngTouch",
  "risevision.common.components.last-modified",
  "risevision.common.svg"
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

.directive("commonHeader", ["$modal", "$rootScope", "$q", "$loading",
  "$interval", "oauth2APILoader", "$log",
  "$templateCache", "userState", "$location", "bindToScopeWithWatch",
  "$document",
  function ($modal, $rootScope, $q, $loading, $interval,
    oauth2APILoader, $log, $templateCache, userState, $location,
    bindToScopeWithWatch, $document) {
    return {
      restrict: "E",
      template: $templateCache.get("common-header.html"),
      scope: false,
      link: function ($scope, element, attr) {
        $scope.navCollapsed = true;
        $scope.inRVAFrame = userState.inRVAFrame();

        // If nav options not provided use defaults
        if (!$scope[attr.navOptions]) {
          $scope.navOptions = [{
            title: "Home",
            link: "#/"
          }, {
            title: "Store",
            link: ""
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
  .run(["$rootScope", "userState", "selectedCompanyUrlHandler",
    function ($rootScope, userState, selectedCompanyUrlHandler) {
      $rootScope.$watch(function () {
          return userState.getSelectedCompanyId();
        },
        function (newCompanyId) {
          if (newCompanyId) {
            selectedCompanyUrlHandler.updateUrl();
          }
        });

      //detect selectCompany changes on route UI
      $rootScope.$on("$locationChangeSuccess", selectedCompanyUrlHandler.updateSelectedCompanyFromUrl);
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
});

angular.module("risevision.common.header")
  .directive("integerParser", [

    function () {
      return {
        require: "ngModel",
        link: function (scope, ele, attr, ctrl) {
          ctrl.$parsers.unshift(function (viewValue) {
            return parseInt(viewValue, 10) || 0;
          });
        }
      };
    }
  ]);

"use strict";

angular.module("risevision.common.header")
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
  .controller("AuthButtonsCtr", ["$scope", "$modal", "$templateCache",
    "userState", "$loading", "cookieStore",
    "$log", "uiFlowManager", "oauth2APILoader", "bindToScopeWithWatch",
    function ($scope, $modal, $templateCache, userState,
      $loading, cookieStore, $log, uiFlowManager, oauth2APILoader,
      bindToScopeWithWatch) {

      window.$loading = $loading; //DEBUG

      $scope.inRVAFrame = userState.inRVAFrame();

      $scope.spinnerOptions = {
        color: "#999",
        hwaccel: true,
        radius: 10
      };

      $scope.register = function () {
        cookieStore.remove("surpressRegistration");
        uiFlowManager.invalidateStatus("registrationComplete");
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
                  backdrop: "static",
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
                        // console.log(userState);
                        // return getAccount().catch(function(data){return data;}, function(){return null;});
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
      $scope.login = function (endStatus) {
        $loading.startGlobal("auth-buttons-login");
        userState.authenticate(true).then().finally(function () {
          $loading.stopGlobal("auth-buttons-login");
          uiFlowManager.invalidateStatus(endStatus);
        });
      };

      $scope.logout = function () {
        $scope.confirmSignOut();
      };

      $scope.confirmSignOut = function (size) {
        var modalInstance = $modal.open({
          template: $templateCache.get("signout-modal.html"),
          controller: "SignOutModalCtrl",
          size: size
        });
        modalInstance.result.finally(function () {
          uiFlowManager.invalidateStatus("registrationComplete");
        });
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

      $loading.startGlobal("auth-buttons-silent");
      oauth2APILoader() //force loading oauth api on startup
      //to avoid popup blocker
      .then().finally(function () {
        userState.authenticate(false).then().finally(function () {
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
  .controller("SignUpModalCtrl", ["$scope", "userState", "uiFlowManager",
    "$loading",
    function ($scope, userState, uiFlowManager, $loading) {

      // Login Modal
      $scope.login = function (endStatus) {
        $loading.startGlobal("auth-buttons-login");
        userState.authenticate(true).then().finally(function () {
          $loading.stopGlobal("auth-buttons-login");
          uiFlowManager.invalidateStatus(endStatus);
        });
      };
    }
  ]);

angular.module("risevision.common.header")
  .controller("SignUpButtonCtrl", ["$scope", "$modal",
    function ($scope, $modal) {

      $scope.openSignUpModal = function () {
        $modal.open({
          templateUrl: "signup-modal.html",
          controller: "SignUpModalCtrl"
        });
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
        shoppingCart.initialize();
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
  .controller("RegistrationModalCtrl", [
    "$scope", "$modalInstance",
    "$loading", "registerAccount", "$log", "cookieStore",
    "userState", "pick", "uiFlowManager", "humanReadableError",
    "agreeToTermsAndUpdateUser", "account",
    function ($scope, $modalInstance, $loading, registerAccount, $log,
      cookieStore, userState, pick, uiFlowManager, humanReadableError,
      agreeToTermsAndUpdateUser, account) {

      var newUser = !account;

      var copyOfProfile = account ? account : userState.getCopyOfProfile() || {};

      //remove cookie so that it will show next time user refreshes page
      cookieStore.remove("surpressRegistration");


      $scope.profile = pick(copyOfProfile, "email", "mailSyncEnabled",
        "firstName", "lastName");
      $scope.registering = false;

      $scope.profile.accepted =
        angular.isDefined(copyOfProfile.termsAcceptanceDate) &&
        copyOfProfile.termsAcceptanceDate !== null;

      if (!angular.isDefined($scope.profile.mailSyncEnabled)) {
        //"no sign up" by default
        $scope.profile.mailSyncEnabled = false;
      }

      $scope.closeModal = function () {
        cookieStore.put("surpressRegistration", true);
        $modalInstance.dismiss("cancel");
      };

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

      $scope.save = function () {
        $scope.forms.registrationForm.accepted.$pristine = false;
        $scope.forms.registrationForm.firstName.$pristine = false;
        $scope.forms.registrationForm.lastName.$pristine = false;
        $scope.forms.registrationForm.email.$pristine = false;

        if (!$scope.forms.registrationForm.$invalid) {
          //update terms and conditions date
          $scope.registering = true;
          $loading.start("registration-modal");


          var action;
          if (newUser) {
            action = registerAccount(userState.getUsername(), $scope.profile);
          } else {
            action = agreeToTermsAndUpdateUser(userState.getUsername(),
              $scope.profile);
          }

          action.then(
            function () {
              userState.refreshProfile().then()
                .finally(function () {
                  $modalInstance.close("success");
                  $loading.stop("registration-modal");
                });
            },
            function (err) {
              alert("Error: " + humanReadableError(err));
              $log.error(err);
            })
            .finally(function () {
              $scope.registering = false;
              userState.refreshProfile();
            });
        }

      };
      $scope.forms = {};
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

.controller("CompanySettingsModalCtrl", ["$scope", "$modalInstance",
  "updateCompany", "companyId", "countries", "REGIONS_CA", "REGIONS_US",
  "TIMEZONES",
  "getCompany", "regenerateCompanyField", "$window", "$loading",
  "humanReadableError",
  "userState", "deleteCompany",
  function ($scope, $modalInstance, updateCompany, companyId,
    countries, REGIONS_CA, REGIONS_US, TIMEZONES, getCompany,
    regenerateCompanyField,
    $window, $loading, humanReadableError, userState, deleteCompany) {

    $scope.company = {
      id: companyId
    };
    $scope.countries = countries;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;
    $scope.timezones = TIMEZONES;
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
          $scope.company.isSeller = company && company.sellerId ? true :
            false;
        },
        function (resp) {
          alert("An error has occurred. " + humanReadableError(resp));
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
            userState.updateCompanySettings($scope.company);
            $modalInstance.close("success");
          })
        .catch(
          function (error) {
            alert("Error(s): " + humanReadableError(error));
          })
        .finally(function () {
          $scope.loading = false;
        });
    };
    $scope.deleteCompany = function () {
      if (confirm("Are you sure you want to delete this company?")) {
        $scope.loading = true;

        deleteCompany($scope.company.id)
          .then(
            function () {
              if (userState.getUserCompanyId() === $scope.company.id) {
                userState.signOut();
              } else if (userState.getSelectedCompanyId() === $scope.company.id) {
                userState.resetCompany();
              }
              $modalInstance.close("success");
            })
          .catch(
            function (error) {
              alert("Error(s): " + humanReadableError(error));
            })
          .finally(function () {
            $scope.loading = false;
          });
      }
    };
    $scope.resetAuthKey = function () {
      if ($window.confirm(
        "Resetting the Company Authentication Key will cause existing Data Gadgets to no longer report data until they are updated with the new Key."
      )) {
        $loading.start("company-settings-modal");
        regenerateCompanyField($scope.company.id, "authKey").then(
          function (resp) {
            $scope.company.authKey = resp.item;
            alert("Successfully changed Authentication Key.");
          },
          function (error) {
            alert("Error: " + humanReadableError(error));
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
            alert("Successfully changed Claim ID.");
          },
          function (error) {
            alert("Error: " + humanReadableError(error));
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
        company.sellerId = undefined;
        company.isTest = undefined;
      }
    }

  }
]);

angular.module("risevision.common.header")
  .controller("SubCompanyModalCtrl", ["$scope", "$modalInstance", "$modal",
    "$templateCache", "createCompany", "countries", "REGIONS_CA",
    "REGIONS_US",
    "TIMEZONES", "userState", "$loading", "humanReadableError",
    function ($scope, $modalInstance, $modal, $templateCache,
      createCompany, countries, REGIONS_CA, REGIONS_US, TIMEZONES, userState,
      $loading, humanReadableError) {

      $scope.company = {};
      $scope.countries = countries;
      $scope.regionsCA = REGIONS_CA;
      $scope.regionsUS = REGIONS_US;
      $scope.timezones = TIMEZONES;

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
          $scope.company).then(function () {
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
  .controller("companySelectorCtr", ["$scope", "$modalInstance",
    "companyService", "companyId", "BaseList", "$loading",
    function ($scope, $modalInstance, companyService,
      companyId, BaseList, $loading) {

      var DB_MAX_COUNT = 20; //number of records to load at a time

      $scope.companies = new BaseList(DB_MAX_COUNT);
      $scope.search = {
        searchString: ""
      };

      $scope.$watch("loading", function (loading) {
        if (loading) {
          $loading.start("company-selector-modal");
          $loading.start("company-selector-modal-list");
        } else {
          $loading.stop("company-selector-modal");
          $loading.stop("company-selector-modal-list");
        }
      });

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };

      function loadCompanies() {
        if (!$scope.companies.endOfList) {
          $scope.loading = true;
          companyService.getCompanies(
            companyId, $scope.search.searchString,
            $scope.companies.cursor, DB_MAX_COUNT, null).then(function (
            result) {
            if (result && result.items) {
              $scope.companies.add(result.items, result.cursor);
            }
          }).finally(function () {
            $scope.loading = false;
          });
        }
      }

      if ($scope.companies.list.length === 0) {
        loadCompanies();
      }

      $scope.doSearch = function () {
        $scope.companies.clear();
        loadCompanies();
      };

      $scope.setCompany = function (company) {
        $modalInstance.close(company.id);
      };

      $scope.handleScroll = function (event, isEndEvent) {
        // $log.debug(event.target.scrollTop + " / " + event.target.scrollHeight + " / " + isEndEvent);
        if (isEndEvent) {
          if ((event.target.scrollHeight - event.target.clientHeight - event.target
            .scrollTop) < 20) {
            //load more rows if less than 20px left to the bottom
            loadCompanies();
          }
        }
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

.filter("roleLabel", ["userRoleMap",
  function (userRoleMap) {
    return function (key) {
      return userRoleMap[key];
    };
  }
])

.controller("CompanyUsersModalCtrl", ["$scope", "$modalInstance", "$modal",
  "$templateCache", "company", "getUsers", "$loading",
  function ($scope, $modalInstance, $modal, $templateCache, company, getUsers,
    $loading) {

    $scope.$watch("loading", function (loading) {
      if (loading) {
        $loading.start("company-users-modal");
        $loading.start("company-users-list");
      } else {
        $loading.stop("company-users-modal");
        $loading.stop("company-users-list");
      }
    });

    $scope.sort = {
      field: "username",
      descending: false
    };

    $scope.search = {
      searchString: ""
    };

    $scope.changeSorting = function (field) {
      var sort = $scope.sort;

      if (sort.field === field) {
        sort.descending = !sort.descending;
      } else {
        sort.field = field;
        sort.descending = false;
      }
    };

    var loadUsers = function () {
      $scope.loading = true;
      getUsers({
        companyId: company.id,
        search: $scope.search.searchString
      }).then(function (users) {
        $scope.users = users;
      }).finally(function () {
        $scope.loading = false;
      });
    };

    loadUsers();

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
      instance.result.finally(loadUsers);
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
      instance.result.finally(loadUsers);
    };

    $scope.closeModal = function () {
      $modalInstance.dismiss("cancel");
    };

    $scope.doSearch = function () {
      $scope.users = [];
      loadUsers();
    };
  }
]);

angular.module("risevision.common.header")
  .filter("humanReadableDateTime", [

    function () {
      return function (d) {
        if (d) {
          d = new Date(d);
          return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() +
            " at " + d.toLocaleTimeString() + " EST"; //always assume EST
        } else {
          return "";
        }
      };

    }
  ])

.controller("AddUserModalCtrl", ["$scope", "addUser", "$modalInstance",
  "companyId", "userState",
  "userRoleMap", "humanReadableError", "$loading", "$timeout",
  function ($scope, addUser, $modalInstance, companyId, userState,
    userRoleMap, humanReadableError, $loading) {
    $scope.user = {
      mailSyncEnabled: false
    };
    $scope.isAdd = true;

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
      if (typeof $scope.user.status === "string") {
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
        addUser(companyId, $scope.user.username, $scope.user).then(
          function () {
            $modalInstance.close("success");
          },
          function (error) {
            alert("Error" + humanReadableError(error));
          }
        ).finally(function () {
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
      if (userState.isRiseAdmin()) {
        return true;
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
])

.controller("UserSettingsModalCtrl", [
  "$scope", "$modalInstance", "updateUser", "getUserProfile", "deleteUser",
  "addUser", "username", "userRoleMap", "$log", "$loading", "userState",
  "uiFlowManager", "humanReadableError",
  function ($scope, $modalInstance, updateUser, getUserProfile, deleteUser,
    addUser, username, userRoleMap, $log, $loading, userState,
    uiFlowManager, humanReadableError) {
    $scope.user = {};
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
      $scope.editingYourself = userState.getUsername() === user.username;

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
            if ($scope.username === userState.getUsername()) {
              userState.signOut().then().finally(function () {
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
      $scope.forms.userSettingsForm.email.$pristine = false;
      $scope.forms.userSettingsForm.firstName.$pristine = false;
      $scope.forms.userSettingsForm.lastName.$pristine = false;

      if (!$scope.forms.userSettingsForm.$invalid) {
        $scope.loading = true;
        updateUser(username, $scope.user).then(
          function () {
            $modalInstance.close("success");
          },
          function (error) {
            $log.debug(error);
            alert("Error: " + humanReadableError(error));
          }
        ).finally(function () {
          if (username === userState.getUsername()) {
            userState.refreshProfile();
          }
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
          userState.getUsername() === $scope.user.username) {
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
      if (userState.isRiseAdmin()) {
        return true;
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
  .controller("SignOutModalCtrl", ["$scope", "$modalInstance", "$log",
    "userState",
    function ($scope, $modalInstance, $log, userState) {

      $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
      };
      $scope.signOut = function (signOutGoogle) {
        userState.signOut(signOutGoogle).then(function () {
          $log.debug("user signed out");
        }, function (err) {
          $log.error("sign out failed", err);
        }).finally(function () {
          $modalInstance.dismiss("success");
        });
      };
    }
  ]);

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
  .directive("offCanvasContent", ["offCanvas", "$swipe",
    function (offCanvas, $swipe) {
      return {
        restrict: "A",
        link: function (scope, iElement) {
          // Swipe coords
          var startCoords;
          // Handle swipe gesture
          $swipe.bind(iElement, {
            "start": function (coords) {
              startCoords = coords;
            },
            "end": function (coords) {
              if (coords.x - startCoords.x > 0) {
                offCanvas.toggle();
              }
            }
          });
        }
      };
    }
  ])
  .directive("offCanvasNav", ["offCanvas", "$swipe",
    function (offCanvas, $swipe) {
      return {
        restrict: "A",
        link: function (scope, iElement) {
          iElement.addClass("off-canvas--nav");
          offCanvas.registerNav(iElement);
          // Swipe coords
          var startCoords;
          // Handle swipe gesture
          $swipe.bind(iElement, {
            "start": function (coords) {
              startCoords = coords;
            },
            "end": function (coords) {
              if (coords.x - startCoords.x < 0) {
                offCanvas.toggle();
              }
            }
          });
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
  angular.module("risevision.common.util", [])

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

  .value("BaseList", function (maxCount) {
    this.list = [];
    this.maxCount = maxCount ? maxCount : 20;
    this.cursor = null;
    this.endOfList = false;
    this.searchString = "";
    this.clear = function () {
      this.list = [];
      this.cursor = null;
      this.endOfList = false;
    };
    this.append = function (items) {
      for (var i = 0; i < items.length; i++) {
        this.list.push(items[i]);
      }
    };
    this.concat = function (items) {
      this.list = this.list.concat(items);
    };
    this.add = function (items, cursor) {
      this.cursor = cursor;
      this.endOfList = items.length < maxCount;
      this.concat(items);
    };
    this.remove = function (index) {
      this.list.splice(index, 1);
    };
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

  angular.module("risevision.common.rvtokenstore", [
    "risevision.common.util", "LocalStorageModule",
    "ngBiscuit"
  ])

  .service("rvTokenStore", ["$log", "$location", "cookieStore",
    "getBaseDomain",
    function ($log, $location, cookieStore, getBaseDomain) {
      var _readRvToken = function () {
        return cookieStore.get("rv-token");
      };

      var _writeRvToken = function (value) {
        var baseDomain = getBaseDomain();
        if (baseDomain === "localhost") {
          cookieStore.put("rv-token", value, {
            path: "/"
          });
        } else {
          cookieStore.put("rv-token", value, {
            domain: baseDomain,
            path: "/"
          });
        }
      };

      var _clearRvToken = function () {
        var baseDomain = getBaseDomain();
        if (baseDomain === "localhost") {
          cookieStore.remove("rv-token", {
            path: "/"
          });
        } else {
          cookieStore.remove("rv-token", {
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

  var stripLeadingSlash = function (str) {
    if (str[0] === "/") {
      str = str.slice(1);
    }
    return str;
  };

  var parseParams = function (str) {
    var params = {};
    str.split("&").forEach(function (fragment) {
      var fragmentArray = fragment.split("=");
      params[fragmentArray[0]] = fragmentArray[1];
    });
    return params;
  };

  angular.module("risevision.common.userstate", [
    "risevision.common.companystate", "risevision.common.util",
    "risevision.common.gapi", "risevision.common.localstorage",
    "risevision.common.config", "risevision.core.cache",
    "risevision.core.oauth2",
    "risevision.core.util", "risevision.core.userprofile",
    "risevision.common.loading", "risevision.ui-flow",
    "risevision.common.rvtokenstore"
  ])

  // constants (you can override them in your app as needed)
  .value("DEFAULT_PROFILE_PICTURE",
    "http://api.randomuser.me/portraits/med/men/33.jpg")
    .value("OAUTH2_SCOPES",
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
  )
    .value("GOOGLE_OAUTH2_URL", "https://accounts.google.com/o/oauth2/auth")

  .run(["$location", "$window", "userState", "$log",
    function ($location, $window, userState, $log) {
      var path = $location.path();
      var params = parseParams(stripLeadingSlash(path));
      $log.debug("URL params", params);
      userState._restoreState();
      if (params.access_token) {
        $log.debug("Setting token", params.access_token);
        userState._setUserToken(params.access_token);
      }
      if (params.state) {
        var state = JSON.parse(decodeURIComponent(params.state));
        if (state.p || state.s) {
          userState._persistState();

          $window.location.replace(state.p +
            state.s +
            state.u
          );
        } else if ($location.$$html5) { // HTML5 mode, clear path
          $location.path("");
        } else { // non HTML5 mode, set hash
          $window.location.hash = state.u;
        }
      }

    }
  ])

  .factory("userState", [
    "$q", "$log", "$location", "CLIENT_ID",
    "gapiLoader", "OAUTH2_SCOPES", "userInfoCache",
    "getOAuthUserInfo", "getUserProfile", "companyState", "objectHelper",
    "$rootScope", "$interval", "$loading", "$window", "GOOGLE_OAUTH2_URL",
    "localStorageService", "$document", "uiFlowManager", "getBaseDomain",
    "rvTokenStore",
    function ($q, $log, $location, CLIENT_ID,
      gapiLoader, OAUTH2_SCOPES, userInfoCache,
      getOAuthUserInfo, getUserProfile, companyState, objectHelper,
      $rootScope, $interval, $loading, $window, GOOGLE_OAUTH2_URL,
      localStorageService, $document, uiFlowManager, getBaseDomain,
      rvTokenStore) {
      //singleton factory that represents userState throughout application

      var _state = {
        profile: {}, //Rise vision profile
        user: {}, //Google user
        roleMap: {},
        userToken: rvTokenStore.read(),
        inRVAFrame: angular.isDefined($location.search().inRVA)
      };

      var _accessTokenRefreshHandler = null;

      var _authenticateDeferred;

      var _detectUserOrAuthChange = function () {
        var token = rvTokenStore.read();
        if (token !== _state.userToken) {
          //token change indicates that user either signed in, or signed out, or changed account in other app
          $window.location.reload();
        } else if (_state.userToken) {
          //make sure user is not signed out of Google account outside of the CH enabled apps
          _authorize(true).finally(function () {
            if (!_state.userToken) {
              $log.debug("Authentication failed. Reloading...");
              $window.location.reload();
            }
          });
        }
      };

      var _addEventListenerVisibilityAPI = function () {
        var visibilityState, visibilityChange;
        var document = $document[0];
        if (typeof document.hidden !== "undefined") {
          visibilityChange = "visibilitychange";
          visibilityState = "visibilityState";
        } else if (typeof document.mozHidden !== "undefined") {
          visibilityChange = "mozvisibilitychange";
          visibilityState = "mozVisibilityState";
        } else if (typeof document.msHidden !== "undefined") {
          visibilityChange = "msvisibilitychange";
          visibilityState = "msVisibilityState";
        } else if (typeof document.webkitHidden !== "undefined") {
          visibilityChange = "webkitvisibilitychange";
          visibilityState = "webkitVisibilityState";
        }

        document.addEventListener(visibilityChange, function () {
          $log.debug("visibility: " + document[visibilityState]);
          if ("visible" === document[visibilityState]) {
            _detectUserOrAuthChange();
          }
        });

      };

      _addEventListenerVisibilityAPI();

      var _getUserId = function () {
        return _state.user ? _state.user.userId : null;
      };

      var _setUserToken = function () {
        _state.userToken = _getUserId();
        rvTokenStore.write(_state.userToken);
      };

      var _clearUserToken = function () {
        $log.debug("Clearing user token...");
        _cancelAccessTokenAutoRefresh();
        _state.userToken = null;
        rvTokenStore.clear();
      };

      var _scheduleAccessTokenAutoRefresh = function () {
        //cancel any existing $interval(s)
        $interval.cancel(_accessTokenRefreshHandler);
        _accessTokenRefreshHandler = $interval(function () {
          //cancel current $interval. It will be re-sheduled if authentication succeeds
          $interval.cancel(_accessTokenRefreshHandler);
          //refresh Access Token
          _authorize(true);
        }, 55 * 60 * 1000); //refresh every 55 minutes
      };

      var _cancelAccessTokenAutoRefresh = function () {
        $interval.cancel(_accessTokenRefreshHandler);
        _accessTokenRefreshHandler = null;
      };

      var _resetUserState = function () {
        _authenticateDeferred = null;
        objectHelper.clearObj(_state.user);
        objectHelper.clearObj(_state.profile);
        _state.roleMap = {};

        companyState.resetCompanyState();
        $log.debug("User state has been reset.");
      };

      var refreshProfile = function () {
        var deferred = $q.defer();
        //populate profile if the current user is a rise vision user
        getUserProfile(_state.user.username, true).then(
          function (profile) {
            objectHelper.clearAndCopy(angular.extend({
              username: _state.user.username
            }, profile), _state.profile);

            //set role map
            _state.roleMap = {};
            if (_state.profile.roles) {
              _state.profile.roles.forEach(function (val) {
                _state.roleMap[val] = true;
              });
            }

            //populate company info
            return companyState.init();
          }).then(function () {
          deferred.resolve();
        }, deferred.reject);
        return deferred.promise;
      };

      var _gapiAuthorize = function (attemptImmediate) {
        var deferred = $q.defer();

        var opts = {
          client_id: CLIENT_ID,
          scope: OAUTH2_SCOPES,
          cookie_policy: $location.protocol() + "://" +
            getBaseDomain()
        };

        if (attemptImmediate) {
          opts.immediate = true;
        } else {
          opts.prompt = "select_account";
        }

        gapiLoader()
          .then(function (gApi) {
            gApi.auth.authorize(opts, function (authResult) {
              $log.debug("authResult", authResult);
              if (authResult && !authResult.error) {
                _scheduleAccessTokenAutoRefresh();

                deferred.resolve(authResult);
              } else {
                _clearUserToken();

                deferred.reject(authResult.error ||
                  "failed to authorize user");
              }
            });
          }).then(null, deferred.reject); //gapiLoader

        return deferred.promise;
      };

      /*
       * Responsible for triggering the Google OAuth process.
       *
       */
      var _authorize = function (attemptImmediate) {
        var authorizeDeferred = $q.defer();

        var authResult;

        _gapiAuthorize(attemptImmediate)
          .then(function (res) {
            authResult = res;

            return getOAuthUserInfo();
          })
          .then(function (oauthUserInfo) {
            if (!_state.user.username || !_state.profile.username ||
              _state.user.username !== oauthUserInfo.email) {

              //populate user
              objectHelper.clearAndCopy({
                userId: oauthUserInfo.id, //TODO: ideally we should not use real user ID or email, but use hash value instead
                username: oauthUserInfo.email,
                picture: oauthUserInfo.picture
              }, _state.user);

              _setUserToken();

              refreshProfile()
                .finally(function () {
                  authorizeDeferred.resolve(authResult);
                  $rootScope.$broadcast("risevision.user.authorized");
                  if (!attemptImmediate) {
                    $rootScope.$broadcast(
                      "risevision.user.userSignedIn");
                  }
                });
            } else {
              authorizeDeferred.resolve(authResult);
            }
          })
          .then(null, function (err) {
            objectHelper.clearObj(_state.user);
            authorizeDeferred.reject(err);
          });

        return authorizeDeferred.promise;
      };

      var authenticateRedirect = function (forceAuth) {

        if (!forceAuth) {
          return authenticate(forceAuth);
        } else {
          var loc, path, search, state;

          // Redirect to full URL path
          if ($rootScope.redirectToRoot === false) {
            loc = $window.location.href.substr(0, $window.location.href.indexOf(
              "#")) || $window.location.href;
          }
          // Redirect to the URL root and append pathname back to the URL
          // on Authentication success
          // This prevents Domain authentication errors for sub-folders
          // Warning: Root folder must have CH available for this to work,
          // otherwise no redirect is performed!
          else {
            loc = $window.location.origin + "/";
            // Remove first character (/) from path since we're adding it to loc
            path = $window.location.pathname ? $window.location.pathname.substring(
              1) : "";
            search = $window.location.search;
          }

          // double encode since response gets decoded once!
          state = encodeURIComponent(encodeURIComponent(JSON.stringify({
            p: path,
            u: $window.location.hash,
            s: search
          })));

          localStorageService.set("risevision.common.userState", _state);
          uiFlowManager.persist();

          $window.location.href = GOOGLE_OAUTH2_URL +
            "?response_type=token" +
            "&scope=" + encodeURIComponent(OAUTH2_SCOPES) +
            "&client_id=" + CLIENT_ID +
            "&redirect_uri=" + encodeURIComponent(loc) +
          //http://stackoverflow.com/a/14393492
          "&prompt=select_account" +
            "&state=" + state;

          var deferred = $q.defer();
          // returns a promise that never get fulfilled since we are redirecting
          // to that google oauth2 page
          return deferred.promise;
        }
      };

      var authenticate = function (forceAuth) {
        var authenticateDeferred;

        // Clear User state
        if (forceAuth) {
          _resetUserState();
          userInfoCache.removeAll();
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
          // This flag indicates a potentially authenticated user.
          var userAuthed = (angular.isDefined(_state.userToken) &&
            _state.userToken !== null);
          $log.debug("userAuthed", userAuthed);

          if (forceAuth || userAuthed === true) {
            _authorize(!forceAuth)
              .then(function (authResult) {
                if (authResult && !authResult.error) {
                  authenticateDeferred.resolve();
                } else {
                  _clearUserToken();
                  $log.debug("Authentication Error: " +
                    authResult.error);
                  authenticateDeferred.reject(
                    "Authentication Error: " + authResult.error);
                }
              })
              .then(null, function (err) {
                _clearUserToken();
                authenticateDeferred.reject(err);
              })
              .finally(function () {
                $loading.stopGlobal(
                  "risevision.user.authenticate");
              });
          } else {
            var msg = "user is not authenticated";
            $log.debug(msg);
            //  _clearUserToken();
            authenticateDeferred.reject(msg);
            objectHelper.clearObj(_state.user);
            $loading.stopGlobal("risevision.user.authenticate");
          }
        };
        _proceed();

        if (forceAuth) {
          $loading.startGlobal("risevision.user.authenticate");
        }

        return authenticateDeferred.promise;
      };

      var signOut = function (signOutGoogle) {
        var deferred = $q.defer();
        userInfoCache.removeAll();
        gapiLoader().then(function (gApi) {
          if (signOutGoogle) {
            $window.logoutFrame.location =
              "https://accounts.google.com/Logout";
          }
          gApi.auth.signOut();
          // The flag the indicates a user is potentially
          // authenticated already, must be destroyed.
          _clearUserToken();
          //clear auth token
          // The majority of state is in here
          _resetUserState();
          objectHelper.clearObj(_state.user);
          //call google api to sign out
          $rootScope.$broadcast("risevision.user.signedOut");
          $log.debug("User is signed out.");
          deferred.resolve();
        }, function () {
          deferred.reject();
        });
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
        return $window.gapi ? $window.gapi.auth.getToken() : null;
      };

      var _restoreState = function () {
        var sFromStorage = localStorageService.get(
          "risevision.common.userState");
        if (sFromStorage) {
          angular.extend(_state, sFromStorage);
          localStorageService.remove("risevision.common.userState"); //clear
          $log.debug("userState restored with", sFromStorage);
        }
      };

      var userState = {
        getUserCompanyId: companyState.getUserCompanyId,
        getUserCompanyName: companyState.getUserCompanyName,
        getSelectedCompanyId: companyState.getSelectedCompanyId,
        getSelectedCompanyName: companyState.getSelectedCompanyName,
        updateCompanySettings: companyState.updateCompanySettings,
        getSelectedCompanyCountry: companyState.getSelectedCompanyCountry,
        getUsername: function () {
          return (_state.user && _state.user.username) || null;
        },
        getUserEmail: function () {
          return _state.profile.email;
        },
        getCopyOfProfile: function () {
          return objectHelper.follow(_state.profile);
        },
        resetCompany: companyState.resetCompany,
        getCopyOfUserCompany: companyState.getCopyOfUserCompany,
        getCopyOfSelectedCompany: companyState.getCopyOfSelectedCompany,
        switchCompany: companyState.switchCompany,
        isSubcompanySelected: companyState.isSubcompanySelected,
        isTestCompanySelected: companyState.isTestCompanySelected,
        getUserPicture: function () {
          return _state.user.picture;
        },
        hasRole: hasRole,
        inRVAFrame: function () {
          return _state.inRVAFrame;
        },
        isRiseAdmin: function () {
          return hasRole("sa");
        },
        isRiseStoreAdmin: function () {
          return hasRole("ba");
        },
        isUserAdmin: function () {
          return hasRole("ua");
        },
        isPurchaser: function () {
          return hasRole("pu");
        },
        isSeller: companyState.isSeller,
        isRiseVisionUser: isRiseVisionUser,
        isLoggedIn: isLoggedIn,
        authenticate: _state.inRVAFrame ? authenticate : authenticateRedirect,
        signOut: signOut,
        refreshProfile: refreshProfile,
        getAccessToken: getAccessToken,
        _restoreState: _restoreState,
        _setUserToken: function (token) {
          _state.userToken = token;
        },
        _persistState: function () {
          // persist user state
          localStorageService.set("risevision.common.userState", _state);
        }
      };

      return userState;
    }
  ]);

})(angular);

(function (angular) {

  "use strict";

  angular.module("risevision.common.companystate", ["risevision.core.company",
    "risevision.common.util"
  ])

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
          objectHelper.clearAndCopy(company, _state.userCompany);

          return _switchCompany(pendingSelectedCompany);
        })
          .then(null, function () {
            _companyState.resetCompany();
          })
          .finally(function () {
            pendingSelectedCompany = null;

            deferred.resolve(null);
            $rootScope.$broadcast(
              "risevision.company.selectedCompanyChanged");
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
              $log.error("Failed to load selected company.", resp);

              deferred.reject(resp);
            });
        } else {
          _companyState.resetCompany();

          deferred.resolve();
          $rootScope.$broadcast(
            "risevision.company.selectedCompanyChanged");
        }

        return deferred.promise;
      };

      var _companyState = {
        init: _init,
        switchCompany: _switchCompany,
        updateCompanySettings: function (company) {
          if (company && _state.selectedCompany) {
            objectHelper.clearAndCopy(company, _state.selectedCompany);
            if (_state.userCompany.id === _state.selectedCompany.id) {
              objectHelper.clearAndCopy(company, _state.userCompany);
            }

            $rootScope.$broadcast("risevision.company.updated");
          }
        },
        resetCompany: function () {
          objectHelper.clearAndCopy(_state.userCompany, _state.selectedCompany);
        },
        resetCompanyState: _resetCompanyState,
        getUserCompanyId: function () {
          return (_state.userCompany && _state.userCompany.id) || null;
        },
        getUserCompanyName: function () {
          return (_state.userCompany && _state.userCompany.name) || null;
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
        getCopyOfUserCompany: function () {
          return objectHelper.follow(_state.userCompany);
        },
        getCopyOfSelectedCompany: function () {
          return objectHelper.follow(_state.selectedCompany);
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
      };

      return _companyState;
    }
  ]);

})(angular);

(function (angular) {
  "use strict";

angular.module("risevision.ui-flow", ["LocalStorageModule"])

.constant("uiStatusDependencies", {
  _dependencies: {},
  _retries: {},
  addDependencies: function (deps) {
    angular.extend(this._dependencies, deps);
  },
  setMaximumRetryCount: function (status, num) {
    if(num < 1) {
      throw "Retry count for " + status + " must be equal to or greater than 1.";
    }
    if(this._retries[status] === undefined) {
      this._retries[status] = num;
    }
  }
})

.factory("uiFlowManager", ["$log", "$q", "$injector",
"uiStatusDependencies", "$rootScope", "localStorageService",
  function ($log, $q, $injector, uiStatusDependencies, $rootScope,
  localStorageService) {

  var _status, _goalStatus, _retriesLeft = null;
  var _dependencyMap = uiStatusDependencies._dependencies;

  //generate a status that always resolves to true
  var genedateDummyStatus = function (){
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
    }
    catch (e) {
      $log.debug("Generating dummy status", status);
      factory = genedateDummyStatus();
    }
    return factory;
  };

  //internal method that attempt to reach a particular status
  var _attemptStatus = function(status){
    var lastD;

    $log.debug("Attempting to reach status", status, "...");
    var dependencies = _dependencyMap[status];
    if(dependencies) {
      if(!(dependencies instanceof Array)) {
        dependencies = [dependencies];
      }

      var prevD = $q.defer(), firstD = prevD; //chain sibling dependency together

      angular.forEach(dependencies, function(dep) {
        //iterate through dependencies
        var currentD = $q.defer();
        prevD.promise.then(currentD.resolve, function () {
          _attemptStatus(dep).then(function (){
            //should come here if any of the dependencies is satisfied
            if(_dependencyMap[dep]) {
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
            if(_dependencyMap[dep]) {
              $log.debug("Failed to reach status", dep,
                " because its dependencies are not satisfied. Last rejected dep: ", lastRej);
              currentD.reject(lastRej);
            }
            else {
              currentD.reject(dep);
            }

          });
        });
        lastD = prevD = currentD;
      });

      //commence the avalance
      firstD.reject();
    }
    else {
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
    if(!desiredStatus && !_goalStatus) {
      //no goal, no desired status. resolve to true immediately
      var d = $q.defer(); d.resolve();
      return d.promise;
    }
    if(!_goalStatus && final) {
      _goalStatus = desiredStatus;
      //start afresh
      _retriesLeft = angular.copy(uiStatusDependencies._retries);
      deferred = $q.defer();
      final = false;
    }
    if(_goalStatus) {
      deferred = $q.defer();
      _attemptStatus(_goalStatus).then(
        function (s) {
          if(_goalStatus) {
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
          if(_retriesLeft[status] !== undefined) {
            if(_retriesLeft[status] === 0) {
              $log.debug("Maximum allowed retries for status", status, "reached. Validation will cancel.");
              cancelValidation();
            }
            else {
              _retriesLeft[status] --;
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
    localStorageService.set("risevision.ui-flow.state",
      {goalStatus: _goalStatus, retriesLeft: _retriesLeft});
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
  if(localStorageService.get("risevision.ui-flow.state")) {
    var state = localStorageService.get("risevision.ui-flow.state");
    if(state && state.goalStatus) {
      _goalStatus = state.goalStatus;
      $log.debug("uiFlowManager.goalStatus restored to", state.goalStatus, state.retriesLeft);
      _retriesLeft = state.retriesLeft;
      deferred = $q.defer(); final = false;
    }
    localStorageService.remove("risevision.ui-flow.state");
  }

  var manager = {
    invalidateStatus: invalidateStatus,
    cancelValidation: cancelValidation,
    getStatus: function () { return _status; },
    isStatusUndetermined: function () { return _status === "pendingCheck"; },
    persist: persist
  };

  //DEBUG
  // window.uiFlowManager = manager;

  return manager;
}]);

})(angular);

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

(function (angular) {
  "use strict";

  angular.module("risevision.common.registration", [
    "risevision.common.userstate", "risevision.ui-flow",
    "risevision.core.userprofile", "risevision.common.gapi"
  ])

  .config(["uiStatusDependencies",
    function (uiStatusDependencies) {
      uiStatusDependencies.addDependencies({
        "registerdAsRiseVisionUser": "signedInWithGoogle",
        "registeredAsRiseVisionUser": "signedInWithGoogle",
        "registrationComplete": ["notLoggedIn",
          "registeredAsRiseVisionUser"
        ]
      });

      uiStatusDependencies.setMaximumRetryCount("signedInWithGoogle", 1);
    }
  ])

  .factory("signedInWithGoogle", ["$q", "getOAuthUserInfo", "userState",
    function ($q, getOAuthUserInfo, userState) {
      return function () {
        var deferred = $q.defer();
        // userState.authenticate(false).then().finally(function () {
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
          if (cookieStore.get("surpressRegistration")) {
            deferred.resolve({});
          } else {
            $log.debug("registeredAsRiseVisionUser rejected", err);
            deferred.reject("registeredAsRiseVisionUser");
          }
        });

        return deferred.promise;
      };
    }
  ]);

})(angular);

(function (angular){

  "use strict";

  angular.module("risevision.core.cache", [])

    .value("rvStorage", sessionStorage)

    .factory("userInfoCache", ["$cacheFactory", function ($cacheFactory) {
      return $cacheFactory("user-info-cache");
    }]);

})(angular);

(function (angular){

  "use strict";

  angular.module("risevision.core.util", [])

.factory("pick", function () {
  var ArrayProto = Array.prototype;
  var
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat;
    // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) { return func; }
    switch (argCount === null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

    return function(obj, iteratee, context) {
      var result = {}, key;
      if (obj === null) {return result;}
      if (angular.isFunction(iteratee)) {
        iteratee = createCallback(iteratee, context);
        for (key in obj) {
          var value = obj[key];
          if (iteratee(value, key, obj)) { result[key] = value; }
        }
      } else {
        var keys = concat.apply([], slice.call(arguments, 1));
        obj = new Object(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
          key = keys[i];
          if (key in obj) { result[key] = obj[key]; }
        }
      }
      return result;
    };
  });

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.core.userprofile", [
  "risevision.common.gapi", "risevision.core.oauth2"])

  .value("userRoleMap", {
    "ce": "Content Editor",
    "cp": "Content Publisher",
    "da": "Display Administrator",
    "ua": "System Administrator",
    "pu": "Store Purchaser",
    "sa": "Rise System Administrator",
    "ba": "Rise Store Administrator"
  })

  .factory("getUserProfile", ["oauth2APILoader", "coreAPILoader", "$q", "$log",
  function (oauth2APILoader, coreAPILoader, $q, $log) {
    var _username;
    var _cachedPromises = {};

    return function (username, clearCache) {

      var deferred;

      if (username === _username && !clearCache &&
        _cachedPromises[username] !== null) {
        //avoid calling API if username didn't change
        return _cachedPromises[username].promise;
      }
      else {
        _username = username;
        _cachedPromises[username] = deferred = $q.defer();
      }

      if(!username) {
        deferred.reject("getUserProfile failed: username param is required.");
        $log.debug("getUserProfile failed: username param is required.");
      }
      else {

        var criteria = {};
        if (username) {criteria.username = username; }
        $log.debug("getUserProfile called", criteria);

        $q.all([oauth2APILoader(), coreAPILoader()]).then(function (results){
          var coreApi = results[1];
          // var oauthUserInfo = results[2];
          coreApi.user.get(criteria).execute(function (resp){
            if (resp.error || !resp.result) {
              deferred.reject(resp);
            }
            else {
              $log.debug("getUser resp", resp);
                //get user profile
                deferred.resolve(resp.item);
            }
          });
        }, deferred.reject);
      }
      return deferred.promise;
    };
  }])

  .factory("updateUser", ["$q", "coreAPILoader", "$log",
  "getUserProfile", "pick",
  function ($q, coreAPILoader, $log, getUserProfile, pick) {
    return function (username, profile) {
      var deferred = $q.defer();
      profile = pick(profile, "mailSyncEnabled",
        "email", "firstName", "lastName", "telephone", "roles", "status");
      $log.debug("updateUser called", username, profile);
      coreAPILoader().then(function (coreApi) {
        var request = coreApi.user.patch({
          username: username, data: profile});
        request.execute(function (resp) {
            $log.debug("updateUser resp", resp);
            if(resp.error) {
              deferred.reject(resp);
            }
            else if (resp.result) {
              getUserProfile(username, true).then(function() {deferred.resolve(resp);});
            }
            else {
              deferred.reject("updateUser");
            }
        });
      }, deferred.reject);
      return deferred.promise;
    };
  }])

  .factory("addUser", ["$q", "coreAPILoader", "$log", "pick",
  function ($q, coreAPILoader, $log, pick) {
    return function (companyId, username, profile) {
      var deferred = $q.defer();
      coreAPILoader().then(function (coreApi) {
        profile = pick(profile, "mailSyncEnabled",
          "email", "firstName", "lastName", "telephone", "roles", "status");
        var request = coreApi.user.add({
          username: username,
          companyId: companyId,
          data: profile});
        request.execute(function (resp) {
          $log.debug("addUser resp", resp);
          if(resp.result) {
            deferred.resolve(resp);
          }
          else {
            deferred.reject(resp);
          }
        });
      });
      return deferred.promise;
    };
  }])

  .factory("deleteUser", ["$q", "coreAPILoader", "$log",
  function ($q, coreAPILoader, $log) {
    return function (username) {
      var deferred = $q.defer();
      coreAPILoader().then(function (coreApi) {
        var request = coreApi.user.delete({
          username: username});
        request.execute(function (resp) {
          $log.debug("deleteUser resp", resp);
          if(resp.result) {
            deferred.resolve(resp);
          }
          else {
            deferred.reject("deleteUser");
          }
        });
      });
      return deferred.promise;
    };
  }])

  .factory("getUsers", ["$q", "coreAPILoader", "$log", function (
    $q, coreAPILoader, $log) {
    return function (criteria) {
      $log.debug("getUsers", criteria);
      var deferred = $q.defer();
      coreAPILoader().then(function (coreApi) {
        var request = coreApi.user.list(criteria);
        request.execute(function (resp) {
            $log.debug("getUsers resp", resp);
            if(resp.result) {
              deferred.resolve(resp.items);
            }
            else {
              deferred.reject("getUsers");
            }
        });
      }, deferred.reject);
      return deferred.promise;
    };
  }]);

})(angular);

(function (angular){

  "use strict";

  angular.module("risevision.core.company",
    [
      "risevision.common.gapi",
      "risevision.core.cache",
      "risevision.core.util"
    ])

    .constant("COMPANY_WRITABLE_FIELDS", [
      "name", "street", "unit", "city", "province", "country",
      "postalCode", "timeZoneOffset", "telephone", "fax", "companyStatus",
      "notificationEmails", "mailSyncEnabled", "sellerId", "isTest"
    ])
    .constant("COMPANY_SEARCH_FIELDS", [
      "name", "id", "street", "unit", "city", "province", "country",
      "postalCode", "telephone", "fax"
    ])

    .factory("createCompany", ["$q", "coreAPILoader", "COMPANY_WRITABLE_FIELDS",
      "pick",
      function ($q, coreAPILoader, COMPANY_WRITABLE_FIELDS, pick) {
      return function (parentCompanyId, company) {
        var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var fields = pick.apply(this, [company].concat(COMPANY_WRITABLE_FIELDS));
          var request = coreApi.company.add({
            parentId: parentCompanyId,
            data: fields
          });
          request.execute(function (resp) {
            if(resp.result) {
              deferred.resolve(resp.item);
            }
            else {
              deferred.reject(resp);
            }
          }, deferred.reject);
        });
        return deferred.promise;
      };
    }])

    .factory("getCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (id) { //get a company either by id or authKey
        $log.debug("getCompany called", id);

        var deferred = $q.defer();
          coreAPILoader().then(function (coreApi) {
            var criteria = {};
            if(id) {criteria.id = id; }
            var request = coreApi.company.get(criteria);
            request.execute(function (resp) {
                $log.debug("getCompany resp", resp);
                if(resp.result) {
                  deferred.resolve(resp.item);
                }
                else {
                  deferred.reject(resp);
                }
            });
          });
        return deferred.promise;
      };
    }])

    .factory("lookupCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (authKey) { //get a company either by id or authKey
        $log.debug("lookupCompany called", authKey);

        var deferred = $q.defer();
          coreAPILoader().then(function (coreApi) {
            var request = coreApi.company.lookup({authKey: authKey});
            request.execute(function (resp) {
                $log.debug("lookupCompany resp", resp);
                if(resp.result) {
                  deferred.resolve(resp.item);
                }
                else {
                  deferred.reject(resp);
                }
            });
          });
        return deferred.promise;
      };
    }])

    .factory("moveCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (authKey, newParentId) { //get a company either by id or authKey
        var deferred = $q.defer();
          coreAPILoader().then(function (coreApi) {
            var request = coreApi.company.move({authKey: authKey, newParentId: newParentId});
            request.execute(function (resp) {
                $log.debug("moveCompany resp", resp);
                if(resp.result) {
                  deferred.resolve(resp.item);
                }
                else {
                  deferred.reject(resp);
                }
            });
          });
        return deferred.promise;
      };
    }])

    .factory("updateCompany", ["$q", "$log", "coreAPILoader", "pick",
    "COMPANY_WRITABLE_FIELDS",
     function ($q, $log, coreAPILoader, pick, COMPANY_WRITABLE_FIELDS){
      return function (companyId, fields) {
          var deferred = $q.defer();
          fields = pick.apply(this, [fields].concat(COMPANY_WRITABLE_FIELDS));
          $log.debug("updateCompany called", companyId, fields);
          // fields.validate = validationRequired || false;
          coreAPILoader().then(function (coreApi) {
            var request = coreApi.company.patch({id: companyId, data: fields});
            request.execute(function (resp) {
              $log.debug("updateCompany resp", resp);
              if(resp.result) {
                deferred.resolve(resp);
              }
              else {
                deferred.reject(resp);
              }
            });
          });

          return deferred.promise;
      };
    }])

    .factory("regenerateCompanyField", ["$q", "$log", "coreAPILoader",
     function ($q, $log, coreAPILoader){
      return function (companyId, fieldName) {
          var deferred = $q.defer();
          $log.debug("regenerateField called", companyId, fieldName);
          coreAPILoader().then(function (coreApi) {
            var request = coreApi.company.regenerateField({"id": companyId, "fieldName": fieldName});
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
    }])

    .factory("deleteCompany", ["coreAPILoader", "$q", "$log",
    function (coreAPILoader, $q, $log) {
      return function (id) { //get a company either by id or authKey
        $log.debug("deleteCompany called", id);

        var deferred = $q.defer();
          coreAPILoader().then(function (coreApi) {
            var criteria = {};
            if(id) {criteria.id = id; }
            var request = coreApi.company.delete(criteria);
            request.execute(function (resp) {
                $log.debug("deleteCompany resp", resp);
                if(resp.result) {
                  deferred.resolve(resp.item);
                }
                else {
                  deferred.reject(resp);
                }
            });
          });
        return deferred.promise;
      };
    }])

    .service("companyService", ["coreAPILoader", "$q", "$log", "getCompany",
      "COMPANY_SEARCH_FIELDS",
      function (coreAPILoader, $q, $log, getCompany, COMPANY_SEARCH_FIELDS) {
        
      var createSearchQuery = function(fields, search) {
        var query = "";
        
        for (var i in fields) {
          query += "OR " + fields[i] + ":~\'" + search + "\' ";
        }
        
        query = query ? query.substring(3) : "";
          
        return query.trim();
      }

      this.getCompanies = function (companyId, search, cursor, count, sort) {
        var deferred = $q.defer();
        var query = search ? createSearchQuery(COMPANY_SEARCH_FIELDS, search) : "";
          
        var obj = {
          "companyId": companyId,
          "search": query,
          "cursor": cursor,
          "count": count,
          "sort": sort
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
              getCompany(selectedCompanyId).then(function(res) {
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

      this.validateAddressSimple = function(company, contact) {
        var errors = [];
        if (contact) {
            if (!contact.firstName) {
                errors.push("Missing First Name");
            }
            if (!contact.lastName) {
                errors.push("Missing Last Name");
            }
            if (!contact.email) {
                errors.push("Missing Email");
            } else {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(contact.email)) {
                    errors.push("Invalid Email");
                }
            }
        }
        if (!company.street) {
            errors.push("Missing Address (Line 1)");
        }
        if (!company.city) {
            errors.push("Missing City");
        }
        if (!company.country) {
            errors.push("Missing Country");
        }
        if (!company.province) {
            errors.push("Missing State / Province");
        }
        if (!company.postalCode) {
            errors.push("Missing Zip / Postal Code");
        }
        return errors;
      };

    }])

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
  angular.module("risevision.core.oauth2",
  ["risevision.common.gapi", "risevision.core.cache"]).
  factory("getOAuthUserInfo", ["oauth2APILoader", "$q", "userInfoCache",
  "$log",
  function (oauth2APILoader, $q, userInfoCache, $log) {
    return function () {

      var deferred = $q.defer();
      var resp;
      if((resp = userInfoCache.get("oauth2UserInfo"))) {
        if(resp.error) {
          deferred.reject(resp.error);
        }
        else {
          deferred.resolve(resp);
        }
      }
      else {
        oauth2APILoader().then(function (oauth2){
          oauth2.userinfo.get().execute(function (resp){
            $log.debug("getOAuthUserInfo oauth2.userinfo.get() resp", resp);
            if(!resp) {
              userInfoCache.remove("oauth2UserInfo");
              deferred.reject();
            }
            else if(resp.hasOwnProperty("error")) {
              userInfoCache.remove("oauth2UserInfo");
              deferred.reject(resp.error);
            }
            else {
              userInfoCache.put("oauth2UserInfo", resp);
              deferred.resolve(resp);
            }
          });
        }, deferred.reject);
      }

      return deferred.promise;
    };
  }]);

})(angular);

(function (angular) {

  "use strict";

  angular.module("risevision.core.systemmessages", ["risevision.common.gapi"])

  .factory("getCoreSystemMessages", ["gapiLoader", "$q", "$log",
      function (gapiLoader, $q, $log) {
        return function (companyId) {
          var deferred = $q.defer();
          gapiLoader().then(function (gApi) {
            var request = gApi.client.core.systemmessage.list(
              { "companyId": companyId });
            request.execute(function (resp) {
              var items = resp;
              if(!(items instanceof Array) && items.items) { items = items.items; }
              $log.debug("getCoreSystemMessage resp", items);
              deferred.resolve(items);
            });
          });
          return deferred.promise;
        };
    }]);

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
        }
        else {
          deferred = $q.defer();  
        }
        
        coreAPILoader().then(function (coreApi) {
          return coreApi.country.list();
        })
        .then(function (resp) {
          var items = resp.result ? resp.result.items : [];
          if(items instanceof Array) { 
            items = $filter("orderBy")(items, "name");
          }

          deferred.resolve(items);
        })
        .then(null, function(e) {
          $log.debug("getCoreCountries failed", e);
          deferred.reject(e);
          
          deferred = null;
        });
        return deferred.promise;
      };
  }])
  .factory("COUNTRIES", ["getCoreCountries", 
    function (getCoreCountries) {
      var countries = [];
     
      getCoreCountries().then(function(result) {
        Array.prototype.push.apply(countries, result);
      })
      
      return countries;
  }]);

})(angular);

"use strict";

angular.module("risevision.common.fastpass", [])
.factory("loadFastpass", ["$q", "$http", "$document", "$timeout", "GSFP_URL", "$log",
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
    $document[0].body.appendChild(script);
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
      "&userName=" + username).then(function (res){
        loadScript(res.data).then(function (result) {
          $log.debug("loadFastpass result", result);
          deferred.resolve(true);
        },rejected).catch(rejected);
      }, deferred.reject);

      return deferred.promise;
    };

  }]);

angular.module("risevision.common.header")
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

angular.module("risevision.common.header")
  .directive("linkCid", ["userState",
    function (userState) {
      return {
        link: function ($scope, ele, attr) {
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
            attr.$set("href", value);
          };

          $scope.$watch(function () {
            return userState.getSelectedCompanyId();
          }, function (newValue, oldValue) {
            if (newValue && newValue !== oldValue) {
              updateLinkCompanyId(newValue);
            }
          });
        }
      };
    }
  ]);

(function (angular) {

  "use strict";

  angular.module("risevision.common.company", [])

  .service("selectedCompanyUrlHandler", ["$location", "userState",
    function ($location, userState) {
      this.updateUrl = function () {
        var selectedCompanyId = userState.getSelectedCompanyId();
        // This parameter is only appended to the url if the user is logged in
        if (selectedCompanyId && $location.search().cid !==
          selectedCompanyId) {
          $location.search("cid", selectedCompanyId);
        }
      };

      this.updateSelectedCompanyFromUrl = function () {
        var newCompanyId = $location.search().cid;
        if (newCompanyId && userState.getUserCompanyId() &&
          newCompanyId !== userState.getSelectedCompanyId()) {
          userState.switchCompany(newCompanyId);
        } else if (!newCompanyId && userState.getSelectedCompanyId()) {
          $location.search("cid", userState.getSelectedCompanyId());
          $location.replace();
        }
      };
    }
  ]);
})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.common.shoppingcart", ["risevision.common.gapi",
    "risevision.common.userstate"
  ])

  .factory("shoppingCart", ["rvStorage", "storeAPILoader", "$log", "$q",
    "userState",
    function (rvStorage, storeAPILoader, $log, $q, userState) {
      var _items = [];

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
                  "shipToAttention": "",
                  "useBillToAddress": true
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
              $log.error(
                "[persistToStorage] - Unimplemented API method " + e.message
              );
            }
          });
        }
        return deferred.promise;

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
            "accountingId": items[i].selected.accountingId
          };
          res.push(item);
        }
        return res;
      };

      var getJsonItems = function (items) {
        var cleanedItems = cleanProducts(items);
        return JSON.stringify(cleanedItems);
      };

      var loadReady = $q.defer();
      var username = null;

      var cartManager = {
        loadReady: loadReady.promise,
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
          persistToStorage();
        },
        initialize: function () {
          if (username !== userState.getUsername()) {
            username = userState.getUsername();
            clearItems();
            readFromStorage().then(loadReady.resolve);
          }
          return _items;
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
      cartManager.initialize();

      return cartManager;

    }
  ]);
})(angular);

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
              $log.error("currencyService error: ", resp.error);
              deferred.reject(resp.error);
            }
          });
        });

        return deferred.promise;
      };

    }
  ]);

})(angular);

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

  angular.module("risevision.common.config")
    .value("CORE_URL", "https://rvaserver2.appspot.com/_ah/api")
    .value("STORE_URL", "https://store.risevision.com")
    .value("STORE_ENDPOINT_URL",
      "https://store-dot-rvaserver2.appspot.com/_ah/api")
    .value("GSFP_URL", "https://gsfp-dot-rvaserver2.appspot.com/fp");
})(angular);

"use strict";

try {
  angular.module("risevision.common.config");
} catch (err) {
  angular.module("risevision.common.config", []);
}

angular.module("risevision.common.config")
  .value("CLIENT_ID", "614513768474.apps.googleusercontent.com");

/* jshint ignore:start */
var gapiLoadingStatus = null;
var handleClientJSLoad = function() {
    gapiLoadingStatus = "loaded";
    console.debug("ClientJS is loaded.");
    //Ready: create a generic event
    var evt = document.createEvent("Events");
    //Aim: initialize it to be the event we want
    evt.initEvent("gapi.loaded", true, true);
    //FIRE!
    window.dispatchEvent(evt);
}
/* jshint ignore:end */

angular.module("risevision.common.gapi", [])
  .factory("gapiLoader", ["$q", "$window", function ($q, $window) {
    var deferred = $q.defer();

    return function () {
      var gapiLoaded;

      if($window.gapiLoadingStatus === "loaded") {
        deferred.resolve($window.gapi);
      }

      else if(!$window.gapiLoadingStatus) {
        $window.gapiLoadingStatus = "loading";

        var src = $window.gapiSrc || "//apis.google.com/js/client.js?onload=handleClientJSLoad";
        var fileref = document.createElement("script");
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", src);
        if (typeof fileref!=="undefined") {
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
  }])

  //abstract method for creading a loader factory service that loads any
  //custom Google Client API library

  .factory("gapiClientLoaderGenerator", ["$q", "gapiLoader", "$log",
    function ($q, gapiLoader, $log) {
    return function (libName, libVer, baseUrl) {
      return function () {
        var deferred = $q.defer();
        gapiLoader().then(function (gApi) {
          if(gApi.client[libName]){
            //already loaded. return right away
            deferred.resolve(gApi.client[libName]);
          }
          else {
            gApi.client.load.apply(this, [libName, libVer].concat([function () {
              if (gApi.client[libName]) {
                $log.debug(libName + "." + libVer + " Loaded");
                deferred.resolve(gApi.client[libName]);
              } else {
                var errMsg = libName + "." + libVer  + " Load Failed";
                $log.error(errMsg);
                deferred.reject(errMsg);
              }
            }, baseUrl]));
          }
        });
        return deferred.promise;
      };
    };
  }])

  .factory("oauth2APILoader", ["gapiClientLoaderGenerator",
    function(gapiClientLoaderGenerator) {
      return gapiClientLoaderGenerator("oauth2", "v2");
  }])

  .factory("coreAPILoader", ["CORE_URL", "gapiClientLoaderGenerator",
    "$location",
    function (CORE_URL, gapiClientLoaderGenerator, $location) {
      var baseUrl = $location.search().core_api_base_url ? $location.search().core_api_base_url + "/_ah/api": CORE_URL;
      return gapiClientLoaderGenerator("core", "v1", baseUrl);
  }])

  .factory("riseAPILoader", ["CORE_URL", "gapiClientLoaderGenerator", "$location",
    function (CORE_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().core_api_base_url ? $location.search().core_api_base_url + "/_ah/api": CORE_URL;
    return gapiClientLoaderGenerator("rise", "v0", baseUrl);
  }])

  .factory("storeAPILoader", ["STORE_ENDPOINT_URL", "gapiClientLoaderGenerator", "$location",
    function (STORE_ENDPOINT_URL, gapiClientLoaderGenerator, $location) {
    var baseUrl = $location.search().store_api_base_url ? $location.search().store_api_base_url + "/_ah/api": STORE_ENDPOINT_URL;
    return gapiClientLoaderGenerator("store", "v0.01", baseUrl);
  }])

  .factory("discoveryAPILoader", ["CORE_URL", "gapiClientLoaderGenerator", "$location",
    function (CORE_URL, gapiClientLoaderGenerator, $location) {
        var baseUrl = $location.search().core_api_base_url ? $location.search().core_api_base_url + "/_ah/api": CORE_URL;
        return gapiClientLoaderGenerator("discovery", "v1", baseUrl);
  }])

  .factory("monitoringAPILoader", ["MONITORING_SERVICE_URL", "gapiClientLoaderGenerator", "$location",
    function (MONITORING_SERVICE_URL, gapiClientLoaderGenerator, $location) {
      var baseUrl = $location.search().core_api_base_url ? $location.search().core_api_base_url + "/_ah/api": MONITORING_SERVICE_URL;
      return gapiClientLoaderGenerator("monitoring", "v0", baseUrl);
  }]);

(function (angular) {

  "use strict";

  angular.module("risevision.common.localstorage", ["ngStorage"])
    .factory("localStorageService", ["$localStorage", "$sessionStorage",
      function ($localStorage, $sessionStorage) {

        var storageImpl = localStorage ? localStorage : sessionStorage;
        var storageImplWrapper = localStorage ? $localStorage :
          $sessionStorage;

        var factory = {};

        factory.getStorage = function () {
          return storageImplWrapper;
        };

        factory.setItemImmediate = function (key, value) {
          storageImpl.setItem(key, value);
        };

        factory.removeItemImmediate = function (key) {
          storageImpl.removeItem(key);
        };

        factory.getItem = function (key) {
          return storageImpl.getItem(key);
        };

        return factory;

      }
    ]);

})(angular);

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
            $scope.$watch("changedBy", function(newVal) {
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
try { app = angular.module("risevision.common.components.last-modified"); }
catch(err) { app = angular.module("risevision.common.components.last-modified", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("last-modified/last-modified.html",
    "<span class=\"text-muted\">\n" +
    "  <small>\n" +
    "    Saved {{changeDate | date:'d-MMM-yyyy h:mm a'}} by {{changedBy | username}}\n" +
    "  </small>\n" +
    "</span>\n" +
    "");
}]);
})();
