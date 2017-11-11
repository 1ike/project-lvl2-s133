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
