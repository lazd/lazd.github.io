{
    title: "No-nonsense vertical centering",
    description: "Two no-nonsense, reliable techniques to vertically center your content with CSS.",
    date: "2013-9-12",
    tags: [
        'css3'
    ],
    image: "<div class='vCenter grayText'>Don't off yourself with a rusty spoon, <br>cringe-free CSS vertical centering is possible.</div>"
}

<style>
    .navbar {
        margin: 1rem;
    }
    .navbar a {
        padding: 0 1rem;

        background: gray;
        
        color: black;

        text-decoration: none;
    }

    .navbar a:not(:last-child) {
        border-right: 0.0625rem solid rgb(0,0,0);
    }

    .navbar-table {
        display: table;
        
        height: 2rem;
    }

    .navbar-table a {
        display: table-cell;
        
        vertical-align: middle;
    }

    .navbar-flex {
        display: flex;
        
        height: 2rem;
    }

    .navbar-flex a {
        display: flex;
        
        align-items: center;
    }
</style>

## Historically impractical

Vertically centering with CSS has always required gross hacks. From negative margins to JavaScript, old-hat devs have brought out the dirtiest of tricks to accomplish this simple and oft needed layout technique.

Things aren't perfect yet, but there are two, no-nonsense techniques that will help you get the job done without making you cringe or [off yourself with a rusty spoon].

## The problem

We need to build a horizontal nav bar with elements about 32px high with vertically centered text in each of the links.

## The solution(s)

Though there are a few other solutions, I'm going to talk about two flexible and reliable approaches. The first gives the ultimate in flexibility, and the second works great for situations where old browser support is still on the table.

We'll use the same markup for both solutions:

```html
<nav class="navbar">
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
    <a href="#">Item 3</a>
    <a href="#">Item 4</a>
</nav>
```


## 1. Use the flexible box model

Flexbox is the holy grail of web layouts. It gives web developers the tools they've been clamoring for with a (relatively) simple and easy to understand set of attributes.

The CSS properties for the latest spec are simple:

```css
.navbar-flex {
    /* Behave like a flexible box */
    display: flex;
    
    height: 32px;
}

.navbar-flex a {
    /* Behave like a flexible box */
    display: flex;
    
    /* Center items on the cross axis (vertical) */
    align-items: center;
}
```

### Demo

<nav class="navbar navbar-flex">
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
    <a href="#">Item 3</a>
    <a href="#">Item 4</a>
</nav>

### Pros:
* Works with multi-line text and arbitrary elements
* Enables responsive layouts that can convert your horizontal menu to vertical with a single property

### Cons:
* Only works on the latest versions of modern browsers
* A bit tough to understand
* [Deprecated and prefixed properties][Using flexbox] required for full support on older browsers

### Browser support
* IE 10+
* Safari on desktop and iOS
* Firefox
* Chrome
* Android

See the [support tables on caniuse](http://caniuse.com/flexbox) for details.


## 2. Fake it with fake tables

Layouts done using the `<table>` tag are hated for the lack of semantics and clumsy syntax, and rightly so.

However, you can have all the power and flexibility of tables without the `<table>` tag using `display: table`.

The CSS properties are simple:

```css
.navbar-table {
    /* Behave like a table */
    display: table;
    
    height: 32px;
}

.navbar-table a {
    /* Behave like a table cell */
    display: table-cell;
    
    /* Vertically center content */
    vertical-align: middle;
}
```

### Demo

<nav class="navbar navbar-table">
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
    <a href="#">Item 3</a>
    <a href="#">Item 4</a>
</nav>

### Pros:
* Works in very old browsers
* Works with multi-line text and arbitrary elements

### Cons:
* No support for responsive design, so your menu is stuck horizontal
* Feels dirty

### Browser support
* IE 8+
* Every other browser ever made

See the [support tables on caniuse](http://caniuse.com/css-table) for details.


## It doesn't stop at nav bars

Both of these techniques can be used vertically center anything from images to modal dialogs. Use the above techniques to get full vertical centering satisfaction and avoid the odd hacks that fall apart when the weather changes.

## The other techniques

There several other ways to get this done in CSS. A few of the more popular methods are discussed below

### Use CSS transforms

As outlined by Brian Gonzalez in his article [CSS Vertical Centering][translate y approach], it's possible to vertically center using CSS `transform` with a negative `translateY`.

It doesn't work if the parent doesn't have a height specified, and the browser support is less than desirable, with this hack working in IE 9+.

### Use a fixed height and absolute positioning

Stephen Shaw outlines a number of techniques in his article [Absolute Horizontal and Vertical centering in CSS], two of which there are a few techniques that involve absolute positioning.

The first uses positioning against the sides of a parent element, but requires height to be declared. Browser support is decent, working in IE 8+, but not on Windows Phone.

The next absolute positioning technique requires width and height to be declared and uses negative margins to offset the inner box by half of its width and height. This time-honored technique works everywhere, including IE 6 and 7.

### Use a ghost element

As outlined by Chris Coyer in his article [Centering in the Unknown], you can use `vertical-align` and `inline-block` to center things.

It requires a dirty negative margin hack to keep things aligned, but it works in IE 8+.

### The `line-height` solution

For single-line text, you can set the `line-height` equal to the `height` of the box, getting you alignment.

If your text ends up wrapping, the second line falls out of the box. This works everywhere, but it's very brittle.

### Calculate with JavaScript

Finally, the oft used technique of measuring height using JavaScript and calculating the correct position on load and every time the window is resized. I'm not even going to link to this, you should be doing your layouts with CSS.

## The bottom line and a word on moving the web forward

Flexbox aside, every CSS vertical centering technique is a hack. Your best bet is to suck it up until flexbox support is available everywhere and choose the hack that works best for your use case and target browser environment.

However, if you are in a position to do so, drop support for old browsers. The best way to drag netizens and their governing groups into the future is to level sanctions against them: you can't use my fancy site until you upgrade your browser.


[off yourself with a rusty spoon]: http://www.reddit.com/r/programming/comments/1yypr8/refreshing_satirical_article_backend_css/cfp2whv
[Using flexbox]: http://css-tricks.com/using-flexbox/
[Absolute Horizontal and Vertical centering in CSS]: http://coding.smashingmagazine.com/2013/08/09/absolute-horizontal-vertical-centering-css/
[Centering in the Unknown]: http://css-tricks.com/centering-in-the-unknown/
[translate y approach]: http://davidwalsh.name/css-vertical-center
