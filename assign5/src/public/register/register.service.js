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

			return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function (response) {
				favDish = response.data;
				return response.data;
			});

    };
  }

})();
