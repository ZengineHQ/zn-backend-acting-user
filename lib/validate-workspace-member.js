'use strict';

/**
 * Validate Workspace Member
 *
 * Validate that the user is a member or admin of the workspace
 *
 * @param	{Object}	member
 * @param	{Boolean}	isAdmin
 * @return	{Boolean}
 */
function validateWorkspaceMember(member, isAdmin) {

	// Require Service is Executed by a Member of the Workspace
	if (!member || (isAdmin && member.role.id > 2)) {
		return false;
	}

	return true;

}

module.exports = validateWorkspaceMember;
