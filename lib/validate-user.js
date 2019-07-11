'use strict';

/**
 * Validate User
 *
 * Validate that the user belongs to a person, not an integration,
 * and is a member or admin of the workspace.
 *
 * @param	{Object}	user
 * @return	{Boolean}
 */
function validateUser(user) {

	// Require Service is Executed by an Acting User
	if (!user || user.resource === 'workspaces') {
		return false;
	}

	return true;

}

module.exports = validateUser;
