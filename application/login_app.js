(function(){
	"use strict";

	angular.module("LoginApp", ['drinks.directives', "drinks.services", "drinks.constants", "AccountApp"]);

	angular.module("LoginApp").directive("login", ["$rootScope", "Customer", function($rootScope, Customer){
		return {
			templateUrl: function(element, attrs){
				return attrs.templateName || "header_login.html";
			},
			restrict: "AE",
			replace: true,
			link: function(scope, element, attrs){
				scope.isLoggedIn = Customer.isLoggedIn();
				scope.customer = Customer.getCustomer();

				$rootScope.$on("LOGIN", function(evt, data){
					scope.setCustomer();
				})

				scope.setCustomer = function(){
					scope.$applyAsync(function(){
						scope.customer = Customer.getCustomer();
						scope.isLoggedIn = true;
					});
				}
			}
		}
	}]);
})();
