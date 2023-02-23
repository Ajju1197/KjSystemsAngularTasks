agGrid.initialiseAgGridWithAngular1(angular)
var app = angular.module("studentListGroupingModule", ["agGrid"]);

app.controller("studentListGroupingCtrl", function ($scope) {
  
  // Students Data
  $scope.studentsData = {
    "students": [
      {
        "id": 1,
        "name": "John Smith",
        "age": 22,
        "gender": "Male",
        "major": "Computer Science",
        "GPA": 3.5
      },
      {
        "id": 2,
        "name": "Jane Doe",
        "age": 21,
        "gender": "Female",
        "major": "Engineering",
        "GPA": 3.8
      },
      {
        "id": 3,
        "name": "Bob Johnson",
        "age": 23,
        "gender": "Male",
        "major": "Business",
        "GPA": 3.2
      },
      {
        "id": 4,
        "name": "Sara Lee",
        "age": 20,
        "gender": "Female",
        "major": "Psychology",
        "GPA": 3.6
      },
      {
        "id": 5,
        "name": "David Kim",
        "age": 22,
        "gender": "Male",
        "major": "Biology",
        "GPA": 3.7
      }
    ]
  };
  

  //  Ag Grid gridOptions
  var gridOptions = {
    columnDefs: [
      {
        field: "name",
        rowGroup: true,
      },
      {
        field: "id",
        rowGroup: true,
      },
      { field: "age" },
      { field: "gender" },
      { field: "major" },
      { field: "GPA" }
    ],
    autoGroupColumnDef: {
      headerName: "Student Group",
      minWidth: 300,
      cellRendererParams: {
          suppressCount: true
      }
    },

    // Getting row Data
    rowData: $scope.studentsData.students,
    
    // showRowGroup: false,
    animateRows: true,
    groupDefaultExpanded: 2,
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    onGridReady: function(params) {
      params.api.sizeColumnsToFit();
    },
  };

  
// initialize ag-Grid
var gridDiv = document.querySelector('#agGridGrouping');
new agGrid.Grid(gridDiv, gridOptions);

});
