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

  angular.module("risevision.common.config")
    .value("ENABLE_INTERCOM_MESSAGING", false)
    .value("CORE_URL", "https://rvacore-test.appspot.com/_ah/api")
    .value("STORE_URL", "https://store.risevision.com")
    .value("STORE_ENDPOINT_URL",
      "https://store-dot-rvacore-test.appspot.com/_ah/api")
    .value("GSFP_URL", "https://gsfp-dot-rvacore-test.appspot.com/fp");

})(angular);
