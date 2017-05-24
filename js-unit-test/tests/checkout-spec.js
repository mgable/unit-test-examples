(function(){
	"use strict";

	fdescribe('Application: checkout.js', function(){

		var $rootScope, $timeout ,scope, element, isolatedScope, DataStore, StateMachine, globalObj, directiveScope;

		beforeEach(module("drinks.directives", "drinks.services", "drinks.constants", 'AccountApp'));

		fdescribe("Checkout Directive", function(){	

			beforeEach(inject(function(_$rootScope_, $compile, _StateMachine_, _globalObj_ ){
				$rootScope = _$rootScope_;
				StateMachine = _StateMachine_;
				globalObj =  _globalObj_;
				scope = $rootScope.$new();
				spyOn(StateMachine, "init").and.callThrough();
				element = angular.element('<checkout-module></checkout-module>');
				element = $compile(element)(scope);
				directiveScope = element.scope();
				scope.$digest();
			}));

			it ("should exist", function(){
				expect(element.html()).toBeDefined();
			});

			it ("should initalize correctly", function(){
				expect(StateMachine.init).toHaveBeenCalledWith(1, jasmine.any(Boolean), jasmine.any(Object));
				expect(directiveScope.customer_name).toEqual(gon.customer.first_name + " " + gon.customer.last_name);
				expect(directiveScope.existingUser).toBe(false);
				expect(directiveScope.birthday).toBe(false);
			});

			describe("the API", function(){
				it ("should have a action method", function(){
					expect(directiveScope.action).toBeDefined();
				});

				it ("should have a isView method", function(){
					expect(directiveScope.isView).toBeDefined();
				});

				it ("should have a isState method", function(){
					expect(directiveScope.isState).toBeDefined();
				});

				it ("should have a logOut method", function(){
					expect(directiveScope.logOut).toBeDefined();
				});

				it ("should have a goToLogin method", function(){
					expect(directiveScope.goToLogin).toBeDefined();
				});
			});

			describe("the 'action' method", function(){
				it ("should initallly be set to _submit", function(){
					expect(directiveScope.action.name).toBe("_submit");
				});
			});

			describe("the 'isView' method", function(){
				it ("should initallly be set to 'logIn'", function(){
					expect(directiveScope.isView('logIn')).toBe(true);
				});
			});

			describe("the 'isState' method", function(){
				it ("should initally be set to 'login", function(){
					expect(directiveScope.isState('noData')).toBe(true);
					expect(directiveScope.isState('logIn')).toBe(true);
					expect(directiveScope.isState('loggedIn')).toBe(false);
				});
			});

			describe("the listeners", function(){
				it ("should listen for 'LOGIN-SUCCESS'", function(){
					expect(directiveScope.$$listeners['LOGIN-SUCCESS']).toBeDefined();
				});

				it ("should listen for 'RESPONSE-FAIL'", function(){
					expect(directiveScope.$$listeners['RESPONSE-FAIL']).toBeDefined();
				});

				it ("should listen for 'RESETPASSWORD-SUCCESS'", function(){
					expect(directiveScope.$$listeners['RESETPASSWORD-SUCCESS']).toBeDefined();
				});

				it ("should listen for 'RESPONSE-SUCCESS-MSG'", function(){
					expect(directiveScope.$$listeners['RESPONSE-SUCCESS-MSG']).toBeDefined();
				});

				it ("should listen for 'RESPONSE-SUCCESS'", function(){
					expect(directiveScope.$$listeners['RESPONSE-SUCCESS']).toBeDefined();
				});

				it ("should listen for 'ERRORS-CLEAR'", function(){
					expect(directiveScope.$$listeners['ERRORS-CLEAR']).toBeDefined();
				});

				it ("should listen for 'SHOW-ADDRESS'", function(){
					expect(directiveScope.$$listeners['SHOW-ADDRESS']).toBeDefined();
				});

				it ("should listen for 'PAYMENT-METHOD-SELECT'", function(){
					expect(directiveScope.$$listeners['PAYMENT-METHOD-SELECT']).toBeDefined();
				});


				it ("should listen for 'SHIPPING-CHECK'", function(){
					expect(directiveScope.$$listeners['SHIPPING-CHECK']).toBeDefined();
				});

				it ("should listen for 'SHOPPING-CART-UPDATE'", function(){
					expect(directiveScope.$$listeners['SHOPPING-CART-UPDATE']).toBeDefined();
				});

				it ("should listen for 'CHECK-ADDRESS'", function(){
					expect(directiveScope.$$listeners['CHECK-ADDRESS']).toBeDefined();
				});
			})

		});
	});
})();
