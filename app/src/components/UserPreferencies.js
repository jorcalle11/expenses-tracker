(function() {
  'use strict';
  angular
    .module('expenseTrakerApp')
    .component('editUserPref',{
      template: template(),
      $canActivate: canActivate,
      controller: ['$firebaseObject','FirebaseRef',controller],
      bindings: {
        $router: '<'
      }
    })

    function template() {
      return `
        <div class="row">
          <section class="col s12 m6 offset-m3 wrapperForm">
            <form class="center">
              <h5>Editar preferecias</h5>
              <div class="row">
                <div class="input-field col s12 m10 offset-m1">
                  <label for="displayName">Nombre a mostrar: </label>
                  <input type="text" name="displayName" class="validate" ng-model="$ctrl.userPreferencies.displayName" autofocus/>
                </div>
              </div>
              <div class="row">
                <div class="col s12 m10 offset-m1">
                  <label>Seleccionaste el thema: </label>
                  <select class="browser-default" ng-model="$ctrl.userPreferencies.theme" ng-options="theme for theme in $ctrl.themes">
                    <option value="" disabled>Escoge un tema</option>
                  </select>
                </div>
              </div>
              <div class="btn-groups">
                <button class="waves-effect waves-light btn red darken-2" ng-click="$ctrl.cancel()">
                  <i class="fa fa-close"></i>
                </button>
                <button class="waves-effect waves-light btn green darken-2" ng-click="$ctrl.save()">
                  <i class="fa fa-check"></i>
                </button>
              </div>
            </form>
          </section>
        </div>
      `
    }

    function canActivate(Auth,$rootRouter) {
      return Auth.$requireSignIn()
        .then(() => true)
        .catch(() => {
          $rootRouter.navigate(['Login']);
          return false;
        });
    }

    function controller($firebaseObject,FirebaseRef) {
      var vm = this;
      vm.userPreferencies = $firebaseObject(FirebaseRef.getPreferencies());
      vm.themes = ['red darken-3','pink darken-3','blue darken-3','lime darken-3','green darken-3'];
      vm.save = save;
      vm.cancel = cancel;


      function save() {
        console.log(vm.userPreferencies);
        vm.userPreferencies.$save();
        vm.$router.navigate(['Main']);
      }

      function cancel() {
        vm.$router.navigate(['Main']);
      }
    }
}());
