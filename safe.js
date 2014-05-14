;(function(self) {

  self.safe = function (obj, path, otherwise) {
    obj = isObject(obj) ? obj : {};
    var props = path.split('.');
    if (props.length === 1) {
      return typeof obj[props[0]] === 'undefined' ? otherwise : obj[props.shift()];
    } else {
      var prop = props.shift();
      return isObject(obj) ? self.safe(obj[prop], props.join('.'), otherwise) : otherwise;
    }
  };

  self.expand = function (obj, path, thing) {
    obj = isObject(obj) ? obj : {};
    var props = path.split('.');
    if (props.length === 1) {
      obj[props.shift()] = thing;
    } else {
      var prop = props.shift();
      if (!(prop in obj)) {
        obj[prop] = {};
      }
      self.expand(obj[prop], props.join('.'), thing);
    }
  };

  self.allOf = function(obj, paths) {
    if (!isArray(arguments[1])) {
      paths = [].slice.call(arguments);
      obj = paths.shift();
    }
    if (isObject(obj)) {
      return every(paths, function(path) {
        return !!self.safe(obj, path);
      });
    }
  };

  self.anyOf = function (obj, paths) {
    if (!isArray(arguments[1])) {
      paths = [].slice.call(arguments);
      obj = paths.shift();
    }
    if (isObject(obj)) {
      return any(paths, function(path) {
        return !!self.safe(obj, path);
      });
    } else {
      return false;
    }
  };

  self.noneOf = function() {
    return !self.anyOf.apply(self, arguments);
  };

  var isObject = function (obj) {
    return (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
  };

  var isArray = function (arr) {
    return arr instanceof Array && arr.splice;
  };

  var any = function (arr, fn) {
    var pass = false;
    for (var i = 0; i < arr.length; i++) {
      if (fn(arr[i])) {
        pass = true;
      }
    }
    return pass;
  };

  var every  = function (arr, fn) {
    var pass = false;
    for (var i = 0; i < arr.length; i++) {
      pass = fn(arr[i]);
    }
    return pass;
  };


})(typeof module !== 'undefined' ? module.exports : (typeof window !== 'undefined' ? window.safe = {} : this));
