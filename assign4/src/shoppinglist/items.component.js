'use strict';

(function () {

  angular.module('MenuApp')
  .component('itemsList', {
    templateUrl: 'src/shoppinglist/templates/items.template.html',
    bindings: {
      items: '<'
    }
  });

})();
