"use strict";

angular.module("risevision.common.components.message-box.services", [])
  .factory("messageBox", ["$q", "$log", "$modal", "$templateCache",
    function ($q, $log, $modal, $templateCache) {
      return function (title, message, close) {
        var modalInstance = $modal.open({
          template: $templateCache.get("message-box/message-box.html"),
          controller: "messageBoxInstance",
          size: "md",
          resolve: {
            title: function () {
              return title;
            },
            message: function () {
              return message;
            },
            button: function () {
              return close || "common.ok";
            }
          }
        });
      };
    }
  ]);
