(function(){
	"use strict";

	describe('Application: create_account.js', function () {

		var $rootScope, $http, scope, element, directiveScope, DataStore;

		beforeEach(module("drinks.directives", "drinks.constants", "drinks.services", 'AccountApp'));

		beforeEach(inject(function ($rootScope) {
			scope = $rootScope.$new();
		}));


		describe("CreateAccount Directive", function(){

			beforeEach(inject(function($compile, $rootScope, _DataStore_){
				scope = $rootScope.$new();
				DataStore = _DataStore_;
				spyOn(DataStore, "save");
				element = angular.element('<create-account></create-account>');
				element = $compile(element)(scope);
				scope.$digest();

				directiveScope = element.scope();
			}));

			it ("should exist", function(){
				expect(element.html()).toBeDefined();
			});

			it ("should initalize", function(){
				expect(DataStore.save).toHaveBeenCalledWith("account", jasmine.any(Object));
				expect(directiveScope.customer).toEqual({});
			});

			
		});
	});
})();
