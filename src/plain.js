import os from 'os';


const flatten = (ast, path = []) => {
  if (!Array.isArray(ast)) return [];

  const levelDiff = ast.reduce((acc, item) => {
    const { key, value, type } = item;

    const hasChildren = Array.isArray(value);
    const isActualLeaf = type === 'actual' && !hasChildren;

    if (isActualLeaf) return acc;

    const notActual = hasChildren && type !== 'actual';

    const newItem = item;
    newItem.path = path;

    const newItemNode = notActual ? newItem : [];

    return acc.concat(hasChildren ? newItemNode : newItem, flatten(value, path.concat(key)));
  }, []);

  return levelDiff;
};


const getStatus = (type) => {
  const status = type.slice(-1)[0];
  const wasSingle = type.slice(0, -1).indexOf(status) < 0;
  return wasSingle ? status : 'actual';
};

const prepareValue = (value, status) => {
  const newValue = typeof value === 'string' ? `'${value}'` : value;
  if (status === 'added') {
    return typeof newValue === 'object' ?
                'complex value' : `value: ${newValue}`;
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getChanges = (value, valueOld, status) => {
  const newValue = prepareValue(value, status);
  const newValueOld = prepareValue(valueOld, status);
  if (status === 'updated') {
    return `updated. From ${newValueOld} to ${newValue}`;
  }
  if (status === 'added') {
    return `added with ${newValue}`;
  }

  return 'removed';
};


const toPlainString = (ast) => {
  const flattenedAST = flatten(ast);

  const flatOutput = flattenedAST.reduce((acc, item) => {
    const {
      key,
      value,
      valueOld,
      type,
      path,
    } = item;

    const status = getStatus(type);

    if (status === 'actual') return acc;

    const pathToKey = path.length ? `${path.join('.')}.` : '';

    const keyLine = `Property '${pathToKey}${key}' was `;

    const changesLine = getChanges(value, valueOld, status);

    return acc.concat(keyLine + changesLine);
  }, []);

  return flatOutput.join(os.EOL);
};


export default toPlainString;
