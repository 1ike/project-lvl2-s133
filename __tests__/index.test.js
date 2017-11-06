import gendiff from '../src/';
const fs = require('fs');

test('gendiff', () => {
  const pathToFile1 = 'before.json';
  const pathToFile2 = 'after.json';

  const expected = fs.readFileSync('expected.json');
  console.log('expected:', expected);
  const current = gendiff(pathToFile1, pathToFile2);

  expect(current).toBe(expected);
});
