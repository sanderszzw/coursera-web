'use strict';

(function () {

  angular.module('public')
  .component('userDish', {
    templateUrl: 'src/public/menu-item/menu-item.html',
    bindings: {
      menuItem: '<'
    },
    controller: UserDishController
  });


  UserDishController.$inject = ['ApiPath'];
  function UserDishController(ApiPath) {
    this.basePath = ApiPath;
  }

})();
