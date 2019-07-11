'use strict';

const getWorkspaceMember = require('./get-workspace-member');

const validateWorkspaceMember = require('./validate-workspace-member');

/**
 * Validate Workspace User
 *
 * Validate that the user is a member or admin of the workspace.
 *
 * @param	{Number}	workspaceId
 * @param	{Number}	userId
 * @param	{Boolean}	isAdmin
 * @returns	{Promise<Boolean>}
 */
async function validateWorkspaceUser(workspaceId, userId, isAdmin) {

	const member = await getWorkspaceMember(workspaceId, userId);

	return validateWorkspaceMember(member, isAdmin);

}

module.exports = validateWorkspaceUser;
