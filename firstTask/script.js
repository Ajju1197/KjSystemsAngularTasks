angular.module('firstApp', []).controller('firstTaskCtrl', ['$scope', function ($scope) {
  // ===================================== First Task =========================================//
  $scope.items = [];
  $scope.title = 'AngularJs Tasks';
  $scope.firstNum = '';
  $scope.secondNum = '';

  //Input Value allow only numbers function
  $scope.checkInputField = function (event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };
  // Multiply the two input fields values.
  $scope.onMultiplication = function (a, b) {
    $scope.IsShowResult = true;
    $scope.items.push({
      first: $scope.firstNum,
      second: $scope.secondNum,
    })
    return $scope.finalResult = a / (1 / b)
  };

  // OnClear Function
  $scope.onClear = function () {
    $scope.firstNum = '';
    $scope.secondNum = '';
  };
}])