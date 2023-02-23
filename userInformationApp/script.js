agGrid.initialiseAgGridWithAngular1(angular);
var app = angular.module("routesApp", ['ngRoute', 'ui.bootstrap',"agGrid"]);
app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'clickonleftnav.html',
      controller: 'clickonleftnavController'
    })
      .when('/personFormUrl', {
      templateUrl: 'personform.html',
      controller: 'personFormController'
    })
      .when('/personInfoUrl', {
        templateUrl: 'personinfo.html',
        controller: 'personInfoController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
app.service('userInfoService', function () {
  this.data = [];

  this.getData = function () {
    return this.data
  }
  this.setData = function (newData) {
    this.data.push(newData)
  }
});
app.controller('mainController', function ($scope,$location) {
  $scope.isActive = function(route) {
    return route === $location.path();
  };
})
app.controller('personFormController', function ($scope,userInfoService,$location,$uibModal,$timeout) {
  $scope.personFormData = {
    name: "",
    dob: "", 
    gender: "",
    image:"",
    yesCheck: false,
    noCheck: false,
    noCheckReason:"",
  }

  // Only allow till present data to past dates
  $scope.$watch('personFormData.dob', function(newValue, oldValue) {
    var currentDate = new Date();
    if (newValue) {
      var dob = new Date(newValue);
      var age = currentDate.getFullYear() - dob.getFullYear();
      if (age > 100) {
        // alert("Age cannot be more than 100 years.");
        $scope.errorMessage = 'Age cannot be more than 100 years.'
      }
    } if (newValue > currentDate) {
      $scope.personFormData.dob = oldValue;
      // alert("Date of birth cannot be a future date.");
      $scope.errorMessage = 'Date of birth cannot be a future date.'
      
    }
  });

  // Single Check Function
  $scope.yesCheckChanged = function () {
    $scope.personFormData.noCheck = false
  }
  $scope.noCheckChanged = function () {
    $scope.personFormData.yesCheck = false
  }

  // Image Upload method
  $scope.uploadImage = function(event) {
    var files = event.files;
    if (files && files.length) {
      var file = files[0];
      if (file.size <= 5000000) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.personFormData.image = e.target.result;
          $scope.$apply();
        };
        reader.readAsDataURL(file);
        $scope.alertMessage = false;
        $scope.personFormData.image = file.name;
      } else {
        $scope.image = "";
        document.getElementById("image").value = "";
        $scope.errorMessage = 'Please upload an image that is smaller than 5MB.'
        $scope.$apply();
      }
    }
  };

  // Image Clear Method
  $scope.clearImage = function() {
    $scope.personFormData.image = "";
    document.getElementById("image").value = "";
  };
  
  // Submit method
  $scope.onSubmit = function () {
    $scope.errorMessage = '';
    if ($scope.personForm.$valid) {
      $scope.isShown = true;
      userInfoService.setData($scope.personFormData);
      $scope.personFormData = {
        name: "",
        dob: "",
        gender: "",
        personProfile:"",
        yesCheck: false,
        noCheck: false,
        noCheckReason:"",
      }
      $scope.personForm.$setPristine();
      $scope.personForm.$setUntouched();
      $scope.image = "";
      document.getElementById("image").value = "";
      $location.path('/personInfoUrl')
      // alert('Form will be Submitted Successfully')
    } else {
      if (!$scope.personFormData.name) {
        return $scope.errorMessage = 'Please Enter a name'
      }
      if (!$scope.personFormData.dob) {
        return $scope.errorMessage = 'Please enter a date of birth'
      }
      if (!$scope.personFormData.gender) {
        return $scope.errorMessage = 'Please select gender'
      }
      if (!$scope.personFormData.noCheck && !$scope.personFormData.yesCheck) {
        return $scope.errorMessage = 'Please You must select either Yes or No'
      }
      if (!$scope.personFormData.noCheckReason) {
        return $scope.errorMessage = 'Please Enter Reason for no willing'
      }
      if (!$scope.personFormData.image) {
        return $scope.errorMessage = 'Please Choose Profile of person'
      }
    }
  }
    // Hide Alert message
    $scope.hideAlertMessage = function () {
      $scope.errorMessage = false;
    }
  
  $scope.modalClose = function () {
    $scope.$dismiss();
  }
})
app.controller('personInfoController', function ($scope, userInfoService, $uibModal) {
  // Getting Data for table
  $scope.tableInfoData = userInfoService.getData();
  console.log($scope.tableInfoData);

  // Getting Data for agGRid
  $scope.personInfoData = userInfoService.getData().map(function (user, index) {
    user.serialNo = index + 1;
    return {
      sno: user.serialNo,
      name: user.name,
      dob: user.dob,
      gender: user.gender,
      willingToJOin: user.yesCheck ? 'Yes' : 'No',
      noWillingReason: user.noCheck ? user.noCheckReason : '',
      PersonProfile: user.image,
    };
  });
  console.log($scope.personInfoData);

  // Pagination Code
  $scope.currentPage = 0;
  $scope.pageSize = 10;
  $scope.pageList = [];

  $scope.showTableInfo = false;

  $scope.toggleInfo = function() {
    $scope.showTableInfo = !$scope.showTableInfo;
  };
    
  for (var i=0; i<$scope.tableInfoData.length; i+=$scope.pageSize) {
    $scope.pageList.push($scope.tableInfoData.slice(i, i+$scope.pageSize));
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

  $scope.getTableRowCount = function() {
    return $scope.tableInfoData.length;
  };

  $scope.getTablePageCount = function() {
    return $scope.pageList.length;
  };
  

  // Ag Grid Columns
  var columnDefs = [
    {
      headerName: "Sl No",
      field: "sno",
    },
    {
      headerName: "Name",
      field: "name",
      // tooltipField:"Name"
    },
    {
      headerName: "Dob",
      field: "dob"
    },
    {
      headerName: "Gender",
      field: "gender"
    },
    {
      headerName: "Willing To join",
      field: "willingToJOin"
    },
    {
      headerName: "No Willing Reason",
      field: "noWillingReason"
    },
    {
      headerName: 'Person Profile',
      field: 'PersonProfile',
    }
  ];

  $scope.gridOptions = {
    columnDefs: columnDefs,
      defaultColDef: {
        resizable: true,
        editable: true,
        suppressMenu: true,
        lockPosition: true,
        sortable:true,
    },
    rowData: $scope.personInfoData,
    // pagination: true,
    // paginationPageSize: 10,
    // paginationNumberFormatter: function(params) {
    //   return "[" + params.value.toLocaleString() + "]";
    // },
    enableSorting: true,
    enableColResize: true,
    onGridReady: function(event) {
    sizeToFit()
    },
  };
  function sizeToFit() {
    manual = false;
    $scope.gridOptions.api.sizeColumnsToFit();
  }

  $scope.openModel = function (person) {
    var modalInstance = $uibModal.open({
      templateUrl: 'personform.html',
      controller: 'personFormController',
      size: 'lg',
      resolve: {
        personInfoData: function () {
          return person
        }
      }
    })
  }
})
app.controller('clickonleftnavController', function ($scope,) {
  $scope.title = 'Please Click on left nav'
})