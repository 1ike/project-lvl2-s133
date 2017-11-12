import os from 'os';

import _ from 'lodash';

const render = (ast, path = []) => {
  const flatOutput = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
      children,
    } = item;

    const newPath = path.concat(key);
    const pathString = `${newPath.slice(0, -1).join('.')}.`;
    const pathToKey = path.length > 0 ? pathString : '';
    const keyLine = `Property '${pathToKey}${key}' was `;

    switch (type) {
      case 'added':
        const value = typeof newValue === 'object' ? 'complex value' :
          `value: '${newValue}'`;
        const line = `${keyLine}added with ${value}`;

        return acc.concat(line);
        break;

      case 'updated':
        return acc.concat(`${keyLine}updated. From '${oldValue}' to '${newValue}'`);
        break;

      case 'removed':
        return acc.concat(`${keyLine}removed`);
        break;

      default:
        return acc.concat(children ? render(children, newPath) : acc);
        break;
    }

  }, []);

  return _.uniq(flatOutput).join(os.EOL);
};


export default render;
