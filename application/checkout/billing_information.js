/* global _ */

(function(){
	"use strict";
	// controls the billing address information
	// a billing address is NOT optional so it is controlled by statemachine conditions;

	angular.module("checkoutApp").directive("billingInformation", ["$timeout", "$rootScope", "StateMachine", "BraintreeService", "DataStore", "appData", function($timeout, $rootScope, StateMachine, BraintreeService, DataStore, appData){
		var name = "checkout-module";

		function _makeCCInfo(condition){
			var ccInfo = {};

			ccInfo.number = condition !== StateMachine.conditions.hasData ? { selector: '#card-number', placeholder: 'e.g., 1234567898765432' } : false;
			ccInfo.cvv = { selector: '#cvv', placeholder: 'e.g., 123' };
			ccInfo.expirationDate = condition !== StateMachine.conditions.hasData ? { selector: '#expiration-date', placeholder: 'e.g., MM/YY' } : false;

			return ccInfo;
		}

		return {
			templateUrl: "billing_information.html",
			restrict: "AE",
			replace: true,
			scope: {
				methods: "=",
				isState: "&",
				addresses: "=",
				isView: "&",
				existingUser: "=",
				userLoggedIn: "="
			},
			link: function(scope/*, element, attrs*/){
				var moduleData = DataStore.get(name);

				scope.billingAddress = {};
				scope.selected = {method: null};
				scope.initValue = _.last(scope.addresses);

 				scope.$on("PAYMENT-METHOD-SUCCESS", _addPaymentMethod);
				scope.$on("ADDRESS-VALIDATED", _addAddress);
				scope.$on("BRAINTREE-INIT", _braintreeInit);
				scope.$on("BRAINTREE-DESTROY", BraintreeService.destroy);
				scope.$on("$destroy", BraintreeService.destroy);

				scope.selectPaymentMethod = function(method){
					DataStore.save('paymentMethod', method);
					scope.$emit("PAYMENT-METHOD-SELECT", method);
				};

				_init();

				function _addPaymentMethod(evt, method){
					if (evt){evt.preventDefault();}
					if (method){
						scope.methods.push(method);
						scope.selected.method = method;
					}
				}

				function _init(){
					if (scope.addresses && scope.addresses.length){
						scope.addresses.forEach(function(address){
							address.full_address = appData.helpers._makeFullAddress(address);
						});
					}
					_braintreeInit();

					if (scope.methods && scope.methods.length){
						scope.selected.method = _.last(scope.methods);
						DataStore.save('paymentMethod', scope.selected.method);
					}

					if (scope.addresses && scope.addresses.length){
						scope.billingAddress = _.last(scope.addresses);
						DataStore.save('billingAddress', scope.billingAddress);
					}
				}

				function _addAddress(evt, address){
					if (evt){evt.preventDefault();}
					if (address.form.selector === "#billingAddress"){
						scope.billingAddress = address;
						DataStore.save('billingAddress', _.omit(address, ['form']));
						scope.$broadcast("SHOW-ADDRESS", false);
					}

				}

				function _braintreeInit(){
					var condition = $rootScope.returnCondition || StateMachine.getCondition();
					if(condition === StateMachine.conditions.noData || condition === StateMachine.conditions.addPayment || !scope.userLoggedIn || condition === StateMachine.conditions.addAddress || condition === StateMachine.conditions.loggedIn){
						$timeout(function(){
							scope.ccInfo = _makeCCInfo(condition);
							BraintreeService.init(scope.ccInfo, moduleData.client_token);},
						100);
					}
				}
			}
		};
	}]);
})();
