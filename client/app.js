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
	
	$scope.tasks = taskService.query();
	$scope.saved = [];

	socket.on('new-task', function() {
		$scope.messages = msgService.query();
	});

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

app.factory('socket', function($rootScope) {
	var socket = io.connect();

	return {
		on: function(eventName, callback) {
			socket.on(eventName, callback);
		},
		emit: function(eventName, data) {
			socket.emit(eventName, data);
		}
	}
});
