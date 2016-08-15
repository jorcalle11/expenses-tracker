(function() {
  'use strict';

  angular
    .module('expenseTrakerApp',[
      'ngComponentRouter',
      'firebase'
    ])
    .value('$routerRootComponent','root')
}());
