(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('root',{
      template: template(),
      controller: ['Auth',controller],
      $routeConfig: [
        {path: '/', component: 'home', name: 'Main'},
        {path: '/login', component: 'login', name: 'Login'},
        {path: '/security', component: 'security', name: 'Security'},
        {path: '/**', redirectTo: ['Main']}
      ]
    })
    .component('security',{
      template: `<h2>yo soy security!!!</h2>`
    })

  function template() {
    return `
      <navbar></navbar>
      <div class="container">
        <ng-outlet></ng-outlet>
      </div>
    `
  }

  function controller(Auth) {
    var vm = this;
    console.log(Auth);
  }
}());
