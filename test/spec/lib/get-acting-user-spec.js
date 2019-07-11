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

		module = require('../../../lib/get-acting-user');

	});

	afterEach(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should return user object', async function() {

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

		expect(znHttpGetSpy).toHaveBeenCalledWith('/users/me');

	});

	it('should return null on promise reject', async function() {

		const err = new Error();

		znHttpGetSpy.and.returnValue(Promise.reject(err));

		let result = await module();

		expect(result).toBeNull();

		expect(znHttpGetSpy).toHaveBeenCalledWith('/users/me');

	});

});