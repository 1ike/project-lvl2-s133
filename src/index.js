import fs from 'fs';

import parsers from './parsers';
import getDiff from './diff';

const gendiff = (pathToFile1, pathToFile2, inputFormat, outputFormat = 'json') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const pars = parsers[inputFormat];

  const ast1 = pars(file1);
  const ast2 = pars(file2);

  return getDiff(ast1, ast2, outputFormat);
};

export default gendiff;
