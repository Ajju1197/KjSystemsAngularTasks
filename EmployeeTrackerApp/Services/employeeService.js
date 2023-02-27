EmployeeTrackerAppModule.service('employeeListService', function () {
  this.employees = [];

  this.getData = function () {
    return this.employees
  }
  this.setData = function (newData) {
    this.employees.push(newData)
  }
  
  this.updateData = function (updatedEmployee) {
    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === updatedEmployee.id) {
        this.employees[i] = updatedEmployee;
        break;
      }
    }
  };

  
  this.searchByName = function(searchString) {
    var matchingEmployees = [];
    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
        matchingEmployees.push(this.employees[i]);
      }
    }
    return matchingEmployees;
  };
});