# Highland Array

__Caution__: this will pollute your native JS `Array`.

[Highland](http://highlandjs.org/) is a "high-level streams library for Node.js and the browser".

This is a Node.js module. This module extends the native JS `Array` with the methods that work with Highland.

## The methods

### shiftToStream()

It returns a Highland stream which once consumed, will shift items from the array. Example:

```js
var theArray = [1, 2, 3, 4];
theArray.shiftToStream().once('end', function() {
    // theArray will be empty in the end
}).each(function(x) {
    // will be called 4 times with x being 1, 2, 3 and 4
});
```
