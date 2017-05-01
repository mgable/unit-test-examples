(function(){
	"use strict";

	angular.module("drinks.directives").directive('suggestion', [function(){
		return {
			restrict: "AE",
			template: "<div class='error added-error' ng-style='suggestion && {\"display\": \"inline-block\"}' ng-if='suggestion'><span>Suggestion: {{suggestion}}</span><span class='right'><a ng-click='acceptSuggestion()' class='accept' title='accept suggestion'><i class='fa fa-check' aria-hidden='true'></i></a>&nbsp;<a class='ignore' ng-click='ignoreSuggestion()' title='ignore suggestion'><i class='fa fa-times' aria-hidden='true'></i></a></span></div>",
			scope: {
				for: "@",
				value: "="
			},
			link: function(scope/*, elem, attrs*/){
				scope.$on("ADDRESS-SUGGESTIONS", _suggest);
				scope.$on("ADDRESS-SUGGESTIONS-ACCEPT", _accept);
				scope.$on("ADDRESS-SUGGESTIONS-RESET", _reset);

				scope.acceptSuggestion = function(){
					scope.value = scope.suggestion;
					scope.suggestion = null;
				};

				scope.ignoreSuggestion = function(){
					scope.suggestion = null;
				};

				function _suggest(evt, suggestions){ 
					if (evt){evt.preventDefault();}
					if (suggestions[scope.for] && scope.value && suggestions[scope.for].toLowerCase() !== scope.value.toLowerCase()){
						scope.suggestion = suggestions[scope.for];
					}
				}
				function _accept(/*evt*/){ 
					if(scope.suggestion){
						scope.value = scope.suggestion;
					}
				}
				function _reset(){
					scope.suggestion = "";
				}
			}
		};
	}]);
})();
