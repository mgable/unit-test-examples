/* global $, _ */

(function(){
	"use strict";

	angular.module("drinks.directives").directive("checkoutModule", ["$rootScope", "$timeout", "$http", "DataStore", "globalObj", "appData", "StateMachine", "SignInForgotCreateService", "GetRequest", "Customer", function($rootScope, $timeout, $http,  DataStore, globalObj, appData, StateMachine, SignInForgotCreateService, GetRequest, Customer){

		var conditions = {"noData":0, "logIn": 1, "loggedIn": 2, "hasData":3, "addPayment": 4, "addAddress": 5, "readyToSubmit": 6, "submitted": 7},
			initalState = _determineState(globalObj.customer),
			statemachine = StateMachine.init(initalState, true, conditions),
			view,
			address = {shipping: null, billing: null};

		$rootScope.$on("ADDRESS-VALIDATED", _next);
		$rootScope.$on("SET-STATE", _setState);
		$rootScope.$on("ADDING-ADDRESS", _addAddress);
		$rootScope.$on("NONCE-RECEIVED", _submitPayment);
		$rootScope.returnCondition = false;

		function _addAddress(evt, data){
			if (evt){evt.preventDefault();}
			address[data.type] = (data.action === "add") ? true : false;
		}

		// validate shipping address if there is one, if not process payment
		function _next(evt, response){
			// is there a shipping address to validate
			if (address.shipping && response.form.selector === "#billingAddress"){
				$rootScope.$broadcast("VALIDATE-ADDRESS", "#shippingAddress");
			} else {
				_processPayment();
			}

			statemachine.setCondition(conditions.loggedIn);
		}

		// submit shopping cart to get tax or submit BT to get nonce and then a payment method
		function _processPayment(){
			// do we have a valid payment method
			if(StateMachine.getCondition() === StateMachine.conditions.hasData && Customer.isLoggedIn()){
				$timeout(function(){_submitShoppingCart();},100);
			} else {
				//console.info("submit braintree");
			 	$timeout(function(){$('#payment-method-submit').trigger('click');},100);
			}
		}

		// a proxy for statemachine (this could be refactored away)
		function _setState(evt, state){
			if (evt) {evt.preventDefault();}

			if ("set" in  state){
				statemachine.setCondition(conditions[state.set]);
			} else if ("clear" in state){
				statemachine.clearCondition(conditions[state.clear]);
			} else {
				//console.error("unknown state");
			}
		}

		// the state of the form is determined by the customer object
		function _determineState(gc){
			// no customer
			if (!gc){
				return conditions.noData;
			// customer with full payment information
			} else  if (gc && gc.addresses && gc.addresses.length && gc.payment_methods && gc.payment_methods.length){
				return conditions.hasData;
			} else if(gc && gc.signed_in && gc.addresses && gc.addresses.length === 0){
				return conditions.addAddress;
			} else if(gc && gc.signed_in && gc.addresses && gc.addresses.length > 0){
				return conditions.loggedIn;
			} else if (!gc.signed_in){
				return conditions.logIn;
			}

			// customer with no or partial payment information
			return conditions.addPayment;
		}

		// state is the right most condition
		function _isState(state){
			return statemachine.getCondition() >= conditions[state];
		}

		// view is a proxy for a condition
		function _isView(_view){
			return view === _view;
		}

		// submit to payment method our server
		function _submitPayment(){ // 3.x
			var obj = GetRequest.for.submitPayment();

			$http({
				method: 'POST',
				url: obj.url,
				data: appData.helpers._serialize(obj.data),
				responseType: 'json',
				headers: appData.headers,
				transformResponse: _transformPaymentMethodResponse,
				transformRequest: _transformPaymentMethodRequest,
				withCredentials: true,
			}).then(function(response){
				$rootScope.$broadcast("RESPONSE-SUCCESS");

				// only add payment when receiving a new payment method; not when validating the cvv
				if (!obj.verifyPayment){
					$rootScope.$broadcast("PAYMENT-METHOD-SUCCESS", response.data);
					DataStore.save("paymentMethod", response.data);
				}

				statemachine.setCondition(conditions.hasData);
				$timeout(function(){_submitShoppingCart();},100);
			},function(error){
				error.data.for = "page-error";
				error.data.message = error.data;
				$rootScope.$broadcast("RESPONSE-FAIL", error.data);
			}).finally(function(){
				$rootScope.$broadcast("WAIT", {wait: false, label: "DEFAULT"});
			});

			function _transformPaymentMethodRequest(request){
				request = request.replace(/number%3A/g,"");
				return request;
			}

			function _transformPaymentMethodResponse(response){
				// IE sucks
				if (typeof response === "string"){
					try {
						response = JSON.parse(response);
					} catch(e){console.error(e)}
				}
				if (response && !response.exception){ // not an error
					response.label = appData.helpers._makeMethodLabel(response.last_four);
					response.id = response.qcommerce_payment_method_id;
				}
				return response;
			}
		}


		// final step before completing order
		function _submitShoppingCart(){ // 4.0
			$rootScope.$broadcast("WAIT", {wait: true, label: "DEFAULT"});
			// get the data needed to submit the shopping chart 
			var data = GetRequest.for.submitShoppingCart();

			// save data so we can check if the checkout has changed
			DataStore.save("checkout", data);

			$http({
				method:"post",
				url: "/checkout/calculate_tax",
				responseType: "json",
				data: appData.helpers._serialize(data),
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

				// update invoice with tax
				$rootScope.$broadcast("SHOPPING-CART-UPDATE", {tax: response.data});
				DataStore.update('offer', 'tax_amount', response.data.tax_amount);
				DataStore.save("tax", response.data.tax_amount);

        DataStore.save("excise_tax", response.data.tax_list.excise_tax);
        DataStore.save("sales_tax", response.data.tax_list.sales_tax);

				// update submit button with completed action
				statemachine.setCondition(conditions.readyToSubmit);
				$rootScope.$broadcast("WAIT", {wait: false, label:"PLACEORDER"});


			}, function(error){
				error.data.for = "page-error";
				error.data.message = error.data;
				$rootScope.$broadcast("RESPONSE-FAIL", error.data);
				$rootScope.$broadcast("WAIT", {wait: false, label: "DEFAULT"});
				statemachine.setCondition(conditions.hasData);
			});
		}

		// final submit button action
		function _completeOrder(){ // 5.0
			$rootScope.$broadcast("WAIT", {wait: true});

			$http({
				method:"post",
				url: "/checkout/complete_checkout",
				data: appData.helpers._serialize(DataStore.get("checkout")),
				responseType: "json",
				headers: appData.headers,
				withCredentials: true
			}).then(function(response){
				statemachine.setCondition(conditions.submitted);
				$rootScope.$broadcast("RESPONSE-SUCCESS", response.data);
				location.assign("/thank_you?order_id=" + response.data.id);
			}, function(error){
				error.data.for = "page-error";
				error.data.message = error.data;
				$rootScope.$broadcast("RESPONSE-FAIL", error.data);
			}).finally(function(){
				$rootScope.$broadcast("WAIT", {wait: false, label:"Order Complete"});
			});
		}

		return {
			templateUrl: "checkout_module.html",
			link: function(scope/*, element, attrs*/){
				var unwatch;
				scope.$on("LOGIN-SUCCESS", _init);
				scope.$on("PAYMENT-METHOD-SELECT", _selectPaymentMethod);
				scope.$on("SHOW-ADDRESS", _showAddress);
				scope.$on("SHIPPING-CHECK", function(evt/*, data*/){_showAddress(evt, [1]);});

				// so we know if a changes has occured to the cart which effects the order
				scope.$on("SHOPPING-CART-UPDATE", _resetProcess);

				scope.$on("CHECK-ADDRESS", _checkForAddressChange);

				scope.action = _submit;
				scope.existingUser = false;
				scope.isView = _isView;
				scope.isState = _isState;
				scope.birthday = false;

				// scope.$watch(_checkoutHasErrors, function(n,o){
				// 	if(n){
				// 		//console.info("HERE!!!!");
				// 		//statemachine.setCondition(_determineState(globalObj.customer))
				// 	} else if (_.isEmpty(DataStore.get('checkout'))){
				// 		//console.info("there are no erros in the form and the checkout has not been submitted");
				// 	} else {
				// 		//console.info("there are no serrors in the form and checkout HAS been submitted");
				// 		if (_isCheckoutChanged()){
				// 			//console.info("There are changes in the current form");
				// 		} else {
				// 			//console.info("current form and submitted form are the same");
				// 			if(!_.isEqual (GetRequest.for.submitPayment(), DataStore.get("submitPayment"))){
				// 				//console.info("however the payment method has changed");
				// 			} else {
				// 				//console.info("good to submit");
				// 				//statemachine.setCondition(conditions.readyToSubmit);
				// 			}
				// 		}
				// 	}
				// });

				scope.$watch(function(){return statemachine.getCondition();}, function(n,o){
					view = _.findKey(conditions, function(condition){
						return condition === n;
					});

					if (n === conditions.readyToSubmit){
						//console.info("switching submit button actions to complete order");
						scope.$broadcast("WAIT", {label: "PLACEORDER"});
						_setAction(_complete);
						if (!unwatch){
							unwatch = scope.$watch(function(){return _isCheckoutChanged();}, function(n/*,o*/){
								if (n){
									// only set to hasData if we already submitted payment
									if (statemachine.getCondition() === conditions.readyToSubmit){
										statemachine.setCondition(conditions.hasData);
									}
								} else {
									//console.info("Putting the tax back in " + DataStore.get('tax'));
									// DataStore.update("offer", "tax_amount", DataStore.get('tax'));
									//statemachine.setCondition(conditions.readyToSubmit);
								}
							});
						}
					} else if (o === conditions.readyToSubmit && o > n){
						//console.info("switching submit button actions to CALCULATE TAX");
						scope.$broadcast("WAIT", {label: "DEFAULT"});
						_setAction(_submit);
					} else {
						// console.info("turn of watch");
						// if (unwatch) {unwatch()}
					}
					// for reporting only - no functional value

					scope.view = view;
				});

				_init(null, globalObj.customer);


				function _isCheckoutChanged(){
					return !_.isEqual(GetRequest.for.submitShoppingCart(), DataStore.get("checkout"));
			
				}

				function _checkForAddressChange(evt, newShippingId){ // data is shipping address id
					if (evt){evt.preventDefault();}
					var checkout = DataStore.get("checkout"),
						currentShippingId = checkout && checkout['checkout[shipping_address_id]'];
					// check data against current shipping address ID
					if (newShippingId !== currentShippingId){
						//console.info("set condition to hasData - NOT");
						//statemachine.setCondition(conditions.hasData);
					} else if (newShippingId === currentShippingId) {
						statemachine.setCondition(conditions.readyToSubmit);
						//console.info("set condition to readyToSubmit - YES");
					}
				}

				function _resetProcess(/*evt, data*/){
					if (statemachine.getCondition() === conditions.readyToSubmit){
						statemachine.setCondition(conditions.hasData);
						$timeout(function(){scope.$broadcast("BRAINTREE-INIT");},200);
					}
				}

				function _init(evt, data){
					globalObj.customer = Customer.processCustomer(data);

					if ($rootScope.returnCondition){
						if ($rootScope.returnCondition === 'addShipping'){
							// add shipping
							statemachine.setCondition(_determineState(globalObj.customer));
							$timeout(function(){scope.$broadcast("RETURN-TO-ADD-SHIPPING", null);}, 100);

						} else {
							statemachine.setCondition($rootScope.returnCondition);
						}
						
						$rootScope.returnCondition = false;

					} else {
						statemachine.setCondition(_determineState(globalObj.customer));
					}

					scope.existingUser = _isState("loggedIn") ? true : false;
					scope.userLoggedIn = Customer.isLoggedIn();
					scope.customer_name = Customer.makeFullName();

					_setPaymentMethods();
					_setAddresses();

					//$timeout(function(){$rootScope.$broadcast("BRAINTREE-INIT");}, 100);
				}

				function _submitAllForms(){
					_.each(scope.checkout, function(prop){
						if(prop && prop.constructor){
							if(prop.constructor === scope.checkout.constructor){
								if (prop.$name !== "braintree"){ // exclude BT form from submission
									prop.$setSubmitted();
								}
							}
						}
					});
				}

				// set submit button action to complete order
				function _setAction(action){
					scope.action = action;
				}

				function _complete(){
					if (_.isEmpty(scope.checkout.$error)){
						_completeOrder();
					} else {
						_submitAllForms();
					}
				}

				function _checkoutHasErrors(){
					return !_.isEmpty(scope.checkout.$error) && !scope.checkout.$pristine && scope.checkout.$submitted;
				}

				function _setAddresses(){
					scope.addresses = globalObj.customer && globalObj.customer.addresses ? globalObj.customer.addresses : [];
				}

				function _resetForms(){
					scope.checkout.$setPristine();

					_.each(scope.checkout, function(prop){
						if(prop && prop.constructor && prop.constructor.name){
							if(prop.constructor === scope.checkout.constructor){
								prop.$setPristine();
								prop.$submitted = false;
								prop.$error = {};
							}
						}
					});
				}

				function _setPaymentMethods(){
					if(globalObj.customer){
						scope.methods = globalObj.customer.payment_methods;
						DataStore.save("paymentMethod", (scope.methods.length && _.last(scope.methods)));
					} else {
						scope.methods = [];
					}
				}

				function _selectPaymentMethod(evt, method){
					if (Customer.isLoggedIn() || method){
						if (method){
							statemachine.setCondition(conditions.hasData);
						} else {
							statemachine.setCondition(conditions.addPayment);
						}
						scope.$broadcast("BRAINTREE-INIT");
					} else {
						$rootScope.returnCondition = conditions.addPayment;
						statemachine.setCondition(conditions.logIn);
					}
				}

				function _hasShippableAddress(){
					return _.some(scope.addresses, function(address){
					  return address.is_deliverable;
					});
				}

				function _showAddress(evt, address){
					if(scope.existingUser){
						if (!Customer.isLoggedIn() && !_hasShippableAddress()){
							//console.info("I have no deliverable addresses");
							$timeout(function(){statemachine.setCondition(conditions.logIn);},0);
						} else if (!Customer.isLoggedIn() && _.isEmpty(scope.addresses)){
							//console.info("I have no addresses at all");
							$timeout(function(){statemachine.setCondition(conditions.logIn);},0);
						} else if (!Customer.isLoggedIn() && address === null){
							// console.info("I am not logged in and have choicen to add a new address");
							$rootScope.returnCondition = "addShipping";
							$timeout(function(){statemachine.setCondition(conditions.logIn);},0);
						} else {
              DataStore.update('offer', 'tax_amount',  0);
              DataStore.update('sales_tax', 0);
              DataStore.update('excise_tax', 0);
						}
					}
				}

				// inital submit button action
				function _submit(){
					scope.$broadcast("WAIT", {wait: true});
					_submitAllForms();

					if (!_.isEmpty(scope.checkout.$error)){
						scope.$broadcast("WAIT", {wait: false});
						//console.error("there are errors in the forms");
					} else {
						// do we need to create an account
						if(scope.existingUser){
							if (!scope.methods || _.isEmpty(scope.methods) || address.billing || address.shipping){
								//console.info("No payment method");
								if (_isState("addAddress")){
									//console.info("validate new billing address");
									scope.$broadcast("VALIDATE-ADDRESS","#billingAddress");
								} else if (address.shipping){
									//console.info("validation new shipping address");
									scope.$broadcast("VALIDATE-ADDRESS", "#shippingAddress");
								} else {
									//console.info("validate payment - 1");
									_processPayment();
								}
							} else if (_isState("readyToSubmit")){
								//console.info("ready to readyToSubmit order!!!!!!");
								_completeOrder();
							} else {
								//console.info("validate payment - 2");
								_processPayment();
							}
						} else {
							if (_isState("loggedIn")){
								scope.$broadcast("VALIDATE-ADDRESS","#billingAddress");
							} else {
								var createAccountFormData = angular.element("#createAccount").serializeObject();
								
								var data = GetRequest.for.createAccount();

								// as to not display the age validator if you are a new customer
								scope.birthday = {year: createAccountFormData['customer[birthday.year]'], month: createAccountFormData['customer[birthday.month]'], day:createAccountFormData['customer[birthday.month]'] };

								SignInForgotCreateService.submit(null, "ACCOUNT-CREATE", null, appData.helpers._serialize(data), '/api/customers').then(
									function(response){
										if (_.isEmpty(response.errors) && !response.error){
											_init(null, response);
											scope.$broadcast("VALIDATE-ADDRESS","#billingAddress");
										} else {
											response.for = "createAccountResponseErrors";
											response.message = response.errors;
											$rootScope.$broadcast("RESPONSE-FAIL", response);
											$rootScope.$broadcast("WAIT", {wait: false, label: "DEFAULT"});
										}
									},
									function(/*error*/){
										// console.info("ERROR - creating account");
										// console.info(error);
									}
								);
							}
						}
					}
				}

				scope.logOut = function(init){
					return $http.get("/logout?disable_redirect=true").then(function(/*response*/) {
						scope.existingUser = false;
						scope.userLoggedIn = false;
						scope.customer_name = false;
						globalObj.customer = {};
						DataStore.clear();
						
						_setAddresses();

						statemachine.setCondition(conditions.noData);

						$rootScope.$broadcast("ERRORS-CLEAR");
						$rootScope.$broadcast("LOGOUT");

						if (!init){
							$timeout(function(){scope.$broadcast("BRAINTREE-INIT");},200);
						}
						return true;
					});
				};

				scope.goToLogin = function(){
					_resetForms();
					scope.$broadcast("ERRORS-CLEAR");
					statemachine.setCondition(conditions.logIn);
				};

				scope.toggleStats = function(){
					scope.showStats = !scope.showStats;
				};
			}
		};
	}]);
})();