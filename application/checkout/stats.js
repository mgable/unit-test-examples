(function(){
	"use strict";

	angular.module("drinks.directives").directive('stats', ["DataStore", "globalObj", "StateMachine", function (DataStore, globalObj, StateMachine) {
		return {
			templateUrl: 'stats.html',
			link: function (scope/*, elem, attrs, ctrl*/) {

				scope.DataStore = DataStore;
				scope.StateMachine = StateMachine;
				scope.customer = globalObj.customer;
				scope.xcheckout = DataStore.get("checkout");
				scope.gift = DataStore.get("gift");

				scope.$watch(function(){return globalObj.customer;}, function(n/*,o*/){
					scope.customer = n;
				});

				scope.$watch(function(){return DataStore.get("paymentMethod");}, function(n/*,o*/){
					scope.paymentMethod = n;
				});

				scope.$watch(function(){return  DataStore.get("checkout");}, function(n/*,o*/){
					scope.xcheckout = n;
				});

				scope.$watch(function(){
					return  DataStore.get('billingAddress');
				},function(n/*,o*/){
					scope.ba = n;
				});

				scope.$watch(function(){
					return  DataStore.get("shippingAddress");
				},function(n/*,o*/){
					scope.shippingInformation = n;
				});

				scope.$watch(function(){
					return   DataStore.get("gift");
				},function(n/*,o*/){
					scope.gift = n;
				});

			}
		};
	}]);
})();
