# WordPress PHP
Files containing only PHP **must** follow the [PHP style guide]().  
Files containing mixed markup and PHP **must** adhere to the following.

## Directory Structure
When not using a default WP template file (`page.php`, `index.php`, etc), any template files should reside within a directory within the theme root called `templates-`. Note the trailing dash `-`; this is so that, when WP generates the `<body>` class name, we don't end up with one like `page-template-templatesmy-awesome-page-php`. You **may** use a trailing `_`, instead, but underscores **should not** be used for class names.

## Templating
### Naming Templates
**Always** name the file the same as the template itself, lowercased, and replacing spaces with dashes. A template named `My Awesome Page` would be named on the filesystem as `my-awesome-page.php`.  
The template name **must** immediately follow the opening PHP tag; there is no need to include the word `template` in the template name definition, since the WP panel gives context.  
```php
<?php /* Template Name: My Awesome Page */ ?>
```

### get_header()
Line two.
```php
<?php /* Template Name: My Awesome Page */
get_header(); ?>
```
### get_footer()
The WP footer should be declared anywhere near the end of the file that makes sense in the current context, ideally as close to the bottom as possible. If you have template-specific logic that needs to succeed the `get_footer();` function, by all means place it below the call, rather than attempt to coerce WP.  
You **must** close PHP at the end of a WP template file.

### HTML Tags
You **should** specify attributes in the following order, where applicable:  
1. `id`  
2. `class`  
3. `href`, `src`, or `type`  
4. `name`  
5. input attrs hitherto unspecified  
6. `data-*`  
7. `target` or `value`  
8. `required`  

### Building templates
You **must** group as much php at the top of a template file as possible, including any custom loop queries that will be used later in the file.
Give any custom queries unique, semantic names, both to avoid collisions, and so that they can be recognised when used later. Curly braces should be used for any control structures, as per the PHP docs.  
```php  
<?php /* Template Name: My Awesome Page */
get_header();

$product_args  = [
    'post_type'     => 'page',
    'post_status'   => 'publish',
    'offset'        => 0,
    'sort_order'    => 'ASC',
    'sort_column'   => 'post_title'
];
$product_query = new WP_Query($product_args);
?>
<body>
    <!-- ... -->
```
You **must not**, unless absolutely necessary, override any of the global WP variables.
```php
<?php /* Template Name: My Awesome Page */
get_header();

// avoid this
$product_args  = [
    'post_type'     => 'page',
    'post_status'   => 'publish',
    'offset'        => 0,
    'sort_order'    => 'ASC',
    'sort_column'   => 'post_title'
];
$wp_query = new WP_Query($product_args);

/*
 * if you feel that you **must** override a global,
 * keep a copy of it, and reassign it when you're
 * done with your logic.
 */
$product_args  = [
    'post_type'     => 'page',
    'post_status'   => 'publish',
    'offset'        => 0,
    'sort_order'    => 'ASC',
    'sort_column'   => 'post_title'
];
$temp_query = $wp_query
$wp_query   = new WP_Query($product_args);

// do something with $wp_query;
$wp_query   = $temp_query;
?>
```
Within the main body of the template (i.e. when you're mixing markup and PHP), colon notation `:` **must** be used for control structures.
You **should not** indent the opening and closing lines of a control structure beyond that of its parent HTML block, but you **should** indent any PHP or HTML within the control structure one level further than structure itself.  
To aid readability, you **may** line break between control structures and markup within.
```php
<div class="container">
<?php if (have_rows("repeater_row")): while (have_rows("repeater_row")): the_row();
    $the_layout = get_row_layout();
    if ($the_layout === "primary_layout_type"): ?>

    <div class="repeater__row">
        <h2 class="repeater__title"><?php the_sub_field("primary_title"); ?></h2>
        <p class="repeater__content"><?php the_sub_field("primary_content"); ?></p>
    </div>

<?php else if ($the_layout === "secondary_layout_type"): ?>

    <div class="repeater__row--alt">
        <h2 class="repeater__title"><?php the_sub_field("secondary_title"); ?></h2>
        <p class="repeater__content"><?php the_sub_field("secondary_content"); ?></p>
    </div>

<?php else if ($the_layout === "nested_layout_type"): ?>

    <div class="nested-repeater__row">
    <?php if (has_sub_field("nested_repeater_row")): while (has_sub_field("nested_repeater_row")): the_row(); ?>

        <div class="nested-repeater__content"><?php the_sub_field("nested_repeater_content"); ?></div>

    <?php endwhile; endif; // end nested repeater ?>
    </div>

<?php endif; // end flexible content
endwhile; endif; // end repeater ?>
</div>
```
When looping (either using WP functions or ACF), you **should** - *where possible* - same-line the necessary code.
```php
<div class="container">
<?php if (have_posts()): while (have_posts()): the_post(); ?>
    <!-- content -->
<?php endwhile; endif; wp_reset_query(); ?>
</div>
```
