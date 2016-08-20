(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('home',{
      template: template(),
      $canActivate: canActivate,
      controller: ['Auth',controller]
    })

  function template() {
    return `
      <h3>Yo soy la ruta principal!!!</h3>
      <button ng-click="$ctrl.currentUser()">actual</button>
      <button ng-click="$ctrl.logout()">cerrar session</button>
    `
  }

  function canActivate(Auth,$rootRouter){
    return Auth.$requireSignIn()
      .then(() => true)
      .catch(() => {
        $rootRouter.navigate(['Login']);
        return false;
      });
  }

  function controller(Auth){
    var vm = this;

    vm.currentUser = currentUser;
    vm.logout = logout;

    function currentUser() {
      console.log(Auth.$getAuth());
    }

    function logout() {
      Auth.$signOut()
    }
  }

}());
