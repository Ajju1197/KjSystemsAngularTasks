angular.module('secondApp', []).controller('secondTaskCtrl', ['$scope', function ($scope) {

  
  $scope.formData = {
    name: "",
    dob: "",
    gender: "",
    yesCheck: false,
    noCheck: false,
    noCheckReason:"",
  };
  
  $scope.showValidationAlert = function(fieldName) {
    if ($scope.secondForm[fieldName].$dirty && $scope.secondForm[fieldName].$invalid) {
      switch (fieldName) {
        case 'name':
            alert('Please enter your name.');
          break;
        case 'gender':
            alert('Please select your gender.');
          break;
        case 'dob':
            alert('Please enter a valid Date of birth.');
          break;
        case 'yesNoCheck':
            alert('You must select either Yes or No.');
          break;
        case 'noCheckReason':
          alert('Please Enter Reason for no willing');
          break;
      }
    }
  };
  

  // Storing data location
  $scope.formSubmittedData = [];
  
  // Only allow till present data to past dates 
  $scope.formData.dob = "";
  $scope.$watch('formData.dob', function(newValue, oldValue) {
    var currentDate = new Date();
    if (newValue > currentDate) {
      $scope.formData.dob = oldValue;
      alert("You can only select a date that is today or in the past.");
    }
  });

  // $scope.formValidationFun();


  // Yes or No checkboxes single selections
  $scope.yesCheckChanged = function () {
    $scope.formData.noCheck = false;
  }
  $scope.noCheckChanged = function () {
    $scope.formData.yesCheck = false;
  }


  // Submit form to get data
  $scope.onFormSubmit = function () {
    console.log($scope.secondForm);
    $scope.submitting = true;
    if ($scope.secondForm.$valid) {
      $scope.IsShowResult = true;
      $scope.formSubmittedData.push($scope.formData);
      $scope.submitting = false;
      $scope.formData = {
        name: "",
        dob: "",
        gender: "",
        yesCheck: false,
        noCheck: false,
        noCheckReason:"",
      };
      $scope.secondForm.$setPristine();
      $scope.secondForm.$setUntouched();
    } else {
      $scope.alertFunction()
    }
  };

  // Alert Function
  $scope.alertFunction = function () {
    if ($scope.secondForm.name.$touched && $scope.secondForm.name.$invalid) {
      alert('Please enter your name.');
    } else if ($scope.secondForm.gender.$touched && $scope.secondForm.gender.$invalid) {
      alert('Please select your gender.');
    } else if ($scope.secondForm.dob.$touched && $scope.secondForm.dob.$invalid) {
      alert('Please enter your date of birth.' );
    } else if ($scope.secondForm.yesNoCheck.$touched && $scope.secondForm.yesNoCheck.$invalid) {
      alert('Please You must select either Yes or No ')
    }
    alert("Please fill all the required fields.");
  }

}]);
