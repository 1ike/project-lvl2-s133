import gendiff from '../src';

const fs = require('fs');
const os = require('os');

/*
const gendiff = (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const ast1 = JSON.parse(file1);
  const ast2 = JSON.parse(file2);

  const keys1 = Object.keys(ast1);
  const keys2 = Object.keys(ast2).filter(item => keys1.indexOf(item) < 0);

  const diff1 = keys1.reduce((acc, item) => {
    if (ast2[item] === ast1[item]) {
      return `${acc}    ${item}: ${ast1[item]}${os.EOL}`;
    } else if (ast2[item]) {
      return `${acc}  + ${item}: ${ast2[item]}${os.EOL}  - ${item}: ${ast1[item]}${os.EOL}`;
    }
    return `${acc}  - ${item}: ${ast1[item]}${os.EOL}`;
  }, '');

  const diff2 = keys2.reduce((acc, item) =>
    `${acc}  + ${item}: ${ast2[item]}${os.EOL}`, '');

  return `{${os.EOL}${diff1}${diff2}}`;
};
*/


test('gendiff', () => {
  const pathToFile1 = __dirname + '/before.json';
  const pathToFile2 = __dirname + '/after.json';

  const expected = fs.readFileSync(__dirname + '/expected.txt', 'utf8');
  const current = gendiff(pathToFile1, pathToFile2);

  expect(current).toBe(expected);
//  expect(1).toBe(1);
});
