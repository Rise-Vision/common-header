"use strict";

describe("Services: playerLicenseFactory", function() {
  var storeApiFailure;

  beforeEach(module("risevision.common.components.plans"));
  beforeEach(module(function ($provide) {
    storeApiFailure = false;

    $provide.service("userState", function () {
      return {
        _restoreState: function () {},
        getSelectedCompanyId: function () {
          return null;
        },
        getCopyOfSelectedCompany: function() {
          return {};
        },
        updateCompanySettings: sinon.stub()
      };
    });
    $provide.service("currentPlanFactory", function() {
      return currentPlanFactory = {
        isPlanActive: function() {
          return true;
        },
        isProSubscribed: function() {
          return true;
        },
        currentPlan: {
          planPlayerProLicenseCount: 2,
          playerProLicenseCount: 1
        }
      };
    });
  }));

  var sandbox, userState, playerLicenseFactory, currentPlanFactory;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector) {
      userState =  $injector.get("userState");
      playerLicenseFactory = $injector.get("playerLicenseFactory");
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should exist", function() {
    expect(playerLicenseFactory).to.be.ok;
    expect(playerLicenseFactory.hasProfessionalLicenses).to.be.a("function");
    expect(playerLicenseFactory.getProLicenseCount).to.be.a("function");
    expect(playerLicenseFactory.toggleDisplayLicenseLocal).to.be.a("function");
    expect(playerLicenseFactory.areAllProLicensesUsed).to.be.a("function");
  });
  
  describe("hasProfessionalLicenses: ", function() {
    it("should return true if Subscribed to a Plan", function() {
      sandbox.stub(currentPlanFactory, "isPlanActive").returns(true);
      sandbox.stub(currentPlanFactory, "isProSubscribed").returns(false);

      expect(playerLicenseFactory.hasProfessionalLicenses()).to.be.true;
    });

    it("should return true if Subscribed to Player Professional", function() {
      sandbox.stub(currentPlanFactory, "isPlanActive").returns(false);
      sandbox.stub(currentPlanFactory, "isProSubscribed").returns(true);

      expect(playerLicenseFactory.hasProfessionalLicenses()).to.be.true;
    });

    it("should return false if neither of those conditions is met", function() {
      sandbox.stub(currentPlanFactory, "isPlanActive").returns(false);
      sandbox.stub(currentPlanFactory, "isProSubscribed").returns(false);

      expect(playerLicenseFactory.hasProfessionalLicenses()).to.be.false;
    });
  });

  describe("getProLicenseCount:", function() {
    it("should return zero licenses", function () {
      sandbox.stub(currentPlanFactory, "isPlanActive").returns(false);
      sandbox.stub(currentPlanFactory, "isProSubscribed").returns(false);

      expect(playerLicenseFactory.getProLicenseCount()).to.equal(0);
    });

    it("should return zero licenses (correct handling of null value)", function () {
      sandbox.stub(currentPlanFactory, "isPlanActive").returns(true);
      sandbox.stub(currentPlanFactory, "isProSubscribed").returns(true);
      
      currentPlanFactory.currentPlan = {};

      expect(playerLicenseFactory.getProLicenseCount()).to.equal(0);
    });

    it("should return plan licenses", function () {
      sandbox.stub(currentPlanFactory, "isPlanActive").returns(true);
      sandbox.stub(currentPlanFactory, "isProSubscribed").returns(false);

      expect(playerLicenseFactory.getProLicenseCount()).to.equal(2);
    });

    it("should return plan and pro licenses", function () {
      sandbox.stub(currentPlanFactory, "isPlanActive").returns(true);
      sandbox.stub(currentPlanFactory, "isProSubscribed").returns(true);

      expect(playerLicenseFactory.getProLicenseCount()).to.equal(3);
    });
  });

  describe("toggleDisplayLicenseLocal: ", function() {
    var displayId = "displayId";

    it("should add a display to the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({});

      playerLicenseFactory.toggleDisplayLicenseLocal(displayId, true);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: [displayId]
      });
    });

    it("should remove a display from the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });

      playerLicenseFactory.toggleDisplayLicenseLocal(displayId, false);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: ["1", "3"]
      });
    });

    it("should not add the same display twice to the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });

      playerLicenseFactory.toggleDisplayLicenseLocal(displayId, true);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: ["1", displayId, "3"]
      });
    });

    it("should not fail if requested to remove a non existent display from the authorized displays list", function() {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: []
      });

      playerLicenseFactory.toggleDisplayLicenseLocal(displayId, false);

      expect(userState.updateCompanySettings).to.have.been.calledWith({
        playerProAssignedDisplays: []
      });
    });
  });

  describe("areAllProLicensesUsed:", function() {
    it("should return all licenses are used if assigned list length equals license count", function () {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", "2", "3"]
      });

      expect(playerLicenseFactory.areAllProLicensesUsed()).to.be.true;
    });

    it("should return all licenses are used if assigned list length is greater than license count (this should not happen, but could be caused by migration issues)", function () {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", "2", "3", "4"]
      });

      expect(playerLicenseFactory.areAllProLicensesUsed()).to.be.true;
    });

    it("should return not all licenses are used if assigned list length is lower than license count", function () {
      sandbox.stub(userState, "getCopyOfSelectedCompany").returns({
        playerProAssignedDisplays: ["1", "2"]
      });

      expect(playerLicenseFactory.areAllProLicensesUsed()).to.be.false;
    });
  });

});
