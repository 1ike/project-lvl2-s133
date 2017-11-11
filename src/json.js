import os from 'os';

import getStatus from './libs';

const tab = '    ';
const prefixActual = '  ';
const prefixPlus = '+ ';
const prefixMinus = '- ';


const getPrefix = (status) => {
  if (status === 'actual') return prefixActual;
  if (status === 'removed' || status === 'updated') {
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
      type,
    } = item;

    const status = getStatus(type);
    const prefix = getPrefix(status);

    const line = `${key}: ${toString(value, level + 1)}`;
    const result = prefix + line;
    if (status === 'updated') {
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
