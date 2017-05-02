(function(){
	"use strict";

	describe('Application: login_app.js', function(){

		var $rootScope, scope, element, Customer,
			customerObj = {name: "joe", id: "1"};

		beforeEach(module("LoginApp"));

		describe("Login Directive", function(){	

			beforeEach(inject(function(_$rootScope_, $compile, _Customer_){
				$rootScope = _$rootScope_;
				scope = $rootScope.$new();
				Customer = _Customer_;

				element = angular.element('<login></login>');
				element = $compile(element)(scope);

				spyOn(Customer, "isLoggedIn").and.returnValues(false, true);
				spyOn(Customer, "getCustomer").and.returnValues({}, customerObj);
				spyOn($rootScope, "$on");

				scope.$digest();
			}))

			it ("should initialize", function(){
				expect(scope.isLoggedIn).toBe(false);
				expect(scope.customer).toEqual({});
				expect($rootScope.$on).toHaveBeenCalledWith("LOGIN", jasmine.any(Function));
			});

			it ("should set the customer", function(){
				expect(scope.setCustomer).toBeDefined();
				scope.setCustomer();
				scope.$apply(); // kick off async
				expect(scope.isLoggedIn).toBe(true);
				expect(scope.customer).toEqual(customerObj);
			});

		});
	});
})();
