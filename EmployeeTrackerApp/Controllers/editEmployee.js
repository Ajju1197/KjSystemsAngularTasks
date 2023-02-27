EmployeeTrackerAppModule.controller('editEmployeeController', function ($scope, $uibModalInstance, employee, $location) {
  // Set the initial values of the edit form to the employee's current values
  $scope.employee = employee;

  // Image Upload method
  $scope.uploadImage = function (event) {
    var files = event.files;
    if (files && files.length) {
      var file = files[0];
      if (file.size <= 5000000) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.employee.image = e.target.result;
          $scope.$apply();
        };
        reader.readAsDataURL(file);
        $scope.alertMessage = false;
        $scope.employee.image = file.name;
      } else {
        $scope.image = "";
        document.getElementById("image").value = "";
        $scope.errorMessage = 'Please upload an image that is smaller than 5MB.'
        $scope.$apply();
      }
    }
  };

  // Image Clear Method
  $scope.clearImage = function () {
    $scope.employee.image = "";
    document.getElementById("image").value = "";
  };

    // Date Select Age Update Method
    $scope.updateAge = function() {
      var ageDifference = Date.now() - new Date($scope.employee.dob);
      var ageDate = new Date(ageDifference);
      $scope.employee.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  
   // Only allow till present data to past dates
   $scope.$watch('employee.dob', function (newValue, oldValue) {
    var currentDate = new Date();
    if (newValue) {
      var dob = new Date(newValue);
      var age = currentDate.getFullYear() - dob.getFullYear();
      if (age > 100) {
        // alert("Age cannot be more than 100 years.");
        $scope.errorMessage = 'Age cannot be more than 100 years.'
      }
    } if (newValue > currentDate) {
      $scope.employee.dob = oldValue;
      // alert("Date of birth cannot be a future date.");
      $scope.errorMessage = 'Date of birth cannot be a future date.'

    }
  });

  // Submit method
  $scope.updateEmployee = function () {
    $scope.errorMessage = '';
    if ($scope.employeeForm.$valid) {
      $location.path('/employee-view-in-ag-grid')
      $uibModalInstance.close($scope.employee);
      $scope.$apply();
    } else {
      if (!$scope.employee.name) {
        return $scope.errorMessage = 'Please Enter a name'
      }
      if (!$scope.employee.age) {
        return $scope.errorMessage = 'Please select age'
      }
      if (!$scope.employee.dob) {
        return $scope.errorMessage = 'Please select date of birth'
      }
      if (!$scope.employee.gender) {
        return $scope.errorMessage = 'Please select gender'
      }
      if (!$scope.employee.job_title) {
        return $scope.errorMessage = 'Please select job'
      }
      if (!$scope.employee.department) {
        return $scope.errorMessage = 'Please select department'
      }
      if (!$scope.employee.salary) {
        return $scope.errorMessage = 'Please choose salary'
      }
      if (!$scope.employee.image) {
        return $scope.errorMessage = 'Please upload image'
      }
    }
    $uibModalInstance.close();
  }

  // Define the cancel function to dismiss the modal dialog without saving
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});