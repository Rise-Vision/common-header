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
    "    <a href=\"https://store.risevision.com/account\" target=\"_blank\" link-cid>\n" +
    "      <i class=\"fa fa-shopping-cart\"></i>\n" +
    "      <span class=\"item-name\">Store Account</span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <span ng-if=\"isLoggedIn && !isRiseVisionUser\" class=\"google-account\" class=\"username\">{{username}}</span>\n" +
    "\n" +
    "  <li class=\"dropdown-footer text-right\" ng-show=\"isLoggedIn\">\n" +
    "    <button class=\"sign-out-button btn btn-sm btn-default\" ng-controller=\"SignOutButtonCtrl\" ng-click=\"logout()\">Sign Out<i class=\"fa fa-sign-out icon-right\"></i>\n" +
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
    "    <li>\n" +
    "      <a ng-if=\"isLoggedIn === false\" ng-controller=\"SignUpButtonCtrl\" id=\"prioritySupportButton\" href=\"\" ng-click=\"openSignUpModal()\">Priority Support <span class=\"text-green\">Fastest</span></a>\n" +
    "      <a ng-if=\"isLoggedIn === true\" id=\"prioritySupportButton\" href=\"\" ng-click=\"openPrioritySupport()\">Priority Support <span class=\"text-green\">Fastest</span></a>\n" +
    "  </li>\n" +
    "    <li><a id=\"sendUsANoteButton\" href=\"\" ng-click=\"openSendUsANote()\">Send Us a Note</a></li>\n" +
    "    <li><a id=\"signUpForWebinarsButton\" href=\"https://www.risevision.com/webinars\" target=\"_blank\">Free Webinars</a></li>\n" +
    "    <li><a id=\"documentationButton\" href=\"https://help.risevision.com/user\" target=\"_blank\">User Documentation</a></li>\n" +
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
    "        <p class=\"lead\"><strong>Something else in mind?</strong> Send us a note and we will typically get back to you next business day.</p>\n" +
    "        <button class=\"btn btn-primary btn-lg\" ng-click=\"sendUsANote()\">\n" +
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
    "            <a ng-if=\"!subscriptionStatus.statusCode || ['not-subscribed', 'trial-expired', 'cancelled', 'suspended'].indexOf(subscriptionStatus.statusCode) >= 0\" class=\"btn btn-primary btn-lg\" href=\"{{supportProductUrl}}\" ng-click=\"dismiss();\" target=\"_blank\">\n" +
    "                Subscribe Now\n" +
    "            </a>\n" +
    "            <button ng-if=\"['on-trial', 'subscribed'].indexOf(subscriptionStatus.statusCode) >= 0\" class=\"btn btn-primary btn-lg\" ng-click=\"prioritySupport()\">\n" +
    "                Use Priority Support\n" +
    "            </button>\n" +
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
    "        <!-- Terms of Service and Privacy -->\n" +
    "        <div class=\"checkbox form-group\" ng-class=\"{ 'has-error' : forms.registrationForm.accepted.$invalid && !userForm.accepted.$pristine }\">\n" +
    "          <label>\n" +
    "          <input type=\"checkbox\" name=\"accepted\"\n" +
    "            ng-model=\"profile.accepted\"\n" +
    "            class=\"accept-terms-checkbox\" required />\n" +
    "          I accept the terms of <a href=\"http://www.risevision.com/terms-service-privacy/\" target=\"_blank\">Service and Privacy</a>\n" +
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
  "risevision.common.loading",
  "risevision.ui-flow",
  "risevision.common.systemmessages", "risevision.core.systemmessages",
  "risevision.core.countries",
  "risevision.core.oauth2",
  "risevision.common.geodata",
  "risevision.store.data-gadgets",
  "risevision.core.userprofile",
  "risevision.common.registration",
  "risevision.common.shoppingcart",
  "checklist-model",
  "ui.bootstrap", "ngSanitize", "ngCsv", "ngTouch",
  "risevision.common.components.userstate",
  "risevision.common.components.last-modified",
  "risevision.common.components.search-filter",
  "risevision.common.components.scrolling-list",
  "risevision.common.components.stop-event",
  "risevision.common.components.analytics",
  "risevision.common.svg",
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

