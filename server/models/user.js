var mongoose = require('mongoose');
var Task = require('./task.js');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	tasks: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema'}],
		default: []
	},
	categories: {
		type: [String],
		default: ["Work", "School", "Misc"]
	}
});

var options = ({missingPasswordError: "Incorrect Password"});
User.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('User', User);
