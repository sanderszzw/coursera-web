'use strict';

(function () {

  angular.module('public')
  .component('menuCategory', {
    templateUrl: 'src/public/menu-category/menu-category.html',
    bindings: {
      category: '<'
    }
  });

})();
