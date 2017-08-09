(function (angular) {

  "use strict";

  angular.module("risevision.common.systemmessages", [])

  .factory("systemMessages", ["$log", "$q",
    function ($log, $q) {

      var messages = [];
      var _retrievers = [];

      function pushMessage(m, list) {
        //TODO add more sophisticated, sorting-based logic here
        $log.debug("pushing message", m);
        list.push(m);
      }

      messages.addMessages = function (newMessages) {
        if (newMessages && newMessages instanceof Array) {
          newMessages = (function filterNewMessages(items) {
            var _newItems = [];

            var currentTime = new Date();

            angular.forEach(items, function (msg) {
              var endTime = new Date(msg.endDate || "2199-12-31");
              var startTime = new Date(msg.startDate || 0);
              endTime.setDate(endTime.getDate() + 1);
              if (currentTime > startTime && currentTime < endTime) {
                _newItems.push(msg);
              }
            });
            return _newItems;
          })(newMessages);
          newMessages.forEach(function (m) {
            //temporary logic to avoid duplicate messages
            var duplicate = false;
            messages.forEach(function (um) {
              if (um.text === m.text) {
                duplicate = true;
              }
            });
            if (!duplicate) {
              pushMessage(m, messages);
            }
          });

          messages.sort(function (a, b) {
            if (!a.startDate || a.startDate > b.startDate) {
              return 1;
            } else if (a.startDate && a.startDate === b.startDate) {
              return 0;
            } else {
              return -1;
            }
          }).reverse();
        }
      };

      messages.clear = function () {
        messages.length = 0;
        $log.debug("System message cleared.");
      };

      messages.registerRetriever = function (func) {
        //the retriever must return a promise that resolves to an array
        // of messages
        _retrievers.push(func);
      };

      messages.resetAndGetMessages = function () {
        messages.clear();
        var promises = _retrievers.map(function (func) {
          return func.call();
        });
        return $q.all(promises).then(function (messageArrays) {
          messageArrays.forEach(messages.addMessages);
        });
      };

      return messages;

    }
  ]);

})(angular);
