var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var Task = require('./server/models/task.js');
var Account = require('./server.models/account.js');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE', 'PUT');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

mongoose.connect('mongodb://localhost/planner', function(error) {
	if(error) console.log(error);
	else console.log('Connected to planner database');
});



/* BEGINNING OF THE ROUTER */ 

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Request made');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Task logging API' });
});

router.route('/tasks')
	.post(function(req, res) {

		var task = new Task();
		task.name = req.body.name;
		task.due = req.body.due;
		task.priority = req.body.priority;
		
		task.save(function(err) {
			if(err) res.send(err);
			else {
				res.json({ message: 'Task created' });
				io.sockets.emit('new-task', {});
			}
		});
	})

	.get(function(req, res) {
		Task.find(function(err, tasks) {
			if(err) res.send(err);
			else { res.json(tasks); }
		});
	});

app.use('/planner', router);



/* END OF ROUTER */

server.listen(app.get('port'), function() {
	console.log('Server running on port 8000');
})
