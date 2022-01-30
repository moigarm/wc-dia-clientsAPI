function filterObject(Object, keys) {
  keys.forEach((key) => {
    delete Object[key];
  });

  return Object;
}

function deleteFromArray(original, membersToDelete){
  membersToDelete.forEach((key)=>{
    let i = original.indexOf(key)
    delete original[i]
  })
  return original
}

function ObjCompare(obj1, obj2, propExceptions){
  let Obj1_keys = Object.keys(obj1);
  let Obj2_keys = Object.keys(obj2);
  if(propExceptions.length > 0){
    Obj1_keys = deleteFromArray(Obj1_keys, propExceptions)
    Obj2_keys = deleteFromArray(Obj2_keys, propExceptions)
  }
  if (Obj1_keys.length !== Obj2_keys.length){
      return false;
  }
  for (let k of Obj1_keys){
      if(obj1[k] !== obj2[k]){
         return false;
      }
  }
  return true;
}
module.exports = {
  filterObject,
  ObjCompare
};
