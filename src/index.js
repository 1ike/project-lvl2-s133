import fs from 'fs';

import formats from './formats';


const gendiff = (pathToFile1, pathToFile2, fileFormat = 'json') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const [pars, getDiff] = formats[fileFormat];

  const ast1 = pars(file1);
  const ast2 = pars(file2);

  return getDiff(ast1, ast2);
};

export default gendiff;
