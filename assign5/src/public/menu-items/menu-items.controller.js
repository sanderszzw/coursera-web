'use strict';

(function () {

  angular.module('public')
  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['menuItems'];
  function MenuItemsController(menuItems) {
    var $ctrl = this;
    this.test = 'menuitems test';
    $ctrl.menuItems = menuItems;
  }

})();
