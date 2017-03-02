'use strict';

(function () {

  angular.module('public')
  .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserService','$scope'];
  function RegisterController(UserService, $scope) {
    var reg = this;
    reg.user = {};
    reg.message = '';
    reg.checkDishMessage = '';
    reg.dishValid = false;

    //retrive registered user
    reg.registeredUser = UserService.getUserInfo();
    if (reg.registeredUser.username) {
      reg.favItem = UserService.getUserDish();
    }

    reg.checkDish = function () {
      return UserService.searchUserFavorite(reg.user.favorite).then(function (res) {
        reg.checkDishMessage = 'Item found';
        reg.dishValid = true;
        return true;
      }).catch(function(err) {
        reg.checkDishMessage = 'No such menu number exists.';
        reg.dishValid = false;
        return false;
      });
    };

    //style 1
    // reg.submit = function () {
    //   reg.completed = true;
    //   if (reg.dishValid) {
    //     reg.message = 'Your information has been saved.';
    //     UserService.setUserInfo(reg.user);
    //   } else {
    //     reg.message = 'Invalid information';
    //   }
    // }

    //style 2, which one is better?
    reg.submit = function () {
      reg.completed = true;
      reg.checkDish().then(function (res) {
        if (res) {
          reg.message = 'Your information has been saved.';
          UserService.setUserInfo(reg.user);
        } else {
          reg.message = 'Invalid information';
        }
      });
    };
  }

})();
