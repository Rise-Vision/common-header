/*jshint expr:true */

describe("Services: Shopping Cart", function() {

  beforeEach(module("risevision.common.shoppingcart"));

  it("should exist", function() {
    inject(function(shoppingCart) {
      expect(shoppingCart).to.be.ok;
    });
  });

  beforeEach(module(function ($provide) {
    //stub services
    $provide.service("$q", function() {return Q;});

    $provide.value("userState", {
      isRiseVisionUser: function () {return true; },
      _restoreState: function () {}
    });
  }));

  it("should add items to cart", function (){
    inject(function(shoppingCart) {
      shoppingCart.initialize();
      shoppingCart.addItem({productId: "aabbccccdd", orderedPricing: [100]}, 2, 0);
      expect(shoppingCart.getItemCount()).to.equal(1);
      shoppingCart.addItem({productId: "cdcds", orderedPricing: [100]}, 2, 0);
      shoppingCart.addItem({productId: "vdvdv", orderedPricing: [100]}, 2, 0);
      shoppingCart.addItem({productId: "aabbccccdd", orderedPricing: [100]}, 2, 0);
      expect(shoppingCart.getItemCount()).to.equal(3);
    });
  });

  it("should remove items from cart", function () {
    inject(function(shoppingCart) {
      shoppingCart.initialize();
      shoppingCart.addItem({productId: "aabbccccdd", orderedPricing: [100]}, 2, 0);
      shoppingCart.addItem({productId: "cdcds", orderedPricing: [100]}, 2, 0);
      shoppingCart.addItem({productId: "vdvdv", orderedPricing: [100]}, 2, 0);
      expect(shoppingCart.getItemCount()).to.equal(3);
      shoppingCart.removeItem({productId: "not_in_cart", orderedPricing: [100]}, 2, 0);
      expect(shoppingCart.getItemCount()).to.equal(3);
      shoppingCart.removeItem({productId: "aabbccccdd", orderedPricing: [100]}, 2, 0);
      expect(shoppingCart.getItemCount()).to.equal(2);
      shoppingCart.removeItem({productId: "vdvdv", orderedPricing: [100]}, 2, 0);
      expect(shoppingCart.getItemCount()).to.equal(1);
      shoppingCart.removeItem({productId: "cdcds", orderedPricing: [100]}, 2, 0);
      expect(shoppingCart.getItemCount()).to.equal(0);
    });

    it("should clear cart", function () {
      inject(function(shoppingCart) {
        shoppingCart.initialize();
        shoppingCart.addItem({productId: "aabbccccdd", orderedPricing: [100]}, 2, 0);
        shoppingCart.addItem({productId: "cdcds", orderedPricing: [100]}, 2, 0);
        shoppingCart.addItem({productId: "vdvdv", orderedPricing: [100]}, 2, 0);
        expect(shoppingCart.getItemCount()).to.equal(3);
        shoppingCart.clear();
        expect(shoppingCart.getItemCount()).to.equal(0);
      });
    });

  });

});
