"use strict";

/*jshint node: true */
/* global concat: true */

// ************************
// * Rise Vision Storage UI *
// * build script         *
// ************************

// Include gulp

var env = process.env.NODE_ENV || "dev",
    gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    watch = require("gulp-watch"),
    factory = require("widget-tester").gulpTaskFactory,
    runSequence = require("run-sequence"),
    html2js = require("gulp-html2js"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    usemin = require("gulp-usemin"),
    es = require("event-stream"),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css"),
    gulpInject = require("gulp-inject");

    var unitTestFiles = [
    "components/jquery/dist/jquery.js",
    "components/angular/angular.js",
    "components/q/q.js",
    "components/lodash/dist/lodash.js",
    "components/ngstorage/ngStorage.js",
    "components/angular-bootstrap/ui-bootstrap-tpls.js",
    "components/angular-ui-flow-manager/src/js/*.js",
    "components/angular-mocks/angular-mocks.js",
    "components/angular-sanitize/angular-sanitize.js",
    "components/angular-spinner/angular-spinner.js",
    "components/angular-touch/angular-touch.js",
    "components/ng-biscuit/dist/ng-biscuit.js",
    "components/ng-csv/build/ng-csv.js",
    "components/angular-local-storage/dist/angular-local-storage.js",
    "components/rv-loading/loading.js",
    "components/rv-common-svg/dist/svg.js",
    "components/ng-gapi-loader/src/js/*.js",
    "components/ng-core-api-client/src/js/*.js",
    "components/checklist-model/checklist-model.js",
    "components/rv-common-app-components/dist/js/last-modified.js",
    "components/rv-common-app-components/dist/js/countries.js",
    "src/js/config/config.js",
    "test/unit/fixtures/*.js",
    "src/templates.js",
    "src/js/**/*.js",
    "test/unit/**/*spec.js"
    ],
    commonHeaderSrcFiles = ["./src/templates.js", "./src/js/dtv-common-header.js",
    "./src/js/directives/dtv-integer-parser.js",
    "./src/js/directives/dtv-company-buttons.js",
    "./src/js/controllers/ctr-global-alerts.js",
    "./src/js/controllers/ctr-auth-buttons.js",
    "./src/js/controllers/ctr-signup-modal.js",
    "./src/js/controllers/ctr-signup-button.js",
    "./src/js/controllers/ctr-company-buttons.js",
    "./src/js/controllers/ctr-shoppingcart.js",
    "./src/js/controllers/ctr-close-frame.js",
    "./src/js/controllers/ctr-system-messages.js",
    "./src/js/controllers/ctr-modals.js",
    "./src/js/controllers/ctr-registration-modal.js",
    "./src/js/controllers/ctr-move-company-modal.js",
    "./src/js/controllers/ctr-company-settings-modal.js",
    "./src/js/controllers/ctr-subcompany-modal.js",
    "./src/js/controllers/ctr-subcompany-selector-modal.js",
    "./src/js/controllers/ctr-subcompany-banner.js",
    "./src/js/controllers/ctr-test-company-banner.js",
    "./src/js/controllers/ctr-company-users-modal.js",
    "./src/js/controllers/ctr-user-settings-modal.js",
    "./src/js/controllers/ctr-signout-modal.js",
    "./src/js/ui-components/off-canvas-nav.js",
    "./src/js/ui-components/action-sheet.js",
    "./src/js/angular-scrollevents.js",
    "./src/js/svc-util.js",
    "./src/js/svc-geodata.js",
    "./src/js/svc-popup-detector.js",
    "./src/js/svc-userstate.js",
    "./src/js/svc-companystate.js",
    "./components/angular-ui-flow-manager/src/js/svc-ui-flow.js",
    "./src/js/svc-account.js",
    "./src/js/svc-registration.js",
    "./components/ng-core-api-client/src/js/svc-cache.js",
    "./components/ng-core-api-client/src/js/svc-core-util.js",
    "./components/ng-core-api-client/src/js/svc-user.js",
    "./components/ng-core-api-client/src/js/svc-company.js",
    "./components/ng-core-api-client/src/js/svc-oauth2.js",
    "./components/ng-core-api-client/src/js/svc-system-messages.js",
    "./components/ng-core-api-client/src/js/svc-countries.js",
    "./components/ng-core-api-client/src/js/svc-fastpass.js",
    "./src/js/directives/dtv-fastpass.js",
    "./src/js/svc-selected-company-url-handler.js",
    "./src/js/svc-shoppingcart.js",
    "./src/js/config/config.js",
    "./src/js/svc-config.js",
    "./components/ng-gapi-loader/src/js/svc-gapi.js",
    "./src/js/svc-localstorage.js",
    "./src/js/svc-system-messages.js",
    "./src/js/svc-data-gadgets.js",
    "./components/rv-common-app-components/dist/js/last-modified.js",
    "./components/rv-common-app-components/dist/js/countries.js"
    ],
    dependencySrcFiles = ["./components/jquery/dist/jquery.js",
    "./components/angular/angular.js",
    "./components/angular-route/angular-route.js",
    "./components/angular-sanitize/angular-sanitize.js",
    "./components/angular-animate/angular-animate.js",
    "./components/angular-touch/angular-touch.js",
    "./components/bootstrap/dist/js/bootstrap.js",
    "./components/angular-bootstrap/ui-bootstrap.js",
    "./components/angular-bootstrap/ui-bootstrap-tpls.js",
    "./components/checklist-model/checklist-model.js",
    "./components/ngstorage/ngStorage.js",
    "./components/angular-spinner/angular-spinner.js",
    "./components/spin.js/spin.js",
    "./components/rv-common-svg/dist/svg.js",
    "./components/rv-loading/loading.js",
    "./components/ng-biscuit/dist/ng-biscuit.js",
    "./components/lodash/dist/lodash.js",
    "./components/jquery-ui/ui/jquery-ui.js",
    "./components/ng-csv/build/ng-csv.js",
    "./components/angular-ui-sortable/sortable.js",
    "./components/angular-local-storage/dist/angular-local-storage.js"],
    gapiMockSrcFiles = [
    "./components/rv-gapi-mock/observed-browser.js",
    "./components/rv-gapi-mock/_mock-data.js",
    "./components/rv-gapi-mock/gapi-mock-data/users.js",
    "./components/rv-gapi-mock/gapi-mock-data/companies.js",
    "./components/rv-gapi-mock/gapi-mock-data/accounts.js",
    "./components/rv-gapi-mock/gapi-mock-data/systemmessages.js",
    "./components/mustache/mustache.js",
    "./components/rv-gapi-mock/gapi-mock.js",
    ],
    injectorGenerator = function (srcFiles, id) {
      return gulpInject(
        gulp.src(srcFiles,
          {read: false}),
          {starttag: "<!-- inject:" + id + ":{{ext}} -->", relative: true});
      };

gulp.task("coerce-prod-env", function () {
  env = "prod";
});

gulp.task("html", ["coerce-prod-env", "html-inject", "html2js", "lint"], function () {
  return es.concat(
    gulp.src("test/e2e/index.html")
    .pipe(usemin({ js: [], css: [] }))
    .pipe(gulp.dest("dist/")),
    //minified
    gulp.src("test/e2e/index.html")
    .pipe(usemin({
      js: [uglify()], css: [minifyCss()]
    }))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("dist/"))
  );
});


