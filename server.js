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
Utility = require('./server/utility.js'),

app = express(),
server = require('http').Server(app),
io = require('socket.io')(server);

/* Express initialization options */
app.set('port', process.env.PORT || 8000);
app.use(express.static(path.join(__dirname, Utility.appRoute)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(cors());

/* Connect Database Instance */
mongoose.connect(Utility.db, function(error) {
	if(error) console.log(error);
	else console.log('Connected to planner database: ', Utility.db);
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
	task.description = req.body.description;
	task.priority = req.body.priority;
	task.time = req.body.date;
	task.subtasks = req.body.subtasks;
	task.save(function(err) {
		if(err) res.send(err);
		else {
			res.json({ message: 'Task created' });
				// io.sockets.emit('new-task', {});
			}
		});
})

.get(function(req, res) {
	Task.find(function(err, tasks) {
		if(err) res.send(err);
		else { res.json(tasks); }
	});
});


router.route('/task/:task_id')

	.delete(function(req, res){
		Task.remove({
			_id: req.params.task_id 
		}, function(err, task){
			if(err)
				console.log(err)

			res.json({ message: "Successfully deleted task"})
		})
	})

	.put(function(req, res){
		Task.findById(req.params.task_id, function(err, task){
			if(err)
				console.log(err)

			task.description = req.body.description;
			task.priority = req.body.priority;
			task.time = req.body.date;
			task.subtasks = req.body.subtasks;
			task.completed = req.body.completed;
			task.save(function(err){
				if(err) res.send(err);
				else {
					res.json({ message: 'Task updated' });
				}

			})
		})
	})
	.get(function(req, res) {
		Task.findById(req.params.task_id, function(err, task){
			if(err)
				console.log(err)
			res.json(task);
		})
	});



app.use('/planner', router);
/* END OF ROUTER */

server.listen(app.get('port'), function() {
	console.log('Server running on port 8000');
})
