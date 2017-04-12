var mongoose = require('mongoose');
var User = require('./user.js');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	owner: {type: mongoose.Schema.ObjectId, ref: "User"},
	description: {
		type: String,
		default: ""
	},
	priority: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	time: {
		type: Date
	},
	updated: {
		type: Boolean,
		default: false
	},
	update: {
		newDescription: {
			type: String,
			default: ""
		},
		newDate: {
			type: Date,
			default: Date.now
		}
	},
	subtasks: {
		type: [ this ],
		default: []
	},
	completed: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Task', TaskSchema);