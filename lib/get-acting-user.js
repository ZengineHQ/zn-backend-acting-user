'use strict';

const znHttp = require('../../../../lib/zn-http.js');

const formatApiData = require('./format-api-data');

/**
 * Get Acting User
 *
 * Will return user for current access token
 *
 * @return	{Promise<Object|null>}	User Object or Null
 */
function getActingUser() {

	return znHttp().get('/users/me')
		.then(formatApiData)
		.catch(function() {
			return null;
		});

}

module.exports = getActingUser;
