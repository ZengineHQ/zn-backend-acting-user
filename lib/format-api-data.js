'use strict';

/**
 * Format API Data
 *
 * @param	{Object}	response
 * @return	{Array<Object>}
 */
function formatApiData(response) {

	const body = response.getBody();

	return body.data || null;

}

module.exports = formatApiData;
