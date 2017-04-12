var User = require('../models/user.js');
var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();

//Register
router.get('/register', function(req, res) {
	res.render('register');
});

router.post('/register', function(req, res) {
	var username = req.body.username;
	var email = req.body.email;

	req.checkBody('username', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is valid').isEmail();

	var errors = req.validationErrors();

	if (errors) {
		//TODO
		
	} else {
		//Register User
		console.log('Successfully Registered');
	}
});

//Login
router.get('/login', function(req, res) {
	res.render('login');
});

module.exports = router;