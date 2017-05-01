(function(){
	"use strict";

	angular.module("drinks.directives").directive('simpleTemplate', [function () {
		return {
			restrict: 'AE',
			replace: true,
			templateUrl: function(element, attrs){ return attrs.name; }
		};
	}]);
})();
