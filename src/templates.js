(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app-nav-buttons-menu.html",
    "<ul>\n" +
    "  <li class=\"new-app\">  \n" +
    "    <a href=\"https://apps.risevision.com/editor\" target=\"_blank\" link-cid>\n" +
    "      <div class=\"image\"><img src=\"https://s3.amazonaws.com/Rise-Images/landing-page/editor-image.png\"></div>\n" +
    "      <span>Presentations</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <li class=\"new-app\">\n" +
    "      <a href=\"https://apps.risevision.com/schedules\" target=\"_blank\" link-cid>\n" +
    "        <div class=\"image\"><img src=\"https://s3.amazonaws.com/Rise-Images/landing-page/schedule-image.png\"></div>\n" +
    "        <span>Schedules</span>\n" +
    "      </a>\n" +
    "  </li>\n" +
    "  \n" +
    "  <li class=\"new-app\"> \n" +
    "      <a href=\"https://apps.risevision.com/displays\" target=\"_blank\" link-cid>\n" +
    "        <div class=\"image\"><img src=\"https://s3.amazonaws.com/Rise-Images/landing-page/displays-image.png\"></div>\n" +
    "        <span>Displays</span>\n" +
    "      </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <li>\n" +
    "      <a href=\"https://store.risevision.com/\" target=\"_blank\" link-cid>\n" +
    "        <div class=\"image\"><img src=\"https://s3.amazonaws.com/Rise-Images/landing-page/store-image.png\"></div>\n" +
    "        <span>Store</span>\n" +
    "      </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <li>\n" +
    "      <a href=\"https://apps.risevision.com/storage\" target=\"_blank\" link-cid>\n" +
    "        <div class=\"image\"><img src=\"https://s3.amazonaws.com/Rise-Images/landing-page/storage-image.png\"></div>\n" +
    "        <span>Storage</span>\n" +
    "      </a>\n" +
    "  </li>\n" +
    "\n" +
    "   <li>\n" +
    "      <a href=\"https://rva.risevision.com/#PRESENTATIONS\" target=\"_blank\" class=\"old-app\" link-cid>\n" +
    "        <div class=\"image\"><img src=\"https://s3.amazonaws.com/Rise-Images/landing-page/editor-image-gray.png\"></div>\n" +
    "        <span>Classic Editor</span>\n" +
    "      </a>\n" +
    "  </li>\n" +
    "\n" +
    " \n" +
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
    "  <button dropdown-toggle class=\"dropdown-toggle btn btn-link\"><i class=\"fa fa-lg fa-th\"></i></button>\n" +
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
    "    <a href=\"\" ng-click=\"alertSettings()\" class=\"alert-settings-button action\">\n" +
    "      <i class=\"fa fa-bullhorn\"></i>\n" +
    "      <span class=\"item-name\">Alert Settings</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <li ng-show=\"isRiseVisionUser\">\n" +
    "    <a href=\"\" ng-click=\"userSettings()\" class=\"user-settings-button action\">\n" +
    "      <i class=\"fa fa-user\"></i>\n" +
    "      <span class=\"item-name\">User Settings</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <li ng-show=\"isRiseVisionUser\">\n" +
    "    <a href=\"https://store.risevision.com/account\" target=\"_blank\" class=\"store-account-button action\" link-cid >\n" +
    "      <i class=\"fa fa-shopping-cart\"></i>\n" +
    "      <span class=\"item-name\">Store Account</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <span ng-if=\"isLoggedIn && !isRiseVisionUser\" class=\"google-account\" class=\"username\">{{username}}</span>\n" +
    "\n" +
    "  <li class=\"dropdown-footer text-right\" ng-show=\"isLoggedIn\">\n" +
    "    <button class=\"sign-out-button btn btn-sm btn-default u_margin-sm-bottom\" ng-controller=\"SignOutButtonCtrl\" ng-click=\"logout()\">Sign Out<i class=\"fa fa-sign-out icon-right\"></i>\n" +
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
    "  ng-show=\"isLoggedIn && !isRiseVisionUser && !loading\">\n" +
    "  <button type=\"button\" ng-controller=\"RegisterButtonCtrl\" ng-click=\"register()\"\n" +
    "    class=\"btn btn-danger register-user-menu-button\">\n" +
    "    Complete Registration\n" +
    "  </button>\n" +
    "</li>\n" +
    "<li\n" +
    "  dropdown\n" +
    "  class=\"dropdown user-profile-dropdown desktop-menu-item\"\n" +
    "  ng-class=\"{'hidden-xs': isLoggedIn}\"\n" +
    "  ng-show=\"isLoggedIn\"\n" +
    "  >\n" +
    "    <a href=\"\" dropdown-toggle class=\"dropdown-toggle\">\n" +
    "      <div class=\"user-id pull-left\">\n" +
    "        <span ng-class=\"{'pending-registration' : isLoggedIn && !isRiseVisionUser && !loading}\" class=\"username\">{{username}}</span>\n" +
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
    "        <span>{{username}}</span>\n" +
    "        <span><strong>{{companyName}}</strong></span>\n" +
    "      </div>\n" +
    "    </a>\n" +
    "</li>\n" +
    "<!-- If User NOT Authenticated -->\n" +
    "<li ng-show=\"!undetermined && isLoggedIn === false\" ng-controller=\"SignUpButtonCtrl\">\n" +
    "  <button type=\"button\" ng-click=\"openSignUpModal()\"\n" +
    "  class=\"btn-primary btn u_margin-right\">\n" +
    "   Sign Up Free</button>\n" +
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
    "  stop-event=\"touchend\"\n" +
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
    "<nav class=\"navbar navbar-default navbar-static-top hidden-print\"\n" +
    "	ng-class=\"{'active-banner': isSubcompanySelected() || isTestCompanySelected()}\" role=\"navigation\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"navbar-header\" style=\"width: 100%;\">\n" +
    "			<a class=\"navbar-brand visible-md visible-lg\"\n" +
    "			  href=\"http://www.risevision.com/\" target=\"{{newTabHome ? '_blank' : '_self'}}\" ng-if=\"!inRVAFrame\">\n" +
    "				<img src=\"//s3.amazonaws.com/Rise-Images/UI/logo.svg\" class=\"img-responsive logo-small\" width=\"113\" height=\"42\" alt=\"Rise Vision\">\n" +
    "			</a>\n" +
    "			<a class=\"navbar-brand hidden-md hidden-lg text-center\"\n" +
    "				href=\"\" off-canvas-toggle>\n" +
    "				<i class=\"fa fa-bars\"></i>\n" +
    "			</a>\n" +
    "			<!-- If User Authenticated -->\n" +
    "			<!-- Action Nav -->\n" +
    "			<ul class=\"nav navbar-nav navbar-right actions-nav pull-right\">\n" +
    "				<!-- Help Dropdown -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "					ng-controller=\"HelpDropdownButtonCtrl\"\n" +
    "					src=\"'help-dropdown.html'\"\n" +
    "				></ng-include>\n" +
    "				<!-- END Help Dropdown -->\n" +
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
    "						<a ng-if=\"opt.cid\" ng-href=\"{{opt.link}}\" link-cid target=\"{{opt.target}}\" ng-class=\"{'selected': opt.states && opt.states.indexOf(navSelected) > -1}\">{{opt.title}}</a>\n" +
    "						<a ng-if=\"!opt.cid\" ng-href=\"{{opt.link}}\" target=\"{{opt.target}}\" ng-class=\"{'selected': opt.states && opt.states.indexOf(navSelected) > -1}\">{{opt.title}}</a>\n" +
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
    "<div ng-show=\"cookieEnabled === false\" class=\"bg-warning text-center u_padding-sm\">\n" +
    "    <small><strong>Cookies Are Disabled.</strong> Rise Vision needs to use cookies to properly function. Please enable Cookies and Third-Party Cookies on your web browser and refresh this page.</small>\n" +
    "</div>\n" +
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
    "			<a ng-if=\"opt.cid\" ng-href=\"{{opt.link}}\" link-cid target=\"{{opt.target}}\">{{opt.title}}</a>\n" +
    "			<a ng-if=\"!opt.cid\" ng-href=\"{{opt.link}}\" target=\"{{opt.target}}\">{{opt.title}}</a>\n" +
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
    "      <a id=\"select-subcompany-button\" href=\"\" ng-click=\"switchCompany()\" ng-show=\"isRiseVisionUser && !isSubcompanySelected\">Select Sub-Company</a>\n" +
    "    </p>\n" +
    "  </li>\n" +
    "\n" +
    "  <li class=\"dropdown-header sub-company-header\" ng-show=\"isSubcompanySelected\">\n" +
    "    <p>You are in Sub-Company <strong>{{selectedCompanyName}}</strong>\n" +
    "    <span class=\"text-muted\">|</span>\n" +
    "     <a id=\"change-subcompany-button\" href=\"\" ng-click=\"switchCompany()\" ng-show=\"isRiseVisionUser\">Change</a></p>\n" +
    "    <p><a id=\"reset-subcompany-button\" href=\"\" ng-click=\"resetCompany()\">Switch to My Company</a></p>\n" +
    "  </li>\n" +
    "  <hr>\n" +
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
    "        ng-model=\"company.country\" ng-options=\"c.code as c.name for c in countries\" empty-select-parser>\n" +
    "        <option ng-show=\"false\" value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-state\" class=\"control-label\">\n" +
    "        State/Province/Region\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-state\" type=\"text\" class=\"form-control\" ng-model=\"company.province\" ng-hide=\"company.country == 'US' || company.country == 'CA'\" />\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"company.country == 'CA'\" empty-select-parser>\n" +
    "        <option ng-show=\"false\" value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"company.country == 'US'\" empty-select-parser>\n" +
    "        <option ng-show=\"false\" value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-zip\" class=\"control-label\">\n" +
    "        ZIP/Postal Code\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-zip\" type=\"text\" class=\"form-control\" ng-model=\"company.postalCode\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-website\" class=\"control-label\">\n" +
    "    Website\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-website\" type=\"text\" class=\"form-control\" ng-model=\"company.website\"/>\n" +
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
    "    <option ng-show=\"false\" value=\"\">&lt; Select Time Zone &gt;</option>\n" +
    "    <option value=\"{{c[1]}}\" ng-repeat=\"c in timezones\">{{c[0]}}</option>\n" +
    "  </select>\n" +
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
    "	<div class=\"modal-body select-subcompany-modal\" stop-event=\"touchend\">\n" +
    "	  <!-- Search -->\n" +
    "		<search-filter filter-config=\"filterConfig\" search=\"search\" do-search=\"doSearch\"></search-filter> \n" +
    "\n" +
    "		<!-- List of Companies -->\n" +
    "		<div class=\"panel panel-default scrollable-list u_margin-sm-top\"\n" +
    "		  scrolling-list=\"loadCompanies()\"\n" +
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
    "<div class=\"modal-body company-settings-modal\" stop-event=\"touchend\">\n" +
    "  <form id=\"companyForm\" role=\"form\" name=\"forms.companyForm\">\n" +
    "    <div ng-include=\"'company-fields.html'\"></div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Authentication Key\n" +
    "      </label>\n" +
    "      <a class=\"action-link ps-reset-auth-key\" href=\"\" ng-click=\"resetAuthKey()\">Reset</a>\n" +
    "      <div class=\"ps-auth-key\">\n" +
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
    "    <button type=\"button\" id=\"delete-button\" class=\"btn btn-danger btn-fixed-width pull-left\"\n" +
    "      ng-show=\"!isDeletingCompany\" ng-click=\"deleteCompany()\">\n" +
    "      Delete <i class=\"fa fa-white fa-trash-o icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-confirm-delete\" data-dismiss=\"modal\" ng-show=\"isDeletingCompany\" ng-click=\"closeModal()\">\n" +
    "      Confirm Deletion <i class=\"fa fa-white fa-warning icon-right\"></i>\n" +
    "    </button>\n" +
    "    <div class=\"pull-right\">\n" +
    "      <span class=\"hidden-xs\"><last-modified change-date=\"company.changeDate\" changed-by=\"company.changedBy\"></last-modified></span>\n" +
    "      <button type=\"button\" id=\"save-button\"\n" +
    "        class=\"btn btn-primary btn-fixed-width\" ng-click=\"save()\"\n" +
    "        ng-disabled=\"forms.companyForm.$invalid\">Save\n" +
    "        <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" id=\"close-button\"\n" +
    "        class=\"btn btn-default btn-fixed-width\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Cancel\n" +
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
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\"\n" +
    "    aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"company-users-label\" class=\"modal-title\">Company Users</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body company-users-modal\" stop-event=\"touchend\">\n" +
    "  <!-- Search -->\n" +
    "  <search-filter filter-config=\"filterConfig\" search=\"search\" do-search=\"doSearch\"></search-filter> \n" +
    "\n" +
    "  <!-- List of Users -->\n" +
    "  <div class=\"panel panel-default scrollable-list company-users-list u_margin-sm-top\"\n" +
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
  $templateCache.put("help-dropdown-menu.html",
    "\n" +
    "<ul>\n" +
    "    <li><a id=\"askCommunityButton\" href=\"https://community.risevision.com/rise_vision_inc\" target=\"_blank\">Ask the Community</a></li>\n" +
    "    <li><a id=\"getSupportButton\" ng-click=\"getSupport()\" href=\"\">Get Support</a></li>\n" +
    "    <li><a id=\"signUpForWebinarsButton\" href=\"https://www.risevision.com/webinars\" target=\"_blank\">Free Webinars</a></li>\n" +
    "    <li><a id=\"documentationButton\" href=\"https://help.risevision.com/\" target=\"_blank\">User Documentation</a></li>\n" +
    "    <li><a id=\"signUpForTrainingButton\" href=\"https://store.risevision.com/product/30/rise-training\" target=\"_blank\">Rise Training</a></li>\n" +
    "</ul>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("help-dropdown.html",
    "<li ng-show=\"!isLoggedIn || (isLoggedIn && isRiseVisionUser)\" dropdown class=\"dropdown hidden-xs\">\n" +
    "  <button id=\"helpDropdownButton\" dropdown-toggle class=\"dropdown-toggle btn btn-primary\"><span class=\"hidden-sm hidden-xs hidden-md\">Need Help</span><i class=\"fa fa-question u_icon-white\"></i></button>\n" +
    "  <div class=\"dropdown-menu app-navigation\" role=\"menu\">\n" +
    "      <ng-include\n" +
    "              replace-include\n" +
    "              src=\"'help-dropdown-menu.html'\">\n" +
    "      </ng-include>\n" +
    "  </div>\n" +
    "</li>\n" +
    "\n" +
    "<!-- Mobile -->\n" +
    "<li ng-show=\"!isLoggedIn || (isLoggedIn && isRiseVisionUser)\" class=\"visible-xs-inline-block\" >\n" +
    "    <button class=\"dropdown-toggle btn btn-primary\"\n" +
    "       action-sheet=\"'help-dropdown-menu.html'\"\n" +
    "       action-sheet-class=\"app-navigation\">\n" +
    "        <i class=\"fa fa-question u_icon-white\"></i>\n" +
    "    </button>\n" +
    "</li>\n" +
    "\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("help-priority-support-modal.html",
    "<div id=\"prioritySupportModal\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <button id=\"prioritySupportModalCloseButton\" ng-click=\"dismiss()\" type=\"button\" class=\"close\">\n" +
    "            <i class=\"fa fa-times\"></i>\n" +
    "        </button>\n" +
    "        <h2 class=\"modal-title\">Priority Support</h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\" stop-event=\"touchend\">\n" +
    "\n" +
    "        <div class=\"u_margin-lg-bottom blank-state\">\n" +
    "            <div class=\"product-graphic\" ng-show=\"['trial-available', 'not-subscribed'].indexOf(subscriptionStatus.statusCode) >= 0\">\n" +
    "                <img itemprop=\"image\" class=\"img-responsive\" src=\"https://s3.amazonaws.com/Store-Products/Rise-Vision/support_image.png\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"content-box-body\" ng-show=\"subscriptionStatus.statusCode != 'subscribed'\">\n" +
    "                <div class=\"product-intro\">\n" +
    "                    <h1>Priority Support</h1>\n" +
    "                    <p class=\"lead\">Get the help you need in 10 minutes or less, 8-5 CST Monday through Friday, or let us remotely connect, diagnose and correct display problems all without the need for you to intervene!</p>\n" +
    "                    <p class=\"lead\">$75 per Company per Month.</p>\n" +
    "                    <a class=\"btn btn-hg btn-primary\" href=\"{{supportProductUrl}}\" ng-click=\"dismiss()\" target=\"_blank\">\n" +
    "                        <span>Subscribe Now!</span>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div><!--blank-state-->\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("help-send-us-a-note-modal.html",
    "<div id=\"sendUsANoteModal\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <button id=\"sendUsANoteModalCloseButton\" ng-click=\"dismiss()\" type=\"button\" class=\"close\">\n" +
    "            <i class=\"fa fa-times\"></i>\n" +
    "        </button>\n" +
    "        <h2 class=\"modal-title\"></h2>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body text-center\" stop-event=\"touchend\">\n" +
    "        <p class=\"lead\">Send us a note and we will typically get back to you next business day.</p>\n" +
    "\n" +
    "        <a ng-if=\"!loggedIn\" href=\"https://www.risevision.com/contact/\" target=\"_blank\" class=\"btn btn-primary btn-lg\">\n" +
    "          Send Us a Note\n" +
    "        </a>\n" +
    "        <button ng-if=\"loggedIn\" class=\"btn btn-primary btn-lg\" ng-click=\"sendUsANote()\">\n" +
    "            Send Us a Note\n" +
    "        </button>\n" +
    "\n" +
    "        <div class=\"content-box u_margin-md-top u_remove-bottom\">\n" +
    "          <div class=\"content-box-body\">\n" +
    "            <p class=\"lead u_margin-left u_margin-right\">\n" +
    "                <strong>Need help fast?</strong>\n" +
    "                Check out Priority Support and have a response in <strong>10 minutes</strong>. We are online 8-5 CST Monday through Friday.\n" +
    "            </p>\n" +
    "\n" +
    "            <a class=\"btn btn-primary btn-lg\" href=\"{{supportProductUrl}}\" ng-click=\"dismiss();\" target=\"_blank\">\n" +
    "                Subscribe Now\n" +
    "            </a>\n" +
    "      </div><!--content-box-body-->\n" +
    "    </div>\n" +
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
    "<div class=\"modal-body move-company-modal\" stop-event=\"touchend\">\n" +
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
    "  <button type=\"button\" class=\"close registration-cancel-button\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 class=\"modal-title\">Let's finish with your details</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body registration-modal\" stop-event=\"touchend\">\n" +
    "  \n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-8\">\n" +
    "\n" +
    "      <form id=\"registrationForm\" novalidate role=\"form\" name=\"forms.registrationForm\">\n" +
    "        <!-- First Name -->\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.firstName.$invalid && !forms.registrationForm.firstName.$pristine }\">\n" +
    "          <label for=\"firstName\">First Name</label>\n" +
    "          <input type=\"text\" class=\"form-control firstName\"\n" +
    "          name=\"firstName\"\n" +
    "          id=\"firstName\" required\n" +
    "          ng-model=\"profile.firstName\">\n" +
    "          <p ng-show=\"forms.registrationForm.firstName.$invalid && !forms.registrationForm.firstName.$pristine\"\n" +
    "            class=\"help-block validation-error-message-first-name\">Enter First Name.</p>\n" +
    "        </div>\n" +
    "        <!-- Last Name -->\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.lastName.$invalid && !forms.registrationForm.lastName.$pristine }\">\n" +
    "          <label for=\"lastName\">Last Name</label>\n" +
    "          <input type=\"text\" class=\"form-control lastName\"\n" +
    "          name=\"lastName\"\n" +
    "          id=\"lastName\" required\n" +
    "          ng-model=\"profile.lastName\">\n" +
    "          <p ng-show=\"forms.registrationForm.lastName.$invalid && !forms.registrationForm.lastName.$pristine\"\n" +
    "            class=\"help-block validation-error-message-last-name\">Enter Last Name.</p>\n" +
    "        </div>\n" +
    "        <!-- Email -->\n" +
    "        <div class=\"form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.email.$invalid && !forms.registrationForm.email.$pristine }\">\n" +
    "          <label for=\"email\">Email <span>(We'll only send you system notices and other critical information)</span></label>\n" +
    "          <input type=\"email\" class=\"form-control email\"\n" +
    "          name=\"email\"\n" +
    "          id=\"email\" required\n" +
    "          ng-model=\"profile.email\">\n" +
    "          <p ng-show=\"forms.registrationForm.email.$invalid && !forms.registrationForm.email.$pristine\"\n" +
    "            class=\"help-block validation-error-message-email\">Enter a valid email.</p>\n" +
    "        </div>\n" +
    "        <!-- Website -->\n" +
    "        <div class=\"form-group\" ng-show=\"newUser\">\n" +
    "          <label for=\"website\">Company Website</label>\n" +
    "          <input type=\"text\" class=\"form-control website\"\n" +
    "          name=\"website\"\n" +
    "          id=\"website\"\n" +
    "          ng-model=\"company.website\">\n" +
    "        </div>\n" +
    "        <!-- Terms of Service and Privacy -->\n" +
    "        <div class=\"checkbox form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.accepted.$invalid && !userForm.accepted.$pristine }\">\n" +
    "          <label>\n" +
    "          <input type=\"checkbox\" name=\"accepted\"\n" +
    "            ng-model=\"profile.accepted\"\n" +
    "            class=\"accept-terms-checkbox\" required />\n" +
    "          I accept the terms of <a href=\"https://www.risevision.com/terms-of-service\" target=\"_blank\">Service and Privacy</a>\n" +
    "          <p ng-show=\"forms.registrationForm.accepted.$invalid && !forms.registrationForm.accepted.$pristine\"\n" +
    "            class=\"help-block validation-error-message-accepted\">You must accept terms and condtions.</p>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "        <!-- Newsletter -->\n" +
    "        <div class=\"checkbox form-group\">\n" +
    "          <label>\n" +
    "            <input type=\"checkbox\" class=\"sign-up-newsletter-checkbox\" ng-model=\"profile.mailSyncEnabled\"> Sign up for our newsletter\n" +
    "          </label>\n" +
    "        </div>\n" +
    "        <div class=\"u_margin-md-top\">\n" +
    "          <button ng-click=\"save()\"\n" +
    "            name=\"create-account\"\n" +
    "            type=\"button\"\n" +
    "            class=\"btn btn-lg btn-success btn-block registration-save-button\"\n" +
    "            ng-disabled=\"registering\">\n" +
    "            Create Account <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn hidden btn-lg btn-link btn-fixed-width\"\n" +
    "          ng-disabled=\"registering\"\n" +
    "          ng-click=\"closeModal()\">\n" +
    "            Cancel\n" +
    "          </button>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-4\">\n" +
    "      <div class=\"signup-counters\">\n" +
    "        <div class=\"counter\">\n" +
    "          <p>129</p>\n" +
    "          <span>New Companies Added Yesterday</span>\n" +
    "        </div>\n" +
    "        <div class=\"counter\">\n" +
    "          <p>72,990</p>\n" +
    "          <span>Total Companies</span>\n" +
    "        </div>\n" +
    "        <div class=\"counter\">\n" +
    "          <p>120</p>\n" +
    "          <span>Countries with Active Displays</span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>  \n" +
    "\n" +
    "  \n" +
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
  $templateCache.put("safe-delete-modal.html",
    "<form id=\"safeDeleteForm\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <button type=\"button\" class=\"close\" ng-click=\"dismiss()\" data-dismiss=\"modal\" aria-hidden=\"true\">\n" +
    "      <i class=\"fa fa-times\"></i>\n" +
    "    </button>\n" +
    "    <h3 class=\"modal-title\" translate>common.safeDelete.title</h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\" stop-event=\"touchend\">\n" +
    "    <p translate>common.safeDelete.message</p>\n" +
    "    <input id=\"safeDeleteInput\" type=\"text\" ng-model=\"inputText\" class=\"form-control\" />\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button id=\"deleteForeverButton\" class=\"btn btn-primary\" ng-click=\"confirm()\" ng-disabled=\"!canConfirm\">\n" +
    "      <span translate>common.delete-forever</span> <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-default btn-fixed-width\" ng-click=\"cancel()\">\n" +
    "      <span translate>common.cancel</span> <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n" +
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
    "<div class=\"modal-body sign-out-modal\" stop-event=\"touchend\">\n" +
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
    "<div class=\"modal-body text-center\" stop-event=\"touchend\">\n" +
    "  <div class=\"signup-modal\">\n" +
    "    <div class=\"logo u_margin-lg-bottom hidden\">\n" +
    "      <img style=\"width:120px\" src=\"//s3.amazonaws.com/Rise-Images/UI/logo.svg\" alt=\"Rise Vision\">\n" +
    "    </div>\n" +
    "    <h1 class=\"modal-title u_margin-md-top u_remove-bottom\">New to Rise Vision?</h1>\n" +
    "    <p class=\"text-muted\">CREATE A FREE ACCOUNT</p>\n" +
    "\n" +
    "    <a class=\"u_margin-md-top btn btn-hg btn-google-auth\" id=\"google-registration-button\" ng-click=\"login('registrationComplete')\"><strong>Sign Up with Google</strong> <i class=\"fa fa-google fa-lg icon-right\"></i></a>\n" +
    "    <p class=\"text-muted u_remove-bottom u_margin-sm-top\"><a href=\"https://accounts.google.com/signup\" target=\"_blank\">I don't have a Google Account</a></p>\n" +
    "    <p class=\"text-muted hidden\">Already a Rise Vision User? <a ng-click=\"$event.preventDefault(); login('registrationComplete');\" ng-href=\"#\">Sign In</a></p>\n" +
    "\n" +
    "    <div class=\"signup-offer\">\n" +
    "      <p>Get <strong>Unlimited Access To All Features</strong> Including Our Most Popular Widgets</p>\n" +
    "      <ul class=\"list-unstyled widgets-offer\">\n" +
    "        <li><img src=\"https://s3.amazonaws.com/Rise-Images/Experimental/web.png\"><span>Web <br>Page</span></li>\n" +
    "        <li><img src=\"https://s3.amazonaws.com/Rise-Images/Experimental/spreadsheet.png\"><span>Google Spreadsheet</span></li>\n" +
    "        <li><img src=\"https://s3.amazonaws.com/Rise-Images/Experimental/calendar.png\"><span>Google Calendar</span></li>\n" +
    "        <li><img src=\"https://s3.amazonaws.com/Rise-Images/Experimental/rss.png\"><span>RSS <br>Feed</span></li>\n" +
    "        <li><img src=\"https://s3.amazonaws.com/Rise-Images/Experimental/news.png\"><span>News <br>Headlines</span></li>\n" +
    "        <li><img src=\"https://s3.amazonaws.com/Rise-Images/Experimental/video.png\"><span>Video <br>Folder</span></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div><!--signup-modal-->  \n" +
    "</div><!--modal-body-->\n" +
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
    "<div class=\"modal-body add-subcompany-modal\" stop-event=\"touchend\">\n" +
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
    "<div class=\"modal-body user-settings-modal\" stop-event=\"touchend\">\n" +
    "  <form id=\"userSettingsForm\" role=\"form\" novalidate name=\"forms.userSettingsForm\">\n" +
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
    "        name=\"phone\"\n" +
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
    "      <div>{{user.lastLogin | date:'d-MMM-yyyy h:mm a'}}</div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-if=\"!editingYourself && !isAdd\">\n" +
    "      <label for=\"user-settings-status\">\n" +
    "        Status\n" +
    "      </label>\n" +
    "      <select id=\"user-settings-status\"\n" +
    "        class=\"form-control selectpicker\" ng-model=\"user.status\" integer-parser>\n" +
    "        <option value=\"1\">Active</option>\n" +
    "        <option value=\"0\">Inactive</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <p class=\"text-right\"><last-modified change-date=\"user.changeDate\" changed-by=\"user.changedBy\"></last-modified></p>\n" +
    "  <button type=\"button\" id=\"delete-button\" class=\"btn btn-danger btn-fixed-width pull-left\"\n" +
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
