'use strict';

// assign2
(function() {
  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    // ToBuyController controls the behavior of the 'to buy' list
    // Functionalities include 'add item to the list','remove item from the list',
    // and 'mark item as bought and remove it from the to-buy list into bought list'
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var list = this;
      list.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
      list.itemName = "";
      list.itemQuantity = "";
      list.bought = function (index) {
        ShoppingListCheckOffService.bought(index);
      }
      list.addItem = function () {
        ShoppingListCheckOffService.addItem(list.itemName, list.itemQuantity);
      };
      list.removeItem = function (itemIndex) {
        ShoppingListCheckOffService.removetoBuyItem(itemIndex);
      };
    }


    // AlreadyBoughtController controls the behavior of the 'bought' list
    // Only function is by far is to show the items in the 'bought' list
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var list = this;
      list.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }



    // ShoppingListCheckOffService is used as a singleton service
    // to provide the interface for the controllers. ShoppingListCheckOffService
    // stores both 'to buy list' and 'bought list'
    function ShoppingListCheckOffService() {
      var service = this;
      var toBuyItems = [];
      var boughtItems = [];

      service.addItem = function (itemName, quantity) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        toBuyItems.push(item);
      };

      // tests
      service.addItem('Diet Coke',2)
      service.addItem('Orange',3)
      service.addItem('Cookie',2)
      service.addItem('Beer',10)
      service.addItem('Milk',2)

      // remove items from 'to buy list'
      service.removetoBuyItem = function (itemIdex) {
        toBuyItems.splice(itemIdex, 1);
      };

      service.getToBuyItems = function () {
        return toBuyItems;
      };
      service.getBoughtItems = function () {
        return boughtItems;
      };

      // transfer item from 'to buy list' to 'bought list'
      service.bought = function(itemIdex) {
        boughtItems.push(toBuyItems[itemIdex]);
        toBuyItems.splice(itemIdex, 1);
      }
    }
})();
