angular.module("risevision.common.components.purchase-flow")
  .factory("responseHelper", [

    function () {
      var factory = {};

      factory.getResult = function (resp) {
        if (resp.result !== null && typeof resp.result === "object") {
          return resp.result;
        } else {
          return resp;
        }
      };
      /*
       * @desc extracts error messages from from the object
       * @param object error: object with errors
       * @return string[]: array of error messages
       */
      factory.getErrors = function (objError) {
        var result = [];
        if (objError.data && objError.data instanceof Array) {
          for (var i = 0; i < objError.data.length; i++) {
            result = result.concat(factory.getErrors(objError.data[i]));
          }
        } else if (objError.message) {
          result.push(objError.message);
        } else {
          result.push(JSON.stringify(objError));
        }
        return result;
      };

      return factory;

    }
  ]);
