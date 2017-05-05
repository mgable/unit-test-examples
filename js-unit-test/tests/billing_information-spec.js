(function(){
	"use strict";

	describe('Application: billing_information.js', function(){

		var $rootScope, scope, element, isolatedScope, DataStore,
			testData = "foo";

		beforeEach(module("checkoutApp", "AccountApp"));

		describe("Billing Information Directive", function(){	

				beforeEach(inject(function(_$rootScope_, $compile,_DataStore_){
				$rootScope = _$rootScope_;
				DataStore = _DataStore_;
				scope = $rootScope.$new();

				element = angular.element('<billing-information addresses="addresses" payment-method="paymentMethod" methods="methods" is-state="isState(view)" is-view="isView(view)" existing-user="existingUser"  user-logged-in="userLoggedIn"></billing-information>');
				element = $compile(element)(scope);
				scope.$digest();
				isolatedScope = element.isolateScope();

				spyOn(DataStore, "save")
			}))

			it ("should exist", function(){
				expect(element.html()).toBeDefined();
			});

			it ("should select payment method", function(){
				expect(isolatedScope.selectPaymentMethod).toBeDefined();
				isolatedScope.selectPaymentMethod(testData);
				expect(DataStore.save).toHaveBeenCalledWith('paymentMethod', testData);
			});
		});
	});
})();
