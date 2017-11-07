import os from 'os';
import _ from 'lodash';


export default (ast1, ast2) => {
  const keys = _.union(Object.keys(ast1), Object.keys(ast2));

  const diff = keys.reduce((acc, item) => {
    const item1 = `${item}: ${ast1[item]}${os.EOL}`;
    const item2 = `${item}: ${ast2[item]}${os.EOL}`;

    if (ast2[item] === ast1[item]) {
      return `${acc}    ${item1}`;
    }

    if (ast1[item] && ast2[item]) {
      return `${acc}  + ${item2}  - ${item1}`;
    }

    if (ast2[item]) {
      return `${acc}  + ${item2}`;
    }

    return `${acc}  - ${item1}`;
  }, '');


  return `{${os.EOL}${diff}}`;
};
