"use strict";

(function() {

  angular.module('common', [])
  .constant('ApiPath', 'https://zzw-food.herokuapp.com')
  .config(config);

  config.$inject = ['$httpProvider'];
  function config($httpProvider) {
    $httpProvider.interceptors.push('loadingHttpInterceptor');
  }

})();
