(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .factory('rootRef', rootRef);

    function rootRef() {
      return firebase.database().ref();
    }
}());
