(function(){
	"use strict";

	angular.module("AccountApp").constant("accountApi", 
		{
			"address": "/api/addresses/",
			"details": "/api/customers/",
			"profile": "/v1/customers/profile",
			"password": "/v1/customers/password",
			"orders": "/api/orders/"
		}
	);
})();
