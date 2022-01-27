function filterObject(Object, keys) {
  keys.forEach((key) => {
    delete Object[key];
  });

  return object;
}
module.exports = {
  filterObject,
};
