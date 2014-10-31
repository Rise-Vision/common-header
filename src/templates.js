(function(module) {
try { app = angular.module("risevision.common.header.templates"); }
catch(err) { app = angular.module("risevision.common.header.templates", []); }
app.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("auth-buttons-menu.html",
    "<li class=\"dropdown-header dropdown-title\">\n" +
    "  <span class=\"user-full-name\">{{profile.firstName}} {{profile.lastName}}</span>\n" +
    "</li>\n" +
    "<li class=\"dropdown-header\">\n" +
    "  {{profile.email}}\n" +
    "</li>\n" +
    "<li class=\"divider\" ng-show=\"isRiseVisionUser\"></li>\n" +
    "<li ng-show=\"isRiseVisionUser\">\n" +
    "  <a href=\"\" ng-click=\"userSettings()\" class=\"user-settings-button action\">\n" +
    "    <i class=\"fa fa-cogs\"></i>\n" +
    "    <span class=\"item-name\">User Settings</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li class=\"divider\" ng-show=\"isRiseVisionUser\"></li>\n" +
    "<li class=\"divider\" ng-show=\"false\"></li>\n" +
    "<li ng-show=\"false\">\n" +
    "  <a href=\"\" class=\"action\" ng-click=\"paymentMethods()\">\n" +
    "    <i class=\"fa fa-usd\"></i>\n" +
    "    <span class=\"item-name\">Payment Methods</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-show=\"isLoggedIn\">\n" +
    "  <a href=\"\" ng-click=\"logout()\" class=\"sign-out-button action\">\n" +
    "    <i class=\"fa fa-sign-out\"></i>\n" +
    "    <span class=\"item-name\">Sign Out</span>\n" +
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
    "  class=\"dropdown user-profile-dropdown desktop-menu-item\"\n" +
    "  ng-class=\"{'hidden-xs': isLoggedIn}\"\n" +
    "  ng-show=\"isLoggedIn\"\n" +
    "  >\n" +
    "    <a href=\"\" class=\"dropdown-toggle\">\n" +
    "      <img ng-src=\"{{userPicture}}\"\n" +
    "        class=\"profile-pic\" width=\"30\" height=\"30\" alt=\"User\" />\n" +
    "    </a>\n" +
    "    <ul class=\"dropdown-menu\">\n" +
    "      <ng-include\n" +
    "        src=\"'auth-buttons-menu.html'\"\n" +
    "        replace-include\n" +
    "      ></ng-include>\n" +
    "    </ul>\n" +
    "</li>\n" +
    "<!-- Mobile -->\n" +
    "<li\n" +
    "  ng-class=\"{'visible-xs-inline-block': isLoggedIn}\"\n" +
    "  ng-show=\"isLoggedIn\"\n" +
    "  class=\" mobile-menu-item\"\n" +
    "  >\n" +
    "    <a href=\"\" class=\"dropdown-toggle\" action-sheet=\"'auth-buttons-menu.html'\">\n" +
    "      <img ng-src=\"{{userPicture}}\"\n" +
    "        class=\"profile-pic\" width=\"30\" height=\"30\" alt=\"User\" />\n" +
    "    </a>\n" +
    "</li>\n" +
    "<!-- If User NOT Authenticated -->\n" +
    "<li ng-show=\"!undetermined && isLoggedIn === false\">\n" +
    "  <button type=\"button\" class=\"sign-in top-auth-button\" ng-click=\"login()\">\n" +
    "    Sign In <img src=\"//rise-vision.github.io/style-guide/img/avatar_2x.jpg\">\n" +
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
    "			  href=\"http://www.risevision.com/\" target=\"_blank\" ng-if=\"!inRVAFrame\">\n" +
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
    "				<li class=\"dropdown\" ng-show=\"false\">\n" +
    "					<a href=\"\" class=\"dropdown-toggle\">\n" +
    "						<i class=\"fa fa-th\"></i>\n" +
    "					</a>\n" +
    "					<ul class=\"dropdown-menu company-menu\">\n" +
    "						<li class=\"dropdown-header dropdown-title\">\n" +
    "							Current App\n" +
    "						</li>\n" +
    "						<li class=\"dropdown-header\">\n" +
    "							<i class=\"fa fa-tags\"></i> Store\n" +
    "						</li>\n" +
    "						<li class=\"divider\"></li>\n" +
    "						<li>\n" +
    "							<div class=\"menu-box pull-left\">\n" +
    "								<a href=\"\">\n" +
    "									<i class=\"fa fa-photo\"></i>\n" +
    "									<span>Displays</span>\n" +
    "								</a>\n" +
    "							</div>\n" +
    "							<div class=\"menu-box pull-right\">\n" +
    "								<a href=\"\">\n" +
    "									<i class=\"fa fa-photo\"></i>\n" +
    "									<span>Scheduler</span>\n" +
    "								</a>\n" +
    "							</div>\n" +
    "						</li>\n" +
    "						<li>\n" +
    "							<div class=\"menu-box pull-left\">\n" +
    "								<a href=\"\">\n" +
    "									<i class=\"fa fa-photo\"></i>\n" +
    "									<span>Editor</span>\n" +
    "								</a>\n" +
    "							</div>\n" +
    "							<div class=\"menu-box pull-right\">\n" +
    "								<a href=\"\">\n" +
    "									<i class=\"fa fa-photo\"></i>\n" +
    "									<span>Storage</span>\n" +
    "								</a>\n" +
    "							</div>\n" +
    "						</li>\n" +
    "						<li>\n" +
    "							<div class=\"menu-box pull-left\">\n" +
    "								<a href=\"\">\n" +
    "									<i class=\"fa fa-photo\"></i>\n" +
    "									<span>Bulletin</span>\n" +
    "								</a>\n" +
    "							</div>\n" +
    "							<div class=\"menu-box pull-right\">\n" +
    "								<a href=\"\">\n" +
    "									<i class=\"fa fa-photo\"></i>\n" +
    "									<span>Player</span>\n" +
    "								</a>\n" +
    "							</div>\n" +
    "						</li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "				<!-- END Current App -->\n" +
    "				<!-- Company Dropdown -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "				  ng-controller=\"CompanyButtonsCtrl\"\n" +
    "					src=\"'company-buttons.html'\"\n" +
    "				></ng-include>\n" +
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
    "						<a ng-href=\"{{opt.link}}\" target=\"{{opt.target}}\">{{opt.title}}</a>\n" +
    "					</li>\n" +
    "					<li ng-if=\"!inRVAFrame\">\n" +
    "						<a href=\"http://www.risevision.com/help/\" target=\"_blank\">\n" +
    "							Help\n" +
    "						</a>\n" +
    "					</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "			<!-- END Nav Links -->\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<ng-include\n" +
    "		replace-include\n" +
    "		ng-controller=\"SubcompanyBannerCtrl\"\n" +
    "		src=\"'subcompany-banner.html'\"></ng-include>\n" +
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
    "		<li>\n" +
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
    "<li class=\"dropdown-header dropdown-title\"\n" +
    "  ng-show=\"isRiseVisionUser\">\n" +
    "  Current Company\n" +
    "</li>\n" +
    "<li class=\"dropdown-header\" ng-show=\"isRiseVisionUser\">\n" +
    "  <!-- home -->\n" +
    "  <i ng-show=\"!isSubcompanySelected\" class=\"fa fa-home\"></i>\n" +
    "  <!-- warning -->\n" +
    "  <i ng-show=\"isSubcompanySelected\" class=\"fa fa-warning glyphicon-danger\"></i>\n" +
    "  {{selectedCompanyName}}\n" +
    "  <div ng-show=\"isSubcompanySelected\" class=\"danger\">This is a Sub-Company of your Company.</div>\n" +
    "</li>\n" +
    "<li ng-show=\"isSubcompanySelected\" class=\"divider\"></li>\n" +
    "<li ng-show=\"isSubcompanySelected\">\n" +
    "  <a href=\"\" ng-click=\"resetCompany()\" class=\"action\">\n" +
    "    <i class=\"fa fa-home\"></i>\n" +
    "    <span class=\"item-name\">Switch To My Company</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li class=\"divider\"></li>\n" +
    "<li ng-show=\"isRiseVisionUser && !isSubcompanySelected\">\n" +
    "  <a href=\"\" ng-click=\"switchCompany()\" class=\"action select-subcompany-menu-button\">\n" +
    "    <i class=\"fa fa-share-square-o\"></i>\n" +
    "    <span class=\"item-name\">Select Sub-Company</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-show=\"isUserAdmin || isRiseAdmin\" class=\"divider\"></li>\n" +
    "<li ng-show=\"isUserAdmin || isRiseAdmin\">\n" +
    "  <a href=\"\" ng-click=\"addSubCompany()\" class=\"action add-subcompany-menu-button\">\n" +
    "    <i class=\"fa fa-plus\"></i>\n" +
    "    <span class=\"item-name\">Add Sub-Company</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-show=\"isUserAdmin || isRiseAdmin\" class=\"divider\"></li>\n" +
    "<li ng-show=\"isUserAdmin || isRiseAdmin\">\n" +
    "  <a href=\"\" ng-click=\"companySettings()\" class=\"action company-settings-menu-button\">\n" +
    "    <i class=\"fa fa-cog\"></i>\n" +
    "    <span class=\"item-name\">Company Settings</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-show=\"isUserAdmin || isRiseAdmin\" class=\"divider\"></li>\n" +
    "<li ng-show=\"isUserAdmin || isRiseAdmin\">\n" +
    "  <a href=\"\" data-toggle=\"modal\" ng-click=\"companyUsers()\" class=\"action company-users-menu-button\">\n" +
    "    <i class=\"fa fa-users\"></i>\n" +
    "    <span class=\"item-name\">Company Users</span>\n" +
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
  $templateCache.put("company-buttons.html",
    "<!-- Desktop and tablet -->\n" +
    "<li class=\"dropdown hidden-xs\" ng-show=\"isRiseVisionUser && !inRVAFrame\">\n" +
    "  <a href=\"\" class=\"dropdown-toggle company-buttons-icon\">\n" +
    "    <i class=\"fa fa-cog\"></i>\n" +
    "  </a>\n" +
    "  <ul class=\"dropdown-menu\">\n" +
    "    <ng-include\n" +
    "      replace-include\n" +
    "      src=\"'company-buttons-menu.html'\"\n" +
    "    ></ng-include>\n" +
    "  </ul>\n" +
    "</li>\n" +
    "\n" +
    "<!-- Mobile -->\n" +
    "<li\n" +
    " ng-show=\"isRiseVisionUser && !inRVAFrame\"\n" +
    " ng-class=\"{'visible-xs-inline-block': isRiseVisionUser}\">\n" +
    "  <a href=\"\" class=\"company-buttons-icon-mobile\"\n" +
    "    action-sheet=\"'company-buttons-menu.html'\">\n" +
    "    <i class=\"fa fa-cog\"></i>\n" +
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
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-street\">\n" +
    "    Street\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-street\" type=\"text\" class=\"form-control\" ng-model=\"company.street\" />\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-unit\">\n" +
    "    Unit\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-unit\" type=\"text\" class=\"form-control\" ng-model=\"company.unit\" />\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-city\">\n" +
    "    City\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-city\" type=\"text\" class=\"form-control\" ng-model=\"company.city\" />\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-country\">\n" +
    "    Country\n" +
    "  </label>\n" +
    "  <select id=\"company-settings-country\" class=\"form-control selectpicker\"\n" +
    "    ng-model=\"company.country\" ng-options=\"c[1] as c[0] for c in countries\">\n" +
    "    <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "  </select>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-state\">\n" +
    "    State / Province\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-state\" type=\"text\" class=\"form-control\" ng-model=\"company.province\" ng-hide=\"company.country == 'US' || company.country == 'CA'\" />\n" +
    "  <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"company.country == 'CA'\">\n" +
    "    <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "  </select>\n" +
    "  <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"company.country == 'US'\">\n" +
    "    <option value=\"\">&lt; Select State &gt;</option>\n" +
    "  </select>\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-zip\">\n" +
    "    Zip / Postal Code\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-zip\" type=\"text\" class=\"form-control\" ng-model=\"company.postalCode\" />\n" +
    "</div>\n" +
    "<div class=\"form-group\">\n" +
    "  <label for=\"company-settings-phone\">\n" +
    "    Phone\n" +
    "  </label>\n" +
    "  <input id=\"company-settings-phone\" type=\"tel\" class=\"form-control\" ng-model=\"company.telephone\"/>\n" +
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
    "		<button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">Cancel\n" +
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
    "      <a class=\"action-link\" href=\"\" ng-click=\"resetAuthKey()\">Reset</a>\n" +
    "      <div>\n" +
    "        {{company.authKey}}\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Claim ID\n" +
    "      </label>\n" +
    "      <a class=\"action-link\" href=\"\" ng-click=\"resetClaimId()\">Reset</a>\n" +
    "      <div>\n" +
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
    "    <button type=\"button\"\n" +
    "      class=\"btn btn-success btn-fixed-width\" ng-click=\"save()\"\n" +
    "      ng-disabled=\"forms.companyForm.$invalid\">Save\n" +
    "      <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-fixed-width delete-company-button\"\n" +
    "    ng-show=\"!isDeletingCompany\" ng-click=\"deleteCompany()\">\n" +
    "      Delete <i class=\"fa fa-white fa-trash-o icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-confirm-delete\" data-dismiss=\"modal\" ng-show=\"isDeletingCompany\" ng-click=\"closeModal()\">\n" +
    "      Confirm Deletion <i class=\"fa fa-white fa-warning icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\"\n" +
    "      class=\"btn btn-primary btn-fixed-width close-company-settings-button\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Cancel\n" +
    "      <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "    </button>\n" +
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
    "  <button type=\"button\" class=\"btn btn-primary close-company-users-button\"\n" +
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
  $templateCache.put("credit-cards-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"pay-now-label\" class=\"modal-title\">Credit Cards</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" ng-scroll-event=\"handleScroll($event, isEndEvent)\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"card-number\">Card Number</label>\n" +
    "      <input id=\"card-number\" data-stripe=\"number\" class=\"form-control\" type=\"text\" ng-model=\"card.number\"/>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"card-name\">Cardholder Name</label>\n" +
    "      <input id=\"card-name\" data-stripe=\"name\" class=\"form-control\" type=\"text\" ng-model=\"card.name\"/>\n" +
    "    </div>\n" +
    "    <div class=\"row form-group\">\n" +
    "      <div class=\"col-md-3\">\n" +
    "        <label for=\"expiry-month\">Exp. Month</label>\n" +
    "        <select id=\"expiry-month\" data-stripe=\"exp-month\" class=\"form-control selectpicker\" ng-model=\"card.expMonth\">\n" +
    "          <option value=\"1\">01</option>\n" +
    "          <option value=\"2\">02</option>\n" +
    "          <option value=\"3\">03</option>\n" +
    "          <option value=\"4\" selected>04</option>\n" +
    "          <option value=\"5\">05</option>\n" +
    "          <option value=\"6\">06</option>\n" +
    "          <option value=\"7\">07</option>\n" +
    "          <option value=\"8\">08</option>\n" +
    "          <option value=\"9\">09</option>\n" +
    "          <option value=\"10\">10</option>\n" +
    "          <option value=\"11\">11</option>\n" +
    "          <option value=\"12\">12</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-3\">\n" +
    "        <label for=\"expiry-year\">Exp. Year</label>\n" +
    "        <select id=\"expiry-year\" data-stripe=\"exp-year\" class=\"form-control selectpicker\" ng-model=\"card.expYear\">\n" +
    "          <option value=\"2014\" selected>2014</option>\n" +
    "          <option value=\"2015\">2015</option>\n" +
    "          <option value=\"2016\">2016</option>\n" +
    "          <option value=\"2017\">2017</option>\n" +
    "          <option value=\"2018\">2018</option>\n" +
    "          <option value=\"2019\">2019</option>\n" +
    "          <option value=\"2020\">2020</option>\n" +
    "          <option value=\"2021\">2021</option>\n" +
    "          <option value=\"2022\">2022</option>\n" +
    "          <option value=\"2023\">2023</option>\n" +
    "          <option value=\"2024\">2024</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-3\">\n" +
    "        <label for=\"cvc\">Security Code</label>\n" +
    "        <input id=\"cvc\" data-stripe=\"cvc\" class=\"form-control\" type=\"text\" size=\"4\" ng-model=\"card.cvc\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- Address -->\n" +
    "    <h3>Billing Address</h3>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"street\">Street</label>\n" +
    "      <input id=\"street\" type=\"text\" class=\"form-control\" ng-model=\"addr.address1\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"unit\">Street (Line 2)</label>\n" +
    "      <input id=\"unit\" type=\"text\" class=\"form-control\" ng-model=\"addr.address2\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"city\">City</label>\n" +
    "      <input id=\"city\" type=\"text\" class=\"form-control\" ng-model=\"addr.city\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"country\">Country</label>\n" +
    "      <select id=\"country\" class=\"form-control selectpicker\" ng-model=\"addr.country\" ng-options=\"c[1] as c[0] for c in countries\">\n" +
    "        <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"province\">State / Province</label>\n" +
    "      <!-- <input id=\"province\" type=\"text\" class=\"form-control\" ng-model=\"addr.province\" ng-hide=\"addr.country == 'US' || addr.country == 'CA'\" /> -->\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"addr.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"addr.country == 'CA'\">\n" +
    "        <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <!-- <select class=\"form-control selectpicker\" ng-model=\"addr.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"addr.country == 'US'\">\n" +
    "        <option value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select> -->\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"zip\">Zip / Postal Code</label>\n" +
    "      <input id=\"zip\" type=\"text\" class=\"form-control\" ng-model=\"addr.postalCode\" />\n" +
    "    </div>\n" +
    "    <!-- End Address-->\n" +
    "    <div class=\"form-group danger\" ng-show=\"isDeletingCard\">\n" +
    "      Warning! If you delete this credit card from your account all subscription renewals paid on this card will fail at the time of renewal resulting in potential loss of service. Please confirm you wish to proceed with deleting this card by typing \"DELETE\" into the box below and clicking on the Confirm Deletion button.\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-4\">\n" +
    "          <input type=\"text\" class=\"form-control\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-3\">\n" +
    "      <a href=\"https://stripe.com/\" target=\"_blank\">\n" +
    "        <img src=\"img/powered-by-stripe.png\" class=\"stripe\" width=\"119\" height=\"26\" alt=\"Powered by Stripe\">\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "      <button type=\"button\" class=\"btn btn-success btn-fixed-width\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Save\n" +
    "        <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-danger btn-fixed-width\" ng-show=\"!isDeletingCard\" ng-click=\"deleteCard()\">\n" +
    "        Delete <i class=\"fa fa-white fa-trash-o icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-danger btn-confirm-delete\" data-dismiss=\"modal\" ng-show=\"isDeletingCard\" ng-click=\"closeModal()\">\n" +
    "        Confirm Deletion <i class=\"fa fa-white fa-warning icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Cancel\n" +
    "        <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "      </button>\n" +
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
    "  <button type=\"button\" class=\"btn btn-primary close-move-company-button\" data-dismiss=\"modal\" ng-click=\"closeModal()\">\n" +
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
  $templateCache.put("payment-methods-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"user-settings-label\" class=\"modal-title\">Payment Methods</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"list-group\">\n" +
    "      <div class=\"row list-group-item\">\n" +
    "        <div class=\"col-sm-10\">\n" +
    "          Visa - 123\n" +
    "          <span class=\"expiry\">Expires - 02/15</span>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-2 edit\">\n" +
    "          <a href=\"\" ng-click=\"creditCards()\">\n" +
    "            Edit\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row list-group-item\">\n" +
    "        <div class=\"col-sm-10\">\n" +
    "          Amex - 123\n" +
    "          <span class=\"expiry\">Expires - 02/15</span>\n" +
    "        </div>\n" +
    "        <div class=\"col-sm-2 edit\">\n" +
    "          <a href=\"\" ng-click=\"creditCards()\">\n" +
    "            Edit\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-sm-3 stripe\">\n" +
    "      <a href=\"https://stripe.com/\" target=\"_blank\">\n" +
    "        <img src=\"img/powered-by-stripe.png\" width=\"119\" height=\"26\" alt=\"Powered by Stripe\">\n" +
    "      </a>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-9\">\n" +
    "      <button type=\"button\" class=\"btn btn-primary\" ng-click=\"closeModal()\">\n" +
    "        Cancel <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "      </button>\n" +
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
    "      <button type=\"button\" class=\"btn btn-primary btn-fixed-width registration-cancel-button\"\n" +
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
    "<li class=\"shopping-cart\" ng-show=\"isRiseVisionUser\">\n" +
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
  $templateCache.put("subcompany-banner.html",
    "<div ng-show=\"isSubcompanySelected && !inRVAFrame\"\n" +
    "  class=\"sub-company-alert\">\n" +
    "  You're in Sub-Company {{selectedCompanyName}}&nbsp;\n" +
    "  <a href=\"#\" ng-click=\"switchToMyCompany()\">Switch to My Company</a>\n" +
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
    "  <button type=\"button\" class=\"btn btn-primary btn-fixed-width cancel-add-subcompany-button\" ng-click=\"closeModal()\">Cancel\n" +
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
    "<li class=\"dropdown-header dropdown-title system-message\">\n" +
    "  System Message\n" +
    "</li>\n" +
    "<li class=\"divider\"></li>\n" +
    "<li class=\"system-message\"\n" +
    "  ng-repeat=\"message in messages\"\n" +
    "  ng-bind-html=\"renderHtml(message.text)\">\n" +
    "</li>\n" +
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
    "<li class=\"dropdown system-messages hidden-xs\"\n" +
    "ng-show=\"isRiseVisionUser && messages.length > 0\">\n" +
    "  <a href=\"\" class=\"dropdown-toggle system-messages-button\">\n" +
    "    <i class=\"fa fa-bell\"></i>\n" +
    "    <span class=\"label label-danger system-messages-badge\">{{messages.length | surpressZero}}</span>\n" +
    "  </a>\n" +
    "  <ul class=\"dropdown-menu system-messages\">\n" +
    "    <ng-include\n" +
    "      src=\"'system-messages-button-menu.html'\"\n" +
    "    ></ng-include>\n" +
    "  </ul>\n" +
    "</li>\n" +
    "\n" +
    "<!-- Mobile -->\n" +
    "<li\n" +
    "  class=\"system-messages\"\n" +
    "  ng-show=\"isRiseVisionUser  && messages.length > 0\"\n" +
    "  ng-class=\"{'visible-xs-inline-block': isRiseVisionUser}\">\n" +
    "    <a href=\"\"\n" +
    "      class=\"system-messages-button\"\n" +
    "      action-sheet=\"'system-messages-button-menu.html'\">\n" +
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
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-first-name\">\n" +
    "        First Name\n" +
    "      </label>\n" +
    "      <input id=\"user-settings-first-name\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"user.firstName\"\n" +
    "        />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-last-name\">\n" +
    "        Last Name\n" +
    "      </label>\n" +
    "      <input id=\"user-settings-last-name\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"user.lastName\"\n" +
    "        />\n" +
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
    "			<label for=\"user-settings-status\">\n" +
    "				Status\n" +
    "			</label>\n" +
    "			<select id=\"user-settings-status\"\n" +
    "        class=\"form-control selectpicker\" ng-model=\"user.status\">\n" +
    "				<option value=\"1\">Active</option>\n" +
    "				<option value=\"0\">Inactive</option>\n" +
    "			</select>\n" +
    "		</div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <!-- Save -->\n" +
    "  <button type=\"button\"\n" +
    "    class=\"btn btn-success btn-fixed-width\"\n" +
    "    data-dismiss=\"modal\"\n" +
    "    ng-click=\"save()\" id=\"save-button\">\n" +
    "    Save <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "  </button><!-- Cancel\n" +
    "  --><button type=\"button\" class=\"btn btn-danger btn-fixed-width\"\n" +
    "    ng-if=\"!isAdd\" ng-click=\"deleteUser()\">\n" +
    "		Delete <i class=\"fa fa-white fa-trash-o icon-right\"></i>\n" +
    "	</button><!-- Delete\n" +
    "   --><button type=\"button\" class=\"btn btn-primary btn-fixed-width\" ng-click=\"closeModal()\">\n" +
    "    Cancel <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "  </button>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);
})();
