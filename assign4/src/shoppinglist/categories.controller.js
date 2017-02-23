(function () {
'use strict';

  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);


  CategoriesController.$inject = ['cates'];
  function CategoriesController(cates) {
    this.cates = cates;

    this.test = function(shortName) {
      console.log('test cate click cate: ', shortName);
    }
  }

})();
