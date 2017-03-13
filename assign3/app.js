'use strict';

(function () {
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', foundItems);

  // customized directive
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
    // no directive controller function yet
  }

  // NarrowItDownController has two functions:
  // find() function will call MenuSearchService.getMatchedMenuItems to
  // fetch the matched items; removeItem() function will call
  // MenuSearchService.removeItem(index) to remove a specific item in the list
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.key = '';
    menu.found = [];
    menu.message = ''

    menu.find = function() {
      var promise = MenuSearchService.getMatchedMenuItems(menu.key);
      promise.then(function(response) {
        menu.found = response;
        menu.found = MenuSearchService.getItems();

        if (menu.found.length === 0) {
          menu.message = 'Nothing found';
        } else {
          menu.message = '';
        }
      })
      .catch(function(error) {
        console.log('Error');
      });
    };

    menu.removeItem = function(idx) {
      MenuSearchService.removeItem(idx);
    }

  }

  // MenuSearchService provide interface to get matched items; remove a
  // specific item given an index;
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var res = []

    service.getItems = function() {
      return res;
    }

    service.removeItem = function(index) {
      res.splice(index, 1);
    }

    service.getMatchedMenuItems = function (key) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      })
      .then(function (result) {
        res = [];
        if (key.length === 0) {
          return
        }
        var items = result.data.menu_items;
        for (var i = 0; i < items.length; i++) {
          var des = items[i].description;
          if (des.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
            res.push(items[i])
          }
        }
      });
    };
  }

})();
