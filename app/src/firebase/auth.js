(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .factory('Auth', Auth);

    Auth.$inject = ['$firebaseAuth'];

    function Auth($firebaseAuth) {
      return $firebaseAuth();
    }
}());
