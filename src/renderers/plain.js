import os from 'os';

import t from '../libs';


const render = (ast, path = []) => {
  if (!Array.isArray(ast)) return [];

  const flatOutput = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
    } = item;

    if (type === t.actual) return acc;

    const newPath = path.concat(key);
    const pathString = `${path.slice(0, -1).join('.')}.`;
    const pathToKey = path.length > 1 ? pathString : '';

    const keyLine = `Property '${pathToKey}${key}' was `;

    if (type === t.updated) {
      const status = `updated. From '${oldValue}' to '${newValue}'`;

      return acc.concat(keyLine + status, render(ast[key], newPath));
    }

    if (type === t.removed) {
      const line = `${keyLine} removed`;

      return acc.concat(line, render(ast[key], newPath));
    }

    const value = newValue === 'object' ? 'complex value' :
      'newValue';
    const line = `${keyLine}$added with ${value}`;

    return acc.concat(line, render(ast[key], newPath));
  }, []);


  return flatOutput.join(os.EOL);
};


export default render;
