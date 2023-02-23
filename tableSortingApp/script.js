var app = angular.module('tableSortingModule', []);

app.controller('tableSortingCtrl', function($scope) {
  $scope.studentData = [
    {id: 3, name: 'Ramu'},
    {id: 5, name: 'Syed'},
    {id: 1, name: 'Ajmathulla'},
    {id: 7, name: 'Reventh'},
    {id: 10, name: 'Sai'},
    {id: 2, name: 'John'},
    {id: 6, name: 'Emma'},
    {id: 4, name: 'Harry'},
    {id: 8, name: 'Ron'},
    {id: 9, name: 'Harish'},
    {id: 11, name: 'Bhanu'}
  ];


  // Sorting the data
  $scope.sortBy = 'rollno';
  $scope.reverse = false;

  $scope.sort = function(sortBy) {
    if ($scope.sortBy == sortBy) {
      $scope.reverse = !$scope.reverse;
    } else {
      $scope.sortBy = sortBy;
      $scope.reverse = false;
    }
  };


  // Pagination
  $scope.currentPage = 0;
  $scope.pageSize = 5;
  $scope.pageList = [];

  for (var i=0; i<$scope.studentData.length; i+=$scope.pageSize) {
    $scope.pageList.push($scope.studentData.slice(i, i+$scope.pageSize));
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
