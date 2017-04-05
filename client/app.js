var app = angular.module('planner', ['ngRoute', 'ngResource']);

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}

function createAutoClosingAlert(message) {
	const alert = document.createElement('div');
	alert.className = 'alert alert-success fade in';

	const content = document.createElement('div');
	content.append(message);
	alert.append(content);
	window.setTimeout(function () {
		jQuery(alert).hide();
	}, 4000);
	$('#alerts').append(alert);
}

app.config(function($routeProvider) {

	'use strict';

	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeController'
	})
		.when('/newTask', {
			templateUrl: 'views/task.html',
			controller: 'MyController'
		})

	.otherwise({
		redirectTo: '/'
	});
	
});

app.controller('MyController', function($scope, $http, taskService) {
	$scope.subtasks = [{done: false, descr: "task description"}];
	$scope.priority = 1;

	//Testing Area ====================================================
	$scope.tasks = taskService.query();
	$scope.formData = {name: "", priority: 1};
	$scope.subtasks = [];

	$scope.createTask = function() {
		$http.post('/planner/tasks', $scope.formData)
			.then(function(data) {
				$scope.formData = {name: "", priority: 1};
				$scope.subtasks = [];
			});
	};

	//Testing Area ====================================================
	$scope.addSubtask = function() {
		$scope.subtasks.push({done: false, descr: "task description"});
	}
});


app.controller('HomeController', function($scope, $http, taskService, $window) {
	//$scope.tasks = taskService.query();
	$.getJSON('http://localhost:8000/planner/tasks', function(data) {
		$scope.$apply(function(){
			data.forEach(function(element) {
				var myDate = new Date(element.time),
					month = '' + (myDate.getMonth() + 1),
					day = '' + myDate.getDate(),
					year = myDate.getFullYear();

				if (month.length < 2) month = '0' + month;
				if (day.length < 2) day = '0' + day;

				element.time =  [year, month, day].join('-');
			});

			$scope.tasks = data;
		});
	});

	//$scope.tasks = [{done: true, name: "task1", due: "1/2/2016"}, {done: false, name: "task2", due: "3/2/2038"}];
	//$scope.saved = [{done: true, name: "task3", due: "1/2/2016"}, {done: false, name: "task4", due: "3/2/2038"}];

	$scope.selectedTask = {};
	$scope.range = [1, 2, 3, 4, 5];

	// socket.on('new-task', function() {
	// 	$scope.messages = msgService.query();
	// });

	$scope.complete = function(index) {
		$.ajax({
			type: 'POST',
			url: 'http://localhost:4567/complete',
			data: JSON.stringify({'index': index})
		})
	}

	$scope.remove = function(task)
	{
		$.ajax({
			type: 'POST',
			url: 'http://localhost:4567/rtasks',
			data: JSON.stringify({'index': task})
		})

		$scope.tasks.splice(task, 1);
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
