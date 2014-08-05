# Bad example of using extends
This is a bad example of using `@extend`.

**Source**

```scss
.line--after {
  margin-bottom: 64px;
  position: relative;

  &:after {
    content: '';
    width: 75px;
    height: 4px;
    background-color: #fff;
    position: absolute;
    top: 60px;
    left: 0;
  }

  &--grey {
    @extend .line--after;

    &:after {
      content: '';
      width: 75px;
      height: 4px;
      background-color: palette(grey);
      position: absolute;
      left: 50%;
      transform: translateX(-37px);
    }
  }
}
```

**Output**

```css
.line--after,
.line--after--grey {
  margin-bottom: 64px;
  position: relative;
}

.line--after:after,
.line--after--grey:after {
  content: '';
  width: 75px;
  height: 4px;
  background-color: #fff;
  position: absolute;
  top: 60px;
  left: 0;
}

.line--after--grey:after {
  content: '';
  width: 75px;
  height: 4px;
  background-color: palette(gray);
  position: absolute;
  left: 50%;
  transform: translateX(-37px);
}
```

Much repeated code and overwriting of styles.

## Better ways

**Method One**
> Strip back the nesting

```scss
.line-after,
.line-after--grey {
  position: relative;
  margin-bottom: 64px;

  &::after {
    position: absolute;
    width: 75px;
    height: 4px;
    content: '';
  }
}

.line-after::after {
  background-color: #fff;
  top: 60px;
  left: 0;
}

.line-after--grey::after {
  left: 50%;
  transform: translateX(-37px);
  background-color: palette(gray);
}
```

**Method Two**
> Nesting everything inside the element

```scss
.line-after {
  &,
  &--grey {
    margin-bottom: 64px;
    position: relative;

    &::after {
      content: '';
      width: 75px;
      height: 4px;
      position: absolute;
    }
  }

  &::after {
    background-color: #fff;
    top: 60px;
    left: 0;
  }

  &--grey::after {
    left: 50%;
    transform: translateX(-37px);
    background-color: palette(grey);
  }
}
```

Both the above methods will produce:

```css
.line-after,
.line-after--grey {
  margin-bottom: 64px;
  position: relative;
}

.line-after::after,
.line-after--grey::after {
  content: '';
  width: 75px;
  height: 4px;
  position: absolute;
}

.line-after::after {
  background-color: #fff;
  top: 60px;
  left: 0;
}

.line-after--grey::after {
  left: 50%;
  transform: translateX(-37px);
  background-color: palette(gray);
}
```

*Much cleaner output!*
