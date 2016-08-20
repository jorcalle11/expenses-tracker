(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('root',{
      template: template(),
      controller: ['Auth','$rootRouter',controller],
      $routeConfig: [
        {path: '/', component: 'home', name: 'Main'},
        {path: '/preferencies', component: 'editUserPref', name: 'Preferencies'},        
        {path:'/signup', component: 'signUp', name: 'SignUp'},
        {path: '/login', component: 'login', name: 'Login'},
        {path: '/logout', component: 'logout', name: 'Logout'},
        {path: '/**', redirectTo: ['Login']}
      ]
    })

  function template() {
    return `
      <navbar logged-in="$ctrl.loggedIn" current-user="$ctrl.currentUser"></navbar>
      <div class="container">
        <ng-outlet></ng-outlet>
      </div>
    `
  }

  function controller(Auth,$rootRouter) {
    var vm = this;
    vm.currentUser = {};
    vm.loggedIn = false;
    vm.stateAuth = stateAuth;

    stateAuth();

    function stateAuth() {
      return Auth.$onAuthStateChanged((user) => {
        if (user) {
          vm.currentUser = user;
          vm.loggedIn = true;
          $rootRouter.navigate(['Main']);
        } else {
          vm.currentUser = {};
          vm.loggedIn = false;
          $rootRouter.navigate(['Login']);
        }
      });
    }

  }
}());
