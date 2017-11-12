const render = (ast) => {
/*  if (!Array.isArray(ast)) return ast;

  const flatOutput = ast.reduce((acc, item) => {
    const {
      key,
      newValue,
      oldValue,
      type,
      children,
    } = item;

    const newAcc = {key:{}};


    if (type === 'updated') {
      newAcc.key.oldValue = oldValue;
      if (type === 'added') {
        newAcc.key.value = children ? 'complex value' : newValue;
      }
    } else {
      newAcc.key.value = children ? render(children) : oldValue;
    }

    if (type) {
      newAcc.type = type;
    }
console.log('newAcc:', newAcc);
    return newAcc;
  }, {});


  return JSON.stringify(flatOutput);*/
};


export default render;
