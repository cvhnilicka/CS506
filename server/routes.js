var User = require('./models/user.js');
var users = require('./login.js');
var Utility = require('./utility.js');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app) {
	passport.use(User.createStrategy());

	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	app.use(cookieParser());
	app.use(session({
		secret: Utility.secret,
		saveUninitialized: true,
		resave: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.route('/register').post(users.register);
	app.route('/login').post(users.login);
	app.route('/login').get(users.getLogin);
}