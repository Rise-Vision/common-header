"use strict";

/*jshint node: true */
/* global concat: true */

// ************************
// * Common Header        *
// * build script         *
// ************************

// Include gulp

var env = process.env.NODE_ENV || "dev",
    gulp = require("gulp"),
    jshint = require("gulp-jshint"),
    watch = require("gulp-watch"),
    factory = require("widget-tester").gulpTaskFactory,
    runSequence = require("run-sequence"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    es = require("event-stream"),
    uglify = require("gulp-uglify"),
    prettify = require("gulp-jsbeautifier"),
    gulpInject = require("gulp-inject"),
    del = require("del"),
    path = require("path"),
    fs = require("fs"),
    ngHtml2Js = require("gulp-ng-html2js"),
    minifyHtml = require("gulp-minify-html"),
    i18nBuild = require("./i18n-build"),
    cssBuildn = require("./css-build");

    var unitTestFiles = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/angular/angular.js",
    "bower_components/q/q.js",
    "bower_components/lodash/dist/lodash.js",
    "bower_components/ngstorage/ngStorage.js",
    "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
    "bower_components/angular-mocks/angular-mocks.js",
    "bower_components/angular-sanitize/angular-sanitize.js",
    "bower_components/angular-spinner/angular-spinner.js",
    "bower_components/angular-touch/angular-touch.js",
    "bower_components/angular-ui-router/release/angular-ui-router.js",
    "bower_components/ng-biscuit/dist/ng-biscuit.js",
    "bower_components/ng-csv/build/ng-csv.js",
    "bower_components/angular-local-storage/dist/angular-local-storage.js",
    "bower_components/checklist-model/checklist-model.js",
    "bower_components/angular-translate/angular-translate.js",
    "bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
    "bower_components/angular-md5/angular-md5.min.js",
    "src/js/components/**/app.js",
    "src/js/components/**/svc-*.js",
    "src/js/components/**/dtv-*.js",
    "src/js/components/**/ctr-*.js",
    "src/js/components/**/ftr-*.js",
    "tmp/partials/templates.js",
    "src/js/*.js",
    "src/js/*/*.js",
    "node_modules/widget-tester/mocks/translate-mock.js",
    "test/unit/**/*spec.js",
    "test/unit/**/mocks/*.js",
    "test/unit/**/*.tests.js",
    "test/unit/services/svc-zendesk-override.js"
    ],
    commonHeaderSrcFiles = ["./tmp/partials/templates.js", 
    "./src/js/dtv-common-header.js",
    "./src/js/directives/*.js",
    "./src/js/filters/*.js",
    "./src/js/controllers/*.js",
    "./src/js/components/*.js",
    "./src/js/services/*.js",
    "./dist/js/components/i18n.js",
    "./dist/js/components/gapi-loader.js",
    "./dist/js/components/core-api-client.js",
    "./dist/js/components/ui-flow.js",
    "./dist/js/components/userstate.js",
    "./dist/js/components/last-modified.js",
    "./dist/js/components/loading.js",
    "./dist/js/components/search-filter.js",
    "./dist/js/components/scrolling-list.js",
    "./dist/js/components/stop-event.js",
    "./dist/js/components/segment-analytics.js",
    "./dist/js/components/message-box.js",
    "./dist/js/components/svg-icon.js",
    "./dist/js/components/subscription-status.js",
    "./dist/js/components/plans.js"
    ],
    dependencySrcFiles = ["./bower_components/jquery/dist/jquery.js",
    "./bower_components/angular/angular.js",
    "./bower_components/angular-sanitize/angular-sanitize.js",
    "./bower_components/angular-animate/angular-animate.js",
    "./bower_components/angular-touch/angular-touch.js",
    "./bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
    "./bower_components/angular-ui-router/release/angular-ui-router.js",
    "./bower_components/angular-translate/angular-translate.js",
    "./bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
    "./bower_components/checklist-model/checklist-model.js",
    "./bower_components/ngstorage/ngStorage.js",
    "./bower_components/angular-spinner/angular-spinner.js",
    "./bower_components/spin.js/spin.js",
    "./bower_components/ng-biscuit/dist/ng-biscuit.js",
    "./bower_components/lodash/dist/lodash.js",
    "./bower_components/ng-csv/build/ng-csv.js",
    "./bower_components/angular-md5/angular-md5.min.js",
    "./bower_components/angular-local-storage/dist/angular-local-storage.js"],
    mockSrcFiles = [
    "./node_modules/widget-tester/mocks/segment-analytics-mock.js",
    "./src/js/config/config.js"
    ],
    injectorGenerator = function (srcFiles, id) {
      return gulpInject(
        gulp.src(srcFiles,
          {read: false}),
          {starttag: "<!-- inject:" + id + ":{{ext}} -->", relative: true});
      };

// Tooling
gulp.task("pretty", function() {
  return gulp.src("./src/js/**/*.js")
    .pipe(prettify({config: ".jsbeautifyrc", mode: "VERIFY_AND_WRITE"}))
    .pipe(gulp.dest("./src/js"))
    .on("error", function (error) {
      console.error(String(error));
    });
});

gulp.task("lint", ["pretty"], function() {
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

gulp.task("clean", function () {
  return del(["./tmp/**", "./dist/**"]);
});

// End - Tooling


// Components build
var componentsPath = "./src/js/components/";

var folders = fs.readdirSync(componentsPath)
  .filter(function(file) {
    return fs.statSync(path.join(componentsPath, file)).isDirectory();
  });

gulp.task("components-html2js", function() {
  return gulp.src("./src/templates/components/**/*.html")
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: function (file) {
        var pathParts = file.path.split("/");
        var folder = pathParts[pathParts.length - 2];
        return "risevision.common.components." + folder;
      }
    }))
    .pipe(gulp.dest("./tmp/partials/"));
});

