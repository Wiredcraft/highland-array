# Highland Array

__Caution__: this will pollute your native JS `Array`.

[Highland](http://highlandjs.org/) is a "high-level streams library for Node.js and the browser".

This is a Node.js module. This module extends the native JS `Array` with the methods that work with Highland.

This can be also used in the browsers, but not tested.

## The methods

### shiftToStream()

It returns a Highland stream which once consumed, will shift items from the array. Example:

```javascript
require('highland-array');
// or `require('carcass')` if you have carcass installed.

var theArray = [1, 2, 3, 4];
theArray.shiftToStream().once('end', function() {
    // the array will be empty in the end
    // theArray.should.eql([]);
}).each(function(x) {
    // will be called 4 times with x being 1, 2, 3 and 4
});

// optionally give it a callback
var theArray = [1, 2, 3, 4];
theArray.shiftToStream(function(x) {
    return x * 2;
}).once('end', function() {
    // the array will be empty in the end
    // theArray.should.eql([]);
}).each(function(x) {
    // will be called 4 times with x being 2, 4, 6 and 8
});
```
