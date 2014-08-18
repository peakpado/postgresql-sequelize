'use strict';

/*
 * A simple module to get sequelize object where the shared connection and model definitions 
 * are saved. This is a way to share a sequelize object across mean.io application.
 */

var config = require('meanio').loadConfig();
var Sequelize = require('sequelize');


var pgConfig = {};

// use DATABASE_URL if exists
if (process.env.DATABASE_URL) {		
	var dburl = process.env.DATABASE_URL;
	console.log('DATABASE_URL: '+dburl);

	var parts = dburl.split('@');
	var userPassword = parts[0].split('://')[1].split(':');
	pgConfig.username = userPassword[0];
	pgConfig.password = userPassword[1];

	var hostPortDatabase = parts[1].split('/');
	var hostPort = hostPortDatabase[0].split(':');
	pgConfig.host = hostPort[0];
	pgConfig.port = hostPort[1];
	pgConfig.database = hostPortDatabase[1];
} else {
	// use config.pg
	pgConfig = config.pg;
}

var sequelize = new Sequelize(pgConfig.database, pgConfig.username, pgConfig.password, {
    dialect: 'postgres',
    host: pgConfig.host,
    port: pgConfig.port
});

// Add JSON and JSONB data type to Sequelize
Sequelize.JSON = 'JSON';
Sequelize.JSONB = 'JSONB';


module.exports = exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}
