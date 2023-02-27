EmployeeTrackerAppModule.controller('AddEmployeeController', function ($scope, $location, employeeListService, $uibModalInstance) {

  // Image Upload method
  $scope.uploadImage = function (event) {
    var files = event.files;
    if (files && files.length) {
      var file = files[0];
      if (file.size <= 5000000) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.employeeModalData.image = e.target.result;
          $scope.$apply();
        };
        reader.readAsDataURL(file);
        $scope.alertMessage = false;
        $scope.employeeModalData.image = file.name;
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
    $scope.employeeModalData.image = "";
    document.getElementById("image").value = "";
  };

  // Date Select Age Update Method
  $scope.updateAge = function() {
    var ageDifference = Date.now() - new Date($scope.employeeModalData.dob);
    var ageDate = new Date(ageDifference);
    $scope.employeeModalData.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Only allow till present data to past dates
  $scope.$watch('employeeModalData.dob', function (newValue, oldValue) {
    var currentDate = new Date();
    if (newValue) {
      var dob = new Date(newValue);
      var age = currentDate.getFullYear() - dob.getFullYear();
      if (age > 100) {
        // alert("Age cannot be more than 100 years.");
        $scope.errorMessage = 'Age cannot be more than 100 years.'
      }
    } if (newValue > currentDate) {
      $scope.employeeModalData.dob = oldValue;
      // alert("Date of birth cannot be a future date.");
      $scope.errorMessage = 'Date of birth cannot be a future date.'

    }
  });

  //Input Value allow only numbers function
  $scope.numCheckInputField = function (event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  $scope.generateUniqueId = function () {
    return Math.random().toString(36).substr(2, 9);
  }

  $scope.employeeModalData = {
    id: "",
    name: "",
    age: "",
    dob: "",
    gender: "",
    job_title: "",
    department: "",
    salary: "",
    image: "assets/employee-svgrepo-com.svg",
  }

  // Submit method
  $scope.onSubmit = function () {
    $scope.errorMessage = '';
    if ($scope.employeeForm.$valid) {
      employeeListService.setData($scope.employeeModalData);
      $scope.employeeModalData = {
        id: "",
        name: "",
        age: "",
        dob: "",
        gender: "",
        job_title: "",
        department: "",
        salary: "",
        image: "assets/employee-svgrepo-com.svg",
      }
      $scope.employeeForm.$setPristine();
      $scope.employeeForm.$setUntouched();
      $scope.employeeModalData.image = "";
      $location.path('/employee-view-in-ag-grid')
    } else {
      if (!$scope.employeeModalData.name) {
        return $scope.errorMessage = 'Please Enter a name'
      }
      if (!$scope.employeeModalData.age) {
        return $scope.errorMessage = 'Please select age'
      }
      if (!$scope.employeeModalData.dob) {
        return $scope.errorMessage = 'Please select date of birth'
      }
      if (!$scope.employeeModalData.gender) {
        return $scope.errorMessage = 'Please select gender'
      }
      if (!$scope.employeeModalData.job_title) {
        return $scope.errorMessage = 'Please select job'
      }
      if (!$scope.employeeModalData.department) {
        return $scope.errorMessage = 'Please select department'
      }
      if (!$scope.employeeModalData.salary) {
        return $scope.errorMessage = 'Please choose salary'
      }
      if (!$scope.employeeModalData.image) {
        return $scope.errorMessage = 'Please upload image'
      }
    }
    $uibModalInstance.close();
  }

  // Hide Alert message
  $scope.hideAlertMessage = function () {
    $scope.errorMessage = false;
  }

  $scope.closeModal = function () {
    $uibModalInstance.close();
  }

  // Add Employee UibModal Open
  $scope.openAddEmployeeModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'Views/EmployeeAdd.html',
      animation: true,
      controller: function ($scope, $uibModalInstance) {
        $scope.closeModal = function () {
          $uibModalInstance.close();
        }
      },
      size: 'lg',
    })
  }

})