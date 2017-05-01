(function(){
	"use strict";

	angular.module("drinks.directives").directive('addressPicker', ["$rootScope", "DataStore", "appData", function($rootScope, DataStore, appData) {
		return {
			restrict: "AE",
			scope: {
				addresses: "=",
				form: "@",
				model: "=",
				type: "@",
				initValue: "="
			},
			template: '<select ng-disabled="address.is_deliverable === \'false\'" class="address-picker" ng-change="newAddress(model)" ng-model="model"  ng-options="address as address.full_address for address in addresses"><option value="">Add New Address</option></select>',
			link: function(scope /*, element, attrs*/){
				scope.$on("ADDRESS-VALIDATED", _addAddress);
				
				_init();

				function _init(){
					if (scope.addresses && scope.addresses.length){
						scope.addresses.forEach(function(address){
							address.full_address = appData.helpers._makeFullAddress(address);
						});
					}

					scope.model = scope.initValue;
				}

				scope.newAddress = function(address){
					console.info("fuck!");
					if (scope.type === "shipping"){
						scope.$emit("SHOW-ADDRESS", (address ? false : address));
						DataStore.save('shippingAddress', address);
						$rootScope.$broadcast("CHECK-ADDRESS", address);
					} else {
						var state = address ? {set: "addPayment"} : {set: "addAddress"};
						$rootScope.$broadcast("SET-STATE", state);
						DataStore.save('billingAddress', address);
					}
				};



				function _addAddress(evt, address){
					address.full_address = appData.helpers._makeFullAddress(address);

					// because there are multiple instances of the address picker
					if (scope.form === address.form.selector){
						scope.addresses.push(address);
						scope.model = address;

						scope.$emit("SHOW-ADDRESS", false);
					}
					
				}
			}
		};
	}]);
})();