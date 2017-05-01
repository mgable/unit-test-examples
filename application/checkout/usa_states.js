(function(){
  "use strict";

  angular.module("drinks.services").service("USA_STATES", ["DataStore", function(DataStore){

    var states = $.ajax("/api/states", {dataType: "json"}).then(function(response){
      return response;
    });

    this.getStates = function (){
      return states;
    };
    
  }]);
})();