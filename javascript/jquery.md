# jQuery style guide

## Document Ready
JavaScript placed in the footer ***must not** use the jQuery Document Ready function, as by the time the
script is parsed, the document will already be ready. Use the IIFE to pass in jQuery.

**Bad:**
```js
$(document).ready(function () {
   // ... 
});
```

**Good:**
```js
(function (document, window, $) {
  // ...
}(document, window, jQuery));
```

## Selectors

### Assignment
When using jQuery selectors, you ***should*** assign them to variables.

**Bad:**
```js
$('#header').addClass('cool-header');
```

**Good:**
```js
var $header = $('#header');

$header.addClass('cool-header');
```

### Naming
You ***should*** prefix variables assigned to a jQuery object with a dollar symbol
for reference and readability.

**Bad:**
```js
var header = $('#header');
```

**Good:**
```js
var $header = $('#header');
```
