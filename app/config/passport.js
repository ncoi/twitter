var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('./config');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){ 
        User.find({where: {username: jwt_payload.username}}).then( function(user) { 
            if(user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }).catch(function(error){
            return done(error, false);
        });
    }));
}