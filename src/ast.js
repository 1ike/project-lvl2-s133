import _ from 'lodash';

import { typeEnums as t } from './libs';

const isActual = (tree1, tree2, key) => {
  const hasChildrenInBothTrees = typeof tree1[key] === 'object'
                            && typeof tree2[key] === 'object';
  return tree2[key] === tree1[key] || hasChildrenInBothTrees;
};

const isEnd = (tree1, tree2) => typeof tree1 !== 'object'
                           && typeof tree2 !== 'object';

const getNewTree = (tree1, tree2) => {
  const newTree1 = typeof tree1 === 'object' ? tree1 : {};
  const newTree2 = typeof tree2 === 'object' ? tree2 : {};

  return { newTree1, newTree2 };
};


const getType = (tree1, tree2, key) => {
  if (isActual(tree1, tree2, key)) return t.actual;

  if (tree1[key] && tree2[key]) return t.updated;

  if (tree2[key]) return t.added;

  return t.removed;
};


const getAST = (tree1, tree2, types = [t.actual], path = []) => {
  if (isEnd(tree1, tree2)) return tree2 || tree1;

  const { newTree1, newTree2 } = getNewTree(tree1, tree2);
  const keys = _.union(Object.keys(newTree1), Object.keys(newTree2));

  const type = _.last(types);

  const ast = keys.reduce((acc, key) => {
    const newType = type === t.actual ? getType(newTree1, newTree2, key) : type;

    const newTypes = types.concat(newType);
    const newPath = path.concat(key);
    const value = getAST(newTree1[key], newTree2[key], newTypes, newPath);
    const valueOld = newTree1[key];

    return acc.concat({
      key,
      value,
      valueOld,
      types: newTypes,
      path: newPath,
    });
  }, []);

  return ast;
};

export default getAST;
