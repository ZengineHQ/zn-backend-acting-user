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

		module = require('../../../lib/validate-acting-user');

	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should return user when user is not an integration user', async function() {

		const user = {
			id: 1,
			resource: null
		};

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: user
				}
			}
		}));

		let result = await module();

		expect(result).toEqual(user);

	});

	it('should return false when user is empty', async function() {

		const user = null;

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: user
				}
			}
		}));

		let result = await module();

		expect(result).toEqual(false);

	});

	it('should throw error when user is integration user', async function() {

		const user = {
			id: 1,
			resource: 'workspaces'
		};

		znHttpGetSpy.and.returnValue(Promise.resolve({
			getBody: function() {
				return {
					data: user
				}
			}
		}));

		let result = await module();

		expect(result).toEqual(false);

	});

});