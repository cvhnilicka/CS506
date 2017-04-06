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
			controller: 'NewTaskController'
		})
		.when('/task/:id', {
			templateUrl: 'views/task.html',
			controller: 'UpdateTaskController'
		})



	.otherwise({
		redirectTo: '/'
	});
	
});

app.controller('UpdateTaskController', function($scope, $http, taskService, $routeParams) {
	$scope.id = $routeParams.id;

	$.getJSON('http://localhost:8000/planner/task/' + $scope.id, function(data) {
		$scope.$apply(function(){
			$scope.formData = data;
			$scope.formData.date = new Date(data.time);
			$scope.subtasks = data.subtasks;
		});
	});

	$scope.addSubtask = function() {
		$scope.subtasks.push({done: false, descr: "task description"});
	}

	$scope.operation = function() {
		$scope.formData.subtasks = $scope.subtasks;

		$http.put('/planner/task/' + $scope.formData._id, $scope.formData)
			.then(function(data) {
				createAutoClosingAlert("successfully updated " + $scope.formData.description);
			});
	}
});

app.controller('NewTaskController', function($scope, $http, taskService) {
	//Testing Area ====================================================
	$scope.formData = {name: "", priority: 1};
	$scope.subtasks = [];

	$scope.operation = function() {
		$scope.formData.subtasks = $scope.subtasks;

		$http.post('/planner/tasks', $scope.formData)
			.then(function(data) {
				$scope.formData = {name: "", priority: 1};
				$scope.subtasks = [];
				createAutoClosingAlert('Successfully created task');
			});
	};

	//Testing Area ====================================================
	$scope.addSubtask = function() {
		$scope.subtasks.push({completed: false, descr: "task description"});
	}
});


app.controller('HomeController', function($scope, $http, taskService, $window) {
	//$scope.tasks = taskService.query();

	$.getJSON('http://localhost:8000/planner/tasks', function(data) {
		$scope.$apply(function(){
			data.forEach(function(element) {
				element.date = element.time;

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

	$scope.selectedTask = {};
	$scope.range = [1, 2, 3, 4, 5];

	// socket.on('new-task', function() {
	// 	$scope.messages = msgService.query();
	// });

	$scope.complete = function(index) {

		$http.put('/planner/task/' + $scope.tasks[index]._id, $scope.tasks[index])
			.then(function(data) {
				if($scope.tasks[index].completed) {
					createAutoClosingAlert('Successfully completed ' + $scope.tasks[index].description);
				} else {
					createAutoClosingAlert('Successfully reopened ' + $scope.tasks[index].description);
				}
			});
	}

	$scope.remove = function(task)
	{
		$http.delete('/planner/task/' + $scope.tasks[task]._id);

		$scope.tasks.splice(task, 1);
	};

	$scope.edit = function(task_id) {
		$window.location.href = '/#!/task/' + task_id;
	}


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
