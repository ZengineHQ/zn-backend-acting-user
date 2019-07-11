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

		module = require('../../../lib/validate-workspace-user');

	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should return true when user is a member of the workspace', async function() {

		const workspaceId = 1;

		const userId = 2;

		const member = {
			role: {
				id: 11
			}
		};

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: [member]
				}
			}
		}));

		let result = await module(workspaceId, userId);

		expect(result).toEqual(true);

	});

	it('should return true when user is an admin of the workspace', async function() {

		const workspaceId = 1;

		const userId = 2;

		const isAdmin = true;

		const member = {
			role: {
				id: 1
			}
		};

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: [member]
				}
			}
		}));

		let result = await module(workspaceId, userId, isAdmin);

		expect(result).toEqual(true);

	});

	it('should return false when user not a member of the workspace', async function() {

		const workspaceId = 1;

		const userId = 2;

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: null
				}
			}
		}));

		let result = await module(workspaceId, userId);

		expect(result).toEqual(false);

	});

	it('should return false when user not an admin of the workspace', async function() {

		const workspaceId = 1;

		const userId = 2;

		const isAdmin = true;

		const member = {
			role: {
				id: 11
			}
		};

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: [member]
				}
			}
		}));

		let result = await module(workspaceId, userId, isAdmin);

		expect(result).toEqual(false);

	});

});