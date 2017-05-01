(function(){
	"use strict";

	angular.module("drinks.services").service("DataStore", [function(){
		this.store = {};

		this.save = function(key, value){
			this.store[key] = value;
		};

		this.get = function(key){
			return this.store[key];
		};

    this.update = function(key, attribute, value){
      if ( value || value === 0 ){
        this.store[key][attribute] = value;
      } else {
        this.store[key] = attribute;
      }
    };

		this.getObj = function(key){
			var obj = {};

			obj[key] = this.store[key];

			return obj;
		};

		this.clear = function(){
			this.store.billingAddress = {};
			this.store.shippingAddress = {};
			this.store.paymentMethod = {};
			this.store.checkout = {};
		};
	}]);
})();
