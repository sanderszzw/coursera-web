'use strict';
describe('Shoppinglist register tests', function () {
  describe("Register Controller Test", function() {

    var $controller;
    var RegisterController;
    var UserServiceMock;
    var userMockObj2;
    var userMockObj;

    beforeEach(function() {
      module('public');
      inject(function ($injector) {
        $controller = $injector.get('$controller');

        userMockObj = {
          username:'mockName',
          favDish: 'Noodle'
        };

        userMockObj2 = {
          username:'mockName2',
          favDish: 'Noodle'
        };

        UserServiceMock = {};
        UserServiceMock.getUserInfo = function () {
          return userMockObj;
        };
        UserServiceMock.getUserDish = function () {
          return userMockObj.favDish;
        }

        RegisterController =
          $controller('RegisterController',
                      {UserService: UserServiceMock});
      });
    });


    it('favItem should be Noodle', function () {
      userMockObj2 = {};
      expect(RegisterController.favItem).toBe('Noodle');
    });

    it("should print test1", function() {
      var tmp = RegisterController.test1();
      expect(tmp).toBe('test1');
    });
  });



  ////////////////////////////////////////////////////////////

  describe('UserService test', function() {
    var UserService;
    var $httpBackend;
    var ApiPath;

    beforeEach(function () {
      module('public');
      inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');
      });
    });
    it('should respond to user service', function () {
      var favoriteMock = 'A1'
      var addr = ApiPath + '/menu_items/'+ favoriteMock + '.json'
      $httpBackend.whenGET(addr).respond(['searchUserFavorite']);
      UserService.searchUserFavorite(favoriteMock).then(function (res) {
        // console.log(res);
        expect(res).toEqual(['searchUserFavorite']);
      });
      $httpBackend.flush();
    });
  });
});
