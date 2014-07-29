# JavaScript style guide

# Variables

## Variable declarations
Variables ***must*** be defined one per line.

**Bad:**
```js
var one   = 'one',
    two   = 'two',
    three = 'three';
```

**Good:**
```js
var one   = 'one';
var two   = 'two';
var three = 'three';
```

## Variable instantiation
Variables ***should*** be instantiated using literal over constructor notation.

**Bad:**
```js
var scopeObjVar = new Object();
var scopeArrVar = new Array();
```

**Good:**
```js
var scopeObjVar = {};
var scopeArrVar = [];
```

## Variable naming
Variable names ***should*** be in `lowerCamelCase`, except in two instances:

1. Classes, which ***should*** be in `UpperCamelCase`
2. Constants, which ***should*** be in `CAPS_SNAKE_CASE`

## Variable assignment
Boolean vars ***should*** be set to `true` or `false`, do not use `1` and `0` unless you have good reason.

When intentionally setting/removing a value, you ***should*** set it to `null`, rather than `undefined`.


## General

### Encapsulation

Code blocks ***should*** be wrapped in an IIFE to prevent polluting the global namespace.

```js
(function (window, document, $) {

  // code goes here

}(window, document, jQuery));
```

### Argument spacing
You ***should*** not add whitespace between parens and arguments. You ***should*** space between comma-separated arguments.

** Bad **
```js
function doSomething ( arg, arg2 ) {

}

function doSomething ( arg,arg2 ) {

}
```

** Good **
```js
function doSomething (arg, arg2) {

}
