'use strict';

(function () {

  angular.module('public')
  .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserService'];
  function RegisterController(UserService) {
    var reg = this;
    reg.user = {};
    reg.message = '';
    reg.checkDishMessage = '';
    reg.dishValid = false;

    reg.test1 = function () {
      return 'test1';
    };
    //retrive registered user
    reg.registeredUser = UserService.getUserInfo();
    if (reg.registeredUser.username) {
      reg.favItem = UserService.getUserDish();
    }

    reg.checkDish = function () {
      var res = UserService.searchUserFavorite(reg.user.favorite);
      res.then(function (res) {
        reg.checkDishMessage = 'Item found';
        reg.dishValid = true;
        return true;
      }).catch(function(err) {
        reg.checkDishMessage = 'No such menu number exists.';
        reg.dishValid = false;
        return false;
      });
      return res;
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
