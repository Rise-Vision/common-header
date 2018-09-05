angular.module("risevision.common.components.purchase-flow")
  .controller("TaxExemptionModalCtrl", ["$scope", "$modalInstance", "$loading", "$filter", "storeService", "COUNTRIES",
    "REGIONS_CA",
    "REGIONS_US",
    function ($scope, $modalInstance, $loading, $filter, storeService, COUNTRIES, REGIONS_CA, REGIONS_US) {
      $scope.formData = {};
      $scope.countries = COUNTRIES;
      $scope.regionsCA = REGIONS_CA;
      $scope.regionsUS = REGIONS_US;
      $scope.taxExemptionSubmitted = false;

      $scope.submit = function () {
        $scope.taxExemptionSubmitted = false;
        $scope.errors = $scope.validate();

        if (!$scope.errors.length) {
          var fd = new FormData();

          fd.append("file", $scope.formData.file);

          $loading.start("tax-modal");

          storeService.uploadTaxExemptionCertificate(fd)
            .then(function (blobKey) {
              var expiryDateString = $filter("date")($scope.formData.expiryDate, "yyyy-MM-dd");
              return storeService.addTaxExemption(
                $scope.formData.country,
                $scope.formData.province,
                blobKey,
                $scope.formData.number,
                expiryDateString);
            }).then(function () {
              $scope.taxExemptionSubmitted = true;
            }).catch(function (error) {
              $scope.errors.push(error.message ? error.message :
                "An error ocurred while submitting your tax exemption. Please try again.");
            }).finally(function () {
              $loading.stop("tax-modal");
            });
        }
      };

      $scope.close = function () {
        $modalInstance.close();
      };

      $scope.validate = function () {
        var errors = [];

        if (!$scope.formData.file) {
          errors.push("Missing Exemption Document");
        }
        if (!$scope.formData.number) {
          errors.push("Missing Exemption Number");
        }
        if (!$scope.formData.country) {
          errors.push("Missing Exempt in Country");
        }
        if (!$scope.formData.province) {
          errors.push("Missing Exempt in State");
        }

        return errors;
      };

      $scope.selectFile = function () {
        setTimeout(function () {
          document.querySelector("#inputExemption").click();
        }, 0);
      };

      $scope.setFile = function (element) {
        $scope.$apply(function () {
          $scope.fileNotSelected = true;
          $scope.formData.file = element.files[0];
        });
      };

      $scope.clearFile = function () {
        $scope.fileNotSelected = false;
        $scope.formData.file = null;
        document.querySelector("#inputExemption").value = "";
      };

      $scope.openDatepicker = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.datepicker = true;
      };

      $scope.countryFilter = function (country) {
        return country.code === "CA" || country.code === "US";
      };
    }
  ]);
