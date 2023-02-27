EmployeeTrackerAppModule.controller('EmployeeViewInAgGridController', function ($scope, employeeListService) { 


     // Ag Grid Student Info Grid options
    $scope.employeeListGridOptions = {
      columnDefs: [
        {
          field:'id',
          headerName:'Employee Id',
        },
        {
          field: 'name', 
          headerName: 'Employee Name'
        },
        {
          field: 'age', 
          headerName: 'Age',
        },
        {
          field: 'gender', 
          headerName: 'Gender',
        },
        {
          field: 'job_title', 
          headerName: 'Job',
        },
        {
          field: 'department', 
          headerName: 'Department' ,
        },
        {
          field: 'salary', 
          headerName: 'Salary' ,
        },
        {
          headerName: 'View Employee',
          field: 'name',
          cellRenderer: function (params) {
            return '<a href="#/employee-details/' + params.data.id + '">' + params.value + '</a>';
          },
        },
        {
          headerName: 'Edit Employee',
          field: 'name',
          cellRenderer: function (params) {
            return '<a ng-click="openEditEmployeeModal(employee)">' + '<i class="bi bi-pencil-square"></i>' + '</a>';
          },
          cellStyle: {'text-align': 'center'}
        },
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
      },
      rowData: $scope.employeeListData,
      animateRows:true,
      onGridReady: function (params) {
        $scope.gridApi = params.api;
        var rowData = $scope.employeeListData;
        params.api.sizeColumnsToFit();
        $scope.gridApi.setRowData(rowData)
      },
    };
    
    // Dropdown Class Info Options
      $scope.employeeListOptions = [
        'All',
        'Male',
        'Female'
    ];

  
    // Getting Data for agGRid
    $scope.employeeListData = employeeListService.getData().map(function (employee, index) {
      employee.id = index + 1;
      return {
        id: employee.id,
        name: employee.name,
        gender: employee.gender,
        age: employee.age,
        dob:employee.dob,
        job_title: employee.job_title,
        department: employee.department,
        salary:employee.salary
      };
    }); 
  
    // filtering the studentInfo with $watch function
    // Note : the function watches for changes to the selectStudentInfo variable, filters the studentInfo array based on the selected class, and updates the displayed data in the ag-grid.
    $scope.$watch('selectEmployeeList', function (newValue, oldValue) {
      let filterData = $scope.employeeListData;
      if (newValue !== 'All') {
        filterData = $scope.employeeListData.filter(function (employee) {
          return employee.gender === newValue;
        });
      }
      if ($scope.gridApi) {
        $scope.gridApi.setRowData(filterData)
      }
    })  
})