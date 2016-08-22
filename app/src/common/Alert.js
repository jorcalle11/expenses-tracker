(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('alert',{
      template: template(),
      bindings: {
        message: '@'
      }
    })

  function template() {
    return `
      <div class="center alert">
        {{$ctrl.message}}
      </div>
    `
  }
}());
