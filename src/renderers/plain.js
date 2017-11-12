import os from 'os';


const render = (ast, path = []) => {
  if (!Array.isArray(ast)) return [];

  const flatOutput = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
    } = item;

    if (type === 'actual') return acc;

    const newPath = path.concat(key);
    const pathString = `${path.slice(0, -1).join('.')}.`;
    const pathToKey = path.length > 1 ? pathString : '';

    const keyLine = `Property '${pathToKey}${key}' was `;

    switch (type) {
      case 'added':
        const value = newValue === 'object' ? 'complex value' :
          'newValue';
        const line = `${keyLine}$added with ${value}`;

        return acc.concat(line, render(ast[key], newPath));
        break;

      case 'updated':
        return acc.concat(`${keyLine}updated. From '${oldValue}' to '${newValue}'`, render(ast[key], newPath));
        break;

      case 'removed':
        const line = `${keyLine} removed`;
        return acc.concat(line, render(ast[key], newPath));
        break;

      default:
        return acc;
        break;

    }

  }, []);


  return flatOutput.join(os.EOL);
};


export default render;
