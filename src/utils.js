
exports.values = (obj)=>{
  try {
    return Object.keys(obj).map(key=>obj[key]);
  } catch (e) {
    return [];
  }
};
exports.isTrue= (func)=>{
  try {
    return func();
  } catch (e) {
    return false;
  }
};
