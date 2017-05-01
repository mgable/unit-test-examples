(function(){
	"use strict";

	angular.module("drinks.services", []);
	angular.module("drinks.filters", []);
	angular.module("drinks.directives", []);
	angular.module("drinks.constants", []);
	angular.module("checkoutApp", ["drinks.services", "drinks.filters", "drinks.directives", "drinks.constants"]);
})();

