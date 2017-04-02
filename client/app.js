

var app = angular.module('planner', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
	'use strict';

	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})
	.otherwise({
		redirectTo: '/'
	});
	
});



app.controller('HomeController', function($scope, $http, taskService) {
	
	
	
	//$scope.tasks = taskService.query();
	
	$scope.tasks = [{done: true, name: "task1", due: "1/2/2016"}, {done: false, name: "task2", due: "3/2/2038"}];
	$scope.saved = [{done: true, name: "task3", due: "1/2/2016"}, {done: false, name: "task4", due: "3/2/2038"}];
	$scope.selectedTask = {};
	$scope.range = [1, 2, 3, 4, 5];

	// socket.on('new-task', function() {
	// 	$scope.messages = msgService.query();
	// });

	$scope.remove = function(task) {
		var index = $scope.saved.indexOf(task);
		$scope.saved.splice(index, 1);
	};

	$scope.add = function(task) {
		if($scope.saved.indexOf(task) == -1) {
			$scope.saved.push(task);
		}
	};
}); 

app.factory('taskService', function($resource) {
	return $resource('planner/tasks', {});
});

// app.factory('socket', function($rootScope) {
// 	var socket = io.connect();

// 	return {
// 		on: function(eventName, callback) {
// 			socket.on(eventName, callback);
// 		},
// 		emit: function(eventName, data) {
// 			socket.emit(eventName, data);
// 		}
// 	}
// });
