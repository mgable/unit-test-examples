angular.module('AccountApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('address_form.html',
    "<div class=\"address-form\">\n" +
    "	<!-- validation -->\n" +
    "	<input type=\"hidden\" name=\"address[bypass_validation]\"  value=\"{{bypassValidation}}\" />\n" +
    "	<input type=\"hidden\" name=\"address[is_shipping_address]\" value=\"{{isShipping}}\" />\n" +
    "\n" +
    "	<!-- address label -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<label for=\"{{makeId('address_label')}}\">Label</label>\n" +
    "		<input type=\"text\" id=\"address_label\" name=\"address[name]\" ng-model=\"address.name\" autocorrect=\"off\"  placeholder=\"e.g., My House\">\n" +
    "	</div>\n" +
    "	\n" +
    "	<!-- first name -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<span class=\"tag\">* required</span>\n" +
    "		<label for=\"{{makeId('first_name')}}\">First Name</label>\n" +
    "		<input type=\"text\" id=\"{{makeId('first_name')}}\" name=\"address[first_name]\" ng-model=\"address.first_name\" required autocorrect=\"off\" autocomplete=\"given-name\" placeholder=\"e.g., Pat\">\n" +
    "		<div error-message ng-cloak field=\"address[first_name]\" id=\"{{makeId('address.first_name')}}\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- last name -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<span class=\"tag\">* required</span>\n" +
    "		<label for=\"{{makeId('last_name')}}\">Last Name</label>\n" +
    "		<input type=\"text\" id=\"{{makeId('last_name')}}\" name=\"address[last_name]\" ng-model=\"address.last_name\" required autocorrect=\"off\" autocomplete=\"family-name\" placeholder=\"e.g., Smith\">\n" +
    "		<div error-message ng-cloak field=\"address[last_name]\" id=\"{{makeId('address.last_name')}}\"></div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- street 1 -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<span class=\"tag\">* required</span>\n" +
    "		<label for=\"{{makeId('street1')}}\">Street Address Line 1</label>\n" +
    "		<input type=\"text\" id=\"{{makeId('street1')}}\" name=\"address[street1]\" ng-model=\"address.street1\" required autocorrect=\"off\" autocomplete=\"address-line1\" placeholder=\"e.g., 123 Main Street\">\n" +
    "		<div error-message ng-cloak field=\"address[street1]\" id=\"{{makeId('address.street1')}}\"></div>\n" +
    "	</div>\n" +
    "	<suggestion for=\"street1\" value=\"address.street1\"></suggestion>\n" +
    "\n" +
    "	<!-- street 2 -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<span class=\"tag optional\">optional</span>\n" +
    "		<label for=\"{{makeId('street2')}}\">Street Address Line 2</label>\n" +
    "		<input type=\"text\" id=\"{{makeId('street2')}}\" name=\"address[street2]\" ng-model=\"address.street2\"  autocorrect=\"off\" autocomplete=\"address-line2\" placeholder=\"e.g., Apt 123\">\n" +
    "		<div class=\"note\">Apartment, Unit, Suite, Floor, etc.</div>\n" +
    "	</div>\n" +
    "\n" +
    "	<!-- city -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<span class=\"tag\">* required</span>\n" +
    "		<label for=\"{{makeId('city')}}\">City</label>\n" +
    "		<input type=\"text\" id=\"{{makeId('city')}}\" name=\"address[city]\" ng-model=\"address.city\"  required autocorrect=\"off\" autocomplete=\"address-level2\" placeholder=\"e.g., Anytown\">\n" +
    "		<div error-message ng-cloak field=\"address[city]\" id=\"{{makeId('address.city')}}\"></div>\n" +
    "	</div>\n" +
    "	<suggestion for=\"city\" value=\"address.city\"></suggestion>\n" +
    "\n" +
    "	<!-- state -->\n" +
    "	<div class=\"label-input seamless\">\n" +
    "		<span class=\"tag\">* required</span>\n" +
    "		<label for=\"{{makeId('state')}}\">State</label>\n" +
    "		<select  ng-model=\"address.state\" name=\"address[qcommerce_state_id]\" id=\"{{makeId('state')}}\" required autocorrect=\"off\" autocomplete=\"address-level1\">\n" +
    "			<option value=\"\">Select State</option>\n" +
    "			<option ng-disabled=\"isShipping && !state.shipping_allowed\" ng-repeat=\"state in states\" value=\"{{state.id}}\">{{state.name}}</option>\n" +
    "		</select>\n" +
    "		<div error-message ng-cloak field=\"address[qcommerce_state_id]\" id=\"{{makeId('address.state')}}\"></div>\n" +
    "	</div>\n" +
    "	<suggestion for=\"state\" value=\"address.state\"></suggestion>\n" +
    "\n" +
    "	<!-- zip -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<span class=\"tag\">* required</span>\n" +
    "		<label for=\"{{makeId('zip')}}\">Zip</label>\n" +
    "		<input type=\"text\" name=\"address[zip]\" id=\"{{makeId('zip')}}\" ng-model=\"address.zip\" autocorrect=\"off\" required autocomplete=\"postal-code\" placeholder=\"eg., 98765\">\n" +
    "		<div error-message ng-cloak field=\"address[zip]\" id=\"{{makeId('address.zip')}}\"></div>\n" +
    "	</div>\n" +
    "	<suggestion for=\"zip\" value=\"address.zip\"></suggestion>\n" +
    "\n" +
    "	<!-- phone -->\n" +
    "	<div class=\"label-input\">\n" +
    "		<span class=\"tag optional\">optional</span>\n" +
    "		<label for=\"{{makeId('phone')}}\">phone</label>\n" +
    "		<input type=\"text\" name=\"address[phone_number]\" id=\"{{makeId('phone')}}\" ng-model=\"address.phone_number\" autocorrect=\"off\"  autocomplete=\"tel\" placeholder=\"eg., 123-123-1234\">\n" +
    "<!-- 		<div error-message ng-cloak field=\"address[phone_number]\" id=\"address.phone\"></div> -->\n" +
    "	</div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('age_validation_inline.html',
    "<div class=\"age-validation inline\">\n" +
    "	<label for=\"\">Birthday</label>\n" +
    "	<input type=\"text\" name =\"customer[dob]\" ng-model=\"birthday.dob\" style=\"position:absolute;left:-100000px;\"/>\n" +
    "	<div class=\"error\" ng-show=\"!ofAge\" ng-style='!ofAge && {\"display\": \"inline-block\"}'>You must be 21 years or older to order.</div>\n" +
    "	<div class=\"row bottom-margin \">\n" +
    "		<div class=\"large-4 column\">\n" +
    "			<select class=\"form-control\" name=\"birthday.month\" id=\"birthday.month\" ng-model=\"month\" ng-required=\"true\" placeholder=\"month\">\n" +
    "		        <option value=\"\">Month</option>\n" +
    "				<option value=\"01\">January</option>\n" +
    "				<option value=\"02\">February</option>\n" +
    "				<option value=\"03\">March</option>\n" +
    "				<option value=\"04\">April</option>\n" +
    "				<option value=\"05\">May</option>\n" +
    "				<option value=\"06\">June</option>\n" +
    "				<option value=\"07\">July</option>\n" +
    "				<option value=\"08\">August</option>\n" +
    "				<option value=\"09\">September</option>\n" +
    "				<option value=\"10\">October</option>\n" +
    "				<option value=\"11\">November</option>\n" +
    "				<option value=\"12\">December</option>\n" +
    "			</select>\n" +
    "			<div error-message ng-cloak field=\"birthday.month\" id=\"customer[birthday.month]\"></div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"large-4 column\">\n" +
    "			<input type=\"text\" ng-model=\"day\" required name=\"birthday.day\" placeholder=\"day\" ng-pattern=\"'(^0[1-9]$)|(^[1-2][0-9]$)|(^3[01]$)|(^[1-9]{1}$)'\" id=\"birthday.day\"  ng-maxlength=\"2\"/>\n" +
    "			<div error-message ng-cloak field=\"birthday.day\" id=\"customer[birthday.day]\"></div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"large-4 column\">\n" +
    "			<input type=\"text\" ng-model=\"year\" required name=\"birthday.year\" placeholder=\"year\" ng-pattern=\"'(^19\\\\d{2}$)|(^20\\\\d{2}$)'\" ng-maxlength=\"4\" ng-minlength=\"4\" id=\"birthday.year\" />\n" +
    "			<div error-message ng-cloak field=\"birthday.year\" id=\"customer[birthday.year]\"></div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('age_validation.html',
    "<div class=\"age-validation\">\n" +
    "	<form name=\"ageValidation\" novalidate>\n" +
    "		<input type=\"text\" name =\"customer[dob]\" ng-model=\"birthday.dob\" style=\"position:absolute;left:-100000px;\"/>\n" +
    "		<div class=\"module-panel small\">\n" +
    "			<span>Age Validation</span>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"module-body\">\n" +
    "			<span class=\"tag\">* required</span><p> Please Verify Your Birthday</p>\n" +
    "			<div class=\"error\" ng-show=\"!ofAge\" ng-style='!ofAge && {\"display\": \"inline-block\"}'>You must be 21 years or older to order.</div>\n" +
    "			<div class=\"row bottom-margin\">\n" +
    "				<div class=\"large-4 columns\">\n" +
    "					<select class=\"form-control\" name=\"birthday.month\" id=\"birthday.month\" ng-model=\"month\" ng-required=\"true\">\n" +
    "					        <option value=\"\">Month</option>\n" +
    "							<option value=\"01\">January</option>\n" +
    "							<option value=\"02\">February</option>\n" +
    "							<option value=\"03\">March</option>\n" +
    "							<option value=\"04\">April</option>\n" +
    "							<option value=\"05\">May</option>\n" +
    "							<option value=\"06\">June</option>\n" +
    "							<option value=\"07\">July</option>\n" +
    "							<option value=\"08\">August</option>\n" +
    "							<option value=\"09\">September</option>\n" +
    "							<option value=\"10\">October</option>\n" +
    "							<option value=\"11\">November</option>\n" +
    "							<option value=\"12\">December</option>\n" +
    "					</select>\n" +
    "					<div error-message ng-cloak field=\"birthday.month\" id=\"birthday.month\"></div>\n" +
    "				</div>\n" +
    "				<div class=\"large-4 columns\">\n" +
    "					<input type=\"text\" ng-model=\"day\" name=\"birthday.day\" class=\"form-control\" placeholder=\"Day\" ng-pattern=\"'(^0[1-9]$)|(^[1-2][0-9]$)|(^3[01]$)|(^[1-9]{1}$)'\" ng-maxlength=\"2\" ng-minlength=\"1\" ng-required=\"true\"/>\n" +
    "					<div error-message ng-cloak field=\"birthday.day\" id=\"birthday.day\"></div>\n" +
    "				</div>\n" +
    "				<div class=\"large-4 columns\">\n" +
    "					<input type=\"text\" ng-model=\"year\" name=\"birthday.year\" class=\"form-control\" placeholder=\"Year\" ng-pattern=\"'(^19\\\\d{2}$)|(^20\\\\d{2}$)'\" ng-maxlength=\"4\" ng-minlength=\"4\" ng-required=\"true\"/>\n" +
    "					<div error-message ng-cloak field=\"birthday.year\" id=\"birthday.year\"></div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>"
  );


  $templateCache.put('badges.html',
    "<div class=\"trust-seals row badges\">\n" +
    "  <div class=\"small-12 medium-6 columns\">\n" +
    "  <!-- McAfee SECURE Engagement Trustmark -->\n" +
    "  <% if @store.url.present? %>\n" +
    "    <a target=\"_blank\" href=\"https://www.mcafeesecure.com/verify?host=<%= URI.parse(@store.url).host rescue '' %>\" style=\"display: block;\"><img class=\"mfes-trustmark\" border=\"0\" src=\"//cdn.ywxi.net/meter/<%= URI.parse(@store.url).host rescue ''  %>/102.gif?w=90\" width=\"90\" height=\"37\" title=\"McAfee SECURE sites help keep you safe from identity theft, credit card fraud, spyware, spam, viruses and online scams\" alt=\"McAfee SECURE sites help keep you safe from identity theft, credit card fraud, spyware, spam, viruses and online scams\" oncontextmenu=\"window.open('https://www.mcafeesecure.com/verify?host=<%= URI.parse(@store.url).host rescue '' %>'); return false;\" style=\"display: block; width: auto; margin: auto;\"></a>\n" +
    "  <% end %>\n" +
    "  <!-- End McAfee SECURE Engagement Trustmark -->\n" +
    "  </div>\n" +
    "  <div class=\"small-12 medium-6 columns\">\n" +
    "    <!-- BBB -->\n" +
    "    <iframe src=\"https://seal-sanjose.bbb.org/logo/ruhzbus/iframe/drinks-359422.html\" width=\"100\" height=\"45\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\"></iframe>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('billing_information.html',
    "<div class=\"billing-information-module\">\n" +
    "	<div class=\"module-panel small\">\n" +
    "		Billing Information\n" +
    "	</div>\n" +
    "	<div class=\"module-body\">\n" +
    "		<form name=\"paymentMethods\" id=\"payment-methods-form\">\n" +
    "			<div ng-if=\"existingUser\">\n" +
    "\n" +
    "			<!-- Payment method picker -->\n" +
    "				<div ng-show=\"isState({'view':'loggedIn'})\">\n" +
    "					<p class=\"select-payment-method\">Select Payment Method</p>\n" +
    "					<select name=\"checkout[payment_method_id]\" ng-options=\"method as method.label for method in methods\" ng-model=\"selected.method\" ng-change=\"selectPaymentMethod(selected.method)\" >\n" +
    "						<option value=\"\">Add Payment Method</option>\n" +
    "					</select>\n" +
    "				</div>\n" +
    "				<!-- Billing address picker -->\n" +
    "				<div ng-if=\"isView({'view':'loggedIn'}) || isView({'view':'addPayment'}) || isView({'view':'addAddress'})\">\n" +
    "					<p class=\"select-billing-address\">Select Billing Address</p>\n" +
    "					<address-picker form=\"#billingAddress\" type=\"billing\" addresses=\"addresses\" model=\"billingAddress\" init-value=\"initValue\"></address-picker>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "\n" +
    "		<!-- billing address fields -->\n" +
    "		<div ng-if=\"( !isView({'view':'readyToSubmit'}) && !isView({'view':'submitted'})  ) && isState({'view':existingUser ? 'addAddress' : 'noData'})\">\n" +
    "			<div class=\"error form_error\" ng-cloak response-errors id=\"billingAddress-error\"></div>\n" +
    "			<form name=\"billingAddress\" id=\"billingAddress\"><address-form type=\"billing\" form=\"#billingAddress\" is-shipping=\"false\" model=\"address.billing\"></address-form></form>\n" +
    "		</div>\n" +
    "\n" +
    "		<!-- BrainTree Credit Card Fields -->\n" +
    "		<div ng-show=\"isView({'view':'noData'}) || isView({'view': 'addPayment'}) || isView({'view': 'loggedIn'}) || ( isView({'view':'hasData'}) && !userLoggedIn ) || isView({'view': 'addAddress'}) \">\n" +
    "			<form name=\"braintree\" id=\"braintree\">\n" +
    "				<div id=\"braintree-fields\" class=\"row\">\n" +
    "					<div class=\"error form_error\" ng-cloak response-errors id=\"braintree-error\"></div>\n" +
    "					<div class=\"small-12 columns\">\n" +
    "						<h5><i class=\"fa fa-lock\"></i> Your credit card information is always encrypted and secured.</h5>\n" +
    "					</div>\n" +
    "					<div id=\"cc-icons\" class=\"small-12 columns cc-icons\">\n" +
    "						<img src=\"<%= asset_path('qcommerce/storefront/cc-amex.svg') %>\" alt=\"\">\n" +
    "						<img src=\"<%= asset_path('qcommerce/storefront/cc-discover.svg') %>\" alt=\"\">\n" +
    "						<img src=\"<%= asset_path('qcommerce/storefront/cc-mastercard.svg') %>\" alt=\"\">\n" +
    "						<img src=\"<%= asset_path('qcommerce/storefront/cc-visa.svg') %>\" alt=\"\">\n" +
    "					</div>\n" +
    "\n" +
    "					<div ng-if=\"ccInfo.number\" class=\"label-input small-12 columns\">\n" +
    "						<label for=\"card-number\">Credit Card Number</label>\n" +
    "						<div id=\"card-number\" name=\"card-number\"></div>\n" +
    "					</div>\n" +
    "					\n" +
    "					<div ng-if=\"ccInfo.expirationDate\" class=\"label-input small-12 columns\">\n" +
    "						<label for=\"expiration-date\">Exp. Date</label>\n" +
    "						<div id=\"expiration-date\" name=\"expiration-date\"></div>\n" +
    "					</div>\n" +
    "\n" +
    "					<div ng-if=\"ccInfo.cvv\" class=\"label-input small-12 columns\">\n" +
    "						<label for=\"cvv\">CVV</label>\n" +
    "						<div id=\"cvv\" name=\"cvv\"></div>\n" +
    "					</div>\n" +
    "				\n" +
    "\n" +
    "				</div>\n" +
    "\n" +
    "				<input id=\"payment-method-submit\" name=\"submit\" style=\"display: none;\" type=\"submit\" value=\"Submit\" />\n" +
    "			</form>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('checkout_module.html',
    " <div id=\"landing-page-checkout-form\" class=\"checkout\">\n" +
    " 	<div class=\"error form_error\" ng-cloak response-errors id=\"page-error\"></div>\n" +
    "\n" +
    " 	<stats ng-if=\"showStats\"></stats><button class=\"tiny stats-button\" ng-click=\"toggleStats()\"></button>\n" +
    "\n" +
    " 	<p class=\"welcome\"><span class=\"left\">Welcome, {{customer_name || 'Wine Connoisseur'}}:</span>\n" +
    " 		<span ng-if=\"isView('logIn')\" class=\"right\">Please log in.</span>\n" +
    " 		<span ng-if=\"(!isView('noData') && userLoggedIn && !isView('logIn')) && customer_name\" class=\"right\">Not you? <a ng-click=\"logOut()\">log out</a></span>\n" +
    " 		<span ng-if=\"(existingUser && !userLoggedIn) && !isView('logIn') && customer_name\" class=\"right\"> <a ng-click=\"logOut()\">Not you?</a></span>\n" +
    " 	</p>\n" +
    " 	<div class=\"checkout-form clear\">\n" +
    "		<ng-form name=\"checkout\">\n" +
    "			<!-- select product -->\n" +
    "			<select-configuration-module></select-configuration-module>\n" +
    "\n" +
    "			<div ng-if=\"isView('logIn')\">\n" +
    "				<sign-in-or-register></sign-in-or-register>\n" +
    "			</div>\n" +
    "\n" +
    "			<!-- signIn or register -->\n" +
    "			<div ng-if=\"isState('noData') && !isView('logIn')\">\n" +
    "				<div ng-if=\"!existingUser\">\n" +
    "					<h1>Ordered from us before? <h6><a ng-click=\"goToLogin()\" id=\"switchToLoginView\" class=\"smaller\">Click here to access your account information</a></h6></h1>\n" +
    "					<p class=\"continue\">Or continue to checkout by filling out the form below:</p>\n" +
    "\n" +
    "				\n" +
    "					<personal-information></personal-information>\n" +
    "				</div>\n" +
    "\n" +
    "				<billing-information addresses=\"addresses\" payment-method=\"paymentMethod\" methods=\"methods\" is-state=\"isState(view)\" is-view=\"isView(view)\" existing-user=\"existingUser\"  user-logged-in=\"userLoggedIn\"></billing-information>\n" +
    "\n" +
    "				<shipping-information addresses=\"addresses\"></shipping-information>\n" +
    "\n" +
    "				<div ng-if=\"!existingUser\">\n" +
    "					<!-- <simple-template name=\"create_account.html\"></simple-template> -->\n" +
    "						<create-account></create-account>\n" +
    "				</div>\n" +
    "\n" +
    "				<div ng-if=\"existingUser && !birthday\">\n" +
    "					<age-validation year=\"customer.birthday.year\" month=\"customer.birthday.month\" day=\"customer.birthday.day\" ></age-validation>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<!-- need to keep info through the login process -->\n" +
    "			<div ng-show=\"isState('noData') && !isView('logIn')\">\n" +
    "				<invoice></invoice>\n" +
    "			</div>\n" +
    "\n" +
    "			<div ng-if=\"isState('noData') && !isView('logIn')\">\n" +
    "				<simple-template name=\"terms_and_conditions.html\"></simple-template>\n" +
    "\n" +
    "				<submit-button action=\"action\"></submit-button>\n" +
    "\n" +
    "			</div>\n" +
    "\n" +
    "			<simple-template name=\"badges.html\"></simple-template>\n" +
    "		</ng-form>\n" +
    "	</div>\n" +
    "</div>\n"
  );


  $templateCache.put('create_account.html',
    "<div class=\"create-account\">\n" +
    "	<div class=\"module-panel small\">\n" +
    "		Create Account\n" +
    "	</div>\n" +
    "	<div class=\"module-body\">\n" +
    "\n" +
    "	<form name=\"createAccount\" id=\"createAccount\" novalidate\">\n" +
    "		<!-- forgot password -->\n" +
    "		<input type=\"hidden\" name=\"customer[auto_sign_in]\" value=\"true\" />\n" +
    "		<div class=\"create\">\n" +
    "			<div class=\"row bottom-margin\">\n" +
    "\n" +
    "				<div class=\"error form_error\" ng-cloak response-errors id=\"createAccountResponseErrors\"></div>\n" +
    "\n" +
    "				<age-validation year=\"customer.birthday.year\" month=\"customer.birthday.month\" day=\"customer.birthday.day\" url=\"age_validation_inline.html\"></age-validation>\n" +
    "\n" +
    "				<label for=\"customer_password\">Password</label>\n" +
    "				<input type=\"password\" id=\"customer_password\" name=\"customer[password]\" ng-model=\"customer.password\" required placeholder=\"e.g., MyPassword123\" ng-minLength=\"8\"/>\n" +
    "				<div error-message ng-cloak field=\"customer[password]\" id=\"customer[password]\"></div>\n" +
    "\n" +
    "				<label for=\"customer_password_confirmation\">Confirm Password</label>\n" +
    "				<input pw-check=\"customer_password\" type=\"password\" id=\"customer_password_confirmation\" name=\"customer[password_confirmation]\" ng-model=\"customer.password_confirmation\" required placeholder=\"e.g., MyPassword123\" ng-minLength=\"8\"/>\n" +
    "				<div error-message ng-cloak field=\"customer[password_confirmation]\" id=\"customer_password_confirmation_error\"></div>\n" +
    "\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>"
  );


  $templateCache.put('invoice.html',
    "<div class=\"invoice\">\n" +
    "	<div class=\"row bottom-margin\">\n" +
    "		<div class=\"large-12 columns\">\n" +
    "			<table class=\"table costs\">\n" +
    "				<!-- style=\"width:100%\" -->\n" +
    "				<tr>\n" +
    "					<td style=\"width:75%\" class=\"invoice-category\">Subtotal</td>\n" +
    "					<td>{{subtotal() || 0 | currency}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td class=\"invoice-category\">Shipping</td>\n" +
    "					<td>{{shipping() || 0 | currency}}</td>\n" +
    "				</tr>\n" +
    "				<tr ng-show=\"displayExciseTax(excise_tax())\">\n" +
    "					<td class=\"invoice-category\" ><span data-tooltip aria-haspopup=\"true\" class=\"has-tip\" title=\"What is PA Excise Tax? For wine that is direct-shipped to consumers in Pennsylvania, all orders include a $0.50 per bottle excise tax paid to the Pennsylvania Department of Revenue.\">Excise Tax</span></td>\n" +
    "					<td>{{excise_tax() || 0 | currency}}</td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td class=\"invoice-category\">Sales Tax</td>\n" +
    "					<td>{{sales_tax() || 0 | currency}}  </td>\n" +
    "				</tr>\n" +
    "				<tr>\n" +
    "					<td class=\"invoice-category invoice-category-total\">Total</td>\n" +
    "					<td class=\"invoice-category-total\">{{subtotal() + shipping() + tax() || 0 | currency}}</td>\n" +
    "				</tr>\n" +
    "			</table>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n"
  );


  $templateCache.put('personal_information.html',
    "<div class=\"personal-information\">\n" +
    "	<div class=\"module-panel small\">\n" +
    "		Personal Information\n" +
    "	</div>\n" +
    "	<div class=\"module-body\">\n" +
    "\n" +
    "	<form name=\"personalInformation\" id=\"personalInformation\" novalidate action=\"/api/customers\">\n" +
    "		<!-- forgot password -->\n" +
    "		<input type=\"hidden\" name=\"customer[auto_sign_in]\" value=\"true\" />\n" +
    "		<div class=\"create\">\n" +
    "			<div class=\"row bottom-margin\">\n" +
    "\n" +
    "				<div class=\"error form_error\" ng-cloak response-errors id=\"personalInformationResponseErrors\"></div>\n" +
    "\n" +
    "				<label for=\"customer_email\">Email</label>\n" +
    "				<input type=\"email\" id=\"customer_email\" name=\"customer[email]\" ng-model=\"customer.email\" required placeholder=\"e.g. pat.smith@someplace.com\" ng-blur=\"checkUser(customer.email)\"/>\n" +
    "				<div error-message ng-cloak field=\"customer[email]\" id=\"customer[email]\"></div>\n" +
    "				\n" +
    "				<label for=\"customer_first_name\">First Name</label>\n" +
    "				<input type=\"text\" id=\"customer_first_name\" name=\"customer[first_name]\" ng-model=\"customer.first_name\" required placeholder=\"e.g., Pat\"/>\n" +
    "				<div error-message ng-cloak field=\"customer[first_name]\" id=\"customer[first_name]\"></div>\n" +
    "\n" +
    "				<label for=\"customer_last_name\">Last Name</label>\n" +
    "				<input type=\"text\" id=\"customer_last_name\" name=\"customer[last_name]\" ng-model=\"customer.last_name\" required placeholder=\"e.g., Smith\"/>\n" +
    "				<div error-message ng-cloak field=\"customer[last_name]\" id=\"customer[last_name]\"></div>\n" +
    "\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "\n" +
    "	<div id=\"hasAccountModal\" class=\"reveal-modal small\" data-reveal aria-labelledby=\"firstModalTitle\" aria-hidden=\"true\" role=\"dialog\">\n" +
    "		<h2 style=\"line-height: 34px;margin:0 0 10px 0;\">You already have an account with us.</h2>\n" +
    "		<p>Would you like to sign in to your account?</p>\n" +
    "		<p> <button class=\"button left small\" ng-click=\"close()\">Yes! Sign Me In</button> <button class=\"button right small\" ng-click=\"dismiss()\">No. Create a New Account</button></p>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('select_configuration.html',
    "<div class=\"select-configuration\">\n" +
    "	<form name=\"selectConfiguration\">\n" +
    "		<div class=\"module-panel small\">Choose Your Wines</div>\n" +
    "		<div class=\"offers\">\n" +
    "			<!-- offers -->\n" +
    "			<div ng-if=\"!plan_packs\">\n" +
    "				<div error-message ng-cloak field=\"offer\" id=\"offer\"></div>\n" +
    "				<div class=\"offer-item\" ng-repeat=\"offer in offers\">\n" +
    "					<input type=\"radio\" name=\"offer\" id=\"offer_{{offer.id}}\" ng-click=\"showUpsell(offer.upsell_ids); selected.offer = offer;clearTax()\" ng-value=\"offer\" ng-model=\"selected.offer\" ng-required=\"offer.id === selected.offer.id || !selected.offer\" ng-disabled=\"!offer.is_available\" track=\"Selected Offer\" trackingdata='{\"id\": \"{{offer.id}}\", \"price\": \"{{offer.total_item_cost}}\", \"shipping\": \"{{offer.shipping_cost}}\"}'>\n" +
    "					<label id=\"offer_{{offer.id}}\" ng-class=\"{'disabled': !offer.is_available}\" for=\"offer_{{offer.id}}\" class=\"offer-name\"><span class=\"offer-cost\">{{offer.total_item_cost | currency : \"$\" }}</span> - {{offer.name}}&nbsp;{{offer.is_available ? \"\" : \" is SOLD OUT\"}} + {{offer.shipping_cost | currency : \"$\"}} Shipping</label>\n" +
    "				</div>\n" +
    "			\n" +
    "				<div class=\"upsells\">\n" +
    "					<div id=\"upsell-item-{{upsell.id}}\" class=\"upsell-item hide\" ng-repeat=\"upsell in upsells\">\n" +
    "						<input type=\"checkbox\" id=\"upsells_#{{upsell.id}}\" name=\"upsells_{{$index}}\" ng-model=\"upsell.checked\" ng-click=\"addUpsells(upsell.checked, upsell.id);clearTax()\" ng-true-value=\"{{upsell.id}}\" track=\"Selected Offer\" trackingdata='{\"id\": \"{{upsell.id}}\", \"price\": \"{{upsell.price}}\", \"shipping\": \"{{upsell.shipping}}\"}'/>\n" +
    "						<label for=\"upsells_#{{upsell.id}}\" id=\"upsells_#{{upsell.id}}\" class=\"upsell-name\"><span ng-class=\"{'replacement-upsell': upsell.is_replacement}\">&nbsp;{{upsell.price | currency : \"$\"}}&nbsp;-&nbsp;<strong>{{upsell.name}}</strong>&nbsp;{{upsell.description}} + {{upsell.shipping | currency : \"$\"}}&nbsp;Shipping</span></label>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<!--  plan packs -->\n" +
    "			<div ng-if=\"plan_packs\">\n" +
    "				<div error-message ng-cloak field=\"pack\" id=\"pack\"></div>\n" +
    "				<div class=\"offer-item\" ng-repeat=\"pack in plan_packs\">\n" +
    "				\n" +
    "					<input type=\"radio\" name=\"pack\" id=\"pack_{{pack.id}}\" ng-click=\"selected.offer = pack;clearTax();clearUpsells()\" ng-value=\"pack\" ng-model=\"selected.offer\" ng-required=\"pack.id === selected.offer.id || !selected.offer\"  track=\"Selected Offer\" trackingdata='{\"id\": \"{{pack.id}}\", \"price\": \"{{pack.total_item_cost}}\", \"shipping\": \"{{pack.shipping_cost}}\"}'>\n" +
    "\n" +
    "					<label for=\"pack_{{pack.id}}\" class=\"offer-name\"><span class=\"offer-cost\">{{pack.total_item_cost | currency : \"$\" }}</span> - <span class=\"offer-link\" ng-click=\"show(pack)\">{{pack.offer_name}}</span>&nbsp;+&nbsp;{{pack.shipping_cost | currency : \"$\"}} Shipping</label>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "\n" +
    "	<div id=\"plan_packs\" class=\"reveal-modal small\" data-reveal aria-labelledby=\"firstModalTitle\" aria-hidden=\"true\" role=\"dialog\">\n" +
    "		<div ng-repeat=\"product in products\" ng-cloak>\n" +
    "			<div class=\"row template-2-pack-item\">\n" +
    "				<div class=\"small-12 medium-3 columns product-image\">\n" +
    "					<img ng-src=\"{{product.image}}\" width=\"25\" />&nbsp;\n" +
    "				</div>\n" +
    "				<div class=\"small-12 medium-9 columns\">\n" +
    "					<p><strong>{{product.quantity}} of {{product.name}}</strong></p>\n" +
    "					<p ng-bind-html=\"product.description | unsafe\"></p>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "    <a class=\"close-reveal-modal\" aria-label=\"Close\">&#215;</a>\n" +
    "	</div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('shipping_information.html',
    "<div class=\"shipping-information-module\">\n" +
    "	<form name=\"shippingInformation\" id=\"shippingAddress\">\n" +
    "\n" +
    "		<div class=\"module-panel small\">\n" +
    "			<div>Shipping Information</div>\n" +
    "			<div class=\"ship_to\" ng-show=\"displayShippingAddress()\">Your wine will be shipped to: <br /><span class=\"address\" ng-bind=\"displayShippingAddress()\"></span></div>\n" +
    "			<div class=\"clearfix\">\n" +
    "				<label for=\"showShipping\" class=\"left shipping\">\n" +
    "					<input type=\"checkbox\" ng-click=\"checkShipping(sameAsBilling)\" ng-model=\"sameAsBilling\" id=\"showShipping\" name=\"checkout[same_as_billing]\"  ng-true-value=\"true\" ng-false-value=\"false\" />&nbsp;\n" +
    "					Same as Billing\n" +
    "				</label>\n" +
    "\n" +
    "				<label for=\"showGift\" class=\"left\">\n" +
    "					<input type=\"checkbox\" ng-model=\"gift.show\" id=\"showGift\" name=\"checkout[is_gift]\" ng-true-value=\"true\" ng-false-value=\"false\" ng-init=\"gift.show = false\"/>&nbsp;\n" +
    "					This is a gift\n" +
    "				</label>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"shipping-data\" ng-if=\"sameAsBilling === false || gift.show === true\">\n" +
    "			<div ng-if=\"gift.show === true\">\n" +
    "				<label for=\"giftMessage\">Gift Message\n" +
    "					<textarea name=\"checkout[gift_message]\" ng-model=\"gift.message\" id=\"giftMessage\"></textarea>\n" +
    "				</label>\n" +
    "			</div>\n" +
    "			<div ng-if=\"sameAsBilling === false\">\n" +
    "				<div class=\"error form_error\" ng-cloak response-errors id=\"shippingAddress-error\"></div>\n" +
    "				<p class=\"select-shipping-address\">Select Shipping Address</p>\n" +
    "\n" +
    "				<div ng-show=\"addresses.length\">\n" +
    "					<address-picker form=\"#shippingAddress\" type=\"shipping\" addresses=\"addresses\" model=\"shippingAddress\" init-value=\"initValue\"></address-picker>\n" +
    "				</div>\n" +
    "				<div ng-if=\"!addresses.length || showShippingAddresses\">\n" +
    "					<address-form form=\"#shippingAddress\" type=\"shipping\" is-shipping=\"true\" model=\"address.shipping\"></address-form>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>"
  );


  $templateCache.put('sign_in_or_register.html',
    "<div class=\"sign-in-or-register\">\n" +
    "	<div data-alert class=\"alert-box warning\" ng-show=\"message\">\n" +
    "		<i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i>\n" +
    "		{{message}}\n" +
    "	</div>\n" +
    "	<div>\n" +
    "		<!-- sign in form -->\n" +
    "		<form name=\"signIn\" id=\"signIn\" novalidate action=\"/login\" ng-show=\"active ==='signin' || !active\">\n" +
    "			<input type=\"hidden\" name=\"session[disable_redirect]\" value=\"true\" />\n" +
    "			<div class=\"signin-create\">\n" +
    "			 	<div class=\"row\" ng-show=\"title\"> \n" +
    "			 		<div class=\"small-12 columns\"><span>{{title}}</span></div>\n" +
    "			 	</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"small-12 columns\">\n" +
    "						<div class=\"error form_error\" ng-cloak response-errors id=\"login-error\"></div>\n" +
    "						<span class=\"title\">Sign In</span>\n" +
    "						<label for=\"signin\">email</label>\n" +
    "						<input class=\"email\" type=\"email\" id=\"email\" name=\"session[email]\" ng-model=\"email\" required/>\n" +
    "						<div error-message ng-cloak field=\"session[email]\" id=\"session[email]\"></div>\n" +
    "\n" +
    "						<label for=\"password\">password</label>\n" +
    "						<input type=\"password\" id=\"password\" name=\"session[password]\" ng-model=\"password\" required/>\n" +
    "						<div error-message ng-cloak field=\"session[password]\" id=\"session[password]\"></div>\n" +
    "						<a class=\"forgot-password\" ng-click=\"active='forgot'; clearResponse()\">Forgot password?</a>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"small-12 columns\">\n" +
    "						<div class=\"\" ><button class=\"button radius small sign-in\" ng-click=\"signIn($event)\">Sign In</button></div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"row\">\n" +
    "			 		<div class=\"small-12 columns\"><span>Or create an account.</span></div>\n" +
    "			 	</div>\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"small-12 columns\">\n" +
    "						<div class=\"\" ><button class=\"button radius small\" ng-click=\"goToCreateAccount()\">Create Account</button></div>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "\n" +
    "		<!-- forgot password form -->\n" +
    "		<form name=\"forgotPassword\" id=\"forgotPassword\" novalidate action=\"/request_password_reset\" ng-show=\"active ==='forgot'\">\n" +
    "			<input type=\"hidden\" name=\"password_reset[auto_sign_in]\"  value=\"1\" />\n" +
    "			<input type=\"hidden\" name=\"password_reset[redirect_path]\"  value=\"{{path}}\" />\n" +
    "			<div class=\"forgot\">\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"small-12 columns\">\n" +
    "						<div class=\"error form_error\" ng-cloak response-errors id=\"resetpassword-error\"></div>\n" +
    "						<span class=\"title\">Forgot Password</span>\n" +
    "						<div error-message ng-cloak field=\"email\" id=\"email-error\"></div>\n" +
    "						<label for=\"email\">email</label>\n" +
    "						<input class=\"email\" type=\"email\" id=\"forgot-password\" name=\"email\" ng-model=\"email\" required/>\n" +
    "						<input type=\"submit\" class=\"button tiny radius submit\" id=\"forgot-password-submit\" ng-click=\"forgotPassword($event)\" value=\"Submit\" />\n" +
    "					</div>\n" +
    "				</div>\n" +
    "\n" +
    "				<div class=\"row\">\n" +
    "					<div class=\"small-12 columns\">\n" +
    "						<span>Remember your password? <a class=\"remember-password\" ng-click=\"active='signin'\">Sign in</a></span>\n" +
    "					</div>\n" +
    "				</div>\n" +
    "			</div>\n" +
    "		</form>\n" +
    "\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('stats.html',
    "<style>\n" +
    "\n" +
    ".stats {\n" +
    "	word-break:break-all;\n" +
    "	padding: 5px;\n" +
    "	position:fixed;\n" +
    "	width:300px;height:600px;\n" +
    "	overflow:scroll;\n" +
    "	background-color:lightgray;\n" +
    "	left: 0px;\n" +
    "	top: 300px;\n" +
    "}\n" +
    "\n" +
    ".stats .my-label {\n" +
    "	padding-left: 10px;\n" +
    "	font-size:12px;\n" +
    "	font-face:courier;\n" +
    "}\n" +
    "\n" +
    ".stats ul, .stats textarea {\n" +
    "	font-size:10px;\n" +
    "	line-height:12px;\n" +
    "	font-face:courier;\n" +
    "	padding-left:10px;\n" +
    "	margin:5px;\n" +
    "}\n" +
    "\n" +
    ".stats textarea {\n" +
    "	width:280px;\n" +
    "}\n" +
    "\n" +
    ".stats ul li {\n" +
    "	margin-bottom: 5px !important;\n" +
    "}\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div class=\"stats\">\n" +
    "	<ul>\n" +
    "		<li><b>View:</b> {{view}}</li>\n" +
    "		<li><b>State:</b> {{StateMachine.getCondition()}}</li>\n" +
    "		<li><b>Customer ID</b> {{customer.id || \"--\"}}</li>\n" +
    "		<li><b>Signed In</b> {{customer.signed_in || \"false\"}}</li>\n" +
    "		<li><b>Existing User:</b> {{existingUser}}</li>\n" +
    "		<li><b>Billing Address:</b> {{ba || \"--\"}}</li>\n" +
    "		<li><b>Shipping Address</b>{{shippingInformation || \"--\"}}</li>\n" +
    "		<li><b>Payment Method:</b> {{paymentMethod|| \"--\"}} </li>\n" +
    "		<li><b>Gift</b> {{gift}}</li>\n" +
    "		<li><b>Checkout:</b>{{xcheckout || \"--\"}}</li>\n" +
    "	</ul>\n" +
    "	<div class=\"my-label\">Customer Obj</div>\n" +
    "	<textarea rows=\"10\">{{customer | json}}</textarea>\n" +
    "	<div class=\"my-label\">Offer</div>\n" +
    "	<textarea rows=\"10\">{{offer | json}}</textarea>\n" +
    "</div>"
  );


  $templateCache.put('submit_button.html',
    "<div class=\"submit-button\" ng-class=\"{'place-order': klass}\">\n" +
    "	<button ng-disabled=\"isDisabled()\" type=\"button\" class=\"button-submit\" id=\"checkout-button\" autocomplete=\"off\" ng-click=\"submit()\"><img class=\"spinner\" src=\"<%= asset_path('qcommerce/storefront/ajax-loader-orange.gif') %>\" width=\"32\" height=\"32\" ng-show=\"wait\">{{label}}</button>\n" +
    "	<div class=\"display-text\">{{displayText}}</div>\n" +
    "</div>"
  );


  $templateCache.put('terms_and_conditions.html',
    "<div class=\"terms-and-conditions\">\n" +
    "	\n" +
    "	<div class=\"clearfix\">\n" +
    "		<form name=\"termsAndConditions\" novalidate>\n" +
    "			\n" +
    "			<label class=\"left agree\">\n" +
    "				By clicking 'Order' below, I agree with the <span id=\"terms-cta\" ng-click=\"showTerms = !showTerms\" style=\"text-decoration: underline\">Terms and Conditions</span>\n" +
    "			</label>\n" +
    "<!-- 			<div error-message ng-cloak field=\"terms-and-condtions\" id=\"terms-and-condtions\"></div> -->\n" +
    "		</form>\n" +
    "	</div>\n" +
    "	\n" +
    "	<div class=\"information-holder\" ng-if=\"showTerms\">\n" +
    "		<p><small>I confirm that I am at least 21 years of age and understand that as an adult, I must be available to sign for this shipment. I further confirm that I have read and understand the terms of service. And, I understand that sales tax varies by state, so taxes will be calculated at checkout.</small></p>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('addresses.html',
    "<div class=\"row\">\n" +
    "	\n" +
    "	<div class=\"small-12 columns\">\n" +
    "\n" +
    "		<h4>Address Book</h4>\n" +
    "\n" +
    "		<div class=\"addresses\" ng-show=\"!address\">\n" +
    "			<ul ng-repeat='address in addresses' class=\"address\" id=\"{{address.id}}\">\n" +
    "				<li><span class=\"address-label\">{{address.name}}</span><span class=\"right address-edit\">\n" +
    "\n" +
    "				<span ng-hide=\"address.can_disable === undefined || !address.can_disable\"><a ng-click=\"edit(address)\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a></span>\n" +
    "					\n" +
    "				<span ng-hide=\"address.can_disable\"><i class=\"fa fa-pencil pencil-disabled\" aria-hidden=\"true\" ></i></span>\n" +
    "\n" +
    "				<span ng-hide=\"address.can_disable === undefined || !address.can_disable\"><a ng-confirm-click confirmed-click=\"delete(address)\" ><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></a></span>\n" +
    "\n" +
    "				<span ng-hide=\"address.can_disable\"><i class=\"fa fa-trash-o trash-disabled\" aria-hidden=\"true\" ></i></span></li></span>\n" +
    "\n" +
    "				<li>{{address.first_name}}&nbsp;{{address.last_name}}</li>\n" +
    "				<li>{{address.street1}}</li>\n" +
    "				<li>{{address.street2}}</li>\n" +
    "				<li>{{address.city}}, {{address.state.name}} {{address.zip}}</li>\n" +
    "				<li>{{address.phone_number}}</li>\n" +
    "			</ul>\n" +
    "\n" +
    "\n" +
    "			<button ng-click=\"addAddress($event)\" class=\"button cta gray\">Add New Address</button>\n" +
    "		</div>\n" +
    "\n" +
    "		<form name=\"editAddress\" id=\"editAddress\" ng-show=\"address\" novalidate>\n" +
    "			<div class=\"error form_error\" ng-cloak response-errors id=\"page-error\"></div>\n" +
    "			<div class=\"error form_error\" ng-cloak response-errors id=\"editAddress-error\"></div>\n" +
    "			<address-form type=\"editing\" form=\"#editAddress\" is-shipping=\"false\" model=\"address\"></address-form>\n" +
    "			<button ng-click=\"action(address, $event)\" class=\"button cta gray\">Save</button>&nbsp;<button ng-click=\"cancel(address, $event)\" class=\"button cta gray\">Cancel</button>\n" +
    "		</form>\n" +
    "	</div>\n" +
    "</div>"
  );


  $templateCache.put('delete_address_confirm_modal.html',
    "<div class=\"icon-header\" aria-hidden=\"true\"></div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <h3 class=\"heading\" ng-if=\"headline\">{{headline}}</h3>\n" +
    "  <p>{{message}}</p>\n" +
    "  <button class=\"button delete-address-confirm\" ng-click=\"confirm()\">Yes, Delete Address</button>\n" +
    "  <button ng-click=\"cancel()\" class=\"button delete-address-cancel\" aria-label=\"Close reveal\">Cancel</button>\n" +
    "</div>\n"
  );


  $templateCache.put('details.html',
    "<ng-form name=\"details\">\n" +
    "	<div id=\"edit-account\" class=\"row\">\n" +
    "		<div class=\"small-12 columns\">\n" +
    "			<h4>Name &amp; Birth Date</h4>\n" +
    "			<form name=\"editAccount\" id=\"editAccount\" novalidate>\n" +
    "				<div class=\"error form_error\" ng-cloak response-errors id=\"editAddress-error\"></div>\n" +
    "				<div error-message ng-cloak field=\"first_name\" id=\"account_first_name\"></div>\n" +
    "				<label>First Name\n" +
    "					<input name=\"first_name\" type=\"text\" ng-model=\"account.first_name\" required />\n" +
    "				</label>\n" +
    "				<div error-message ng-cloak field=\"last_name\" id=\"account_first_name\"></div>\n" +
    "				<label>Last Name\n" +
    "					<input name=\"last_name\" type=\"text\" ng-model=\"account.last_name\" required />\n" +
    "				</label>\n" +
    "				<age-validation url=\"age_validation_inline.html\" year=\"year\" month=\"month\" day=\"day\"></age-validation>\n" +
    "				<button ng-disabled=\"editAccount.$invalid\" ng-click=\"updateCustomer(account, $event)\" class=\"button cta gray\">Update</button>\n" +
    "				<div class=\"error form_error\" ng-cloak response-errors id=\"updateProfile-error\"></div>\n" +
    "				<div class=\"success\" ng-cloak response-errors id=\"updateProfile-success\"></div>\n" +
    "			</form>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div id=\"edit-password\" class=\"row\">\n" +
    "		<div class=\"small-12 columns\">\n" +
    "			<h4>Password</h4>\n" +
    "			<form name=\"editPassword\" id=\"editPassword\" novalidate>\n" +
    "				<input type=\"password\" id=\"current_password\" name=\"customer[current_password]\" required ng-model=\"customer.current_password\" placeholder=\"Current Password\" ng-minLength=\"6\"/>\n" +
    "				<div class=\"error form_error\" ng-cloak response-errors id=\"editPassword-error\"></div>\n" +
    "				<div error-message ng-cloak field=\"customer[password]\" id=\"account_password\"></div>\n" +
    "				<input type=\"password\" id=\"customer_password\" name=\"customer[password]\" required ng-model=\"customer.password\" placeholder=\"Password\" ng-minLength=\"6\"/>\n" +
    "				<div error-message ng-cloak field=\"customer[password_confirmation]\" required id=\"account_password_confirm\"></div>\n" +
    "				<input pw-check=\"customer_password\" type=\"password\" id=\"customer_password_confirmation\" name=\"customer[password_confirmation]\" ng-model=\"customer.password_confirmation\" placeholder=\"Confirm Password\" ng-minLength=\"6\"/>\n" +
    "				<button ng-disabled=\"editPassword.$invalid\" ng-click=\"changePassword(customer, $event)\" class=\"button cta gray\">Change Password</button>\n" +
    "				<div class=\"success\" ng-cloak response-errors id=\"editPassword-success\"></div>\n" +
    "			</form>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</ng-form>"
  );


  $templateCache.put('header_login.html',
    "<li class=\"login-or-name\">\n" +
    "	<a ng-show='!isLoggedIn' href=\"/login\"  <% if @view == 'login'%>class=\"selected\"<% end %>>Login</a>\n" +
    "\n" +
    "	<a ng-show='isLoggedIn' href=\"/account/detail\" <% if @view == 'detail'%>class=\"selected\"<% end %>>Hi, {{customer.first_name}}</a>\n" +
    "	<!-- <a ng-show='isLoggedIn' href=\"/logout?disable_redirect=1\">Log Out</a> -->\n" +
    "</li>"
  );


  $templateCache.put('navigation.html',
    "<ul class=\"navigation\">\n" +
    "	<li ng-click=\"switchTo('detail')\" track=\"Account Profile\">Account Profile</li>\n" +
    "	<li ng-click=\"switchTo('book')\" track=\"Address Book\">Address Book</li>\n" +
    "	<li ng-click=\"switchTo('history')\" track=\"Order History\">Order History</li>\n" +
    "	<li class=\"logout\"><a ng-show='isLoggedIn' href=\"/logout\" track=\"Log Out\">Log Out</a></li>\n" +
    "</ul>\n"
  );


  $templateCache.put('order_history.html',
    "<div class=\"row\">\n" +
    "	\n" +
    "	<div class=\"small-12 columns\">\n" +
    "		<h4>Order History</h4>\n" +
    "\n" +
    "		<div class=\"orders\">\n" +
    "			<!-- ORDER TEMPLATE -->\n" +
    "			<div class=\"order\" ng-repeat=\"order in orders\">\n" +
    "\n" +
    "<!-- 			<pre>HEY {{order | json}}</pre> -->\n" +
    "				<div><p class=\"label left\">Order Placed: {{order.created_at | date}}</p><button class=\"button cta right\" ng-click=\"fetch(order.id)\">Show Details</button></div>\n" +
    "				<ul class=\"details\">\n" +
    "					<li><span>Order ID:&nbsp;</span>{{order.id}}</li>\n" +
    "					<li><span>Subtotal:&nbsp;</span>{{order.subtotal  | currency}}</li>\n" +
    "					<li><span>Shipping:&nbsp;</span>{{order.shipping  | currency}}</li>\n" +
    "					<li><span>Tax:&nbsp;</span>{{order.tax  | currency}}</li>\n" +
    "					<li><span>Total:&nbsp;</span>{{order.total  | currency}}</li>\n" +
    "					<!-- <li><span>Status:&nbsp;</span>{{order.status}}</li> -->\n" +
    "				</ul>\n" +
    "				<ul class=\"details\" ng-class=\"{hide: show !== order.id}\">\n" +
    "					<li class=\"label\">Cart Contents:</li>\n" +
    "					<li>\n" +
    "						<ul class=\"items\" ng-repeat=\"item in detail.items\">\n" +
    "							<li class=\"item\">{{item.name}}</li>\n" +
    "							<li>{{item.quantity}} @ {{item.price | currency}}</li>\n" +
    "						</ul>\n" +
    "					</li>\n" +
    "\n" +
    "					<li class=\"label\">Shipping Details:</li>\n" +
    "					<li>\n" +
    "						<ul class=\"items\" ng-repeat=\"shipment in detail.order_shipments\">\n" +
    "							<li><span>Carrier:&nbsp;</span>{{shipment.carrier}}</li>\n" +
    "							<li><span>Status:&nbsp;</span>{{shipment.shipment_code}}</li>\n" +
    "							<li><span>Ship Date:&nbsp;</span>{{shipment.shipped_at | date : \"fullDate\"}}</li>\n" +
    "							<li><span>Tracking Number:&nbsp;</span>\n" +
    "							<span ng-switch=\"getCarrier(shipment.carrier)\">\n" +
    "								<span ng-switch-when=\"fedex\"><a class=\"tracking-link\" track=\"tracking-link\" target=\"_blank\" ng-href=\"https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber={{shipment.tracking_number}}&cntry_code=us\">{{shipment.tracking_number}}</a></span>\n" +
    "								<span ng-switch-when=\"ups\"><a class=\"tracking-link\" track=\"tracking-link\" target=\"_blank\" ng-href=\"https://wwwapps.ups.com/WebTracking/track?track=yes&trackNums={{shipment.tracking_number}}\">{{shipment.tracking_number}}</a></span>\n" +
    "								<span ng-switch-default>{{shipment.tracking_number}}</span>\n" +
    "							</span>\n" +
    "\n" +
    "							</li>\n" +
    "						</ul>\n" +
    "					</li>\n" +
    "\n" +
    "					<li class=\"label\">Shipping Address:</li>\n" +
    "					<li ng-if=\"detail.shipping_address\">\n" +
    "						<ul class=\"shipping\">\n" +
    "							<li>\n" +
    "								<address>\n" +
    "									<div>{{detail.shipping_address.first_name}} {{detail.shipping_address.last_name}}</div>\n" +
    "									<div>{{detail.shipping_address.street1}} </div>\n" +
    "									<div ng-if=\"detail.shipping_address.street2\">{{detail.shipping_address.street2}} </div>\n" +
    "									<div>{{detail.shipping_address.city}},{{detail.shipping_address.state.abbr}} {{detail.shipping_address.zip}}</div>\n" +
    "								</address>\n" +
    "							</li>\n" +
    "						</ul>\n" +
    "					</li>\n" +
    "					<li class=\"label\" ng-if=\"detail.payment_method.billing_address\">Billing Address:</li>\n" +
    "					<li ng-if=\"detail.payment_method.billing_address\">\n" +
    "						<ul class=\"billing\">\n" +
    "							<li>\n" +
    "								<address>\n" +
    "									<div>{{detail.payment_method.billing_address.first_name}} {{detail.payment_method.billing_address.last_name}}</div>\n" +
    "									<div>{{detail.payment_method.billing_address.street1}} </div>\n" +
    "									<div ng-if=\"detail.payment_method.billing_address.street2\">{{detail.payment_method.billing_address.street2}} </div>\n" +
    "									<div>{{detail.payment_method.billing_address.city}},{{detail.payment_method.billing_address.state.abbr}} {{detail.payment_method.billing_address.zip}}</div>\n" +
    "								</address>\n" +
    "							</li>\n" +
    "						</ul>\n" +
    "					</li>\n" +
    "					<li><span>Subtotal:&nbsp;</span>{{order.subtotal | currency}}</li>\n" +
    "					<li><span>Shipping:&nbsp;</span>{{order.shipping | currency}}</li>\n" +
    "					<li><span>Tax:&nbsp;</span>{{order.tax  | currency}}</li>\n" +
    "					<li><span>Total:&nbsp;</span>{{order.total  | currency}}</li>\n" +
    "					<li class=\"label\">Payment Method:</li>\n" +
    "					<li>Card Type:&nbsp;{{detail.payment_method.card_type}}</li>\n" +
    "					<li>Card ending in:&nbsp;{{detail.payment_method.last_four_digits}}</li>\n" +
    "				</ul>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "\n"
  );

}]);
