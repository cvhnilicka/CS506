var mongoose = require('mongoose');
var	Task = require('./models/task.js');
var User = require('./models/user.js');

module.exports = {
	db: 'mongodb://localhost/planner',
	secret: 'qwertyuiop1234567890',
	appRoute: './client',
	testRoute: './server/testing'
}	

exports.createTask = function(req) {
	var task = new Task();
	task.description = req.body.description;
	task.priority = req.body.priority;
	task.time = req.body.date;
	task.subtasks = req.body.subtasks;

	return task;
}

exports.createUser = function(req) {
	var user = new User();
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;
	
	return user;
}