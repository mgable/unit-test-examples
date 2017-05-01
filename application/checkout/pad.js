(function(){
	"use strict";

	angular.module("drinks.filters").filter("pad", [function(){
		return function(input) {
			return ("00" + input).slice(-2);
		};
	}]);
})();
