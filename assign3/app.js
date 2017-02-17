'use strict';

(function () {
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
  .directive('foundItems', foundItems);


  function foundItems () {
    var ddo = {
      templateUrl:'foundItems.html',
      scope: {
        foundList:'<',
        onRemove:'&',
      },
      controller: foundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    }
    return ddo;
  }

  function foundItemsDirectiveController() {
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.key = '';
    menu.found = [];
    menu.message = ''

    menu.find = function() {
      if (menu.key === '') {
        menu.message = 'Nothing found';
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(menu.key);
      promise.then(function(response) {
        menu.found = response;
        if (menu.found.length === 0) {
          menu.message = 'Nothing found';
        }
      })
      .catch(function(error) {
        console.log('Error');
      });
    };

    menu.removeItem = function(idx) {
      menu.found.splice(idx,1);
    }

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (key) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
      .then(function (result) {
        var res = [];
        var items = result.data.menu_items;
        for (var i = 0; i < items.length; i++) {
          var des = items[i].description;
          if (des.toLowerCase().indexOf(key) !== -1) {
            res.push(items[i])
          }
        }
        return res;
      });
    };
  }

})();