gulp.task("build", ["html"]);

gulp.task("fonts-copy", function () {
  //TODO This is a temporary solution. Dulpicate files. Not recommended

  return es.concat(
    gulp.src(["src/css/fonts/*"])
    .pipe(gulp.dest("./dist/css/fonts")),
    gulp.src(["src/css/fonts/*"])
    .pipe(gulp.dest("./dist/fonts"))),
    gulp.src(["components/font-awesome/fonts/*"])
    .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("lint", ["config", "fonts-copy"], function() {
  return gulp.src([
      "src/js/**/*.js",
      "test/**/*.js"
    ])
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(jshint.reporter("fail"))
    .on("error", function () {
      process.exit(1);
    });
});

gulp.task("html-inject", function () {
  return es.concat(
    gulp.src("src/html/popup-auth_raw.html")
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(rename("popup-auth.html"))
    .pipe(gulp.dest("src/html")),
    gulp.src("src/html/popup-auth_raw.html")
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(rename("popup-auth_e2e.html"))
    .pipe(gulp.dest("src/html")),
    gulp.src("test/e2e/index_raw.html")
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(rename("index.html"))
    .pipe(gulp.dest("test/e2e"))
  );
});

gulp.task("html-inject-watch", function () {
  watch({glob: "src/**/*"}, function () {
    return es.concat(gulp.src("src/html/popup-auth_raw.html")
    .pipe(rename("popup-auth.html"))
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(gulp.dest("src/html")),
    gulp.src("src/html/popup-auth_raw.html")
    .pipe(rename("popup-auth_e2e.html"))
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(gulp.dest("src/html")),
    gulp.src("test/e2e/index_raw.html")
    .pipe(rename("index.html"))
    .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
    .pipe(injectorGenerator(dependencySrcFiles, "deps"))
    .pipe(injectorGenerator(gapiMockSrcFiles, "gapimock"))
    .pipe(gulp.dest("test/e2e")));
  });

});

gulp.task("html2js", function() {
  return gulp.src("src/templates/**/*.html")
    .pipe(html2js({
      outputModuleName: "risevision.common.header.templates",
      useStrict: true,
      base: "src/templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./src/"));
});

gulp.task("html2js-watch", function() {
  watch({glob: "src/templates/**/*.html"}, function(){
    return gulp.src("src/templates/**/*.html").pipe(html2js({
      outputModuleName: "risevision.common.header.templates",
      useStrict: true,
      base: "src/templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./src/"));
  });
});

gulp.task("build-watch", function() {
  watch({glob: ["src/js/**/*", "src/templates/**/*"]}, function () {
    return runSequence("html");
  });
});

// Update bower, component, npm at once:
gulp.task("bump", function(){
  gulp.src(["./bower.json", "./package.json"])
  .pipe(require("gulp-bump")({type: "patch"}))
  .pipe(gulp.dest("./"));
});

/* Task: config
 * Copies configuration file in place based on the current
   environment variable (default environment is dev)
*/
gulp.task("config", function() {
  return gulp.src(["./src/js/config/" + env + ".js"])
    .pipe(rename("config.js"))
    .pipe(gulp.dest("./src/js/config"));
});

gulp.task("test:unit", ["config"], factory.testUnitAngular({testFiles: unitTestFiles}));
gulp.task("test:unit-watch", ["config"], factory.testUnitAngular({testFiles: unitTestFiles, watch: true}));

gulp.task("server", ["html-inject", "html2js", "config", "fonts-copy"], factory.testServer({https: false}));
gulp.task("server-watch", ["html-inject-watch", "html2js-watch", "config", "fonts-copy"], factory.testServer({https: false}));
gulp.task("server-close", factory.testServerClose());
gulp.task("test:webdrive_update", factory.webdriveUpdate());
gulp.task("test:e2e:core", ["test:webdrive_update"], factory.testE2EAngular({
  browser: "chrome"
}));
gulp.task("test:e2e", function (cb) {
  runSequence("server", "test:e2e:core", "server-close", cb);
});


gulp.task("metrics", factory.metrics());
gulp.task("test", ["lint"], function (cb) {
  runSequence("test:unit", "test:e2e", "metrics", cb);
});

gulp.task("watch", ["test:unit-watch"]);

gulp.task("default", [], function () {
  console.log("\n***********************");
  console.log("* Tell me what to do: *");
  console.log("***********************");
  console.log("* gulp test           *");
  console.log("* gulp build          *");
  console.log("* gulp watch          *");
  console.log("***********************\n");
  return true;
});
