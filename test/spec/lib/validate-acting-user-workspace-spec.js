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

		module = require('../../../lib/validate-acting-user-workspace');

	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should return false when user is an integration user', async function() {

		const workspaceId = 1;

		const isAdmin = true;

		const user = {
			id: 2,
			resource: 'workspaces'
		};

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: user
				}
			}
		}));

		let result = await module(workspaceId, isAdmin);

		expect(result).toEqual(false);

	});

	it('should return false when member cannot be validated', async function() {

		const workspaceId = 1;

		const isAdmin = true;

		const user = {
			id: 2,
			resource: null
		};

		znHttpGetSpy.and.returnValues(
			Promise.resolve({
				getBody: function() {
					return {
						data: user
					}
				}
			}),
			Promise.resolve({
				getBody: function() {
					return {
						data: []
					}
				}
			})
		);

		let result = await module(workspaceId, isAdmin);

		expect(result).toEqual(false);

	});

	it('should return false when member is not admin', async function() {

		const workspaceId = 1;

		const isAdmin = true;

		const user = {
			id: 2,
			resource: null
		};

		const member = {
			role: {
				id: 11
			}
		};

		znHttpGetSpy.and.returnValues(
			Promise.resolve({
				getBody: function() {
					return {
						data: user
					}
				}
			}),
			Promise.resolve({
				getBody: function() {
					return {
						data: [member]
					}
				}
			})
		);

		let result = await module(workspaceId, isAdmin);

		expect(result).toEqual(false);

	});

	it('should return user when valid', async function() {

		const workspaceId = 1;

		const isAdmin = true;

		const user = {
			id: 2,
			resource: null
		};

		const member = {
			role: {
				id: 2
			}
		};

		znHttpGetSpy.and.returnValues(
			Promise.resolve({
				getBody: function() {
					return {
						data: user
					}
				}
			}),
			Promise.resolve({
				getBody: function() {
					return {
						data: [member]
					}
				}
			})
		);

		let result = await module(workspaceId, isAdmin);

		expect(result).toEqual(user);

	});



});