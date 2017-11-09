import os from 'os';
import _ from 'lodash';

const tab = '    ';

const getKeys = (ast1, ast2) => {
  const newAST1 = typeof ast1 === 'object' ? ast1 : {};
  const newAST2 = typeof ast1 === 'object' ? ast2 : {};
  return _.union(Object.keys(ast1), Object.keys(ast2));
}

const flattenDiffKeys = (ast1, ast2, path) => {

  const keys = getKeys(ast1, ast2);

  const diff = keys.reduce((acc, item) => {
    const isEndAST1 = typeof ast1[item] === 'object';
    const isEndAST2 = typeof ast2[item] === 'object';

    return isEndAST1 && isEndAST2 ?
      acc.concat(item) :
      acc.concat(flattenDiffKeys(ast1, ast2, path.concat(item)));
  }, []);

  return diff
}



const getDiff = (ast1, ast2, level, isFromLastVersion = true) => {



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
