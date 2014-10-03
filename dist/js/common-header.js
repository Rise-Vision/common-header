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
    "<li class=\"divider\" ng-show=\"isLoggedIn && !isRiseVisionUser\"></li>\n" +
    "<li ng-show=\"isLoggedIn && !isRiseVisionUser\">\n" +
    "  <a href=\"\" ng-click=\"register()\" class=\"register-user-menu-button action\">\n" +
    "    <i class=\"fa fa-cogs\"></i>\n" +
    "    <span class=\"item-name\">Create Account</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li class=\"divider\" ng-show=\"isRiseVisionUser\"></li>\n" +
    "<li ng-show=\"isRiseVisionUser\">\n" +
    "  <a href=\"\" ng-click=\"userSettings()\" class=\"user-settings-button action\">\n" +
    "    <i class=\"fa fa-cogs\"></i>\n" +
    "    <span class=\"item-name\">User Settings</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li class=\"divider\" ng-show=\"false\"></li>\n" +
    "<li ng-show=\"false\">\n" +
    "  <a href=\"\" class=\"action\" ng-click=\"paymentMethods()\">\n" +
    "    <i class=\"fa fa-usd\"></i>\n" +
    "    <span class=\"item-name\">Payment Methods</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li class=\"divider\" ng-show=\"isLoggedIn\"></li>\n" +
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
    "  class=\"dropdown\"\n" +
    "  ng-class=\"{'hidden-xs': isLoggedIn}\"\n" +
    "  ng-show=\"isLoggedIn\"\n" +
    "  rv-spinner=\"spinnerOptions\"\n" +
    "  rv-spinner-key=\"auth-buttons\">\n" +
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
    "  rv-spinner=\"spinnerOptions\"\n" +
    "  rv-spinner-key=\"auth-buttons\"\n" +
    "  >\n" +
    "    <a href=\"\" class=\"dropdown-toggle\" action-sheet=\"'auth-buttons-menu.html'\">\n" +
    "      <img ng-src=\"{{userPicture}}\"\n" +
    "        class=\"profile-pic\" width=\"30\" height=\"30\" alt=\"User\" />\n" +
    "    </a>\n" +
    "</li>\n" +
    "<!-- If User NOT Authenticated -->\n" +
    "<li ng-show=\"!undetermined && isLoggedIn === false\"\n" +
    "  rv-spinner=\"spinnerOptions\"\n" +
    "  rv-spinner-key=\"auth-buttons\"\n" +
    "  >\n" +
    "  <button type=\"button\" class=\"sign-in\" ng-click=\"login()\">\n" +
    "    Sign In <img src=\"http://rise-vision.github.io/style-guide/img/avatar_2x.jpg\">\n" +
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
    "  <img src=\"http://rise-vision.github.io/style-guide/img/avatar_2x.jpg\" class=\"profile-img\">\n" +
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
  $templateCache.put("common-header.html",
    "<!-- Common Header Navbar -->\n" +
    "<nav class=\"navbar navbar-default navbar-static-top\"\n" +
    "	ng-class=\"{'double-margin': isSubcompanySelected}\" role=\"navigation\">\n" +
    "	<div class=\"container\">\n" +
    "\n" +
    "		<div class=\"navbar-header\" style=\"width: 100%;\">\n" +
    "			<a class=\"navbar-brand visible-md visible-lg\"\n" +
    "			  href=\"http://www.risevision.com/\" target=\"_blank\">\n" +
    "				<img src=\"//s3.amazonaws.com/rise-common/images/logo-small.png\" class=\"img-responsive logo-small\" width=\"113\" height=\"42\" alt=\"Rise Vision\">\n" +
    "			</a>\n" +
    "			<a class=\"navbar-brand hidden-md hidden-lg text-center\"\n" +
    "				href=\"\" off-canvas-toggle>\n" +
    "				<i class=\"fa fa-bars\"></i>\n" +
    "			</a>\n" +
    "\n" +
    "			<!-- If User Authenticated -->\n" +
    "			<!-- Action Nav -->\n" +
    "			<ul class=\"nav navbar-nav navbar-right actions-nav pull-right\">\n" +
    "				<!-- Notifications -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "				  ng-controller=\"SystemMessagesButtonCtrl\"\n" +
    "					src=\"'system-messages-button.html'\"\n" +
    "				></ng-include>\n" +
    "				<!-- Shopping Cart -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "					ng-controller=\"ShoppingCartButtonCtrl\"\n" +
    "					src=\"'shoppingcart-button.html'\"\n" +
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
    "					ng-if=\"isRiseVisionUser\"\n" +
    "				  ng-controller=\"CompanyButtonsCtrl\"\n" +
    "					src=\"'company-buttons.html'\"\n" +
    "				></ng-include>\n" +
    "				<!-- Auth -->\n" +
    "				<ng-include\n" +
    "					replace-include\n" +
    "				  ng-controller=\"AuthButtonsCtr\"\n" +
    "					src=\"'auth-buttons.html'\"\n" +
    "				></ng-include>\n" +
    "			</ul>\n" +
    "			<!-- END Action Nav -->\n" +
    "\n" +
    "			<!-- Nav Links -->\n" +
    "			<div class=\"navbar-collapse navbar-left hidden-xs hidden-sm\">\n" +
    "				<ul class=\"nav navbar-nav\">\n" +
    "					<li ng-repeat=\"opt in navOptions\">\n" +
    "						<a ng-href=\"{{opt.link}}\" target=\"{{opt.target}}\">{{opt.title}}</a>\n" +
    "					</li>\n" +
    "					<li class=\"dropdown\">\n" +
    "						<a href=\"\" class=\"dropdown-toggle remove-radius\">\n" +
    "							Help\n" +
    "						</a>\n" +
    "						<ul class=\"dropdown-menu\">\n" +
    "							<li>\n" +
    "								<a href=\"http://community.risevision.com/rise_vision_inc\" class=\"item-name\" target=\"_blank\">Community</a>\n" +
    "							</li>\n" +
    "							<li class=\"divider\"></li>\n" +
    "							<li>\n" +
    "								<a href=\"http://www.risevision.com/user-training/\" class=\"item-name\" target=\"_blank\">Training</a>\n" +
    "							</li>\n" +
    "							<li class=\"divider\"></li>\n" +
    "							<li>\n" +
    "								<a href=\"http://www.risevision.com/help/users/\" class=\"item-name\" target=\"_blank\">Documentation</a>\n" +
    "							</li>\n" +
    "						</ul>\n" +
    "					</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "			<!-- END Nav Links -->\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-if=\"isSubcompanySelected\"\n" +
    "	  class=\"sub-company-alert\">\n" +
    "		You're in a Sub-Company of your Company. Current Company - {{selectedCompanyName}}\n" +
    "	</div>\n" +
    "</nav>\n" +
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
    "			<a target=\"_blank\" href=\"http://help.risevision.com/\">Help</a>\n" +
    "		</li>\n" +
    "  </ul>\n" +
    "</nav>\n" +
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
    "<li ng-show=\"roleMap.sa\" class=\"divider\"></li>\n" +
    "<li ng-show=\"roleMap.sa\">\n" +
    "  <a href=\"\" ng-click=\"addSubCompany()\" class=\"action\">\n" +
    "    <i class=\"fa fa-plus\"></i>\n" +
    "    <span class=\"item-name\">Add Sub-Company</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-show=\"isUserAdmin\" class=\"divider\"></li>\n" +
    "<li ng-show=\"isUserAdmin\">\n" +
    "  <a href=\"\" ng-click=\"moveCompany()\" class=\"move-company-menu-button action\">\n" +
    "    <i class=\"fa fa-arrows\"></i>\n" +
    "    <span class=\"item-name\">Move a Company under Your Company</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-show=\"isUserAdmin\" class=\"divider\"></li>\n" +
    "<li ng-show=\"isUserAdmin\">\n" +
    "  <a href=\"\" ng-click=\"companySettings()\" class=\"action company-settings-menu-button\">\n" +
    "    <i class=\"fa fa-cog\"></i>\n" +
    "    <span class=\"item-name\">Company Settings</span>\n" +
    "  </a>\n" +
    "</li>\n" +
    "<li ng-show=\"isUserAdmin\" class=\"divider\"></li>\n" +
    "<li ng-show=\"isUserAdmin\">\n" +
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
    "<li class=\"dropdown hidden-xs\" ng-show=\"isRiseVisionUser\">\n" +
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
    " ng-show=\"isRiseVisionUser\"\n" +
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
  $templateCache.put("company-selector-modal.html",
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
    "		<div class=\"list-group scrollable-list\" rv-scroll-event=\"handleScroll($event, isEndEvent)\">\n" +
    "			<div class=\"list-group-item\"  ng-repeat=\"company in companies.list\" ng-click=\"setCompany(company)\">\n" +
    "				<p class=\"list-group-item-text\"><strong>{{company.name}}</strong><br/><small class=\"text-muted\">{{company.fullAddress}}</small>\n" +
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
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"company-settings-label\" class=\"modal-title\">Company Settings</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body company-settings-modal\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-name\">\n" +
    "        Name\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-name\" type=\"text\" class=\"form-control\" ng-model=\"company.name\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-street\">\n" +
    "        Street\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-street\" type=\"text\" class=\"form-control\" ng-model=\"company.street\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-unit\">\n" +
    "        Unit\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-unit\" type=\"text\" class=\"form-control\" ng-model=\"company.unit\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-city\">\n" +
    "        City\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-city\" type=\"text\" class=\"form-control\" ng-model=\"company.city\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-country\">\n" +
    "        Country\n" +
    "      </label>\n" +
    "      <select id=\"company-settings-country\" class=\"form-control selectpicker\"\n" +
    "        ng-model=\"company.country\" ng-options=\"c[1] as c[0] for c in countries\">\n" +
    "        <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-state\">\n" +
    "        State / Province\n" +
    "      </label>\n" +
    "      <!-- <input id=\"company-settings-state\" type=\"text\" class=\"form-control\" ng-model=\"company.province\" ng-hide=\"company.country == 'US' || company.country == 'CA'\" /> -->\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"company.country == 'CA'\">\n" +
    "        <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <!-- <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"company.country == 'US'\">\n" +
    "        <option value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select> -->\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-zip\">\n" +
    "        Zip / Postal Code\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-zip\" type=\"text\" class=\"form-control\" ng-model=\"company.postalCode\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-phone\">\n" +
    "        Phone\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-phone\" type=\"tel\" class=\"form-control\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"company-settings-monitoring\">\n" +
    "        Send Monitoring Emails To\n" +
    "      </label>\n" +
    "      <input id=\"company-settings-monitoring\"\n" +
    "        type=\"email\" class=\"form-control\" placeholder=\"e.g. john.doe@company.com, jane.doe@company.com\"/>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Authentication Key\n" +
    "      </label>\n" +
    "      <a class=\"action-link\" href=\"\">Reset</a>\n" +
    "      <div>\n" +
    "        authKey\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Claim ID\n" +
    "      </label>\n" +
    "      <a class=\"action-link\" href=\"\">Reset</a>\n" +
    "      <div>\n" +
    "        abc123\n" +
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
    "      <div class=\"form-group\">\n" +
    "        <label>\n" +
    "          Seller ID\n" +
    "        </label>\n" +
    "        <div>\n" +
    "          123456\n" +
    "        </div>\n" +
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
    "    <button type=\"button\" class=\"btn btn-success btn-fixed-width\" ng-click=\"save()\">Save\n" +
    "      <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-fixed-width\" ng-show=\"!isDeletingCompany\" ng-click=\"deleteCompany()\">\n" +
    "      Delete <i class=\"fa fa-white fa-trash-o icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger btn-confirm-delete\" data-dismiss=\"modal\" ng-show=\"isDeletingCompany\" ng-click=\"closeModal()\">\n" +
    "      Confirm Deletion <i class=\"fa fa-white fa-warning icon-right\"></i>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-primary btn-fixed-width close-company-settings-button\" data-dismiss=\"modal\" ng-click=\"closeModal()\">Cancel\n" +
    "      <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
    "    </button>\n" +
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
  $templateCache.put("company-users-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
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
    "  <div class=\"list-group scrollable-list company-users-list\">\n" +
    "    <div class=\"list-group-item  company-users-list-item\" ng-repeat=\"user in users | orderBy:sort.field:sort.descending | filter:userSearchString\" ng-click=\"editUser(user.username)\">\n" +
    "      <p class=\"list-group-item-text\"><strong>{{user.firstName}} {{user.lastName}}</strong> <small class=\"text-muted\">{{user.email}}</small></p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-success\"\n" +
    "    ng-click=\"addUser()\">Add User\n" +
    "    <i class=\"fa fa-white fa-plus icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary close-company-users-button\" data-dismiss=\"modal\" ng-click=\"closeModal()\">\n" +
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
  $templateCache.put("move-company-modal.html",
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
    "      {{userCompany.name}}<br>\n" +
    "      {{userCompany.address}}<br>\n" +
    "      {{userCompany.city}}, {{userCompany.province}},\n" +
    "      {{userCompany.country}} {{userCompany.postalCode}}\n" +
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
    "  <button type=\"button\" class=\"btn btn-success move-company-button\" ng-show=\"company.name\" ng-click=\"moveCompany()\">Move Company\n" +
    "    <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary close-move-company-button\" data-dismiss=\"modal\" ng-click=\"closeModal()\">\n" +
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
    "  <form role=\"form\" name=\"registrationForm\">\n" +
    "    <div class=\"form-group\" ng-class=\"{ 'has-error' : registrationForm.email.$invalid && !userForm.email.$pristine }\">\n" +
    "      <label for=\"email\">Email</label>\n" +
    "      <input type=\"email\" class=\"form-control email\"\n" +
    "      name=\"email\"\n" +
    "      id=\"email\" required\n" +
    "      ng-model=\"profile.email\">\n" +
    "      <p ng-show=\"registrationForm.email.$invalid && !registrationForm.email.$pristine\"\n" +
    "        class=\"help-block validation-error-message-email\">Enter a valid email.</p>\n" +
    "    </div>\n" +
    "    <!-- Terms of Service and Privacy -->\n" +
    "    <div class=\"checkbox form-group\" ng-class=\"{ 'has-error' : registrationForm.accepted.$invalid && !userForm.accepted.$pristine }\">\n" +
    "      <label>\n" +
    "      <input type=\"checkbox\" name=\"accepted\"\n" +
    "        ng-model=\"profile.accepted\"\n" +
    "        class=\"accept-terms-checkbox\" required />\n" +
    "      I accept the terms of <a href=\"http://www.risevision.com/terms-service-privacy/\" target=\"_blank\">Service and Privacy</a>\n" +
    "      <p ng-show=\"registrationForm.accepted.$invalid && !registrationForm.accepted.$pristine\"\n" +
    "        class=\"help-block validation-error-message-accepted\">You must accept terms and condtions.</p>\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <!-- Newsletter -->\n" +
    "    <div class=\"checkbox form-group\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\" ng-model=\"profile.mailSyncEnabled\"> Sign up for our newsletter\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <button ng-click=\"save()\"\n" +
    "        type=\"button\"\n" +
    "        class=\"btn btn-success btn-fixed-width registration-save-button\"\n" +
    "        ng-disabled=\"registering\">\n" +
    "        Save <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-primary btn-fixed-width\"\n" +
    "      ng-disabled=\"registering\"\n" +
    "      ng-click=\"closeModal()\">\n" +
    "        Cancel <i class=\"fa fa-white fa-times icon-right registration-cancel-button\"></i>\n" +
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
  $templateCache.put("subcompany-modal.html",
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" ng-click=\"closeModal()\" aria-hidden=\"true\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"sub-company-label\" class=\"modal-title\">Add Sub-Company</h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body select-subcompany-modal\">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-name\">\n" +
    "        Name\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-name\" type=\"text\" class=\"form-control\" ng-model=\"company.name\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-street\">\n" +
    "        Street\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-street\" type=\"text\" class=\"form-control\" ng-model=\"company.street\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-unit\">\n" +
    "        Unit\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-unit\" type=\"text\" class=\"form-control\" ng-model=\"company.unit\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-city\">\n" +
    "        City\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-city\" type=\"text\" class=\"form-control\" ng-model=\"company.city\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-country\">\n" +
    "        Country\n" +
    "      </label>\n" +
    "      <select id=\"sub-company-country\" class=\"form-control selectpicker\" ng-model=\"company.country\" ng-options=\"c[1] as c[0] for c in countries\">\n" +
    "        <option value=\"\">&lt; Select Country &gt;</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-state\">\n" +
    "        State / Province\n" +
    "      </label>\n" +
    "      <!-- <input id=\"sub-company-state\" type=\"text\" class=\"form-control\" ng-model=\"company.province\" ng-hide=\"company.country == 'US' || company.country == 'CA'\" /> -->\n" +
    "      <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsCA\" ng-show=\"company.country == 'CA'\">\n" +
    "        <option value=\"\">&lt; Select Province &gt;</option>\n" +
    "      </select>\n" +
    "      <!-- <select class=\"form-control selectpicker\" ng-model=\"company.province\" ng-options=\"c[1] as c[0] for c in regionsUS\" ng-show=\"company.country == 'US'\">\n" +
    "        <option value=\"\">&lt; Select State &gt;</option>\n" +
    "      </select> -->\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-zip\">\n" +
    "        Zip / Postal Code\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-zip\" type=\"text\" class=\"form-control\" ng-model=\"company.postalCode\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"sub-company-monitoring\">\n" +
    "        Send Monitoring Emails To\n" +
    "      </label>\n" +
    "      <input id=\"sub-company-monitoring\" type=\"email\" class=\"form-control\" placeholder=\"e.g. john.doe@company.com, jane.doe@company.com\"/>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <a href=\"\" data-dismiss=\"modal\" data-toggle=\"modal\" ng-click=\"moveCompany()\">Move a Company Under Your Company</a>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-success btn-fixed-width\" ng-click=\"save()\">Save\n" +
    "    <i class=\"fa fa-white fa-check icon-right\"></i>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-primary btn-fixed-width\" ng-click=\"closeModal()\">Cancel\n" +
    "    <i class=\"fa fa-white fa-times icon-right\"></i>\n" +
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
    "ng-show=\"isRiseVisionUser\">\n" +
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
    "  ng-show=\"isRiseVisionUser\"\n" +
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
    "<div class=\"modal-header\">\n" +
    "  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\" ng-click=\"closeModal()\">\n" +
    "    <i class=\"fa fa-times\"></i>\n" +
    "  </button>\n" +
    "  <h2 id=\"user-settings-label\" class=\"modal-title\">\n" +
    "  <span ng-if=\"!isAdd\">User Settings</span>\n" +
    "  <span ng-if=\"isAdd\">Add User</span>\n" +
    "  </h2>\n" +
    "</div>\n" +
    "<div class=\"modal-body user-settings-modal\"\n" +
    "  rv-spinner=\"spinnerOptions\"\n" +
    "  rv-spinner-key=\"user-settings\"\n" +
    "  rv-spinner-start-active=\"0\"\n" +
    ">\n" +
    "  <form role=\"form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>\n" +
    "        Username\n" +
    "      </label>\n" +
    "      <span ng-if=\"!isAdd\">{{user.username}}</span>\n" +
    "      <input id=\"user-settings-first-name\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-if=\"isAdd\"\n" +
    "        ng-model=\"user.username\"\n" +
    "        />\n" +
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
    "    <div class=\"form-group\">\n" +
    "      <label for=\"user-settings-email\">\n" +
    "        Email\n" +
    "      </label>\n" +
    "      <input\n" +
    "        id=\"user-settings-email\"\n" +
    "        type=\"email\"\n" +
    "        class=\"form-control\"\n" +
    "        ng-model=\"user.email\"\n" +
    "        />\n" +
    "    </div>\n" +
    "    <div class=\"checkbox\" ng-show=\"showEmailCampaign\">\n" +
    "      <label>\n" +
    "        <input type=\"checkbox\"\n" +
    "          id=\"user-settings-newsletter\"\n" +
    "          ng-model=\"user.mailSyncEnabled\">\n" +
    "          Subscribe To Email Updates\n" +
    "      </label>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"isUserAdmin\">\n" +
    "      <label>\n" +
    "        Roles\n" +
    "      </label>\n" +
    "      <div class=\"checkbox\" ng-repeat=\"role in availableRoles\"\n" +
    "        ng-show=\"editRoleAllowed(role)\">\n" +
    "        <label>\n" +
    "          <input type=\"checkbox\"\n" +
    "            id=\"user-settings-{{role.key}}\"\n" +
    "            checklist-model=\"user.roles\"\n" +
    "            checklist-value=\"role.key\"> {{role.name}}\n" +
    "        </label>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-if=\"user.lastLogin\">\n" +
    "      <label>\n" +
    "        Last Login\n" +
    "      </label>\n" +
    "      <div>{{user.lastLogin | date:'MM/dd/yy HH:mm:ss Z'}}</div>\n" +
    "    </div>\n" +
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
    "");
}]);
})();

