agGrid.initialiseAgGridWithAngular1(angular);
var EmployeeTrackerAppModule = angular.module('EmployeeTrackerAppModule', ['ngRoute', 'ui.bootstrap',"agGrid"]);
EmployeeTrackerAppModule.config(['$routeProvider',
function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'Views/EmployeeTrackerApp.html',
    controller: 'EmployeeTrackerAppController'
   })
    .when('/add-employee', {
    templateUrl: 'Views/EmployeeAdd.html',
    controller: 'AddEmployeeController'
    })
    .when('/edit-employee', {
      templateUrl: 'Views/EmployeeAdd.html',
      controller: 'AddEmployeeController'
    })
    .when('/employee-view-in-ag-grid', {
    templateUrl: 'Views/EmployeeViewInAgGrid.html',
    controller: 'EmployeeViewInAgGridController'
    })
    .when('/employee-view', {
      templateUrl: 'Views/EmployeeView.html',
      controller: 'EmployeeViewController'
    })
    .when('/employee-details/:employeeId', {
      templateUrl: 'Views/EmployeeDetails.html',
      controller:'EmployeeDetailsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}
]);
EmployeeTrackerAppModule.controller('EmployeeTrackerAppController', function ($scope,$location,$uibModal,employeeListService,$window,$anchorScroll) { 

  $scope.scrollTo = function(section) {
    $location.hash(section);
    $anchorScroll();
  };

  $scope.teamData = [
    {
      id:1,
      name: "Shanthi",
      job_title: "Angular Developer (Team Lead)",
      image: "./assets/team/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.jpg",
    },
    {
      id:2,
      name: "Sai Chandu",
      job_title: "Angular Developer",
      image: "./assets/team/bruce-mars-xj8qrWvuOEs-unsplash.jpg",
    },
    {
      id:3,
      name: "Revanth Sai",
      job_title: "Angular Developer",
      image: "./assets/team/kal-visuals-PFC2fY9LE_g-unsplash.jpg",
    },
    {
      id:4,
      name: "Syed Ajmathulla",
      job_title: "Angular Developer",
      image: "./assets/team/ali-morshedlou-WMD64tMfc4k-unsplash.jpg",
    }
  ]

  // Scroll to Top
    $scope.showScroll = false;
    angular.element($window).bind('scroll', function() {
      if (this.pageYOffset > 50) {
        $scope.showScroll = true;
        $scope.scrollClass = 'scroll-top'
      } else {
        $scope.showScroll = false;
        $scope.scrollClass = ''
      }
      $scope.$apply();
    });
  
    $scope.scrollTop = function() {
      $window.scrollTo(0, 0);
  };
  
  // Go Back Function
  $scope.goBack = function () {
    $window.history.back();
  };


  // Hide Alert message
  $scope.hideAlertMessage = function () {
    $scope.errorMessage = false;
  }
  
  // Add Employee UibModal Open
  $scope.openAddEmployeeModal = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'Views/EmployeeAdd.html',
      controller:'AddEmployeeController',
      animation: true,
      size: 'lg',
    })
  }
})


