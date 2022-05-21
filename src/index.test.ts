import leeks from '../dist/index.js';

test('Colours and background colours', () => {
  const expectedColour = `\x1b[32m$test\x1b[0m`;

  expect(leeks.green('test')).toBe(expectedColour);
});
