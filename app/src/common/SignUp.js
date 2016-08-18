(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('signUp',{
      require : {
        parent: '^root'
      },
      template: template(),
      $canActivate: canActivate,
      controller: ['Auth',controller],
      bindings: {
        '$router': '<'
      }
    })

  function template() {
    return `
      <div class="row">
        <section class="col s12 m8 offset-m2 wrapperForm">
          <form name="signUpForm" ng-submit="$ctrl.signUp()">
            <h4 class="center">Registrar Usuario</h4>
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
              <button type="submit" class="waves-effect waves-light btn-large blue darken-2" ng-disabled="signUpForm.$invalid">
                <i class="fa fa-sign-in right"></i>
                Entrar
              </button>
            </div>
          </form>
          <p class="center" style="font-size: .8em; color:rgb(149, 152, 150)">
            ¿Ya tienes cuenta? <a ng-link="['Login']">Iniciar Sesión</a>
          </p>
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

  function controller(Auth) {
    var vm = this;
    vm.credentials = {};
    vm.signUp = createUser;


    function createUser() {
      Auth.$createUserWithEmailAndPassword(vm.credentials.email,vm.credentials.password)
        .then((user) => {
          vm.parent.stateAuth();
          vm.credentials = {};
        })
        .catch((err) => console.log(err))
    }

  }
}());
