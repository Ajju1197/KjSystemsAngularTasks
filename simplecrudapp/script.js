var app = angular.module('MyApp', []);
app.controller("Book", function ($scope) {
  $scope.items = [];
  $scope.addItem = function (item) {
    $scope.items.push(item);
    $scope.item = {};
  },
    
    $scope.removeItem = function (index) {
      console.log(index); $scope.items.splice(index, 1)
    },

    $scope.editItem = function (index) {
      $scope.items.indexOf(index);
    }
});