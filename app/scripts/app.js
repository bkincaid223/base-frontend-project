var app = angular.module('app', []);

app.controller('TodoCtrl', [function($scope, $filter){  
 
    var todos = [];
    var newtodo = '';

    $scope.$watch('todos', function(){
        $scope.remaining = $filter($scope, todos, {completed:false}).length;
        $scope.allchecked = !$scope.remaining;
    }, true);
    
    $scope.removeTodo = function(index){
        $scope.todos.splice(index,1);
    };
    
    $scope.addTodo = function(){
        $scope.todos.push({
            name: $scope.newtodo, 
            completed: false
        });
    }
    
    $scope.checkAllTodo = function(allchecked){
        $scope.todos.forEach(function(todo){
            todo.completed = allchecked;
        })
    }     
}]);

// todos: newTodo: name, completed