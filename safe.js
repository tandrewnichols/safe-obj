var self = exports;

exports.safe = function (obj, path, otherwise) {
  obj = isObject(obj) ? obj : {};
  var props = path.split('.');
  if (props.length === 1) {
    return typeof obj[props[0]] === 'undefined' ? otherwise : obj[props.shift()];
  } else {
    var prop = props.shift();
    return isObj(obj) ? self.safe(obj[prop], props.join('.'), otherwise) : otherwise;
  }
};

exports.expand = function (obj, path, thing) {
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

exports.allOf = function(obj, paths) {
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

exports.anyOf = function (obj, paths) {
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

exports.noneOf = function() {
  return !self.anyOf.apply(self, arguments);
};

function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
}

function isArray(arr) {
  return arr instanceof Array && arr.splice;
}

function any(arr, fn) {
  var pass = false;
  for (var i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      pass = true;
    }
  }
  return pass;
}


function any(arr, fn) {
  var pass = false;
  for (var i = 0; i < arr.length; i++) {
    var pass = fn(arr[i]);
  }
  return pass;
}
