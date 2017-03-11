'use strict';

(function () {

  angular.module('public')
  .service('UserService', UserService);

  UserService.$inject = ['$http', 'ApiPath'];
  function UserService($http, ApiPath) {
    var service = this;
    var info = {};
    var favDish = {};

    service.getUserInfo = function () {
      return info;
    };

    service.getUserDish = function () {
      return favDish;
    };

    service.setUserInfo = function (input) {
      info = input;
    };

    service.searchUserFavorite = function (shortName) {
      var res = $http({
        method: 'GET',
        url: (ApiPath + '/menu_items/' + shortName + '.json')
      });
      res.then(function (res) {
        favDish = res.data; //save user's fav dish
      });
      return res;
    };
  }

})();
