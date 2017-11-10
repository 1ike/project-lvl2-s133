import fs from 'fs';
import os from 'os';

import gendiff from '../src';

const dir = __dirname + '/__fixtures__';
const expected = fs.readFileSync(dir + '/expected.txt', 'utf8');

test('gendiff json', () => {
  const pathToFile1 = dir + '/before.json';
  const pathToFile2 = dir + '/after.json';
  const inputFormat = 'json';

  const current = gendiff(pathToFile1, pathToFile2, inputFormat);

  expect(current).toBe(expected);
});


test('gendiff yml', () => {
  const pathToFile1 = dir + '/before.yml';
  const pathToFile2 = dir + '/after.yml';
  const inputFormatFull = 'yaml';
  const inputFormatShort = 'yml';

  const currentFull = gendiff(pathToFile1, pathToFile2, inputFormatFull);
  const currentShort = gendiff(pathToFile1, pathToFile2, inputFormatShort);

  expect(currentFull).toBe(expected);
  expect(currentShort).toBe(expected);
});


test('gendiff ini', () => {
  const pathToFile1 = dir + '/before.ini';
  const pathToFile2 = dir + '/after.ini';
  const inputFormat = 'ini';

  const current = gendiff(pathToFile1, pathToFile2, inputFormat);

  expect(current).toBe(expected);
});
