var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	name: String,
	timestamp: {type: Date, default: Date.now },
	due: String,
	priority: String,
	subtasks: [String],
});

module.exports = mongoose.model('Task', TaskSchema);