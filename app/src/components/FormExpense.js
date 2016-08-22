(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('formExpense',{
      template:template(),
      controller: ['FirebaseRef','$firebaseArray','$scope', '$rootScope', controller],
      bindings: {
        createNewExpense: '&',
        editedExpense: '=',
        updateExpense: '&'
      }
    })

  function template() {
    return `
      <section class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s2">
              <input type="date" ng-model="$ctrl.date"/>
            </div>
            <div class="input-field col s2">
              <input type="text" ng-model="$ctrl.payee" placeholder="Beneficiario"/>
            </div>
            <div class="input-field col s2">
              <input type="text" ng-model="$ctrl.description" placeholder="Descripción"/>
            </div>
            <div class="input-field col s2">
              <select
                class="browser-default"
                ng-model="$ctrl.selectedCategory"
                ng-options="category.name for category in $ctrl.categories track by category.$id">
              </select>
            </div>
            <div class="input-field col s2">
              <input type="number" ng-model="$ctrl.amount" min="1"/>
            </div>
            <div class="margin-top">
              <button ng-show="!$ctrl.editing" class="waves-effect waves-light btn" ng-click="$ctrl.save()"><i class="fa fa-floppy-o"></i></button>
              <button ng-show="$ctrl.editing" class="waves-effect waves-light btn blue accent-3" ng-click="$ctrl.update()"><i class="fa fa-pencil"></i></button>
              <button ng-show="$ctrl.editing" class="waves-effect waves-light btn red accent-3" ng-click="$ctrl.cancel()"><i class="fa fa-close"></i></button>
            </div>
          </div>
        </div>
      </section>
    `
  }

  function controller(FirebaseRef,$firebaseArray,$scope,$rootScope) {
    var vm = this;
    vm.save = save;
    vm.cancel = cancel;
    vm.update = update;
    vm.editing = false;

    var query = FirebaseRef.getCategories().orderByChild('name');
    $firebaseArray(query).$loaded()
      .then((data) => {
        vm.categories = data;
        vm.selectedCategory = data[0];
      })


    $rootScope.$on('logout', () => {
      vm.categories.$destroy();
    });

    setDefaults();

    function setDefaults() {
      vm.date = new Date();
      vm.payee = '';
      vm.amount = 10000;
      vm.description = '';
      if (vm.categories) {
        vm.selectedCategory = vm.categories[0];
      }
    }

    function save() {
      if (vm.amount <= 0 || vm.description === '') return;

      var newExpense = {
        date: Date.now(vm.date),
        payee: vm.payee,
        amount: vm.amount,
        description: vm.description,
        category: {
          id: vm.selectedCategory.$id,
          name: vm.selectedCategory.name
        }
      }
      setDefaults();
      vm.createNewExpense({expenseData: newExpense});
    }

    function cancel() {
      vm.editing = false;
      setDefaults();
    }

    function update() {
      vm.editing = false;
      vm.editedExpense.date = Date.now(vm.date);
      vm.editedExpense.payee = vm.payee;
      vm.editedExpense.description = vm.description;
      vm.editedExpense.amount = vm.amount;
      vm.editedExpense.category = {
        id: vm.selectedCategory.$id,
        name: vm.selectedCategory.name
      }
      vm.updateExpense();
      vm.editedExpense = {};
      setDefaults();
    }

    $scope.$watch('$ctrl.editedExpense',(newData,oldData) => {
      if (newData.hasOwnProperty('amount')) {
        vm.editing = true;
        vm.payee = newData.payee;
        vm.date = new Date(newData.date);
        vm.amount = newData.amount;
        vm.description = newData.description;
        vm.selectedCategory = vm.categories[vm.categories.$indexFor(newData.category.id)];
      }
    });

  }
}());
