(function(){
	"use strict";

	describe('Application: account_app.js', function () {
		var accountApi,
			detailsRE,
			addressRE,
			ordersRE,
			element,
			Addresses, AccountDetails, AccountProfile, AccountPassword, OrderHistory, Customer, DataStore,
			$http,
			$httpBackend,
			mockResponse = {"doesnot": "matter", "id" : "1"},
			$rootScope,
			scope; 
		// load the directive's module
		beforeEach(module("AccountApp"));

		beforeEach(inject(function (_accountApi_, _$httpBackend_) {
			accountApi = _accountApi_;
			$httpBackend = _$httpBackend_;
			detailsRE = new RegExp(accountApi.details + "\\d?");
			addressRE = new RegExp(accountApi.address + "\\d?");
			ordersRE = new RegExp(accountApi.orders + ".*?");
			$httpBackend.when('GET', addressRE).respond(mockResponse);
			$httpBackend.when('GET', accountApi.address).respond(mockResponse);
			$httpBackend.when('GET', accountApi.addressIndex).respond(mockResponse);
			$httpBackend.when('GET', ordersRE).respond(mockResponse);
			$httpBackend.when('GET', detailsRE).respond(mockResponse);
			$httpBackend.when('GET', accountApi.orders).respond(mockResponse);
			$httpBackend.when('PUT', addressRE).respond(mockResponse);
			$httpBackend.when('PUT', detailsRE).respond(mockResponse);
			$httpBackend.when('PUT', accountApi.profile).respond(mockResponse);
			$httpBackend.when('PUT', accountApi.password).respond(mockResponse);
			$httpBackend.when('DELETE', addressRE).respond(mockResponse);
		}));

		describe("Address Service", function(){

			beforeEach(inject(function ($rootScope, _Addresses_, _$http_) {
				scope = $rootScope.$new();
				Addresses = _Addresses_;
				$http = _$http_;
			}));

			it('should exist', function() {
			    expect(Addresses).toBeDefined();
			});


			describe("the API", function(){

				beforeEach(function(){
					spyOn($http, 'get').and.callThrough();
					spyOn($http, 'put').and.callThrough();
					spyOn($http, 'delete').and.callThrough();
				});

				it('should have a "get" method', function(){
					expect(Addresses.get).toBeDefined();
				});

				it('should have a "save" method', function(){
					expect(Addresses.save).toBeDefined();
				});

				it('should have a "update" method', function(){
					expect(Addresses.update).toBeDefined();
				});

				it('should have a "delete" method', function(){
					expect(Addresses.delete).toBeDefined();
				});

				describe("get method", function(){
					it("should return a response", function(){
						Addresses.get().then(function(response){
							expect(response.data).toEqual(mockResponse);
						})
						$httpBackend.flush();
					});

					it("should be called with the correct url", function(){
						Addresses.get();
						$httpBackend.flush();
						expect($http.get).toHaveBeenCalledWith(accountApi.addressIndex);
					});
				});

				describe("save method", function(){
					it("should return a response", function(){
						Addresses.save().then(function(response){
							expect(response.data).toEqual(mockResponse);
						})
						$httpBackend.flush();
					});

					it("should be called with the correct url", function(){
						Addresses.save(mockResponse);
						$httpBackend.flush();
						expect($http.put).toHaveBeenCalledWith(accountApi.address, {address: mockResponse});
					});
				});

				describe("update method", function(){
					it("should return a response", function(){
						Addresses.update(mockResponse).then(function(response){
							expect(response.data).toEqual(mockResponse);
						})
						$httpBackend.flush();
					});

					it("should be called with the correct url", function(){
						Addresses.save(mockResponse);
						$httpBackend.flush();
						expect($http.put).toHaveBeenCalledWith(accountApi.address, {address: mockResponse});
					});
				});

				describe("delete method", function(){
					it("should return a response", function(){
						Addresses.delete(mockResponse).then(function(response){
							expect(response.data).toEqual(mockResponse);
						})
						$httpBackend.flush();
					});

					it("should be called with the correct url", function(){
						Addresses.delete(mockResponse);
						$httpBackend.flush();
						expect($http.delete).toHaveBeenCalledWith(accountApi.address + mockResponse.id);
					});
				});
			});
		});

		describe("AccountDetails Service", function(){

			beforeEach(inject(function ($rootScope, _AccountDetails_, _$http_, _Customer_) {
				scope = $rootScope.$new();
				AccountDetails = _AccountDetails_;
				Customer = _Customer_;
				$http = _$http_;
			}));

			it('should exist', function() {
			    expect(AccountDetails).toBeDefined();
			    expect(Customer).toBeDefined();
			});


			describe("the API", function(){
				var getSpy, putSpy;

				beforeEach(function(){
					getSpy = spyOn($http, 'get').and.callThrough();
					putSpy = spyOn($http, 'put').and.callThrough();
				});

				it('should have a "get" method', function(){
					expect(AccountDetails.get).toBeDefined();
				});

				it('should have a "update" method', function(){
					expect(AccountDetails.update).toBeDefined();
				});


				describe("get method", function(){
					it("should return a response", function(){
						AccountDetails.get().then(function(response){
							expect(response.data).toEqual(mockResponse);
						})
						$httpBackend.flush();
					});

					it("should be called with the correct url", function(){
						AccountDetails.get(mockResponse);
						$httpBackend.flush();
						expect(getSpy.calls.mostRecent().args[0]).toMatch(detailsRE);
					});
				});

				describe("update method", function(){
					it("should return a response", function(){
						AccountDetails.update(mockResponse).then(function(response){
							expect(response.data).toEqual(mockResponse);
						})
						$httpBackend.flush();
					});

					it("should be called with the correct url", function(){
						AccountDetails.update(mockResponse);
						$httpBackend.flush();
						// expect($http.put).toHaveBeenCalledWith(api.address, {address: mockResponse});
						expect(putSpy.calls.mostRecent().args[0]).toMatch(detailsRE);
					});
				});
			});
		});

		describe("AccountProfile Service", function(){
			var putSpy;

			beforeEach(inject(function ($rootScope, _AccountProfile_, _$http_) {
				scope = $rootScope.$new();
				AccountProfile = _AccountProfile_;
				$http = _$http_;
			}));

			it('should exist', function() {
			    expect(AccountProfile).toBeDefined();
			});

			describe("the API", function(){
				it('should have a "update" method', function(){
					expect(AccountProfile.update).toBeDefined();
				});

				describe("update method", function(){
					beforeEach(function(){
						putSpy = spyOn($http, 'put').and.callThrough();
					});


					it("should return a response", function(){
						AccountProfile.update(mockResponse).then(function(response){
							expect(response.data).toEqual(mockResponse);
						})
						$httpBackend.flush();
					});

					it("should be called with the correct url", function(){
						AccountProfile.update(mockResponse);
						$httpBackend.flush();
						expect(putSpy.calls.mostRecent().args[0]).toMatch(accountApi.profile);
					});
				});

			});
		});

		describe("AccountPassword Service", function(){
			var putSpy;

			beforeEach(inject(function ($rootScope, _AccountPassword_, _$http_) {
				scope = $rootScope.$new();
				AccountPassword = _AccountPassword_;
				$http = _$http_;
			}));

			it('should exist', function() {
			    expect(AccountPassword).toBeDefined();
			});

			describe("update method", function(){
				beforeEach(function(){
					putSpy = spyOn($http, 'put').and.callThrough();
				});


				it("should return a response", function(){
					AccountPassword.update(mockResponse).then(function(response){
						expect(response.data).toEqual(mockResponse);
					})
					$httpBackend.flush();
				});

				it("should be called with the correct url", function(){
					AccountPassword.update(mockResponse);
					$httpBackend.flush();
					expect(putSpy.calls.mostRecent().args[0]).toMatch(accountApi.password);
				});
			});
		});

		describe("OrderHistory Service", function(){
			var getSpy;

			beforeEach(inject(function ($rootScope, _OrderHistory_,  _$http_) {
				scope = $rootScope.$new();
				OrderHistory = _OrderHistory_;
				$http = _$http_;
			}));

			it('should exist', function() {
			    expect(OrderHistory).toBeDefined();
			});

			describe("get method", function(){
				beforeEach(function(){
					getSpy = spyOn($http, 'get').and.callThrough();
				});


				it("should return a response", function(){
					OrderHistory.get(1,10).then(function(response){
						expect(response.data).toEqual(mockResponse);
					});
					$httpBackend.flush();
				});

				it("should be called with the correct url", function(){
					OrderHistory.get(mockResponse);
					$httpBackend.flush();
					expect(getSpy.calls.mostRecent().args[0]).toMatch(accountApi.orders);
				});
			});
		});

		describe("Account Directive", function(){
			var testData = {},
				spy;

			beforeEach(inject(function ($rootScope) {
				scope = $rootScope.$new();
				spy = spyOn(scope, "$broadcast");
			}));

			it('should switch to a view', inject(function ($compile) {
				element = angular.element('<account></account>');
				element = $compile(element)(scope);
				scope.$digest();
				scope.switchTo(testData);

				expect(spy).toHaveBeenCalledWith("change-app", testData);
			}));
		});

		describe("App Directive", function(){
			var testData = {},
				view = "detail",
				real;

			function _makeResult(app){
				return "<" + app + "></" + app + ">";
			}

			function _makeHTML(app){
				return '<div class="app-holder">' + _makeResult(app) + '</div>';
			}

			beforeEach(inject(function ($rootScope, $compile) {
				scope = $rootScope.$new();

				element = angular.element('<app source="detail"></app>');
				element = $compile(element)(scope);

				element.isolateScope().swap = jasmine.createSpy().and.callFake(function(element, app, scope) {
					var el = angular.element(_makeResult(app));
					element.find(".app-holder").html(el[0].outerHTML);
				});

				scope.$digest();

			}));

			it('should exist', inject(function () {
				expect(element.html()).toBeDefined();
			}));

			it('should default to detail view', inject(function ($timeout) {
				$timeout.flush();

				expect(element.isolateScope().source).toEqual("detail");
			}));


			it('should switch to a view', inject(function ($timeout) {
				$timeout.flush();

				expect(element.html()).toEqual(_makeHTML("detail"));
				expect(element.isolateScope().swap).toHaveBeenCalled();
				scope.$broadcast("change-app", "book");
				expect(element.html()).toEqual(_makeHTML("book"));
				expect(element.isolateScope().swap).toHaveBeenCalled();
			}));
		});

		describe("Detail Directive", function(){
			var dateOfBirth = "2017-01-15",
				dob = {dob: dateOfBirth},
				testData = {data: dob},
				event = {preventDefault: function(){}},
				customer = {good: true},
				badCustomer = {};

			beforeEach(inject(function (_$rootScope_, $compile, _AccountDetails_, _AccountProfile_, _AccountPassword_, _DataStore_, _Customer_, $q) {
				AccountDetails = _AccountDetails_;
				$rootScope = _$rootScope_;
				DataStore = _DataStore_;
				AccountProfile = _AccountProfile_;
				Customer = _Customer_;
				scope = $rootScope.$new();

				spyOn(AccountDetails, "get").and.callFake(function() {
					var deferred = $q.defer();
					deferred.resolve(testData);
					return deferred.promise;
				});

				spyOn($rootScope, "$broadcast");

				spyOn(DataStore, "get").and.callFake(function(data) {
					return dob;
				});

				spyOn(AccountProfile, "update").and.callFake(function(customer){
					var deferred = $q.defer();
					customer.good ?  deferred.resolve(dob): deferred.reject("error") ;
					return deferred.promise;
				});

				spyOn(Customer, "setCustomer");

				element = angular.element('<detail></detail>');
				element = $compile(element)(scope);

				scope.$digest();

				spyOn(scope.editPassword, "$setPristine");
				spyOn(scope.editAccount, "$setPristine");
			}));

			it('should exist', inject(function () {
				expect(element.html()).toBeDefined();
			}));

			it('should have a updateCustomer method', function(){
				expect(scope.updateCustomer).toBeDefined();
			});

			it('should have a changePassword method', function(){
				expect(scope.changePassword).toBeDefined();
			});

			it('should get account details', inject(function () {
				expect(AccountDetails.get).toHaveBeenCalled();
				expect(scope.account).toBeDefined();
			}));

			it('should make the correct birthday', inject(function () {
				expect(scope.year).toBe("2017");
				expect(scope.month).toBe("01");
				expect(scope.day).toBe("15");
			}));

			describe("the updateCustomer method", function(){
				it('should clear all errors', function(){
					scope.updateCustomer(customer,event);
					expect($rootScope.$broadcast).toHaveBeenCalledWith("ERRORS-CLEAR")
				});

				it('should get a valid dob', function(){
					scope.updateCustomer(customer,event);
					expect(DataStore.get).toHaveBeenCalled();
				});

				it('should call the update customer api', function(){
					scope.updateCustomer(customer,event);
					expect(AccountProfile.update).toHaveBeenCalledWith({good: true, dob: dateOfBirth});
				});

				it('should update the Customer', function(){
					scope.updateCustomer(customer,event);
					scope.$digest(); // needed to resolve promise
					expect(Customer.setCustomer).toHaveBeenCalled();
					expect(scope.editPassword.$setPristine).toHaveBeenCalled();
					expect(scope.editPassword.$setPristine).toHaveBeenCalled();
					expect($rootScope.$broadcast.calls.argsFor(1)).toEqual(['LOGIN']);
					expect($rootScope.$broadcast.calls.argsFor(2)).toEqual(['RESPONSE-SUCCESS-MSG', jasmine.any(Object)]);
				});

				it('should broadcast an error message on error', function(){
					scope.updateCustomer(badCustomer,event);
					scope.$digest(); // needed to resolve promise
					expect($rootScope.$broadcast.calls.argsFor(1)).toEqual(["RESPONSE-FAIL", jasmine.any(Object)]);
				});
			});
		});

		describe("Book Directive", function(){
			var testData = {data: true, qcommerce_state_id: 5, state: {id: 5}, "address[last_name]": "smith", "address[first_name]": "john"};

			beforeEach(inject(function (_Addresses_, $q, $compile, _$rootScope_, _$modal_){
				var $modal = _$modal_;

				Addresses = _Addresses_;
				$rootScope =  _$rootScope_;
				scope = $rootScope.$new();

				spyOn(Addresses, "get").and.callFake(makeFakeFunction($q, testData));
				spyOn(Addresses, "update").and.callFake(makeFakeFunction($q, testData));

				spyOn(scope, "$on");
				spyOn($rootScope, "$broadcast");
				spyOn(scope, "$watch");
				spyOn($modal, 'open').and.returnValue(fakeModal);
				spyOn(console, "error");

				element = angular.element('<book></book>');
				element = $compile(element)(scope);

				scope.$digest();

				spyOn(scope.editAddress, "$setPristine");
				spyOn(scope.editAddress, "$setSubmitted");
			}));

			it('should get address data', function(){
				expect(Addresses.get).toHaveBeenCalled();
				scope.$digest(); // resolve promise
				expect(scope.addresses).toEqual(testData.data);
			});

			it ("should set the address-validated listener", function(){
				expect(scope.$on).toHaveBeenCalledWith("ADDRESS-VALIDATED", jasmine.any(Function));
			});

			it ("should set a watcher for an address change", function(){
				expect(scope.$watch).toHaveBeenCalledWith('address', jasmine.any(Function));
			});

			it ("should edit an address", function(){
				expect(scope.edit).toBeDefined();
				scope.edit(testData);
				expect(scope.address).toBe(testData);
				expect(scope.action).toBe(scope.update);
				expect(scope.editAddress.$setPristine).toHaveBeenCalled();
			});

			it ("should delete an address", function(){
				expect(scope.delete).toBeDefined();
			});

			it ("should update an address", function(){
				expect(scope.update).toBeDefined();
				// prime the data set
				scope.addresses = [];
				scope.addresses[0] = testData;
				scope.update(testData);
				expect(Addresses.update).toHaveBeenCalledWith(testData);
				scope.$digest(); // resolve promise
				expect(scope.addresses[0]).toBe(testData.data);
			});

			it ("should save an address", function(){
				expect(scope.save).toBeDefined();
				scope.save(testData);
				expect(scope.editAddress.$setSubmitted).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith('There are errors in the form');
				// TODO:
				// Test non-error state
			});

			it ("should add an address", function(){
				expect(scope.addAddress).toBeDefined();
				scope.addAddress();
				expect(scope.action).toBe(scope.save);
				expect(scope.editAddress.$setPristine).toHaveBeenCalled();
			});

			it ("should cancel the editing of an address", function(){
				expect(scope.cancel).toBeDefined();

				// prime the data set
				scope.addresses = [];
				scope.addresses[0] = testData;
				scope.cancel(testData);
				expect(scope.addresses[0]).not.toBeDefined();
			});
		});

		describe("History Directive", function(){
			var testData = {data: {orders: true}},
				id = 1;

			beforeEach(inject(function(_OrderHistory_, _$rootScope_, $compile, $q){
				OrderHistory = _OrderHistory_
				$rootScope = _$rootScope_;
				scope = $rootScope.$new();

				element = angular.element('<history></history>');
				element = $compile(element)(scope);

				spyOn(OrderHistory, "get").and.callFake(makeFakeFunction($q, testData));
				spyOn(OrderHistory, "getItem").and.callFake(makeFakeFunction($q, testData));

				scope.$digest();
			}));

			it ("should get order history", function(){
				expect(OrderHistory.get).toHaveBeenCalled();
				expect(scope.orders).toEqual(testData.data.orders);
			});

			it ("should get details", function(){
				expect(scope.getDetails).toBeDefined();
				scope.getDetails(id);
				scope.$digest(); // flush promise
				expect(OrderHistory.getItem).toHaveBeenCalledWith(id);
				expect(scope.detail).toEqual(testData.data);
			});

			it ("should get carrier", function(){
				expect(scope.getCarrier).toBeDefined();
				expect(scope.getCarrier("UPS")).toEqual("ups");
				expect(scope.getCarrier("FedEx")).toEqual("fedex");
				expect(scope.getCarrier("fail")).toBe(false);
			});

			it ("should fetch", function(){
				expect(scope.fetch).toBeDefined();
				scope.fetch(id)
				expect(scope.show).toEqual(id);
				scope.fetch(id)
				expect(scope.show).toEqual(false);
			});
		});

	});

	var fakeModal = {
		result: {
			then: function(confirmCallback, cancelCallback) {
				//Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
				this.confirmCallBack = confirmCallback;
				this.cancelCallback = cancelCallback;
			}
		},
		close: function( item ) {
			//The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
			this.result.confirmCallBack( item );
		},
		dismiss: function( type ) {
			//The user clicked cancel on the modal dialog, call the stored cancel callback
			this.result.cancelCallback( type );
		}
	};

	function makeFakeFunction($q, testData){
		return function fakePromise(){
			var deferred = $q.defer();
			deferred.resolve(testData);
			return deferred.promise;
		}
	}
})();


