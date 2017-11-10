import fs from 'fs';
import os from 'os';

import gendiff from '../src';

const dir = __dirname + '/__fixtures__';


test('gendiff json', () => {
  const pathToFile1 = dir + '/before.json';
  const pathToFile2 = dir + '/after.json';

  const expected = fs.readFileSync(dir + '/expected.txt', 'utf8');
  const current = gendiff(pathToFile1, pathToFile2, 'json');

  expect(current).toBe(expected);
});


test('gendiff yml', () => {
  const pathToFile1 = dir + '/before.yml';
  const pathToFile2 = dir + '/after.yml';
  const fileFormatFull = 'yaml';
  const fileFormatShort = 'yml';

  const expected = fs.readFileSync(dir + '/expected.txt', 'utf8');
  const currentFull = gendiff(pathToFile1, pathToFile2, fileFormatFull);
  const currentShort = gendiff(pathToFile1, pathToFile2, fileFormatShort);

  expect(currentFull).toBe(expected);
  expect(currentShort).toBe(expected);
});


test('gendiff ini', () => {
  const pathToFile1 = dir + '/before.ini';
  const pathToFile2 = dir + '/after.ini';
  const fileFormat = 'ini';

  const expected = fs.readFileSync(dir + '/expected.txt', 'utf8');
  const current = gendiff(pathToFile1, pathToFile2, fileFormat);

  expect(current).toBe(expected);
});
