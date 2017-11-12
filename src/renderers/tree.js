import os from 'os';
import _ from 'lodash';

const tab = '    ';
const prefixActual = '  ';
const prefixPlus = '+ ';
const prefixMinus = '- ';


const toString = (value, level) => {
  if (!_.isPlainObject(value)) return value;

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
      children,
    } = item;

    if (type === 'actual') {
      if (!children) {
        return [...acc, `${prefixActual}${key}: ${oldValue}`];
      }

      return [...acc, `${prefixActual}${key}: ${render(children, level + 1)}`];
    }

    if (type === 'updated') {
      const newLine = `${prefixPlus}${key}: ${newValue}`;
      const oldLine = `${prefixMinus}${key}: ${oldValue}`;
      return [...acc, newLine, oldLine];
    }

    if (type === 'removed') {
      return [...acc, `${prefixMinus}${key}: ${toString(oldValue, level)}`];
    }

    return [...acc, `${prefixPlus}${key}: ${toString(newValue, level)}`];
  }, []);

  const margin = tab.repeat(level);
  const result = levelDiff.join(`${os.EOL}  ${margin}`);

  return `{${os.EOL}  ${margin}${result}${os.EOL}${margin}}`;
};

export default render;
