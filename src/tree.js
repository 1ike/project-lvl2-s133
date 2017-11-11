import os from 'os';

import { getTypeForShow, typeEnums as t } from './libs';

const tab = '    ';
const prefixActual = '  ';
const prefixPlus = '+ ';
const prefixMinus = '- ';


const getPrefix = (type) => {
  if (type === t.actual) return prefixActual;
  if (type === t.removed || type === t.updated) {
    return prefixMinus;
  }

  return prefixPlus;
};


const toString = (ast, level = 0) => {
  if (!Array.isArray(ast)) return ast;

  const levelDiff = ast.reduce((acc, item) => {
    const {
      key,
      value,
      valueOld,
      types,
    } = item;

    const type = getTypeForShow(types);
    const prefix = getPrefix(type);

    const line = `${key}: ${toString(value, level + 1)}`;
    const result = prefix + line;
    if (type === t.updated) {
      const addedLine = `${prefixMinus}${key}: ${valueOld}`;
      return acc.concat(prefixPlus + line, addedLine);
    }
    return acc.concat(result);
  }, []);

  const margin = tab.repeat(level);
  const marginBig = `  ${tab.repeat(level)}`;
  const result = levelDiff.join(`${os.EOL}${marginBig}`);

  return `{${os.EOL}${marginBig}${result}${os.EOL}${margin}}`;
};

export default toString;
