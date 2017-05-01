(function(){
	"use strict";

	angular.module("drinks.directives").directive('createAccount', ["DataStore", function (DataStore) {
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: "create_account.html",
			link: function(scope){
				scope.customer = {};

				DataStore.save("account", scope.customer);
			}
		};
	}]);
})();
