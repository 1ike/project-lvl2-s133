import _ from 'lodash';


const genDiff = (tree1, tree2) => {
  const keys = _.union(Object.keys(tree1), Object.keys(tree2));

  const ast = keys.reduce((acc, key) => {
    if (tree1[key] && tree2[key]) {
      if (typeof tree1[key] === 'object' && typeof tree2[key] === 'object') {
        return acc.concat({
          type: 'actual',
          key,
          children: genDiff(tree1[key], tree2[key]),
        });
      }

      if (tree1[key] === tree2[key]) {
        return acc.concat({ type: 'actual', key, oldValue: tree1[key] });
      }

      return acc.concat({
        type: 'updated',
        key,
        newValue: tree2[key],
        oldValue: tree1[key],
      });
    }

    if (!tree2[key]) {
      return acc.concat({ type: 'removed', key, oldValue: tree1[key] });
    }

    return acc.concat({ type: 'added', key, newValue: tree2[key] });
  }, []);

  return ast;
};

export default genDiff;
