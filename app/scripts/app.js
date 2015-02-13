var app = angular.module('todo', ['firebase'], ['ui.router']);

app.directive('ngBlur', function(){
  return function(scope, elem, attrs){
    elem.bind('blur', function(){
      scope.$apply(attrs.ngBlur);
    })
  }
})

app.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    
$stateProvider.state('completed', {
    url:'/',
    controller:'completed.controller',
    templateUrl: '/pages/completed.html'
    });
}]);

app.controller('completed.controller', ['$scope', function($scope){
    
app.controller('TodoCtrl', ['$scope', '$interval',function($scope, $angularFire, $interval){
  
  var fireData = new Firebase('https://todoapp12.firebaseio.com');
    
  $angularFire(fireData, $scope,'todos');
    
  $scope.todos = [];
  $scope.expiredTodos = [];
  
  

$scope.expireTodo = function(todo){
    console.log(todo);
    $scope.expiredTodos.push(todo);
    $scope.todos.splice(todo,1);
    console.log("We finished expireTodo! Here's what's expired: " + $scope.expiredTodos);
  };

  $scope.addTodo = function(){
    $scope.todos.push({
      name : $scope.newtodo,
      completed : false
    });
    $scope.newtodo = '';
    return false;
  };

  $scope.editTodo = function(todo){
    todo.editing = false;
  };

  $scope.checkAllTodo = function(){
    $scope.todos.forEach(function(todo){
      if (todo.completed) {
        console.log(todo);
        console.log("Removing " + todo.name);
        $scope.expireTodo(todo);
      }
      console.log("Checking!");
    })
  };

 $interval(function(){ $scope.checkAllTodo(); }, 3000);

}]);
}