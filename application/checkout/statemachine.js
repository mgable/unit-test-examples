/*jshint bitwise: false*/

(function(){
	/*jshint validthis: true */
	"use strict";

	angular.module("drinks.services").service("StateMachine", [function(){
		this.state = 0;
		this.conditions = {};
		this.state = null;

		function StateMachine(initalState, exclusive, conditions){
			this.conditions = conditions;
			this.exclusive = exclusive;
			this.state = this.setCondition(initalState) || 0;

			return this;
		}

		function _getMask(n){
			return 1 << n;
		}

		// returns true if the argument is the current condition
		function getValue (condition){
			var mask = _getMask(condition);
			if ((this.state & mask) !== 0) {
				return true;
			} else {
				return false;
		  }
		}

		// returns the left-most bit
		function getCondition(){
			var result = 0;
			for (var i = 0;  i < 8; i++){
				var mask = _getMask(i);
				if ((this.state & mask) !== 0) {
				  result = i;
				}
			}
			return result;
		}

		function setCondition(condition){
			var mask = _getMask(condition),
				_state = this.exclusive ? 0 : this.state;
			this.state = _state |= mask;
			return this.state;
		}

		function clearCondition(condition){
			var mask = _getMask(condition);
			this.state = this.state &= ~mask;
			return this.state;
		}

		function toggleCondition(condition){
			var mask = _getMask(condition);
			this.state = this.state ^= mask;
			return this.state;
		}

		// returns the "state" as an integer
		function getState(){
		  return this.state;
		}

		this.getValue = getValue;
		this.clearCondition = clearCondition;
		this.toggleCondition = toggleCondition;
		this.getState = getState;
		this.setCondition = setCondition;
		this.getCondition = getCondition;

		this.init = StateMachine;
	}]);
})();
