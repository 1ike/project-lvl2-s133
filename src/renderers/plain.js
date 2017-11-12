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
        const value = _.isPlainObject(newValue) ? 'complex value' :
          `value: '${newValue}'`;
        const line = `${keyLine}added with ${value}`;

        return [...acc, line];
        break;

      case 'updated':
        return [...acc, `${keyLine}updated. From '${oldValue}' to '${newValue}'`];
        break;

      case 'removed':
        return [...acc, `${keyLine}removed`];
        break;

      default:
        return acc.concat(children ? render(children, newPath) : acc);
        break;
    }

  }, []);

  return _.uniq(flatOutput).join(os.EOL);
};


export default render;
