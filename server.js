/* Dependency Imports */
var path = require('path'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	cors = require('cors'),
	express = require('express'),

	User = require('./server/models/user.js'),
	Task = require('./server/models/task.js'),
	config = require('./server/config.js'),

	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server);

/* Express initialization options */
app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cors());

/* Connect Database Instance */
mongoose.connect(config.db, function(error) {
	if(error) console.log(error);
	else console.log('Connected to planner database: ', config.db);
});


/* BEGINNING OF THE ROUTER */ 
var router = express.Router();

/* Routes for Passport Initialization */
require('./server/routes.js')(app);

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
