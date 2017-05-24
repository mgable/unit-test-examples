(function(){
	"use strict";

	describe('Application: datastore.js', function(){
		var scope, globalObj, DataStore;

		beforeEach(module("drinks.directives", "drinks.constants", "drinks.services"));

		
		describe("Datastore Service", function(){
			beforeEach(inject(function ($rootScope, _DataStore_) {
				scope = $rootScope.$new();
				DataStore = _DataStore_;
				scope.$digest();
			}));

			it('should exist', function() {
			    expect(DataStore).toBeDefined();
			});

			describe("the API", function(){
				it ("should should have a 'save' method", function(){
					expect().toBeDefined();
				});

				it ("should should have a 'get' method", function(){
					
				});

				it ("should should have a 'update' method", function(){
					
				});

				it ("should should have a 'getObj' method", function(){
					
				});

				it ("should should have a 'clear' method", function(){
					
				});
				/*
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
		*/
				
			});
	
		});

	});

})();
