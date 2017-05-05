(function(){
	"use strict";

	describe('Application: address_form.js', function () {

		var $rootScope, $http, scope, element, USA_STATES, appData;

		var testData = {"foo": "bar"},
			testString = "foo";

		beforeEach(module("drinks.directives", "drinks.constants", "drinks.services", 'AccountApp'));

		beforeEach(inject(function (_$http_, $rootScope) {
			$http = _$http_;
			scope = $rootScope.$new();
		}));


		describe("AddressForm Directive", function(){
			var x;

			beforeEach(inject(function($compile, _USA_STATES_, _appData_, $q, $rootScope){
				USA_STATES =  _USA_STATES_;
				appData = _appData_;
				scope = $rootScope.$new();
				scope.address = {"billing": testString}
				
				element = angular.element('<form><address-form type="billing" form="#billingAddress" is-shipping="false" model="address.billing"></address-form></form>');
				element = $compile(element)(scope);

				spyOn(USA_STATES, "getStates").and.callFake(makeFakeFunction($q, testData));
				scope.$digest();

				x = element.scope();
			}));

			it ("should exist", function(){
				expect(element.children().scope()).toBeDefined();
				expect(element.html()).toBeDefined();
			});

			it ("should bind the attributes", function(){
				expect(element.children().isolateScope().type).toEqual("billing");
				expect(element.children().isolateScope().form).toEqual("#billingAddress");
				expect(element.children().isolateScope().isShipping).toEqual(false);
				expect(element.children().isolateScope().address).toEqual(testString);
			});

			it ("should have a makeId method", function(){
				expect(element.children().isolateScope().makeId).toBeDefined();
				expect(element.children().isolateScope().makeId(testString)).toEqual(element.children().isolateScope().type + "." + testString);
			});

			it ("should get the states", function(){
				expect(USA_STATES.getStates).toHaveBeenCalled();
				scope.$apply();
				expect(element.children().isolateScope().states).toEqual(testData);
			});

			// it ("should emit the 'ADDING-ADDRESS' event", function(){
			// 	spyOn(x, "$emit");
			// 	spyOn(x, "$on");
			// 	scope.$digest();
			// 	expect(x.$emit).toHaveBeenCalled();
			// 	expect(x.$on).toHaveBeenCalled()
			// });
		});
	});

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
