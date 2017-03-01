"use strict";

(function () {


  angular.module('public')
  .service('userService', userService);


  userService.$inject = ['$http', 'ApiPath'];
  function userService($http, ApiPath) {
    var info = {};
    var favDish = {};
    var service = this;

    service.getUserInfo = function () {
      return info;
    };

    service.getUserDish = function () {
      console.log(favDish);
      return favDish;
    };

    service.setUserInfo = function (input) {
      info = input;
    };

    service.searchUserFavorite = function (shortName) {
      return $http({
        method: "GET",
        url: (ApiPath + '/menu_items/' + shortName + '.json')
      })
      .then(function (res) {
        //save user's fav dish
        favDish = res.data;
      });
    };
  }

})();
