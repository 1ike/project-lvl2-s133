import os from 'os';

import t from '../libs';

const tab = '    ';
const prefixActual = '  ';
const prefixPlus = '+ ';
const prefixMinus = '- ';


const toString = (value, level) => {
  if (typeof value !== 'object') return value;

  const margin = `${tab.repeat(level + 1)}`;
  const result = JSON.stringify(value, null, 4).replace(/"/g, '');

  return `{${os.EOL}${margin}${result.slice(2, -1)}${margin}}`;
};


const render = (ast, level = 0) => {
  const levelDiff = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
    } = item;

    if (type === t.actual) {
      if (typeof oldValue !== 'object') {
        return acc.concat(`${prefixActual}${key}: ${oldValue}`);
      }

      return acc.concat(`${prefixActual}${key}: ${render(oldValue, level + 1)}`);
    }

    if (type === t.updated) {
      const newLine = `${prefixPlus}${key}: ${newValue}`;
      const oldLine = `${prefixMinus}${key}: ${oldValue}`;
      return acc.concat(newLine, oldLine);
    }

    if (type === t.removed) {
      return acc.concat(`${prefixMinus}${key}: ${toString(oldValue, level)}`);
    }

    return acc.concat(`${prefixPlus}${key}: ${toString(newValue, level)}`);
  }, []);

  const margin = tab.repeat(level);
  const result = levelDiff.join(`${os.EOL}  ${margin}`);

  return `{${os.EOL}  ${margin}${result}${os.EOL}${margin}}`;
};

export default render;
