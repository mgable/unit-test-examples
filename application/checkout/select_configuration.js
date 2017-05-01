/* global _, $ */

(function(){
	"use strict";

	angular.module("drinks.directives").directive("selectConfigurationModule", ["$rootScope", "DataStore", function($rootScope, DataStore){
		var name = "select-configuration-module";
		return {
			scope: true,
			templateUrl: "select_configuration.html",
			link: function(scope /*, element, attrs*/){
				scope.dataStore = DataStore;
				scope.selected = {};

				DataStore.save("offer", scope.selected);

				var data = DataStore.get(name),
					upsells = [];
				
				scope.showUpsell = function(ids){
					if (ids){
						scope.clearUpsells();
						_.each(scope.upsells, function(upsell){
							upsell.checked = false;
						});
						angular.element(".upsell-item").addClass('hide');
						ids.forEach(function(id){
							angular.element("#upsell-item-" + id).removeClass('hide');
						});
					}
				};

				scope.clearTax = function(){
					scope.selected.tax_amount = 0;
				};

				scope.clearUpsells = function(){
					if (upsells.length){
						upsells = [];
					}
					if (scope.selected.offer && scope.selected.offer.upsells && scope.selected.offer.upsells.length){
						scope.selected.offer.upsells = [];
					}
				};


				scope.isRequired = function(id, selectedOffer){
					if (id && !_.isEmpty(selectedOffer)){
						return id === selectedOffer.id;
					}
					return true;
				};

				scope.addUpsells = function(add, id){
					if (add){
						upsells.push(id);
					} else {
						upsells.splice(upsells.indexOf(id),1);
					}

					var selectedUpsells = _.filter(scope.upsells, function(upsell){
						return upsells.indexOf(upsell.id) > -1;
					});

					data = _.extend(scope.selected.offer, {upsells:selectedUpsells});
				};

				scope.show  = function(plan){
					$('#plan_packs').foundation('reveal', 'open');
					scope.selectedPlan = plan;
					scope.products = plan.products;
				};

				function _parse(evt, data){
					data = DataStore.get(name);
					scope.offers = data.promotion.offers;
					scope.upsells = data.upsells;
					scope.plan_packs = data.promotion.offers && data.promotion.offers.length && data.promotion.offers[0].plan_packs ? data.promotion.offers[0].plan_packs : false;
					
					if (scope.plan_packs){
						// temp - make all prices numbers (not strings)
						_.each(scope.plan_packs, function(plan){
							plan.shipping_cost = parseFloat(plan.shipping_cost);
							plan.total_item_cost = parseFloat(plan.total_item_cost);
							plan.offer  = scope.offers[0];
						});
					}
				}

				if (data) {_parse();}
			}
		};
	}]);
})();
