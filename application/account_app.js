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
			return $http.get(baseUrl);
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
		var id = Customer.getCustomerId(),
			baseUrl = accountApi.orders;

		this.get = function(){
			return $http.get(baseUrl);
		};

		this.getItem = function(id){
			return $http.get(baseUrl + id);
		};
	}])
	.directive("account", [function(){
		return {
			templateUrl: 'navigation.html',
			restrict: "E",
			link: function(scope){
				scope.switchTo = function(which){
					scope.$broadcast("change-app", which);
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

				scope.$watch('address', function() {
					$(document).scrollTop(0);
				});

				scope.edit = function(address){
					activeAddress = _.clone(address);

					address.state = address.qcommerce_state_id.toString();
					scope.address = address;
					scope.action = scope.update;
					scope.editAddress.$setPristine();
					$rootScope.$broadcast("ERRORS-CLEAR");
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
					
					Addresses.update(address).then(function(response){
						var index = _.indexOf(scope.addresses, address);
						scope.addresses[index] = _makeStateName(response.data);
						scope.address = false;
					});
				}

				scope.save = function(address, evt){
					if (evt){
						evt.preventDefault();
					}

					scope.editAddress.$setSubmitted();
					if (_.isEmpty(scope.editAddress.$error)){
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
					$rootScope.$broadcast("ERRORS-CLEAR");
				}

				scope.cancel = function(address, evt){
					if (evt){
						evt.preventDefault();
					}
					var index = _.indexOf(scope.addresses, address);
					scope.addresses[index] = activeAddress;
					scope.address = false;
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
	.directive("history", ["OrderHistory", function(OrderHistory){
		return {
			templateUrl: "order_history.html",
			retrict: "AE",
			link: function(scope, element, attrs){

				OrderHistory.get().then(function(response){
					scope.orders = response.data;
				});

				scope.getDetails = function(id){
					OrderHistory.getItem(id).then(function(response){
						var order = _.find(scope.orders, {id: id})
						scope.detail = response.data; //_format(response.data);
					})
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
