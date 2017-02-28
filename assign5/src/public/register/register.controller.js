(function () {
"use strict";

angular.module('public')
.controller('RegisterController', RegisterController);

RegisterController.$inject = ['userService'];
function RegisterController(userService) {
  var reg = this;


  reg.submit = function () {
    var favorite;
    userService.searchUserFavorite(reg.user.favorite)
    .then(function (res) {
      console.log('serch: ', res);
      favorite = res;
    })
    .catch(function(err) {
      console.log('err', err);
    });
  }
}

})();
