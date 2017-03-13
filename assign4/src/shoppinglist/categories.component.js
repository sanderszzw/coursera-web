'use strict';

(function () {

  angular.module('MenuApp')
  .component('categoriesList', {
    templateUrl: 'src/shoppinglist/templates/categories.template.html',
    bindings: {
      cates: '<'
    }
  });

})();
