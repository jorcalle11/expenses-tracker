(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('dropdownUser',{
      template: template(),
      bindings: {
        currentUser: '<'
      }
    })

  function template() {
    return `
    <a class="dropdown-button" href="#!" data-activates="dropdown1">
      <img ng-if="$ctrl.currentUser.photoURL" ng-src="{{$ctrl.currentUser.photoURL}}" class="circle left" style="margin: 8px 8px 0 0" width="50" height="50"/>
      {{$ctrl.currentUser.displayName || $ctrl.currentUser.email}}
      <span ng-if="$ctrl.currentUser.isAnonymous"><i class="fa fa-user-secret"></i> Anónimo</span>
      <i class="fa fa-angle-down right"></i>
    </a>
    `
  }
}());
