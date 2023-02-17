var app = angular.module("myApp", ["ui.router,","ui.bootstrap"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "home.html"
    })
    .state("userform", {
      url: "/userform",
      templateUrl: "userform.html",
      controller: "FormController"
    })
    .state("userdata", {
      url: "/userdata",
      templateUrl: "userdata.html",
      controller: "DataController",
      params: {
        formData: null
      }
    });
});

app.controller("mainController", function ($scope) {
  $scope.title = 'Please Click on left nav'
})

app.controller("FormController", function ($scope, $state) {
  
  $scope.formData = {
    name: "",
    dob: "", 
    gender: "",
    yesCheck: false,
    noCheck: false,
    noCheckReason:"",
  };

   // Only allow till present data to past dates
   $scope.$watch('formData.dob', function(newValue, oldValue) {
    var currentDate = new Date();
    if (newValue) {
      var dob = new Date(newValue);
      var age = currentDate.getFullYear() - dob.getFullYear();
      if (age > 100) {
        alert("Age cannot be more than 100 years.");
      }
    } if (newValue > currentDate) {
      $scope.formData.dob = oldValue;
        alert("Date of birth cannot be a future date.");
    }
  });

    // Single Check Function
    $scope.yesCheckChanged = function () {
      $scope.formData.noCheck = false
    }
    $scope.noCheckChanged = function () {
      $scope.formData.yesCheck = false
    }


  $scope.submitForm = function () {
    if ($scope.personForm.$valid) {
      $state.go("userdata", { formData: $scope.formData });
      $scope.formData = {
        name: "",
        dob: "", 
        gender: "",
        yesCheck: false,
        noCheck: false,
        noCheckReason:"",
      };
      alert('Form will be Submitted Successfully')
    } else {
      if (!$scope.formData.name) {
        return alert('Please enter a name')
      }
      if (!$scope.formData.dob) {
        return alert('Please enter a date of birth')
      }
      if (!$scope.formData.gender) {
        return alert('Please select gender')
      }
      if (!$scope.formData.noCheck && !$scope.formData.yesCheck) {
        return alert('Please You must select either Yes or No')
      }
      if (!$scope.formData.noCheckReason) {
        return alert('Please Enter Reason for no willing')
      }
    }
  };
});

app.controller("DataController", function($scope, $stateParams,$uibModal) {
  $scope.formData = $stateParams.formData;
  $scope.openModel = function () {
    $uibModal.open({
      templateUrl: 'userform.html',
      controller: 'FormController',
      size:'lg'
    })
  }
});
