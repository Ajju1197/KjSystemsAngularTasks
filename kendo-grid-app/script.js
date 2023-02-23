var app = angular.module("kendoGridAppModule", ["kendo.directives"]);
app.controller("kendoGridAppCtrl", function($scope) {
    $scope.gridOptions = {
        dataSource: {
            data: [
                { id: 1, name: "John" },
                { id: 2, name: "Jane" },
                { id: 3, name: "Bob" }
            ]
        },
        columns: [
            { field: "id", title: "ID" },
            { field: "name", title: "Name" }
        ]
    };
});

app.controller("MyCtrl", function ($scope) {
  // $scope.source = new kendo.data.DataSource({
  //   data: [
  //     { "data": "1,Lee,19,17,false,1996-07-04T21:00:00.000Z" },
  //     { "data": "2,Tom,19,17,false,1996-07-04T21:00:00.000Z" },
  //     { "data": "3,Roy,19,17,false,1996-07-04T21:00:00.000Z" }
  //   ],
  //   pageSize: 21
  // })

  $scope.gridOptions = {
    dataSource: {
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
            }
        },
        pageSize: 10
    },
    height: 550,
    groupable: true,
    sortable: true,
    toolbar:true,
    pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 2
    },
    columns: [
        { field: "ProductName", title: "Product Name" },
        { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
        { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
        { field: "Discontinued", width: "120px" }
    ]
};
})