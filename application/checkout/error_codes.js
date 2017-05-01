(function(){
	"use strict";

	angular.module("drinks.constants").constant("errorCodes", {
		"email":"Please enter a valid email address.",
		"required": "This field is required.",
		"minlength": "Please enter at least 8 characters.",
		"passwordmatch": "Passwords must match.",
		"pattern": "The entry is invalid.",
		"isOfAge": "You must be at least 21 years old to order."
	});
})();