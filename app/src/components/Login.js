(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('login',{
      template: template(),
      controller: ['Auth',controller],
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
            <div class="input-field">
              <i class="fa fa-envelope prefix"></i>
              <input type="email" name="email" ng-model="$ctrl.user.email" class="validate" required/>
              <label for="email" data-error="Ingrese un email valido" data-success="Ok">Email: </label>
            </div>
            <div class="input-field">
              <i class="fa fa-lock prefix"></i>
              <input type="password" name="password" ng-model="$ctrl.user.password" class="validate" required/>
              <label for="password">Contraseña: </label>
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
              <button class="waves-effect waves-light btn-large btn-twiter">
                <i class="fa fa-twitter"></i>
              </button>
              <button class="waves-effect waves-light btn-large btn-github">
                <i class="fa fa-github"></i>
              </button>
              <button class="waves-effect waves-light btn-large btn-facebook">
                <i class="fa fa-facebook"></i>
              </button>
            </div>
            <p class="center" style="font-size: .8em; color:rgb(149, 152, 150)">
              ¿Aún no tienes cuenta? <a ng-link="['Security']">Crear cuenta</a>
            </p>
          </section>
        </section>
      </div>
    `
  }

  function controller(Auth) {
    var vm = this;
    vm.user = {};
    vm.loginAnonymously = loginAnonymously;

    function loginAnonymously() {
      Auth.$signInAnonymously()
        .catch((err) => console.log(err))

      Auth.$onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          vm.$router.navigate(['Main']);
        }
      })
      vm.user = {};
    }
  }
}());
