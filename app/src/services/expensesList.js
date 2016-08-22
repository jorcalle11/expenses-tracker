(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .factory('ExpensesListService',ExpensesListService);

  ExpensesListService.$inject = ['$firebaseArray'];

  function ExpensesListService($firebaseArray) {
    var ExpenseList = $firebaseArray.$extend({
      getTotal: getTotal
    });

    return function(ref) {
      return new ExpenseList(ref);
    }

    function getTotal() {
      var total = 0;

      angular.forEach(this.$list, (rec) => {
        total +=rec.amount;
      });

      return total;
    }
  }

}());
