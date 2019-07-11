'use strict';

const getActingUser = require('./get-acting-user');

const validateUser = require('./validate-user');

/**
 * Validate Acting User
 *
 * Validate that the acting user belongs to a person, not an integration
 *
 * @returns	{Promise<Object|Boolean>}	User or False
 */
async function validateActingUser() {

	const user = await getActingUser();

	if (!validateUser(user)) {
		return false;
	}

	return user;

}

module.exports = validateActingUser;
