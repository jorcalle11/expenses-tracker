(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('navbar',{
      require: {
        parent: '^root'
      },
      template: template(),
      controller: ['Auth','$firebaseObject','FirebaseRef',controller],
      bindings: {
        currentUser: '<',
        loggedIn: '<'
      }
    })

  function template() {
    return `
    <ul id="dropdown1" class="dropdown-content">
      <li><a href="#!">Perfil</a></li>
      <li><a href="#!">Configuración</a></li>
      <li class="divider"></li>
      <li><a ng-click="$ctrl.logout()">Cerrar Sesión</a></li>
    </ul>
    <nav ng-show="$ctrl.loaded" class="{{($ctrl.preferencies.theme) ? $ctrl.preferencies.theme : 'blue darken-3'}}">
      <div class="nav-wrapper">
        <a ng-link="['Login']" class="brand-logo">Expenses</a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="fa fa-bars" style="margin-left:5px"></i></a>
        <ul class="right hide-on-med-and-down">
          <li ng-show="$ctrl.loggedIn">
            <a ng-link="['Main']">
              <i class="fa fa-lock left"></i>
              Principal
            </a>
          </li>
          <li ng-show="$ctrl.loggedIn">
            <a ng-link="['Preferencies']">
              <i class="fa fa-wrench left"></i>
              Editar preferencias
            </a>
          </li>
          <li ng-show="!$ctrl.loggedIn">
            <a ng-link="['SignUp']">
              <i class="fa fa-user-plus left"></i>
              Registrate
            </a>
          </li>
          <li ng-show="!$ctrl.loggedIn">
            <a ng-link="['Login']">
              <i class="fa fa-sign-in left"></i>
              Iniciar Sesión
            </a>
          </li>
          <li ng-show="$ctrl.loggedIn"><dropdown-user current-user="$ctrl.currentUser"></dropdown-user></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li ng-show="$ctrl.loggedIn"><a ng-link="['Main']">Principal</a></li>
          <li ng-show="$ctrl.loggedIn"><a ng-click="$ctrl.logout()">Cerrar Sesión</a></li>
          <li ng-show="!$ctrl.loggedIn"><a ng-link="['SignUp']">Registrate</a></li>
          <li ng-show="!$ctrl.loggedIn"><a ng-link="['Login']">Iniciar Sesión</a></li>
        </ul>
      </div>
    </nav>
    `
  }

  function controller(Auth,$firebaseObject,FirebaseRef) {
    var vm = this;
    vm.logout = logout;
    vm.loaded = true;

    Auth.$requireSignIn().then(() => {
      vm.preferencies = $firebaseObject(FirebaseRef.getPreferencies());
      vm.loaded = true;
      console.log(vm.preferencies);
    });

    function logout() {
      Auth.$signOut();
      vm.parent.stateAuth();
    }

  }
}());