angular.module("risevision.common.header", [
  "risevision.common.userstate",
  "risevision.common.account",
  "risevision.common.gapi",
  "risevision.common.cache",
  "risevision.common.company",
  "risevision.common.localstorage",
  "risevision.common.header.templates",
  "risevision.common.loading",
  "risevision.common.userstate",   "risevision.common.ui-status",
  "risevision.common.systemmessages",
  "risevision.common.oauth2",
  "risevision.common.geodata",
  "risevision.common.util",
  "risevision.common.userprofile",
  "risevision.common.registration",
  "risevision.common.shoppingcart",
  "checklist-model",
  "ui.bootstrap", "ngSanitize", "rvScrollEvent", "ngCsv", "ngTouch"
])
.directive("commonHeader",
  ["$modal", "$rootScope", "$q", "$loading",
   "$interval", "oauthAPILoader", "$log",
    "$templateCache",
    "userState",
  function($modal, $rootScope, $q, $loading, $interval,
    oauthAPILoader, $log, $templateCache, userState) {
    return {
      restrict: "E",
      template: $templateCache.get("common-header.html"),
      scope: false,
      link: function($scope) {
        $scope.navCollapsed = true;

        // If nav options not provided use defaults
        if (!$scope.navOptions) {
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

        $scope.$watch(function () { return userState.getSelectedCompanyId(); },
        function (selectedCompanyId) {
          if(selectedCompanyId) {
            $scope.isSubcompanySelected = userState.isSubcompanySelected();
            $scope.selectedCompanyName = userState.getSelectedCompanyName();
          }
        });

        $scope.$watch(function () { return userState.isRiseVisionUser(); },
        function (isRvUser) { $scope.isRiseVisionUser = isRvUser; });

      }
    };
  }
]);

angular.module("risevision.common.header")
.controller("AuthButtonsCtr", ["$scope", "$modal", "$templateCache",
  "userState", "$loading", "cookieStore",
  "$log", "uiStatusManager",
  function($scope, $modal, $templateCache, userState,
  $loading, cookieStore, $log, uiStatusManager) {

    $scope.spinnerOptions = {color: "#999", hwaccel: true, radius: 10};


    $scope.register = function (size) {
      cookieStore.remove("surpressRegistration");
      var modalInstance = $modal.open({
        template: $templateCache.get("registration-modal.html"),
        controller: "RegistrationModalCtrl",
        size: size,
        backdrop: "static"
      });
      modalInstance.result.finally(function (){
        uiStatusManager.invalidateStatus();
      });
    };

    //clear state where user registration is surpressed
    $scope.$on("risevision.user.signedOut", function () {
      cookieStore.remove("surpressRegistration");
    });

    //spinner
    $scope.$watch(function () {return uiStatusManager.isStatusUndetermined(); },
    function (undetermined){
      $scope.undetermined = undetermined;
      if (undetermined === true) { $loading.start("auth-buttons"); }
      else { $loading.stop("auth-buttons"); }
    });

    //render dialogs based on status the UI is stuck on
    $scope.$watch(function () { return uiStatusManager.getStatus(); },
    function (newStatus, oldStatus){
      if(newStatus) {
        $log.debug("status changed from", oldStatus, "to", newStatus);

        //render a dialog based on the status current UI is in
        if(newStatus === "registerdAsRiseVisionUser") {
          $scope.register();
        }
      }
    });

    //watch on username change and populate onto scope variables requried
    // for rendering UI

    $scope.$watch(function () {return userState.isLoggedIn();},
      function (loggedIn) { $scope.isLoggedIn = loggedIn;
        if(loggedIn === true) { $scope.userPicture = userState.getUserPicture();}
      });
    $scope.$watch(function () {return userState.isRiseVisionUser();},
      function (isRvUser) { $scope.isRiseVisionUser = isRvUser; });

    //repopulate profile upon change of current user
    $scope.$watch(function () {return userState.isRiseVisionUser();},
      function (isRvUser) {
        if(isRvUser === true) {
          $scope.profile = userState.getCopyOfProfile();
        }});

    // Login Modal
    $scope.login = function() {
      userState.authenticate(true).then().finally(function(){
        uiStatusManager.invalidateStatus("registrationComplete");
      });
    };

    $scope.logout = function () {
      userState.signOut().then(function (){
        alert("If you are using a public computer, please do not forget to log out of Google Account, or close your browser window if you are using Incognito mode. ");
      }, function (err) {
        $log.error("sign out failed", err);
      });
    };

    // Show User Settings Modal
    $scope.userSettings = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("user-settings-modal.html"),
        controller: "UserSettingsModalCtrl",
        size: size,
        resolve: {username: function () {return userState.getUsername();},
        add: function () {return false; }}
      });
    };
    // Show Payment Methods Modal
    $scope.paymentMethods = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("payment-methods-modal.html"),
        controller: "PaymentMethodsModalCtrl",
        size: size
      });
    };

    userState.authenticate(false);
  }
]);

