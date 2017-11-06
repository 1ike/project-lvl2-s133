import fs from 'fs';
import os from 'os';

import { gendiff } from '../src';


test('gendiff', () => {
  const pathToFile1 = __dirname + '/before.json';
  const pathToFile2 = __dirname + '/after.json';

  const expected = fs.readFileSync(__dirname + '/expected.txt', 'utf8');
  const current = gendiff(pathToFile1, pathToFile2);

  expect(current).toBe(expected);
});
