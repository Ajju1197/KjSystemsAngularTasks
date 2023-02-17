angular.module('dropDownModule', []).controller('dropDownController', function ($scope) {


  // Countries
  $scope.countries = ['India', 'USA', 'Canada']

  // States
  $scope.state = []
  $scope.selectedStates = function () {
    if ($scope.selectedCountry === 'India') {
      $scope.states = ['Andhra Pradesh', 'TamilNadu', 'Banguloor', 'Telangana']
    } else if ($scope.selectedCountry === 'USA') {
      $scope.states = ['California', 'New York', 'Texas'];
    } else if ($scope.selectedCountry === 'Canada') {
      $scope.states = ['Ontario', 'Quebec', 'Alberta'];
    }
  };


  // Villages
  $scope.villages = [];
  $scope.selectedVillages = function() {
    if ($scope.selectedState === 'Andhra Pradesh') {
      $scope.villages = ['Vijayawada', 'Guntur', 'Manglagiri'];
    } else if ($scope.selectedState === 'Karnataka') {
      $scope.villages = ['Bengaluru', 'Mysuru', 'Hubli'];
    } else if ($scope.selectedState === 'TamilNadu') {
      $scope.villages = ['Theni', 'Dindugal', 'Tiruneveli'];
    }
    
    else if ($scope.selectedState === 'California') {
      $scope.villages = ['Los Angeles', 'San Francisco', 'San Diego'];
    } else if ($scope.selectedState === 'New York') {
      $scope.villages = ['New York City', 'Buffalo', 'Albany'];
    } else if ($scope.selectedState === 'Texas') {
      $scope.villages = ['Houston', 'Austin', 'Dallas'];
    }
    
    else if ($scope.selectedState === 'Ontario') {
      $scope.villages = ['Toronto', 'Ottawa', 'Hamilton'];
    } else if ($scope.selectedState === 'Quebec') {
      $scope.villages = ['Montreal', 'Quebec City', 'Sherbrooke'];
    } else if ($scope.selectedState === 'Alberta') {
      $scope.villages = ['Calgary', 'Edmonton', 'Lethbridge'];
    }
  };

})