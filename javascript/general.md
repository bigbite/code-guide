# JavaScript style guide

## Variables

### Variable declarations
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

### Variable instantiation
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

### Variable naming
Variable names ***should*** be in `lowerCamelCase`, except in two instances:

1. Classes, which ***should*** be in `UpperCamelCase`
2. Constants, which ***should*** be in `CAPS_SNAKE_CASE`

### Variable assignment
Boolean vars ***should*** be set to `true` or `false`, do not use `1` and `0` unless you have good reason.

When intentionally setting/removing a value, you ***should*** set it to `null`, rather than `undefined`.


## Arrays

### Loops
It is ***preferred*** to use ES5 array loops, where applicable:

```js
theArray.forEach(function (value, index) {
  newArr.push([index, value]);
});
```

## Objects

## Loops
When performing object loops, you ***must*** wrap the loop body in an if statement, to check that the current property 
is a member of the subject, and not an inherited property.

**Bad:**
```js
for (prop in theObject) {
  // logic
}
```

**Good:**
```js
for (prop in theObject) {
  if (theObject.hasOwnProperty(prop)) {
    // logic
  }
}
```

### Accessing Object Properties
Object properties ***must*** be accessed using dot notation when the property being accessed is not dynamic.

**Bad:**
```js
console.log(object[prop][anotherProp]);
```

**Good:**
```js
console.log(object.prop.anotherProp);
```

### Prototype Extension
***Never*** extend the prototype of native objects, or overwrite native object properties.

**Bad:**
```js
Array.prototype.empty = function () {
  return !this.length;
}

var a = [];

if (a.empty()) {
console.log('a is empty');
}
```

**Good:**
```js
var a = [];

if (!a.length) {
  console.log('a is empty');
}
```

### Adding Properties to Constructors
Adding properties to an object by overwriting the prototype makes inheritance impossible; appending to a prototype means that all properties inherited from the parent are still accessible to the child.


**Example:**
```js
function BigBite () {
  console.log('foo');
}
```

**Bad:**
```js
BigBite.prototype = {
  staff: ['jason', 'mark', 'iain', 'natalie'],

  addMember: function (name) {
    this.staff.push(name);
  }
};
```

**Good:**
```js
BigBite.prototype.staff = ['jason', 'mark', 'iain', 'natalie'];
BigBite.prototype.addMember = function (name) {
  this.staff.push(name);
};
```


## Functions

### Strict Pragma
The `'use strict'`; declaration ***must*** be used in the topmost level of function hierarchy. In many cases, this will be the
first line of the IIFE body.

```js
(function (window, document) {
  'use strict';

  function doSomething () {
  }

  function doSomethingElse () {
  }
}(window, document));
```

### Parentheses
You ***must*** leave a space before and after function parentheses.

**Bad:**
```js
function foo(){
  // stuff
}
```

**Good:**
```js
function foo () {
  // stuff
}
```

### Dependency inversion
Functions ***should*** not, where possible, be bound to specifics. Instead, they should perform logic upon parameters
passed to the function.

**Bad:**
```js
function doSomething (selector) {
  selector = $('#header');
  // ...
}
```

**Good:**
```js
function doSomething (selector) {
  selector = selector || $('#header');
  // ...
}
```

### Method chaining
When method chaining, you ***should*** break each method in the chain onto a new line. Where neccesary add line breaks
to aid readability.

```js
$header
  .height(50)
  .width(60)
  .find('li')
    .on('click', function () {
        $(this).addClass('foo');
    })
    .css({'background': 'pink'})
    .end()
  .find('span')
    .fadeIn();
```


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

**Bad:**
```js
function doSomething ( arg, arg2 ) {

}

function doSomething ( arg,arg2 ) {

}
```

**Good:**
```js
function doSomething (arg, arg2) {

}
```

### For statements
You ***should not*** calculate length on each iteration and you ***should*** also declare the iterator varibale at the
top of a function.

***Bad:***
```js
for (var i = 0; i < thing.length; i++) {
  // do stuff
}
```

***Good:***
```js
var thingLength = thing.length;
var i;

for (i = 0; i < thingLength; i++) {
  // do stuff
}
```

### Equality
***Always*** use strict (in)equality operators.

**Good:**
```js
a === b;
c !== d;
```

**Bad:**
```js
a == b;
c != d;
```

### Curly braces
When using curly braces, ***always*** open them on the same line as the statement.

**Good:**
```js
function foo () {
  // something
}
```

**Bad:**
```js
function foo ()
{
  // something
}
```

### Private Methods
Private methods and variables ***should*** be prefixed with an underscore.

```js
var _somePrivateVar = 'I am private';

var _somePrivateMethod = function () {
  // I am private
}
```


## Comments

### JSDoc
All functions ***should*** be preceded by a docblock comment following the [JSDoc](http://usejsdoc.org/) methology.

```js
/**
 * Grabs the selector, does some funky stuff with it, and returns the object
 * @param  {jQuery Object} selector the selector upon which we're performing logic
 * @return {jQuery Object}          the selector in its new state
 */
function doSomething (selector) {
    selector = selector || $('#header');

    selector
      .height(50)
      .width(60)
      .addClass('sexy')
      .fadeOut();

    return selector;
}
```

### General comments
Multi line comments ***should*** use the `/* ... */` syntax; single line comments should use the `// ...` syntax.

**Bad:**
```
// This is not a very good
// multi line comment

/* This is not a very good single line comment */
```

**Good:**
```
/**
 * This is an awesome
 * multi line comment
 */

// Super single line comment
```
