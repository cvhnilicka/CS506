var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	password: String,
	tasks: {
		type: [Schemas.Type.Task],
		default: []
	},
	categories: {
		type: [String],
		default: ["Work", "School", "Misc"]
	}
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
