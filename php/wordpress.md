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
#### General
**Always** use semantic names for variables, field names, post slugs, etc.  
**Never** use ambiguous abbreviations; it is better to have a longer field name then an abbreviation that no-one understands (including oneself when referring back at a later date).  
You **must not** use numerical characters when naming fields or variables, etc.  
**Prefer** to use `the_*()` over `echo get_*()` function calls.  

#### Logic
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
#### Global Variables
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
#### Nesting and Indentation
Within the main body of the template (i.e. when you're mixing markup and PHP), colon notation `:` **must** be used for control structures.  
You **should not** indent the opening and closing lines of a control structure beyond that of its parent HTML block, but you **should** indent any PHP or HTML within the control structure one level further than structure itself.  
To aid readability, you **may** line break between control structures and markup within.
```php
<div class="container">
<?php if (have_rows('repeater_row')): while (have_rows('repeater_row')): the_row();
    $the_layout = get_row_layout();
    if ($the_layout === 'primary_layout_type'): ?>

    <div class="repeater__row">
        <h2 class="repeater__title"><?php the_sub_field('primary_title'); ?></h2>
        <p class="repeater__content"><?php the_sub_field('primary_content'); ?></p>
    </div>

<?php else if ($the_layout === 'secondary_layout_type'): ?>

    <div class="repeater__row--alt">
        <h2 class="repeater__title"><?php the_sub_field('secondary_title'); ?></h2>
        <p class="repeater__content"><?php the_sub_field('secondary_content'); ?></p>
    </div>

<?php else if ($the_layout === 'nested_layout_type'): ?>

    <div class="nested-repeater__row">
    <?php if (has_sub_field('nested_repeater_row')): while (has_sub_field('nested_repeater_row')): the_row(); ?>

        <div class="nested-repeater__content"><?php the_sub_field('nested_repeater_content'); ?></div>

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

#### Large Templates
When building large templates which contain a lot of logic, you **should** break the template up into partials, seperating logic from markup as much as possible. This is especially important when working with [ACF](http://www.advancedcustomfields.com), when one often has nested repeater/flexible content fields.  
```php
<?php
// don't do this
if(have_rows('bb_cs_content')) {
    while( have_rows('bb_cs_content')) : the_row();
        if(get_row_layout() === 'bb_cs_title') {
            ?>
            <h1 class="text--upper mb-d"><?php echo get_sub_field('bb_cs_title_content'); ?></h1>
            <?php
        }else if(get_row_layout() === 'bb_cs_subtitle') {
            ?>
            <h2 class="text--upper mb"><?php echo get_sub_field('bb_cs_sub_content'); ?></h2>
            <?php
        } else if(get_row_layout() === 'bb_cs_text') {
            ?>
            <h3><?php echo get_sub_field('bb_cs_txt_content'); ?></h3>
            <?php
        }else if(get_row_layout() === 'bb_cs_4_col') {
            ?>
            <div class="row m-d">
                <div class="columns--3">
                    <img src="<?php echo get_sub_field('bb_cs_image_1'); ?>" alt="">
                </div>
                <div class="columns--3">
                    <img src="<?php echo get_sub_field('bb_cs_image_2'); ?>" alt="">
                </div>
                <div class="columns--3">
                    <img src="<?php echo get_sub_field('bb_cs_image_3'); ?>" alt="">
                </div>
                <div class="columns--3">
                    <img src="<?php echo get_sub_field('bb_cs_image_4'); ?>" alt="">
                </div>
            </div>
            <?php
        }
    endwhile;
}


// do this
if (have_rows('community_support_section')): while (have_rows('community_support_section')): the_row();
    switch (get_row_layout()):
        case 'section_title':
            $part = 'title';
            break;

        case 'section_subtitle':
            $part = 'subtitle';
            break;

        case 'section_content':
            $part = 'content';
            break;

        case 'section_client_logos':
            $part = 'client-logos';
            break;
    endswitch;

    get_template_part("parts/community/$part");
endwhile; endif; ?>

<!-- in parts/community/title.php -->
<h1 class="support__title  text--upper"><?php the_sub_field('title'); ?></h1>

<!-- in parts/community/subtitle.php -->
<span class="support__subtitle  text--upper  beta"><?php the_sub_field('subtitle') ?></span>

<!-- in parts/community/content.php -->
<?php if (have_rows('client_logos')): ?>

    <div class="support-logos__wrapper">
    <?php while (have_rows('client_logos')): the_row();
        $client_logo = get_sub_field('logo'); ?>

        <div class="support-logos__img"><img src="<?php echo $client_logo['url']; ?>" alt="<?php echo $client_logo['alt'] ?: $client_logo['title']; ?>"></div>

    <?php endwhile; ?>
    </div>

<?php endif; ?>
```

```php
<!-- don't do this -->

      <?php
      // Variables
      $community_background = get_field('background_image');
      $community_title = get_field('community_title');
      ?>


<section class="section section--white section-community" style="background: url(<?php if($community_background) echo $community_background . ')' . ' fixed center center'; else echo 'blue'?>; background-size: cover" id="community">

<!--     <div class="container"> -->
      <div class="slider__content nf">
        <div class="container container--slider__content">

        <?php if($community_title) :?>
        <p class="slider__content--title--smaller text--center"><?php echo $community_title;?></p>
        <?php endif; ?>

        <?php if (have_rows ('community_example') ) :?>
          <?php while (have_rows ('community_example') ) : the_row();?>

      <div class="container top-bump">
        <?php
        // Repeater Variables
        $description = get_sub_field('example_description');
        $small_title = get_sub_field('smaller_title');
        ?>

        <?php if($description) :?>
          <p class="example-description"><?php echo $description; ?></p>
        <?php endif; ?>

        <?php if($small_title) :?>
          <p class="example-small-title"><?php echo $small_title; ?></p>
        <?php endif; ?>

        <?php if (have_rows ('logos') ) :?>
          <?php while (have_rows ('logos') ) : the_row(); ?>

            <?php $the_logo = get_sub_field('example_logo'); ?>

            <?php if($the_logo) :?>
              <img src="<?php echo $the_logo ;?>" class="example-logo" />
            <?php endif; ?>

          <?php endwhile; ?>
        <?php endif;?>

      </div>
      <!-- / repeated container -->

        <?php endwhile; ?>
      <?php endif;?>

      </div>
      <!-- / inside white box -->

    </div>
    <!-- /white box -->

 <!--  </div> / community container end  -->

</section>
      <!-- / community -->



<!-- do this -->
<?php // Variables
$community_background = get_field('background_image');
$community_title      = get_field('community_title'); ?>
<section id="community" class="section  section__community  section--white" style="background: <?php echo $community_background ? "url($community_background) fixed center center" : 'blue'; ?>;">
    <div class="slider__content">
        <div class="container slider__content--container">

        <?php if ($community_title): ?>
            <p class="slider__content-title--smaller text--center"><?php echo $community_title; ?></p>
        <?php endif; ?>


        <?php if (have_rows('community_example')): while (have_rows('community_example')): the_row(); ?>
            <div class="container top-bump">

            <?php // Repeater Variables
            $description = get_sub_field('example_description');
            $small_title = get_sub_field('smaller_title');

            if ($description): ?>
                <p class="example-description"><?php echo $description; ?></p>
            <?php endif;


            if ($small_title): ?>
                <p class="example-small-title"><?php echo $small_title; ?></p>
            <?php endif;


            if (have_rows('logos')): while (have_rows('logos')): the_row();
                $the_logo = get_sub_field('example_logo');

                if ($the_logo): ?>
                <img class="example-logo" src="<?php echo $the_logo; ?>">
                <?php endif; ?>

            <?php endwhile; endif; // end 'logos' loop ?>

            </div><!-- / repeated container -->
        <?php endwhile; endif; // end 'community_example' loop ?>

        </div><!-- / inside white box -->
    </div><!-- /white box -->
</section><!-- / community
```

```php
<section>
<?php // a ridiculous example
if ($a_thing): ?>

    <div>
    <?php if ($another_thing): ?>

        <div>
        <?php if ($yet_another_thing): ?>

            <div>
            <?php if ($wow_something_else): ?>

                <ul>
                <?php foreach ($things as $thing): ?>

                    <li><?php echo $thing['array_index']; ?></li>

                <?php endforeach; // end $things each ?>
                </ul>

            <?php endif; // end $wow_something_else if ?>
            </div>

        <?php endif; // end $yet_another_thing if ?>
        </div>

    <?php endif; // end $another_thing if ?>
    </div>

<?php endif; // end $a_thing if ?>
</section>
```