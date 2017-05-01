(function(){
	"use strict";

	angular.module("drinks.services").service("scrollTo", ["$rootScope", function($rootScope){
		var last,
			regElement;

		$rootScope.$on("ERRORS-CLEAR", function(){_clear();});

		this.error = function(element, id){
			if (element.offset().top){
				if (!last){
					last = element;
					regElement = document.getElementById(id);
					regElement.scrollIntoView();
				} else {
					if (element.offset().top < last.offset().top){
						regElement = document.getElementById(id);
						regElement.scrollIntoView();
						last = element;
					}
				}
			}
		};

		function _clear(){
			last = null;
		}

	}]);
})();
