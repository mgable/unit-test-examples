(function(){
	"use strict";

	describe('Application: braintree.js', function(){

		var $rootScope, $timeout ,scope, element, isolatedScope, DataStore, BraintreeService;

		var token = "foo";

		beforeEach(module("checkoutApp", "AccountApp"));

		describe("Braintree Service", function(){	

			beforeEach(inject(function(_$rootScope_, _DataStore_, _$timeout_, _BraintreeService_){
				$rootScope = _$rootScope_;
				BraintreeService = _BraintreeService_;
				DataStore = _DataStore_;
				$timeout = _$timeout_;
				scope = $rootScope.$new();
			}));

			it ("should exist", function(){
				expect(BraintreeService).toBeDefined();
			});

			describe ("the API", function(){
				it ("should have an init method", function(){
					expect(BraintreeService.init).toBeDefined();
					BraintreeService.init({}, token);
					expect(braintree.setup).toHaveBeenCalledWith(token, 'custom', jasmine.any(Object));
				});

				it ("should have an destroy method", function(){
					expect(BraintreeService.destroy).toBeDefined();
				});
			});
		});
	});
})();
