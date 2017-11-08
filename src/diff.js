import os from 'os';
import _ from 'lodash';

const tab = '    ';

const getDiff = (ast1, ast2, level, isFromLastVersion = true) => {
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
    if (ast1[item] && ast2[item]) {
      return acc.concat(newLine, oldLine);
    }

    if (ast2[item]) {
      return acc.concat(newLine);
    }

    return acc.concat(oldLine);
  }, []);

  const margin = tab.repeat(level);
  const marginBig = `  ${tab.repeat(level)}`;
  const result = diff.join(`${os.EOL}${marginBig}`);

  return `{${os.EOL}${marginBig}${result}${os.EOL}${margin}}`;
};

export default (ast1, ast2) => getDiff(ast1, ast2, 0);
