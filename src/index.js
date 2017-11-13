import fs from 'fs';

import yamlParser from 'js-yaml';
import ini from 'ini';

import genDiff from './ast';
import getRenderer from './renderers';


const parsers = {
  json: JSON.parse,
  yaml: yamlParser.safeLoad,
  yml: yamlParser.safeLoad,
  ini: ini.decode,
};


const gendiff = (pathToFile1, pathToFile2, inputFormat, outputFormat = 'tree') => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');

  const parse = parsers[inputFormat];

  const tree1 = parse(file1);
  const tree2 = parse(file2);

  const ast = genDiff(tree1, tree2);

  const render = getRenderer(outputFormat);

  return render(ast);
};

export default gendiff;
