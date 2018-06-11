"use strict"
/* global require */

var gulp = require("gulp");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
var watch = require("gulp-watch");
var rename = require("gulp-rename");
var colors = require("colors");

var paths = {
  sass: ["./src/scss/**/*.scss", "./src/scss/*.scss"],
  appSass: "./src/scss/app.scss",
  alignmentSass: "./src/scss/ui-components/alignment.scss",
  distFonts: "./dist/fonts",
  distCss: "./dist/css",
  fonts: ["./bower_components/font-awesome/fonts/*.*","./bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*"]
};

var cssBuild = {};

gulp.task("fonts-copy", function () {
  console.log("[COPY] copying over fonts".yellow);

  gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));
});

gulp.task("css-build-alignment", function () {
  return gulp.src(paths.alignmentSass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(minifyCSS({ keepBreaks: true }))
    .pipe(rename("alignment.min.css"))
    .pipe(gulp.dest(paths.distCss));
});

gulp.task("css-build", ["css-build-alignment", "fonts-copy"], function() {
  console.log("[SASS] recompiling".yellow);
  gulp.src(paths.appSass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(rename("rise.css"))
    .pipe(gulp.dest(paths.distCss))
    .pipe(minifyCSS())
    .pipe(rename("rise.min.css"))
    .pipe(gulp.dest(paths.distCss))
  console.log("[CSS] minifying".yellow);

  gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.distFonts));
});

gulp.task("css-watch", ["css-build"], function() {
  // Watch Less files for changes
  gulp.watch(paths.sass, ["css-build"]);
  console.log("[SASS] Watching for changes in SASS files".yellow.inverse);
});

module.exports = cssBuild;
