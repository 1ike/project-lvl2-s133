import os from 'os';
import _ from 'lodash';


export default (ast1, ast2) => {
  const keys = _.union(Object.keys(ast1), Object.keys(ast2));

  const diff = keys.reduce((acc, item) => {
    const actualLine = `  ${item}: ${ast1[item]}`;
    const oldLine = `- ${item}: ${ast1[item]}`;
    const newLine = `+ ${item}: ${ast2[item]}`;

    if (ast2[item] === ast1[item]) {
      return acc.concat(actualLine);
    }

    if (ast1[item] && ast2[item]) {
      return acc.concat(newLine, oldLine);
    }

    if (ast2[item]) {
      return acc.concat(newLine);
    }

    return acc.concat(oldLine);
  }, []);

  const result = diff.join(`${os.EOL}  `);

  return `{${os.EOL}  ${result}${os.EOL}}`;
};
