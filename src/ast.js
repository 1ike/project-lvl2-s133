import _ from 'lodash';


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


const getStatus = (tree1, tree2, key) => {
  if (isActual(tree1, tree2, key)) return 'actual';

  if (tree1[key] && tree2[key]) return 'updated';

  if (tree2[key]) return 'added';

  return 'removed';
};


const getAST = (tree1, tree2, type = ['actual']) => {
  if (isEnd(tree1, tree2)) return tree2 || tree1;

  const { newTree1, newTree2 } = getNewTree(tree1, tree2);
  const keys = _.union(Object.keys(newTree1), Object.keys(newTree2));

  const status = _.last(type);

  const ast = keys.reduce((acc, key) => {
    const newStatus = status === 'actual' ? getStatus(newTree1, newTree2, key) : status;

    const newType = type.concat(newStatus);
    const value = getAST(newTree1[key], newTree2[key], newType);
    const valueOld = newTree1[key];

    return acc.concat({
      key,
      value,
      valueOld,
      type: newType,
    });
  }, []);

  return ast;
};

export default getAST;
