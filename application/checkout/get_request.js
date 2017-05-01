/* globals _ */
(function(){
  "use strict";

  angular.module("drinks.services").service("GetRequest", ["DataStore", "Customer", "StateMachine", function(DataStore, Customer, StateMachine){

  	this.for = {};

  	this.for.submitPayment = function(){ //3.x

		var billingAddress =  DataStore.get('billingAddress'),
			paymentMethod = DataStore.get('paymentMethod'),
			nonce = {"payment_method[nonce]" : DataStore.get('nonce')},
			obj = {url: "", data: "", verifyPayment: false},
			verifyPayment = StateMachine.getCondition() === StateMachine.conditions.hasData;

		if(verifyPayment){ // validation for cvv only scenerio 3.1
			obj.verifyPayment = true;
			obj.url = "/api/payment_methods/verify_card";
			obj.data = _.extend({}, {"customer_id": Customer.getCustomerId(), "payment_method[id]": paymentMethod.id}, nonce);
		} else { // 3.0
			obj.url = "/api/payment_methods";
			obj.data = _.extend({}, {'payment_method[qcommerce_billing_address_id]': billingAddress.id}, nonce);
		}

		return obj;

  	};

  	this.for.createAccount = function(){
		var dob = DataStore.get('ageValidation'),
			dobObj = {'customer[dob]': dob.dob},
			personalInformation = DataStore.get('personalInformation'),
			personalInformationObj = {'customer[email]': personalInformation.email, 'customer[first_name]':  personalInformation.first_name, 'customer[last_name]': personalInformation.last_name, 'customer[auto_sign_in]': true},
			account = DataStore.get('account'),
			accountObj = {'customer[password]': account.password, 'customer[password_confirmation]':account.password_confirmation},

			data = _.extend({}, dobObj, personalInformationObj, accountObj);

		return data;
  	};

  	this.for.submitShoppingCart = function(){ // 4.x
  		// get shipping and gift information
  		var shippingInformation = DataStore.get("shippingAddress"),
				gift = DataStore.get("gift"),
				shippingObj = {}, 
				giftObj = {'checkout[is_gift]': gift && gift.show === true ? true : false, 'checkout[gift_message]': gift && gift.message ? gift.message : false};

		if (shippingInformation && shippingInformation.sameAsBilling === true) {
			shippingObj = {'checkout[same_as_billing]': true};
		} else if (shippingInformation){
			shippingObj = {'checkout[shipping_address_id]' : shippingInformation.id};
		} else {
			shippingObj = {};
		}

		// get date of birth
		var ageValidation = DataStore.get('ageValidation'),
			dobObj =  {"customer[dob]": (DataStore.get("checkout[dob]") ||  ageValidation && ageValidation.dob ? ageValidation.dob : false)};

		// get offer and upsells
		var offer = DataStore.get("offer").offer,
			offerObj = {},
			upsellIds = offer && offer.upsells ? _.pluck(offer.upsells, "id") : [];


		if (offer && offer.offer && offer.offer.plan_packs && offer.offer.plan_packs.length){
			offerObj['checkout[offer_id]'] = offer.offer.id;
			offerObj['checkout[plan_pack_id]'] = offer.id;
		} else if (offer){

			offerObj['checkout[offer_id]'] = offer.id;

			if (upsellIds.length){
				offerObj['checkout[upsell_ids]'] = upsellIds;
			}
		} else {
			offerObj = {};
		}
		
		// get payment methods
		//var paymentMethodObj = DataStore.getObj("checkout[payment_method_id]"),
		var paymentMethod = DataStore.get("paymentMethod"),
			paymentMethodObj = {"checkout[payment_method_id]": (paymentMethod && paymentMethod.id) ?  paymentMethod.id : false},
			//paymentMethodObj = {"checkout[payment_method_id]": paymentMethod.id},
			customerId = Customer.isLoggedIn() ? {} : {customer_id : Customer.getCustomerId()}, // 4.1

		// put it all together
		data = (_.extend({}, shippingObj, giftObj, offerObj, paymentMethodObj, dobObj, customerId));

		return data;
  	};

  }]);
})();