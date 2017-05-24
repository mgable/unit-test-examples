(function(){
	"use strict";

	describe('Application: customer.js', function(){
		var scope, globalObj, Customer;

		beforeEach(module("drinks.directives", "drinks.constants", "drinks.services"));

		
		describe("Customer Service", function(){
			beforeEach(inject(function ($rootScope, _globalObj_, _Customer_) {
				scope = $rootScope.$new();
				Customer = _Customer_;
				globalObj = _globalObj_;
				scope.$digest();
			}));

			it('should exist', function() {
			    expect(Customer).toBeDefined();
			});

			describe("the API", function(){

				it ("should have a 'isLoggedIn' method", function(){
					expect(Customer.isLoggedIn).toBeDefined();
					expect(Customer.isLoggedIn()).toBe(true);
				});

				it ("should have a 'getCustomerId' method", function(){
					expect(Customer.getCustomerId).toBeDefined();
					expect(Customer.getCustomerId()).toBe(2);
				});

				it ("should have a 'getCustomer' method", function(){
					expect(Customer.getCustomer).toBeDefined();
					expect(Customer.getCustomer()).toEqual(globalObj.customer);
				});

				it ("should have a 'setCustomer' method", function(){
					expect(Customer.setCustomer).toBeDefined();
					Customer.setCustomer(testData);
					expect(Customer.getCustomer()).toEqual(_.extend({}, globalObj.customer, testData));
				});

				it ("should have a 'makeFullName' method", function(){
					expect(Customer.makeFullName).toBeDefined();
					expect(Customer.makeFullName()).toEqual(globalObj.customer.first_name + " " + globalObj.customer.last_name);
				});

				it ("should have a 'processCustomer' method", function(){
					expect(Customer.processCustomer).toBeDefined();
					expect(Customer.processCustomer(testCustomer)).toEqual(processedCustomer);
				});

				// this has to be last
				it ("should logout a customer", function(){
					globalObj.customer = null;
					expect(Customer.isLoggedIn()).toBe(false);
				});
			});
	
		});

	});

})();
