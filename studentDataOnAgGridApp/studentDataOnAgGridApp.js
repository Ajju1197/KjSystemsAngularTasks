agGrid.initialiseAgGridWithAngular1(angular);
var studentDataOnAgGridAppModule = angular.module('studentDataOnAgGridAppModule', ['agGrid']);
studentDataOnAgGridAppModule.controller('studentDataOnAgGridAppCtrl', function ($scope) {

  // Student Information
  $scope.studentInfo = [
    {
      studentId:1,
      studentName: 'Mandana', 
      class: 5, 
      age: 10, 
      grade: 'A'
    },
    {
      studentId:2,
      studentName: 'Revanth', 
      class: 8, 
      age: 13, 
      grade: 'B'
    },
    {
      studentId:3,
      studentName: 'Chandu', 
      class: 2, 
      age: 7, 
      grade: 'C'
    },
    {
      studentId:4,
      studentName: 'Santhi', 
      class: 10, 
      age: 11, 
      grade: 'A'
    },
    {
      studentId:5,
      studentName: 'Gopal', 
      class: 6, 
      age: 11, 
      grade: 'A'
    },
    {
      studentId:6,
      studentName: 'Syed', 
      class: 10, 
      age: 8, 
      grade: 'B'
    },
    {
      studentId:7,
      studentName: 'Ajmath', 
      class: 4, 
      age: 8, 
      grade: 'A'
    },
    {
      studentId:8,
      studentName: 'Preethi', 
      class: 7, 
      age: 8, 
      grade: 'C'
    },
    {
      studentId:9,
      studentName: 'Kousal', 
      class: 3, 
      age: 8, 
      grade: 'A'
    },
    {
      studentId:10,
      studentName: 'Varma', 
      class: 1, 
      age: 8, 
      grade: 'C'
    },
  ];

  // Dropdown Class Info Options
  $scope.classInfoOptions = [
    'All',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 10'
  ];


  // filtering the studentInfo with $watch function
  // Note : the function watches for changes to the selectStudentInfo variable, filters the studentInfo array based on the selected class, and updates the displayed data in the ag-grid.
  $scope.$watch('selectStudentInfo', function (newValue, oldValue) {
    let filterData = $scope.studentInfo;
    if (newValue !== 'All') {
      filterData = $scope.studentInfo.filter(function (student) {
        return 'Class ' + student.class === newValue;
      });
    }
    studentInfoGridOptions.api.setRowData(filterData)
  })
  


  // Ag Grid Student Info Grid options
  var studentInfoGridOptions = {
    columnDefs: [
      {
        field:'studentId',
        headerName:'Student Id',
        width: 60,
      },
      {
        field: 'studentName', 
        headerName: 'Student Name'
      },
      {
        field: 'class', 
        headerName: 'Class',
        width: 50
      },
      {
        field: 'age', 
        headerName: 'Age',
        width: 50
      },
      {
        field: 'grade', 
        headerName: 'Grade' ,
        width: 50
      }
    ],
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    animateRows:true,
    onGridReady: function(params) {
      params.api.sizeColumnsToFit();
    },
  };

  // initializing the ag-Grid
  var gridDiv = document.getElementById('studentInfoAgGrid');
  new agGrid.Grid(gridDiv, studentInfoGridOptions);
  
  
})