.directive("commonHeader", ["$modal", "$rootScope", "$q", "$loading",
  "$interval", "oauth2APILoader", "$log",
  "$templateCache", "userState", "$location", "bindToScopeWithWatch",
  "$document", "cookieTester",
  function ($modal, $rootScope, $q, $loading, $interval,
    oauth2APILoader, $log, $templateCache, userState, $location,
    bindToScopeWithWatch, $document, cookieTester) {
    return {
      restrict: "E",
      template: $templateCache.get("common-header.html"),
      scope: false,
      link: function ($scope, element, attr) {
        cookieTester.checkCookies().then(function () {
          $scope.cookieEnabled = true;
        }, function () {
          $scope.cookieEnabled = false;
        });
        $scope.navCollapsed = true;
        $scope.inRVAFrame = userState.inRVAFrame();
        $scope.isSubcompanySelected = userState.isSubcompanySelected;
        $scope.isTestCompanySelected = userState.isTestCompanySelected;

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
              d.type.toUpperCase() === "DATE")
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
});

angular.module("risevision.common.header.directives", []);

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

.controller("HelpDropdownButtonCtrl", ["zendesk", "$scope", "supportFactory",
  "userState",
  function (zendesk, $scope, supportFactory, userState) {

    $scope.$watch(function () {
        return userState.isLoggedIn();
      },
      function (loggedIn) {
        $scope.isLoggedIn = loggedIn;

        if (loggedIn) {
          zendesk.ensureScript();
        }
      });

    $scope.$watch(function () {
        return userState.isRiseVisionUser();
      },
      function (riseVisionUser) {
        $scope.isRiseVisionUser = riseVisionUser;

      });

    $scope.openPrioritySupport = function () {
      supportFactory.handlePrioritySupportAction();
    };

    $scope.openSendUsANote = function () {
      supportFactory.handleSendUsANote();
    };
  }
]);

angular.module("risevision.common.header")

.controller("HelpPrioritySupportModalCtrl", [
  "$scope", "$modalInstance", "subscriptionStatus", "supportFactory",
  "SUPPORT_PRODUCT_URL",
  function ($scope, $modalInstance, subscriptionStatus,
    supportFactory, SUPPORT_PRODUCT_URL) {
    $scope.subscriptionStatus = subscriptionStatus;
    $scope.supportProductUrl = SUPPORT_PRODUCT_URL;

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };

  }
]);

angular.module("risevision.common.header")

.controller("HelpSendUsANoteModalCtrl", [
  "$scope", "$modalInstance", "subscriptionStatus", "supportFactory",
  "zendesk",
  "SUPPORT_PRODUCT_URL",
  function ($scope, $modalInstance, subscriptionStatus, supportFactory,
    zendesk,
    SUPPORT_PRODUCT_URL) {

    $scope.subscriptionStatus = subscriptionStatus;
    $scope.supportProductUrl = SUPPORT_PRODUCT_URL;

    $scope.sendUsANote = function () {
      zendesk.showSendNote();
      $scope.dismiss();
    };

    $scope.prioritySupport = function () {
      zendesk.showWidget();
      $scope.dismiss();
    };

    $scope.startTrial = function () {
      supportFactory.initiateTrial().then(function () {
        $scope.dismiss();
      });
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss();
    };

  }
]);

angular.module("risevision.common.header")
  .controller("AuthButtonsCtr", ["$scope", "$modal", "$templateCache",
    "userState", "$loading", "cookieStore",
    "$log", "uiFlowManager", "oauth2APILoader", "bindToScopeWithWatch",
    "$window", "APPS_URL",
    function ($scope, $modal, $templateCache, userState,
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
        shoppingCart.get();
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
    "$scope", "$modalInstance",
    "$loading", "registerAccount", "$log", "cookieStore",
    "userState", "pick", "uiFlowManager", "humanReadableError",
    "agreeToTermsAndUpdateUser", "account", "segmentAnalytics",
    "bigQueryLogging", "analyticsEvents",
    function ($scope, $modalInstance, $loading, registerAccount, $log,
      cookieStore, userState, pick, uiFlowManager, humanReadableError,
      agreeToTermsAndUpdateUser, account, segmentAnalytics, bigQueryLogging,
      analyticsEvents) {

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
                  analyticsEvents.identify();
                  segmentAnalytics.track("User Registered", {
                    "companyId": userState.getUserCompanyId(),
                    "companyName": userState.getUserCompanyName(),
                    "isNewCompany": newUser
                  });
                  bigQueryLogging.logEvent("User Registered");

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
  "TIMEZONES", "getCompany", "regenerateCompanyField", "$window", "$loading",
  "humanReadableError", "userState", "deleteCompany", "segmentAnalytics",
  "$modal", "$templateCache",
  function ($scope, $modalInstance, updateCompany, companyId,
    countries, REGIONS_CA, REGIONS_US, TIMEZONES, getCompany,
    regenerateCompanyField, $window, $loading, humanReadableError, userState,
    deleteCompany, segmentAnalytics, $modal, $templateCache) {

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
            alert("Error(s): " + humanReadableError(error));
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
                userState.signOut();
              } else if (userState.getSelectedCompanyId() === $scope.company
                .id) {
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
        delete company.sellerId;
        delete company.isTest;
      }
    }

  }
]);

angular.module("risevision.common.header")
  .controller("SubCompanyModalCtrl", ["$scope", "$modalInstance", "$modal",
    "$templateCache", "createCompany", "countries", "REGIONS_CA",
    "REGIONS_US", "TIMEZONES", "userState", "$loading", "humanReadableError",
    "segmentAnalytics", "bigQueryLogging",
    function ($scope, $modalInstance, $modal, $templateCache,
      createCompany, countries, REGIONS_CA, REGIONS_US, TIMEZONES, userState,
      $loading, humanReadableError, segmentAnalytics, bigQueryLogging) {

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
  .controller("companySelectorCtr", ["$scope", "$modalInstance",
    "companyService", "companyId", "BaseList", "$loading",
    function ($scope, $modalInstance, companyService,
      companyId, BaseList, $loading) {

      var DB_MAX_COUNT = 40; //number of records to load at a time

      $scope.companies = new BaseList(DB_MAX_COUNT);
      $scope.search = {
        query: ""
      };
      $scope.filterConfig = {
        placeholder: "Search Companies"
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

      $scope.loadCompanies = function () {
        if (!$scope.companies.endOfList) {
          $scope.loading = true;
          companyService.getCompanies(
            companyId, $scope.search.query,
            $scope.companies.cursor, DB_MAX_COUNT, null).then(function (
            result) {
            if (result && result.items) {
              $scope.companies.add(result.items, result.cursor);
            }
          }).finally(function () {
            $scope.loading = false;
          });
        }
      };

      if ($scope.companies.list.length === 0) {
        $scope.loadCompanies();
      }

      $scope.doSearch = function () {
        $scope.companies.clear();
        $scope.loadCompanies();
      };

      $scope.setCompany = function (company) {
        $modalInstance.close(company.id);
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
        $loading.start("company-users-list");
      } else {
        $loading.stop("company-users-list");
      }
    });

    $scope.sort = {
      field: "username",
      descending: false
    };

    $scope.search = {
      query: ""
    };
    $scope.filterConfig = {
      placeholder: "Search Users"
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
        search: $scope.search.query
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

.controller("AddUserModalCtrl", ["$scope", "addUser", "$modalInstance",
  "companyId", "userState", "userRoleMap", "humanReadableError", "$loading",
  "segmentAnalytics",
  function ($scope, addUser, $modalInstance, companyId, userState,
    userRoleMap, humanReadableError, $loading, segmentAnalytics) {
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
        addUser(companyId, $scope.user.username, $scope.user).then(
          function () {
            segmentAnalytics.track("User Created", {
              userId: $scope.user.username,
              companyId: companyId
            });

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
  "$scope", "$modalInstance", "updateUser", "getUserProfile", "deleteUser",
  "addUser", "username", "userRoleMap", "$log", "$loading", "userState",
  "uiFlowManager", "humanReadableError", "$rootScope", "segmentAnalytics",
  function ($scope, $modalInstance, updateUser, getUserProfile, deleteUser,
    addUser, username, userRoleMap, $log, $loading, userState,
    uiFlowManager, humanReadableError, $rootScope, segmentAnalytics) {
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
          function (resp) {
            if (userState.checkUsername(username)) {
              userState.updateUserProfile(resp.item);
            }

            segmentAnalytics.track("User Updated", {
              userId: $scope.username,
              companyId: userState.getSelectedCompanyId(),
              isSelf: userState.checkUsername(username)
            });

            $modalInstance.close("success");
          },
          function (error) {
            $log.debug(error);
            alert("Error: " + humanReadableError(error));
          }
        ).finally(function () {
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
      if (userState.isRiseAdmin()) {
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
  .controller("SignOutButtonCtrl", ["$scope", "$modal", "$templateCache",
    "uiFlowManager",
    function ($scope, $modal, $templateCache, uiFlowManager) {
      $scope.logout = function () {
        var modalInstance = $modal.open({
          template: $templateCache.get("signout-modal.html"),
          controller: "SignOutModalCtrl"
        });
        modalInstance.result.finally(function () {
          uiFlowManager.invalidateStatus("registrationComplete");
        });
      };
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
    "risevision.common.components.userstate", "risevision.ui-flow",
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

"use strict";

angular.module("risevision.common.support", [
  "risevision.widget.common.subscription-status"
])
  .factory("supportFactory", ["getSubscriptionStatus", "$q",
    "SUPPORT_PRODUCT_CODE", "STORE_SERVER_URL", "userState",
    "$modal", "$templateCache", "$window", "segmentAnalytics",
    "zendesk", "$log",
    function (getSubscriptionStatus, $q, SUPPORT_PRODUCT_CODE,
      STORE_SERVER_URL, userState, $modal, $templateCache,
      $window, segmentAnalytics, zendesk, $log) {
      var factory = {};
      var PREMIUM_PLAN = "Premium";
      var BASIC_PLAN = "Free";
      factory.handlePrioritySupportAction = function () {
        _isSubscribed().then(function () {
          factory.openZendeskForm();
        }, function (subscriptionStatus) {
          _openSupportModal(subscriptionStatus);
        });
      };

      var _isSubscribed = function () {
        var deferred = $q.defer();
        getSubscriptionStatus().then(function (subscriptionStatus) {
          if (subscriptionStatus.statusCode ===
            "subscribed") {
            _sendUserPlanUpdateToIntercom(PREMIUM_PLAN);
            deferred.resolve(subscriptionStatus);
          } else {
            _sendUserPlanUpdateToIntercom(BASIC_PLAN);
            deferred.reject(subscriptionStatus);
          }
        }, function (err) {
          $log.debug("Could not retrieve a subscription status", err);
          deferred.reject();
        });

        return deferred.promise;
      };

      var _sendUserPlanUpdateToIntercom = function (plan) {
        segmentAnalytics.identify(userState.getUsername(), {
          "plan": plan
        });
      };

      var _openSupportModal = function (subscriptionStatus) {
        $log.debug("opening support trial popup");
        $modal.open({
          template: $templateCache.get("help-priority-support-modal.html"),
          controller: "HelpPrioritySupportModalCtrl",
          resolve: {
            subscriptionStatus: function () {
              return subscriptionStatus;
            }
          }
        });
      };

      factory.openZendeskForm = function () {
        zendesk.showWidget();
      };

      factory.handleSendUsANote = function () {
        _isSubscribed().then(function (subscriptionStatus) {
          _openSendUsANote(subscriptionStatus);
        }, function (subscriptionStatus) {
          _openSendUsANote(subscriptionStatus);
        });
      };

      var _openSendUsANote = function (subscriptionStatus) {
        $log.debug("opening send us a note popup");
        $modal.open({
          template: $templateCache.get("help-send-us-a-note-modal.html"),
          controller: "HelpSendUsANoteModalCtrl",
          resolve: {
            subscriptionStatus: function () {
              return subscriptionStatus;
            }
          }
        });
      };

      return factory;
    }
  ])
  .factory("getSubscriptionStatus", ["SUPPORT_PRODUCT_CODE", "userState", "$q",
    "subscriptionStatusService", "$log",
    function (SUPPORT_PRODUCT_CODE, userState, $q, subscriptionStatusService,
      $log) {
      return function getSubscriptionStatus() {
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
  ]);

/* jshint maxlen: false */

(function (angular) {
  "use strict";

  angular.module("risevision.common.support")

  .factory("zendesk", ["getSubscriptionStatus", "segmentAnalytics",
    "userState",
    "$window", "$q", "$location",
    function (getSubscriptionStatus, segmentAnalytics, userState, $window,
      $q,
      $location) {

      var loaded = false;

      function ensureScript() {
        if (!loaded) {
          var deferred = $q.defer();
          var script =
            /* jshint quotmark: single */
            'window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement(\"iframe\");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src=\"javascript:false\",r.title=\"\",r.role=\"presentation\",(r.frameElement||r).style.cssText=\"display: none\",d=document.getElementsByTagName(\"script\"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src=\'javascript:var d=document.open();d.domain=\"\'+n+\'\";void(0);\',o=s}o.open()._l=function(){var o=this.createElement(\"script\");n&&(this.domain=n),o.id=\"js-iframe-async\",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write(\'<body onload=\"document._l();\">\'),o.close()}(\"https://assets.zendesk.com/embeddable_framework/main.js\",\"risevision.zendesk.com\");';
          /* jshint quotmark: double */

          var scriptElem = $window.document.createElement("script");
          scriptElem.innerText = script;

          $window.document.body.appendChild(scriptElem);
          loaded = true;
          $window.zE(function () {
            $window.zE.hide();
            deferred.resolve();
          });

          return deferred.promise;
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
            "rise_vision_company_name": userState.getUserCompanyName(),
          };

          getSubscriptionStatus().then(function (
            subscriptionStatus) {

            if (subscriptionStatus && subscriptionStatus.statusCode ===
              "subscribed") {
              // append priority support flag
              $location.search("cHJpb3JpdHktc3VwcG9ydA", 1);
            } else {
              // clear priority support flag
              $location.search("cHJpb3JpdHktc3VwcG9ydA", null);
            }
            segmentAnalytics.identify(username, properties);
            deferred.resolve();
          }).catch(deferred.reject);

        });
        return deferred.promise;
      }

      function showWidget() {
        return ensureScript()
          .then(_identify)
          .then(function () {
            // clear send-a-note flag
            $location.search("c2VuZC11cy1hLW5vdGU", null);
          })
          .then(function () {
            $window.zE.activate();
          });
      }

      function showSendNote() {
        return ensureScript()
          .then(_identify)
          .then(function () {
            // append send-a-note flag
            $location.search("c2VuZC11cy1hLW5vdGU", 1);
            // clear priority support flag
            $location.search("cHJpb3JpdHktc3VwcG9ydA", null);
          })
          .then(function () {
            $window.zE.activate();
          });
      }

      function forceCloseAll() {
        if ($window.zE && $window.zE.hide) {
          $window.zE.hide();
        }
      }

      return {
        ensureScript: ensureScript,
        showWidget: showWidget,
        showSendNote: showSendNote,
        forceCloseAll: forceCloseAll,
      };

    }
  ]).run(["$rootScope", "zendesk",
    function ($rootScope, zendesk) {
      $rootScope.$on("$stateChangeSuccess", function () {
        zendesk.forceCloseAll();
      });
    }
  ]);
})(angular);

(function (angular){

  "use strict";

  angular.module("risevision.core.cache", [])

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

  .factory("addUser", ["$q", "coreAPILoader", "$log", "pick", "getUserProfile",
  function ($q, coreAPILoader, $log, pick, getUserProfile) {
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
            getUserProfile(username, true).then(function() {deferred.resolve(resp);});
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
      "mailSyncEnabled", "sellerId", "isTest", "shipToUseCompanyAddress", 
      "shipToName", "shipToStreet", "shipToUnit", "shipToCity", 
      "shipToProvince", "shipToPostalCode", "shipToCountry"
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
              $log.error(
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

  .factory('storageAPILoader', ['STORAGE_ENDPOINT_URL', 'gapiClientLoaderGenerator', '$location',
    function (STORAGE_ENDPOINT_URL, gapiClientLoaderGenerator, $location) {
      var baseUrl = $location.search().storage_api_base_url ? $location.search().storage_api_base_url + '/_ah/api' : STORAGE_ENDPOINT_URL;
      return gapiClientLoaderGenerator('storage', 'v0.01', baseUrl);
    }
  ])
  
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

  angular.module("risevision.common.components.util", []);
  angular.module("risevision.common.components.logging", []);

  angular.module("risevision.common.components.rvtokenstore", [
    "risevision.common.components.util", "LocalStorageModule",
    "ngBiscuit"
  ]);

  angular.module("risevision.common.components.userstate", [
    "ui.router",
    "risevision.common.components.util",
    "risevision.common.components.rvtokenstore",
    "risevision.common.components.logging",
    "risevision.common.config",
    "risevision.common.gapi", "LocalStorageModule",
    "risevision.core.cache",
    "risevision.core.oauth2", "risevision.core.company",
    "risevision.core.util", "risevision.core.userprofile",
    "risevision.common.loading", "risevision.ui-flow"
  ])

  .value("CLIENT_ID", "614513768474.apps.googleusercontent.com");

})(angular);

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
                $log.error("Failed to load selected company.", resp);

                deferred.reject(resp);
              });
          } else {
            _companyState.resetCompany();

            deferred.resolve();
          }

          return deferred.promise;
        };

        var _companyState = {
          init: _init,
          switchCompany: _switchCompany,
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
          }
        };

        return _companyState;
      }
    ]);

})(angular);

"use strict";

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

  angular.module("risevision.common.components.rvtokenstore")
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

  angular.module("risevision.common.components.userstate")
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
          userState._setUserToken(params);
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
      "rvTokenStore", "externalLogging", "$http",
      function ($q, $log, $location, CLIENT_ID,
        gapiLoader, OAUTH2_SCOPES, userInfoCache,
        getOAuthUserInfo, getUserProfile, companyState, objectHelper,
        $rootScope, $interval, $loading, $window, GOOGLE_OAUTH2_URL,
        localStorageService, $document, uiFlowManager, getBaseDomain,
        rvTokenStore, externalLogging, $http) {
        //singleton factory that represents userState throughout application

        var _state = {
          profile: {}, //Rise vision profile
          user: {}, //Google user
          roleMap: {},
          userToken: rvTokenStore.read(),
          inRVAFrame: angular.isDefined($location.search().inRVA)
        };

        var _accessTokenRefreshHandler = null;

        var _authorizeDeferred, _authenticateDeferred;

        var _shouldLogPageLoad = true;

        var _logPageLoad = function (details) {
          if (_shouldLogPageLoad) {
            _shouldLogPageLoad = false;
            try {
              var duration = new Date().getTime() - $window.performance.timing
                .navigationStart;
              externalLogging.logEvent("page load time", details,
                duration,
                userState.getUsername(), userState.getSelectedCompanyId()
              );
            } catch (e) {
              $log.debug("Error logging load time");
            }
          }
        };

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

        _addEventListenerVisibilityAPI();

        var _setUserToken = function () {
          _state.userToken = userState.getUsername();
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
              userState.updateUserProfile(profile);

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

          if (_state.userToken !== "dummy") {
            opts.authuser = _state.userToken;
          } else {
            opts.authuser = $http.get(
              'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' +
              _state.params.access_token)
              .then(function (resp) {
                return resp.data.email;
              }, function (err) {
                console.log('Error retrieving userinfo');
                return opts.authuser;
              });
          }

          if (attemptImmediate) {
            opts.immediate = true;
          } else {
            opts.prompt = "select_account";
          }

          $q.all([gapiLoader(), opts.authuser])
            .then(function (qAll) {
              var gApi = qAll[0];
              opts.authuser = qAll[1];
              // Setting the gapi token with the chosen user token. This is a fix for the multiple account issue.
              gApi.auth.setToken(_state.params);

              gApi.auth.authorize(opts, function (authResult) {
                $log.debug("authResult", authResult);
                if (authResult && !authResult.error) {
                  if (_state.params) {
                    // clear token so we don't deal with expiry
                    delete _state.params;
                  }

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
          if (_authorizeDeferred) {
            return _authorizeDeferred.promise;
          }

          _authorizeDeferred = $q.defer();

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
                    _authorizeDeferred.resolve(authResult);
                    $rootScope.$broadcast(
                      "risevision.user.authorized");
                    if (!attemptImmediate) {
                      $rootScope.$broadcast(
                        "risevision.user.userSignedIn");
                    }

                    _authorizeDeferred = undefined;
                  });
              } else {
                _authorizeDeferred.resolve(authResult);

                _authorizeDeferred = undefined;
              }
            })
            .then(null, function (err) {
              objectHelper.clearObj(_state.user);
              _authorizeDeferred.reject(err);

              _authorizeDeferred = undefined;
            });

          return _authorizeDeferred.promise;
        };

        var authenticateRedirect = function (forceAuth) {

          if (!forceAuth) {
            return authenticate(forceAuth);
          } else {
            var loc, path, search, state;

            // Redirect to full URL path
            if ($rootScope.redirectToRoot === false) {
              loc = $window.location.href.substr(0, $window.location.href
                .indexOf(
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
              path = $window.location.pathname ? $window.location.pathname
                .substring(
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
                  _logPageLoad("authenticated user");
                });
            } else {
              var msg = "user is not authenticated";
              $log.debug(msg);
              //  _clearUserToken();
              authenticateDeferred.reject(msg);
              objectHelper.clearObj(_state.user);
              $loading.stopGlobal("risevision.user.authenticate");
              _logPageLoad("unauthenticated user");
            }
          };
          // pre-load gapi to prevent popup blocker issues
          gapiLoader().finally(_proceed);

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
          // user getters
          getUsername: function () {
            return (_state.user && _state.user.username) || null;
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
            return _state.user.picture;
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
          isSeller: companyState.isSeller,
          isRiseVisionUser: isRiseVisionUser,
          isLoggedIn: isLoggedIn,
          getAccessToken: getAccessToken,
          // user functions
          checkUsername: function (username) {
            return (username || false) && (userState.getUsername() ||
                false) &&
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
          authenticate: _state.inRVAFrame ? authenticate : authenticateRedirect,
          authenticatePopup: function () {
            return authenticate(true);
          },
          signOut: signOut,
          refreshProfile: refreshProfile,
          addEventListenerVisibilityAPI: _addEventListenerVisibilityAPI,
          removeEventListenerVisibilityAPI: _removeEventListenerVisibilityAPI,
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
          // company functions
          updateCompanySettings: companyState.updateCompanySettings,
          updateUserCompanySettings: companyState.updateUserCompanySettings,
          resetCompany: companyState.resetCompany,
          switchCompany: companyState.switchCompany,
          // private
          _restoreState: _restoreState,
          _setUserToken: function (params) {
            // save params in state in case of redirect
            _state.params = params;

            // set fake user token to idicate user is logged in
            _state.userToken = "dummy";
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
  angular.module("risevision.common.components.util")

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

  .factory("segmentAnalytics", ["$rootScope", "$window", "$log", "$location",
    function ($rootScope, $window, $log, $location) {
      var service = {};
      var loaded;

      $window.analytics = $window.analytics || [];
      var analytics = $window.analytics;

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
            service.pageview(service.location);
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

(function () {
  "use strict";

  try {
  	angular.module("risevision.common.config");
  }
  catch(err) {
  	angular.module("risevision.common.config", []);
  }

  angular.module("risevision.common.config")
    .value("STORE_URL", "https://store.risevision.com/")
    .value("STORE_SERVER_URL", "https://store-dot-rvaserver2.appspot.com/")
  ;

  angular.module("risevision.widget.common.subscription-status.config", [])
    .value("IN_RVA_PATH", "product/productId/?cid=companyId")
    .value("ACCOUNT_PATH", "account?cid=companyId")
    .value("PATH_URL", "v1/company/companyId/product/status?pc=")
    .value("AUTH_PATH_URL", "v1/widget/auth?cid=companyId&pc=")
  ;

}());

(function () {
  "use strict";

  angular.module("risevision.widget.common.subscription-status",
    ["risevision.common.config",
     "risevision.widget.common.subscription-status.config",
     "risevision.widget.common.subscription-status.service",
     "risevision.widget.common",
     "risevision.common.i18n",
     "ngSanitize",
     "ui.bootstrap"]);
  }());

(function () {
  "use strict";

  angular.module("risevision.widget.common.subscription-status")
    .directive("appSubscriptionStatus", ["$templateCache", "$modal", 
    "subscriptionStatusService",
      function ($templateCache, $modal, subscriptionStatusService) {
      return {
        restrict: "AE",
        require: "?ngModel",
        scope: {
          productId: "@",
          productCode: "@",
          companyId: "@",
          productPrice: "@"
        },
        template: $templateCache.get("app-subscription-status-template.html"),
        link: function($scope, elm, attrs, ctrl) {
          $scope.subscriptionStatus = {"status": "N/A", "statusCode": "na", "subscribed": false, "expiry": null};

          $scope.$watch("companyId", function() {
            checkSubscriptionStatus();
          });

          function checkSubscriptionStatus() {
            if ($scope.productCode && $scope.productId && $scope.companyId) {
              subscriptionStatusService.get($scope.productCode, $scope.companyId).then(function(subscriptionStatus) {
                if (subscriptionStatus) {
                  $scope.subscriptionStatus = subscriptionStatus;
                }
              },
              function () {
                // TODO: catch error here
              });
            }
          }

          if (ctrl) {
            $scope.$watch("subscriptionStatus", function(subscriptionStatus) {
              ctrl.$setViewValue(subscriptionStatus);
            });
          }

          $scope.$watch("showStoreModal", function(show) {
            if (show) {
              var modalInstance = $modal.open({
                templateUrl: "store-iframe-template.html",
                controller: "StoreModalController",
                size: "lg",
                resolve: {
                  productId: function () {
                    return $scope.productId;
                  },
                  companyId: function() {
                    return $scope.companyId;
                  }
                }
              });

              modalInstance.result.then(function () {
                checkSubscriptionStatus();

              }, function () {
                checkSubscriptionStatus();

              })
              .finally(function() {
                $scope.showStoreModal = false;
              });
            }
          });
        }
      };
    }])
    .directive("ngDisableRightClick", function() {
      return function(scope, element) {
        element.bind("contextmenu", function(event) {
          scope.$apply(function() {
            event.preventDefault();
          });
        });
      };
    });
}());

(function () {
  "use strict";

  angular.module("risevision.widget.common.subscription-status")
    .directive("subscriptionStatus", ["$rootScope", "$templateCache", 
    "subscriptionStatusService", "STORE_URL", "ACCOUNT_PATH", "IN_RVA_PATH",
      function ($rootScope, $templateCache, subscriptionStatusService, 
        STORE_URL, ACCOUNT_PATH, IN_RVA_PATH) {
      return {
        restrict: "AE",
        require: "?ngModel",
        scope: {
          productId: "@",
          productCode: "@",
          companyId: "@",
          expandedFormat: "@",
          showStoreModal: "=?"
        },
        template: $templateCache.get("subscription-status-template.html"),
        link: function($scope, elm, attrs, ctrl) {
          $scope.subscriptionStatus = {"status": "N/A", "statusCode": "na", "subscribed": false, "expiry": null};

          var updateUrls = function() {
            $scope.storeAccountUrl = STORE_URL + ACCOUNT_PATH
                              .replace("companyId", $scope.companyId);

            $scope.storeUrl = STORE_URL + IN_RVA_PATH
                .replace("productId", $scope.productId)
                .replace("companyId", $scope.companyId);
          };
          
          $scope.$watch("companyId", function() {
            checkSubscriptionStatus();
            
            updateUrls();
          });

          $rootScope.$on("refreshSubscriptionStatus", function(event, data) {
            // Only refresh if currentStatus code matches the provided value, or value is null
            if(data === null || $scope.subscriptionStatus.statusCode === data) {
              checkSubscriptionStatus();
            }
          });

          function checkSubscriptionStatus() {
            if ($scope.productCode && $scope.productId && $scope.companyId) {
              subscriptionStatusService.get($scope.productCode, $scope.companyId).then(function(subscriptionStatus) {
                if (subscriptionStatus) {
                  if(!$scope.subscriptionStatus || $scope.subscriptionStatus.status !== subscriptionStatus.status) {
                    $rootScope.$emit("subscription-status:changed", subscriptionStatus);
                  }
                  
                  $scope.subscriptionStatus = subscriptionStatus;
                }
              },
              function () {
                // TODO: catch error here
              });
            }
          }

          if (ctrl) {
            $scope.$watch("subscriptionStatus", function(subscriptionStatus) {
              ctrl.$setViewValue(subscriptionStatus);
            });
          }
        }
      };
    }])
    .filter("to_trusted", ["$sce", function($sce) {
      return function(text) {
        return $sce.trustAsHtml(text);
      };
    }]);
}());

"use strict";

angular.module("risevision.widget.common.subscription-status")
  .filter("productTrialDaysToExpiry", ["$interpolate", "$translate", function($interpolate, $translate) {
    var expiresToday = null;
    var expiresIn = null;

    $translate(["subscription-status.expires-today", "subscription-status.expires-in"],
        { days: "{{days}}" }).then(function(values) {
      expiresToday = $interpolate(values["subscription-status.expires-today"]);
      expiresIn = $interpolate(values["subscription-status.expires-in"]);
    });

    return function(subscriptionExpiry) {
      var msg = "";
      try {
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var timeInMs = new Date(subscriptionExpiry).getTime() - new Date().getTime();
        var days = Math.floor(timeInMs/oneDay);
        var params = { days: days };

        if (days === 0) {
          msg = expiresToday !== null ? expiresToday(params) : "";
        }
        else if (days > 0) {
          msg = expiresIn !== null ? expiresIn(params) : "";
        }
        else {
          msg = expiresToday !== null ? expiresToday(params) : "";
        }
      } catch (e) {
        msg = expiresToday !== null ? expiresToday(params) : "";
      }

      return msg;
    };
  }]);

(function () {
  "use strict";

  angular.module("risevision.widget.common.subscription-status.service",
    ["risevision.common.config",
     "risevision.widget.common.subscription-status.config"])
    .service("subscriptionStatusService", ["$http", "$q", "STORE_SERVER_URL", 
    "PATH_URL", "AUTH_PATH_URL",
    function ($http, $q, STORE_SERVER_URL, PATH_URL, AUTH_PATH_URL) {
      var responseType = ["On Trial", "Trial Expired", "Subscribed", "Suspended", "Cancelled", "Free", "Not Subscribed", "Product Not Found", "Company Not Found", "Error"];
      var responseCode = ["on-trial", "trial-expired", "subscribed", "suspended", "cancelled", "free", "not-subscribed", "product-not-found", "company-not-found", "error"];
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;

      // a and b are javascript Date objects
      function dateDiffInDays(a, b) {
        return Math.floor((b.getTime() - a.getTime()) / _MS_PER_DAY);
      }
      
      var checkAuthorizedStatus = function(productCode, companyId) {
        var deferred = $q.defer();

        var url = STORE_SERVER_URL +
          AUTH_PATH_URL.replace("companyId", companyId) +
          productCode;

        $http.get(url).then(function (response) {
          if (response && response.data) {
            deferred.resolve(response.data.authorized);
          }
          else {
            deferred.resolve(false);
          }
        });

        return deferred.promise;
      };
      
      var checkSubscriptionStatus = function(productCode, companyId) {
        var deferred = $q.defer();

        var url = STORE_SERVER_URL +
          PATH_URL.replace("companyId", companyId) +
          productCode;

        $http.get(url).then(function (response) {
          if (response && response.data && response.data.length) {
            var subscriptionStatus = response.data[0];

            subscriptionStatus.plural = "";

            var statusIndex = responseType.indexOf(subscriptionStatus.status);
            
            if(statusIndex >= 0) {
              subscriptionStatus.statusCode = responseCode[statusIndex];
            }
            
            if (subscriptionStatus.status === "") {
              subscriptionStatus.status = "N/A";
              subscriptionStatus.statusCode = "na";
              subscriptionStatus.subscribed = false;
            }
            else if (subscriptionStatus.status === responseType[0] ||
              subscriptionStatus.status === responseType[2] ||
              subscriptionStatus.status === responseType[5]) {
              subscriptionStatus.subscribed = true;
            }
            else {
              subscriptionStatus.subscribed = false;
            }

            if(subscriptionStatus.statusCode === "not-subscribed" && 
              subscriptionStatus.trialPeriod && subscriptionStatus.trialPeriod > 0) {
              subscriptionStatus.statusCode = "trial-available";
              subscriptionStatus.subscribed = true;
            }

            if(subscriptionStatus.expiry && subscriptionStatus.statusCode === "on-trial") {
              subscriptionStatus.expiry = new Date(subscriptionStatus.expiry);

              if(subscriptionStatus.expiry instanceof Date && !isNaN(subscriptionStatus.expiry.valueOf())) {
                subscriptionStatus.expiry = dateDiffInDays(new Date(), subscriptionStatus.expiry);
              }

              if(subscriptionStatus.expiry === 0) {
                subscriptionStatus.plural = "-zero";
              }
              else if(subscriptionStatus.expiry > 1) {
                subscriptionStatus.plural = "-many";
              }
            }
            deferred.resolve(subscriptionStatus);
          }
          else {
            deferred.reject("No response");
          }
        });
        
        return deferred.promise;
      };

      this.get = function (productCode, companyId) {
        return checkSubscriptionStatus(productCode, companyId)
          .then(function(subscriptionStatus) {
            if (subscriptionStatus.subscribed === false) {
              // double check store authorization in case they're authorized
              return checkAuthorizedStatus(productCode, companyId)
                .then(function(authorized) {
                  subscriptionStatus.subscribed = authorized;

                  return subscriptionStatus;
                });
            }
            else {
              return subscriptionStatus;
            }
        });
      };

    }]);
}());

(function(module) {
try { module = angular.module("risevision.widget.common.subscription-status"); }
catch(err) { module = angular.module("risevision.widget.common.subscription-status", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app-subscription-status-template.html",
    "<a id=\"app-subscription-status\" href=\"\"\n" +
    "  ng-click=\"showStoreModal = true\" class=\"store-link\">\n" +
    "    <div class=\"rate\">\n" +
    "      <strong>${{productPrice}}</strong>\n" +
    "    </div>\n" +
    "    <div class=\"subscribe\">\n" +
    "      <strong ng-if=\"!subscriptionStatus.subscribed\"><span translate=\"subscription-status.get-subscription\"></span></strong>\n" +
    "      <strong ng-if=\"subscriptionStatus.subscribed\"><span translate=\"subscription-status.continue-to-app\"></span></strong>\n" +
    "    </div>\n" +
    "</a>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("risevision.widget.common.subscription-status"); }
catch(err) { module = angular.module("risevision.widget.common.subscription-status", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("subscription-status-template.html",
    "<div ng-show=\"!expandedFormat\">\n" +
    "  <h3 ng-disable-right-click>\n" +
    "    <span ng-show=\"subscriptionStatus.statusCode !== 'not-subscribed'\" ng-bind-html=\"'subscription-status.' + subscriptionStatus.statusCode + subscriptionStatus.plural | translate:subscriptionStatus | to_trusted\"></span>\n" +
    "  </h3>\n" +
    "  \n" +
    "  <span ng-show=\"subscriptionStatus.statusCode === 'trial-available'\">\n" +
    "    <button class=\"btn btn-primary btn-xs\" ng-click=\"showStoreModal = true;\">\n" +
    "      <span translate=\"subscription-status.start-trial\"></span>\n" +
    "    </button>\n" +
    "  </span>\n" +
    "  <span ng-show=\"['on-trial', 'trial-expired', 'cancelled', 'not-subscribed'].indexOf(subscriptionStatus.statusCode) >= 0\">\n" +
    "    <a class=\"btn btn-primary btn-xs\" ng-href=\"{{storeUrl}}\" target=\"_blank\">\n" +
    "      <span translate=\"subscription-status.subscribe\"></span>\n" +
    "    </a>\n" +
    "  </span>\n" +
    "  <span ng-show=\"['suspended'].indexOf(subscriptionStatus.statusCode) >= 0\">\n" +
    "    <a type=\"button\" class=\"btn btn-primary btn-xs\" ng-href=\"{{storeAccountUrl}}\" target=\"_blank\">\n" +
    "      <span translate=\"subscription-status.view-account\"></span>\n" +
    "    </a>\n" +
    "  </span>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"expandedFormat\">\n" +
    "  <div class=\"subscription-status trial\" ng-show=\"subscriptionStatus.statusCode === 'on-trial'\">\n" +
    "    <span ng-bind-html=\"'subscription-status.expanded-' + subscriptionStatus.statusCode + subscriptionStatus.plural | translate:subscriptionStatus | to_trusted\"></span>\n" +
    "    <a type=\"button\" class=\"btn btn-primary u_margin-left\" ng-href=\"{{storeUrl}}\" target=\"_blank\">\n" +
    "      <span translate=\"subscription-status.subscribe-now\"></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <div class=\"subscription-status expired\" ng-show=\"subscriptionStatus.statusCode === 'trial-expired'\">\n" +
    "    <span translate=\"subscription-status.expanded-expired\"></span>\n" +
    "    <a type=\"button\" class=\"btn btn-primary u_margin-left\" ng-href=\"{{storeUrl}}\" target=\"_blank\">\n" +
    "      <span translate=\"subscription-status.subscribe-now\"></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <div class=\"subscription-status cancelled\" ng-show=\"subscriptionStatus.statusCode === 'cancelled'\">\n" +
    "   <span translate=\"subscription-status.expanded-cancelled\"></span>\n" +
    "    <a type=\"button\" class=\"btn btn-primary u_margin-left\" ng-href=\"{{storeUrl}}\" target=\"_blank\">\n" +
    "      <span translate=\"subscription-status.subscribe-now\"></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <div class=\"subscription-status suspended\" ng-show=\"subscriptionStatus.statusCode === 'suspended'\">\n" +
    "    <span translate=\"subscription-status.expanded-suspended\"></span>\n" +
    "    <a type=\"button\" class=\"btn btn-primary u_margin-left\" ng-href=\"{{storeAccountUrl}}\" target=\"_blank\">\n" +
    "      <span translate=\"subscription-status.view-invoices\"></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();


angular.module("risevision.widget.common", []);

angular.module("risevision.widget.common")
  .controller("settingsController", ["$scope", "settingsSaver", "settingsGetter", "settingsCloser",
    function ($scope, settingsSaver, settingsGetter, settingsCloser) {

    $scope.settings = { params: {}, additionalParams: {}};
    $scope.alerts = [];

    $scope.getAdditionalParam = function (name, defaultVal) {
      var val = $scope.settings.additionalParams[name];
      if(angular.isUndefined(val)) {
        return defaultVal;
      }
      else {
        return val;
      }
    };

    $scope.setAdditionalParam = function (name, val) {
      $scope.settings.additionalParams[name] = val;
    };

    $scope.loadAdditionalParams = function () {
      settingsGetter.getAdditionalParams().then(function (additionalParams) {
        $scope.settings.additionalParams = additionalParams;
        $scope.$broadcast("loadAdditionalParams", additionalParams);
      },
      function (err) {alert (err); });
    };

    $scope.setAdditionalParams = function (name, val) {
      $scope.settings.additionalParams[name] = val;
    };

    $scope.saveSettings = function () {
      //clear out previous alerts, if any
      $scope.alerts = [];

      $scope.$broadcast("collectAdditionalParams");

      settingsSaver.saveSettings($scope.settings).then(function () {
        //TODO: perhaps show some indicator in UI?
      }, function (err) {
        $scope.alerts = err.alerts;
      });

    };

    $scope.closeSettings = function() {
      settingsCloser.closeSettings().then(function () {
        //TODO:
      }, function (err) {
        $scope.alerts = err.alerts;
      });

    };

    $scope.settings.params = settingsGetter.getParams();
    $scope.loadAdditionalParams();
  }])

  .directive("scrollOnAlerts", function() {
    return {
      restrict: "A", //restricts to attributes
      scope: false,
      link: function($scope, $elm) {
        $scope.$watchCollection("alerts", function (newAlerts, oldAlerts) {
          if(newAlerts.length > 0 && oldAlerts.length === 0) {
            $("body").animate({scrollTop: $elm.offset().top}, "fast");
          }
        });
      }
    };
});

angular.module("risevision.widget.common")
  .constant("STORAGE_FILE_URL_BASE", "storage.googleapis.com/risemedialibrary-")
  .constant("STORAGE_FOLDER_URL_BASE", "googleapis.com/storage/")
  .factory("commonSettings", ["$log", "STORAGE_FILE_URL_BASE", "STORAGE_FOLDER_URL_BASE",
    function ($log, STORAGE_FILE_URL_BASE, STORAGE_FOLDER_URL_BASE) {

    var factory = {
      getStorageUrlData: function (url) {
        var storage = {},
          str, arr, params, pair;

        function getStorageType(storageUrl) {
          if (storageUrl.indexOf(STORAGE_FILE_URL_BASE) !== -1) {
            return "file";
          }

          if (storageUrl.indexOf(STORAGE_FOLDER_URL_BASE) !== -1) {
            return "folder";
          }

          return null;
        }

        function getCompanyId(storageUrl) {
          var p = storageUrl.split("risemedialibrary-");

          return p[1].slice(0, p[1].indexOf("/"));
        }

        if (getStorageType(url) === "file") {
          str = url.split(STORAGE_FILE_URL_BASE)[1];
          str = decodeURIComponent(str.slice(str.indexOf("/") + 1));
          arr = str.split("/");

          storage.companyId = getCompanyId(url);
          storage.fileName = arr.pop();
          storage.folder = arr.length > 0 ? arr.join("/") : "";

          if (storage.folder !== "") {
            // add ending "/" to the folder path
            storage.folder += "/";
          }
        }
        else if (getStorageType(url) === "folder") {
          params = url.split("?");

          for (var i = 0; i < params.length; i++) {
            pair = params[i].split("=");

            if (pair[0] === "prefix" && typeof pair[1] !== "undefined" && pair[1] !== "") {
              storage.companyId = getCompanyId(url);
              storage.folder = decodeURIComponent(pair[1]);
              storage.fileName = "";
              break;
            }
          }
        }

        return storage;
      }
    };

    return factory;
  }]);

angular.module("risevision.widget.common")
  .factory("gadgetsApi", ["$window", function ($window) {
    return $window.gadgets;
  }]);

angular.module("risevision.widget.common")
  .factory("googleFontLoader", ["$http", "angularLoad", function ($http, angularLoad) {

    var factory = {},
      allFonts = [];

    factory.getGoogleFonts = function() {
      if (allFonts.length === 0) {
        // Get list of Google fonts sorted alphabetically.
        return $http.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBXxVK_IOV7LNQMuVVo_l7ZvN53ejN86zY&sort=alpha", { cache: true })
          .then(function(resp) {
            var item = null;

            if (resp.data && resp.data.items) {
              for (var i = 0, length = resp.data.items.length; i < length; i++) {
                item = resp.data.items[i];

                // Don't return those fonts that have a subset of "khmer".
                if (item.subsets && (item.subsets.length === 1) &&
                  (item.subsets[0].toLowerCase() === "khmer")) {
                    continue;
                }

                allFonts.push(item.family);
              }

              return loadFonts();
            }
          });
      }
      else {
        return loadFonts();
      }
    };

    /* Filter list of fonts to only return those that are Google fonts. */
    factory.getFontsUsed = function(familyList) {
      var fontsUsed = [];

      angular.forEach(allFonts, function (family) {
        if (familyList.indexOf(family) !== -1) {
          fontsUsed.push(family);
        }
      });

      return fontsUsed;
    };

    /* Load the Google fonts. */
    function loadFonts() {
      var family = "",
        fonts = "",
        url = "",
        urls = [],
        spaces = false,
        fallback = ",sans-serif;",
        fontBaseUrl = "//fonts.googleapis.com/css?family=",
        exclude = ["Buda", "Coda Caption", "Open Sans Condensed", "UnifrakturCook", "Molle"];

      for (var i = 0; i < allFonts.length; i++) {
        family = allFonts[i];

        if (exclude.indexOf(family) === -1) {
          url = fontBaseUrl + family;

          angularLoad.loadCSS(url);
          urls.push(url);

          // check for spaces in family name
          if (/\s/.test(family)) {
            spaces = true;
          }

          if (spaces) {
            // wrap family name in single quotes
            fonts += family + "='" + family + "'" + fallback;
          }
          else {
            fonts += family + "=" + family + fallback;
          }
        }
      }

      return { fonts: fonts, urls: urls };
    }

    return factory;
  }]);

angular.module("risevision.widget.common")
  .service("i18nLoader", ["$window", "$q", function ($window, $q) {
    var deferred = $q.defer();

    $window.i18n.init({ 
      fallbackLng: "en",
      resGetPath: "locales/__ns_____lng__.json"
    }, function () {
      deferred.resolve($window.i18n);
    });

    this.get = function () {
      return deferred.promise;
    };
  }]);

angular.module("risevision.widget.common")
  .factory("imageValidator", ["$q", function ($q) {
    var factory = {
      // Verify that URL is a valid image file.
      isImage: function(src) {
        var deferred = $q.defer(),
          image = new Image();

        image.onload = function() {
          deferred.resolve(true);
        };

        image.onerror = function() {
          deferred.resolve(false);
        };

        image.src = src;

        return deferred.promise;
      }
    };

    return factory;
  }]);

angular.module("risevision.widget.common")
  .service("settingsSaver", ["$q", "$log", "gadgetsApi", "settingsParser",
  function ($q, $log, gadgetsApi, settingsParser) {

    this.saveSettings = function (settings, validator) {
      var deferred = $q.defer();
      var alerts = [], str = "";

      settings = processSettings(settings);

      if (validator) {
        alerts = validator(settings);
      }

      if(alerts.length > 0) {
        $log.debug("Validation failed.", alerts);
        deferred.reject({alerts: alerts});
      }

      if (settings.params.hasOwnProperty("layoutURL")) {
        // ensure the url is the start of the string
        str += settings.params.layoutURL + "?";
        // delete this property so its not included below in encodeParams call
        delete settings.params.layoutURL;
      }

      str += settingsParser.encodeParams(settings.params);

      var additionalParamsStr =
        settingsParser.encodeAdditionalParams(settings.additionalParams);

      gadgetsApi.rpc.call("", "rscmd_saveSettings", function (result) {
        $log.debug("encoded settings", JSON.stringify(result));
        $log.debug("Settings saved. ", settings);

        deferred.resolve(result);
      }, {
        params: str,
        additionalParams: additionalParamsStr
      });

      return deferred.promise;
    };

    function processSettings(settings) {
      var newSettings = angular.copy(settings);

      delete newSettings.params.id;
      delete newSettings.params.companyId;
      delete newSettings.params.rsW;
      delete newSettings.params.rsH;

      return newSettings;
    }

  }])

  .service("settingsGetter", ["$q", "gadgetsApi", "$log", "settingsParser", "$window", "defaultSettings",
    function ($q, gadgetsApi, $log, settingsParser, $window, defaultSettings) {

      this.getAdditionalParams = function () {
        var deferred = $q.defer();
        var defaultAdditionalParams = defaultSettings.additionalParams || {};

        gadgetsApi.rpc.call("", "rscmd_getAdditionalParams", function (result) {
          if (result) {
            result = settingsParser.parseAdditionalParams(result);
          }
          else {
            result = {};
          }

          $log.debug("getAdditionalParams returns ", result);
          deferred.resolve($.extend(true, defaultAdditionalParams, result));
        });

        return deferred.promise;
      };

      this.getParams = function () {
        var defaultParams = defaultSettings.params || {};
        return angular.extend(defaultParams,
          settingsParser.parseParams($window.location.search));
      };
  }])

  .service("settingsParser", [function () {
    this.parseAdditionalParams = function (additionalParamsStr) {
      if(additionalParamsStr) {
        return JSON.parse(additionalParamsStr);
      }
      else {
        return {};
      }
    };

    this.encodeAdditionalParams = function (additionalParams) {
      return JSON.stringify(additionalParams);
    };

    this.encodeParams = function (params) {
      var str = [];
      for(var p in params) {
        if (params.hasOwnProperty(p)) {
          var value;
          if (typeof params[p] === "object") {
            value = JSON.stringify(params[p]);
          }
          else {
            value = params[p];
          }
          str.push("up_" + encodeURIComponent(p) + "=" + encodeURIComponent(value));
        }
      }

      return str.join("&");
    };

    function stripPrefix(name) {
      if(name.indexOf("up_") === 0) {
        return name.slice(3);
      }
      else {
        return null;
      }
    }

    this.parseParams = function (paramsStr) {
      //get rid of preceeding "?"
      if(paramsStr[0] === "?") {
        paramsStr = paramsStr.slice(1);
      }
      var result = {};
      var vars = paramsStr.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var name = stripPrefix(decodeURIComponent(pair[0]));
        //save settings only if it has up_ prefix. Ignore otherwise
        if (name) {
          try {
            result[name] = JSON.parse(decodeURIComponent(pair[1]));
          }
          catch (e) {
            result[name] = decodeURIComponent(pair[1]);
          }
        }
      }
      return result;
    };

  }])

  .service("settingsCloser", ["$q", "$log", "gadgetsApi",
  function ($q, $log, gadgetsApi) {

    this.closeSettings = function () {
      var deferred = $q.defer();

      gadgetsApi.rpc.call("", "rscmd_closeSettings", function () {
        deferred.resolve(true);
      });

      return deferred.promise;
    };

  }])

  .value("defaultSettings", {});

(function (angular) {
  "use strict";

  angular.module("risevision.widget.common.visualization", [])
    .factory("visualizationApi", ["$q", "$window", function ($q, $window) {
      var deferred = $q.defer();
      var promise;

      var factory = {
        get: function () {
          if (!promise) {
            promise = deferred.promise;
            if (!$window.google.visualization) {
              $window.google.setOnLoadCallback(function () {
                deferred.resolve($window.google.visualization);
              });
            }
            else {
              deferred.resolve($window.google.visualization);
            }
          }
          return promise;
        }
      };
      return factory;

    }]);

})(angular);

/*!
 * angular-translate - v2.13.1 - 2016-12-06
 * 
 * Copyright (c) 2016 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

/**
 * @ngdoc overview
 * @name pascalprecht.translate
 *
 * @description
 * The main module which holds everything together.
 */
runTranslate.$inject = ['$translate'];
$translate.$inject = ['$STORAGE_KEY', '$windowProvider', '$translateSanitizationProvider', 'pascalprechtTranslateOverrider'];
$translateDefaultInterpolation.$inject = ['$interpolate', '$translateSanitization'];
translateDirective.$inject = ['$translate', '$interpolate', '$compile', '$parse', '$rootScope'];
translateAttrDirective.$inject = ['$translate', '$rootScope'];
translateCloakDirective.$inject = ['$translate', '$rootScope'];
translateFilterFactory.$inject = ['$parse', '$translate'];
$translationCache.$inject = ['$cacheFactory'];
angular.module('pascalprecht.translate', ['ng'])
  .run(runTranslate);

function runTranslate($translate) {

  'use strict';

  var key = $translate.storageKey(),
    storage = $translate.storage();

  var fallbackFromIncorrectStorageValue = function () {
    var preferred = $translate.preferredLanguage();
    if (angular.isString(preferred)) {
      $translate.use(preferred);
      // $translate.use() will also remember the language.
      // So, we don't need to call storage.put() here.
    } else {
      storage.put(key, $translate.use());
    }
  };

  fallbackFromIncorrectStorageValue.displayName = 'fallbackFromIncorrectStorageValue';

  if (storage) {
    if (!storage.get(key)) {
      fallbackFromIncorrectStorageValue();
    } else {
      $translate.use(storage.get(key))['catch'](fallbackFromIncorrectStorageValue);
    }
  } else if (angular.isString($translate.preferredLanguage())) {
    $translate.use($translate.preferredLanguage());
  }
}

runTranslate.displayName = 'runTranslate';

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateSanitizationProvider
 *
 * @description
 *
 * Configurations for $translateSanitization
 */
angular.module('pascalprecht.translate').provider('$translateSanitization', $translateSanitizationProvider);

function $translateSanitizationProvider () {

  'use strict';

  var $sanitize,
      $sce,
      currentStrategy = null, // TODO change to either 'sanitize', 'escape' or ['sanitize', 'escapeParameters'] in 3.0.
      hasConfiguredStrategy = false,
      hasShownNoStrategyConfiguredWarning = false,
      strategies;

  /**
   * Definition of a sanitization strategy function
   * @callback StrategyFunction
   * @param {string|object} value - value to be sanitized (either a string or an interpolated value map)
   * @param {string} mode - either 'text' for a string (translation) or 'params' for the interpolated params
   * @return {string|object}
   */

  /**
   * @ngdoc property
   * @name strategies
   * @propertyOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Following strategies are built-in:
   * <dl>
   *   <dt>sanitize</dt>
   *   <dd>Sanitizes HTML in the translation text using $sanitize</dd>
   *   <dt>escape</dt>
   *   <dd>Escapes HTML in the translation</dd>
   *   <dt>sanitizeParameters</dt>
   *   <dd>Sanitizes HTML in the values of the interpolation parameters using $sanitize</dd>
   *   <dt>escapeParameters</dt>
   *   <dd>Escapes HTML in the values of the interpolation parameters</dd>
   *   <dt>escaped</dt>
   *   <dd>Support legacy strategy name 'escaped' for backwards compatibility (will be removed in 3.0)</dd>
   * </dl>
   *
   */

  strategies = {
    sanitize: function (value, mode/*, context*/) {
      if (mode === 'text') {
        value = htmlSanitizeValue(value);
      }
      return value;
    },
    escape: function (value, mode/*, context*/) {
      if (mode === 'text') {
        value = htmlEscapeValue(value);
      }
      return value;
    },
    sanitizeParameters: function (value, mode/*, context*/) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlSanitizeValue);
      }
      return value;
    },
    escapeParameters: function (value, mode/*, context*/) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlEscapeValue);
      }
      return value;
    },
    sce: function (value, mode, context) {
      if (mode === 'text') {
        value = htmlTrustValue(value);
      } else if (mode === 'params') {
        if (context !== 'filter') {
          // do html escape in filter context #1101
          value = mapInterpolationParameters(value, htmlEscapeValue);
        }
      }
      return value;
    },
    sceParameters: function (value, mode/*, context*/) {
      if (mode === 'params') {
        value = mapInterpolationParameters(value, htmlTrustValue);
      }
      return value;
    }
  };
  // Support legacy strategy name 'escaped' for backwards compatibility.
  // TODO should be removed in 3.0
  strategies.escaped = strategies.escapeParameters;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#addStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Adds a sanitization strategy to the list of known strategies.
   *
   * @param {string} strategyName - unique key for a strategy
   * @param {StrategyFunction} strategyFunction - strategy function
   * @returns {object} this
   */
  this.addStrategy = function (strategyName, strategyFunction) {
    strategies[strategyName] = strategyFunction;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#removeStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Removes a sanitization strategy from the list of known strategies.
   *
   * @param {string} strategyName - unique key for a strategy
   * @returns {object} this
   */
  this.removeStrategy = function (strategyName) {
    delete strategies[strategyName];
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateSanitizationProvider#useStrategy
   * @methodOf pascalprecht.translate.$translateSanitizationProvider
   *
   * @description
   * Selects a sanitization strategy. When an array is provided the strategies will be executed in order.
   *
   * @param {string|StrategyFunction|array} strategy The sanitization strategy / strategies which should be used. Either a name of an existing strategy, a custom strategy function, or an array consisting of multiple names and / or custom functions.
   * @returns {object} this
   */
  this.useStrategy = function (strategy) {
    hasConfiguredStrategy = true;
    currentStrategy = strategy;
    return this;
  };

  /**
   * @ngdoc object
   * @name pascalprecht.translate.$translateSanitization
   * @requires $injector
   * @requires $log
   *
   * @description
   * Sanitizes interpolation parameters and translated texts.
   *
   */
  this.$get = ['$injector', '$log', function ($injector, $log) {

    var cachedStrategyMap = {};

    var applyStrategies = function (value, mode, context, selectedStrategies) {
      angular.forEach(selectedStrategies, function (selectedStrategy) {
        if (angular.isFunction(selectedStrategy)) {
          value = selectedStrategy(value, mode, context);
        } else if (angular.isFunction(strategies[selectedStrategy])) {
          value = strategies[selectedStrategy](value, mode, context);
        } else if (angular.isString(strategies[selectedStrategy])) {
          if (!cachedStrategyMap[strategies[selectedStrategy]]) {
            try {
              cachedStrategyMap[strategies[selectedStrategy]] = $injector.get(strategies[selectedStrategy]);
            } catch (e) {
              cachedStrategyMap[strategies[selectedStrategy]] = function() {};
              throw new Error('pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: \'' + selectedStrategy + '\'');
            }
          }
          value = cachedStrategyMap[strategies[selectedStrategy]](value, mode, context);
        } else {
          throw new Error('pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: \'' + selectedStrategy + '\'');
        }
      });
      return value;
    };

    // TODO: should be removed in 3.0
    var showNoStrategyConfiguredWarning = function () {
      if (!hasConfiguredStrategy && !hasShownNoStrategyConfiguredWarning) {
        $log.warn('pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details.');
        hasShownNoStrategyConfiguredWarning = true;
      }
    };

    if ($injector.has('$sanitize')) {
      $sanitize = $injector.get('$sanitize');
    }
    if ($injector.has('$sce')) {
      $sce = $injector.get('$sce');
    }

    return {
      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translateSanitization#useStrategy
       * @methodOf pascalprecht.translate.$translateSanitization
       *
       * @description
       * Selects a sanitization strategy. When an array is provided the strategies will be executed in order.
       *
       * @param {string|StrategyFunction|array} strategy The sanitization strategy / strategies which should be used. Either a name of an existing strategy, a custom strategy function, or an array consisting of multiple names and / or custom functions.
       */
      useStrategy: (function (self) {
        return function (strategy) {
          self.useStrategy(strategy);
        };
      })(this),

      /**
       * @ngdoc function
       * @name pascalprecht.translate.$translateSanitization#sanitize
       * @methodOf pascalprecht.translate.$translateSanitization
       *
       * @description
       * Sanitizes a value.
       *
       * @param {string|object} value The value which should be sanitized.
       * @param {string} mode The current sanitization mode, either 'params' or 'text'.
       * @param {string|StrategyFunction|array} [strategy] Optional custom strategy which should be used instead of the currently selected strategy.
       * @param {string} [context] The context of this call: filter, service. Default is service
       * @returns {string|object} sanitized value
       */
      sanitize: function (value, mode, strategy, context) {
        if (!currentStrategy) {
          showNoStrategyConfiguredWarning();
        }

        if (!strategy && strategy !== null) {
          strategy = currentStrategy;
        }

        if (!strategy) {
          return value;
        }

        if (!context) {
          context = 'service';
        }

        var selectedStrategies = angular.isArray(strategy) ? strategy : [strategy];
        return applyStrategies(value, mode, context, selectedStrategies);
      }
    };
  }];

  var htmlEscapeValue = function (value) {
    var element = angular.element('<div></div>');
    element.text(value); // not chainable, see #1044
    return element.html();
  };

  var htmlSanitizeValue = function (value) {
    if (!$sanitize) {
      throw new Error('pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as \'escape\'.');
    }
    return $sanitize(value);
  };

  var htmlTrustValue = function (value) {
    if (!$sce) {
      throw new Error('pascalprecht.translate.$translateSanitization: Error cannot find $sce service.');
    }
    return $sce.trustAsHtml(value);
  };

  var mapInterpolationParameters = function (value, iteratee, stack) {
    if (angular.isDate(value)) {
      return value;
    } else if (angular.isObject(value)) {
      var result = angular.isArray(value) ? [] : {};

      if (!stack) {
        stack = [];
      } else {
        if (stack.indexOf(value) > -1) {
          throw new Error('pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object');
        }
      }

      stack.push(value);
      angular.forEach(value, function (propertyValue, propertyKey) {

        /* Skipping function properties. */
        if (angular.isFunction(propertyValue)) {
          return;
        }

        result[propertyKey] = mapInterpolationParameters(propertyValue, iteratee, stack);
      });
      stack.splice(-1, 1); // remove last

      return result;
    } else if (angular.isNumber(value)) {
      return value;
    } else {
      return iteratee(value);
    }
  };
}

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateProvider
 * @description
 *
 * $translateProvider allows developers to register translation-tables, asynchronous loaders
 * and similar to configure translation behavior directly inside of a module.
 *
 */
angular.module('pascalprecht.translate')
  .constant('pascalprechtTranslateOverrider', {})
  .provider('$translate', $translate);

function $translate($STORAGE_KEY, $windowProvider, $translateSanitizationProvider, pascalprechtTranslateOverrider) {

  'use strict';

  var $translationTable = {},
    $preferredLanguage,
    $availableLanguageKeys = [],
    $languageKeyAliases,
    $fallbackLanguage,
    $fallbackWasString,
    $uses,
    $nextLang,
    $storageFactory,
    $storageKey = $STORAGE_KEY,
    $storagePrefix,
    $missingTranslationHandlerFactory,
    $interpolationFactory,
    $interpolatorFactories = [],
    $loaderFactory,
    $cloakClassName = 'translate-cloak',
    $loaderOptions,
    $notFoundIndicatorLeft,
    $notFoundIndicatorRight,
    $postCompilingEnabled = false,
    $forceAsyncReloadEnabled = false,
    $nestedObjectDelimeter = '.',
    $isReady = false,
    $keepContent = false,
    loaderCache,
    directivePriority = 0,
    statefulFilter = true,
    postProcessFn,
    uniformLanguageTagResolver = 'default',
    languageTagResolver = {
      'default' : function (tag) {
        return (tag || '').split('-').join('_');
      },
      java : function (tag) {
        var temp = (tag || '').split('-').join('_');
        var parts = temp.split('_');
        return parts.length > 1 ? (parts[0].toLowerCase() + '_' + parts[1].toUpperCase()) : temp;
      },
      bcp47 : function (tag) {
        var temp = (tag || '').split('_').join('-');
        var parts = temp.split('-');
        return parts.length > 1 ? (parts[0].toLowerCase() + '-' + parts[1].toUpperCase()) : temp;
      },
      'iso639-1' : function (tag) {
        var temp = (tag || '').split('_').join('-');
        var parts = temp.split('-');
        return parts[0].toLowerCase();
      }
    };

  var version = '2.13.1';

  // tries to determine the browsers language
  var getFirstBrowserLanguage = function () {

    // internal purpose only
    if (angular.isFunction(pascalprechtTranslateOverrider.getLocale)) {
      return pascalprechtTranslateOverrider.getLocale();
    }

    var nav = $windowProvider.$get().navigator,
      browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
      i,
      language;

    // support for HTML 5.1 "navigator.languages"
    if (angular.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }

    return null;
  };
  getFirstBrowserLanguage.displayName = 'angular-translate/service: getFirstBrowserLanguage';

  // tries to determine the browsers locale
  var getLocale = function () {
    var locale = getFirstBrowserLanguage() || '';
    if (languageTagResolver[uniformLanguageTagResolver]) {
      locale = languageTagResolver[uniformLanguageTagResolver](locale);
    }
    return locale;
  };
  getLocale.displayName = 'angular-translate/service: getLocale';

  /**
   * @name indexOf
   * @private
   *
   * @description
   * indexOf polyfill. Kinda sorta.
   *
   * @param {array} array Array to search in.
   * @param {string} searchElement Element to search for.
   *
   * @returns {int} Index of search element.
   */
  var indexOf = function (array, searchElement) {
    for (var i = 0, len = array.length; i < len; i++) {
      if (array[i] === searchElement) {
        return i;
      }
    }
    return -1;
  };

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string} The string stripped of whitespace from both ends
   */
  var trim = function () {
    return this.toString().replace(/^\s+|\s+$/g, '');
  };

  var negotiateLocale = function (preferred) {
    if (!preferred) {
      return;
    }

    var avail = [],
      locale = angular.lowercase(preferred),
      i = 0,
      n = $availableLanguageKeys.length;

    for (; i < n; i++) {
      avail.push(angular.lowercase($availableLanguageKeys[i]));
    }

    // Check for an exact match in our list of available keys
    if (indexOf(avail, locale) > -1) {
      return preferred;
    }

    if ($languageKeyAliases) {
      var alias;
      for (var langKeyAlias in $languageKeyAliases) {
        if ($languageKeyAliases.hasOwnProperty(langKeyAlias)) {
          var hasWildcardKey = false;
          var hasExactKey = Object.prototype.hasOwnProperty.call($languageKeyAliases, langKeyAlias) &&
            angular.lowercase(langKeyAlias) === angular.lowercase(preferred);

          if (langKeyAlias.slice(-1) === '*') {
            hasWildcardKey = langKeyAlias.slice(0, -1) === preferred.slice(0, langKeyAlias.length - 1);
          }
          if (hasExactKey || hasWildcardKey) {
            alias = $languageKeyAliases[langKeyAlias];
            if (indexOf(avail, angular.lowercase(alias)) > -1) {
              return alias;
            }
          }
        }
      }
    }

    // Check for a language code without region
    var parts = preferred.split('_');

    if (parts.length > 1 && indexOf(avail, angular.lowercase(parts[0])) > -1) {
      return parts[0];
    }

    // If everything fails, return undefined.
    return;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translations
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a new translation table for specific language key.
   *
   * To register a translation table for specific language, pass a defined language
   * key as first parameter.
   *
   * <pre>
   *  // register translation table for language: 'de_DE'
   *  $translateProvider.translations('de_DE', {
   *    'GREETING': 'Hallo Welt!'
   *  });
   *
   *  // register another one
   *  $translateProvider.translations('en_US', {
   *    'GREETING': 'Hello world!'
   *  });
   * </pre>
   *
   * When registering multiple translation tables for for the same language key,
   * the actual translation table gets extended. This allows you to define module
   * specific translation which only get added, once a specific module is loaded in
   * your app.
   *
   * Invoking this method with no arguments returns the translation table which was
   * registered with no language key. Invoking it with a language key returns the
   * related translation table.
   *
   * @param {string} langKey A language key.
   * @param {object} translationTable A plain old JavaScript object that represents a translation table.
   *
   */
  var translations = function (langKey, translationTable) {

    if (!langKey && !translationTable) {
      return $translationTable;
    }

    if (langKey && !translationTable) {
      if (angular.isString(langKey)) {
        return $translationTable[langKey];
      }
    } else {
      if (!angular.isObject($translationTable[langKey])) {
        $translationTable[langKey] = {};
      }
      angular.extend($translationTable[langKey], flatObject(translationTable));
    }
    return this;
  };

  this.translations = translations;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#cloakClassName
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the class name for `translate-cloak` directive.
   * Default class name is `translate-cloak`.
   *
   * @param {string} name translate-cloak class name
   */
  this.cloakClassName = function (name) {
    if (!name) {
      return $cloakClassName;
    }
    $cloakClassName = name;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#nestedObjectDelimeter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the delimiter for namespaced translations.
   * Default delimiter is `.`.
   *
   * @param {string} delimiter namespace separator
   */
  this.nestedObjectDelimeter = function (delimiter) {
    if (!delimiter) {
      return $nestedObjectDelimeter;
    }
    $nestedObjectDelimeter = delimiter;
    return this;
  };

  /**
   * @name flatObject
   * @private
   *
   * @description
   * Flats an object. This function is used to flatten given translation data with
   * namespaces, so they are later accessible via dot notation.
   */
  var flatObject = function (data, path, result, prevKey) {
    var key, keyWithPath, keyWithShortPath, val;

    if (!path) {
      path = [];
    }
    if (!result) {
      result = {};
    }
    for (key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        continue;
      }
      val = data[key];
      if (angular.isObject(val)) {
        flatObject(val, path.concat(key), result, key);
      } else {
        keyWithPath = path.length ? ('' + path.join($nestedObjectDelimeter) + $nestedObjectDelimeter + key) : key;
        if (path.length && key === prevKey) {
          // Create shortcut path (foo.bar == foo.bar.bar)
          keyWithShortPath = '' + path.join($nestedObjectDelimeter);
          // Link it to original path
          result[keyWithShortPath] = '@:' + keyWithPath;
        }
        result[keyWithPath] = val;
      }
    }
    return result;
  };
  flatObject.displayName = 'flatObject';

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#addInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Adds interpolation services to angular-translate, so it can manage them.
   *
   * @param {object} factory Interpolation service factory
   */
  this.addInterpolation = function (factory) {
    $interpolatorFactories.push(factory);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMessageFormatInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use interpolation functionality of messageformat.js.
   * This is useful when having high level pluralization and gender selection.
   */
  this.useMessageFormatInterpolation = function () {
    return this.useInterpolation('$translateMessageFormatInterpolation');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which interpolation style to use as default, application-wide.
   * Simply pass a factory/service name. The interpolation service has to implement
   * the correct interface.
   *
   * @param {string} factory Interpolation service name.
   */
  this.useInterpolation = function (factory) {
    $interpolationFactory = factory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useSanitizeStrategy
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Simply sets a sanitation strategy type.
   *
   * @param {string} value Strategy type.
   */
  this.useSanitizeValueStrategy = function (value) {
    $translateSanitizationProvider.useStrategy(value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#preferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use for translation
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **prefer**.
   *
   * @param {string} langKey A language key.
   */
  this.preferredLanguage = function (langKey) {
    if (langKey) {
      setupPreferredLanguage(langKey);
      return this;
    }
    return $preferredLanguage;
  };
  var setupPreferredLanguage = function (langKey) {
    if (langKey) {
      $preferredLanguage = langKey;
    }
    return $preferredLanguage;
  };
  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicator
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found. E.g. when
   * setting the indicator as 'X' and one tries to translate a translation id
   * called `NOT_FOUND`, this will result in `X NOT_FOUND X`.
   *
   * Internally this methods sets a left indicator and a right indicator using
   * `$translateProvider.translationNotFoundIndicatorLeft()` and
   * `$translateProvider.translationNotFoundIndicatorRight()`.
   *
   * **Note**: These methods automatically add a whitespace between the indicators
   * and the translation id.
   *
   * @param {string} indicator An indicator, could be any string.
   */
  this.translationNotFoundIndicator = function (indicator) {
    this.translationNotFoundIndicatorLeft(indicator);
    this.translationNotFoundIndicatorRight(indicator);
    return this;
  };

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found left to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
  this.translationNotFoundIndicatorLeft = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorLeft;
    }
    $notFoundIndicatorLeft = indicator;
    return this;
  };

  /**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found right to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
  this.translationNotFoundIndicatorRight = function (indicator) {
    if (!indicator) {
      return $notFoundIndicatorRight;
    }
    $notFoundIndicatorRight = indicator;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#fallbackLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use when missing translations
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **fallback**.
   *
   * @param {string||array} langKey A language key.
   *
   */
  this.fallbackLanguage = function (langKey) {
    fallbackStack(langKey);
    return this;
  };

  var fallbackStack = function (langKey) {
    if (langKey) {
      if (angular.isString(langKey)) {
        $fallbackWasString = true;
        $fallbackLanguage = [langKey];
      } else if (angular.isArray(langKey)) {
        $fallbackWasString = false;
        $fallbackLanguage = langKey;
      }
      if (angular.isString($preferredLanguage) && indexOf($fallbackLanguage, $preferredLanguage) < 0) {
        $fallbackLanguage.push($preferredLanguage);
      }

      return this;
    } else {
      if ($fallbackWasString) {
        return $fallbackLanguage[0];
      } else {
        return $fallbackLanguage;
      }
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#use
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Set which translation table to use for translation by given language key. When
   * trying to 'use' a language which isn't provided, it'll throw an error.
   *
   * You actually don't have to use this method since `$translateProvider#preferredLanguage`
   * does the job too.
   *
   * @param {string} langKey A language key.
   */
  this.use = function (langKey) {
    if (langKey) {
      if (!$translationTable[langKey] && (!$loaderFactory)) {
        // only throw an error, when not loading translation data asynchronously
        throw new Error('$translateProvider couldn\'t find translationTable for langKey: \'' + langKey + '\'');
      }
      $uses = langKey;
      return this;
    }
    return $uses;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#resolveClientLocale
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * This returns the current browser/client's language key. The result is processed with the configured uniform tag resolver.
   *
   * @returns {string} the current client/browser language key
   */
  this.resolveClientLocale = function () {
    return getLocale();
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storageKey
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which key must represent the choosed language by a user in the storage.
   *
   * @param {string} key A key for the storage.
   */
  var storageKey = function (key) {
    if (!key) {
      if ($storagePrefix) {
        return $storagePrefix + $storageKey;
      }
      return $storageKey;
    }
    $storageKey = key;
    return this;
  };

  this.storageKey = storageKey;

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useUrlLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateUrlLoader` extension service as loader.
   *
   * @param {string} url Url
   * @param {Object=} options Optional configuration object
   */
  this.useUrlLoader = function (url, options) {
    return this.useLoader('$translateUrlLoader', angular.extend({url : url}, options));
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStaticFilesLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateStaticFilesLoader` extension service as loader.
   *
   * @param {Object=} options Optional configuration object
   */
  this.useStaticFilesLoader = function (options) {
    return this.useLoader('$translateStaticFilesLoader', options);
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use any other service as loader.
   *
   * @param {string} loaderFactory Factory name to use
   * @param {Object=} options Optional configuration object
   */
  this.useLoader = function (loaderFactory, options) {
    $loaderFactory = loaderFactory;
    $loaderOptions = options || {};
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLocalStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateLocalStorage` service as storage layer.
   *
   */
  this.useLocalStorage = function () {
    return this.useStorage('$translateLocalStorage');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useCookieStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateCookieStorage` service as storage layer.
   */
  this.useCookieStorage = function () {
    return this.useStorage('$translateCookieStorage');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use custom service as storage layer.
   */
  this.useStorage = function (storageFactory) {
    $storageFactory = storageFactory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storagePrefix
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets prefix for storage key.
   *
   * @param {string} prefix Storage key prefix
   */
  this.storagePrefix = function (prefix) {
    if (!prefix) {
      return prefix;
    }
    $storagePrefix = prefix;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandlerLog
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use built-in log handler when trying to translate
   * a translation Id which doesn't exist.
   *
   * This is actually a shortcut method for `useMissingTranslationHandler()`.
   *
   */
  this.useMissingTranslationHandlerLog = function () {
    return this.useMissingTranslationHandler('$translateMissingTranslationHandlerLog');
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandler
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Expects a factory name which later gets instantiated with `$injector`.
   * This method can be used to tell angular-translate to use a custom
   * missingTranslationHandler. Just build a factory which returns a function
   * and expects a translation id as argument.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.useMissingTranslationHandler('customHandler');
   *  });
   *
   *  app.factory('customHandler', function (dep1, dep2) {
   *    return function (translationId) {
   *      // something with translationId and dep1 and dep2
   *    };
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
  this.useMissingTranslationHandler = function (factory) {
    $missingTranslationHandlerFactory = factory;
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#usePostCompiling
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If post compiling is enabled, all translated values will be processed
   * again with AngularJS' $compile.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.usePostCompiling(true);
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
  this.usePostCompiling = function (value) {
    $postCompilingEnabled = !(!value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#forceAsyncReload
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If force async reload is enabled, async loader will always be called
   * even if $translationTable already contains the language key, adding
   * possible new entries to the $translationTable.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.forceAsyncReload(true);
   *  });
   * </pre>
   *
   * @param {boolean} value - valid values are true or false
   */
  this.forceAsyncReload = function (value) {
    $forceAsyncReloadEnabled = !(!value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#uniformLanguageTag
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which language tag should be used as a result when determining
   * the current browser language.
   *
   * This setting must be set before invoking {@link pascalprecht.translate.$translateProvider#methods_determinePreferredLanguage determinePreferredLanguage()}.
   *
   * <pre>
   * $translateProvider
   *   .uniformLanguageTag('bcp47')
   *   .determinePreferredLanguage()
   * </pre>
   *
   * The resolver currently supports:
   * * default
   *     (traditionally: hyphens will be converted into underscores, i.e. en-US => en_US)
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_us
   * * java
   *     like default, but the second part will be always in uppercase
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_US
   * * BCP 47 (RFC 4646 & 4647)
   *     en-US => en-US
   *     en_US => en-US
   *     en-us => en-US
   *
   * See also:
   * * http://en.wikipedia.org/wiki/IETF_language_tag
   * * http://www.w3.org/International/core/langtags/
   * * http://tools.ietf.org/html/bcp47
   *
   * @param {string|object} options - options (or standard)
   * @param {string} options.standard - valid values are 'default', 'bcp47', 'java'
   */
  this.uniformLanguageTag = function (options) {

    if (!options) {
      options = {};
    } else if (angular.isString(options)) {
      options = {
        standard : options
      };
    }

    uniformLanguageTagResolver = options.standard;

    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#determinePreferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to try to determine on its own which language key
   * to set as preferred language. When `fn` is given, angular-translate uses it
   * to determine a language key, otherwise it uses the built-in `getLocale()`
   * method.
   *
   * The `getLocale()` returns a language key in the format `[lang]_[country]` or
   * `[lang]` depending on what the browser provides.
   *
   * Use this method at your own risk, since not all browsers return a valid
   * locale (see {@link pascalprecht.translate.$translateProvider#methods_uniformLanguageTag uniformLanguageTag()}).
   *
   * @param {Function=} fn Function to determine a browser's locale
   */
  this.determinePreferredLanguage = function (fn) {

    var locale = (fn && angular.isFunction(fn)) ? fn() : getLocale();

    if (!$availableLanguageKeys.length) {
      $preferredLanguage = locale;
    } else {
      $preferredLanguage = negotiateLocale(locale) || locale;
    }

    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#registerAvailableLanguageKeys
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a set of language keys the app will work with. Use this method in
   * combination with
   * {@link pascalprecht.translate.$translateProvider#determinePreferredLanguage determinePreferredLanguage}.
   * When available languages keys are registered, angular-translate
   * tries to find the best fitting language key depending on the browsers locale,
   * considering your language key convention.
   *
   * @param {object} languageKeys Array of language keys the your app will use
   * @param {object=} aliases Alias map.
   */
  this.registerAvailableLanguageKeys = function (languageKeys, aliases) {
    if (languageKeys) {
      $availableLanguageKeys = languageKeys;
      if (aliases) {
        $languageKeyAliases = aliases;
      }
      return this;
    }
    return $availableLanguageKeys;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoaderCache
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a cache for internal $http based loaders.
   * {@link pascalprecht.translate.$translationCache $translationCache}.
   * When false the cache will be disabled (default). When true or undefined
   * the cache will be a default (see $cacheFactory). When an object it will
   * be treat as a cache object itself: the usage is $http({cache: cache})
   *
   * @param {object} cache boolean, string or cache-object
   */
  this.useLoaderCache = function (cache) {
    if (cache === false) {
      // disable cache
      loaderCache = undefined;
    } else if (cache === true) {
      // enable cache using AJS defaults
      loaderCache = true;
    } else if (typeof(cache) === 'undefined') {
      // enable cache using default
      loaderCache = '$translationCache';
    } else if (cache) {
      // enable cache using given one (see $cacheFactory)
      loaderCache = cache;
    }
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#directivePriority
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets the default priority of the translate directive. The standard value is `0`.
   * Calling this function without an argument will return the current value.
   *
   * @param {number} priority for the translate-directive
   */
  this.directivePriority = function (priority) {
    if (priority === undefined) {
      // getter
      return directivePriority;
    } else {
      // setter with chaining
      directivePriority = priority;
      return this;
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#statefulFilter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Since AngularJS 1.3, filters which are not stateless (depending at the scope)
   * have to explicit define this behavior.
   * Sets whether the translate filter should be stateful or stateless. The standard value is `true`
   * meaning being stateful.
   * Calling this function without an argument will return the current value.
   *
   * @param {boolean} state - defines the state of the filter
   */
  this.statefulFilter = function (state) {
    if (state === undefined) {
      // getter
      return statefulFilter;
    } else {
      // setter with chaining
      statefulFilter = state;
      return this;
    }
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#postProcess
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * The post processor will be intercept right after the translation result. It can modify the result.
   *
   * @param {object} fn Function or service name (string) to be called after the translation value has been set / resolved. The function itself will enrich every value being processed and then continue the normal resolver process
   */
  this.postProcess = function (fn) {
    if (fn) {
      postProcessFn = fn;
    } else {
      postProcessFn = undefined;
    }
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#keepContent
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If keepContent is set to true than translate directive will always use innerHTML
   * as a default translation
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.keepContent(true);
   *  });
   * </pre>
   *
   * @param {boolean} value - valid values are true or false
   */
  this.keepContent = function (value) {
    $keepContent = !(!value);
    return this;
  };

  /**
   * @ngdoc object
   * @name pascalprecht.translate.$translate
   * @requires $interpolate
   * @requires $log
   * @requires $rootScope
   * @requires $q
   *
   * @description
   * The `$translate` service is the actual core of angular-translate. It expects a translation id
   * and optional interpolate parameters to translate contents.
   *
   * <pre>
   *  $translate('HEADLINE_TEXT').then(function (translation) {
   *    $scope.translatedText = translation;
   *  });
   * </pre>
   *
   * @param {string|array} translationId A token which represents a translation id
   *                                     This can be optionally an array of translation ids which
   *                                     results that the function returns an object where each key
   *                                     is the translation id and the value the translation.
   * @param {object=} interpolateParams An object hash for dynamic values
   * @param {string} interpolationId The id of the interpolation to use
   * @param {string} defaultTranslationText the optional default translation text that is written as
   *                                        as default text in case it is not found in any configured language
   * @param {string} forceLanguage A language to be used instead of the current language
   * @returns {object} promise
   */
  this.$get = ['$log', '$injector', '$rootScope', '$q', function ($log, $injector, $rootScope, $q) {

    var Storage,
      defaultInterpolator = $injector.get($interpolationFactory || '$translateDefaultInterpolation'),
      pendingLoader = false,
      interpolatorHashMap = {},
      langPromises = {},
      fallbackIndex,
      startFallbackIteration;

    var $translate = function (translationId, interpolateParams, interpolationId, defaultTranslationText, forceLanguage) {
      if (!$uses && $preferredLanguage) {
        $uses = $preferredLanguage;
      }
      var uses = (forceLanguage && forceLanguage !== $uses) ? // we don't want to re-negotiate $uses
        (negotiateLocale(forceLanguage) || forceLanguage) : $uses;

      // Check forceLanguage is present
      if (forceLanguage) {
        loadTranslationsIfMissing(forceLanguage);
      }

      // Duck detection: If the first argument is an array, a bunch of translations was requested.
      // The result is an object.
      if (angular.isArray(translationId)) {
        // Inspired by Q.allSettled by Kris Kowal
        // https://github.com/kriskowal/q/blob/b0fa72980717dc202ffc3cbf03b936e10ebbb9d7/q.js#L1553-1563
        // This transforms all promises regardless resolved or rejected
        var translateAll = function (translationIds) {
          var results = {}; // storing the actual results
          var promises = []; // promises to wait for
          // Wraps the promise a) being always resolved and b) storing the link id->value
          var translate = function (translationId) {
            var deferred = $q.defer();
            var regardless = function (value) {
              results[translationId] = value;
              deferred.resolve([translationId, value]);
            };
            // we don't care whether the promise was resolved or rejected; just store the values
            $translate(translationId, interpolateParams, interpolationId, defaultTranslationText, forceLanguage).then(regardless, regardless);
            return deferred.promise;
          };
          for (var i = 0, c = translationIds.length; i < c; i++) {
            promises.push(translate(translationIds[i]));
          }
          // wait for all (including storing to results)
          return $q.all(promises).then(function () {
            // return the results
            return results;
          });
        };
        return translateAll(translationId);
      }

      var deferred = $q.defer();

      // trim off any whitespace
      if (translationId) {
        translationId = trim.apply(translationId);
      }

      var promiseToWaitFor = (function () {
        var promise = $preferredLanguage ?
          langPromises[$preferredLanguage] :
          langPromises[uses];

        fallbackIndex = 0;

        if ($storageFactory && !promise) {
          // looks like there's no pending promise for $preferredLanguage or
          // $uses. Maybe there's one pending for a language that comes from
          // storage.
          var langKey = Storage.get($storageKey);
          promise = langPromises[langKey];

          if ($fallbackLanguage && $fallbackLanguage.length) {
            var index = indexOf($fallbackLanguage, langKey);
            // maybe the language from storage is also defined as fallback language
            // we increase the fallback language index to not search in that language
            // as fallback, since it's probably the first used language
            // in that case the index starts after the first element
            fallbackIndex = (index === 0) ? 1 : 0;

            // but we can make sure to ALWAYS fallback to preferred language at least
            if (indexOf($fallbackLanguage, $preferredLanguage) < 0) {
              $fallbackLanguage.push($preferredLanguage);
            }
          }
        }
        return promise;
      }());

      if (!promiseToWaitFor) {
        // no promise to wait for? okay. Then there's no loader registered
        // nor is a one pending for language that comes from storage.
        // We can just translate.
        determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText, uses).then(deferred.resolve, deferred.reject);
      } else {
        var promiseResolved = function () {
          // $uses may have changed while waiting
          if (!forceLanguage) {
            uses = $uses;
          }
          determineTranslation(translationId, interpolateParams, interpolationId, defaultTranslationText, uses).then(deferred.resolve, deferred.reject);
        };
        promiseResolved.displayName = 'promiseResolved';

        promiseToWaitFor['finally'](promiseResolved);
      }
      return deferred.promise;
    };

    /**
     * @name applyNotFoundIndicators
     * @private
     *
     * @description
     * Applies not fount indicators to given translation id, if needed.
     * This function gets only executed, if a translation id doesn't exist,
     * which is why a translation id is expected as argument.
     *
     * @param {string} translationId Translation id.
     * @returns {string} Same as given translation id but applied with not found
     * indicators.
     */
    var applyNotFoundIndicators = function (translationId) {
      // applying notFoundIndicators
      if ($notFoundIndicatorLeft) {
        translationId = [$notFoundIndicatorLeft, translationId].join(' ');
      }
      if ($notFoundIndicatorRight) {
        translationId = [translationId, $notFoundIndicatorRight].join(' ');
      }
      return translationId;
    };

    /**
     * @name useLanguage
     * @private
     *
     * @description
     * Makes actual use of a language by setting a given language key as used
     * language and informs registered interpolators to also use the given
     * key as locale.
     *
     * @param {string} key Locale key.
     */
    var useLanguage = function (key) {
      $uses = key;

      // make sure to store new language key before triggering success event
      if ($storageFactory) {
        Storage.put($translate.storageKey(), $uses);
      }

      $rootScope.$emit('$translateChangeSuccess', {language : key});

      // inform default interpolator
      defaultInterpolator.setLocale($uses);

      var eachInterpolator = function (interpolator, id) {
        interpolatorHashMap[id].setLocale($uses);
      };
      eachInterpolator.displayName = 'eachInterpolatorLocaleSetter';

      // inform all others too!
      angular.forEach(interpolatorHashMap, eachInterpolator);
      $rootScope.$emit('$translateChangeEnd', {language : key});
    };

    /**
     * @name loadAsync
     * @private
     *
     * @description
     * Kicks of registered async loader using `$injector` and applies existing
     * loader options. When resolved, it updates translation tables accordingly
     * or rejects with given language key.
     *
     * @param {string} key Language key.
     * @return {Promise} A promise.
     */
    var loadAsync = function (key) {
      if (!key) {
        throw 'No language key specified for loading.';
      }

      var deferred = $q.defer();

      $rootScope.$emit('$translateLoadingStart', {language : key});
      pendingLoader = true;

      var cache = loaderCache;
      if (typeof(cache) === 'string') {
        // getting on-demand instance of loader
        cache = $injector.get(cache);
      }

      var loaderOptions = angular.extend({}, $loaderOptions, {
        key : key,
        $http : angular.extend({}, {
          cache : cache
        }, $loaderOptions.$http)
      });

      var onLoaderSuccess = function (data) {
        var translationTable = {};
        $rootScope.$emit('$translateLoadingSuccess', {language : key});

        if (angular.isArray(data)) {
          angular.forEach(data, function (table) {
            angular.extend(translationTable, flatObject(table));
          });
        } else {
          angular.extend(translationTable, flatObject(data));
        }
        pendingLoader = false;
        deferred.resolve({
          key : key,
          table : translationTable
        });
        $rootScope.$emit('$translateLoadingEnd', {language : key});
      };
      onLoaderSuccess.displayName = 'onLoaderSuccess';

      var onLoaderError = function (key) {
        $rootScope.$emit('$translateLoadingError', {language : key});
        deferred.reject(key);
        $rootScope.$emit('$translateLoadingEnd', {language : key});
      };
      onLoaderError.displayName = 'onLoaderError';

      $injector.get($loaderFactory)(loaderOptions)
        .then(onLoaderSuccess, onLoaderError);

      return deferred.promise;
    };

    if ($storageFactory) {
      Storage = $injector.get($storageFactory);

      if (!Storage.get || !Storage.put) {
        throw new Error('Couldn\'t use storage \'' + $storageFactory + '\', missing get() or put() method!');
      }
    }

    // if we have additional interpolations that were added via
    // $translateProvider.addInterpolation(), we have to map'em
    if ($interpolatorFactories.length) {
      var eachInterpolationFactory = function (interpolatorFactory) {
        var interpolator = $injector.get(interpolatorFactory);
        // setting initial locale for each interpolation service
        interpolator.setLocale($preferredLanguage || $uses);
        // make'em recognizable through id
        interpolatorHashMap[interpolator.getInterpolationIdentifier()] = interpolator;
      };
      eachInterpolationFactory.displayName = 'interpolationFactoryAdder';

      angular.forEach($interpolatorFactories, eachInterpolationFactory);
    }

    /**
     * @name getTranslationTable
     * @private
     *
     * @description
     * Returns a promise that resolves to the translation table
     * or is rejected if an error occurred.
     *
     * @param langKey
     * @returns {Q.promise}
     */
    var getTranslationTable = function (langKey) {
      var deferred = $q.defer();
      if (Object.prototype.hasOwnProperty.call($translationTable, langKey)) {
        deferred.resolve($translationTable[langKey]);
      } else if (langPromises[langKey]) {
        var onResolve = function (data) {
          translations(data.key, data.table);
          deferred.resolve(data.table);
        };
        onResolve.displayName = 'translationTableResolver';
        langPromises[langKey].then(onResolve, deferred.reject);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    /**
     * @name getFallbackTranslation
     * @private
     *
     * @description
     * Returns a promise that will resolve to the translation
     * or be rejected if no translation was found for the language.
     * This function is currently only used for fallback language translation.
     *
     * @param langKey The language to translate to.
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @returns {Q.promise}
     */
    var getFallbackTranslation = function (langKey, translationId, interpolateParams, Interpolator) {
      var deferred = $q.defer();

      var onResolve = function (translationTable) {
        if (Object.prototype.hasOwnProperty.call(translationTable, translationId)) {
          Interpolator.setLocale(langKey);
          var translation = translationTable[translationId];
          if (translation.substr(0, 2) === '@:') {
            getFallbackTranslation(langKey, translation.substr(2), interpolateParams, Interpolator)
              .then(deferred.resolve, deferred.reject);
          } else {
            var interpolatedValue = Interpolator.interpolate(translationTable[translationId], interpolateParams, 'service');
            interpolatedValue = applyPostProcessing(translationId, translationTable[translationId], interpolatedValue, interpolateParams, langKey);

            deferred.resolve(interpolatedValue);

          }
          Interpolator.setLocale($uses);
        } else {
          deferred.reject();
        }
      };
      onResolve.displayName = 'fallbackTranslationResolver';

      getTranslationTable(langKey).then(onResolve, deferred.reject);

      return deferred.promise;
    };

    /**
     * @name getFallbackTranslationInstant
     * @private
     *
     * @description
     * Returns a translation
     * This function is currently only used for fallback language translation.
     *
     * @param langKey The language to translate to.
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param sanitizeStrategy sanitize strategy override
     *
     * @returns {string} translation
     */
    var getFallbackTranslationInstant = function (langKey, translationId, interpolateParams, Interpolator, sanitizeStrategy) {
      var result, translationTable = $translationTable[langKey];

      if (translationTable && Object.prototype.hasOwnProperty.call(translationTable, translationId)) {
        Interpolator.setLocale(langKey);
        result = Interpolator.interpolate(translationTable[translationId], interpolateParams, 'filter', sanitizeStrategy);
        result = applyPostProcessing(translationId, translationTable[translationId], result, interpolateParams, langKey, sanitizeStrategy);
        // workaround for TrustedValueHolderType
        if (!angular.isString(result) && angular.isFunction(result.$$unwrapTrustedValue)) {
          var result2 = result.$$unwrapTrustedValue();
          if (result2.substr(0, 2) === '@:') {
            return getFallbackTranslationInstant(langKey, result2.substr(2), interpolateParams, Interpolator, sanitizeStrategy);
          }
        } else if (result.substr(0, 2) === '@:') {
          return getFallbackTranslationInstant(langKey, result.substr(2), interpolateParams, Interpolator, sanitizeStrategy);
        }
        Interpolator.setLocale($uses);
      }

      return result;
    };


    /**
     * @name translateByHandler
     * @private
     *
     * Translate by missing translation handler.
     *
     * @param translationId
     * @param interpolateParams
     * @param defaultTranslationText
     * @param sanitizeStrategy sanitize strategy override
     *
     * @returns translation created by $missingTranslationHandler or translationId is $missingTranslationHandler is
     * absent
     */
    var translateByHandler = function (translationId, interpolateParams, defaultTranslationText, sanitizeStrategy) {
      // If we have a handler factory - we might also call it here to determine if it provides
      // a default text for a translationid that can't be found anywhere in our tables
      if ($missingTranslationHandlerFactory) {
        return $injector.get($missingTranslationHandlerFactory)(translationId, $uses, interpolateParams, defaultTranslationText, sanitizeStrategy);
      } else {
        return translationId;
      }
    };

    /**
     * @name resolveForFallbackLanguage
     * @private
     *
     * Recursive helper function for fallbackTranslation that will sequentially look
     * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
     *
     * @param fallbackLanguageIndex
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @returns {Q.promise} Promise that will resolve to the translation.
     */
    var resolveForFallbackLanguage = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator, defaultTranslationText) {
      var deferred = $q.defer();

      if (fallbackLanguageIndex < $fallbackLanguage.length) {
        var langKey = $fallbackLanguage[fallbackLanguageIndex];
        getFallbackTranslation(langKey, translationId, interpolateParams, Interpolator).then(
          function (data) {
            deferred.resolve(data);
          },
          function () {
            // Look in the next fallback language for a translation.
            // It delays the resolving by passing another promise to resolve.
            return resolveForFallbackLanguage(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator, defaultTranslationText).then(deferred.resolve, deferred.reject);
          }
        );
      } else {
        // No translation found in any fallback language
        // if a default translation text is set in the directive, then return this as a result
        if (defaultTranslationText) {
          deferred.resolve(defaultTranslationText);
        } else {
          var missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, defaultTranslationText);

          // if no default translation is set and an error handler is defined, send it to the handler
          // and then return the result if it isn't undefined
          if ($missingTranslationHandlerFactory && missingTranslationHandlerTranslation) {
            deferred.resolve(missingTranslationHandlerTranslation);
          } else {
            deferred.reject(applyNotFoundIndicators(translationId));
          }
        }
      }
      return deferred.promise;
    };

    /**
     * @name resolveForFallbackLanguageInstant
     * @private
     *
     * Recursive helper function for fallbackTranslation that will sequentially look
     * for a translation in the fallbackLanguages starting with fallbackLanguageIndex.
     *
     * @param fallbackLanguageIndex
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @param sanitizeStrategy
     * @returns {string} translation
     */
    var resolveForFallbackLanguageInstant = function (fallbackLanguageIndex, translationId, interpolateParams, Interpolator, sanitizeStrategy) {
      var result;

      if (fallbackLanguageIndex < $fallbackLanguage.length) {
        var langKey = $fallbackLanguage[fallbackLanguageIndex];
        result = getFallbackTranslationInstant(langKey, translationId, interpolateParams, Interpolator, sanitizeStrategy);
        if (!result && result !== '') {
          result = resolveForFallbackLanguageInstant(fallbackLanguageIndex + 1, translationId, interpolateParams, Interpolator);
        }
      }
      return result;
    };

    /**
     * Translates with the usage of the fallback languages.
     *
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @returns {Q.promise} Promise, that resolves to the translation.
     */
    var fallbackTranslation = function (translationId, interpolateParams, Interpolator, defaultTranslationText) {
      // Start with the fallbackLanguage with index 0
      return resolveForFallbackLanguage((startFallbackIteration > 0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator, defaultTranslationText);
    };

    /**
     * Translates with the usage of the fallback languages.
     *
     * @param translationId
     * @param interpolateParams
     * @param Interpolator
     * @returns {String} translation
     */
    var fallbackTranslationInstant = function (translationId, interpolateParams, Interpolator, sanitizeStrategy) {
      // Start with the fallbackLanguage with index 0
      return resolveForFallbackLanguageInstant((startFallbackIteration > 0 ? startFallbackIteration : fallbackIndex), translationId, interpolateParams, Interpolator, sanitizeStrategy);
    };

    var determineTranslation = function (translationId, interpolateParams, interpolationId, defaultTranslationText, uses) {

      var deferred = $q.defer();

      var table = uses ? $translationTable[uses] : $translationTable,
        Interpolator = (interpolationId) ? interpolatorHashMap[interpolationId] : defaultInterpolator;

      // if the translation id exists, we can just interpolate it
      if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
        var translation = table[translationId];

        // If using link, rerun $translate with linked translationId and return it
        if (translation.substr(0, 2) === '@:') {

          $translate(translation.substr(2), interpolateParams, interpolationId, defaultTranslationText, uses)
            .then(deferred.resolve, deferred.reject);
        } else {
          //
          var resolvedTranslation = Interpolator.interpolate(translation, interpolateParams, 'service');
          resolvedTranslation = applyPostProcessing(translationId, translation, resolvedTranslation, interpolateParams, uses);
          deferred.resolve(resolvedTranslation);
        }
      } else {
        var missingTranslationHandlerTranslation;
        // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
        if ($missingTranslationHandlerFactory && !pendingLoader) {
          missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, defaultTranslationText);
        }

        // since we couldn't translate the inital requested translation id,
        // we try it now with one or more fallback languages, if fallback language(s) is
        // configured.
        if (uses && $fallbackLanguage && $fallbackLanguage.length) {
          fallbackTranslation(translationId, interpolateParams, Interpolator, defaultTranslationText)
            .then(function (translation) {
              deferred.resolve(translation);
            }, function (_translationId) {
              deferred.reject(applyNotFoundIndicators(_translationId));
            });
        } else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
          // looks like the requested translation id doesn't exists.
          // Now, if there is a registered handler for missing translations and no
          // asyncLoader is pending, we execute the handler
          if (defaultTranslationText) {
            deferred.resolve(defaultTranslationText);
          } else {
            deferred.resolve(missingTranslationHandlerTranslation);
          }
        } else {
          if (defaultTranslationText) {
            deferred.resolve(defaultTranslationText);
          } else {
            deferred.reject(applyNotFoundIndicators(translationId));
          }
        }
      }
      return deferred.promise;
    };

    var determineTranslationInstant = function (translationId, interpolateParams, interpolationId, uses, sanitizeStrategy) {

      var result, table = uses ? $translationTable[uses] : $translationTable,
        Interpolator = defaultInterpolator;

      // if the interpolation id exists use custom interpolator
      if (interpolatorHashMap && Object.prototype.hasOwnProperty.call(interpolatorHashMap, interpolationId)) {
        Interpolator = interpolatorHashMap[interpolationId];
      }

      // if the translation id exists, we can just interpolate it
      if (table && Object.prototype.hasOwnProperty.call(table, translationId)) {
        var translation = table[translationId];

        // If using link, rerun $translate with linked translationId and return it
        if (translation.substr(0, 2) === '@:') {
          result = determineTranslationInstant(translation.substr(2), interpolateParams, interpolationId, uses, sanitizeStrategy);
        } else {
          result = Interpolator.interpolate(translation, interpolateParams, 'filter', sanitizeStrategy);
          result = applyPostProcessing(translationId, translation, result, interpolateParams, uses, sanitizeStrategy);
        }
      } else {
        var missingTranslationHandlerTranslation;
        // for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
        if ($missingTranslationHandlerFactory && !pendingLoader) {
          missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, sanitizeStrategy);
        }

        // since we couldn't translate the inital requested translation id,
        // we try it now with one or more fallback languages, if fallback language(s) is
        // configured.
        if (uses && $fallbackLanguage && $fallbackLanguage.length) {
          fallbackIndex = 0;
          result = fallbackTranslationInstant(translationId, interpolateParams, Interpolator, sanitizeStrategy);
        } else if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
          // looks like the requested translation id doesn't exists.
          // Now, if there is a registered handler for missing translations and no
          // asyncLoader is pending, we execute the handler
          result = missingTranslationHandlerTranslation;
        } else {
          result = applyNotFoundIndicators(translationId);
        }
      }

      return result;
    };

    var clearNextLangAndPromise = function (key) {
      if ($nextLang === key) {
        $nextLang = undefined;
      }
      langPromises[key] = undefined;
    };

    var applyPostProcessing = function (translationId, translation, resolvedTranslation, interpolateParams, uses, sanitizeStrategy) {
      var fn = postProcessFn;

      if (fn) {

        if (typeof(fn) === 'string') {
          // getting on-demand instance
          fn = $injector.get(fn);
        }
        if (fn) {
          return fn(translationId, translation, resolvedTranslation, interpolateParams, uses, sanitizeStrategy);
        }
      }

      return resolvedTranslation;
    };

    var loadTranslationsIfMissing = function (key) {
      if (!$translationTable[key] && $loaderFactory && !langPromises[key]) {
        langPromises[key] = loadAsync(key).then(function (translation) {
          translations(translation.key, translation.table);
          return translation;
        });
      }
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#preferredLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the language key for the preferred language.
     *
     * @param {string} langKey language String or Array to be used as preferredLanguage (changing at runtime)
     *
     * @return {string} preferred language key
     */
    $translate.preferredLanguage = function (langKey) {
      if (langKey) {
        setupPreferredLanguage(langKey);
      }
      return $preferredLanguage;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#cloakClassName
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the configured class name for `translate-cloak` directive.
     *
     * @return {string} cloakClassName
     */
    $translate.cloakClassName = function () {
      return $cloakClassName;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#nestedObjectDelimeter
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the configured delimiter for nested namespaces.
     *
     * @return {string} nestedObjectDelimeter
     */
    $translate.nestedObjectDelimeter = function () {
      return $nestedObjectDelimeter;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#fallbackLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the language key for the fallback languages or sets a new fallback stack.
     *
     * @param {string=} langKey language String or Array of fallback languages to be used (to change stack at runtime)
     *
     * @return {string||array} fallback language key
     */
    $translate.fallbackLanguage = function (langKey) {
      if (langKey !== undefined && langKey !== null) {
        fallbackStack(langKey);

        // as we might have an async loader initiated and a new translation language might have been defined
        // we need to add the promise to the stack also. So - iterate.
        if ($loaderFactory) {
          if ($fallbackLanguage && $fallbackLanguage.length) {
            for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
              if (!langPromises[$fallbackLanguage[i]]) {
                langPromises[$fallbackLanguage[i]] = loadAsync($fallbackLanguage[i]);
              }
            }
          }
        }
        $translate.use($translate.use());
      }
      if ($fallbackWasString) {
        return $fallbackLanguage[0];
      } else {
        return $fallbackLanguage;
      }

    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#useFallbackLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Sets the first key of the fallback language stack to be used for translation.
     * Therefore all languages in the fallback array BEFORE this key will be skipped!
     *
     * @param {string=} langKey Contains the langKey the iteration shall start with. Set to false if you want to
     * get back to the whole stack
     */
    $translate.useFallbackLanguage = function (langKey) {
      if (langKey !== undefined && langKey !== null) {
        if (!langKey) {
          startFallbackIteration = 0;
        } else {
          var langKeyPosition = indexOf($fallbackLanguage, langKey);
          if (langKeyPosition > -1) {
            startFallbackIteration = langKeyPosition;
          }
        }

      }

    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#proposedLanguage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the language key of language that is currently loaded asynchronously.
     *
     * @return {string} language key
     */
    $translate.proposedLanguage = function () {
      return $nextLang;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#storage
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns registered storage.
     *
     * @return {object} Storage
     */
    $translate.storage = function () {
      return Storage;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#negotiateLocale
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns a language key based on available languages and language aliases. If a
     * language key cannot be resolved, returns undefined.
     *
     * If no or a falsy key is given, returns undefined.
     *
     * @param {string} [key] Language key
     * @return {string|undefined} Language key or undefined if no language key is found.
     */
    $translate.negotiateLocale = negotiateLocale;

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#use
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Tells angular-translate which language to use by given language key. This method is
     * used to change language at runtime. It also takes care of storing the language
     * key in a configured store to let your app remember the choosed language.
     *
     * When trying to 'use' a language which isn't available it tries to load it
     * asynchronously with registered loaders.
     *
     * Returns promise object with loaded language file data or string of the currently used language.
     *
     * If no or a falsy key is given it returns the currently used language key.
     * The returned string will be ```undefined``` if setting up $translate hasn't finished.
     * @example
     * $translate.use("en_US").then(function(data){
       *   $scope.text = $translate("HELLO");
       * });
     *
     * @param {string} [key] Language key
     * @return {object|string} Promise with loaded language data or the language key if a falsy param was given.
     */
    $translate.use = function (key) {
      if (!key) {
        return $uses;
      }

      var deferred = $q.defer();

      $rootScope.$emit('$translateChangeStart', {language : key});

      // Try to get the aliased language key
      var aliasedKey = negotiateLocale(key);
      // Ensure only registered language keys will be loaded
      if ($availableLanguageKeys.length > 0 && !aliasedKey) {
        return $q.reject(key);
      }

      if (aliasedKey) {
        key = aliasedKey;
      }

      // if there isn't a translation table for the language we've requested,
      // we load it asynchronously
      $nextLang = key;
      if (($forceAsyncReloadEnabled || !$translationTable[key]) && $loaderFactory && !langPromises[key]) {
        langPromises[key] = loadAsync(key).then(function (translation) {
          translations(translation.key, translation.table);
          deferred.resolve(translation.key);
          if ($nextLang === key) {
            useLanguage(translation.key);
          }
          return translation;
        }, function (key) {
          $rootScope.$emit('$translateChangeError', {language : key});
          deferred.reject(key);
          $rootScope.$emit('$translateChangeEnd', {language : key});
          return $q.reject(key);
        });
        langPromises[key]['finally'](function () {
          clearNextLangAndPromise(key);
        });
      } else if (langPromises[key]) {
        // we are already loading this asynchronously
        // resolve our new deferred when the old langPromise is resolved
        langPromises[key].then(function (translation) {
          if ($nextLang === translation.key) {
            useLanguage(translation.key);
          }
          deferred.resolve(translation.key);
          return translation;
        }, function (key) {
          // find first available fallback language if that request has failed
          if (!$uses && $fallbackLanguage && $fallbackLanguage.length > 0 && $fallbackLanguage[0] !== key) {
            return $translate.use($fallbackLanguage[0]).then(deferred.resolve, deferred.reject);
          } else {
            return deferred.reject(key);
          }
        });
      } else {
        deferred.resolve(key);
        useLanguage(key);
      }

      return deferred.promise;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#resolveClientLocale
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * This returns the current browser/client's language key. The result is processed with the configured uniform tag resolver.
     *
     * @returns {string} the current client/browser language key
     */
    $translate.resolveClientLocale = function () {
      return getLocale();
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#storageKey
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the key for the storage.
     *
     * @return {string} storage key
     */
    $translate.storageKey = function () {
      return storageKey();
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isPostCompilingEnabled
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether post compiling is enabled or not
     *
     * @return {bool} storage key
     */
    $translate.isPostCompilingEnabled = function () {
      return $postCompilingEnabled;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isForceAsyncReloadEnabled
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether force async reload is enabled or not
     *
     * @return {boolean} forceAsyncReload value
     */
    $translate.isForceAsyncReloadEnabled = function () {
      return $forceAsyncReloadEnabled;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isKeepContent
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether keepContent or not
     *
     * @return {boolean} keepContent value
     */
    $translate.isKeepContent = function () {
      return $keepContent;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#refresh
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Refreshes a translation table pointed by the given langKey. If langKey is not specified,
     * the module will drop all existent translation tables and load new version of those which
     * are currently in use.
     *
     * Refresh means that the module will drop target translation table and try to load it again.
     *
     * In case there are no loaders registered the refresh() method will throw an Error.
     *
     * If the module is able to refresh translation tables refresh() method will broadcast
     * $translateRefreshStart and $translateRefreshEnd events.
     *
     * @example
     * // this will drop all currently existent translation tables and reload those which are
     * // currently in use
     * $translate.refresh();
     * // this will refresh a translation table for the en_US language
     * $translate.refresh('en_US');
     *
     * @param {string} langKey A language key of the table, which has to be refreshed
     *
     * @return {promise} Promise, which will be resolved in case a translation tables refreshing
     * process is finished successfully, and reject if not.
     */
    $translate.refresh = function (langKey) {
      if (!$loaderFactory) {
        throw new Error('Couldn\'t refresh translation table, no loader registered!');
      }

      var deferred = $q.defer();

      function resolve() {
        deferred.resolve();
        $rootScope.$emit('$translateRefreshEnd', {language : langKey});
      }

      function reject() {
        deferred.reject();
        $rootScope.$emit('$translateRefreshEnd', {language : langKey});
      }

      $rootScope.$emit('$translateRefreshStart', {language : langKey});

      if (!langKey) {
        // if there's no language key specified we refresh ALL THE THINGS!
        var tables = [], loadingKeys = {};

        // reload registered fallback languages
        if ($fallbackLanguage && $fallbackLanguage.length) {
          for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
            tables.push(loadAsync($fallbackLanguage[i]));
            loadingKeys[$fallbackLanguage[i]] = true;
          }
        }

        // reload currently used language
        if ($uses && !loadingKeys[$uses]) {
          tables.push(loadAsync($uses));
        }

        var allTranslationsLoaded = function (tableData) {
          $translationTable = {};
          angular.forEach(tableData, function (data) {
            translations(data.key, data.table);
          });
          if ($uses) {
            useLanguage($uses);
          }
          resolve();
        };
        allTranslationsLoaded.displayName = 'refreshPostProcessor';

        $q.all(tables).then(allTranslationsLoaded, reject);

      } else if ($translationTable[langKey]) {

        var oneTranslationsLoaded = function (data) {
          translations(data.key, data.table);
          if (langKey === $uses) {
            useLanguage($uses);
          }
          resolve();
          return data;
        };
        oneTranslationsLoaded.displayName = 'refreshPostProcessor';

        loadAsync(langKey).then(oneTranslationsLoaded, reject);

      } else {
        reject();
      }
      return deferred.promise;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#instant
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns a translation instantly from the internal state of loaded translation. All rules
     * regarding the current language, the preferred language of even fallback languages will be
     * used except any promise handling. If a language was not found, an asynchronous loading
     * will be invoked in the background.
     *
     * @param {string|array} translationId A token which represents a translation id
     *                                     This can be optionally an array of translation ids which
     *                                     results that the function's promise returns an object where
     *                                     each key is the translation id and the value the translation.
     * @param {object} interpolateParams Params
     * @param {string} interpolationId The id of the interpolation to use
     * @param {string} forceLanguage A language to be used instead of the current language
     * @param {string} sanitizeStrategy force sanitize strategy for this call instead of using the configured one
     *
     * @return {string|object} translation
     */
    $translate.instant = function (translationId, interpolateParams, interpolationId, forceLanguage, sanitizeStrategy) {

      // we don't want to re-negotiate $uses
      var uses = (forceLanguage && forceLanguage !== $uses) ? // we don't want to re-negotiate $uses
        (negotiateLocale(forceLanguage) || forceLanguage) : $uses;

      // Detect undefined and null values to shorten the execution and prevent exceptions
      if (translationId === null || angular.isUndefined(translationId)) {
        return translationId;
      }

      // Check forceLanguage is present
      if (forceLanguage) {
        loadTranslationsIfMissing(forceLanguage);
      }

      // Duck detection: If the first argument is an array, a bunch of translations was requested.
      // The result is an object.
      if (angular.isArray(translationId)) {
        var results = {};
        for (var i = 0, c = translationId.length; i < c; i++) {
          results[translationId[i]] = $translate.instant(translationId[i], interpolateParams, interpolationId, forceLanguage, sanitizeStrategy);
        }
        return results;
      }

      // We discarded unacceptable values. So we just need to verify if translationId is empty String
      if (angular.isString(translationId) && translationId.length < 1) {
        return translationId;
      }

      // trim off any whitespace
      if (translationId) {
        translationId = trim.apply(translationId);
      }

      var result, possibleLangKeys = [];
      if ($preferredLanguage) {
        possibleLangKeys.push($preferredLanguage);
      }
      if (uses) {
        possibleLangKeys.push(uses);
      }
      if ($fallbackLanguage && $fallbackLanguage.length) {
        possibleLangKeys = possibleLangKeys.concat($fallbackLanguage);
      }
      for (var j = 0, d = possibleLangKeys.length; j < d; j++) {
        var possibleLangKey = possibleLangKeys[j];
        if ($translationTable[possibleLangKey]) {
          if (typeof $translationTable[possibleLangKey][translationId] !== 'undefined') {
            result = determineTranslationInstant(translationId, interpolateParams, interpolationId, uses, sanitizeStrategy);
          }
        }
        if (typeof result !== 'undefined') {
          break;
        }
      }

      if (!result && result !== '') {
        if ($notFoundIndicatorLeft || $notFoundIndicatorRight) {
          result = applyNotFoundIndicators(translationId);
        } else {
          // Return translation of default interpolator if not found anything.
          result = defaultInterpolator.interpolate(translationId, interpolateParams, 'filter', sanitizeStrategy);

          // looks like the requested translation id doesn't exists.
          // Now, if there is a registered handler for missing translations and no
          // asyncLoader is pending, we execute the handler
          var missingTranslationHandlerTranslation;
          if ($missingTranslationHandlerFactory && !pendingLoader) {
            missingTranslationHandlerTranslation = translateByHandler(translationId, interpolateParams, sanitizeStrategy);
          }

          if ($missingTranslationHandlerFactory && !pendingLoader && missingTranslationHandlerTranslation) {
            result = missingTranslationHandlerTranslation;
          }
        }
      }

      return result;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#versionInfo
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the current version information for the angular-translate library
     *
     * @return {string} angular-translate version
     */
    $translate.versionInfo = function () {
      return version;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#loaderCache
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns the defined loaderCache.
     *
     * @return {boolean|string|object} current value of loaderCache
     */
    $translate.loaderCache = function () {
      return loaderCache;
    };

    // internal purpose only
    $translate.directivePriority = function () {
      return directivePriority;
    };

    // internal purpose only
    $translate.statefulFilter = function () {
      return statefulFilter;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#isReady
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether the service is "ready" to translate (i.e. loading 1st language).
     *
     * See also {@link pascalprecht.translate.$translate#methods_onReady onReady()}.
     *
     * @return {boolean} current value of ready
     */
    $translate.isReady = function () {
      return $isReady;
    };

    var $onReadyDeferred = $q.defer();
    $onReadyDeferred.promise.then(function () {
      $isReady = true;
    });

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#onReady
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns whether the service is "ready" to translate (i.e. loading 1st language).
     *
     * See also {@link pascalprecht.translate.$translate#methods_isReady isReady()}.
     *
     * @param {Function=} fn Function to invoke when service is ready
     * @return {object} Promise resolved when service is ready
     */
    $translate.onReady = function (fn) {
      var deferred = $q.defer();
      if (angular.isFunction(fn)) {
        deferred.promise.then(fn);
      }
      if ($isReady) {
        deferred.resolve();
      } else {
        $onReadyDeferred.promise.then(deferred.resolve);
      }
      return deferred.promise;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#getAvailableLanguageKeys
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * This function simply returns the registered language keys being defined before in the config phase
     * With this, an application can use the array to provide a language selection dropdown or similar
     * without any additional effort
     *
     * @returns {object} returns the list of possibly registered language keys and mapping or null if not defined
     */
    $translate.getAvailableLanguageKeys = function () {
      if ($availableLanguageKeys.length > 0) {
        return $availableLanguageKeys;
      }
      return null;
    };

    /**
     * @ngdoc function
     * @name pascalprecht.translate.$translate#getTranslationTable
     * @methodOf pascalprecht.translate.$translate
     *
     * @description
     * Returns translation table by the given language key.
     *
     * Unless a language is provided it returns a translation table of the current one.
     * Note: If translation dictionary is currently downloading or in progress
     * it will return null.
     *
     * @param {string} langKey A token which represents a translation id
     *
     * @return {object} a copy of angular-translate $translationTable
     */
    $translate.getTranslationTable = function (langKey) {
      langKey = langKey || $translate.use();
      if (langKey && $translationTable[langKey]) {
        return angular.copy($translationTable[langKey]);
      }
      return null;
    };

    // Whenever $translateReady is being fired, this will ensure the state of $isReady
    var globalOnReadyListener = $rootScope.$on('$translateReady', function () {
      $onReadyDeferred.resolve();
      globalOnReadyListener(); // one time only
      globalOnReadyListener = null;
    });
    var globalOnChangeListener = $rootScope.$on('$translateChangeEnd', function () {
      $onReadyDeferred.resolve();
      globalOnChangeListener(); // one time only
      globalOnChangeListener = null;
    });

    if ($loaderFactory) {

      // If at least one async loader is defined and there are no
      // (default) translations available we should try to load them.
      if (angular.equals($translationTable, {})) {
        if ($translate.use()) {
          $translate.use($translate.use());
        }
      }

      // Also, if there are any fallback language registered, we start
      // loading them asynchronously as soon as we can.
      if ($fallbackLanguage && $fallbackLanguage.length) {
        var processAsyncResult = function (translation) {
          translations(translation.key, translation.table);
          $rootScope.$emit('$translateChangeEnd', {language : translation.key});
          return translation;
        };
        for (var i = 0, len = $fallbackLanguage.length; i < len; i++) {
          var fallbackLanguageId = $fallbackLanguage[i];
          if ($forceAsyncReloadEnabled || !$translationTable[fallbackLanguageId]) {
            langPromises[fallbackLanguageId] = loadAsync(fallbackLanguageId).then(processAsyncResult);
          }
        }
      }
    } else {
      $rootScope.$emit('$translateReady', {language : $translate.use()});
    }

    return $translate;
  }];
}

$translate.displayName = 'displayName';

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateDefaultInterpolation
 * @requires $interpolate
 *
 * @description
 * Uses angular's `$interpolate` services to interpolate strings against some values.
 *
 * Be aware to configure a proper sanitization strategy.
 *
 * See also:
 * * {@link pascalprecht.translate.$translateSanitization}
 *
 * @return {object} $translateDefaultInterpolation Interpolator service
 */
angular.module('pascalprecht.translate').factory('$translateDefaultInterpolation', $translateDefaultInterpolation);

function $translateDefaultInterpolation ($interpolate, $translateSanitization) {

  'use strict';

  var $translateInterpolator = {},
      $locale,
      $identifier = 'default';

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#setLocale
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Sets current locale (this is currently not use in this interpolation).
   *
   * @param {string} locale Language key or locale.
   */
  $translateInterpolator.setLocale = function (locale) {
    $locale = locale;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#getInterpolationIdentifier
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Returns an identifier for this interpolation service.
   *
   * @returns {string} $identifier
   */
  $translateInterpolator.getInterpolationIdentifier = function () {
    return $identifier;
  };

  /**
   * @deprecated will be removed in 3.0
   * @see {@link pascalprecht.translate.$translateSanitization}
   */
  $translateInterpolator.useSanitizeValueStrategy = function (value) {
    $translateSanitization.useStrategy(value);
    return this;
  };

  /**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#interpolate
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Interpolates given value agains given interpolate params using angulars
   * `$interpolate` service.
   *
   * Since AngularJS 1.5, `value` must not be a string but can be anything input.
   *
   * @returns {string} interpolated string.
   */
  $translateInterpolator.interpolate = function (value, interpolationParams, context, sanitizeStrategy) {
    interpolationParams = interpolationParams || {};
    interpolationParams = $translateSanitization.sanitize(interpolationParams, 'params', sanitizeStrategy, context);

    var interpolatedText;
    if (angular.isNumber(value)) {
      // numbers are safe
      interpolatedText = '' + value;
    } else if (angular.isString(value)) {
      // strings must be interpolated (that's the job here)
      interpolatedText = $interpolate(value)(interpolationParams);
      interpolatedText = $translateSanitization.sanitize(interpolatedText, 'text', sanitizeStrategy, context);
    } else {
      // neither a number or a string, cant interpolate => empty string
      interpolatedText = '';
    }

    return interpolatedText;
  };

  return $translateInterpolator;
}

$translateDefaultInterpolation.displayName = '$translateDefaultInterpolation';

angular.module('pascalprecht.translate').constant('$STORAGE_KEY', 'NG_TRANSLATE_LANG_KEY');

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translate
 * @requires $interpolate, 
 * @requires $compile, 
 * @requires $parse, 
 * @requires $rootScope
 * @restrict AE
 *
 * @description
 * Translates given translation id either through attribute or DOM content.
 * Internally it uses $translate service to translate the translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate Translation id which could be either string or interpolated string.
 * @param {string=} translate-values Values to pass into translation id. Can be passed as object literal string or interpolated object.
 * @param {string=} translate-attr-ATTR translate Translation id and put it into ATTR attribute.
 * @param {string=} translate-default will be used unless translation was successful
 * @param {boolean=} translate-compile (default true if present) defines locally activation of {@link pascalprecht.translate.$translateProvider#methods_usePostCompiling}
 * @param {boolean=} translate-keep-content (default true if present) defines that in case a KEY could not be translated, that the existing content is left in the innerHTML}
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <pre translate="TRANSLATION_ID"></pre>
        <pre translate>TRANSLATION_ID</pre>
        <pre translate translate-attr-title="TRANSLATION_ID"></pre>
        <pre translate="{{translationId}}"></pre>
        <pre translate>{{translationId}}</pre>
        <pre translate="WITH_VALUES" translate-values="{value: 5}"></pre>
        <pre translate translate-values="{value: 5}">WITH_VALUES</pre>
        <pre translate="WITH_VALUES" translate-values="{{values}}"></pre>
        <pre translate translate-values="{{values}}">WITH_VALUES</pre>
        <pre translate translate-attr-title="WITH_VALUES" translate-values="{{values}}"></pre>
        <pre translate="WITH_CAMEL_CASE_KEY" translate-value-camel-case-key="Hi"></pre>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}',
          'WITH_CAMEL_CASE_KEY': 'The interpolation key is camel cased: {{camelCaseKey}}'
        }).preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
    <file name="scenario.js">
      it('should translate', function () {
        inject(function ($rootScope, $compile) {
          $rootScope.translationId = 'TRANSLATION_ID';

          element = $compile('<p translate="TRANSLATION_ID"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate="{{translationId}}"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate>TRANSLATION_ID</p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate>{{translationId}}</p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('Hello there!');

          element = $compile('<p translate translate-attr-title="TRANSLATION_ID"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.attr('title')).toBe('Hello there!');

          element = $compile('<p translate="WITH_CAMEL_CASE_KEY" translate-value-camel-case-key="Hello"></p>')($rootScope);
          $rootScope.$digest();
          expect(element.text()).toBe('The interpolation key is camel cased: Hello');
        });
      });
    </file>
   </example>
 */
.directive('translate', translateDirective);
function translateDirective($translate, $interpolate, $compile, $parse, $rootScope) {

  'use strict';

  /**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string} The string stripped of whitespace from both ends
   */
  var trim = function() {
    return this.toString().replace(/^\s+|\s+$/g, '');
  };

  return {
    restrict: 'AE',
    scope: true,
    priority: $translate.directivePriority(),
    compile: function (tElement, tAttr) {

      var translateValuesExist = (tAttr.translateValues) ?
        tAttr.translateValues : undefined;

      var translateInterpolation = (tAttr.translateInterpolation) ?
        tAttr.translateInterpolation : undefined;

      var translateValueExist = tElement[0].outerHTML.match(/translate-value-+/i);

      var interpolateRegExp = '^(.*)(' + $interpolate.startSymbol() + '.*' + $interpolate.endSymbol() + ')(.*)',
          watcherRegExp = '^(.*)' + $interpolate.startSymbol() + '(.*)' + $interpolate.endSymbol() + '(.*)';

      return function linkFn(scope, iElement, iAttr) {

        scope.interpolateParams = {};
        scope.preText = '';
        scope.postText = '';
        scope.translateNamespace = getTranslateNamespace(scope);
        var translationIds = {};

        var initInterpolationParams = function (interpolateParams, iAttr, tAttr) {
          // initial setup
          if (iAttr.translateValues) {
            angular.extend(interpolateParams, $parse(iAttr.translateValues)(scope.$parent));
          }
          // initially fetch all attributes if existing and fill the params
          if (translateValueExist) {
            for (var attr in tAttr) {
              if (Object.prototype.hasOwnProperty.call(iAttr, attr) && attr.substr(0, 14) === 'translateValue' && attr !== 'translateValues') {
                var attributeName = angular.lowercase(attr.substr(14, 1)) + attr.substr(15);
                interpolateParams[attributeName] = tAttr[attr];
              }
            }
          }
        };

        // Ensures any change of the attribute "translate" containing the id will
        // be re-stored to the scope's "translationId".
        // If the attribute has no content, the element's text value (white spaces trimmed off) will be used.
        var observeElementTranslation = function (translationId) {

          // Remove any old watcher
          if (angular.isFunction(observeElementTranslation._unwatchOld)) {
            observeElementTranslation._unwatchOld();
            observeElementTranslation._unwatchOld = undefined;
          }

          if (angular.equals(translationId , '') || !angular.isDefined(translationId)) {
            var iElementText = trim.apply(iElement.text());

            // Resolve translation id by inner html if required
            var interpolateMatches = iElementText.match(interpolateRegExp);
            // Interpolate translation id if required
            if (angular.isArray(interpolateMatches)) {
              scope.preText = interpolateMatches[1];
              scope.postText = interpolateMatches[3];
              translationIds.translate = $interpolate(interpolateMatches[2])(scope.$parent);
              var watcherMatches = iElementText.match(watcherRegExp);
              if (angular.isArray(watcherMatches) && watcherMatches[2] && watcherMatches[2].length) {
                observeElementTranslation._unwatchOld = scope.$watch(watcherMatches[2], function (newValue) {
                  translationIds.translate = newValue;
                  updateTranslations();
                });
              }
            } else {
              // do not assigne the translation id if it is empty.
              translationIds.translate = !iElementText ? undefined : iElementText;
            }
          } else {
            translationIds.translate = translationId;
          }
          updateTranslations();
        };

        var observeAttributeTranslation = function (translateAttr) {
          iAttr.$observe(translateAttr, function (translationId) {
            translationIds[translateAttr] = translationId;
            updateTranslations();
          });
        };

        // initial setup with values
        initInterpolationParams(scope.interpolateParams, iAttr, tAttr);

        var firstAttributeChangedEvent = true;
        iAttr.$observe('translate', function (translationId) {
          if (typeof translationId === 'undefined') {
            // case of element "<translate>xyz</translate>"
            observeElementTranslation('');
          } else {
            // case of regular attribute
            if (translationId !== '' || !firstAttributeChangedEvent) {
              translationIds.translate = translationId;
              updateTranslations();
            }
          }
          firstAttributeChangedEvent = false;
        });

        for (var translateAttr in iAttr) {
          if (iAttr.hasOwnProperty(translateAttr) && translateAttr.substr(0, 13) === 'translateAttr' && translateAttr.length > 13) {
            observeAttributeTranslation(translateAttr);
          }
        }

        iAttr.$observe('translateDefault', function (value) {
          scope.defaultText = value;
          updateTranslations();
        });

        if (translateValuesExist) {
          iAttr.$observe('translateValues', function (interpolateParams) {
            if (interpolateParams) {
              scope.$parent.$watch(function () {
                angular.extend(scope.interpolateParams, $parse(interpolateParams)(scope.$parent));
              });
            }
          });
        }

        if (translateValueExist) {
          var observeValueAttribute = function (attrName) {
            iAttr.$observe(attrName, function (value) {
              var attributeName = angular.lowercase(attrName.substr(14, 1)) + attrName.substr(15);
              scope.interpolateParams[attributeName] = value;
            });
          };
          for (var attr in iAttr) {
            if (Object.prototype.hasOwnProperty.call(iAttr, attr) && attr.substr(0, 14) === 'translateValue' && attr !== 'translateValues') {
              observeValueAttribute(attr);
            }
          }
        }

        // Master update function
        var updateTranslations = function () {
          for (var key in translationIds) {
            if (translationIds.hasOwnProperty(key) && translationIds[key] !== undefined) {
              updateTranslation(key, translationIds[key], scope, scope.interpolateParams, scope.defaultText, scope.translateNamespace);
            }
          }
        };

        // Put translation processing function outside loop
        var updateTranslation = function(translateAttr, translationId, scope, interpolateParams, defaultTranslationText, translateNamespace) {
          if (translationId) {
            // if translation id starts with '.' and translateNamespace given, prepend namespace
            if (translateNamespace && translationId.charAt(0) === '.') {
              translationId = translateNamespace + translationId;
            }

            $translate(translationId, interpolateParams, translateInterpolation, defaultTranslationText, scope.translateLanguage)
              .then(function (translation) {
                applyTranslation(translation, scope, true, translateAttr);
              }, function (translationId) {
                applyTranslation(translationId, scope, false, translateAttr);
              });
          } else {
            // as an empty string cannot be translated, we can solve this using successful=false
            applyTranslation(translationId, scope, false, translateAttr);
          }
        };

        var applyTranslation = function (value, scope, successful, translateAttr) {
          if (!successful) {
            if (typeof scope.defaultText !== 'undefined') {
              value = scope.defaultText;
            }
          }
          if (translateAttr === 'translate') {
            // default translate into innerHTML
            if (successful || (!successful && !$translate.isKeepContent() && typeof iAttr.translateKeepContent === 'undefined')) {
              iElement.empty().append(scope.preText + value + scope.postText);
            }
            var globallyEnabled = $translate.isPostCompilingEnabled();
            var locallyDefined = typeof tAttr.translateCompile !== 'undefined';
            var locallyEnabled = locallyDefined && tAttr.translateCompile !== 'false';
            if ((globallyEnabled && !locallyDefined) || locallyEnabled) {
              $compile(iElement.contents())(scope);
            }
          } else {
            // translate attribute
            var attributeName = iAttr.$attr[translateAttr];
            if (attributeName.substr(0, 5) === 'data-') {
              // ensure html5 data prefix is stripped
              attributeName = attributeName.substr(5);
            }
            attributeName = attributeName.substr(15);
            iElement.attr(attributeName, value);
          }
        };

        if (translateValuesExist || translateValueExist || iAttr.translateDefault) {
          scope.$watch('interpolateParams', updateTranslations, true);
        }

        // Replaced watcher on translateLanguage with event listener
        scope.$on('translateLanguageChanged', updateTranslations);

        // Ensures the text will be refreshed after the current language was changed
        // w/ $translate.use(...)
        var unbind = $rootScope.$on('$translateChangeSuccess', updateTranslations);

        // ensure translation will be looked up at least one
        if (iElement.text().length) {
          if (iAttr.translate) {
            observeElementTranslation(iAttr.translate);
          } else {
            observeElementTranslation('');
          }
        } else if (iAttr.translate) {
          // ensure attribute will be not skipped
          observeElementTranslation(iAttr.translate);
        }
        updateTranslations();
        scope.$on('$destroy', unbind);
      };
    }
  };
}

/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function getTranslateNamespace(scope) {
  'use strict';
  if (scope.translateNamespace) {
    return scope.translateNamespace;
  }
  if (scope.$parent) {
    return getTranslateNamespace(scope.$parent);
  }
}

translateDirective.displayName = 'translateDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translate-attr
 * @restrict A
 *
 * @description
 * Translates attributes like translate-attr-ATTR, but with an object like ng-class.
 * Internally it uses `translate` service to translate translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate-attr Object literal mapping attributes to translation ids.
 * @param {string=} translate-values Values to pass into the translation ids. Can be passed as object literal string.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <input translate-attr="{ placeholder: translationId, title: 'WITH_VALUES' }" translate-values="{value: 5}" />

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}',
        }).preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
    <file name="scenario.js">
      it('should translate', function () {
        inject(function ($rootScope, $compile) {
          $rootScope.translationId = 'TRANSLATION_ID';

          element = $compile('<input translate-attr="{ placeholder: translationId, title: 'WITH_VALUES' }" translate-values="{ value: 5 }" />')($rootScope);
          $rootScope.$digest();
          expect(element.attr('placeholder)).toBe('Hello there!');
          expect(element.attr('title)).toBe('The following value is dynamic: 5');
        });
      });
    </file>
   </example>
 */
.directive('translateAttr', translateAttrDirective);
function translateAttrDirective($translate, $rootScope) {

  'use strict';

  return {
    restrict: 'A',
    priority: $translate.directivePriority(),
    link: function linkFn(scope, element, attr) {

      var translateAttr,
          translateValues,
          previousAttributes = {};

      // Main update translations function
      var updateTranslations = function () {
        angular.forEach(translateAttr, function (translationId, attributeName) {
          if (!translationId) {
            return;
          }
          previousAttributes[attributeName] = true;

          // if translation id starts with '.' and translateNamespace given, prepend namespace
          if (scope.translateNamespace && translationId.charAt(0) === '.') {
            translationId = scope.translateNamespace + translationId;
          }
          $translate(translationId, translateValues, attr.translateInterpolation, undefined, scope.translateLanguage)
            .then(function (translation) {
              element.attr(attributeName, translation);
            }, function (translationId) {
              element.attr(attributeName, translationId);
            });
        });

        // Removing unused attributes that were previously used
        angular.forEach(previousAttributes, function (flag, attributeName) {
          if (!translateAttr[attributeName]) {
            element.removeAttr(attributeName);
            delete previousAttributes[attributeName];
          }
        });
      };

      // Watch for attribute changes
      watchAttribute(
        scope,
        attr.translateAttr,
        function (newValue) { translateAttr = newValue; },
        updateTranslations
      );
      // Watch for value changes
      watchAttribute(
        scope,
        attr.translateValues,
        function (newValue) { translateValues = newValue; },
        updateTranslations
      );

      if (attr.translateValues) {
        scope.$watch(attr.translateValues, updateTranslations, true);
      }

      // Replaced watcher on translateLanguage with event listener
      scope.$on('translateLanguageChanged', updateTranslations);

      // Ensures the text will be refreshed after the current language was changed
      // w/ $translate.use(...)
      var unbind = $rootScope.$on('$translateChangeSuccess', updateTranslations);

      updateTranslations();
      scope.$on('$destroy', unbind);
    }
  };
}

function watchAttribute(scope, attribute, valueCallback, changeCallback) {
  'use strict';
  if (!attribute) {
    return;
  }
  if (attribute.substr(0, 2) === '::') {
    attribute = attribute.substr(2);
  } else {
    scope.$watch(attribute, function(newValue) {
      valueCallback(newValue);
      changeCallback();
    }, true);
  }
  valueCallback(scope.$eval(attribute));
}

translateAttrDirective.displayName = 'translateAttrDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateCloak
 * @requires $rootScope
 * @requires $translate
 * @restrict A
 *
 * $description
 * Adds a `translate-cloak` class name to the given element where this directive
 * is applied initially and removes it, once a loader has finished loading.
 *
 * This directive can be used to prevent initial flickering when loading translation
 * data asynchronously.
 *
 * The class name is defined in
 * {@link pascalprecht.translate.$translateProvider#cloakClassName $translate.cloakClassName()}.
 *
 * @param {string=} translate-cloak If a translationId is provided, it will be used for showing
 *                                  or hiding the cloak. Basically it relies on the translation
 *                                  resolve.
 */
.directive('translateCloak', translateCloakDirective);

function translateCloakDirective($translate, $rootScope) {

  'use strict';

  return {
    compile: function (tElement) {
      var applyCloak = function () {
        tElement.addClass($translate.cloakClassName());
      },
      removeCloak = function () {
        tElement.removeClass($translate.cloakClassName());
      };
      $translate.onReady(function () {
        removeCloak();
      });
      applyCloak();

      return function linkFn(scope, iElement, iAttr) {
        if (iAttr.translateCloak && iAttr.translateCloak.length) {
          // Register a watcher for the defined translation allowing a fine tuned cloak
          iAttr.$observe('translateCloak', function (translationId) {
            $translate(translationId).then(removeCloak, applyCloak);
          });
          // Register for change events as this is being another indicicator revalidating the cloak)
          $rootScope.$on('$translateChangeSuccess', function () {
            $translate(iAttr.translateCloak).then(removeCloak, applyCloak);
          });
        }
      };
    }
  };
}

translateCloakDirective.displayName = 'translateCloakDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateNamespace
 * @restrict A
 *
 * @description
 * Translates given translation id either through attribute or DOM content.
 * Internally it uses `translate` filter to translate translation id. It possible to
 * pass an optional `translate-values` object literal as string into translation id.
 *
 * @param {string=} translate namespace name which could be either string or interpolated string.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div translate-namespace="CONTENT">

        <div>
            <h1 translate>.HEADERS.TITLE</h1>
            <h1 translate>.HEADERS.WELCOME</h1>
        </div>

        <div translate-namespace=".HEADERS">
            <h1 translate>.TITLE</h1>
            <h1 translate>.WELCOME</h1>
        </div>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en',{
          'TRANSLATION_ID': 'Hello there!',
          'CONTENT': {
            'HEADERS': {
                TITLE: 'Title'
            }
          },
          'CONTENT.HEADERS.WELCOME': 'Welcome'
        }).preferredLanguage('en');

      });

    </file>
   </example>
 */
.directive('translateNamespace', translateNamespaceDirective);

function translateNamespaceDirective() {

  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function () {
      return {
        pre: function (scope, iElement, iAttrs) {
          scope.translateNamespace = getTranslateNamespace(scope);

          if (scope.translateNamespace && iAttrs.translateNamespace.charAt(0) === '.') {
            scope.translateNamespace += iAttrs.translateNamespace;
          } else {
            scope.translateNamespace = iAttrs.translateNamespace;
          }
        }
      };
    }
  };
}

/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function getTranslateNamespace(scope) {
  'use strict';
  if (scope.translateNamespace) {
    return scope.translateNamespace;
  }
  if (scope.$parent) {
    return getTranslateNamespace(scope.$parent);
  }
}

translateNamespaceDirective.displayName = 'translateNamespaceDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc directive
 * @name pascalprecht.translate.directive:translateLanguage
 * @restrict A
 *
 * @description
 * Forces the language to the directives in the underlying scope.
 *
 * @param {string=} translate language that will be negotiated.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div>

        <div>
            <h1 translate>HELLO</h1>
        </div>

        <div translate-language="de">
            <h1 translate>HELLO</h1>
        </div>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider
          .translations('en',{
            'HELLO': 'Hello world!'
          })
          .translations('de',{
            'HELLO': 'Hallo Welt!'
          })
          .preferredLanguage('en');

      });

    </file>
   </example>
 */
.directive('translateLanguage', translateLanguageDirective);

function translateLanguageDirective() {

  'use strict';

  return {
    restrict: 'A',
    scope: true,
    compile: function () {
      return function linkFn(scope, iElement, iAttrs) {

        iAttrs.$observe('translateLanguage', function (newTranslateLanguage) {
          scope.translateLanguage = newTranslateLanguage;
        });

        scope.$watch('translateLanguage', function(){
          scope.$broadcast('translateLanguageChanged');
        });
      };
    }
  };
}

translateLanguageDirective.displayName = 'translateLanguageDirective';

angular.module('pascalprecht.translate')
/**
 * @ngdoc filter
 * @name pascalprecht.translate.filter:translate
 * @requires $parse
 * @requires pascalprecht.translate.$translate
 * @function
 *
 * @description
 * Uses `$translate` service to translate contents. Accepts interpolate parameters
 * to pass dynamized values though translation.
 *
 * @param {string} translationId A translation id to be translated.
 * @param {*=} interpolateParams Optional object literal (as hash or string) to pass values into translation.
 *
 * @returns {string} Translated text.
 *
 * @example
   <example module="ngView">
    <file name="index.html">
      <div ng-controller="TranslateCtrl">

        <pre>{{ 'TRANSLATION_ID' | translate }}</pre>
        <pre>{{ translationId | translate }}</pre>
        <pre>{{ 'WITH_VALUES' | translate:'{value: 5}' }}</pre>
        <pre>{{ 'WITH_VALUES' | translate:values }}</pre>

      </div>
    </file>
    <file name="script.js">
      angular.module('ngView', ['pascalprecht.translate'])

      .config(function ($translateProvider) {

        $translateProvider.translations('en', {
          'TRANSLATION_ID': 'Hello there!',
          'WITH_VALUES': 'The following value is dynamic: {{value}}'
        });
        $translateProvider.preferredLanguage('en');

      });

      angular.module('ngView').controller('TranslateCtrl', function ($scope) {
        $scope.translationId = 'TRANSLATION_ID';

        $scope.values = {
          value: 78
        };
      });
    </file>
   </example>
 */
.filter('translate', translateFilterFactory);

function translateFilterFactory($parse, $translate) {

  'use strict';

  var translateFilter = function (translationId, interpolateParams, interpolation, forceLanguage) {
    if (!angular.isObject(interpolateParams)) {
      interpolateParams = $parse(interpolateParams)(this);
    }

    return $translate.instant(translationId, interpolateParams, interpolation, forceLanguage);
  };

  if ($translate.statefulFilter()) {
    translateFilter.$stateful = true;
  }

  return translateFilter;
}

translateFilterFactory.displayName = 'translateFilterFactory';

angular.module('pascalprecht.translate')

/**
 * @ngdoc object
 * @name pascalprecht.translate.$translationCache
 * @requires $cacheFactory
 *
 * @description
 * The first time a translation table is used, it is loaded in the translation cache for quick retrieval. You
 * can load translation tables directly into the cache by consuming the
 * `$translationCache` service directly.
 *
 * @return {object} $cacheFactory object.
 */
  .factory('$translationCache', $translationCache);

function $translationCache($cacheFactory) {

  'use strict';

  return $cacheFactory('translations');
}

$translationCache.displayName = '$translationCache';
return 'pascalprecht.translate';

}));

/*!
 * angular-translate - v2.13.1 - 2016-12-06
 * 
 * Copyright (c) 2016 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

$translateStaticFilesLoader.$inject = ['$q', '$http'];
angular.module('pascalprecht.translate')
/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateStaticFilesLoader
 * @requires $q
 * @requires $http
 *
 * @description
 * Creates a loading function for a typical static file url pattern:
 * "lang-en_US.json", "lang-de_DE.json", etc. Using this builder,
 * the response of these urls must be an object of key-value pairs.
 *
 * @param {object} options Options object, which gets prefix, suffix, key, and fileMap
 */
.factory('$translateStaticFilesLoader', $translateStaticFilesLoader);

function $translateStaticFilesLoader($q, $http) {

  'use strict';

  return function (options) {

    if (!options || (!angular.isArray(options.files) && (!angular.isString(options.prefix) || !angular.isString(options.suffix)))) {
      throw new Error('Couldn\'t load static files, no files and prefix or suffix specified!');
    }

    if (!options.files) {
      options.files = [{
        prefix: options.prefix,
        suffix: options.suffix
      }];
    }

    var load = function (file) {
      if (!file || (!angular.isString(file.prefix) || !angular.isString(file.suffix))) {
        throw new Error('Couldn\'t load static file, no prefix or suffix specified!');
      }

      var fileUrl = [
        file.prefix,
        options.key,
        file.suffix
      ].join('');

      if (angular.isObject(options.fileMap) && options.fileMap[fileUrl]) {
        fileUrl = options.fileMap[fileUrl];
      }

      return $http(angular.extend({
        url: fileUrl,
        method: 'GET',
        params: ''
      }, options.$http))
        .then(function(result) {
          return result.data;
        }, function () {
          return $q.reject(options.key);
        });
    };

    var promises = [],
        length = options.files.length;

    for (var i = 0; i < length; i++) {
      promises.push(load({
        prefix: options.files[i].prefix,
        key: options.key,
        suffix: options.files[i].suffix
      }));
    }

    return $q.all(promises)
      .then(function (data) {
        var length = data.length,
            mergedData = {};

        for (var i = 0; i < length; i++) {
          for (var key in data[i]) {
            mergedData[key] = data[i][key];
          }
        }

        return mergedData;
      });
  };
}

$translateStaticFilesLoader.displayName = '$translateStaticFilesLoader';
return 'pascalprecht.translate';

}));

"use strict";
/* global angular, window */

/**
 * Reimplementation of $translateStaticFilesLoader to handle missing files and locale hierarchy (en/en_US)
 */
angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader", [
  "$q",
  "$http",
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
        if(options.key.indexOf("_") >= 0) {
          var key = options.key.substr(0, options.key.lastIndexOf("_"));
          var opts = angular.extend({}, options, { key: key });
          
          loadTranslationFile(opts, deferred);
        }
        else {
          deferred.resolve("{}");
        }
        
      });
    }

    return function(options) {
      if (!options || (!angular.isString(options.prefix) || !angular.isString(options.suffix))) {
        throw new Error("Couldn\"t load static files, no prefix or suffix specified!");
      }

      var deferred = $q.defer();

      loadTranslationFile(options, deferred);

      return deferred.promise;
    };
  }
]);

angular.module("risevision.common.i18n", ["pascalprecht.translate", "risevision.common.i18n.config"])
.config(["$translateProvider", "LOCALES_PREFIX", "LOCALES_SUFIX", function ($translateProvider, LOCALES_PREFIX, LOCALES_SUFIX) {
  // Tries to determine the browsers locale
  $translateProvider.useStaticFilesLoader({
    prefix: LOCALES_PREFIX,
    suffix: LOCALES_SUFIX
  });
  
  $translateProvider
    .determinePreferredLanguage()
    .fallbackLanguage("en")
    .useSanitizeValueStrategy(null);
}]);

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
    .value("APPS_URL", "https://apps.risevision.com");
})(angular);
