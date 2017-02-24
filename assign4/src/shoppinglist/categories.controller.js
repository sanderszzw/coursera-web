(function () {
'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);


  CategoriesController.$inject = ['cates'];
  function CategoriesController(cates) {
    this.cates = cates;
  }

})();
