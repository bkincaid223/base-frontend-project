var app = angular.module('todo', ['firebase']);

app.controller('TodoCtrl', function($scope, $firebaseArray, filterFilter, $http, $location, $interval){
    
	/* app.directive('ngBlur', function(){
		return function(scope, elem, attrs){
			elem.bind('blur', function(){
				scope.$apply(attrs.ngBlur);
			})
		}
	})*/
     var ref = new Firebase('https://angular-todoapp223.firebaseio.com');
	$scope.todos = $firebaseArray(ref);
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

	$scope.addTodo = function(){
		$scope.todos.$add({
			name: $scope.newtodo,
			completed: false,
			created: new Date(),
			expired: false,
		});
		$scope.newtodo = '';
		return false;
	}
	$scope.editTodo = function(todo){
		todo.editing = false;
	}

	var expiredTodo = function(todo){

	}
	var checkAllTodo = function(){
		console.log("CHECKING..");
		$scope.todos.forEach(function(todo){
      		if (todo.completed) {
	        	console.log(todo);
	        	console.log("Removing " + todo.name);
	        	expireTodo(todo);
      		}
		});
	}

	$interval(checkAllTodo, 5000);
});