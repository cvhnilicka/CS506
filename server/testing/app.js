var app = angular.module('test', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
	'use strict';

	$routeProvider
	.when('/', {
		templateUrl: '',
		controller: 'MainController'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.controller('MainController', function($scope, $http) {

});