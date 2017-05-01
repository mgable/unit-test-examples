(function(){
	"use strict";

	angular.module("drinks.filters").filter('unsafe', ["$sce", function($sce) { return $sce.trustAsHtml; }]);

})();