'use strict';

(function() {

  angular.module('LunchCheck',[])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.lunch = {};
    $scope.lunch.inputString = '';
    $scope.lunch.notification = '';
    $scope.lunch.inputType = '';

    // function to perform item check. If input is empty string, promp user
    // to give the input. If the number of input items is larger or equal
    // to 3, show 'Enjoy!', otherwise show 'Too much!'.
    $scope.performCheck = function() {
      if (!$scope.lunch.inputString) {
        $scope.lunch.notification = 'Please enter data first';
        $scope.lunch.inputType = "invalid";
      } else {
        $scope.lunch.inputType = "valid";
        var itemArray = $scope.lunch.inputString.split(',');

        // count valid items
        var numberOfValidItems = 0;
        for (var i = 0; i < itemArray.length; i++) {
          if (itemArray[i].trim().length != 0) {
            numberOfValidItems += 1;
          }
        }

        // output message
        if (numberOfValidItems <= 3) {
          $scope.lunch.notification = 'Enjoy!';
        } else {
          $scope.lunch.notification = 'Too much!';
        }
      }
    }
  }

})();
