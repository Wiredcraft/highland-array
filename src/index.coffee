_ = require('highland')
validFunction = require('es5-ext/lib/Function/valid-function')

Array::shiftToStream = (cb) ->
    validFunction(cb) if cb
    return _((push, next) =>
        return push(null, _.nil) if not @length
        push(null, if cb then cb(@shift()) else @shift())
        next()
    )
