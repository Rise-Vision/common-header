(function (angular) {
  "use strict";

  angular.module("risevision.common.shoppingcart", ["risevision.common.gapi",
    "risevision.common.components.userstate"
  ])

  .factory("shoppingCart", ["storeAPILoader", "$log", "$q",
    "userState",
    function (storeAPILoader, $log, $q, userState) {
      var _items = [];
      var _cart = {
        "items": _items,
        "useBillToAddress": false,
        "shipToAttention": "",
        "couponCode": ""
      };

      var readFromStorage = function () {
        var deferred = $q.defer();
        if (userState.isLoggedIn()) {

          storeAPILoader().then(function (storeApi) {
            var obj = {
              "id": userState.getUsername()
            };
            var request = storeApi.cart.get(obj);
            request.execute(function (resp) {
              if (!resp.error) {
                clearItems();
                addItems(resp.items);
                _cart.useBillToAddress = resp.useBillToAddress;
                _cart.shipToAttention = resp.shipToAttention ? resp.shipToAttention :
                  "";
                _cart.couponCode = resp.couponCode;
                deferred.resolve();
              } else {
                $log.warn("Error loading cart items. Error: " + resp.error);
                deferred.resolve();
              }
            });
          });

        } else {
          clearItems();
          deferred.resolve();
        }
        return deferred.promise;
      };

      var persistToStorage = function () {
        var deferred = $q.defer();
        if (userState.isLoggedIn()) {
          storeAPILoader().then(function (storeApi) {
            //remove try/catch after API is implemented
            try {
              var obj = {
                "data": {
                  //"id": userState.getUsername(),
                  "jsonItems": getJsonItems(_items),
                  "shipToAttention": _cart.shipToAttention,
                  "useBillToAddress": _cart.useBillToAddress,
                  "couponCode": _cart.couponCode
                }
              };
              var request = storeApi.cart.put(obj);
              request.execute(function (resp) {
                if (!resp.error) {
                  deferred.resolve();
                } else {
                  $log.warn("Error persisting cart items. Error: " +
                    resp.error);
                  deferred.resolve();
                }
              });
            } catch (e) {
              deferred.resolve();
              console.error(
                "[persistToStorage] - Unimplemented API method " + e.message
              );
            }
          });
        }
        return deferred.promise;

      };

      var clearCart = function () {
        _cart.useBillToAddress = false;
        _cart.shipToAttention = "";
        _cart.couponCode = "";
        clearItems();
      };

      var clearItems = function () {
        while (_items.length > 0) {
          _items.pop();
        }
      };

      var addItems = function (items) {
        if (items) {
          for (var i = 0; i < items.length; i++) {
            _items.push(items[i]);
          }
        }
      };

      var cleanProducts = function (items) {
        var item;
        var res = [];
        for (var i = 0; i < items.length; i++) {
          item = {
            "productId": items[i].productId,
            "qty": items[i].qty,
            "accountingId": items[i].selected.accountingId,
            "licensedDisplays": items[i].licensedDisplays
          };
          res.push(item);
        }
        return res;
      };

      var getJsonItems = function (items) {
        var cleanedItems = cleanProducts(items);
        return JSON.stringify(cleanedItems);
      };

      var loadReady = null;
      var username = null;

      var cartManager = {
        get: function () {

          if (loadReady !== null && userState.checkUsername(username)) {
            return loadReady;
          }

          username = userState.getUsername();
          clearCart();

          loadReady = $q.defer();
          var deferred = loadReady;

          readFromStorage().then(function () {
            deferred.resolve(_cart);
          });

          return deferred;
        },
        clear: function () {
          clearItems();
          persistToStorage();
          $log.debug("Shopping cart cleared.");
        },
        getItems: function () {
          return _items;
        },
        setItems: function (items) {
          $log.debug("Setting cart items", items);
          //check if they are pointing to the same object
          if (items !== _items) {
            clearItems();
            addItems(items);
          }
          return persistToStorage();
        },
        getShipToAttention: function () {
          return _cart.shipToAttention;
        },
        getUseBillToAddress: function () {
          return _cart.useBillToAddress;
        },
        setAddressFields: function (shipToAttention, useBillToAddress) {
          _cart.shipToAttention = shipToAttention;
          _cart.useBillToAddress = useBillToAddress;
          return persistToStorage();
        },
        getCouponCode: function () {
          return _cart.couponCode;
        },
        setCouponCode: function (couponCode) {
          $log.debug("Setting coupon code", couponCode);
          //check if they are pointing to the same object
          _cart.couponCode = couponCode;
          return persistToStorage();
        },
        getItemCount: function () {
          if (_items !== null) {
            return _items.length;
          } else {
            return 0;
          }
        },
        removeItem: function (itemToRemove) {
          if (itemToRemove) {
            for (var i = 0; i < _items.length; i++) {
              if (_items[i].productId === itemToRemove.productId) {
                _items.splice(i, 1);
                break;
              }
            }
            persistToStorage();
          }
        },
        adjustItemQuantity: function (itemToAdjust, qty) {
          if (itemToAdjust && $.isNumeric(qty) && qty > 0) {
            persistToStorage();
          }
        },
        addItem: function (itemToAdd, qty, pricingIndex) {

          if (!userState.isRiseVisionUser()) {
            return;
          }
          var item = this.findItem(itemToAdd);

          if (item && (itemToAdd.paymentTerms === "Subscription" ||
            itemToAdd.paymentTerms === "Metered")) {
            return;
          }

          if (itemToAdd && $.isNumeric(qty) && itemToAdd.orderedPricing.length >
            pricingIndex) {
            if (item) {
              // qty for existing item is increased
              item.qty = parseInt(item.qty) + parseInt(qty);
            } else {
              // item is not already in the cart
              item = angular.copy(itemToAdd);
              item.qty = qty;
              _items.push(item);
            }
            item.selected = itemToAdd.orderedPricing[pricingIndex];
            persistToStorage();
          }
        },
        findItem: function (item) {
          //returns instance of the object from _items array

          if (item) {
            for (var i = 0; i < _items.length; i++) {
              if (item.productId === _items[i].productId) {
                return _items[i];
              }
            }
          }

          return null;
        },
        itemExists: function (item) {
          if (userState.isRiseVisionUser() && item && this.findItem(item) !==
            null) {
            return true;
          }
          return false;
        }
      };
      //cartManager.initialize();

      return cartManager;

    }
  ]);
})(angular);
