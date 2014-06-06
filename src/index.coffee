_ = require('highland')

Object.defineProperty(Array.prototype, 'shiftToStream', {
    configurable: true
    enumerable: false
    writable: true
    value: (cb) ->
        throw new TypeError(cb + ' is not a function') if cb? and typeof cb isnt 'function'
        return _((push, next) =>
            return push(null, _.nil) if not @length
            push(null, if cb then cb(@shift()) else @shift())
            next()
        )
})
