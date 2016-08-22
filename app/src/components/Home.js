(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('home',{
      template: template(),
      $canActivate: canActivate,
      controller: ['Auth','FirebaseRef','ExpensesListService','$rootScope',controller]
    });

  function template() {
    return `
      <h3 class="center">Gastos</h3>
      <alert ng-show="!$ctrl.load" message="Cargando datos, espere..."></alert>
      <div ng-show="$ctrl.load" class="right-align">
        <p>Total gastos: <span class="total-amount">{{$ctrl.expensesInOrder.getTotal() | currency}}</span></p>
      </div>
      <expenses-list
        load="$ctrl.load"
        data="$ctrl.expensesInOrder"
        selected-expense="$ctrl.selectedExpense(expense)"
        >
      </expenses-list>
      <form-expense
        ng-show="$ctrl.load"
        edited-expense="$ctrl.editExpense"
        update-expense="$ctrl.updateExpense()"
        create-new-expense="$ctrl.createExpense(expenseData)"
        >
      </form-expense>
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

  function controller(Auth,FirebaseRef, ExpensesListService,$rootScope){
    var vm = this;
    vm.load = false;
    vm.createExpense = createExpense;
    vm.updateExpense = updateExpense;
    vm.selectedExpense = selectedExpense;
    vm.editExpense = {};

    $rootScope.$on('logout', () => {
      vm.expensesInOrder.$destroy();
    });

    var query = FirebaseRef.getExpenses().orderByChild('date');
    ExpensesListService(query).$loaded()
      .then((data) => {
        vm.expensesInOrder = data;
        console.log(data);
        vm.load = true;
      });

    function createExpense(expense) {
      vm.expensesInOrder.$add(expense);
    }

    function selectedExpense(expense) {
      vm.editExpense = expense;
    }

    function updateExpense() {
      vm.expensesInOrder.$save(vm.editExpense);
    }
  }

}());
