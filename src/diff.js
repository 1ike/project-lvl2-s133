import os from 'os';
import _ from 'lodash';

const tab = '    ';


const isActual = (ast1, ast2, key) => {
  const hasChildrenInBothAST = typeof ast1[key] === 'object'
                            && typeof ast2[key] === 'object';
  return ast2[key] === ast1[key] || hasChildrenInBothAST;
};

const isEnd = (ast1, ast2) => typeof ast1 !== 'object'
                           && typeof ast2 !== 'object';

const getNewAST = (ast1, ast2) => {
  const newAST1 = typeof ast1 === 'object' ? ast1 : {};
  const newAST2 = typeof ast2 === 'object' ? ast2 : {};

  return { newAST1, newAST2 };
};


const getCurrentStatus = (ast1, ast2, key) => {
  if (isActual(ast1, ast2, key)) return 'actual';

  if (ast1[key] && ast2[key]) return 'changed';

  if (ast2[key]) return 'added';

  return 'deleted';
};

const getStatus = (ast1, ast2, key, status) => {
  const currentStatus = getCurrentStatus(ast1, ast2, key);
  const mustBeActual = status === 'added' || status === 'deleted';

  return mustBeActual ? 'actual' : currentStatus;
};


const merge = (ast1, ast2, status = 'actual', level = 0) => {
  if (isEnd(ast1, ast2)) return '';

  const { newAST1, newAST2 } = getNewAST(ast1, ast2);
  const keys = _.union(Object.keys(newAST1), Object.keys(newAST2));

  const ast = keys.map((key) => {
    const newStatus = getStatus(newAST1, newAST2, key, status);

    const newLevel = level + 1;

    const value = merge(newAST1[key], newAST2[key], newStatus, newLevel);

    return { key, value, status: newStatus, level };
  }, []);

  return ast;
};


const toString = (ast, level = 0) => {
  if (Array.isArray(ast)) return ast;

  const levelDiff = ast.reduce((acc, item) => {
    const {
      key,
      value,
      status,
      level: lvl,
    } = item;
    const isValueArray = Array.isArray(value);
    const result = isValueArray ? toString(value, lvl) : value;

    const line = `+ ${key}:  ${result}`;
    const newLine = `+ ${key}:  ${result}`;
    const oldLine = `- ${key}:  ${result}`;
    if (status === 'changed') {
      return acc.concat(newLine, oldLine);
    }
    if (status === 'added') {
      return acc.concat(newLine);
    }
    if (status === 'deleted') {
      return acc.concat(oldLine);
    }

    return acc.concat(line);
  }, []);

  const margin = tab.repeat(level);
  const marginBig = `  ${tab.repeat(level)}`;
  const result = levelDiff.join(`${os.EOL}${marginBig}`);

  return `{${os.EOL}${marginBig}${result}${os.EOL}${margin}}`;
};

export default (ast1, ast2) => toString(merge(ast1, ast2));
