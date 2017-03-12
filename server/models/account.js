var mongoose = require('mongoose');
var Task = require('./task.js');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	tasks: {
		type: [{type: mongoose.Schema.Types.ObjectId, ref: 'TaskSchema'}],
		default: []
	},
	categories: {
		type: [String],
		default: ["Work", "School", "Misc"]
	}
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
