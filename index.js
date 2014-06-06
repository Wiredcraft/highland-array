var _;

_ = require('highland');

Object.defineProperty(Array.prototype, 'shiftToStream', {
  configurable: true,
  enumerable: false,
  writable: true,
  value: function(cb) {
    if ((cb != null) && typeof cb !== 'function') {
      throw new TypeError(cb + ' is not a function');
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
  }
});
