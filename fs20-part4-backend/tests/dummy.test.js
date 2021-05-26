//imports list_helper:
const listHelper = require('../utils/list_helper')
// first test suite:
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  //jest-method "expect" wraps value to object and then uses matcher toBe and defines the expected result of the test
  expect(result).toBe(1)
})