var validFunction, _;

_ = require('highland');

validFunction = require('es5-ext/lib/Function/valid-function');

Array.prototype.shiftToStream = function(cb) {
  if (cb) {
    validFunction(cb);
  }
  return _((function(_this) {
    return function(push, next) {
      if (!_this.length) {
        return push(null, _.nil);
      }
      push(null, cb ? cb(_this.shift()) : _this.shift());
      return next();
    };
  })(this));
};
