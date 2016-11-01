var User        = require('../models/user.js');
var config      = require('../config/config.js');
var jwt         = require('jsonwebtoken'); 

module.exports.save = function (req, res) {
    User.create(req.body).then(function (user) {
        if (user) {
            res.json({ success: true, msg: 'Successful created user!' });
        } else {
            res.json({ success: false, msg: 'Username already exists' });
        }
    }).catch(function (error) {
        res.json({ success: false, msg: error.message });
    });
}

module.exports.login = function (req, res) {
    User.findOne({ where: { username: req.body.username } }).then(function (user) {
        if (user) {
            //res.json({success: true, msg: 'We found: '+ user.username});
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log(user);
                    var token = jwt.sign(user.dataValues, config.secret, {
                        expiresIn: 1800
                    });
                    //console.log(token);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.json({ success: false, msg: "Wrong Password" }); //  Authentication failed. Username and password don't match.
                 }
            });
        } else {
            res.json({ success: false, msg: "User not found" }); //  Authentication failed. Username and password don't match
        }
    }).catch(function (error) {
        res.json({ success: false, msg: error });
    });
}

module.exports.info = function(req, res) {
    var d_user = getUser(req.headers);
    res.json(d_user);
}

var getUser = function(headers) {
  if(headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if(parted.length === 2) {
      return jwt.verify(parted[1], config.secret);
    } else {
      return null;
    }
  } else {
    return null;
  }
}