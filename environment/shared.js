'use strict';

var version = require('../package.json').version;

exports = module.exports = {
	// List of user roles
	data: {
		sports: ['running', 'cycling', 'soccer']
	},
	appConfig: {
		userRoles: ['guest', 'user', 'admin'],
		version: version
	}
};
