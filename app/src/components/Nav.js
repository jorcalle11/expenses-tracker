(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('navbar',{
      template: template()
    })

  function template() {
    return `
    <nav class="blue darken-3">
      <div class="nav-wrapper">
        <a ng-link="['Main']" class="brand-logo">Expenses</a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="fa fa-bars" style="margin-left:5px"></i></a>
        <ul class="right hide-on-med-and-down">
        <li>
          <a href="#/Registrate">
            <i class="fa fa-user-plus left"></i>
            Registrate
          </a>
        </li>
          <li>
            <a ng-link="['Login']">
              <i class="fa fa-sign-in left"></i>
              Login
            </a>
          </li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li><a ng-link="['Login']">Registrate</a></li>
          <li><a ng-link="['Login']">Registrate</a></li>
          <li><a ng-link="['Login']">Registrate</a></li>
          <li><a ng-link="['Login']">Registrate</a></li>

        </ul>
      </div>
    </nav>
    `
  }
}());
