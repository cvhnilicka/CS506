var mongoose = require('mongoose'),
	Task = require('./models/task.js'),
	db = 'mongodb://localhost/planner',
	secret = 'asdf8798sodfuoiu897sd9f87';

exports.db = db;
exports.secret = secret;

exports.createTask = function(req) {
	var task = new Task();
	task.description = req.body.description;
	task.priority = req.body.priority;
	task.time = req.body.date;
	task.subtasks = req.body.subtasks;

	return task;
}