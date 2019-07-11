'use strict';

const znHttp = require('../../../../lib/zn-http.js');

const formatApiData = require('./format-api-data');

/**
 * Get Workspace Member
 *
 * @param	{Number}	workspaceId
 * @param	{Number}	userId
 * @return	{Promise<Object|null>}	Member Object or Null
 */
function getWorkspaceMember(workspaceId, userId) {

	return znHttp().get('/workspaces/' + workspaceId + '/members?user.id=' + userId)
		.then(formatApiData)
		.then(function(members) {

			if (!members || !members.length) {
				return null;
			}

			return members[0];

		})
		.catch(function() {
			return null;
		});

}

module.exports = getWorkspaceMember;
