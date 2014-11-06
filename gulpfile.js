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
    minifyCss = require("gulp-minify-css");


gulp.task("html", ["lint"], function () {
  return es.concat(
    gulp.src("test/e2e/index.html")
    .pipe(usemin({
      js: [],
      css: []}))
    .pipe(gulp.dest("dist/")),
    //minified
    gulp.src("test/e2e/index.html")
    .pipe(usemin({
      js: [uglify(), rename({suffix: ".min"})],
      css: [minifyCss(), rename({suffix: ".min"})]
    }))
    .pipe(gulp.dest("dist/"))
  );
});


gulp.task("build", ["html", "html2js"]);

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
    return runSequence("html", "html2js");
  });
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

var unitTestFiles = [
  "components/jquery/dist/jquery.js",
  "components/angular/angular.js",
  "components/q/q.js",
  "components/ngstorage/ngStorage.js",
  "components/angular-bootstrap/ui-bootstrap-tpls.js",
  "components/angular-mocks/angular-mocks.js",
  "components/angular-spinner/angular-spinner.js",
  "components/ng-biscuit/dist/ng-biscuit.js",
  "components/rv-loading/loading.js",
  "components/ng-gapi-loader/src/js/*.js",
  "components/ng-core-api-client/src/js/*.js",
  "src/js/config/config.js",
  "test/unit/fixtures/*.js",
  "src/js/*.js",
  "test/unit/*spec.js"
  ];

gulp.task("test:unit", ["config"], factory.testUnitAngular({testFiles: unitTestFiles}));
gulp.task("test:unit-watch", ["config"], factory.testUnitAngular({testFiles: unitTestFiles, watch: true}));

gulp.task("server", ["html2js", "config", "fonts-copy"], factory.testServer({https: false}));
gulp.task("server-watch", ["html2js-watch", "config", "fonts-copy"], factory.testServer({https: false}));
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

gulp.task("default", [], function () {
  console.log("\n***********************");
  console.log("* Tell me what to do: *");
  console.log("***********************");
  console.log("* gulp test           *");
  console.log("* gulp build          *");
  console.log("***********************\n");
  return true;
});
