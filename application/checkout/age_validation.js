(function(){
	"use strict";

	angular.module("drinks.directives").directive("ageValidation",["$filter", "DataStore", function($filter, DataStore){
		function _isOfAge(dateStr) { // datestr is a date in the form of YYYY-DD-MM
			var birthday = new Date(dateStr),
				ageDifMs = Date.now() - birthday.getTime(),
				ageDate = new Date(ageDifMs); // miliseconds from epoch

			return Math.abs(ageDate.getUTCFullYear() - 1970) >= 21;
		}

		function _makeDOB(f, dateStr){
			if (f && dateStr){
				if(_isOfAge(dateStr)){
					f.$setValidity("isOfAge", true);
					return true;
				} else {
					f.$setValidity("isOfAge", false);
					return false;
				}
			}

			return true;
		}

		function _makeDateString(f, year, month, day){
			if (f[year].$viewValue && f[month].$viewValue && f[day].$viewValue){
				return  f[year].$viewValue + "-" + f[month].$viewValue + "-" + $filter('pad')(f[day].$viewValue);
			}
			return false;
		}

		return {
			restrict: "AE",
			require: "^^form",
			replace: true,
			scope: {
				year: "=",
				month: "=",
				day: "="
			},
			templateUrl: function(element, attrs){return attrs.url || 'age_validation.html';},
			link: function(scope, element ,attrs, formCtrl){
				var f = formCtrl.ageValidation ? formCtrl.ageValidation : formCtrl,
					year = 'birthday.year',
					month = 'birthday.month',
					day =  'birthday.day';

				scope.ofAge = true;
				scope.birthday = {};

				DataStore.save('ageValidation', scope.birthday);

				scope.$watchCollection(function(){return f[year].$viewValue;}, function(/*n,o*/){
					if (f[year].$viewValue && f[year].$viewValue.length < 3){
						return;
					}
					var dateStr = _makeDateString(f, year, month, day);
					scope.ofAge = _makeDOB(f, dateStr);
					if (scope.ofAge){
						scope.birthday.dob = dateStr;
					}
				});

				scope.$watchCollection(function(){return f[month].$viewValue;}, function(/*n,o*/){
					var dateStr = _makeDateString(f, year, month, day);
					scope.ofAge = _makeDOB(f, dateStr);
					if (scope.ofAge){
						scope.birthday.dob = dateStr;
					}
				});

				scope.$watchCollection(function(){return f[day].$viewValue;}, function(/*n,o*/){
					var dateStr = _makeDateString(f, year, month, day);
					scope.ofAge = _makeDOB(f, dateStr);
					if (scope.ofAge){
						scope.birthday.dob = dateStr;
					}
				});
			}
		};
	}]);
})();