var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.ctrl.js');
var passport	= require('passport');

// Register
router.route('/register')
    .post(function (req, res) {
        userCtrl.save(req, res);
    });

// Login
router.route('/login')
    .post(function(req, res) {
        userCtrl.login(req, res);
    });

// User Info
router.route('/info')
    .get( passport.authenticate('jwt', {session: false}), function(req, res) {
        userCtrl.info(req, res);
    });

module.exports = router;