(function(){
	"use strict";

	angular.module("drinks.constants").constant("appData", {
		headers:{
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			"Accept": "application/json, text/javascript, */*; q=0.01",
			"X-Requested-With" : "XMLHttpRequest"
		},
		styles: {
			'input': { 'font-family': 'sans-serif', 'font-size': '11pt', 'color': 'black' },
			'input:focus': { 'outline': 'none' },
			'input.invalid': { 'color': 'red' },
			'input.valid': { 'color': 'green' }
		},
		helpers: {
			_serialize: function _serialize(request){
				var str = [];
				for (var p in request){
					if (request.hasOwnProperty(p)) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(request[p]));
					}
				}

				return str.join("&");
			},
			_makeFullAddress: function(address){
				if (address && address.qcommerce_state && address.qcommerce_state.abbr && !address.state){
					address.state = address.qcommerce_state.abbr;
				}
				return _.values(_.pick(address, ["first_name", "last_name","street1", "street2", "city", "state", "zip"])).join(" "); //"first_name", "last_name","street1", "street2",
			},
			_makeMethodLabel: function(label){
				return "Card ending with " + label;
			}
		}
	})
})();
