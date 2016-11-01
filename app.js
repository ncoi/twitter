var express = require('express');
var bodyParser = require('body-parser');
var passport	= require('passport');

var users = require('./app/routes/users.js');

// Init app
var app = express();

var connection = require('./app/config/database.js');
connection.sync();

var user = require('./app/models/user.js');
user.build();


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// Use the passport package in our application
app.use(passport.initialize());
require('./app/config/passport')(passport);

// Routes
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function() {
    console.log('Server started on port' + app.get('port'));
});