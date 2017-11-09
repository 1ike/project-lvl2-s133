import os from 'os';
import _ from 'lodash';

const tab = '    ';


const hasChildrenInBothAST = (ast1, ast2, key) => {
  const res = typeof ast1[key] === 'object'
           && typeof ast2[key] === 'object';
  return res;
}

const isActual = (ast1, ast2, key) => {
  const hasChildrenInBothAST = typeof ast1[key] === 'object'
                            && typeof ast2[key] === 'object';
  return ast2[key] === ast1[key] || hasChildrenInBothAST;
};

const getStatus = (ast1, ast2, key) => {
  if (isActual(ast1, ast2, key)) return 'actual';

  if (ast2[key]) return 'changed';

  return 'deleted';
};

const merge = (ast1, ast2, level = 0) => {
  if (typeof ast1 !== 'object') return ast1;
  if (typeof ast2 !== 'object') return ast2;


  const keys = _.union(Object.keys(ast1), Object.keys(ast2));

  const getValue = (key) => {
    const newLevel = level + 1;
    let res;
    if (hasChildrenInBothAST(ast1, ast2, key)) {
      res = merge(ast1[key], ast2[key], newLevel);
    } else if (typeof ast1[key] === 'object') {
      res = merge(ast1[key], {}, newLevel);
    } else {
      res = merge({}, ast2[key], newLevel);
    }

    return res;
  };


  const ast = keys.map((key) => {
    const status = getStatus(ast1, ast2, key);

    const value = getValue(key);

    return { key, value, level, status };
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
