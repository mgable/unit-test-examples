(function(){
	"use strict";

	describe('Application: age_validation.js', function(){

		var $rootScope, scope, element, isolateScope, dob;

		beforeEach(module("drinks.directives", "drinks.services", "AccountApp"));

		describe("Age Validation Directive", function(){	

			beforeEach(inject(function(_$rootScope_, $compile){
				$rootScope = _$rootScope_;
				scope = $rootScope.$new();

				scope.year = "1966";
				scope.month = "08";
				scope.day = "26";

				dob = [scope.year, scope.month, scope.day].join("-");

				element = angular.element('<form><age-validation year="year" month="month" day="day"></age-validation></form>');
				element = $compile(element)(scope);

				scope.$digest();
				isolateScope = element.children().isolateScope();
			}));

			it("should exist", function() {
				expect(element.html()).toBeDefined();
			});

			it ("should correct make the DOB", function(){
				expect(isolateScope.birthday).toEqual({dob:dob});
			});

			it ("should update when the year is changed", function(){
				var ngModelController = element.find('input[name="birthday.year"]').controller('ngModel'),
					newYear = "1990";
				ngModelController.$setViewValue(newYear);
				dob = [newYear, scope.month, scope.day].join("-");
				expect(isolateScope.birthday).toEqual({dob:dob});
			});

			it ("should update when the month is changed", function(){
				var ngModelController = element.find('select[name="birthday.month"]').controller('ngModel'),
					newMonth = "01"
				ngModelController.$setViewValue(newMonth);
				dob = [scope.year, newMonth, scope.day].join("-");
				expect(isolateScope.birthday).toEqual({dob:dob});
			});

			it ("should update when the day is changed", function(){
				var ngModelController = element.find('input[name="birthday.day"]').controller('ngModel'),
					newDay = "01";
				ngModelController.$setViewValue(newDay);
				dob = [scope.year, scope.month, newDay].join("-");
				expect(isolateScope.birthday).toEqual({dob:dob});
			});

		});
	});
})();
