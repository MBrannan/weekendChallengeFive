var employeeApp = angular.module('calculator', ['ngRoute']);

employeeApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/employees', {
      templateUrl: '/views/templates/employees.html',
      controller: 'EmployeeController',
      controllerAs: 'employees'
    })
    .otherwise({
      redirectTo: 'employees'
    });
}]);

employeeApp.controller('EmployeeController', ['$http', function($http) {
  var self = this;
  self.monthlySalary = 0;
  console.log('Employee controller loaded');
  self.employees = [];
  self.newEmployee = {};
  getEmployees();
  calculateSalary();

  function getEmployees() {
    $http.get('/employees')
      .then(function(response) {
        console.log(response.data);
        self.employees = response.data;
      });
  }

  function calculateSalary() {
    self.monthlySalary += Math.round(self.employees.salary / 12); //This is returning NaN despite salary being a number?
    console.log(self.monthlySalary);
  }

  self.addEmployee = function(newEmployee) {
      $http.post('/employees', newEmployee)
       .then(function(response) {
         console.log('employee added: ', response);
         self.employees.push(angular.copy(self.newEmployee));
         getEmployees();
       });
    }
  self.deleteEmployee = function(deleteTarget) {
    $http.delete('/employees/' + deleteTarget.id)
     .then(getEmployees);
  };
}]);
