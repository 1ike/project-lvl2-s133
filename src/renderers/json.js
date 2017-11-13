import _ from 'lodash';

/*const render = (ast) => {
  const json = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
      children,
    } = item;

    const obj = Object.assign({}, acc);
    obj[key] = {};

    if (type === 'updated') {
      obj[key].oldValue = oldValue;
      obj[key].value = newValue;
    } else if (type === 'added') {
      obj[key].value = _.isPlainObject(newValue) ? 'complex value' : newValue;
    } else if (type === 'removed') {
      obj[key].value = _.isPlainObject(oldValue) ? 'complex value' : oldValue;
    } else if (type === 'nested') {
      obj[key].value = render(children);
    } else {
      obj[key].value = oldValue;
    }

    if (type) {
      obj[key].type = type;
    }

    return obj;
  }, {});

  return ;
};*/

export default ast => JSON.stringify(ast);
