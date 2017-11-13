import _ from 'lodash';


const genDiff = (tree1, tree2) => {
  const keys = _.union(Object.keys(tree1), Object.keys(tree2));

  const ast = keys.reduce((acc, key) => {
    if (tree1[key] && tree2[key]) {
      if (_.isPlainObject(tree1[key]) && _.isPlainObject(tree2[key])) {
        return [...acc, {
          type: 'nested',
          key,
          children: genDiff(tree1[key], tree2[key]),
        }];
      }

      if (tree1[key] === tree2[key]) {
        return [...acc, { type: 'actual', key, oldValue: tree1[key] }];
      }

      return [...acc, {
        type: 'updated',
        key,
        newValue: tree2[key],
        oldValue: tree1[key],
      }];
    }

    if (!tree2[key]) {
      return [...acc, { type: 'removed', key, oldValue: tree1[key] }];
    }

    return [...acc, { type: 'added', key, newValue: tree2[key] }];
  }, []);

  return ast;
};

export default genDiff;
