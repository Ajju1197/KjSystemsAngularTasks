var myApp = angular.module('secondAppModule', [])
.controller('secondTaskController', function () {
  var vm = this
  vm.formData = {
    name: "",
    dob: "",
    gender: "",
    yesCheck: false,
    noCheck: false,
    noCheckReason: "",
  };
  

  // Only allow till present data to past dates 
  // vm.$watch('formData.dob', function(newValue, oldValue) {
  //   var currentDate = new Date();
  //   if (newValue) {
  //     var dob = new Date(newValue);
  //     var age = currentDate.getFullYear() - dob.getFullYear();
  //     if (age > 100) {
  //       window.alert("Age cannot be more than 100 years.");
  //     }
  //   } if (newValue > currentDate) {
  //     $scope.formData.dob = oldValue;
  //     window.alert("Date of birth cannot be a future date.");
  //   }
  // });

  // vm.dobCalc = function () {
    
  //   if (new Date(vm.formData.dob) > new Date()) {
  //     alert('Invalid Date');
  //     return;
  //   }
  //   // calculate age based on dob
  //   var dob = new Date(vm.formData.dob);
  //   var age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  //   age = Math.floor(age);
  //   // check if age is more than 100 years
  //   if (age > 100) {
  //     alert('Invalid Age');
  //     return;
  //   }
  // }

  // Yes or No checkboxes single selections
  vm.yesCheckChanged = function () {
    vm.formData.noCheck = false;
  }
  vm.noCheckChanged = function () {
    vm.formData.yesCheck = false;
  }


  // Storing data location
  vm.formSubmittedData = [];
  
  // Submit form to get data
  vm.onFormSubmit = function () {
    if (vm.secondForm.$valid) {
      vm.IsShowResult = true;
      vm.formSubmittedData.push(vm.formData);
      vm.formData = {
        name: "",
        dob: "",
        gender: "",
        yesCheck: false,
        noCheck: false,
        noCheckReason: "",
      };
      vm.secondForm.$setPristine();
      vm.secondForm.$setUntouched();
      alert('Form will be Submitted Successfully')
    } else {
      vm.alertFunction()
    }
  };

  // Alert Function
  vm.alertFunction = function () {
    if (!vm.formData.name) {
      return alert('Please enter your name.');
    }
    if (!vm.formData.gender) {
      return alert('Please select your gender.');
    }
    if (!vm.formData.dob) {
      return alert('Please enter your date of birth.');
    }
    if (!vm.formData.yesCheck && !vm.formData.noCheck) {
      return alert('Please You must select either Yes or No ')
    }
    if (!vm.formData.noCheckReason) {
      return alert('Please Enter Reason for no willing')
    }
  }
})
.controller('personInformationController',function ($scope) {
  var personInfoCtrlVm = this
  // personInfoCtrlVm.formSubmittedData = $scope.$parent.vm.formData;
})
