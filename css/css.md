# CSS Style Guide
> Mostly from http://codeguide.co/#css-syntax by @mdo.

## Contents
01. [Syntax](#syntax)
02. [Declaration order](#declaration-order)
03. [Media Queries](#media-queries)
04. [Prefixed properties](#prefixed-properties)
05. [Single declarations](#single-declarations)
06. [Shorthand notation](#shorthand-notation)
07. [Comments](#comments)
08. [Class names](#class-names)
09. [Selectors](#selectors)
10. [Organization](#organization)
11. [BEM Methology](#bem-methology)

## Syntax
- When grouping selectors, keep individual selectors to a single line.
- Include one space before the opening brace of declaration blocks for legibility.
- Place closing braces of declaration blocks on a new line.
- Include one space after `:` for each declaration.
- Each declaration should appear on its own line for more accurate error reporting.
- End all declarations with a semi-colon.
- Comma-separated property values should include a space after each comma (e.g., `box-shadow`).
- Don't include spaces after commas within `rgb()`, `rgba()`, `hsl()`, `hsla()`, or `rect()` values. This helps differentiate multiple color values (comma, no space) from multiple property values (comma with space).
- Don't prefix property values or color parameters with a leading zero (e.g., `.5` instead of `0.5` and `-.5px` instead of `-0.5px`).
- Lowercase all hex values, e.g., `#fff`. Lowercase letters are much easier to discern when scanning a document as they tend to have more unique shapes.
- Use shorthand hex values where available, e.g., `#fff` instead of `#ffffff`.
- Quote attribute values in selectors, e.g., `input[type="text"]`.
- Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`.


```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

## Declaration order
Related property declarations **should** be grouped together following the order:

1. Positioning
2. Box model
3. Typographic
4. Visual

```css
.declaration-order {
  /* Positioning */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc */
  opacity: 1;
}
```

## Media Queries
You **must** place media queries as close to their relevant rule sets whenever possible. Don't bundle them all in a separate stylesheet or at the end of the document. Doing so only makes it easier for folks to miss them in the future.

```css
.element { ... }
.element-avatar { ... }
.element-selected { ... }

@media (min-width: 480px) {
  .element { ...}
  .element-avatar { ... }
  .element-selected { ... }
}
```

## Prefixed properties
When using vendor prefixed properties, you **should** indent each property such that the declaration's value lines up vertically for easy multi-line editing.

```css
/* Prefixed properties */
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
          box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
```

## Single declarations
In instances where a rule set includes only one declaration, you **should** remove line breaks for readability and faster editing.

```css
/* Single declarations on one line */
.span1 { width: 60px; }
.span2 { width: 140px; }
.span3 { width: 220px; }

/* Multiple declarations, one per line */
.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}
.icon           { background-position: 0 0; }
.icon-home      { background-position: 0 -20px; }
.icon-account   { background-position: 0 -40px; }
```

## Shorthand notation
You **should** limit use of shorthand declarations to instances where you must explicitly set all the available values. Common overused shorthand properties include:\

- `padding`
- `margin`
- `font`
- `background`
- `border`
- `border-radius`

Often times we don't need to set all the values a shorthand property represents. For example, HTML headings only set top and bottom margin, so when necessary, only override those two values. Excessive use of shorthand properties often leads to sloppier code with unnecessary overrides and unintended side effects.

The Mozilla Developer Network has a great article on [shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) for those unfamiliar with notation and behavior.

```css
/* Bad example */
.element {
  margin: 0 0 10px;
  background: red;
  background: url("image.jpg");
  border-radius: 3px 3px 0 0;
}

/* Good example */
.element {
  margin-bottom: 10px;
  background-color: red;
  background-image: url("image.jpg");
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
```


## Comments
You **should** ensure your code is descriptive, well commented, and approachable by others. Great code comments convey context or purpose. Do not simply reiterate a component or class name.

Be sure to write in complete sentences for larger comments and succinct phrases for general notes.

```css
/* Bad example */
/* Modal header */
.modal-header {
  ...
}

/* Good example */
/* Wrapping element for .modal-title and .modal-close */
.modal-header {
  ...
}
```

## Class names
- Keep classes lowercase and use dashes (not underscores or camelCase).
- Avoid excessive and arbitrary shorthand notation. .btn is useful for button, but .s doesn't mean anything.
- Keep classes as short and succinct as possible.
- Use meaningful names; use structural or purposeful names over presentational.
- Prefix classes based on the closest parent or base class.
- Use `.js-*` classes to denote behavior (as opposed to style), but keep these classes out of your CSS.

```css
/* Bad example */
.t { ... }
.red { ... }
.header { ... }

/* Good example */
.tweet { ... }
.important { ... }
.tweet-header { ... }
```

## Selectors
- You **should** use classes over generic element tag for optimum rendering performance.
- **Avoid** using several attribute selectors (e.g., [class^="..."]) on commonly occuring components. Browser performance is known to be impacted by these.
- You **should** keep selectors short and strive to limit the number of elements in each selector to three.
- Scope classes to the closest parent **only** when necessary (e.g., when not using prefixed classes).

```css
/* Bad example */
span { ... }
.page-container #stream .stream-item .tweet .tweet-header .username { ... }
.avatar { ... }

/* Good example */
.avatar { ... }
.tweet-header .username { ... }
.tweet .avatar { ... }
```


## Organization
- Organize sections of code by component.
- Develop a consistent commenting hierarchy.
- Use consistent white space to your advantage when separating sections of code for scanning larger documents.
- When using multiple CSS files, break them down by component instead of page. Pages can be rearranged and components moved.

```css
/**
 * Component section heading
 */

.element { ... }


/**
 * Component section heading
 *
 * Sometimes you need to include optional context for the entire component. Do that up here if it's important enough.
 */

.element { ... }

/* Contextual sub-component or modifer */
.element-heading { ... }
```


## BEM Methology
> Snippets from [this reccomended read](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).
BEM stands for Block, Element, Modifier.

```css
.block {}
.block__element {}
.block--modifier {}
```

- `.block` represents the higher level of an abstraction or component.
- `.block__element` represents a descendent of `.block` that helps form `.block` as a whole.
- `.block--modifier` represents a different state or version of `.block`.

The reason for double rather than single hyphens and underscores is so that your block itself can be hyphen delimited, for example:

```css
.site-search {} /* Block */
.site-search__field {} /* Element */
.site-search--full {} /* Modifier */
```

### Example
An example of BEM in action.

**Bad**
```html
<div class="hero">
  <div class="hero__body">
    <h1 class="hero__body--title--large"></h1>
  </div>
</div>
```

```css
.hero__body--title--large {}
```

This is a bad example due to title being an *element*, and involves unnecessary nesting.

This could be written as:

**Bad**
```html
<div class="hero">
  <div class="hero__body">
    <h1 class="hero__title"></h1>
  </div>
</div>
```

```css
.hero__title--large {}
```

Here, `.hero` is the block element, and both `body` and `title` are elements within `.hero`. `.hero__title` does not need to be defined inside `.hero__body` as it makes it less modular, and more verbose.
