const getStatus = (type) => {
  const status = type.slice(-1)[0];
  const wasSingle = type.slice(0, -1).indexOf(status) < 0;
  return wasSingle ? status : 'actual';
};

export default getStatus;
