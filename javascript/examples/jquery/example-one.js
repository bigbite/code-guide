// Don't do this
$('.headhesive .mobile-nav').on('click', function() {
    $('.headhesive .main-nav').slideToggle();
});

$('.banner:not(.headhesive) .mobile-nav').on('click', function() {
    $('.banner:not(.headhesive) .site-logo').removeClass('logo--alt');

    $('.banner:not(.headhesive) .main-nav').slideToggle(300, function() {
    if ($('.banner:not(.headhesive) .main-nav').is(':visible') !== true) {
            $('.banner:not(.headhesive) .site-logo').removeClass('logo--alt');
        }
    });
    if ($('.banner:not(.headhesive) .main-nav').is(':visible') === true) {
        $('.banner:not(.headhesive) .site-logo').addClass('logo--alt');
    }
});


// Do this
(function ($) {

/**
 * grab the header, the header clone, and the required children.
 * set class name to toggle
 */
var $bannerClone    = $('.headhesive');
var $bannerMain     = $('.banner:not(.headhesive)');
var $navClone       = $bannerClone.find('.main-nav');
var $navMobileClone = $bannerClone.find('.mobile-nav');
var $navMobile      = $bannerMain.find('.mobile-nav');
var $navMain        = $bannerMain.find('.main-nav');
var $siteLogo       = $bannerMain.find('.site-logo');
var classToToggle   = 'logo--alt';


/**
 * Checks whether a selector is visible
 * @param  {jQuery Object}  $selector  a jQuery object
 * @return {Boolean}                   true or false
 */
function isVisible ($selector) {
    return !!$selector.is(':visible');
}

/**
 * Adds a class if the specified selector is visible,
 * else removes it
 * @param  {jQuery object} $selector  a jQuery object
 * @param  {String}        className  the class name to toggle
 * @return {jQuery object}            the jQuery object
 */
function toggleClassOnVisibility ($selector, className) {
    if (isVisible($selector)) {
        $selector.addClass(className);
    } else {
        $selector.removeClass(className);
    }
    return $selector;
}

/**
 * slidetoggle the nav
 * toggle class on site logo
 */
function navActions () {
    $navMain.slideToggle();
    toggleClassOnVisibility($siteLogo, classToToggle);
}

/**
 * when the headhesive mobile nav is clicked, toggle
 * the visibility of the hedhesive main nav.
 */
$navMobileClone.on('click', function () {
    $navClone.slideToggle();
});

/**
 * when the normal mobile nav is clicked, call the
 * navActions function, which toggles the main nav,
 * and swaps out the logo class.
 */
$navMobile.click(navActions);

}(jQuery));
