# SCSS Style Guide

## Contents
01. [Declaration order](#declaration-order)
02. [Imports and Partials](#imports-and-partials)
03. [Variables](#variables)
04. [Nesting](#nesting)
05. [Productivity](#productivity)
06. [Interpolation](#interpolation)
07. [Extends and Mixins](#extends-and-mixins)

###### Examples
01. [Bad example of using extends](https://github.com/bigbitecreative/code-guide/blob/master/css/examples/scss/bad-extend-example.md)


## Declaration order
You **should** structure sass in the following order:

1. Extends
2. Includes (except media queries)
3. Standard CSS atrributes, see CSS guide for declaration order
4. Pseudo classes (.elem:pseudo-class)
5. Pseudo elements (.elem::pseudo-elem)
6. Media queries
7. Elements (BEM)
6. Modifiers (BEM)
9. Adjacent Selectors
10. Elements within block

```scss
.block {
  @extend %extended-element;           /* 1 */
  @include some-mixin(val);            /* 2 */
  attribute: value;                    /* 3 */

  &:hover {                            /* 4 */
    attribute: value;
  }

  &:active {                           /* 4 */
    attribute: value;
  }

  &::before {                          /* 5 */
    attribute: value;
  }

  &::after {                           /* 5 */
    attribute: value;
  }

  @include media(val) {                /* 6 */
    attribute: value;
  }

  &__element {                         /* 7 */
    attribute: value;

    // .block__element:hover { ... }
    &:hover {
      attribute: value;
    }

    @include media(val) {
      // Media Query for `.block__element`
    }
  }

  &--modifier {                        /* 8 */
    attribute: value;
  }

  &.adjacent-selector,                 /* 9 */
  &.another-adjacent-selector {
    attribute: value;
  }

  .elem-inside-block {                 /* 10 */
    attribute: value;
  }
}
```

[Top](#)

***

## Imports and Partials
1. Group `@import` rules in the main `app.scss / main.scss` file.
2. Denate partials with a leading underscore.
3. Use dashes and lowercase charachters when naming files.
4. Avoid using the `.scss` extention in the `@import` declaration.

```scss
// Bad
@import "components/progressBars.scss";
@import "helpers/spacing.scss";

// Good
@import "components/_progress-bars";
@import "helpers/_spacing";
```

## Variables
You **should** name your variables in a modular way, adding modifiers to the end of the variable name.

```scss
// Bad
$small-breakpoint: 35em;
$large-breakpoint: 82em;

// Good
$breakpoint--small: 35em;
$breakpoint--large: 82em;
```

[Top](#)

***


## Interpolation
Use the Ruby-esque `#{}` to "shim" variables into your rules.

```scss
@mixin highlight($color, $side) {
  border-#{$side}-color: $color;
}

.selector {
  @include highlight(#f00, right);
}

// CSS output
.selector {
  border-right-color: #ff0;
}
```

[Top](#)

***

## Nesting
You **should not** nest more than 3 levels deep as it can produce bloated CSS. Only nest when it's what you mean and not because it's convenient. Consider re-facotring code to be more modular and re-usable.

Example:

```scss
// Bad
.articles {
  margin-top: 30px;

  .post {
    width: 100%;

    .title {
      display: block;
      font-size: 32px;

      a {
        color: green;
      }

      span {
        font-weight: bold;
      }
    }

    .body {
      font-size: 16px;

      span {
        font-weight: bold;
      }

      ul {
        li {
          list-style: none;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}

// Good
.articles {
  margin-top: 30px;
}

.post {
  width: 100%;
  font-size: 16px;

  &__title {
    display: block;
    font-size: 32px;

    a {
      color: green;
    }
  }
}

.list--plain li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.text--bold {
  font-weight: bold;
}
```

[Top](#)

***

### Nesting, because nesting
You **should not** nest just because you can. For elements with only one selector inside, you **should not** nest.

```scss
// Bad
.elem {
  li {
    // I like to nest it.
  }
}

// Good
.elem li {
  // No nest!
}
```

[Top](#)

***

## Productivity
Avoid repetitive rule declarations by leveraging `@each`, `@for`, and `@while`.

Use the `@each` directive to loop through items in a list.

```scss
// good
$authors: kevin luke mark alex adam;

@each $author in $authors {
  .author-#{$author} {
    background-image: url(author-#{$author}.jpg);
  }
}

// CSS output
.author-kevin {
  background-image: url(author-kevin.jpg);
}

.author-luke {
  background-image: url(author-luke.jpg);
}

.author-mark {
  background-image: url(author-mark.jpg);
}

.author-alex {
  background-image: url(author-alex.jpg);
}

.author-adam {
  background-image: url(author-adam.jpg);
}
```

`@for`

```scss
$columns: 4;

@for $i from 1 through $columns {
  .column-#{$i} {
    width: ((100 / $columns) * $i) * 1%;
  }
}

// CSS output
.column-1 {
  width: 25%;
}

.column-2 {
  width: 50%;
}

.column-3 {
  width: 75%;
}

.column-4 {
  width: 100%;
}
```


`@while`

```scss
$i: 1;

.item {
  position: absolute;
  right: 0;
}

@while $i < 4 {
  .item-#{$i} {
    top: $i * 30px;
  }
  $i: $i + 1;
}

// CSS output
.item {
  position: absolute;
  right: 0;
}

.item-1 {
  top: 30px;
}

.item-2 {
  top: 60px;
}

.item-3 {
  top: 90px;
}
```

## Extends and Mixins
Be careful of when to use an extend or mixin. Mixins could cause more code bloat, and extends could also cause cause unexpected output.

**Extend**

```scss
%btn-base {
  padding: 20px;
  display: inline-block;
}

.btn--primary {
  @extend %btn-base;
  background: green;
}

.btn--secondary {
  @extend %btn-base;
  background: purple;
}

// Output
.btn--primary, .btn--secondary {
  padding: 20px;
  display: inline-block;
}

.btn--primary {
  background: green;
}

.btn--secondary {
  background: purple;
}
```


**Mixin**

```scss
@mixin btn-base() {
  padding: 20px;
  display: inline-block;
}

.btn--primary {
  @include btn-base;
  background: green;
}

.btn--secondary {
  @include btn-base;
  background: purple;
}

// Output
.btn--primary {
  padding: 20px;
  display: inline-block;
  background: green;
}

.btn--secondary {
  padding: 20px;
  display: inline-block;
  background: purple;
}
```

Further reading:
- [Should you use a Sass mixin or @extend?](http://roytomeij.com/blog/2013/should-you-use-a-sass-mixin-or-extend.html)
- [Understanding placeholder selectors](http://thesassway.com/intermediate/understanding-placeholder-selectors)
- [Sass Placeholders Versus Mixins and Extends](http://miguelcamba.com/blog/2013/07/11/sass-placeholders-versus-mixins-and-extends/)
- [What Nobody Told You About Sass’s @extend](http://www.sitepoint.com/sass-extend-nobody-told-you/)
- [The Extend Concept](http://css-tricks.com/the-extend-concept/)


[Top](#)

***
