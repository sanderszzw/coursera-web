'use strict';

(function () {

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/shoppinglist/templates/home.template.html'
    })

    // categoriesList
    .state('categoriesList', {
      url: '/categoriesList',
      templateUrl: 'src/shoppinglist/templates/main-categories.html',
      controller: 'CategoriesController as CateCtrl',
      resolve: {
        cates: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories()
        }]
      }
    })

    //item details
    .state('categoriesList.itemsInCategory', {
      url: '/items/{shortName}',
      templateUrl: 'src/shoppinglist/templates/main-items.template.html',
      controller: 'ItemsController as ItemsCtrl',
      resolve: {
        items: ['MenuDataService','$stateParams', function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.shortName)
        }]
      }
    });


  }

})();
