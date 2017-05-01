(function(){
	"use strict";

	angular.module("drinks.directives").directive("signInOrRegister", ["$rootScope", "$http", "$timeout", "globalObj", "SignInForgotCreateService",function($rootScope, $http, $timeout, globalObj, SignInForgotCreateService){
	
		return {
			restrict: "AE",
			templateUrl: "sign_in_or_register.html",
			replace: true,
			link: function(scope/*, element, attrs*/){
				scope.path = location.pathname  + location.search;
				scope.active = false;

				function forgotPassword($event){
					$event.preventDefault();
					scope.checkout.forgotPassword.$setSubmitted();
					if(scope.checkout.forgotPassword.$valid){
						SignInForgotCreateService.submit(angular.element("#forgotPassword"), "RESETPASSWORD");
					}
				}

				scope.$on("POPULATE-EMAIL", _populateEmail);

				function _populateEmail(evt, data){
					if (evt){evt.preventDefault();}
						scope.email = data;
					}

				function goToCreateAccount(){
					scope.logOut(true); // inherited though parent (checkout.js);
				}

				function signIn(evt){
					evt.preventDefault();
					scope.checkout.signIn.$setSubmitted();
					if (scope.checkout.signIn.$valid){
						SignInForgotCreateService.submit(angular.element("#signIn"), "LOGIN");
					}
				}

				scope.customer = {birthday: {}};
				scope.signIn = signIn;
				scope.forgotPassword = forgotPassword;
				scope.goToCreateAccount = goToCreateAccount;
			}
		};
	}]);
})();
