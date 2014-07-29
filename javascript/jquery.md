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
