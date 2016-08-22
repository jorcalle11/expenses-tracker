(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('root',{
      template: template(),
      controller: ['Auth','$rootRouter',controller],
      $routeConfig: [
        {path: '/', component: 'home', name: 'Main'},
        {path: '/me', component: 'userInfo', name: 'User'},        
        {path: '/preferencies', component: 'editUserPref', name: 'Preferencies'},
        {path: '/categories', component: 'categoriesList', name: 'Categories'},
        {path:'/signup', component: 'signUp', name: 'SignUp'},
        {path: '/login', component: 'login', name: 'Login'},
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

    stateAuth();

    function stateAuth() {
      Auth.$onAuthStateChanged((user) => {
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
