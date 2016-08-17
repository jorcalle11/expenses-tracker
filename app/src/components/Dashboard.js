(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('security',{
      template: template(),
      $canActivate: canActivate,
      controller: controller,
      bindings: {
        '$router': '<',
      }
    })

  function template() {
    return `
      <h2>yo soy security, me puedes ver si estas logueado!!!</h2>
    `
  }

  function canActivate(Auth) {
    return Auth.$waitForSignIn()
      .then((user)=>{
        if(user) return true;
        return false;
      })
  }

  function controller(Auth) {
    var vm = this;
  }
}());
