'use strict';

(function() {

  angular.module('public')
  .config(routeConfig);

  /**
   * Configures the routes and views
   */
  routeConfig.$inject = ['$stateProvider'];
  function routeConfig ($stateProvider) {
    // Routes
    $stateProvider
      .state('public', {
        absract: true,
        templateUrl: 'src/public/public.html'
      })
      .state('public.home', {
        url: '/',
        templateUrl: 'src/public/home/home.html'
      })
      .state('public.menu', {
        url: '/menu',
        templateUrl: 'src/public/menu/menu.html',
        controller: 'MenuController',
        controllerAs: 'menuCtrl',
        resolve: {
          menuCategories: ['MenuService', function (MenuService) {
            return MenuService.getCategories().then(function (res) {
              return res
           });
          }]
        }
      })
      .state('public.menuitems', {
        url: '/menu/{category}',
        templateUrl: 'src/public/menu-items/menu-items.html',
        controller: 'MenuItemsController',
        controllerAs: 'menuItemsCtrl',
        resolve: {
          menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
            return MenuService.getMenuItems($stateParams.category).then(function (res) {
              return res
           });
          }]
        }
      })
      .state('public.register', {
        url: '/register',
        templateUrl: 'src/public/register/register.template.html',
        controller: 'RegisterController',
        controllerAs: 'registerCtrl'
      })
      .state('public.userInfo', {
        url: '/userInfo',
        templateUrl: 'src/public/register/userInfo.template.html',
        controller: 'RegisterController',
        controllerAs: 'registerCtrl'
      });

  }
})();
