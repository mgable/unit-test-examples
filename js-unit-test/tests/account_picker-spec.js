(function(){
	"use strict";

	describe('Application: account_picker.js', function () {
		var $rootScope, scope, element, DataStore;
		
		// load the directive's module
		beforeEach(module("drinks.directives", "drinks.services", "drinks.constants"));

		beforeEach(inject(function () {

		}));

		describe("Address Picker Directive", function(){
			var isolateScope;

			beforeEach(inject(function(_$rootScope_, $compile, _DataStore_){
				$rootScope = _$rootScope_;
				DataStore = _DataStore_;
				scope = $rootScope.$new();
				scope.model = {};
				scope.addresses =[{"id":1,"first_name":"Mainor","last_name":"Claros","street1":"244 N Maple Dr","street2":"","city":"Beverly Hills","zip":"90210","qcommerce_state_id":5,"enabled":true,"qcommerce_state":{"id":5,"name":"California","abbr":"CA"},"is_deliverable":true}]
				scope.initValue = scope.addresses[0];

				element = angular.element('<address-picker form="test" addresses="addresses" model="model" init-value="initValue" type="shipping"></address-picker>');
				element = $compile(element)(scope);

				scope.$digest();
				isolateScope = element.children().scope();
				spyOn(isolateScope, "$emit");
				spyOn(DataStore, "save");
				spyOn($rootScope, "$broadcast");
			}));


			it('should exist', function() {
			    expect(element.html()).toBeDefined();
			});

			it ("should populate addresses", function(){
				expect(scope.addresses).toBeDefined();
			});

			it ("should make the full address", function(){
				expect(scope.addresses[0].full_address).toBeDefined();
			});

			it ("should should set the inital Value", function(){
				expect(scope.model).toBe(scope.initValue);
			});

			it ("should change a shipping address", function(){
				// induce a 'change' event
				var ngModelController = element.find('select').controller('ngModel');
  				ngModelController.$setViewValue(scope.addresses[0].full_address);

				expect(isolateScope.$emit).toHaveBeenCalledWith('SHOW-ADDRESS', false);
				expect(DataStore.save).toHaveBeenCalledWith('shippingAddress', scope.addresses[0].full_address);
				expect($rootScope.$broadcast).toHaveBeenCalledWith('CHECK-ADDRESS', scope.addresses[0].full_address);
			});

			it ("should change a billing address", function(){
				isolateScope.type = "billing";
				scope.$digest();
				// induce a 'change' event
				var ngModelController = element.find('select').controller('ngModel');
  				ngModelController.$setViewValue(scope.addresses[0].full_address);
  				expect($rootScope.$broadcast).toHaveBeenCalledWith("SET-STATE", {set: "addPayment"});
  				expect(DataStore.save).toHaveBeenCalledWith('billingAddress', scope.addresses[0].full_address);
			});

			it ("should add a validated address", function(){
				expect(isolateScope.addresses.length).toBe(1)
				scope.addresses[0].form = {selector: "test"}
				isolateScope.$broadcast("ADDRESS-VALIDATED", scope.addresses[0]);
				scope.$digest();
				expect(isolateScope.$emit).toHaveBeenCalledWith("SHOW-ADDRESS", false);
				expect(isolateScope.model).toBe(scope.addresses[0]);
				expect(isolateScope.addresses.length).toBe(2)
			});

		});

	});

	var fakeModal = {
		result: {
			then: function(confirmCallback, cancelCallback) {
				//Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				this.confirmCallBack = confirmCallback;
				this.cancelCallback = cancelCallback;
			}
		},
		close: function( item ) {
			//The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
			this.result.confirmCallBack( item );
		},
		dismiss: function( type ) {
			//The user clicked cancel on the modal dialog, call the stored cancel callback
			this.result.cancelCallback( type );
		}
	};

	function makeFakeFunction($q, testData){
		return function fakePromise(){
			var deferred = $q.defer();
			deferred.resolve(testData);
			return deferred.promise;
		}
	}

	function sprintf(o){
		var cache = [];
		return JSON.stringify(o, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});
	}
})();


