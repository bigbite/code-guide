# SCSS Style Guide

## Contents
01. [Declaration order](#declaration-order)
02. [Nesting](#nesting)
03. [Extends and Mixins](#extends-and-mixins)

### Examples
01. [Bad example of using extends](https://github.com/bigbitecreative/code-guide/blob/master/css/examples/scss/bad-extend-example.md


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
