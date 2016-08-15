(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('home',{
      template: template()
    })

  function template() {
    return `
      <h3>Yo soy la ruta principal!!!</h3>
    `
  }

}());
