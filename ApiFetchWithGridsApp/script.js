agGrid.initialiseAgGridWithAngular1(angular);
var app = angular.module('usersApiFetchModule', ["agGrid","kendo.directives"]);

app.controller('UserController', function ($scope, $http) {
  $scope.selectGrid = {
    grid: "",
  }

  

  // Api Fetching With $http and get method
  $http.get("https://jsonplaceholder.typicode.com/photos")
    .then(function (response) {
      $scope.gridData = response.data;      

      // Kendo Grid
      $scope.kendoGridOptions = {
        dataSource: {
          data: $scope.gridData,
        },
        columns: [
          {
            field: "id",
            title: "ID",
            width:"50px"
          },
          {
            field: "title",
            title: "Title"
          },
          {
            field: "albumId",
            title: "Album",
            width:"100px"
          },
          {
            field: "url",
            title: "URL"
          },
          {
            field: "thumbnailUrl",
            title: "Thumbnail URL"
          }
        ]
      };

      // Ag Grid
      var agGridOptions = {
        columnDefs: [
          {
            headerName: "ID",
            field: "id",
            width: 100,
            suppressSizeToFit:true,
          },
          {
            headerName: "Title",
            field: "title"
          },
          {
            headerName: "Album",
            field: "albumId",
            width: 200,
            suppressSizeToFit:true,
          },
          {
            headerName: "URL",
            field: "url"
          },
          {
            headerName: "Thumbnail URL",
            field: "thumbnailUrl"
          },
        ],
        rowData: $scope.gridData,
        onGridReady: function(params) {
              params.api.sizeColumnsToFit();
        },
        animateRows: true,
        defaultColDef: {
          resizable: true,
          sortable: true,
          filter: true,
          // suppressSizeToFit=true,
          rowSelection: 'single',
        },
      };
      var agGridDiv = document.getElementById('userDetailsAgGrid');
      new agGrid.Grid(agGridDiv, agGridOptions);
    })
})