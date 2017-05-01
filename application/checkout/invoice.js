/* globals _ */

(function(){
	"use strict";

	angular.module("drinks.directives").directive("invoice", ["DataStore", function(DataStore){
		return {
			templateUrl: "invoice.html",
			restrict: "AE",
			replace: true,
			link: function(scope/*, element, attrs*/){
				var offer = scope.offer = DataStore.get('offer');
        var exciseTaxExist = DataStore.get("excise_tax");

				scope.subtotal = function(){
					var upsellsSubtotal = 0;

					if (offer && offer.offer){

						if (offer.offer.upsells){
							upsellsSubtotal = _.pluck(offer.offer.upsells, "price").reduce(function(a,b){
								return (a + b);
							}, 0);
						}

						return  offer.offer.total_item_cost + upsellsSubtotal;
					}

					return  0;
				};

				scope.shipping = function(){
					var upsellsSubtotal = 0;


					if (offer && offer.offer){

						if (offer.offer.upsells){
							upsellsSubtotal = _.pluck(offer.offer.upsells, "shipping").reduce(function(a,b){
								return (a + b);
							}, 0);

						}

						return  offer.offer.shipping_cost + upsellsSubtotal;
					}

					return  0;
				};

				scope.tax = function(){
					return  offer && offer.tax_amount ? parseFloat(offer.tax_amount) : 0;
				};

        scope.displayExciseTax = function(exciseTaxExist){
          return (!(exciseTaxExist == 0 || exciseTaxExist == null || exciseTaxExist == undefined))
        };

        scope.excise_tax = function(){
          return DataStore.get('excise_tax');
        };

        scope.sales_tax = function(){
          return DataStore.get('sales_tax');
        };

      }
		};
	}]);
})();
