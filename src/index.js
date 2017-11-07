import fs from 'fs';

import getParser from './parser';
import getDiff from './diff';


const gendiff = (pathToFile1, pathToFile2, fileFormat = 'json') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const parser = getParser(fileFormat);
  const ast1 = parser(file1);
  const ast2 = parser(file2);

  return getDiff(ast1, ast2);
};

export default gendiff;
