"use strict";

(function () {


  angular.module('public')
  .service('userService', userService);


  userService.$inject = ['$http', 'ApiPath'];
  function userService($http, ApiPath) {
    var info = {}

    var service = this;

    service.getUserInfo = function () {
      return info;
    }

    service.setUserInfo = function (input) {
      info = input;
    }

    service.searchUserFavorite = function (shortName) {
      console.log(shortName, ApiPath + '/menu_items/'+ shortName + '.json');
      return $http({
        method: "GET",
        url: (ApiPath + '/menu_items/' + shortName + '.json')
      });
      //then
    };
  }

})();
