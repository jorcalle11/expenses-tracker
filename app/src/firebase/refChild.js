(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .factory('FirebaseRef',FirebaseRef);

    FirebaseRef.$inject = ['rootRef','Auth'];

    function FirebaseRef(rootRef,Auth) {
      return {
        getPreferencies: getPreferencies
      }

      function getPreferencies() {
        return rootRef.child('preferencies').child(Auth.$getAuth().uid);
      }
    }
}());