angular.module("risevision.common.header")
.controller("CompanyButtonsCtrl", [ "$scope", "$modal", "$templateCache",
  "userState", "getCompany", "$location",
  function($scope, $modal, $templateCache, userState, getCompany, $location) {

    $scope.$watch(function () {return userState.getSelectedCompanyId(); },
    function (newCompanyId) {
      if(newCompanyId) {
        $scope.isSubcompanySelected = userState.isSubcompanySelected();
        $scope.selectedCompanyName = userState.getSelectedCompanyName();
      }
    });

    $scope.$watch(function () {return userState.isRiseVisionUser(); },
    function (isRvUser) {
      $scope.isRiseVisionUser = isRvUser;
      if(isRvUser === true) {
        $scope.isUserAdmin = userState.isUserAdmin();
        $scope.isPurchaser = userState.isPurchaser();
      }
    });

    var updateSelectedCompanyFromUrl = function() {
      var newCompanyId = $location.search().cid;
      if(newCompanyId && newCompanyId !== userState.getSelectedCompanyId()) {
        getCompany(newCompanyId).then(function (company) {
          userState.switchCompany(company);
        });
      }
    };

    //detect selectCompany changes on route UI
    $scope.$on("$routeChangeSuccess", updateSelectedCompanyFromUrl);
    updateSelectedCompanyFromUrl();

    $scope.addSubCompany = function(size) {
      $modal.open({
        template: $templateCache.get("subcompany-modal.html"),
        controller: "SubCompanyModalCtrl",
        size: size
      });
    };

    // Show Company Settings Modal
    $scope.companySettings = function(companyId, size) {
      $modal.open({
        template: $templateCache.get("company-settings-modal.html"),
        controller: "CompanySettingsModalCtrl",
        size: size,
        resolve: {
          companyId: function () {
            return userState.getSelectedCompanyId();
          }
        }
      });
    };

    // Show Company Users Modal
    $scope.companyUsers = function(size) {
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
    $scope.moveCompany = function(size) {
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
    if(num) {
      return num;
    }
    else {
      return "";
    }
  };
})

.controller("ShoppingCartButtonCtrl", [
  "$scope", "shoppingCart", "userState", "$log", "STORE_URL",
  function($scope, shoppingCart, userState, $log, STORE_URL) {

    $scope.shoppingCartUrl = STORE_URL + "#/shopping-cart";
    $scope.cart = {};
    $scope.cart.items = shoppingCart.getItems();
    $scope.$watch(function () {return userState.isRiseVisionUser();},
      function (isRvUser) { $scope.isRiseVisionUser = isRvUser; });


    $scope.$on("risevision.user.signedOut", function () {
      shoppingCart.destroy();
    });
  }
]);

angular.module("risevision.common.header")

.controller("SystemMessagesButtonCtrl", [
  "$scope", "userState", "$log", "$sce", "getCoreSystemMessages", "systemMessages",
  function($scope, userState, $log, $sce, getCoreSystemMessages,
    systemMessages) {

    $scope.messages = systemMessages;
    $scope.$watch(function () {return userState.isRiseVisionUser();},
      function (isRvUser) { $scope.isRiseVisionUser = isRvUser; });

    $scope.renderHtml = function(html_code)
    { return $sce.trustAsHtml(html_code); };

    $scope.$watch(
      function () { return userState.getSelectedCompanyId(); },
      function (newCompanyId) {
        if(newCompanyId !== null) {
          systemMessages.clear();
          getCoreSystemMessages(newCompanyId).then(systemMessages.addMessages);
        }
        else {
          systemMessages.clear();
        }
    });

  }
]);

angular.module("risevision.common.header")

.controller("PaymentMethodsModalCtrl", ["$scope", "$modalInstance", "$modal",
  "$templateCache",
  function($scope, $modalInstance, $modal, $templateCache) {
    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
    // Show Payment Methods Modal
    $scope.creditCards = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("credit-cards-modal.html"),
        controller: "CreditCardsModalCtrl",
        size: size
      });
    };
  }
])
.controller("CreditCardsModalCtrl", ["$scope", "$modalInstance",
  function($scope, $modalInstance) {
    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
  }
]);

angular.module("risevision.common.header")
.controller("RegistrationModalCtrl", [
  "$scope", "$modalInstance",
  "$loading", "registerAccount", "$log", "cookieStore",
  "userState", "pick", "uiStatusManager",
  function($scope, $modalInstance, $loading,
    registerAccount, $log, cookieStore, userState, pick, uiStatusManager) {

      var copyOfProfile = userState.getCopyOfProfile() || {};

      $scope.profile = pick(copyOfProfile, "email", "mailSyncEnabled");
      $scope.registering = false;

      $scope.profile.accepted =
        angular.isDefined(copyOfProfile.termsAcceptanceDate) &&
          copyOfProfile.termsAcceptanceDate !== null;

      if(!angular.isDefined($scope.profile.mailSyncEnabled)) {
        //"no sign up" by default
        $scope.profile.mailSyncEnabled = false;
      }

      $scope.closeModal = function() {
        cookieStore.put("surpressRegistration", true);
        $modalInstance.dismiss("cancel");
      };

      // check status, load spinner, or close dialog if registration is complete
      var watch = $scope.$watch(
        function () { return uiStatusManager.isStatusUndetermined(); },
        function (undetermined) {
          if(undetermined === true) {
              //start the spinner
              $loading.start("registration-modal");
          }
          else if (undetermined === false) {
          $loading.stop("registration-modal");
            if(uiStatusManager.getStatus() === "registrationComplete") {
              $modalInstance.close("success");
              //stop the watch
              watch();
            }
          }
      });

      $scope.save = function () {
        $scope.registrationForm.accepted.$pristine = false;
        $scope.registrationForm.email.$pristine = false;

        if(!$scope.registrationForm.$invalid) {
           //update terms and conditions date
           $scope.registering = true;
           $loading.start("registration-modal");
           registerAccount(userState.getUsername(), $scope.profile).then(
             function () {
               $modalInstance.close("success");
               uiStatusManager.invalidateStatus("registrationComplete");
             },
             function (err) {alert("Error: " + JSON.stringify(err));
             $log.error(err);}).finally(function () {
               $scope.registering = false;
               $loading.stop("registration-modal");
               userState.authenticate(false);
             });
        }

      };
    }
]);

angular.module("risevision.common.header")

.controller("MoveCompanyModalCtrl", ["$scope", "$modalInstance",
  "moveCompany", "lookupCompany", "userState",
  function($scope, $modalInstance, moveCompany, lookupCompany, userState) {

    $scope.company = {};
    $scope.errors = [];
    $scope.messages = [];
    $scope.$watch(
      function () {return userState.getUsername(); },
      function (newUsername) {
        if(angular.isDefined(newUsername) && newUsername !== null) {
          $scope.userCompany = userState.getCopyOfUserCompany();
        }
      }
    );

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };

    $scope.moveCompany = function () {
      $scope.messages = [];
      moveCompany($scope.company.authKey).then(function () {
        $scope.messages.push("Success. The company has been moved under your company.");
      }, function (err) {$scope.errors.push("Error: "  + JSON.stringify(err)); });
    };

    $scope.getCompany = function () {
      $scope.errors = []; $scope.messages = [];
      lookupCompany($scope.company.authKey).then(function (resp) {
        angular.extend($scope.company, resp);
      }, function (resp) {
        $scope.errors.push("Failed to retrieve company. " + resp.message);
      });
    };
  }
]);

angular.module("risevision.common.header")

