(function(){
	"use strict";

	angular.module("AccountApp").constant("accountApi", 
		{
			"address": "/api/addresses/",
			"addressIndex": "/v1/customers/address",
			"details": "/api/customers/",
			"profile": "/v1/customers/profile",
			"password": "/v1/customers/password",
			"orders": "/v1/orders/",
			"subscriptions":"/v1/subscriptions"
		}
	);
})();
