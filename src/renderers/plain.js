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

    if (type === 'added') {
      const value = _.isPlainObject(newValue) ? 'complex value' : `value: '${newValue}'`;
      const line = `${keyLine}added with ${value}`;

      return [...acc, line];
    }

    if (type === 'updated') {
      return [...acc, `${keyLine}updated. From '${oldValue}' to '${newValue}'`];
    }

    if (type === 'removed') {
      return [...acc, `${keyLine}removed`];
    }

    if (type === 'unknown') {
      return acc.concat(render(children, newPath));
    }

    return acc.concat(acc);
  }, []);

  return _.uniq(flatOutput).join(os.EOL);
};


export default render;
