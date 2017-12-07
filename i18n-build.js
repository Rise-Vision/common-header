"use strict"
/* global require */

var gulp = require("gulp");
var path = require("path");
var watch = require("gulp-watch");
var rename = require("gulp-rename");
var jsoncombine = require("gulp-jsoncombine");
var jsonminify = require("gulp-jsonminify");
var folders = require("gulp-folders");
var tap = require("gulp-tap");
var _ = require("underscore");
var endOfLine = require("os").EOL;

var paths = {
  localesPo: "./src/locales/locales_po",
  localesJson: "./src/locales/locales_json",
  distLocales: "./dist/locales"
};

var i18nBuild = {};

/**
 * Recursively copies the properties of source into object, failing in case a duplicate is found.
 *
 * @return dest
 */
function mergeProperties(source, dest, acceptDuplicates) {
  acceptDuplicates = acceptDuplicates ? acceptDuplicates : false;

  for (var key in source) {
    if (typeof (source[key]) == "object") {
      if (typeof (dest[key]) == "undefined") {
        dest[key] = {};
      }

      mergeProperties(source[key], dest[key], acceptDuplicates);
    } else if (!acceptDuplicates && typeof (dest[key]) != "undefined") {
      console.log("Property " + key + " is defined more than once");
    } else {
      dest[key] = source[key];
    }
  }

  return dest;
}

/**
 * Recursively flattens an object into a single level map, separating each level with a dot.
 *
 * For instance:
 *   { a: "val1", b: { b1: { "val2" } } }
 *
 * will be converted to:
 *   { a: "val1", b.b1: "val2" }
 *
 * @return A new map with the flattened properties
 */
function flattenKeys(source, prefix) {
  var dest = {};

  for (var key in source) {
    var fullKey = prefix ? prefix + "." + key : key;

    if (typeof (source[key]) == "object") {
      dest = _.extend(dest, flattenKeys(source[key], fullKey));
    } else {
      dest[fullKey] = source[key];
    }
  }

  return dest;
}

/**
 * Converts a map to a string formatted as a PO file
 */
function mapToPO(source) {
  var content = "";
  var pairs = _.sortBy(_.pairs(source), function (pair) {
    return pair[0];
  });

  _.each(pairs, function (pair) {
    content += "msgid \"" + pair[0] + "\"" + endOfLine;
    content += "msgstr \"" + pair[1] + "\"" + endOfLine;
    content += endOfLine;
  });

  return content;
}

/**
 * Converts a dotted string to a map
 *
 * For instance:
 *   top.middle.bottom, value
 *
 * will be converted to:
 *   { top: { middle: { bottom: value } } }
 */
function dottedStringToMap(dottedString, value) {
  var map = {},
    currMap = map;
  var parts = dottedString.split(".");

  // Create a new map level for each part of the delimited string
  _.each(parts.slice(0, parts.length - 1), function (key) {
    currMap[key] = {};
    currMap = currMap[key];
  });

  currMap[_.last(parts)] = value;
  return map;
}

/**
 * Converts a PO file to a hierarchichal map, using dots to delimit tree levels
 */
function POToMap(contents) {
  var msgId, msgStr;
  var pairs = [];
  var map = {};
  var msgid = "msgid";
  var msgstr = "msgstr";

  // Convert each triplet of lines msgid-msgstr-blank into a list of pairs
  _.each(contents.split("\n"), function (line) {
    if (line.indexOf(msgid) === 0) {
      msgId = line.substring(msgid.length + 2, line.lastIndexOf("\""));
    } else if (line.indexOf(msgstr) === 0) {
      msgStr = line.substring(msgstr.length + 2, line.lastIndexOf("\""));

      pairs.push([msgId, msgStr]);
    }
  });

  // Sort the list alphabetically
  pairs = _.sortBy(pairs, function (pair) {
    return pair[0];
  });

  // Use reverse so the map gets build in the proper ascending order
  _.each(pairs.reverse(), function (pair) {
    map = mergeProperties(map, dottedStringToMap(pair[0], pair[1]),
      true);
  });

  return map;
}

gulp.task("po-to-json", folders(paths.localesPo, function (locale) {
  return gulp.src(path.join(paths.localesPo, locale, "*.po"))
    .pipe(tap(function (file, t) {
      var map = POToMap(String(file.contents));

      file.contents = new Buffer(JSON.stringify(map, null, "  "));
    }))
    .pipe(rename({
      extname: ".json"
    }))
    .pipe(gulp.dest(paths.localesJson + "/" + locale));
}));

gulp.task("json-to-po", folders(paths.localesJson, function (locale) {
  return gulp.src(path.join(paths.localesJson, locale, "*.json"))
    .pipe(tap(function (file, t) {
      var map = JSON.parse(String(file.contents));

      file.contents = new Buffer(mapToPO(flattenKeys(map)));
    }))
    .pipe(rename({
      extname: ".po"
    }))
    .pipe(gulp.dest(paths.localesPo + "/" + locale));
}));

gulp.task("i18n-build", ["json-to-po"], folders(paths.localesJson, function (
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
