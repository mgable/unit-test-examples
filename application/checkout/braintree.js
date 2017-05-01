/* global _, braintree */

(function(){
	"use strict";

	angular.module("checkoutApp").service("BraintreeService", ["$rootScope", "appData", "DataStore", function($rootScope, appData, DataStore){

		var hostedFields = {
			styles: appData.styles
		},
		braintreeInstance = null;

		function _braintreeInit(ccInfo, token) { // 2.0
			_makeBraintreeConfig(ccInfo);

			if (braintreeInstance !== null) {
				_braintreeDestroy();
			}
			braintree.setup(token, "custom", {
				id: 'braintree', // this should be passed in
				hostedFields : hostedFields,
				onPaymentMethodReceived: function (response) {
					if (braintreeInstance) {
						DataStore.save('nonce', response.nonce);
						$rootScope.$broadcast("NONCE-RECEIVED", response.nonce);
					}
				},
				onError: function(error) {
					error.for = "braintree-error";
					$rootScope.$broadcast("RESPONSE-FAIL", error);
					$rootScope.$broadcast("WAIT", {wait: false, track: "BT"});
				},
				onReady: function(integration) {
					braintreeInstance = integration;
				}
			});
			
		}

		function _braintreeDestroy() {
			if (braintreeInstance) {
				braintreeInstance.teardown();
				braintreeInstance = null;
			}
		}

		function _makeBraintreeConfig(ccInfo){
			if (ccInfo.number){
				_.extend(hostedFields, {number: ccInfo.number});
			} else {
				delete hostedFields.number;
			}

			if (ccInfo.cvv){
				_.extend(hostedFields, {cvv: ccInfo.cvv});
			} else {
				delete hostedFields.cvv;
			}

			if (ccInfo.expirationDate){
				_.extend(hostedFields, {expirationDate: ccInfo.expirationDate});
			} else {
				delete hostedFields.expirationDate;
			}
		}

		this.init = _braintreeInit;
		this.destroy = _braintreeDestroy;

	}]);
})();