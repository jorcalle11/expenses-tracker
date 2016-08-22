(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('expensesList',{
      template: template(),
      controller: controller,
      bindings: {
        data: '=',
        load: '<',
        selectedExpense: '&'
      }
    })

  function template() {
    return `
      <alert ng-show="!$ctrl.data.length && $ctrl.load" message="No hay gastos guardados, puedes comenzar por agregar uno"></alert>
      <div class="wrapperForm" ng-show="$ctrl.data.length">
        <table class="bordered highlight responsive-table">
          <thead>
            <tr>
              <th data-field="date">Fecha</th>
              <th data-field="payee">Beneficiario</th>
              <th data-field="description">Descripción</th>
              <th data-field="category">Categoría</th>
              <th data-field="amount">Valor</th>
              <th data-field="actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              ng-repeat="expense in $ctrl.data"
              ng-mouseenter="hovering=true"
              ng-mouseleave="hovering=false"
              ng-click="$ctrl.selectExpense(expense)"
              >
              <td>{{expense.date |date:'shortDate'}}</td>
              <td>{{expense.payee}}</td>
              <td>{{expense.description}}</td>
              <td>{{expense.category.name}}</td>
              <td>{{expense.amount | currency}}</td>
              <td>
                <span
                  class="fa fa-close"
                  ng-show="hovering"
                  ng-mouseenter="delhovering=true"
                  ng-mouseleave="delhovering=false"
                  ng-class="{'iconOption':delhovering}"
                  ng-click="$ctrl.deleteExpense(expense)"
                  >
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      <div>
    `
  }

  function controller() {
    var vm = this;
    vm.deleteExpense = deleteExpense
    vm.selectExpense = selectExpense;

    function deleteExpense(expense) {
      vm.data.$remove(expense);
    }

    function selectExpense(expense) {
      vm.selectedExpense({expense:expense});
    }
  }
}());
