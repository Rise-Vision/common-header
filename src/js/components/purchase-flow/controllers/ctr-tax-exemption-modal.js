angular.module("risevision.common.components.purchase-flow")
  .controller("TaxExemptionModalCtrl", ["$scope", "$q", "$modalInstance", "$loading", "$filter", "storeService",
    "COUNTRIES",
    "REGIONS_CA",
    "REGIONS_US",
    function ($scope, $q, $modalInstance, $loading, $filter, storeService, COUNTRIES, REGIONS_CA, REGIONS_US) {
      $scope.formData = {};
      $scope.countries = COUNTRIES;
      $scope.regionsCA = REGIONS_CA;
      $scope.regionsUS = REGIONS_US;
      $scope.taxExemptionSubmitted = false;

      $scope.submit = function () {
        $scope.errorMessage = null;

        if ($scope.validate()) {
          var fd = new FormData();

          fd.append("file", $scope.formData.file);

          $loading.start("tax-modal");

          return storeService.uploadTaxExemptionCertificate(fd)
            .then(function (blobKey) {
              var expiryDateString = $filter("date")($scope.formData.expiryDate, "yyyy-MM-dd");
              return storeService.addTaxExemption(
                $scope.formData.country,
                $scope.formData.province,
                blobKey,
                $scope.formData.number,
                expiryDateString);
            }).then(function () {
              $modalInstance.close(true);
            }).catch(function (error) {
              $scope.errorMessage = error.message ||
                "An error ocurred while submitting your tax exemption. Please try again.";
            }).finally(function () {
              $loading.stop("tax-modal");
            });
        } else {
          $scope.errorMessage = "Please complete the missing information below.";
          return $q.reject($scope.errorMessage);
        }
      };

      $scope.close = function () {
        $modalInstance.dismiss();
      };

      $scope.validate = function () {
        var formData = $scope.formData;

        return !!(formData.file && formData.number && formData.country && formData.province);
      };

      $scope.selectFile = function () {
        setTimeout(function () {
          document.querySelector("#inputExemption").click();
        }, 0);
      };

      $scope.setFile = function (element) {
        $scope.$apply(function () {
          $scope.formData.file = element.files[0];
        });
      };

      $scope.clearFile = function () {
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

      $scope.isFieldInvalid = function (fieldName) {
        var form = $scope.taxExemptionForm;
        var field = form[fieldName];

        return (field.$dirty || form.$submitted) && field.$invalid;
      };
    }
  ]);
