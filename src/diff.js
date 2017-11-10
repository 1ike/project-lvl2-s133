import os from 'os';
import _ from 'lodash';

const tab = '    ';
const prefixActual = '  ';
const prefixPlus = '+ ';
const prefixMinus = '- ';


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

const getPrefix = (status) => {
  if (status === 'actual') return prefixActual;
  if (status === 'deleted') return prefixMinus;

  return prefixPlus;
};


const merge = (ast1, ast2, status = 'actual') => {
  if (isEnd(ast1, ast2)) return ast1 || ast2;

  const { newAST1, newAST2 } = getNewAST(ast1, ast2);
  const keys = _.union(Object.keys(newAST1), Object.keys(newAST2));

  const ast = keys.reduce((acc, key) => {
    const newStatus = getStatus(newAST1, newAST2, key, status);
    const prefix = getPrefix(newStatus);

    if (newStatus === 'changed') {
      const value1 = { key, value: newAST2[key], prefix };
      const value2 = { key, value: newAST1[key], prefix: prefixMinus };
      return acc.concat(value1, value2);
    }

    const value = merge(newAST1[key], newAST2[key], newStatus);

    return acc.concat({ key, value, prefix });
  }, []);

  return ast;
};


const toString = (ast, level = 0) => {
  if (!Array.isArray(ast)) return ast;

  const levelDiff = ast.reduce((acc, item) => {
    const { prefix, key, value } = item;

    const line = `${prefix}${key}: ${toString(value, level + 1)}`;

    return acc.concat(line);
  }, []);

  const margin = tab.repeat(level);
  const marginBig = `  ${tab.repeat(level)}`;
  const result = levelDiff.join(`${os.EOL}${marginBig}`);

  return `{${os.EOL}${marginBig}${result}${os.EOL}${margin}}`;
};

const getDiff = (ast1, ast2) => {
  const ast = merge(ast1, ast2);

  return toString(ast);
};

export default getDiff;
