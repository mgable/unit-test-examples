(function(){
	"use strict";
	angular.module("drinks.directives").service("TrackCtrl", ["globalObj", function(globalObj){

		function _getTrackingData(data){
			if (!data || _.isEmpty(data)){
				return {};
			} else if (_.isObject(data)){
				return data;
			} else {
				try {
					return JSON.parse(data);
				}catch(e){console.info(e);return {};}
			}
		}

		this.track = function(attrs){
			if (!globalObj.customer && !globalObj.anonymous_id) {
				return;
			}
			var id = globalObj.anonymous_id ? {anonymous_id: globalObj.anonymous_id} : {customer_id: globalObj.customer.id},
				action = {"action": "track"},
				event = attrs.track,
				timestamp = {"timestamp": new Date()},
				trackingdata = _getTrackingData(attrs.trackingdata),
				properties = _.extend({}, {store_id: globalObj.store_id}, id, trackingdata, timestamp, event, action);

			if (event && analytics && typeof analytics.track === "function"){
				analytics.track(event, properties);
			} else if(!event){
				throw new Error("No tracking event is defined");
			} else {
				throw new Error("No analytics engine");
			}
		}
	}]).directive("track", ["TrackCtrl", function(ctrl){
		return {
			restrict: "A",
			link: function(scope, element, attrs){
				element.on('click', function(evt){
					ctrl.track(attrs);
				});
			}
		}
	}]);
})();
