(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .factory('User', User);

  function User($localStorage) {

    return {
      set: setUser,
      get: getUser
    }

    function setUser(user,token) {
      $localStorage.set('user',JSON.stringify(user));
      $localStorage.set.('accessToken',token);
    }

    function getUser() {
      if ($localStorage.get('user') !== undefined) {
        return JSON.parse($localStorage.get('user'));
      }
    }
  }
}());
