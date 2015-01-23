var app = angular.module('my-app', [], function () {

})

app.controller('AppController', function ($scope) {
  $scope.todos = []; // create the todos array
  
  $scope.getTotalTodos = function () {
    return $scope.todos.length; // get the length of the todos array
  };
  
  $scope.addTodo = function () {
    $scope.todos.push({text:$scope.formTodoText, done:false});
    $scope.formTodoText = '';
  };
  
  $scope.clearCompleted = function () {
    // iterating through the $scope.todos array
    for(var i=0; i<=$scope.todos.length; i++) {
      if ($scope.todos[i].done === true) {
          $scope.todos.splice(i,1); // if todo.done is true, we remove it from the array with .splice()
      }
    }
  };
})