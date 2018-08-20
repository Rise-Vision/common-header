"use strict";

angular.module("risevision.common.components.purchase-flow")
  .service("contactService", [

    function () {

      this.contactsAreIdentical = function (c1, c2) {
        return (
          c1.firstName === c2.firstName &&
          c1.lastName === c2.lastName &&
          c1.email === c2.email &&
          c1.telephone === c2.telephone);
      };

      this.cleanContactObj = function (c) {
        return {
          username: c.username,
          firstName: c.firstName,
          lastName: c.lastName,
          email: c.email,
          telephone: c.telephone
        };
      };

      this.copyContactObj = function (src, dest) {
        if (!dest) {
          dest = {};
        }

        dest.firstName = src.firstName;
        dest.lastName = src.lastName;
        dest.email = src.email;
        dest.telephone = src.telephone;

        return dest;
      };

    }
  ]);
