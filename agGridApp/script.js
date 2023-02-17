var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  $scope.data = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Doe'},
    {id: 3, name: 'Smith'},
    {id: 4, name: 'Harry'},
    {id: 5, name: 'Potter'},
    {id: 6, name: 'Emma'},
    {id: 7, name: 'Stone'},
    {id: 8, name: 'Ron'},
    {id: 9, name: 'Weasley'},
    {id: 10, name: 'Hermione'},
    {id: 11, name: 'Granger'}
  ];
  $scope.currentPage = 0;
  $scope.pageSize = 3;
  $scope.pageList = [];

  for (var i=0; i<$scope.data.length; i+=$scope.pageSize) {
    $scope.pageList.push($scope.data.slice(i, i+$scope.pageSize));
  }

  $scope.pagedData = $scope.pageList[$scope.currentPage];

  $scope.nextPage = function() {
    $scope.currentPage++;
    $scope.pagedData = $scope.pageList[$scope.currentPage];
  };

  $scope.prevPage = function() {
    $scope.currentPage--;
    $scope.pagedData = $scope.pageList[$scope.currentPage];
  };
});
