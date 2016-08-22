(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('categoriesList',{
      template: template(),
      $canActivate: canActivate,
      controller: ['FirebaseRef','$firebaseArray','$rootScope',controller]
    })

  function template() {
    return `
      <h4 class="center">Lista de Categorias</h4>
      <ul class="collection">
        <li class="collection-item" ng-repeat="category in $ctrl.categories">
          {{category.name}}
        </li>
        <li class="collection-item">
          <input class="input-field" type="text" ng-model="$ctrl.nameCategory"/>
          <button class="waves-effect waves-light btn" ng-click="$ctrl.addCategory()">Guardar</button>
        </li>
      </ul>
    `
  }

  function canActivate(Auth, $rootRouter,$rootScope) {
    return Auth.$requireSignIn()
      .then(() => true)
      .catch(() => {
        $rootRouter.navigate(['Login']);
        return false;
      });
  }

  function controller(FirebaseRef,$firebaseArray,$rootScope) {
    var vm = this;
    vm.addCategory = addCategory;

    var query = FirebaseRef.getCategories().orderByChild('name');
    $firebaseArray(query).$loaded()
      .then((data) => {
        vm.categories = data;
      });

    function addCategory() {
      if (vm.nameCategory !== '') {
        vm.categories.$add({name: vm.nameCategory});
        vm.nameCategory = '';
      }
    }

    $rootScope.$on('logout', () => {
      vm.categories.$destroy();
    });
  }
}());
