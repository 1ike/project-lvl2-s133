import fs from 'fs';

import yamlParser from 'js-yaml';
import ini from 'ini';

import getAST from './ast';
import toTreeString from './tree';
import toPlainString from './plain';

const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
  ini: ini.decode,
};

const transformersToString = {
  tree: toTreeString,
  plain: toPlainString,
};

const gendiff = (pathToFile1, pathToFile2, inputFormat, outputFormat = 'tree') => {
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
