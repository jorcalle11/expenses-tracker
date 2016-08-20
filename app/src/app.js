(function() {
  'use strict';

  angular
    .module('expenseTrakerApp',[
      'ngComponentRouter',
      'firebase',
      'ngAnimate',
      'toastr'
    ])
    .value('$routerRootComponent','root')
}());
