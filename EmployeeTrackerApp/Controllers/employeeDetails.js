EmployeeTrackerAppModule.controller('EmployeeDetailsController', function ($scope, $routeParams, employeeListService) {

  var employeeId = parseInt($routeParams.employeeId, 10);
  var employees = employeeListService.getData();
  $scope.employee = null;
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].id === employeeId) {
      $scope.employee = employees[i];
      break;
    }
  }
  
})