.controller("CompanySettingsModalCtrl", ["$scope", "$modalInstance",
  "updateCompany", "companyId", "COUNTRIES", "REGIONS_CA", "REGIONS_US",
  "getCompany",
  function($scope, $modalInstance, updateCompany, companyId,
  COUNTRIES, REGIONS_CA, REGIONS_US, getCompany) {
    $scope.company = {id: companyId};
    $scope.countries = COUNTRIES;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;

    if(companyId) {
      getCompany(companyId).then(
        function (company) {
          $scope.company = company;
        },
        function (resp) {
          alert("An error has occurred.", resp.error);
        });
    }
    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
    $scope.save = function () {
      updateCompany($scope.company.id, $scope.company).then(
        function () {
          $modalInstance.close("success");
        },
      function (error) {
        alert("Error", error);
      });
    };
  }
]);

angular.module("risevision.common.header")
.controller("SubCompanyModalCtrl", ["$scope", "$modalInstance", "$modal",
  "$templateCache", "createCompany", "COUNTRIES", "REGIONS_CA", "REGIONS_US",
  "userState",
  function($scope, $modalInstance, $modal, $templateCache,
    createCompany, COUNTRIES, REGIONS_CA, REGIONS_US, userState) {

    $scope.company = {};
    $scope.countries = COUNTRIES;
    $scope.regionsCA = REGIONS_CA;
    $scope.regionsUS = REGIONS_US;


    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
    $scope.save = function () {
      createCompany(userState.getSeelctedCompanyId(),
        $scope.company).then(function () {
        $modalInstance.close("success");
      }, function (err) {alert(err); });
    };
    // Show Move Company Modal
    $scope.moveCompany = function(size) {
      // var modalInstance =
      $modal.open({
        template: $templateCache.get("move-company-modal.html"),
        controller: "MoveCompanyModalCtrl",
        size: size
      });
    };
  }
])

