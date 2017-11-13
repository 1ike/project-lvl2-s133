import os from 'os';

import _ from 'lodash';

const render = (ast, path = []) => {
  const transformed = ast.map((item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
      children,
    } = item;

    const newPath = [...path, key];
    const pathString = `${newPath.slice(0, -1).join('.')}.`;
    const pathToKey = path.length > 0 ? pathString : '';
    const keyLine = `Property '${pathToKey}${key}' was `;

    if (type === 'added') {
      const value = _.isPlainObject(newValue) ? 'complex value' : `value: '${newValue}'`;

      return `${keyLine}added with ${value}`;
    }

    if (type === 'updated') {
      return `${keyLine}updated. From '${oldValue}' to '${newValue}'`;
    }

    if (type === 'removed') {
      return `${keyLine}removed`;
    }

    if (type === 'actual') {
      return '';
    }

    return render(children, newPath);
  });

  return _.compact(_.flattenDeep(transformed)).join(os.EOL);
};


export default render;
