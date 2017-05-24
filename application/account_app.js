(function(){
	"use strict";

	angular.module("AccountApp", ["drinks.directives", "drinks.services", "drinks.constants", "drinks.filters", "mm.foundation.modal"]);

	angular.module("AccountApp").controller("MainCtrl", ["$scope",function($scope){
		// $scope.switchTo = function(which){
		// 	console.info(which);
		// 	$scope.whichApp = which;
		// }

		// $scope.whichApp = "nothing"
	}])
	.service("Addresses",["$http", "accountApi", function($http, accountApi){
		// var baseUrl = '/api/addresses/'
		var baseUrl = accountApi.address;


		this.get = function(){
			return $http.get(accountApi.addressIndex);
		}

		this.save = function(address){
			return $http.put(baseUrl, {address:address});
		}

		this.update = function(address){
			return $http.put(baseUrl + address.id, {address:address});
		}

		this.delete = function(address){
			return $http.delete(baseUrl + address.id);
		}
	}])
	.service("AccountDetails", ["$http", "Customer", "accountApi", function($http, Customer, accountApi){
		var id = Customer.getCustomerId(),
			baseUrl = accountApi.details
		this.get = function(){
			return $http.get(baseUrl  + id);
		}

		this.update = function(customer){
			return $http.put(baseUrl  + id, {customer: customer});
		}
	}])
	.service("AccountProfile", ["$http", "Customer", "accountApi", function($http, Customer, accountApi){
		var baseUrl = accountApi.profile;

		this.update = function(customer){
			return $http.put(baseUrl, {customer: customer});
		}
	}])
	.service("AccountPassword", ["$http", "Customer", "accountApi", function($http, Customer, accountApi){
		var baseUrl = accountApi.password;

		this.update = function(customer){
			return $http.put(baseUrl, {customer: customer});
		};
	}])
	.service("OrderHistory", ["$http", "Customer", "accountApi", function($http, Customer, accountApi){

		var baseUrl = accountApi.orders;
		this.get = function(page, ordersPerPage){
			var options = {params: {}};
			if (page) {
				options.params['page'] = page;
			}
			if (ordersPerPage) {
				options.params['per_page'] = ordersPerPage;
			}
			return $http.get(baseUrl, options);
		}

		this.getItem = function(id){
			return $http.get(baseUrl + id);
		};
	}])
	.service("Subscription", ["$http", "accountApi", function($http, accountApi){
		var baseUrl = accountApi.subscriptions;

		this.get = function(){
			return $http.get(baseUrl);
		};

		this.updatePackType = function(subscription, type){
			return $http.put(baseUrl + "/" + subscription.id + "?subscription[preference]=" + type);
		};

		this.updateSubscriptionLabel = function(subscription, label){
			return $http.put(baseUrl + "/" + subscription.id + "?subscription[label]=" + label); 
		};

		this.updateSubscriptionShippingAddress = function(subscription, addressId, isPermanent){
			var url = baseUrl + "/" + subscription.id + "?subscription[qcommerce_shipping_address_id]=" + addressId;

			if (!isPermanent){
				url += "&subscription[one_time_shipping_address_update]=true";
			}
			return $http.put(url); 
		}

	}])
	.directive("account", [function(){
		return {
			templateUrl: 'navigation.html',
			restrict: "E",
			link: function(scope){
				scope.switchTo = function(which){
					scope.$broadcast("change-app", which);
					scope.whichApp = which;
				}
			}
		}
	}])
	.directive("subscriptions", ["Subscription", "Addresses", function(Subscription, Addresses){
		return {
			templateUrl: 'subscriptions.html',
			restrict: "E",
			link: function(scope, element, attrs){
				Subscription.get().then(function(response){
					scope.groups = _.groupBy(response.data, function(subscription){
						return subscription.is_gift ? "gift" : "recurring";
					});
				});

				scope.pack = {};
				scope.label = {};
				scope.shipping = {};
				scope.isPermanent = {value: 'true'};
				scope.action = _change;

				scope.getAddresses = function(){
					Addresses.get().then(function(response){
						scope.addresses = response.data;
					});
				};

				scope.updatePackType = function(subscription, type){
					if (type && type !== subscription.pack_type){
						Subscription.updatePackType(subscription, type).then(function(response){
							_updateSubscriptionValue (subscription, "pack_type", type)
						});
					} else {
						console.info("pack type did not change");
					}
				};

				scope.updateSubscriptionLabel = function(subscription, label){
					if (subscription && label){
						Subscription.updateSubscriptionLabel(subscription, label).then(function(response){
							_updateSubscriptionValue(subscription, "label", label);
						});
					}
				};

				function _change(){scope.getAddresses(); scope.action = _save;}

				function _save(){_updateSubscriptionShippingAddress.apply(null, Array.prototype.slice.apply(arguments));scope.action = _change;}

				function _updateSubscriptionShippingAddress(subscription, addressId){ //, isPermanent
					if (subscription && addressId){

						Subscription.updateSubscriptionShippingAddress(subscription, addressId).then(function(response){ //, isPermanent
							_updateSubscription(subscription, response.data);
						});
					}
				}

				function _updateSubscriptionValue (subscription, attrs, value){
					subscription[attrs] = value;
				}

				function _updateSubscription (oldSubscription, newSubscription){
					var index = _getSubscriptionIndexById(oldSubscription);
					scope.groups[oldSubscription.is_gift ? "gift" : "recurring"].splice(index,1,newSubscription);
				}

				function _getSubscriptionIndexById(subscription){
					return  _.indexOf(scope.groups[subscription.is_gift ? "gift" : "recurring"], subscription);
				}
			}
		}
	}])
	.directive("app",["$compile", "$timeout", function($compile, $timeout){
		return {
			template:"<div class='app-holder'></div>",
			scope: {
				source: "@"
			},
			link: function(scope, element, attrs){

				$timeout(function(){
					scope.swap(element, scope.source, scope);
				},0);

				scope.$on("change-app", function(evt, data){
					scope.swap(element, data, scope);
				});

				scope.swap = function(element, app, scope){
					var el = angular.element("<" + app + "></" + app + ">"),
						appName = $compile(el)(scope);

					element.find(".app-holder").html(appName);
				}
			}
		}
	}])
	.directive("detail", ["$rootScope", "AccountDetails", "AccountProfile", "AccountPassword", "DataStore",  "Customer", function($rootScope, AccountDetails, AccountProfile, AccountPassword, DataStore, Customer){
		return {
			templateUrl: "details.html",
			retrict: "AE",
			link: function(scope, element, attrs){
				scope.ofAge = true;

				AccountDetails.get().then(function(response){
					scope.account = response.data;
					_makeBirthday(response.data.dob);
				});

				scope.updateCustomer = function(customer, evt){
					if (evt){
						evt.preventDefault();
					}

					$rootScope.$broadcast("ERRORS-CLEAR");

					var dob = DataStore.get('ageValidation').dob
					customer.dob = dob;

					AccountProfile.update(customer).then(function(response){
						Customer.setCustomer(response.data);
						$rootScope.$broadcast("LOGIN")
						
						scope.editPassword.$setPristine();
						scope.editAccount.$setPristine();
						$rootScope.$broadcast("RESPONSE-SUCCESS-MSG", {message: "Personal information updated successfully.", for: "updateProfile-success"});
					},function(response) {
						$rootScope.$broadcast("RESPONSE-FAIL", {message: "Personal information failed to update.", for: "updateProfile-error"});
					});

				};

				scope.changePassword = function(customer, evt) {
					if (evt){
						evt.preventDefault();
					}

					$rootScope.$broadcast("ERRORS-CLEAR");

					AccountPassword.update(customer).success(function(response) {
						$rootScope.$broadcast("RESETPASSWORD-SUCCESS", {message: "Password was successfully changed.", for: "editPassword-success"});
					}).error(function(response) {
						$rootScope.$broadcast("RESPONSE-FAIL", {message: "Please enter the correct current password.", for: "editPassword-error"});
					});

				};

				function _makeBirthday(date){
					var birthday = date.split("-");
					scope.year = birthday[0];
					scope.month = birthday[1];
					scope.day = birthday[2];
				}
			}
		}
	}])
	.directive("book", ["Addresses", "$timeout", "$rootScope", "$modal", function(Addresses, $timeout, $rootScope, $modal){
		return {
			templateUrl: "addresses.html",
			retrict: "A",
			link: function(scope, element, attrs){
				var activeAddress;

				Addresses.get().then(
					function(response){
						scope.addresses = response.data;
					}
				);

				scope.address = false;

				scope.$on("ADDRESS-VALIDATED", _addAddress);
				scope.$on("RESPONSE-FAIL", function() {
					scope.submitInProgress = false;
				});

				scope.$watch('address', function() {
					$(document).scrollTop(0);
				});

				function _addAddress(evt, address){
					scope.addresses.push(_makeStateName(address));
					scope.editAddress.$setPristine();
					scope.address = false;
				}

				function _makeStateName(address){
					if (address.qcommerce_state && address.qcommerce_state.name){	
						address.state = address.state || {};
						address.state.name = address.qcommerce_state.name;
						address.state.id = address.qcommerce_state.id;
					} 

					return address;
				}

				scope.edit = function(address){
					activeAddress = _.clone(address);

					address.state = address.state.id.toString();
					scope.address = address;
					scope.action = scope.update;
					scope.editAddress.$setPristine();
				}

				scope.delete = function(address){
					_openConfirmModal().then(function() {
						Addresses.delete(address).then(function(){
							var index = _.indexOf(scope.addresses, address);
							scope.addresses.splice(index,1);
						});
					});
				}

				scope.update = function(address, evt){
					if (evt){
						evt.preventDefault();
					}
					scope.submitInProgress = true;
					Addresses.update(address).then(function(response){
						var index = _.indexOf(scope.addresses, address);
						scope.addresses[index] = _makeStateName(response.data);
						scope.address = false;
					}, function() {
						scope.submitInProgress = false;
					});
				}

				scope.save = function(address, evt){
					if (evt){
						evt.preventDefault();
					}

					scope.editAddress.$setSubmitted();
					if (_.isEmpty(scope.editAddress.$error)){
						scope.submitInProgress = true;
						scope.$broadcast("VALIDATE-ADDRESS", "#editAddress");
					} else {
						console.error("There are errors in the form");
					}
				}

				scope.addAddress = function(evt){
					if (evt){
						evt.preventDefault();
					}
					scope.address = {};
					scope.action = scope.save;
					scope.editAddress.$setPristine();
				}

				scope.cancel = function(address, evt){
					if (evt){
						evt.preventDefault();
					}
					var index = _.indexOf(scope.addresses, address);
					scope.addresses[index] = activeAddress;
					scope.address = false;
				}

				scope.saveIsDisabled = function() {
					return (scope.editAddress && (scope.editAddress.$pristine || scope.editAddress.$invalid ))  || scope.submitInProgress;
				}


				function _addAddress(evt, address){
					scope.addresses.push(_makeStateName(address));
					scope.editAddress.$setPristine();
					$rootScope.$broadcast("ERRORS-CLEAR");
					scope.address = false;
				}

				function _makeStateName(address){
					if (address.qcommerce_state && address.qcommerce_state.name){	
						address.state = address.state || {};
						address.state.name = address.qcommerce_state.name;
					} 

					return address;
				}

				scope.$watch('address', function() {
					$rootScope.$broadcast("ERRORS-CLEAR");
					$rootScope.$broadcast("ADDRESS-SUGGESTIONS-RESET");
					$(document).scrollTop(0);
				});


				function _openConfirmModal() {
					var modalInstance = $modal.open({
						templateUrl: 'delete_address_confirm_modal.html',
						windowClass: 'drinks-modal delete-address-confirmation',
						controller: ["$scope", "$modalInstance", function($scope, $modalInstance) {
							$scope.message = "Are you sure you want to delete this?";
							$scope.confirm = function() {
								$modalInstance.close();
							};
							$scope.cancel = function() {
								$modalInstance.dismiss('cancel');
							};
						}],
						closeOnClick: true,
						size: 'small'
					});

					return modalInstance.result;
				}
			}
		}
	}])
	.directive("history", ["OrderHistory", "$window", "$timeout", function(OrderHistory, $window, $timeout){
		return {
			templateUrl: "order_history.html",
			retrict: "AE",
			link: function(scope, element, attrs){

				var initialOrdersFetched = false;
				scope.orders = [];
				scope.totalOrders = 0;
				scope.currentPage = 1;
				scope.ordersPerPage = 10;
				scope.fetchingOrders = true;

				scope.$watch('currentPage', function(newVal, oldVal) {
					scope.currentPage = newVal;
					scope.show = false;
					scope.getOrders();
				});

				scope.getOrders = function() {
					scope.fetchingOrders = true;
					OrderHistory.get(scope.currentPage, scope.ordersPerPage).then(function(response){
						scope.totalOrders = response.data.count;
						scope.orders = response.data.orders;
						scope.fetchingOrders = false;

						if (initialOrdersFetched && Foundation.utils.is_small_only()) {
							$timeout(function() {
								angular.element($window).scrollTop(0);
							});
						}
						initialOrdersFetched = true;
					}, function(error, status) {
						scope.fetchingOrders = false;
						console.error(error, status);
					});
				};

				scope.getDetails = function(id){
					OrderHistory.getItem(id).then(function(response){
						var order = _.find(scope.orders, {id: id});
						scope.detail = response.data; //_format(response.data);
					});
				}

				scope.getCarrier = function(carrier){
					if ((/UPS/i).test(carrier)){
						return "ups";
					} else if ((/FedEx/i).test(carrier)){
						return "fedex";
					} else {
						return false;
					}
				}

				scope.fetch = function (id){
					if (scope.show !== id){
						scope.show = id;
						scope.getDetails(id);
					} else if (scope.show === id){
						scope.show = false;
					}
				}

				function _format(details){
					_.each(details.items, function(item, index, arry){
						item.sorted = _.groupBy(item, "name");
					})

					return {
						items: details.items,
						shipping_address: details.shipping_address,
						payment_method: details.payment_method,
						shipping: details.shipping
					}
				}
			}
		}
	}])
	.directive('changeSave', [function(){
		return {
			restrict: "A",
			scope: true,
			link: function(scope, element, attrs){
				element.on("click", function(){
					// toggle visibility
					if (attrs.changeSave){
						angular.element(attrs.changeSave).toggleClass("hide");
					}

					// change button text
					if (element.text().toLowerCase() === "change"){
						element.text("save");
					} else {
						element.text("change");
					}
		
				});
			}
		}
	}])
	.directive('ngConfirmClick', [
	    function(){
	        return {
	            priority: 1,
	            terminal: true,
	            link: function (scope, element, attr) {
	                var msg = attr.ngConfirmClick || "Are you sure?",
	                    clickAction = attr.confirmedClick;
	                element.bind('click',function (event) {
	                    if ( window.confirm(msg) ) {
	                        scope.$eval(clickAction, {$event: event});
	                    }
	                });
	            }
	        };
	}]);
})();
