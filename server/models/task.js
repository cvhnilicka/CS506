var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
	name: String,
	timestamp: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);