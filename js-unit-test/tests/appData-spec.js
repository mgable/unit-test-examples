(function(){
	"use strict";

	describe('Application: age_validation.js', function(){

		var $rootScope, scope, element, AppData,
			testData = {"id":1,"first_name":"Mainor","last_name":"Claros","street1":"244 N Maple Dr","street2":"","city":"Beverly Hills","zip":"90210","qcommerce_state_id":5,"enabled":true,"qcommerce_state":{"id":5,"name":"California","abbr":"CA"},"is_deliverable":true},
			full_address_string = 'Mainor Claros 244 N Maple Dr  Beverly Hills CA 90210',
			label = "foo;"

		beforeEach(module("drinks.constants"));

		describe("AppData Constant", function(){	

			beforeEach(inject(function(_$rootScope_, $compile, _appData_){
				$rootScope = _$rootScope_;
				scope = $rootScope.$new();
				AppData = _appData_;
			}));

			it ("should exist", function(){
				expect(AppData).toBeDefined();
			});

			it ("should have helpers, styles and headers", function(){
				expect(AppData.helpers).toBeDefined();
				expect(AppData.styles).toBeDefined();
				expect(AppData.headers).toBeDefined();
			});

			it ("should serialize data", function(){
				expect(AppData.helpers._serialize).toBeDefined();
				expect(AppData.helpers._serialize({"foo": "bar", "bar": "foo"})).toEqual("foo=bar&bar=foo");
			});

			it ("should should make the full address string", function(){
				expect(AppData.helpers._makeFullAddress).toBeDefined();
				expect(AppData.helpers._makeFullAddress(testData)).toEqual(full_address_string);
			});

			it ("should make the credit card label", function(){
				expect(AppData.helpers._makeMethodLabel).toBeDefined();
				expect(AppData.helpers._makeMethodLabel(label)).toBeDefined("Card ending with " + label;);
			});
		});
	});
})();
