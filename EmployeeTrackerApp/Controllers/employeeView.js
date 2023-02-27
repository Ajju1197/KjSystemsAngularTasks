EmployeeTrackerAppModule.controller('EmployeeViewController', function ( $scope, employeeListService,$uibModal) { 

    // Close Add Employee UibModal
    $scope.closeModal = function () {
      $scope.$dismiss();
  }


  // Edit Employee Method
  $scope.openEditEmployeeModal = function (employee) {
    var modalInstance = $uibModal.open({
      templateUrl: 'Views/EditEmployee.html',
      animation: true,
      controller: 'editEmployeeController',
      size: 'lg',
      resolve: {
        employee: function() {
          return angular.copy(employee);;
        }
      }
    })

    modalInstance.result.then(function(updatedEmployee) {
      employeeListService.updateData(updatedEmployee);
      $scope.employees = employeeListService.getData();
      $scope.$apply();
    });
    
}

  // Ng Style for background color
  $scope.getStyle = function(condition) {
    if (condition) {
        return {
            backgroundColor: '#0b1431',
            color: '#fff'
        };
    } else {
        return {
            backgroundColor: '#fff',
            color: '#000'
        };
    }
};


   // Getting Data for agGRid and View
  $scope.employeeListData = employeeListService.getData().map(function (employee, index) {
    employee.id = index + 1;
    return {
      id: employee.id,
      name: employee.name,
      gender: employee.gender,
      age: employee.age,
      dob:employee.dob,
      job_title: employee.job_title,
      department: employee.department,
      salary: employee.salary,
      image:employee.image
    };
   }); 

  // Delete Employee Data
  $scope.deleteEmployee = function(index) {
    $scope.employeeListData.splice(index, 1);
  };

  // Search employee Method
  $scope.searchEmployees = function() {
    if ($scope.searchString === '') {
      $scope.employeeListData = employeeListService.getData().map(function (employee, index) {
        employee.id = index + 1;
        return {
          id: employee.id,
          name: employee.name,
          gender: employee.gender,
          age: employee.age,
          dob:employee.dob,
          job_title: employee.job_title,
          department: employee.department,
          salary: employee.salary,
          image:employee.image
        };
      }); 
    } else {
      $scope.employeeListData = employeeListService.searchByName($scope.searchString);
    }
  };

})
