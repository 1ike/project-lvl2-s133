const typeEnums = {
  actual: 'actual',
  updated: 'updated',
  added: 'added',
  removed: 'removed',
};

const getTypeForShow = (types) => {
  const type = types.slice(-1)[0];
  const wasSingle = types.slice(0, -1).indexOf(type) < 0;
  return wasSingle ? type : typeEnums.actual;
};

export { getTypeForShow, typeEnums };
