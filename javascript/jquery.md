# jQuery style guide

## Selectors

### Assignment
When using jQuery selectors, you ***should*** assign them to variables:

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
