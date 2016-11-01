var connection = require('../config/database.js');
var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

module.exports = connection.define('User', {
    fullname: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    username: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
}, {
        instanceMethods: {
            comparePassword: function(passw, callback) {
                bcrypt.compare(passw, this.password, function(err, isMatch) {
                    if(err) {
                        return callback(err);
                    }
                    callback(null, isMatch);
                });
            }
        },
        hooks: {
            afterValidate: function (user) {
                var salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    });

//connection.sync();