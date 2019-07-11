'use strict';

const mockery = require('mockery');

describe('module', function() {

	let module;

	let znHttpGetSpy;

	beforeEach(function() {

		mockery.enable({
			warnOnReplace: false,
			warnOnUnregistered: false,
			useCleanCache: true
		});

		znHttpGetSpy = jasmine.createSpy();

		let znHttpMock = function() {
			return {
				get: znHttpGetSpy
			};
		};
		mockery.registerMock('../../../../lib/zn-http.js', znHttpMock);

		module = require('../../../lib/get-workspace-member');

	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should return member object', async function() {

		const workspaceId = 1;

		const userId = 2;

		const members = [
			{
				id: 2,
				workspace: {
					id: workspaceId
				},
				type: null
			}
		];

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: members
				}
			}
		}));

		let result = await module(workspaceId, userId);

		expect(result).toEqual(members[0]);

		expect(znHttpGetSpy).toHaveBeenCalledWith('/workspaces/' + workspaceId + '/members?user.id=' + userId);

	});

	it('should return null when members empty', async function() {

		const workspaceId = 1;

		const userId = 2;

		const members = [];

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: members
				}
			}
		}));

		let result = await module(workspaceId, userId);

		expect(result).toBeNull();

		expect(znHttpGetSpy).toHaveBeenCalledWith('/workspaces/' + workspaceId + '/members?user.id=' + userId);

	});

	it('should return null on promise reject', async function() {

		const workspaceId = 1;

		const userId = 2;

		const err = new Error();

		znHttpGetSpy.and.returnValue(Promise.reject(err));

		let result = await module(workspaceId, userId);

		expect(result).toBeNull();

		expect(znHttpGetSpy).toHaveBeenCalledWith('/workspaces/' + workspaceId + '/members?user.id=' + userId);

	});

});