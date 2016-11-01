var Sequelize = require('sequelize');
var connection = new Sequelize('login_seq','root','mysql');

module.exports = connection;
