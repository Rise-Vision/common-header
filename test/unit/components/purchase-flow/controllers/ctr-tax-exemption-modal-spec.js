"use strict";

describe("controller: tax exemption modal", function() {
  beforeEach(module("risevision.common.components.purchase-flow"));
  beforeEach(module(function ($provide) {
    $provide.service("$modalInstance", function() {
      return {
        dismiss : sinon.stub(),
        close: sinon.stub()
      };
    });
    $provide.service("$loading", function() {
      return {
        start: sinon.stub(),
        stop: sinon.stub()
      };
    });
    $provide.service("storeService", function() {
      return storeService = {
        addTaxExemption: function() {
        },
        uploadTaxExemptionCertificate: function () {
        }
      };
    });
  }));

  var sandbox, $scope, $modalInstance, $loading, storeService;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    inject(function($injector, $rootScope, $controller) {
      $scope = $rootScope.$new();
      $modalInstance = $injector.get("$modalInstance");
      $loading = $injector.get("$loading");

      $controller("TaxExemptionModalCtrl", {
        $scope: $scope,
        $modalInstance: $modalInstance,
        $loading: $loading
      });

      $scope.$digest();
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should initialize",function() {
    expect($scope.formData).to.be.an("object");

    expect($scope.submit).to.be.a("function");
    expect($scope.close).to.be.a("function");
    expect($scope.validate).to.be.a("function");

    expect($scope.clearFile).to.be.a("function");
    expect($scope.selectFile).to.be.a("function");
    expect($scope.setFile).to.be.a("function");

    expect($scope.close).to.be.a("function");
  });

  describe("submit", function () {
    it("should successfully submit", function () {
      sandbox.stub(storeService, "uploadTaxExemptionCertificate").returns(Q.resolve("url"));
      sandbox.stub(storeService, "addTaxExemption").returns(Q.resolve());

      $scope.formData = {
        file: {},
        number: 100,
        country: "CA",
        province: "ON"
      };

      $scope.submit().then(function () {
        expect($scope.errorMessage).to.be.null;
        expect(storeService.uploadTaxExemptionCertificate).to.have.been.called;
        expect(storeService.addTaxExemption).to.have.been.called;
        expect($loading.start).to.have.been.called;
        expect($loading.stop).to.have.been.called;
        expect($modalInstance.close).to.have.been.called;
      });
    });

    it("should fail to submit when uploading tax exemption certificate fails", function () {
      sandbox.stub(storeService, "uploadTaxExemptionCertificate").returns(Q.reject());

      $scope.formData = {
        file: {},
        number: 100,
        country: "CA",
        province: "ON"
      };

      $scope.submit().then(function () {
        expect($scope.errorMessage).to.be.not.null;
        expect(storeService.uploadTaxExemptionCertificate).to.have.been.called;
        expect(storeService.addTaxExemption).to.not.have.been.called;
        expect($loading.start).to.have.been.called;
        expect($loading.stop).to.have.been.called;
        expect($modalInstance.close).to.not.have.been.called;
      });
    });

    it("should fail to submit when uploading tax exemption certificate fails", function () {
      sandbox.stub(storeService, "uploadTaxExemptionCertificate").returns(Q.resolve("url"));
      sandbox.stub(storeService, "addTaxExemption").returns(Q.reject());

      $scope.formData = {
        file: {},
        number: 100,
        country: "CA",
        province: "ON"
      };

      $scope.submit().then(function () {
        expect($scope.errorMessage).to.be.not.null;
        expect(storeService.uploadTaxExemptionCertificate).to.have.been.called;
        expect(storeService.addTaxExemption).to.have.been.called;
        expect($loading.start).to.have.been.called;
        expect($loading.stop).to.have.been.called;
        expect($modalInstance.close).to.not.have.been.called;
      });
    });
  });

  describe("utils", function () {
    it("validate: ", function() {
      $scope.formData = {};
      expect($scope.validate()).to.be.false;

      $scope.formData = {
        file: {},
        number: 100,
        country: "CA",
        province: "ON"
      };
      expect($scope.validate()).to.be.true;
    });

    it("close: ", function() {
      $scope.close();
      $modalInstance.dismiss.should.have.been.called;
    });

  });
});
