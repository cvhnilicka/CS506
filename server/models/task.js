var mongoose = require('mongoose');
var Account = require('./account.js');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	owner: {type: mongoose.Schema.ObjectId, ref: "Account"},
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
	}
});

module.exports = mongoose.model('Task', TaskSchema);