gulp.task("components-dist", function () { //copy angular files
  var tasks = folders.map(function(folder) {
    return gulp.src([
      path.join(componentsPath, folder, "**/app.js"),
      path.join(componentsPath, folder, "**/svc-*.js"),
      path.join(componentsPath, folder, "**/dtv-*.js"),
      path.join(componentsPath, folder, "**/ctr-*.js"),
      path.join(componentsPath, folder, "**/ftr-*.js"),
      path.join("./tmp/partials/", folder, "*.js")
    ])
    .pipe(concat(folder + ".js"))
    .pipe(gulp.dest("dist/js/components"))
    .pipe(uglify())
    .pipe(rename(folder + ".min.js"))
    .pipe(gulp.dest("dist/js/components"));
  });
  return es.concat.apply(null, tasks);
});

gulp.task("components-watch", function(cb) {
  watch({glob: "src/templates/components/**/*.html"}, function() {
    return runSequence("components-html2js");
  });
  watch({glob: ["src/js/components/**/*", "tmp/partials/*/*"]}, function () {
    return runSequence("components-dist");
  });
});

gulp.task("build-components", function (cb) {
  runSequence("components-html2js", "components-dist", cb);
});

// End - Components build


// Dist build
gulp.task("html2js", function() {
  return gulp.src("src/templates/*.html")
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: "risevision.common.header.templates",
      useStrict: true,
      base: "src/templates"
    }))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("./tmp/partials/"));
});

gulp.task("dependencies-dist", function () { //copy angular files
  return gulp.src(dependencySrcFiles)
    .pipe(concat("dependencies.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename("dependencies.min.js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("common-header-dist", function () { //copy angular files
  return gulp.src(commonHeaderSrcFiles.concat(["./src/js/config/prod.js"]))
    .pipe(concat("common-header.js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename("common-header.min.js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("build-dist", function (cb) {
  runSequence(["dependencies-dist", "common-header-dist"], cb);
});

// End - Dist build


// Testing
gulp.task("test:unit", ["config"], factory.testUnitAngular({
  testFiles: unitTestFiles,
  coverageFiles: "../../src/js/**/*.js"
}));

gulp.task("test:unit-watch", ["config"], factory.testUnitAngular({
  testFiles: unitTestFiles, 
  coverageFiles: "../../src/js/**/*.js",
  watch: true
}));

gulp.task("html-inject", function () {
  return gulp.src("test/e2e/index_raw.html")
  .pipe(injectorGenerator(commonHeaderSrcFiles, "ch"))
  .pipe(injectorGenerator(dependencySrcFiles, "deps"))
  .pipe(injectorGenerator(mockSrcFiles, "gapimock"))
  .pipe(rename("index.html"))
  .pipe(gulp.dest("test/e2e"));
});

gulp.task("server", ["html-inject", "html2js", "config", "fonts-copy"], factory.testServer({https: false}));
gulp.task("server-close", factory.testServerClose());
gulp.task("test:webdrive_update", factory.webdriveUpdate());
gulp.task("test:e2e:core", ["test:webdrive_update"], factory.testE2EAngular({
  browser: "chrome",
  loginUser: process.env.E2E_USER2,
  loginPass: process.env.E2E_PASS2,
  testFiles: process.env.TEST_FILES || ["./test/e2e/**/*.scenarios.js"]
}));
gulp.task("test:e2e", function (cb) {
  runSequence("server", "test:e2e:core", "server-close", cb);
});

gulp.task("coveralls", factory.coveralls());

gulp.task("test", function (cb) {
  runSequence("html2js", "test:unit", "test:e2e", "coveralls", cb);
});

// End - Testing

// Watchers & Build
gulp.task("js-watch", function() {
  watch({glob: "src/templates/*.html"}, function() {
    return runSequence("html2js");
  });
  watch({glob: ["src/js/**/*", "tmp/partials/*"]}, function () {
    return runSequence("build-dist");
  });
});

gulp.task("dev", function(cb) {
  runSequence(["test:unit-watch"], cb);
});

gulp.task("watch", function (cb) {
  runSequence(["js-watch", "components-watch", "i18n-watch", "css-watch"], cb);
});

gulp.task("build", function (cb) {
  runSequence(["clean", "lint"], ["css-build", "i18n-build", "html2js", "build-components"], ["build-dist", "hologram"], cb);
});

gulp.task("default", [], function () {
  console.log("\n**************************");
  console.log("* Basics:                *");
  console.log("**************************");
  console.log("* gulp test              *");
  console.log("* gulp build             *");
  console.log("* gulp watch             *");
  console.log("* gulp dev               *");
  console.log("**************************");
  console.log("* Testing:               *");
  console.log("**************************");
  console.log("* gulp server            *");
  console.log("* gulp test:unit         *");
  console.log("* gulp test:e2e          *");
  console.log("**************************");
  console.log("* Watchers:              *");
  console.log("**************************");
  console.log("* gulp js-watch          *");
  console.log("* gulp components-watch  *");
  console.log("* gulp i18n-watch        *");
  console.log("* gulp css-watch         *");
  console.log("**************************\n");
  return true;
});
