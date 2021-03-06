"use strict"
/* global require */

var gulp = require("gulp");
var path = require("path");
var watch = require("gulp-watch");
var jsoncombine = require("gulp-jsoncombine");
var jsonminify = require("gulp-jsonminify");
var folders = require("gulp-folders");

var paths = {
  localesJson: "./src/locales",
  distLocales: "./dist/locales"
};

var i18nBuild = {};

gulp.task("i18n-build", folders(paths.localesJson, function (
  locale) {
  return gulp.src(path.join(paths.localesJson, locale, "*.json"))
    .pipe(jsoncombine("translation_" + locale + ".json", function (
      data) {
      return new Buffer(JSON.stringify(data, null, "  "));
    }))
    .pipe(jsonminify())
    .pipe(gulp.dest(paths.distLocales));
}));

gulp.task("i18n-watch", ["i18n-build"], function () {
  // Watch locale files for changes
  gulp.watch([paths.localesJson + "/**/*.json"], ["i18n-build"]);
  console.log("[locales] Watching for changes in locale files".yellow
    .inverse);
});

module.exports = i18nBuild;
