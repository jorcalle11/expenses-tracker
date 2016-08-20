(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('login',{
      template: template(),
      $canActivate: canActivate,
      controller: ['Auth','toastr',controller],
      bindings: {
        '$router': '<'
      }
    })

  function template() {
    return `
      <div class="row">
        <section class="col s12 m8 offset-m2 wrapperForm">
          <form name="loginForm" ng-submit="$ctrl.login()">
            <h4 class="center">Iniciar Sesión</h4>
            <div class="row">
              <div class="input-field col s10 m8 offset-s1 offset-m2">
                <i class="fa fa-envelope prefix"></i>
                <input type="email" name="email" ng-model="$ctrl.credentials.email" class="validate" required/>
                <label for="email" data-error="Ingrese un email valido" data-success="Ok">Email: </label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s10 m8 offset-s1 offset-m2">
                <i class="fa fa-lock prefix"></i>
                <input type="password" name="password" ng-model="$ctrl.credentials.password" class="validate" required/>
                <label for="password">Contraseña: </label>
              </div>
            </div>
            <div class="center" style="margin-bottom:8px">
              <button type="submit" class="waves-effect waves-light btn-large blue darken-2" ng-disabled="loginForm.$invalid">
                <i class="fa fa-sign-in right"></i>
                Entrar
              </button>
            </div>
            <div class="separator">
              <h6 class="text">ó si lo prefieres, Ingresa con: </h6>
              <hr>
            </div>
          </form>
          <section>
            <div class="btn-groups">
              <button class="waves-effect waves-light btn-large grey darken-1" ng-click="$ctrl.loginAnonymously()">
                <i class="fa fa-user-secret"></i>
              </button>
              <button class="waves-effect waves-light btn-large btn-twiter" ng-click="$ctrl.loginProvider('twitter')">
                <i class="fa fa-twitter"></i>
              </button>
              <button class="waves-effect waves-light btn-large btn-github" ng-click="$ctrl.loginProvider('github')">
                <i class="fa fa-github"></i>
              </button>
              <button class="waves-effect waves-light btn-large btn-facebook" ng-click="$ctrl.loginProvider('facebook')">
                <i class="fa fa-facebook"></i>
              </button>
            </div>
            <p class="center" style="font-size: .8em; color:rgb(149, 152, 150)">
              ¿Aún no tienes cuenta? <a ng-link="['SignUp']">Crear cuenta</a>
            </p>
          </section>
        </section>
      </div>
    `
  }

  function canActivate(Auth, $rootRouter) {
    return Auth.$requireSignIn()
      .then(() => {
        $rootRouter.navigate(['Main']);
        return false;
      })
      .catch(() => true);
  }

  function controller(Auth,toastr) {
    var vm = this;
    vm.credentials = {};
    vm.login = loginWithEmailAndPassword;
    vm.loginAnonymously = loginAnonymously;
    vm.loginProvider = loginProvider;

    function loginAnonymously() {
      Auth.$signInAnonymously()
        .then(() => toastr.success('Iniciaste Sesión de forma Anónima','Login'))
        .catch((err) => toastr.error('Algo salió mal :(','Error'));
    }

    function loginWithEmailAndPassword() {
      Auth.$signInWithEmailAndPassword(vm.credentials.email,vm.credentials.password)
        .then(() => {
          vm.credentials = {};
          toastr.success('Iniciaste sesion exitosamente!','Login');
        })
        .catch((err) => toastr.error('Email o Contraseña incorrecta','Error'))
    }

    function loginProvider(provider) {
      Auth.$signInWithPopup(provider)
        .then(() => toastr.success(`Iniciaste sesion con ${provider}`,'Login'))
        .catch((err) => toastr.error('Error',err.message));
    }

  }
}());
