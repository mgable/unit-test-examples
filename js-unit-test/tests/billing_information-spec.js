(function(){
	"use strict";

	describe('Application: billing_information.js', function(){

		var $rootScope, $timeout ,scope, element, isolatedScope, DataStore, BraintreeService,
			testData = "foo", newMethod = 5, testAddress = {name: testData, form: {selector: "#billingAddress"}};

		beforeEach(module("checkoutApp", "AccountApp"));

		describe("Billing Information Directive", function(){	

				beforeEach(inject(function(_$rootScope_, $compile,_DataStore_, _BraintreeService_, _$timeout_){
				$rootScope = _$rootScope_;
				BraintreeService = _BraintreeService_;
				DataStore = _DataStore_;
				$timeout = _$timeout_;
				scope = $rootScope.$new();

				scope.addresses =[{"id":1,"first_name":"Mainor","last_name":"Claros","street1":"244 N Maple Dr","street2":"","city":"Beverly Hills","zip":"90210","qcommerce_state_id":5,"enabled":true,"qcommerce_state":{"id":5,"name":"California","abbr":"CA"},"is_deliverable":true}]
				scope.methods = [1,2,3,4];
				element = angular.element('<billing-information addresses="addresses" payment-method="paymentMethod" methods="methods" is-state="isState(view)" is-view="isView(view)" existing-user="existingUser"  user-logged-in="userLoggedIn"></billing-information>');
				element = $compile(element)(scope);

				spyOn(DataStore, "get").and.returnValue({client_token: testData});
				spyOn(DataStore, "save");
				spyOn(BraintreeService, "init");
				spyOn(BraintreeService, "destroy");

				scope.$digest();
				isolatedScope = element.isolateScope();
				
				spyOn(isolatedScope, "$emit");
				spyOn(isolatedScope, "$broadcast");

			}))

			it ("should exist", function(){
				expect(element.html()).toBeDefined();
			});

			it ("should initalize correctly", function(){
				expect(scope.addresses[0].full_address).toBeDefined();
				expect(isolatedScope.initValue).toBe(scope.addresses[0]);
				expect(isolatedScope.billingAddress).toBe(scope.addresses[0]);
				expect(isolatedScope.selected.method).toBe(scope.methods[scope.methods.length - 1]);

				expect(DataStore.get).toHaveBeenCalledWith('checkout-module');
				expect(DataStore.save).toHaveBeenCalledWith('paymentMethod', scope.methods[scope.methods.length - 1]);
				expect(DataStore.save).toHaveBeenCalledWith('billingAddress', scope.addresses[scope.addresses.length - 1]);

				$timeout.flush();
				expect(BraintreeService.init).toHaveBeenCalledWith(jasmine.any(Object), testData);
			});

			it ("should select payment method", function(){
				expect(isolatedScope.selectPaymentMethod).toBeDefined();
				isolatedScope.selectPaymentMethod(testData);
				expect(DataStore.save).toHaveBeenCalledWith('paymentMethod', testData);
				expect(isolatedScope.$emit).toHaveBeenCalledWith("PAYMENT-METHOD-SELECT", testData);
			});

			it ("should listen to the 'PAYMENT-METHOD-SUCCESS' event", function(){
				$rootScope.$broadcast('PAYMENT-METHOD-SUCCESS', newMethod);
				isolatedScope.$digest();
				expect(isolatedScope.methods.length).toBe(scope.methods.length);
				expect(isolatedScope.selected.method).toBe(newMethod);

			});

			it ("should listen to the 'ADDRESS-VALIDATED' event", function(){
				$rootScope.$broadcast("ADDRESS-VALIDATED", testAddress);
				isolatedScope.$digest();
				expect(isolatedScope.billingAddress).toBe(testAddress);
				expect(DataStore.save).toHaveBeenCalledWith('billingAddress', jasmine.any(Object));
				expect(isolatedScope.$broadcast).toHaveBeenCalledWith("SHOW-ADDRESS", false);
			});

			it ("should list to the 'BRAINTREE-INIT' event", function(){
				$rootScope.$broadcast("BRAINTREE-INIT", testAddress);
				isolatedScope.$digest();
				$timeout.flush();
				expect(BraintreeService.init).toHaveBeenCalledWith(jasmine.any(Object), testData);
			});

			it ("should list to the 'BRAINTREE-DESTROY' event", function(){
				$rootScope.$broadcast("BRAINTREE-DESTROY");
				isolatedScope.$digest();
				expect(BraintreeService.destroy).toHaveBeenCalled();
			});
		});
	});
})();
