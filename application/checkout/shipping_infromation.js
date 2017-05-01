/* globals _ */

(function(){
	"use strict";
	// controls the shipping address information
	// a shipping address is optional so it is outside of the normal statemachine conditions;

	angular.module("checkoutApp").directive("shippingInformation", ["$timeout", "DataStore", "appData", "Customer", function($timeout, DataStore, appData, Customer){
		return {
			templateUrl: "shipping_information.html",
			restrict: "AE",
			replace: true,
			scope: {
				addresses: "="
			},
			link: function(scope/*, element, attrs*/){
				
				scope.$watch(function(){return scope.sameAsBilling;}, function(n,o){
					if (n === true){
						scope.shippingAddress = {"sameAsBilling": true};
					} else {
						scope.shippingAddress = _getAddresses();
					}
					
					DataStore.save("shippingAddress", scope.shippingAddress);

				});

				scope.$on("ADDRESS-VALIDATED", _addAddress);
				scope.$on("LOGOUT",  function(){$timeout(_init, 100)});
				scope.$on("RETURN-TO-ADD-SHIPPING", _returnToAddNewAddress)

				_init();

				function _init(){
					scope.shippingAddress = {"sameAsBilling": true};
					scope.sameAsBilling = true;
					scope.initValue = _.last(scope.addresses);
					scope.gift = {};

					DataStore.save("shippingAddress", scope.shippingAddress);
					DataStore.save("gift", scope.gift);

				// controlls the visibility of the shipping address form;
				// if there are no addresses, always show the form;
					scope.showShippingAddresses = (scope.addresses && scope.addresses.length && scope.addresses.length > 0) ? false : true;
				}

				scope.checkShipping = function(check){
					if (check === 'false'){
						scope.$emit("SHIPPING-CHECK");
					}
				};

				scope.displayShippingAddress = function(){
					var paymentMethod = DataStore.get("paymentMethod"),
						shippingAddress;

					if (scope.sameAsBilling){
						shippingAddress = paymentMethod ? _.find(scope.addresses, function(address){
							return address.id === paymentMethod.billing_address_id;
						}) : DataStore.get("billingAddress") ? DataStore.get("billingAddress") : false;
					} else {
						shippingAddress = DataStore.get("shippingAddress");
					}

					if (!shippingAddress){
						return false;
					} else if (Customer.isLoggedIn() && Customer.getCustomerId()){
						return shippingAddress.full_address;
					} else if (!Customer.isLoggedIn() || !Customer.getCustomerId()){
						return _makeTruncatedAddress(shippingAddress);
					}
				}

				// interface is only though events
				scope.$on("SHOW-ADDRESS", function(evt, data){
					if(evt){evt.preventDefault();}
					_showAddress( (data === null || data) ? true : false);
				});

				function _makeTruncatedAddress(address){
					return _.values(_.pick(address, ["city", "state", "zip"])).join(" ");
				}

				// toggles the visiblility of the address form
				function _showAddress(show){
					scope.showShippingAddresses = show;
				}

				function _returnToAddNewAddress(evt, data){
					if (evt){evt.preventDefault();}
					scope.initValue = "";
					scope.sameAsBilling = false;
					$timeout(
						function(){
							scope.showShippingAddresses = true;
							scope.shippingAddress = null;
							DataStore.save("shippingAddress", scope.shippingAddress);
						},100
					);

				}

				function _getAddresses(){
					return (scope.addresses && scope.addresses.length && scope.addresses.length > 0) ? _.last(scope.addresses) : null;
				}

				function _addAddress(evt, address){
					if (evt){evt.preventDefault();}
					if (address.form.selector === "#shippingAddress"){
						address.full_address = appData.helpers._makeFullAddress(address);
						scope.shippingAddress = address;
						DataStore.save("shippingAddress", _.omit(address, ['form']));
						scope.$broadcast("SHOW-ADDRESS", false);
						scope.showShippingAddresses = false;
					}

				}

			}
		};
	}]);
})();
