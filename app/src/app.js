(function() {
  'use strict';

  angular
    .module('expenseTrakerApp',[
      'ngComponentRouter',
      'firebase',
      'ngStorage'
    ])
    .value('$routerRootComponent','root')
}());
