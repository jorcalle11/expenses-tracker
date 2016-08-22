(function() {
  'use strict';

  angular
    .module('expenseTrakerApp')
    .component('userInfo',{
      $canActivate: canActivate,
      template: template(),
      controller: ['Auth','toastr',controller]
    })

  function canActivate(Auth,$rootRouter) {
    return Auth.$requireSignIn()
      .then(() => true)
      .catch(() => {
        $rootRouter.navigate(['Login']);
        return false;
      });
  }

  function template() {
    return `
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="card sticky-action" ng-show="!!$ctrl.user">
          <div class="card-image waves-effect waves-block waves-light">
            <img ng-if="$ctrl.user.photoURL" class="activator" ng-src="{{$ctrl.user.photoURL}}">
            <img ng-if="!$ctrl.user.photoURL" class="activator" src="img/user.png">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{$ctrl.user.displayName || $ctrl.user.email}}<i class="fa fa-ellipsis-v right"></i></span>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{{$ctrl.user.displayName}}<i class="fa fa-close right"></i></span>
            <p>Información Adicional</p>
            <ul>
              <li><strong>Id: </strong>{{$ctrl.user.uid}}</li>
              <li><strong>Email: </strong>{{$ctrl.user.email}}</li>
              <li><strong>Provedor: </strong>{{$ctrl.user.providerData[0].providerId}}</li>
            </ul>
            <div class="row">
              <form class="col s12 m10 offset-m1">
                <h4 class="center">Actualizar información</h4>
                <div class="input-field" style="margin-top: 10px">
                  <input type="text" ng-model="$ctrl.displayName" class="validate"/>
                  <label for="displayName">Nombre de Usuario</label>
                </div>
                <div class="input-field">
                  <input type="text" ng-model="$ctrl.photoURL" class="validate"/>
                  <label for="displayName">Url foto</label>
                </div>
                <button class="waves-effect waves-light btn btn-large right" ng-click="$ctrl.update()">
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    `
  }

  function controller(Auth,toastr) {
    var vm = this;
    vm.user = Auth.$getAuth();
    vm.update = update;

    setDefaults();

    function update() {
      vm.user.updateProfile({
        displayName: vm.displayName,
        photoURL: vm.photoURL
      })
      .then(() => toastr.info('Perfil actualizdo con exito','Perfil'))
      .catch(() => toastr.error('Error al actualizar el perfil','Error'));
      setDefaults();
    }

    function setDefaults() {
      vm.displayName = vm.user.displayName || '';
      vm.photoURL = vm.user.photoURL || '';
    }
  }
}());
