/* global _ */

(function(){
	"use strict";

	angular.module("drinks.directives").directive("addressForm", ["$rootScope", "$http", "USA_STATES", "appData", function($rootScope, $http, USA_STATES, appData){
			
		function _makeErrorForName(name){
			return name.slice(1) + "-error";
		}

		return {
			restrict: "AE",
			templateUrl: "address_form.html",
			scope: {
				form: "@",
				isShipping: "=",
				type: "@",
				address: "=model"
			},
			link: function(scope /*, element, attrs*/){
				var apply = false;
				USA_STATES.getStates().then(function(states){
					if(apply){
						scope.$applyAsync(
							function(){scope.states = states;}
						);
					} else {
						scope.states = states;
					}
				});

				// is this a billing address which needs to immediately appear
				// or is it a shipping address which only appears on demand
				if (!scope.states){
					apply = true;
				}

				scope.bypassValidation = false;
				scope.id = scope.form.replace(/^\#/, "") + "-" + scope.type;

				scope.$emit("ADDING-ADDRESS", {type: scope.type, action:"add"});
				scope.$on("VALIDATE-ADDRESS", function(evt, form){
					// only submit for this instance
					if (form === scope.form){
						_submitAddressForm(form);
					}
				});
				scope.$on("$destroy", _destroy);

				scope.makeId = function(label){
					return scope.type + "." +  label;
				}

				function _destroy(){
					scope.$emit("ADDING-ADDRESS", {type: scope.type, action:"remove"});
				}

				function _submitAddressForm(formName){ // 1.0
					var form = angular.element(formName),
						data = _.omit(form.serializeObject(), "checkout[shipping_address_id]");

					$rootScope.$broadcast("WAIT", {wait: true});

					$http({
						method: 'POST',
						//data: form.serialize(),
						data: appData.helpers._serialize(data),
						url: "/api/addresses",
						responseType: 'json',
						headers: appData.headers,
						withCredentials: true,
					}).then(function(response){
						// clear all response error messages
						$rootScope.$broadcast("RESPONSE-SUCCESS");

						if (response.data.errors || response.data.suggestions) {
							if (response.data.errors && response.data.errors.length) {
								// always validate on error
								scope.bypassValidation = false;
								var error = {message: response.data.errors[0], for: _makeErrorForName(formName) };
								scope.$emit("RESPONSE-FAIL", error);
							}

							if (!_.isEmpty(response.data.suggestions)) {
								scope.bypassValidation = true;
								scope.$broadcast("ADDRESS-SUGGESTIONS", response.data.suggestions);
							}
						} else {
							response.data.form = form;
							$rootScope.$broadcast("ADDRESS-VALIDATED", response.data);
						}

					},function(error){
						error.data.for = "page-error";
						error.data.message = (error.data && error.data.errors && error.data.errors.base) ? error.data.errors.base.join(" ") : error.data;
						$rootScope.$broadcast("RESPONSE-FAIL", error.data);

					}).finally(function(){
						$rootScope.$broadcast("WAIT", {wait: false});
					});
				}
			}
		};
	}]);
})();