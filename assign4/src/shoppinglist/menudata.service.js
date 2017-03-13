'use strict';

(function () {

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


  MenuDataService.$inject = ['$http', 'ApiBasePath'];
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      })
      .then(function (result) {
        var cates = result.data;
        return cates;
      });
    };

    service.getItemsForCategory = function (shortName) {
      if (!shortName) {
        return;
      }
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + shortName)
      })
      .then(function (result) {
        return result.data.menu_items;
      });
    };

  }

})();
