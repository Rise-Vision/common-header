(function (angular){

  "use strict";

  angular.module("risevision.common.company", ["risevision.core.company",
  "risevision.common.userstate"])

    .service("selectedCompanyUrlHandler", ["$location", "userState",
      "getCompany", "$rootScope", "$log", "$q",
      function ($location, userState, getCompany, $rootScope, $log, $q) {

        var that = this;
        if($location.search().cid && !userState.isLoggedIn()) {
          $log.debug("cid", $location.search().cid, "saved for later processing.");
          this.pendingSelectedCompany = $location.search().cid;
        }

        $rootScope.$on("risevision.user.userSignedIn", function () {
          if(that.pendingSelectedCompany) {
            $location.search("cid", that.pendingSelectedCompany);
            delete(that.pendingSelectedCompany);
            that.updateSelectedCompanyFromUrl();
          }
        });

        this.init = function () {
          that.updateSelectedCompanyFromUrl().finally(function () {
            if(!userState.getSelectedCompanyId()) {
              userState.resetCompany();
            }
          });
        };

        this.updateUrl = function (selectedCompanyId) {
          // This parameter is only appended to the url if the user is logged in
          if (selectedCompanyId && selectedCompanyId !== userState.getUserCompanyId()) {
            if ($location.search().cid !== selectedCompanyId) {
              $location.search("cid", selectedCompanyId);
            }
          }
          else if ($location.search().cid) {
            $location.search({"cid" : null});
          }
        };
        
        this.updateSelectedCompanyFromUrl = function () {
          var deferred = $q.defer();
          var newCompanyId = $location.search().cid;
          if(newCompanyId && userState.getUserCompanyId() && 
             newCompanyId !== userState.getSelectedCompanyId()) {
            getCompany(newCompanyId).then(function (company) {
              userState.switchCompany(company);
            }).finally(deferred.resolve);
          }
          else {
            if (!newCompanyId && userState.getSelectedCompanyId() &&
              userState.getSelectedCompanyId() !== userState.getUserCompanyId()) {
              $location.search("cid", userState.getSelectedCompanyId());
              $location.replace();
            }
            deferred.reject();
          }
          return deferred.promise;
        };
    }]);
  }
)(angular);
