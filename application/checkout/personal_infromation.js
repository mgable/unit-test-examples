/* global $ */
(function(){
	"use strict";

	angular.module("checkoutApp").directive("personalInformation", ["$http", "$rootScope", "$timeout", "globalObj", "StateMachine", "DataStore", function($http, $rootScope, $timeout, globalObj, StateMachine, DataStore){
		var userData;

		function _resetResponseError(){
			$rootScope.$broadcast("RESPONSE-SUCCESS");
		}

		return {
			templateUrl: "personal_information.html",
			restrict: "AE",
			replace: true,
			require: "^form",
			link: function(scope, element, attrs, formCtrl){
				scope.customer = {};
				DataStore.save('personalInformation', scope.customer);

				scope.checkUser = function(email){
					_resetResponseError();
					$http({
						url:'/api/customers/search_by_email',
						method: "get",
						params: {email:email, store_id: globalObj.store_id}
					}).then(
						function(response){
							userData = response.data;
							if (userData.success && userData.uid){
								$('#hasAccountModal').foundation('reveal', 'open');
							}
						},
						function(/*error*/){
							// console.info("I got an error");
							// console.info(error);
						}
					);
				};

				scope.dismiss = function(){
					$('#hasAccountModal').foundation('reveal', 'close');
					var data = {};
					data.for = "personalInformationResponseErrors";
					data.message = "Use a different email address.";
					formCtrl.personalInformation['customer[email]'].$setViewValue("");
					formCtrl.personalInformation['customer[email]'].$setPristine();
					formCtrl.personalInformation['customer[email]'].$render();
					$rootScope.$broadcast("RESPONSE-FAIL", data);
				};

				scope.close = function(){
					$('#hasAccountModal').foundation('reveal', 'close');
					StateMachine.setCondition(StateMachine.conditions.logIn);
					$timeout(function(){$rootScope.$broadcast("POPULATE-EMAIL", scope.customer.email);},100);
				};
			}
		};
	}]);
})();
