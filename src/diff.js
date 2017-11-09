import os from 'os';
import _ from 'lodash';

const tab = '    ';


const isActual = (ast1, ast2, key) => {
  const hasChildrenInBothAST = typeof ast1[key] === 'object'
                            && typeof ast2[key] === 'object';
  return ast2[key] === ast1[key] || hasChildrenInBothAST;
};

const getStatus = (ast1, ast2, key) => {
  if (isActual(ast1, ast2, key)) return 'actual';

  if (ast1[key] && ast2[key]) return 'changed';

  if (ast2[key]) return 'added';

  return 'deleted';
};

const getNewAST = (ast1, ast2) => {
  const newAST1 = typeof ast1 === 'object' ? ast1 : {};
  const newAST2 = typeof ast2 === 'object' ? ast2 : {};

  return { newAST1, newAST2 };
};

const isEnd = (ast1, ast2) => typeof ast1 !== 'object'
                           && typeof ast2 !== 'object';


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


const getDiff = (ast1, ast2, level, isFromLastVersion = true) => {

  const diffKeys = merge(ast1, ast2);

/*
  if (typeof ast1 !== 'object') return ast1;
  if (typeof ast2 !== 'object') return ast2;

  const newLevel = level + 1;
  const keys = _.union(Object.keys(ast1), Object.keys(ast2));

  const diff = keys.reduce((acc, item) => {
    const line = `  ${item}: `;
    const plusLine = `${isFromLastVersion ? '+' : ' '} ${item}: `;
    const minusline = `${isFromLastVersion ? '-' : ' '} ${item}: `;

    const hasChildrenInBothAST = typeof ast1[item] === 'object' && item in ast1 && item in ast2;
    if (ast2[item] === ast1[item] || hasChildrenInBothAST) {
      return acc.concat(line + getDiff(ast1[item], ast2[item], newLevel, isFromLastVersion));
    }

    const newLine = plusLine + getDiff({}, ast2[item], newLevel, false);
    const oldLine = minusline + getDiff(ast1[item], {}, newLevel, false);

    if (ast2[item]) {
      const newAcc = acc.concat(newLine);
      return ast1[item] ? newAcc.concat(oldLine) : newAcc;
    }

    return acc.concat(oldLine);
  }, []);
*/

  const margin = tab.repeat(level);
  const marginBig = `  ${tab.repeat(level)}`;
  const result = diff.join(`${os.EOL}${marginBig}`);

  return `{${os.EOL}${marginBig}${result}${os.EOL}${margin}}`;
};

export default (ast1, ast2) => getDiff(ast1, ast2, 0);
