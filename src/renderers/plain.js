import os from 'os';

import { getTypeForShow, typeEnums as t } from '../libs';


const isActualLeaf = (type, hasChildren) => type === t.actual && !hasChildren;

const getNewItemNode = (type, hasChildren, item) => {
  const isNotActual = hasChildren && type !== t.actual;
  return isNotActual ? item : [];
};

const getResultItem = (hasChildren, item, newItemNode) => {
  const res = hasChildren ? newItemNode : item;
  return res;
};

const flatten = (ast) => {
  if (!Array.isArray(ast)) return [];

  const levelDiff = ast.reduce((acc, item) => {
    const { value, types } = item;

    const hasChildren = Array.isArray(value);

    const type = getTypeForShow(types);

    if (isActualLeaf(type, hasChildren)) return acc;

    const newItemNode = getNewItemNode(type, hasChildren, item);

    const resultItem = getResultItem(hasChildren, item, newItemNode);


    return acc.concat(resultItem, flatten(value));
  }, []);

  return levelDiff;
};


const prepareValue = (value, type) => {
  const newValue = typeof value === 'string' ? `'${value}'` : value;
  if (type === t.added) {
    return typeof newValue === 'object' ? 'complex value' : `value: ${newValue}`;
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getChanges = (value, valueOld, type) => {
  const newValue = prepareValue(value, type);
  const newValueOld = prepareValue(valueOld, type);
  if (type === t.updated) {
    return `updated. From ${newValueOld} to ${newValue}`;
  }
  if (type === t.added) {
    return `added with ${newValue}`;
  }

  return t.removed;
};


const toPlainString = (ast) => {
  const flattenedAST = flatten(ast);

  const flatOutput = flattenedAST.reduce((acc, item) => {
    const {
      key,
      value,
      valueOld,
      types,
      path,
    } = item;

    const type = getTypeForShow(types);

    if (type === t.actual) return acc;

    const pathString = `${path.slice(0, -1).join('.')}.`;

    const pathToKey = path.length > 1 ? pathString : '';

    const keyLine = `Property '${pathToKey}${key}' was `;

    const changesLine = getChanges(value, valueOld, type);

    return acc.concat(keyLine + changesLine);
  }, []);

  return flatOutput.join(os.EOL);
};


export default toPlainString;
