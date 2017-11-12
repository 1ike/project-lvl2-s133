/*
const render = (ast) => {
  if (!Array.isArray(ast)) return ast;

  const flatOutput = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
    } = item;


    if (type === 'updated') {
      current.oldValue = oldValue;
      if (type === 'added') {
        current.value = typeof newValue === 'object' ? 'complex value' : newValue;
      }
    } else {
      current.value = render(oldValue, path.concat(key, 'value'));
    }

    if (type) {
      current.type = type;
    }

    return acc;
  }, {});


  return JSON.stringify(flatOutput);
};


export default render;
*/
