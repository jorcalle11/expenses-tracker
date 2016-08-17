(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('root',{
      template: template(),
      controller: ['Auth','$rootRouter',controller],
      $routeConfig: [
        {path: '/', component: 'home', name: 'Main'},
        {path: '/login', component: 'login', name: 'Login'},
        {path: '/logout', component: 'logout', name: 'Logout'},
        {path: '/security', component: 'security', name: 'Security'},
        {path: '/**', redirectTo: ['Main']}
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
        } else {
          vm.currentUser = {};
          vm.loggedIn = false;
          $rootRouter.navigate(['Login']);
        }
      });
    }

  }
}());
