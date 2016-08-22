(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .factory('FirebaseRef',FirebaseRef);

    FirebaseRef.$inject = ['rootRef','Auth'];

    function FirebaseRef(rootRef,Auth) {
      return {
        getPreferencies: getPreferencies,
        getCategories: getCategories,
        getExpenses: getExpenses
      }

      function getPreferencies() {
        return rootRef.child('preferencies').child(Auth.$getAuth().uid);
      }

      function getCategories() {
        return rootRef.child('categories');
      }

      function getExpenses() {
        return rootRef.child('expenses').child(Auth.$getAuth().uid);
      }
    }
}());
