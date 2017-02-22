(function () {
'use strict';

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
        console.log('cates:', cates);
      });
    };

    service.getItemsForCategory = function (shortName) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + shortName)
      })
      .then(function (result) {
        console.log('getItemsForCategory:', result.data);
        return result.data;
      });
    };

  }

//
//
//   ShoppingListService.$inject = ['$q', '$timeout']
//   function ShoppingListService($q, $timeout) {
//     var service = this;
//
//     // List of shopping items
//     var items = [];
//
//     // Pre-populate a no cookie list
//     items.push({
//       name: "Sugar",
//       quantity: "2 bags",
//       description: "Sugar used for baking delicious umm... baked goods."
//     });
//     items.push({
//       name: "flour",
//       quantity: "1 bags",
//       description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
//     });
//     items.push({
//       name: "Chocolate Chips",
//       quantity: "3 bags",
//       description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
//     });
//
//     // Simulates call to server
//     // Returns a promise, NOT items array directly
//     service.getItems = function () {
//       var deferred = $q.defer();
//
//       // Wait 2 seconds before returning
//       $timeout(function () {
//         // deferred.reject(items);
//         deferred.resolve(items);
//       }, 800);
//
//       return deferred.promise;
//     };
//   }
//
// })();
