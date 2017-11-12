import fs from 'fs';
import os from 'os';

import gendiff from '../src';
import obj from './__fixtures__/expected';

const dir = __dirname + '/__fixtures__';


test('gendiff tree', () => {
  const pathToFile1 = dir + '/before.json';
  const pathToFile2 = dir + '/after.json';

  const expected = fs.readFileSync(dir + '/expected.txt', 'utf8');
  const current = gendiff(pathToFile1, pathToFile2, 'json');

  expect(current).toBe(expected);
});


test('gendiff yml', () => {
  const pathToFile1 = dir + '/before.yml';
  const pathToFile2 = dir + '/after.yml';
  const inputFormatFull = 'yaml';
  const inputFormatShort = 'yml';

  const expected = fs.readFileSync(dir + '/expected.txt', 'utf8');
  const currentFull = gendiff(pathToFile1, pathToFile2, inputFormatFull);
  const currentShort = gendiff(pathToFile1, pathToFile2, inputFormatShort);

  expect(currentFull).toBe(expected);
  expect(currentShort).toBe(expected);
});


test('gendiff ini', () => {
  const pathToFile1 = dir + '/before.ini';
  const pathToFile2 = dir + '/after.ini';
  const inputFormat = 'ini';

  const expected = fs.readFileSync(dir + '/expected.txt', 'utf8');
  const current = gendiff(pathToFile1, pathToFile2, inputFormat);

  expect(current).toBe(expected);
});


test('gendiff ini plain', () => {
  const pathToFile1 = dir + '/before.ini';
  const pathToFile2 = dir + '/after.ini';
  const inputFormat = 'ini';
  const outputFormat = 'plain';

  const expected = fs.readFileSync(dir + '/expected-plain.txt', 'utf8');
  const current = gendiff(pathToFile1, pathToFile2, inputFormat, outputFormat);

  expect(current).toBe(expected);
});


test('gendiff ini json', () => {
  const pathToFile1 = dir + '/before.json';
  const pathToFile2 = dir + '/after.json';
  const inputFormat = 'json';
  const outputFormat = 'json';

  const expected = obj;
  const current = gendiff(pathToFile1, pathToFile2, inputFormat, outputFormat);

  expect(current).toEqual(expected);
  expect(JSON.stringify(current, null, 2)).toEqual(JSON.stringify(expected, null, 2));
});
