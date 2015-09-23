## General Conventions

### Encoding
You ***must*** use `UTF-8` encoding only, with no `BOM` ([Byte Order Mark](http://en.wikipedia.org/wiki/Byte_order_mark#UTF-8)).
You ***must not*** use a closing PHP tag in pure PHP files.
You ***must*** leave a blank trailing line at the end of files.

### Tags
You ***must not*** use PHP short tags, or ASP-style tags.
```php
// use
<?php ?>
<?php echo ''; ?> /* or */ <?= ?>

// not
<? ?>
<% %>
<%= %>
```

### Naming
0. Use of numerical characters in entity names is discouraged.
1. Variables ***must*** be written in `$lowerCamelCase`.
2. Constants ***must*** be written in `CAPS_SNAKE_CASE`.
3. Namespaces ***must*** follow [PSR-4](http://www.php-fig.org/psr/psr-4/).
4. Class names ***must*** be written in `UpperCamelCase`.
5. Methods and functions ***must*** be written in `lowerCamelCase()`.
6. Array keys ***should*** be written in `lowerCamelCase`, unless they correspond to database tables or columns
7. The following keywords ***must*** be written in lowercase: `true`, `false`, `null`, [these](http://php.net/manual/en/reserved.keywords.php).
8. `[]` are "Square Brackets"; `{}` are "Curly Braces"; `()` are "Parentheses".

### Indentation
***Always*** indent using four spaces; ***never*** use tabs.
When building arrays, you ***should*** insert a line break after opening the array, and indent key/value pairs one level beyond the opening bracket. You ***should*** align the `=>` operators when this will not require greater than eight spaces.
```php
<?php
// looks good!
$variable = [
    'foo'   => 0,
    'bar'   => 10,
    'bazoo' => [
        'a' => 'zab',
        'b' => 'rab',
        'c' => 'oof',
        'd' => [
            'herp' => true,
            'derp' => false
        ]
    ]
];

// omg wat
$sillyArrayKeys = [
    'thisIsAReallyLongKeyName' => 'wordpress, am i right?!',
    'smallKey'                 => 'eww',
    'tinyKey'                  => 'lolwut'
];
// do this, instead
$sillyArrayKeys = [
    'thisIsAReallyLongKeyName' => 'wordpress, am i right?!',
    'smallKey' => 'yeah',
    'tinyKey'  => 'looks a bit better'
];
```

### Variable Types
Declare arrays with `[]`, instead of `array()`.
Declare string literals with single quotes `'`.
Declare strings containing variable substitution or apostrophes with double quotes `"`.
Concatenate strings with the `.` operator; when concatenating on multiple lines, the `.` ***should*** precede the string fragment.

### Curly Braces
For class & function declarations and control structures, the opening and closing curly braces ***must*** occur on their own lines, indented to the same column as the start of the declaration.
```php
<?php
// do this
class Bar
{
    public function fooBar($argument)
    {
        if (!is_null($argument))
        {
            // logic
        }
    }
}

// don't do this
class Bar {
    public function fooBar($argument) {
        if (!is_null($argument)) {
            // do something
        }
    }
}
```

### Parentheses
For function declarations and calls, you ***must not*** insert a space between the function name and the parentheses.
For control structures, you ***must*** insert a space before and after the parentheses; you ***must not*** insert spaces inside the parentheses, except when multiple arguments are passed, in which case you ***must*** insert a space after every comma.
```php
<?php
function foo($arg1, $arg2)
{
    if (!is_null($arg1) && !is_null($arg2))
    {
        echo "$arg1 and $arg2";
    }
}

foo('bar', 'baz');
```
You ***must not*** use parentheses with the following - they are statements, not functions.
- `include`, `include_once`
- `require`, `require_once`
- `return`

You ***should*** use parentheses with the following;
- `exit()`
- `die()`

***Prefer*** the `*_once` variants for includes/requires, when applicable.
```php
<?php
// do this
include_once './foo.php';
require_once './bar.php';
return $variable;

// not this
include ('./foo.php');
require ('./bar.php');
return ($variable);
```

### Comments
For multi-line comments, the docblock-style comment syntax (`/**/`) ***must*** be used.
For single line comments, the double-slash comment syntax `//` ***should*** be used.
Functions should be preceded by a full docblock.
```php
// @todo: fix this mess
/**
 * @todo: fix this mess
 * - too much complexity handled here, break
 * out into methods
 * - code quality needs improving
 */
```

### Other
You ***must not*** use `eval()`. Ever.
You ***must*** terminate every statement with a semi-colon (`;`).
You ***must not*** modify the PHP environment at runtime; i.e. don't do this:
```php
<?php
ini_set('foo', 'bar');
```

## Control Structures

### If
In single-line `if` statements, you ***should not*** leave out the parentheses.
```php
<?php
if (/* expression */)
{
    // do something
}
```

For multi-line `if` statements, or one with multiple conditions, you ***must*** follow this convention. Note the curly brace placement, whitespacing, and indentation.
```php
<?php
if (/* expression */)
{
    // do something
    // do something else
}


if (/* expresion */)
{
    // yup
}
elseif (/* expresion */)
{
    // yupyup
}
else
{
    // nop
}
```

If you have multiple expressions per condition, you ***should*** split them onto multiple lines if it will aid readability, with the operands preceeding each expression.
```php
<?php
if ((condition_one()
    && condition_two())
    || condition_three())
{
    // do something
}

// or
if (  (condition_one() && condition_two())
    || condition_three())
{
    // do something
}
```
Or, in some circumstancces, it may be better to simplify the expressions.
```php
<?php
$isFoo = (condition_one() && condition_two());
if ($isFoo || condition_three())
{
    // do something
}
```

When using ternary operators, you ***may*** break each clause onto a new line.
```php
<?php
$a = $condition === true
   ? 'foo'
   : 'bar';
```

### While/for/foreach
While/for/foreach loops ***must*** follow the below pattern.
```php
<?php
// while
while (/* expresion */)
{
    // do something
}

// do/while
do
{
    // do something
}
while (/* expresion */);

// for
for ($i = 0; $i < 10; $i++)
{
    // do something
}

// foreach
foreach ($myArray as $key => $value)
{
    // do something
}
```

### Switch
Switch statements ***must*** follow the below convention, with specific emphasis on indentation. If a case falls through, you ***must*** comment to state that the behaviour is intentional.
```php
<?php
switch (/* var */)
{
    case 0:
        // a
        break;

    // falls through
    case 1:
        // b

    case 2:
    case 3:
        // c
        break;

    default:
        // yarp
        break;
}
```

### Try/catch
Try/catch blocks ***must*** follow the below pattern.
```php
<?php
try
{
    // to do something
}
catch (ExceptionType $e)
{
    // do something nice with this error
}
catch (AnotherExceptionType $e)
{
    // do something horrid with this error
}
```

## Classes: General
Methods ***should*** be declared in the following order:
1. constructor
2. public
3. protected
4. private
5. destructor


## Classes: Namespace Declarations
-Namespace declarations ***must*** be preceeded and succeeded by a blank line.
```php
<?php

namespace BigBite\Foo\Bar;

use Vendor\Foo;
// ...
```


## Classes: Namespace Imports
`Use` statements ***must*** be one-per-line, preceded and succeeded by a blank line.
```php
<?php

namespace BigBite\Foo\Bar;

use Vendor\Foo;
use VendorTwo\Bar as Baz;

// ...


// not
<?php namespace BigBite\Foo\Bar;
use Vendor\Foo;
use VendorTwo\Bar;
// ...
```

## Classes: Class Declarations
When defining classes that extend/implement other classes/interfaces, those declarations ***must*** occur on the same line as the class definition.
```php
<?php

namespace BigBite\Foo;

class FooBar extends ParentFoo implements \FooInterface
{
```
However, if there is a list of implements, these ***may*** be split across several lines, where this aids readability.
```php
<?php

namespace BigBite\Foo;

class FooBar extends ParentFoo implements
    \FooInterface,
    \BarInterface,
    \BazInterface
{
```

## Classes: Visibility
Visibility ***must*** be declared on all members, including `public`.
Keywords `abstract`, and `final` ***must*** preceed visibility, where applicable.
Keyword `static` ***must*** succeed visibility, where applicable.
You ***may*** indent the members to the same column to aid readability.
```php
<?php

class Foo
{
    protected       $foo;
    private         $bar;
    abstract public $wooHoo;
    final public    $weeHee;
    public static   $neeNaw;

    // ...
}
```

## Functions: General
Return from a function as early as possible.
```php
<?php
// do this
function foo($bar)
{
    if (!$bar)
        return false;

    // lots of function logic
    return $result;
}

// not this
function foo($bar)
{
    if ($bar)
    {
        // lots of function logic
        return $result;
    }
    else
    {
        return false;
    }
}
```

Arguments with defaults ***should*** go at the end of the argument list.
```php
<?php
function fooBar($arg1, $arg2, $arg3, $arg4 = [1, 2, 3, 4, 5])
{
    // do something
}
```

## Functions: Closures
You ***must*** include a space before and after the parentheses, and after the `use` keyword, if applicable.
It is ***preferred*** that the whole statement appear on a single line, except in the case of long argument/variable lists, in which case you ***may*** use line breaks.
```php
<?php
$closureWithArgs = function ($arg1, $arg2)
{
    // do something
};

$closureWithArgsAndVars = function ($arg1, $arg2) use ($var1, $var2)
{
    // do something
};

$closureWithArgsAndVars = function (
    $argumentOne,
    $argumentTwo,
    $argumentThree
) use (
    $variableOne,
    $variableTwo,
    $variableThree
)
{
    // do something
}
```