.controller("companySelectorCtr", ["$scope", "$modalInstance",
    "companyService", "companyId", "BaseList",
    function ($scope, $modalInstance, companyService,
      companyId, BaseList) {

    var DB_MAX_COUNT = 20; //number of records to load at a time

    $scope.companies = new BaseList(DB_MAX_COUNT);
    $scope.search = {
        searchString: ""
    };

    $scope.closeModal = function () {
        $modalInstance.dismiss("cancel");
    };

    function loadCompanies() {
      if (!$scope.companies.endOfList) {
        companyService.getCompanies(
          companyId, $scope.search.searchString,
          $scope.companies.cursor, DB_MAX_COUNT, null).then(function (result) {
          if (result && result.items) {
            $scope.companies.add(result.items, result.cursor);
          }
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
      $modalInstance.close(company);
    };

    $scope.handleScroll = function (event, isEndEvent) {
      console.log(event.target.scrollTop + " / " + event.target.scrollHeight + " / " + isEndEvent);
      if (isEndEvent) {
        if ((event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop) < 20) {
          //load more rows if less than 20px left to the bottom
          loadCompanies();
        }
      }
    };
}
]);

angular.module("risevision.common.header")

  .filter("roleLabel", ["userRoleMap", function (userRoleMap) {
    return function (key) {
      return userRoleMap[key];
    };
  }])

  .controller("CompanyUsersModalCtrl", ["$scope", "$modalInstance", "$modal",
    "$templateCache", "company", "getUsers",
    function($scope, $modalInstance, $modal, $templateCache, company, getUsers) {

      $scope.sort = {
        field: "username",
        descending: false
      };

      $scope.search = {
          searchString: ""
      };

      $scope.changeSorting = function(field) {
        var sort = $scope.sort;

        if (sort.field === field) {
            sort.descending = !sort.descending;
        } else {
            sort.field = field;
            sort.descending = false;
        }
      };

      var loadUsers = function () {
        getUsers({companyId: company.id,
          search: $scope.search.searchString}).then(function (users) {
          $scope.users = users;
        });
      };

      loadUsers();

      $scope.addUser = function (size) {
        var instance = $modal.open({
          template: $templateCache.get("user-settings-modal.html"),
          controller: "AddUserModalCtrl",
          size: size,
          resolve: { companyId: function () {return company.id; } }
        });
        instance.result.finally(loadUsers);
      };

      $scope.editUser = function (username, size) {
        var instance = $modal.open({
          template: $templateCache.get("user-settings-modal.html"),
          controller: "UserSettingsModalCtrl",
          size: size,
          resolve: {username: function (){ return username; },
          add: function () {return false; }
          }
        });
        instance.result.finally(loadUsers);
      };

      $scope.closeModal = function() {
        $modalInstance.dismiss("cancel");
      };

      $scope.doSearch = function () {
        $scope.users = [];
        loadUsers();
      };
    }
  ]);

angular.module("risevision.common.header")

  .controller("AddUserModalCtrl",
  ["$scope", "addUser", "$modalInstance", "companyId",
  function ($scope, addUser, $modalInstance, companyId) {
    $scope.user = {};


    $scope.save = function () {
      addUser(companyId, $scope.user.email, $scope.user).then(
        function () {
          $modalInstance.close("success");
        },
        function (error) {
          alert("Error", error);
        }
      );
    };

    $scope.closeModal = function() {
      $modalInstance.dismiss("cancel");
    };
  }])

  .controller("UserSettingsModalCtrl", [
    "$scope", "$modalInstance", "updateUser", "getUserProfile", "deleteUser",
    "addUser", "username", "userRoleMap", "$log", "$loading", "userState",
    "uiStatusManager",
    function($scope, $modalInstance, updateUser, getUserProfile, deleteUser,
      addUser, username, userRoleMap, $log, $loading, userState,
      uiStatusManager) {

      //push roles into array
      $scope.availableRoles = [];
      angular.forEach(userRoleMap, function (v, k) {
        $scope.availableRoles.push({key: k, name: v});
      });

      var company = userState.getCopyOfSelectedCompany();

      $scope.showEmailCampaign = company.mailSyncEnabled;
      $scope.isUserAdmin = userState.isUserAdmin();
      $scope.username = username;
      $scope.isAdd = !username;

      getUserProfile(username).then(function (user) {
        $scope.user = user;
      });

      $scope.closeModal = function() {
        $modalInstance.dismiss("cancel");
      };

      $scope.deleteUser = function () {
        if (confirm("Are you sure you want to delete this user?")) {
          deleteUser($scope.username)
            .then(function () {
              if($scope.username === userState.getUsername()) {
                userState.signOut().then().finally(function() {
                  uiStatusManager.invalidateStatus("registrationComplete");
                });
              }
            })
            .finally(function () {
              $modalInstance.dismiss("deleted");
            });
        }
      };

      $scope.save = function () {
        $loading.start("user-settings-modal");

        updateUser(username, $scope.user).then(
          function () {
            $modalInstance.close("success");
          },
          function (error) {
            $log.debug(error);
            alert("Error: " + error.message);
          }
        ).finally(function (){
          if(username === userState.getUsername()) {
            userState.refreshProfile();
          }
          $loading.stop("user-settings-modal");});
      };

      $scope.editRoleAllowed = function (role) {
        if (role.key === "ua" && $scope.username === userState.getUsername()) {
          //do not allow users to uncheck admin role for themselves
          return false;
        }
        else {
          //allow user to check/uncheck role by default
          return true;
        }
      };
    }
  ]);

// ------------------------------------
// Off-Canvas Navigation
// ------------------------------------
angular.module("risevision.common.header")
  .service("offCanvas", ["$window", function($window) {

    var service = {
      visible: false,
      enabled: false
    };

    service.enabled = angular.element($window).width() <= 1200 ? true : false;

    service.toggle = function(event) {
      if (event) { event.stopPropagation(); }

      if(!service.enabled) { return; }

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
      service.enabled = angular.element($window).width() <= 1200 ? true : false;
    };

    return service;
  }])
  .directive("offCanvasContent", ["offCanvas", "$swipe", function(offCanvas, $swipe) {
    return {
      restrict: "A",
      link: function (scope, iElement) {
        // Swipe coords
        var startCoords;
        // Handle swipe gesture
        $swipe.bind(iElement, {
          "start": function(coords) {
            startCoords = coords;
          },
          "end": function(coords) {
            if (coords.x - startCoords.x > 0) {
              offCanvas.toggle();
            }
          }
        });
      }
    };
  }])
  .directive("offCanvasNav", ["offCanvas", "$swipe", function(offCanvas, $swipe) {
    return {
      restrict: "A",
      link: function (scope, iElement) {
        iElement.addClass("off-canvas--nav");
        offCanvas.registerNav(iElement);
        // Swipe coords
        var startCoords;
        // Handle swipe gesture
        $swipe.bind(iElement, {
          "start": function(coords) {
            startCoords = coords;
          },
          "end": function(coords) {
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
  }])
  .directive("offCanvasToggle", ["offCanvas", function(offCanvas) {
    return {
      restrict: "A",
      link: function (scope, iElement) {
        iElement.bind("tap", offCanvas.toggle);
        iElement.bind("click", offCanvas.toggle);
      }
    };
  }]);

// ------------------------------------
// Action Sheet
// ------------------------------------
angular.module("risevision.common.header")
  .directive("actionSheet", ["$document", "$compile", function($document, $compile) {
    return {
      restrict: "A",
      link: function (scope, iElement, iAttrs) {

        var body = $document.find("body").eq(0);
        var isVisible = false;
        var backdropDomEl = document.getElementById("action-sheet-backdrop");

        if (!angular.isObject(backdropDomEl)) {
          backdropDomEl = angular.element("<div id=\"action-sheet-backdrop\" class=\"modal-backdrop\"></div>");
          body.append(backdropDomEl);
        } else {
          backdropDomEl = angular.element(backdropDomEl);
        }

        scope.templateUrl = scope.$eval(iAttrs.actionSheet);
        scope.title = scope.$eval(iAttrs.title);

        var angularDomEl = angular.element("<div class=\"action-sheet\"><ng-include src=\"templateUrl\"></ng-include></div>");

        var actionSheetDomEl = $compile(angularDomEl)(scope);
        body.append(actionSheetDomEl);

        var toggle = function () {
          isVisible = !isVisible;
          actionSheetDomEl.toggleClass("is-action-sheet-opened");
          backdropDomEl.toggleClass("is-action-sheet-opened");

          if (isVisible) {
            backdropDomEl.bind("tap", toggle);
            backdropDomEl.bind("click", toggle);
          } else {
            backdropDomEl.unbind("tap");
            backdropDomEl.unbind("click");
          }
        };

        iElement.bind("tap", toggle);
        iElement.bind("click", toggle);
        angularDomEl.bind("tap", toggle);
        angularDomEl.bind("click", toggle);
      }
    };
  }])
  .directive("replaceInclude", function () {
    return {
      require: "ngInclude",
      restrict: "A",
      link: function (scope, el) {
        el.replaceWith(el.children());
      }
    };
  });

(function(angular) {

    "use strict";

    var INTERVAL_DELAY = 150;

    angular.module("rvScrollEvent", [])
    .directive("rvScrollEvent", ["$parse", "$window", function($parse, $window) {
        return {
          scope: false,
          link: function(scope, element, attr) {
          var fn = $parse(attr.rvScrollEvent);
            var interval,
            handler,
            el = element[0],
            scrollEvent = "scroll",
            scrollPosition = {
                x: 0,
                y: 0
            };

            var bindScroll = function() {
                handler = function(event) {

                    scrollPosition.x = el.scrollLeft;
                    scrollPosition.y = el.scrollTop;

                    startInterval(event);
                    unbindScroll();
                    scrollTrigger(event, false);
                };


                element.bind(scrollEvent, handler);
            };

            var startInterval = function(event) {
                interval = $window.setInterval(function() {
                    if(scrollPosition.x === el.scrollLeft && scrollPosition.y === el.scrollTop) {
                        $window.clearInterval(interval);
                        bindScroll();
                        scrollTrigger(event, true);
                    } else {
                        scrollPosition.x = el.scrollLeft;
                        scrollPosition.y = el.scrollTop;
                    }
                }, INTERVAL_DELAY);
            };

            var unbindScroll = function() {
                // be nice to others, don"t unbind their scroll handlers
                element.unbind(scrollEvent, handler);
            };

            var scrollTrigger = function(event, isEndEvent) {
                scope.$apply(function() {
                  fn(scope, {$event: event, isEndEvent: isEndEvent});
                });
            };

            bindScroll();
        }
      };
    }]);
})(angular);

(function (angular) {
  "use strict";
  angular.module("risevision.common.util", [])
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
  })

  .factory("dateIsInRange", [ function () {
/**
 * check if date is in range
 * @param {Date} date
 * @param {String} strStartDate
 * @return {String} strEndDate
 */
    return function (date, strStartDate, strEndDate) {
// strStartDate, strEndDate can either be empty string or date in ISO 8601 format "2014-05-14T00:00:00.000Z"
// empty means no there is no specific start or/and end date is set

// When parsing time, we don't want to convert Universal time to the current TimeZone
// example new Date(Date.parse("2014-05-14T00:00:00.000")); returns "Tue May 13 2014 20:00:00 GMT-0400 (EDT)"
// what we want is to pretennd that date already comes adjusted to the current TimeZone
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

  }]);
})(angular);

angular.module("risevision.common.geodata", [])
.value("COUNTRIES",
        [["Afghanistan", "AF"],
        ["Albania", "AL"],
        ["Algeria", "DZ"],
        ["American Samoa", "AS"],
        ["Andorra", "AD"],
        ["Angola", "AO"],
        ["Anguilla", "AI"],
        ["Antarctica", "AQ"],
        ["Antigua and Barbuda", "AG"],
        ["Argentina", "AR"],
        ["Armenia", "AM"],
        ["Aruba", "AW"],
        ["Australia", "AU"],
        ["Austria", "AT"],
        ["Azerbaijan", "AZ"],
        ["Bahamas", "BS"],
        ["Bahrain", "BH"],
        ["Bangladesh", "BD"],
        ["Barbados", "BB"],
        ["Belarus", "BY"],
        ["Belgium", "BE"],
        ["Belize", "BZ"],
        ["Benin", "BJ"],
        ["Bermuda", "BM"],
        ["Bhutan", "BT"],
        ["Bolivia", "BO"],
        ["Bosnia and Herzegovina", "BA"],
        ["Botswana", "BW"],
        ["Bouvet Island", "BV"],
        ["Brazil", "BR"],
        ["British Indian Ocean Territory", "IO"],
        ["British Virgin Islands", "VG"],
        ["Brunei Darussalam", "BN"],
        ["Bulgaria", "BG"],
        ["Burkina Faso", "BF"],
        ["Burundi", "BI"],
        ["Cambodia", "KH"],
        ["Cameroon", "CM"],
        ["Canada", "CA"],
        ["Cape Verde", "CV"],
        ["Cayman Islands", "KY"],
        ["Central African Republic", "CF"],
        ["Chad", "TD"],
        ["Chile", "CL"],
        ["China", "CN"],
        ["Christmas Island", "CX"],
        ["Cocos", "CC"],
        ["Colombia", "CO"],
        ["Comoros", "KM"],
        ["Congo", "CG"],
        ["Cook Islands", "CK"],
        ["Costa Rica", "CR"],
        ["Croatia", "HR"],
        ["Cuba", "CU"],
        ["Cyprus", "CY"],
        ["Czech Republic", "CZ"],
        ["Denmark", "DK"],
        ["Djibouti", "DJ"],
        ["Dominica", "DM"],
        ["Dominican Republic", "DO"],
        ["East Timor", "TP"],
        ["Ecuador", "EC"],
        ["Egypt", "EG"],
        ["El Salvador", "SV"],
        ["Equatorial Guinea", "GQ"],
        ["Eritrea", "ER"],
        ["Estonia", "EE"],
        ["Ethiopia", "ET"],
        ["Falkland Islands", "FK"],
        ["Faroe Islands", "FO"],
        ["Fiji", "FJ"],
        ["Finland", "FI"],
        ["France", "FR"],
        ["French Guiana", "GF"],
        ["French Polynesia", "PF"],
        ["French Southern Territories", "TF"],
        ["Gabon", "GA"],
        ["Gambia", "GM"],
        ["Georgia", "GE"],
        ["Germany", "DE"],
        ["Ghana", "GH"],
        ["Gibraltar", "GI"],
        ["Greece", "GR"],
        ["Greenland", "GL"],
        ["Grenada", "GD"],
        ["Guadeloupe", "GP"],
        ["Guam", "GU"],
        ["Guatemala", "GT"],
        ["Guinea", "GN"],
        ["Guinea-Bissau", "GW"],
        ["Guyana", "GY"],
        ["Haiti", "HT"],
        ["Heard and McDonald Islands", "HM"],
        ["Honduras", "HN"],
        ["Hong Kong", "HK"],
        ["Hungary", "HU"],
        ["Iceland", "IS"],
        ["India", "IN"],
        ["Indonesia", "ID"],
        ["Iran", "IR"],
        ["Iraq", "IQ"],
        ["Ireland", "IE"],
        ["Israel", "IL"],
        ["Italy", "IT"],
        ["Ivory Coast", "CI"],
        ["Jamaica", "JM"],
        ["Japan", "JP"],
        ["Jordan", "JO"],
        ["Kazakhstan", "KZ"],
        ["Kenya", "KE"],
        ["Kiribati", "KI"],
        ["Kuwait", "KW"],
        ["Kyrgyzstan", "KG"],
        ["Laos", "LA"],
        ["Latvia", "LV"],
        ["Lebanon", "LB"],
        ["Lesotho", "LS"],
        ["Liberia", "LR"],
        ["Libya", "LY"],
        ["Liechtenstein", "LI"],
        ["Lithuania", "LT"],
        ["Luxembourg", "LU"],
        ["Macau", "MO"],
        ["Macedonia", "MK"],
        ["Madagascar", "MG"],
        ["Malawi", "MW"],
        ["Malaysia", "MY"],
        ["Maldives", "MV"],
        ["Mali", "ML"],
        ["Malta", "MT"],
        ["Marshall Islands", "MH"],
        ["Martinique", "MQ"],
        ["Mauritania", "MR"],
        ["Mauritius", "MU"],
        ["Mayotte", "YT"],
        ["Mexico", "MX"],
        ["Micronesia", "FM"],
        ["Moldova", "MD"],
        ["Monaco", "MC"],
        ["Mongolia", "MN"],
        ["Montserrat", "MS"],
        ["Morocco", "MA"],
        ["Mozambique", "MZ"],
        ["Myanmar", "MM"],
        ["Namibia", "NA"],
        ["Nauru", "NR"],
        ["Nepal", "NP"],
        ["Netherlands", "NL"],
        ["Netherlands Antilles", "AN"],
        ["New Caledonia", "NC"],
        ["New Zealand", "NZ"],
        ["Nicaragua", "NI"],
        ["Niger", "NE"],
        ["Nigeria", "NG"],
        ["Niue", "NU"],
        ["Norfolk Island", "NF"],
        ["North Korea", "KP"],
        ["Northern Mariana Islands", "MP"],
        ["Norway", "NO"],
        ["Oman", "OM"],
        ["Pakistan", "PK"],
        ["Palau", "PW"],
        ["Panama", "PA"],
        ["Papua New Guinea", "PG"],
        ["Paraguay", "PY"],
        ["Peru", "PE"],
        ["Philippines", "PH"],
        ["Pitcairn", "PN"],
        ["Poland", "PL"],
        ["Portugal", "PT"],
        ["Puerto Rico", "PR"],
        ["Qatar", "QA"],
        ["Reunion", "RE"],
        ["Romania", "RO"],
        ["Russian Federation", "RU"],
        ["Rwanda", "RW"],
        ["S. Georgia and S. Sandwich Islands", "GS"],
        ["Saint Kitts and Nevis", "KN"],
        ["Saint Lucia", "LC"],
        ["Saint Vincent and The Grenadines", "VC"],
        ["Samoa", "WS"],
        ["San Marino", "SM"],
        ["Sao Tome and Principe", "ST"],
        ["Saudi Arabia", "SA"],
        ["Senegal", "SN"],
        ["Seychelles", "SC"],
        ["Sierra Leone", "SL"],
        ["Singapore", "SG"],
        ["Slovakia", "SK"],
        ["Slovenia", "SI"],
        ["Solomon Islands", "SB"],
        ["Somalia", "SO"],
        ["South Africa", "ZA"],
        ["South Korea", "KR"],
        ["Soviet Union", "SU"],
        ["Spain", "ES"],
        ["Sri Lanka", "LK"],
        ["St. Helena", "SH"],
        ["St. Pierre and Miquelon", "PM"],
        ["Sudan", "SD"],
        ["Suriname", "SR"],
        ["Svalbard and Jan Mayen Islands", "SJ"],
        ["Swaziland", "SZ"],
        ["Sweden", "SE"],
        ["Switzerland", "CH"],
        ["Syria", "SY"],
        ["Taiwan", "TW"],
        ["Tajikistan", "TJ"],
        ["Tanzania", "TZ"],
        ["Thailand", "TH"],
        ["Togo", "TG"],
        ["Tokelau", "TK"],
        ["Tonga", "TO"],
        ["Trinidad and Tobago", "TT"],
        ["Tunisia", "TN"],
        ["Turkey", "TR"],
        ["Turkmenistan", "TM"],
        ["Turks and Caicos Islands", "TC"],
        ["Tuvalu", "TV"],
        ["Uganda", "UG"],
        ["Ukraine", "UA"],
        ["United Arab Emirates", "AE"],
        ["United Kingdom", "UK"],
        ["United States", "US"],
        ["Uruguay", "UY"],
        ["US Minor Outlying Islands", "UM"],
        ["US Virgin Islands", "VI"],
        ["Uzbekistan", "UZ"],
        ["Vanuatu", "VU"],
        ["Venezuela", "VE"],
        ["Viet Nam", "VN"],
        ["Wallis and Futuna Islands", "WF"],
        ["Western Sahara", "EH"],
        ["Yemen", "YE"],
        ["Yugoslavia", "YU"],
        ["Zaire", "ZR"],
        ["Zambia", "ZM"],
        ["Zimbabwe", "ZW"]])

    .value("REGIONS_CA", [
        ["Alberta", "AB"],
        ["British Columbia", "BC"],
        ["Manitoba", "MB"],
        ["New Brunswick", "NB"],
        ["Newfoundland and Labrador", "NL"],
        ["Northwest Territories", "NT"],
        ["Nova Scotia", "NS"],
        ["Nunavut", "NV"],
        ["Ontario", "ON"],
        ["Prince Edward Island", "PE"],
        ["Quebec", "QC"],
        ["Saskatchewan", "SK"],
        ["Yukon Territory", "YT"]])

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
        ["Wyoming", "WY"]]);

(function (angular) {
  "use strict";

  angular.module("risevision.common.userstate",
    ["risevision.common.gapi", "risevision.common.localstorage",
    "risevision.common.config", "risevision.common.cache",
    "risevision.common.oauth2", "ngBiscuit",
    "risevision.common.util", "risevision.common.userprofile",
    "risevision.common.company"
  ])

  // constants (you can override them in your app as needed)
  .value("DEFAULT_PROFILE_PICTURE", "http://api.randomuser.me/portraits/med/men/33.jpg")
  .value("OAUTH2_SCOPES", "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile")

  .factory("userState", [
    "$injector", "$q", "$log", "oauthAPILoader", "$location", "CLIENT_ID",
    "gapiLoader", "pick", "cookieStore", "OAUTH2_SCOPES", "userInfoCache",
    "getOAuthUserInfo", "getUserProfile", "getCompany", "$rootScope",
    function ($injector, $q, $log, oauthAPILoader, $location, CLIENT_ID,
    gapiLoader, pick, cookieStore, OAUTH2_SCOPES, userInfoCache,
    getOAuthUserInfo, getUserProfile, getCompany, $rootScope) {
    //singleton factory that represents userState throughout application
    var _profile = {}; //Rise vision profile
    var _user = {};  //Google user
    var _userCompany = {};
    var _selectedCompany = {};
    var _roleMap = {};
    var _accessToken = cookieStore.get("rv-token");

      //
      var _follow = function(source) {
        var Follower = function(){};
        Follower.prototype = source;
        return new Follower();
      };

    var initializeAccessToken = function () {
      //load token from cookie
      if(_accessToken) {
        _accessToken = JSON.parse(_accessToken);
        gapiLoader().then(function (gApi) {
          gApi.auth.setToken(_accessToken);
        });
      }

      $log.debug("Access token", _accessToken);
    };

    initializeAccessToken();

    var _setAccessToken = function (obj) {
      if(typeof obj === "object") {
        //As per doc: https://developers.google.com/api-client-library/javascript/reference/referencedocs#OAuth20TokenObject
        _accessToken = obj = pick(obj, "access_token", "state");
        cookieStore.put(
          "rv-token", JSON.stringify(obj), {domain: _getBaseDomain()});
        cookieStore.put(
          "rv-token", JSON.stringify(obj));
      }

      return gapiLoader().then(function (gApi) {
        gApi.auth.setToken(obj);
      });
    };

    var _clearAccessToken = function () {
      $log.debug("Clearing access token...");
      _accessToken = null;
      cookieStore.remove("rv-token",
        {domain: "." + _getBaseDomain()});
      cookieStore.remove("rv-token");
      return gapiLoader().then(function (gApi) {
        gApi.auth.setToken();
      });
    };


    var _looksLikeIp = function (addr)
    {
     if (/^([0-9])+\.([0-9])+\.([0-9])+\.([0-9])+$/.test(addr))
      {
        return (true);
      }
      return (false);
    };

    var _getBaseDomain = function () {
      var result;
      if(!result) {
        var hostname = $location.host();
        var port = $location.port() ? ":" + $location.port() : "";

        if(_looksLikeIp(hostname)) {
          result = hostname + port;
        }
        else {
          var parts = hostname.split(".");
          if(parts.length > 1) {
            //localhost
            result = "." + parts.slice(parts.length -2).join(".") + port;
          }
          else {
            result = "." + hostname + port;
          }
        }

        $log.debug("baseDomain", result);
      }
      return result;
    };

    var _clearObj = function (obj) {
      for (var member in obj) {
        delete obj[member];
      }
    };

    var _clearAndCopy = function (src, dest) {
      _clearObj(dest);
      angular.extend(dest, src);
    };

    var _resetUserState = function () {
       _clearObj(_user);
       _clearObj(_selectedCompany);
       _clearObj(_profile);
       _clearObj(_userCompany);
       _roleMap = null;
       $log.debug("User state has been reset.");
     };

     var refreshProfile = function () {
       var deferred = $q.defer();
         getOAuthUserInfo().then(function (oauthUserInfo) {
         //populate profile if the current user is a rise vision user
         getUserProfile(_user.username, true).then(
           function (profile) {
             _clearAndCopy(angular.extend({
               username: oauthUserInfo.email
             }, profile), _profile);

             //set role map
             _roleMap = {};
             if(_profile.roles) {
                _profile.roles.forEach(function (val){
                  _roleMap[val] = true;
                });
             }
             deferred.resolve();
           }, deferred.reject);
       }, deferred.reject);
       return deferred.promise;
     };

     /*
     * Responsible for triggering the Google OAuth process.
     *
     */
     var _authorize = function(attemptImmediate) {
       var authorizeDeferred = $q.defer();

       var opts = {
         client_id: CLIENT_ID,
         scope: OAUTH2_SCOPES,
         cookie_policy: $location.protocol() + "://" +
           _getBaseDomain()
       };

       if (attemptImmediate) {
         opts.immediate = true;
       }
       else {
         opts.prompt = "select_account";
       }

       oauthAPILoader().then(function (gApi) {
         gApi.auth.authorize(opts, function (authResult) {
           $log.debug("authResult", authResult);
           if (authResult && !authResult.error) {
             _setAccessToken(authResult);

             getOAuthUserInfo().then(function (oauthUserInfo) {
               if(!_user || !_profile ||
                 _user.username !== oauthUserInfo.email) {

                 //populate user
                 _clearAndCopy({
                   username: oauthUserInfo.email,
                   picture: oauthUserInfo.picture
                 }, _user);

                 refreshProfile().then(function () {
                   //populate userCompany
                   return getCompany().then(function(company) {
                      _clearAndCopy(company, _userCompany);
                     _clearAndCopy(company, _selectedCompany);

                   }, function () { _clearObj(_userCompany);
                   }).finally(function () {
                    authorizeDeferred.resolve(authResult);
                    $rootScope.$broadcast("risevision.user.authorized");
                   });
                 },
                 function () {
                   authorizeDeferred.resolve(authResult);
                   $rootScope.$broadcast("risevision.user.authorized");
                 });
               }
               else {authorizeDeferred.resolve(authResult); }
             }, function(err){
               _clearObj(_user);
             authorizeDeferred.reject(err); });
           }
           else {
             _clearObj(_user);
             authorizeDeferred.reject("not authorized");
           }
         });
       }, authorizeDeferred.reject);
       return authorizeDeferred.promise;
     };

     var authenticate = function(forceAuth) {
           var authenticateDeferred = $q.defer();
           $log.debug("authentication called");
           if(forceAuth) {
             _resetUserState();
             userInfoCache.removeAll();
           }

           // This flag indicates a potentially authenticated user.
           var userAuthed = (angular.isDefined(_accessToken) && _accessToken !== null);
           $log.debug("userAuthed", userAuthed);

           if (forceAuth || userAuthed === true) {
             _authorize(!forceAuth)
             .then(function(authResult) {
               if (authResult && ! authResult.error) {
                 authenticateDeferred.resolve();
               }
               else {
                 _clearAccessToken();
                 authenticateDeferred.reject("Authentication Error: " + authResult.error);
               }
             }, function () {
               _clearAccessToken();
               authenticateDeferred.reject();});
           }
           else {
             var msg = "user is not authenticated";
             $log.debug(msg);
             _clearAccessToken();
             authenticateDeferred.reject(msg);
             _clearObj(_user);
           }

       return authenticateDeferred.promise;
     };

     var signOut = function() {
       var deferred = $q.defer();
       userInfoCache.removeAll();
       gapiLoader().then(function (gApi) {
         gApi.auth.signOut();
         // The flag the indicates a user is potentially
         // authenticated already, must be destroyed.
         _clearAccessToken().then(function () {
           //clear auth token
           // The majority of state is in here
           _resetUserState();
           _clearObj(_user);
           //call google api to sign out
           $rootScope.$broadcast("risevision.user.signedOut");
           $log.debug("User is signed out.");
           deferred.resolve();
         }, function () {
           deferred.reject();
         });
       });
       return deferred.promise;
     };

    var isLoggedIn = function () {
      if(!_user.username) {return false; }
      else { return true; }
    };

    var isRiseVisionUser = function () {
      return _profile.username !== null &&
        _profile.username !== undefined;
    };

    var hasRole = function (role) {
      return angular.isDefined(_roleMap[role]);
    };

    var userState = {
      getSelectedCompanyId: function () {
        return (_selectedCompany && _selectedCompany.id) || null; },
      getSelectedCompanyName: function () {
        return (_selectedCompany && _selectedCompany.name) || null;},
      getSelectedCompanyCountry: function () {
          return (_selectedCompany && _selectedCompany.country) || null;},
      getUsername: function () {
        return (_user && _user.username) || null; },
      getCopyOfProfile: function () { return _follow(_profile); },
      resetCompany: function () { _clearAndCopy(_userCompany, _selectedCompany); },
      getCopyOfUserCompany: function () { return _follow(_userCompany); },
      getCopyOfSelectedCompany: function () { return _follow(_selectedCompany); },
      switchCompany: function (company) { _clearAndCopy(company, _selectedCompany); },
      isSubcompanySelected: function () {
        return _selectedCompany && _selectedCompany.id !== (_userCompany && _userCompany.id); },
      getUserPicture: function () { return _user.picture; },
      hasRole: hasRole,
      isRiseAdmin: function () {return hasRole("ba"); },
      isUserAdmin: function () {return hasRole("ua"); },
      isPurchaser: function () {return hasRole("pu"); },
      isSeller: function () {return _selectedCompany && _selectedCompany.isSeller === true; },
      isRiseVisionUser: isRiseVisionUser,
      isLoggedIn: isLoggedIn,
      authenticate: authenticate,
      signOut: signOut,
      refreshProfile: refreshProfile
    };

    window.userState = userState;
    return userState;
  }]);

})(angular);

(function (angular) {
  "use strict";

angular.module("risevision.common.ui-status", [])

.constant("uiStatusDependencies", {
  _dependencies: {},
  addDependencies: function (deps) {
    angular.extend(this._dependencies, deps);
  }
})

.factory("uiStatusManager", ["$log", "$q", "$injector", "uiStatusDependencies",
  function ($log, $q, $injector, uiStatusDependencies) {

  var _status;
  var _dependencyMap = uiStatusDependencies._dependencies;

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
            $injector.get(status)().then(
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
              $log.debug("Failed to reach status", dep, " because its dependencies are not satisfied. Last rejected dep: ", lastRej);
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
      $injector.get(status)().then(
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

  var _recheckStatus = function (desiredStatus) {
    if(!desiredStatus) {desiredStatus = "registrationComplete"; }
    return _attemptStatus(desiredStatus).then(
      function () {
        _status = desiredStatus;
      },
      function (status) {
        // if rejected at any given step,
        // show the dialog of that relevant step
        _status = status;
      });
  };


  var invalidateStatus = function (desiredStatus) {
    _status = "pendingCheck";
    return _recheckStatus(desiredStatus);
  };

  var uiStateManager = {
    invalidateStatus: invalidateStatus,
    getStatus: function () { return _status; },
    isStatusUndetermined: function () { return _status === "pendingCheck"; }
  };


  window.state = uiStateManager;

  return uiStateManager;
}]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.account", [
  "risevision.common.gapi", "risevision.common.oauth2",
  "risevision.common.company",
  "risevision.common.cache"])

  .factory("agreeToTerms", ["$q", "riseAPILoader", "$log", "userInfoCache",
  function ($q, riseAPILoader, $log, userInfoCache) {
    return function () {
      $log.debug("agreeToTerms called.");
      var deferred = $q.defer();
      riseAPILoader().then(function (coreApi) {
        var request = coreApi.account.agreeToTerms();
        request.execute(function (resp) {
          $log.debug("agreeToTerms resp", resp);
          userInfoCache.removeAll();
          if(!resp.error) {
            deferred.resolve();
          }
          else {
            deferred.reject(resp.error);
          }
        });
      });
      return deferred.promise;
    };
  }])

  .factory("registerAccount", ["$q", "$log",
  "createCompany", "addAccount", "updateUser", "agreeToTerms",
  function ($q, $log, createCompany, addAccount, updateUser,
    agreeToTerms) {
    return function (username, basicProfile) {
      $log.debug("registerAccount called.", username, basicProfile);
      var deferred = $q.defer();
      addAccount().then().finally(function () {
        agreeToTerms().then().finally(function () {
          updateUser(username, basicProfile).then(function (resp) {
            if(resp.result) { deferred.resolve(); }
            else { deferred.reject(); }
          }, deferred.reject).finally("registerAccount ended");
        });
      });
      return deferred.promise;
    };
  }])

  .factory("addAccount", ["$q", "riseAPILoader", "$log",
  function ($q, riseAPILoader, $log) {
    return function () {
      $log.debug("addAccount called.");
      var deferred = $q.defer();
      riseAPILoader().then(function (coreApi) {
        var request = coreApi.account.add();
        request.execute(function (resp) {
            $log.debug("addAccount resp", resp);
            if(resp.result) {
              deferred.resolve();
            }
            else {
              deferred.reject("addAccount");
            }
        });
      });
      return deferred.promise;
    };
  }]);

})(angular);

(function (angular) {
  "use strict";

  angular.module("risevision.common.registration",
  ["risevision.common.userstate", "risevision.common.ui-status",
  "risevision.common.userprofile", "risevision.common.gapi"])

  .config(["uiStatusDependencies", function (uiStatusDependencies) {
    uiStatusDependencies.addDependencies({
      "registerdAsRiseVisionUser" : "signedInWithGoogle",
      "registrationComplete": ["notLoggedIn", "registerdAsRiseVisionUser"]
    });
  }])

  .factory("registrationComplete", ["$q", function ($q) {
    return function () {
      var deferred = $q.defer();
      deferred.resolve(true);
      return deferred.promise;
    };
  }])

  .factory("signedInWithGoogle", ["$q", "getOAuthUserInfo", "userState",
  function ($q, getOAuthUserInfo, userState) {
    return function () {
      var deferred = $q.defer();
      // userState.authenticate(false).then().finally(function () {
        if(userState.isLoggedIn()){
          deferred.resolve();
        }
        else {
          deferred.reject("signedInWithGoogle");
        }
      // });
      return deferred.promise;
    };
  }])

  .factory("notLoggedIn", ["$q", "$log", "signedInWithGoogle",
  function ($q, $log, signedInWithGoogle) {
    return function () {
      var deferred = $q.defer();
      signedInWithGoogle().then(function () {
        deferred.reject("notLoggedIn");
      }, deferred.resolve);
      return deferred.promise;
    };
  }])

  .factory("registerdAsRiseVisionUser", ["$q", "getUserProfile", "cookieStore", "$log", "userState",
  function ($q, getUserProfile, cookieStore, $log, userState) {
    return function () {
      var deferred = $q.defer();

      getUserProfile(userState.getUsername()).then(function (profile) {
        if(angular.isDefined(profile.email) &&
          angular.isDefined(profile.mailSyncEnabled)) {
          deferred.resolve(profile);
        }
        else if (cookieStore.get("surpressRegistration")){
          deferred.resolve({});
        }
        else {
          deferred.reject("registerdAsRiseVisionUser");
        }
      }, function (err) {
        if (cookieStore.get("surpressRegistration")){
          deferred.resolve({});
        }
        else {
          $log.debug("registerdAsRiseVisionUser rejected", err);
          deferred.reject("registerdAsRiseVisionUser");
        }
      });

      return deferred.promise;
    };
  }]);

})(angular);

(function (angular){

  "use strict";

  angular.module("risevision.common.cache", [])

    .value("rvStorage", sessionStorage)

    .factory("userInfoCache", ["$cacheFactory", function ($cacheFactory) {
      return $cacheFactory("user-info-cache");
    }])

    .service("cacheService", ["rvStorage", function (rvStorage) {
      var products = [];
      this.clear = function () {
          rvStorage.clear();
      };

      this.getProduct = function (productId) {
          if (products && products.length > 0) {
              for (var i = 0; i < products.length; i++) {
                  if (products[i].id === productId) {
                      return products[i];
                  }
              }
          }
          return null;
      };

      this.get = function (key, defaultValue) {
          try {
              var res = rvStorage.getItem(key);
              if (res) {
                  return JSON.parse(res);
              } else {
                  return defaultValue;
              }
          }
          catch (e) {
              return defaultValue;
          }
      };

  } ]);

})(angular);

(function (angular) {

  "use strict";
  angular.module("risevision.common.userprofile", [
  "risevision.common.gapi", "risevision.common.oauth2",
  "risevision.common.cache", "risevision.common.util",
  "risevision.common.userstate"])

  .value("userRoleMap", {
    "ce": "Content Editor",
    "cp": "Content Publisher",
    "da": "Display Administrator",
    "ua": "Administrator",
    "sa": "System Administrator",
    "pu": "Purchaser",
    "ba": "Billing Administrator"
  })

  .factory("getUserProfile", ["oauthAPILoader", "coreAPILoader", "$q", "$log",
  "getOAuthUserInfo", "userInfoCache",
  function (oauthAPILoader, coreAPILoader, $q, $log, getOAuthUserInfo,
    userInfoCache) {
    return function (username, clearCache) {
      var deferred = $q.defer();

      if(!username) {
        deferred.reject("getUserProfile failed: username param is required.");
        $log.debug("getUserProfile failed: username param is required.");
      }
      else {

        //clear cache if instructed so
        if(clearCache) {
          userInfoCache.remove("profile-" + username);
        }

        var criteria = {};
        if (username) {criteria.username = username; }
        $log.debug("getUserProfile called", criteria);
        if(userInfoCache.get("profile-" +  username)) {
          //skip if already exists
          $log.debug("getUserProfile resp from cache", "profile-" + username, userInfoCache.get("profile-" + username));
          deferred.resolve(userInfoCache.get("profile-" + username));
        }
        else {
          $q.all([oauthAPILoader(), coreAPILoader()]).then(function (results){
            var coreApi = results[1];
            // var oauthUserInfo = results[2];
            coreApi.user.get(criteria).execute(function (resp){
              if (resp.error || !resp.result) {
                deferred.reject(resp);
              }
              else {
                $log.debug("getUser resp", resp);
                  //get user profile
                userInfoCache.put("profile-" + username, resp.item);
                deferred.resolve(resp.item);
              }
            });
          }, deferred.reject);
        }

      }
      return deferred.promise;
    };
  }])

  .factory("updateUser", ["$q", "coreAPILoader", "$log",
  "userInfoCache", "userState", "getUserProfile", "pick",
  function ($q, coreAPILoader, $log, userInfoCache, userState, getUserProfile, pick) {
    return function (username, profile) {
      $log.debug("updateUser called", username, profile);
      var deferred = $q.defer();
      profile = pick(profile, "mailSyncEnabled",
        "email", "firstName", "lastName", "telephone", "roles");
      if(angular.isDefined(profile.mailSyncEnabled) && typeof profile.mailSyncEnabled === "boolean") {
        //covert boolean to string
        profile.mailSyncEnabled = profile.mailSyncEnabled ? "true" : "false";
      }
      coreAPILoader().then(function (coreApi) {
        var request = coreApi.user.update({
          username: username, data: JSON.stringify(profile)});
        request.execute(function (resp) {
            $log.debug("updateUser resp", resp);
            if(resp.error) {
              deferred.reject(resp);
            }
            else if (resp.result) {
              userInfoCache.remove("profile-" + username);
              getUserProfile(username).then(function() {deferred.resolve(resp);});
            }
            else {
              deferred.reject("updateUser");
            }
        });
      }, deferred.reject);
      return deferred.promise;
    };
  }])

  .factory("addUser", ["$q", "coreAPILoader", "$log",
  function ($q, coreAPILoader, $log) {
    return function (companyId, username, profile) {
      var deferred = $q.defer();
      coreAPILoader().then(function (coreApi) {
        var request = coreApi.user.add({
          username: username,
          companyId: companyId,
          data: JSON.stringify(profile)});
        request.execute(function (resp) {
          $log.debug("addUser resp", resp);
          if(resp.result === true) {
            deferred.resolve(resp);
          }
          else {
            deferred.reject("addUser");
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

(function (angular) {
  "use strict";

  angular.module("risevision.common.shoppingcart", ["risevision.common.userstate"])

  .factory("shoppingCart", ["rvStorage", "$log", "$q", "userState",
    function (rvStorage, $log, $q, userState){
    var _items = [];
    var itemsMap = {};

    var readFromStorage = function() {
      var storedCartContents = rvStorage.getItem("rvStore_OrderProducts");
      $log.debug("read storedCartContents", storedCartContents);
      if (storedCartContents) {
        var res = JSON.parse(storedCartContents);
        if (res && res.items && res.itemsMap) {
          while(_items.length > 0) { _items.pop(); } //clear all items
          for (var i = 0; i < res.items.length; i++) {
            _items.push(res.items[i]);
          }
          itemsMap = res.itemsMap;
          $log.debug(_items.length, "items pushed to cart.");
        }
      }
    };

    var persistToStorage = function() {
      rvStorage.setItem("rvStore_OrderProducts",
        JSON.stringify({items: _items, itemsMap: itemsMap}));
      var storedCartContents = rvStorage.getItem("rvStore_OrderProducts");
      $log.debug("written storedCartContents", storedCartContents);
    };

    var loadReady = $q.defer();

    var cartManager = {
      loadReady: loadReady.promise,
      getSubTotal: function (isCAD) {
        var shipping = 0;
        var subTotal = 0;
        if(_items) {
          for (var i = 0; i < _items.length; i++) {
              var shippingCost = (isCAD) ? _items[i].selected.shippingCAD : _items[i].selected.shippingUSD;
              var productCost = (isCAD) ? _items[i].selected.priceCAD : _items[i].selected.priceUSD;
              if (_items[i].paymentTerms !== "Metered") {
                shipping += shippingCost * _items[i].qty || 0;
                subTotal += productCost * _items[i].qty || 0;
              }
          }
        }

        return subTotal + shipping;
      },
      getShippingTotal: function (isCAD) {
        var shipping = 0;
        if(_items) {
          for (var i = 0; i < _items.length; i++) {
              if (_items[i].paymentTerms !== "Metered") {
                var shippingCost = (isCAD) ? _items[i].selected.shippingCAD : _items[i].selected.shippingUSD;
                shipping += shippingCost * _items[i].qty || 0;
              }
          }
        }
        return shipping;
      },
      clear: function () {
        while(_items.length > 0) { _items.pop(); } //clear all items
        for (var key in itemsMap) {
          delete itemsMap[key];
        }
        $log.debug("Shopping cart cleared.");
      },
      destroy: function () {
        this.clear();
        persistToStorage();
        return _items;
      },
      getItems: function () {
        return _items;
      },
      setItems: function (items) {
        $log.debug("Setting cart items", items);
        while(_items.length > 0) { _items.pop(); } //clear all items
        for (var i = 0; i < items.length; i++) {
          _items.push(items[i]);
        }
        persistToStorage();
      },
      initialize: function () {
        readFromStorage();
        loadReady.resolve();
        return _items;
      },
      getItemCount: function () {
        if(_items !== null) {
          return _items.length;
        }
        else {
          return 0;
        }
      },
      removeItem: function(itemToRemove) {
        if (itemToRemove && itemsMap[itemToRemove.productId]) {
          delete itemsMap[itemToRemove.productId];
          for (var i = 0; i < _items.length; i++) {
            if (_items[i].productId === itemToRemove.productId) {
              _items.splice(i, 1);
              delete itemsMap[itemToRemove.productId];
              break;
            }
          }
          persistToStorage();
        }
      },
      adjustItemQuantity: function(itemToAdjust, qty) {
        if (itemToAdjust && $.isNumeric(qty) && itemsMap[itemToAdjust.id]) {
          if (qty > 0) {
            itemsMap[itemToAdjust.id].quantity = qty;
            itemsMap[itemToAdjust.id].item.qty = qty;
            persistToStorage();
          }
          else {
            this.removeItem(itemToAdjust);
          }
        }
      },
      addItem: function(itemToAdd, qty, pricingIndex) {

        if(!userState.isRiseVisionUser()) {return; }

        if (itemsMap[itemToAdd.productId] && (itemToAdd.paymentTerms === "Subscription" || itemToAdd.paymentTerms === "Metered")) {
          return;
        }

        if (itemToAdd && $.isNumeric(qty) && itemToAdd.orderedPricing.length > pricingIndex) {
          if (itemsMap[itemToAdd.productId]) {
            // qty for existing item is increased
            itemsMap[itemToAdd.productId].qty = parseInt(itemsMap[itemToAdd.productId].qty) + parseInt(qty);
          }
          else {
            // item is not already in the cart
            itemsMap[itemToAdd.productId] = angular.copy(itemToAdd);
            itemsMap[itemToAdd.productId].qty = qty;
            _items.push(itemsMap[itemToAdd.productId]);
          }
          itemsMap[itemToAdd.productId].selected = itemToAdd.orderedPricing[pricingIndex];
          persistToStorage();
        }
      }
    };
    cartManager.initialize();

    return cartManager;

  }]);
})(angular);

(function (angular) {

  "use strict";

  angular.module("risevision.common.systemmessages",
  ["risevision.common.gapi"])

    .factory("systemMessages", [function () {

      var messages = [];

      function pushMessage (m, list) {
        //TODO add more sophisticated, sorting-based logic here
        list.push(m);
      }

      messages.addMessages = function (newMessages) {
        if(newMessages && newMessages instanceof Array) {
          newMessages.forEach(function (m) {
            //temporary logic to avoid duplicate messages
            var duplicate = false;
            messages.forEach(function (um) {
              if(um.text === m.text) {duplicate = true; }
            });
            if(!duplicate) {
              pushMessage(m, messages);
            }
          });
        }
      };

      messages.clear = function () {
        messages.length = 0;
      };

      return messages;

    }])

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
  angular.module("risevision.common.oauth2",
  ["risevision.common.gapi", "risevision.common.cache"]).
  factory("getOAuthUserInfo", ["oauthAPILoader", "$q", "userInfoCache",
  "$log",
  function (oauthAPILoader, $q, userInfoCache, $log) {
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
        oauthAPILoader().then(function (gApi){
          gApi.client.oauth2.userinfo.get().execute(function (resp){
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

"use strict";

angular.module("risevision.common.company",
  [
    "risevision.common.config",
    "risevision.common.gapi",
    "risevision.common.cache",
    "risevision.common.util"
  ])

    .factory("validateAddress", ["$q", "storeAPILoader", "$log",
  function ($q, storeAPILoader, $log) {
      return function (company) {

        var deferred = $q.defer();
        $log.debug("validateAddress called", company);

        var obj = {
            "street": company.street,
            "unit": company.unit,
            "city": company.city,
            "country": company.country,
            "postalCode": company.postalCode,
            "province": company.province,
        };

        storeAPILoader.get().then(function (storeApi) {
          var request = storeApi.company.validateAddress(obj);
          request.execute(function (resp) {
              $log.debug("validateAddress resp", resp);
              deferred.resolve(resp);
          });
        });

        return deferred.promise;
    };
  }])

  .factory("createCompany", ["$q", "coreAPILoader", function ($q, coreAPILoader) {
    return function (parentCompanyId, company) {
      var deferred = $q.defer();
      company.validate = true;
      coreAPILoader().then(function (coreApi) {
        var request = coreApi.company.add({
          parentId: parentCompanyId,
          data: JSON.stringify(company)
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
    return function (authKey) { //get a company either by id or authKey
      var deferred = $q.defer();
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.move({authKey: authKey});
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
   function ($q, $log, coreAPILoader, pick){
    return function (companyId, fields) {
        var deferred = $q.defer();
        fields = pick(
          fields, "street", "unit", "city", "country", "postalCode", "province");
        $log.debug("updateCompany called", companyId, fields);
        // fields.validate = validationRequired || false;
        coreAPILoader().then(function (coreApi) {
          var request = coreApi.company.update({id: companyId, data: JSON.stringify(fields)});
          request.execute(function (resp) {
            $log.debug("updateCompany resp", resp);
              deferred.resolve(resp);
          });
        });

        return deferred.promise;
    };
  }])

  .service("companyService", ["coreAPILoader", "$q", "$log", "getCompany",
    function (coreAPILoader, $q, $log, getCompany) {

    this.getCompanies = function (companyId, search, cursor, count, sort) {
      var deferred = $q.defer();
      var obj = {
        "companyId": companyId,
        "search": search,
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
(function (angular){
  "use strict";

  try { angular.module("risevision.common.config"); }
catch(err) { angular.module("risevision.common.config", []); }

  angular.module("risevision.common.config")
    .value("CORE_URL", "https://rvaserver2.appspot.com/_ah/api")
    .value("STORE_URL", "https://store.risevision.com")
  ;
})(angular);

"use strict";

try { angular.module("risevision.common.config"); }
catch(err) { angular.module("risevision.common.config", []); }

angular.module("risevision.common.config")
  .value("CLIENT_ID", "614513768474.apps.googleusercontent.com");

/* jshint ignore:start */
var gapiLoadingStatus = null;
function handleClientJSLoad() {
    gapiLoadingStatus = "loaded";
    console.log("ClientJS is loaded.");
    //Ready: create a generic event
    var evt = document.createEvent("Events");
    //Aim: initialize it to be the event we want
    evt.initEvent("gapi.loaded", true, true);
    //FIRE!
    window.dispatchEvent(evt);
}
/* jshint ignore:end */

angular.module("risevision.common.gapi", [])
  .factory("oauthAPILoader", ["gapiLoader", "$q", "$log",
   function (gapiLoader, $q, $log) {
    var deferred = $q.defer();
    var promise;

    return function () {
      if (!promise) {
        promise = deferred.promise;
        gapiLoader().then(function (gApi) {
          gApi.client.load("oauth2", "v2", function () {
              $log.debug("OAuth2 API is loaded");
              deferred.resolve(gApi);
          });
        });
      }
      return promise;
    };

  }])
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
  .factory("coreAPILoader", ["gapiLoader", "$q", "CORE_URL",
    "$location", "$log",
    function (gapiLoader, $q, CORE_URL, $location, $log) {
    var deferred = $q.defer();
    var baseUrl = $location.search().core_api_base_url ? $location.search().core_api_base_url + "/_ah/api": CORE_URL;
    return function () {
      gapiLoader().then(function (gApi) {
        if(gApi.client.core){
          //already loaded. return right away
          deferred.resolve(gApi.client.core);
        }
        else {
          gApi.client.load("core", "v0", function () {
            if (gApi.client.core) {
              $log.debug("Core API Loaded");
              deferred.resolve(gApi.client.core);
            } else {
              var errMsg = "Core API Load Failed";
              $log.error(errMsg);
              deferred.reject(errMsg);
            }
          }, baseUrl);
        }
      });
      return deferred.promise;
    };
  }])
  .factory("riseAPILoader", ["gapiLoader", "$q", "CORE_URL",
    "$location", "$log",
    function (gapiLoader, $q, CORE_URL, $location, $log) {
    var deferred = $q.defer();
    var baseUrl = $location.search().core_api_base_url ? $location.search().core_api_base_url + "/_ah/api": CORE_URL;
    return function () {
      gapiLoader().then(function (gApi) {
        if(gApi.client.rise){
          //already loaded. return right away
          deferred.resolve(gApi.client.rise);
        }
        else {
          gApi.client.load("rise", "v0", function () {
            if (gApi.client.core) {
              $log.debug("Rise API Loaded");
              deferred.resolve(gApi.client.rise);
            } else {
              var errMsg = "Rise API Load Failed";
              $log.error(errMsg);
              deferred.reject(errMsg);
            }
          }, baseUrl);
        }
      });
      return deferred.promise;
    };
  }]);

(function (angular){

  "use strict";

  angular.module("risevision.common.localstorage", ["ngStorage"])
    .factory("localStorageService", ["$localStorage", "$sessionStorage", function ($localStorage, $sessionStorage) {

      var storageImpl = localStorage ? localStorage : sessionStorage;
      var storageImplWrapper = localStorage ? $localStorage : $sessionStorage;

      var factory = {};

      factory.getStorage = function() {
        return storageImplWrapper;
      };

      factory.setItemImmediate = function(key, value) {
        storageImpl.setItem(key, value);
      };

      factory.removeItemImmediate = function(key) {
        storageImpl.removeItem(key);
      };

      factory.getItem = function(key) {
        return storageImpl.getItem(key);
      };

      return factory;

    }]);

})(angular);

(function (angular) {

  "use strict";

  angular.module("risevision.common.systemmessages",
  ["risevision.common.gapi"])

    .factory("systemMessages", [function () {

      var messages = [];

      function pushMessage (m, list) {
        //TODO add more sophisticated, sorting-based logic here
        list.push(m);
      }

      messages.addMessages = function (newMessages) {
        if(newMessages && newMessages instanceof Array) {
          newMessages.forEach(function (m) {
            //temporary logic to avoid duplicate messages
            var duplicate = false;
            messages.forEach(function (um) {
              if(um.text === m.text) {duplicate = true; }
            });
            if(!duplicate) {
              pushMessage(m, messages);
            }
          });
        }
      };

      messages.clear = function () {
        messages.length = 0;
      };

      return messages;

    }])

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
