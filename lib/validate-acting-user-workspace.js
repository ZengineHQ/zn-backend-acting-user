'use strict';

const validateActingUser = require('./validate-acting-user');

const validateWorkspaceUser = require('./validate-workspace-user');

/**
 * Validate Acting User + Workspace
 *
 * Validate that the acting user belongs to a person, not an integration,
 * and the user is a member or admin of the workspace
 *
 * @param	{Number}	workspaceId
 * @param	{Boolean}	isAdmin
 * @returns	{Promise<Object|false>}	User or False
 */
async function validateActingUserWorkspace(workspaceId, isAdmin) {

	const user = await validateActingUser();

	if (!await validateWorkspaceUser(workspaceId, user.id, isAdmin)) {
		return false;
	}

	return user;

}

module.exports = validateActingUserWorkspace;
