(function(){
	"use strict";

	angular.module("drinks.directives").directive('responseErrors', ["errorCodes", function (errorCodes) {
		function getErrorMsg(errorObj){

			if (typeof errorObj === "string"){ return errorObj;}

			var error = Object.keys(errorObj)[0];
			if (errorCodes[error]){
				return  errorCodes[error];
			} else if (errorObj.errors){
				return errorObj[error] + " " + _.flatten(_.values(errorObj.errors)).join(", ");
			}
			return errorObj[error];
		}

		return {
			restrict: "AE",
			link: function (scope, elem, attrs) {
				elem.hide();

				scope.$on("RESPONSE-FAIL", _display);
				scope.$on("RESETPASSWORD-SUCCESS", _display);
				scope.$on("RESPONSE-SUCCESS-MSG", _display);
				scope.$on("RESPONSE-SUCCESS", _clear);
				scope.$on("ERRORS-CLEAR", _clear);

				function _display(evt, error){
					var element = document.getElementById(attrs.id);

					if (error && error.for === attrs.id) {
						elem.text(getErrorMsg(error.message));
						elem.show();
						element.scrollIntoView(false);
					}	
				}

				function _clear(){
					elem.text("");
					elem.hide();
				}
			}
		};
	}]);
})();
