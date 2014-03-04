module.exports = {
  safe: function safe(thing, path, otherwise) {
    thing = (thing instanceof Object) ? thing : {};
    var props = path.split('.');
    if (props.length === 1) {
      return thing[props.shift()] || otherwise;
    } else {
      var prop = props.shift();
      return (thing[prop] instanceof Object) ? safe(thing[prop], props.join('.'), otherwise) : otherwise || undefined;
    }
  },

  expand: function expand(obj, path, thing) {
    obj = (obj instanceof Object) ? obj : {};
    var props = path.split('.');
    if (props.length === 1) {
      obj[props.shift()] = thing;
    } else {
      var prop = props.shift();
      if (!obj[prop]) {
        obj[prop] = {};
      }
      expand(obj[prop], props.join('.'), thing);
    }
  }
};
