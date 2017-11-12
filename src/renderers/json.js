import _ from 'lodash';

const render = (ast) => {
  const json = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
      children,
    } = item;

    acc[key] = {};

    if (type === 'updated') {
      acc[key].oldValue = oldValue;
      acc[key].value = newValue;
    } else if (type === 'added') {
      acc[key].value = _.isPlainObject(newValue) ? 'complex value' : newValue;
    } else if (type === 'removed') {
      acc[key].value = _.isPlainObject(oldValue) ? 'complex value' : oldValue;
    } else if (type === 'unknown') {
      acc[key].value = render(children);
    } else {
      acc[key].value = oldValue;
    }

    if (type) {
      acc[key].type = type;
    }

    return acc;
  }, {});

  return json;
};


export default render;
