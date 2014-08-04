# SCSS Style Guide

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
    &:hover {                          /* 4 */
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

## Nesting
You **should not** nest more than 3 levels deep as it can produce bloated CSS. Only nest when it's what you mean and not because it's convenient.
