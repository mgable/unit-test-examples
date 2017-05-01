(function(){
  "use strict";

  angular.module("drinks.services").service("Customer", ["globalObj", "appData", function(globalObj, appData){

    	this.isLoggedIn = function(){
			return globalObj.customer ? globalObj.customer.signed_in : false;
		};

		this.getCustomerId = function(){
			return globalObj.customer && globalObj.customer.id ? globalObj.customer.id: false;
		};

		this.getCustomer = function(){
			return globalObj.customer ? globalObj.customer : false;
		}

		this.setCustomer = function(customer){
			var currentData = globalObj.customer || {};
			globalObj.customer = angular.extend({}, currentData, customer);
		}

		this.makeFullName = function(){
			if (!globalObj.customer){return false;}
			return globalObj.customer.first_name + " " + globalObj.customer.last_name;
		};

		this.processCustomer = function(customer){
			// add payment method select display label i.e. "Card ending with . . ."
			if (customer && customer.payment_methods && customer.payment_methods.length){
				customer.payment_methods.forEach(function(method){
					method.label = appData.helpers._makeMethodLabel(method.last_four_digits);
				});
			}
			// add state abbr to customer address
			if (customer && customer.addresses && customer.addresses.length){
				customer.addresses.forEach(function(address){
					address.state = address.qcommerce_state.abbr;
				});
			}

			return customer;
		};

  }]);
})();