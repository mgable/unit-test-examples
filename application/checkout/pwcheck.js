/* global $ */

(function(){
	"use strict";

	angular.module("drinks.directives").directive('pwCheck', [function () {
		return {
			require: 'ngModel',
			link: function (scope, elem, attrs, ctrl) {
				var firstPassword = '#' + attrs.pwCheck;
				elem.add(firstPassword).on('blur', function () {
					scope.$apply(function () {
						var v = elem.val() === $(firstPassword).val();
						ctrl.$setValidity('passwordmatch', v);
					});
				});
			}
		};
	}]);
})();
