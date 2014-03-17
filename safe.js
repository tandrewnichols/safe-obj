module.exports = {
  safe: function (thing, path, otherwise) {
    thing = (typeof thing === 'object' && thing != null) ? thing : {};
    var props = path.split('.');
    if (props.length === 1) {
      return typeof thing[props[0]] === 'undefined' ? otherwise : thing[props.shift()];
    } else {
      var prop = props.shift();
      return (typeof thing[prop] === 'object' && thing != null) ? this.safe(thing[prop], props.join('.'), otherwise) : otherwise || undefined;
    }
  },

  expand: function (obj, path, thing) {
    obj = (typeof obj === 'object' && obj != null) ? obj : {};
    var props = path.split('.');
    if (props.length === 1) {
      obj[props.shift()] = thing;
    } else {
      var prop = props.shift();
      if (!obj[prop]) {
        obj[prop] = {};
      }
      this.expand(obj[prop], props.join('.'), thing);
    }
  }
};
