"use strict";

/*
 * App Configuration File
 * Put environment-specific global variables in this file.
 *
 * In general, if you put an variable here, you will want to
 * make sure to put an equivalent variable in all three places:
 * dev.js, stage.js & prod.js
 *
 */

angular.module("risevision.common.config", [])
    .value("CORE_URL", "https://store-dot-rvaserver2.appspot.com/_ah/api")
;
