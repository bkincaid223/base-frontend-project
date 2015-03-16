var app = angular.module('todo', ['firebase']);

function TodoCtrl($scope, angularFire) {
    
    
    angularFire(fireData, $scope, 'todo');
    
    
app.directive('ngBlur', function(){
	return function(scope, elem, attrs){
		elem.bind('blur', function(){
			scope.$apply(attrs.ngBlur);
		})
	}
})
}
app.controller('TodoCtrl', function($scope, $firebaseArray, filterFilter, $http, $location, $interval){
    
     var ref = new Firebase('https://angular-todoapp223.firebaseio.com');
  


	$scope.todos = [
	];
	$scope.$watch('todos', function(){
		$scope.remaining = filterFilter($scope.todos, {completed:false}).length;
		$scope.allchecked = !$scope.remaining;
	}, true)
	if($location.path() == ''){ $location.path('/')}
	$scope.location = $location;
	$scope.$watch('location.path()', function(path){
		$scope.statusFilter =
			(path == '/active') ? {completed : false} :
			(path == '/done') ? {completed : true} :
			null;
	});
	$scope.removeTodo = function(index){
		$scope.todos.splice(index,1);
	}
	$scope.addTodo = function(){
		$scope.todos.push({
			name : $scope.newtodo,
			completed : false
		});
		$scope.newtodo = '';
		return false;
	}
	$scope.editTodo = function(todo){
		todo.editing = false;
	}
	$scope.checkAllTodo = function(allchecked){
		$scope.todos.forEach(function(todo){
      if (todo.completed) {
        console.log(todo);
        console.log("Removing " + todo.name);
        $scope.expireTodo(todo);
      }
      console.log("Checking!");
		})
		
	$interval(function(){ $scope.checkAllTodo(); }, 3000);
	}
});