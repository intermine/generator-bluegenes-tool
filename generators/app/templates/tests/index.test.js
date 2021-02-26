const main = require('../src').main;

// Example
describe('main', () => {
	test('should throw error when called with wrong signature', () => {
		expect(() => {
			// testing with all falsy values
			main('', 0, null, undefined, []);
		}).toThrowError('Call main with correct signature');
	});
});
