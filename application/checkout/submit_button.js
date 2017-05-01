(function(){
	"use strict";

	angular.module("drinks.directives").directive('submitButton', [function () {
		return {
			restrict: "AE",
			templateUrl: "submit_button.html",
			scope: {
				"action": "="
			},
			replace: true,
			link: function (scope/*, elem, attrs*/) {
				var defaultLabel = "Review Order",
					placeOrderLabel = "Place Order",
					defaultDisplayText = "Click to calculate sales tax and review your order.",
					placeOrderText = "Your order will not be placed until you click this button.",
					disabled = false;

				scope.label = defaultLabel;
				scope.displayText = defaultDisplayText;
				scope.wait = false;
				scope.klass = false;

				scope.submit = function(){
					scope.$emit("ERRORS-CLEAR");
					scope.action(arguments);
				};

				scope.isDisabled = function(){ return disabled; };
				
				scope.$on("WAIT", function(evt, data){
					if (evt) {evt.preventDefault();}
					_setWait(data.wait, data.label, data.track);
				});

				function _setWait(wait, label, track){
					if (track){
						scope.$apply(function(){scope.wait = wait;});
					} else {
						scope.wait = wait;
					}

					disabled = !!wait;

					if (label === "PLACEORDER") {
						scope.label = placeOrderLabel;
						scope.displayText = placeOrderText;
						scope.klass = true;
					} else if (label === "DEFAULT")  {
						scope.label = defaultLabel;
						scope.displayText = defaultDisplayText;
						scope.klass = false;
					}
				}
			}
		};
	}]);
})();
