import fs from 'fs';
import os from 'os';
import _ from 'lodash';

import getParser from './parser';


const gendiff = (pathToFile1, pathToFile2, fileFormat = 'json') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const parser = getParser(fileFormat);
  const ast1 = parser(file1);
  const ast2 = parser(file2);

  const keys = _.union(Object.keys(ast1), Object.keys(ast2));

  const diff = keys.reduce((acc, item) => {
    const item1 = `${item}: ${ast1[item]}${os.EOL}`;
    const item2 = `${item}: ${ast2[item]}${os.EOL}`;

    if (ast2[item] === ast1[item]) {
      return `${acc}    ${item1}`;
    }

    if (ast1[item] && ast2[item]) {
      return `${acc}  + ${item2}  - ${item1}`;
    }

    if (ast2[item]) {
      return `${acc}  + ${item2}`;
    }

    return `${acc}  - ${item1}`;
  }, '');


  return `{${os.EOL}${diff}}`;
};

export default gendiff;
