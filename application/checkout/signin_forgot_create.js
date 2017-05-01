/*jshint bitwise: false*/

(function(){
	/*jshint validthis: true */
	"use strict";

	angular.module("drinks.services").service("SignInForgotCreateService", ["$rootScope", "$http", "appData", function($rootScope, $http, appData){
		function submit(form, eventName, fn, _data, _url){
			var data = _data || form.serialize(),
				url = _url || form.attr("action");
				//func = fn || function(response){return response;};

			return $http({
				method:"post",
				url: url,
				responseType: "json",
				data: data,
				//transformResponse: func,
				headers: appData.headers,
				withCredentials: true
			}).then(function(response){
				// IE sucks
				if (typeof response.data === "string"){
					try {
						response.data = JSON.parse(response.data);
					} catch(e){console.error(e)}
				}

				$rootScope.$broadcast("RESPONSE-SUCCESS", response.data);
				response.data.for = "page-error";
				response.data.message = response.data.response || "Success!";
				$rootScope.$broadcast(eventName + "-SUCCESS", response.data);
				return response.data;
			}, function(error){
				var errorObj = {};
				errorObj.for = "page-error";
				errorObj.message = error.data;
				$rootScope.$broadcast(eventName + "-FAIL", error);
				$rootScope.$broadcast("RESPONSE-FAIL", errorObj);
				return error.data;
			});
		}

		this.submit = submit;
	}]);
})();
