(function(){
	"use strict";

	fdescribe('Application: login_app.js', function(){

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

				spyOn(Customer, "isLoggedIn").and.returnValue(true);
				spyOn(Customer, "getCustomer").and.returnValue(customerObj);
				spyOn($rootScope, "$on")

				scope.$digest();
			}))

			it ("should initialize", function(){
				expect(scope.isLoggedIn).toBe(true);
				expect(scope.customer).toBe(customerObj);
				expect($rootScope.$on).toHaveBeenCalledWith("LOGIN", jasmine.any(Function));
			});

		});
	});
})();
