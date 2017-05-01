/* global _ */

(function(){
	"use strict";

	angular.module("drinks.directives").directive("errorMessage", ["errorCodes", "scrollTo", function(errorCodes, scrollTo){
		return {
			template: "<div class='error' ng-style='errorMsg && {\"display\": \"inline-block\"}' for='{{field}}' ng-if='errorMsg'>&nbsp;{{errorMsg}}</div>",
			restrict: "AE",
			require: "^form",
			scope: {
				field: "@",
				custom: "="
			},
			link: function(scope, element, attrs, formCtrl){
				var errors = errorCodes;

				scope.errorMsg  = false;

				scope.$on("ERRORS-CLEAR", _clear);

				function _clear(){
					scope.errorMsg  = false;
				}

				function _hasErrorConditions(field){
					if (!field){return false;}
					return (!_.isEmpty(field.$error) && field.$touched && !field.$pristine);
				}

				function _getErrorMsg(errorObj){
					var error = Object.keys(errorObj)[0];
					return errors[error];
				}

				// add custom error messaging
				if (scope.custom){
					errors = _.extend(_.clone(errorCodes), scope.custom);
				}

				// form validation
				scope.$watch(function(){return formCtrl.$submitted;}, function(/*n,o*/){
					var field = formCtrl[scope.field];
					if (formCtrl.$submitted && !_.isEmpty(field.$error)){
						scope.errorMsg = _getErrorMsg(field.$error);
						scrollTo.error(angular.element(element), attrs.id);
					}
				});

				// field validation
				scope.$watchCollection(function(){return formCtrl[scope.field];}, function(/*n,o*/){
					var field = formCtrl[scope.field];
					if (!formCtrl.$pristine){
						scope.errorMsg = _hasErrorConditions(field) ? _getErrorMsg(field.$error) : false;
					}
				});
			}
		};
	}]);
})();