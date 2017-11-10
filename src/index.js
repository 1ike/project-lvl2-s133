import fs from 'fs';

import parsers from './parsers';
import getAST from './ast';
import toJSONString from './json';
import toPlainString from './plain';

const transformersToString = {
  json: toJSONString,
  plain: toPlainString,
};

const gendiff = (pathToFile1, pathToFile2, inputFormat, outputFormat = 'json') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const pars = parsers[inputFormat];

  const tree1 = pars(file1);
  const tree2 = pars(file2);

  const ast = getAST(tree1, tree2);

  const toString = transformersToString[outputFormat];


  return toString(ast);
};

export default gendiff;
